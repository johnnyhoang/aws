import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';

interface FontSizeControlProps {
  compact?: boolean;
  className?: string;
}

const PRESET_SIZES = [
  { scale: 100, label: '100%', title: 'Chuẩn' },
  { scale: 120, label: '120%', title: 'Dễ đọc' },
  { scale: 140, label: '140%', title: 'Chữ lớn' },
  { scale: 165, label: '165%', title: 'To rõ' },
  { scale: 190, label: '190%', title: 'Cực đại' }
];

export const FontSizeControl: React.FC<FontSizeControlProps> = ({ compact = false, className = '' }) => {
  const { fontSizeScale, increaseFontSize, decreaseFontSize, resetFontSize, setFontSizeScale } = useLearning();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const currentScale = fontSizeScale || 100;

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Stepper Buttons */}
      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 shadow-sm text-xs">
        {/* Decrease Button */}
        <button
          onClick={decreaseFontSize}
          disabled={currentScale <= 100}
          className="px-2 py-1 rounded-md hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white font-mono font-bold transition-colors cursor-pointer"
          title="Giảm cỡ chữ"
          aria-label="Giảm cỡ chữ"
        >
          A-
        </button>

        {/* Current Scale Display & Menu Trigger */}
        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className="px-2 py-0.5 rounded font-mono font-bold text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
          title="Bấm để chọn nhanh cỡ chữ"
          aria-label="Chọn cỡ chữ"
        >
          {currentScale}%
        </button>

        {/* Increase Button */}
        <button
          onClick={increaseFontSize}
          disabled={currentScale >= 220}
          className="px-2 py-1 rounded-md hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white font-mono font-bold transition-colors cursor-pointer"
          title="Tăng cỡ chữ"
          aria-label="Tăng cỡ chữ"
        >
          A+
        </button>
      </div>

      {/* Quick Presets Dropdown Menu */}
      {isOpenMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpenMenu(false)}
          />
          <div className="absolute top-full right-0 mt-1.5 z-50 w-44 bg-slate-900 border border-slate-700 rounded-xl p-2 shadow-2xl space-y-1 animate-fadeIn">
            <div className="flex items-center justify-between px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              <span>Cỡ chữ</span>
              <button
                onClick={() => {
                  resetFontSize();
                  setIsOpenMenu(false);
                }}
                className="text-slate-400 hover:text-amber-400 cursor-pointer text-[10px] font-mono"
                title="Đặt lại 100%"
              >
                Reset
              </button>
            </div>

            <div className="space-y-0.5 pt-1">
              {PRESET_SIZES.map((preset) => {
                const isSelected = Math.abs(currentScale - preset.scale) <= 5;
                return (
                  <button
                    key={preset.scale}
                    onClick={() => {
                      setFontSizeScale(preset.scale);
                      setIsOpenMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{preset.title}</span>
                    <span className="font-mono text-[11px] text-slate-400">{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
