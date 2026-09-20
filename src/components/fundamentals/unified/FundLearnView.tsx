import React, { useState } from 'react';
import { FundamentalDomainId } from '../../../types/fundamentals';
import { FundamentalsRoadmapView } from '../FundamentalsRoadmapView';
import { FundamentalsDeepDiveView } from '../FundamentalsDeepDiveView';
import { FundamentalsVideoView } from '../FundamentalsVideoView';
import { FundamentalsInterviewGuideView } from '../FundamentalsInterviewGuideView';
import { FundamentalsResourceHubView } from '../FundamentalsResourceHubView';
import { FundamentalsStudyPlannerView } from '../FundamentalsStudyPlannerView';
import { 
  BookOpen, 
  Layers, 
  Tv, 
  GraduationCap
} from 'lucide-react';

interface FundLearnViewProps {
  onNavigateTab: (tab: 'learn' | 'test' | 'play') => void;
}

export const FundLearnView: React.FC<FundLearnViewProps> = ({ onNavigateTab }) => {
  const [selectedDomainId, setSelectedDomainId] = useState<FundamentalDomainId>('networking_basics');
  const [activeReferenceTab, setActiveReferenceTab] = useState<'interview' | 'resources' | 'studyplan'>('interview');

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
    scrollToSection('ch-fund-deepdive');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-12 text-slate-300">
      
      {/* Chapter Index Quick Navigation (Minimalist Bar) */}
      <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 pb-3 border-b border-slate-800 text-xs">
        <span className="text-slate-500 font-medium whitespace-nowrap">Chương:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToSection('ch-fund-roadmap')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>1. 8 Lĩnh Vực IT</span>
          </button>
          <button
            onClick={() => scrollToSection('ch-fund-deepdive')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Chuyên Đề Đọc Ngay</span>
          </button>
          <button
            onClick={() => scrollToSection('ch-fund-video')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Tv className="w-3.5 h-3.5 text-amber-400" />
            <span>3. Video</span>
          </button>
          <button
            onClick={() => scrollToSection('ch-fund-reference')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>4. Phỏng Vấn & Tài Liệu</span>
          </button>
        </div>
      </div>

      {/* CHAPTER 1: 8 LĨNH VỰC IT */}
      <section id="ch-fund-roadmap" className="scroll-mt-16 space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <span className="text-amber-400 font-bold">Chương 1</span>
          <span>•</span>
          <span>8 Lĩnh Vực IT Nền Tảng Sẵn Sàng Cho Cloud</span>
        </div>
        <FundamentalsRoadmapView
          onNavigateDeepDive={handleNavigateDeepDive}
          onNavigatePortfolio={() => onNavigateTab('play')}
          onNavigateQuiz={() => onNavigateTab('test')}
        />
      </section>

      {/* CHAPTER 2: CHUYÊN ĐỀ NỀN TẢNG */}
      <section id="ch-fund-deepdive" className="scroll-mt-16 pt-8 border-t border-slate-800 space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <span className="text-amber-400 font-bold">Chương 2</span>
          <span>•</span>
          <span>Chuyên Đề Kỹ Năng & Thực Hành Lab Nền Tảng</span>
        </div>
        <FundamentalsDeepDiveView initialDomainId={selectedDomainId} key={selectedDomainId} />
      </section>

      {/* CHAPTER 3: VIDEO BÀI GIẢNG */}
      <section id="ch-fund-video" className="scroll-mt-16 pt-8 border-t border-slate-800 space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <span className="text-amber-400 font-bold">Chương 3</span>
          <span>•</span>
          <span>Video Bài Giảng Minh Họa</span>
        </div>
        <FundamentalsVideoView />
      </section>

      {/* CHAPTER 4: PHỎNG VẤN & TÀI LIỆU */}
      <section id="ch-fund-reference" className="scroll-mt-16 pt-8 border-t border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span className="text-amber-400 font-bold">Chương 4</span>
            <span>•</span>
            <span>Cẩm Nang Phỏng Vấn IT & Tài Liệu Nền Tảng</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveReferenceTab('interview')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeReferenceTab === 'interview'
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Phỏng Vấn IT
            </button>
            <button
              onClick={() => setActiveReferenceTab('resources')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeReferenceTab === 'resources'
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tài Liệu
            </button>
            <button
              onClick={() => setActiveReferenceTab('studyplan')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeReferenceTab === 'studyplan'
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Kế Hoạch
            </button>
          </div>
        </div>

        <div>
          {activeReferenceTab === 'interview' && <FundamentalsInterviewGuideView />}
          {activeReferenceTab === 'resources' && <FundamentalsResourceHubView />}
          {activeReferenceTab === 'studyplan' && <FundamentalsStudyPlannerView />}
        </div>
      </section>

    </div>
  );
};
