import React, { useState } from 'react';
import { AZURE_CHAPTERS } from '../../data/azure/azureLessonsData';
import { AzureChapter, AzureCategory } from '../../types/azureModule';
import { 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  CheckCircle2, 
  Circle,
  Bookmark,
  ListOrdered
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAudioReader } from '../../context/AudioReaderContext';
import { FontSizeControl } from '../FontSizeControl';
import { BookTocDrawer } from '../BookTocDrawer';

interface AzureLearnViewProps {
  onNavigateTab?: (tab: 'learn' | 'test' | 'play') => void;
}

const CATEGORY_NAMES: Record<AzureCategory, string> = {
  overview_global_infrastructure: 'Khởi Nguyên & Hạ Tầng Toàn Cầu',
  identity_entra_id_security: 'Microsoft Entra ID & Bảo Mật',
  networking_vnet_hybrid: 'Mạng Azure VNet & Hybrid',
  compute_vms_appservice_serverless: 'Điện Toán VMs, App Service & Serverless',
  storage_blob_files_datalake: 'Lưu Trữ Blob, Files & Data Lake',
  databases_sql_cosmos_db: 'Azure SQL & Cosmos DB Toàn Cầu',
  load_balancing_traffic_frontdoor: 'Cân Bằng Tải & Azure Front Door',
  monitoring_governance_bicep: 'Azure Monitor & Ngôn Ngữ Bicep IaC',
  ai_openai_cognitive: 'Azure OpenAI & AI Doanh Nghiệp',
  finops_well_architected_certifications: 'FinOps & Lộ Trình Master AZ-305'
};

