import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { PORTFOLIO_PROJECTS } from '../data/portfolioProjects';
import { PortfolioProject } from '../types';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Circle, 
  Terminal, 
  Layers, 
  Sparkles, 
  Copy, 
  Check, 
  MessageSquareQuote,
  Zap,
  GitBranch
} from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const { completedProjects, toggleProjectCompleted } = useLearning();
  const [selectedProject, setSelectedProject] = useState<PortfolioProject>(PORTFOLIO_PROJECTS[0]);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleToggleComplete = (projId: string) => {
    const isCompleted = completedProjects.includes(projId);
    toggleProjectCompleted(projId);
    if (!isCompleted) {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 }
      });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const isSelectedCompleted = completedProjects.includes(selectedProject.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <GitBranch className="w-3.5 h-3.5" />
            Xây Dựng Portfolio Thực Chiến Đính Kèm Resume (CV)
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Bộ Dự Án Thực Chiến Cho Phòng IT Đại Học Mỹ
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
            "Bằng cấp là tấm vé qua vòng gửi xe, nhưng bài kiểm tra kỹ thuật và vòng phỏng vấn hội đồng sẽ hỏi rất sâu vào các dự án thực tế bạn đã từng triển khai."
          </p>
        </div>
      </div>

      {/* Project Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PORTFOLIO_PROJECTS.map((project, idx) => {
          const isSelected = selectedProject.id === project.id;
          const isCompleted = completedProjects.includes(project.id);

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`cursor-pointer rounded-xl p-5 border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-amber-500 ring-2 ring-amber-500/20 shadow-xl'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                    Dự Án {idx + 1}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    project.difficulty === 'Nâng cao' ? 'bg-purple-500/20 text-purple-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm line-clamp-2 leading-snug">
                  {project.title.replace(/^Dự án \d+: /, '')}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {project.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">~{project.estimatedHours}h làm</span>
                {isCompleted ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Hoàn thành
                  </span>
                ) : (
                  <span className="text-slate-500">Chưa làm</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Project Full Details Panel */}
      <div className="bg-slate-900 rounded-2xl border border-slate-700/80 p-6 md:p-8 space-y-8 shadow-2xl">
        
        {/* Title & Complete Action */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                Vị trí mục tiêu: {selectedProject.targetRole}
              </span>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Chi phí: {selectedProject.estimatedCost}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              {selectedProject.title}
            </h2>
            <p className="text-sm text-slate-300">
              {selectedProject.subtitle}
            </p>
          </div>

          <button
            onClick={() => handleToggleComplete(selectedProject.id)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
              isSelectedCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-500 shadow-lg shadow-amber-500/20 font-extrabold'
            }`}
          >
            {isSelectedCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Đã Hoàn Thành Dự Án</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                <span>Đánh Dấu Hoàn Thành</span>
              </>
            )}
          </button>
        </div>

        {/* Business Scenario Box */}
        <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/80 space-y-2">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Bài Toán Nghiệp Vụ Tại Trường Đại Học Mỹ (Business Scenario)
          </div>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {selectedProject.businessScenario}
          </p>
        </div>

        {/* Architecture Components Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Layers className="w-5 h-5 text-sky-400" />
            Các Tầng Kiến Trúc Hệ Thống (Architecture Breakdown)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedProject.architectureComponents.map((tier, tIdx) => (
              <div key={tIdx} className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-3">
                <h4 className="font-bold text-sky-300 text-sm">{tier.tier}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {tier.services.map((svc, sIdx) => (
                    <span key={sIdx} className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded text-[11px] font-mono border border-slate-700">
                      {svc}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Implementation Guide */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            Hướng Dẫn Triển Khai Từng Bước
          </h3>

          <div className="space-y-3">
            {selectedProject.stepByStepGuide.map((guide, gIdx) => (
              <div key={gIdx} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/80 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  {guide.phase}: <span className="text-white normal-case">{guide.title}</span>
                </div>
                <ul className="space-y-1.5 pl-2">
                  {guide.tasks.map((task, taskIdx) => (
                    <li key={taskIdx} className="text-xs md:text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Code Sample */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-amber-400" />
              Mã Nguồn Mẫu: {selectedProject.iacCodeSample.filename}
            </h3>
            <button
              onClick={() => handleCopyCode(selectedProject.iacCodeSample.code)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Đã sao chép' : 'Sao chép mã'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300/90 overflow-x-auto leading-relaxed max-h-80">
            <code>{selectedProject.iacCodeSample.code}</code>
          </pre>
        </div>

        {/* STAR Interview Script for this project */}
        <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <MessageSquareQuote className="w-4 h-4" />
            Kịch Bản Trả Lời Phỏng Vấn Về Dự Án Này (STAR Method)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 text-xs uppercase tracking-wider block">1. Situation (Bối cảnh)</span>
              <p className="text-slate-300 leading-relaxed">{selectedProject.interviewStarStory.situation}</p>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-sky-400 text-xs uppercase tracking-wider block">2. Task (Nhiệm vụ của bạn)</span>
              <p className="text-slate-300 leading-relaxed">{selectedProject.interviewStarStory.task}</p>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-purple-400 text-xs uppercase tracking-wider block">3. Action (Hành động bạn đã làm)</span>
              <p className="text-slate-300 leading-relaxed">{selectedProject.interviewStarStory.action}</p>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 text-xs uppercase tracking-wider block">4. Result (Kết quả đạt được)</span>
              <p className="text-slate-300 leading-relaxed">{selectedProject.interviewStarStory.result}</p>
            </div>
          </div>
        </div>

        {/* GitHub Template Tip */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3">
          <GitBranch className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm text-emerald-200 leading-relaxed">
            <strong>Mẹo đóng gói trên GitHub:</strong> {selectedProject.githubRepoTemplateTip}
          </div>
        </div>

      </div>

    </div>
  );
};
