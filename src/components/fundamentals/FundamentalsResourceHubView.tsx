import React, { useState } from 'react';
import { FUNDAMENTAL_RESOURCES } from '../../data/fundamentals/resourceHubData';
import { 
  Library, 
  ExternalLink, 
  Filter, 
  Search
} from 'lucide-react';

export const FundamentalsResourceHubView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Cheat Sheets', 'Interactive Playgrounds', 'Free Practice Labs', 'Must-Read Books'];

  const filteredResources = FUNDAMENTAL_RESOURCES.filter(res => {
    const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Library className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white">
              Thư Viện Tài Liệu & Thao Trường Nền Tảng
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Tổng hợp Cheat Sheets, công cụ mô phỏng trực quan, sách giáo trình chuẩn và wargame thực hành
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm tài liệu, công cụ..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-teal-400"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat === 'all' ? `Tất cả (${FUNDAMENTAL_RESOURCES.length})` : cat}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-5 shadow-xl transition-all flex flex-col justify-between gap-4 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-teal-400">
                  {res.category}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30">
                  {res.badge}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-teal-300 transition-colors leading-snug">
                {res.title}
              </h3>
              
              <p className="text-[11px] text-slate-400">
                Nguồn / Tác giả: <strong className="text-slate-300">{res.authorOrSource}</strong>
              </p>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {res.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex flex-wrap gap-1">
                {res.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] px-2 py-0.5 bg-slate-950 rounded-md text-slate-400 border border-slate-800/80">
                    #{tag}
                  </span>
                ))}
              </div>

              <a
                href={res.urlPlaceholder}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Truy Cập Tài Nguyên</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
