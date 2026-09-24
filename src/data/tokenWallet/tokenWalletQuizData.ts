import { TokenWalletQuizQuestion } from '../../types/tokenWalletModule';

export const TOKEN_WALLET_QUIZ_DATA: TokenWalletQuizQuestion[] = [
  {
    id: 'tw-q1',
    chapterNumber: 1,
    question: 'JohnnyHoang Token Wallet được thiết kế nhằm giải quyết bài toán cốt lõi nào?',
    options: [
      'Chỉ quản lý mật khẩu các trang mạng xã hội cá nhân',
      'Quản trị tập trung tài nguyên AI Quota, lịch thanh toán SaaS và danh mục 17+ dự án phần mềm',
      'Một ví tiền ảo lưu trữ Bitcoin và Ethereum',
      'Một công cụ chat bot AI đơn thuần'
    ],
    correctAnswerIndex: 1,
    explanation: 'Token Wallet là trung tâm điều phối tổng thể 3 trụ cột: Quản lý Quota AI, Lịch thanh toán SaaS và Danh mục 17+ ứng dụng trong hệ sinh thái JohnnyHoang.',
    scenario: 'Bạn đang quản lý 5 tài khoản Claude/ChatGPT và hàng chục dự án Vercel bị phân tán.'
  },
  {
    id: 'tw-q2',
    chapterNumber: 2,
    question: 'Trong thuật toán rollForward(), nếu một mốc reset_time đã trôi qua 12 giờ trước và step_hours là 5 giờ, hàm sẽ làm gì?',
    options: [
      'Giữ nguyên thời gian trong quá khứ',
      'Báo lỗi và xóa bản ghi',
      'Tự động cộng 3 chu kỳ (15 giờ) để mốc reset mới nằm ở tương lai (3 giờ sau thời điểm hiện tại)',
      'Reset về thời điểm 00:00 của ngày hôm nay'
    ],
    correctAnswerIndex: 2,
    explanation: 'Thuật toán tính toán số chu kỳ cần bù: Math.floor(12 / 5) + 1 = 3 chu kỳ (15 giờ), giúp dời mốc reset lên 3 giờ trong tương lai mà người dùng không cần cập nhật tay.',
    scenario: 'Người dùng không mở ứng dụng Token Wallet trong suốt ngày nghỉ cuối tuần.'
  },
  {
    id: 'tw-q3',
    chapterNumber: 3,
    question: 'Bộ timeParser.ts xử lý chuỗi "reset lúc 10h tối" như thế nào nếu thời điểm hiện tại là 14:00 chiều?',
    options: [
      'Gán thành 10:00 sáng ngày hôm nay',
      'Chuyển đổi thành 22:00 tối của ngày hôm nay',
      'Chuyển thành 22:00 của ngày mai',
      'Báo lỗi không phân tích được'
    ],
    correctAnswerIndex: 1,
    explanation: 'Vì 10h tối tương đương 22:00 (lớn hơn 14:00 hiện tại), parser xác định đây là mốc thời gian trong cùng ngày hôm nay.',
    scenario: 'Người dùng copy thông báo quota reset từ Claude dán vào ô nhập liệu.'
  },
  {
    id: 'tw-q4',
    chapterNumber: 4,
    question: 'Biểu thức paymentParser.ts trích xuất thông tin gì từ chuỗi: "Thanh toán Cursor 20$ thẻ Techcombank visa ngày 15 hàng tháng"?',
    options: [
      'Dịch vụ: Cursor, Số tiền: 20 USD, Thẻ: Techcombank Visa, Hạn: Ngày 15 hàng tháng',
      'Chỉ trích xuất được tên ngân hàng Techcombank',
      'Chỉ trích xuất được số tiền 20$',
      'Không nhận diện được do có cả tiếng Anh lẫn tiếng Việt'
    ],
    correctAnswerIndex: 0,
    explanation: 'Bộ parser đa tầng trích xuất trọn vẹn tên dịch vụ, đơn vị tiền tệ USD, phương thức thanh toán và chu kỳ ngày 15.',
    scenario: 'Người dùng copy tin nhắn SMS thông báo trừ tiền từ ngân hàng.'
  },
  {
    id: 'tw-q5',
    chapterNumber: 6,
    question: 'Khi tạo tài liệu SRS đặc tả kỹ thuật trong aiAppBuilder.ts, nếu mất kết nối mạng, hệ thống xử lý ra sao?',
    options: [
      'Ứng dụng bị crash và đóng băng',
      'Hiển thị màn hình trắng lỗi',
      'Kích hoạt bộ Offline Heuristic Generator dựa trên từ khóa ngữ nghĩa để sinh ra khung SRS hoàn chỉnh',
      'Xóa toàn bộ dự án hiện có'
    ],
    correctAnswerIndex: 2,
    explanation: 'Kiến trúc Dual-Engine với Fallback Heuristic đảm bảo người dùng luôn nhận được tài liệu chuẩn cấu trúc ngay cả khi hoàn toàn offline.',
    scenario: 'Lập trình viên đang làm việc trên máy bay không có kết nối Internet.'
  },
  {
    id: 'tw-q6',
    chapterNumber: 7,
    question: 'Hàm tkw_perm() trong cơ sở dữ liệu PostgreSQL Supabase được khai báo với thuộc tính gì để đảm bảo kiểm tra quyền an toàn và nhanh chóng?',
    options: [
      'SECURITY INVOKER',
      'SECURITY DEFINER',
      'VOLATILE IMMUTABLE',
      'EXTERNAL ROUTINE'
    ],
    correctAnswerIndex: 1,
    explanation: 'SECURITY DEFINER cho phép hàm thực thi với quyền của người tạo hàm (database owner) để đọc bảng phân quyền mà không làm rò rỉ quyền cho client.',
    scenario: 'Thiết kế hệ thống Row Level Security (RLS) đa tầng cho nhiều người dùng.'
  },
  {
    id: 'tw-q7',
    chapterNumber: 10,
    question: 'Lợi ích lớn nhất khi xây dựng TokenWallet thành một Model Context Protocol (MCP) Server là gì?',
    options: [
      'Cho phép bán token trên sàn giao dịch tiền điện tử',
      'Cho phép các AI Coding Agents (Cursor, Antigravity) tự động kiểm tra và chuyển đổi tài khoản AI khi hết quota',
      'Giảm giá tiền điện hàng tháng',
      'Tự động viết toàn bộ code mà không cần lập trình viên'
    ],
    correctAnswerIndex: 1,
    explanation: 'MCP Server biến TokenWallet thành công cụ để AI Agent tự tra cứu tài khoản còn quota và chuyển API token mượt mà trong lúc lập trình.',
    scenario: 'Một agent đang chạy batch refactor dài hàng giờ và cần duy trì API quota liên tục.'
  }
];
