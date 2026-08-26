export interface VideoLesson {
  id: string;
  title: string;
  instructor: string;
  instructorBadge: string;
  channel: string;
  duration: string;
  level: 'Nhập Môn' | 'Trọng Tâm' | 'Nâng Cao' | 'Chuyên Sâu';
  certTag: 'CLF-C02' | 'SAA-C03' | 'SOA-C02' | 'DVA-C02' | 'SAP-C02' | 'DevOps & IaC' | 'Higher-Ed IT';
  type: 'Khóa Học Full Miễn Phí' | 'Hoạt Hình Kiến Trúc' | 'Thực Hành Lab' | 'Mẹo Thi & Phỏng Vấn';
  youtubeId: string;
  youtubeUrl: string;
  thumbnail: string;
  summary: string;
  keyTimestamps?: { time: string; topic: string }[];
  keyTakeaways: string[];
  isRecommended: boolean;
}

export const VIDEO_COURSES: VideoLesson[] = [
  // 1. CLF-C02 Full Course (FreeCodeCamp - Andrew Brown)
  {
    id: 'vid-clf-full',
    title: 'AWS Certified Cloud Practitioner (CLF-C02) - Full Course 14 Tiếng Miễn Phí',
    instructor: 'Andrew Brown',
    instructorBadge: 'ExamPro / AWS Community Hero',
    channel: 'freeCodeCamp.org',
    duration: '14 giờ 20 phút',
    level: 'Nhập Môn',
    certTag: 'CLF-C02',
    type: 'Khóa Học Full Miễn Phí',
    youtubeId: 'SOTamWNgDKc',
    youtubeUrl: 'https://www.youtube.com/watch?v=SOTamWNgDKc',
    thumbnail: 'https://img.youtube.com/vi/SOTamWNgDKc/hqdefault.jpg',
    summary: 'Khóa học hoàn chỉnh và miễn phí 100% bao quát toàn bộ lý thuyết, bảng điều khiển AWS Console thực tế, mô hình giá và chuẩn bị cho kỳ thi CLF-C02.',
    keyTimestamps: [
      { time: '00:00:00', topic: 'Giới thiệu & Tổng quan kỳ thi CLF-C02' },
      { time: '01:15:00', topic: 'Mô hình đám mây & Shared Responsibility' },
      { time: '03:40:00', topic: 'Quản trị danh tính AWS IAM & Security Groups' },
      { time: '06:20:00', topic: 'Dịch vụ Máy chủ EC2, Lambda & ECS' },
      { time: '09:10:00', topic: 'Lưu trữ S3, EBS, EFS & Cơ sở dữ liệu RDS' },
      { time: '12:00:00', topic: 'AWS Budgets, Cost Explorer & Well-Architected' }
    ],
    keyTakeaways: [
      'Hiểu rõ toàn bộ thuật ngữ đám mây cốt lõi của AWS',
      'Thực hành trực quan trên AWS Console có phụ đề tiếng Anh chuẩn',
      'Bài tập mẫu và câu hỏi kiểm tra cuối mỗi chương'
    ],
    isRecommended: true
  },

  // 2. SAA-C03 Full Course (FreeCodeCamp - Andrew Brown)
  {
    id: 'vid-saa-full',
    title: 'AWS Certified Solutions Architect Associate (SAA-C03) - Khóa Học Chuẩn Quốc Tế',
    instructor: 'Andrew Brown',
    instructorBadge: 'ExamPro / AWS Authorized Instructor',
    channel: 'freeCodeCamp.org',
    duration: '11 giờ 30 phút',
    level: 'Trọng Tâm',
    certTag: 'SAA-C03',
    type: 'Khóa Học Full Miễn Phí',
    youtubeId: 'Ia-UEYYR44s',
    youtubeUrl: 'https://www.youtube.com/watch?v=Ia-UEYYR44s',
    thumbnail: 'https://img.youtube.com/vi/Ia-UEYYR44s/hqdefault.jpg',
    summary: 'Khóa học Solutions Architect Associate được xem nhiều nhất thế giới. Đi sâu vào thiết kế hệ thống chịu lỗi cao (Multi-AZ), bảo mật VPC và tối ưu chi phí.',
    keyTimestamps: [
      { time: '00:00:00', topic: 'Cấu trúc bài thi Solutions Architect SAA-C03' },
      { time: '01:30:00', topic: 'Thiết kế Mạng VPC, Subnets, NAT & Route Tables' },
      { time: '04:15:00', topic: 'High Availability với ALB & Auto Scaling Groups' },
      { time: '07:00:00', topic: 'Cơ sở dữ liệu Aurora Multi-AZ & Read Replicas' },
      { time: '09:45:00', topic: 'Kiến trúc Serverless, SQS, SNS & Disaster Recovery' }
    ],
    keyTakeaways: [
      'Thiết kế kiến trúc 3 lớp (3-Tier) chuẩn Enterprise',
      'Phân tích tình huống thực tế cho các câu hỏi kịch bản thi',
      'Được cập nhật đầy đủ các dịch vụ mới nhất của kỳ thi SAA-C03'
    ],
    isRecommended: true
  },

  // 3. Adrian Cantrill - Visual Architecture Deep Dives
  {
    id: 'vid-cantrill-vpc',
    title: 'Giải Mã Bản Chất Mạng AWS VPC & Gói Tin Di Chuyển (Visual Animation)',
    instructor: 'Adrian Cantrill',
    instructorBadge: 'Kiến Trúc Sư Trưởng / Chuyên Gia Hoạt Hình',
    channel: 'Adrian Cantrill',
    duration: '45 phút',
    level: 'Trọng Tâm',
    certTag: 'SAA-C03',
    type: 'Hoạt Hình Kiến Trúc',
    youtubeId: 'g2JOHLHh4rI',
    youtubeUrl: 'https://www.youtube.com/watch?v=g2JOHLHh4rI',
    thumbnail: 'https://img.youtube.com/vi/g2JOHLHh4rI/hqdefault.jpg',
    summary: 'Video hoạt hình nổi tiếng của Adrian Cantrill giải thích từng bước cách một gói tin IP đi qua Internet Gateway, NAT Gateway, Route Table và Security Group.',
    keyTakeaways: [
      'Hình dung rõ ràng 100% đường đi của dữ liệu trong mạng VPC',
      'Phân biệt bản chất Stateful của Security Group và Stateless của NACL',
      'Không còn mơ hồ khi gặp các câu hỏi mạng phức tạp trong kỳ thi'
    ],
    isRecommended: true
  },

  // 4. NetworkChuck - You Need to Learn Terraform
  {
    id: 'vid-networkchuck-terraform',
    title: 'Học Terraform Trong 1 Giờ - Tự Động Hóa Toàn Bộ Hạ Tầng AWS',
    instructor: 'NetworkChuck',
    instructorBadge: 'Chuyên Gia Mạng & DevOps 4M+ Subscribers',
    channel: 'NetworkChuck',
    duration: '58 phút',
    level: 'Trọng Tâm',
    certTag: 'DevOps & IaC',
    type: 'Thực Hành Lab',
    youtubeId: '7xngnjfIlK4',
    youtubeUrl: 'https://www.youtube.com/watch?v=7xngnjfIlK4',
    thumbnail: 'https://img.youtube.com/vi/7xngnjfIlK4/hqdefault.jpg',
    summary: 'Cách tiếp cận cực kỳ cuốn hút và dễ hiểu giúp bạn làm chủ Infrastructure as Code (IaC) với Terraform chỉ trong 1 giờ từ con số 0.',
    keyTakeaways: [
      'Tạo máy chủ, mạng VPC và Security Group bằng mã lệnh Terraform',
      'Hiểu rõ chu trình terraform init, plan, apply và destroy',
      'Tự tin đưa kỹ năng Terraform vào CV ứng tuyển Cloud Engineer'
    ],
    isRecommended: true
  },

  // 5. TechWorld with Nana - Docker & Kubernetes Full Course
  {
    id: 'vid-nana-containers',
    title: 'Làm Chủ Docker & Kubernetes (K8s / Amazon EKS) Cho Kỹ Sư Đám Mây',
    instructor: 'Nana Janashia',
    instructorBadge: 'Docker Captain / CNCF Ambassador',
    channel: 'TechWorld with Nana',
    duration: '3 giờ 15 phút',
    level: 'Trọng Tâm',
    certTag: 'SOA-C02',
    type: 'Khóa Học Full Miễn Phí',
    youtubeId: '3c-iBn73dDE',
    youtubeUrl: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
    thumbnail: 'https://img.youtube.com/vi/3c-iBn73dDE/hqdefault.jpg',
    summary: 'Khóa học đóng gói Container với Docker và quản trị cụm Kubernetes chuẩn mực nhất dành cho kỹ sư quản trị hệ thống và phát triển phần mềm.',
    keyTakeaways: [
      'Đóng gói ứng dụng web thành Docker Image an toàn, dung lượng nhẹ',
      'Hiểu rõ Pods, Services, Deployments, Ingress trong Kubernetes',
      'Nền tảng vững chắc để triển khai ứng dụng lên Amazon EKS'
    ],
    isRecommended: true
  },

  // 6. Be A Better Dev - AWS Serverless Architecture
  {
    id: 'vid-serverless-mastery',
    title: 'Xây Dựng Hệ Thống Serverless Thời Gian Thực (API Gateway, Lambda & DynamoDB)',
    instructor: 'Daniel Vassallo (Be A Better Dev)',
    instructorBadge: 'Cựu Kỹ Sư Cấp Cao Amazon AWS (Ex-Amazonian)',
    channel: 'Be A Better Dev',
    duration: '1 giờ 10 phút',
    level: 'Trọng Tâm',
    certTag: 'DVA-C02',
    type: 'Thực Hành Lab',
    youtubeId: 'NLp_wIvh_kM',
    youtubeUrl: 'https://www.youtube.com/watch?v=NLp_wIvh_kM',
    thumbnail: 'https://img.youtube.com/vi/NLp_wIvh_kM/hqdefault.jpg',
    summary: 'Hướng dẫn từng bước thực chiến xây dựng một RESTful API hoàn chỉnh chạy trên Serverless không cần quản lý máy chủ với chi phí $0.',
    keyTakeaways: [
      'Thiết kế bảng DynamoDB hiệu năng cao với độ trễ dưới 10ms',
      'Viết hàm Lambda Python xử lý logic và kết nối API Gateway',
      'Áp dụng trực tiếp vào dự án phân tích Canvas LMS trong Portfolio'
    ],
    isRecommended: true
  },

  // 7. Stephane Maarek - AWS Solutions Architect Pro Preview & Strategy
  {
    id: 'vid-maarek-pro-strategy',
    title: 'Chiến Lược Chinh Phục AWS Solutions Architect Professional (SAP-C02)',
    instructor: 'Stephane Maarek',
    instructorBadge: 'Top 1 Giảng Viên AWS Toàn Cầu trên Udemy',
    channel: 'Stephane Maarek',
    duration: '42 phút',
    level: 'Chuyên Sâu',
    certTag: 'SAP-C02',
    type: 'Mẹo Thi & Phỏng Vấn',
    youtubeId: 'qQ2b6f-8p_8',
    youtubeUrl: 'https://www.youtube.com/watch?v=qQ2b6f-8p_8',
    thumbnail: 'https://img.youtube.com/vi/qQ2b6f-8p_8/hqdefault.jpg',
    summary: 'Stephane Maarek phân tích cấu trúc đề thi khó nhất của AWS, cách đọc hiểu câu hỏi tình huống dài 1 trang giấy và mẹo loại trừ phương án sai.',
    keyTakeaways: [
      'Phương pháp quản lý thời gian thi 180 phút cho 75 câu hỏi tình huống phức tạp',
      'Chiến lược xử lý các câu hỏi về AWS Organizations, SCPs và Hybrid Migration',
      'Bí quyết đạt điểm số trên 850 trong kỳ thi SAP-C02'
    ],
    isRecommended: true
  },

  // 8. AWS Official - Cloud Migration & Hybrid Cloud Architecture
  {
    id: 'vid-aws-hybrid-migration',
    title: 'Kiến Trúc Hybrid Cloud & Di Chuyển Trung Tâm Dữ Liệu Lên AWS',
    instructor: 'AWS Events / Enterprise Architects',
    instructorBadge: 'Kênh Chính Thức Của Amazon Web Services',
    channel: 'Amazon Web Services',
    duration: '52 phút',
    level: 'Chuyên Sâu',
    certTag: 'Higher-Ed IT',
    type: 'Hoạt Hình Kiến Trúc',
    youtubeId: 'p0q1x_89GWE',
    youtubeUrl: 'https://www.youtube.com/watch?v=p0q1x_89GWE',
    thumbnail: 'https://img.youtube.com/vi/p0q1x_89GWE/hqdefault.jpg',
    summary: 'Bài thuyết trình chuyên sâu tại hội nghị AWS re:Invent về cách các trường đại học và tổ chức lớn kết nối trung tâm dữ liệu On-premise với AWS qua Storage Gateway & Direct Connect.',
    keyTakeaways: [
      'Chiến lược di chuyển dữ liệu 7Rs thực tế tại môi trường trường học Mỹ',
      'Tích hợp xác thực tập trung SSO (SAML 2.0 / Okta) với AWS IAM Identity Center',
      'Kinh nghiệm thực chiến quý báu khi phỏng vấn các vị trí Senior Cloud Engineer'
    ],
    isRecommended: true
  }
];
