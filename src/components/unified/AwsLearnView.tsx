import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { DEEP_DIVE_LESSONS } from '../../data/deepDiveLessons';
import { RoadmapView } from '../RoadmapView';
import { DeepDiveView } from '../DeepDiveView';
import { VideoLearningView } from '../VideoLearningView';
import { InterviewGuideView } from '../InterviewGuideView';
import { ResourceHubView } from '../ResourceHubView';
import { StudyPlannerView } from '../StudyPlannerView';
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

interface AwsLearnViewProps {
  onNavigateTab: (tab: 'learn' | 'test' | 'play') => void;
}

export const AwsLearnView: React.FC<AwsLearnViewProps> = ({ onNavigateTab }) => {
  const { completedLessons } = useLearning();
  const [selectedTopicId, setSelectedTopicId] = useState<string>('networking-security-core');
  const [activeReferenceTab, setActiveReferenceTab] = useState<'interview' | 'resources' | 'studyplan'>('interview');

  // Find next uncompleted lesson to recommend
  const nextLesson = DEEP_DIVE_LESSONS.find(l => !completedLessons.includes(l.id)) || DEEP_DIVE_LESSONS[0];

  const scrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigateDeepDive = (topicId?: string) => {
    if (topicId) {
      setSelectedTopicId(topicId);
    }
    scrollToSection('section-deepdive');
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1-CLICK QUICK START HERO HEADER */}
      <div className="bg-gradient-to-b from-slate-900/90 via-slate-900 to-slate-950 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-5">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-slate-800 to-sky-500/10 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Vào là học ngay • Đề xuất cho bạn
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Tiếp tục bài học:</span>
                <span className="text-amber-300">{nextLesson.title}</span>
              </h2>
              <p className="text-xs text-slate-300 line-clamp-1">
                {nextLesson.summary}
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                onClick={() => handleNavigateDeepDive(nextLesson.id)}
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
                onClick={() => scrollToSection('section-roadmap')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>1. Lộ Trình</span>
              </button>
              <button
                onClick={() => scrollToSection('section-deepdive')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>2. Chuyên Đề Đọc Ngay</span>
              </button>
              <button
                onClick={() => scrollToSection('section-video')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <Tv className="w-3.5 h-3.5 text-red-400" />
                <span>3. Video Bài Giảng</span>
              </button>
              <button
                onClick={() => scrollToSection('section-reference')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>4. Phỏng Vấn & Tài Liệu</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 1: LỘ TRÌNH CHỨNG CHỈ */}
      <section id="section-roadmap" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">1</span>
              <h2 className="text-xl font-black text-white">Lộ Trình Chứng Chỉ & Miền Kiến Thức</h2>
            </div>
            <button 
              onClick={() => scrollToSection('section-deepdive')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Đến Chuyên Đề Thực Hành</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        <RoadmapView
          onNavigateDeepDive={handleNavigateDeepDive}
          onNavigatePortfolio={() => onNavigateTab('play')}
          onNavigateQuiz={() => onNavigateTab('test')}
        />
      </section>

      {/* SECTION 2: CHUYÊN ĐỀ KỸ NĂNG & ĐỌC BÀI NGAY */}
      <section id="section-deepdive" className="scroll-mt-20 pt-6 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm">2</span>
              <h2 className="text-xl font-black text-white">Chuyên Đề Kỹ Năng & Thực Hành Chuyên Sâu</h2>
            </div>
            <button 
              onClick={() => scrollToSection('section-video')}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Xem Video Bài Giảng</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Chọn bất kỳ chuyên đề nào bên dưới để đọc tài liệu chi tiết, thực hành Lab mẫu và copy cấu hình ngay tại chỗ.
          </p>
        </div>
        <DeepDiveView initialTopicId={selectedTopicId} key={selectedTopicId} />
      </section>

      {/* SECTION 3: VIDEO BÀI GIẢNG */}
      <section id="section-video" className="scroll-mt-20 pt-6 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-sm">3</span>
              <h2 className="text-xl font-black text-white">Học Qua Video Bài Giảng Tuyển Chọn</h2>
            </div>
            <button 
              onClick={() => scrollToSection('section-reference')}
              className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Đến Cẩm Nang & Tài Liệu</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        <VideoLearningView />
      </section>

      {/* SECTION 4: PHỎNG VẤN STAR, KẾ HOẠCH & TÀI LIỆU */}
      <section id="section-reference" className="scroll-mt-20 pt-6 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">4</span>
              <h2 className="text-xl font-black text-white">Cẩm Nang Phỏng Vấn, Kế Hoạch & Tài Liệu</h2>
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
                <span>Phỏng Vấn STAR</span>
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
                <span>Tài Liệu Ôn</span>
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
            {activeReferenceTab === 'interview' && <InterviewGuideView />}
            {activeReferenceTab === 'resources' && <ResourceHubView />}
            {activeReferenceTab === 'studyplan' && <StudyPlannerView />}
          </div>
        </div>
      </section>

    </div>
  );
};
