import { EmailQuizQuestion } from '../../types/emailModule';

export const EMAIL_QUIZ_QUESTIONS: EmailQuizQuestion[] = [
  {
    id: 'eq-1',
    scenario: 'Bạn vừa dựng xong một máy chủ Linux Postfix mới tại dải IP 103.20.100.55 và gửi thử một bức thư đến địa chỉ Gmail. Thư bị trả về ngay lập tức với thông báo lỗi: "550-5.7.1 The IP establishing this connection does not have a reverse DNS assigned". Bạn cần làm gì để xử lý dứt điểm sự cố này?',
    category: 'dns_routing',
    difficulty: 'Cơ bản',
    options: [
      { id: 'opt-a', text: 'Tạo thêm một bản ghi DNS A trỏ tên miền về IP 103.20.100.55 trên Cloudflare' },
      { id: 'opt-b', text: 'Truy cập vào trang quản trị của nhà cung cấp VPS/Cloud (nơi cấp phát IP) và cấu hình bản ghi Reverse DNS (PTR) trỏ IP 103.20.100.55 về đúng Hostname của Mail Server' },
      { id: 'opt-c', text: 'Sửa file /etc/postfix/main.cf đổi cổng 25 thành cổng 587' },
      { id: 'opt-d', text: 'Xóa toàn bộ bản ghi SPF trên tên miền và gửi lại' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Lỗi "does not have a reverse DNS assigned" xuất hiện khi IP của máy chủ gửi thiếu bản ghi phân giải ngược PTR. Bản ghi này bắt buộc phải được cấu hình trên bảng điều khiển của nhà cung cấp VPS/Cloud sở hữu dải IP đó, trỏ về đúng FQDN Hostname của máy chủ.',
      whyWrong: 'Bản ghi A chỉ phân giải thuận (Domain -> IP). Đổi cổng 587 không dùng cho Server-to-Server Relay. Xóa SPF càng làm thư bị từ chối nặng nề hơn.',
      proTip: 'Dùng lệnh `dig -x <IP> +short` để kiểm tra xem PTR record đã có hiệu lực trên toàn cầu hay chưa.'
    }
  },
  {
    id: 'eq-2',
    scenario: 'Tổ chức của bạn muốn áp dụng chính sách DMARC nghiêm ngặt nhất để bảo vệ thương hiệu chống lại mọi hành vi gửi email giả mạo (Spoofing). Nếu một bức thư không vượt qua được cả SPF và DKIM, bạn muốn máy chủ nhận từ chối kết nối ngay lập tức và không cho thư tiếp cận người nhận. Cú pháp bản ghi DMARC nào sau đây là chính xác?',
    category: 'authentication_security',
    difficulty: 'Trung bình',
    options: [
      { id: 'opt-a', text: 'v=DMARC1; p=none; sp=none; rua=mailto:dmarc@company.com' },
      { id: 'opt-b', text: 'v=DMARC1; p=quarantine; pct=50; rua=mailto:dmarc@company.com' },
      { id: 'opt-c', text: 'v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc-reports@company.com' },
      { id: 'opt-d', text: 'v=spf1 ip4:1.2.3.4 -all' }
    ],
    correctOptionId: 'opt-c',
    explanation: {
      whyCorrect: 'Chính sách `p=reject` (và `sp=reject` cho tên miền con) với `pct=100` ra lệnh cho máy chủ nhận trên toàn thế giới phải từ chối dứt khoát 100% các bức thư mạo danh không vượt qua được cơ chế xác thực DMARC Alignment.',
      whyWrong: '`p=none` chỉ thu thập báo cáo không chặn; `p=quarantine` chỉ đẩy thư vào hộp Spam; `v=spf1` là cú pháp của bản ghi SPF, không phải DMARC.',
      proTip: 'Luôn kiểm tra kỹ các hệ thống gửi email hợp lệ nội bộ (như CRM, Marketing) trước khi nâng DMARC lên p=reject để tránh tự chặn chính mình.'
    }
  },
  {
    id: 'eq-3',
    scenario: 'Doanh nghiệp của bạn sử dụng Google Workspace cho email văn phòng, SendGrid cho email tiếp thị và AWS SES cho email giao dịch OTP. Khi cấu hình bản ghi SPF, bạn phát hiện bản ghi có quá nhiều lệnh include và gặp lỗi "PermError: Too many DNS lookups". Giới hạn số lần truy vấn DNS tối đa trong chuẩn SPF (RFC 7208) là bao nhiêu?',
    category: 'authentication_security',
    difficulty: 'Khó',
    options: [
      { id: 'opt-a', text: '5 lần truy vấn' },
      { id: 'opt-b', text: '10 lần truy vấn' },
      { id: 'opt-c', text: '25 lần truy vấn' },
      { id: 'opt-d', text: 'Không có giới hạn số lần truy vấn' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Theo tiêu chuẩn RFC 7208, thuật toán đánh giá SPF bị giới hạn tối đa 10 lần DNS Lookup (các cơ chế include, a, mx, ptr, exists). Nếu vượt quá 10 lần, máy chủ nhận sẽ dừng xử lý và trả về lỗi PermError, khiến toàn bộ email bị đánh trượt SPF.',
      whyWrong: 'Các con số 5 hoặc 25 không phải là giới hạn chuẩn RFC.',
      proTip: 'Giải pháp khi dính giới hạn 10 lookups: Tách riêng subdomain cho từng dịch vụ (ví dụ: auth.domain.com cho SES, news.domain.com cho SendGrid) hoặc sử dụng kỹ thuật SPF Flattening.'
    }
  },
  {
    id: 'eq-4',
    scenario: 'Sau khi cài đặt Postfix trên Ubuntu Server, một kỹ sư phát hiện hacker đang lợi dụng máy chủ của mình để gửi hàng triệu email quảng cáo thuốc và cờ bạc đến các địa chỉ ngẫu nhiên trên Internet mà không cần mật khẩu. Lỗi cấu hình bảo mật này được gọi là gì và cần sửa tham số nào trong Postfix?',
    category: 'cybersecurity_defense',
    difficulty: 'Khó',
    options: [
      { id: 'opt-a', text: 'Lỗ hổng DNS Spoofing, sửa file /etc/hosts' },
      { id: 'opt-b', text: 'Lỗ hổng Open Relay, cần thiết lập smtpd_relay_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_unauth_destination' },
      { id: 'opt-c', text: 'Lỗ hổng IMAP Overflow, tắt dịch vụ Dovecot' },
      { id: 'opt-d', text: 'Lỗ hổng SQL Injection trên giao diện Webmail' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Open Relay là tình trạng Mail Server cho phép bên thứ ba bên ngoài mạng chuyển tiếp thư qua nó đến các đích khác mà không yêu cầu xác thực SASL. Thiết lập `smtpd_relay_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_unauth_destination` đảm bảo chỉ IP nội bộ hoặc người dùng đã đăng nhập mới được phép gửi thư ra ngoài.',
      whyWrong: 'Đây là lỗi cấu hình chuyển tiếp SMTP, không liên quan tới DNS Spoofing, IMAP hay SQL Injection.',
      proTip: 'Dùng công cụ `nmap --script smtp-open-relay.nse` để quét kiểm tra bảo mật máy chủ ngay sau khi hoàn tất cài đặt.'
    }
  },
  {
    id: 'eq-5',
    scenario: 'Bạn đang phát triển tính năng gửi mã OTP đăng nhập trên ứng dụng Node.js / Next.js chạy trên nền tảng Serverless (Vercel). Tại sao việc gọi Cloud Email REST API (như Resend API) qua giao thức HTTPS cổng 443 lại tối ưu hơn rất nhiều so với việc mở kết nối SMTP socket truyền thống cổng 587?',
    category: 'transactional_cloud_api',
    difficulty: 'Trung bình',
    options: [
      { id: 'opt-a', text: 'Vì kết nối HTTPS là giao thức stateless, tốc độ thực thi nhanh, không mất thời gian duy trì TCP handshake phức tạp và cổng 443 không bao giờ bị tường lửa môi trường Serverless chặn' },
      { id: 'opt-b', text: 'Vì giao thức SMTP không hỗ trợ gửi nội dung HTML' },
      { id: 'opt-c', text: 'Vì HTTPS tự động mã hóa PGP cho bức thư còn SMTP thì không thể' },
      { id: 'opt-d', text: 'Vì chuẩn SMTP đã bị khai tử hoàn toàn trên thế giới' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Trong môi trường Serverless với các hàm ngắn hạn (Ephemeral Functions), việc mở socket TCP SMTP kéo dài gây độ trễ lớn và thường bị nhà cung cấp mạng chặn cổng 25/587. Gọi REST API qua HTTPS (Port 443) diễn ra tức thì, nhẹ nhàng và an toàn.',
      whyWrong: 'SMTP vẫn là giao thức nền tảng gửi HTML qua MIME; HTTPS không tự động mã hóa PGP; SMTP không hề bị khai tử.',
      proTip: 'Sử dụng Resend SDK kết hợp cùng thư viện React Email giúp bạn thiết kế giao diện email bằng JSX/Tailwind tuyệt đẹp và gửi chỉ trong vài dòng code.'
    }
  },
  {
    id: 'eq-6',
    scenario: 'Công ty của bạn vừa mua một dải IP Dedicated mới để phục vụ chiến dịch gửi email cuối năm. Để tránh việc bị các thuật toán chống Spam AI của Google và Yahoo tống thẳng vào hòm thư rác ngay từ ngày đầu, bạn cần áp dụng chiến lược kỹ thuật nào?',
    category: 'deliverability_reputation',
    difficulty: 'Chuyên gia',
    options: [
      { id: 'opt-a', text: 'Gửi toàn bộ 500.000 email trong một đêm để kiểm tra sức chịu tải của máy chủ' },
      { id: 'opt-b', text: 'Thực hiện quy trình IP Warming (Làm ấm IP) trong 4 tuần: Bắt đầu từ 50-200 email/ngày cho nhóm người dùng tương tác tích cực nhất và tăng dần đều theo thời gian' },
      { id: 'opt-c', text: 'Xóa toàn bộ mã theo dõi lượt mở (Open Tracking) và xóa nút Hủy đăng ký' },
      { id: 'opt-d', text: 'Chỉ gửi email dưới dạng file đính kèm zip mã hóa mật khẩu' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Một địa chỉ IP mới hoàn toàn chưa có điểm danh tiếng (Zero Reputation). Tăng lưu lượng gửi đột biến sẽ kích hoạt cờ cảnh báo Spam. Quy trình IP Warming kéo dài 4 tuần giúp xây dựng lòng tin dần dần với các Spam Filter của các ISP lớn.',
      whyWrong: 'Bắn 500.000 email ngay ngày đầu sẽ khiến IP bị Blacklist vĩnh viễn trong vài giờ. Xóa nút Hủy đăng ký vi phạm nghiêm trọng luật chống thư rác CAN-SPAM và RFC 8058.',
      proTip: 'Đăng ký tên miền trên Google Postmaster Tools để theo dõi trực quan đồ thị uy tín Domain Reputation và tỷ lệ Spam Complaint.'
    }
  }
];
