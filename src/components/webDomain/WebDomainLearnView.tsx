import React, { useState } from 'react';
import { DOMAIN_CHAPTERS } from '../../data/webDomain/domainLessonsData';
import { DomainChapter } from '../../types/webDomain';
import { 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Clock, 
  CheckCircle2, 
  Circle,
  Lightbulb,
  AlertTriangle,
  Terminal,
  Bookmark,
  Sparkles
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

interface WebDomainLearnViewProps {
  onNavigateTab?: (tab: 'learn' | 'test' | 'play') => void;
}

export const WebDomainLearnView: React.FC<WebDomainLearnViewProps> = ({ onNavigateTab }) => {
  const { completedLessons, toggleLessonCompleted, bookmarkedLessons, toggleLessonBookmark } = useLearning();
  const [selectedChapterId, setSelectedChapterId] = useState<string>(DOMAIN_CHAPTERS[0].id);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);

  const currentChapter: DomainChapter = DOMAIN_CHAPTERS.find(c => c.id === selectedChapterId) || DOMAIN_CHAPTERS[0];
  const currentIndex = DOMAIN_CHAPTERS.findIndex(c => c.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? DOMAIN_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < DOMAIN_CHAPTERS.length - 1 ? DOMAIN_CHAPTERS[currentIndex + 1] : null;

  const isCompleted = completedLessons.includes(currentChapter.id);
  const isBookmarked = bookmarkedLessons.includes(currentChapter.id);

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
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Sách Chuyên Khảo Toàn Diện: Web Domain & Quản Trị Hệ Thống</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight leading-tight">
          Cẩm Nang Tên Miền Web & Vận Hành Hạ Tầng Từ Cơ Bản Đến Master
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
          Giáo trình 7 chương đọc tuần tự: từ bản chất sơ khai của Internet, cơ chế hoạt động tầng sâu của DNS toàn cầu, kỹ thuật cấu hình bản ghi, bảo mật DNSSEC/WHOIS, đến quản trị Web Server và quy trình di dời website không gián đoạn (Zero-Downtime Migration).
        </p>
      </div>

      {/* Main Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar: Table of Contents (Mục lục chương) */}
        <aside className="lg:col-span-4 space-y-2 lg:sticky lg:top-20">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Mục Lục 7 Chương</span>
            <span className="font-mono text-slate-500">{DOMAIN_CHAPTERS.length} bài đọc</span>
          </div>

          <nav className="space-y-1">
            {DOMAIN_CHAPTERS.map((ch, idx) => {
              const isSelected = ch.id === currentChapter.id;
              const isDone = completedLessons.includes(ch.id);

              return (
                <div
                  key={ch.id}
                  onClick={() => handleSelectChapter(ch.id)}
                  className={`cursor-pointer px-3 py-2.5 rounded-lg transition-colors flex items-start justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-slate-800/90 text-amber-300 border-l-2 border-amber-400 font-medium shadow-sm'
                      : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-xs font-medium truncate">
                      Chương {idx + 1}: {ch.title.replace(/^Chương \d+: /, '')}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>{ch.level}</span>
                      <span>•</span>
                      <span>{ch.readTimeMinutes}p đọc</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Quick CTA to Test & Tools */}
          {onNavigateTab && (
            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
              <button
                onClick={() => onNavigateTab('test')}
                className="w-full py-2 px-3 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-amber-300 transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <span>Kiểm tra trắc nghiệm & Thẻ nhớ</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button
                onClick={() => onNavigateTab('play')}
                className="w-full py-2 px-3 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-amber-300 transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <span>Mô phỏng DNS & Bộ công cụ Webmaster</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          )}
        </aside>

        {/* Right Content: Long-form Chapter Book Reader */}
        <article className="lg:col-span-8 space-y-8">
          
          {/* Chapter Metadata & Header */}
          <div className="space-y-3 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono text-amber-400 font-semibold uppercase">{currentChapter.level}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ~{currentChapter.readTimeMinutes} phút đọc
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleLessonBookmark(currentChapter.id)}
                  className={`p-2 rounded-md border transition-colors cursor-pointer ${
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
                  className={`p-2 rounded-md border transition-colors cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                  title={isCompleted ? 'Đã hoàn thành chương này' : 'Đánh dấu đã đọc xong'}
                  aria-label="Đánh dấu hoàn thành"
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight leading-snug">
              {currentChapter.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {currentChapter.subtitle}
            </p>
          </div>

          {/* Chapter Summary Quote */}
          <blockquote className="border-l-2 border-amber-500/70 pl-4 py-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-slate-900/30 rounded-r-md">
            <strong className="text-amber-400 not-italic font-semibold block mb-0.5">Tóm tắt cốt lõi:</strong>
            {currentChapter.summary}
          </blockquote>

          {/* Main Sections */}
          <div className="space-y-8">
            {currentChapter.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block" />
                  <span>{section.heading}</span>
                </h3>

                {section.subheading && (
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wide">
                    {section.subheading}
                  </h4>
                )}

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>

                {/* Bullet Points */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {section.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx}>{bp}</li>
                    ))}
                  </ul>
                )}

                {/* Code Block if any */}
                {section.codeBlock && (
                  <div className="space-y-1.5 pt-1">
                    {section.codeBlock.title && (
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-mono text-[11px]">{section.codeBlock.title}</span>
                        <button
                          onClick={() => handleCopyCode(section.codeBlock?.code || '', `sec-${sIdx}`)}
                          className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                          title="Sao chép"
                        >
                          {copiedCodeIndex === `sec-${sIdx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                    <div className="rounded-lg bg-slate-900 border border-slate-800 overflow-hidden">
                      <pre className="p-3.5 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                        <code>{section.codeBlock.code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Pro Tip Alert */}
                {section.proTip && (
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-950/20 border border-amber-900/40 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                    <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-amber-300">Bí quyết thực chiến: </strong>
                      {section.proTip}
                    </div>
                  </div>
                )}

                {/* Warning Note Alert */}
                {section.warningNote && (
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-950/20 border border-red-900/40 text-xs sm:text-sm text-red-200/90 leading-relaxed">
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-red-300">Lưu ý nguy hiểm: </strong>
                      {section.warningNote}
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Practical CLI Commands */}
          {currentChapter.practicalCommands && currentChapter.practicalCommands.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Lệnh Terminal Thực Hành</span>
              </h3>

              <div className="space-y-2.5">
                {currentChapter.practicalCommands.map((cmd, cIdx) => (
                  <div key={cIdx} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1.5 text-xs">
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
                    <pre className="p-2 bg-slate-950 rounded font-mono text-slate-300 overflow-x-auto">
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
              Checklist Kiến Thức Đạt Chuẩn (Mastery Checklist)
            </h3>
            <div className="space-y-1.5">
              {currentChapter.masteryChecklist.map((item, mIdx) => (
                <div key={mIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
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
                className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group text-left"
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
                className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group text-right"
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
