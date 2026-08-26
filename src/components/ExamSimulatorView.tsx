import React, { useState } from 'react';
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
  ShieldCheck
} from 'lucide-react';

export const ExamSimulatorView: React.FC = () => {
  const { saveQuizResult } = useLearning();
  const [selectedCert, setSelectedCert] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);

  const certFilters = [
    { id: 'all', label: 'Tất Cả Đề Thi' },
    { id: 'SAA-C03', label: 'SAA-C03 (Solutions Architect)' },
    { id: 'SOA-C02', label: 'SOA-C02 (SysOps Admin)' },
    { id: 'DVA-C02', label: 'DVA-C02 (Developer)' },
    { id: 'SAP-C02', label: 'SAP-C02 (Solutions Architect Pro)' },
    { id: 'CLF-C02', label: 'CLF-C02 (Cloud Practitioner)' },
  ];

  const currentQuestions: QuizQuestion[] = QUIZ_QUESTIONS.filter(q => 
    selectedCert === 'all' || q.certCode === selectedCert
  );

  const activeQuestion = currentQuestions[currentIndex] || currentQuestions[0];

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
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

  const handleNextQuestion = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      const nextQ = currentQuestions[currentIndex + 1];
      const savedAns = userAnswers[nextQ.id];
      if (savedAns) {
        setSelectedOptionId(savedAns);
        setIsAnswerSubmitted(true);
      } else {
        setSelectedOptionId(null);
        setIsAnswerSubmitted(false);
      }
    } else {
      // Finished all questions
      setIsExamCompleted(true);
      
      // Calculate score
      let correct = 0;
      currentQuestions.forEach(q => {
        if (userAnswers[q.id] === q.correctOptionId) {
          correct++;
        }
      });
      saveQuizResult(selectedCert, correct, currentQuestions.length);

      if (correct / currentQuestions.length >= 0.7) {
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
      setCurrentIndex(prev => prev - 1);
      const prevQ = currentQuestions[currentIndex - 1];
      const savedAns = userAnswers[prevQ.id];
      if (savedAns) {
        setSelectedOptionId(savedAns);
        setIsAnswerSubmitted(true);
      } else {
        setSelectedOptionId(null);
        setIsAnswerSubmitted(false);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsExamCompleted(false);
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          Luyện Đề Chuẩn Jon Bonso & Tutorials Dojo
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          Trình Luyện Thi & Xử Lý Tình Huống AWS
        </h1>
        <p className="text-sm text-slate-400">
          Các câu hỏi tình huống thực tế bám sát cấu trúc đề thi AWS và bài kiểm tra kỹ thuật tại các trường đại học Mỹ.
        </p>
      </div>

      {/* Cert Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {certFilters.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              setSelectedCert(f.id);
              handleRestartQuiz();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCert === f.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Main Quiz Area */}
      {!isExamCompleted && activeQuestion ? (
        <div className="bg-slate-900 rounded-2xl border border-slate-700/80 p-6 md:p-8 space-y-6 shadow-2xl">
          
          {/* Progress & Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-400 uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                {activeQuestion.certCode}
              </span>
              <span>Chủ đề: <strong className="text-slate-200">{activeQuestion.category}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">
                Câu {currentIndex + 1} / {currentQuestions.length}
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
              const isSelected = selectedOptionId === opt.id;
              const isCorrect = opt.id === activeQuestion.correctOptionId;
              
              let optionStyle = 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-200';
              
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-red-950/40 border-red-500 text-red-200 ring-1 ring-red-500';
                } else {
                  optionStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-amber-500/10 border-amber-500 text-amber-300 ring-1 ring-amber-500';
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${optionStyle}`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isAnswerSubmitted && isCorrect ? 'bg-emerald-500 text-slate-950' :
                    isAnswerSubmitted && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {isAnswerSubmitted && isCorrect ? <Check className="w-4 h-4" /> :
                     isAnswerSubmitted && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
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

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20 transition-all"
              >
                <span>Xác Nhận Đáp Án</span>
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold shadow-lg shadow-sky-500/20 transition-all"
              >
                <span>{currentIndex < currentQuestions.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả Tổng Kết'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Detailed In-depth Explanation (When Answered) */}
          {isAnswerSubmitted && (
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
      ) : (
        /* Exam Summary Screen */
        <div className="bg-slate-900 rounded-2xl border border-slate-700 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8 text-amber-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">Kết Quả Bài Luyện Thi</h2>
            <p className="text-sm text-slate-400">
              Bạn đã hoàn thành toàn bộ câu hỏi trong bộ đề {selectedCert}.
            </p>
          </div>

          <div className="bg-slate-800/80 max-w-sm mx-auto p-6 rounded-2xl border border-slate-700 space-y-3">
            <div className="text-3xl font-black text-amber-400">
              {totalCorrect} / {currentQuestions.length}
            </div>
            <div className="text-sm font-semibold text-slate-300">
              Tỷ lệ chính xác: {Math.round((totalCorrect / currentQuestions.length) * 100)}%
            </div>
            <div className="text-xs text-slate-400">
              {totalCorrect / currentQuestions.length >= 0.7 
                ? '🎉 Xuất sắc! Bạn đã đạt chuẩn điểm đỗ kỳ thi AWS.' 
                : 'Cần ôn lại các phần còn yếu để đạt trên 75% nhé!'}
            </div>
          </div>

          <button
            onClick={handleRestartQuiz}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Lại Đề Thi Này</span>
          </button>
        </div>
      )}

    </div>
  );
};
