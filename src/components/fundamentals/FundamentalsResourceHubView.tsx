import React, { useState } from 'react';
import { FUNDAMENTAL_RESOURCES } from '../../data/fundamentals/resourceHubData';
import { 
  Search, 
  ExternalLink 
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
    <div className="space-y-6 text-slate-300">
      
      {/* Title & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? `Tất Cả (${FUNDAMENTAL_RESOURCES.length})` : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tài liệu..."
            className="w-full bg-slate-900 border border-slate-800 rounded-md pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-amber-400 font-semibold text-[10px] uppercase">
                  {res.category}
                </span>
                <span className="text-slate-500 text-[11px]">{res.badge}</span>
              </div>

              <h4 className="font-semibold text-slate-100 text-sm leading-snug">
                {res.title}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                {res.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="truncate max-w-[150px]">{res.authorOrSource}</span>
              <a
                href={res.urlPlaceholder}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium"
              >
                <span>Mở</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
