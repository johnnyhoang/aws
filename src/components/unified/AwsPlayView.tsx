import React, { useState } from 'react';
import { GamesHubView } from '../GamesHubView';
import { PortfolioView } from '../PortfolioView';
import { 
  Gamepad2, 
  FolderGit2, 
  Zap
} from 'lucide-react';

interface AwsPlayViewProps {
  initialSubTab?: 'games' | 'portfolio';
}

export const AwsPlayView: React.FC<AwsPlayViewProps> = ({ initialSubTab = 'games' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'games' | 'portfolio'>(initialSubTab);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Banner & Mode Switcher */}
      <div className="bg-gradient-to-b from-slate-900/90 via-slate-900 to-slate-950 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 bg-purple-500/15 px-2.5 py-0.5 rounded-full border border-purple-500/30">
              <Zap className="w-3.5 h-3.5" />
              Trung Tâm Game Học Tập & Dự Án Thực Chiến
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Vừa Chơi Vừa Luyện Kỹ Năng & Xây Dựng CV
            </h1>
            <p className="text-xs text-slate-400">
              Thử thách mini-games mô phỏng hệ thống thực tế và thực hành các dự án đưa vào Resume.
            </p>
          </div>

          {/* Sub Tab Switcher */}
          <div className="bg-slate-900 p-1 rounded-2xl border border-slate-700/80 flex items-center gap-1 self-start md:self-auto shadow-xl">
            <button
              onClick={() => setActiveSubTab('games')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'games'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-purple-400" />
              <span>Game Học Tập (Games Hub)</span>
            </button>

            <button
              onClick={() => setActiveSubTab('portfolio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'portfolio'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FolderGit2 className="w-4 h-4 text-amber-400" />
              <span>Dự Án CV & Lab Thực Chiến</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeSubTab === 'games' ? (
          <GamesHubView />
        ) : (
          <PortfolioView />
        )}
      </div>

    </div>
  );
};
