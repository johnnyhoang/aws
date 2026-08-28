import React, { useState } from 'react';
import { FUNDAMENTAL_DOMAINS, FUNDAMENTAL_TRACKS } from '../../data/fundamentals/domainsData';
import { FundamentalDomainId } from '../../types/fundamentals';
import { useLearning } from '../../context/LearningContext';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Cpu, 
  Globe, 
  Network, 
  Terminal, 
  Layout, 
  ShieldCheck, 
  Cloud, 
  GitBranch, 
  Star, 
  Sparkles,
  BookOpen
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Globe,
  Network,
  Terminal,
  Layout,
  ShieldCheck,
  Cloud,
  GitBranch
};

interface FundamentalsRoadmapViewProps {
  onNavigateDeepDive?: (domainId?: FundamentalDomainId) => void;
  onNavigatePortfolio?: () => void;
  onNavigateQuiz?: () => void;
}

export const FundamentalsRoadmapView: React.FC<FundamentalsRoadmapViewProps> = ({
  onNavigateDeepDive,
  onNavigatePortfolio,
  onNavigateQuiz
}) => {
  const { completedStages, toggleStageCompletion } = useLearning();
  const [selectedDomainId, setSelectedDomainId] = useState<FundamentalDomainId>('networking_basics');
  const [activeTrack, setActiveTrack] = useState<'it_infrastructure' | 'software_fundamentals'>('it_infrastructure');

  const currentDomain = FUNDAMENTAL_DOMAINS.find(d => d.id === selectedDomainId) || FUNDAMENTAL_DOMAINS[0];
  const trackInfo = FUNDAMENTAL_TRACKS[activeTrack];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950/80 border border-slate-700/80 p-5 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Lộ Trình Chuẩn Bị Toàn Diện Trước Khi Học AWS
            </div>

            {/* Track Switcher */}
            <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-700/80 flex items-center gap-1">
              <button
                onClick={() => setActiveTrack('it_infrastructure')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTrack === 'it_infrastructure'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Hạ Tầng & SysAdmin
              </button>
              <button
                onClick={() => setActiveTrack('software_fundamentals')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTrack === 'software_fundamentals'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Lập Trình & Web Dev
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pre-AWS IT & Cloud Fundamentals Mastery
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Xây dựng nền tảng vững chắc qua <strong>8 lĩnh vực IT cốt lõi</strong>: Hệ điều hành, Internet, Networking ⭐, Linux CLI ⭐, Web Architecture, Bảo mật PKI, Docker Containers và Kịch bản tự động hóa Bash/Python.
            </p>
          </div>

          {/* Target Track Description */}
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="font-bold text-white">{trackInfo.title}:</span>
              <span className="text-slate-400">{trackInfo.description}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8 Domains Grid Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            Lộ Trình 8 Lĩnh Vực Cốt Lõi
            <span className="text-xs font-normal text-slate-400">
              (Nhấp để xem chi tiết từng lĩnh vực)
            </span>
          </h2>
          <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400" /> Trọng tâm bắt buộc cho AWS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {FUNDAMENTAL_DOMAINS.map((domain) => {
            const Icon = ICON_MAP[domain.icon] || Cpu;
            const isSelected = selectedDomainId === domain.id;
            const isCompleted = completedStages.includes(domain.id);
            const isTrackPriority = trackInfo.priorityDomains.includes(domain.id);

            return (
              <div
                key={domain.id}
                onClick={() => setSelectedDomainId(domain.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-800/95 border-amber-500/60 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/40'
                    : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {/* Priority Glow */}
                {domain.isPillar && (
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                )}

                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl ${domain.badgeBg} border ${domain.badgeBorder} flex items-center justify-center ${domain.badgeColor} shadow-md`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        Phần {domain.order}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                        {domain.shortTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Completion Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStageCompletion(domain.id);
                    }}
                    className="text-slate-500 hover:text-emerald-400 transition-colors p-1"
                    title={isCompleted ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {domain.summary}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {domain.estimatedHours} giờ học
                  </span>
                  {domain.isPillar && (
                    <span className="text-amber-400 font-bold flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400" /> Cốt lõi
                    </span>
                  )}
                  {isTrackPriority && !domain.isPillar && (
                    <span className="text-emerald-400 font-semibold">Ưu tiên Track</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Domain Deep Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl ${currentDomain.badgeBg} border ${currentDomain.badgeBorder} flex items-center justify-center ${currentDomain.badgeColor} shadow-lg`}>
              {React.createElement(ICON_MAP[currentDomain.icon] || Cpu, { className: 'w-6 h-6' })}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {currentDomain.badge}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {currentDomain.estimatedHours} giờ học ước tính
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-extrabold text-white mt-1">
                {currentDomain.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateDeepDive && (
              <button
                onClick={() => onNavigateDeepDive(currentDomain.id)}
                className="px-4 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Học Chuyên Đề
              </button>
            )}
            {onNavigateQuiz && (
              <button
                onClick={onNavigateQuiz}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                Luyện Đề Quiz
              </button>
            )}
          </div>
        </div>

        {/* Why AWS Needs This Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/25">
          <h4 className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
            Tại sao học AWS BẮT BUỘC phải nắm vững lĩnh vực này?
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {currentDomain.whyAwsNeedsThis}
          </p>
        </div>

        {/* Key Topics & Subtopics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentDomain.keyTopics.map((topic, idx) => (
            <div key={idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {topic.title}
                </h5>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                  {topic.importance}
                </span>
              </div>
              <ul className="space-y-1 pl-3 text-xs text-slate-300">
                {topic.subtopics.map((sub, sIdx) => (
                  <li key={sIdx} className="list-disc text-slate-400">
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Must-Know Concepts & Hands-On Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Must-Know Concepts */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
            <h5 className="text-xs sm:text-sm font-bold text-sky-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Khái Niệm Then Chốt Cần Thuộc Lòng
            </h5>
            <div className="space-y-1.5">
              {currentDomain.mustKnowConcepts.map((concept, cIdx) => (
                <div key={cIdx} className="px-3 py-2 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                  <span>{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hands-On Checklist */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
            <h5 className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Thao Tác Thực Hành Tối Thiểu Trên Máy
            </h5>
            <div className="space-y-1.5">
              {currentDomain.handsOnChecklist.map((task, tIdx) => (
                <div key={tIdx} className="px-3 py-2 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
                  <span className="text-emerald-400 font-mono font-bold mt-0.5">#{tIdx + 1}</span>
                  <span className="leading-snug">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
