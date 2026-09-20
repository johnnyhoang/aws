import React, { useState } from 'react';
import { FundamentalsGamesHubView } from '../FundamentalsGamesHubView';
import { FundamentalsPortfolioView } from '../FundamentalsPortfolioView';
import { 
  Gamepad2, 
  FolderGit2
} from 'lucide-react';

interface FundPlayViewProps {
  initialSubTab?: 'games' | 'portfolio';
}

export const FundPlayView: React.FC<FundPlayViewProps> = ({ initialSubTab = 'games' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'games' | 'portfolio'>(initialSubTab);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-300">
      
      {/* Minimal Sub-mode Switcher */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {activeSubTab === 'games' ? 'Game Học Tập Nền Tảng' : 'Dự Án IT Nền Tảng'}
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveSubTab('games')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeSubTab === 'games'
                ? 'bg-slate-800 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Games</span>
          </button>

          <button
            onClick={() => setActiveSubTab('portfolio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeSubTab === 'portfolio'
                ? 'bg-slate-800 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Dự Án IT</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div>
        {activeSubTab === 'games' ? (
          <FundamentalsGamesHubView />
        ) : (
          <FundamentalsPortfolioView />
        )}
      </div>

    </div>
  );
};
