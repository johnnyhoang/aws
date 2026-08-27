import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { ArchBuilderGame } from './games/ArchBuilderGame';
import { MemoryMatchGame } from './games/MemoryMatchGame';
import { IncidentCommanderGame } from './games/IncidentCommanderGame';
import { FinOpsTycoonGame } from './games/FinOpsTycoonGame';
import { SecurityHunterGame } from './games/SecurityHunterGame';
import { 
  Gamepad2, 
  Layers, 
  BrainCircuit, 
  Flame, 
  DollarSign, 
  ShieldCheck, 
  Languages, 
  Shuffle 
} from 'lucide-react';

export const GamesHubView: React.FC = () => {
  const { logStudyHours } = useLearning();
  const [activeGame, setActiveGame] = useState<'arch' | 'memory' | 'incident' | 'finops' | 'security'>('arch');
  
  // Language mode: 'vi' | 'en' | 'random'
  const [gameLangMode, setGameLangMode] = useState<'vi' | 'en' | 'random'>('vi');
  const isEn = gameLangMode === 'en';

  const handleGameWin = () => {
    logStudyHours(1);
  };

  const gameTabs = [
    {
      id: 'arch' as const,
      num: 1,
      name: 'Kiến Trúc Sư AWS',
      nameEn: 'Arch Builder',
      desc: 'Lắp ráp 8 kịch bản kiến trúc chuẩn Well-Architected',
      descEn: 'Design 8 Multi-Tier AWS architectures for enterprise loads',
      icon: Layers,
      color: 'amber'
    },
    {
      id: 'memory' as const,
      num: 2,
      name: 'Ghép Cặp Trí Nhớ',
      nameEn: 'Memory Match',
      desc: 'Ghép đôi 16 dịch vụ AWS với vai trò thực tế',
      descEn: 'Match 16 AWS services with enterprise use cases',
      icon: BrainCircuit,
      color: 'purple'
    },
    {
      id: 'incident' as const,
      num: 3,
      name: 'Chỉ Huy Sự Cố IT',
      nameEn: 'Incident Command',
      desc: 'Quyết định cứu hệ thống trường học không bị sập',
      descEn: 'Resolve live high-severity outages & attacks',
      icon: Flame,
      color: 'rose'
    },
    {
      id: 'finops' as const,
      num: 4,
      name: 'Tối Ưu Chi Phí FinOps',
      nameEn: 'FinOps Tycoon',
      desc: 'Cắt giảm $25k xuống < $8k/tháng bằng Graviton & S3 Deep Archive',
      descEn: 'Slash campus AWS bill by 70% with FinOps strategies',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      id: 'security' as const,
      num: 5,
      name: 'Thợ Săn Lỗ Hổng Bảo Mật',
      nameEn: 'Security Hunter',
      desc: 'Dò tìm và vá 5 lỗ hổng S3, IAM, Root, Security Group',
      descEn: 'Audit & remediate critical misconfigurations to 100%',
      icon: ShieldCheck,
      color: 'sky'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6 md:space-y-8 text-slate-100">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-5 md:p-8 shadow-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>{isEn ? 'AWS Educational Arcade (5 Interactive Games)' : 'AWS Cloud Arcade (5 Trò Chơi Giáo Dục Song Ngữ)'}</span>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <span className="text-[11px] font-bold text-slate-400 px-1.5 flex items-center gap-1">
              <Languages className="w-3 h-3 text-amber-400" /> Ngôn ngữ:
            </span>
            <button
              onClick={() => setGameLangMode('vi')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                gameLangMode === 'vi' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇻🇳 VI
            </button>
            <button
              onClick={() => setGameLangMode('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                gameLangMode === 'en' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇺🇸 EN
            </button>
            <button
              onClick={() => setGameLangMode('random')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                gameLangMode === 'random' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shuffle className="w-3 h-3" />
              <span>Xáo Trộn</span>
            </button>
          </div>
        </div>

        <h1 className="text-xl md:text-3xl font-extrabold text-white">
          {isEn ? 'AWS Interactive Cloud Gaming Arcade' : 'Khu Trò Chơi Giải Trí & Khắc Sâu Kiến Thức'}
        </h1>
        <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {isEn 
            ? 'Level up your cloud skills through hands-on architecture puzzles, memory matching, emergency incident response, FinOps cost cutting, and security posture audits.'
            : 'Vừa chơi vừa rèn luyện tư duy thiết kế kiến trúc đám mây, ghép cặp thuật ngữ, chỉ huy sự cố khẩn cấp, tối ưu hóa chi phí FinOps và săn lỗ hổng bảo mật.'}
        </p>
      </div>

      {/* 5-Game Mode Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {gameTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeGame === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveGame(tab.id)}
              className={`p-3.5 md:p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                isActive
                  ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/30 shadow-xl'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-amber-300">
                  Game {tab.num}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              </div>
              <div>
                <h3 className="font-black text-white text-xs md:text-sm">
                  {isEn ? tab.nameEn : tab.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                  {isEn ? tab.descEn : tab.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* RENDER ACTIVE GAME */}
      {activeGame === 'arch' && (
        <ArchBuilderGame isEn={isEn} onGameWin={handleGameWin} />
      )}

      {activeGame === 'memory' && (
        <MemoryMatchGame isEn={isEn} gameLangMode={gameLangMode} onGameWin={handleGameWin} />
      )}

      {activeGame === 'incident' && (
        <IncidentCommanderGame isEn={isEn} onGameWin={handleGameWin} />
      )}

      {activeGame === 'finops' && (
        <FinOpsTycoonGame isEn={isEn} onGameWin={handleGameWin} />
      )}

      {activeGame === 'security' && (
        <SecurityHunterGame isEn={isEn} onGameWin={handleGameWin} />
      )}

    </div>
  );
};
