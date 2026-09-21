import React, { useState } from 'react';
import { LINUX_ADMIN_QUIZ_QUESTIONS } from '../../data/linuxAdmin/linuxQuizData';
import { LINUX_ADMIN_FLASHCARDS } from '../../data/linuxAdmin/linuxFlashcardsData';
import { LinuxAdminFlashcard } from '../../types/linuxAdminModule';
import { useLearning } from '../../context/LearningContext';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Rotate3d, 
  Shuffle, 
  Circle, 
  ChevronLeft, 
  ChevronRight,
  HelpCircle,
  Layers
} from 'lucide-react';
import { shuffleArray } from '../../utils/shuffle';

export const LinuxAdminTestView: React.FC = () => {
  const { addStudyHours, recordQuizAnswer } = useLearning();
  const [subMode, setSubMode] = useState<'quiz' | 'flashcards'>('quiz');

  // Quiz State
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizScores, setQuizScores] = useState<Record<number, boolean>>({});

  // Flashcards State
  const [cards, setCards] = useState<LinuxAdminFlashcard[]>(LINUX_ADMIN_FLASHCARDS);
  const [currentCardIdx, setCurrentCardIdx] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [masteredCardIds, setMasteredCardIds] = useState<string[]>([]);

  // Quiz Handlers
  const currentQ = LINUX_ADMIN_QUIZ_QUESTIONS[currentQuizIdx] || LINUX_ADMIN_QUIZ_QUESTIONS[0];

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitQuiz = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOptionId === currentQ.correctOptionId;
    setQuizScores(prev => ({ ...prev, [currentQuizIdx]: isCorrect }));
    recordQuizAnswer(isCorrect, currentQ.difficulty);
    if (isCorrect) {
      addStudyHours(0.05);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIdx < LINUX_ADMIN_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIdx(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handlePrevQuiz = () => {
    if (currentQuizIdx > 0) {
      setCurrentQuizIdx(prev => prev - 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setQuizScores({});
  };

  // Flashcard Handlers
  const currentCard = cards[currentCardIdx] || cards[0];
  const isCardMastered = masteredCardIds.includes(currentCard?.id);

  const handleShuffleCards = () => {
    setCards(shuffleArray(cards));
    setCurrentCardIdx(0);
    setIsCardFlipped(false);
  };

  const handleToggleMaster = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredCardIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-300">
      
      {/* Submode Switcher */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => setSubMode('quiz')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              subMode === 'quiz'
                ? 'bg-slate-800 text-amber-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Đề Thi Trắc Nghiệm ({LINUX_ADMIN_QUIZ_QUESTIONS.length} câu)</span>
          </button>
          <button
            onClick={() => setSubMode('flashcards')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              subMode === 'flashcards'
                ? 'bg-slate-800 text-amber-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Thẻ Nhớ Thuật Ngữ ({LINUX_ADMIN_FLASHCARDS.length} thẻ)</span>
          </button>
        </div>

        {subMode === 'quiz' ? (
          <button
            onClick={handleRestartQuiz}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Làm lại bộ đề"
            aria-label="Làm lại bộ đề"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={handleShuffleCards}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Xáo trộn thẻ nhớ"
            aria-label="Xáo trộn thẻ nhớ"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* QUIZ MODE */}
      {subMode === 'quiz' && (
        <div className="space-y-6">
          
          {/* Question Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-amber-400 font-semibold">
                Câu {currentQuizIdx + 1} / {LINUX_ADMIN_QUIZ_QUESTIONS.length} • {currentQ.category}
              </span>
              <span>Độ khó: {currentQ.difficulty}</span>
            </div>

            <div className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
              {currentQ.scenario}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOptionId === opt.id;
              const isCorrect = opt.id === currentQ.correctOptionId;

              let optionStyle = 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300';
              if (isAnswerSubmitted) {
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

          {/* Controls Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
            <button
              onClick={handlePrevQuiz}
              disabled={currentQuizIdx === 0}
              className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Câu trước"
              aria-label="Câu trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {!isAnswerSubmitted && selectedOptionId && (
              <button
                onClick={handleSubmitQuiz}
                className="px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold transition-colors cursor-pointer"
              >
                Kiểm tra đáp án
              </button>
            )}

            <button
              onClick={handleNextQuiz}
              disabled={currentQuizIdx === LINUX_ADMIN_QUIZ_QUESTIONS.length - 1}
              className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Câu tiếp theo"
              aria-label="Câu tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Explanation Note */}
          {isAnswerSubmitted && (
            <div className="border-l-2 border-slate-700 pl-4 py-2 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="font-semibold text-slate-100 flex items-center gap-2">
                {selectedOptionId === currentQ.correctOptionId ? (
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

              {currentQ.explanation.proTip && (
                <div className="text-slate-400 italic pt-1">
                  <strong className="text-amber-300 not-italic">Mẹo chuyên gia: </strong>
                  {currentQ.explanation.proTip}
                </div>
              )}
            </div>
          )}

          {Object.keys(quizScores).length > 0 && (
            <div className="text-xs text-slate-500 pt-1">
              Điểm số: <strong className="text-emerald-400">{Object.values(quizScores).filter(Boolean).length}</strong> / {Object.keys(quizScores).length} câu đã trả lời đúng
            </div>
          )}

        </div>
      )}

      {/* FLASHCARDS MODE */}
      {subMode === 'flashcards' && (
        <div className="max-w-2xl mx-auto space-y-6">
          
          <div 
            onClick={() => setIsCardFlipped(prev => !prev)}
            className="min-h-[280px] p-6 sm:p-8 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono font-semibold text-amber-400">
                {currentCardIdx + 1} / {cards.length} • {currentCard.category}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">
                  {isCardFlipped ? 'Định nghĩa & Ứng dụng' : 'Thuật ngữ'}
                </span>
                <button
                  onClick={(e) => handleToggleMaster(currentCard.id, e)}
                  className="p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  title={isCardMastered ? 'Đã thuộc' : 'Đánh dấu đã thuộc'}
                  aria-label="Đánh dấu đã thuộc"
                >
                  {isCardMastered ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-3 py-2">
              {!isCardFlipped ? (
                <div className="text-base sm:text-xl font-bold text-slate-100 leading-relaxed">
                  {currentCard.term}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-sm sm:text-base font-medium text-amber-300 leading-relaxed">
                    {currentCard.definition}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-2 space-y-1">
                    <p><strong className="text-slate-200">Ứng dụng thực tế:</strong> {currentCard.practicalUsage}</p>
                    <p className="text-amber-200/90 italic"><strong className="text-amber-300 not-italic">Mẹo:</strong> {currentCard.proTip}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Rotate3d className="w-3.5 h-3.5" />
                Nhấp để lật thẻ
              </span>
              <span className="font-mono text-slate-400">
                {currentCard.category}
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2 text-xs">
            <button
              onClick={() => { setIsCardFlipped(false); setCurrentCardIdx(prev => Math.max(0, prev - 1)); }}
              disabled={currentCardIdx === 0}
              className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Thẻ trước"
              aria-label="Thẻ trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-slate-500 font-mono">
              Đã thuộc: <strong className="text-slate-300">{masteredCardIds.length}</strong> / {cards.length}
            </span>

            <button
              onClick={() => { setIsCardFlipped(false); setCurrentCardIdx(prev => Math.min(cards.length - 1, prev + 1)); }}
              disabled={currentCardIdx === cards.length - 1}
              className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Thẻ tiếp theo"
              aria-label="Thẻ tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
