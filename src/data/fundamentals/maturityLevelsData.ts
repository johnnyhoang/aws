import { FundamentalMaturityLevel } from '../../types/fundamentals';

export const FUNDAMENTAL_MATURITY_LEVELS: FundamentalMaturityLevel[] = [
  {
    level: 1,
    title: 'Người Mới Bắt Đầu',
    titleEn: 'IT Explorer',
    badge: '🌱',
    color: 'slate',
    minXP: 0,
    maxXP: 199,
    maturityDescription: 'Bắt đầu tìm hiểu cách máy tính, hệ điều hành và Internet vận hành ở tầng vật lý & logic.',
    skillsUnlocked: [
      'Hiểu cấu trúc phần cứng & CPU/RAM/Ổ đĩa',
      'Hiểu cơ chế Client - Server cơ bản',
      'Làm quen với cửa sổ dòng lệnh Terminal'
    ]
  },
  {
    level: 2,
    title: 'Học Việc Dòng Lệnh',
    titleEn: 'Terminal Apprentice',
    badge: '⚡',
    color: 'sky',
    minXP: 200,
    maxXP: 499,
    maturityDescription: 'Làm chủ các thao tác CLI cơ bản trên Linux, hiểu cơ chế phân quyền tệp và điều hướng hệ thống.',
    skillsUnlocked: [
      'Sử dụng thành thạo 30+ lệnh Linux cơ bản (cd, ls, grep, find, tar)',
      'Phân quyền tệp tin & thư mục (chmod, chown, rwx)',
      'Hiểu luồng dữ liệu I/O Streams (stdin, stdout, stderr, pipe |)'
    ]
  },
  {
    level: 3,
    title: 'Nhà Thám Hiểm Mạng',
    titleEn: 'Network Navigator',
    badge: '🌐',
    color: 'emerald',
    minXP: 500,
    maxXP: 999,
    maturityDescription: 'Nắm vững nguyên lý địa chỉ IP, phân chia subnet CIDR, bảng định tuyến, TCP/UDP và các cổng dịch vụ.',
    skillsUnlocked: [
      'Tính toán thành thạo Subnetting CIDR (/24, /16, /28)',
      'Hiểu sâu luồng gói tin qua Router, NAT Gateway & Firewall',
      'Phân biệt mô hình TCP 3-Way Handshake vs UDP'
    ]
  },
  {
    level: 4,
    title: 'Chuyên Viên Quản Trị Hệ Thống',
    titleEn: 'SysAdmin Specialist',
    badge: '🐧',
    color: 'indigo',
    minXP: 1000,
    maxXP: 1799,
    maturityDescription: 'Vận hành thành thạo máy chủ Linux, thiết lập dịch vụ Web Server Nginx, quản lý tiến trình systemd và cấu hình SSH bảo mật.',
    skillsUnlocked: [
      'Quản lý tiến trình & dịch vụ hệ thống với systemctl & journalctl',
      'Cấu hình xác thực SSH Key Pairs không cần mật khẩu',
      'Thiết lập Web Server Nginx, Reverse Proxy và SSL Certificate'
    ]
  },
  {
    level: 5,
    title: 'Kỹ Sư DevOps Nền Tảng',
    titleEn: 'DevOps & Cloud Practitioner',
    badge: '🚀',
    color: 'amber',
    minXP: 1800,
    maxXP: 2999,
    maturityDescription: 'Đóng gói ứng dụng vào Docker Container, viết kịch bản Bash/Python tự động hóa và quản lý mã nguồn Git chuyên nghiệp.',
    skillsUnlocked: [
      'Đóng gói Docker Container & điều phối với Docker Compose',
      'Viết kịch bản tự động hóa Bash Shell & Python Scripting',
      'Làm chủ quy trình Git Branching, Pull Request & CI/CD Pipeline'
    ]
  },
  {
    level: 6,
    title: 'Sẵn Sàng Chinh Phục AWS',
    titleEn: 'Cloud-Ready Master',
    badge: '👑',
    color: 'purple',
    minXP: 3000,
    maxXP: 99999,
    maturityDescription: 'Hoàn thành toàn diện kiến thức nền tảng! Bạn đã trang bị đầy đủ tư duy hệ thống để tiếp thu mọi dịch vụ AWS phức tạp.',
    skillsUnlocked: [
      'Tự tin thiết kế VPC đa vùng dựa trên nền tảng Networking vững chắc',
      'Dễ dàng làm chủ AWS EC2, ECS, EKS nhờ gốc Linux & Docker sâu sắc',
      'Nắm vững kiến trúc IAM, KMS, Security Group từ nền tảng Security & PKI'
    ]
  }
];

export function calculateFundamentalLevel(xp: number): {
  level: number;
  title: string;
  titleEn: string;
  badge: string;
  color: string;
  currentXP: number;
  currentLevelMinXP: number;
  nextLevelXP: number;
  progressPercent: number;
  xpToNextLevel: number;
  maturityDescription: string;
  skillsUnlocked: string[];
} {
  const current = FUNDAMENTAL_MATURITY_LEVELS.find(l => xp >= l.minXP && xp <= l.maxXP) || FUNDAMENTAL_MATURITY_LEVELS[0];
  const next = FUNDAMENTAL_MATURITY_LEVELS.find(l => l.level === current.level + 1) || null;

  const currentLevelMinXP = current.minXP;
  const nextLevelXP = next ? next.minXP : current.maxXP;
  const range = nextLevelXP - currentLevelMinXP;
  const currentProgress = xp - currentLevelMinXP;
  const progressPercent = next ? Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100))) : 100;
  const xpToNextLevel = next ? Math.max(0, next.minXP - xp) : 0;

  return {
    level: current.level,
    title: current.title,
    titleEn: current.titleEn,
    badge: current.badge,
    color: current.color,
    currentXP: xp,
    currentLevelMinXP,
    nextLevelXP,
    progressPercent,
    xpToNextLevel,
    maturityDescription: current.maturityDescription,
    skillsUnlocked: current.skillsUnlocked
  };
}
