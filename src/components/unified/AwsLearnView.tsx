import React, { useState } from 'react';
import { RoadmapView } from '../RoadmapView';
import { DeepDiveView } from '../DeepDiveView';
import { VideoLearningView } from '../VideoLearningView';
import { InterviewGuideView } from '../InterviewGuideView';
import { ResourceHubView } from '../ResourceHubView';
import { StudyPlannerView } from '../StudyPlannerView';
import { 
  BookOpen, 
  Layers, 
  Tv, 
  GraduationCap
} from 'lucide-react';

interface AwsLearnViewProps {
  onNavigateTab: (tab: 'learn' | 'test' | 'play') => void;
}

export const AwsLearnView: React.FC<AwsLearnViewProps> = ({ onNavigateTab }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('networking-security-core');
  const [activeReferenceTab, setActiveReferenceTab] = useState<'interview' | 'resources' | 'studyplan'>('interview');

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
    scrollToSection('ch-deepdive');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-12 text-slate-300">
      
      {/* Chapter Index Quick Navigation (Minimalist Bar) */}
      <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 pb-3 border-b border-slate-800 text-xs">
        <span className="text-slate-500 font-medium whitespace-nowrap">Chương:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToSection('ch-roadmap')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>1. Lộ Trình</span>
          </button>
          <button
            onClick={() => scrollToSection('ch-deepdive')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Chuyên Đề Đọc Ngay</span>
          </button>
          <button
            onClick={() => scrollToSection('ch-video')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Tv className="w-3.5 h-3.5 text-amber-400" />
            <span>3. Video</span>
          </button>
          <button
            onClick={() => scrollToSection('ch-reference')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>4. Phỏng Vấn & Tài Liệu</span>
          </button>
        </div>
      </div>

      {/* CHAPTER 1: LỘ TRÌNH */}
      <section id="ch-roadmap" className="scroll-mt-16 space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <span className="text-amber-400 font-bold">Chương 1</span>
          <span>•</span>
          <span>Lộ Trình Năng Lực & Mục Tiêu Chứng Chỉ</span>
        </div>
        <RoadmapView
          onNavigateDeepDive={handleNavigateDeepDive}
          onNavigatePortfolio={() => onNavigateTab('play')}
          onNavigateQuiz={() => onNavigateTab('test')}
        />
      </section>

      {/* CHAPTER 2: CHUYÊN ĐỀ ĐỌC NGAY */}
      <section id="ch-deepdive" className="scroll-mt-16 pt-8 border-t border-slate-800 space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <span className="text-amber-400 font-bold">Chương 2</span>
          <span>•</span>
          <span>Chuyên Đề Kỹ Năng & Giáo Trình Thực Hành</span>
        </div>
        <DeepDiveView initialTopicId={selectedTopicId} key={selectedTopicId} />
      </section>

      {/* CHAPTER 3: VIDEO THAM KHẢO */}
      <section id="ch-video" className="scroll-mt-16 pt-8 border-t border-slate-800 space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <span className="text-amber-400 font-bold">Chương 3</span>
          <span>•</span>
          <span>Video Bài Giảng Bổ Trợ Trực Quan</span>
        </div>
        <VideoLearningView />
      </section>

      {/* CHAPTER 4: PHỎNG VẤN & TÀI LIỆU */}
      <section id="ch-reference" className="scroll-mt-16 pt-8 border-t border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span className="text-amber-400 font-bold">Chương 4</span>
            <span>•</span>
            <span>Cẩm Nang Phỏng Vấn & Tài Liệu Tham Khảo</span>
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
              Phỏng Vấn STAR
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
          {activeReferenceTab === 'interview' && <InterviewGuideView />}
          {activeReferenceTab === 'resources' && <ResourceHubView />}
          {activeReferenceTab === 'studyplan' && <StudyPlannerView />}
        </div>
      </section>

    </div>
  );
};
