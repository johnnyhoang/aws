import { ResendQuizQuestion } from '../../types/resendModule';

export const RESEND_QUIZ_QUESTIONS: ResendQuizQuestion[] = [
  {
    id: 'rq-1',
    scenario: 'Hệ thống thanh toán của bạn thực hiện gửi email hóa đơn cho khách hàng. Do kết nối mạng di động chập chờn, client của người dùng tự động thử lại (retry) hàm gửi email 3 lần liên tiếp trong 5 giây.',
    question: 'Kỹ thuật nào trên Resend giúp đảm bảo khách hàng chỉ nhận được đúng 1 email duy nhất mà không bị trùng lặp?',
    options: [
      { id: 'a', text: 'Tăng thời gian timeout của hàm lên 60 giây', isCorrect: false },
      { id: 'b', text: 'Truyền một giá trị Idempotency-Key duy nhất cho mỗi giao dịch trong headers của request', isCorrect: true },
      { id: 'c', text: 'Xóa toàn bộ cache trình duyệt trước khi gửi', isCorrect: false },
      { id: 'd', text: 'Chuyển sang gửi thư bằng giao thức POP3', isCorrect: false }
    ],
    explanation: 'Idempotency-Key là tiêu chuẩn chống gửi trùng lặp của Resend. Khi cùng một key được gửi lại, Resend nhận diện và chỉ thực thi gửi thư 1 lần duy nhất, các lần gọi tiếp theo trả về kết quả đã lưu mà không phát thêm thư.',
    category: 'idempotency_batch_limits',
    difficulty: 'Trung bình'
  },
  {
    id: 'rq-2',
    scenario: 'Bạn cần xây dựng một template email OTP bảo mật có hỗ trợ Tailwind CSS và xem trước trực tiếp trên môi trường phát triển cục bộ.',
    question: 'Bộ công cụ nào sau đây được khuyến nghị sử dụng cùng Resend để tối ưu trải nghiệm lập trình viên?',
    options: [
      { id: 'a', text: 'Viết file PHP mail() thuần', isCorrect: false },
      { id: 'b', text: 'React Email (@react-email/components) kết hợp lệnh npx email dev', isCorrect: true },
      { id: 'c', text: 'Dùng Microsoft Word lưu file dưới dạng HTML', isCorrect: false },
      { id: 'd', text: 'Chụp ảnh màn hình thiết kế rồi gửi dưới dạng 1 file ảnh duy nhất', isCorrect: false }
    ],
    explanation: 'React Email là bộ thư viện component chính thức cho phép xây dựng email bằng React, Tailwind CSS và hỗ trợ server xem trước trực quan qua lệnh npx email dev.',
    category: 'react_email_templates',
    difficulty: 'Cơ bản'
  },
  {
    id: 'rq-3',
    scenario: 'Backend Next.js của bạn nhận được một Webhook POST request từ Resend báo sự kiện email.bounced. Làm thế nào để máy chủ của bạn chắc chắn 100% request này thực sự đến từ Resend chứ không phải do hacker gửi giả mạo?',
    question: 'Biện pháp xác thực bảo mật chuẩn mực là gì?',
    options: [
      { id: 'a', text: 'Kiểm tra xem User-Agent có chứa chữ "Mozilla" hay không', isCorrect: false },
      { id: 'b', text: 'Sử dụng thư viện svix để xác thực chữ ký số svix-signature cùng webhook secret', isCorrect: true },
      { id: 'c', text: 'Kiểm tra xem IP gửi request có bắt đầu bằng số 192.168 hay không', isCorrect: false },
      { id: 'd', text: 'Không cần xác thực vì Webhook luôn an toàn', isCorrect: false }
    ],
    explanation: 'Resend sử dụng nền tảng Svix để ký mã hóa (HMAC SHA-256) vào header svix-signature cho mỗi webhook event. Sử dụng thư viện svix với Webhook Secret giúp xác thực tính toàn vẹn và nguồn gốc của request.',
    category: 'webhooks_event_pipeline',
    difficulty: 'Nâng cao'
  },
  {
    id: 'rq-4',
    scenario: 'Bạn muốn gửi 80 email thông báo khác nhau cho 80 khách hàng trong cùng một thời điểm mà không muốn thực hiện 80 kết nối HTTP riêng biệt làm chậm server.',
    question: 'Phương thức SDK nào của Resend giải quyết tối ưu bài toán này?',
    options: [
      { id: 'a', text: 'resend.batch.send(emailArray) gửi tối đa 100 emails trong 1 request', isCorrect: true },
      { id: 'b', text: 'Chạy vòng lặp for với lệnh curl', isCorrect: false },
      { id: 'c', text: 'Đặt toàn bộ 80 email vào trường BCC của 1 email duy nhất', isCorrect: false },
      { id: 'd', text: 'Tạo 80 tài khoản Resend khác nhau', isCorrect: false }
    ],
    explanation: 'API resend.batch.send() cho phép gửi mảng lên tới 100 payload email độc lập trong đúng một HTTP request duy nhất, tối ưu hóa băng thông và thời gian xử lý.',
    category: 'idempotency_batch_limits',
    difficulty: 'Trung bình'
  }
];
