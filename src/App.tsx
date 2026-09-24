import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar, NavTab } from './components/Navbar';
import { ReadingModeFab } from './components/ReadingModeFab';
import { ReadingModeModal } from './components/ReadingModeModal';
import { Cloud, Terminal, Globe, Loader2, BookOpen, CheckCircle2, Gamepad2, Server, GitBranch, Mail, Triangle, Send, Database, Zap, Layers, Wallet } from 'lucide-react';

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

// Lazy-loaded Email Systems Unified Views
const EmailLearnView = lazy(() => import('./components/email/EmailLearnView').then(m => ({ default: m.EmailLearnView })));
const EmailTestView = lazy(() => import('./components/email/EmailTestView').then(m => ({ default: m.EmailTestView })));
const EmailPlayView = lazy(() => import('./components/email/EmailPlayView').then(m => ({ default: m.EmailPlayView })));

// Lazy-loaded Vercel Views (Volume 8)
const VercelLearnView = lazy(() => import('./components/vercel/VercelLearnView').then(m => ({ default: m.VercelLearnView })));
const VercelTestView = lazy(() => import('./components/vercel/VercelTestView').then(m => ({ default: m.VercelTestView })));
const VercelPlayView = lazy(() => import('./components/vercel/VercelPlayView').then(m => ({ default: m.VercelPlayView })));

// Lazy-loaded Resend Views (Volume 9)
const ResendLearnView = lazy(() => import('./components/resend/ResendLearnView').then(m => ({ default: m.ResendLearnView })));
const ResendTestView = lazy(() => import('./components/resend/ResendTestView').then(m => ({ default: m.ResendTestView })));
const ResendPlayView = lazy(() => import('./components/resend/ResendPlayView').then(m => ({ default: m.ResendPlayView })));

// Lazy-loaded Supabase Views (Volume 10)
const SupabaseLearnView = lazy(() => import('./components/supabase/SupabaseLearnView').then(m => ({ default: m.SupabaseLearnView })));
const SupabaseTestView = lazy(() => import('./components/supabase/SupabaseTestView').then(m => ({ default: m.SupabaseTestView })));
const SupabasePlayView = lazy(() => import('./components/supabase/SupabasePlayView').then(m => ({ default: m.SupabasePlayView })));

// Lazy-loaded Neon Views (Volume 11)
const NeonLearnView = lazy(() => import('./components/neon/NeonLearnView').then(m => ({ default: m.NeonLearnView })));
const NeonTestView = lazy(() => import('./components/neon/NeonTestView').then(m => ({ default: m.NeonTestView })));
const NeonPlayView = lazy(() => import('./components/neon/NeonPlayView').then(m => ({ default: m.NeonPlayView })));

// Lazy-loaded App System Views (Volume 12)
const AppSystemLearnView = lazy(() => import('./components/appSystem/AppSystemLearnView').then(m => ({ default: m.AppSystemLearnView })));
const AppSystemTestView = lazy(() => import('./components/appSystem/AppSystemTestView').then(m => ({ default: m.AppSystemTestView })));
const AppSystemPlayView = lazy(() => import('./components/appSystem/AppSystemPlayView').then(m => ({ default: m.AppSystemPlayView })));

// Lazy-loaded Azure Views (Volume 13)
const AzureLearnView = lazy(() => import('./components/azure/AzureLearnView').then(m => ({ default: m.AzureLearnView })));
const AzureTestView = lazy(() => import('./components/azure/AzureTestView').then(m => ({ default: m.AzureTestView })));
const AzurePlayView = lazy(() => import('./components/azure/AzurePlayView').then(m => ({ default: m.AzurePlayView })));

// Lazy-loaded App Wallet Views (Volume 14)
const AppWalletLearnView = lazy(() => import('./components/appWallet/AppWalletLearnView').then(m => ({ default: m.AppWalletLearnView })));
const AppWalletTestView = lazy(() => import('./components/appWallet/AppWalletTestView').then(m => ({ default: m.AppWalletTestView })));
const AppWalletPlayView = lazy(() => import('./components/appWallet/AppWalletPlayView').then(m => ({ default: m.AppWalletPlayView })));

