import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { Type, Minus, Plus, RotateCcw, Sliders, Check } from 'lucide-react';

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
      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 shadow-sm">
        {/* Decrease Button */}
        <button
          onClick={decreaseFontSize}
          disabled={currentScale <= 100}
          className="p-1 sm:p-1.5 rounded-md hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
          title="Giảm cỡ chữ (A-)"
          aria-label="Giảm cỡ chữ"
        >
          <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>

        {/* Current Scale Display & Menu Trigger */}
        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className="px-1.5 sm:px-2 py-0.5 rounded text-[11px] sm:text-xs font-mono font-bold text-amber-400 hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
          title="Bấm để chọn nhanh cỡ chữ"
          aria-label="Chọn cỡ chữ"
        >
          <Type className="w-3 h-3 text-slate-400" />
          <span>{currentScale}%</span>
        </button>

        {/* Increase Button */}
        <button
          onClick={increaseFontSize}
          disabled={currentScale >= 220}
          className="p-1 sm:p-1.5 rounded-md hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
          title="Tăng cỡ chữ (A+)"
          aria-label="Tăng cỡ chữ"
        >
          <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>

      {/* Quick Presets Dropdown Menu */}
      {isOpenMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpenMenu(false)}
          />
          <div className="absolute top-full right-0 mt-1.5 z-50 w-48 bg-slate-900 border border-slate-700 rounded-xl p-2 shadow-2xl space-y-1 animate-fadeIn">
            <div className="flex items-center justify-between px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              <span className="flex items-center gap-1">
                <Sliders className="w-3 h-3 text-amber-400" />
                Cỡ chữ nội dung
              </span>
              <button
                onClick={() => {
                  resetFontSize();
                  setIsOpenMenu(false);
                }}
                className="text-slate-400 hover:text-amber-400 flex items-center gap-0.5 cursor-pointer text-[10px]"
                title="Đặt lại 100%"
              >
                <RotateCcw className="w-2.5 h-2.5" /> 100%
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
