import React from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  X, 
  Eye, 
  Sparkles, 
  RotateCcw, 
  Check, 
  Sliders, 
  Glasses,
  Plus,
  Minus
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_SIZES = [
  { scale: 100, label: '100%', title: 'Tiêu Chuẩn', desc: 'Cỡ chữ mặc định của hệ thống' },
  { scale: 120, label: '120%', title: 'Dễ Nhìn', desc: 'Rõ ràng hơn trên màn hình nhỏ' },
  { scale: 140, label: '140%', title: 'Chữ Lớn', desc: 'Đọc bài học không bị mỏi mắt' },
  { scale: 165, label: '165%', title: 'Người Lớn Tuổi', desc: 'Chữ to, khoảng cách thoáng cho mắt yếu' },
  { scale: 190, label: '190%', title: 'Cực Đại', desc: 'Kích thước tối đa, rất rõ nét' }
];

export const ReadingModeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { 
    fontSizeScale, 
    isReadingMode, 
    setFontSizeScale, 
    toggleReadingMode, 
    increaseFontSize, 
    decreaseFontSize, 
    resetFontSize 
  } = useLearning();

  if (!isOpen) return null;

  const currentScale = fontSizeScale || 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 md:p-8 text-slate-100 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          aria-label="Đóng bảng điều khiển"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-sky-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Glasses className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
              Chế Độ Đọc Chữ Lớn
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                {currentScale}%
              </span>
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Tùy chỉnh cỡ chữ & độ tương phản giúp người lớn tuổi đọc êm mắt, dễ dàng học trên điện thoại.
            </p>
          </div>
        </div>

        {/* Toggle Reading Mode Button */}
        <div className="bg-gradient-to-r from-amber-950/30 to-sky-950/30 border border-amber-500/30 rounded-2xl p-4 md:p-5 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm md:text-base font-bold text-white">
              <Eye className="w-4 h-4 text-amber-400" />
              Chế độ tương phản cao & giãn dòng thoáng
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tăng độ sáng của phông chữ, mở rộng khoảng cách dòng và tăng diện tích bấm nút để không bị bấm nhầm.
            </p>
          </div>
          <button
            onClick={toggleReadingMode}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition flex items-center gap-1.5 flex-shrink-0 ${
              isReadingMode 
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 hover:bg-amber-400' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
            }`}
          >
            {isReadingMode ? (
              <>
                <Check className="w-4 h-4" /> Đang Bật
              </>
            ) : (
              'Bật Ngay'
            )}
          </button>
        </div>

        {/* Font Size Quick Presets */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs md:text-sm font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-sky-400" />
              Chọn nhanh cỡ chữ phù hợp với mắt:
            </span>
            <button
              onClick={resetFontSize}
              className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" /> Đặt lại 100%
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {PRESET_SIZES.map((preset) => {
              const isSelected = Math.abs(currentScale - preset.scale) <= 5;
              return (
                <button
                  key={preset.scale}
                  onClick={() => setFontSizeScale(preset.scale)}
                  className={`text-left p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10 scale-[1.02]'
                      : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-white">{preset.title}</span>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      {preset.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    {preset.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Stepper & Slider */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 md:p-5 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs md:text-sm font-semibold text-slate-300">
              Tinh chỉnh chi tiết ({currentScale}%):
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseFontSize}
                disabled={currentScale <= 100}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold transition flex items-center gap-1 text-xs"
                aria-label="Giảm cỡ chữ"
              >
                <Minus className="w-4 h-4" /> A-
              </button>
              <span className="px-3 py-1 font-mono font-bold text-sm text-amber-400 bg-slate-900 rounded-lg border border-slate-700 min-w-[60px] text-center">
                {currentScale}%
              </span>
              <button
                onClick={increaseFontSize}
                disabled={currentScale >= 220}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold transition flex items-center gap-1 text-xs"
                aria-label="Tăng cỡ chữ"
              >
                <Plus className="w-4 h-4" /> A+
              </button>
            </div>
          </div>

          <input
            type="range"
            min="100"
            max="220"
            step="5"
            value={currentScale}
            onChange={(e) => setFontSizeScale(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>100% (Mặc định)</span>
            <span>150% (Lớn)</span>
            <span>220% (Cực đại)</span>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Xem trước nội dung hiển thị thực tế:
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <p className="font-bold text-white leading-snug">
              Amazon EC2 & VPC là nền tảng cốt lõi trong hạ tầng đám mây.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              VPC (Virtual Private Cloud) cho phép bạn khởi tạo các tài nguyên AWS trong một mạng ảo cô lập logic do bạn toàn quyền kiểm soát.
            </p>
          </div>
        </div>

        {/* Done Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" /> Hoàn Tất & Áp Dụng
          </button>
        </div>
      </div>
    </div>
  );
};