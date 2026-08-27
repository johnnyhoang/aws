import React, { useState, useRef } from 'react';
import { useLearning } from '../context/LearningContext';
import { CERT_STAGES, CAREER_TRACKS } from '../data/roadmapData';
import { CertStage } from '../types';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  DollarSign, 
  BookOpen, 
  Award, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  ArrowRight,
  HelpCircle,
  X,
  Check
} from 'lucide-react';

interface RoadmapViewProps {
  onNavigateDeepDive: () => void;
  onNavigatePortfolio: () => void;
  onNavigateQuiz: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ 
  onNavigateDeepDive, 
  onNavigatePortfolio, 
  onNavigateQuiz 
}) => {
  const { currentTrack, completedStages, toggleStageCompleted } = useLearning();
  const [selectedStage, setSelectedStage] = useState<CertStage>(CERT_STAGES[1]); // Default to SAA-C03
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const currentTrackInfo = CAREER_TRACKS[currentTrack];

  const handleToggleComplete = (stageId: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    const isCompleted = completedStages.includes(stageId);
    toggleStageCompleted(stageId);

    if (!isCompleted) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleOpenDetail = (stage: CertStage) => {
    setSelectedStage(stage);
    setIsDetailModalOpen(true);
  };

  // Filter stages based on current track
  const filteredStages = CERT_STAGES.filter(stage => 
    stage.recommendedFor.includes(currentTrack)
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 text-slate-100">
      
      {/* Hero Banner: Target US Universities Career Track */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-5 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Award className="w-4 h-4" />
              Lộ Trình Cốt Lõi 3 Cấp Độ Chuẩn Phòng IT Đại Học Mỹ
            </div>
            <h1 className="text-xl md:text-3xl font-extrabold text-white tracking-tight">
              {currentTrackInfo.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {currentTrackInfo.description}
            </p>

            <div className="pt-1 flex flex-wrap gap-1.5 text-xs text-slate-300">
              <span className="font-semibold text-slate-400">Vị trí mục tiêu:</span>
              {currentTrackInfo.targetRoles.map((role, idx) => (
                <span key={idx} className="bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700 text-slate-200 text-[11px]">
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Quick CTA Box */}
          <div className="bg-slate-800/90 rounded-xl p-4 md:p-5 border border-slate-700 space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tiến Độ Chứng Chỉ</span>
              <span className="text-xs font-bold text-amber-400">
                {completedStages.length}/{filteredStages.length} Hoàn thành
              </span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2">
              <div 
                className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedStages.length / filteredStages.length) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 italic">
              "Không cần lấy tất cả các bằng cấp mà nên đi theo lộ trình cốt lõi và có chiều sâu thực hành."
            </p>
          </div>
        </div>
      </div>

      {/* 3-Step Interactive Roadmap Timeline */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Các Giai Đoạn Chinh Phục Chứng Chỉ AWS
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Nhấp vào từng chứng chỉ bên dưới để xem chi tiết miền kiến thức, mẹo thi và khóa học đề xuất</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredStages.map((stage, idx) => {
            const isCompleted = completedStages.includes(stage.id);
            const isSelected = selectedStage.id === stage.id;

            return (
              <div
                key={stage.id}
                onClick={() => handleOpenDetail(stage)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 relative overflow-hidden flex flex-col justify-between group active:scale-[0.99] ${
                  isSelected
                    ? 'bg-slate-800 border-amber-500 ring-2 ring-amber-500/30 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/60 hover:bg-slate-850 shadow-md'
                }`}
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Bước {idx + 1}: {stage.level === 'foundational' ? 'Cơ Bản' : stage.level === 'associate' ? 'Trọng Tâm' : 'Nâng Cao'}
                  </span>
                  
                  <button
                    onClick={(e) => handleToggleComplete(stage.id, e)}
                    className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                    }`}
                    title={isCompleted ? 'Đã đạt được bằng này' : 'Đánh dấu đã có chứng chỉ'}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Đã có</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        <span>Chưa có</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-amber-400 tracking-tight">{stage.code}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      ~{stage.estimatedWeeks} tuần
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm leading-snug group-hover:text-amber-300 transition-colors">{stage.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {stage.summary}
                  </p>
                </div>

                {/* View Details Button Bar */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Xem chi tiết <ChevronRight className="w-4 h-4" />
                  </span>
                  <span className="text-slate-500 text-[11px]">{stage.mustKnowServices.length} dịch vụ cốt lõi</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Certificate In-depth Panel (Desktop view anchor) */}
      <div ref={detailPanelRef} className="space-y-4">
        {selectedStage && (
          <div className="bg-slate-900 rounded-2xl border border-slate-700/80 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-amber-400">{selectedStage.code}</span>
                  <span className="text-lg font-bold text-white">{selectedStage.name}</span>
                </div>
                <p className="text-sm text-slate-300">{selectedStage.importance}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400">Thời gian ước tính</div>
                  <div className="text-sm font-bold text-slate-200 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-amber-400" />
                    {selectedStage.estimatedWeeks} Tuần học & luyện đề
                  </div>
                </div>
                <div className="text-right pl-4 border-l border-slate-800">
                  <div className="text-xs text-slate-400">Lệ phí thi AWS</div>
                  <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {selectedStage.examCost}
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Relevance for US Universities */}
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs md:text-sm text-amber-200 leading-relaxed">
                <strong>Ứng dụng thực tế tại Đại học Mỹ (Kent State...):</strong> {selectedStage.practicalRelevance}
              </div>
            </div>

            {/* Key Domains & Breakdown */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                Các Miền Kiến Thức Trong Đề Thi (Exam Domains)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedStage.keyDomains.map((domain, dIdx) => (
                  <div key={dIdx} className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-200">{domain.name}</span>
                      <span className="text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-bold">
                        {domain.percentage}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{domain.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Must Know Services */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Các Dịch Vụ Cốt Lõi Phải Nắm Vững:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedStage.mustKnowServices.map((service, sIdx) => (
                  <span 
                    key={sIdx}
                    className="px-3 py-1 bg-slate-800 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-mono font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Resources (Stephane Maarek, Adrian Cantrill, Jon Bonso) */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-emerald-400" />
                Tài Liệu Ôn Luyện Được Đề Xuất Nhiều Nhất:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedStage.recommendedResources.map((res, rIdx) => (
                  <div key={rIdx} className="bg-slate-800/90 rounded-xl p-4 border border-slate-700 flex flex-col justify-between">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        res.type === 'course' ? 'bg-sky-500/20 text-sky-300' :
                        res.type === 'practice_exam' ? 'bg-purple-500/20 text-purple-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {res.type === 'course' ? 'Khóa Học Lý Thuyết' : res.type === 'practice_exam' ? 'Bộ Đề Thi Thử' : 'Thực Hành Chuyên Sâu'}
                      </span>
                      <h5 className="font-bold text-white text-xs mt-2">{res.courseName}</h5>
                      <p className="text-xs text-slate-400 mt-1">Giảng viên: <strong className="text-slate-300">{res.instructor}</strong> ({res.platform})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Navigation Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                Luyện thi kết hợp làm Lab thực tế để đạt hiệu quả cao nhất
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onNavigateDeepDive}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <span>Học Chuyên Đề Kỹ Năng</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onNavigateQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
                >
                  <span>Thi Thử Ngay ({selectedStage.code})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Detail Modal Dialog (Perfect for Mobile & Fast Inspection) */}
      {isDetailModalOpen && selectedStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative text-slate-100">
            
            {/* Modal Header */}
            <div className="bg-slate-800/95 px-5 py-4 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-amber-400">{selectedStage.code}</span>
                <div>
                  <h3 className="font-bold text-white text-sm md:text-base leading-tight line-clamp-1">{selectedStage.name}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span>Thời gian: ~{selectedStage.estimatedWeeks} tuần</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">{selectedStage.examCost}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-5 md:p-6 overflow-y-auto space-y-5 flex-1 bg-slate-900">
              
              {/* Importance & Higher-Ed Application */}
              <div className="bg-amber-950/25 border border-amber-500/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  Vai Trò Trong Hệ Thống IT Đại Học Mỹ:
                </div>
                <p className="text-xs md:text-sm text-amber-200/90 leading-relaxed">
                  {selectedStage.practicalRelevance}
                </p>
              </div>

              {/* Exam Domains */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  Các Miền Kiến Thức Đề Thi:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedStage.keyDomains.map((domain, dIdx) => (
                    <div key={dIdx} className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-200">
                        <span>{domain.name}</span>
                        <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded text-[11px]">
                          {domain.percentage}%
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{domain.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Must-Know Services */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                  Các Dịch Vụ Cốt Lõi:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStage.mustKnowServices.map((service, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-2.5 py-1 bg-slate-800 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-mono font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Resources */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  Khóa Học & Đề Thi Khuyên Dùng:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedStage.recommendedResources.map((res, rIdx) => (
                    <div key={rIdx} className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 text-xs">
                      <span className="text-[10px] font-bold text-sky-400 uppercase">
                        {res.type === 'course' ? 'Khóa Học' : res.type === 'practice_exam' ? 'Đề Thi Thử' : 'Thực Hành'}
                      </span>
                      <h5 className="font-bold text-white mt-1 line-clamp-1">{res.courseName}</h5>
                      <p className="text-slate-400 text-[11px] mt-0.5">Giảng viên: <strong className="text-slate-200">{res.instructor}</strong> ({res.platform})</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="bg-slate-800/90 px-5 py-3.5 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleToggleComplete(selectedStage.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  completedStages.includes(selectedStage.id)
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {completedStages.includes(selectedStage.id) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Đã Có Bằng Này</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span>Đánh Dấu Đã Đạt</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    onNavigateQuiz();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
                >
                  <span>Luyện Đề ({selectedStage.code})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4 Pillars of Knowledge Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
        <div 
          onClick={onNavigateDeepDive}
          className="bg-slate-900/60 hover:bg-slate-800/80 cursor-pointer p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all space-y-2"
        >
          <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider">Trụ Cột 1</div>
          <h4 className="font-bold text-white text-sm">Mạng & Bảo Mật Nâng Cao</h4>
          <p className="text-xs text-slate-400 leading-relaxed">VPC 3 Lớp, Transit Gateway, IAM, SSO Okta & chuẩn FERPA bảo vệ sinh viên.</p>
        </div>

        <div 
          onClick={onNavigateDeepDive}
          className="bg-slate-900/60 hover:bg-slate-800/80 cursor-pointer p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all space-y-2"
        >
          <div className="text-sky-400 font-bold text-xs uppercase tracking-wider">Trụ Cột 2</div>
          <h4 className="font-bold text-white text-sm">Hạ Tầng Bằng Mã (IaC)</h4>
          <p className="text-xs text-slate-400 leading-relaxed">Quản lý hạ tầng bằng Terraform & CloudFormation tự động hóa qua GitHub Actions.</p>
        </div>

        <div 
          onClick={onNavigateDeepDive}
          className="bg-slate-900/60 hover:bg-slate-800/80 cursor-pointer p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all space-y-2"
        >
          <div className="text-purple-400 font-bold text-xs uppercase tracking-wider">Trụ Cột 3</div>
          <h4 className="font-bold text-white text-sm">Hybrid Cloud & Migration</h4>
          <p className="text-xs text-slate-400 leading-relaxed">Đồng bộ trung tâm dữ liệu on-premise trường học lên AWS với Storage Gateway & DataSync.</p>
        </div>

        <div 
          onClick={onNavigatePortfolio}
          className="bg-slate-900/60 hover:bg-slate-800/80 cursor-pointer p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all space-y-2"
        >
          <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">Trụ Cột 4</div>
          <h4 className="font-bold text-white text-sm">Container & Serverless</h4>
          <p className="text-xs text-slate-400 leading-relaxed">Docker, Amazon EKS, Lambda & tích hợp Webhook với hệ thống Canvas LMS.</p>
        </div>
      </div>

    </div>
  );
};
