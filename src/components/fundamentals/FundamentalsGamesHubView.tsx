import React, { useState } from 'react';
import { SubnetMasterGame } from './games/SubnetMasterGame';
import { LinuxTerminalGame } from './games/LinuxTerminalGame';
import { PortHunterGame } from './games/PortHunterGame';
import { NetworkRouterGame } from './games/NetworkRouterGame';
import { Gamepad2, Network, Terminal, ShieldCheck, Route } from 'lucide-react';

type GameTab = 'subnet' | 'linux' | 'port' | 'router';

export const FundamentalsGamesHubView: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameTab>('subnet');

  const games = [
    {
      id: 'subnet' as GameTab,
      title: 'Subnet & CIDR Master',
      shortTitle: 'Subnet Master',
      icon: Network,
      color: 'from-emerald-500 to-teal-700',
      badge: 'Networking ⭐',
      description: 'Luyện phản xạ tính nhẩm CIDR, Subnet Mask & 5 IP AWS'
    },
    {
      id: 'linux' as GameTab,
      title: 'Linux Terminal Challenge',
      shortTitle: 'Linux Terminal',
      icon: Terminal,
      color: 'from-amber-500 to-orange-700',
      badge: 'Linux Basics ⭐',
      description: 'Mô phỏng gõ lệnh Linux giải quyết các sự cố máy chủ thực tế'
    },
    {
      id: 'port' as GameTab,
      title: 'Port & Protocol Hunter',
      shortTitle: 'Port Hunter',
      icon: ShieldCheck,
      color: 'from-violet-500 to-purple-700',
      badge: 'Security & Web',
      description: 'Luyện phản xạ ghi nhớ số hiệu cổng mạng và ứng dụng bảo mật'
    },
    {
      id: 'router' as GameTab,
      title: 'Network Packet Router',
      shortTitle: 'Packet Router',
      icon: Route,
      color: 'from-cyan-500 to-blue-700',
      badge: 'Routing & NAT',
      description: 'Sắp xếp luồng định tuyến gói tin qua Firewall, NAT và DNS'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white">
              Khu Trò Chơi Học Tập Tương Tác (Games Hub)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Vừa chơi vừa ghi nhớ kiến thức nền tảng IT, Linux CLI, Subnetting và Mạng máy tính
            </p>
          </div>
        </div>
      </div>

      {/* Game Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {games.map((game) => {
          const Icon = game.icon;
          const isActive = activeGame === game.id;

          return (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isActive
                  ? 'bg-slate-800/95 border-amber-500/50 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                  : 'bg-slate-900/80 hover:bg-slate-800/70 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${game.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-700 text-slate-400 font-semibold">
                  {game.badge}
                </span>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">{game.shortTitle}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">{game.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Game Container */}
      <div className="mt-4">
        {activeGame === 'subnet' && <SubnetMasterGame />}
        {activeGame === 'linux' && <LinuxTerminalGame />}
        {activeGame === 'port' && <PortHunterGame />}
        {activeGame === 'router' && <NetworkRouterGame />}
      </div>
    </div>
  );
};
