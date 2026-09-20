import React, { useState } from 'react';
import { FUNDAMENTAL_VIDEO_COURSES } from '../../data/fundamentals/videoCoursesData';
import { 
  Clock, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const FundamentalsVideoView: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(FUNDAMENTAL_VIDEO_COURSES[0].id);

  const currentCourse = FUNDAMENTAL_VIDEO_COURSES.find(c => c.id === selectedCourseId) || FUNDAMENTAL_VIDEO_COURSES[0];
  const currentIndex = FUNDAMENTAL_VIDEO_COURSES.findIndex(c => c.id === currentCourse.id);
  const prevCourse = currentIndex > 0 ? FUNDAMENTAL_VIDEO_COURSES[currentIndex - 1] : null;
  const nextCourse = currentIndex < FUNDAMENTAL_VIDEO_COURSES.length - 1 ? FUNDAMENTAL_VIDEO_COURSES[currentIndex + 1] : null;

  return (
    <div className="space-y-8 text-slate-300">
      
      {/* Title & Description */}
      <div className="space-y-2 pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-slate-100 tracking-tight">
          Video Bài Giảng Nền Tảng IT Tuyển Chọn
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Các khóa học video chất lượng cao từ Harvard CS50, NetworkChuck, TechWorld with Nana và Hussein Nasser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Danh Sách Khóa Học ({FUNDAMENTAL_VIDEO_COURSES.length})
          </div>

          <div className="space-y-1">
            {FUNDAMENTAL_VIDEO_COURSES.map((course, idx) => {
              const isSelected = selectedCourseId === course.id;

              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`cursor-pointer px-3 py-2.5 rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-slate-800/90 text-amber-300 border-l-2 border-amber-400 font-medium'
                      : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-medium truncate">
                    {idx + 1}. {course.title}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{course.channel}</span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Embedded Player & Notes */}
        <article className="lg:col-span-8 space-y-6">
          
          <div className="space-y-2 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-amber-400 font-medium">{currentCourse.channel}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {currentCourse.duration}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-100 tracking-tight leading-snug">
              {currentCourse.title}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentCourse.summary}
            </p>
          </div>

          {/* Embedded YouTube Frame */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-slate-800">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${currentCourse.youtubeId}`}
              title={currentCourse.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Key Topics List */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
              Các Chủ Đề Chính Trong Video
            </h3>
            <ul className="space-y-1 pl-4 list-disc text-xs sm:text-sm text-slate-300">
              {currentCourse.topicsCovered.map((t, idx) => (
                <li key={idx} className="leading-relaxed">{t}</li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-xs">
            {prevCourse ? (
              <button
                onClick={() => setSelectedCourseId(prevCourse.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-500 uppercase">Khóa học trước</div>
                  <div className="font-medium text-slate-300 truncate max-w-[150px] sm:max-w-xs">{prevCourse.title}</div>
                </div>
              </button>
            ) : <div />}

            {nextCourse ? (
              <button
                onClick={() => setSelectedCourseId(nextCourse.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group text-right"
              >
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Khóa học tiếp theo</div>
                  <div className="font-medium text-slate-300 truncate max-w-[150px] sm:max-w-xs">{nextCourse.title}</div>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : <div />}
          </div>

        </article>

      </div>

    </div>
  );
};
