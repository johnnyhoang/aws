export interface FundamentalResource {
  id: string;
  category: 'Cheat Sheets' | 'Interactive Playgrounds' | 'Free Practice Labs' | 'Must-Read Books' | 'Tools & CLI';
  title: string;
  authorOrSource: string;
  badge: string;
  description: string;
  tags: string[];
  urlPlaceholder: string;
}

export const FUNDAMENTAL_RESOURCES: FundamentalResource[] = [
  {
    id: 'res-cheat-linux',
    category: 'Cheat Sheets',
    title: 'Linux Command Line & SysAdmin Cheat Sheet',
    authorOrSource: 'Red Hat & Linux Training',
    badge: 'Phổ Biến Nhất',
    description: 'Bảng tra cứu nhanh hơn 80 lệnh Linux thiết yếu: Điều hướng tệp, phân quyền chmod/chown, quản lý dịch vụ systemd, giám sát CPU/RAM và phím tắt nano/vim.',
    tags: ['Linux', 'CLI', 'SysAdmin', 'Bash'],
    urlPlaceholder: 'https://cheatsheet.site/linux'
  },
  {
    id: 'res-cheat-subnet',
    category: 'Cheat Sheets',
    title: 'IPv4 CIDR Subnetting & AWS VPC Range Quick Matrix',
    authorOrSource: 'Network Specialist Hub',
    badge: 'Trọng Tâm ⭐',
    description: 'Bảng ma trận quy đổi nhanh tiền tố CIDR (/16 đến /32), số lượng địa chỉ IP tổng cộng, số IP khả dụng trong AWS Subnet và dải Subnet Mask tương ứng.',
    tags: ['Networking', 'CIDR', 'Subnetting', 'AWS VPC'],
    urlPlaceholder: 'https://cheatsheet.site/subnetting'
  },
  {
    id: 'res-cheat-git',
    category: 'Cheat Sheets',
    title: 'Git Branching & Conflict Resolution Cheat Sheet',
    authorOrSource: 'GitHub Education',
    badge: 'Cần Thiết',
    description: 'Hướng dẫn trực quan quy trình Git Flow: Tạo branch, stash, rebase, cherry-pick, giải quyết xung đột merge và reset an toàn.',
    tags: ['Git', 'GitHub', 'CI/CD', 'DevOps'],
    urlPlaceholder: 'https://training.github.com'
  },
  {
    id: 'res-play-explainshell',
    category: 'Interactive Playgrounds',
    title: 'ExplainShell - Trình Giải Thích Lệnh Linux Trực Quan',
    authorOrSource: 'ExplainShell.com',
    badge: 'Công Cụ Vàng',
    description: 'Dán bất kỳ câu lệnh Linux phức tạp nào (vd: `tar -czvf backup.tar.gz /var/www`) để xem giải thích chi tiết từng cờ tham số dựa trên man pages chính thức.',
    tags: ['Linux', 'Terminal', 'Interactive'],
    urlPlaceholder: 'https://explainshell.com'
  },
  {
    id: 'res-play-howdns',
    category: 'Interactive Playgrounds',
    title: 'How DNS Works - Truyện Tranh Mô Phỏng Vòng Đời DNS',
    authorOrSource: 'DNSimple',
    badge: 'Trực Quan',
    description: 'Trang web truyện tranh hoạt hình tương tác giải thích cách thức hoạt động của hệ thống tên miền DNS từ trình duyệt đến Authoritative Server.',
    tags: ['DNS', 'Internet', 'Interactive'],
    urlPlaceholder: 'https://howdns.works'
  },
  {
    id: 'res-play-cyberchef',
    category: 'Interactive Playgrounds',
    title: 'CyberChef - Thao Trường Mã Hóa & Giải Mã Bảo Mật',
    authorOrSource: 'GCHQ (UK Intelligence)',
    badge: 'Bảo Mật',
    description: 'Bộ công cụ web đa năng dùng để giải mã Base64, băm SHA-256/MD5, phân tích JWT, kiểm tra chứng chỉ SSL/TLS và chuyển đổi dữ liệu mạng.',
    tags: ['Security', 'Cryptography', 'JWT', 'Certificates'],
    urlPlaceholder: 'https://gchq.github.io/CyberChef'
  },
  {
    id: 'res-lab-bandit',
    category: 'Free Practice Labs',
    title: 'OverTheWire: Bandit (Game Thử Thách Lệnh Linux)',
    authorOrSource: 'OverTheWire Community',
    badge: 'Luyện Lab Miễn Phí',
    description: 'Wargame nổi tiếng nhất dành cho người mới bắt đầu học Linux: Vượt qua 34 level bằng cách tìm mật khẩu giấu trong các file phân quyền, log và socket ẩn.',
    tags: ['Linux', 'Hands-on', 'Wargame', 'Security'],
    urlPlaceholder: 'https://overthewire.org/wargames/bandit'
  },
  {
    id: 'res-lab-sadservers',
    category: 'Free Practice Labs',
    title: 'SadServers - Xử Lý Sự Cố Máy Chủ Linux Thực Tế',
    authorOrSource: 'SadServers.com',
    badge: 'Thực Chiến',
    description: 'Nền tảng cấp máy ảo Linux miễn phí với các sự cố thực tế (Web sập 500, đĩa đầy, cổng bị chặn, dịch vụ treo) để bạn thực hành kỹ năng debug.',
    tags: ['Troubleshooting', 'SysAdmin', 'DevOps'],
    urlPlaceholder: 'https://sadservers.com'
  },
  {
    id: 'res-book-ostep',
    category: 'Must-Read Books',
    title: 'Operating Systems: Three Easy Pieces (OSTEP)',
    authorOrSource: 'Remzi & Andrea Arpaci-Dusseau',
    badge: 'Sách Kinh Điển',
    description: 'Cuốn sách chuẩn quốc tế về Hệ điều hành miễn phí: Giải thích 3 trụ cột cốt lõi Virtualization (CPU/RAM), Concurrency (Threads/Locks), và Persistence (File Systems/RAID).',
    tags: ['OS', 'Computer Science', 'Free Book'],
    urlPlaceholder: 'https://pages.cs.wisc.edu/~remzi/OSTEP'
  }
];
