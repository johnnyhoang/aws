import React, { useState } from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar, NavTab } from './components/Navbar';

// AWS Portal Views
import { RoadmapView } from './components/RoadmapView';
import { VideoLearningView } from './components/VideoLearningView';
import { GamesHubView } from './components/GamesHubView';
import { DeepDiveView } from './components/DeepDiveView';
import { PortfolioView } from './components/PortfolioView';
import { ExamSimulatorView } from './components/ExamSimulatorView';
import { FlashcardsView } from './components/FlashcardsView';
import { InterviewGuideView } from './components/InterviewGuideView';
import { StudyPlannerView } from './components/StudyPlannerView';
import { ResourceHubView } from './components/ResourceHubView';

// Fundamentals Portal Views
import { FundamentalsRoadmapView } from './components/fundamentals/FundamentalsRoadmapView';
import { FundamentalsVideoView } from './components/fundamentals/FundamentalsVideoView';
import { FundamentalsGamesHubView } from './components/fundamentals/FundamentalsGamesHubView';
import { FundamentalsDeepDiveView } from './components/fundamentals/FundamentalsDeepDiveView';
import { FundamentalsPortfolioView } from './components/fundamentals/FundamentalsPortfolioView';
import { FundamentalsExamSimulatorView } from './components/fundamentals/FundamentalsExamSimulatorView';
import { FundamentalsFlashcardsView } from './components/fundamentals/FundamentalsFlashcardsView';
import { FundamentalsInterviewGuideView } from './components/fundamentals/FundamentalsInterviewGuideView';
import { FundamentalsStudyPlannerView } from './components/fundamentals/FundamentalsStudyPlannerView';
import { FundamentalsResourceHubView } from './components/fundamentals/FundamentalsResourceHubView';

import { Cloud, Terminal, Sparkles } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('roadmap');
  const { portalMode, setPortalMode } = useLearning();

  const isFundamentals = portalMode === 'fundamentals';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 pb-16 md:pb-0">
      
      {/* Top Sticky Navigation Bar */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {isFundamentals ? (
          /* Fundamentals Portal Views */
          <>
            {activeTab === 'roadmap' && (
              <FundamentalsRoadmapView 
                onNavigateDeepDive={() => setActiveTab('deepdive')}
                onNavigatePortfolio={() => setActiveTab('portfolio')}
                onNavigateQuiz={() => setActiveTab('quiz')}
              />
            )}
            {activeTab === 'video' && <FundamentalsVideoView />}
            {activeTab === 'games' && <FundamentalsGamesHubView />}
            {activeTab === 'deepdive' && <FundamentalsDeepDiveView />}
            {activeTab === 'portfolio' && <FundamentalsPortfolioView />}
            {activeTab === 'quiz' && <FundamentalsExamSimulatorView />}
            {activeTab === 'flashcards' && <FundamentalsFlashcardsView />}
            {activeTab === 'interview' && <FundamentalsInterviewGuideView />}
            {activeTab === 'studyplan' && <FundamentalsStudyPlannerView />}
            {activeTab === 'resources' && <FundamentalsResourceHubView />}
          </>
        ) : (
          /* AWS Cloud Mastery Portal Views */
          <>
            {activeTab === 'roadmap' && (
              <RoadmapView 
                onNavigateDeepDive={() => setActiveTab('deepdive')}
                onNavigatePortfolio={() => setActiveTab('portfolio')}
                onNavigateQuiz={() => setActiveTab('quiz')}
              />
            )}
            {activeTab === 'video' && <VideoLearningView />}
            {activeTab === 'games' && <GamesHubView />}
            {activeTab === 'deepdive' && <DeepDiveView />}
            {activeTab === 'portfolio' && <PortfolioView />}
            {activeTab === 'quiz' && <ExamSimulatorView />}
            {activeTab === 'flashcards' && <FlashcardsView />}
            {activeTab === 'interview' && <InterviewGuideView />}
            {activeTab === 'studyplan' && <StudyPlannerView />}
            {activeTab === 'resources' && <ResourceHubView />}
          </>
        )}
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
