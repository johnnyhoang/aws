import { CertStage, CareerTrack } from '../types';

export interface CareerTrackInfo {
  id: CareerTrack;
  title: string;
  shortTitle: string;
  icon: string;
  badge: string;
  color: string;
  targetRoles: string[];
  description: string;
  coreFocus: string[];
  recommendedCertPath: string[];
  universityContext: string;
}

export const CAREER_TRACKS: Record<CareerTrack, CareerTrackInfo> = {
  cloud_engineer: {
    id: 'cloud_engineer',
    title: 'Hạ tầng & Vận hành Đám mây (Systems / Cloud / CloudOps Engineer)',
    shortTitle: 'Systems & Cloud Engineer',
    icon: 'Server',
    badge: 'Quản trị & Hạ tầng',
    color: 'emerald',
    targetRoles: [
      'Cloud Systems Engineer (Phòng IT Đại học)',
      'CloudOps / DevOps Engineer',
      'Infrastructure Administrator',
      'Site Reliability Engineer (SRE)',
      'Enterprise Systems Specialist'
    ],
    description: 'Tập trung vào thiết kế, xây dựng, bảo mật và vận hành hạ tầng mạng, máy chủ, lưu trữ và dịch vụ đám mây cho toàn bộ khuôn viên đại học hoặc tổ chức doanh nghiệp.',
    coreFocus: [
      'Thiết kế VPC, Mạng đa vùng (Multi-AZ), Direct Connect nối Campus Data Center',
      'Quản trị danh tính tập trung IAM, SSO Okta/Active Directory cho hàng chục nghìn sinh viên & giảng viên',
      'Tự động hóa hạ tầng với Terraform, AWS CloudFormation & Ansible',
      'Giám sát hệ thống (CloudWatch, DataDog), Backup & Disaster Recovery (DR), tối ưu chi phí'
    ],
    recommendedCertPath: ['CLF-C02', 'SAA-C03', 'SOA-C02', 'SAP-C02'],
    universityContext: 'Tại các đại học như Kent State University, phòng IT (Division of Information Technology) quản lý hàng trăm máy chủ ảo, trung tâm dữ liệu lai (Hybrid) và yêu cầu tính bảo mật khắt khe theo luật bảo vệ dữ liệu giáo dục FERPA.'
  },
  software_developer: {
    id: 'software_developer',
    title: 'Phát triển Phần mềm Đám mây (Cloud Software Developer)',
    shortTitle: 'Software Developer',
    icon: 'Code2',
    badge: 'Lập trình & Ứng dụng',
    color: 'sky',
    targetRoles: [
      'Cloud Application Developer (Phòng IT Đại học)',
      'Fullstack / Backend Cloud Engineer',
      'LMS Integration Specialist (Canvas/Blackboard)',
      'Serverless Solutions Developer',
      'API & Microservices Engineer'
    ],
    description: 'Tập trung vào xây dựng các ứng dụng web, microservices, tích hợp API hệ thống quản lý đào tạo (LMS), phân tích dữ liệu sinh viên và kiến trúc Serverless hiện đại.',
    coreFocus: [
      'Phát triển ứng dụng Serverless với AWS Lambda, API Gateway, DynamoDB & EventBridge',
      'Tích hợp Webhooks và LTI 1.3 với hệ thống quản lý học tập (Canvas LMS / Blackboard)',
      'Đóng gói Container với Docker, triển khai lên Amazon ECS/EKS',
      'Xây dựng CI/CD Pipeline (GitHub Actions, AWS CodePipeline) để tự động kiểm thử và deploy'
    ],
    recommendedCertPath: ['CLF-C02', 'SAA-C03', 'DVA-C02', 'SAP-C02'],
    universityContext: 'Các lập trình viên tại trường đại học Mỹ thường phát triển các cổng đăng ký học phần tùy biến, cổng dịch vụ sinh viên một cửa, công cụ điểm danh tự động và bảng điều khiển phân tích kết quả học tập.'
  }
};

