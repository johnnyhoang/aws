import React, { useState } from 'react';
import { SUPABASE_QUIZ_QUESTIONS } from '../../data/supabase/supabaseQuizData';
import { SUPABASE_FLASHCARDS } from '../../data/supabase/supabaseFlashcardsData';
import { SupabaseQuizQuestion, SupabaseFlashcard } from '../../types/supabaseModule';
import { 
  CheckCircle2, 
  XCircle, 
  Award
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const SupabaseTestView: React.FC = () => {
  const { recordQuizAnswer, flashcardsMastered, toggleFlashcardMastered } = useLearning();
  const [activeTab, setActiveTab] = useState<'quiz' | 'flashcards'>('quiz');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [cardFlipState, setCardFlipState] = useState<Record<string, boolean>>({});

  const currentQuestion: SupabaseQuizQuestion = SUPABASE_QUIZ_QUESTIONS[currentQuizIndex];

  const handleSelectOption = (id: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(id);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const chosenOption = currentQuestion.options.find(o => o.id === selectedOptionId);
    const isCorrect = chosenOption ? chosenOption.isCorrect : false;
    recordQuizAnswer(isCorrect, currentQuestion.difficulty);
  };

  const handleNextQuestion = () => {
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    if (currentQuizIndex < SUPABASE_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setCurrentQuizIndex(0);
    }
  };

  const toggleCardFlip = (id: string) => {
    setCardFlipState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-400" />
            <span>Đấu Trường Kiểm Tra: Supabase Expert</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Thử thách tình huống kỹ sư & Bộ thẻ nhớ thuật ngữ cốt lõi
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Trắc Nghiệm Tình Huống
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'flashcards'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Thẻ Nhớ Thuật Ngữ ({SUPABASE_FLASHCARDS.length})
          </button>
        </div>
      </div>

      {activeTab === 'quiz' ? (
        <div className="space-y-6">
          {/* Question Meta */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-emerald-400 font-bold">
              Câu {currentQuizIndex + 1}/{SUPABASE_QUIZ_QUESTIONS.length}
            </span>
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full text-slate-300">
              Độ khó: {currentQuestion.difficulty}
            </span>
          </div>

          {/* Scenario & Question */}
          <div className="space-y-3">
            <div className="border-l-2 border-emerald-500 pl-4 py-1.5 text-xs sm:text-sm text-slate-300 italic bg-slate-900/30 rounded-r-lg">
              <strong className="text-emerald-400 not-italic block mb-0.5">Tình huống thực tế:</strong>
              {currentQuestion.scenario}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-100">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              let optionStyle = 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-300';

              if (isAnswerSubmitted) {
                if (option.isCorrect) {
                  optionStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = 'bg-red-950/40 border-red-500/60 text-red-200';
                } else {
                  optionStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-500';
                }
              } else if (isSelected) {
                optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200';
              }

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 text-xs sm:text-sm ${optionStyle}`}
                >
                  <span className="font-mono font-bold uppercase text-emerald-400 mt-0.5">
                    {option.id}.
                  </span>
                  <span className="flex-1 leading-relaxed">{option.text}</span>
                  {isAnswerSubmitted && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation when submitted */}
          {isAnswerSubmitted && (
            <div className="border-l-2 border-emerald-400 pl-4 py-2 text-xs sm:text-sm text-slate-300 bg-slate-900/50 rounded-r-lg space-y-1">
              <span className="font-bold text-emerald-300 block">Giải thích chi tiết:</span>
              <p className="leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2 flex justify-end">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                Xác Nhận Đáp Án
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                {currentQuizIndex < SUPABASE_QUIZ_QUESTIONS.length - 1 ? 'Câu Tiếp Theo →' : 'Làm Lại Bộ Đề ↺'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Flashcards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUPABASE_FLASHCARDS.map((card: SupabaseFlashcard) => {
            const isFlipped = !!cardFlipState[card.id];
            const isMastered = flashcardsMastered.includes(card.id);

            return (
              <div
                key={card.id}
                onClick={() => toggleCardFlip(card.id)}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer flex flex-col justify-between min-h-[180px]"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-400 font-bold uppercase">
                      {card.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlashcardMastered(card.id);
                      }}
                      className={`p-1 rounded-md transition-colors ${
                        isMastered ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'
                      }`}
                      title={isMastered ? 'Đã thành thạo' : 'Đánh dấu thành thạo'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>

                  {!isFlipped ? (
                    <div className="space-y-1.5 pt-2">
                      <h4 className="text-base font-bold text-slate-100">{card.term}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{card.definition}</p>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-1 text-xs">
                      <p className="text-slate-300 leading-relaxed italic">
                        "{card.exampleOrAnalogy}"
                      </p>
                      <p className="text-emerald-300 font-semibold border-t border-slate-800 pt-1.5">
                        💡 {card.proTip}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-500 font-mono text-right pt-2">
                  {isFlipped ? 'Chạm để lật lại' : 'Chạm để xem ví dụ & mẹo'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
