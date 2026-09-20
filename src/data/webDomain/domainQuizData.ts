import { DomainQuizQuestion } from '../../types/webDomain';

export const DOMAIN_QUIZ_QUESTIONS: DomainQuizQuestion[] = [
  {
    id: 'dq-1',
    category: 'DNS Records & Routing',
    difficulty: 'Cơ bản',
    scenario: 'Bạn vừa mua một tên miền "mybrand.com" và thuê một máy chủ Cloud VPS có địa chỉ IPv4 là 103.150.20.5. Bạn cần tạo loại bản ghi DNS nào để khi người dùng truy cập "mybrand.com" sẽ được dẫn thẳng đến máy chủ này?',
    options: [
      { id: 'opt-a', text: 'Bản ghi CNAME trỏ về 103.150.20.5' },
      { id: 'opt-b', text: 'Bản ghi A trỏ về 103.150.20.5' },
      { id: 'opt-c', text: 'Bản ghi MX trỏ về 103.150.20.5' },
      { id: 'opt-d', text: 'Bản ghi TXT trỏ về 103.150.20.5' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Bản ghi A (Address) được thiết kế chuyên biệt để ánh xạ một tên miền hoặc subdomain trực tiếp tới một địa chỉ IPv4 32-bit. CNAME chỉ dùng để trỏ tên miền sang một tên miền khác, không thể trỏ trực tiếp tới địa chỉ IP số.',
      proTip: 'Nếu máy chủ có địa chỉ IPv6, bạn hãy tạo thêm bản ghi AAAA song song với bản ghi A.'
    }
  },
  {
    id: 'dq-2',
    category: 'Apex Domain & RFC Standards',
    difficulty: 'Trung bình',
    scenario: 'Theo tiêu chuẩn RFC 1034 của tổ chức IETF, tại sao bạn không thể tạo một bản ghi CNAME cho Root Domain (Apex domain, ví dụ "example.com") trong file DNS Zone tiêu chuẩn?',
    options: [
      { id: 'opt-a', text: 'Vì CNAME chỉ hỗ trợ giao thức HTTP, không hỗ trợ HTTPS.' },
      { id: 'opt-b', text: 'Vì bản ghi CNAME không được phép cùng tồn tại với các bản ghi bắt buộc khác như NS và SOA tại cùng một nút tên miền.' },
      { id: 'opt-c', text: 'Vì bản ghi CNAME sẽ làm tăng độ trễ DNS lên gấp đôi.' },
      { id: 'opt-d', text: 'Vì các nhà cung cấp DNS chỉ cho phép tối đa 1 bản ghi CNAME trên toàn hệ thống.' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Theo chuẩn RFC 1034, nếu một nút trong cây DNS có bản ghi CNAME thì không được phép có bất kỳ bản ghi nào khác. Trong khi đó, Root Domain bắt buộc phải có bản ghi SOA và NS để duy trì hoạt động. Do đó, đặt CNAME tại Root Domain là vi phạm chuẩn.',
      proTip: 'Các nhà cung cấp DNS hiện đại như Cloudflare (CNAME Flattening) hoặc AWS Route 53 (ALIAS Record) đã tạo cơ chế phân giải ảo để vượt qua giới hạn này mà vẫn tuân thủ RFC.'
    }
  },
  {
    id: 'dq-3',
    category: 'Email Security & Deliverability',
    difficulty: 'Khó',
    scenario: 'Doanh nghiệp của bạn phát hiện có kẻ xấu đang gửi email lừa đảo với tiêu đề giả mạo "support@yourcompany.com" tới khách hàng. Bạn cần cấu hình bản ghi nào để chỉ đạo các máy chủ email trên toàn cầu (Gmail, Outlook) từ chối và chặn thẳng tay (Block/Reject) mọi email mạo danh này?',
    options: [
      { id: 'opt-a', text: 'Bản ghi SPF với cấu hình "+all"' },
      { id: 'opt-b', text: 'Bản ghi DMARC với chính sách "p=reject"' },
      { id: 'opt-c', text: 'Bản ghi MX với độ ưu tiên cao nhất là 0' },
      { id: 'opt-d', text: 'Bản ghi CAA cho phép tất cả Certificate Authority' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Bản ghi DMARC (Domain-based Message Authentication) kết hợp với SPF và DKIM cho phép chủ sở hữu tên miền thiết lập chính sách xử lý: khi email gửi đi không vượt qua bài kiểm tra SPF/DKIM, chính sách "p=reject" sẽ yêu cầu máy chủ nhận thư từ chối nhận hoàn toàn.',
      proTip: 'Trước khi chuyển sang "p=reject", bạn nên chạy ở chế độ giám sát "p=none" trong 1-2 tuần để thu thập báo cáo (rua=mailto:...) tránh chặn nhầm email hợp lệ từ phần mềm bán hàng/CRM của công ty.'
    }
  },
  {
    id: 'dq-4',
    category: 'Domain Lifecycle',
    difficulty: 'Trung bình',
    scenario: 'Tên miền công ty của bạn bị quên gia hạn và đã hết hạn được 48 ngày. Khi bạn vào bảng điều khiển Registrar để gia hạn, hệ thống thông báo domain đang ở trạng thái "Redemption Period" và yêu cầu thanh toán $150 thay vì giá gốc $10. Lý do là gì?',
    options: [
      { id: 'opt-a', text: 'Do Registrar tự ý tăng giá đầu cơ tên miền.' },
      { id: 'opt-b', text: 'Tên miền đã vượt qua thời kỳ ân hạn (Grace Period) và bước vào giai đoạn chuộc (Redemption), nơi Cơ quan quản lý Registry (như Verisign) thu phí khôi phục cao.' },
      { id: 'opt-c', text: 'Do tên miền đã bị một người khác mua mất và họ đang rao bán lại.' },
      { id: 'opt-d', text: 'Do bạn chưa bật tính năng WHOIS Privacy.' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Sau khi hết hạn, domain trải qua giai đoạn Auto-Renew Grace Period (0-45 ngày) với giá gia hạn gốc. Khi chuyển sang Redemption Period (30 ngày), domain đã bị khóa để chuẩn bị xóa. Registry trung tâm tính phí khôi phục (Redemption fee) rất đắt đỏ để chuộc lại domain từ cơ sở dữ liệu gốc.',
      proTip: 'Luôn luôn bật chế độ Tự Động Gia Hạn (Auto-Renew) và sử dụng thẻ tín dụng còn hạn sử dụng lâu dài cho các tên miền kinh doanh cốt lõi!'
    }
  },
  {
    id: 'dq-5',
    category: 'Web Server & Zero-Downtime Migration',
    difficulty: 'Chuyên gia',
    scenario: 'Bạn chuẩn bị chuyển website thương mại điện tử sang một máy chủ mới vào tối Chủ Nhật. Hành động quan trọng nhất bạn PHẢI THỰC HIỆN trước ngày chuyển 24-48 giờ trên hệ thống DNS để đảm bảo người dùng chuyển sang máy chủ mới gần như ngay lập tức là gì?',
    options: [
      { id: 'opt-a', text: 'Tăng TTL của bản ghi A lên 86400 giây (24 giờ).' },
      { id: 'opt-b', text: 'Hạ TTL của bản ghi A xuống mức thấp như 300 giây (5 phút) hoặc 60 giây.' },
      { id: 'opt-c', text: 'Xóa toàn bộ bản ghi MX để giảm tải cho DNS.' },
      { id: 'opt-d', text: 'Tắt giao thức IPv6 trên máy chủ cũ.' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Hạ TTL xuống 300s trước 24-48h đảm bảo rằng bộ nhớ đệm (DNS cache) cũ của các ISP và người dùng trên toàn thế giới sẽ hết hạn. Khi bạn chính thức đổi IP sang máy chủ mới vào tối Chủ Nhật, mọi người dùng sẽ nhận được IP mới chỉ sau tối đa 5 phút, hạn chế tối đa gián đoạn.',
      proTip: 'Sau khi quá trình chuyển đổi hoàn tất và hệ thống hoạt động ổn định 2-3 ngày, hãy tăng lại TTL lên 3600s hoặc 86400s để giảm tải truy vấn DNS.'
    }
  },
  {
    id: 'dq-6',
    category: 'Security & DNSSEC',
    difficulty: 'Khó',
    scenario: 'Một kỹ sư bảo mật phát hiện trong file DNS Zone của công ty có bản ghi "docs.company.com CNAME custom-docs.gitbook.io", nhưng tài khoản GitBook đó đã bị xóa cách đây 6 tháng. Công ty đang đối mặt với nguy cơ bị loại tấn công nào?',
    options: [
      { id: 'opt-a', text: 'DNS Amplification DDoS Attack' },
      { id: 'opt-b', text: 'Subdomain Takeover (Chiếm đoạt tên miền phụ qua Dangling DNS)' },
      { id: 'opt-c', text: 'SQL Injection' },
      { id: 'opt-d', text: 'Man-in-the-Middle qua chứng chỉ SSL giả' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Đây là kịch bản kinh điển của Subdomain Takeover: bản ghi CNAME trỏ về một dịch vụ bên thứ ba (GitBook, S3, Heroku) nhưng tài nguyên đó đã bị xóa (Dangling DNS). Bất kỳ ai cũng có thể đăng ký tài khoản GitBook mới với tên miền tương ứng và chiếm quyền kiểm soát toàn bộ subdomain docs.company.com.',
      proTip: 'Luôn thực hiện quy trình Audit DNS định kỳ: khi giải phóng bất kỳ tài nguyên Cloud nào, phải lập tức xóa bỏ bản ghi DNS tương ứng.'
    }
  }
];
