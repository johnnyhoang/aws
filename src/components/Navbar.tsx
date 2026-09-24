import React, { useState } from 'react';
import { useLearning, PortalMode } from '../context/LearningContext';
import { CloudSyncModal } from './CloudSyncModal';
import { UserLevelModal } from './UserLevelModal';
import { FundamentalsUserLevelModal } from './fundamentals/FundamentalsUserLevelModal';
import { ReadingModeModal } from './ReadingModeModal';
import { BookshelfMenu } from './BookshelfMenu';
import { FontSizeControl } from './FontSizeControl';
import { 
  BookOpen, 
  CheckCircle2, 
  Gamepad2, 
  ChevronDown,
  Flame, 
  Coins, 
  Glasses,
  Smartphone, 
  LogOut,
  Sparkles
} from 'lucide-react';

export type NavTab = 'learn' | 'test' | 'play';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const PORTAL_SHORT_TITLES: Record<PortalMode, { vol: number; title: string }> = {
  fundamentals: { vol: 1, title: 'IT Nền Tảng' },
  web_domain: { vol: 2, title: 'Web & Domain' },
  database: { vol: 3, title: 'Database' },
  linux_admin: { vol: 4, title: 'Linux Sysadmin' },
  aws: { vol: 5, title: 'AWS Cloud' },
  open_source: { vol: 6, title: 'Open Source' },
  email_mastery: { vol: 7, title: 'Email Systems' },
  vercel: { vol: 8, title: 'Vercel Cloud' },
  resend: { vol: 9, title: 'Resend API' },
  supabase: { vol: 10, title: 'Supabase' },
  neon: { vol: 11, title: 'Neon Serverless' },
  app_system: { vol: 12, title: 'App System BaaS' },
  azure: { vol: 13, title: 'Azure Cloud' },
  token_wallet: { vol: 14, title: 'Token Wallet' }
};

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const { 
    portalMode,
    authUser,
    logoutUser,
    userPoints,
    currentStreak,
    fontSizeScale,
    isReadingMode
  } = useLearning();

  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false);
  const [isBookshelfModalOpen, setIsBookshelfModalOpen] = useState(false);

  const currentBookInfo = PORTAL_SHORT_TITLES[portalMode] || { vol: 1, title: 'IT Nền Tảng' };

  const navTabs: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'learn', label: 'Học Tập', icon: BookOpen },
    { id: 'test', label: 'Luyện Thi', icon: CheckCircle2 },
    { id: 'play', label: 'Game & Lab', icon: Gamepad2 }
  ];

  return (
    <>
      {/* Zen Single-Row Header */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 text-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          
          {/* Left: Brand + Active Book Selector Dropdown Button */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsBookshelfModalOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-left cursor-pointer group shrink-0"
              title="Nhấp để đổi sang cuốn sách khác trong 14 tập"
            >
              <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs">
                #{currentBookInfo.vol}
              </div>
              <div className="hidden sm:block min-w-0">
                <div className="text-[10px] text-slate-500 font-mono leading-none">JOHNNYHOANG LIBRARY</div>
                <div className="text-xs font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
                  Tập {currentBookInfo.vol}: {currentBookInfo.title}
                </div>
              </div>
              <span className="sm:hidden text-xs font-bold text-white">
                Tập {currentBookInfo.vol}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-transform" />
            </button>
          </div>

          {/* Center: Segmented Navigation Control (3 Tabs) */}
          <nav className="hidden md:flex items-center bg-slate-900/90 p-1 rounded-lg border border-slate-800/90">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Quick Stats, Reading Tools & Account */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Streak & Points Pill */}
            <button
              onClick={() => setIsLevelModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-colors cursor-pointer"
              title="Thống kê chuỗi học tập & cấp độ"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono font-semibold text-white">{currentStreak}x</span>
              <span className="text-slate-700">|</span>
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono font-semibold text-emerald-300">{userPoints}</span>
            </button>

            {/* Reading Mode Button */}
            <button
              onClick={() => setIsReadingModalOpen(true)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                (fontSizeScale && fontSizeScale > 100) || isReadingMode
                  ? 'bg-slate-800 text-emerald-300 border-slate-700'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
              title="Cỡ chữ & Chế độ đọc"
            >
              <Glasses className="w-4 h-4" />
            </button>

            {/* Sync QR Modal */}
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer relative"
              title="Đồng bộ đa thiết bị"
            >
              <Smartphone className="w-4 h-4 text-sky-400" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            </button>

            {/* User Account */}
            {authUser && (
              <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-800">
                {authUser.avatarUrl ? (
                  <img
                    src={authUser.avatarUrl}
                    alt={authUser.name}
                    className="w-6 h-6 rounded-full border border-emerald-500/40 object-cover"
                    title={authUser.name}
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                    {authUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  onClick={logoutUser}
                  className="p-1 rounded-md text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Mobile Segmented Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-2 flex items-center justify-around">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-md transition-colors cursor-pointer ${
                isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modals */}
      <CloudSyncModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} />
      <ReadingModeModal isOpen={isReadingModalOpen} onClose={() => setIsReadingModalOpen(false)} />
      
      {portalMode === 'fundamentals' ? (
        <FundamentalsUserLevelModal isOpen={isLevelModalOpen} onClose={() => setIsLevelModalOpen(false)} />
      ) : (
        <UserLevelModal isOpen={isLevelModalOpen} onClose={() => setIsLevelModalOpen(false)} />
      )}

      {/* Bookshelf Categorized Modal */}
      {isBookshelfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-xl border border-slate-800 shadow-2xl">
            <button
              onClick={() => setIsBookshelfModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors text-xs"
              title="Đóng"
            >
              ✕
            </button>
            <BookshelfMenu onSelectBook={() => setIsBookshelfModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

