import React, { useState } from 'react';
import { FundamentalsExamSimulatorView } from '../FundamentalsExamSimulatorView';
import { FundamentalsFlashcardsView } from '../FundamentalsFlashcardsView';
import { 
  CheckCircle2, 
  BrainCircuit
} from 'lucide-react';

interface FundTestViewProps {
  initialSubTab?: 'quiz' | 'flashcards';
}

export const FundTestView: React.FC<FundTestViewProps> = ({ initialSubTab = 'quiz' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'quiz' | 'flashcards'>(initialSubTab);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-300">
      
      {/* Minimal Sub-mode Switcher */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {activeSubTab === 'quiz' ? 'Thi Thử 8 Lĩnh Vực IT' : 'Ôn Tập Thẻ Nhớ IT'}
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveSubTab('quiz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeSubTab === 'quiz'
                ? 'bg-slate-800 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Đề Thi</span>
          </button>

          <button
            onClick={() => setActiveSubTab('flashcards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeSubTab === 'flashcards'
                ? 'bg-slate-800 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Thẻ Nhớ</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div>
        {activeSubTab === 'quiz' ? (
          <FundamentalsExamSimulatorView />
        ) : (
          <FundamentalsFlashcardsView />
        )}
      </div>

    </div>
  );
};
