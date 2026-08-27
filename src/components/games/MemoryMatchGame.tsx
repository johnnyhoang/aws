import React, { useState, useEffect } from 'react';
import { MEMORY_CARD_PAIRS } from '../../data/gamesData';
import confetti from 'canvas-confetti';
import { RotateCcw, Award, BrainCircuit, CheckCircle2 } from 'lucide-react';

interface Props {
  isEn: boolean;
  gameLangMode: string;
  onGameWin: () => void;
}

interface MemoryCard {
  uid: string;
  pairId: string;
  text: string;
  type: 'service' | 'role';
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryMatchGame: React.FC<Props> = ({ isEn, gameLangMode, onGameWin }) => {
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [isMemoryWon, setIsMemoryWon] = useState<boolean>(false);
  const [pairCount, setPairCount] = useState<number>(6); // 6 or 8 pairs

  const initMemoryGame = (pairs = pairCount) => {
    const cards: MemoryCard[] = [];
    // Randomly pick unique pairs from the pool of 16 AWS services
    const randomizedPairs = [...MEMORY_CARD_PAIRS].sort(() => Math.random() - 0.5).slice(0, pairs);

    randomizedPairs.forEach((pair, idx) => {
      const roleText = (isEn || (gameLangMode === 'random' && idx % 2 === 1)) && pair.roleEn 
        ? pair.roleEn 
        : pair.role;

      cards.push({
        uid: `card-s-${idx}`,
        pairId: pair.id,
        text: pair.service,
        type: 'service',
        isFlipped: false,
        isMatched: false
      });
      cards.push({
        uid: `card-r-${idx}`,
        pairId: pair.id,
        text: roleText,
        type: 'role',
        isFlipped: false,
        isMatched: false
      });
    });

    const shuffled = cards.sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
    setFlippedIndices([]);
    setMovesCount(0);
    setIsMemoryWon(false);
  };

  useEffect(() => {
    initMemoryGame();
  }, [isEn, gameLangMode, pairCount]);

  const handleFlipCard = (index: number) => {
    if (flippedIndices.length >= 2 || memoryCards[index].isFlipped || memoryCards[index].isMatched) {
      return;
    }

    const newCards = [...memoryCards];
    newCards[index].isFlipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMovesCount(prev => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const card1 = newCards[firstIdx];
      const card2 = newCards[secondIdx];

      if (card1.pairId === card2.pairId) {
        setTimeout(() => {
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setMemoryCards([...newCards]);
          setFlippedIndices([]);

          if (newCards.every(c => c.isMatched)) {
            setIsMemoryWon(true);
            onGameWin();
            confetti({
              particleCount: 100,
              spread: 75,
              origin: { y: 0.6 }
            });
          }
        }, 500);
      } else {
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setMemoryCards([...newCards]);
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-700 p-5 md:p-8 space-y-6 shadow-2xl animate-fadeIn">
      
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            {isEn ? 'AWS Cloud Memory Match Arcade' : 'Trò Chơi Ghép Cặp Trí Nhớ (Memory Match)'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isEn ? 'Match each AWS Service with its core architecture responsibility.' : 'Lật mở và ghép đôi chính xác từng Dịch Vụ AWS với Định Nghĩa chuẩn của nó.'}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          {/* Pair Count Switcher */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setPairCount(6)}
              className={`px-2.5 py-1 rounded-lg transition-all ${pairCount === 6 ? 'bg-purple-600 text-white font-bold' : 'text-slate-400'}`}
            >
              6 {isEn ? 'Pairs' : 'Cặp'}
            </button>
            <button
              onClick={() => setPairCount(8)}
              className={`px-2.5 py-1 rounded-lg transition-all ${pairCount === 8 ? 'bg-purple-600 text-white font-bold' : 'text-slate-400'}`}
            >
              8 {isEn ? 'Pairs' : 'Cặp'}
            </button>
          </div>

          <span className="text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
            {isEn ? 'Moves:' : 'Lượt lật:'} {movesCount}
          </span>

          <button
            onClick={() => initMemoryGame()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isEn ? 'Reshuffle' : 'Trộn Lại'}</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {memoryCards.map((card, idx) => {
          return (
            <div
              key={card.uid}
              onClick={() => handleFlipCard(idx)}
              className={`min-h-[110px] md:min-h-[130px] p-3 md:p-4 rounded-2xl border cursor-pointer select-none transition-all duration-300 flex flex-col items-center justify-center text-center relative ${
                card.isMatched
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 shadow-md shadow-emerald-900/20'
                  : card.isFlipped
                  ? 'bg-purple-900/40 border-purple-400 text-purple-100 ring-2 ring-purple-500/30'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="space-y-1">
                  <span className={`text-[9.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    card.type === 'service' ? 'bg-sky-500/20 text-sky-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {card.type === 'service' ? (isEn ? 'AWS Service' : 'Tên Dịch Vụ') : (isEn ? 'Core Role' : 'Vai Trò Thực Tế')}
                  </span>
                  <p className={`text-xs md:text-sm font-bold leading-snug ${card.type === 'service' ? 'text-white text-sm md:text-base' : 'text-slate-200'}`}>
                    {card.text}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 text-slate-500">
                  <BrainCircuit className="w-5 h-5 opacity-60" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">AWS</span>
                </div>
              )}

              {card.isMatched && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute top-2 right-2" />
              )}
            </div>
          );
        })}
      </div>

      {isMemoryWon && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 to-emerald-950/60 border border-purple-500/50 text-center space-y-3 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto text-purple-300">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-white">
            {isEn ? '🎉 Congratulations! You Mastered All Pairs!' : '🎉 Bạn Đã Ghép Đôi Thành Công Tất Cả Các Thẻ!'}
          </h3>
          <p className="text-xs md:text-sm text-purple-200">
            {isEn ? `Completed in ${movesCount} moves with outstanding retention!` : `Hoàn thành trong ${movesCount} lượt lật thẻ. Trí nhớ về các dịch vụ AWS của bạn rất xuất sắc!`}
          </p>
          <button
            onClick={() => initMemoryGame()}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg transition-all"
          >
            {isEn ? 'Play Again' : 'Chơi Ván Mới'}
          </button>
        </div>
      )}

    </div>
  );
};
