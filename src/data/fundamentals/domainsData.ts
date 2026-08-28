import { FundamentalDomainInfo, FundamentalTrack } from '../../types/fundamentals';

export interface FundamentalTrackInfo {
  id: FundamentalTrack;
  title: string;
  shortTitle: string;
  icon: string;
  badge: string;
  color: string;
  description: string;
  targetRoles: string[];
  priorityDomains: string[];
}

export const FUNDAMENTAL_TRACKS: Record<FundamentalTrack, FundamentalTrackInfo> = {
  it_infrastructure: {
    id: 'it_infrastructure',
    title: 'Hạ Tầng, Mạng & Quản Trị Hệ Thống (Infrastructure & SysAdmin)',
    shortTitle: 'SysAdmin & Infra',
    icon: 'Server',
    badge: 'Hệ Thống & Mạng',
    color: 'emerald',
    description: 'Tập trung chuyên sâu vào Hệ điều hành Linux, Phân tích mạng máy tính (Networking ⭐), Định tuyến, Tường lửa, Quản trị tiến trình và Bảo mật hệ thống.',
    targetRoles: [
      'Cloud Systems Engineer Intern / Junior',
      'Junior System Administrator (Linux/Unix)',
      'Network Support Specialist',
      'Junior Cloud Operations / DevOps'
    ],
    priorityDomains: ['networking_basics', 'linux_basics', 'security_basics', 'cloud_fundamentals']
  },
  software_fundamentals: {
    id: 'software_fundamentals',
    title: 'Nền Tảng Lập Trình & Ứng Dụng Đám Mây (Software & Web Dev)',
    shortTitle: 'Developer & Web',
    icon: 'Code2',
    badge: 'Ứng Dụng & API',
    color: 'sky',
    description: 'Tập trung vào Kiến trúc Web, Giao thức HTTP/HTTPS, RESTful API, Cơ sở dữ liệu, Đóng gói Container với Docker, Git và Tự động hóa kịch bản Scripting.',
    targetRoles: [
      'Junior Cloud Application Developer',
      'Backend Developer (Node.js/Python/Go)',
      'Junior DevOps / CI-CD Specialist',
      'API & Integration Developer'
    ],
    priorityDomains: ['web_application', 'internet_fundamentals', 'git_scripting', 'cloud_fundamentals']
  }
};

