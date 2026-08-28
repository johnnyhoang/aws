import { FundamentalFlashcard } from '../../types/fundamentals';

export const FUNDAMENTAL_FLASHCARDS: FundamentalFlashcard[] = [
  // --- DOMAIN 1: COMPUTER FUNDAMENTALS ---
  {
    id: 'fc-comp-1',
    domainId: 'computer_fundamentals',
    term: 'Kernel Space (Ring 0)',
    category: 'Computer Fundamentals',
    definition: 'Vùng bộ nhớ đặc quyền tối cao của Hệ điều hành nơi nhân Kernel thực thi với toàn quyền truy cập phần cứng (CPU, RAM, Ổ đĩa, Card mạng).',
    realWorldUsage: 'Bảo vệ hệ thống: Nếu một ứng dụng ở User Space bị crash, hệ điều hành vẫn sống sót an toàn.',
    awsRelevance: 'Cơ sở để hiểu cách AWS Nitro Hypervisor cô lập an toàn tài nguyên phần cứng giữa các EC2 Instances.',
    difficulty: 'Cơ bản'
  },
  {
    id: 'fc-comp-2',
    domainId: 'computer_fundamentals',
    term: 'OOM Killer (Out Of Memory Killer)',
    category: 'Computer Fundamentals',
    definition: 'Cơ chế tích hợp trong Linux Kernel tự động tìm và tiêu diệt tiến trình chiếm dụng nhiều bộ nhớ RAM nhất khi hệ thống cạn kiệt RAM và Swap.',
    realWorldUsage: 'Cứu máy chủ không bị treo cứng hoàn toàn khi ứng dụng Java/Node bị Memory Leak.',
    awsRelevance: 'Giải thích nguyên nhân tại sao ECS Task hoặc Kubernetes Pod bị dừng đột ngột với Exit Code 137.',
    difficulty: 'Trung bình'
  },
  {
    id: 'fc-comp-3',
    domainId: 'computer_fundamentals',
    term: 'File Descriptor (FD)',
    category: 'Computer Fundamentals',
    definition: 'Chỉ số nguyên dương đại diện cho một tệp đang mở trong Linux (bao gồm cả File, Socket mạng, Pipe, Thiết bị phần cứng).',
    realWorldUsage: 'FD 0 = stdin, FD 1 = stdout, FD 2 = stderr. Giới hạn `ulimit -n` quy định số lượng kết nối đồng thời tối đa.',
    awsRelevance: 'Cần tăng giới hạn File Descriptors khi chạy Web Server Nginx hoặc Database tải nặng trên EC2.',
    difficulty: 'Trung bình'
  },

  // --- DOMAIN 2: INTERNET FUNDAMENTALS ---
  {
    id: 'fc-net-fun-1',
    domainId: 'internet_fundamentals',
    term: 'Authoritative Name Server',
    category: 'Internet Fundamentals',
    definition: 'Máy chủ DNS nắm giữ bản ghi cấu hình gốc của chủ sở hữu tên miền, đưa ra câu trả lời chính thức cuối cùng (IP address) cho truy vấn.',
    realWorldUsage: 'Nơi bạn tạo các bản ghi A, CNAME, MX, TXT cho website của mình.',
    awsRelevance: 'Amazon Route 53 là dịch vụ DNS Authoritative Server toàn cầu của AWS.',
    difficulty: 'Cơ bản'
  },
  {
    id: 'fc-net-fun-2',
    domainId: 'internet_fundamentals',
    term: 'HTTP 502 Bad Gateway',
    category: 'Internet Fundamentals',
    definition: 'Mã lỗi HTTP thông báo máy chủ trung gian (Reverse Proxy Nginx hoặc Load Balancer) không nhận được phản hồi hợp lệ từ máy chủ ứng dụng Backend.',
    realWorldUsage: 'Xuất hiện khi Node.js/Python backend bị sập hoặc chưa khởi động xong nhưng Nginx đã chuyển tiếp traffic vào.',
    awsRelevance: 'Lỗi thường gặp nhất trên AWS Application Load Balancer (ALB) khi EC2 Target Group không phản hồi Health Check.',
    difficulty: 'Cơ bản'
  },
  {
    id: 'fc-net-fun-3',
    domainId: 'internet_fundamentals',
    term: 'TTL (Time To Live in DNS)',
    category: 'Internet Fundamentals',
    definition: 'Khoảng thời gian (tính bằng giây) mà các máy chủ DNS trung gian và trình duyệt được phép lưu bản ghi DNS trong bộ nhớ đệm (cache).',
    realWorldUsage: 'Đặt TTL thấp (60s) trước khi chuyển đổi máy chủ để DNS cập nhật nhanh, đặt TTL cao (86400s) khi hệ thống đã ổn định để tiết kiệm chi phí.',
    awsRelevance: 'Cấu hình trong Route 53 Records để tối ưu thời gian chuyển giao hệ thống (Cutover).',
    difficulty: 'Trung bình'
  },

  // --- DOMAIN 3: NETWORKING ⭐ ---
  {
    id: 'fc-net-star-1',
    domainId: 'networking_basics',
    term: 'RFC 1918 (Private IP Addresses)',
    category: 'Networking ⭐',
    definition: 'Quy chuẩn quốc tế định nghĩa 3 dải địa chỉ IP nội bộ không được định tuyến ra Internet công cộng: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.',
    realWorldUsage: 'Dùng đặt IP cho máy chủ nội bộ trong mạng LAN doanh nghiệp và trung tâm dữ liệu.',
    awsRelevance: 'Tiêu chuẩn bắt buộc khi chọn dải CIDR để tạo Amazon VPC.',
    difficulty: 'Cơ bản'
  },
  {
    id: 'fc-net-star-2',
    domainId: 'networking_basics',
    term: 'AWS 5 Reserved IPs in Subnet',
    category: 'Networking ⭐',
    definition: 'Quy tắc AWS luôn dành riêng 5 địa chỉ IP đầu và cuối trong mỗi Subnet: .0 (Network), .1 (VPC Router), .2 (DNS), .3 (Future Use), .255 (Broadcast).',
    realWorldUsage: 'Ví dụ: Subnet /24 có 256 IP, số IP thực tế bạn dùng được chỉ là 251 IP.',
    awsRelevance: 'Câu hỏi tính toán thường gặp trong kỳ thi AWS SAA-C03.',
    difficulty: 'Cơ bản'
  },
  {
    id: 'fc-net-star-3',
    domainId: 'networking_basics',
    term: 'TCP 3-Way Handshake',
    category: 'Networking ⭐',
    definition: 'Quy trình 3 bước thiết lập kết nối tin cậy giữa Client và Server: 1. SYN -> 2. SYN-ACK -> 3. ACK.',
    realWorldUsage: 'Đảm bảo cả 2 bên đều sẵn sàng truyền nhận dữ liệu trước khi gửi gói tin HTTP.',
    awsRelevance: 'Cơ chế hoạt động ở Tầng 4 của AWS Network Load Balancer (NLB).',
    difficulty: 'Trung bình'
  },
  {
    id: 'fc-net-star-4',
    domainId: 'networking_basics',
    term: 'Stateful Firewall (Security Group)',
    category: 'Networking ⭐',
    definition: 'Tường lửa có khả năng ghi nhớ trạng thái kết nối: Khi bạn mở quyền cho gói tin Inbound đi vào, gói tin phản hồi Outbound TỰ ĐỘNG được phép đi ra.',
    realWorldUsage: 'Bảo vệ máy chủ ảo ở cấp độ Card mạng (ENI) mà không cần cấu hình phức tạp chiều ra.',
    awsRelevance: 'AWS Security Groups là Stateful; ngược lại AWS Network ACLs là Stateless.',
    difficulty: 'Trung bình'
  },
  {
    id: 'fc-net-star-5',
    domainId: 'networking_basics',
    term: 'Source NAT (SNAT) & NAT Gateway',
    category: 'Networking ⭐',
    definition: 'Kỹ thuật thay thế IP nguồn riêng nội bộ thành IP công cộng duy nhất để cho phép các máy chủ trong Private Subnet truy cập Internet một chiều an toàn.',
    realWorldUsage: 'Cho phép Database Server trong vùng kín tải bản vá phần mềm mà không bị Internet bên ngoài tấn công vào.',
    awsRelevance: 'Dịch vụ AWS NAT Gateway đặt tại Public Subnet phục vụ cho Private Subnets.',
    difficulty: 'Trung bình'
  },

  // --- DOMAIN 4: LINUX BASICS ⭐ ---
  {
    id: 'fc-linux-1',
    domainId: 'linux_basics',
    term: 'Chmod 755 vs Chmod 644',
    category: 'Linux Basics ⭐',
    definition: '755 (rwxr-xr-x): Chủ sở hữu toàn quyền, người khác có quyền đọc và thực thi. 644 (rw-r--r--): Chủ sở hữu đọc/ghi, người khác chỉ đọc.',
    realWorldUsage: '755 dùng cho tệp kịch bản bash/thực thi và thư mục web; 644 dùng cho tệp cấu hình và mã nguồn thông thường.',
    awsRelevance: 'Phân quyền chuẩn khi triển khai mã nguồn trên máy chủ EC2 Linux.',
    difficulty: 'Cơ bản'
  },
  {
    id: 'fc-linux-2',
    domainId: 'linux_basics',
    term: 'Chmod 600 / 400 cho SSH Key',
    category: 'Linux Basics ⭐',
    definition: 'Chỉ duy nhất chủ sở hữu có quyền đọc (4) hoặc đọc/ghi (6), cấm toàn bộ Group và Others.',
    realWorldUsage: 'BẮT BUỘC cho tệp khóa riêng tư SSH Private Key (`id_rsa` / `key.pem`). Nếu không, SSH client sẽ từ chối kết nối.',
    awsRelevance: 'Lệnh đầu tiên phải chạy sau khi tải file `.pem` từ AWS EC2 Key Pairs.',
    difficulty: 'Cơ bản'
  },
  {
    id: 'fc-linux-3',
    domainId: 'linux_basics',
    term: 'Systemd Service Lifecycle',
    category: 'Linux Basics ⭐',
    definition: 'Hệ thống quản lý dịch vụ nền trên Linux: `start` (chạy), `stop` (dừng), `restart` (khởi động lại), `enable` (tự chạy khi mở máy), `status` (kiểm tra).',
    realWorldUsage: 'Quản lý Nginx, Docker, PostgreSQL hoặc các ứng dụng web backend tùy biến.',
    awsRelevance: 'Viết file dịch vụ `.service` trong EC2 User Data script.',
    difficulty: 'Trung bình'
  },

  // --- DOMAIN 5: WEB & APP BASICS ---
  {
    id: 'fc-web-1',
    domainId: 'web_application',
    term: 'Reverse Proxy',
    category: 'Web & App Basics',
    definition: 'Máy chủ đón đầu nhận yêu cầu từ Internet và chuyển tiếp an toàn vào các ứng dụng Backend nội bộ.',
    realWorldUsage: 'Nginx làm Reverse Proxy: Xử lý SSL Termination, cân bằng tải, nén Gzip và ẩn IP máy chủ Backend.',
    awsRelevance: 'Khái niệm tương đương với AWS Application Load Balancer (ALB) và CloudFront.',
    difficulty: 'Cơ bản'
  },
  {
    id: 'fc-web-2',
    domainId: 'web_application',
    term: 'ACID Properties in RDBMS',
    category: 'Web & App Basics',
    definition: '4 đặc tính vàng của Cơ sở dữ liệu Quan hệ: Atomicity (Nguyên tử), Consistency (Nhất quán), Isolation (Cô lập), Durability (Bền vững).',
    realWorldUsage: 'Đảm bảo giao dịch ngân hàng hoặc đặt hàng không bao giờ bị sai lệch số liệu kể cả khi mất điện đột ngột.',
    awsRelevance: 'Amazon RDS (PostgreSQL/MySQL) và Amazon Aurora hỗ trợ đầy đủ ACID.',
    difficulty: 'Trung bình'
  },

  // --- DOMAIN 6: SECURITY BASICS ---
  {
    id: 'fc-sec-1',
    domainId: 'security_basics',
    term: 'AuthN vs AuthZ',
    category: 'Security Basics',
    definition: 'Authentication (AuthN - Xác thực): "Bạn là ai?". Authorization (AuthZ - Phân quyền): "Bạn được phép làm gì?".',
    realWorldUsage: 'Đăng nhập mật khẩu thành công = AuthN; xem danh sách tài liệu mật = AuthZ.',
    awsRelevance: 'Đăng nhập vào AWS Account là AuthN; phân quyền qua IAM Policy (Allow/Deny) là AuthZ.',
    difficulty: 'Cơ bản'
  },
  {
    id: 'fc-sec-2',
    domainId: 'security_basics',
    term: 'Symmetric vs Asymmetric Encryption',
    category: 'Security Basics',
    definition: 'Đối xứng (AES): Dùng 1 khóa duy nhất, tốc độ siêu nhanh. Bất đối xứng (RSA/ECC): Dùng cặp Public/Private Key, an toàn cho trao đổi khóa qua mạng.',
    realWorldUsage: 'HTTPS kết hợp cả hai: Dùng RSA trong TLS Handshake để trao đổi Session Key, sau đó dùng AES để mã hóa luồng dữ liệu.',
    awsRelevance: 'AWS KMS sử dụng Envelope Encryption kết hợp cả 2 mô hình.',
    difficulty: 'Trung bình'
  },

  // --- DOMAIN 7: CLOUD FUNDAMENTALS ---
  {
    id: 'fc-cloud-1',
    domainId: 'cloud_fundamentals',
    term: 'IaaS vs PaaS vs SaaS',
    category: 'Cloud Fundamentals',
    definition: 'IaaS (Hạ tầng - bạn quản lý OS & App), PaaS (Nền tảng - bạn chỉ quản lý Code & Data), SaaS (Phần mềm hoàn chỉnh - nhà cung cấp quản lý 100%).',
    realWorldUsage: 'AWS EC2 = IaaS; AWS Elastic Beanstalk = PaaS; Google Workspace/Office365 = SaaS.',
    awsRelevance: 'Kiến thức nhập môn cốt lõi của kỳ thi AWS Cloud Practitioner CLF-C02.',
    difficulty: 'Cơ bản'
  },
  {
    id: 'fc-cloud-2',
    domainId: 'cloud_fundamentals',
    term: 'Docker Container vs Virtual Machine',
    category: 'Cloud Fundamentals',
    definition: 'VM ảo hóa tầng phần cứng (có Guest OS riêng nặng nề). Container ảo hóa tầng HĐH (dùng chung Linux Kernel của Host qua Namespaces & Cgroups).',
    realWorldUsage: 'Container khởi động trong vài mili-giây, dung lượng vài chục MB, tối ưu tài nguyên tối đa.',
    awsRelevance: 'Nền tảng cho Amazon ECS, AWS Fargate và Amazon EKS Kubernetes.',
    difficulty: 'Trung bình'
  },

  // --- DOMAIN 8: GIT & SCRIPTING ---
  {
    id: 'fc-git-1',
    domainId: 'git_scripting',
    term: 'set -euo pipefail',
    category: 'Git & Scripting',
    definition: 'Strict Mode cho Bash script: `-e` (dừng khi có lỗi), `-u` (dừng khi biến rỗng/chưa khai báo), `-o pipefail` (bắt lỗi trong chuỗi pipe).',
    realWorldUsage: 'Tiêu chuẩn bắt buộc đầu file script để ngăn chặn script chạy tiếp khi dữ liệu bị lỗi trong Production.',
    awsRelevance: 'Sử dụng trong EC2 User Data và CI/CD Pipelines.',
    difficulty: 'Trung bình'
  },
  {
    id: 'fc-git-2',
    domainId: 'git_scripting',
    term: 'Git Merge Conflict',
    category: 'Git & Scripting',
    definition: 'Xung đột xảy ra khi 2 commit cùng sửa đổi một dòng trong cùng một tệp, đòi hỏi lập trình viên phải giải quyết thủ công.',
    realWorldUsage: 'Git đánh dấu bằng `<<<<<<<`, `=======`, `>>>>>>>` để người dùng chọn mã nguồn chính xác trước khi hoàn tất merge.',
    awsRelevance: 'Kỹ năng làm việc nhóm hàng ngày trên GitHub / AWS CodeCommit.',
    difficulty: 'Cơ bản'
  }
];
