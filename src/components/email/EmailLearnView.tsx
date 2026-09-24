import React, { useState } from 'react';
import { EMAIL_CHAPTERS } from '../../data/email/emailLessonsData';
import { EmailChapter, EmailCategory } from '../../types/emailModule';
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

interface EmailLearnViewProps {
  onNavigateTab?: (tab: 'learn' | 'test' | 'play') => void;
}

const CATEGORY_NAMES: Record<EmailCategory, string> = {
  history_architecture: 'Lịch Sử & Kiến Trúc',
  protocols_deepdive: 'Giao Thức SMTP/IMAP',
  authentication_security: 'SPF, DKIM & DMARC',
  dns_routing: 'Định Tuyến DNS & rDNS',
  self_hosted_mailserver: 'Mail Server Tự Dựng',
  enterprise_providers: 'Email Doanh Nghiệp',
  transactional_cloud_api: 'Cloud SMTP & REST API',
  deliverability_reputation: 'Inbox & IP Warming',
  cybersecurity_defense: 'An Ninh & Chống Lừa Đảo',
  automation_templates: 'Tự Động Hóa & MJML'
};

export const EmailLearnView: React.FC<EmailLearnViewProps> = ({ onNavigateTab }) => {
  const { completedLessons, toggleLessonCompleted, bookmarkedLessons, toggleLessonBookmark } = useLearning();
  const { startReadingArticle, isPlaying, articleTitle } = useAudioReader();
  const [selectedChapterId, setSelectedChapterId] = useState<string>(EMAIL_CHAPTERS[0].id);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const currentChapter: EmailChapter = EMAIL_CHAPTERS.find(c => c.id === selectedChapterId) || EMAIL_CHAPTERS[0];
  const currentIndex = EMAIL_CHAPTERS.findIndex(c => c.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? EMAIL_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < EMAIL_CHAPTERS.length - 1 ? EMAIL_CHAPTERS[currentIndex + 1] : null;

  const isCompleted = completedLessons.includes(currentChapter.id);
  const isBookmarked = bookmarkedLessons.includes(currentChapter.id);

  const filteredChapters = filterCategory === 'all'
    ? EMAIL_CHAPTERS
    : EMAIL_CHAPTERS.filter(ch => ch.category === filterCategory);

  const completedCount = EMAIL_CHAPTERS.filter(ch => completedLessons.includes(ch.id)).length;
  const progressPercent = Math.round((completedCount / EMAIL_CHAPTERS.length) * 100);

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
          <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
            Sách Chuyên Khảo: Bách Khoa Toàn Thư Email & Mail Server Systems
          </div>

          <div className="flex items-center gap-3 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <span className="text-slate-400 font-medium">Tiến độ đọc:</span>
            <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-sky-500 to-indigo-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono font-bold text-sky-400">{completedCount}/{EMAIL_CHAPTERS.length} bài ({progressPercent}%)</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight leading-tight">
          Làm Chủ Thế Giới Email & Hệ Thống Mail Server: Từ Giao Thức Nền Tảng Đến Kiến Trúc Sư Đám Mây
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
          Bộ giáo trình chuyên sâu 10 chương: Hiểu tận gốc các giao thức SMTP/IMAP/POP3, làm chủ bộ tứ bảo mật định danh SPF, DKIM, DMARC, BIMI, tự tay dựng và quản trị Mail Server Postfix/Dovecot trên Linux, tích hợp Cloud Email APIs (AWS SES, Resend), và làm chủ nghệ thuật đưa email vào thẳng Hộp Thư Chính (Inbox).
        </p>
      </div>

      {/* Main Book Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar: Table of Contents (Mục lục chương) */}
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
                  ? 'bg-sky-600/30 text-sky-300 border border-sky-500/40 font-semibold'
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
                    ? 'bg-sky-600/30 text-sky-300 border border-sky-500/40 font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {catLabel}
              </button>
            ))}
          </div>

          {/* Chapter Navigation List (Không dùng viền hộp bao quanh) */}
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
                      ? 'bg-sky-950/40 text-sky-200 font-medium border-l-2 border-sky-500'
                      : 'hover:bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-xs font-medium truncate flex items-center gap-1.5">
                      <span className="font-mono text-sky-400 font-bold">#{ch.chapterNumber}</span>
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

          {/* Quick Tab Jump if available */}
          {onNavigateTab && (
            <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
              <button
                onClick={() => onNavigateTab('test')}
                className="w-full py-2 px-3 rounded-lg hover:bg-slate-900/80 text-slate-400 hover:text-sky-300 transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <span>Luyện Thi Tình Huống Kỹ Sư Email</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button
                onClick={() => onNavigateTab('play')}
                className="w-full py-2 px-3 rounded-lg hover:bg-slate-900/80 text-slate-400 hover:text-sky-300 transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <span>Lab Cấu Hình DNS SPF/DKIM & Mô Phỏng SMTP</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          )}
        </aside>

        {/* Right Content: Long-form Chapter Book Content (Mạch đọc tự nhiên, thoáng mắt) */}
        <article className="lg:col-span-8 space-y-8">
          
          {/* Chapter Metadata & Header */}
          <div className="space-y-4 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono text-sky-300 font-semibold uppercase">
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
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-sm animate-pulse'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-sky-300 hover:border-slate-700'
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

          {/* Hook Story Box (Không dùng khung hộp nặng, dùng border-l nhấn thanh lịch) */}
          {currentChapter.hookStory && (
            <div className="border-l-2 border-sky-500/80 pl-4 py-1.5 space-y-1 bg-sky-950/10 rounded-r-lg">
              <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                Câu Chuyện Thực Tế Kích Thích Tư Duy
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{currentChapter.hookStory}"
              </p>
            </div>
          )}

          {/* Chapter Summary Quote */}
          <blockquote className="border-l-2 border-sky-500/70 pl-4 py-2 text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-slate-900/30 rounded-r-lg">
            <strong className="text-sky-400 not-italic font-semibold block mb-0.5">Tóm tắt giá trị cốt lõi:</strong>
            {currentChapter.summary}
          </blockquote>

          {/* Main Sections */}
          <div className="space-y-8">
            {currentChapter.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-3.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-sky-400 rounded-full inline-block" />
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

                {/* Speaker Quote if any */}
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

                {/* Mindset Shift Box: Chuyển sang cấu trúc thông thoáng border-l */}
                {section.mindsetShift && (
                  <div className="p-3.5 rounded-lg bg-slate-900/40 border-l-2 border-sky-500 space-y-2.5 text-xs">
                    <div className="font-bold text-sky-400 uppercase tracking-wide">
                      Bước Nhảy Vọt Tư Duy (Mindset Shift)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-red-400 block">❌ Tư duy cũ:</span>
                        <p className="text-slate-300 leading-relaxed">{section.mindsetShift.from}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-semibold text-emerald-400 block">✅ Tư duy Chuyên Gia Email:</span>
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
                        <span className="font-mono text-[11px] text-sky-300">{section.codeBlock.title}</span>
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

                {/* Pro Tip: Dùng border-l thanh lịch */}
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
                Lệnh Terminal Thực Hành Quản Trị Email
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
                    <pre className="p-2.5 bg-slate-900/90 border border-slate-800/70 rounded-lg font-mono text-sky-300 overflow-x-auto">
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
                  <span className="text-sky-400 font-bold">•</span>
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
                className="flex items-center gap-2 text-slate-400 hover:text-sky-300 transition-colors cursor-pointer group text-left"
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
                className="flex items-center gap-2 text-slate-400 hover:text-sky-300 transition-colors cursor-pointer group text-right"
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
