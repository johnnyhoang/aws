import React, { useState } from 'react';
import { SECURITY_VULNERABILITIES } from '../../data/gamesData';
import confetti from 'canvas-confetti';
import { ShieldCheck, ShieldAlert, Award, RotateCcw, Wrench, CheckCircle2 } from 'lucide-react';

interface Props {
  isEn: boolean;
  onGameWin: () => void;
}

export const SecurityHunterGame: React.FC<Props> = ({ isEn, onGameWin }) => {
  const [fixedVulns, setFixedVulns] = useState<string[]>([]);
  const [isAudited, setIsAudited] = useState<boolean>(false);

  const handleFixVuln = (id: string) => {
    if (fixedVulns.includes(id)) return;
    const nextFixed = [...fixedVulns, id];
    setFixedVulns(nextFixed);

    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.6 }
    });

    if (nextFixed.length === SECURITY_VULNERABILITIES.length) {
      setIsAudited(true);
      onGameWin();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 }
      });
    }
  };

  const handleReset = () => {
    setFixedVulns([]);
    setIsAudited(false);
  };

  // Calculate Security Posture Score
  const currentScore = fixedVulns.reduce((acc, id) => {
    const vuln = SECURITY_VULNERABILITIES.find(v => v.id === id);
    return acc + (vuln ? vuln.points : 0);
  }, 0);

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
            {isEn ? 'Scan & Remediate Critical Campus Misconfigurations' : 'Dò Tìm & Vá Các Lỗ Hổng Hạ Tầng Trường Học'}
          </h2>
          <p className="text-xs text-slate-400">
            {isEn ? 'Find and patch all 5 dangerous cloud configuration flaws to achieve 100% Security Score.' : 'Khắc phục toàn bộ 5 lỗ hổng cấu hình nghiêm trọng để đạt 100 điểm an toàn tuyệt đối.'}
          </p>
        </div>

        {/* Live Security Score Card */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4 min-w-[200px]">
          <ShieldCheck className={`w-8 h-8 ${currentScore === 100 ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`} />
          <div>
            <span className="text-[11px] text-slate-400 font-semibold">{isEn ? 'Security Score:' : 'Điểm An Toàn:'}</span>
            <div className={`text-2xl font-black font-mono ${currentScore === 100 ? 'text-emerald-400' : currentScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
              {currentScore} / 100
            </div>
            <span className="text-[10px] text-slate-500">
              {fixedVulns.length}/{SECURITY_VULNERABILITIES.length} {isEn ? 'Vulnerabilities Fixed' : 'Đã vá lỗi'}
            </span>
          </div>
        </div>
      </div>

      {/* Vulnerabilities Checklist */}
      <div className="space-y-3.5">
        {SECURITY_VULNERABILITIES.map((vuln, idx) => {
          const isFixed = fixedVulns.includes(vuln.id);

          return (
            <div
              key={vuln.id}
              className={`p-4 md:p-5 rounded-2xl border transition-all space-y-3 ${
                isFixed 
                  ? 'bg-emerald-950/20 border-emerald-500/40' 
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

              {/* Remediation Action / Button */}
              <div className="pt-2 border-t border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-400 flex items-start gap-1.5">
                  <strong className="text-sky-400 font-semibold">{isEn ? 'Remediation:' : 'Biện pháp khắc phục:'}</strong>
                  <span>{isEn ? vuln.remediationActionEn : vuln.remediationAction}</span>
                </div>

                {!isFixed ? (
                  <button
                    onClick={() => handleFixVuln(vuln.id)}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 transition-all"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Patch Vulnerability' : 'Vá Lỗ Hổng Này'}</span>
                  </button>
                ) : (
                  <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Secured & Audited' : 'Đã Khắc Phục An Toàn'}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEn ? 'Reset Security Audit' : 'Đặt Lại Kiểm Thử'}</span>
        </button>
      </div>

      {/* 100% Score Victory Alert */}
      {isAudited && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-sky-950/60 border border-emerald-500/50 text-center space-y-2 shadow-xl">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-white">
            {isEn ? '🎉 100/100 Perfect Security Score! Zero Vulnerabilities!' : '🎉 100/100 Điểm Bảo Mật Tuyệt Đối! Hệ Thống Đã Được Bảo Vệ 100%!'}
          </h3>
          <p className="text-xs text-emerald-200">
            {isEn ? 'You successfully hardened the university AWS environment adhering to CIS AWS Foundations Benchmark.' : 'Bạn đã vá toàn bộ cấu hình sai và nâng cấp hạ tầng đám mây trường học đạt chuẩn an toàn bảo mật cấp cao nhất!'}
          </p>
        </div>
      )}

    </div>
  );
};
