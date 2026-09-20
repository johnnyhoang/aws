import React, { useState } from 'react';
import { FUNDAMENTAL_INTERVIEW_QA } from '../../data/fundamentals/interviewGuideData';
import { 
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
    <div className="space-y-6 text-slate-300">
      
      {/* Filter & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Câu Hỏi Phỏng Vấn IT ({filteredQAs.length} câu)
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'Tất Cả' },
            { id: 'networking_basics', label: 'Mạng' },
            { id: 'linux_basics', label: 'Linux' },
            { id: 'security_basics', label: 'Bảo Mật' },
            { id: 'cloud_fundamentals', label: 'Cloud' }
          ].map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDomain(d.id)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedDomain === d.id
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-2.5">
        {filteredQAs.map((item, idx) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-lg border border-slate-800 bg-slate-900/40 overflow-hidden"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-900/80 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-xs text-amber-400 font-semibold flex-shrink-0">
                    #{idx + 1}
                  </span>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-100 truncate">
                    {item.question}
                  </h3>
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-3 text-xs sm:text-sm border-t border-slate-800/80 bg-slate-950/40">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Tình huống & Trả lời chuẩn STAR:
                    </span>
                    <div className="text-slate-300 leading-relaxed space-y-1.5 text-xs sm:text-sm">
                      <p><strong className="text-amber-400">S (Tình huống):</strong> {item.starAnswer.situation}</p>
                      <p><strong className="text-amber-400">T (Nhiệm vụ):</strong> {item.starAnswer.task}</p>
                      <p><strong className="text-amber-400">A (Hành động):</strong> {item.starAnswer.action}</p>
                      <p><strong className="text-amber-400">R (Kết quả):</strong> {item.starAnswer.result}</p>
                    </div>
                  </div>

                  {item.interviewerLooksFor && item.interviewerLooksFor.length > 0 && (
                    <div className="text-xs text-slate-400 pt-1">
                      <strong className="text-slate-300">Nhà tuyển dụng tìm kiếm:</strong> {item.interviewerLooksFor.join(' • ')}
                    </div>
                  )}

                  {item.redFlagsToAvoid && item.redFlagsToAvoid.length > 0 && (
                    <div className="text-xs text-red-400/90 pt-1">
                      <strong>Cần tránh:</strong> {item.redFlagsToAvoid.join(' • ')}
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
