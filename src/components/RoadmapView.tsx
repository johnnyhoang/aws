import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { CERT_STAGES, CAREER_TRACKS } from '../data/roadmapData';
import { CertStage } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  DollarSign, 
  BookOpen, 
  ChevronRight, 
  ArrowRight
} from 'lucide-react';

interface RoadmapViewProps {
  onNavigateDeepDive: (topicId?: string) => void;
  onNavigatePortfolio: () => void;
  onNavigateQuiz: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ 
  onNavigateDeepDive, 
  onNavigateQuiz 
}) => {
  const { currentTrack, completedStages, toggleStageCompleted } = useLearning();
  const [selectedStage, setSelectedStage] = useState<CertStage>(CERT_STAGES[1]); // SAA-C03

  const currentTrackInfo = CAREER_TRACKS[currentTrack];

  const handleToggleComplete = (stageId: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    toggleStageCompleted(stageId);
  };

  const filteredStages = CERT_STAGES.filter(stage => 
    stage.recommendedFor.includes(currentTrack)
  );

  return (
    <div className="space-y-8 text-slate-300">
      
      {/* Editorial Track Introduction */}
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
          Lộ Trình Năng Lực & Chứng Chỉ
        </div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
          {currentTrackInfo.title}
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {currentTrackInfo.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-400">
          <span className="text-slate-500 font-medium">Vị trí tương ứng:</span>
          {currentTrackInfo.targetRoles.map((role, idx) => (
            <span key={idx} className="bg-slate-900 px-2 py-0.5 rounded text-slate-300 border border-slate-800">
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* 3-Step Stages List */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Các Giai Đoạn Đào Tạo ({completedStages.length}/{filteredStages.length} hoàn thành)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredStages.map((stage, idx) => {
            const isCompleted = completedStages.includes(stage.id);
            const isSelected = selectedStage.id === stage.id;

            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStage(stage)}
                className={`cursor-pointer p-4 rounded-xl border transition-colors flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-slate-100 border-amber-500/80'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      Giai đoạn {idx + 1}: {stage.code}
                    </span>
                    
                    <button
                      onClick={(e) => handleToggleComplete(stage.id, e)}
                      className="p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                      title={isCompleted ? 'Đã có chứng chỉ' : 'Đánh dấu đã có'}
                      aria-label="Đánh dấu đã có chứng chỉ"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                  </div>

                  <h3 className="font-semibold text-sm text-slate-100 leading-snug">
                    {stage.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {stage.summary}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>~{stage.estimatedWeeks} tuần</span>
                  <span className="flex items-center gap-0.5 text-amber-400 font-medium">
                    Chi tiết <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Certificate In-depth Syllabus Section */}
      {selectedStage && (
        <div className="space-y-6 pt-6 border-t border-slate-800">
          
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-amber-400 font-mono">
                {selectedStage.code}
              </div>
              <h2 className="text-xl font-bold text-slate-100">
                {selectedStage.name}
              </h2>
              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                {selectedStage.importance}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>~{selectedStage.estimatedWeeks} tuần</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                <span>{selectedStage.examCost}</span>
              </div>
            </div>
          </div>

          {/* Practical Relevance */}
          <blockquote className="border-l-2 border-slate-700 pl-4 py-1 text-xs sm:text-sm text-slate-400 leading-relaxed italic">
            <strong className="text-slate-300 not-italic font-semibold block mb-0.5">Ứng dụng trong hệ thống:</strong>
            {selectedStage.practicalRelevance}
          </blockquote>

          {/* Exam Domains */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
              Các Miền Kiến Thức Đề Thi ({selectedStage.keyDomains.length} miền)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedStage.keyDomains.map((domain, dIdx) => (
                <div key={dIdx} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-200">
                    <span>{domain.name}</span>
                    <span className="text-amber-400 font-mono">{domain.percentage}%</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{domain.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Services */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
              Dịch Vụ Trọng Tâm Cần Nắm
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {selectedStage.mustKnowServices.map((service, sIdx) => (
                <span key={sIdx} className="px-2.5 py-1 bg-slate-900 text-slate-300 border border-slate-800 rounded text-xs font-mono">
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Study Materials */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
              Tài Liệu Ôn Luyện Đề Xuất
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedStage.recommendedResources.map((res, rIdx) => (
                <div key={rIdx} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                  <div className="text-[10px] text-amber-400 uppercase font-semibold">
                    {res.type === 'course' ? 'Khóa Học' : res.type === 'practice_exam' ? 'Bộ Đề' : 'Lab'}
                  </div>
                  <div className="font-semibold text-slate-200">{res.courseName}</div>
                  <div className="text-slate-400 text-[11px]">{res.instructor} ({res.platform})</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                const stageTopicMap: Record<string, string> = {
                  'clf-c02': 'networking-security-core',
                  'saa-c03': 'hybrid-cloud-migration',
                  'soa-c02': 'terraform-iac-enterprise',
                  'dva-c02': 'containers-ecs-serverless',
                  'sap-c02': 'hybrid-cloud-migration'
                };
                onNavigateDeepDive(stageTopicMap[selectedStage.id] || 'networking-security-core');
              }}
              className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Chuyển đến bài học chuyên đề</span>
            </button>

            <button
              onClick={onNavigateQuiz}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Luyện đề thi ({selectedStage.code})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
