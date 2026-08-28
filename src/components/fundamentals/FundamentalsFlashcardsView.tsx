import React, { useState } from 'react';
import { FUNDAMENTAL_FLASHCARDS } from '../../data/fundamentals/flashcardsData';
import { FundamentalFlashcard } from '../../types/fundamentals';
import { shuffleArray } from '../../utils/shuffle';
import { 
  BrainCircuit, 
  RotateCw, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Filter, 
  Shuffle, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

export const FundamentalsFlashcardsView: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [cards, setCards] = useState<FundamentalFlashcard[]>(FUNDAMENTAL_FLASHCARDS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const handleFilterChange = (domain: string) => {
    setSelectedDomain(domain);
    let filtered = FUNDAMENTAL_FLASHCARDS;
    if (domain !== 'all') {
      filtered = FUNDAMENTAL_FLASHCARDS.filter(c => c.domainId === domain);
    }
    setCards(filtered);
    setCurrentIdx(0);
    setIsFlipped(false);
  };

  const handleShuffle = () => {
    setCards(shuffleArray(cards));
    setCurrentIdx(0);
    setIsFlipped(false);
  };

  const toggleMastered = (id: string) => {
    setMasteredIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const currentCard = cards[currentIdx] || cards[0];
  const isCurrentMastered = masteredIds.includes(currentCard?.id);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white">
              Thẻ Ghi Nhớ Nền Tảng (Flashcards)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Lật thẻ 3D ghi nhớ thuật ngữ then chốt, ứng dụng thực tế & liên hệ AWS Cloud
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Đảo Thẻ Ngẫu Nhiên
          </button>
        </div>
      </div>

      {/* Domain Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
        {['all', 'computer_fundamentals', 'internet_fundamentals', 'networking_basics', 'linux_basics', 'web_application', 'security_basics', 'cloud_fundamentals', 'git_scripting'].map(d => (
          <button
            key={d}
            onClick={() => handleFilterChange(d)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedDomain === d
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {d === 'all' ? `Tất cả (${FUNDAMENTAL_FLASHCARDS.length})` : d.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Progress Stats */}
      <div className="flex justify-between items-center text-xs text-slate-400 px-1">
        <span>Thẻ {currentIdx + 1} / {cards.length}</span>
        <span className="text-emerald-400 font-semibold">
          Đã thuộc: {masteredIds.filter(id => cards.some(c => c.id === id)).length} / {cards.length}
        </span>
      </div>

      {/* Flashcard 3D Flip Container */}
      {currentCard && (
        <div
          onClick={() => setIsFlipped(prev => !prev)}
          className="min-h-[300px] sm:min-h-[340px] bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group select-none"
        >
          {/* Card Top Header */}
          <div className="flex justify-between items-center text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold uppercase tracking-wider text-[10px]">
              {currentCard.category}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMastered(currentCard.id);
              }}
              className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-lg border transition-all ${
                isCurrentMastered
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isCurrentMastered ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
              <span>{isCurrentMastered ? 'Đã Thuộc' : 'Đánh dấu thuộc'}</span>
            </button>
          </div>

          {/* Front / Back View */}
          {!isFlipped ? (
            <div className="text-center py-8 space-y-3 my-auto animate-fadeIn">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-500 block">
                Thuật ngữ then chốt
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white text-purple-200">
                {currentCard.term}
              </h3>
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1 pt-2">
                <RotateCw className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '4s' }} />
                Nhấp chuột vào thẻ để xem định nghĩa & liên hệ AWS
              </p>
            </div>
          ) : (
            <div className="space-y-4 py-4 my-auto animate-fadeIn text-left">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-purple-400 block mb-1">
                  Định nghĩa cốt lõi:
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                  {currentCard.definition}
                </p>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs text-slate-300">
                <strong className="text-sky-300 block mb-0.5">Ứng dụng thực tế:</strong>
                {currentCard.realWorldUsage}
              </div>

              <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-xs text-amber-200">
                <strong className="text-amber-300 flex items-center gap-1 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5" /> Liên hệ AWS Cloud:
                </strong>
                {currentCard.awsRelevance}
              </div>
            </div>
          )}

          {/* Card Footer */}
          <div className="flex justify-between items-center text-[11px] text-slate-500 pt-3 border-t border-slate-800/80">
            <span>Độ khó: <strong className="text-slate-300">{currentCard.difficulty}</strong></span>
            <span className="italic">Nhấp để lật mặt</span>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            setCurrentIdx(prev => Math.max(0, prev - 1));
            setIsFlipped(false);
          }}
          disabled={currentIdx === 0}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Thẻ Trước
        </button>

        <button
          onClick={() => {
            setCurrentIdx(prev => Math.min(cards.length - 1, prev + 1));
            setIsFlipped(false);
          }}
          disabled={currentIdx === cards.length - 1}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-purple-600/20"
        >
          Thẻ Kế Tiếp <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
