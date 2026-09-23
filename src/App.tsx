import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar, NavTab } from './components/Navbar';
import { ReadingModeFab } from './components/ReadingModeFab';
import { ReadingModeModal } from './components/ReadingModeModal';
import { Cloud, Terminal, Globe, Loader2, BookOpen, CheckCircle2, Gamepad2 } from 'lucide-react';

// Lazy-loaded AWS Unified Views
const AwsLearnView = lazy(() => import('./components/unified/AwsLearnView').then(m => ({ default: m.AwsLearnView })));
const AwsTestView = lazy(() => import('./components/unified/AwsTestView').then(m => ({ default: m.AwsTestView })));
const AwsPlayView = lazy(() => import('./components/unified/AwsPlayView').then(m => ({ default: m.AwsPlayView })));

// Lazy-loaded Fundamentals Unified Views
const FundLearnView = lazy(() => import('./components/fundamentals/unified/FundLearnView').then(m => ({ default: m.FundLearnView })));
const FundTestView = lazy(() => import('./components/fundamentals/unified/FundTestView').then(m => ({ default: m.FundTestView })));
const FundPlayView = lazy(() => import('./components/fundamentals/unified/FundPlayView').then(m => ({ default: m.FundPlayView })));

// Lazy-loaded Web Domain Unified Views
const WebDomainLearnView = lazy(() => import('./components/webDomain/WebDomainLearnView').then(m => ({ default: m.WebDomainLearnView })));
const WebDomainTestView = lazy(() => import('./components/webDomain/WebDomainTestView').then(m => ({ default: m.WebDomainTestView })));
const WebDomainPlayView = lazy(() => import('./components/webDomain/WebDomainPlayView').then(m => ({ default: m.WebDomainPlayView })));

// Lazy-loaded Database Unified Views
const DatabaseLearnView = lazy(() => import('./components/database/DatabaseLearnView').then(m => ({ default: m.DatabaseLearnView })));
const DatabaseTestView = lazy(() => import('./components/database/DatabaseTestView').then(m => ({ default: m.DatabaseTestView })));
const DatabasePlayView = lazy(() => import('./components/database/DatabasePlayView').then(m => ({ default: m.DatabasePlayView })));

// Lazy-loaded Linux Admin Unified Views
const LinuxAdminLearnView = lazy(() => import('./components/linuxAdmin/LinuxAdminLearnView').then(m => ({ default: m.LinuxAdminLearnView })));
const LinuxAdminTestView = lazy(() => import('./components/linuxAdmin/LinuxAdminTestView').then(m => ({ default: m.LinuxAdminTestView })));
const LinuxAdminPlayView = lazy(() => import('./components/linuxAdmin/LinuxAdminPlayView').then(m => ({ default: m.LinuxAdminPlayView })));

// Lazy-loaded Open Source Unified Views
const OpenSourceLearnView = lazy(() => import('./components/openSource/OpenSourceLearnView').then(m => ({ default: m.OpenSourceLearnView })));
const OpenSourceTestView = lazy(() => import('./components/openSource/OpenSourceTestView').then(m => ({ default: m.OpenSourceTestView })));
const OpenSourcePlayView = lazy(() => import('./components/openSource/OpenSourcePlayView').then(m => ({ default: m.OpenSourcePlayView })));

import { AudioReaderProvider } from './context/AudioReaderContext';
import { AudioReaderBar } from './components/AudioReaderBar';
import { LoginScreen } from './components/LoginScreen';
import { Server, GitBranch } from 'lucide-react';
import { parseCurrentUrl, syncUrlRoute } from './utils/routeHelper';

