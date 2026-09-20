import React, { useState } from 'react';
import { FUNDAMENTAL_PROJECTS } from '../../data/fundamentals/portfolioProjectsData';
import { useLearning } from '../../context/LearningContext';
import { 
  Clock, 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const FundamentalsPortfolioView: React.FC = () => {
  const { completedProjects, toggleProjectCompletion, addStudyHours } = useLearning();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(FUNDAMENTAL_PROJECTS[0].id);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);

  const currentProject = FUNDAMENTAL_PROJECTS.find(p => p.id === selectedProjectId) || FUNDAMENTAL_PROJECTS[0];
  const isProjectDone = completedProjects.includes(currentProject.id);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(id);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleToggleComplete = () => {
    toggleProjectCompletion(currentProject.id);
    if (!isProjectDone) {
      addStudyHours(currentProject.estimatedHours);
    }
  };

  const currentIndex = FUNDAMENTAL_PROJECTS.findIndex(p => p.id === currentProject.id);
  const prevProject = currentIndex > 0 ? FUNDAMENTAL_PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < FUNDAMENTAL_PROJECTS.length - 1 ? FUNDAMENTAL_PROJECTS[currentIndex + 1] : null;

  return (
    <div className="space-y-8 text-slate-300">
      
      {/* Title & Introduction */}
      <div className="space-y-2 pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-slate-100 tracking-tight">
          Dự Án Thực Hành Nền Tảng IT (Hands-on Labs)
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          5 dự án thực chiến chuẩn SysAdmin & Cloud Fundamentals để làm quen với cấu hình hệ thống thực tế.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Danh Sách 5 Dự Án ({FUNDAMENTAL_PROJECTS.length})
          </div>

          <div className="space-y-1">
            {FUNDAMENTAL_PROJECTS.map((proj, idx) => {
              const isSelected = selectedProjectId === proj.id;
              const isDone = completedProjects.includes(proj.id);

              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`cursor-pointer px-3 py-2.5 rounded-lg transition-colors flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-800/90 text-amber-300 border-l-2 border-amber-400 font-medium'
                      : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-medium truncate">
                      Lab {idx + 1}: {proj.title}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>{proj.difficulty}</span>
                      <span>•</span>
                      <span>~{proj.estimatedHours}h</span>
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

        {/* Right Detail */}
        <article className="lg:col-span-8 space-y-6">
          
          <div className="space-y-3 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-amber-400 font-medium">{currentProject.difficulty}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ~{currentProject.estimatedHours} giờ thực hiện
                </span>
              </div>

              <button
                onClick={handleToggleComplete}
                className={`p-2 rounded-md border transition-colors cursor-pointer ${
                  isProjectDone
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
                title={isProjectDone ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
                aria-label="Đánh dấu hoàn thành"
              >
                {isProjectDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
              </button>
            </div>

            <h1 className="text-2xl font-bold text-slate-100 tracking-tight leading-snug">
              {currentProject.title}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentProject.summary}
            </p>
          </div>

          {/* Real World Scenario */}
          <blockquote className="border-l-2 border-slate-700 pl-4 py-1 text-xs sm:text-sm text-slate-400 leading-relaxed italic">
            <strong className="text-slate-300 not-italic font-semibold block mb-0.5">Tình huống thực tế:</strong>
            {currentProject.realWorldScenario}
          </blockquote>

          {/* Architecture Details */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">
              Các Bước Triển Khai
            </h2>

            <div className="space-y-3">
              {currentProject.stepByStepGuide.map((step, sIdx) => (
                <div key={sIdx} className="pl-4 border-l-2 border-slate-800 space-y-1">
                  <div className="text-xs font-semibold text-slate-200">
                    {step.phase}: {step.title}
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-xs text-slate-400 leading-relaxed">
                    {step.tasks.map((task, tIdx) => (
                      <li key={tIdx}>{task}</li>
                    ))}
                  </ul>
                  {step.codeSnippets && step.codeSnippets.map((snippet, cIdx) => (
                    <div key={cIdx} className="pt-1">
                      <div className="flex items-center justify-between pb-1 text-[11px] text-slate-500">
                        <span className="font-mono">{snippet.title} ({snippet.language})</span>
                        <button
                          onClick={() => handleCopy(snippet.code, `step-${sIdx}-${cIdx}`)}
                          className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedCodeIndex === `step-${sIdx}-${cIdx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                      <pre className="p-3 bg-slate-900 rounded font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed border border-slate-800">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Resume Bullets */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Cách Ghi Điểm Trong CV
            </h2>
            <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm text-slate-300">
              {currentProject.cvBulletPointTips.map((bullet, bIdx) => (
                <li key={bIdx} className="leading-relaxed">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-xs">
            {prevProject ? (
              <button
                onClick={() => setSelectedProjectId(prevProject.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-500 uppercase">Lab trước</div>
                  <div className="font-medium text-slate-300 truncate max-w-[150px] sm:max-w-xs">{prevProject.title}</div>
                </div>
              </button>
            ) : <div />}

            {nextProject ? (
              <button
                onClick={() => setSelectedProjectId(nextProject.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group text-right"
              >
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Lab tiếp theo</div>
                  <div className="font-medium text-slate-300 truncate max-w-[150px] sm:max-w-xs">{nextProject.title}</div>
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