import { AudioReaderProvider } from './context/AudioReaderContext';
import { AudioReaderBar } from './components/AudioReaderBar';
import { LoginScreen } from './components/LoginScreen';
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
  const isEmailMastery = portalMode === 'email_mastery';
  const isVercel = portalMode === 'vercel';
  const isResend = portalMode === 'resend';
  const isSupabase = portalMode === 'supabase';
  const isNeon = portalMode === 'neon';
  const isAppSystem = portalMode === 'app_system';
  const isAzure = portalMode === 'azure';
  const isAppWallet = portalMode === 'app_wallet';

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

    if (isEmailMastery) {
      switch (activeTab) {
        case 'learn':
          return <EmailLearnView onNavigateTab={setActiveTab} />;
        case 'test':
          return <EmailTestView />;
        case 'play':
          return <EmailPlayView />;
        default:
          return <EmailLearnView onNavigateTab={setActiveTab} />;
      }
    }

    if (isVercel) {
      switch (activeTab) {
        case 'learn':
          return <VercelLearnView onNavigateTab={setActiveTab} />;
        case 'test':
          return <VercelTestView />;
        case 'play':
          return <VercelPlayView />;
        default:
          return <VercelLearnView onNavigateTab={setActiveTab} />;
      }
    }

    if (isResend) {
      switch (activeTab) {
        case 'learn':
          return <ResendLearnView onNavigateTab={setActiveTab} />;
        case 'test':
          return <ResendTestView />;
        case 'play':
          return <ResendPlayView />;
        default:
          return <ResendLearnView onNavigateTab={setActiveTab} />;
      }
    }

    if (isSupabase) {
      switch (activeTab) {
        case 'learn':
          return <SupabaseLearnView onNavigateTab={setActiveTab} />;
        case 'test':
          return <SupabaseTestView />;
        case 'play':
          return <SupabasePlayView />;
        default:
          return <SupabaseLearnView onNavigateTab={setActiveTab} />;
      }
    }

    if (isNeon) {
      switch (activeTab) {
        case 'learn':
          return <NeonLearnView onNavigateTab={setActiveTab} />;
        case 'test':
          return <NeonTestView />;
        case 'play':
          return <NeonPlayView />;
        default:
          return <NeonLearnView onNavigateTab={setActiveTab} />;
      }
    }

    if (isAppSystem) {
      switch (activeTab) {
        case 'learn':
          return <AppSystemLearnView onNavigateTab={setActiveTab} />;
        case 'test':
          return <AppSystemTestView />;
        case 'play':
          return <AppSystemPlayView />;
        default:
          return <AppSystemLearnView onNavigateTab={setActiveTab} />;
      }
    }

    if (isAzure) {
      switch (activeTab) {
        case 'learn':
          return <AzureLearnView onNavigateTab={setActiveTab} />;
        case 'test':
          return <AzureTestView />;
        case 'play':
          return <AzurePlayView />;
        default:
          return <AzureLearnView onNavigateTab={setActiveTab} />;
      }
    }

    if (isAppWallet) {
      switch (activeTab) {
        case 'learn':
          return <AppWalletLearnView onNavigateTab={setActiveTab} />;
        case 'test':
          return <AppWalletTestView />;
        case 'play':
          return <AppWalletPlayView />;
        default:
          return <AppWalletLearnView onNavigateTab={setActiveTab} />;
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

  const getBookFooterInfo = () => {
    if (isFundamentals) {
      return {
        icon: <Terminal className="w-4 h-4" />,
        badgeColor: 'bg-amber-500 text-slate-950',
        title: 'Pre-AWS IT & Cloud Fundamentals',
        subtitle: '— Nền tảng IT vững chắc'
      };
    }
    if (isWebDomain) {
      return {
        icon: <Globe className="w-4 h-4" />,
        badgeColor: 'bg-emerald-500 text-slate-950',
        title: 'Web Domain & Web Administration',
        subtitle: '— Làm chủ tên miền & máy chủ'
      };
    }
    if (isDatabase) {
      return {
        icon: <Server className="w-4 h-4" />,
        badgeColor: 'bg-amber-500 text-slate-950',
        title: 'Database & Universal Free-DB Gateway',
        subtitle: '— Bách khoa toàn thư Database & MCP Gateway'
      };
    }
    if (isLinuxAdmin) {
      return {
        icon: <Terminal className="w-4 h-4" />,
        badgeColor: 'bg-emerald-500 text-slate-950',
        title: 'Linux & Unix Systems Administration',
        subtitle: '— Quản trị máy chủ Web, App, DB & AWS'
      };
    }
    if (isOpenSource) {
      return {
        icon: <GitBranch className="w-4 h-4" />,
        badgeColor: 'bg-purple-500 text-slate-950',
        title: 'Open Source & FOSS Mastery',
        subtitle: '— Tư tưởng, Kỹ thuật Git & Trở thành Contributor/Maintainer'
      };
    }
    if (isEmailMastery) {
      return {
        icon: <Mail className="w-4 h-4" />,
        badgeColor: 'bg-sky-500 text-slate-950',
        title: 'Email & Mail Server Systems Mastery',
        subtitle: '— Giao thức, SPF/DKIM/DMARC, Postfix & Cloud APIs'
      };
    }
    if (isVercel) {
      return {
        icon: <Triangle className="w-4 h-4" />,
        badgeColor: 'bg-indigo-500 text-white',
        title: 'Vercel Cloud & Edge Platform Mastery',
        subtitle: '— Next.js, Serverless, Edge & Monorepo'
      };
    }
    if (isResend) {
      return {
        icon: <Send className="w-4 h-4" />,
        badgeColor: 'bg-rose-500 text-white',
        title: 'Resend & Modern Email APIs Mastery',
        subtitle: '— React Email, Webhooks & Deliverability'
      };
    }
    if (isSupabase) {
      return {
        icon: <Database className="w-4 h-4" />,
        badgeColor: 'bg-emerald-500 text-slate-950',
        title: 'Supabase — Open Source Firebase & Postgres',
        subtitle: '— Postgres, RLS, Auth & Realtime'
      };
    }
    if (isNeon) {
      return {
        icon: <Zap className="w-4 h-4" />,
        badgeColor: 'bg-cyan-500 text-slate-950',
        title: 'Neon Serverless Postgres Mastery',
        subtitle: '— Storage/Compute Separation & Branching'
      };
    }
    if (isAppSystem) {
      return {
        icon: <Layers className="w-4 h-4" />,
        badgeColor: 'bg-violet-500 text-white',
        title: 'Unified-App-Infra BaaS & Platform Roadmap',
        subtitle: '— Kiến trúc BaaS tự host & Lộ trình 6 tính năng tương lai'
      };
    }
    if (isAzure) {
      return {
        icon: <Cloud className="w-4 h-4" />,
        badgeColor: 'bg-blue-600 text-white',
        title: 'Microsoft Azure Cloud Solutions Mastery',
        subtitle: '— Enterprise Architecture & Lộ trình AZ-900 / AZ-104 / AZ-305'
      };
    }
    if (isAppWallet) {
      return {
        icon: <Wallet className="w-4 h-4" />,
        badgeColor: 'bg-emerald-500 text-slate-950',
        title: "JohnnyHoang's App Wallet Mastery",
        subtitle: '— Quản trị Hệ sinh thái 17+ Apps, AI SRS Builder & In-App Backlog'
      };
    }
    return {
      icon: <Cloud className="w-4 h-4" />,
      badgeColor: 'bg-sky-500 text-white',
      title: 'AWS Cloud Mastery',
      subtitle: '— Học, Test & Chơi thực chiến'
    };
  };

  const footerInfo = getBookFooterInfo();

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
            <div className={`w-6 h-6 rounded-lg ${footerInfo.badgeColor} flex items-center justify-center font-black`}>
              {footerInfo.icon}
            </div>
            <span className="font-bold text-slate-200">
              {footerInfo.title}
            </span>
            <span className="text-slate-500">
              {footerInfo.subtitle}
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
            <span>JohnnyHoang Engineering Library &bull; 14 Tập Bách Khoa Toàn Thư Kỹ Sư & Hệ Sinh Thái Ứng Dụng</span>
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
