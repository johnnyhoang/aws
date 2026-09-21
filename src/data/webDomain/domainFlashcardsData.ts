import { DomainFlashcard } from '../../types/webDomain';

export const DOMAIN_FLASHCARDS: DomainFlashcard[] = [
  {
    id: 'dfc-1',
    term: 'FQDN (Fully Qualified Domain Name)',
    category: 'Fundamentals',
    definition: 'Tên miền đầy đủ tuyệt đối chỉ rõ vị trí chính xác của máy chủ trong cây phân cấp DNS, kết thúc bằng dấu chấm gốc Root (ví dụ: api.mycompany.com.).',
    practicalUsage: 'Dùng trong cấu hình SSL certificate, Nginx server_name, DNS Zone files và định danh máy chủ Active Directory.',
    proTip: 'Độ dài tối đa của một FQDN theo chuẩn RFC là 253 ký tự, mỗi nhãn (label) cách nhau bởi dấu chấm tối đa 63 ký tự.'
  },
  {
    id: 'dfc-2',
    term: 'Recursive DNS Resolver',
    category: 'Architecture',
    definition: 'Máy chủ DNS trung gian tiếp nhận yêu cầu từ máy khách và thực hiện toàn bộ quy trình truy vấn đệ quy từ Root -> TLD -> Authoritative Server để lấy IP.',
    practicalUsage: 'Các máy chủ DNS công cộng nổi tiếng: 1.1.1.1 (Cloudflare), 8.8.8.8 (Google), 9.9.9.9 (Quad9), hoặc DNS do nhà mạng ISP cung cấp.',
    proTip: 'Sử dụng 1.1.1.1 hoặc 8.8.8.8 giúp tăng tốc độ phân giải DNS và tránh được các chính sách chặn trang web của nhà mạng địa phương.'
  },
  {
    id: 'dfc-3',
    term: 'Authoritative Nameserver',
    category: 'Architecture',
    definition: 'Máy chủ DNS nắm giữ hồ sơ bản ghi gốc (Source of Truth) của tên miền và có thẩm quyền đưa ra câu trả lời chính thức về IP hoặc bản ghi của tên miền đó.',
    practicalUsage: 'Ví dụ: AWS Route 53, Cloudflare DNS, Namecheap NS. Khi bạn sửa bản ghi DNS, bạn đang sửa trên Authoritative Nameserver.',
    proTip: 'Một tên miền luôn cần tối thiểu 2 Authoritative Nameserver độc lập ở 2 địa chỉ IP/dải mạng khác nhau để dự phòng sự cố (High Availability).'
  },
  {
    id: 'dfc-4',
    term: 'TTL (Time To Live)',
    category: 'DNS Records',
    definition: 'Thời gian (tính bằng giây) mà một bản ghi DNS được phép lưu trữ trong bộ nhớ đệm (Cache) của máy khách và các máy chủ DNS trung gian.',
    practicalUsage: 'Thiết lập TTL 86400s (24h) cho các bản ghi cố định để tăng tốc độ truy cập; hạ TTL xuống 300s (5 phút) trước khi thực hiện chuyển server.',
    proTip: 'Đừng để TTL quá thấp (< 60s) trong thời gian dài vì sẽ làm tăng số lượng truy vấn DNS không cần thiết, gây tốn tài nguyên và tăng chi phí nếu dùng Route 53.'
  },
  {
    id: 'dfc-5',
    term: 'CNAME Flattening (ALIAS / ANAME)',
    category: 'DNS Records',
    definition: 'Kỹ thuật cho phép đặt bí danh (Alias) tại Apex/Root Domain (@) bằng cách tự động phân giải tên miền đích thành địa chỉ IP ngay tại Authoritative Server trước khi trả lời.',
    practicalUsage: 'Dùng khi trỏ tên miền chính example.com về Cloudflare Pages, Vercel, Netlify, AWS CloudFront hoặc Heroku.',
    proTip: 'Tính năng này được Cloudflare, AWS Route 53, Porkbun và DNSimple hỗ trợ hoàn toàn tự động và miễn phí.'
  },
  {
    id: 'dfc-6',
    term: 'SPF (Sender Policy Framework)',
    category: 'Email Security',
    definition: 'Bản ghi TXT khai báo danh sách tất cả các địa chỉ IP và dịch vụ máy chủ được phép gửi email đại diện cho tên miền của bạn.',
    practicalUsage: 'Ngăn chặn tin tặc mạo danh địa chỉ email From: của công ty bạn để gửi thư rác hoặc thư lừa đảo khách hàng.',
    proTip: 'Một tên miền chỉ được phép có DUY NHẤT 1 bản ghi SPF. Nếu có nhiều nguồn gửi mail, hãy gom chung vào 1 bản ghi bằng lệnh `include:`.'
  },
  {
    id: 'dfc-7',
    term: 'DKIM (DomainKeys Identified Mail)',
    category: 'Email Security',
    definition: 'Phương thức xác thực email bằng chữ ký số mật mã học. Khóa riêng (Private Key) được lưu trên máy chủ gửi thư, khóa công khai (Public Key) lưu trên bản ghi DNS.',
    practicalUsage: 'Máy chủ nhận thư (Gmail/Outlook) dùng Public Key trên DNS để kiểm chứng tính toàn vẹn của thư, đảm bảo thư không bị chỉnh sửa trên đường truyền.',
    proTip: 'Kết hợp SPF và DKIM giúp tỷ lệ email gửi từ hệ thống rơi vào Inbox đạt trên 99% thay vì bị phân loại vào hòm Spam.'
  },
  {
    id: 'dfc-8',
    term: 'DMARC (Domain-based Message Authentication)',
    category: 'Email Security',
    definition: 'Giao thức chính sách cấp cao hướng dẫn máy chủ nhận thư cách xử lý email không đạt tiêu chuẩn SPF hoặc DKIM (p=none, p=quarantine, p=reject).',
    practicalUsage: 'Bảo vệ thương hiệu tối đa chống lại các chiến dịch Phishing mạo danh ngân hàng hoặc doanh nghiệp lớn.',
    proTip: 'Luôn thêm tham số `rua=mailto:dmarc-reports@domain.com` để nhận báo cáo định kỳ dạng XML về tình hình giả mạo tên miền của bạn.'
  },
  {
    id: 'dfc-9',
    term: 'DNSSEC (DNS Security Extensions)',
    category: 'Security',
    definition: 'Tập hợp các tiện ích mở rộng bảo mật thêm chữ ký số mật mã học vào bản ghi DNS nhằm chống lại tấn công DNS Spoofing và DNS Cache Poisoning.',
    practicalUsage: 'Tạo chuỗi tin cậy Chain of Trust từ Root Server xuống tận bản ghi DNS của bạn qua bản ghi DS (Delegation Signer).',
    proTip: 'Bật DNSSEC chỉ bằng 1 nút bấm trên Cloudflare, sau đó copy 4 thông số DS Record dán vào bảng quản trị Registrar của bạn.'
  },
  {
    id: 'dfc-10',
    term: 'Subdomain Takeover',
    category: 'Security',
    definition: 'Lỗ hổng xảy ra khi bản ghi CNAME trỏ tới một dịch vụ bên thứ ba vô chủ (Dangling DNS), cho phép hacker chiếm quyền điều khiển subdomain đó.',
    practicalUsage: 'Rà soát định kỳ toàn bộ DNS Zone và xóa ngay các bản ghi CNAME trỏ về các S3 bucket, GitHub repo, Heroku app đã xóa bỏ.',
    proTip: 'Sử dụng các công cụ mã nguồn mở như subjack hoặc can-i-take-over-xyz để quét kiểm toán bảo mật subdomain tự động.'
  },
  {
    id: 'dfc-11',
    term: 'EPP Code / Auth Code',
    category: 'Domain Management',
    definition: 'Mã ủy quyền bí mật do Registrar hiện tại cấp để xác thực quyền chuyển nhượng tên miền sang một nhà đăng ký mới (Domain Transfer).',
    practicalUsage: 'Bắt buộc phải có mã này khi chuyển tên miền giữa các nhà cung cấp như từ GoDaddy sang Cloudflare hoặc Porkbun.',
    proTip: 'Tuyệt đối không chia sẻ mã EPP Code cho bất kỳ ai không có phận sự vì mã này tương đương với chìa khóa trao quyền sở hữu tên miền.'
  },
  {
    id: 'dfc-12',
    term: 'Redemption Period',
    category: 'Domain Lifecycle',
    definition: 'Giai đoạn 30 ngày sau khi hết thời kỳ ân hạn (Grace Period), nơi tên miền bị khóa chuẩn bị xóa và chủ cũ phải trả phí phạt rất cao ($80-$250) nếu muốn chuộc lại.',
    practicalUsage: 'Cơ chế của Registry trung tâm nhằm tạo cơ hội cuối cùng cho chủ sở hữu cứu lại tài sản số quan trọng trước khi bị đưa vào hàng đợi xóa vĩnh viễn.',
    proTip: 'Đặt lịch nhắc nhở gia hạn trước ngày hết hạn 30 ngày để không bao giờ bị rơi vào giai đoạn chuộc tốn kém này.'
  },
  {
    id: 'dfc-13',
    term: 'Virtual Private Server (VPS)',
    category: 'Web Hosting',
    definition: 'Máy chủ ảo riêng biệt được phân chia tài nguyên độc lập (CPU, RAM, NVMe SSD) từ máy chủ vật lý, cung cấp toàn quyền quản trị cao nhất (Root Access) trên hệ điều hành Linux.',
    practicalUsage: 'Triển khai Web App, Database (Postgres/MySQL), Cache (Redis), Cron jobs nền, WebSocket servers với chi phí cố định siêu rẻ ($4-$6/tháng).',
    proTip: 'Hetzner Cloud, DigitalOcean, Linode và OVH là những nhà cung cấp VPS uy tín hàng đầu thế giới với băng thông đi kèm lên tới 20TB miễn phí.'
  },
  {
    id: 'dfc-14',
    term: 'Serverless PaaS',
    category: 'Web Hosting',
    definition: 'Nền tảng dịch vụ đám mây (như Vercel, Netlify) tự động đóng gói mã nguồn thành các hàm Serverless độc lập, tự động co giãn theo từng request và tính phí theo lượt gọi/băng thông.',
    practicalUsage: 'Triển khai cực nhanh các website Frontend, ứng dụng Next.js/React, Landing page với cơ chế 1-Click Git Push-to-Deploy.',
    proTip: 'Cần lưu ý giới hạn thời gian thực thi (Execution Timeout 10s trên gói Hobby) và chi phí phát sinh $20 cho mỗi 100GB băng thông vượt mức.'
  },
  {
    id: 'dfc-15',
    term: 'Cold Start Latency',
    category: 'Web Hosting',
    definition: 'Độ trễ phát sinh khi một Serverless Function đang ở trạng thái ngủ (idle) được kích hoạt lại bởi request đầu tiên của người dùng, đòi hỏi khởi tạo môi trường chạy và nạp mã nguồn vào bộ nhớ.',
    practicalUsage: 'Khiến người dùng đầu tiên truy cập website bị trễ thêm 500ms đến 2,000ms so với máy chủ VPS luôn duy trì tiến trình trong RAM.',
    proTip: 'Trên VPS hoặc máy chủ truyền thống, Cold-start bằng 0ms vì ứng dụng luôn ở trạng thái sẵn sàng trong RAM.'
  },
  {
    id: 'dfc-16',
    term: 'Coolify (Self-Hosted PaaS)',
    category: 'Web Hosting',
    definition: 'Nền tảng PaaS mã nguồn mở tự lưu trữ, biến bất kỳ VPS Linux nào thành một hệ sinh thái triển khai tự động hệt như Vercel/Render/Heroku hoàn toàn miễn phí.',
    practicalUsage: 'Cung cấp Web UI quản lý container Docker, tự động pull code GitHub khi push, tự sinh Preview PR branch, tự cấp SSL Let\'s Encrypt và cài Database 1-click.',
    proTip: 'Cài đặt Coolify chỉ bằng 1 câu lệnh duy nhất: `curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash`.'
  }
];
