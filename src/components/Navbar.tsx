import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { CAREER_TRACKS } from '../data/roadmapData';
import { DEEP_DIVE_LESSONS } from '../data/deepDiveLessons';
import { PORTFOLIO_PROJECTS } from '../data/portfolioProjects';
import { CERT_STAGES } from '../data/roadmapData';
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
  RefreshCw,
  UserCheck,
  Tv
} from 'lucide-react';

export type NavTab = 
  | 'roadmap' 
  | 'video'
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
    userProfile,
    syncStatus
  } = useLearning();

  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  const totalItems = CERT_STAGES.length + DEEP_DIVE_LESSONS.length + PORTFOLIO_PROJECTS.length;
  const completedCount = completedStages.length + completedLessons.length + completedProjects.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalItems) * 100));

  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'roadmap', label: 'Lộ Trình', icon: Layers },
    { id: 'video', label: 'Học Qua Video', icon: Tv },
    { id: 'deepdive', label: 'Chuyên Đề Kỹ Năng', icon: BookOpen },
    { id: 'portfolio', label: 'Dự Án CV', icon: FolderGit2 },
    { id: 'quiz', label: 'Luyện Đề', icon: CheckCircle2 },
    { id: 'flashcards', label: 'Flashcards', icon: BrainCircuit },
    { id: 'interview', label: 'Cẩm Nang Phỏng Vấn', icon: GraduationCap },
    { id: 'studyplan', label: 'Kế Hoạch', icon: CalendarDays },
    { id: 'resources', label: 'Tài Liệu', icon: Library },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
        {/* Top Banner: University Focus & Cloud Sync Indicator */}
        <div className="bg-gradient-to-r from-amber-600/20 via-sky-600/20 to-emerald-600/20 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              Mục Tiêu: Phòng IT Đại Học Mỹ
            </span>
            <span className="hidden md:inline text-slate-400">
              (Kent State University, Ohio State, Big Ten...)
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300 font-medium">
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all ${
                userProfile
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                  : 'bg-sky-500/15 text-sky-300 border-sky-500/30 hover:bg-sky-500/25 animate-pulse'
              }`}
            >
              {userProfile ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">{userProfile.name}</span>
                  <span className="sm:hidden">Đã Đồng Bộ</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                  <span>Đồng Bộ Máy Chủ / Mobile</span>
                </>
              )}
            </button>

            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <strong>{studyHoursLogged}h học</strong>
            </span>

            <span className="flex items-center gap-1">
              Tiến độ: <strong className="text-amber-300">{progressPercent}%</strong>
            </span>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Logo & App Title */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('roadmap')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-sky-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-white tracking-tight">AWS Cloud Mastery</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded">
                    Higher-Ed
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">Lộ trình chinh phục Đám mây & Chứng chỉ AWS</p>
              </div>
            </div>

            {/* Career Track Switcher */}
            <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 flex items-center gap-1">
              <button
                onClick={() => setTrack('cloud_engineer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  currentTrack === 'cloud_engineer'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Systems / Cloud Engineer</span>
                <span className="sm:hidden">Systems</span>
              </button>
              <button
                onClick={() => setTrack('software_developer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  currentTrack === 'software_developer'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-900/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Software Developer</span>
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
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-800 text-amber-400 border border-amber-500/30 shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
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

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1 flex items-center justify-around text-[10px] font-medium text-slate-400 shadow-2xl">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                isActive ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setIsSyncModalOpen(true)}
          className="flex flex-col items-center py-1 px-2 rounded-lg text-sky-400 hover:text-sky-300 font-bold"
        >
          <Cloud className="w-4 h-4 mb-0.5" />
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
