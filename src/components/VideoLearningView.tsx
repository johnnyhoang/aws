import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { VIDEO_COURSES, VideoLesson } from '../data/videoCoursesData';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Tv, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Search, 
  Filter, 
  BookOpen, 
  X, 
  Award,
  Video,
  Layers,
  GraduationCap
} from 'lucide-react';

export const VideoLearningView: React.FC = () => {
  const { logStudyHours } = useLearning();
  const [selectedCert, setSelectedCert] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<VideoLesson | null>(null);
  const [watchedVideoIds, setWatchedVideoIds] = useState<string[]>([]);

  const certFilters = [
    { id: 'all', label: 'Tất Cả Khóa Học' },
    { id: 'CLF-C02', label: 'CLF-C02 (Cloud Practitioner)' },
    { id: 'SAA-C03', label: 'SAA-C03 (Solutions Architect)' },
    { id: 'SOA-C02', label: 'SOA-C02 (SysOps Admin)' },
    { id: 'DVA-C02', label: 'DVA-C02 (Developer)' },
    { id: 'SAP-C02', label: 'SAP-C02 (Architect Pro)' },
    { id: 'DevOps & IaC', label: 'Terraform & DevOps' },
    { id: 'Higher-Ed IT', label: 'Đại Học & Hybrid Cloud' },
  ];

  const typeFilters = [
    { id: 'all', label: 'Mọi Thể Loại' },
    { id: 'Khóa Học Full Miễn Phí', label: 'Khóa Học Full (10h+)' },
    { id: 'Hoạt Hình Kiến Trúc', label: 'Hoạt Hình Kiến Trúc' },
    { id: 'Thực Hành Lab', label: 'Thực Hành Lab' },
    { id: 'Mẹo Thi & Phỏng Vấn', label: 'Mẹo Thi & Phỏng Vấn' },
  ];

  const filteredVideos = VIDEO_COURSES.filter(v => {
    const matchCert = selectedCert === 'all' || v.certTag === selectedCert;
    const matchType = selectedType === 'all' || v.type === selectedType;
    const matchQuery = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       v.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       v.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCert && matchType && matchQuery;
  });

  const handleToggleWatched = (vidId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isWatched = watchedVideoIds.includes(vidId);
    if (!isWatched) {
      setWatchedVideoIds(prev => [...prev, vidId]);
      logStudyHours(1); // Award 1 study hour
      confetti({
        particleCount: 50,
        spread: 55,
        origin: { y: 0.6 }
      });
    } else {
      setWatchedVideoIds(prev => prev.filter(id => id !== vidId));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-6 md:p-8 shadow-2xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
          <Tv className="w-3.5 h-3.5" />
          Học Qua Video Chất Lượng Cao Từ Giảng Viên Hàng Đầu
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          Trung Tâm Học Video AWS Chuyên Nghiệp
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
          Tuyển chọn các khóa học video đầy đủ miễn phí (10-14 tiếng), bài giảng hoạt hình kiến trúc trực quan từ các chuyên gia uy tín thế giới (Andrew Brown, Adrian Cantrill, Stephane Maarek, NetworkChuck, Nana...).
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Cert Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {certFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedCert(f.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCert === f.id
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-900/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm video, giảng viên..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs text-slate-400">
          <span className="font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Thể loại:
          </span>
          {typeFilters.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                selectedType === t.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => {
          const isWatched = watchedVideoIds.includes(video.id);

          return (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-rose-500/60 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    // Fallback to stylized placeholder if YouTube image is unavailable
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-rose-500 transition-all">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-950/90 text-[11px] font-mono text-slate-200 border border-slate-800 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {video.duration}
                </div>

                {/* Certification Badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-900/90 text-[10px] font-bold text-sky-400 border border-slate-700 uppercase tracking-wider">
                  {video.certTag}
                </div>

                {/* Type Badge */}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-rose-500/20 text-[10px] font-bold text-rose-300 border border-rose-500/30">
                  {video.type}
                </div>
              </div>

              {/* Video Info Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="font-bold text-slate-200">{video.instructor}</span>
                    <span>•</span>
                    <span className="text-slate-500">{video.channel}</span>
                  </div>

                  <h3 className="font-bold text-white text-sm md:text-base line-clamp-2 leading-snug group-hover:text-rose-300 transition-colors">
                    {video.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {video.summary}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <button
                    onClick={(e) => handleToggleWatched(video.id, e)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                      isWatched
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
                    }`}
                  >
                    {isWatched ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Đã xem xong</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        <span>Đánh dấu đã xem</span>
                      </>
                    )}
                  </button>

                  <span className="text-rose-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Xem ngay</span>
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Embedded Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl space-y-0 relative text-slate-100 flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-800/90 px-6 py-4 flex items-center justify-between border-b border-slate-700">
              <div className="space-y-0.5 max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {activeVideo.type}
                </span>
                <h3 className="font-bold text-white text-sm md:text-base line-clamp-1 mt-1">
                  {activeVideo.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700 transition-colors flex items-center gap-1 text-xs font-semibold"
                  title="Mở trên YouTube"
                >
                  <ExternalLink className="w-4 h-4 text-rose-400" />
                  <span className="hidden sm:inline">Mở trên YouTube</span>
                </a>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Embedded Iframe */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Video Details & Timestamps (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="text-xs text-slate-400">Giảng viên:</div>
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <span>{activeVideo.instructor}</span>
                    <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {activeVideo.instructorBadge}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Thời lượng: <strong className="text-slate-200">{activeVideo.duration}</strong>
                  </span>

                  <button
                    onClick={() => handleToggleWatched(activeVideo.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      watchedVideoIds.includes(activeVideo.id)
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                    }`}
                  >
                    {watchedVideoIds.includes(activeVideo.id) ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Đã Hoàn Thành Bài Này</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4" />
                        <span>Đánh Dấu Hoàn Thành (+1h học)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Nội Dung Trọng Tâm Bài Học:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-300">
                  {activeVideo.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timestamps if available */}
              {activeVideo.keyTimestamps && activeVideo.keyTimestamps.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-400" />
                    Mục Lục Các Chương Chính:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {activeVideo.keyTimestamps.map((item, idx) => (
                      <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-slate-300">
                        <span>{item.topic}</span>
                        <span className="font-mono text-amber-400 font-bold text-[11px] bg-slate-900 px-2 py-0.5 rounded">
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
