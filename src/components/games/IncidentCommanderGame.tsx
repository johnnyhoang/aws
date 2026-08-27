import React, { useState } from 'react';
import { INCIDENT_SCENARIOS } from '../../data/gamesData';
import confetti from 'canvas-confetti';
import { ShieldAlert, Heart, ChevronRight, ShieldCheck } from 'lucide-react';

interface Props {
  isEn: boolean;
  onGameWin: () => void;
}

export const IncidentCommanderGame: React.FC<Props> = ({ isEn, onGameWin }) => {
  const [currentIncIdx, setCurrentIncIdx] = useState<number>(0);
  const [uptimeScore, setUptimeScore] = useState<number>(100);
  const [selectedIncChoice, setSelectedIncChoice] = useState<string | null>(null);
  const [isIncAnswered, setIsIncAnswered] = useState<boolean>(false);
  const [isIncidentGameOver, setIsIncidentGameOver] = useState<boolean>(false);

  const activeIncident = INCIDENT_SCENARIOS[currentIncIdx] || INCIDENT_SCENARIOS[0];

  const handleChooseIncidentAction = (choiceId: string) => {
    if (isIncAnswered) return;
    const choice = activeIncident.choices.find(c => c.id === choiceId);
    if (!choice) return;

    setSelectedIncChoice(choiceId);
    setIsIncAnswered(true);

    const newScore = Math.max(0, Math.min(100, uptimeScore + choice.uptimeImpact));
    setUptimeScore(newScore);

    if (choice.isCorrect) {
      confetti({
        particleCount: 45,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNextIncident = () => {
    if (currentIncIdx < INCIDENT_SCENARIOS.length - 1) {
      setCurrentIncIdx(prev => prev + 1);
      setSelectedIncChoice(null);
      setIsIncAnswered(false);
    } else {
      setIsIncidentGameOver(true);
      if (uptimeScore >= 70) {
        onGameWin();
      }
    }
  };

  const handleResetIncident = () => {
    setCurrentIncIdx(0);
    setUptimeScore(100);
    setSelectedIncChoice(null);
    setIsIncAnswered(false);
    setIsIncidentGameOver(false);
  };

  const incTitle = (isEn && activeIncident.titleEn) ? activeIncident.titleEn : activeIncident.title;
  const incDescription = (isEn && activeIncident.descriptionEn) ? activeIncident.descriptionEn : activeIncident.description;

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-700 p-5 md:p-8 space-y-6 shadow-2xl animate-fadeIn">
      
      {/* Uptime & Score Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>{isEn ? 'CAMPUS CLOUD INCIDENT COMMAND ROOM' : 'PHÒNG CHỈ HUY SỰ CỐ IT ĐẠI HỌC'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1">
            {isEn ? 'Incident' : 'Tình Huống'} {currentIncIdx + 1} / {INCIDENT_SCENARIOS.length}
          </h2>
        </div>

        {/* Health / Uptime Bar */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-3 min-w-[200px]">
          <Heart className={`w-5 h-5 ${uptimeScore > 50 ? 'text-emerald-400' : 'text-red-500 animate-bounce'}`} />
          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-slate-400">{isEn ? 'System Uptime:' : 'Độ Khả Dụng (Uptime):'}</span>
              <span className={uptimeScore >= 80 ? 'text-emerald-400' : uptimeScore >= 50 ? 'text-amber-400' : 'text-red-400'}>
                {uptimeScore}%
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  uptimeScore >= 80 ? 'bg-emerald-500' : uptimeScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${uptimeScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {!isIncidentGameOver ? (
        <div className="space-y-6">
          {/* Incident Alert Box */}
          <div className="bg-slate-950 p-4 md:p-5 rounded-2xl border border-rose-500/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-amber-400">{activeIncident.time}</span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                {activeIncident.alertType}
              </span>
            </div>
            <h3 className="font-black text-white text-base md:text-lg">
              {incTitle}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-1">
              {incDescription}
            </p>
          </div>

          {/* Action Choices */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isEn ? 'Select Your Incident Response Action:' : 'Chọn Phương Án Xử Lý Của Bạn:'}
            </div>
            <div className="space-y-2.5">
              {activeIncident.choices.map((choice) => {
                const isSelected = selectedIncChoice === choice.id;
                const actionText = (isEn && choice.actionEn) ? choice.actionEn : choice.action;
                const explanationText = (isEn && choice.explanationEn) ? choice.explanationEn : choice.explanation;

                let btnStyle = 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-200';
                if (isIncAnswered) {
                  if (choice.isCorrect) {
                    btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected && !choice.isCorrect) {
                    btnStyle = 'bg-red-950/40 border-red-500 text-red-200';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-800 text-slate-600 opacity-50';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                }

                return (
                  <div
                    key={choice.id}
                    onClick={() => handleChooseIncidentAction(choice.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {choice.id}
                    </span>
                    <div className="space-y-1">
                      <p className="text-xs md:text-sm leading-relaxed">{actionText}</p>
                      {isIncAnswered && (
                        <p className="text-xs pt-1 border-t border-slate-800/60">{explanationText}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Incident Action */}
          {isIncAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextIncident}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-900/30 transition-all flex items-center gap-1.5"
              >
                <span>{currentIncIdx < INCIDENT_SCENARIOS.length - 1 ? (isEn ? 'Handle Next Incident' : 'Xử Lý Sự Cố Tiếp Theo') : (isEn ? 'View Incident Report' : 'Xem Báo Cáo Ca Trực')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Victory / Game Over */
        <div className="p-8 text-center space-y-5">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
            uptimeScore >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {uptimeScore >= 70 ? <ShieldCheck className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white">
              {uptimeScore >= 70 
                ? (isEn ? '🎉 On-Call Shift Succeeded Flawlessly!' : '🎉 Ca Trực Thành Công Xuất Sắc!') 
                : (isEn ? '💥 Critical Campus Outage!' : '💥 Hệ Thống Bị Gián Đoạn Nghiêm Trọng!')}
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              {uptimeScore >= 70 
                ? (isEn ? `You defended the system with ${uptimeScore}% Uptime. Senior Cloud Architect tier!` : `Bạn đã bảo vệ thành công hệ thống với tỷ lệ Uptime đạt ${uptimeScore}%. Bạn xứng đáng là Kỹ Sư Trưởng IT!`) 
                : (isEn ? `Uptime dropped to ${uptimeScore}%. Review Deep Dive architectures to react faster next time!` : `Tỷ lệ Uptime tụt xuống ${uptimeScore}%. Hãy ôn lại kiến thức để phản ứng nhanh hơn trong ca trực tới!`)}
            </p>
          </div>

          <button
            onClick={handleResetIncident}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg transition-all"
          >
            {isEn ? 'Start New On-Call Shift' : 'Nhận Ca Trực Mới'}
          </button>
        </div>
      )}

    </div>
  );
};
