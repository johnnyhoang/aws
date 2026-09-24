import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { CloudSyncModal } from './CloudSyncModal';
import { UserLevelModal } from './UserLevelModal';
import { FundamentalsUserLevelModal } from './fundamentals/FundamentalsUserLevelModal';
import { ReadingModeModal } from './ReadingModeModal';
import { BookshelfMenu } from './BookshelfMenu';
import { FontSizeControl } from './FontSizeControl';
import { 
  Cloud, 
  BookOpen, 
  CheckCircle2, 
  Gamepad2,
  Server, 
  Code2, 
  Smartphone, 
  UserCheck, 
  Flame, 
  Coins, 
  Terminal, 
  Glasses,
  Globe,
  LogOut,
  Sparkles,
  Layers
} from 'lucide-react';

export type NavTab = 'learn' | 'test' | 'play';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const { 
    portalMode,
    setPortalMode,
    currentTrack, 
    setTrack, 
    userProfile,
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

  const navItems: { 
    id: NavTab; 
    label: string; 
    icon: React.ComponentType<{ className?: string }> 
  }[] = [
    { 
      id: 'learn', 
      label: 'Học', 
      icon: BookOpen 
    },
    { 
      id: 'test', 
      label: 'Test', 
      icon: CheckCircle2 
    },
    { 
      id: 'play', 
      label: 'Chơi', 
      icon: Gamepad2 
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800/80 text-slate-200">
        
        {/* Top Minimal Utility Bar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between text-xs border-b border-slate-900">
          
          {/* Bookshelf Menu Bar (Compact Books Spines) */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800/90 overflow-x-auto no-scrollbar max-w-[65%] sm:max-w-[75%]">
            <button
              onClick={() => setIsBookshelfModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-all font-semibold cursor-pointer shrink-0"
              title="Mở toàn bộ Kệ Sách 3D"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Kệ Sách</span>
            </button>
            <div className="h-4 w-px bg-slate-800 shrink-0" />
            <BookshelfMenu compact={true} />
          </div>

          {/* Utility Tools (Minimal Icon Buttons with tooltips) */}
          <div className="flex items-center gap-2 text-slate-400">
            
            {/* Track Switcher Icons */}
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button
                onClick={() => setTrack('cloud_engineer')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTrack === 'cloud_engineer'
                    ? 'bg-slate-800 text-amber-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Định hướng: Systems / Cloud Infra"
                aria-label="Systems / Cloud Infra"
              >
                <Server className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTrack('software_developer')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTrack === 'software_developer'
                    ? 'bg-slate-800 text-amber-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Định hướng: Software Developer"
                aria-label="Software Developer"
              >
                <Code2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Streak & Points */}
            <button 
              onClick={() => setIsLevelModalOpen(true)}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
              title="Cấp độ & Thống kê chuỗi học tập"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono">{currentStreak}x</span>
              <span className="text-slate-600">|</span>
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono">{userPoints}</span>
            </button>

            {/* Quick Inline Font Size Control */}
            <FontSizeControl className="hidden sm:inline-flex" />

            {/* Reading Mode Button */}
            <button
              onClick={() => setIsReadingModalOpen(true)}
              className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                (fontSizeScale && fontSizeScale > 100) || isReadingMode
                  ? 'bg-slate-800 text-amber-300 border-slate-700'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Cỡ chữ & Chế độ đọc"
              aria-label="Cỡ chữ & Chế độ đọc"
            >
              <Glasses className="w-3.5 h-3.5" />
            </button>

            {/* Sync Button */}
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer relative"
              title="Tự động đồng bộ đa thiết bị (Quét QR)"
              aria-label="Tự động đồng bộ đa thiết bị"
            >
              <Smartphone className="w-3.5 h-3.5 text-sky-400" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            </button>

            {/* User Account / Logout */}
            {authUser && (
              <div className="flex items-center gap-1.5 pl-1 border-l border-slate-800">
                {authUser.avatarUrl ? (
                  <img
                    src={authUser.avatarUrl}
                    alt={authUser.name}
                    className="w-5 h-5 rounded-full border border-amber-400/40 object-cover"
                    title={`Đang đăng nhập: ${authUser.name}`}
                  />
                ) : (
                  <div 
                    className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] flex items-center justify-center border border-amber-500/30"
                    title={`Đang đăng nhập: ${authUser.name}`}
                  >
                    {authUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-[11px] font-medium text-slate-300 hidden md:inline max-w-[90px] truncate">
                  {authUser.name}
                </span>
                <button
                  onClick={logoutUser}
                  className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                  title="Đăng xuất"
                  aria-label="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Main Nav Navigation Bar (3 Clean Tabs) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
          
          {/* Logo / Book Brand */}
          <div 
            onClick={() => onTabChange('learn')}
            className="flex items-center gap-2 cursor-pointer text-slate-100 hover:text-amber-300 transition-colors"
          >
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-sm tracking-tight">
              {isFundamentals ? 'Sách IT Nền Tảng' : isWebDomain ? 'Sách Web & Domain' : isDatabase ? 'Sách Cơ Sở Dữ Liệu' : isLinuxAdmin ? 'Sách Linux & Unix Sysadmin' : isOpenSource ? 'Sách Open Source & FOSS' : isEmailMastery ? 'Sách Email & Mail Server' : isVercel ? 'Sách Vercel Cloud' : isResend ? 'Sách Resend Email API' : isSupabase ? 'Sách Supabase Postgres' : isNeon ? 'Sách Neon Serverless DB' : isAppSystem ? 'Sách Unified-App-Infra BaaS' : isAzure ? 'Sách Microsoft Azure Cloud' : 'Sách AWS Cloud'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-amber-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/98 backdrop-blur-sm border-t border-slate-800 px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-4 rounded-md transition-colors cursor-pointer ${
                  isActive 
                    ? 'text-amber-400 font-semibold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Cloud Sync Modal */}
      <CloudSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />

      {/* Reading Mode & Font Size Modal */}
      <ReadingModeModal
        isOpen={isReadingModalOpen}
        onClose={() => setIsReadingModalOpen(false)}
      />

      {/* Level Modal */}
      {isFundamentals ? (
        <FundamentalsUserLevelModal
          isOpen={isLevelModalOpen}
          onClose={() => setIsLevelModalOpen(false)}
        />
      ) : (
        <UserLevelModal
          isOpen={isLevelModalOpen}
          onClose={() => setIsLevelModalOpen(false)}
        />
      )}

      {/* Bookshelf Interactive Modal */}
      {isBookshelfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl border border-slate-800 shadow-2xl">
            <button
              onClick={() => setIsBookshelfModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-100 flex items-center justify-center cursor-pointer transition-colors"
              title="Đóng Kệ Sách"
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
