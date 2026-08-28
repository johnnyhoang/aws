import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { FLASHCARDS } from '../data/flashcardsData';
import confetti from 'canvas-confetti';
import { 
  BrainCircuit, 
  Rotate3d, 
  ArrowRight, 
  ArrowLeft, 
  Shuffle, 
  CheckCircle2, 
  Circle, 
  ShieldCheck,
  Zap,
  Languages
} from 'lucide-react';

import { fisherYatesShuffle } from '../utils/shuffle';

export const FlashcardsView: React.FC = () => {
  const { flashcardsMastered, toggleFlashcardMastered } = useLearning();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardsList, setCardsList] = useState(() => fisherYatesShuffle(FLASHCARDS));
  
  // Language mode: 'vi' | 'en' | 'random'
  const [languageMode, setLanguageMode] = useState<'vi' | 'en' | 'random'>('random');
  const [cardLangOverrides, setCardLangOverrides] = useState<Record<string, 'vi' | 'en'>>({});

  const categories = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'AWS Services', label: 'AWS Services' },
    { id: 'Security & IAM', label: 'Security & IAM' },
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
    const isMastered = flashcardsMastered.includes(cardId);
    toggleFlashcardMastered(cardId);
    if (!isMastered) {
      confetti({
        particleCount: 40,
        spread: 45,
        origin: { y: 0.6 }
      });
    }
  };

  const isCurrentMastered = currentCard ? flashcardsMastered.includes(currentCard.id) : false;

  const displayedTerm = (currentCardLang === 'en' && currentCard?.termEn) ? currentCard.termEn : currentCard?.term;
  const displayedDefinition = (currentCardLang === 'en' && currentCard?.definitionEn) ? currentCard.definitionEn : currentCard?.definition;
  const displayedUsage = (currentCardLang === 'en' && currentCard?.realWorldUsageEn) ? currentCard.realWorldUsageEn : currentCard?.realWorldUsage;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6 md:space-y-8 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            Ghi Nhớ Nhanh Thuật Ngữ AWS Song Ngữ (VI/EN)
          </div>
          <h1 className="text-xl md:text-3xl font-extrabold text-white">
            Flashcards Luyện Trí Nhớ 3D
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            Ôn tập nhanh các từ khóa "vàng" thường xuất hiện trong đề thi và các cuộc phỏng vấn.
          </p>
        </div>

        {/* Language Controls & Shuffle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Lang Selector */}
          <div className="bg-slate-900 p-0.5 rounded-xl border border-slate-800 flex items-center gap-0.5">
            <button
              onClick={() => setLanguageMode('vi')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                languageMode === 'vi' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇻🇳 VI
            </button>
            <button
              onClick={() => setLanguageMode('en')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                languageMode === 'en' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇺🇸 EN
            </button>
            <button
              onClick={() => setLanguageMode('random')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                languageMode === 'random' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Xáo trộn ngẫu nhiên câu tiếng Anh và tiếng Việt"
            >
              <Shuffle className="w-3 h-3" />
              <span>Xáo Trộn</span>
            </button>
          </div>

          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Trộn Thẻ</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Mastery Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span>Đã thuộc:</span>
          <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">
            {flashcardsMastered.length} / {cardsList.length} Thẻ
          </span>
        </div>
      </div>

      {/* 3D Flip Flashcard Main Area */}
      {currentCard && (
        <div className="space-y-6">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative min-h-[300px] md:min-h-[340px] w-full rounded-3xl cursor-pointer select-none perspective-1000 group"
          >
            <div className={`w-full h-full min-h-[300px] md:min-h-[340px] rounded-3xl p-6 md:p-10 border transition-all duration-500 shadow-2xl flex flex-col justify-between relative overflow-hidden ${
              isFlipped 
                ? 'bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border-purple-500/60 ring-2 ring-purple-500/20' 
                : 'bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border-slate-700 hover:border-purple-500/50'
            }`}>
              
              {/* Card Top Row */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-800/90 text-purple-300 border border-slate-700">
                  {currentCard.category}
                </span>

                <div className="flex items-center gap-2">
                  {/* Language switch on card */}
                  <button
                    onClick={toggleCardLang}
                    className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 hover:text-white"
                    title="Chuyển đổi ngôn ngữ của thẻ này"
                  >
                    <Languages className="w-3 h-3 text-amber-400" />
                    <span>{currentCardLang === 'vi' ? '🇻🇳 VI' : '🇺🇸 EN'}</span>
                  </button>

                  <button
                    onClick={(e) => handleToggleMaster(currentCard.id, e)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-xl border transition-colors ${
                      isCurrentMastered
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
                    }`}
                  >
                    {isCurrentMastered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Đã thuộc</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        <span>Đánh dấu đã thuộc</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card Body (Front / Back) */}
              <div className="py-6 space-y-4">
                {!isFlipped ? (
                  /* Front: Term & Question */
                  <div className="space-y-3 text-center my-auto">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      {currentCardLang === 'vi' ? 'Thuật Ngữ AWS' : 'AWS Cloud Term'}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                      {displayedTerm}
                    </h2>
                    <p className="text-xs text-purple-400/80 font-medium">
                      {currentCardLang === 'vi' ? 'Chạm vào thẻ để xem định nghĩa & ứng dụng thực tế' : 'Click / tap anywhere on card to flip'}
                    </p>
                  </div>
                ) : (
                  /* Back: Definition & Real-world Usage */
                  <div className="space-y-4 animate-fadeIn">
                    <div>
                      <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">
                        {currentCardLang === 'vi' ? 'Định nghĩa chuẩn:' : 'Official Definition:'}
                      </div>
                      <p className="text-sm md:text-base text-slate-100 leading-relaxed font-medium">
                        {displayedDefinition}
                      </p>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                      <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {currentCardLang === 'vi' ? 'Ứng Dụng Thực Tế (Higher-Ed IT):' : 'Real-World Campus IT Usage:'}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {displayedUsage}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Exam Keyword & Flip Hint */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px]">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Keyword: {currentCard.examKeyword}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500">
                  <Rotate3d className="w-4 h-4 text-purple-400 animate-spin-slow" />
                  <span>{isFlipped ? (currentCardLang === 'vi' ? 'Mặt sau' : 'Back') : (currentCardLang === 'vi' ? 'Mặt trước' : 'Front')}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Thẻ Trước</span>
            </button>

            <span className="text-xs font-mono font-bold text-slate-400">
              {currentIndex + 1} / {filteredCards.length}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-900/30 transition-all"
            >
              <span>Thẻ Tiếp Theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
