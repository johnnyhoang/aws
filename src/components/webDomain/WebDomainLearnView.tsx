import React, { useState } from 'react';
import { DOMAIN_CHAPTERS } from '../../data/webDomain/domainLessonsData';
import { DomainChapter, DomainCategory } from '../../types/webDomain';
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
  ListOrdered
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAudioReader } from '../../context/AudioReaderContext';
import { VisualDiagram } from '../diagrams/VisualDiagram';
import { FontSizeControl } from '../FontSizeControl';
import { BookTocDrawer } from '../BookTocDrawer';

interface WebDomainLearnViewProps {
  onNavigateTab?: (tab: 'learn' | 'test' | 'play') => void;
}

const CATEGORY_NAMES: Record<DomainCategory, string> = {
  fundamentals: 'Nền Tảng & Bản Chất DNS',
  dns_architecture: 'Kiến Trúc Tầng Sâu DNS',
  dns_records: 'Hệ Thống Bản Ghi DNS',
  lifecycle_transfer: 'Vòng Đời Tên Miền & Transfer',
  security_dnssec: 'Bảo Mật DNSSEC & WHOIS',
  web_admin_servers: 'Quản Trị Web Server',
  pro_tips_troubleshooting: 'Xử Lý Sự Cố & Di Dời',
  web_hosting_architectures: 'Kiến Trúc Web Hosting',
  self_hosted_vps_paas: 'VPS vs Serverless vs PaaS'
};

export const WebDomainLearnView: React.FC<WebDomainLearnViewProps> = ({ onNavigateTab }) => {
  const { completedLessons, toggleLessonCompleted, bookmarkedLessons, toggleLessonBookmark } = useLearning();
  const { startReadingArticle, isPlaying, articleTitle } = useAudioReader();
  const [selectedChapterId, setSelectedChapterId] = useState<string>(DOMAIN_CHAPTERS[0].id);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  const [isTocOpen, setIsTocOpen] = useState(false);

  const currentChapter: DomainChapter = DOMAIN_CHAPTERS.find(c => c.id === selectedChapterId) || DOMAIN_CHAPTERS[0];
  const currentIndex = DOMAIN_CHAPTERS.findIndex(c => c.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? DOMAIN_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < DOMAIN_CHAPTERS.length - 1 ? DOMAIN_CHAPTERS[currentIndex + 1] : null;

  const isCompleted = completedLessons.includes(currentChapter.id);
  const isBookmarked = bookmarkedLessons.includes(currentChapter.id);

  const completedCount = DOMAIN_CHAPTERS.filter(ch => completedLessons.includes(ch.id)).length;
  const progressPercent = Math.round((completedCount / DOMAIN_CHAPTERS.length) * 100);

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-slate-300">
      
      {/* Book Hero Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Sách Chuyên Khảo: Web Domain & Quản Trị Hệ Thống</span>
          </div>

          <div className="flex items-center gap-3 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <span className="text-slate-400 font-medium">Tiến độ:</span>
            <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono font-bold text-amber-400">{completedCount}/{DOMAIN_CHAPTERS.length} ({progressPercent}%)</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight leading-tight">
          Cẩm Nang Tên Miền Web & Vận Hành Hạ Tầng Từ Cơ Bản Đến Master
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Giáo trình 7 chương đọc tuần tự: từ bản chất sơ khai của Internet, cơ chế hoạt động tầng sâu của DNS toàn cầu, kỹ thuật cấu hình bản ghi, bảo mật DNSSEC/WHOIS, đến quản trị Web Server và quy trình di dời website không gián đoạn (Zero-Downtime Migration).
        </p>
      </div>

      {/* Main Long-form Chapter Book Content */}
      <article className="space-y-8">
        
        {/* Chapter Metadata & Header */}
        <div className="space-y-3 pb-4 border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Left: Metadata Info & TOC Trigger Button */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <button
                onClick={() => setIsTocOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-slate-700 transition-colors cursor-pointer font-semibold"
                title="Mở mục lục 7 chương sách"
              >
                <ListOrdered className="w-3.5 h-3.5 text-amber-400" />
                <span>Mục Lục ({DOMAIN_CHAPTERS.length})</span>
              </button>

              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="font-mono text-amber-400 font-semibold uppercase hidden sm:inline">
                {currentChapter.level}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="text-slate-400 font-mono hidden md:inline">
                {CATEGORY_NAMES[currentChapter.category]}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                ~{currentChapter.readTimeMinutes} phút đọc
              </span>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <FontSizeControl />

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
        <blockquote className="border-l-2 border-amber-500/70 pl-4 py-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-slate-900/30 rounded-r-md">
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
                /* Code Block if standard code/syntax */
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

      {/* Auto-hide / Slide-over Table of Contents Drawer */}
      <BookTocDrawer
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        chapters={DOMAIN_CHAPTERS}
        currentChapterId={currentChapter.id}
        completedLessonIds={completedLessons}
        onSelectChapter={handleSelectChapter}
        categoryNames={CATEGORY_NAMES}
        accentColorClass="text-amber-400"
        bookTitle="Mục Lục: Tên Miền Web & DNS"
        onNavigateTab={onNavigateTab}
        testTabLabel="Kiểm tra trắc nghiệm & Thẻ nhớ"
        playTabLabel="Mô phỏng DNS & Bộ công cụ Webmaster"
      />

    </div>
  );
};
