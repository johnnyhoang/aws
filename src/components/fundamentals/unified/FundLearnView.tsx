import React, { useState } from 'react';
import { useLearning } from '../../../context/LearningContext';
import { FUNDAMENTAL_DEEP_DIVE_LESSONS } from '../../../data/fundamentals/deepDiveLessonsData';
import { FundamentalDomainId } from '../../../types/fundamentals';
import { FundamentalsRoadmapView } from '../FundamentalsRoadmapView';
import { FundamentalsDeepDiveView } from '../FundamentalsDeepDiveView';
import { FundamentalsVideoView } from '../FundamentalsVideoView';
import { FundamentalsInterviewGuideView } from '../FundamentalsInterviewGuideView';
import { FundamentalsResourceHubView } from '../FundamentalsResourceHubView';
import { FundamentalsStudyPlannerView } from '../FundamentalsStudyPlannerView';
import { 
  Sparkles, 
  BookOpen, 
  Layers, 
  Tv, 
  GraduationCap, 
  Library, 
  CalendarDays,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

interface FundLearnViewProps {
  onNavigateTab: (tab: 'learn' | 'test' | 'play') => void;
}

export const FundLearnView: React.FC<FundLearnViewProps> = ({ onNavigateTab }) => {
  const { completedLessons } = useLearning();
  const [selectedDomainId, setSelectedDomainId] = useState<FundamentalDomainId>('networking_basics');
  const [activeReferenceTab, setActiveReferenceTab] = useState<'interview' | 'resources' | 'studyplan'>('interview');

  // Find next uncompleted lesson
  const nextLesson = FUNDAMENTAL_DEEP_DIVE_LESSONS.find(l => !completedLessons.includes(l.id)) || FUNDAMENTAL_DEEP_DIVE_LESSONS[0];

  const scrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigateDeepDive = (domainId?: FundamentalDomainId) => {
    if (domainId) {
      setSelectedDomainId(domainId);
    }
    scrollToSection('section-fund-deepdive');
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1-CLICK QUICK START HERO HEADER */}
      <div className="bg-gradient-to-b from-slate-900/90 via-slate-900 to-slate-950 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-5">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-slate-800 to-indigo-500/10 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Vào là học ngay • Đề xuất cho bạn
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Tiếp tục bài học IT:</span>
                <span className="text-amber-300">{nextLesson.title}</span>
              </h2>
              <p className="text-xs text-slate-300 line-clamp-1">
                {nextLesson.summary}
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                onClick={() => handleNavigateDeepDive(nextLesson.domainId as FundamentalDomainId)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all transform active:scale-95 cursor-pointer"
              >
                <span>Học bài này ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigateTab('test')}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Làm bài Test</span>
              </button>
            </div>
          </div>

          {/* Quick Anchor Navigation Bar */}
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 pt-1 border-t border-slate-800/60">
            <span className="text-xs font-semibold text-slate-400 whitespace-nowrap hidden sm:inline">
              Mục lục trang học:
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => scrollToSection('section-fund-roadmap')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>1. 8 Lĩnh Vực IT</span>
              </button>
              <button
                onClick={() => scrollToSection('section-fund-deepdive')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>2. Chuyên Đề Đọc Ngay</span>
              </button>
              <button
                onClick={() => scrollToSection('section-fund-video')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <Tv className="w-3.5 h-3.5 text-red-400" />
                <span>3. Video Bài Giảng</span>
              </button>
              <button
                onClick={() => scrollToSection('section-fund-reference')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>4. Phỏng Vấn & Tài Liệu</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 1: 8 LĨNH VỰC IT */}
      <section id="section-fund-roadmap" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">1</span>
              <h2 className="text-xl font-black text-white">8 Lĩnh Vực IT Cốt Lõi (Pre-AWS Roadmap)</h2>
            </div>
            <button 
              onClick={() => scrollToSection('section-fund-deepdive')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Đến Chuyên Đề Thực Hành</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        <FundamentalsRoadmapView
          onNavigateDeepDive={handleNavigateDeepDive}
          onNavigatePortfolio={() => onNavigateTab('play')}
          onNavigateQuiz={() => onNavigateTab('test')}
        />
      </section>

      {/* SECTION 2: CHUYÊN ĐỀ NỀN TẢNG & ĐỌC BÀI NGAY */}
      <section id="section-fund-deepdive" className="scroll-mt-20 pt-6 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm">2</span>
              <h2 className="text-xl font-black text-white">Chuyên Đề Nền Tảng & Thực Hành Lab</h2>
            </div>
            <button 
              onClick={() => scrollToSection('section-fund-video')}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Xem Video Bài Giảng</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Chọn chủ đề để học kiến thức mạng, hệ thống Linux, Web servers, Docker, Cơ sở dữ liệu và Scripting.
          </p>
        </div>
        <FundamentalsDeepDiveView initialDomainId={selectedDomainId} key={selectedDomainId} />
      </section>

      {/* SECTION 3: VIDEO BÀI GIẢNG */}
      <section id="section-fund-video" className="scroll-mt-20 pt-6 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-sm">3</span>
              <h2 className="text-xl font-black text-white">Học Qua Video Bài Giảng Trực Quan</h2>
            </div>
            <button 
              onClick={() => scrollToSection('section-fund-reference')}
              className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Đến Cẩm Nang & Tài Liệu</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        <FundamentalsVideoView />
      </section>

      {/* SECTION 4: PHỎNG VẤN IT, KẾ HOẠCH & TÀI LIỆU */}
      <section id="section-fund-reference" className="scroll-mt-20 pt-6 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">4</span>
              <h2 className="text-xl font-black text-white">Cẩm Nang Phỏng Vấn IT, Kế Hoạch & Tài Liệu</h2>
            </div>

            {/* Sub-tab Switcher */}
            <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-700/80 flex items-center gap-1 self-start sm:self-auto">
              <button
                onClick={() => setActiveReferenceTab('interview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeReferenceTab === 'interview'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Phỏng Vấn IT</span>
              </button>
              <button
                onClick={() => setActiveReferenceTab('resources')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeReferenceTab === 'resources'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Library className="w-3.5 h-3.5" />
                <span>Tài Liệu Nền Tảng</span>
              </button>
              <button
                onClick={() => setActiveReferenceTab('studyplan')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeReferenceTab === 'studyplan'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Kế Hoạch</span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            {activeReferenceTab === 'interview' && <FundamentalsInterviewGuideView />}
            {activeReferenceTab === 'resources' && <FundamentalsResourceHubView />}
            {activeReferenceTab === 'studyplan' && <FundamentalsStudyPlannerView />}
          </div>
        </div>
      </section>

    </div>
  );
};
