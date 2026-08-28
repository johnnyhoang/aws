import React, { useState } from 'react';
import { FUNDAMENTAL_INTERVIEW_QA } from '../../data/fundamentals/interviewGuideData';
import { 
  GraduationCap, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Filter, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';

export const FundamentalsInterviewGuideView: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(FUNDAMENTAL_INTERVIEW_QA[0]?.id || null);

  const filteredQAs = selectedDomain === 'all'
    ? FUNDAMENTAL_INTERVIEW_QA
    : FUNDAMENTAL_INTERVIEW_QA.filter(q => q.domainId === selectedDomain);

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white">
              Cẩm Nang Phỏng Vấn Kỹ Thuật (STAR Interview Guide)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Tổng hợp câu hỏi phỏng vấn kỹ thuật thực tế cho vị trí Fresher/Junior Cloud & Systems Engineer
            </p>
          </div>
        </div>
      </div>

      {/* Domain Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
        {['all', 'networking_basics', 'linux_basics', 'security_basics', 'cloud_fundamentals'].map(d => (
          <button
            key={d}
            onClick={() => setSelectedDomain(d)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedDomain === d
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {d === 'all' ? `Tất cả (${FUNDAMENTAL_INTERVIEW_QA.length})` : d.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQAs.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`bg-slate-900 border transition-all rounded-2xl overflow-hidden shadow-lg ${
                isExpanded ? 'border-purple-500/50' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer bg-slate-900"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs flex-shrink-0 mt-0.5">
                    Q
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-purple-300 font-semibold">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">
                        Cấp độ: {item.difficulty}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                      {item.question}
                    </h3>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>

              {/* Answer Content in STAR Format */}
              {isExpanded && (
                <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/80 space-y-4 animate-fadeIn">
                  
                  {/* Context Note */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <strong className="text-slate-200">Mục đích câu hỏi:</strong> {item.context}
                  </div>

                  {/* STAR Answer Grid */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-purple-400 block uppercase tracking-wider">
                      Mẫu Trả Lời Chuẩn STAR (Tự Tin & Đi Thẳng Vào Bản Chất):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                        <strong className="text-purple-300 block mb-0.5">S - Situation (Bối cảnh):</strong>
                        <span className="text-slate-300 leading-relaxed">{item.starAnswer.situation}</span>
                      </div>
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                        <strong className="text-purple-300 block mb-0.5">T - Task (Nhiệm vụ):</strong>
                        <span className="text-slate-300 leading-relaxed">{item.starAnswer.task}</span>
                      </div>
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                        <strong className="text-purple-300 block mb-0.5">A - Action (Hành động chuyên môn):</strong>
                        <span className="text-slate-300 leading-relaxed">{item.starAnswer.action}</span>
                      </div>
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                        <strong className="text-purple-300 block mb-0.5">R - Result (Kết quả & Rút ra):</strong>
                        <span className="text-slate-300 leading-relaxed">{item.starAnswer.result}</span>
                      </div>
                    </div>
                  </div>

                  {/* Interviewer looks for & Red flags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1.5">
                      <h5 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Điểm Cộng Nhà Tuyển Dụng Tìm Kiếm:
                      </h5>
                      <ul className="space-y-1 pl-4 text-xs text-slate-300 list-disc">
                        {item.interviewerLooksFor.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-1.5">
                      <h5 className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        Lỗi Ngớ Ngẩn Cần Tránh (Red Flags):
                      </h5>
                      <ul className="space-y-1 pl-4 text-xs text-slate-300 list-disc">
                        {item.redFlagsToAvoid.map((flag, idx) => (
                          <li key={idx}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* AWS Follow-up Question */}
                  {item.awsFollowupQuestion && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200">
                      <strong className="text-amber-300 flex items-center gap-1 mb-0.5">
                        <Sparkles className="w-3.5 h-3.5" /> Câu hỏi đào sâu về AWS tiếp theo có thể gặp:
                      </strong>
                      "{item.awsFollowupQuestion}"
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
