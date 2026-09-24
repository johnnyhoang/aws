import { TokenWalletFlashcard } from '../../types/tokenWalletModule';

export const TOKEN_WALLET_FLASHCARDS: TokenWalletFlashcard[] = [
  {
    id: 'fc-1',
    term: 'rollForward Algorithm',
    category: 'AI Quota',
    definition: 'Thuật toán tự động tính toán số chu kỳ bước nhảy (step_hours) cần bù khi thời gian reset_time đã trôi qua trong quá khứ.',
    exampleOrFormula: 'cyclesToAdd = Math.floor(elapsedMs / stepMs) + 1; nextReset = pastReset + cyclesToAdd * stepMs'
  },
  {
    id: 'fc-2',
    term: 'Natural Language Time Parser',
    category: 'Regex Parser',
    definition: 'Bộ giải mã biểu thức chính quy (Regex) 4 tầng chuyển đổi câu nói tự nhiên (ví dụ: "reset lúc 3h chiều mai") thành mốc ISO Date chuẩn.',
    exampleOrFormula: '/(\\d+)\\s*(h|tiếng|giờ|p|phút)\\s*(nữa|sau)?/i'
  },
  {
    id: 'fc-3',
    term: 'Dual-Engine AI App Builder',
    category: 'Architecture',
    definition: 'Kiến trúc sinh tài liệu đặc tả kỹ thuật (SRS) 3 lớp: Gemini 2.5 Flash -> OpenAI GPT-4o-mini -> Offline Heuristic Template Fallback.',
    exampleOrFormula: 'Primary: Gemini API | Fallback: GPT-4o-mini | Offline: Semantic Keyword Engine'
  },
  {
    id: 'fc-4',
    term: 'tkw_perm() Security Definer',
    category: 'Database RLS',
    definition: 'Hàm PL/pgSQL thực thi dưới quyền database owner nhằm kiểm tra nhanh quyền hạn của người dùng mà không cần cấp quyền truy cập trực tiếp vào bảng phân quyền.',
    exampleOrFormula: 'CREATE FUNCTION tkw_perm(required_flag TEXT) RETURNS BOOLEAN SECURITY DEFINER ...'
  },
  {
    id: 'fc-5',
    term: 'TokenWallet MCP Server',
    category: 'Future Roadmap',
    definition: 'Giao thức kết nối Model Context Protocol cho phép các AI Coding Agent (Cursor, Antigravity) tự động kiểm tra và chuyển đổi token API khi cạn hạn mức.',
    exampleOrFormula: 'tool: "tokenwallet_get_active_ai_account" -> Trả về tài khoản còn 100% quota'
  },
  {
    id: 'fc-6',
    term: 'Payment Cashflow Parser',
    category: 'Regex Parser',
    definition: 'Bộ lọc tự động bóc tách hóa đơn: tách tên dịch vụ, đơn vị tiền tệ (USD/VND), hạn thanh toán, email và phương thức thẻ từ tin nhắn ngân hàng.',
    exampleOrFormula: 'Dán "Cursor 20$ TCB visa 15/m" -> Object { service: "Cursor", amount: 20, currency: "USD", due_day: 15 }'
  },
  {
    id: 'fc-7',
    term: 'In-App Backlog Architecture',
    category: 'App Portfolio',
    definition: 'Mô hình quản trị tính năng, bug và refactor tích hợp trực tiếp vào bảng tkw_app_backlog_items giúp theo dõi tiến độ từng app mà không phụ thuộc Jira/Trello.',
    exampleOrFormula: 'Foreign Key: tkw_app_backlog_items.project_id -> tkw_app_projects.id'
  }
];
