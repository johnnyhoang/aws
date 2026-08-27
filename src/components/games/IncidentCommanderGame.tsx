import React, { useState, useEffect } from 'react';
import { INCIDENT_SCENARIOS } from '../../data/gamesData';
import confetti from 'canvas-confetti';
import { ShieldAlert, Heart, ChevronRight, ShieldCheck, RotateCcw, Shuffle, AlertTriangle } from 'lucide-react';
import { fisherYatesShuffle } from '../../utils/shuffle';

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
  
  // Shuffled choices for each scenario
  const [shuffledChoices, setShuffledChoices] = useState<typeof INCIDENT_SCENARIOS[0]['choices']>([]);

  const activeIncident = INCIDENT_SCENARIOS[currentIncIdx] || INCIDENT_SCENARIOS[0];

  // Shuffle choices when activeIncident changes using Fisher-Yates
  const shuffleIncidentChoices = (incident = activeIncident) => {
    setShuffledChoices(fisherYatesShuffle(incident.choices));
  };

  useEffect(() => {
    shuffleIncidentChoices(activeIncident);
  }, [currentIncIdx]);

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
    shuffleIncidentChoices(INCIDENT_SCENARIOS[0]);
  };

  const incTitle = (isEn && activeIncident.titleEn) ? activeIncident.titleEn : activeIncident.title;
  const incDescription = (isEn && activeIncident.descriptionEn) ? activeIncident.descriptionEn : activeIncident.description;
  const choicesToRender = shuffledChoices.length > 0 ? shuffledChoices : activeIncident.choices;

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
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">
              {incTitle}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {incDescription}
            </p>
          </div>

          {/* Action Decisions (Dynamically Shuffled) */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isEn ? 'Command Decision Options:' : 'Phương Án Xử Lý Khẩn Cấp:'}
            </div>

            <div className="space-y-2.5">
              {choicesToRender.map((choice) => {
                const isSelected = selectedIncChoice === choice.id;
                const choiceText = (isEn && choice.actionEn) ? choice.actionEn : choice.action;
                const feedbackText = (isEn && choice.explanationEn) ? choice.explanationEn : choice.explanation;

                let cardStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';
                if (isIncAnswered) {
                  if (choice.isCorrect) {
                    cardStyle = 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200';
                  } else if (isSelected && !choice.isCorrect) {
                    cardStyle = 'bg-red-950/30 border-red-500/50 text-red-200';
                  } else {
                    cardStyle = 'bg-slate-950/40 border-slate-850 text-slate-500 opacity-50';
                  }
                }

                return (
                  <div
                    key={choice.id}
                    onClick={() => handleChooseIncidentAction(choice.id)}
                    className={`p-4 rounded-2xl border text-xs md:text-sm cursor-pointer transition-all space-y-2 ${cardStyle}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="leading-relaxed font-medium">{choiceText}</p>
                      {isIncAnswered && (
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                          choice.uptimeImpact >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {choice.uptimeImpact >= 0 ? `+${choice.uptimeImpact}%` : `${choice.uptimeImpact}%`}
                        </span>
                      )}
                    </div>

                    {isIncAnswered && isSelected && (
                      <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                        {feedbackText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          {isIncAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextIncident}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all animate-fadeIn"
              >
                <span>{currentIncIdx < INCIDENT_SCENARIOS.length - 1 ? (isEn ? 'Next Incident' : 'Sự Cố Tiếp Theo') : (isEn ? 'View Shift Summary' : 'Tổng Kết Ca Trực')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Summary Screen */
        <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 text-center space-y-5">
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
            uptimeScore >= 70 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {uptimeScore >= 70 ? <ShieldCheck className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-black text-white">
              {uptimeScore >= 70 
                ? (isEn ? 'Shift Completed Successfully!' : 'Ca Trực Hoàn Thành Xuất Sắc!')
                : (isEn ? 'System Outage - SLA Breached!' : 'Hệ Thống Bị Sập - Vi Phạm Cam Kết SLA!')}
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              {isEn ? 'Final System Uptime Score:' : 'Điểm khả dụng toàn hệ thống đạt:'} <strong className="text-white font-mono text-base">{uptimeScore}%</strong>
            </p>
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            {uptimeScore >= 70 
              ? (isEn ? 'You successfully protected the campus LMS and student registration infrastructure through critical outages.' : 'Bạn đã bảo vệ thành công cổng đăng ký tín chỉ của trường đại học không bị gián đoạn giờ cao điểm!')
              : (isEn ? 'Too many suboptimal decisions caused major outages. Review the AWS incident post-mortem tips and try again.' : 'Các quyết định chưa tối ưu đã khiến hệ thống trường học bị sập quá thời gian cho phép. Hãy làm lại ca trực nhé!')}
          </p>

          <button
            onClick={handleResetIncident}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isEn ? 'Take Another On-Call Shift' : 'Nhận Ca Trực Mới'}</span>
          </button>
        </div>
      )}

    </div>
  );
};
