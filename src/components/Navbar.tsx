import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { CERT_STAGES } from '../data/roadmapData';
import { DEEP_DIVE_LESSONS } from '../data/deepDiveLessons';
import { PORTFOLIO_PROJECTS } from '../data/portfolioProjects';
import { FUNDAMENTAL_DOMAINS } from '../data/fundamentals/domainsData';
import { FUNDAMENTAL_DEEP_DIVE_LESSONS } from '../data/fundamentals/deepDiveLessonsData';
import { FUNDAMENTAL_PROJECTS } from '../data/fundamentals/portfolioProjectsData';
import { calculateFundamentalLevel } from '../data/fundamentals/maturityLevelsData';
import { CloudSyncModal } from './CloudSyncModal';
import { UserLevelModal } from './UserLevelModal';
import { FundamentalsUserLevelModal } from './fundamentals/FundamentalsUserLevelModal';
import { ReadingModeModal } from './ReadingModeModal';
import { 
  Cloud, 
  Layers, 
  BookOpen, 
  FolderGit2, 
  CheckCircle2, 
  BrainCircuit, 
  GraduationCap, 
  CalendarDays, 
  Library, 
  Server, 
  Code2, 
  Smartphone, 
  UserCheck, 
  Tv, 
  Gamepad2,
  Flame,
  Coins,
  Sparkles,
  Terminal,
  Glasses
} from 'lucide-react';

