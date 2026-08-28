import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  Glasses, 
  Plus, 
  Minus, 
  SlidersHorizontal,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface Props {
  onOpenModal: () => void;
}

export const ReadingModeFab: React.FC<Props> = ({ onOpenModal }) => {
  const { 
    fontSizeScale, 
    isReadingMode, 
    increaseFontSize, 
    decreaseFontSize 
  } = useLearning();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const currentScale = fontSizeScale || 100;
  const isScaled = currentScale > 100 || isReadingMode;

  return (
    <aside 
      aria-label="Điều khiển cỡ chữ và chế độ đọc"
      className="fixed bottom-5 right-4 md:bottom-8 md:right-8 z-40 flex flex-col items-end gap-2"
    >
      {/* Expanded Quick Controls */}
      {isExpanded && (
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl p-2.5 shadow-2xl space-y-2 animate-fadeIn text-slate-100 flex flex-col items-center">
          <div className="flex items-center gap-1">
            <button
              onClick={decreaseFontSize}
              disabled={currentScale <= 100}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center font-bold text-xs transition"
              title="Giảm cỡ chữ"
              aria-label="Giảm cỡ chữ"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <span className="font-mono font-bold text-xs text-amber-400 px-2 min-w-[44px] text-center">
              {currentScale}%
            </span>

            <button
              onClick={increaseFontSize}
              disabled={currentScale >= 220}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center font-bold text-xs transition"
              title="Tăng cỡ chữ"
              aria-label="Tăng cỡ chữ"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              setIsExpanded(false);
              onOpenModal();
            }}
            className="w-full py-1.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
          >
            <SlidersHorizontal className="w-3 h-3" /> Tùy Chỉnh Thêm
          </button>
        </div>
      )}

      {/* Main Floating Trigger Pill */}
      <div className="flex items-center bg-slate-900/95 backdrop-blur-md border border-slate-700 hover:border-amber-500/50 rounded-full shadow-2xl p-1 gap-1 transition-all group">
        <button
          onClick={onOpenModal}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-bold text-xs transition ${
            isScaled
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 hover:bg-amber-400'
              : 'bg-slate-800/90 text-slate-200 hover:text-white hover:bg-slate-700'
          }`}
          title="Mở bảng điều khiển Chế độ đọc chữ lớn"
          aria-label="Mở bảng điều khiển Chế độ đọc chữ lớn"
        >
          <Glasses className="w-4 h-4" />
          <span className="hidden sm:inline font-extrabold">Cỡ Chữ</span>
          <span className="font-mono font-black text-[11px]">
            {currentScale}%
          </span>
        </button>

        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          title={isExpanded ? 'Thu gọn' : 'Mở nhanh tăng/giảm cỡ chữ'}
          aria-label={isExpanded ? 'Thu gọn điều khiển nhanh' : 'Mở nhanh điều khiển cỡ chữ'}
        >
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>
    </aside>
  );
};
