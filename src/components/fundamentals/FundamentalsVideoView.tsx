import React, { useState } from 'react';
import { FUNDAMENTAL_VIDEO_COURSES } from '../../data/fundamentals/videoCoursesData';
import { useLearning } from '../../context/LearningContext';
import { 
  Tv, 
  Play, 
  Clock, 
  CheckCircle2,
  ExternalLink, 
  BookOpen, 
  FileText,
  Save
} from 'lucide-react';

export const FundamentalsVideoView: React.FC = () => {
  const { addStudyHours } = useLearning();
  const [selectedCourseId, setSelectedCourseId] = useState<string>(FUNDAMENTAL_VIDEO_COURSES[0].id);
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});
  const [isSaved, setIsSaved] = useState(false);

  const currentCourse = FUNDAMENTAL_VIDEO_COURSES.find(c => c.id === selectedCourseId) || FUNDAMENTAL_VIDEO_COURSES[0];

  const handleSaveNotes = () => {
    setIsSaved(true);
    addStudyHours(0.1);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white">
              Học Qua Video Bài Giảng Tuyển Chọn
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Các khóa học thực chiến từ Harvard CS50, NetworkChuck, Nana và Hussein Nasser
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Course List */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 px-1 mb-2">
            Danh Sách Khóa Học Tuyển Chọn
          </h3>

          <div className="space-y-2">
            {FUNDAMENTAL_VIDEO_COURSES.map((course) => {
              const isSelected = selectedCourseId === course.id;

              return (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-800 border-red-500/60 shadow-lg shadow-red-500/10 ring-1 ring-red-500/30'
                      : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block mb-0.5">
                      {course.channel}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                      {course.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" /> {course.duration}
                      </span>
                      <span>•</span>
                      <span>Giảng viên: {course.instructor}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Content: Video Details & Embedded View */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 shadow-xl">
            
            {/* Title & Instructor */}
            <div className="border-b border-slate-800 pb-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                  {currentCourse.channel}
                </span>
                <span className="text-xs text-slate-400">
                  Thời lượng: {currentCourse.duration}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentCourse.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Giảng viên: <strong className="text-white">{currentCourse.instructor}</strong>
              </p>
            </div>

            {/* Video Player Card Mock */}
            <div className="aspect-video bg-black/90 border border-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-4 shadow-2xl relative overflow-hidden group">
              <div className="w-16 h-16 rounded-full bg-red-600/90 group-hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-600/30 transition-all transform group-hover:scale-110">
                <Play className="w-7 h-7 ml-1" />
              </div>
              <div className="space-y-1 z-10 max-w-md">
                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">{currentCourse.title}</h3>
                <p className="text-xs text-slate-400">Xem trực tiếp trên kênh chính thức của tác giả ({currentCourse.channel})</p>
              </div>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(currentCourse.title + ' ' + currentCourse.instructor)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-red-600/20 z-10"
              >
                <span>Mở Video Trên YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Topics Covered & Key Takeaways */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-sky-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  Nội Dung Trọng Tâm Bao Quát:
                </h4>
                <ul className="space-y-1 pl-4 text-xs text-slate-300 list-disc">
                  {currentCourse.topicsCovered.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Giá Trị Đạt Được Sau Khóa Học:
                </h4>
                <ul className="space-y-1 pl-4 text-xs text-slate-300 list-disc">
                  {currentCourse.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx}>{takeaway}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Note-Taking Section */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Sổ Tay Ghi Chú Cá Nhân Cho Khóa Học Này
                </h4>
                <button
                  onClick={handleSaveNotes}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSaved ? 'Đã Lưu!' : 'Lưu Ghi Chú'}
                </button>
              </div>

              <textarea
                value={userNotes[currentCourse.id] || ''}
                onChange={(e) => setUserNotes({ ...userNotes, [currentCourse.id]: e.target.value })}
                placeholder="Ghi chép lại các kiến thức, câu lệnh và lưu ý quan trọng khi nghe giảng..."
                className="w-full h-24 p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-amber-400 font-sans leading-relaxed"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
