import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { PORTFOLIO_PROJECTS } from '../data/portfolioProjects';
import { PortfolioProject } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const { completedProjects, toggleProjectCompleted } = useLearning();
  const [selectedProject, setSelectedProject] = useState<PortfolioProject>(PORTFOLIO_PROJECTS[0]);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleToggleComplete = (projId: string) => {
    toggleProjectCompleted(projId);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const isSelectedCompleted = completedProjects.includes(selectedProject.id);

  const currentIndex = PORTFOLIO_PROJECTS.findIndex(p => p.id === selectedProject.id);
  const prevProject = currentIndex > 0 ? PORTFOLIO_PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PORTFOLIO_PROJECTS.length - 1 ? PORTFOLIO_PROJECTS[currentIndex + 1] : null;

  return (
    <div className="space-y-8 text-slate-300">
      
      {/* Title & Introduction */}
      <div className="space-y-2 pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-slate-100 tracking-tight">
          Bộ Dự Án Thực Chiến Đưa Vào CV
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Hướng dẫn xây dựng các dự án hạ tầng Cloud hoàn chỉnh, có kiến trúc thực tế và template Terraform / CLI.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left List of Projects */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Danh Sách Dự Án ({PORTFOLIO_PROJECTS.length})
          </div>

          <div className="space-y-1">
            {PORTFOLIO_PROJECTS.map((proj, idx) => {
              const isSelected = selectedProject.id === proj.id;
              const isCompleted = completedProjects.includes(proj.id);

              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`cursor-pointer px-3 py-2.5 rounded-lg transition-colors flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-800/90 text-amber-300 border-l-2 border-amber-400 font-medium'
                      : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-medium truncate">
                      Dự án {idx + 1}: {proj.title.replace(/^Dự án \d+: /, '')}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>{proj.difficulty}</span>
                      <span>•</span>
                      <span>~{proj.estimatedHours}h</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
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

        {/* Right Project Detail Article */}
        <article className="lg:col-span-8 space-y-6">
          
          {/* Header */}
          <div className="space-y-3 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-amber-400 font-medium">Độ khó: {selectedProject.difficulty}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ~{selectedProject.estimatedHours} giờ thực hiện
                </span>
              </div>

              <button
                onClick={() => handleToggleComplete(selectedProject.id)}
                className={`p-2 rounded-md border transition-colors cursor-pointer ${
                  isSelectedCompleted
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
                title={isSelectedCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
                aria-label="Đánh dấu hoàn thành"
              >
                {isSelectedCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
              </button>
            </div>

            <h1 className="text-2xl font-bold text-slate-100 tracking-tight leading-snug">
              {selectedProject.title}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedProject.subtitle}
            </p>
          </div>

          {/* Business Problem */}
          <blockquote className="border-l-2 border-slate-700 pl-4 py-1 text-xs sm:text-sm text-slate-400 leading-relaxed italic">
            <strong className="text-slate-300 not-italic font-semibold block mb-0.5">Bối cảnh nghiệp vụ:</strong>
            {selectedProject.businessScenario}
          </blockquote>

          {/* Architecture Details */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">
              Kiến Trúc & Các Bước Triển Khai
            </h2>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400">Các tầng kiến trúc:</div>
              <div className="space-y-2">
                {selectedProject.architectureComponents.map((comp, sIdx) => (
                  <div key={sIdx} className="p-3 bg-slate-900/60 rounded border border-slate-800 text-xs">
                    <div className="font-semibold text-amber-300">{comp.tier}</div>
                    <p className="text-slate-400 mt-0.5">{comp.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {comp.services.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-400">Các giai đoạn thực hiện:</div>
              <div className="space-y-2">
                {selectedProject.stepByStepGuide.map((step, sIdx) => (
                  <div key={sIdx} className="pl-4 border-l-2 border-slate-800 text-xs sm:text-sm text-slate-300 space-y-1">
                    <span className="font-semibold text-slate-200 block">{step.phase}: {step.title}</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-400 text-xs">
                      {step.tasks.map((t, tIdx) => (
                        <li key={tIdx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Infrastructure Code */}
          {selectedProject.iacCodeSample && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                  Mã Nguồn Mẫu ({selectedProject.iacCodeSample.language.toUpperCase()}): {selectedProject.iacCodeSample.filename}
                </h2>
                <button
                  onClick={() => handleCopyCode(selectedProject.iacCodeSample.code)}
                  className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  title="Sao chép mã nguồn"
                  aria-label="Sao chép mã nguồn"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="rounded-lg bg-slate-900 border border-slate-800 overflow-hidden">
                <pre className="p-3.5 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{selectedProject.iacCodeSample.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Resume Bullets */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Kỹ Năng & STAR Story Phỏng Vấn
            </h2>
            <div className="space-y-1 text-xs sm:text-sm text-slate-300">
              <p><strong className="text-amber-400">S & T:</strong> {selectedProject.interviewStarStory.situation} {selectedProject.interviewStarStory.task}</p>
              <p><strong className="text-amber-400">Hành động:</strong> {selectedProject.interviewStarStory.action}</p>
              <p><strong className="text-amber-400">Kết quả:</strong> {selectedProject.interviewStarStory.result}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-xs">
            {prevProject ? (
              <button
                onClick={() => setSelectedProject(prevProject)}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-500 uppercase">Dự án trước</div>
                  <div className="font-medium text-slate-300 truncate max-w-[150px] sm:max-w-xs">{prevProject.title}</div>
                </div>
              </button>
            ) : <div />}

            {nextProject ? (
              <button
                onClick={() => setSelectedProject(nextProject)}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group text-right"
              >
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Dự án tiếp theo</div>
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
