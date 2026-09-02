import React, { useState } from 'react';
import { FundamentalsExamSimulatorView } from '../FundamentalsExamSimulatorView';
import { FundamentalsFlashcardsView } from '../FundamentalsFlashcardsView';
import { 
  CheckCircle2, 
  BrainCircuit, 
  Zap
} from 'lucide-react';

interface FundTestViewProps {
  initialSubTab?: 'quiz' | 'flashcards';
}

export const FundTestView: React.FC<FundTestViewProps> = ({ initialSubTab = 'quiz' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'quiz' | 'flashcards'>(initialSubTab);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Banner & Mode Switcher */}
      <div className="bg-gradient-to-b from-slate-900/90 via-slate-900 to-slate-950 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <Zap className="w-3.5 h-3.5" />
              Trung Tâm Kiểm Tra & Đánh Giá Năng Lực IT
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Thi Thử 8 Lĩnh Vực IT & Luyện Thẻ Nhớ Flashcards
            </h1>
            <p className="text-xs text-slate-400">
              Đánh giá mức độ sẵn sàng kiến thức trước khi bắt tay vào các chứng chỉ AWS chuyên sâu.
            </p>
          </div>

          {/* Sub Tab Switcher */}
          <div className="bg-slate-900 p-1 rounded-2xl border border-slate-700/80 flex items-center gap-1 self-start md:self-auto shadow-xl">
            <button
              onClick={() => setActiveSubTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'quiz'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Thi Thử 8 Lĩnh Vực (Exam Simulator)</span>
            </button>

            <button
              onClick={() => setActiveSubTab('flashcards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'flashcards'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <BrainCircuit className="w-4 h-4 text-amber-400" />
              <span>Thẻ Nhớ (Flashcards)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeSubTab === 'quiz' ? (
          <FundamentalsExamSimulatorView />
        ) : (
          <FundamentalsFlashcardsView />
        )}
      </div>

    </div>
  );
};
