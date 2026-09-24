import React, { useState } from 'react';
import { EMAIL_QUIZ_QUESTIONS } from '../../data/email/emailQuizData';
import { EmailQuizQuestion } from '../../types/emailModule';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const EmailTestView: React.FC = () => {
  const { recordQuizAnswer, saveQuizResult, userPoints, currentStreak } = useLearning();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [feedbackDelta, setFeedbackDelta] = useState<{ points: number; xp: number } | null>(null);

  const filteredQuestions = filterDifficulty === 'all'
    ? EMAIL_QUIZ_QUESTIONS
    : EMAIL_QUIZ_QUESTIONS.filter(q => q.difficulty === filterDifficulty);

  const currentQuestion: EmailQuizQuestion = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];
  const isLastQuestion = currentQuestionIndex === filteredQuestions.length - 1;

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const isCorrect = optionId === currentQuestion.correctOptionId;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    const feedback = recordQuizAnswer(isCorrect, currentQuestion.difficulty);
    setFeedbackDelta({
      points: feedback.pointsDelta,
      xp: feedback.xpDelta
    });
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      saveQuizResult('email_quiz', score, filteredQuestions.length);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setFeedbackDelta(null);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setFeedbackDelta(null);
  };

  const handleFilterChange = (diff: string) => {
    setFilterDifficulty(diff);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setFeedbackDelta(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-slate-300">
      
      {/* Test Hero Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
            Đấu Trường Trắc Nghiệm Tình Huống: Email & Mail Server Master
          </div>

          <div className="flex items-center gap-3 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <span className="text-amber-400 font-mono font-bold">
              {currentStreak}x Streak
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-300 font-mono font-bold">
              +{userPoints} Pts
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Luyện Thi Tình Huống Kỹ Sư Email & Mail Server
        </h1>
        <p className="text-sm text-slate-400">
          Thử thách phản xạ giải quyết sự cố: Fix lỗi rDNS/PTR cho Postfix, thiết lập chính sách DMARC p=reject, khắc phục giới hạn 10 DNS lookups của SPF, và ngăn chặn Open Relay abuse.
        </p>

        {/* Difficulty Filter Bar */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs text-slate-500 font-semibold">
            Mức độ:
          </span>
          {['all', 'Cơ bản', 'Trung bình', 'Khó', 'Chuyên gia'].map((diff) => (
            <button
              key={diff}
              onClick={() => handleFilterChange(diff)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                filterDifficulty === diff
                  ? 'bg-sky-600/30 text-sky-300 border border-sky-500/50 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {diff === 'all' ? 'Tất cả' : diff}
            </button>
          ))}
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
          <p className="text-slate-400">Không tìm thấy câu hỏi phù hợp với bộ lọc này.</p>
          <button
            onClick={() => handleFilterChange('all')}
            className="px-4 py-2 rounded-lg bg-sky-600 text-white text-xs font-semibold cursor-pointer"
          >
            Xem tất cả câu hỏi
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Progress & Question Info */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">
              Câu hỏi <strong className="text-sky-400">{currentQuestionIndex + 1}</strong> / {filteredQuestions.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800/60 text-[11px] font-mono">
                {currentQuestion.difficulty}
              </span>
              <span className="text-emerald-400 font-mono font-semibold">
                Điểm: {score}/{currentQuestionIndex + (isAnswered ? 1 : 0)}
              </span>
            </div>
          </div>

          {/* Question Section (Seamless, không lồng khung) */}
          <div className="space-y-6 pt-2">
            
            {/* Scenario Text */}
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
                {currentQuestion.scenario}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrect = opt.id === currentQuestion.correctOptionId;

                let btnStyle = 'bg-slate-900/70 hover:bg-slate-800/80 text-slate-300 border border-slate-800/70';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/40 border-l-4 border-l-emerald-500 border-transparent text-emerald-200';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-red-950/40 border-l-4 border-l-red-500 border-transparent text-red-200';
                  } else {
                    btnStyle = 'bg-slate-950/30 border-transparent text-slate-500 opacity-50';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isAnswered}
                    className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all duration-150 flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <div className="w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 text-slate-400">
                      {isAnswered && isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isAnswered && isSelected && !isCorrect ? (
                        <XCircle className="w-4 h-4 text-red-400" />
                      ) : (
                        opt.id.replace('opt-', '').toUpperCase()
                      )}
                    </div>
                    <span className="leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback & Explanation */}
            {isAnswered && (
              <div className="pt-4 border-t border-slate-800 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedOptionId === currentQuestion.correctOptionId ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Chính xác! (+{feedbackDelta?.points} pts, +{feedbackDelta?.xp} XP)
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" /> Chưa chính xác ({feedbackDelta?.points} pts)
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
                  <p>
                    <strong className="text-slate-100">Giải thích chi tiết: </strong>
                    {currentQuestion.explanation.whyCorrect}
                  </p>

                  {currentQuestion.explanation.proTip && (
                    <div className="border-l-2 border-sky-400/80 pl-3 py-1 text-sky-200 text-xs bg-sky-950/20 rounded-r-lg">
                      <span>{currentQuestion.explanation.proTip}</span>
                    </div>
                  )}
                </div>

                {/* Next or Finish Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <span>{isLastQuestion ? 'Xem kết quả tổng kết' : 'Câu tiếp theo'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Restart Button */}
          <div className="flex justify-center">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Bắt đầu lại bộ câu hỏi này</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
