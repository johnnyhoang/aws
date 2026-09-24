import React, { useState, useEffect } from 'react';
import { TOKEN_WALLET_LESSONS } from '../../data/tokenWallet/tokenWalletLessonsData';
import { BookTocDrawer, TocChapterItem } from '../BookTocDrawer';
import { 
  Wallet, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  BookOpen, 
  Flame,
  ListOrdered
} from 'lucide-react';

interface TokenWalletLearnViewProps {
  onNavigateTab?: (tab: 'learn' | 'test' | 'play') => void;
}

export const TokenWalletLearnView: React.FC<TokenWalletLearnViewProps> = ({ onNavigateTab }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    const saved = localStorage.getItem('tokenwallet_completed_chapters');
    return saved ? JSON.parse(saved) : ['tw-ch1-tong-quan-kien-truc'];
  });

  const currentChapter = TOKEN_WALLET_LESSONS[selectedChapterIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedChapterIndex]);

  const toggleComplete = (chapterId: string) => {
    const updated = completedChapters.includes(chapterId)
      ? completedChapters.filter(c => c !== chapterId)
      : [...completedChapters, chapterId];
    setCompletedChapters(updated);
    localStorage.setItem('tokenwallet_completed_chapters', JSON.stringify(updated));
  };

  const nextChapter = () => {
    if (selectedChapterIndex < TOKEN_WALLET_LESSONS.length - 1) {
      if (!completedChapters.includes(currentChapter.id)) {
        toggleComplete(currentChapter.id);
      }
      setSelectedChapterIndex(prev => prev + 1);
    }
  };

  const prevChapter = () => {
    if (selectedChapterIndex > 0) {
      setSelectedChapterIndex(prev => prev - 1);
    }
  };

  const tocChapters: TocChapterItem[] = TOKEN_WALLET_LESSONS.map((chap) => ({
    id: chap.id,
    chapterNumber: chap.chapterNumber,
    title: chap.title.split(':')[1]?.trim() || chap.title,
    level: 'Chuyên gia',
    readTimeMinutes: chap.readingTimeMinutes,
    category: 'Architecture'
  }));

  const handleSelectChapter = (id: string) => {
    const idx = TOKEN_WALLET_LESSONS.findIndex(c => c.id === id);
    if (idx !== -1) {
      setSelectedChapterIndex(idx);
    }
  };

  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl font-bold text-white mt-10 mb-4 pb-2 border-b border-slate-800 flex items-center gap-3">
            <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-lg font-semibold text-emerald-300 mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={idx} className="text-slate-300 ml-6 list-disc mb-2 leading-relaxed">
            <span dangerouslySetInnerHTML={{ 
              __html: line.replace('- ', '')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                .replace(/\`(.*?)\`/g, '<code class="px-1.5 py-0.5 bg-slate-800 text-emerald-300 rounded font-mono text-sm">$1</code>')
            }} />
          </li>
        );
      }
      if (line.startsWith('```')) {
        return null;
      }
      if (line.trim().length === 0) {
        return <div key={idx} className="h-4" />;
      }
      return (
        <p key={idx} className="text-slate-300 leading-relaxed mb-4 text-base">
          <span dangerouslySetInnerHTML={{ 
            __html: line
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
              .replace(/\*(.*?)\*/g, '<em class="text-slate-200">$1</em>')
              .replace(/\`(.*?)\`/g, '<code class="px-1.5 py-0.5 bg-slate-800 text-emerald-300 rounded font-mono text-sm">$1</code>')
          }} />
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24 relative">
      {/* Auto-hide Drawer */}
      <BookTocDrawer
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        chapters={tocChapters}
        currentChapterId={currentChapter.id}
        completedLessonIds={completedChapters}
        onSelectChapter={handleSelectChapter}
        accentColorClass="text-emerald-400"
        bookTitle="Tập 14: JohnnyHoang's Token Wallet"
        onNavigateTab={onNavigateTab}
        testTabLabel="Luyện Thi Trắc Nghiệm & Flashcards"
        playTabLabel="Mô Phỏng Quota & Parser Labs"
      />

      {/* Floating TOC Trigger Button */}
      <button
        onClick={() => setIsTocOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-full shadow-2xl flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
        title="Mở mục lục sách"
      >
        <ListOrdered className="w-4 h-4" />
        <span className="text-xs tracking-wide">Mục Lục</span>
      </button>

      {/* Hero Header */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-emerald-950/40 via-slate-900/50 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5" /> Tập 14: JohnnyHoang's Token Wallet
            </span>
            <span className="text-slate-500 text-xs flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {currentChapter.readingTimeMinutes} phút đọc
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {currentChapter.title}
          </h1>
          <p className="text-lg text-emerald-200/80 font-medium">
            {currentChapter.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Chương {currentChapter.chapterNumber} / {TOKEN_WALLET_LESSONS.length}</span>
            </div>
            <div className="w-1 h-1 bg-slate-700 rounded-full" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Đã hoàn thành {completedChapters.length}/{TOKEN_WALLET_LESSONS.length} chương</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chapter Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Chapter Summary Lead */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/20 mb-8 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 shrink-0 mt-0.5">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-1">Tóm tắt chương</h3>
              <p className="text-slate-200 leading-relaxed">{currentChapter.summary}</p>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <article className="prose prose-invert max-w-none">
          {renderFormattedContent(currentChapter.content)}
        </article>

        {/* Key Takeaways */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/30 border border-emerald-500/30">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            Điểm Cốt Lõi Cần Ghi Nhớ
          </h3>
          <ul className="space-y-2.5">
            {currentChapter.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chapter Navigation Buttons */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={prevChapter}
            disabled={selectedChapterIndex === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              selectedChapterIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Chương Trước
          </button>

          <button
            onClick={() => toggleComplete(currentChapter.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              completedChapters.includes(currentChapter.id)
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-emerald-500/40'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {completedChapters.includes(currentChapter.id) ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
          </button>

          <button
            onClick={nextChapter}
            disabled={selectedChapterIndex === TOKEN_WALLET_LESSONS.length - 1}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              selectedChapterIndex === TOKEN_WALLET_LESSONS.length - 1
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
            }`}
          >
            Chương Tiếp Theo
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default TokenWalletLearnView;