// Smooth view loading fallback
const ViewFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400 space-y-3 animate-fadeIn">
    <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
    <span className="text-xs font-semibold text-slate-400 tracking-wide">Đang tải nội dung học tập...</span>
  </div>
);

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>(() => {
    if (typeof window !== 'undefined') {
      const initial = parseCurrentUrl();
      if (initial.activeTab) return initial.activeTab;
    }
    return 'learn';
  });
  const [isReadingModalOpen, setIsReadingModalOpen] = useState<boolean>(false);
  const { portalMode, setPortalMode, authUser, authLoading } = useLearning();

  // Sync URL when portalMode or activeTab changes
  useEffect(() => {
    if (portalMode && activeTab) {
      syncUrlRoute(portalMode, activeTab);
    }
  }, [portalMode, activeTab]);

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const route = parseCurrentUrl();
      if (route.portalMode && route.portalMode !== portalMode) {
        setPortalMode(route.portalMode);
      }
      if (route.activeTab && route.activeTab !== activeTab) {
        setActiveTab(route.activeTab);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [portalMode, activeTab, setPortalMode]);

  // Show full loading spinner while checking initial Google session
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
        <div className="text-xs text-slate-400 font-semibold tracking-wide">
          Đang kết nối phiên đăng nhập...
        </div>
      </div>
    );
  }

  // Enforce Google Login requirement
  if (!authUser) {
    return <LoginScreen />;
  }

  const isFundamentals = portalMode === 'fundamentals';
  const isWebDomain = portalMode === 'web_domain';
  const isDatabase = portalMode === 'database';
  const isLinuxAdmin = portalMode === 'linux_admin';
  const isOpenSource = portalMode === 'open_source';

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

    if (isWebDomain) {
      switch (activeTab) {
        case 'learn':
          return <WebDomainLearnView onNavigateTab={setActiveTab} />;
        case 'test':
          return <WebDomainTestView />;
        case 'play':
          return <WebDomainPlayView />;
        default:
          return <WebDomainLearnView onNavigateTab={setActiveTab} />;
      }
    }

    if (isDatabase) {
      switch (activeTab) {
        case 'learn':
          return <DatabaseLearnView onNavigateTab={setActiveTab} />;
        case 'test':
          return <DatabaseTestView />;
        case 'play':
          return <DatabasePlayView />;
        default:
          return <DatabaseLearnView onNavigateTab={setActiveTab} />;
      }
    }

    if (isLinuxAdmin) {
      switch (activeTab) {
        case 'learn':
          return <LinuxAdminLearnView onNavigateTab={setActiveTab} />;
        case 'test':
          return <LinuxAdminTestView />;
        case 'play':
          return <LinuxAdminPlayView />;
        default:
          return <LinuxAdminLearnView onNavigateTab={setActiveTab} />;
      }
    }

    if (isOpenSource) {
      switch (activeTab) {
        case 'learn':
          return <OpenSourceLearnView onNavigateTab={setActiveTab} />;
        case 'test':
          return <OpenSourceTestView />;
        case 'play':
          return <OpenSourcePlayView />;
        default:
          return <OpenSourceLearnView onNavigateTab={setActiveTab} />;
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
            <div className={`w-6 h-6 rounded-lg ${isFundamentals ? 'bg-amber-500 text-slate-950' : isWebDomain ? 'bg-emerald-500 text-slate-950' : isDatabase ? 'bg-amber-500 text-slate-950' : isLinuxAdmin ? 'bg-emerald-500 text-slate-950' : isOpenSource ? 'bg-purple-500 text-slate-950' : 'bg-sky-500 text-white'} flex items-center justify-center font-black`}>
              {isFundamentals ? <Terminal className="w-4 h-4" /> : isWebDomain ? <Globe className="w-4 h-4" /> : isDatabase ? <Server className="w-4 h-4" /> : isLinuxAdmin ? <Terminal className="w-4 h-4" /> : isOpenSource ? <GitBranch className="w-4 h-4" /> : <Cloud className="w-4 h-4" />}
            </div>
            <span className="font-bold text-slate-200">
              {isFundamentals ? 'Pre-AWS IT & Cloud Fundamentals' : isWebDomain ? 'Web Domain & Web Administration' : isDatabase ? 'Database & Universal Free-DB Gateway' : isLinuxAdmin ? 'Linux & Unix Systems Administration' : isOpenSource ? 'Open Source & FOSS Mastery' : 'AWS Cloud Mastery'}
            </span>
            <span className="text-slate-500">
              {isFundamentals ? '— Nền tảng IT vững chắc' : isWebDomain ? '— Làm chủ tên miền & máy chủ' : isDatabase ? '— Bách khoa toàn thư Database & MCP Gateway' : isLinuxAdmin ? '— Quản trị máy chủ Web, App, DB & AWS' : isOpenSource ? '— Tư tưởng, Kỹ thuật Git & Trở thành Contributor/Maintainer' : '— Học, Test & Chơi thực chiến'}
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

      {/* Minimal Floating Audio Player Toolbar */}
      <AudioReaderBar />

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
      <AudioReaderProvider>
        <AppContent />
      </AudioReaderProvider>
    </LearningProvider>
  );
}
