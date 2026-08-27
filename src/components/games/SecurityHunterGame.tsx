import React, { useState, useEffect } from 'react';
import { SECURITY_VULNERABILITIES } from '../../data/gamesData';
import confetti from 'canvas-confetti';
import { ShieldCheck, ShieldAlert, Award, RotateCcw, CheckCircle2, XCircle, Shuffle } from 'lucide-react';

interface Props {
  isEn: boolean;
  onGameWin: () => void;
}

export const SecurityHunterGame: React.FC<Props> = ({ isEn, onGameWin }) => {
  const [selectedRemediations, setSelectedRemediations] = useState<Record<string, string>>({});
  
  // Shuffled choices per vulnerability: { [vulnId]: choices[] }
  const [shuffledVulnChoices, setShuffledVulnChoices] = useState<Record<string, typeof SECURITY_VULNERABILITIES[0]['remediationChoices']>>({});

  const shuffleSecurityChoices = () => {
    const map: Record<string, typeof SECURITY_VULNERABILITIES[0]['remediationChoices']> = {};
    SECURITY_VULNERABILITIES.forEach(vuln => {
      const opts = [...vuln.remediationChoices];
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      map[vuln.id] = opts;
    });
    setShuffledVulnChoices(map);
  };

  useEffect(() => {
    shuffleSecurityChoices();
  }, []);

  const handleSelectRemediation = (vulnId: string, choiceId: string) => {
    const vuln = SECURITY_VULNERABILITIES.find(v => v.id === vulnId);
    const choice = vuln?.remediationChoices.find(c => c.id === choiceId);
    
    const nextSelections = {
      ...selectedRemediations,
      [vulnId]: choiceId
    };
    setSelectedRemediations(nextSelections);

    if (choice?.isCorrect) {
      confetti({
        particleCount: 25,
        spread: 35,
        origin: { y: 0.6 }
      });
    }

    // Check if all correct
    const allRemediated = SECURITY_VULNERABILITIES.every(v => {
      const selId = nextSelections[v.id];
      const ch = v.remediationChoices.find(c => c.id === selId);
      return ch?.isCorrect;
    });

    if (allRemediated) {
      onGameWin();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 }
      });
    }
  };

  const handleReset = () => {
    setSelectedRemediations({});
    shuffleSecurityChoices();
  };

  // Calculate Security Posture Score
  let currentScore = 0;
  let correctCount = 0;
  SECURITY_VULNERABILITIES.forEach(v => {
    const selId = selectedRemediations[v.id];
    const ch = v.remediationChoices.find(c => c.id === selId);
    if (ch?.isCorrect) {
      currentScore += v.points;
      correctCount++;
    }
  });

  const isPerfectScore = currentScore === 100;

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-700 p-5 md:p-8 space-y-6 shadow-2xl animate-fadeIn">
      
      {/* Header & Security Posture Score */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
            <ShieldAlert className="w-4 h-4" />
            <span>{isEn ? 'AWS CLOUD SECURITY POSTURE & AUDIT HUNTER' : 'THỢ SĂN LỖ HỔNG BẢO MẬT AWS (SECURITY AUDIT)'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            {isEn ? 'Scan & Remediate Critical Campus Misconfigurations' : 'Dò Tìm & Chọn Phương Án Vá Lỗ Hổng Bảo Mật'}
          </h2>
          <p className="text-xs text-slate-400">
            {isEn ? 'Diagnose each security vulnerability and choose the correct AWS hardening best practice.' : 'Đọc phân tích lỗ hổng và chọn đúng biện pháp khắc phục chuẩn AWS để đạt 100/100 điểm an toàn.'}
          </p>
        </div>

        {/* Live Security Score Card */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4 min-w-[200px]">
          <ShieldCheck className={`w-8 h-8 ${isPerfectScore ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`} />
          <div>
            <span className="text-[11px] text-slate-400 font-semibold">{isEn ? 'Security Score:' : 'Điểm An Toàn:'}</span>
            <div className={`text-2xl font-black font-mono ${isPerfectScore ? 'text-emerald-400' : currentScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
              {currentScore} / 100
            </div>
            <span className="text-[10px] text-slate-500">
              {correctCount}/{SECURITY_VULNERABILITIES.length} {isEn ? 'Vulnerabilities Secured' : 'Lỗ hổng đã vá'}
            </span>
          </div>
        </div>
      </div>

      {/* Vulnerabilities Checklist & Interactive Choices */}
      <div className="space-y-4">
        {SECURITY_VULNERABILITIES.map((vuln) => {
          const selectedChoiceId = selectedRemediations[vuln.id];
          const selectedChoice = vuln.remediationChoices.find(c => c.id === selectedChoiceId);
          const choicesToRender = shuffledVulnChoices[vuln.id] || vuln.remediationChoices;

          return (
            <div
              key={vuln.id}
              className={`p-4 md:p-5 rounded-2xl border transition-all space-y-3 ${
                selectedChoice?.isCorrect 
                  ? 'bg-emerald-950/20 border-emerald-500/40' 
                  : selectedChoice && !selectedChoice.isCorrect
                  ? 'bg-red-950/20 border-red-500/40'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    vuln.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                    vuln.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  }`}>
                    {vuln.severity}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {vuln.resourceType}: <strong className="text-white">{vuln.resourceName}</strong>
                  </span>
                </div>

                <span className="text-xs font-mono text-emerald-400 font-bold self-start sm:self-auto">
                  +{vuln.points} pts
                </span>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {isEn ? vuln.descriptionEn : vuln.description}
              </p>

              {/* Remediation Choices (Dynamically Shuffled) */}
              <div className="pt-2 border-t border-slate-850 space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {isEn ? 'Choose Remediation Action:' : 'Chọn Biện Pháp Vá Lỗ Hổng:'}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {choicesToRender.map((choice, optIdx) => {
                    const isSelected = selectedChoiceId === choice.id;
                    const letterLabel = ['A', 'B', 'C', 'D'][optIdx] || choice.id;

                    let btnStyle = 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300';
                    if (isSelected) {
                      btnStyle = choice.isCorrect
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                        : 'bg-red-950/40 border-red-500 text-red-200 ring-1 ring-red-500';
                    }

                    return (
                      <div
                        key={choice.id}
                        onClick={() => handleSelectRemediation(vuln.id, choice.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-950 border border-slate-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                          {letterLabel}
                        </span>
                        <div className="space-y-1">
                          <p className="leading-snug">{isEn ? choice.textEn : choice.text}</p>
                          {isSelected && (
                            <p className="text-[11px] font-semibold pt-1 border-t border-slate-800/80">
                              {isEn ? choice.feedbackEn : choice.feedback}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <span className="text-xs text-slate-400">
          {isEn ? 'Audited:' : 'Đã kiểm thử:'} {Object.keys(selectedRemediations).length}/{SECURITY_VULNERABILITIES.length}
        </span>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition-all shadow-md"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>{isEn ? 'Reset & Shuffle Options' : 'Làm Lại & Xáo Lại Đáp Án'}</span>
        </button>
      </div>

      {/* 100% Score Victory Alert */}
      {isPerfectScore && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-sky-950/60 border border-emerald-500/50 text-center space-y-2 shadow-xl">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-white">
            {isEn ? '🎉 100/100 Perfect Security Score! Zero Vulnerabilities!' : '🎉 100/100 Điểm Bảo Mật Tuyệt Đối! Hệ Thống Đã Được Bảo Vệ 100%!'}
          </h3>
          <p className="text-xs text-emerald-200">
            {isEn ? 'You successfully hardened the university AWS environment adhering to CIS AWS Foundations Benchmark.' : 'Bạn đã chọn đúng toàn bộ biện pháp khắc phục theo chuẩn CIS AWS Benchmark và bảo vệ an toàn 100% hạ tầng trường học!'}
          </p>
        </div>
      )}

    </div>
  );
};
