import React, { useState, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  Lightbulb,
  Check,
  ShieldCheck,
  Search,
  Filter,
  Clock,
  Zap,
  BookOpen
} from 'lucide-react';

export const ExamSimulatorView: React.FC = () => {
  const { saveQuizResult } = useLearning();
  const [selectedCert, setSelectedCert] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mode, setMode] = useState<'study' | 'exam'>('study'); // Study (Instant feedback) vs Exam (Timed)
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  const certFilters = [
    { id: 'all', label: 'Tất Cả Bộ Đề' },
    { id: 'SAA-C03', label: 'SAA-C03 (Solutions Architect)' },
    { id: 'SOA-C02', label: 'SOA-C02 (SysOps Admin)' },
    { id: 'DVA-C02', label: 'DVA-C02 (Developer)' },
    { id: 'SAP-C02', label: 'SAP-C02 (Architect Pro)' },
    { id: 'CLF-C02', label: 'CLF-C02 (Cloud Practitioner)' },
  ];

  const difficultyFilters = [
    { id: 'all', label: 'Mọi Độ Khó' },
    { id: 'Cơ bản', label: 'Cơ bản' },
    { id: 'Trung bình', label: 'Trung bình' },
    { id: 'Khó', label: 'Khó' },
    { id: 'Chuyên gia', label: 'Chuyên gia' },
  ];

  const filteredQuestions: QuizQuestion[] = QUIZ_QUESTIONS.filter(q => {
    const matchCert = selectedCert === 'all' || q.certCode === selectedCert;
    const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchQuery = q.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       q.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCert && matchDiff && matchQuery;
  });

  const activeQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Timer in exam mode
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (mode === 'exam' && !isExamCompleted) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mode, isExamCompleted]);

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted && mode === 'study') return;
    setSelectedOptionId(optionId);
    
    // In exam mode, save answer immediately
    if (mode === 'exam') {
      setUserAnswers(prev => ({
        ...prev,
        [activeQuestion.id]: optionId
      }));
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const newAnswers = {
      ...userAnswers,
      [activeQuestion.id]: selectedOptionId
    };
    setUserAnswers(newAnswers);

    if (selectedOptionId === activeQuestion.correctOptionId) {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
    const targetQ = filteredQuestions[index];
    const savedAns = userAnswers[targetQ.id];
    if (savedAns) {
      setSelectedOptionId(savedAns);
      setIsAnswerSubmitted(mode === 'study');
    } else {
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      handleJumpToQuestion(currentIndex + 1);
    } else {
      // Completed all
      setIsExamCompleted(true);
      let correct = 0;
      filteredQuestions.forEach(q => {
        if (userAnswers[q.id] === q.correctOptionId) {
          correct++;
        }
      });
      saveQuizResult(selectedCert, correct, filteredQuestions.length);

      if (correct / filteredQuestions.length >= 0.7) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      handleJumpToQuestion(currentIndex - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsExamCompleted(false);
    setTimerSeconds(0);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate stats
  let totalCorrect = 0;
  Object.keys(userAnswers).forEach(qId => {
    const q = QUIZ_QUESTIONS.find(item => item.id === qId);
    if (q && userAnswers[qId] === q.correctOptionId) {
      totalCorrect++;
    }
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Ngân Hàng Đề Thi Chuẩn Jon Bonso & Tutorials Dojo
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Trình Luyện Thi & Giải Tình Huống AWS
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Tổng hợp các câu hỏi tình huống thực tế bám sát 100% cấu trúc đề thi chính thức của AWS.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="bg-slate-900 p-1 rounded-xl border border-slate-700 flex items-center gap-1">
          <button
            onClick={() => { setMode('study'); handleRestartQuiz(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === 'study' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ôn Luyện (Lời Giải Tức Thì)</span>
          </button>
          <button
            onClick={() => { setMode('exam'); handleRestartQuiz(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === 'exam' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Thi Thử (Bấm Giờ)</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Cert Tabs */}
        <div className="md:col-span-8 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {certFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => { setSelectedCert(f.id); handleRestartQuiz(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCert === f.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="md:col-span-4 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentIndex(0); }}
            placeholder="Tìm theo từ khóa tình huống..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Difficulty Pills & Total count */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Độ khó:
          </span>
          {difficultyFilters.map((d) => (
            <button
              key={d.id}
              onClick={() => { setSelectedDifficulty(d.id); handleRestartQuiz(); }}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                selectedDifficulty === d.id
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {mode === 'exam' && (
          <div className="flex items-center gap-1.5 font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>Thời gian: {formatTimer(timerSeconds)}</span>
          </div>
        )}
      </div>

      {/* Question Number Quick Jump Grid */}
      {filteredQuestions.length > 0 && (
        <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Danh sách câu hỏi ({filteredQuestions.length} câu):</span>
            <span className="text-amber-400 font-bold">Đã làm: {Object.keys(userAnswers).length}/{filteredQuestions.length}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filteredQuestions.map((q, idx) => {
              const isAnswered = !!userAnswers[q.id];
              const isCorrect = userAnswers[q.id] === q.correctOptionId;
              const isCurrent = currentIndex === idx;

              let btnStyle = 'bg-slate-800 text-slate-400 border-slate-700';
              if (isCurrent) {
                btnStyle = 'bg-amber-500 text-slate-950 font-black ring-2 ring-amber-400';
              } else if (isAnswered) {
                if (mode === 'study') {
                  btnStyle = isCorrect ? 'bg-emerald-900/60 text-emerald-300 border-emerald-500/50' : 'bg-red-900/60 text-red-300 border-red-500/50';
                } else {
                  btnStyle = 'bg-sky-900/60 text-sky-300 border-sky-500/50';
                }
              }

              return (
                <button
                  key={q.id}
                  onClick={() => handleJumpToQuestion(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold border flex items-center justify-center transition-all ${btnStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Quiz Card */}
      {!isExamCompleted && activeQuestion ? (
        <div className="bg-slate-900 rounded-2xl border border-slate-700/80 p-6 md:p-8 space-y-6 shadow-2xl">
          
          {/* Header of Question */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-400 uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                {activeQuestion.certCode}
              </span>
              <span className="font-semibold text-slate-300">Chủ đề: {activeQuestion.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {activeQuestion.difficulty}
              </span>
              <span className="font-bold text-slate-200">
                Câu {currentIndex + 1} / {filteredQuestions.length}
              </span>
            </div>
          </div>

          {/* Scenario Text */}
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
              {activeQuestion.scenario}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {activeQuestion.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id || userAnswers[activeQuestion.id] === opt.id;
              const isCorrect = opt.id === activeQuestion.correctOptionId;
              
              let optionStyle = 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-200';
              
              if (isAnswerSubmitted && mode === 'study') {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-red-950/40 border-red-500 text-red-200 ring-1 ring-red-500';
                } else {
                  optionStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-amber-500/15 border-amber-500 text-amber-300 ring-1 ring-amber-500';
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${optionStyle}`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isAnswerSubmitted && mode === 'study' && isCorrect ? 'bg-emerald-500 text-slate-950' :
                    isAnswerSubmitted && mode === 'study' && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {isAnswerSubmitted && mode === 'study' && isCorrect ? <Check className="w-4 h-4" /> :
                     isAnswerSubmitted && mode === 'study' && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
                     opt.id}
                  </div>
                  <span className="text-xs md:text-sm leading-relaxed">{opt.text}</span>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={handlePrevQuestion}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Câu Trước</span>
            </button>

            {mode === 'study' && !isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20 transition-all"
              >
                <span>Kiểm Tra Lời Giải</span>
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold shadow-lg shadow-sky-500/20 transition-all"
              >
                <span>{currentIndex < filteredQuestions.length - 1 ? 'Câu Tiếp Theo' : 'Nộp Bài & Xem Tổng Kết'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Detailed In-depth Explanation (In Study Mode when submitted) */}
          {mode === 'study' && isAnswerSubmitted && (
            <div className="space-y-4 pt-4 border-t border-slate-800 animate-fadeIn">
              
              {/* Correct / Incorrect Header */}
              <div className={`p-4 rounded-xl flex items-center gap-3 ${
                selectedOptionId === activeQuestion.correctOptionId
                  ? 'bg-emerald-950/30 border border-emerald-500/40 text-emerald-300'
                  : 'bg-red-950/30 border border-red-500/40 text-red-300'
              }`}>
                {selectedOptionId === activeQuestion.correctOptionId ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs md:text-sm font-bold">
                      Chính xác! Đáp án đúng là {activeQuestion.correctOptionId}.
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-xs md:text-sm font-bold">
                      Chưa chính xác! Đáp án đúng là {activeQuestion.correctOptionId}.
                    </span>
                  </>
                )}
              </div>

              {/* Why Correct */}
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Giải Thích Chi Tiết Tại Sao Đúng:
                </div>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {activeQuestion.explanation.whyCorrect}
                </p>
              </div>

              {/* Why Others Incorrect */}
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/80 space-y-3">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  Tại Sao Các Phương Án Khác Sai:
                </div>
                <div className="space-y-2">
                  {activeQuestion.explanation.whyOthersIncorrect.map((item, idx) => (
                    <div key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                      <strong className="text-red-400 font-mono">Phương án {item.optionId}:</strong>
                      <span>{item.reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exam Tip */}
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs md:text-sm text-amber-200 leading-relaxed">
                  <strong>Mẹo Thi Cốt Lõi:</strong> {activeQuestion.explanation.examTip}
                </div>
              </div>

            </div>
          )}

        </div>
      ) : isExamCompleted ? (
        /* Exam Summary Screen */
        <div className="bg-slate-900 rounded-2xl border border-slate-700 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8 text-amber-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">Kết Quả Bài Thi Thử</h2>
            <p className="text-sm text-slate-400">
              Bạn đã hoàn thành {filteredQuestions.length} câu hỏi trong thời gian {formatTimer(timerSeconds)}.
            </p>
          </div>

          <div className="bg-slate-800/80 max-w-sm mx-auto p-6 rounded-2xl border border-slate-700 space-y-3">
            <div className="text-4xl font-black text-amber-400">
              {totalCorrect} / {filteredQuestions.length}
            </div>
            <div className="text-sm font-semibold text-slate-300">
              Tỷ lệ chính xác: {Math.round((totalCorrect / filteredQuestions.length) * 100)}%
            </div>
            <div className="text-xs text-slate-400">
              {totalCorrect / filteredQuestions.length >= 0.72 
                ? '🎉 Xuất sắc! Điểm số này tương đương mức điểm ĐỖ (> 720/1000) của kỳ thi AWS chính thức.' 
                : 'Cần ôn lại các phần còn yếu trong mục Chuyên Đề Kỹ Năng để đạt trên 75% nhé!'}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm Lại Đề Thi</span>
            </button>
            <button
              onClick={() => { setMode('study'); handleRestartQuiz(); }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Xem Lại Từng Lời Giải Chi Tiết</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center text-slate-400 text-xs">
          Không tìm thấy câu hỏi phù hợp với bộ lọc hiện tại. Vui lòng chọn lại bộ lọc.
        </div>
      )}

    </div>
  );
};
