import React, { useState } from 'react';
import { FUNDAMENTAL_DOMAINS, FUNDAMENTAL_TRACKS } from '../../data/fundamentals/domainsData';
import { FundamentalDomainId } from '../../types/fundamentals';
import { useLearning } from '../../context/LearningContext';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface FundamentalsRoadmapViewProps {
  onNavigateDeepDive?: (domainId?: FundamentalDomainId) => void;
  onNavigatePortfolio?: () => void;
  onNavigateQuiz?: () => void;
}

export const FundamentalsRoadmapView: React.FC<FundamentalsRoadmapViewProps> = ({
  onNavigateDeepDive,
  onNavigateQuiz
}) => {
  const { completedStages, toggleStageCompletion } = useLearning();
  const [selectedDomainId, setSelectedDomainId] = useState<FundamentalDomainId>('networking_basics');
  const [activeTrack, setActiveTrack] = useState<'it_infrastructure' | 'software_fundamentals'>('it_infrastructure');

  const currentDomain = FUNDAMENTAL_DOMAINS.find(d => d.id === selectedDomainId) || FUNDAMENTAL_DOMAINS[0];
  const trackInfo = FUNDAMENTAL_TRACKS[activeTrack];

  return (
    <div className="space-y-8 text-slate-300">
      
      {/* Editorial Track Introduction */}
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Lộ Trình IT Nền Tảng (Pre-AWS)
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight mt-1">
              8 Lĩnh Vực Cốt Lõi Cho Cloud Engineer
            </h1>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTrack('it_infrastructure')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTrack === 'it_infrastructure'
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SysAdmin & Mạng
            </button>
            <button
              onClick={() => setActiveTrack('software_fundamentals')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTrack === 'software_fundamentals'
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Lập Trình Web
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {trackInfo.description}
        </p>
      </div>

      {/* 8 Domains Grid */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Danh Sách 8 Lĩnh Vực ({completedStages.filter(id => FUNDAMENTAL_DOMAINS.some(d => d.id === id)).length}/8 hoàn thành)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {FUNDAMENTAL_DOMAINS.map((domain) => {
            const isSelected = selectedDomainId === domain.id;
            const isCompleted = completedStages.includes(domain.id);

            return (
              <div
                key={domain.id}
                onClick={() => setSelectedDomainId(domain.id)}
                className={`cursor-pointer p-3.5 rounded-xl border transition-colors flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-slate-100 border-amber-500/80'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      Phần {domain.order}: {domain.badge}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStageCompletion(domain.id);
                      }}
                      className="p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                      title={isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
                      aria-label="Đánh dấu hoàn thành"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                  </div>

                  <h3 className="font-semibold text-xs sm:text-sm text-slate-100 line-clamp-1">
                    {domain.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {domain.summary}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>~{domain.estimatedHours}h học</span>
                  <span className="flex items-center gap-0.5 text-amber-400 font-medium">
                    Chi tiết <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Domain Breakdown */}
      {currentDomain && (
        <div className="space-y-6 pt-6 border-t border-slate-800">
          
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-amber-400 font-mono">
                Phần {currentDomain.order} • {currentDomain.badge}
              </div>
              <h2 className="text-xl font-bold text-slate-100">
                {currentDomain.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>~{currentDomain.estimatedHours} giờ học</span>
            </div>
          </div>

          {/* Why AWS Needs This */}
          <blockquote className="border-l-2 border-slate-700 pl-4 py-1 text-xs sm:text-sm text-slate-400 leading-relaxed italic">
            <strong className="text-slate-300 not-italic font-semibold block mb-0.5">Tại sao bắt buộc phải nắm khi học AWS:</strong>
            {currentDomain.whyAwsNeedsThis}
          </blockquote>

          {/* Key Topics */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
              Các Chủ Đề Trọng Tâm
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentDomain.keyTopics.map((topic, idx) => (
                <div key={idx} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                  <div className="font-semibold text-slate-200">{topic.title}</div>
                  <ul className="space-y-1 pl-4 list-disc text-slate-400">
                    {topic.subtopics.map((sub, sIdx) => (
                      <li key={sIdx}>{sub}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Must Know & Hands On */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                Khái Niệm Cốt Lõi
              </h3>
              <div className="space-y-1">
                {currentDomain.mustKnowConcepts.map((concept, cIdx) => (
                  <div key={cIdx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                Thao Tác Thực Hành Tối Thiểu
              </h3>
              <div className="space-y-1">
                {currentDomain.handsOnChecklist.map((task, tIdx) => (
                  <div key={tIdx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-slate-500 font-mono">#{tIdx + 1}</span>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {onNavigateDeepDive && (
              <button
                onClick={() => onNavigateDeepDive(currentDomain.id)}
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Chuyển đến bài học chuyên đề</span>
              </button>
            )}

            {onNavigateQuiz && (
              <button
                onClick={onNavigateQuiz}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Thi thử đề trắc nghiệm</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
