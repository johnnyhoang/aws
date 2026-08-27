import { AWSMaturityLevel, UserLevelInfo } from '../types';

export const AWS_MATURITY_LEVELS: AWSMaturityLevel[] = [
  {
    level: 1,
    title: 'Người Khởi Đầu Đám Mây (Cloud Novice)',
    titleEn: 'Cloud Novice',
    badge: '🌱',
    color: 'slate',
    minXP: 0,
    maxXP: 299,
    maturityDescription: 'Đang làm quen với thuật ngữ Cloud cơ bản và hạ tầng toàn cầu của AWS.',
    maturityDescriptionEn: 'Learning foundational cloud terminology and AWS global infrastructure.'
  },
  {
    level: 2,
    title: 'Thực Tập Sinh AWS (Cloud Practitioner)',
    titleEn: 'Cloud Practitioner',
    badge: '⚡',
    color: 'sky',
    minXP: 300,
    maxXP: 799,
    maturityDescription: 'Nắm vững mô hình Shared Responsibility, lưu trữ S3, máy chủ ảo EC2 và quản lý chi phí Billing.',
    maturityDescriptionEn: 'Mastering Shared Responsibility, S3 storage, EC2 instances, and AWS pricing models.'
  },
  {
    level: 3,
    title: 'Kỹ Sư Đám Mây Trợ Lý (Cloud Associate)',
    titleEn: 'Junior Cloud Associate',
    badge: '🛡️',
    color: 'emerald',
    minXP: 800,
    maxXP: 1499,
    maturityDescription: 'Thiết kế được mạng VPC Multi-AZ, cấu hình Security Groups và cơ sở dữ liệu RDS PostgreSQL.',
    maturityDescriptionEn: 'Building Multi-AZ VPCs, IAM Least Privilege, and managed RDS databases.'
  },
  {
    level: 4,
    title: 'Kiến Trúc Sư Giải Pháp (Solutions Architect)',
    titleEn: 'Certified Solutions Architect',
    badge: '🏗️',
    color: 'amber',
    minXP: 1500,
    maxXP: 2499,
    maturityDescription: 'Thiết kế kiến trúc phân tán High Availability, Auto-Scaling và tách rời hệ thống bằng SQS/SNS.',
    maturityDescriptionEn: 'Architecting resilient, decoupled, high-availability multi-tier systems on AWS.'
  },
  {
    level: 5,
    title: 'Chuyên Viên DevOps & Tự Động Hóa (DevOps Specialist)',
    titleEn: 'Senior DevOps & SysOps Specialist',
    badge: '⚙️',
    color: 'purple',
    minXP: 2500,
    maxXP: 3999,
    maturityDescription: 'Tự động hóa hạ tầng bằng Terraform, xây dựng CI/CD pipeline và ứng dụng Serverless Step Functions.',
    maturityDescriptionEn: 'Automating IaC with Terraform, CI/CD pipelines, and event-driven serverless architectures.'
  },
  {
    level: 6,
    title: 'Kiến Trúc Sư Trưởng Đám Mây (Lead Cloud Architect)',
    titleEn: 'Lead Enterprise Cloud Architect',
    badge: '👑',
    color: 'indigo',
    minXP: 4000,
    maxXP: 5999,
    maturityDescription: 'Quản trị hạ tầng đa tài khoản AWS Organizations, Transit Gateway hub-and-spoke và tuân thủ FERPA.',
    maturityDescriptionEn: 'Governing multi-account AWS Organizations, Transit Gateway, and enterprise compliance.'
  },
  {
    level: 7,
    title: 'Chuyên Gia FinOps & Bảo Mật Cấp Cao (Principal Master)',
    titleEn: 'Principal FinOps & Security Master',
    badge: '💎',
    color: 'rose',
    minXP: 6000,
    maxXP: 8999,
    maturityDescription: 'Tối ưu hóa chi phí hàng triệu USD, phòng thủ trước các cuộc tấn công mạng cấp cao nhất.',
    maturityDescriptionEn: 'Cutting massive cloud waste via FinOps and engineering zero-trust cloud security.'
  },
  {
    level: 8,
    title: 'Đại Sư Đám Mây Toàn Cầu (AWS Cloud Grandmaster)',
    titleEn: 'AWS Cloud Fellow & Grandmaster',
    badge: '🌌',
    color: 'yellow',
    minXP: 9000,
    maxXP: 999999,
    maturityDescription: 'Đạt đến đỉnh cao thiết kế hệ thống phân tán Multi-Region Active-Active toàn cầu với RPO=0, RTO<10s.',
    maturityDescriptionEn: 'Master of global multi-region active-active zero-downtime distributed systems.'
  }
];

export function calculateUserLevel(xp: number): UserLevelInfo {
  const currentXP = Math.max(0, xp);
  const matchedLevel = AWS_MATURITY_LEVELS.find(
    lvl => currentXP >= lvl.minXP && currentXP <= lvl.maxXP
  ) || AWS_MATURITY_LEVELS[AWS_MATURITY_LEVELS.length - 1];

  const isMaxLevel = matchedLevel.level === AWS_MATURITY_LEVELS.length;
  const currentLevelMinXP = matchedLevel.minXP;
  const nextLevelXP = isMaxLevel ? matchedLevel.minXP + 1000 : matchedLevel.maxXP + 1;
  const xpInLevel = currentXP - currentLevelMinXP;
  const totalXpNeededInLevel = nextLevelXP - currentLevelMinXP;
  
  const progressPercent = isMaxLevel ? 100 : Math.min(100, Math.max(0, Math.round((xpInLevel / totalXpNeededInLevel) * 100)));
  const xpToNextLevel = isMaxLevel ? 0 : Math.max(0, nextLevelXP - currentXP);

  return {
    level: matchedLevel.level,
    title: matchedLevel.title,
    titleEn: matchedLevel.titleEn,
    badge: matchedLevel.badge,
    color: matchedLevel.color,
    currentXP,
    currentLevelMinXP,
    nextLevelXP,
    progressPercent,
    xpToNextLevel,
    maturityDescription: matchedLevel.maturityDescription,
    maturityDescriptionEn: matchedLevel.maturityDescriptionEn
  };
}
