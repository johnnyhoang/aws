import React, { useState } from 'react';
import { LINUX_ADMIN_CHAPTERS } from '../../data/linuxAdmin/linuxLessonsData';
import { LINUX_COMMAND_CHEAT_SHEET } from '../../data/linuxAdmin/linuxCheatSheetData';
import { LinuxAdminChapter } from '../../types/linuxAdminModule';
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
  Sparkles,
  Volume2,
  Server,
  Layers,
  Search,
  HardDrive
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAudioReader } from '../../context/AudioReaderContext';
import { VisualDiagram } from '../diagrams/VisualDiagram';

interface LinuxAdminLearnViewProps {
  onNavigateTab?: (tab: 'learn' | 'test' | 'play') => void;
}

export const LinuxAdminLearnView: React.FC<LinuxAdminLearnViewProps> = ({ onNavigateTab }) => {
  const { completedLessons, toggleLessonCompleted, bookmarkedLessons, toggleLessonBookmark } = useLearning();
  const { startReadingArticle, isPlaying, articleTitle } = useAudioReader();
  const [selectedChapterId, setSelectedChapterId] = useState<string>(LINUX_ADMIN_CHAPTERS[0].id);
  const [activeTabMode, setActiveTabMode] = useState<'chapters' | 'cheat_sheet'>('chapters');
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  const [cheatSheetSearch, setCheatSheetSearch] = useState<string>('');

  const currentChapter: LinuxAdminChapter = LINUX_ADMIN_CHAPTERS.find(c => c.id === selectedChapterId) || LINUX_ADMIN_CHAPTERS[0];
  const currentIndex = LINUX_ADMIN_CHAPTERS.findIndex(c => c.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? LINUX_ADMIN_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < LINUX_ADMIN_CHAPTERS.length - 1 ? LINUX_ADMIN_CHAPTERS[currentIndex + 1] : null;

  const isCompleted = completedLessons.includes(currentChapter.id);
  const isBookmarked = bookmarkedLessons.includes(currentChapter.id);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(id);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleSelectChapter = (id: string) => {
    setSelectedChapterId(id);
    setActiveTabMode('chapters');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCommands = LINUX_COMMAND_CHEAT_SHEET.filter(c => 
    c.command.toLowerCase().includes(cheatSheetSearch.toLowerCase()) ||
    c.description.toLowerCase().includes(cheatSheetSearch.toLowerCase()) ||
    c.category.toLowerCase().includes(cheatSheetSearch.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-slate-300">
      
      {/* Book Hero Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Sách Chuyên Khảo Toàn Diện: Quản Trị Hệ Thống Linux & Unix Chuyên Gia (Zero to Hero)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight leading-tight">
          Làm Chủ Quản Trị Máy Chủ Linux & Unix: Web, App, Database & AWS Cloud
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
          Giáo trình đào tạo chuyên sâu từng bước từ người chưa biết gì đến chuyên gia quản trị hệ thống: Làm chủ dòng lệnh Shell, phân quyền bảo mật, Systemd, LVM, mạng máy chủ, triển khai Nginx/Docker, tối ưu hóa Database và vận hành Linux trên AWS EC2.
        </p>

        {/* Mode Switcher Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTabMode('chapters')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeTabMode === 'chapters'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Giáo Trình 10 Chương Thực Chiến</span>
          </button>
          <button
            onClick={() => setActiveTabMode('cheat_sheet')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeTabMode === 'cheat_sheet'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Cẩm Nang Tra Cứu Lệnh Nhanh ({LINUX_COMMAND_CHEAT_SHEET.length})</span>
          </button>
        </div>
      </div>

      {activeTabMode === 'cheat_sheet' ? (
        /* COMMAND CHEAT SHEET EXPLORER VIEW */
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-amber-400" />
                <span>Cẩm Nang Tra Cứu Dòng Lệnh Linux Chuẩn Sysadmin</span>
              </h2>
              <p className="text-xs text-slate-400">
                Tìm kiếm nhanh cú pháp, ví dụ thực tế và mức độ cảnh báo của các lệnh quan trọng.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={cheatSheetSearch}
                onChange={(e) => setCheatSheetSearch(e.target.value)}
                placeholder="Tìm lệnh (grep, systemctl, chmod)..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCommands.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-amber-300 text-sm bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/40">
                      {item.command}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Ví dụ thực chiến:</span>
                    <button
                      onClick={() => handleCopyCode(item.example, `cheat-${idx}`)}
                      className="text-slate-400 hover:text-slate-200 cursor-pointer flex items-center gap-1"
                      title="Sao chép"
                    >
                      {copiedCodeIndex === `cheat-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <pre className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                    <code>{item.example}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* STANDARD 10-CHAPTER SEQUENTIAL BOOK READER */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Table of Contents (Mục lục 10 chương) */}
          <aside className="lg:col-span-4 space-y-2 lg:sticky lg:top-20">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Mục Lục 10 Chương</span>
              <span className="font-mono text-slate-500">{LINUX_ADMIN_CHAPTERS.length} bài đọc</span>
            </div>

            <nav className="space-y-1">
              {LINUX_ADMIN_CHAPTERS.map((ch, idx) => {
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

            {/* Quick Navigation to Test & Play */}
            {onNavigateTab && (
              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                <button
                  onClick={() => onNavigateTab('test')}
                  className="w-full py-2 px-3 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-amber-300 transition-colors text-left flex items-center justify-between cursor-pointer"
                >
                  <span>Luyện thi tình huống & Thẻ nhớ Linux</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => onNavigateTab('play')}
                  className="w-full py-2 px-3 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-amber-300 transition-colors text-left flex items-center justify-between cursor-pointer"
                >
                  <span>Mô phỏng Terminal Lab & Trình sinh cấu hình</span>
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
                    onClick={() => startReadingArticle(currentChapter.title, currentChapter.sections)}
                    className={`p-2 rounded-md border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isPlaying && articleTitle === currentChapter.title
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm animate-pulse'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-amber-300 hover:border-slate-700'
                    }`}
                    title="Nghe giọng đọc toàn bộ chương này"
                    aria-label="Nghe bài đọc"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="text-[11px] font-medium hidden sm:inline">Nghe bài</span>
                  </button>

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

                  {/* Visual Diagram if any */}
                  {(section.diagramType || section.codeBlock?.diagramType) ? (
                    <div className="pt-2">
                      <VisualDiagram 
                        type={section.diagramType || section.codeBlock?.diagramType || ''} 
                        title={section.codeBlock?.title}
                        fallbackCode={section.codeBlock?.code}
                      />
                    </div>
                  ) : section.codeBlock ? (
                    /* Code Block */
                    <div className="space-y-1.5 pt-1">
                      {section.codeBlock.title && (
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="font-mono text-[11px]">{section.codeBlock.title}</span>
                          <button
                            onClick={() => handleCopyCode(section.codeBlock?.code || '', `sec-linux-${sIdx}`)}
                            className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                            title="Sao chép"
                          >
                            {copiedCodeIndex === `sec-linux-${sIdx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      )}
                      <div className="rounded-lg bg-slate-900 border border-slate-800 overflow-hidden">
                        <pre className="p-3.5 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                          <code>{section.codeBlock.code}</code>
                        </pre>
                      </div>
                    </div>
                  ) : null}

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
                        <strong className="font-semibold text-red-300">Lưu ý rủi ro: </strong>
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
                  <span>Lệnh Thực Hành Hệ Thống Chuyên Dụng</span>
                </h3>

                <div className="space-y-2.5">
                  {currentChapter.practicalCommands.map((cmd, cIdx) => (
                    <div key={cIdx} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200">{cmd.title}</span>
                        <button
                          onClick={() => handleCopyCode(cmd.command, `cmd-linux-${cIdx}`)}
                          className="text-slate-400 hover:text-slate-200 cursor-pointer"
                          title="Sao chép câu lệnh"
                        >
                          {copiedCodeIndex === `cmd-linux-${cIdx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
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
                Checklist Kỹ Năng Đạt Chuẩn (Mastery Checklist)
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
      )}

    </div>
  );
};
