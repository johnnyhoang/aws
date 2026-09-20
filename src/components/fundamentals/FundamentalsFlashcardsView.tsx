import React, { useState } from 'react';
import { FUNDAMENTAL_FLASHCARDS } from '../../data/fundamentals/flashcardsData';
import { FundamentalFlashcard } from '../../types/fundamentals';
import { shuffleArray } from '../../utils/shuffle';
import { 
  Rotate3d, 
  CheckCircle2, 
  Circle, 
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

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const currentCard = cards[currentIdx] || cards[0];
  const isCurrentMastered = masteredIds.includes(currentCard?.id);

  if (!currentCard) {
    return (
      <div className="py-12 text-center text-slate-500 text-sm">
        Không có thẻ nhớ phù hợp.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-slate-300">
      
      {/* Minimal Domain Filter */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'Tất Cả' },
            { id: 'networking_basics', label: 'Mạng' },
            { id: 'linux_basics', label: 'Linux' },
            { id: 'web_application', label: 'Web' },
            { id: 'security_basics', label: 'Bảo Mật' },
            { id: 'cloud_fundamentals', label: 'Cloud' },
            { id: 'git_scripting', label: 'Git & Bash' }
          ].map(d => (
            <button
              key={d.id}
              onClick={() => handleFilterChange(d.id)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedDomain === d.id
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleShuffle}
          className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer flex-shrink-0"
          title="Xáo trộn thẻ"
          aria-label="Xáo trộn thẻ"
        >
          <Shuffle className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Flashcard Display */}
      <div 
        onClick={() => setIsFlipped(prev => !prev)}
        className="min-h-[280px] p-6 sm:p-8 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex flex-col justify-between space-y-4"
      >
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono font-semibold text-amber-400">
            {currentIdx + 1} / {cards.length} • {currentCard.domainId.replace(/_/g, ' ')}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">
              {isFlipped ? 'Đáp án' : 'Thuật ngữ'}
            </span>
            <button
              onClick={(e) => toggleMastered(currentCard.id, e)}
              className="p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              title={isCurrentMastered ? 'Đã thuộc thẻ này' : 'Đánh dấu đã thuộc'}
              aria-label="Đánh dấu đã thuộc"
            >
              {isCurrentMastered ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Circle className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-3 py-2">
          {!isFlipped ? (
            <div className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
              {currentCard.term}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-base sm:text-lg font-semibold text-amber-300 leading-relaxed">
                {currentCard.definition}
              </div>
              {currentCard.realWorldUsage && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-2">
                  {currentCard.realWorldUsage}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Rotate3d className="w-3.5 h-3.5" />
            Nhấp để lật thẻ
          </span>
          <span className="font-mono text-slate-400">
            {currentCard.awsRelevance}
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2 text-xs">
        <button
          onClick={() => { setIsFlipped(false); setCurrentIdx(prev => Math.max(0, prev - 1)); }}
          disabled={currentIdx === 0}
          className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Thẻ trước"
          aria-label="Thẻ trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-slate-500 font-mono">
          Đã thuộc: <strong className="text-slate-300">{masteredIds.length}</strong> / {cards.length}
        </span>

        <button
          onClick={() => { setIsFlipped(false); setCurrentIdx(prev => Math.min(cards.length - 1, prev + 1)); }}
          disabled={currentIdx === cards.length - 1}
          className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Thẻ tiếp theo"
          aria-label="Thẻ tiếp theo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