export const FUNDAMENTAL_DOMAINS: FundamentalDomainInfo[] = [
  {
    id: 'computer_fundamentals',
    order: 1,
    title: '1. Computer Fundamentals (Kiến Trúc Máy Tính & HĐH)',
    shortTitle: 'Computer Basics',
    icon: 'Cpu',
    badge: 'Nền Tảng Vật Lý & Logic',
    color: 'sky',
    badgeColor: 'text-sky-400',
    badgeBg: 'bg-sky-500/10',
    badgeBorder: 'border-sky-500/30',
    isPillar: false,
    summary: 'Hiểu bản chất cách phần cứng máy tính và Hệ điều hành (OS) tương tác: CPU, Bộ nhớ RAM vs Swap, Quản lý tiến trình (Process/Thread), Cấu trúc tệp tin và Luồng dữ liệu dòng lệnh (CLI I/O Streams).',
    whyAwsNeedsThis: 'Giúp bạn dễ dàng chọn đúng loại EC2 Instance Type (Compute Optimized `c-family` vs Memory Optimized `r-family`), hiểu sâu về EBS Volume IOPS, dung lượng Swap, và cách định cỡ tài nguyên CPU/RAM trong Amazon ECS.',
    estimatedHours: 8,
    targetRoles: ['All Roles', 'SysAdmin', 'Cloud Engineer'],
    keyTopics: [
      {
        title: 'Kiến trúc Hệ điều hành (OS Architecture)',
        subtopics: ['Kernel Space vs User Space', 'System Calls (syscalls)', 'CPU Ring 0 vs Ring 3', 'Context Switching'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Tiến trình & Luồng (Processes & Threads)',
        subtopics: ['Process Lifecycle (Fork/Exec/Wait)', 'PID (Process ID)', 'Multi-threading vs Multi-processing', 'Deadlocks & Race Conditions'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Bộ nhớ Máy tính (Memory Management)',
        subtopics: ['Virtual Memory & Paging', 'RAM vs Swap space', 'Buffer vs Cache', 'Out of Memory (OOM Killer)'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Hệ thống Tệp & I/O (File Systems & CLI Streams)',
        subtopics: ['Inodes & Superblocks', 'File Descriptors (FD)', 'Standard Streams: stdin (0), stdout (1), stderr (2)', 'Pipes `|` & Redirection `>`, `>>`, `2>&1`'],
        importance: 'Quan trọng'
      }
    ],
    mustKnowConcepts: [
      'Kernel & System Calls',
      'Virtual Memory & Swap File',
      'Process State & OOM Killer',
      'File Descriptors & Inodes',
      'CLI Pipes & Stream Redirection'
    ],
    recommendedResources: [
      {
        title: 'CS50: Introduction to Computer Science (Harvard)',
        author: 'Prof. David J. Malan (Harvard University)',
        type: 'video',
        linkText: 'Xem trên YouTube / edX'
      },
      {
        title: 'Operating Systems: Three Easy Pieces (OSTEP)',
        author: 'Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau',
        type: 'doc',
        linkText: 'Đọc Sách Trực Tuyến Miễn Phí'
      },
      {
        title: 'Crash Course Computer Science',
        author: 'Carrie Anne Philbin (PBS)',
        type: 'video',
        linkText: 'Xem Danh Sách Phát YouTube'
      }
    ],
    handsOnChecklist: [
      'Mở terminal và kiểm tra thông tin CPU: `lscpu` hoặc `cat /proc/cpuinfo`',
      'Kiểm tra tình trạng bộ nhớ RAM và Swap: `free -h` hoặc `vmstat 1`',
      'Thực hành chuyển hướng luồng dữ liệu lỗi và kết quả: `command > output.txt 2>&1`',
      'Ghép nối 3 lệnh qua Pipe: `cat /var/log/syslog | grep error | wc -l`'
    ]
  },
  {
    id: 'internet_fundamentals',
    order: 2,
    title: '2. Internet Fundamentals (Nguyên Lý Vận Hành Internet)',
    shortTitle: 'Internet & Web Protocols',
    icon: 'Globe',
    badge: 'Mạng Toàn Cầu & Giao Thức',
    color: 'cyan',
    badgeColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/30',
    isPillar: false,
    summary: 'Giải mã chính xác điều gì xảy ra khi bạn gõ "https://google.com" vào trình duyệt: Từ Hệ thống Tên miền (DNS), Nhà cung cấp mạng (ISP), Hệ thống Tự trị (BGP Autonomous System), đến Giao thức HTTP/HTTPS.',
    whyAwsNeedsThis: 'Trực tiếp quyết định khả năng cấu hình Amazon Route 53 (DNS Records, Routing Policies), CloudFront CDN (Edge Caching, SSL Termination), và Application Load Balancer (HTTP Headers, Status Codes).',
    estimatedHours: 10,
    targetRoles: ['All Roles', 'Frontend Developer', 'Backend Developer', 'Cloud Engineer'],
    keyTopics: [
      {
        title: 'Hạ Tầng Internet & Nhà Mạng (Internet Infrastructure)',
        subtopics: ['Cáp quang biển & Internet Exchange Points (IXP)', 'Hệ thống Tự trị (Autonomous Systems - AS)', 'Giao thức định tuyến BGP', 'Mô hình Client - Server'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Hệ Thống Tên Miền DNS (Domain Name System)',
        subtopics: ['Root Servers, TLD (.com, .org), Authoritative Name Servers', 'DNS Recursive Resolver', 'Các bản ghi DNS: A, AAAA, CNAME, MX, TXT, NS, SOA', 'TTL (Time to Live) & DNS Caching'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Giao Thức HTTP & HTTPS (Web Protocols)',
        subtopics: ['HTTP Request/Response Anatomy (Headers, Body)', 'HTTP Methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS', 'HTTP Status Codes (200, 301, 302, 400, 401, 403, 404, 500, 502, 503, 504)', 'HTTP/1.1 vs HTTP/2 (Multiplexing) vs HTTP/3 (QUIC)'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Quản Lý Trạng Thái & Trình Duyệt (State & Caching)',
        subtopics: ['Stateless Protocol bản chất của HTTP', 'Cookies, LocalStorage & Session Storage', 'Cache-Control, ETag, CDN Edge Caching'],
        importance: 'Quan trọng'
      }
    ],
    mustKnowConcepts: [
      'Trình tự tra cứu DNS Resolver -> Root -> TLD -> Authoritative',
      'Ý nghĩa các bản ghi DNS (A, CNAME, MX, TXT)',
      'HTTP Status Codes 2xx, 3xx, 4xx, 5xx',
      'HTTP Headers (Host, Authorization, Cache-Control, User-Agent)',
      'BGP Routing & CDN Edge Locations'
    ],
    recommendedResources: [
      {
        title: 'How the Internet Works in 5 Minutes',
        author: 'Aaron Titus',
        type: 'video',
        linkText: 'Xem Video Trực Quan'
      },
      {
        title: 'How DNS Works (Comic Tutorial)',
        author: 'DNSimple',
        type: 'interactive',
        linkText: 'Truy cập HowDNS.works'
      },
      {
        title: 'HTTP: The Definitive Guide / MDN Web Docs',
        author: 'Mozilla Developer Network',
        type: 'doc',
        linkText: 'Đọc Tài liệu MDN HTTP'
      }
    ],
    handsOnChecklist: [
      'Tra cứu chi tiết bản ghi DNS của một tên miền bằng lệnh: `dig google.com ANY` hoặc `nslookup`',
      'Kiểm tra đường đi gói tin qua các ISP trung gian bằng lệnh: `traceroute` hoặc `tracert`',
      'Gửi yêu cầu HTTP và xem toàn bộ Headers phản hồi: `curl -I https://aws.amazon.com`',
      'Phân tích Network Tab trong Chrome DevTools để xem Waterfall, TTFB và Status Code'
    ]
  },
  {
    id: 'networking_basics',
    order: 3,
    title: '3. Networking ⭐ (Mạng Máy Tính & Kiến Trúc VPC)',
    shortTitle: 'Networking ⭐',
    icon: 'Network',
    badge: 'Trọng Tâm Cốt Lõi ⭐',
    color: 'emerald',
    badgeColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/30',
    isPillar: true,
    summary: 'Trụ cột quan trọng số 1 khi học Đám mây! Nắm vững Địa chỉ IP (Public/Private RFC 1918), Tính toán Subnetting với CIDR, Bảng định tuyến (Routing Tables), Giao thức TCP/UDP, Các Cổng (Ports), NAT và Tường lửa (Firewall).',
    whyAwsNeedsThis: '100% bắt buộc để hiểu Amazon VPC, Public/Private Subnets, Internet Gateway (IGW), NAT Gateway, Route Tables, Security Groups (Stateful) và Network ACLs (Stateless). Không vững Network sẽ không thể học AWS!',
    estimatedHours: 16,
    targetRoles: ['All Roles', 'Cloud Architect', 'DevOps Engineer', 'SysAdmin'],
    keyTopics: [
      {
        title: 'Địa Chỉ IP & Dải Mạng Riêng (IP Addressing & RFC 1918)',
        subtopics: ['Cấu trúc IPv4 (32-bit, 4 Octets) vs IPv6 (128-bit)', 'Public IP (Công cộng) vs Private IP (Nội bộ)', '3 Dải Private IP chuẩn RFC 1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)', 'Loopback Address (127.0.0.1) & Link-Local (169.254.0.0/16)'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Kỹ Thuật Chia Mạng Con CIDR & Subnetting (Subnetting Mastery)',
        subtopics: ['Ký hiệu CIDR (/16, /24, /28...)', 'Cách tính Số lượng Host khả dụng: 2^(32 - prefix) - 2', 'Quy tắc 5 IP đặc biệt AWS luôn dành riêng trong mỗi Subnet (.0, .1, .2, .3, .255)', 'Network Address vs Broadcast Address'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Tầng Vận Chuyển: TCP vs UDP (Transport Layer)',
        subtopics: ['TCP 3-Way Handshake (SYN -> SYN-ACK -> ACK)', 'TCP 4-Way Handshake kết thúc phiên (FIN/ACK)', 'TCP Flow Control & Windowing', 'UDP: Giao thức phi kết nối (Connectionless, Low Latency)'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Cổng (Ports) & Dịch Vụ Mạng Cốt Lõi',
        subtopics: ['Well-known Ports (0 - 1023), Registered Ports, Ephemeral Ports (1024 - 65535)', 'Port 22 (SSH), Port 80 (HTTP), Port 443 (HTTPS), Port 53 (DNS)', 'Port 3306 (MySQL), Port 5432 (Postgres), Port 6379 (Redis), Port 3389 (RDP)'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Định Tuyến & NAT (Routing & Address Translation)',
        subtopics: ['Bảng định tuyến (Routing Table), Default Gateway (0.0.0.0/0), Next-Hop', 'Cơ chế Source NAT (SNAT) vs Destination NAT (DNAT)', 'PAT (Port Address Translation / NAT Overload)', 'Tường lửa Stateful (Security Group) vs Stateless (NACL)'],
        importance: 'Cốt lõi'
      }
    ],
    mustKnowConcepts: [
      'Bảng tính nhẩm Subnetting /16 (65,536 IPs), /24 (256 IPs), /28 (16 IPs)',
      'Công thức tính Host khả dụng & 5 IP dành riêng của AWS',
      'Quá trình TCP 3-Way Handshake (SYN, SYN-ACK, ACK)',
      'Cơ chế hoạt động của Default Route 0.0.0.0/0',
      'Sự khác nhau bản chất giữa Stateful Firewall và Stateless Firewall'
    ],
    recommendedResources: [
      {
        title: 'Networking Fundamentals Course',
        author: 'NetworkChuck (YouTube)',
        type: 'video',
        linkText: 'Xem Series Networking của NetworkChuck'
      },
      {
        title: 'IP Subnetting - Practical Guide',
        author: 'Professor Messer / Ben Eater',
        type: 'video',
        linkText: 'Học Subnetting Trực Quan'
      },
      {
        title: 'Computer Networking: A Top-Down Approach',
        author: 'Kurose & Ross',
        type: 'doc',
        linkText: 'Giáo trình Mạng Chuẩn Quốc Tế'
      }
    ],
    handsOnChecklist: [
      'Chia dải mạng 10.0.0.0/16 thành 4 Subnet /24 cho 2 Availability Zones (2 Public, 2 Private)',
      'Sử dụng lệnh `netstat -tulpn` hoặc `ss -tulpn` để xem danh sách các cổng đang mở và tiến trình lắng nghe',
      'Kiểm tra bắt tay TCP và kiểm tra cổng từ xa bằng lệnh: `nc -zv target-server.com 443` hoặc `telnet`',
      'Xem bảng định tuyến hiện tại trên máy chủ: `ip route show` hoặc `route -n`'
    ]
  },
  {
    id: 'linux_basics',
    order: 4,
    title: '4. Linux Basics ⭐ (Hệ Điều Hành Linux & Quản Trị Máy Chủ)',
    shortTitle: 'Linux Basics ⭐',
    icon: 'Terminal',
    badge: 'Trọng Tâm Thực Hành ⭐',
    color: 'amber',
    badgeColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/30',
    isPillar: true,
    summary: 'Hơn 90% máy chủ đám mây chạy trên Linux! Nắm vững kỹ năng thao tác dòng lệnh (CLI), Cây thư mục Linux, Phân quyền tệp tin (`chmod`/`chown`), Quản trị tiến trình & dịch vụ nền (`systemd`), và Kết nối SSH bảo mật.',
    whyAwsNeedsThis: 'Nền tảng trực tiếp để vận hành máy chủ ảo Amazon EC2 (Amazon Linux / Ubuntu), cấu hình User Data bootstrap script, debug sự cố container trong Amazon ECS/EKS, và thiết lập quyền truy cập bảo mật qua SSH Key Pairs.',
    estimatedHours: 14,
    targetRoles: ['All Roles', 'SysAdmin', 'DevOps Engineer', 'Backend Developer'],
    keyTopics: [
      {
        title: 'Cây Thư Mục & Lệnh Điều Hướng (Linux Directory Tree & CLI)',
        subtopics: ['Quy chuẩn FHS: `/`, `/etc`, `/var`, `/home`, `/usr`, `/tmp`, `/bin`', 'Các lệnh tệp: `ls -la`, `cd`, `pwd`, `cp`, `mv`, `rm -rf`, `mkdir -p`', 'Xem & Tìm kiếm: `cat`, `less`, `head`, `tail -f`, `grep -rn`, `find / -name`', 'Nén & Giải nén: `tar -czvf`, `tar -xzvf`, `zip/unzip`'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Phân Quyền Tệp Tin & Người Dùng (File Permissions & Ownership)',
        subtopics: ['User (u), Group (g), Others (o) và Quyền Read (4), Write (2), Execute (1)', 'Lệnh `chmod 755`, `chmod 600`, `chmod 644` và ý nghĩa bảo mật', 'Lệnh `chown` đổi chủ sở hữu và `chgrp` đổi nhóm', 'Quyền đặc biệt: SUID, SGID, Sticky Bit (`/tmp`)', 'Quyền quản trị viên tối cao: `sudo`, cấu hình `/etc/sudoers`'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Quản Trị Tiến Trình & Dịch Vụ (Process & Service Management)',
        subtopics: ['Xem tiến trình: `ps aux`, `top`, `htop`, cây tiến trình `pstree`', 'Điều khiển tiến trình: `kill <PID>`, `kill -9` (SIGKILL), `kill -15` (SIGTERM)', 'Tiến trình nền (Background `&`, `nohup`, `screen`, `tmux`)', 'Quản lý dịch vụ với Systemd: `systemctl start/stop/restart/enable/status`', 'Xem nhật ký hệ thống: `journalctl -u nginx.service -f`', 'Lập lịch tự động với Crontab (`crontab -e`)'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Xác Thực & Kết Nối Từ Xa Qua SSH (SSH & Secure Remote Access)',
        subtopics: ['Cặp khóa SSH: Khóa riêng tư Private Key (`id_rsa` / `id_ed25519`) vs Khóa công khai Public Key', 'File cấu hình máy chủ: `~/.ssh/authorized_keys` và quyền bắt buộc `chmod 600`', 'Cấu hình file `~/.ssh/config` kết nối tiện lợi không cần gõ IP dài', 'Kỹ thuật SSH Port Forwarding / Tunneling (Local `-L`, Remote `-R`)', 'Truyền tệp an toàn: `scp`, `rsync -avzP`'],
        importance: 'Cốt lõi'
      }
    ],
    mustKnowConcepts: [
      'Quy tắc nhẩm phân quyền: 755 (rwxr-xr-x), 644 (rw-r--r--), 600 (rw------- cho SSH Key)',
      'Sự khác nhau giữa SIGTERM (15 - Graceful Shutdown) và SIGKILL (9 - Ép buộc tắt ngay)',
      'Cơ chế SSH Key Pair: Đặt Public Key trên Server, giữ Private Key bảo mật trên máy cá nhân',
      'Bộ 4 lệnh điều khiển dịch vụ systemd: start, enable, restart, status',
      'Lệnh theo dõi log thời gian thực: `tail -f /var/log/nginx/error.log`'
    ],
    recommendedResources: [
      {
        title: 'Linux for Beginners Full Course',
        author: 'freeCodeCamp (YouTube)',
        type: 'video',
        linkText: 'Xem Khóa Học Linux Toàn Diện'
      },
      {
        title: 'The Linux Command Line (William Shotts)',
        author: 'William Shotts (LinuxCommand.org)',
        type: 'doc',
        linkText: 'Đọc Sách Miễn Phí (PDF)'
      },
      {
        title: 'OverTheWire: Bandit (Wargame luyện lệnh Linux)',
        author: 'OverTheWire Community',
        type: 'interactive',
        linkText: 'Chơi Game Thử Thách Bandit'
      }
    ],
    handsOnChecklist: [
      'Tạo một cặp khóa SSH mới trên máy tính: `ssh-keygen -t ed25519 -C "my-key"`',
      'Tạo một user mới, thêm vào nhóm `sudo` và thiết lập khóa SSH trong `.ssh/authorized_keys`',
      'Tạo một Custom Systemd Service tự khởi động kịch bản Python hoặc Node.js khi khởi động máy',
      'Tạo một Cron job tự động sao lưu thư mục `/var/www/html` vào 2 giờ sáng mỗi ngày'
    ]
  },
  {
    id: 'web_application',
    order: 5,
    title: '5. Web & Application Basics (Kiến Trúc Web, API & Cơ Sở Dữ Liệu)',
    shortTitle: 'Web & App Basics',
    icon: 'Layout',
    badge: 'Ứng Dụng & CSDL',
    color: 'violet',
    badgeColor: 'text-violet-400',
    badgeBg: 'bg-violet-500/10',
    badgeBorder: 'border-violet-500/30',
    isPillar: false,
    summary: 'Hiểu toàn cảnh kiến trúc ứng dụng hiện đại: Máy chủ Web (Nginx/Apache), Cân bằng tải (Load Balancers), Kiến trúc API (RESTful/JSON), Cơ sở dữ liệu Quan hệ SQL (ACID) vs Phi quan hệ NoSQL (BASE), và Mô hình 3 Lớp (3-Tier Architecture).',
    whyAwsNeedsThis: 'Giúp bạn dễ dàng nắm bắt kiến trúc AWS 3-Tier Web App (CloudFront -> ALB -> EC2 Auto Scaling -> Amazon RDS / Aurora Multi-AZ), cấu hình API Gateway và thiết kế Amazon DynamoDB NoSQL.',
    estimatedHours: 12,
    targetRoles: ['All Roles', 'Software Developer', 'Solutions Architect', 'Fullstack Engineer'],
    keyTopics: [
      {
        title: 'Máy Chủ Web & Proxy Ngược (Web Servers & Reverse Proxies)',
        subtopics: ['Web Server phục vụ Static Files vs App Server (Gunicorn, Node.js, Tomcat)', 'Khái niệm Reverse Proxy (Nginx) & Lợi ích: Security, Caching, SSL Termination', 'Thuật toán Cân bằng tải (Load Balancing): Round Robin, Least Connections, IP Hash', 'Health Checks: Cơ chế kiểm tra tình trạng sống/chết của máy chủ backend'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Kiến Trúc API & Trao Đổi Dữ Liệu (APIs & Data Formats)',
        subtopics: ['Nguyên tắc thiết kế RESTful API (Resource-oriented, URI conventions)', 'Định dạng dữ liệu JSON vs XML', 'Cơ chế xác thực API: API Keys, Bearer Token, OAuth 2.0', 'Khái niệm Webhooks, WebSockets (Giao tiếp 2 chiều thời gian thực) và gRPC'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Cơ Sở Dữ Liệu: SQL vs NoSQL (Databases)',
        subtopics: ['Cơ sở dữ liệu Quan hệ SQL (PostgreSQL, MySQL): Cấu trúc bảng, Khóa ngoại, Tính chất ACID', 'Cơ sở dữ liệu Phi quan hệ NoSQL (MongoDB, DynamoDB, Redis): Document, Key-Value', 'Chỉ mục (Indexes) và tác động đến hiệu năng truy vấn', 'Cơ chế Connection Pooling, Read Replicas (Bản sao đọc) và Multi-AZ Failover'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Mô Hình Kiến Trúc Hệ Thống (Architecture Patterns)',
        subtopics: ['Kiến trúc Đơn khối (Monolith) vs Kiến trúc Vi dịch vụ (Microservices)', 'Mô hình 3 Lớp kinh điển (Presentation -> Application -> Database Tier)', 'Stateless vs Stateful Backend Services (Lưu Session trong Redis/ElastiCache)'],
        importance: 'Quan trọng'
      }
    ],
    mustKnowConcepts: [
      'Vai trò của Reverse Proxy Nginx đứng trước Backend Node/Python',
      'Tính chất ACID trong RDBMS (Atomicity, Consistency, Isolation, Durability)',
      'Sự khác nhau cơ bản giữa SQL Scaling (Vertical) và NoSQL Scaling (Horizontal)',
      'Mô hình 3-Tier: Đặt Web/ALB ở Public Subnet, App Server & DB ở Private Subnets',
      'Các thuật toán cân bằng tải Round Robin và Least Connections'
    ],
    recommendedResources: [
      {
        title: 'Backend Engineering Course (Hussein Nasser)',
        author: 'Hussein Nasser (YouTube)',
        type: 'video',
        linkText: 'Xem Series Backend & Networking'
      },
      {
        title: 'Designing Data-Intensive Applications',
        author: 'Martin Kleppmann',
        type: 'doc',
        linkText: 'Sách Gối Đầu Giường Cho Kỹ Sư Hệ Thống'
      },
      {
        title: 'RESTful API Design Best Practices',
        author: 'Microsoft REST API Guidelines',
        type: 'doc',
        linkText: 'Đọc Tiêu Chuẩn Thiết Kế API'
      }
    ],
    handsOnChecklist: [
      'Cài đặt Nginx trên Linux và cấu hình làm Reverse Proxy chuyển tiếp yêu cầu tới cổng 3000',
      'Cấu hình cân bằng tải Round Robin trong Nginx tới 2 ứng dụng Backend chạy trên 2 cổng khác nhau',
      'Viết một API RESTful đơn giản bằng Node.js Express hoặc Python FastAPI xử lý CRUD cơ bản',
      'Thực hành kết nối cơ sở dữ liệu PostgreSQL/MySQL và tạo bảng, Index'
    ]
  },
  {
    id: 'security_basics',
    order: 6,
    title: '6. Security Basics (Bảo Mật Hệ Thống, Mã Hóa & Chứng Chỉ SSL)',
    shortTitle: 'Security Basics',
    icon: 'ShieldCheck',
    badge: 'An Ninh & Mã Hóa',
    color: 'rose',
    badgeColor: 'text-rose-400',
    badgeBg: 'bg-rose-500/10',
    badgeBorder: 'border-rose-500/30',
    isPillar: false,
    summary: 'Bảo mật là ưu tiên số 1 trên Đám mây! Nắm vững Phân biệt Xác thực (Authentication) vs Phân quyền (Authorization), Chuẩn OAuth 2.0 / JWT, Mã hóa đối xứng vs bất đối xứng, Băm mật khẩu (Hashing) và Chứng chỉ số TLS/SSL (PKI).',
    whyAwsNeedsThis: 'Trực tiếp cấu hình AWS Identity and Access Management (IAM Policies, Roles, MFA), mã hóa dữ liệu với AWS Key Management Service (KMS), và cấp phát chứng chỉ số miễn phí với AWS Certificate Manager (ACM).',
    estimatedHours: 10,
    targetRoles: ['All Roles', 'Security Engineer', 'Cloud Engineer', 'DevOps'],
    keyTopics: [
      {
        title: 'Xác Thực vs Phân Quyền (AuthN vs AuthZ)',
        subtopics: ['Authentication (Bạn là ai?) vs Authorization (Bạn được phép làm gì?)', 'Mã lỗi HTTP: 401 Unauthorized (Chưa xác thực) vs 403 Forbidden (Không đủ quyền)', 'Xác thực đa yếu tố (MFA / 2FA: TOTP, Security Keys)', 'Nguyên tắc đặc quyền tối thiểu (Principle of Least Privilege)'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Tiêu Chuẩn Định Danh Hiện Đại (Modern Identity & Tokens)',
        subtopics: ['Cấu trúc JWT (JSON Web Token): Header.Payload.Signature', 'Cơ chế hoạt động OAuth 2.0 (Authorization Code Grant, Access Token, Refresh Token)', 'OpenID Connect (OIDC) cho xác thực SSO', 'Session Cookies vs Token-based Authentication'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Mật Mã Học Nền Tảng (Cryptography & Hashing)',
        subtopics: ['Mã hóa Đối xứng (Symmetric Encryption - AES-256): 1 Khóa duy nhất dùng cho cả mã hóa & giải mã', 'Mã hóa Bất đối xứng (Asymmetric Encryption - RSA, ECC): Khóa công khai mã hóa, Khóa riêng tư giải mã', 'Hàm băm 1 chiều (Hashing): SHA-256, MD5 (không còn an toàn)', 'Băm mật khẩu an toàn với Salt: bcrypt, Argon2'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Chứng Chỉ Số & PKI (TLS/SSL Certificates & PKI)',
        subtopics: ['Hạ tầng khóa công khai (Public Key Infrastructure - PKI)', 'Tổ chức cấp chứng chỉ (Certificate Authorities - CAs) & Chuỗi tin cậy (Chain of Trust)', 'Quá trình TLS 1.3 Handshake (Trao đổi khóa Diffie-Hellman)', 'Tạo chứng chỉ miễn phí tự động với Let\'s Encrypt & Certbot'],
        importance: 'Cốt lõi'
      }
    ],
    mustKnowConcepts: [
      'Phân biệt rõ ràng AuthN (401) và AuthZ (403)',
      'Cấu trúc 3 phần của JWT và cách xác minh chữ ký điện tử',
      'Sự khác nhau giữa Mã hóa (Encryption - có thể giải mã) và Băm (Hashing - 1 chiều)',
      'Mô hình mã hóa đối xứng AES (nhanh, dùng mã hóa dữ liệu lớn) vs RSA (dùng trao đổi khóa ban đầu)',
      'Quy trình xác thực chuỗi chứng chỉ số SSL/TLS của trình duyệt'
    ],
    recommendedResources: [
      {
        title: 'Cryptography and Network Security',
        author: 'Computerphile (YouTube)',
        type: 'video',
        linkText: 'Xem Series Mật Mã Học Trực Quan'
      },
      {
        title: 'JWT.io - Interactive Debugger',
        author: 'Auth0',
        type: 'interactive',
        linkText: 'Thử Nghiệm & Giải Mã JWT'
      },
      {
        title: 'SSL/TLS Handshake Explained',
        author: 'Cloudflare Learning Center',
        type: 'doc',
        linkText: 'Đọc Hướng Dẫn SSL của Cloudflare'
      }
    ],
    handsOnChecklist: [
      'Tạo khóa RSA và mã hóa/giải mã thông điệp bằng OpenSSL: `openssl genrsa -out private.pem 2048`',
      'Tạo chữ ký số SHA-256 và xác minh tính toàn vẹn của tệp tải về',
      'Sử dụng Certbot hoặc OpenSSL để tạo Self-Signed SSL Certificate và cài đặt lên Nginx',
      'Giải mã và phân tích một JWT token trên trang jwt.io để xem payload và claims'
    ]
  },
  {
    id: 'cloud_fundamentals',
    order: 7,
    title: '7. Cloud Fundamentals (Mô Hình Điện Toán Đám Mây & Docker)',
    shortTitle: 'Cloud & Docker',
    icon: 'Cloud',
    badge: 'Đám Mây & Container',
    color: 'blue',
    badgeColor: 'text-blue-400',
    badgeBg: 'bg-blue-500/10',
    badgeBorder: 'border-blue-500/30',
    isPillar: false,
    summary: 'Bước chuyển tiếp hoàn hảo sang AWS! Nắm vững các mô hình dịch vụ đám mây (IaaS, PaaS, SaaS), Công nghệ Ảo hóa (Hypervisors) vs Công nghệ Container (Docker), Tính sẵn sàng cao (High Availability) và Tự động mở rộng (Auto Scaling).',
    whyAwsNeedsThis: 'Khái niệm cốt lõi cho kỳ thi AWS Certified Cloud Practitioner (CLF-C02) và Solutions Architect Associate (SAA-C03), làm chủ Amazon Elastic Container Service (ECS), ECR và Fargate.',
    estimatedHours: 12,
    targetRoles: ['All Roles', 'Cloud Engineer', 'DevOps Specialist', 'Software Engineer'],
    keyTopics: [
      {
        title: 'Mô Hình Dịch Vụ & Triển Khai Đám Mây (Cloud Models)',
        subtopics: ['IaaS (Hạ tầng - EC2) vs PaaS (Nền tảng - Elastic Beanstalk) vs SaaS (Phần mềm - Google Workspace)', 'Mô hình triển khai: Public Cloud, Private Cloud, Hybrid Cloud, Multi-Cloud', 'Mô hình trách nhiệm chung (Shared Responsibility Model): Bảo mật CỦA Đám mây vs Bảo mật TRONG Đám mây', 'Lợi ích kinh tế: CapEx (Chi phí đầu tư cố định) -> OpEx (Chi phí vận hành theo mức sử dụng)'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Ảo Hóa vs Đóng Gói Container (Virtualization vs Docker)',
        subtopics: ['Hypervisor Type-1 (Bare-metal: VMware ESXi, KVM, AWS Nitro) vs Type-2 (VirtualBox)', 'Máy ảo VM (chứa đầy đủ Guest OS nặng nề) vs Container (dùng chung Linux Kernel)', 'Cơ chế nhân Linux tạo nên Container: Namespaces (Cách ly) và Cgroups (Giới hạn tài nguyên CPU/RAM)', 'Docker Image (Read-only layers) vs Docker Container (Running instance)'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Làm Chủ Docker Thực Chiến (Docker Mastery)',
        subtopics: ['Viết file đóng gói `Dockerfile`: FROM, RUN, COPY, WORKDIR, EXPOSE, CMD, ENTRYPOINT', 'Kỹ thuật tối ưu dung lượng Image: Multi-stage builds, Alpine base image, `.dockerignore`', 'Lưu trữ dữ liệu bền vững: Docker Volumes vs Bind Mounts', 'Mạng trong Docker: Bridge, Host, Overlay networks', 'Điều phối nhiều container với `docker-compose.yml`'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Khả Năng Mở Rộng & Sẵn Sàng Cao (Scalability & HA)',
        subtopics: ['Mở rộng theo chiều dọc (Vertical Scaling / Scale-Up) vs Mở rộng theo chiều ngang (Horizontal Scaling / Scale-Out)', 'Tính sẵn sàng cao (High Availability - Multi-AZ deployment)', 'Khả năng chịu lỗi (Fault Tolerance) vs Phục hồi thảm họa (Disaster Recovery)', 'Chỉ số phục hồi: RTO (Recovery Time Objective) và RPO (Recovery Point Objective)'],
        importance: 'Quan trọng'
      }
    ],
    mustKnowConcepts: [
      'Phân biệt rạch ròi IaaS (bạn quản lý OS, Runtime, App), PaaS (bạn chỉ quản lý Code & Data), SaaS (nhà cung cấp quản lý tất cả)',
      'Tại sao Container nhẹ hơn và khởi động trong vài giây so với Máy ảo VM (dùng chung Host Kernel)',
      'Cú pháp lệnh Dockerfile tối ưu Multi-Stage Build',
      'Khái niệm RTO (Thời gian cho phép hệ thống offline) và RPO (Lượng dữ liệu tối đa chấp nhận mất)',
      'Mô hình Shared Responsibility Model giữa AWS và Khách hàng'
    ],
    recommendedResources: [
      {
        title: 'Docker for Beginners Tutorial',
        author: 'TechWorld with Nana (YouTube)',
        type: 'video',
        linkText: 'Xem Khóa Học Docker của Nana'
      },
      {
        title: 'Cloud Computing Concepts',
        author: 'University of Illinois (Coursera)',
        type: 'video',
        linkText: 'Khóa Học Điện Toán Đám Mây'
      },
      {
        title: 'Play with Docker (Trình giả lập Docker trên trình duyệt)',
        author: 'Docker Official',
        type: 'interactive',
        linkText: 'Thực Hành Trực Tuyến Miễn Phí'
      }
    ],
    handsOnChecklist: [
      'Viết một `Dockerfile` đóng gói ứng dụng Node.js hoặc Python Web Server',
      'Áp dụng Multi-stage build để giảm kích thước Docker image từ 1GB xuống dưới 100MB',
      'Viết file `docker-compose.yml` khởi chạy cùng lúc: Nginx + Web App + Cơ sở dữ liệu PostgreSQL với Volume lưu trữ',
      'Thao tác lệnh kiểm tra: `docker ps`, `docker logs -f`, `docker exec -it <container_id> /bin/sh`'
    ]
  },
  {
    id: 'git_scripting',
    order: 8,
    title: '8. Git & Basic Scripting (Quản Lý Mã Nguồn Git, Bash & Python Scripting)',
    shortTitle: 'Git & Scripting',
    icon: 'GitBranch',
    badge: 'Tự Động Hóa & Mã Nguồn',
    color: 'teal',
    badgeColor: 'text-teal-400',
    badgeBg: 'bg-teal-500/10',
    badgeBorder: 'border-teal-500/30',
    isPillar: false,
    summary: 'Công cụ làm việc hàng ngày của mọi kỹ sư Cloud & DevOps! Làm chủ Quản lý mã nguồn với Git (Branching, Merge Conflict, PR), Lập trình kịch bản Bash Shell tự động hóa quản trị hệ thống, và Python Scripting gọi REST API.',
    whyAwsNeedsThis: 'Nền tảng để học Infrastructure as Code (Terraform, AWS CloudFormation, AWS CDK), viết mã tự động hóa cho AWS Lambda (Python / Node.js), và xây dựng CI/CD Pipeline trên GitHub Actions / AWS CodePipeline.',
    estimatedHours: 12,
    targetRoles: ['All Roles', 'DevOps Engineer', 'Cloud Developer', 'Automation QA'],
    keyTopics: [
      {
        title: 'Quản Lý Phiên Bản Với Git (Git Version Control)',
        subtopics: ['3 Trạng thái trong Git: Working Directory -> Staging Area -> Git Repository', 'Các lệnh cốt lõi: `git init`, `git clone`, `git add`, `git commit -m`, `git push`, `git pull`', 'Làm việc với nhánh: `git branch`, `git checkout -b`, `git switch`, `git merge`', 'Giải quyết xung đột mã nguồn (Merge Conflicts)', 'Quy trình cộng tác nhóm: Fork, Branching Strategy (GitFlow/Trunk-based), Pull Request (PR) & Code Review'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Lập Trình Kịch Bản Bash Shell (Bash Shell Scripting)',
        subtopics: ['Dòng khai báo Shebang `#!/bin/bash` và cấp quyền thực thi `chmod +x script.sh`', 'Biến (Variables), Tham số truyền vào (`$1`, `$2`, `$#`, `$@`), Mã thoát (`$?`)', 'Cấu trúc điều khiển: `if [ condition ]; then ... fi`, `case ... esac`', 'Vòng lặp: `for item in ...`, `while read line; do ... done`', 'Hàm (Functions), Bẫy lỗi `set -e`, `set -u`, `set -o pipefail`', 'Tự động hóa tác vụ: Kiểm tra dung lượng đĩa, sao lưu tệp, gửi cảnh báo'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Python Cơ Bản Cho Tự Động Hóa (Python for Cloud Automation)',
        subtopics: ['Cú pháp cơ bản, Kiểu dữ liệu (List, Dict, Tuple, Set), Vòng lặp & Hàm', 'Đọc / Ghi tệp tin hệ thống và Xử lý tệp JSON (`import json`)', 'Tương tác Hệ điều hành với thư viện `os` và `sys` (`os.environ`, `sys.argv`)', 'Gửi HTTP Request gọi REST API với thư viện `requests` (GET, POST, Headers, Bearer Token)', 'Xử lý ngoại lệ với `try ... except ... finally`'],
        importance: 'Cốt lõi'
      },
      {
        title: 'Nền Tảng CI/CD Tự Động Hóa (CI/CD Pipeline Fundamentals)',
        subtopics: ['Khái niệm Continuous Integration (CI) & Continuous Delivery/Deployment (CD)', 'Cấu trúc file cấu hình GitHub Actions Workflow (`.github/workflows/deploy.yml`)', 'Triggers (`on: push`, `pull_request`), Jobs, Steps, Actions', 'Quản lý biến môi trường bí mật (GitHub Secrets)'],
        importance: 'Quan trọng'
      }
    ],
    mustKnowConcepts: [
      'Ý nghĩa của 3 khu vực Git: Working Tree, Staging Area (Index), Commit History',
      'Cách xử lý khi gặp xung đột Merge Conflict',
      'Mã thoát lệnh `$?`: `0` là thành công, khác `0` là có lỗi xảy ra',
      'Cờ bảo vệ an toàn trong Bash: `set -euo pipefail`',
      'Cách viết script Python kiểm tra định kỳ tình trạng hoạt động (Health Check) của một URL'
    ],
    recommendedResources: [
      {
        title: 'Git and GitHub for Beginners - Crash Course',
        author: 'freeCodeCamp (YouTube)',
        type: 'video',
        linkText: 'Xem Khóa Học Git & GitHub'
      },
      {
        title: 'Bash Scripting Tutorial for Beginners',
        author: 'Kunal Kushwaha (YouTube)',
        type: 'video',
        linkText: 'Xem Series Bash Scripting'
      },
      {
        title: 'Automate the Boring Stuff with Python',
        author: 'Al Sweigart',
        type: 'doc',
        linkText: 'Đọc Sách Python Tự Động Hóa Miễn Phí'
      }
    ],
    handsOnChecklist: [
      'Khởi tạo một Git Repository, tạo 2 branch và giải quyết một tình huống Merge Conflict thủ công',
      'Viết một Bash script tự động kiểm tra dung lượng ổ đĩa (`df -h`), nếu vượt quá 80% thì ghi log cảnh báo',
      'Viết một Python script sử dụng thư viện `requests` để kiểm tra mã trạng thái HTTP của danh sách 5 trang web',
      'Tạo một GitHub Actions workflow tự động chạy kiểm thử khi có commit mới đẩy lên nhánh `main`'
    ]
  }
];
