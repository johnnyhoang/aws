import React, { useState } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  FileCode2, 
  Layers, 
  Search, 
  ExternalLink, 
  Presentation, 
  CheckCircle2, 
  FolderGit2, 
  Globe, 
  Cpu, 
  Terminal, 
  Database,
  ArrowRight,
  ShieldCheck,
  Code2
} from 'lucide-react';

interface AppItem {
  id: string;
  name: string;
  vietnameseName: string;
  category: 'cloud_infra' | 'ai_automation' | 'fullstack_saas' | 'academic_tools';
  categoryLabel: string;
  volumeRef?: string;
  role: string;
  techStack: string[];
  localPath: string;
  gitRepo: string;
  deployUrl?: string;
  architectureHighlight: string;
  capabilityTags: string[];
}

const ECOSYSTEM_APPS: AppItem[] = [
  {
    id: 'aws-mastery',
    name: 'AWS Cloud Mastery',
    vietnameseName: 'Thực Chiến Kiến Trúc Đám Mây AWS',
    category: 'cloud_infra',
    categoryLabel: 'Cloud & Hạ Tầng',
    volumeRef: 'Tập 5',
    role: 'Nền tảng đào tạo kiến trúc Cloud Enterprise (VPC, IAM, Lambda, ECS, S3, RDS)',
    techStack: ['AWS SDK v3', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vite'],
    localPath: 'D:\\Hoa Hoang\\Apps\\aws',
    gitRepo: 'https://github.com/johnnyhoang/aws',
    deployUrl: 'https://aws.johnnyhoang.dev',
    architectureHighlight: 'Event-driven, High Availability Multi-AZ, Serverless Microservices',
    capabilityTags: ['Cloud Architecture', 'AWS Solutions Architect', 'Cost Optimization']
  },
  {
    id: 'app-system',
    name: 'Unified-App-Infra',
    vietnameseName: 'Hệ Thống Quản Trị Hạ Tầng Đa Ứng Dụng',
    category: 'cloud_infra',
    categoryLabel: 'Cloud & Hạ Tầng',
    volumeRef: 'Tập 12',
    role: 'Hạ tầng tập trung quản lý SSO, API Gateway, Reverse Proxy và Unified DB',
    techStack: ['PostgreSQL 16', 'Docker Compose', 'Kong Gateway', 'Redis', 'Nginx'],
    localPath: 'D:\\Hoa Hoang\\Apps\\app_system',
    gitRepo: 'https://github.com/johnnyhoang/app_system',
    deployUrl: 'https://infra.johnnyhoang.dev',
    architectureHighlight: 'Centralized Microservices Registry, Shared JWT SSO, Rate Limiting',
    capabilityTags: ['DevOps', 'Docker', 'API Gateway', 'Microservices']
  },
  {
    id: 'app-wallet',
    name: 'JohnnyHoang App Wallet',
    vietnameseName: 'Ví Quản Trị Ứng Dụng & Showcase Năng Lực',
    category: 'ai_automation',
    categoryLabel: 'AI & Tự Động Hóa',
    volumeRef: 'Tập 14',
    role: 'Personal App Store & Central Registry chứa toàn bộ 17+ ứng dụng cá nhân',
    techStack: ['React 19', 'Supabase PostgreSQL', 'Gemini 2.5 Flash', 'GPT-4o-mini', 'Vercel'],
    localPath: 'D:\\Hoa Hoang\\Apps\\app_wallet',
    gitRepo: 'https://github.com/johnnyhoang/app_wallet',
    deployUrl: 'https://wallet.johnnyhoang.dev',
    architectureHighlight: 'Dual-Engine AI Spec Generator, Single Source of Truth Metadata Hub',
    capabilityTags: ['Fullstack', 'AI Resiliency', 'PostgreSQL RLS', 'System Showcase']
  },
  {
    id: 'english-study',
    name: 'IELTS & Tech English Mastery',
    vietnameseName: 'Hệ Thống Luyện Tiếng Anh Kỹ Thuật AI',
    category: 'academic_tools',
    categoryLabel: 'Học Thuật & Công Cụ',
    volumeRef: 'Tập 2',
    role: 'Ứng dụng luyện thi IELTS 8.0+ và phản xạ tiếng Anh kỹ thuật du học Mỹ',
    techStack: ['Next.js 15', 'OpenAI Whisper', 'Supabase Vector', 'Web Speech API'],
    localPath: 'D:\\Hoa Hoang\\Apps\\english_study',
    gitRepo: 'https://github.com/johnnyhoang/english_study',
    deployUrl: 'https://english.johnnyhoang.dev',
    architectureHighlight: 'Speech-to-Text AI Scoring, Spaced Repetition SRS, Vector Semantic Search',
    capabilityTags: ['Speech AI', 'Vector DB', 'EdTech', 'Next.js']
  },
  {
    id: 'linux-sysadmin',
    name: 'Linux SysAdmin & Automation',
    vietnameseName: 'Quản Trị Linux Chuyên Nghiệp',
    category: 'cloud_infra',
    categoryLabel: 'Cloud & Hạ Tầng',
    volumeRef: 'Tập 4',
    role: 'Công cụ mô phỏng quản trị server Linux, Systemd, SSH Hardening và Bash scripting',
    techStack: ['Bash Scripting', 'Systemd', 'UFW / iptables', 'React 19', 'xterm.js'],
    localPath: 'D:\\Hoa Hoang\\Apps\\linux_admin',
    gitRepo: 'https://github.com/johnnyhoang/linux_admin',
    deployUrl: 'https://linux.johnnyhoang.dev',
    architectureHighlight: 'Web Terminal Emulator, SSH Security Auditing, Performance Top/Htop',
    capabilityTags: ['Linux SysAdmin', 'Shell Scripting', 'Security Hardening']
  },
  {
    id: 'supabase-neon-db',
    name: 'Universal DB & RLS Engine',
    vietnameseName: 'Bảo Mật Cơ Sở Dữ Liệu RLS & Serverless DB',
    category: 'fullstack_saas',
    categoryLabel: 'Fullstack & SaaS',
    volumeRef: 'Tập 10 & 11',
    role: 'Mô hình bảo vệ dữ liệu đa tầng với Supabase RLS và Neon Serverless Postgres',
    techStack: ['PostgreSQL 16', 'Supabase Auth', 'Neon Serverless', 'Prisma / Drizzle'],
    localPath: 'D:\\Hoa Hoang\\Apps\\database_mastery',
    gitRepo: 'https://github.com/johnnyhoang/database_mastery',
    deployUrl: 'https://db.johnnyhoang.dev',
    architectureHighlight: 'Fine-grained Row Level Security, Branching Database, Zero-Downtime Migration',
    capabilityTags: ['Database Design', 'PostgreSQL', 'RLS Policies', 'Serverless DB']
  }
];

export const AppWalletPlayView: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'store_explorer' | 'spec_builder' | 'showcase_pitch' | 'dependency_mapper'>('store_explorer');

  // Lab 1: Personal App Store Explorer state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeAppDetail, setActiveAppDetail] = useState<AppItem>(ECOSYSTEM_APPS[2]);

  const filteredApps = ECOSYSTEM_APPS.filter(app => {
    const matchCategory = selectedCategory === 'all' || app.category === selectedCategory;
    const matchSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.vietnameseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      app.capabilityTags.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  // Lab 2: AI SRS Spec Builder Simulator
  const [ideaInput, setIdeaInput] = useState<string>('Hệ thống quản lý kho sách cá nhân thông minh kết hợp OCR quét bìa sách');
  const [engineTier, setEngineTier] = useState<'gemini' | 'gpt4o' | 'heuristic'>('gemini');
  const [generatedSpec, setGeneratedSpec] = useState<string>('');

  const runGenerateSpec = (idea: string, tier: 'gemini' | 'gpt4o' | 'heuristic') => {
    const slug = idea.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24);
    const engineLabel = tier === 'gemini' ? 'Google Gemini 2.5 Flash' : tier === 'gpt4o' ? 'OpenAI GPT-4o-mini' : 'Offline Heuristic Engine';

    return `# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
*Generated by ${engineLabel} (Dual-Engine Resilient AI)*

## 1. Executive Summary & Value Proposition
- **Project Name:** ${idea}
- **App Slug:** \`${slug}\`
- **Core Value:** Tối ưu hóa quy trình quản lý thông tin với độ trễ tối thiểu, bảo mật RLS và tính sẵn sàng cao.
- **Showcase Dimension:** Chứng minh khả năng thiết kế hệ thống chuẩn Clean Architecture và CI/CD tự động.

## 2. User Personas & Target Audience
- **Kỹ sư / Lập trình viên:** Cần tra cứu nhanh và tương tác thông qua API/CLI/MCP Server.
- **Người dùng / Giám khảo / Khách hàng:** Giao diện tối giản, trực quan, hỗ trợ thiết bị di động.

## 3. Core Feature Specifications (User Stories)
- **US-01 [Ghi nhận tức thì]:** Given ý tưởng mới -> When nhập vào hệ thống -> Then tự động sinh siêu dữ liệu và phân loại danh mục.
- **US-02 [Đồng bộ đám mây]:** Given có thay đổi -> When bấm Sync -> Then cập nhật trạng thái lên Supabase PostgreSQL qua RLS.
- **US-03 [Showcase Mode]:** Given khi thuyết trình -> When bật Showcase -> Then ẩn các thông số nội bộ nhạy cảm và hiện metrics ấn tượng.

## 4. Recommended Modern Tech Stack
- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons
- **Database & Auth:** Supabase PostgreSQL 16+ with Row Level Security (RLS)
- **Deployment & Edge:** Vercel Edge Network with Automated GitHub CI/CD

## 5. PostgreSQL Database Schema
\`\`\`sql
CREATE TABLE app_${slug.replace(/-/g, '_')}_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
\`\`\`

## 6. API Contracts & Endpoints
- \`POST /api/v1/items\` — Tạo bản ghi mới kèm payload JSON.
- \`GET /api/v1/items/:id\` — Truy vấn chi tiết bản ghi.

## 7. Security & Row Level Security (RLS)
\`\`\`sql
ALTER TABLE app_${slug.replace(/-/g, '_')}_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owner isolation" ON app_${slug.replace(/-/g, '_')}_items
  FOR ALL USING (auth.uid() = user_id);
\`\`\`

## 8. Phased Implementation Roadmap
- [x] Phase 1: Thiết kế Data Schema & Giao diện Tối giản (Minimalist UI)
- [ ] Phase 2: Triển khai CRUD API & Chính sách bảo mật RLS
- [ ] Phase 3: Tích hợp MCP Server Tool hỗ trợ AI Coding Agents`;
  };

  // Lab 3: Live Engineering Showcase Pitch Generator
  const [audienceType, setAudienceType] = useState<'professor' | 'recruiter' | 'client'>('professor');
  const [durationMin, setDurationMin] = useState<number>(3);

  const getPitchContent = (target: 'professor' | 'recruiter' | 'client', duration: number) => {
    if (target === 'professor') {
      return {
        title: 'Kịch Bản Trình Bày Học Thuật (Academic & Research Focus)',
        goal: 'Minh chứng năng lực tự học, kiến trúc phần mềm chuẩn mực, tư duy hệ thống và khả năng giải quyết bài toán lớn.',
        script: [
          `"Thưa Thầy/Cô, hệ sinh thái App Wallet là Personal App Store do em tự tay kiến trúc và phát triển toàn bộ từ con số 0."`,
          `"Hệ thống hiện quản lý 17+ ứng dụng chuyên biệt, tổ chức theo 4 cụm: Cloud Hạ Tầng, AI Tự Động Hóa, Fullstack SaaS và Công Cụ Học Thuật."`,
          `"Về mặt kiến trúc, em áp dụng Clean Architecture, chuẩn hóa Database Schema trên PostgreSQL với Supabase RLS bảo mật tuyệt đối, và tích hợp AI Dual-Engine có khả năng tự phục hồi (Self-Healing Fallback)."`,
          `"Toàn bộ source code đều được CI/CD tự động lên Vercel Edge và GitHub. Đây là minh chứng rõ nét cho năng lực nghiên cứu, làm chủ công nghệ mới và tư duy hệ thống của em trước khi sang Mỹ học tập."`
        ],
        keyMetrics: ['17+ Live Apps', 'Dual-Engine AI (Gemini + GPT-4o)', '100% RLS Protected', 'Automated CI/CD Pipeline']
      };
    } else if (target === 'recruiter') {
      return {
        title: 'Kịch Bản Phỏng Vấn Tuyển Dụng Senior/Lead Engineer',
        goal: 'Minh chứng tư duy End-to-End: Từ phân tích yêu cầu SRS, thiết kế DB, viết code sạch, tối ưu hiệu năng đến triển khai Cloud Production.',
        script: [
          `"Chào anh/chị, thay vì một bản CV văn bản tĩnh, em xin phép mở trực tiếp App Wallet — Digital Engineering Hub của em."`,
          `"Tại đây lưu trữ toàn bộ 17+ dự án Production em đã xây dựng. Mỗi dự án đều là một Single Source of Truth có đầy đủ: Local Path, Git Repository, Live Domain, Schema PostgreSQL và Động cơ sinh SRS bằng AI."`,
          `"Em làm chủ trọn vẹn từ hạ tầng Linux, Docker, Kong API Gateway, AWS Cloud cho đến Frontend React 19 tối ưu tốc độ và PostgreSQL RLS."`,
          `"Mọi dự án đều tuân thủ nguyên tắc Zero-Overhead, bảo mật phân quyền đa người dùng và sẵn sàng mở rộng quy mô Enterprise."`
        ],
        keyMetrics: ['Fullstack + Cloud + DevOps Capability', 'Production-Grade Security', 'AI-Assisted Workflow (MCP)', '100% Type-Safe TypeScript']
      };
    } else {
      return {
        title: 'Kịch Bản Thuyết Trình Khách Hàng / Đối Tác Doanh Nghiệp',
        goal: 'Minh chứng năng lực bàn giao sản phẩm thần tốc, chất lượng cao, chi phí vận hành tối ưu và độ tin cậy tuyệt đối.',
        script: [
          `"Kính chào Quý đối tác, đây là kho sản phẩm và giải pháp công nghệ đã hoàn thiện của chúng tôi."`,
          `"Chúng tôi sở hữu sẵn sàng các khối module từ Xác thực người dùng SSO, Cổng thanh toán, AI Xử lý ngôn ngữ đến Bảng điều khiển quản trị tùy biến."`,
          `"Nhờ quy trình chuẩn hóa SRS và động cơ tự động hóa, chúng tôi có thể triển khai sản phẩm cho Quý doanh nghiệp chỉ trong vòng vài ngày với chi phí hạ tầng tối ưu nhất."`
        ],
        keyMetrics: ['Rapid Time-to-Market', 'Cost-Optimized Cloud', '99.9% Uptime Architecture', 'Multi-tenant Ready']
      };
    }
  };

  const pitchData = getPitchContent(audienceType, durationMin);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1.5">
              <Gamepad2 className="w-4 h-4" /> Interactive Showcase & Simulation Labs
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Phòng Trình Diễn & Mô Phỏng App Wallet
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Trải nghiệm thực tế Personal App Store, Động cơ AI SRS, Kịch bản Thuyết trình Năng lực và Sơ đồ Phụ thuộc.
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => setActiveLab('store_explorer')}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              activeLab === 'store_explorer'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm mb-1">
              <FolderGit2 className="w-4 h-4 text-emerald-400" />
              1. Personal App Store
            </div>
            <div className="text-[11px] text-slate-500">Khám phá 17+ ứng dụng</div>
          </button>

          <button
            onClick={() => setActiveLab('spec_builder')}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              activeLab === 'spec_builder'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm mb-1">
              <FileCode2 className="w-4 h-4 text-emerald-400" />
              2. AI SRS Builder
            </div>
            <div className="text-[11px] text-slate-500">Sinh hồ sơ đặc tả 8 mục</div>
          </button>

          <button
            onClick={() => setActiveLab('showcase_pitch')}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              activeLab === 'showcase_pitch'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm mb-1">
              <Presentation className="w-4 h-4 text-emerald-400" />
              3. Showcase Generator
            </div>
            <div className="text-[11px] text-slate-500">Kịch bản demo 3 phút</div>
          </button>

          <button
            onClick={() => setActiveLab('dependency_mapper')}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              activeLab === 'dependency_mapper'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm mb-1">
              <Layers className="w-4 h-4 text-emerald-400" />
              4. Dependency Graph
            </div>
            <div className="text-[11px] text-slate-500">Liên kết hạ tầng & API</div>
          </button>
        </div>

        {/* LAB 1: Personal App Store Explorer */}
        {activeLab === 'store_explorer' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-emerald-400" />
                    Personal App Store — Trung Tâm Khám Phá Ứng Dụng
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Bộ sưu tập các ứng dụng cá nhân hóa với đầy đủ siêu dữ liệu kỹ thuật và minh chứng năng lực.
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm theo tên, tech stack, tag..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { id: 'all', label: 'Tất Cả (All Apps)' },
                  { id: 'cloud_infra', label: 'Cloud & Hạ Tầng' },
                  { id: 'ai_automation', label: 'AI & Tự Động Hóa' },
                  { id: 'fullstack_saas', label: 'Fullstack & SaaS' },
                  { id: 'academic_tools', label: 'Học Thuật & Công Cụ' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Grid of Apps & Detail View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: App List */}
                <div className="lg:col-span-5 space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                  {filteredApps.map(app => (
                    <div
                      key={app.id}
                      onClick={() => setActiveAppDetail(app)}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                        activeAppDetail.id === app.id
                          ? 'bg-emerald-950/30 border-emerald-500/70 shadow-sm'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="font-bold text-xs text-white flex items-center gap-1.5">
                          <span>{app.name}</span>
                          {app.volumeRef && (
                            <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded">
                              {app.volumeRef}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-emerald-400 border border-slate-800 shrink-0">
                          {app.categoryLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                        {app.vietnameseName}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {app.techStack.slice(0, 3).map((t, idx) => (
                          <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-slate-900 text-slate-400 rounded">
                            {t}
                          </span>
                        ))}
                        {app.techStack.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-slate-900 text-slate-500 rounded">
                            +{app.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {filteredApps.length === 0 && (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      Không tìm thấy ứng dụng phù hợp với từ khóa.
                    </div>
                  )}
                </div>

                {/* Right: Detailed Card (Single Source of Truth) */}
                <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-4">
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                    <div>
                      <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-0.5">
                        {activeAppDetail.categoryLabel} • {activeAppDetail.volumeRef || 'Custom Build'}
                      </div>
                      <h4 className="text-base font-bold text-white">
                        {activeAppDetail.name} ({activeAppDetail.vietnameseName})
                      </h4>
                    </div>
                    {activeAppDetail.deployUrl && (
                      <a
                        href={activeAppDetail.deployUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-xs flex items-center gap-1 transition-colors"
                      >
                        <Globe className="w-3 h-3" /> Live Demo
                      </a>
                    )}
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-400 block mb-1">Mục Đích & Vai Trò:</span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {activeAppDetail.role}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-400 block mb-1">Điểm Nhấn Kiến Trúc:</span>
                    <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-xs text-emerald-300 font-mono">
                      {activeAppDetail.architectureHighlight}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-400 block mb-1.5">Tech Stack Chi Tiết:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeAppDetail.techStack.map((tech, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
                    <div className="p-2 bg-slate-900/50 rounded border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] uppercase">Local Workspace:</span>
                      <span className="text-slate-300 break-all text-[11px]">{activeAppDetail.localPath}</span>
                    </div>
                    <div className="p-2 bg-slate-900/50 rounded border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] uppercase">Git Repository:</span>
                      <span className="text-sky-400 break-all text-[11px]">{activeAppDetail.gitRepo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAB 2: AI Spec Builder */}
        {activeLab === 'spec_builder' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-5">
            <div>
              <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-emerald-400" />
                Mô Phỏng Động Cơ AI SRS Builder (Dual-Engine Resilient)
              </h3>
              <p className="text-slate-400 text-xs">
                Nhập ý tưởng và chọn tầng AI engine để xem toàn bộ hồ sơ kỹ thuật 8 phần chuẩn mực được sinh ra tức thì.
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
                placeholder="Nhập ý tưởng ứng dụng (VD: Hệ thống thanh toán vi mô hỗ trợ webhook)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400">Chọn Engine:</span>
                  <button
                    onClick={() => setEngineTier('gemini')}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                      engineTier === 'gemini'
                        ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Tier 1: Gemini 2.5 Flash
                  </button>
                  <button
                    onClick={() => setEngineTier('gpt4o')}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                      engineTier === 'gpt4o'
                        ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Tier 2: GPT-4o-mini
                  </button>
                  <button
                    onClick={() => setEngineTier('heuristic')}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                      engineTier === 'heuristic'
                        ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Tier 3: Offline Heuristic
                  </button>
                </div>

                <button
                  onClick={() => setGeneratedSpec(runGenerateSpec(ideaInput, engineTier))}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Tạo Hồ Sơ SRS (8 Mục)
                </button>
              </div>
            </div>

            {generatedSpec && (
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[400px] overflow-y-auto">
                {generatedSpec}
              </div>
            )}
          </div>
        )}

        {/* LAB 3: Live Showcase Generator */}
        {activeLab === 'showcase_pitch' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <Presentation className="w-4 h-4 text-emerald-400" />
                Bộ Tạo Kịch Bản Trình Diễn Năng Lực (Live Showcase Generator)
              </h3>
              <p className="text-slate-400 text-xs">
                Tự động tối ưu hóa kịch bản thuyết trình 3 phút tùy theo đối tượng lắng nghe: Thầy cô ĐH Mỹ, Nhà tuyển dụng hay Đối tác.
              </p>
            </div>

            {/* Selector Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Đối tượng người nghe (Audience):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'professor', label: 'Thầy Cô ĐH Mỹ' },
                    { id: 'recruiter', label: 'Nhà Tuyển Dụng' },
                    { id: 'client', label: 'Khách Hàng' }
                  ].map(target => (
                    <button
                      key={target.id}
                      onClick={() => setAudienceType(target.id as any)}
                      className={`p-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                        audienceType === target.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {target.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Thời lượng thuyết trình:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { min: 1, label: '1 Phút (Elevator Pitch)' },
                    { min: 3, label: '3 Phút (Tiêu Chuẩn)' },
                    { min: 5, label: '5 Phút (Deep-Dive)' }
                  ].map(item => (
                    <button
                      key={item.min}
                      onClick={() => setDurationMin(item.min)}
                      className={`p-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                        durationMin === item.min
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generated Script Card */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                  Mục tiêu thuyết trình:
                </span>
                <h4 className="text-sm font-bold text-white mb-1">{pitchData.title}</h4>
                <p className="text-xs text-slate-400">{pitchData.goal}</p>
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-semibold text-slate-300 block">Lời thoại kịch bản mẫu ({durationMin} phút):</span>
                {pitchData.script.map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed italic">{line}</span>
                  </div>
                ))}
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-2">Các Chỉ Số Minh Chứng Trọng Tâm:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {pitchData.keyMetrics.map((metric, idx) => (
                    <div key={idx} className="p-2 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-center">
                      <span className="text-[11px] font-bold text-emerald-300">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAB 4: Ecosystem Dependency Mapper */}
        {activeLab === 'dependency_mapper' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Sơ Đồ Phụ Thuộc Hạ Tầng & Dịch Vụ Dùng Chung (Ecosystem Dependency Graph)
              </h3>
              <p className="text-slate-400 text-xs">
                Minh họa cách các ứng dụng trong hệ sinh thái liên kết với hạ tầng dùng chung (Universal DB, SSO, Reverse Proxy).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <Database className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <h5 className="text-xs font-bold text-white mb-1">Universal DB & Auth</h5>
                <p className="text-[11px] text-slate-400">Supabase PostgreSQL 16 + Neon Serverless với RLS Policies</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <ShieldCheck className="w-6 h-6 text-sky-400 mx-auto mb-2" />
                <h5 className="text-xs font-bold text-white mb-1">Unified SSO Gateway</h5>
                <p className="text-[11px] text-slate-400">Kong API Gateway & JWT Session đồng bộ trên toàn bộ 17+ apps</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <Cpu className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <h5 className="text-xs font-bold text-white mb-1">MCP Automation Hub</h5>
                <p className="text-[11px] text-slate-400">Tự động hóa đọc SRS, migrate database và đồng bộ commit</p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
              <div className="text-emerald-400 font-bold mb-2">// HỆ SINH THÁI 17+ APPS LIÊN KẾT:</div>
              <div className="space-y-1 text-[11px]">
                <p>App Wallet (Orchestrator) ──[Reads Metadata]──&gt; All 17+ Apps Local Workspaces</p>
                <p>AWS Mastery (Volume 5) ──[Cloud Architecture]──&gt; Cloud Production Deployment</p>
                <p>App System (Volume 12) ──[Docker / Kong]──&gt; Unified Gateway & Reverse Proxy</p>
                <p>Database Mastery (Vol 10/11) ──[Postgres RLS]──&gt; Central Data Isolation</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AppWalletPlayView;

