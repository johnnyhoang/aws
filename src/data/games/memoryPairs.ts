export interface MemoryCardPair {
  id: string;
  service: string;
  role: string;
  roleEn?: string;
  category: string;
}

export const MEMORY_CARD_PAIRS: MemoryCardPair[] = [
  { id: 'pair-1', service: 'Amazon EC2', role: 'Máy Chủ Ảo Co Giãn Linh Hoạt Trên Đám Mây', roleEn: 'Scalable Virtual Compute Instances in the Cloud', category: 'Compute' },
  { id: 'pair-2', service: 'Amazon S3', role: 'Lưu Trữ Đối Tượng 99.999999999% (11 Số 9) Độ Bền', roleEn: '11 9s Durability Cloud Object Storage', category: 'Storage' },
  { id: 'pair-3', service: 'AWS Lambda', role: 'Chạy Code Không Cần Quản Lý Máy Chủ (Serverless)', roleEn: 'Serverless Event-Driven Compute Service', category: 'Compute' },
  { id: 'pair-4', service: 'Amazon RDS', role: 'Cơ Sở Dữ Liệu Quan Hệ Đa Vùng Tự Động Failover', roleEn: 'Managed Relational DB with Automated Multi-AZ Failover', category: 'Database' },
  { id: 'pair-5', service: 'Amazon DynamoDB', role: 'Cơ Sở Dữ Liệu NoSQL Độ Trễ Dưới 10ms', roleEn: 'Fast and Flexible NoSQL Database (<10ms latency)', category: 'Database' },
  { id: 'pair-6', service: 'Transit Gateway', role: 'Cloud Router Tập Trung Kết Nối Hàng Trăm VPCs', roleEn: 'Central Cloud Router for Multi-VPC and On-Premises', category: 'Networking' },
  { id: 'pair-7', service: 'AWS IAM', role: 'Quản Lý Danh Tính & Phân Quyền Least Privilege', roleEn: 'Identity & Access Management with Least Privilege', category: 'Security' },
  { id: 'pair-8', service: 'Amazon SQS', role: 'Hàng Đợi Đệm Tin Nhắn Tách Rời Kiến Trúc (Buffer)', roleEn: 'Decoupled High-Throughput Message Buffer Queue', category: 'Integration' },
  { id: 'pair-9', service: 'AWS KMS', role: 'Quản Lý Khóa Mã Hóa Dữ Liệu Đạt Chuẩn FIPS 140-2', roleEn: 'Envelope Encryption Key Management Service', category: 'Security' },
  { id: 'pair-10', service: 'Amazon CloudFront', role: 'Mạng Phân Phối Nội Dung Tốc Độ Cao Toàn Cầu CDN', roleEn: 'Global Low-Latency Content Delivery Network (CDN)', category: 'Networking' },
  { id: 'pair-11', service: 'Amazon GuardDuty', role: 'Trí Tuệ Nhân Tạo Tự Động Dò Tìm Mối Đe Dọa An Ninh', roleEn: 'Intelligent Threat Detection & Continuous Monitoring', category: 'Security' },
  { id: 'pair-12', service: 'AWS Step Functions', role: 'Điều Phối Quy Trình Serverless Phức Tạp (State Machine)', roleEn: 'Visual Workflow Orchestration for Serverless Apps', category: 'Integration' },
  { id: 'pair-13', service: 'Amazon Athena', role: 'Truy Vấn Dữ Liệu S3 Bằng SQL Không Cần Máy Chủ', roleEn: 'Interactive Serverless SQL Analytics on S3 Objects', category: 'Analytics' },
  { id: 'pair-14', service: 'AWS Secrets Manager', role: 'Tự Động Đổi Mật Khẩu (Rotation) Cơ Sở Dữ Liệu', roleEn: 'Automatic Password & Secret Rotation Lifecycle', category: 'Security' },
  { id: 'pair-15', service: 'Amazon CloudWatch', role: 'Giám Sát Log, Chỉ Số Hiệu Năng & Kích Hoạt Cảnh Báo', roleEn: 'Observability, Real-time Metrics & Alarms Engine', category: 'Management' },
  { id: 'pair-16', service: 'Amazon EKS', role: 'Dịch Vụ Quản Trị Cụm Container Kubernetes Chuẩn Mực', roleEn: 'Managed Kubernetes Cluster Service on AWS', category: 'Containers' }
];
