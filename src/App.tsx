import React, { useState, Suspense, lazy } from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar, NavTab } from './components/Navbar';
import { ReadingModeFab } from './components/ReadingModeFab';
import { ReadingModeModal } from './components/ReadingModeModal';
import { Cloud, Terminal, Loader2 } from 'lucide-react';

// Lazy-loaded AWS Portal Views
const RoadmapView = lazy(() => import('./components/RoadmapView').then(m => ({ default: m.RoadmapView })));
const VideoLearningView = lazy(() => import('./components/VideoLearningView').then(m => ({ default: m.VideoLearningView })));
const GamesHubView = lazy(() => import('./components/GamesHubView').then(m => ({ default: m.GamesHubView })));
const DeepDiveView = lazy(() => import('./components/DeepDiveView').then(m => ({ default: m.DeepDiveView })));
const PortfolioView = lazy(() => import('./components/PortfolioView').then(m => ({ default: m.PortfolioView })));
const ExamSimulatorView = lazy(() => import('./components/ExamSimulatorView').then(m => ({ default: m.ExamSimulatorView })));
const FlashcardsView = lazy(() => import('./components/FlashcardsView').then(m => ({ default: m.FlashcardsView })));
const InterviewGuideView = lazy(() => import('./components/InterviewGuideView').then(m => ({ default: m.InterviewGuideView })));
const StudyPlannerView = lazy(() => import('./components/StudyPlannerView').then(m => ({ default: m.StudyPlannerView })));
const ResourceHubView = lazy(() => import('./components/ResourceHubView').then(m => ({ default: m.ResourceHubView })));

// Lazy-loaded Fundamentals Portal Views
const FundamentalsRoadmapView = lazy(() => import('./components/fundamentals/FundamentalsRoadmapView').then(m => ({ default: m.FundamentalsRoadmapView })));
const FundamentalsVideoView = lazy(() => import('./components/fundamentals/FundamentalsVideoView').then(m => ({ default: m.FundamentalsVideoView })));
const FundamentalsGamesHubView = lazy(() => import('./components/fundamentals/FundamentalsGamesHubView').then(m => ({ default: m.FundamentalsGamesHubView })));
const FundamentalsDeepDiveView = lazy(() => import('./components/fundamentals/FundamentalsDeepDiveView').then(m => ({ default: m.FundamentalsDeepDiveView })));
const FundamentalsPortfolioView = lazy(() => import('./components/fundamentals/FundamentalsPortfolioView').then(m => ({ default: m.FundamentalsPortfolioView })));
const FundamentalsExamSimulatorView = lazy(() => import('./components/fundamentals/FundamentalsExamSimulatorView').then(m => ({ default: m.FundamentalsExamSimulatorView })));
const FundamentalsFlashcardsView = lazy(() => import('./components/fundamentals/FundamentalsFlashcardsView').then(m => ({ default: m.FundamentalsFlashcardsView })));
const FundamentalsInterviewGuideView = lazy(() => import('./components/fundamentals/FundamentalsInterviewGuideView').then(m => ({ default: m.FundamentalsInterviewGuideView })));
const FundamentalsStudyPlannerView = lazy(() => import('./components/fundamentals/FundamentalsStudyPlannerView').then(m => ({ default: m.FundamentalsStudyPlannerView })));
const FundamentalsResourceHubView = lazy(() => import('./components/fundamentals/FundamentalsResourceHubView').then(m => ({ default: m.FundamentalsResourceHubView })));

// Smooth view loading skeleton
const ViewFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400 space-y-3 animate-fadeIn">
    <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
    <span className="text-xs font-semibold text-slate-400 tracking-wide">Đang tải nội dung học tập...</span>
  </div>
);

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('roadmap');
  const [isReadingModalOpen, setIsReadingModalOpen] = useState<boolean>(false);
  const { portalMode } = useLearning();

  const isFundamentals = portalMode === 'fundamentals';

  const navigateProps = {
    onNavigateDeepDive: () => setActiveTab('deepdive'),
    onNavigatePortfolio: () => setActiveTab('portfolio'),
    onNavigateQuiz: () => setActiveTab('quiz')
  };

  const renderActiveView = () => {
    if (isFundamentals) {
      switch (activeTab) {
        case 'roadmap':
          return <FundamentalsRoadmapView {...navigateProps} />;
        case 'video':
          return <FundamentalsVideoView />;
        case 'games':
          return <FundamentalsGamesHubView />;
        case 'deepdive':
          return <FundamentalsDeepDiveView />;
        case 'portfolio':
          return <FundamentalsPortfolioView />;
        case 'quiz':
          return <FundamentalsExamSimulatorView />;
        case 'flashcards':
          return <FundamentalsFlashcardsView />;
        case 'interview':
          return <FundamentalsInterviewGuideView />;
        case 'studyplan':
          return <FundamentalsStudyPlannerView />;
        case 'resources':
          return <FundamentalsResourceHubView />;
        default:
          return <FundamentalsRoadmapView {...navigateProps} />;
      }
    }

    switch (activeTab) {
      case 'roadmap':
        return <RoadmapView {...navigateProps} />;
      case 'video':
        return <VideoLearningView />;
      case 'games':
        return <GamesHubView />;
      case 'deepdive':
        return <DeepDiveView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'quiz':
        return <ExamSimulatorView />;
      case 'flashcards':
        return <FlashcardsView />;
      case 'interview':
        return <InterviewGuideView />;
      case 'studyplan':
        return <StudyPlannerView />;
      case 'resources':
        return <ResourceHubView />;
      default:
        return <RoadmapView {...navigateProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 pb-16 md:pb-0">
      {/* Top Sticky Navigation Bar */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content View Switcher with Suspense */}
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
              {isFundamentals ? 'Pre-AWS IT & Cloud Fundamentals Mastery' : 'AWS Cloud Mastery'}
            </span>
            <span className="text-slate-500">
              {isFundamentals ? '— Sẵn sàng 100% cho Đám mây' : '— Higher-Ed & Enterprise Edition'}
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <button 
              onClick={() => setActiveTab('roadmap')} 
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Lộ Trình
            </button>
            <button 
              onClick={() => setActiveTab('portfolio')} 
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Dự Án CV
            </button>
            <button 
              onClick={() => setActiveTab('interview')} 
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Phỏng Vấn STAR
            </button>
            <button 
              onClick={() => setActiveTab('resources')} 
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Tài Liệu
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

