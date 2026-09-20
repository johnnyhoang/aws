import React, { useState, useMemo } from 'react';
import { FUNDAMENTAL_QUIZ_QUESTIONS } from '../../data/fundamentals/quizQuestionsData';
import { FUNDAMENTAL_DOMAINS } from '../../data/fundamentals/domainsData';
import { useLearning } from '../../context/LearningContext';
import { shuffleArray } from '../../utils/shuffle';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export const FundamentalsExamSimulatorView: React.FC = () => {
  const { addStudyHours } = useLearning();
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [quizSeed, setQuizSeed] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<Record<number, boolean>>({});

  const quizQuestions = useMemo(() => {
    void quizSeed;
    let filtered = FUNDAMENTAL_QUIZ_QUESTIONS;
    if (selectedDomain !== 'all') {
      filtered = FUNDAMENTAL_QUIZ_QUESTIONS.filter(q => q.domainId === selectedDomain);
    }
    return shuffleArray(filtered).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
  }, [selectedDomain, quizSeed]);

  const currentQ = quizQuestions[currentIdx];

  const handleDomainChange = (domain: string) => {
    setSelectedDomain(domain);
    setCurrentIdx(0);
    setUserAnswers({});
    setIsAnswerRevealed({});
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswerRevealed[currentIdx]) return;

    setUserAnswers(prev => ({ ...prev, [currentIdx]: optionId }));
    setIsAnswerRevealed(prev => ({ ...prev, [currentIdx]: true }));

    const isCorrect = optionId === currentQ.correctOptionId;
    if (isCorrect) {
      addStudyHours(0.05);
    }
  };

  const handleRestart = () => {
    setQuizSeed(s => s + 1);
    setCurrentIdx(0);
    setUserAnswers({});
    setIsAnswerRevealed({});
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500 text-sm">
        Đang nạp ngân hàng câu hỏi...
      </div>
    );
  }

  const isCurrentRevealed = !!isAnswerRevealed[currentIdx];
  const selectedOption = userAnswers[currentIdx];

  return (
    <div className="space-y-6 text-slate-300">
      
      {/* Minimal Domain Filter */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleDomainChange('all')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              selectedDomain === 'all'
                ? 'bg-slate-800 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tất Cả (8 Lĩnh Vực)
          </button>
          {FUNDAMENTAL_DOMAINS.map((domain) => (
            <button
              key={domain.id}
              onClick={() => handleDomainChange(domain.id)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedDomain === domain.id
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {domain.shortTitle}
            </button>
          ))}
        </div>

        <button
          onClick={handleRestart}
          className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer flex-shrink-0"
          title="Làm lại bộ đề"
          aria-label="Làm lại bộ đề"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Question Book Layout */}
      <div className="space-y-6">
        
        {/* Question Metadata & Scenario */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-amber-400 font-semibold">
              Câu {currentIdx + 1} / {quizQuestions.length} • {currentQ.category}
            </span>
            <span>Độ khó: {currentQ.difficulty}</span>
          </div>

          <div className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
            {currentQ.scenario}
          </div>
        </div>

        {/* 4 Clean Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.id === currentQ.correctOptionId;

            let optionStyle = 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300';
            if (isCurrentRevealed) {
              if (isCorrect) {
                optionStyle = 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200 font-medium';
              } else if (isSelected) {
                optionStyle = 'bg-red-950/40 border-red-800/80 text-red-200';
              }
            } else if (isSelected) {
              optionStyle = 'bg-slate-800 border-amber-500/80 text-amber-200 font-medium';
            }

            const letter = String.fromCharCode(65 + idx);

            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-3.5 rounded-lg border transition-colors cursor-pointer flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${optionStyle}`}
              >
                <span className="font-mono font-bold text-slate-400 w-5 flex-shrink-0 mt-0.5">
                  {letter}.
                </span>
                <span className="flex-1">{opt.text}</span>
              </div>
            );
          })}
        </div>

        {/* Action Bar (Prev, Next) */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
          <button
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Câu trước"
            aria-label="Câu trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentIdx(prev => Math.min(quizQuestions.length - 1, prev + 1))}
            disabled={currentIdx === quizQuestions.length - 1}
            className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Câu tiếp theo"
            aria-label="Câu tiếp theo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Explanation */}
        {isCurrentRevealed && (
          <div className="border-l-2 border-slate-700 pl-4 py-2 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="font-semibold text-slate-100 flex items-center gap-2">
              {selectedOption === currentQ.correctOptionId ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Chính xác
                </span>
              ) : (
                <span className="text-red-400 flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> Chưa chính xác
                </span>
              )}
            </div>

            <p className="leading-relaxed">{currentQ.explanation.whyCorrect}</p>
            {currentQ.explanation.awsRelevanceTip && (
              <div className="text-slate-400 italic pt-1">
                <strong>Liên hệ AWS:</strong> {currentQ.explanation.awsRelevanceTip}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
