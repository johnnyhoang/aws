import React from 'react';
import { useLearning } from '../context/LearningContext';
import { AWS_MATURITY_LEVELS } from '../data/maturityLevels';
import { 
  X, 
  Flame, 
  Zap, 
  ShieldCheck, 
  HelpCircle, 
  TrendingUp,
  Coins
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const UserLevelModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { 
    levelInfo, 
    userPoints, 
    currentStreak, 
    highestStreak, 
    totalCorrectAnswers, 
    totalIncorrectAnswers 
  } = useLearning();

  if (!isOpen) return null;

  const totalAttempted = totalCorrectAnswers + totalIncorrectAnswers;
  const accuracyRate = totalAttempted > 0 
    ? Math.round((totalCorrectAnswers / totalAttempted) * 100) 
    : 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 md:p-8 text-slate-100 relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Level Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-slate-900 p-5 rounded-2xl border border-amber-500/30">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl shadow-inner flex-shrink-0">
            {levelInfo.badge}
          </div>

          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded bg-amber-500 text-slate-950">
                LEVEL {levelInfo.level}
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">
                {levelInfo.currentXP} XP
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-white truncate">
              {levelInfo.title}
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              {levelInfo.maturityDescription}
            </p>
          </div>
        </div>

        {/* Progress Bar to Next Level */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">Tiến trình lên Level {levelInfo.level + 1}:</span>
            <span className="text-amber-400 font-mono">
              {levelInfo.progressPercent}% ({levelInfo.xpToNextLevel > 0 ? `Còn ${levelInfo.xpToNextLevel} XP` : 'Đã đạt cấp tối đa'})
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div 
              className="h-2.5 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500 shadow-md"
              style={{ width: `${levelInfo.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Player Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1">
            <div className="flex items-center justify-center text-amber-400">
              <Coins className="w-4 h-4" />
            </div>
            <div className="text-lg font-black text-white font-mono">{userPoints}</div>
            <div className="text-[11px] text-slate-400 font-medium">Điểm Xếp Hạng</div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1">
            <div className="flex items-center justify-center text-orange-400">
              <Flame className="w-4 h-4 animate-bounce" />
            </div>
            <div className="text-lg font-black text-orange-400 font-mono">{currentStreak}x</div>
            <div className="text-[11px] text-slate-400 font-medium">Chuỗi Đúng Liên Tiếp</div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1">
            <div className="flex items-center justify-center text-purple-400">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-lg font-black text-white font-mono">{highestStreak}x</div>
            <div className="text-[11px] text-slate-400 font-medium">Chuỗi Cao Nhất</div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1">
            <div className="flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-lg font-black text-emerald-400 font-mono">{accuracyRate}%</div>
            <div className="text-[11px] text-slate-400 font-medium">Tỷ Lệ Chính Xác</div>
          </div>
        </div>

        {/* How XP and Penalties Work */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Cơ Chế Tính Điểm, Kinh Nghiệm & Trừ Phạt Hợp Lý:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 space-y-1">
              <strong>✅ Trả Lời Đúng & Hoàn Thành:</strong>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Nhận +15 đến +60 XP & Điểm theo độ khó. Chuỗi đúng &ge; 3x nhận thêm thưởng Bonus Multiplier.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/30 text-red-300 space-y-1">
              <strong>❌ Khi Trả Lời Sai:</strong>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Trừ -5 đến -20 Điểm xếp hạng, <strong>không tăng kinh nghiệm (0 XP)</strong> và chuỗi đúng bị reset về 0.
              </p>
            </div>
          </div>
        </div>

        {/* 8 AWS Cloud Maturity Levels Ladder */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Thang Cấp Độ Trưởng Thành Đám Mây (AWS Maturity Ladder)</span>
          </h3>

          <div className="space-y-2">
            {AWS_MATURITY_LEVELS.map((lvl) => {
              const isCurrent = lvl.level === levelInfo.level;
              const isUnlocked = levelInfo.level >= lvl.level;

              return (
                <div
                  key={lvl.level}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs ${
                    isCurrent 
                      ? 'bg-amber-500/15 border-amber-500 ring-1 ring-amber-500 text-white font-bold' 
                      : isUnlocked 
                      ? 'bg-slate-950 border-slate-800 text-slate-300' 
                      : 'bg-slate-950/40 border-slate-850 text-slate-600 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{lvl.badge}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-white">Lv.{lvl.level} - {lvl.title}</strong>
                        {isCurrent && (
                          <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-black">
                            HIỆN TẠI
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{lvl.maturityDescription}</p>
                    </div>
                  </div>

                  <span className="font-mono text-slate-400 flex-shrink-0 text-[11px]">
                    {lvl.minXP} XP
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
