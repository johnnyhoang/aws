import { EmailFlashcard } from '../../types/emailModule';

export const EMAIL_FLASHCARDS: EmailFlashcard[] = [
  {
    id: 'efc-1',
    term: 'SMTP (Simple Mail Transfer Protocol)',
    definition: 'Giao thức đẩy thư (Push) chạy trên nền TCP, điều phối việc gửi và chuyển tiếp email giữa các máy chủ trên toàn cầu.',
    category: 'Giao Thức',
    practicalUsage: 'Sử dụng cổng 25 cho Server-to-Server Relay, cổng 587 cho MUA Client Submission với xác thực STARTTLS.',
    proTip: 'ISP dân dụng thường khóa cổng 25 chiều đi để ngăn chặn botnet gửi thư rác.'
  },
  {
    id: 'efc-2',
    term: 'IMAP vs POP3',
    definition: 'IMAP đồng bộ hòm thư 2 chiều thời gian thực trên đám mây; POP3 tải thư về máy cục bộ và thường xóa thư trên máy chủ.',
    category: 'Giao Thức',
    practicalUsage: 'IMAP chạy trên cổng 993 (IMAPS SSL), hỗ trợ tính năng IDLE push thông báo thư mới tức thì về điện thoại.',
    proTip: '99.9% người dùng hiện đại sử dụng IMAP để truy cập đồng thời trên máy tính và điện thoại.'
  },
  {
    id: 'efc-3',
    term: 'MIME (Multipurpose Internet Mail Extensions)',
    definition: 'Chuẩn mở rộng biến email từ văn bản ASCII thuần túy thành thông điệp đa phương tiện chứa HTML, hình ảnh và file đính kèm.',
    category: 'Cấu Trúc Thư',
    practicalUsage: 'Multipart/alternative cho phép chứa đồng thời bản text/plain và text/html trong cùng một bức thư.',
    proTip: 'Luôn gửi kèm phiên bản text/plain để tăng điểm uy tín với các bộ lọc thư rác của Gmail.'
  },
  {
    id: 'efc-4',
    term: 'SPF (Sender Policy Framework)',
    definition: 'Bản ghi DNS TXT khai báo danh sách trắng các địa chỉ IP được phép gửi email thay mặt cho tên miền của bạn.',
    category: 'Bảo Mật & Định Danh',
    practicalUsage: 'Cú pháp chuẩn: v=spf1 ip4:1.2.3.4 include:_spf.google.com -all',
    proTip: 'Giới hạn tối đa 10 lần DNS Lookup trong một bản ghi SPF; vượt quá sẽ bị lỗi PermError.'
  },
  {
    id: 'efc-5',
    term: 'DKIM (DomainKeys Identified Mail)',
    definition: 'Chữ ký số mật mã học bảo vệ nội dung email không bị chỉnh sửa hay giả mạo trên đường truyền.',
    category: 'Bảo Mật & Định Danh',
    practicalUsage: 'Máy chủ gửi dùng Private Key để ký thư; máy chủ nhận dùng Public Key trên DNS TXT để giải mã xác minh.',
    proTip: 'Sử dụng độ dài khóa tối thiểu RSA 2048-bit để đảm bảo an toàn mật mã học.'
  },
  {
    id: 'efc-6',
    term: 'DMARC',
    definition: 'Chính sách liên kết SPF và DKIM, ra lệnh cho các máy chủ toàn cầu cách xử lý email mạo danh (none, quarantine, reject).',
    category: 'Bảo Mật & Định Danh',
    practicalUsage: 'Bản ghi DNS _dmarc.yourdomain.com với chính sách p=reject để bảo vệ thương hiệu tuyệt đối.',
    proTip: 'Bắt đầu từ p=none để thu thập báo cáo RUA trước khi siết chặt lên p=quarantine và p=reject.'
  },
  {
    id: 'efc-7',
    term: 'BIMI (Brand Indicators for Message Identification)',
    definition: 'Tiêu chuẩn hiển thị logo thương hiệu chính thức có tích xanh bên cạnh tên người gửi trong hộp thư Gmail/Yahoo.',
    category: 'Bảo Mật & Định Danh',
    practicalUsage: 'Yêu cầu domain phải đạt DMARC p=quarantine hoặc reject và có chứng chỉ VMC (Verified Mark Certificate).',
    proTip: 'Tăng tỷ lệ mở thư (Open Rate) lên đến 39% nhờ độ tin cậy của logo chính chủ.'
  },
  {
    id: 'efc-8',
    term: 'MX Record (Mail Exchanger)',
    definition: 'Bản ghi DNS chỉ định máy chủ nào chịu trách nhiệm tiếp nhận email gửi đến cho tên miền của bạn.',
    category: 'Định Tuyến DNS',
    practicalUsage: 'Hỗ trợ giá trị độ ưu tiên Priority (số nhỏ hơn = ưu tiên cao hơn) để phân cấp máy chủ chính và máy chủ dự phòng.',
    proTip: 'MX record bắt buộc phải trỏ về tên miền có bản ghi A (FQDN), không được trỏ về IP hay CNAME.'
  },
  {
    id: 'efc-9',
    term: 'PTR Record (Reverse DNS / rDNS)',
    definition: 'Bản ghi phân giải ngược từ địa chỉ IP sang tên miền FQDN hợp lệ của máy chủ.',
    category: 'Định Tuyến DNS',
    practicalUsage: 'Nếu IP gửi 1.2.3.4 không có PTR record khớp với hostname, Gmail/Microsoft sẽ từ chối nhận thư ngay lập tức.',
    proTip: 'Bản ghi PTR được cấu hình trên bảng điều khiển của nhà cung cấp VPS/Cloud (nơi cấp phát IP), không phải trên DNS Manager của tên miền.'
  },
  {
    id: 'efc-10',
    term: 'Postfix',
    definition: 'Phần mềm Mail Transfer Agent (MTA) mã nguồn mở hàng đầu trên Linux, chịu trách nhiệm định tuyến và chuyển phát thư.',
    category: 'Mail Server Tự Dựng',
    practicalUsage: 'Quản lý cấu hình qua file /etc/postfix/main.cf và theo dõi hoạt động qua /var/log/mail.log.',
    proTip: 'Luôn kiểm tra tham số smtpd_relay_restrictions để ngăn chặn nguy cơ biến máy chủ thành Open Relay.'
  },
  {
    id: 'efc-11',
    term: 'Dovecot',
    definition: 'Phần mềm Mail Delivery Agent (MDA) và IMAP/POP3 Server bảo mật, quản lý lưu trữ hòm thư Maildir trên Linux.',
    category: 'Mail Server Tự Dựng',
    practicalUsage: 'Cung cấp dịch vụ IMAPS qua cổng 993 và mở unix socket SASL cho Postfix xác thực người dùng.',
    proTip: 'Định dạng lưu trữ Maildir vượt trội hơn mbox nhờ khả năng cô lập từng email thành một file riêng biệt.'
  },
  {
    id: 'efc-12',
    term: 'Hard Bounce vs Soft Bounce',
    definition: 'Hard Bounce là lỗi vĩnh viễn (địa chỉ không tồn tại); Soft Bounce là lỗi tạm thời (hòm thư đầy hoặc server quá tải).',
    category: 'Deliverability & Vận Hành',
    practicalUsage: 'Phải lập tức xóa vĩnh viễn các địa chỉ Hard Bounce khỏi cơ sở dữ liệu để bảo vệ điểm uy tín domain.',
    proTip: 'Tỷ lệ Hard Bounce vượt quá 2% sẽ khiến tài khoản gửi email của bạn trên AWS SES / Resend bị tạm khóa.'
  },
  {
    id: 'efc-13',
    term: 'IP Warming (Làm ấm IP)',
    definition: 'Chiến lược tăng dần lưu lượng gửi email theo từng tuần trên IP/Domain mới để xây dựng danh tiếng với Spam Filter.',
    category: 'Deliverability & Vận Hành',
    practicalUsage: 'Bắt đầu từ 50-200 email/ngày trong tuần đầu và tăng dần lên hàng chục nghìn email sau 4 tuần.',
    proTip: 'Chỉ gửi cho những người dùng tương tác tích cực nhất trong giai đoạn làm ấm đầu tiên.'
  },
  {
    id: 'efc-14',
    term: 'Spamhaus / RBL',
    definition: 'Tổ chức giám sát và cung cấp danh sách đen địa chỉ IP/Domain phát tán thư rác và mã độc theo thời gian thực.',
    category: 'An Ninh Email',
    practicalUsage: 'Nếu bị dính Spamhaus SBL/XBL, phần lớn Mail Server trên toàn cầu sẽ từ chối kết nối từ máy chủ của bạn.',
    proTip: 'Dọn sạch hàng đợi thư, vá lỗ hổng rò rỉ tài khoản trước khi gửi đơn xin Delist trên check.spamhaus.org.'
  },
  {
    id: 'efc-15',
    term: 'Open Relay',
    definition: 'Lỗ hổng cấu hình nghiêm trọng cho phép bất kỳ ai trên Internet gửi thư qua máy chủ của bạn mà không cần xác thực.',
    category: 'An Ninh Email',
    practicalUsage: 'Hacker sẽ lợi dụng Open Relay để bắn hàng triệu thư rác và khiến IP máy chủ bị liệt vào Blacklist vĩnh viễn.',
    proTip: 'Sử dụng lệnh nmap --script smtp-open-relay.nse để kiểm tra an toàn cho máy chủ của bạn.'
  },
  {
    id: 'efc-16',
    term: 'MTA-STS & TLS-RPT',
    definition: 'Chuẩn bảo mật ép buộc mọi kết nối gửi thư đến domain phải sử dụng giao thức mã hóa TLS hợp lệ và gửi báo cáo sự cố.',
    category: 'Bảo Mật Nâng Cao',
    practicalUsage: 'Ngăn chặn hoàn toàn các cuộc tấn công nghe lén hạ cấp Downgrade Attack (Man-in-the-Middle) trên cổng 25.',
    proTip: 'Cấu hình file chính sách tại https://mta-sts.yourdomain.com/.well-known/mta-sts.txt.'
  },
  {
    id: 'efc-17',
    term: 'MJML & React Email',
    definition: 'Công nghệ soạn thảo giao diện email responsive hiện đại, tự động biên dịch thành mã HTML Table tương thích mọi ứng dụng đọc thư.',
    category: 'Tự Động Hóa & Giao Diện',
    practicalUsage: 'Loại bỏ nỗi đau render lỗi trên Outlook cũ và tối ưu hiển thị mượt mà trên iPhone/Android Dark Mode.',
    proTip: 'Tích hợp mượt mà với Resend SDK để gửi email bằng React Components trong Next.js.'
  },
  {
    id: 'efc-18',
    term: 'Inbound Email Parsing',
    definition: 'Kỹ thuật tiếp nhận email gửi đến và tự động chuyển đổi thành dữ liệu JSON gửi vào API Webhook của backend.',
    category: 'Tự Động Hóa & Giao Diện',
    practicalUsage: 'Xây dựng hệ thống tự động xử lý ticket hỗ trợ khi khách hàng bấm Reply email mà không cần đăng nhập website.',
    proTip: 'Giúp tự động hóa đọc và bóc tách file đính kèm hóa đơn điện tử cho hệ thống kế toán.'
  }
];
