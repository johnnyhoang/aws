import { NeonQuizQuestion } from '../../types/neonModule';

export const NEON_QUIZ_QUESTIONS: NeonQuizQuestion[] = [
  {
    id: 'nq-1',
    scenario: 'Đội ngũ của bạn chạy ứng dụng Next.js trên Vercel kết nối vào cơ sở dữ liệu Neon. Trong các đợt cao điểm, có hơn 1.500 hàm Serverless bật lên đồng thời. Tuy nhiên, giới hạn max_connections mặc định của PostgreSQL chỉ là 100.',
    question: 'Giải pháp nào trên Neon giúp ứng dụng phục vụ trơn tru 1.500 kết nối này mà không bao giờ gặp lỗi Connection Limit Exceeded?',
    options: [
      { id: 'a', text: 'Nâng cấp cấu hình máy chủ lên gói đắt nhất để tăng max_connections lên 10.000', isCorrect: false },
      { id: 'b', text: 'Sử dụng Pooled Connection String (có tiền tố -pooler) để kích hoạt PgBouncer Transaction Pooling', isCorrect: true },
      { id: 'c', text: 'Bắt buộc người dùng phải xếp hàng đợi 1 phút trước khi truy cập website', isCorrect: false },
      { id: 'd', text: 'Chuyển sang lưu trữ toàn bộ dữ liệu vào file text trên máy chủ', isCorrect: false }
    ],
    explanation: 'Neon tích hợp sẵn PgBouncer Connection Pooler với chế độ Transaction Pooling. Bằng cách dùng Pooled Connection String, PgBouncer sẽ gom và tái sử dụng các kết nối vật lý ngay khi một câu lệnh/transaction kết thúc, dễ dàng phục vụ hàng chục ngàn client Serverless.',
    category: 'connection_pooling_pgbouncer',
    difficulty: 'Trung bình'
  },
  {
    id: 'nq-2',
    scenario: 'Bạn cần kiểm thử một file Migration SQL phức tạp có nguy cơ làm hỏng dữ liệu của cơ sở dữ liệu Production dung lượng 300GB.',
    question: 'Quy trình kiểm thử an toàn và nhanh nhất được hỗ trợ bởi Neon là gì?',
    options: [
      { id: 'a', text: 'Tải 300GB về máy tính cá nhân bằng pg_dump mất 4 tiếng', isCorrect: false },
      { id: 'b', text: 'Tạo một nhánh Database Branch mới (Copy-on-Write) từ nhánh main trong 1 giây qua lệnh neonctl branches create', isCorrect: true },
      { id: 'c', text: 'Chạy trực tiếp trên Production và cầu nguyện không có lỗi', isCorrect: false },
      { id: 'd', text: 'Xóa bớt 290GB dữ liệu cũ rồi mới kiểm thử', isCorrect: false }
    ],
    explanation: 'Database Branching của Neon sử dụng cơ chế Copy-on-Write cho phép bạn tạo một bản sao độc lập của Production chỉ trong 1 giây mà không tốn dung lượng lưu trữ ban đầu. Bạn có thể tự do chạy thử nghiệm và xóa nhánh sau khi hoàn tất.',
    category: 'database_branching',
    difficulty: 'Cơ bản'
  },
  {
    id: 'nq-3',
    scenario: 'Lúc 10:15:30 sáng, một câu lệnh nhầm lẫn đã ghi đè toàn bộ bảng sản phẩm trên nhánh main. Bạn muốn khôi phục lại dữ liệu về trạng thái chính xác lúc 10:15:00 (30 giây trước sự cố).',
    question: 'Tính năng nào của Neon cho phép thực hiện việc này nhanh chóng và chính xác nhất?',
    options: [
      { id: 'a', text: 'Gửi email cho bộ phận hỗ trợ kỹ thuật và chờ 24 giờ', isCorrect: false },
      { id: 'b', text: 'Tạo một nhánh mới sử dụng tính năng Point-in-Time Recovery (PITR) với tham số thời gian "10:15:00"', isCorrect: true },
      { id: 'c', text: 'Dùng chức năng Ctrl+Z trên trình duyệt', isCorrect: false },
      { id: 'd', text: 'Tự gõ lại toàn bộ dữ liệu bằng tay', isCorrect: false }
    ],
    explanation: 'Nhờ kiến trúc Pageserver ghi nhận lịch sử thay đổi WAL liên tục, Neon hỗ trợ Point-in-Time Recovery (PITR) cho phép tạo nhánh khôi phục về bất kỳ giây nào trong quá khứ chỉ với 1 cú click.',
    category: 'point_in_time_recovery_time_travel',
    difficulty: 'Nâng cao'
  },
  {
    id: 'nq-4',
    scenario: 'Bạn đang viết mã nguồn trong Vercel Edge Middleware chạy trên V8 Isolate Runtime (không hỗ trợ module net/TCP socket của Node.js) và cần thực hiện 1 câu lệnh SELECT truy vấn cơ sở dữ liệu Postgres.',
    question: 'Công cụ nào sau đây cho phép kết nối và truy vấn Postgres thành công trong môi trường Edge này?',
    options: [
      { id: 'a', text: 'Gói thư viện chuẩn pg của Node.js', isCorrect: false },
      { id: 'b', text: 'Neon Serverless Driver (@neondatabase/serverless) với hàm neon() qua giao thức HTTP/WebSocket', isCorrect: true },
      { id: 'c', text: 'Mở kết nối SSH trực tiếp từ trình duyệt', isCorrect: false },
      { id: 'd', text: 'Không thể truy vấn Postgres từ Edge Runtime', isCorrect: false }
    ],
    explanation: 'Neon Serverless Driver (@neondatabase/serverless) được thiết kế chuyên biệt cho Edge Runtimes, cho phép gửi các truy vấn SQL an toàn qua giao thức HTTP Fetch hoặc WebSockets mà không cần đến TCP Sockets.',
    category: 'serverless_driver_websockets',
    difficulty: 'Trung bình'
  }
];
