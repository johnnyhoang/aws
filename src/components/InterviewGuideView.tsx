import React, { useState } from 'react';
import { UNIVERSITY_IT_GUIDE, INTERVIEW_QUESTIONS } from '../data/interviewGuideData';
import { 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';

export const InterviewGuideView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedQAId, setExpandedQAId] = useState<string>(INTERVIEW_QUESTIONS[0].id);

  const categories = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'Higher-Ed IT & LMS', label: 'Hệ Thống Đại Học' },
    { id: 'Networking & Security', label: 'Mạng & Bảo Mật' },
    { id: 'IaC & Automation', label: 'Terraform & CI/CD' },
    { id: 'Troubleshooting & Migration', label: 'Sự Cố & Migration' },
  ];

  const filteredQAs = INTERVIEW_QUESTIONS.filter(qa => 
    selectedCategory === 'all' || qa.category === selectedCategory
  );

  return (
    <div className="space-y-8 text-slate-300">
      
      {/* Title & Introduction */}
      <div className="space-y-2 pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-slate-100 tracking-tight">
          {UNIVERSITY_IT_GUIDE.title}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {UNIVERSITY_IT_GUIDE.subtitle}
        </p>
      </div>

      {/* Visa Note */}
      <blockquote className="border-l-2 border-slate-700 pl-4 py-1 text-xs sm:text-sm text-slate-400 leading-relaxed italic space-y-1">
        <strong className="text-slate-200 not-italic font-semibold block">{UNIVERSITY_IT_GUIDE.visaInfo.title}</strong>
        <p className="not-italic text-slate-300">{UNIVERSITY_IT_GUIDE.visaInfo.details}</p>
        <p className="text-slate-400">💡 <strong>Lợi thế Cap-Exempt:</strong> {UNIVERSITY_IT_GUIDE.visaInfo.h1bCapExemptAdvantage}</p>
      </blockquote>

      {/* Strategic Insights */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          3 Chiến Lược Ứng Tuyển Trọng Tâm
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {UNIVERSITY_IT_GUIDE.keyInsights.map((insight, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
              <h4 className="font-semibold text-slate-100 text-sm">{insight.heading}</h4>
              <p className="text-slate-400 leading-relaxed">{insight.description}</p>
              <ul className="space-y-1 pl-4 list-disc text-slate-300 pt-1">
                {insight.tips.map((tip, tIdx) => (
                  <li key={tIdx}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Q&A Section */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Câu Hỏi Phỏng Vấn STAR ({filteredQAs.length} câu)
          </h3>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-slate-800 text-amber-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          {filteredQAs.map((qa, idx) => {
            const isExpanded = expandedQAId === qa.id;

            return (
              <div
                key={qa.id}
                className="rounded-lg border border-slate-800 bg-slate-900/40 overflow-hidden"
              >
                <div
                  onClick={() => setExpandedQAId(isExpanded ? '' : qa.id)}
                  className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-900/80 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-xs text-amber-400 font-semibold flex-shrink-0">
                      #{idx + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-medium text-slate-100 truncate">
                      {qa.question}
                    </h4>
                  </div>
                  <button className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 space-y-3 text-xs sm:text-sm border-t border-slate-800/80 bg-slate-950/40">
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Trả lời mẫu chuẩn STAR:
                      </span>
                      <div className="text-slate-300 leading-relaxed space-y-1.5 text-xs sm:text-sm">
                        <p><strong className="text-amber-400">S (Situation):</strong> {qa.starAnswer.situation}</p>
                        <p><strong className="text-amber-400">T (Task):</strong> {qa.starAnswer.task}</p>
                        <p><strong className="text-amber-400">A (Action):</strong> {qa.starAnswer.action}</p>
                        <p><strong className="text-amber-400">R (Result):</strong> {qa.starAnswer.result}</p>
                      </div>
                    </div>

                    {qa.redFlagsToAvoid && qa.redFlagsToAvoid.length > 0 && (
                      <div className="text-xs text-red-300/90 pt-1">
                        <strong>Tránh mắc lỗi:</strong> {qa.redFlagsToAvoid.join(' • ')}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