export const CERT_STAGES: CertStage[] = [
  {
    id: 'clf-c02',
    code: 'CLF-C02',
    name: 'AWS Certified Cloud Practitioner',
    level: 'foundational',
    badgeColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/30',
    summary: 'Bước đệm nhập môn hoàn hảo để làm quen với hệ sinh thái AWS, các thuật ngữ đám mây, mô hình trách nhiệm chung (Shared Responsibility Model) và cách tối ưu hóa chi phí.',
    importance: 'Bước đà tâm lý vững chắc, giúp nắm vững bức tranh tổng quan trước khi vào giai đoạn chuyên sâu.',
    recommendedFor: ['cloud_engineer', 'software_developer'],
    estimatedWeeks: 2,
    examCost: '$100 USD (Nhận voucher giảm 50% cho lần thi tiếp theo)',
    keyDomains: [
      { name: 'Cloud Concepts (Khái niệm Đám mây)', percentage: 24, description: 'Lợi ích của AWS Cloud, kinh tế học đám mây, các nguyên tắc kiến trúc Well-Architected.' },
      { name: 'Security and Compliance (Bảo mật & Tuân thủ)', percentage: 30, description: 'Mô hình trách nhiệm chung, IAM căn bản, mã hóa dữ liệu, bảo mật mạng AWS.' },
      { name: 'Cloud Technology and Services (Dịch vụ Cốt lõi)', percentage: 34, description: 'Compute (EC2, Lambda), Storage (S3, EBS), Database (RDS, DynamoDB), Networking (VPC).' },
      { name: 'Billing, Pricing, and Support (Chi phí & Hỗ trợ)', percentage: 12, description: 'AWS Pricing Calculator, AWS Cost Explorer, các gói AWS Support Plans.' }
    ],
    mustKnowServices: ['IAM', 'EC2', 'S3', 'VPC', 'RDS', 'Lambda', 'CloudWatch', 'AWS Pricing Calculator', 'AWS Trusted Advisor', 'AWS Well-Architected Framework'],
    recommendedResources: [
      {
        instructor: 'Stephane Maarek',
        courseName: 'Ultimate AWS Certified Cloud Practitioner CLF-C02',
        platform: 'Udemy',
        type: 'course'
      },
      {
        instructor: 'Jon Bonso (Tutorials Dojo)',
        courseName: 'AWS Certified Cloud Practitioner Practice Exams',
        platform: 'Tutorials Dojo / Udemy',
        type: 'practice_exam'
      }
    ],
    practicalRelevance: 'Giúp bạn tự tin khi giao tiếp và hiểu rõ từ vựng kỹ thuật với các đồng nghiệp IT và quản lý người Mỹ trong môi trường làm việc thực tế.'
  },
  {
    id: 'saa-c03',
    code: 'SAA-C03',
    name: 'AWS Certified Solutions Architect – Associate',
    level: 'associate',
    badgeColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/30',
    summary: 'Chứng chỉ "VÀNG" quan trọng nhất trong hệ thống AWS. Bắt buộc phải có để nộp hồ sơ xin việc vào các trường đại học Mỹ và các tập đoàn công nghệ.',
    importance: 'Chứng minh bạn có khả năng thiết kế kiến trúc hệ thống an toàn, chịu lỗi cao (Fault-Tolerant), có khả năng mở rộng (Scalable) và tối ưu hóa chi phí.',
    recommendedFor: ['cloud_engineer', 'software_developer'],
    estimatedWeeks: 6,
    examCost: '$150 USD (Dùng voucher 50% từ kỳ thi trước chỉ còn $75 USD)',
    keyDomains: [
      { name: 'Design Secure Architectures (Thiết kế Kiến trúc Bảo mật)', percentage: 30, description: 'Bảo mật dữ liệu sinh viên/nghiên cứu, IAM phân quyền chi tiết, VPC Peering, Transit Gateway, KMS encryption.' },
      { name: 'Design Resilient Architectures (Thiết kế Kiến trúc Chịu lỗi)', percentage: 26, description: 'Multi-AZ Deployment, Auto Scaling, Elastic Load Balancing, S3 replication, Multi-Region Disaster Recovery.' },
      { name: 'Design High-Performing Architectures (Kiến trúc Hiệu năng cao)', percentage: 24, description: 'Caching (CloudFront, ElastiCache), Database sharding & read replicas, EFS/EBS tối ưu I/O.' },
      { name: 'Design Cost-Optimized Architectures (Kiến trúc Tối ưu chi phí)', percentage: 20, description: 'S3 Lifecycle policies, EC2 Spot/Savings Plans, Serverless scaling on-demand.' }
    ],
    mustKnowServices: [
      'VPC (Subnets, NAT GW, Transit GW)',
      'EC2 & Auto Scaling & ALB/NLB',
      'S3 (Storage Classes, Lifecycle, Object Lock)',
      'RDS (Aurora, Multi-AZ, Read Replicas)',
      'IAM (Policies, Roles, Cross-Account, SCP)',
      'CloudFront & Route 53',
      'AWS KMS & Secrets Manager',
      'SQS, SNS & EventBridge'
    ],
    recommendedResources: [
      {
        instructor: 'Stephane Maarek',
        courseName: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
        platform: 'Udemy',
        type: 'course'
      },
      {
        instructor: 'Adrian Cantrill',
        courseName: 'AWS Certified Solutions Architect - Associate (SAA-C03)',
        platform: 'cantrill.io (Chuyên sâu hình ảnh & thực hành)',
        type: 'hands_on'
      },
      {
        instructor: 'Jon Bonso (Tutorials Dojo)',
        courseName: 'AWS Certified Solutions Architect Associate Practice Exams',
        platform: 'Tutorials Dojo',
        type: 'practice_exam'
      }
    ],
    practicalRelevance: 'Hầu như tất cả các bản mô tả công việc (Job Description) vị trí Cloud Engineer / Systems Admin tại Đại học Mỹ (Kent State, Ohio State, University of Michigan...) đều ghi rõ "AWS SAA certification preferred or required".'
  },
  {
    id: 'soa-c02',
    code: 'SOA-C02',
    name: 'AWS Certified SysOps Administrator – Associate',
    level: 'associate',
    badgeColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/30',
    summary: 'Dành riêng cho nhánh Systems / Cloud / CloudOps Engineer. Chứng chỉ đi sâu vào thực hành giám sát, tự động hóa xử lý sự cố và vận hành hệ thống thực tế.',
    importance: 'Tạo sự khác biệt rõ rệt về kỹ năng vận hành thực tế so với các ứng viên chỉ học lý thuyết kiến trúc.',
    recommendedFor: ['cloud_engineer'],
    estimatedWeeks: 5,
    examCost: '$150 USD',
    keyDomains: [
      { name: 'Monitoring, Logging & Remediation (Giám sát & Xử lý)', percentage: 20, description: 'CloudWatch Alarms, CloudTrail audit logs, AWS Config compliance, tự động kích hoạt khắc phục lỗi.' },
      { name: 'Reliability and Business Continuity (Độ tin cậy & BCP)', percentage: 16, description: 'Backup/Restore, Route 53 Health Checks & DNS Failover, Multi-Region replication.' },
      { name: 'Deployment, Provisioning, and Automation (Tự động hóa)', percentage: 18, description: 'CloudFormation, Terraform, AWS Systems Manager (SSM) Patch Manager & Run Command.' },
      { name: 'Security and Compliance (Bảo mật Vận hành)', percentage: 16, description: 'IAM credential rotation, Security Hub, GuardDuty, AWS WAF rules.' },
      { name: 'Networking and Content Delivery (Mạng & Vận hành)', percentage: 18, description: 'VPC troubleshooting, Transit Gateway routing, Direct Connect monitoring.' },
      { name: 'Cost and Performance Optimization (Tối ưu)', percentage: 12, description: 'Compute Optimizer, Cost Allocation Tags cho các khoa/viện trong trường.' }
    ],
    mustKnowServices: ['AWS Systems Manager (SSM)', 'CloudWatch (Logs, Metrics, Synthetics)', 'AWS Config', 'CloudFormation', 'AWS Backup', 'EventBridge Rules', 'AWS Organizations & SCPs'],
    recommendedResources: [
      {
        instructor: 'Stephane Maarek',
        courseName: 'Ultimate AWS Certified SysOps Administrator Associate SOA-C02',
        platform: 'Udemy',
        type: 'course'
      },
      {
        instructor: 'Tutorials Dojo',
        courseName: 'AWS Certified SysOps Administrator Associate Practice Exams',
        platform: 'Tutorials Dojo',
        type: 'practice_exam'
      }
    ],
    practicalRelevance: 'Các công cụ như AWS Systems Manager (SSM) và CloudWatch là công cụ bạn sẽ mở ra sử dụng hàng ngày khi làm việc tại phòng IT trường đại học để bảo trì và vá lỗi máy chủ hàng loạt.'
  },
  {
    id: 'dva-c02',
    code: 'DVA-C02',
    name: 'AWS Certified Developer – Associate',
    level: 'associate',
    badgeColor: 'text-sky-400',
    badgeBg: 'bg-sky-500/10',
    badgeBorder: 'border-sky-500/30',
    summary: 'Dành cho nhánh Software Developer. Tập trung vào viết mã cho đám mây, tích hợp SDK, Serverless, DynamoDB và CI/CD deployment.',
    importance: 'Chứng minh khả năng code trực tiếp tương tác với AWS services, tối ưu hóa database NoSQL và triển khai ứng dụng hiện đại.',
    recommendedFor: ['software_developer'],
    estimatedWeeks: 5,
    examCost: '$150 USD',
    keyDomains: [
      { name: 'Development with AWS Services (Lập trình với AWS)', percentage: 32, description: 'AWS SDKs, AWS CLI, DynamoDB CRUD & Partition Keys, S3 presigned URLs, SQS/SNS messaging.' },
      { name: 'Security (Bảo mật ứng dụng)', percentage: 26, description: 'AWS Cognito (Xác thực người dùng), Secrets Manager, KMS Envelope Encryption, IAM Roles for Lambda/EC2.' },
      { name: 'Deployment (Triển khai ứng dụng)', percentage: 24, description: 'CI/CD (CodePipeline, CodeBuild, GitHub Actions), ECS/EKS deployments, Serverless SAM / CDK.' },
      { name: 'Troubleshooting and Optimization (Gỡ lỗi)', percentage: 18, description: 'AWS X-Ray tracing, CloudWatch Logs Insights, Lambda Concurrency & Cold Start mitigation.' }
    ],
    mustKnowServices: ['AWS Lambda', 'Amazon API Gateway', 'Amazon DynamoDB', 'AWS Cognito', 'Amazon SQS / SNS / EventBridge', 'AWS X-Ray', 'AWS CodePipeline', 'AWS SAM / CDK'],
    recommendedResources: [
      {
        instructor: 'Stephane Maarek',
        courseName: 'Ultimate AWS Certified Developer Associate DVA-C02',
        platform: 'Udemy',
        type: 'course'
      },
      {
        instructor: 'Tutorials Dojo',
        courseName: 'AWS Certified Developer Associate Practice Exams',
        platform: 'Tutorials Dojo',
        type: 'practice_exam'
      }
    ],
    practicalRelevance: 'Rất cần thiết khi bạn viết các microservices tích hợp giữa cổng trường và các dịch vụ thứ 3 (Canvas LMS API, Zoom LTI, Stripe thanh toán học phí).'
  },
  {
    id: 'sap-c02',
    code: 'SAP-C02',
    name: 'AWS Certified Solutions Architect – Professional',
    level: 'professional',
    badgeColor: 'text-purple-400',
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/30',
    summary: 'Cấp độ Nâng cao - Tạo lợi thế cạnh tranh tuyệt đối. Chứng chỉ thể hiện trình độ đỉnh cao trong quản lý hệ thống phức tạp quy mô lớn, kiến trúc đa tài khoản và di chuyển dữ liệu lớn.',
    importance: 'Giúp hồ sơ của bạn vượt trội hoàn toàn so với đại đa số ứng viên khác, chứng minh bạn có thể lead các dự án chuyển đổi đám mây chiến lược.',
    recommendedFor: ['cloud_engineer', 'software_developer'],
    estimatedWeeks: 10,
    examCost: '$300 USD (Có thể dùng voucher 50% từ kỳ thi trước)',
    keyDomains: [
      { name: 'Design for Organizational Complexity (Kiến trúc Tổ chức phức tạp)', percentage: 26, description: 'AWS Organizations, Service Control Policies (SCPs), Multi-Account Multi-Region, RAM, IAM Identity Center.' },
      { name: 'Design for New Solutions (Thiết kế Giải pháp mới)', percentage: 29, description: 'Kiến trúc Hybrid Cloud với Direct Connect, Transit Gateway, Big Data Analytics, HPC cho nghiên cứu đại học.' },
      { name: 'Continuous Improvement for Existing Solutions (Cải tiến liên tục)', percentage: 25, description: 'Tối ưu hóa hiệu năng, giảm độ trễ, hiện đại hóa ứng dụng Monolith sang Microservices.' },
      { name: 'Accelerate Workload Migration and Modernization (Di chuyển & Hiện đại hóa)', percentage: 20, description: 'AWS Migration Hub, Application Migration Service (MGN), Database Migration Service (DMS), Storage Gateway.' }
    ],
    mustKnowServices: [
      'AWS Organizations & Control Tower',
      'AWS Transit Gateway (Routing & Peering)',
      'AWS Direct Connect (DX) & Direct Connect Gateway',
      'AWS Storage Gateway (Volume, File, Tape)',
      'AWS Application Migration Service (MGN)',
      'AWS Database Migration Service (DMS) & SCT',
      'Amazon OpenSearch Service & Athena',
      'AWS IAM Identity Center (SSO) & SCIM Sync'
    ],
    recommendedResources: [
      {
        instructor: 'Adrian Cantrill',
        courseName: 'AWS Certified Solutions Architect - Professional (SAP-C02)',
        platform: 'cantrill.io (Khóa học sâu nhất thị trường)',
        type: 'hands_on'
      },
      {
        instructor: 'Stephane Maarek',
        courseName: 'Ultimate AWS Certified Solutions Architect Professional SAP-C02',
        platform: 'Udemy',
        type: 'course'
      },
      {
        instructor: 'Jon Bonso (Tutorials Dojo)',
        courseName: 'AWS Certified Solutions Architect Professional Practice Exams',
        platform: 'Tutorials Dojo',
        type: 'practice_exam'
      }
    ],
    practicalRelevance: 'Các trường đại học Mỹ hiện đang tích cực chuyển đổi hàng ngàn máy chủ cũ từ các trung tâm dữ liệu vật lý sang AWS. Kiến thức về Migration, Hybrid Cloud và AWS Organizations sẽ giúp bạn làm được việc ngay từ ngày đầu tiên.'
  }
];
