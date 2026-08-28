import { FundamentalStudyPlanWeek } from '../../types/fundamentals';

export const FUNDAMENTAL_STUDY_PLAN_4_WEEKS: FundamentalStudyPlanWeek[] = [
  {
    weekNumber: 1,
    theme: 'Tuần 1: Kiến Trúc Máy Tính, Dòng Lệnh & Nền Tảng Linux ⭐',
    domainIds: ['computer_fundamentals', 'linux_basics'],
    goals: [
      'Hiểu kiến trúc OS, Kernel vs User Space, Virtual Memory & Swap',
      'Làm chủ 30+ lệnh Linux CLI cơ bản và điều hướng cây thư mục',
      'Thành thạo hệ thống phân quyền tệp bát phân (755, 644, 600) và SSH Key'
    ],
    suggestedHours: 12,
    dailyTasks: [
      { day: 'Thứ 2', title: 'Học kiến trúc OS, Kernel Ring 0/Ring 3 và Luồng I/O Streams (stdin/stdout/stderr/pipe)', type: 'theory', duration: '2h' },
      { day: 'Thứ 3', title: 'Thực hành các lệnh điều hướng Linux (cd, ls, cp, mv, rm, tar, grep, find)', type: 'hands_on', duration: '2.5h' },
      { day: 'Thứ 4', title: 'Học phân quyền bát phân chmod/chown, Sudoers và tạo User mới', type: 'theory', duration: '2h' },
      { day: 'Thứ 5', title: 'Tạo cặp khóa SSH Ed25519, cấu hình authorized_keys và SSH Config', type: 'hands_on', duration: '2h' },
      { day: 'Thứ 6', title: 'Quản trị tiến trình & dịch vụ với top, htop, kill, systemctl, journalctl', type: 'hands_on', duration: '2h' },
      { day: 'Thứ 7', title: 'Thực hành Dự án 1: Linux Server Hardening & Nginx Reverse Proxy', type: 'lab', duration: '3h' },
      { day: 'Chủ Nhật', title: 'Ôn tập Flashcards & Làm Quiz Kiểm Tra Tuần 1', type: 'quiz', duration: '1.5h' }
    ]
  },
  {
    weekNumber: 2,
    theme: 'Tuần 2: Chinh Phục Networking ⭐ & Vòng Đời Internet',
    domainIds: ['internet_fundamentals', 'networking_basics'],
    goals: [
      'Nắm vững địa chỉ IPv4/IPv6 và 3 dải Private IP chuẩn RFC 1918',
      'Thành thạo tính toán Subnetting CIDR và quy tắc 5 IP dành riêng AWS',
      'Hiểu sâu TCP 3-Way Handshake, DNS Resolution, NAT và Stateful vs Stateless Firewall'
    ],
    suggestedHours: 15,
    dailyTasks: [
      { day: 'Thứ 2', title: 'Vòng đời phân giải DNS (Root -> TLD -> Authoritative) và các bản ghi A, CNAME, MX, TXT', type: 'theory', duration: '2h' },
      { day: 'Thứ 3', title: 'Giải phẫu HTTP/HTTPS, mã trạng thái (2xx, 3xx, 4xx, 5xx) và TLS 1.3 Handshake', type: 'theory', duration: '2h' },
      { day: 'Thứ 4', title: 'Địa chỉ IP RFC 1918, bảng tính nhẩm CIDR Subnetting (/16, /24, /28) & 5 IP AWS', type: 'theory', duration: '2.5h' },
      { day: 'Thứ 5', title: 'Giao thức TCP Handshake vs UDP, Ports & Services (22, 80, 443, 3306, 5432)', type: 'theory', duration: '2h' },
      { day: 'Thứ 6', title: 'Cơ chế định tuyến Default Route 0.0.0.0/0, SNAT/DNAT và Stateful vs Stateless Firewall', type: 'theory', duration: '2.5h' },
      { day: 'Thứ 7', title: 'Thực hành Dự án 2: Mô phỏng Mạng Doanh Nghiệp Multi-Subnet với NAT & iptables', type: 'lab', duration: '3h' },
      { day: 'Chủ Nhật', title: 'Chơi Game Subnet Master & Luyện Đề Quiz Networking', type: 'quiz', duration: '2h' }
    ]
  },
  {
    weekNumber: 3,
    theme: 'Tuần 3: Kiến Trúc Web, Cơ Sở Dữ Liệu & Bảo Mật Hệ Thống',
    domainIds: ['web_application', 'security_basics'],
    goals: [
      'Nắm vững kiến trúc Nginx Reverse Proxy, thuật toán Cân bằng tải và RESTful API',
      'Phân biệt bản chất SQL (ACID) vs NoSQL (BASE) và mô hình 3-Tier',
      'Làm chủ AuthN vs AuthZ, cấu trúc JWT, Mã hóa AES/RSA và Hạ tầng chứng chỉ PKI'
    ],
    suggestedHours: 14,
    dailyTasks: [
      { day: 'Thứ 2', title: 'Cấu hình Nginx Web Server, Reverse Proxy & Thuật toán Load Balancing', type: 'hands_on', duration: '2.5h' },
      { day: 'Thứ 3', title: 'Kiến trúc RESTful API, JSON Payload và Stateless Backend', type: 'theory', duration: '2h' },
      { day: 'Thứ 4', title: 'Cơ sở dữ liệu RDBMS (ACID) vs NoSQL (BASE), Indexing và Read Replicas', type: 'theory', duration: '2h' },
      { day: 'Thứ 5', title: 'Bảo mật: Phân biệt AuthN (401) vs AuthZ (403), Token JWT & OAuth 2.0', type: 'theory', duration: '2h' },
      { day: 'Thứ 6', title: 'Mật mã học: Mã hóa đối xứng AES vs Bất đối xứng RSA, Hashing bcrypt & SSL/TLS PKI', type: 'theory', duration: '2.5h' },
      { day: 'Thứ 7', title: 'Thực hành Lab Nginx SSL Certbot & API CRUD Database', type: 'lab', duration: '3h' },
      { day: 'Chủ Nhật', title: 'Luyện Đề Quiz Web & Security', type: 'quiz', duration: '1.5h' }
    ]
  },
  {
    weekNumber: 4,
    theme: 'Tuần 4: Đám Mây Đột Phá, Docker Container & Tự Động Hóa Scripting',
    domainIds: ['cloud_fundamentals', 'git_scripting'],
    goals: [
      'Phân biệt IaaS/PaaS/SaaS, Shared Responsibility Model và ảo hóa Hypervisor vs Container',
      'Làm chủ Dockerfile Multi-stage build và điều phối Docker Compose',
      'Viết script Bash/Python tự động hóa và làm quen CI/CD Pipeline với GitHub Actions'
    ],
    suggestedHours: 16,
    dailyTasks: [
      { day: 'Thứ 2', title: 'Mô hình điện toán đám mây (IaaS, PaaS, SaaS, HA, Scalability, RTO/RPO)', type: 'theory', duration: '2h' },
      { day: 'Thứ 3', title: 'Cơ chế nhân Linux tạo nên Container (Namespaces & Cgroups) và viết Dockerfile tối ưu', type: 'hands_on', duration: '2.5h' },
      { day: 'Thứ 4', title: 'Thực hành Dự án 3: Đóng gói Ứng dụng 3-Tier với Docker Compose', type: 'lab', duration: '3h' },
      { day: 'Thứ 5', title: 'Lập trình Bash an toàn (set -euo pipefail) và Python System Automation', type: 'hands_on', duration: '2.5h' },
      { day: 'Thứ 6', title: 'Thực hành Dự án 4 & 5: Giám sát tự động và GitHub Actions CI/CD Pipeline', type: 'lab', duration: '3h' },
      { day: 'Thứ 7', title: 'Tổng duyệt toàn bộ 60+ câu hỏi Exam Simulator & Đạt Level 6 Cloud-Ready Master', type: 'quiz', duration: '2h' },
      { day: 'Chủ Nhật', title: 'Sẵn sàng 100% bước vào Lộ trình chứng chỉ AWS Cloud Practitioner & SAA-C03!', type: 'theory', duration: '1h' }
    ]
  }
];
