import React from 'react';
import { useLearning } from '../../context/LearningContext';
import { FUNDAMENTAL_MATURITY_LEVELS, calculateFundamentalLevel } from '../../data/fundamentals/maturityLevelsData';
import { X, CheckCircle2 } from 'lucide-react';

interface FundamentalsUserLevelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FundamentalsUserLevelModal: React.FC<FundamentalsUserLevelModalProps> = ({ isOpen, onClose }) => {
  const { userPoints, currentStreak, studyHoursLogged } = useLearning();

  if (!isOpen) return null;

  const currentLevel = calculateFundamentalLevel(userPoints);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl shadow-lg">
            {currentLevel.badge}
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              Cấp Độ Trưởng Thành IT Fundamentals
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Lv.{currentLevel.level} {currentLevel.title} ({currentLevel.titleEn})
            </h2>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-center">
            <span className="text-[11px] text-slate-500 block">Tổng điểm XP</span>
            <strong className="text-amber-400 text-lg font-mono">{userPoints} PTS</strong>
          </div>
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-center">
            <span className="text-[11px] text-slate-500 block">Chuỗi Streak</span>
            <strong className="text-orange-400 text-lg font-mono">{currentStreak}x 🔥</strong>
          </div>
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-center">
            <span className="text-[11px] text-slate-500 block">Giờ học tích lũy</span>
            <strong className="text-emerald-400 text-lg font-mono">{studyHoursLogged}h</strong>
          </div>
        </div>

        {/* XP Progress to Next Level */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold">Tiến độ lên cấp tiếp theo:</span>
            <span className="text-amber-300 font-mono font-bold">
              {currentLevel.currentXP} / {currentLevel.nextLevelXP} XP ({currentLevel.progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${currentLevel.progressPercent}%` }}
            />
          </div>
          {currentLevel.xpToNextLevel > 0 && (
            <p className="text-[11px] text-slate-400">
              Cần thêm <strong className="text-white font-mono">{currentLevel.xpToNextLevel} XP</strong> nữa để mở khóa cấp bậc tiếp theo.
            </p>
          )}
        </div>

        {/* 6 Levels Ladder */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 px-1">
            Bảng 6 Cấp Độ Trưởng Thành Kiến Thức
          </h3>
          <div className="space-y-2">
            {FUNDAMENTAL_MATURITY_LEVELS.map((lvl) => {
              const isCurrent = lvl.level === currentLevel.level;
              const isReached = currentLevel.level >= lvl.level;

              return (
                <div
                  key={lvl.level}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-md'
                      : isReached
                      ? 'bg-slate-950/80 border-slate-800/80 text-slate-300'
                      : 'bg-slate-950/30 border-slate-900 text-slate-600 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl">{lvl.badge}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          Lv.{lvl.level} {lvl.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ({lvl.minXP} - {lvl.maxXP === 99999 ? '∞' : lvl.maxXP} XP)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{lvl.maturityDescription}</p>
                    </div>
                  </div>

                  {isCurrent && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase flex-shrink-0">
                      Hiện Tại
                    </span>
                  )}
                  {isReached && !isCurrent && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
