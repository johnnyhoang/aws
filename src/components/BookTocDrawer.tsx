import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ListOrdered,
  BookOpen
} from 'lucide-react';

export interface TocChapterItem {
  id: string;
  chapterNumber: number;
  title: string;
  level: string;
  readTimeMinutes: number;
  category: string;
}

interface BookTocDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: TocChapterItem[];
  currentChapterId: string;
  completedLessonIds: string[];
  onSelectChapter: (id: string) => void;
  categoryNames?: Record<string, string>;
  accentColorClass?: string; // e.g., 'text-violet-400', 'bg-violet-600'
  bookTitle?: string;
  onNavigateTab?: (tab: 'learn' | 'test' | 'play') => void;
  testTabLabel?: string;
  playTabLabel?: string;
}

export const BookTocDrawer: React.FC<BookTocDrawerProps> = ({
  isOpen,
  onClose,
  chapters,
  currentChapterId,
  completedLessonIds,
  onSelectChapter,
  categoryNames,
  accentColorClass = 'text-amber-400',
  bookTitle = 'Mục Lục Chương Sách',
  onNavigateTab,
  testTabLabel,
  playTabLabel
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredChapters = filterCategory === 'all'
    ? chapters
    : chapters.filter(ch => ch.category === filterCategory);

  const completedCount = chapters.filter(ch => completedLessonIds.includes(ch.id)).length;
  const progressPercent = Math.round((completedCount / chapters.length) * 100);

  const handleChapterClick = (id: string) => {
    onSelectChapter(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch animate-fadeIn">
      {/* Dimmed Blurred Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-slate-950 border-r border-slate-800 shadow-2xl z-10 flex flex-col h-full overflow-hidden text-slate-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-900/60">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <BookOpen className={`w-4 h-4 ${accentColorClass}`} />
              <h3 className="text-sm font-bold text-slate-100 truncate">
                {bookTitle}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>Tiến độ: {completedCount}/{chapters.length} ({progressPercent}%)</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-100 hover:border-slate-600 transition-colors cursor-pointer shrink-0"
            title="Đóng mục lục (Esc)"
            aria-label="Đóng mục lục"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters (If category names provided) */}
        {categoryNames && Object.keys(categoryNames).length > 0 && (
          <div className="p-3 border-b border-slate-800/80 bg-slate-900/30">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  filterCategory === 'all'
                    ? 'bg-slate-800 text-slate-100 border border-slate-700 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tất cả ({chapters.length})
              </button>
              {Object.entries(categoryNames).map(([catKey, catLabel]) => (
                <button
                  key={catKey}
                  onClick={() => setFilterCategory(catKey)}
                  className={`px-2 py-1 rounded-md text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                    filterCategory === catKey
                      ? 'bg-slate-800 text-slate-100 border border-slate-700 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {catLabel}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chapter List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1.5">
          {filteredChapters.map((ch) => {
            const isSelected = ch.id === currentChapterId;
            const isDone = completedLessonIds.includes(ch.id);

            return (
              <div
                key={ch.id}
                onClick={() => handleChapterClick(ch.id)}
                className={`cursor-pointer p-3 rounded-xl transition-all flex items-start justify-between gap-3 border ${
                  isSelected
                    ? 'bg-slate-900 text-slate-100 border-slate-700 shadow-md ring-1 ring-slate-600'
                    : 'bg-slate-950/60 border-slate-900/80 hover:bg-slate-900/60 hover:border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="text-xs font-semibold flex items-center gap-1.5 leading-snug">
                    <span className={`font-mono font-bold ${accentColorClass}`}>
                      #{ch.chapterNumber}
                    </span>
                    <span className="truncate">{ch.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span className="text-slate-400 text-[10px] uppercase font-mono">{ch.level}</span>
                    <span>•</span>
                    <span>{ch.readTimeMinutes} phút đọc</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-700" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Quick Links (Test / Play) */}
        {onNavigateTab && (testTabLabel || playTabLabel) && (
          <div className="p-3 border-t border-slate-800 bg-slate-900/50 space-y-1.5 text-xs">
            {testTabLabel && (
              <button
                onClick={() => {
                  onNavigateTab('test');
                  onClose();
                }}
                className="w-full py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors text-left flex items-center justify-between cursor-pointer border border-slate-800"
              >
                <span>{testTabLabel}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            )}
            {playTabLabel && (
              <button
                onClick={() => {
                  onNavigateTab('play');
                  onClose();
                }}
                className="w-full py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors text-left flex items-center justify-between cursor-pointer border border-slate-800"
              >
                <span>{playTabLabel}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
