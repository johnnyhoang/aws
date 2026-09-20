import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { DEEP_DIVE_LESSONS } from '../data/deepDiveLessons';
import { DeepDiveTopic } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Volume2
} from 'lucide-react';
import { useAudioReader } from '../context/AudioReaderContext';

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
  const { startReadingArticle, isPlaying, articleTitle } = useAudioReader();

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
    { id: 'all', label: 'Tất cả' },
    { id: 'networking_security', label: 'Mạng & Bảo mật' },
    { id: 'iac', label: 'IaC Terraform' },
    { id: 'hybrid_migration', label: 'Hybrid & Migration' },
    { id: 'containers_serverless', label: 'Container & Serverless' },
    { id: 'university_lms_sso', label: 'SSO & LMS' },
  ];

  const currentIndex = DEEP_DIVE_LESSONS.findIndex(t => t.id === selectedTopic.id);
  const prevTopic = currentIndex > 0 ? DEEP_DIVE_LESSONS[currentIndex - 1] : null;
  const nextTopic = currentIndex < DEEP_DIVE_LESSONS.length - 1 ? DEEP_DIVE_LESSONS[currentIndex + 1] : null;

  const handleSelectTopic = (topic: DeepDiveTopic) => {
    setSelectedTopic(topic);
    if (typeof window !== 'undefined') {
      const readerElem = document.getElementById('deepdive-reader');
      if (readerElem) {
        readerElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const filteredTopics = DEEP_DIVE_LESSONS.filter(topic => {
    const matchesCategory = activeCategory === 'all' || topic.category === activeCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          topic.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleComplete = (topicId: string) => {
    toggleLessonCompleted(topicId);
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const isSelectedCompleted = completedLessons.includes(selectedTopic.id);
  const isSelectedBookmarked = bookmarkedLessons.includes(selectedTopic.id);

  return (
    <div className="space-y-8 text-slate-300">
      
      {/* Category Pills & Minimal Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm bài học..."
            className="w-full bg-slate-900 border border-slate-800 rounded-md pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700"
          />
        </div>
      </div>

      {/* Main Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Chapters / Topics List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Mục lục bài học ({filteredTopics.length})
          </div>

          <div className="space-y-1 max-h-[700px] overflow-y-auto pr-1">
            {filteredTopics.map((topic, idx) => {
              const isSelected = selectedTopic.id === topic.id;
              const isCompleted = completedLessons.includes(topic.id);
              const isBookmarked = bookmarkedLessons.includes(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className={`cursor-pointer px-3 py-2.5 rounded-lg transition-colors flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-800/90 text-amber-300 border-l-2 border-amber-400 font-medium'
                      : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-medium truncate">
                      {idx + 1}. {topic.title}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>{topic.categoryLabel}</span>
                      <span>•</span>
                      <span>{topic.readTimeMinutes}p</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                    {isBookmarked && <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />}
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Editorial Book Article */}
        <article id="deepdive-reader" className="lg:col-span-8 space-y-8 scroll-mt-20">
          
          {/* Article Header & Icon Actions */}
          <div className="space-y-3 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-amber-400 font-medium">{selectedTopic.categoryLabel}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedTopic.readTimeMinutes} phút đọc
                </span>
              </div>

              {/* Minimal Icon Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => startReadingArticle(selectedTopic.title, selectedTopic.coreConcepts)}
                  className={`p-2 rounded-md border transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isPlaying && articleTitle === selectedTopic.title
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm animate-pulse'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-amber-300 hover:border-slate-700'
                  }`}
                  title="Nghe bài đọc"
                  aria-label="Nghe bài đọc"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="text-[11px] font-medium hidden sm:inline">Nghe bài</span>
                </button>

                <button
                  onClick={() => toggleLessonBookmark(selectedTopic.id)}
                  className={`p-2 rounded-md border transition-colors cursor-pointer ${
                    isSelectedBookmarked
                      ? 'bg-slate-800 text-amber-400 border-slate-700'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                  title={isSelectedBookmarked ? 'Bỏ lưu bài học' : 'Lưu bài học'}
                  aria-label="Lưu bài học"
                >
                  {isSelectedBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleToggleComplete(selectedTopic.id)}
                  className={`p-2 rounded-md border transition-colors cursor-pointer ${
                    isSelectedCompleted
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                  title={isSelectedCompleted ? 'Đã hoàn thành (nhấp để bỏ)' : 'Đánh dấu đã đọc'}
                  aria-label="Đánh dấu đã đọc"
                >
                  {isSelectedCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-slate-100 tracking-tight leading-snug">
              {selectedTopic.title}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedTopic.summary}
            </p>
          </div>

          {/* Real-world Note / Blockquote */}
          <blockquote className="border-l-2 border-slate-700 pl-4 py-1 text-xs sm:text-sm text-slate-400 leading-relaxed italic">
            <strong className="text-slate-300 not-italic font-semibold block mb-0.5">Bối cảnh ứng dụng thực tế:</strong>
            {selectedTopic.higherEdContext}
          </blockquote>

          {/* Core Concepts */}
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">
              Kiến Thức Cốt Lõi & Nguyên Lý
            </h2>

            <div className="space-y-6">
              {selectedTopic.coreConcepts.map((concept, cIdx) => (
                <div key={cIdx} className="space-y-2">
                  <h3 className="text-sm font-semibold text-amber-300">{concept.heading}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{concept.content}</p>
                  
                  {concept.bulletPoints && concept.bulletPoints.length > 0 && (
                    <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm text-slate-300">
                      {concept.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="leading-relaxed">
                          {bp}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippets */}
          {selectedTopic.practicalCommands && selectedTopic.practicalCommands.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">
                Mã Lệnh Thực Tế
              </h2>

              <div className="space-y-4">
                {selectedTopic.practicalCommands.map((cmd, cmdIdx) => (
                  <div key={cmdIdx} className="rounded-lg bg-slate-900 border border-slate-800 overflow-hidden">
                    <div className="bg-slate-950 px-3.5 py-2 flex items-center justify-between border-b border-slate-800 text-xs">
                      <span className="font-mono text-slate-300 font-medium">
                        <span className="text-amber-400 mr-2">[{cmd.tool}]</span>
                        {cmd.title}
                      </span>
                      <button
                        onClick={() => handleCopyCode(cmd.code, cmdIdx)}
                        className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                        title="Sao chép mã lệnh"
                        aria-label="Sao chép mã lệnh"
                      >
                        {copiedIndex === cmdIdx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <pre className="p-3.5 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                      <code>{cmd.code}</code>
                    </pre>
                    <div className="px-3.5 py-2 text-xs text-slate-400 border-t border-slate-800 bg-slate-950/60">
                      {cmd.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hands-on Lab Guide */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">
              Lab Thực Hành: {selectedTopic.labExercise.title}
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Độ khó: <strong className="text-slate-200">{selectedTopic.labExercise.difficulty}</strong></span>
                <span>•</span>
                <span>Thời gian: <strong className="text-slate-200">{selectedTopic.labExercise.duration}</strong></span>
              </div>

              <div className="text-xs font-semibold text-slate-300 pt-1">Các bước thực hiện:</div>
              <div className="space-y-2.5">
                {selectedTopic.labExercise.steps.map((step) => (
                  <div key={step.stepNumber} className="pl-4 border-l-2 border-slate-800 space-y-0.5">
                    <div className="text-xs font-semibold text-slate-200">
                      Bước {step.stepNumber}: {step.title}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Exam Tip Note */}
          <div className="border-l-2 border-amber-500/60 pl-4 py-1 space-y-0.5 text-xs sm:text-sm">
            <span className="font-semibold text-amber-300 uppercase text-xs tracking-wider block">
              Mẹo thi AWS
            </span>
            <p className="text-slate-300 leading-relaxed">{selectedTopic.examTip}</p>
          </div>

          {/* Interview STAR Q&A */}
          <div className="space-y-3 pt-2">
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">
              Câu Hỏi Phỏng Vấn & Trả Lời Mẫu
            </h2>
            
            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-semibold text-slate-100">
                "{selectedTopic.interviewQuestion.question}"
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedTopic.interviewQuestion.sampleAnswer}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-slate-400">
                <span className="font-semibold text-slate-500">Từ khóa:</span>
                {selectedTopic.interviewQuestion.keyPoints.map((kp, kIdx) => (
                  <span key={kIdx} className="bg-slate-900 px-2 py-0.5 rounded text-[11px] text-slate-300 border border-slate-800">
                    {kp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sequential Book Navigation Footer (Previous / Next Chapter) */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-800 text-xs">
            {prevTopic ? (
              <button
                onClick={() => handleSelectTopic(prevTopic)}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-500 uppercase">Bài trước</div>
                  <div className="font-medium text-slate-300 truncate max-w-[150px] sm:max-w-xs">{prevTopic.title}</div>
                </div>
              </button>
            ) : <div />}

            {nextTopic ? (
              <button
                onClick={() => handleSelectTopic(nextTopic)}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group text-right"
              >
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Bài tiếp theo</div>
                  <div className="font-medium text-slate-300 truncate max-w-[150px] sm:max-w-xs">{nextTopic.title}</div>
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
