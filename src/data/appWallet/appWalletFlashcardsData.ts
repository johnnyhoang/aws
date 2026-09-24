import { AppWalletFlashcard } from '../../types/appWalletModule';

export const APP_WALLET_FLASHCARDS: AppWalletFlashcard[] = [
  {
    id: 'aw-fc-1',
    term: 'App Project Entity Contract',
    category: 'Architecture',
    definition: 'Interface định nghĩa cấu trúc toàn diện của một ứng dụng gồm: slug, local path, github repo, vercel domain, tech stack và lifecycle status.',
    exampleOrFormula: 'interface AppProject { id, slug, local_path, github_url, vercel_url, production_domain, status, tech_stack, srs_markdown }'
  },
  {
    id: 'aw-fc-2',
    term: '8-Section Standard SRS',
    category: 'AI SRS Builder',
    definition: 'Quy chuẩn tài liệu đặc tả kỹ thuật 8 phần bất biến giúp cung cấp trọn vẹn ngữ cảnh kiến trúc cho các AI Coding Agents.',
    exampleOrFormula: '1. Summary -> 2. Personas -> 3. Features -> 4. Tech Stack -> 5. SQL Schema -> 6. APIs -> 7. RLS Rules -> 8. Roadmap'
  },
  {
    id: 'aw-fc-3',
    term: 'Dual-Engine AI Fallback',
    category: 'AI SRS Builder',
    definition: 'Chiến lược khả năng phục hồi 3 tầng: Primary (Gemini 2.5 Flash) -> Secondary (OpenAI GPT-4o-mini) -> Zero-Network (Offline Heuristic Engine).',
    exampleOrFormula: 'Gemini (Speed/Cost) -> GPT-4o-mini (Resilience) -> Offline Heuristic (Zero Net)'
  },
  {
    id: 'aw-fc-4',
    term: 'In-App Backlog Tracking',
    category: 'In-App Backlog',
    definition: 'Hệ thống quản lý công việc tinh gọn gắn trực tiếp vào từng project, phân loại 4 nhóm việc (feature, bug, refactor, docs) với 4 cấp độ ưu tiên.',
    exampleOrFormula: 'tkw_app_backlog_items (project_id, category, priority, status, created_at, completed_at)'
  },
  {
    id: 'aw-fc-5',
    term: 'tkw_perm() Security Definer',
    category: 'Database RLS',
    definition: 'Hàm PL/pgSQL thực thi dưới quyền database owner nhằm kiểm tra nhanh quyền hạn của người dùng mà không cần cấp quyền truy cập trực tiếp vào bảng phân quyền.',
    exampleOrFormula: 'CREATE FUNCTION tkw_perm(required_flag TEXT) RETURNS BOOLEAN SECURITY DEFINER ...'
  },
  {
    id: 'aw-fc-6',
    term: 'Ecosystem Dependency Graph',
    category: 'App Portfolio',
    definition: 'Sơ đồ mô hình hóa mối liên kết và mức độ phụ thuộc giữa 17+ ứng dụng với hạ tầng cơ sở dữ liệu Supabase chung và các dịch vụ chia sẻ.',
    exampleOrFormula: 'Shared Infra (BaaS/Auth/Gateway) <--- Consumed by Specialized Domain Apps'
  },
  {
    id: 'aw-fc-7',
    term: 'App Wallet MCP Server',
    category: 'Future Roadmap',
    definition: 'Giao thức Model Context Protocol cho phép AI Agents (Cursor, Antigravity) đọc trực tiếp specs, SQL schema và tự động cập nhật Backlog ngay từ IDE.',
    exampleOrFormula: 'tool: "appwallet_get_project_srs", "appwallet_create_backlog_item"'
  }
];
