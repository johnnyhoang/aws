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
  Sparkles,
  ShieldCheck,
  Zap,
  GraduationCap
} from 'lucide-react';

export const FlashcardsView: React.FC = () => {
  const { flashcardsMastered, toggleFlashcardMastered } = useLearning();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardsList, setCardsList] = useState(FLASHCARDS);

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
    const shuffled = [...cardsList].sort(() => Math.random() - 0.5);
    setCardsList(shuffled);
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            Ghi Nhớ Nhanh Thuật Ngữ AWS & IT Đại Học Mỹ
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Flashcards Luyện Trí Nhớ
          </h1>
          <p className="text-sm text-slate-400">
            Ôn tập nhanh các từ khóa "vàng" thường xuất hiện trong đề thi và các cuộc phỏng vấn.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-400" />
            <span>Trộn Thẻ</span>
          </button>
          <div className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-2 rounded-xl border border-amber-500/20">
            Đã thuộc: {flashcardsMastered.length}/{FLASHCARDS.length}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Interactive 3D Flip Flashcard */}
      {currentCard && (
        <div className="space-y-6">
          
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[320px] md:min-h-[360px] rounded-3xl p-8 border cursor-pointer select-none transition-all duration-300 relative flex flex-col justify-between shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 hover:border-slate-600"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-sky-400 border border-slate-700">
                {currentCard.category}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleToggleMaster(currentCard.id, e)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg border transition-colors ${
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
                      <span>Chưa thuộc</span>
                    </>
                  )}
                </button>

                <div className="text-xs text-slate-400 font-medium">
                  {currentIndex + 1} / {filteredCards.length}
                </div>
              </div>
            </div>

            {/* Card Content (Front vs Back) */}
            <div className="py-6 my-auto text-center space-y-4">
              {!isFlipped ? (
                /* Card Front */
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Thuật ngữ / Khái niệm
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                    {currentCard.term}
                  </h3>
                  <div className="text-xs text-amber-400/80 font-medium flex items-center justify-center gap-1.5 pt-4">
                    <Rotate3d className="w-4 h-4 animate-spin" />
                    <span>Nhấn vào thẻ để lật xem định nghĩa & ứng dụng thực tế</span>
                  </div>
                </div>
              ) : (
                /* Card Back */
                <div className="text-left space-y-4 max-w-2xl mx-auto">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Định nghĩa cốt lõi:</span>
                    <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
                      {currentCard.definition}
                    </p>
                  </div>

                  <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 space-y-1">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Ứng dụng tại Đại học Mỹ:
                    </span>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      {currentCard.realWorldUsage}
                    </p>
                  </div>

                  <div className="bg-purple-950/20 p-3 rounded-xl border border-purple-500/30 text-xs text-purple-200">
                    <strong className="text-purple-300">Từ khóa trong đề thi:</strong> {currentCard.examKeyword}
                  </div>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800/80">
              <span>Thẻ {currentIndex + 1} của {filteredCards.length}</span>
              <span className="text-slate-400">Nhấn lật thẻ: {!isFlipped ? 'Mặt trước' : 'Mặt sau'}</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Thẻ Trước</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all"
            >
              <Rotate3d className="w-4 h-4" />
              <span>{isFlipped ? 'Lật Lại Mặt Trước' : 'Lật Xem Đáp Án'}</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-800 transition-colors"
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
