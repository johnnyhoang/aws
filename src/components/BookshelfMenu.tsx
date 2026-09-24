import React, { useState } from 'react';
import { useLearning, PortalMode } from '../context/LearningContext';
import { 
  Terminal, 
  Globe, 
  Server, 
  Cloud, 
  BookOpen, 
  Check, 
  GitBranch, 
  Mail, 
  Triangle, 
  Send, 
  Database, 
  Zap,
  Layers,
  Wallet,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface BookItem {
  id: PortalMode;
  title: string;
  subtitle: string;
  volumeNumber: number;
  category: 'foundation' | 'cloud_devops' | 'baas_db' | 'ai_orchestrator';
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES = [
  { id: 'foundation', name: 'Nền Tảng & Hệ Thống', count: 'Tập 1 - 4' },
  { id: 'cloud_devops', name: 'Cloud & DevOps', count: 'Tập 5, 6, 7, 8, 13' },
  { id: 'baas_db', name: 'BaaS & Database', count: 'Tập 9, 10, 11, 12' },
  { id: 'ai_orchestrator', name: 'AI & Điều Phối Hệ Sinh Thái', count: 'Tập 14' }
];

const BOOKS: BookItem[] = [
  {
    id: 'fundamentals',
    volumeNumber: 1,
    title: 'IT & Cloud Nền Tảng',
    subtitle: 'Pre-AWS Infrastructure, Networking & OS',
    category: 'foundation',
    icon: Terminal
  },
  {
    id: 'web_domain',
    volumeNumber: 2,
    title: 'Web & Quản Trị Domain',
    subtitle: 'DNS, HTTP/3, Nginx & SSL/TLS',
    category: 'foundation',
    icon: Globe
  },
  {
    id: 'database',
    volumeNumber: 3,
    title: 'Cơ Sở Dữ Liệu & Gateway',
    subtitle: 'SQL, NoSQL, Vector DB & Universal DB MCP',
    category: 'foundation',
    icon: Server
  },
  {
    id: 'linux_admin',
    volumeNumber: 4,
    title: 'Quản Trị Hệ Thống Linux',
    subtitle: 'Unix Shell, Kernel & Production Sysadmin',
    category: 'foundation',
    icon: Terminal
  },
  {
    id: 'aws',
    volumeNumber: 5,
    title: 'AWS Cloud Mastery',
    subtitle: 'Solutions Architecture & Well-Architected Framework',
    category: 'cloud_devops',
    icon: Cloud
  },
  {
    id: 'open_source',
    volumeNumber: 6,
    title: 'Open Source & FOSS Mastery',
    subtitle: 'Tư Tưởng, Git Workflow & Contributor',
    category: 'cloud_devops',
    icon: GitBranch
  },
  {
    id: 'email_mastery',
    volumeNumber: 7,
    title: 'Email & Mail Server Systems',
    subtitle: 'SMTP, SPF/DKIM/DMARC, Postfix & Cloud',
    category: 'cloud_devops',
    icon: Mail
  },
  {
    id: 'vercel',
    volumeNumber: 8,
    title: 'Vercel Cloud & Edge Platform',
    subtitle: 'Next.js, Serverless Functions, Edge & Monorepo',
    category: 'cloud_devops',
    icon: Triangle
  },
  {
    id: 'azure',
    volumeNumber: 13,
    title: 'Microsoft Azure Cloud',
    subtitle: 'Enterprise Solutions Architecture & AZ-900 / AZ-104 / AZ-305',
    category: 'cloud_devops',
    icon: Cloud
  },
  {
    id: 'resend',
    volumeNumber: 9,
    title: 'Resend & Modern Email APIs',
    subtitle: 'React Email, REST Endpoints, Webhooks & Deliverability',
    category: 'baas_db',
    icon: Send
  },
  {
    id: 'supabase',
    volumeNumber: 10,
    title: 'Supabase — Open Source Firebase',
    subtitle: 'PostgreSQL, RLS Security, Auth & Realtime Engine',
    category: 'baas_db',
    icon: Database
  },
  {
    id: 'neon',
    volumeNumber: 11,
    title: 'Neon Serverless Postgres',
    subtitle: 'Storage/Compute Separation & Instant Branching',
    category: 'baas_db',
    icon: Zap
  },
  {
    id: 'app_system',
    volumeNumber: 12,
    title: 'Unified-App-Infra BaaS',
    subtitle: 'Kiến Trúc Tự Host & Lộ Trình 6 Tính Năng App System',
    category: 'baas_db',
    icon: Layers
  },
  {
    id: 'app_wallet',
    volumeNumber: 14,
    title: "JohnnyHoang's App Wallet",
    subtitle: 'Quản Trị Hệ Sinh Thái 17+ Apps, AI SRS Builder & In-App Backlog',
    category: 'ai_orchestrator',
    icon: Wallet
  }
];

interface BookshelfMenuProps {
  onSelectBook?: (mode: PortalMode) => void;
  compact?: boolean;
}

export const BookshelfMenu: React.FC<BookshelfMenuProps> = ({ onSelectBook, compact = false }) => {
  const { portalMode, setPortalMode } = useLearning();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleSelect = (id: PortalMode) => {
    setPortalMode(id);
    if (onSelectBook) onSelectBook(id);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5">
        {BOOKS.map((book) => {
          const isSelected = portalMode === book.id;
          const Icon = book.icon;
          return (
            <button
              key={book.id}
              onClick={() => handleSelect(book.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
              }`}
            >
              <span className="text-[10px] font-mono text-slate-500">#{book.volumeNumber}</span>
              <Icon className="w-3.5 h-3.5" />
              <span>{book.title}</span>
            </button>
          );
        })}
      </div>
    );
  }

  const filteredBooks = activeCategory === 'all'
    ? BOOKS
    : BOOKS.filter(b => b.category === activeCategory);

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-5 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              JOHNNYHOANG ENGINEERING LIBRARY
            </h3>
            <p className="text-xs text-slate-400">14 Tập Bách Khoa Toàn Thư Kỹ Sư & Hệ Sinh Thái</p>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono hidden sm:block">
          14 Cuốn Sách Chuyên Khảo
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-5 py-2.5 border-b border-slate-800/60 bg-slate-950 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer whitespace-nowrap ${
            activeCategory === 'all'
              ? 'bg-slate-800 text-white font-medium border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Tất cả (14)
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-slate-800 text-white font-medium border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[60vh] overflow-y-auto no-scrollbar">
        {filteredBooks.map((book) => {
          const isSelected = portalMode === book.id;
          const Icon = book.icon;

          return (
            <div
              key={book.id}
              onClick={() => handleSelect(book.id)}
              className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                isSelected
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-white shadow-sm'
                  : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className={`p-2 rounded-md shrink-0 mt-0.5 ${
                  isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-emerald-400/90 font-semibold uppercase">
                      Tập {book.volumeNumber}
                    </span>
                    <h4 className="text-sm font-semibold truncate">
                      {book.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {book.subtitle}
                  </p>
                </div>
              </div>

              <div className="shrink-0 self-center">
                {isSelected ? (
                  <span className="flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    <Check className="w-3 h-3" /> Đang đọc
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