export const AzureLearnView: React.FC<AzureLearnViewProps> = ({ onNavigateTab }) => {
  const { completedLessons, toggleLessonCompleted, bookmarkedLessons, toggleLessonBookmark } = useLearning();
  const { startReadingArticle, isPlaying, articleTitle } = useAudioReader();
  const [selectedChapterId, setSelectedChapterId] = useState<string>(AZURE_CHAPTERS[0].id);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  const [isTocOpen, setIsTocOpen] = useState(false);

  const currentChapter: AzureChapter = AZURE_CHAPTERS.find(c => c.id === selectedChapterId) || AZURE_CHAPTERS[0];
  const currentIndex = AZURE_CHAPTERS.findIndex(c => c.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? AZURE_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < AZURE_CHAPTERS.length - 1 ? AZURE_CHAPTERS[currentIndex + 1] : null;

  const isCompleted = completedLessons.includes(currentChapter.id);
  const isBookmarked = bookmarkedLessons.includes(currentChapter.id);

  const completedCount = AZURE_CHAPTERS.filter(ch => completedLessons.includes(ch.id)).length;
  const progressPercent = Math.round((completedCount / AZURE_CHAPTERS.length) * 100);

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
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Sách Chuyên Khảo: Microsoft Azure Cloud Mastery & Solutions Architecture
          </div>

          <div className="flex items-center gap-3 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <span className="text-slate-400 font-medium">Tiến độ:</span>
            <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono font-bold text-blue-400">{completedCount}/{AZURE_CHAPTERS.length} ({progressPercent}%)</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight leading-tight">
          Làm Chủ Microsoft Azure: Từ Cơ Bản Cho Người Mới Đến Kiến Trúc Sư Giải Pháp Bậc Thầy
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Bộ giáo trình chuyên khảo 10 chương toàn diện: Đi từ hạ tầng vật lý toàn cầu 60+ Regions, làm chủ bảo mật Microsoft Entra ID không cần mật khẩu, quy hoạch mạng VNet Hub-and-Spoke, điện toán đa dạng từ VMs đến Serverless Container Apps, cơ sở dữ liệu Azure SQL Hyperscale & Cosmos DB phân tán toàn cầu, ma trận cân bằng tải Azure Front Door, tự động hóa hạ tầng Bicep, tích hợp AI doanh nghiệp với Azure OpenAI Service và lộ trình chinh phục bộ chứng chỉ AZ-900 / AZ-104 / AZ-305.
        </p>
      </div>

      {/* Main Long-form Chapter Book Content */}
      <article className="space-y-8">
        
        {/* Chapter Metadata & Header */}
        <div className="space-y-4 pb-4 border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Left: Metadata Info & TOC Trigger Button */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <button
                onClick={() => setIsTocOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-300 hover:border-slate-700 transition-colors cursor-pointer font-semibold"
                title="Mở mục lục 10 chương sách"
              >
                <ListOrdered className="w-3.5 h-3.5 text-blue-400" />
                <span>Mục Lục ({AZURE_CHAPTERS.length})</span>
              </button>

              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="font-mono text-blue-300 font-semibold uppercase hidden sm:inline">
                {currentChapter.level}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="text-slate-400 font-mono hidden md:inline">
                {CATEGORY_NAMES[currentChapter.category]}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="text-slate-400 font-mono">
                ~{currentChapter.readTimeMinutes} phút đọc
              </span>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <FontSizeControl />

              <button
                onClick={() => startReadingArticle(currentChapter.title, currentChapter.sections)}
                className={`px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isPlaying && articleTitle === currentChapter.title
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-sm animate-pulse'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-blue-300 hover:border-slate-700'
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
          <div className="border-l-2 border-blue-500/80 pl-4 py-2 space-y-1 bg-blue-950/10 rounded-r-lg">
            <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
              Câu Chuyện Thực Tế Kích Thích Tư Duy
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "{currentChapter.hookStory}"
            </p>
          </div>
        )}

        {/* Chapter Summary Quote */}
        <blockquote className="border-l-2 border-blue-500/70 pl-4 py-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-slate-900/30 rounded-r-lg">
          <strong className="text-blue-400 not-italic font-semibold block mb-0.5">Tóm tắt giá trị cốt lõi:</strong>
          {currentChapter.summary}
        </blockquote>

        {/* Main Sections */}
        <div className="space-y-8">
          {currentChapter.sections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-3.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-4 bg-blue-400 rounded-full inline-block" />
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
                <div className="p-3.5 rounded-lg bg-slate-900/40 border-l-2 border-blue-500 space-y-2.5 text-xs">
                  <div className="font-bold text-blue-400 uppercase tracking-wide">
                    Bước Nhảy Vọt Tư Duy Kiến Trúc Azure
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-red-400 block">❌ Tư duy thông thường:</span>
                      <p className="text-slate-300 leading-relaxed">{section.mindsetShift.from}</p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-semibold text-emerald-400 block">✅ Tư duy Azure Solutions Architect:</span>
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
                      <span className="font-mono text-[11px] text-blue-300">{section.codeBlock.title}</span>
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
              Lệnh Azure CLI (az) Thực Hành
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
                  <pre className="p-2.5 bg-slate-900/90 border border-slate-800/70 rounded-lg font-mono text-blue-300 overflow-x-auto">
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
                <span className="text-blue-400 font-bold">•</span>
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
              className="flex items-center gap-2 text-slate-400 hover:text-blue-300 transition-colors cursor-pointer group text-left"
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
              className="flex items-center gap-2 text-slate-400 hover:text-blue-300 transition-colors cursor-pointer group text-right"
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
        chapters={AZURE_CHAPTERS}
        currentChapterId={currentChapter.id}
        completedLessonIds={completedLessons}
        onSelectChapter={handleSelectChapter}
        categoryNames={CATEGORY_NAMES}
        accentColorClass="text-blue-400"
        bookTitle="Mục Lục: Microsoft Azure Cloud"
        onNavigateTab={onNavigateTab}
        testTabLabel="Luyện Thi Tình Huống Azure Architect"
        playTabLabel="Lab Ma Trận Cân Bằng Tải & FinOps"
      />

    </div>
  );
};
