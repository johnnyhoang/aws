import React, { useState, useEffect, useMemo } from 'react';
import { FUNDAMENTAL_QUIZ_QUESTIONS } from '../../data/fundamentals/quizQuestionsData';
import { FundamentalQuizQuestion } from '../../types/fundamentals';
import { FUNDAMENTAL_DOMAINS } from '../../data/fundamentals/domainsData';
import { useLearning } from '../../context/LearningContext';
import { shuffleArray } from '../../utils/shuffle';
import { 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Trophy, 
  Sparkles, 
  Filter, 
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export const FundamentalsExamSimulatorView: React.FC = () => {
  const { addStudyHours } = useLearning();
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [quizQuestions, setQuizQuestions] = useState<FundamentalQuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize and shuffle questions based on filter
  useEffect(() => {
    let filtered = FUNDAMENTAL_QUIZ_QUESTIONS;
    if (selectedDomain !== 'all') {
      filtered = FUNDAMENTAL_QUIZ_QUESTIONS.filter(q => q.domainId === selectedDomain);
    }
    
    // Deep shuffle questions and their options using Fisher-Yates
    const randomized = shuffleArray(filtered).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));

    setQuizQuestions(randomized);
    setCurrentIdx(0);
    setUserAnswers({});
    setIsAnswerRevealed({});
    setScore(0);
    setStreak(0);
    setIsSubmitted(false);
  }, [selectedDomain]);

  const currentQ = quizQuestions[currentIdx];

  const handleSelectOption = (optionId: string) => {
    if (isAnswerRevealed[currentIdx] || isSubmitted) return;

    setUserAnswers(prev => ({ ...prev, [currentIdx]: optionId }));
    setIsAnswerRevealed(prev => ({ ...prev, [currentIdx]: true }));

    const isCorrect = optionId === currentQ.correctOptionId;
    if (isCorrect) {
      setScore(prev => prev + 100 + streak * 20);
      setStreak(prev => prev + 1);
      addStudyHours(0.05);
    } else {
      setStreak(0);
    }
  };

  const handleRestart = () => {
    let filtered = FUNDAMENTAL_QUIZ_QUESTIONS;
    if (selectedDomain !== 'all') {
      filtered = FUNDAMENTAL_QUIZ_QUESTIONS.filter(q => q.domainId === selectedDomain);
    }
    const randomized = shuffleArray(filtered).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuizQuestions(randomized);
    setCurrentIdx(0);
    setUserAnswers({});
    setIsAnswerRevealed({});
    setScore(0);
    setStreak(0);
    setIsSubmitted(false);
  };

  const totalCorrect = useMemo(() => {
    return Object.entries(userAnswers).filter(([idx, ans]) => {
      const q = quizQuestions[Number(idx)];
      return q && ans === q.correctOptionId;
    }).length;
  }, [userAnswers, quizQuestions]);

  const answeredCount = Object.keys(userAnswers).length;

  if (quizQuestions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-slate-400">
        Đang nạp ngân hàng câu hỏi...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white">
              Luyện Đề Nền Tảng (Exam Simulator)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Đảo ngẫu nhiên 100% bằng thuật toán Fisher-Yates, giải thích chi tiết tại sao đúng/sai
            </p>
          </div>
        </div>

        {/* Stats HUD */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs flex items-center gap-1.5">
            <span className="text-orange-400">🔥</span>
            <span className="text-slate-400">Streak:</span>
            <span className="font-bold text-orange-300 font-mono">{streak}x</span>
          </div>
          <div className="px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Điểm:</span>
            <span className="font-bold text-amber-300 font-mono">{score} PTS</span>
          </div>
        </div>
      </div>

      {/* Domain Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
        <button
          onClick={() => setSelectedDomain('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            selectedDomain === 'all'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Tất cả lĩnh vực ({FUNDAMENTAL_QUIZ_QUESTIONS.length})
        </button>
        {FUNDAMENTAL_DOMAINS.map(d => (
          <button
            key={d.id}
            onClick={() => setSelectedDomain(d.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedDomain === d.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {d.shortTitle}
          </button>
        ))}
      </div>

      {!isSubmitted ? (
        <div className="space-y-6">
          
          {/* Question Navigator Pills */}
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quizQuestions.map((q, idx) => {
              const isAnswered = isAnswerRevealed[idx];
              const isCorrect = isAnswered && userAnswers[idx] === q.correctOptionId;
              const isCurrent = idx === currentIdx;

              let pillStyle = 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800';
              if (isAnswered) {
                pillStyle = isCorrect ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold' : 'bg-rose-500/20 border-rose-500 text-rose-300';
              }
              if (isCurrent) {
                pillStyle += ' ring-2 ring-amber-400 font-bold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-7 h-7 rounded-lg border text-[11px] font-mono flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${pillStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Question Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 shadow-xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-400">Câu {currentIdx + 1} / {quizQuestions.length}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{currentQ.category}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold text-[10px]">
                {currentQ.difficulty}
              </span>
            </div>

            {/* Scenario Text */}
            <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
              {currentQ.scenario}
            </p>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentIdx] === opt.id;
                const isRevealed = isAnswerRevealed[currentIdx];
                const isCorrect = opt.id === currentQ.correctOptionId;

                let optStyle = 'bg-slate-950/80 hover:bg-slate-850 border-slate-800 text-slate-200';
                if (isRevealed) {
                  if (isCorrect) {
                    optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    optStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                  } else {
                    optStyle = 'bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-50';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isRevealed}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start justify-between gap-3 cursor-pointer ${optStyle}`}
                  >
                    <span className="leading-relaxed">{opt.text}</span>
                    {isRevealed && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />}
                    {isRevealed && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation Section */}
            {isAnswerRevealed[currentIdx] && (
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2">
                  {userAnswers[currentIdx] === currentQ.correctOptionId ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Chính xác! (+100 Điểm)
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Chưa đúng. Hãy đọc giải thích kỹ bên dưới:
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p><strong className="text-emerald-300">Tại sao đúng:</strong> {currentQ.explanation.whyCorrect}</p>
                  
                  {currentQ.explanation.whyOthersIncorrect.length > 0 && (
                    <div className="pt-1 space-y-1">
                      <strong className="text-rose-300 block">Tại sao các đáp án khác sai:</strong>
                      {currentQ.explanation.whyOthersIncorrect.map((item, idx) => (
                        <p key={idx} className="pl-2 border-l border-slate-800 text-slate-400">
                          • {item.reason}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl text-amber-200">
                    <strong className="text-amber-300 flex items-center gap-1 mb-0.5">
                      <Sparkles className="w-3.5 h-3.5" /> Liên hệ AWS Cloud thực tế:
                    </strong>
                    {currentQ.explanation.awsRelevanceTip}
                  </div>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Câu Trước
              </button>

              {answeredCount === quizQuestions.length ? (
                <button
                  onClick={() => setIsSubmitted(true)}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-600/20 cursor-pointer"
                >
                  Hoàn Tất & Xem Tổng Điểm 🏆
                </button>
              ) : currentIdx < quizQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx(prev => Math.min(quizQuestions.length - 1, prev + 1))}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Câu Tiếp Theo <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsSubmitted(true)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  Xem Kết Quả 📊
                </button>
              )}
            </div>

          </div>
        </div>
      ) : (
        /* Result Summary Card */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/40 rounded-3xl flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white">
              Kết Quả Bài Luyện Đề Nền Tảng
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Bạn đã hoàn thành bài kiểm tra trắc nghiệm kịch bản thực tế
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 block">Số câu đúng</span>
              <strong className="text-emerald-400 text-lg font-mono">{totalCorrect} / {quizQuestions.length}</strong>
            </div>
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 block">Tỷ lệ chính xác</span>
              <strong className="text-sky-400 text-lg font-mono">
                {Math.round((totalCorrect / quizQuestions.length) * 100)}%
              </strong>
            </div>
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 block">Điểm tích lũy</span>
              <strong className="text-amber-400 text-lg font-mono">{score} PTS</strong>
            </div>
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 block">Đánh giá</span>
              <strong className="text-purple-400 text-sm">
                {totalCorrect / quizQuestions.length >= 0.8 ? 'Sẵn Sàng AWS ⭐' : 'Cần Ôn Luyện Thêm'}
              </strong>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-emerald-600/20 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Làm Lại Bài Mới (Đảo Đề Ngẫu Nhiên)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
