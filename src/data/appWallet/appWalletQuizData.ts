import { AppWalletQuizQuestion } from '../../types/appWalletModule';

export const APP_WALLET_QUIZ_DATA: AppWalletQuizQuestion[] = [
  {
    id: 'aw-q1',
    chapterNumber: 1,
    question: 'Sứ mệnh cốt lõi của JohnnyHoang App Wallet là gì?',
    options: [
      'Chỉ lưu trữ danh sách mật khẩu cá nhân',
      'Trung tâm điều phối, quản trị danh mục 17+ ứng dụng, tự động sinh đặc tả kỹ thuật AI SRS và quản lý In-App Backlog',
      'Một công cụ chat bot AI đơn thuần',
      'Một ví tiền điện tử lưu trữ Bitcoin'
    ],
    correctAnswerIndex: 1,
    explanation: 'App Wallet là trung tâm điều phối quản lý 17+ ứng dụng, hỗ trợ AI SRS Builder và In-App Backlog cho toàn bộ hệ sinh thái.',
    scenario: 'Bạn sở hữu 17+ dự án phần mềm độc lập cần một trung tâm quản lý tổng thể.'
  },
  {
    id: 'aw-q2',
    chapterNumber: 2,
    question: 'Năm trạng thái vòng đời chuẩn của một dự án trong App Wallet gồm những gì?',
    options: [
      'new, old, deleted, draft, published',
      'idea, planning, in_progress, live, archived',
      'alpha, beta, rc, ga, end_of_life',
      'started, paused, running, stopped, restart'
    ],
    correctAnswerIndex: 1,
    explanation: 'Mô hình vòng đời của App Wallet bao gồm: idea (Ý tưởng), planning (Lập kế hoạch/SRS), in_progress (Đang code), live (Vận hành Production) và archived (Đóng băng/Lưu trữ).',
    scenario: 'Một dự án mới đang được lên ý tưởng và viết đặc tả kỹ thuật.'
  },
  {
    id: 'aw-q3',
    chapterNumber: 3,
    question: 'Hồ sơ đặc tả yêu cầu kỹ thuật (SRS) do AI App Builder sinh ra bắt buộc tuân theo cấu trúc chuẩn bao nhiêu mục?',
    options: [
      '3 mục đơn giản',
      '8 mục tiêu chuẩn chuyên sâu (Tóm tắt, Personas, Features/User Stories, Tech-stack, Schema SQL, APIs, RLS Rules, Roadmap)',
      'Chỉ có 1 mục duy nhất là mã nguồn',
      '20 mục lý thuyết chung chung'
    ],
    correctAnswerIndex: 1,
    explanation: 'Cấu trúc 8 phần bất biến cung cấp đầy đủ thông tin kiến trúc từ SQL schema đến RLS và API endpoints cho AI Coding Agents lập trình.',
    scenario: 'Lập trình viên cần một bản mô tả chuẩn mực để nạp vào context của Cursor hoặc Antigravity.'
  },
  {
    id: 'aw-q4',
    chapterNumber: 4,
    question: 'Chiến lược dự phòng 3 tầng trong AI App Builder hoạt động theo thứ tự nào?',
    options: [
      'Offline -> Gemini -> GPT-4o',
      'Tier 1: Google Gemini 2.5 Flash -> Tier 2: OpenAI GPT-4o-mini -> Tier 3: Offline Heuristic Engine',
      'Chỉ sử dụng duy nhất 1 API bên ngoài',
      'Gọi đồng thời cả 3 dịch vụ cùng lúc để lấy kết quả nhanh nhất'
    ],
    correctAnswerIndex: 1,
    explanation: 'Hệ thống ưu tiên Gemini 2.5 Flash vì tốc độ và chi phí, tự động fallback sang GPT-4o-mini khi lỗi, và dùng Offline Heuristic Engine khi hoàn toàn không có internet.',
    scenario: 'Kỹ sư đang làm việc trong điều kiện mạng chập chờn hoặc API bên ngoài bị nghẽn rate-limit.'
  },
  {
    id: 'aw-q5',
    chapterNumber: 5,
    question: 'In-App Backlog trong App Wallet phân loại công việc thành 4 danh mục nào?',
    options: [
      'easy, medium, hard, impossible',
      'feature, bug, refactor, docs',
      'frontend, backend, database, devops',
      'todo, doing, testing, done'
    ],
    correctAnswerIndex: 1,
    explanation: '4 danh mục nghiệp vụ kỹ thuật cốt lõi là feature (tính năng), bug (lỗi), refactor (tái cấu trúc) và docs (tài liệu kỹ thuật).',
    scenario: 'Bạn vừa phát hiện một lỗi chính sách RLS cần ghi nhận để xử lý.'
  },
  {
    id: 'aw-q6',
    chapterNumber: 7,
    question: 'Hàm tkw_perm() trong cơ sở dữ liệu PostgreSQL Supabase được khai báo với thuộc tính gì để tối ưu hóa kiểm tra quyền hạn?',
    options: [
      'SECURITY INVOKER',
      'SECURITY DEFINER',
      'STABLE IMMUTABLE',
      'VOLATILE READ ONLY'
    ],
    correctAnswerIndex: 1,
    explanation: 'SECURITY DEFINER cho phép hàm thực thi với quyền của database owner để tra cứu bảng phân quyền an toàn và nhanh chóng mà không làm chậm client.',
    scenario: 'Thiết kế hệ thống phân quyền đa tầng Row Level Security (RLS).'
  },
  {
    id: 'aw-q7',
    chapterNumber: 10,
    question: 'Khi xây dựng App Wallet Model Context Protocol (MCP) Server, AI Coding Agent trong IDE có thể làm gì?',
    options: [
      'Chỉ có thể xem giờ hệ thống',
      'Trực tiếp truy vấn SRS specs, database schema và tự động cập nhật Backlog item của 17+ ứng dụng ngay trong IDE',
      'Tự động gửi email quảng cáo cho khách hàng',
      'Tắt máy tính từ xa'
    ],
    correctAnswerIndex: 1,
    explanation: 'MCP Server biến toàn bộ thông tin kiến trúc của App Wallet thành công cụ để AI Agent tra cứu ngữ cảnh và cập nhật tiến độ tự động.',
    scenario: 'Cursor Agent vừa hoàn thành việc refactor một module và tự động đánh dấu Backlog item sang Done.'
  }
];
