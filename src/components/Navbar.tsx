import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { CERT_STAGES } from '../data/roadmapData';
import { DEEP_DIVE_LESSONS } from '../data/deepDiveLessons';
import { PORTFOLIO_PROJECTS } from '../data/portfolioProjects';
import { CloudSyncModal } from './CloudSyncModal';
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
  Sparkles,
  Server,
  Code2,
  Smartphone,
  UserCheck,
  Tv,
  Gamepad2
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
    currentTrack, 
    setTrack, 
    completedStages, 
    completedLessons, 
    completedProjects,
    studyHoursLogged,
    userProfile
  } = useLearning();

  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  const totalItems = CERT_STAGES.length + DEEP_DIVE_LESSONS.length + PORTFOLIO_PROJECTS.length;
  const completedCount = completedStages.length + completedLessons.length + completedProjects.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalItems) * 100));

  const navItems: { id: NavTab; label: string; mobileLabel: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'roadmap', label: 'Lộ Trình', mobileLabel: 'Lộ Trình', icon: Layers },
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
        
        {/* Top Banner: Target info & Quick Cloud Sync */}
        <div className="bg-gradient-to-r from-amber-600/20 via-sky-600/20 to-emerald-600/20 border-b border-slate-800/80 px-3 sm:px-4 py-1 text-xs text-slate-300 flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="inline-flex items-center gap-1 font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20 text-[11px] whitespace-nowrap">
              <Sparkles className="w-3 h-3 flex-shrink-0" />
              <span>Phòng IT Đại Học Mỹ</span>
            </span>
            <span className="hidden md:inline text-slate-400 text-xs truncate">
              (Kent State, Ohio State, Big Ten...)
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-300 font-medium flex-shrink-0">
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
                  <span className="truncate max-w-[100px] sm:max-w-none">{userProfile.name}</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3 h-3 text-sky-400" />
                  <span>Đồng Bộ</span>
                </>
              )}
            </button>

            <span className="hidden sm:flex items-center gap-1 text-[11px] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <strong>{studyHoursLogged}h</strong>
            </span>

            <span className="text-[11px]">
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
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-sky-600 flex items-center justify-center shadow-lg shadow-orange-500/20 flex-shrink-0">
                <Cloud className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm md:text-lg text-white tracking-tight truncate">
                    AWS Mastery
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1 py-0.2 bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded flex-shrink-0">
                    Higher-Ed
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block truncate">Lộ trình chinh phục Đám mây & Chứng chỉ AWS</p>
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
                <span className="hidden sm:inline">Systems / Cloud</span>
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
                <span className="hidden sm:inline">Software Dev</span>
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-800 text-amber-400 border border-amber-500/30 shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full bg-slate-800 h-1">
          <div 
            className="bg-gradient-to-r from-amber-500 via-sky-500 to-emerald-500 h-1 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Mobile Sticky Bottom Navigation Bar (Thumb Friendly & Clean 1-Row Labels) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-1 py-1 flex items-center justify-around text-[9.5px] font-medium text-slate-400 shadow-2xl safe-bottom">
        {navItems.slice(0, 6).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center py-1 px-1 rounded-lg transition-colors flex-1 ${
                isActive ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5 flex-shrink-0" />
              <span className="truncate max-w-[50px]">{item.mobileLabel}</span>
            </button>
          );
        })}
        <button
          onClick={() => setIsSyncModalOpen(true)}
          className="flex flex-col items-center py-1 px-1 rounded-lg text-sky-400 hover:text-sky-300 font-bold flex-1"
        >
          <Cloud className="w-4 h-4 mb-0.5 flex-shrink-0" />
          <span>Đồng Bộ</span>
        </button>
      </nav>

      {/* Cloud Sync Modal Dialog */}
      <CloudSyncModal 
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />
    </>
  );
};
