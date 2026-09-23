import React from 'react';
import { useLearning, PortalMode } from '../context/LearningContext';
import { Terminal, Globe, Server, Cloud, BookOpen, CheckCircle, Sparkles, GitBranch } from 'lucide-react';

interface BookItem {
  id: PortalMode;
  title: string;
  subtitle: string;
  author: string;
  icon: React.ComponentType<{ className?: string }>;
  spineBg: string;
  coverGradient: string;
  borderColor: string;
  glowColor: string;
  badgeText: string;
}

const BOOKS: BookItem[] = [
  {
    id: 'fundamentals',
    title: 'IT & Cloud Nền Tảng',
    subtitle: 'Pre-AWS Infrastructure',
    author: 'Tập 1 • Cơ Bản',
    icon: Terminal,
    spineBg: 'bg-amber-950 border-amber-700/60 text-amber-200',
    coverGradient: 'from-amber-900 via-amber-950 to-slate-950',
    borderColor: 'border-amber-500/40',
    glowColor: 'shadow-amber-500/20 ring-amber-500/50',
    badgeText: 'Tập 1'
  },
  {
    id: 'web_domain',
    title: 'Web & Quản Trị Domain',
    subtitle: 'DNS, HTTP & Web Server',
    author: 'Tập 2 • Web Admin',
    icon: Globe,
    spineBg: 'bg-emerald-950 border-emerald-700/60 text-emerald-200',
    coverGradient: 'from-emerald-900 via-emerald-950 to-slate-950',
    borderColor: 'border-emerald-500/40',
    glowColor: 'shadow-emerald-500/20 ring-emerald-500/50',
    badgeText: 'Tập 2'
  },
  {
    id: 'database',
    title: 'Cơ Sở Dữ Liệu & Gateway',
    subtitle: 'SQL, NoSQL & Free-DB',
    author: 'Tập 3 • Database',
    icon: Server,
    spineBg: 'bg-amber-950 border-amber-600/60 text-amber-100',
    coverGradient: 'from-amber-950 via-amber-900 to-slate-950',
    borderColor: 'border-amber-400/40',
    glowColor: 'shadow-amber-400/20 ring-amber-400/50',
    badgeText: 'Tập 3'
  },
  {
    id: 'linux_admin',
    title: 'Quản Trị Hệ Thống Linux',
    subtitle: 'Unix Shell & Server Ops',
    author: 'Tập 4 • Sysadmin',
    icon: Terminal,
    spineBg: 'bg-emerald-950 border-emerald-600/60 text-emerald-100',
    coverGradient: 'from-emerald-950 via-emerald-900 to-slate-950',
    borderColor: 'border-emerald-400/40',
    glowColor: 'shadow-emerald-400/20 ring-emerald-400/50',
    badgeText: 'Tập 4'
  },
  {
    id: 'aws',
    title: 'AWS Cloud Mastery',
    subtitle: 'Solutions Architecture',
    author: 'Tập 5 • Cloud Expert',
    icon: Cloud,
    spineBg: 'bg-sky-950 border-sky-600/60 text-sky-200',
    coverGradient: 'from-sky-900 via-sky-950 to-slate-950',
    borderColor: 'border-sky-400/40',
    glowColor: 'shadow-sky-400/20 ring-sky-400/50',
    badgeText: 'Tập 5'
  },
  {
    id: 'open_source',
    title: 'Open Source & FOSS Mastery',
    subtitle: 'Tư Tưởng, Git & Contributor',
    author: 'Tập 6 • Open Source',
    icon: GitBranch,
    spineBg: 'bg-purple-950 border-purple-600/60 text-purple-200',
    coverGradient: 'from-purple-900 via-purple-950 to-slate-950',
    borderColor: 'border-purple-400/40',
    glowColor: 'shadow-purple-400/20 ring-purple-400/50',
    badgeText: 'Tập 6'
  }
];

interface BookshelfMenuProps {
  onSelectBook?: (mode: PortalMode) => void;
  compact?: boolean;
}

