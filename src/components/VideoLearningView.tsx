import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { VIDEO_COURSES, VideoLesson } from '../data/videoCoursesData';
import { 
  Play, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Search, 
  X
} from 'lucide-react';

export const VideoLearningView: React.FC = () => {
  const { logStudyHours } = useLearning();
  const [selectedCert, setSelectedCert] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<VideoLesson | null>(null);
  const [watchedVideoIds, setWatchedVideoIds] = useState<string[]>([]);

  const certFilters = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'CLF-C02', label: 'CLF-C02' },
    { id: 'SAA-C03', label: 'SAA-C03' },
    { id: 'SOA-C02', label: 'SOA-C02' },
    { id: 'DVA-C02', label: 'DVA-C02' },
    { id: 'SAP-C02', label: 'SAP-C02' },
    { id: 'DevOps & IaC', label: 'IaC & DevOps' }
  ];

  const filteredVideos = VIDEO_COURSES.filter(v => {
    const matchCert = selectedCert === 'all' || v.certTag === selectedCert;
    const matchQuery = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       v.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCert && matchQuery;
  });

  const handleToggleWatched = (vidId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isWatched = watchedVideoIds.includes(vidId);
    if (!isWatched) {
      setWatchedVideoIds(prev => [...prev, vidId]);
      logStudyHours(1);
    } else {
      setWatchedVideoIds(prev => prev.filter(id => id !== vidId));
    }
  };

  return (
    <div className="space-y-6 text-slate-300">
      
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {certFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedCert(f.id)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedCert === f.id
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm video bài giảng..."
            className="w-full bg-slate-900 border border-slate-800 rounded-md pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700"
          />
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video) => {
          const isWatched = watchedVideoIds.includes(video.id);

          return (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-400 font-semibold">
                    {video.certTag}
                  </span>
                  <button
                    onClick={(e) => handleToggleWatched(video.id, e)}
                    className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
                    title={isWatched ? 'Đã xem' : 'Đánh dấu đã xem'}
                    aria-label="Đánh dấu đã xem"
                  >
                    {isWatched ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600" />
                    )}
                  </button>
                </div>

                <h3 className="font-semibold text-sm text-slate-100 line-clamp-2 leading-snug">
                  {video.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {video.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>{video.instructor}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-semibold text-slate-100 text-sm sm:text-base line-clamp-1">
                {activeVideo.title}
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>Giảng viên: <strong className="text-slate-200">{activeVideo.instructor}</strong></span>
              <button
                onClick={() => handleToggleWatched(activeVideo.id)}
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
              >
                {watchedVideoIds.includes(activeVideo.id) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Đã học xong video này</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Đánh dấu đã hoàn thành</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
