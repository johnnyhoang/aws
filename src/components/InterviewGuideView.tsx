import React, { useState } from 'react';
import { UNIVERSITY_IT_GUIDE, INTERVIEW_QUESTIONS } from '../data/interviewGuideData';
import { 
  GraduationCap, 
  MessageSquareQuote, 
  AlertTriangle, 
  CheckCircle2, 
  Globe2, 
  Briefcase,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const InterviewGuideView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedQAId, setExpandedQAId] = useState<string>(INTERVIEW_QUESTIONS[0].id);

  const categories = [
    { id: 'all', label: 'Tất Cả Câu Hỏi' },
    { id: 'Higher-Ed IT & LMS', label: 'Hệ Thống Đại Học & LMS' },
    { id: 'Networking & Security', label: 'Mạng & An Ninh Bảo Mật' },
    { id: 'IaC & Automation', label: 'Terraform & CI/CD' },
    { id: 'Troubleshooting & Migration', label: 'Sự Cố & Di Chuyển Dữ Liệu' },
  ];

  const filteredQAs = INTERVIEW_QUESTIONS.filter(qa => 
    selectedCategory === 'all' || qa.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-slate-100">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-6 md:p-8 shadow-2xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          <GraduationCap className="w-3.5 h-3.5" />
          Kinh Nghiệm Xin Việc Tại Mỹ
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          {UNIVERSITY_IT_GUIDE.title}
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
          {UNIVERSITY_IT_GUIDE.subtitle}
        </p>
      </div>

      {/* Visa Advantage Box (H-1B Cap-Exempt) */}
      <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-2xl p-6 md:p-8 space-y-3 shadow-xl">
        <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base">
          <Globe2 className="w-5 h-5" />
          {UNIVERSITY_IT_GUIDE.visaInfo.title}
        </div>
        <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
          {UNIVERSITY_IT_GUIDE.visaInfo.details}
        </p>
        <div className="bg-emerald-900/40 p-4 rounded-xl border border-emerald-500/30 text-xs md:text-sm text-emerald-200 leading-relaxed">
          <strong>💡 Lợi thế Cap-Exempt:</strong> {UNIVERSITY_IT_GUIDE.visaInfo.h1bCapExemptAdvantage}
        </div>
      </div>

      {/* 3 Key Strategic Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-amber-400" />
          3 Chiến Lược Ứng Tuyển Cốt Lõi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {UNIVERSITY_IT_GUIDE.keyInsights.map((insight, idx) => (
            <div key={idx} className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-sm leading-snug">{insight.heading}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{insight.description}</p>
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                {insight.tips.map((tip, tIdx) => (
                  <div key={tIdx} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STAR Interview Question Bank */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-sky-400" />
              Ngân Hàng Câu Hỏi Phỏng Vấn Kỹ Thuật & Mẫu STAR
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Học cách cấu trúc câu trả lời theo 4 bước: Situation - Task - Action - Result.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-900/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredQAs.map((qa) => {
            const isExpanded = expandedQAId === qa.id;

            return (
              <div 
                key={qa.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg transition-all"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setExpandedQAId(isExpanded ? '' : qa.id)}
                  className="p-5 cursor-pointer flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                      {qa.category}
                    </span>
                    <h3 className="font-bold text-white text-sm md:text-base leading-snug">
                      {qa.question}
                    </h3>
                  </div>

                  <button className="p-1 rounded-lg bg-slate-800 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Accordion Body */}
                {isExpanded && (
                  <div className="p-6 pt-2 space-y-6 border-t border-slate-800 bg-slate-950/40">
                    
                    {/* Context */}
                    <div className="text-xs text-amber-300 bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">
                      <strong>Mục đích câu hỏi:</strong> {qa.context}
                    </div>

                    {/* STAR Answer Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                      <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
                        <span className="font-bold text-amber-400 text-xs uppercase tracking-wider block">
                          1. Situation (Bối cảnh thực tế)
                        </span>
                        <p className="text-slate-300 leading-relaxed">{qa.starAnswer.situation}</p>
                      </div>

                      <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
                        <span className="font-bold text-sky-400 text-xs uppercase tracking-wider block">
                          2. Task (Mục tiêu / Nhiệm vụ)
                        </span>
                        <p className="text-slate-300 leading-relaxed">{qa.starAnswer.task}</p>
                      </div>

                      <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
                        <span className="font-bold text-purple-400 text-xs uppercase tracking-wider block">
                          3. Action (Giải pháp kỹ thuật chi tiết)
                        </span>
                        <p className="text-slate-300 leading-relaxed">{qa.starAnswer.action}</p>
                      </div>

                      <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
                        <span className="font-bold text-emerald-400 text-xs uppercase tracking-wider block">
                          4. Result (Số liệu đo lường kết quả)
                        </span>
                        <p className="text-slate-300 leading-relaxed">{qa.starAnswer.result}</p>
                      </div>
                    </div>

                    {/* Interviewer looks for & Red flags */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="bg-emerald-950/10 p-4 rounded-xl border border-emerald-500/20 space-y-2">
                        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          Điểm Hội Đồng Tìm Kiếm:
                        </div>
                        <ul className="space-y-1 text-xs text-emerald-200">
                          {qa.interviewerLooksFor.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span>•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-red-950/10 p-4 rounded-xl border border-red-500/20 space-y-2">
                        <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" />
                          Lỗi Nguy Hiểm Cần Tránh:
                        </div>
                        <ul className="space-y-1 text-xs text-red-200">
                          {qa.redFlagsToAvoid.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span>•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

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