export type NavTab = 
  | 'roadmap' 
  | 'video'
  | 'games'
  | 'deepdive' 
  | 'portfolio' 
  | 'quiz' 
  | 'flashcards' 
  | 'interview' 
  | 'studyplan' 
  | 'resources';

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
    completedStages, 
    completedLessons, 
    completedProjects,
    studyHoursLogged,
    userProfile,
    levelInfo,
    userPoints,
    currentStreak,
    fontSizeScale,
    isReadingMode
  } = useLearning();

  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false);

  // Dynamic calculations based on active portal mode
  const isFundamentals = portalMode === 'fundamentals';
  const fundamentalLevelInfo = calculateFundamentalLevel(userPoints);

  const totalItems = isFundamentals
    ? FUNDAMENTAL_DOMAINS.length + FUNDAMENTAL_DEEP_DIVE_LESSONS.length + FUNDAMENTAL_PROJECTS.length
    : CERT_STAGES.length + DEEP_DIVE_LESSONS.length + PORTFOLIO_PROJECTS.length;

  const completedCount = completedStages.length + completedLessons.length + completedProjects.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalItems) * 100));

  const navItems: { id: NavTab; label: string; mobileLabel: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'roadmap', label: isFundamentals ? '8 Lĩnh Vực' : 'Lộ Trình', mobileLabel: 'Lộ Trình', icon: Layers },
    { id: 'video', label: 'Học Qua Video', mobileLabel: 'Video', icon: Tv },
    { id: 'games', label: 'Game Học Tập', mobileLabel: 'Games', icon: Gamepad2 },
    { id: 'deepdive', label: 'Chuyên Đề Kỹ Năng', mobileLabel: 'Chuyên Đề', icon: BookOpen },
    { id: 'portfolio', label: 'Dự Án CV', mobileLabel: 'Dự Án', icon: FolderGit2 },
    { id: 'quiz', label: 'Luyện Đề', mobileLabel: 'Đề Thi', icon: CheckCircle2 },
    { id: 'flashcards', label: 'Flashcards', mobileLabel: 'Cards', icon: BrainCircuit },
    { id: 'interview', label: 'Cẩm Nang Phỏng Vấn', mobileLabel: 'Phỏng Vấn', icon: GraduationCap },
    { id: 'studyplan', label: 'Kế Hoạch', mobileLabel: 'Kế Hoạch', icon: CalendarDays },
    { id: 'resources', label: 'Tài Liệu', mobileLabel: 'Tài Liệu', icon: Library },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
        
        {/* Top Banner: Portal Switcher & Gamification HUD */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 px-3 sm:px-4 py-1.5 text-xs text-slate-300 flex items-center justify-between gap-2 overflow-hidden">
          
          {/* Dual Portal Switcher Pill */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-0.5 rounded-full border border-slate-700/80">
            <button
              onClick={() => setPortalMode('fundamentals')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                isFundamentals
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>IT Fundamentals</span>
            </button>
            <button
              onClick={() => setPortalMode('aws')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                !isFundamentals
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cloud className="w-3 h-3" />
              <span>AWS Cloud</span>
            </button>
          </div>

          {/* User Maturity Level Badge Button */}
          <button 
            onClick={() => setIsLevelModalOpen(true)}
            className="flex items-center gap-1.5 min-w-0 bg-slate-950/80 hover:bg-slate-900 px-2.5 py-0.5 rounded-full border border-amber-500/30 transition-all cursor-pointer group"
            title="Xem chi tiết Cấp độ Trưởng thành & Thống kê"
          >
            <span className="text-xs">{isFundamentals ? fundamentalLevelInfo.badge : levelInfo.badge}</span>
            <span className="font-bold text-amber-300 text-[11px] truncate group-hover:text-amber-200">
              Lv.{isFundamentals ? fundamentalLevelInfo.level : levelInfo.level} {isFundamentals ? fundamentalLevelInfo.titleEn : levelInfo.titleEn}
            </span>
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400 font-mono">
              <span className="w-12 bg-slate-800 rounded-full h-1.5 overflow-hidden inline-block ml-1">
                <span 
                  className="bg-amber-400 h-full block rounded-full" 
                  style={{ width: `${isFundamentals ? fundamentalLevelInfo.progressPercent : levelInfo.progressPercent}%` }}
                />
              </span>
              <span>{isFundamentals ? fundamentalLevelInfo.progressPercent : levelInfo.progressPercent}%</span>
            </div>
          </button>

          {/* Quick Stats & Cloud Sync */}
          <div className="flex items-center gap-2 text-slate-300 font-medium flex-shrink-0">
            
            {/* Streak flame */}
            <div 
              onClick={() => setIsLevelModalOpen(true)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-[11px] font-bold cursor-pointer"
              title="Chuỗi trả lời đúng liên tiếp"
            >
              <Flame className="w-3 h-3 text-orange-400 animate-bounce" />
              <span>{currentStreak}x</span>
            </div>

            {/* Points */}
            <div 
              onClick={() => setIsLevelModalOpen(true)}
              className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold cursor-pointer"
              title="Điểm xếp hạng học tập"
            >
              <Coins className="w-3 h-3 text-amber-400" />
              <span>{userPoints} pts</span>
            </div>

            {/* Reading Mode / Font Size Button */}
            <button
              onClick={() => setIsReadingModalOpen(true)}
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                (fontSizeScale && fontSizeScale > 100) || isReadingMode
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
              title="Tùy chỉnh cỡ chữ & Chế độ đọc chữ lớn"
              aria-label="Tùy chỉnh cỡ chữ & Chế độ đọc chữ lớn"
            >
              <Glasses className="w-3 h-3" />
              <span>Aa {(fontSizeScale && fontSizeScale > 100) ? `${fontSizeScale}%` : 'Chữ Lớn'}</span>
            </button>

            {/* Sync Button */}
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border transition-all ${
                userProfile
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                  : 'bg-sky-500/15 text-sky-300 border-sky-500/30 hover:bg-sky-500/25'
              }`}
            >
              {userProfile ? (
                <>
                  <UserCheck className="w-3 h-3 text-emerald-400" />
                  <span className="truncate max-w-[80px] sm:max-w-none">{userProfile.name}</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3 h-3 text-sky-400" />
                  <span>Đồng Bộ</span>
                </>
              )}
            </button>

            <span className="hidden md:flex items-center gap-1 text-[11px] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <strong>{studyHoursLogged}h</strong>
            </span>

            <span className="text-[11px] hidden sm:inline">
              Tiến độ: <strong className="text-amber-300">{progressPercent}%</strong>
            </span>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16 gap-2 sm:gap-4">
            
            {/* Logo & App Title */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer min-w-0" 
              onClick={() => onTabChange('roadmap')}
            >
              <div className={`w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br ${
                isFundamentals 
                  ? 'from-amber-500 via-orange-600 to-purple-600' 
                  : 'from-amber-500 via-orange-600 to-sky-600'
              } flex items-center justify-center shadow-lg flex-shrink-0`}>
                {isFundamentals ? <Terminal className="w-4 h-4 md:w-5 md:h-5 text-white" /> : <Cloud className="w-4 h-4 md:w-5 md:h-5 text-white" />}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm md:text-lg text-white tracking-tight truncate">
                    {isFundamentals ? 'IT Fundamentals' : 'AWS Mastery'}
                  </span>
                  <span className={`text-[9px] uppercase font-bold tracking-wider px-1 py-0.2 rounded flex-shrink-0 ${
                    isFundamentals 
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                      : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                  }`}>
                    {isFundamentals ? 'Pre-AWS' : 'Higher-Ed'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block truncate">
                  {isFundamentals ? 'Master toàn diện 8 lĩnh vực IT sẵn sàng cho Cloud' : 'Lộ trình chinh phục Đám mây & Chứng chỉ AWS'}
                </p>
              </div>
            </div>

            {/* Career Track Switcher */}
            <div className="bg-slate-800/90 p-0.5 sm:p-1 rounded-xl border border-slate-700/80 flex items-center gap-0.5 flex-shrink-0">
              <button
                onClick={() => setTrack('cloud_engineer')}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all duration-200 ${
                  currentTrack === 'cloud_engineer'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <Server className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Systems / Infra</span>
                <span className="sm:hidden">Systems</span>
              </button>
              <button
                onClick={() => setTrack('software_developer')}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all duration-200 ${
                  currentTrack === 'software_developer'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-900/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Developer / Web</span>
                <span className="sm:hidden">Developer</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs (Desktop & Tablet) */}
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar py-2 -mb-px border-t border-slate-800/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Fixed 1-row) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/98 backdrop-blur-lg border-t border-slate-800 px-1 py-1 shadow-2xl safe-area-pb">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 7).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-colors flex-1 min-w-0 ${
                  isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full">
                  {item.mobileLabel}
                </span>
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

      {/* User Maturity Level & Stats Modal */}
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
    </>
  );
};
