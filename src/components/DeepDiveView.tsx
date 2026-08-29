import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { DEEP_DIVE_LESSONS } from '../data/deepDiveLessons';
import { DeepDiveTopic } from '../types';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Terminal, 
  FlaskConical, 
  Lightbulb, 
  MessageSquareQuote, 
  GraduationCap,
  Sparkles,
  Search,
  Copy,
  Check
} from 'lucide-react';

interface DeepDiveViewProps {
  initialTopicId?: string;
}

export const DeepDiveView: React.FC<DeepDiveViewProps> = ({ initialTopicId }) => {
  const { 
    completedLessons, 
    toggleLessonCompleted, 
    bookmarkedLessons, 
    toggleLessonBookmark 
  } = useLearning();

  const [selectedTopic, setSelectedTopic] = useState<DeepDiveTopic>(() => {
    if (initialTopicId) {
      const match = DEEP_DIVE_LESSONS.find(t => t.id === initialTopicId || t.category === initialTopicId);
      if (match) return match;
    }
    return DEEP_DIVE_LESSONS[0];
  });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'Tất Cả Chuyên Đề' },
    { id: 'networking_security', label: 'Mạng & Bảo Mật' },
    { id: 'iac', label: 'Hạ Tầng Dạng Mã (IaC)' },
    { id: 'hybrid_migration', label: 'Hybrid Cloud & Migration' },
    { id: 'containers_serverless', label: 'Container & Serverless' },
    { id: 'university_lms_sso', label: 'Xác Thực SSO & LMS' },
  ];

  const handleSelectTopic = (topic: DeepDiveTopic) => {
    setSelectedTopic(topic);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        const readerElem = document.getElementById('deepdive-reader');
        if (readerElem) {
          readerElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  const filteredTopics = DEEP_DIVE_LESSONS.filter(topic => {
    const matchesCategory = activeCategory === 'all' || topic.category === activeCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          topic.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleComplete = (topicId: string) => {
    const isCompleted = completedLessons.includes(topicId);
    toggleLessonCompleted(topicId);
    if (!isCompleted) {
      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.7 }
      });
    }
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const isSelectedCompleted = completedLessons.includes(selectedTopic.id);
  const isSelectedBookmarked = bookmarkedLessons.includes(selectedTopic.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Kiến Thức Chuyên Sâu Thực Chiến Đại Học Mỹ
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Chuyên Đề Kỹ Năng AWS</h1>
          <p className="text-sm text-slate-400 mt-1">
            Học sâu 4 trụ cột kỹ thuật: Mạng bảo mật, IaC Terraform, Hybrid Cloud di chuyển dữ liệu và Container/Serverless.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm chuyên đề, từ khóa..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Topic List on Left, Active Topic Reader on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Topics Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Danh Sách Bài Học ({filteredTopics.length})
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredTopics.map((topic) => {
              const isSelected = selectedTopic.id === topic.id;
              const isCompleted = completedLessons.includes(topic.id);
              const isBookmarked = bookmarkedLessons.includes(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className={`cursor-pointer rounded-xl p-4 border transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-amber-500 ring-1 ring-amber-500/30 shadow-lg'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                      {topic.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isBookmarked && (
                        <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                  </div>

                  <h4 className="font-bold text-white text-xs md:text-sm line-clamp-2 leading-snug">
                    {topic.title}
                  </h4>

                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {topic.summary}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {topic.readTimeMinutes} phút đọc
                    </span>
                    <span className="font-semibold text-amber-400/90">
                      Độ quan trọng: {topic.importanceLevel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Topic In-depth Reader */}
        <div id="deepdive-reader" className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-700/80 p-5 sm:p-8 space-y-6 md:space-y-8 shadow-2xl scroll-mt-20">
          
          {/* Mobile Quick Topic Switcher Selector (Visible on mobile/tablet) */}
          <div className="lg:hidden bg-slate-950/80 border border-slate-800 p-3 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Đang đọc chuyên đề:</span>
              <span className="text-amber-400 font-mono">{selectedTopic.categoryLabel}</span>
            </div>
            <select
              value={selectedTopic.id}
              onChange={(e) => {
                const found = DEEP_DIVE_LESSONS.find(t => t.id === e.target.value);
                if (found) handleSelectTopic(found);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-medium focus:border-amber-500 focus:outline-none"
            >
              {DEEP_DIVE_LESSONS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          {/* Reader Top Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {selectedTopic.categoryLabel}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedTopic.readTimeMinutes} phút đọc & thực hành
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleLessonBookmark(selectedTopic.id)}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isSelectedBookmarked
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
                }`}
                title="Lưu bài học để xem lại sau"
              >
                {isSelectedBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                <span className="hidden sm:inline">{isSelectedBookmarked ? 'Đã lưu' : 'Lưu lại'}</span>
              </button>

              <button
                onClick={() => handleToggleComplete(selectedTopic.id)}
                className={`px-3.5 py-2 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isSelectedCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-900/30'
                }`}
              >
                {isSelectedCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Đã Hoàn Thành</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span>Đánh Dấu Hoàn Thành</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Title & Summary */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
              {selectedTopic.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              {selectedTopic.summary}
            </p>
          </div>

          {/* Higher-Ed Context Box */}
          <div className="bg-sky-950/20 border border-sky-500/30 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              Bối Cảnh Thực Tế Tại Đại Học Mỹ (Kent State / University IT)
            </div>
            <p className="text-xs md:text-sm text-sky-200 leading-relaxed">
              {selectedTopic.higherEdContext}
            </p>
          </div>

          {/* Core Concepts */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              Kiến Thức Cốt Lõi & Nguyên Lý Hoạt Động
            </h3>

            <div className="space-y-5">
              {selectedTopic.coreConcepts.map((concept, cIdx) => (
                <div key={cIdx} className="space-y-2.5 bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-amber-300 text-sm md:text-base">{concept.heading}</h4>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{concept.content}</p>
                  
                  {concept.bulletPoints && concept.bulletPoints.length > 0 && (
                    <ul className="space-y-1.5 pt-1">
                      {concept.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="text-xs md:text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-amber-400 mt-1">•</span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Practical Code Snippets */}
          {selectedTopic.practicalCommands && selectedTopic.practicalCommands.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                Mã Lệnh Thực Tế (Terraform / AWS CLI)
              </h3>

              <div className="space-y-4">
                {selectedTopic.practicalCommands.map((cmd, cmdIdx) => (
                  <div key={cmdIdx} className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 space-y-0">
                    <div className="bg-slate-800/90 px-4 py-2.5 flex items-center justify-between border-b border-slate-700 text-xs">
                      <span className="font-semibold text-slate-200 flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                          {cmd.tool}
                        </span>
                        {cmd.title}
                      </span>
                      <button
                        onClick={() => handleCopyCode(cmd.code, cmdIdx)}
                        className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        {copiedIndex === cmdIdx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 text-[11px]">Đã copy</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-emerald-300/90 overflow-x-auto leading-relaxed">
                      <code>{cmd.code}</code>
                    </pre>
                    <div className="bg-slate-900/60 px-4 py-2 text-xs text-slate-400 border-t border-slate-800">
                      {cmd.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hands-on Lab Exercise */}
          <div className="space-y-4 bg-slate-950/80 rounded-xl p-5 border border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-white text-sm md:text-base">
                  Lab Thực Hành: {selectedTopic.labExercise.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  {selectedTopic.labExercise.difficulty}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  {selectedTopic.labExercise.duration}
                </span>
                {selectedTopic.labExercise.freeTierEligible && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                    Free Tier 100%
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300">Mục tiêu bài lab:</div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400">
                {selectedTopic.labExercise.objectives.map((obj, oIdx) => (
                  <li key={oIdx} className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>

              <div className="text-xs font-bold text-slate-300 pt-2">Các bước thực hiện:</div>
              <div className="space-y-2">
                {selectedTopic.labExercise.steps.map((step) => (
                  <div key={step.stepNumber} className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px]">
                        {step.stepNumber}
                      </span>
                      {step.title}
                    </div>
                    <p className="text-xs text-slate-400 pl-7 leading-relaxed">{step.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Exam Tip Alert */}
          <div className="bg-amber-950/20 border border-amber-500/40 rounded-xl p-4 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Mẹo Làm Bài Thi AWS</div>
              <p className="text-xs md:text-sm text-amber-200 leading-relaxed">{selectedTopic.examTip}</p>
            </div>
          </div>

          {/* Interview Question & STAR Answer */}
          <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
              <MessageSquareQuote className="w-4 h-4" />
              Câu Hỏi Phỏng Vấn Thực Tế Tại Đại Học Mỹ & Câu Trả Lời Mẫu
            </div>
            
            <div className="text-sm font-bold text-white bg-slate-900/60 p-3 rounded-lg border border-slate-700/80">
              "{selectedTopic.interviewQuestion.question}"
            </div>

            <div className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-lg border border-slate-800">
              <strong className="text-emerald-400 block mb-1">Cách trả lời mẫu chuẩn STAR:</strong>
              {selectedTopic.interviewQuestion.sampleAnswer}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Từ khóa ghi điểm:</span>
              {selectedTopic.interviewQuestion.keyPoints.map((kp, kIdx) => (
                <span key={kIdx} className="bg-slate-900 px-2 py-0.5 rounded text-[11px] text-amber-300 border border-slate-700 font-medium">
                  {kp}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
