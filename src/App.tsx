import React, { useState, Suspense, lazy } from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar, NavTab } from './components/Navbar';
import { ReadingModeFab } from './components/ReadingModeFab';
import { ReadingModeModal } from './components/ReadingModeModal';
import { Cloud, Terminal, Loader2, BookOpen, CheckCircle2, Gamepad2 } from 'lucide-react';

// Lazy-loaded AWS Unified Views
const AwsLearnView = lazy(() => import('./components/unified/AwsLearnView').then(m => ({ default: m.AwsLearnView })));
const AwsTestView = lazy(() => import('./components/unified/AwsTestView').then(m => ({ default: m.AwsTestView })));
const AwsPlayView = lazy(() => import('./components/unified/AwsPlayView').then(m => ({ default: m.AwsPlayView })));

// Lazy-loaded Fundamentals Unified Views
const FundLearnView = lazy(() => import('./components/fundamentals/unified/FundLearnView').then(m => ({ default: m.FundLearnView })));
const FundTestView = lazy(() => import('./components/fundamentals/unified/FundTestView').then(m => ({ default: m.FundTestView })));
const FundPlayView = lazy(() => import('./components/fundamentals/unified/FundPlayView').then(m => ({ default: m.FundPlayView })));

// Smooth view loading fallback
const ViewFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400 space-y-3 animate-fadeIn">
    <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
    <span className="text-xs font-semibold text-slate-400 tracking-wide">Đang tải nội dung học tập...</span>
  </div>
);

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('learn');
  const [isReadingModalOpen, setIsReadingModalOpen] = useState<boolean>(false);
  const { portalMode } = useLearning();

  const isFundamentals = portalMode === 'fundamentals';

  const renderActiveView = () => {
    if (isFundamentals) {
      switch (activeTab) {
        case 'learn':
          return <FundLearnView onNavigateTab={setActiveTab} />;
        case 'test':
          return <FundTestView />;
        case 'play':
          return <FundPlayView />;
        default:
          return <FundLearnView onNavigateTab={setActiveTab} />;
      }
    }

    switch (activeTab) {
      case 'learn':
        return <AwsLearnView onNavigateTab={setActiveTab} />;
      case 'test':
        return <AwsTestView />;
      case 'play':
        return <AwsPlayView />;
      default:
        return <AwsLearnView onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 pb-16 md:pb-0">
      {/* Top Sticky Navigation Bar with 3 Streamlined Pillars */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        <Suspense fallback={<ViewFallback />}>
          {renderActiveView()}
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-900/90 border-t border-slate-800 text-slate-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-lg ${isFundamentals ? 'bg-amber-500 text-slate-950' : 'bg-sky-500 text-white'} flex items-center justify-center font-black`}>
              {isFundamentals ? <Terminal className="w-4 h-4" /> : <Cloud className="w-4 h-4" />}
            </div>
            <span className="font-bold text-slate-200">
              {isFundamentals ? 'Pre-AWS IT & Cloud Fundamentals' : 'AWS Cloud Mastery'}
            </span>
            <span className="text-slate-500">
              {isFundamentals ? '— Nền tảng IT vững chắc' : '— Học, Test & Chơi thực chiến'}
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-400 font-semibold">
            <button 
              onClick={() => setActiveTab('learn')} 
              className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Học Tập</span>
            </button>
            <button 
              onClick={() => setActiveTab('test')} 
              className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Luyện Thi</span>
            </button>
            <button 
              onClick={() => setActiveTab('play')} 
              className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Game & Lab</span>
            </button>
          </div>

          <div className="text-slate-500 text-center md:text-right">
            <span>Đồng hành cùng sự nghiệp Cloud & Systems Engineer tại Đại học Mỹ</span>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for Quick Large Text & Reading Mode */}
      <ReadingModeFab onOpenModal={() => setIsReadingModalOpen(true)} />

      {/* Global Reading Mode & Custom Font Size Modal */}
      <ReadingModeModal
        isOpen={isReadingModalOpen}
        onClose={() => setIsReadingModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LearningProvider>
      <AppContent />
    </LearningProvider>
  );
}
