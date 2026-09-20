import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { FLASHCARDS } from '../data/flashcardsData';
import { 
  Rotate3d, 
  ChevronRight, 
  ChevronLeft, 
  Shuffle, 
  CheckCircle2, 
  Circle, 
  Languages 
} from 'lucide-react';
import { fisherYatesShuffle } from '../utils/shuffle';

export const FlashcardsView: React.FC = () => {
  const { flashcardsMastered, toggleFlashcardMastered } = useLearning();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardsList, setCardsList] = useState(() => fisherYatesShuffle(FLASHCARDS));
  
  const [languageMode] = useState<'vi' | 'en' | 'random'>('random');
  const [cardLangOverrides, setCardLangOverrides] = useState<Record<string, 'vi' | 'en'>>({});

  const categories = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'AWS Services', label: 'AWS Services' },
    { id: 'Security & IAM', label: 'Bảo Mật' },
    { id: 'Networking', label: 'Mạng AWS' },
    { id: 'Higher-Ed & LMS', label: 'Đại Học & LMS' },
    { id: 'IaC & DevOps', label: 'IaC & DevOps' },
  ];

  const filteredCards = cardsList.filter(card => 
    activeCategory === 'all' || card.category === activeCategory
  );

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const getActiveCardLang = (cardId: string, index: number): 'vi' | 'en' => {
    if (cardLangOverrides[cardId]) return cardLangOverrides[cardId];
    if (languageMode === 'en') return 'en';
    if (languageMode === 'vi') return 'vi';
    return index % 2 === 1 ? 'en' : 'vi';
  };

  const currentCardLang = currentCard ? getActiveCardLang(currentCard.id, currentIndex) : 'vi';

  const toggleCardLang = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentCard) return;
    const nextLang = currentCardLang === 'vi' ? 'en' : 'vi';
    setCardLangOverrides(prev => ({
      ...prev,
      [currentCard.id]: nextLang
    }));
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCardsList(fisherYatesShuffle(cardsList));
    setCurrentIndex(0);
  };

  const handleToggleMaster = (cardId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    toggleFlashcardMastered(cardId);
  };

  if (!currentCard) {
    return (
      <div className="py-12 text-center text-slate-500 text-sm">
        Không có thẻ nhớ phù hợp.
      </div>
    );
  }

  const isMastered = flashcardsMastered.includes(currentCard.id);

  const displayedQuestion = (currentCardLang === 'en' && currentCard.termEn)
    ? currentCard.termEn
    : currentCard.term;

  const displayedAnswer = (currentCardLang === 'en' && currentCard.definitionEn)
    ? currentCard.definitionEn
    : currentCard.definition;

  const displayedContext = (currentCardLang === 'en' && currentCard.realWorldUsageEn)
    ? currentCard.realWorldUsageEn
    : currentCard.realWorldUsage;

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-slate-300">
      
      {/* Category Pills & Utility Actions */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleCardLang}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
            title="Đổi ngôn ngữ thẻ"
          >
            <Languages className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono">{currentCardLang.toUpperCase()}</span>
          </button>

          <button
            onClick={handleShuffle}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Xáo trộn thẻ"
            aria-label="Xáo trộn thẻ"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Flashcard Display (Clean Book-like Reader Card) */}
      <div 
        onClick={() => setIsFlipped(prev => !prev)}
        className="min-h-[280px] p-6 sm:p-8 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex flex-col justify-between space-y-4"
      >
        {/* Top bar of card */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono font-semibold text-amber-400">
            {currentIndex + 1} / {filteredCards.length} • {currentCard.category}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">
              {isFlipped ? 'Đáp án' : 'Câu hỏi'}
            </span>
            <button
              onClick={(e) => handleToggleMaster(currentCard.id, e)}
              className="p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              title={isMastered ? 'Đã thuộc thẻ này' : 'Đánh dấu đã thuộc'}
              aria-label="Đánh dấu đã thuộc"
            >
              {isMastered ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Circle className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="space-y-3 py-2">
          {!isFlipped ? (
            <div className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
              {displayedQuestion}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-base sm:text-lg font-semibold text-amber-300 leading-relaxed">
                {displayedAnswer}
              </div>
              {displayedContext && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-2">
                  {displayedContext}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Card Footer Prompt */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Rotate3d className="w-3.5 h-3.5" />
            Nhấp để lật thẻ
          </span>
          <span className="font-mono text-slate-400">
            {currentCard.examKeyword}
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2 text-xs">
        <button
          onClick={handlePrev}
          className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          title="Thẻ trước"
          aria-label="Thẻ trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-slate-500 font-mono">
          Đã thuộc: <strong className="text-slate-300">{flashcardsMastered.filter(id => filteredCards.some(c => c.id === id)).length}</strong> / {filteredCards.length}
        </span>

        <button
          onClick={handleNext}
          className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          title="Thẻ tiếp theo"
          aria-label="Thẻ tiếp theo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