export const BookshelfMenu: React.FC<BookshelfMenuProps> = ({ onSelectBook, compact = false }) => {
  const { portalMode, setPortalMode } = useLearning();

  const handleSelect = (id: PortalMode) => {
    setPortalMode(id);
    if (onSelectBook) onSelectBook(id);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
        {BOOKS.map((book) => {
          const isSelected = portalMode === book.id;
          const Icon = book.icon;
          return (
            <button
              key={book.id}
              onClick={() => handleSelect(book.id)}
              className={`relative group flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-300 cursor-pointer whitespace-nowrap ${
                isSelected
                  ? `${book.spineBg} ring-2 ${book.glowColor} -translate-y-0.5 shadow-lg`
                  : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {/* Book Spine Edge simulation */}
              <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 opacity-70 group-hover:opacity-100 transition-opacity" />
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
              <span className="text-xs font-semibold tracking-tight">{book.title}</span>
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Shelf Header */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 tracking-wide flex items-center gap-2">
              KỆ SÁCH HỌC TẬP MULTI-MODULE
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            </h3>
            <p className="text-xs text-slate-400">Chọn một cuốn sách để bắt đầu chương trình học tương ứng</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-amber-400/80 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-900/50">
          <span>6 TẬP BÁCH KHOA TOÀN THƯ</span>
        </div>
      </div>

      {/* Bookshelf Rack Visual */}
      <div className="relative pt-2 pb-6 px-2">
        {/* Books Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 relative z-10">
          {BOOKS.map((book) => {
            const isSelected = portalMode === book.id;
            const Icon = book.icon;

            return (
              <div
                key={book.id}
                onClick={() => handleSelect(book.id)}
                className={`group relative flex flex-col justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 min-h-[160px] select-none ${
                  isSelected
                    ? `bg-gradient-to-b ${book.coverGradient} ${book.borderColor} ring-2 ${book.glowColor} -translate-y-2 shadow-2xl scale-[1.02]`
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:-translate-y-1 hover:shadow-xl hover:bg-slate-900'
                }`}
              >
                {/* 3D Book Spine Left Edge */}
                <div className={`absolute top-0 bottom-0 left-0 w-2 rounded-l-xl bg-gradient-to-r ${isSelected ? 'from-amber-400/40 to-transparent' : 'from-slate-700/40 to-transparent'}`} />

                {/* Bookmark Ribbon if selected */}
                {isSelected && (
                  <div className="absolute top-0 right-4 w-3 h-7 bg-amber-400 rounded-b-sm shadow-md flex items-end justify-center pb-1 animate-bounce">
                    <CheckCircle className="w-2.5 h-2.5 text-slate-950" />
                  </div>
                )}

                {/* Top Section: Badge & Icon */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${isSelected ? 'bg-amber-400/20 border-amber-400/40 text-amber-300 font-semibold' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                    {book.badgeText}
                  </span>
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-800/80 text-slate-400 group-hover:text-slate-200'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Middle Section: Title & Subtitle */}
                <div className="my-2">
                  <h4 className={`text-sm font-bold tracking-tight line-clamp-2 ${isSelected ? 'text-slate-100' : 'text-slate-300 group-hover:text-slate-100'}`}>
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {book.subtitle}
                  </p>
                </div>

                {/* Bottom Section: Author / Status */}
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>{book.author}</span>
                  {isSelected ? (
                    <span className="text-amber-400 font-bold tracking-wider">ĐANG ĐỌC</span>
                  ) : (
                    <span className="group-hover:text-slate-300">MỞ SÁCH →</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Realistic Wooden/Metal Shelf Base */}
        <div className="mt-4 h-3 bg-gradient-to-r from-amber-950 via-amber-900 to-slate-900 rounded-lg border-t-2 border-amber-700/50 shadow-inner flex items-center justify-between px-4">
          <div className="w-2 h-2 rounded-full bg-amber-600/40" />
          <div className="w-2 h-2 rounded-full bg-amber-600/40" />
        </div>
      </div>
    </div>
  );
};
