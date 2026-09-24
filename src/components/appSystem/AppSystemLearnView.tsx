import React, { useState } from 'react';
import { APP_SYSTEM_CHAPTERS } from '../../data/appSystem/appSystemLessonsData';
import { AppSystemChapter, AppSystemCategory } from '../../types/appSystemModule';
import { 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  CheckCircle2, 
  Circle,
  Bookmark
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAudioReader } from '../../context/AudioReaderContext';
import { FontSizeControl } from '../FontSizeControl';

interface AppSystemLearnViewProps {
  onNavigateTab?: (tab: 'learn' | 'test' | 'play') => void;
}

const CATEGORY_NAMES: Record<AppSystemCategory, string> = {
  overview_philosophy: 'Khởi Nguyên & Triết Lý BaaS',
  monorepo_architecture: 'Kiến Trúc 6 Gói Monorepo',
  security_cryptography: 'Mật Mã Học & AES-256-GCM',
  rbac_abac_policies: 'ABAC Data Gateway & RLS',
  multi_database_adapters: 'Multi-DB Adapters',
  centralized_auth_mfa: 'Centralized Better Auth & MFA',
  client_sdk_design: 'Thiết Kế SDK (@infra/sdk)',
  admin_dashboard_ops: 'Admin Dashboard & Vận Hành',
  testing_runbooks: 'Kiểm Thử Live Proofs',
  future_roadmap_expansion: 'Bản Đồ Nâng Cấp Tương Lai'
};

