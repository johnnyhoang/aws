import React, { useState } from 'react';
import { LearningProvider } from './context/LearningContext';
import { Navbar, NavTab } from './components/Navbar';
import { RoadmapView } from './components/RoadmapView';
import { VideoLearningView } from './components/VideoLearningView';
import { DeepDiveView } from './components/DeepDiveView';
import { PortfolioView } from './components/PortfolioView';
import { ExamSimulatorView } from './components/ExamSimulatorView';
import { FlashcardsView } from './components/FlashcardsView';
import { InterviewGuideView } from './components/InterviewGuideView';
import { StudyPlannerView } from './components/StudyPlannerView';
import { ResourceHubView } from './components/ResourceHubView';
import { Cloud, Heart, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('roadmap');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 pb-16 md:pb-0">
      
      {/* Top Sticky Navigation Bar */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'roadmap' && (
          <RoadmapView 
            onNavigateDeepDive={() => setActiveTab('deepdive')}
            onNavigatePortfolio={() => setActiveTab('portfolio')}
            onNavigateQuiz={() => setActiveTab('quiz')}
          />
        )}
        {activeTab === 'video' && <VideoLearningView />}
        {activeTab === 'deepdive' && <DeepDiveView />}
        {activeTab === 'portfolio' && <PortfolioView />}
        {activeTab === 'quiz' && <ExamSimulatorView />}
        {activeTab === 'flashcards' && <FlashcardsView />}
        {activeTab === 'interview' && <InterviewGuideView />}
        {activeTab === 'studyplan' && <StudyPlannerView />}
        {activeTab === 'resources' && <ResourceHubView />}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-900/90 border-t border-slate-800 text-slate-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black">
              <Cloud className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-200">AWS Cloud Mastery</span>
            <span className="text-slate-500">— Higher-Ed & Enterprise Edition</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <button 
              onClick={() => setActiveTab('roadmap')} 
              className="hover:text-amber-400 transition-colors"
            >
              Lộ Trình Chứng Chỉ
            </button>
            <button 
              onClick={() => setActiveTab('portfolio')} 
              className="hover:text-amber-400 transition-colors"
            >
              Dự Án Portfolio (CV)
            </button>
            <button 
              onClick={() => setActiveTab('interview')} 
              className="hover:text-amber-400 transition-colors"
            >
              Cẩm Nang Phỏng Vấn
            </button>
            <button 
              onClick={() => setActiveTab('resources')} 
              className="hover:text-amber-400 transition-colors"
            >
              Tài Liệu Ôn Thi
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
