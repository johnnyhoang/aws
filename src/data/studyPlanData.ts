import { StudyPlanWeek } from '../types';

export interface StudyPlanTemplate {
  id: string;
  name: string;
  durationWeeks: number;
  intensity: 'Cấp tốc (15-20h/tuần)' | 'Tiêu chuẩn (10-12h/tuần)' | 'Chuyên sâu & Thực hành (6-8h/tuần)';
  description: string;
  targetGoal: string;
  weeks: StudyPlanWeek[];
}

export const STUDY_PLANS: StudyPlanTemplate[] = [
  {
    id: 'plan-8-weeks',
    name: 'Lộ Trình Tiêu Chuẩn 8 Tuần (Chinh Phục SAA-C03 & Dự Án Portfolio)',
    durationWeeks: 8,
    intensity: 'Tiêu chuẩn (10-12h/tuần)',
    description: 'Lộ trình tối ưu nhất cân bằng giữa học lý thuyết chứng chỉ Solutions Architect Associate (SAA-C03) và hoàn thiện 2 dự án Portfolio chất lượng trên GitHub.',
    targetGoal: 'Thi đỗ AWS SAA-C03 với điểm số > 800 và có sẵn 2 bài thực hành có thể đem đi phỏng vấn.',
    weeks: [
      {
        weekNumber: 1,
        theme: 'Tuần 1: Nền tảng Đám mây & Quản trị Danh tính (IAM & Security)',
        stageCode: 'CLF-C02 / SAA-C03',
        suggestedHours: 10,
        goals: [
          'Nắm vững mô hình trách nhiệm chung (Shared Responsibility Model)',
          'Thực hành tạo IAM Users, Groups, Roles và Custom JSON Policies',
          'Hiểu nguyên tắc Least Privilege và xác thực đa yếu tố MFA'
        ],
        tasks: [
          { id: 't1-1', title: 'Học lý thuyết IAM, STS và Service Control Policies (SCP)', type: 'theory', duration: '3h' },
          { id: 't1-2', title: 'Thực hành tạo IAM Role cho EC2 và Lambda không dùng Access Keys', type: 'hands_on', duration: '2h' },
          { id: 't1-3', title: 'Làm bài kiểm tra mini 15 câu về IAM & Security', type: 'quiz', duration: '1h' }
        ]
      },
      {
        weekNumber: 2,
        theme: 'Tuần 2: Mạng Nâng Cao VPC & Phân Vùng Bảo Mật (VPC, Subnets, Route Tables)',
        stageCode: 'SAA-C03',
        suggestedHours: 12,
        goals: [
          'Thiết kế VPC 3 lớp (Public, Private App, Isolated DB) trên 2 AZs',
          'Phân biệt thành thạo Security Groups (Stateful) vs NACLs (Stateless)',
          'Cấu hình Internet Gateway, NAT Gateway và VPC Endpoints'
        ],
        tasks: [
          { id: 't2-1', title: 'Học bài chuyên sâu: Mạng & Phân Vùng Bảo Mật AWS', type: 'theory', duration: '4h' },
          { id: 't2-2', title: 'Lab thực hành: Tự tay dựng VPC Multi-AZ chuẩn Enterprise', type: 'hands_on', duration: '3h' },
          { id: 't2-3', title: 'Luyện đề thi chuyên đề Mạng (20 câu)', type: 'quiz', duration: '2h' }
        ]
      },
      {
        weekNumber: 3,
        theme: 'Tuần 3: Máy Chủ & Tự Động Co Giãn (EC2, ALB, Auto Scaling Groups)',
        stageCode: 'SAA-C03',
        suggestedHours: 12,
        goals: [
          'Cấu hình Launch Template và User Data script tự động cài đặt ứng dụng',
          'Thiết lập Application Load Balancer (ALB) với Target Groups và Health Checks',
          'Cấu hình Auto Scaling Policy theo CPU Utilization'
        ],
        tasks: [
          { id: 't3-1', title: 'Học kiến trúc Elastic Load Balancing & Auto Scaling', type: 'theory', duration: '4h' },
          { id: 't3-2', title: 'Thực hành Stress Test máy chủ để kích hoạt Auto Scaling', type: 'hands_on', duration: '3h' },
          { id: 't3-3', title: 'Bắt đầu Dự án Portfolio 1: Cổng thông tin Sinh viên 3 Lớp HA', type: 'project', duration: '4h' }
        ]
      },
      {
        weekNumber: 4,
        theme: 'Tuần 4: Cơ Sở Dữ Liệu & Bộ Nhớ Đệm (RDS Aurora, DynamoDB, ElastiCache)',
        stageCode: 'SAA-C03',
        suggestedHours: 10,
        goals: [
          'Phân biệt khi nào chọn RDS (Quan hệ) vs DynamoDB (NoSQL)',
          'Cấu hình RDS Multi-AZ Failover và Read Replicas',
          'Hiểu nguyên lý hoạt động của DynamoDB Partition Key, Sort Key và GSI'
        ],
        tasks: [
          { id: 't4-1', title: 'Học chuyên sâu về RDS Aurora, DynamoDB & Redis Cache', type: 'theory', duration: '4h' },
          { id: 't4-2', title: 'Kết nối ứng dụng EC2 với Amazon RDS Multi-AZ PostgreSQL', type: 'hands_on', duration: '3h' },
          { id: 't4-3', title: 'Hoàn thiện mã nguồn Terraform cho Dự án Portfolio 1', type: 'project', duration: '3h' }
        ]
      },
      {
        weekNumber: 5,
        theme: 'Tuần 5: Lưu Trữ Đám Mây & Phân Phối Rìa Mạng (S3, EFS, CloudFront, Route 53)',
        stageCode: 'SAA-C03',
        suggestedHours: 10,
        goals: [
          'Nắm chắc các hạng lưu trữ S3 (Standard, IA, Glacier Flexible, Deep Archive)',
          'Thiết lập S3 Lifecycle Rules và S3 Presigned URLs bảo mật',
          'Cấu hình CloudFront CDN kết hợp Route 53 DNS Routing Policies'
        ],
        tasks: [
          { id: 't5-1', title: 'Học lý thuyết S3 Lifecycle, Object Lock và CloudFront OAC', type: 'theory', duration: '3h' },
          { id: 't5-2', title: 'Lab tạo S3 Presigned URL bảo mật cho tài liệu học tập', type: 'hands_on', duration: '2h' },
          { id: 't5-3', title: 'Luyện đề thi SAA-C03 phần Storage & Content Delivery', type: 'quiz', duration: '2h' }
        ]
      },
      {
        weekNumber: 6,
        theme: 'Tuần 6: Container Hóa & Kiến Trúc Serverless (Docker, EKS, Lambda, EventBridge)',
        stageCode: 'SAA-C03 / DVA-C02',
        suggestedHours: 12,
        goals: [
          'Hiểu kiến trúc Serverless Event-Driven (API Gateway + Lambda + EventBridge + DynamoDB)',
          'Tích hợp Webhook an toàn từ Canvas LMS / Blackboard',
          'Bắt đầu Dự án Portfolio 2: Hệ thống Phân tích Học tập Serverless'
        ],
        tasks: [
          { id: 't6-1', title: 'Học bài chuyên sâu Container & Serverless trong giáo dục', type: 'theory', duration: '4h' },
          { id: 't6-2', title: 'Triển khai Dự án Portfolio 2 bằng Serverless Framework / SAM', type: 'project', duration: '5h' },
          { id: 't6-3', title: 'Kiểm tra truy vấn dữ liệu học tập với Amazon Athena', type: 'hands_on', duration: '2h' }
        ]
      },
      {
        weekNumber: 7,
        theme: 'Tuần 7: Hybrid Cloud, Di Chuyển Dữ Liệu & Quản Trị Terraform IaC',
        stageCode: 'SAA-C03 / SOA-C02',
        suggestedHours: 12,
        goals: [
          'Nắm vững chiến lược 7Rs Migration, AWS DataSync và Storage Gateway',
          'Hiểu cách cấu hình SSO / IAM Identity Center kết nối Okta/Entra ID',
          'Viết tài liệu và hoàn thiện GitHub Portfolio cá nhân'
        ],
        tasks: [
          { id: 't7-1', title: 'Học bài chuyên sâu Hybrid Cloud & SSO IAM Identity Center', type: 'theory', duration: '4h' },
          { id: 't7-2', title: 'Tối ưu README GitHub cho 2 dự án Portfolio với sơ đồ kiến trúc', type: 'project', duration: '3h' },
          { id: 't7-3', title: 'Luyện 2 đề thi thử hoàn chỉnh SAA-C03 trên Tutorials Dojo (Jon Bonso)', type: 'quiz', duration: '5h' }
        ]
      },
      {
        weekNumber: 8,
        theme: 'Tuần 8: Tổng Ôn Thi Lấy Chứng Chỉ & Luyện Phỏng Vấn STAR',
        stageCode: 'Thi Chứng Chỉ SAA-C03',
        suggestedHours: 14,
        goals: [
          'Giải 4-5 đề thi thử với điểm số liên tục trên 85%',
          'Luyện nói 10 câu hỏi phỏng vấn kỹ thuật theo phương pháp STAR',
          'Tham gia kỳ thi chính thức AWS Certified Solutions Architect - Associate'
        ],
        tasks: [
          { id: 't8-1', title: 'Luyện 3 đề thi thử tổng hợp và xem lại kỹ các câu sai', type: 'quiz', duration: '6h' },
          { id: 't8-2', title: 'Luyện tập trả lời phỏng vấn STAR qua Cẩm nang Phỏng vấn Đại học Mỹ', type: 'theory', duration: '3h' },
          { id: 't8-3', title: 'ĐI THI CHỨNG CHỈ CHÍNH THỨC SAA-C03 & ĂN MỪNG THÀNH CÔNG!', type: 'hands_on', duration: '3h' }
        ]
      }
    ]
  }
];