export const AppSystemLearnView: React.FC<AppSystemLearnViewProps> = ({ onNavigateTab }) => {
  const { completedLessons, toggleLessonCompleted, bookmarkedLessons, toggleLessonBookmark } = useLearning();
  const { startReadingArticle, isPlaying, articleTitle } = useAudioReader();
  const [selectedChapterId, setSelectedChapterId] = useState<string>(APP_SYSTEM_CHAPTERS[0].id);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const currentChapter: AppSystemChapter = APP_SYSTEM_CHAPTERS.find(c => c.id === selectedChapterId) || APP_SYSTEM_CHAPTERS[0];
  const currentIndex = APP_SYSTEM_CHAPTERS.findIndex(c => c.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? APP_SYSTEM_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < APP_SYSTEM_CHAPTERS.length - 1 ? APP_SYSTEM_CHAPTERS[currentIndex + 1] : null;

  const isCompleted = completedLessons.includes(currentChapter.id);
  const isBookmarked = bookmarkedLessons.includes(currentChapter.id);

  const filteredChapters = filterCategory === 'all'
    ? APP_SYSTEM_CHAPTERS
    : APP_SYSTEM_CHAPTERS.filter(ch => ch.category === filterCategory);

  const completedCount = APP_SYSTEM_CHAPTERS.filter(ch => completedLessons.includes(ch.id)).length;
  const progressPercent = Math.round((completedCount / APP_SYSTEM_CHAPTERS.length) * 100);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(id);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleSelectChapter = (id: string) => {
    setSelectedChapterId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-slate-300">
      
      {/* Book Hero Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
            Sách Chuyên Khảo: Unified-App-Infra Architecture & Evolution
          </div>

          <div className="flex items-center gap-3 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <span className="text-slate-400 font-medium">Tiến độ đọc:</span>
            <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-violet-500 to-indigo-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono font-bold text-violet-400">{completedCount}/{APP_SYSTEM_CHAPTERS.length} bài ({progressPercent}%)</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight leading-tight">
          Làm Chủ Unified-App-Infra: Kiến Trúc Nền Tảng BaaS Tự Host, Bảo Mật Đa Tầng & Lộ Trình Nâng Cấp
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
          Bộ chuyên khảo 10 chương toàn diện: Đi sâu vào kiến trúc thực tế của hệ thống 6 Packages Monorepo, cơ chế mã hóa AES-256-GCM với AAD, bộ lọc ABAC Data Gateway an toàn cho Publishable Key, kết nối linh hoạt đa Database (Neon, Supabase, Turso), kiểm thử Live Infrastructure Proofs và khám phá lộ trình 6 tính năng đột phá trong tương lai (Storage Gateway R2, Distributed Task Queue, Realtime CDC, AI Vector, Edge Caching, Multi-tenant Stripe Metering).
        </p>
      </div>

      {/* Main Book Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar: Table of Contents */}
        <aside className="lg:col-span-4 space-y-3 lg:sticky lg:top-20">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Mục Lục 10 Chương</span>
            <span className="font-mono text-slate-500">{filteredChapters.length} bài</span>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Tất cả
            </button>
            {Object.entries(CATEGORY_NAMES).slice(0, 4).map(([catKey, catLabel]) => (
              <button
                key={catKey}
                onClick={() => setFilterCategory(catKey)}
                className={`px-2 py-1 rounded-md text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                  filterCategory === catKey
                    ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40 font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {catLabel}
              </button>
            ))}
          </div>

          {/* Chapter Navigation List */}
          <nav className="space-y-1 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
            {filteredChapters.map((ch) => {
              const isSelected = ch.id === currentChapter.id;
              const isDone = completedLessons.includes(ch.id);

              return (
                <div
                  key={ch.id}
                  onClick={() => handleSelectChapter(ch.id)}
                  className={`cursor-pointer px-3 py-2 rounded-lg transition-all flex items-start justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-violet-950/40 text-violet-200 font-medium border-l-2 border-violet-500'
                      : 'hover:bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-xs font-medium truncate flex items-center gap-1.5">
                      <span className="font-mono text-violet-400 font-bold">#{ch.chapterNumber}</span>
                      <span className="truncate">{ch.title.split(':')[0]}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="text-slate-400 text-[10px]">{ch.level}</span>
                      <span>•</span>
                      <span>{ch.readTimeMinutes}p đọc</span>
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
          </nav>

          {/* Quick Tab Jump */}
          {onNavigateTab && (
            <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
              <button
                onClick={() => onNavigateTab('test')}
                className="w-full py-2 px-3 rounded-lg hover:bg-slate-900/80 text-slate-400 hover:text-violet-300 transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <span>Luyện Thi Tình Huống Kỹ Sư Hạ Tầng</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button
                onClick={() => onNavigateTab('play')}
                className="w-full py-2 px-3 rounded-lg hover:bg-slate-900/80 text-slate-400 hover:text-violet-300 transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <span>Khám Phá Flashcards Thuật Ngữ Cốt Lõi</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          )}
        </aside>

        {/* Right Content: Long-form Chapter Book Content */}
        <article className="lg:col-span-8 space-y-8">
          
          {/* Chapter Metadata & Header */}
          <div className="space-y-4 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono text-violet-300 font-semibold uppercase">
                  {currentChapter.level}
                </span>
                <span>•</span>
                <span className="text-slate-400 font-mono">
                  {CATEGORY_NAMES[currentChapter.category]}
                </span>
                <span>•</span>
                <span className="text-slate-400 font-mono">
                  ~{currentChapter.readTimeMinutes} phút đọc
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <FontSizeControl />

                <button
                  onClick={() => startReadingArticle(currentChapter.title, currentChapter.sections)}
                  className={`px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isPlaying && articleTitle === currentChapter.title
                      ? 'bg-violet-500/20 text-violet-300 border-violet-500/50 shadow-sm animate-pulse'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-violet-300 hover:border-slate-700'
                  }`}
                  title="Nghe giọng đọc toàn bộ chương này"
                  aria-label="Nghe bài đọc"
                >
                  <span className="text-[11px] font-medium">Nghe bài</span>
                </button>

                <button
                  onClick={() => toggleLessonBookmark(currentChapter.id)}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isBookmarked
                      ? 'bg-amber-950/40 text-amber-400 border-amber-800/50'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                  title={isBookmarked ? 'Bỏ đánh dấu' : 'Lưu lại bài đọc này'}
                  aria-label="Đánh dấu bài đọc"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  onClick={() => toggleLessonCompleted(currentChapter.id)}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                  title={isCompleted ? 'Đã hoàn thành chương này (+100 XP)' : 'Đánh dấu đã đọc xong (+100 XP)'}
                  aria-label="Đánh dấu hoàn thành"
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight leading-snug">
              Chương {currentChapter.chapterNumber}: {currentChapter.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {currentChapter.subtitle}
            </p>
          </div>

          {/* Hook Story Box */}
          {currentChapter.hookStory && (
            <div className="border-l-2 border-violet-500/80 pl-4 py-1.5 space-y-1 bg-violet-950/10 rounded-r-lg">
              <div className="text-[11px] font-bold text-violet-400 uppercase tracking-wider">
                Bối Cảnh Khởi Nguyên & Thực Chiến
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{currentChapter.hookStory}"
              </p>
            </div>
          )}

          {/* Chapter Summary Quote */}
          <blockquote className="border-l-2 border-violet-500/70 pl-4 py-2 text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-slate-900/30 rounded-r-lg">
            <strong className="text-violet-400 not-italic font-semibold block mb-0.5">Tóm tắt giá trị cốt lõi:</strong>
            {currentChapter.summary}
          </blockquote>

          {/* Main Sections */}
          <div className="space-y-8">
            {currentChapter.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-3.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-violet-400 rounded-full inline-block" />
                  <span>{section.heading}</span>
                </h3>

                {section.subheading && (
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-400 tracking-wide">
                    {section.subheading}
                  </h4>
                )}

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>

                {/* Speaker Quote */}
                {section.storyQuote && (
                  <div className="border-l-2 border-amber-400 pl-4 py-2 text-xs sm:text-sm text-slate-200 space-y-1 bg-slate-900/30 rounded-r-lg">
                    <p className="italic font-serif leading-relaxed">
                      "{section.storyQuote.quote}"
                    </p>
                    <div className="text-[11px] text-amber-400 font-semibold text-right">
                      — {section.storyQuote.speaker} ({section.storyQuote.role}) {section.storyQuote.year && `• ${section.storyQuote.year}`}
                    </div>
                  </div>
                )}

                {/* Bullet Points */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {section.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx}>{bp}</li>
                    ))}
                  </ul>
                )}

                {/* Mindset Shift */}
                {section.mindsetShift && (
                  <div className="p-3.5 rounded-lg bg-slate-900/40 border-l-2 border-violet-500 space-y-2.5 text-xs">
                    <div className="font-bold text-violet-400 uppercase tracking-wide">
                      Bước Nhảy Vọt Tư Duy Kiến Trúc
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-red-400 block">❌ Tư duy thông thường:</span>
                        <p className="text-slate-300 leading-relaxed">{section.mindsetShift.from}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-semibold text-emerald-400 block">✅ Tư duy Unified-App-Infra:</span>
                        <p className="text-slate-300 leading-relaxed">{section.mindsetShift.to}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                      <strong className="text-slate-300">Tác động: </strong>
                      {section.mindsetShift.impact}
                    </p>
                  </div>
                )}

                {/* Code Block */}
                {section.codeBlock && (
                  <div className="space-y-1 pt-1">
                    {section.codeBlock.title && (
                      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                        <span className="font-mono text-[11px] text-violet-300">{section.codeBlock.title}</span>
                        <button
                          onClick={() => handleCopyCode(section.codeBlock?.code || '', `sec-${sIdx}`)}
                          className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                          title="Sao chép"
                        >
                          {copiedCodeIndex === `sec-${sIdx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                    <pre className="p-3.5 text-xs font-mono text-slate-200 bg-slate-900/90 rounded-lg overflow-x-auto leading-relaxed border border-slate-800/70">
                      <code>{section.codeBlock.code}</code>
                    </pre>
                  </div>
                )}

                {/* Pro Tip */}
                {section.proTip && (
                  <div className="border-l-2 border-amber-400/80 pl-3.5 py-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed bg-amber-950/10 rounded-r-lg">
                    <strong className="font-semibold text-amber-300">Bí quyết thực chiến: </strong>
                    {section.proTip}
                  </div>
                )}

                {/* Warning Note */}
                {section.warningNote && (
                  <div className="border-l-2 border-red-500/80 pl-3.5 py-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed bg-red-950/10 rounded-r-lg">
                    <strong className="font-semibold text-red-300">Lưu ý quan trọng: </strong>
                    {section.warningNote}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Practical CLI Commands */}
          {currentChapter.practicalCommands && currentChapter.practicalCommands.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                Lệnh Vận Hành & Kiểm Thử Hệ Thống (Live Proofs & CLI)
              </h3>

              <div className="space-y-3">
                {currentChapter.practicalCommands.map((cmd, cIdx) => (
                  <div key={cIdx} className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{cmd.title}</span>
                      <button
                        onClick={() => handleCopyCode(cmd.command, `cmd-${cIdx}`)}
                        className="text-slate-400 hover:text-slate-200 cursor-pointer"
                        title="Sao chép câu lệnh"
                      >
                        {copiedCodeIndex === `cmd-${cIdx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <pre className="p-2.5 bg-slate-900/90 border border-slate-800/70 rounded-lg font-mono text-violet-300 overflow-x-auto">
                      <code>{cmd.command}</code>
                    </pre>
                    <p className="text-slate-400 text-[11px]">{cmd.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter Mastery Checklist */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
              Tiêu Chuẩn Đạt Chuẩn Chương Này (Mastery Checklist)
            </h3>
            <div className="space-y-1.5">
              {currentChapter.masteryChecklist.map((item, mIdx) => (
                <div key={mIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <span className="text-violet-400 font-bold">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sequential Prev/Next Chapter Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-xs">
            {prevChapter ? (
              <button
                onClick={() => handleSelectChapter(prevChapter.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-violet-300 transition-colors cursor-pointer group text-left"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Chương trước</div>
                  <div className="font-medium text-slate-300 truncate max-w-[140px] sm:max-w-xs">{prevChapter.title}</div>
                </div>
              </button>
            ) : <div />}

            {nextChapter ? (
              <button
                onClick={() => handleSelectChapter(nextChapter.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-violet-300 transition-colors cursor-pointer group text-right"
              >
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Chương tiếp theo</div>
                  <div className="font-medium text-slate-300 truncate max-w-[140px] sm:max-w-xs">{nextChapter.title}</div>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : <div />}
          </div>

        </article>

      </div>

    </div>
  );
};
