import React, { useState } from 'react';
import { FUNDAMENTAL_PROJECTS } from '../../data/fundamentals/portfolioProjectsData';
import { useLearning } from '../../context/LearningContext';
import { 
  FolderGit2, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  Layers, 
  Terminal, 
  Award,
  ChevronRight,
  Briefcase
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

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white">
              Dự Án Thực Hành & Điểm Nhấn CV (Hands-on Labs)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              5 dự án thực chiến chuẩn doanh nghiệp chứng minh năng lực SysAdmin & Cloud Fundamentals
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
          <span className="text-slate-400">Hoàn thành:</span>
          <strong className="text-sky-300 font-mono">
            {completedProjects.filter(id => FUNDAMENTAL_PROJECTS.some(p => p.id === id)).length} / {FUNDAMENTAL_PROJECTS.length}
          </strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Project List */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 px-1 mb-2">
            Danh Sách 5 Dự Án Thực Chiến
          </h3>

          <div className="space-y-2">
            {FUNDAMENTAL_PROJECTS.map((proj, idx) => {
              const isSelected = selectedProjectId === proj.id;
              const isDone = completedProjects.includes(proj.id);

              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-800 border-sky-500/60 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/30'
                      : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 bg-slate-950 rounded text-slate-400">
                        Lab #{idx + 1}
                      </span>
                      <span className="text-[10px] text-sky-400 font-semibold truncate">
                        {proj.difficulty}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                      {proj.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> ~{proj.estimatedHours} giờ thực hành
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

        {/* Right Main Content: Project Detail */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 shadow-xl">
            
            {/* Header & Toggle Complete */}
            <div className="border-b border-slate-800 pb-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {currentProject.targetRole}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Ước tính: {currentProject.estimatedHours}h
                  </span>
                </div>

                <button
                  onClick={handleToggleComplete}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isProjectDone
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isProjectDone ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Đã Làm Xong Lab</span>
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
                {currentProject.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentProject.subtitle}
              </p>
            </div>

            {/* Scenario */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Tình Huống Doanh Nghiệp Thực Tế (Business Scenario)
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentProject.realWorldScenario}
              </p>
            </div>

            {/* Architecture Tiers */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                Các Lớp Kiến Trúc Hệ Thống (Architecture Components)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentProject.architectureComponents.map((comp, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                    <span className="text-xs font-bold text-amber-300 block">{comp.tier}</span>
                    <div className="flex flex-wrap gap-1">
                      {comp.components.map((c, cIdx) => (
                        <span key={cIdx} className="text-[10px] px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-300 font-mono">
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug pt-1">{comp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Implementation Guide */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Hướng Dẫn Thực Hiện Từng Bước (Implementation Guide)
              </h4>

              <div className="space-y-4">
                {currentProject.stepByStepGuide.map((step, sIdx) => (
                  <div key={sIdx} className="p-4 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {step.phase}
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-white">{step.title}</h5>
                    </div>

                    <ul className="space-y-1.5 pl-4 text-xs text-slate-300 list-disc">
                      {step.tasks.map((task, tIdx) => (
                        <li key={tIdx}>{task}</li>
                      ))}
                    </ul>

                    {/* Code Snippets if any */}
                    {step.codeSnippets && step.codeSnippets.map((codeItem, cIdx) => (
                      <div key={cIdx} className="bg-black/90 rounded-xl border border-slate-800/80 p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-slate-300">
                            {codeItem.title}
                          </span>
                          <button
                            onClick={() => handleCopy(codeItem.code, `${sIdx}-${cIdx}`)}
                            className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                          >
                            {copiedCodeIndex === `${sIdx}-${cIdx}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Đã chép</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-xs font-mono text-emerald-400 overflow-x-auto p-1 leading-relaxed">
                          {codeItem.code}
                        </pre>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* STAR Story for Interview */}
            <div className="p-4 bg-purple-500/10 border border-purple-500/25 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-purple-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-400" />
                Câu Chuyện Phỏng Vấn Theo Mô Hình STAR Để Trả Lời Nhà Tuyển Dụng
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-950/80 rounded-xl border border-purple-500/20">
                  <strong className="text-purple-300 block mb-0.5">S - Situation (Bối cảnh):</strong>
                  <span className="text-slate-300">{currentProject.interviewStarStory.situation}</span>
                </div>
                <div className="p-2.5 bg-slate-950/80 rounded-xl border border-purple-500/20">
                  <strong className="text-purple-300 block mb-0.5">T - Task (Nhiệm vụ):</strong>
                  <span className="text-slate-300">{currentProject.interviewStarStory.task}</span>
                </div>
                <div className="p-2.5 bg-slate-950/80 rounded-xl border border-purple-500/20">
                  <strong className="text-purple-300 block mb-0.5">A - Action (Hành động):</strong>
                  <span className="text-slate-300">{currentProject.interviewStarStory.action}</span>
                </div>
                <div className="p-2.5 bg-slate-950/80 rounded-xl border border-purple-500/20">
                  <strong className="text-purple-300 block mb-0.5">R - Result (Kết quả):</strong>
                  <span className="text-slate-300">{currentProject.interviewStarStory.result}</span>
                </div>
              </div>
            </div>

            {/* CV Bullet Point Tips */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Mẫu Ghi Điểm Nổi Bật Trong CV / Resume:
              </h4>
              <ul className="space-y-1 pl-4 text-xs text-slate-300 list-disc">
                {currentProject.cvBulletPointTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
