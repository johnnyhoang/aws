import React, { useState } from 'react';
import { FUNDAMENTAL_DEEP_DIVE_LESSONS } from '../../data/fundamentals/deepDiveLessonsData';
import { FundamentalDomainId } from '../../types/fundamentals';
import { useLearning } from '../../context/LearningContext';
import { useAudioReader } from '../../context/AudioReaderContext';
import { 
  Clock, 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  ChevronLeft,
  ChevronRight,
  Volume2
} from 'lucide-react';
import { VisualDiagram } from '../diagrams/VisualDiagram';

interface FundamentalsDeepDiveViewProps {
  initialDomainId?: FundamentalDomainId;
}

export const FundamentalsDeepDiveView: React.FC<FundamentalsDeepDiveViewProps> = ({ initialDomainId }) => {
  const { completedLessons, toggleLessonCompletion, addStudyHours } = useLearning();
  const { startReadingArticle, isPlaying, articleTitle } = useAudioReader();
  const [selectedLessonId, setSelectedLessonId] = useState<string>(() => {
    if (initialDomainId) {
      const match = FUNDAMENTAL_DEEP_DIVE_LESSONS.find(l => l.domainId === initialDomainId);
      if (match) return match.id;
    }
    return FUNDAMENTAL_DEEP_DIVE_LESSONS[0].id;
  });
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const currentLesson = FUNDAMENTAL_DEEP_DIVE_LESSONS.find(l => l.id === selectedLessonId) || FUNDAMENTAL_DEEP_DIVE_LESSONS[0];
  const isLessonCompleted = completedLessons.includes(currentLesson.id);

  const currentIndex = FUNDAMENTAL_DEEP_DIVE_LESSONS.findIndex(l => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? FUNDAMENTAL_DEEP_DIVE_LESSONS[currentIndex - 1] : null;
  const nextLesson = currentIndex < FUNDAMENTAL_DEEP_DIVE_LESSONS.length - 1 ? FUNDAMENTAL_DEEP_DIVE_LESSONS[currentIndex + 1] : null;

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleToggleComplete = () => {
    toggleLessonCompletion(currentLesson.id);
    if (!isLessonCompleted) {
      addStudyHours(currentLesson.readTimeMinutes / 60);
    }
  };

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    if (typeof window !== 'undefined') {
      const readerElem = document.getElementById('fundamental-reader');
      if (readerElem) {
        readerElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="space-y-8 text-slate-300">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar: Lesson Chapters */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            8 Chuyên Đề Nền Tảng ({completedLessons.filter(id => FUNDAMENTAL_DEEP_DIVE_LESSONS.some(l => l.id === id)).length}/8 hoàn thành)
          </div>

          <div className="space-y-1 max-h-[700px] overflow-y-auto pr-1">
            {FUNDAMENTAL_DEEP_DIVE_LESSONS.map((lesson, idx) => {
              const isSelected = selectedLessonId === lesson.id;
              const isDone = completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson.id)}
                  className={`cursor-pointer px-3 py-2.5 rounded-lg transition-colors flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-800/90 text-amber-300 border-l-2 border-amber-400 font-medium'
                      : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-medium truncate">
                      {idx + 1}. {lesson.title}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>{lesson.tag}</span>
                      <span>•</span>
                      <span>{lesson.readTimeMinutes}p</span>
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
          </div>
        </div>

        {/* Right Main Content: Editorial Reader */}
        <article id="fundamental-reader" className="lg:col-span-8 space-y-8 scroll-mt-20">
          
          {/* Header */}
          <div className="space-y-3 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-amber-400 font-medium">{currentLesson.categoryLabel}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {currentLesson.readTimeMinutes} phút đọc
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => startReadingArticle(currentLesson.title, currentLesson.coreConcepts)}
                  className={`p-2 rounded-md border transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isPlaying && articleTitle === currentLesson.title
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
                  onClick={handleToggleComplete}
                  className={`p-2 rounded-md border transition-colors cursor-pointer ${
                    isLessonCompleted
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                  title={isLessonCompleted ? 'Đã hoàn thành (nhấp để bỏ)' : 'Đánh dấu đã đọc'}
                  aria-label="Đánh dấu đã đọc"
                >
                  {isLessonCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-slate-100 tracking-tight leading-snug">
              {currentLesson.title}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentLesson.subtitle}
            </p>
          </div>

          {/* Practical AWS Connection Context */}
          <blockquote className="border-l-2 border-slate-700 pl-4 py-1 text-xs sm:text-sm text-slate-400 leading-relaxed italic">
            <strong className="text-slate-300 not-italic font-semibold block mb-0.5">Ứng dụng thực tế & Tầm quan trọng trong AWS:</strong>
            {currentLesson.awsConnectionContext}
          </blockquote>

          {/* Core Concepts */}
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">
              Kiến Thức Cốt Lõi
            </h2>

            <div className="space-y-6">
              {currentLesson.coreConcepts.map((concept, cIdx) => (
                <div key={cIdx} className="space-y-3">
                  <h3 className="text-sm font-semibold text-amber-300">{concept.heading}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{concept.content}</p>

                  {concept.bulletPoints && (
                    <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm text-slate-300">
                      {concept.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: bp.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-100">$1</strong>') }} />
                      ))}
                    </ul>
                  )}

                  {concept.diagramType ? (
                    <div className="pt-2">
                      <VisualDiagram 
                        type={concept.diagramType} 
                        title={concept.heading}
                        fallbackCode={concept.diagramAscii}
                      />
                    </div>
                  ) : concept.diagramAscii ? (
                    <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                      <pre className="leading-relaxed">{concept.diagramAscii}</pre>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Practical Commands */}
          {currentLesson.practicalCommands && currentLesson.practicalCommands.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">
                Câu Lệnh Thực Chiến
              </h2>

              <div className="space-y-4">
                {currentLesson.practicalCommands.map((cmd, cmdIdx) => (
                  <div key={cmdIdx} className="rounded-lg bg-slate-900 border border-slate-800 overflow-hidden">
                    <div className="bg-slate-950 px-3.5 py-2 flex items-center justify-between border-b border-slate-800 text-xs">
                      <span className="font-mono text-slate-300 font-medium">
                        <span className="text-amber-400 mr-2">[{cmd.tool}]</span>
                        {cmd.title}
                      </span>
                      <button
                        onClick={() => handleCopy(cmd.code, cmdIdx)}
                        className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                        title="Sao chép"
                        aria-label="Sao chép"
                      >
                        {copiedCodeIndex === cmdIdx ? (
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

          {/* Hands-On Lab Exercise */}
          {currentLesson.labExercise && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">
                Lab Thực Hành: {currentLesson.labExercise.title}
              </h2>

              <div className="space-y-3">
                <div className="text-xs text-slate-400">
                  Thời lượng: <strong className="text-slate-200">{currentLesson.labExercise.duration}</strong>
                </div>

                <div className="text-xs font-semibold text-slate-300 pt-1">Các bước thực hiện:</div>
                <div className="space-y-2.5">
                  {currentLesson.labExercise.steps.map((step) => (
                    <div key={step.stepNumber} className="pl-4 border-l-2 border-slate-800 space-y-1">
                      <div className="text-xs font-semibold text-slate-200">
                        Bước {step.stepNumber}: {step.title}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.details}</p>
                      {step.codeSnippet && (
                        <pre className="p-2 bg-slate-950 rounded font-mono text-xs text-slate-300 overflow-x-auto">
                          {step.codeSnippet}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Exam Tip Alert */}
          <div className="border-l-2 border-amber-500/60 pl-4 py-1 space-y-0.5 text-xs sm:text-sm">
            <span className="font-semibold text-amber-300 uppercase text-xs tracking-wider block">
              Mẹo thi & Phỏng vấn
            </span>
            <p className="text-slate-300 leading-relaxed">{currentLesson.examTip}</p>
          </div>

          {/* Interview Question & Model STAR Answer */}
          {currentLesson.interviewQuestion && (
            <div className="space-y-3 pt-2">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">
                Câu Hỏi Phỏng Vấn Mẫu
              </h2>
              <div className="space-y-2">
                <div className="text-xs sm:text-sm font-semibold text-slate-100">
                  "{currentLesson.interviewQuestion.question}"
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentLesson.interviewQuestion.sampleAnswer}
                </p>
              </div>
            </div>
          )}

          {/* Sequential Book Navigation Footer */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-800 text-xs">
            {prevLesson ? (
              <button
                onClick={() => handleSelectLesson(prevLesson.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-500 uppercase">Bài trước</div>
                  <div className="font-medium text-slate-300 truncate max-w-[150px] sm:max-w-xs">{prevLesson.title}</div>
                </div>
              </button>
            ) : <div />}

            {nextLesson ? (
              <button
                onClick={() => handleSelectLesson(nextLesson.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group text-right"
              >
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Bài tiếp theo</div>
                  <div className="font-medium text-slate-300 truncate max-w-[150px] sm:max-w-xs">{nextLesson.title}</div>
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
