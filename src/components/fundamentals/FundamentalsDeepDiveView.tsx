import React, { useState } from 'react';
import { FUNDAMENTAL_DEEP_DIVE_LESSONS } from '../../data/fundamentals/deepDiveLessonsData';
import { FundamentalDomainId } from '../../types/fundamentals';
import { useLearning } from '../../context/LearningContext';
import { 
  BookOpen, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  ChevronRight, 
  Terminal, 
  HelpCircle, 
  Lightbulb,
  GraduationCap
} from 'lucide-react';

interface FundamentalsDeepDiveViewProps {
  initialDomainId?: FundamentalDomainId;
}

export const FundamentalsDeepDiveView: React.FC<FundamentalsDeepDiveViewProps> = ({ initialDomainId }) => {
  const { completedLessons, toggleLessonCompletion, addStudyHours } = useLearning();
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
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        const readerElem = document.getElementById('fundamental-reader');
        if (readerElem) {
          readerElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white">
              Chuyên Đề Kỹ Năng Nền Tảng (Deep Dive)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Bài giảng chuyên sâu, sơ đồ kiến trúc ASCII, câu lệnh thực chiến & bài tập Lab
            </p>
          </div>
        </div>

        {/* Progress Counter */}
        <div className="flex items-center gap-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
          <span className="text-slate-400">Đã hoàn thành:</span>
          <strong className="text-amber-300 font-mono">
            {completedLessons.filter(id => FUNDAMENTAL_DEEP_DIVE_LESSONS.some(l => l.id === id)).length} / {FUNDAMENTAL_DEEP_DIVE_LESSONS.length}
          </strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Lesson Selector */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 px-1 mb-2">
            Danh Sách 8 Chuyên Đề Cốt Lõi
          </h3>

          <div className="space-y-2">
            {FUNDAMENTAL_DEEP_DIVE_LESSONS.map((lesson, idx) => {
              const isSelected = selectedLessonId === lesson.id;
              const isDone = completedLessons.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-800 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                      : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 bg-slate-950 rounded text-slate-400">
                        #{idx + 1}
                      </span>
                      <span className="text-[10px] text-amber-400 font-semibold truncate">
                        {lesson.tag}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                      {lesson.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> {lesson.readTimeMinutes} phút đọc
                    </span>
                  </div>

                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Content: Lesson Reader */}
        <div id="fundamental-reader" className="lg:col-span-8 space-y-6 scroll-mt-20">
          
          {/* Mobile Quick Topic Switcher Selector (Visible on mobile/tablet) */}
          <div className="lg:hidden bg-slate-900 border border-slate-800 p-3 rounded-2xl space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Đang đọc chuyên đề:</span>
              <span className="text-amber-400 font-mono">#{FUNDAMENTAL_DEEP_DIVE_LESSONS.findIndex(l => l.id === currentLesson.id) + 1} {currentLesson.tag}</span>
            </div>
            <select
              value={selectedLessonId}
              onChange={(e) => handleSelectLesson(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-medium focus:border-amber-500 focus:outline-none"
            >
              {FUNDAMENTAL_DEEP_DIVE_LESSONS.map((l, idx) => (
                <option key={l.id} value={l.id}>
                  #{idx + 1} - {l.title}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 shadow-xl">
            
            {/* Header Title & Actions */}
            <div className="border-b border-slate-800 pb-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {currentLesson.categoryLabel}
                </span>
                <button
                  onClick={handleToggleComplete}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isLessonCompleted
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isLessonCompleted ? (
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

              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentLesson.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentLesson.subtitle}
              </p>
            </div>

            {/* AWS Connection Context Banner */}
            <div className="p-4 bg-gradient-to-r from-sky-500/10 via-slate-900 to-slate-900 border border-sky-500/25 rounded-2xl">
              <h4 className="text-xs sm:text-sm font-bold text-sky-300 flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-sky-400" />
                Ứng dụng thực chiến & Tầm quan trọng trong AWS:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentLesson.awsConnectionContext}
              </p>
            </div>

            {/* Core Concepts */}
            <div className="space-y-6">
              {currentLesson.coreConcepts.map((concept, cIdx) => (
                <div key={cIdx} className="space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    {concept.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {concept.content}
                  </p>

                  {/* Bullet Points */}
                  {concept.bulletPoints && (
                    <div className="space-y-2 pl-2">
                      {concept.bulletPoints.map((bp, bpIdx) => (
                        <div key={bpIdx} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                          <span dangerouslySetInnerHTML={{ __html: bp.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ASCII Diagram */}
                  {concept.diagramAscii && (
                    <div className="bg-black/90 p-4 rounded-2xl border border-slate-800 font-mono text-[11px] sm:text-xs text-emerald-400 overflow-x-auto shadow-inner">
                      <pre className="leading-relaxed">{concept.diagramAscii}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Practical Commands */}
            {currentLesson.practicalCommands && currentLesson.practicalCommands.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Câu Lệnh Thực Chiến Bắt Buộc Ghi Nhớ
                </h3>

                <div className="space-y-3">
                  {currentLesson.practicalCommands.map((cmd, cmdIdx) => (
                    <div key={cmdIdx} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">
                          {cmd.title} ({cmd.tool})
                        </span>
                        <button
                          onClick={() => handleCopy(cmd.code, cmdIdx)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                        >
                          {copiedCodeIndex === cmdIdx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Sao chép</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-3 bg-black/80 rounded-xl font-mono text-xs text-amber-300 overflow-x-auto">
                        {cmd.code}
                      </pre>
                      <p className="text-[11px] text-slate-400 italic">
                        {cmd.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hands-On Lab Exercise */}
            {currentLesson.labExercise && (
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-sky-400" />
                    {currentLesson.labExercise.title}
                  </h3>
                  <span className="text-xs text-slate-400">
                    Thời lượng: {currentLesson.labExercise.duration}
                  </span>
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-sky-300 block">Mục tiêu bài thực hành:</span>
                  <ul className="space-y-1 pl-4 text-xs text-slate-300 list-disc">
                    {currentLesson.labExercise.objectives.map((obj, oIdx) => (
                      <li key={oIdx}>{obj}</li>
                    ))}
                  </ul>

                  <div className="space-y-3 pt-2">
                    {currentLesson.labExercise.steps.map((step) => (
                      <div key={step.stepNumber} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-white flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-sky-600 text-white text-[10px] flex items-center justify-center font-mono">
                            {step.stepNumber}
                          </span>
                          {step.title}
                        </span>
                        <p className="text-xs text-slate-300">{step.details}</p>
                        {step.codeSnippet && (
                          <pre className="p-2 bg-black/80 rounded-lg font-mono text-xs text-emerald-400 overflow-x-auto">
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
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-1">
              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Mẹo Trọng Tâm Thi Chứng Chỉ & Phỏng Vấn (Exam Tip)
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentLesson.examTip}
              </p>
            </div>

            {/* Interview Question & Model STAR Answer */}
            {currentLesson.interviewQuestion && (
              <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-purple-400" />
                  Câu Hỏi Phỏng Vấn Thực Tế & Câu Trả Lời Mẫu Chuẩn STAR
                </h4>
                <p className="text-xs font-bold text-white">
                  "{currentLesson.interviewQuestion.question}"
                </p>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-purple-500/20">
                  {currentLesson.interviewQuestion.sampleAnswer}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
