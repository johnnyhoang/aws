import { Flashcard } from '../types';

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    term: 'AWS Transit Gateway',
    category: 'Networking',
    definition: 'Một Cloud Router tập trung cho phép kết nối hàng trăm VPC và mạng On-premise Data Center lại với nhau theo mô hình Hub-and-Spoke.',
    realWorldUsage: 'Kết nối mạng giữa các Khoa, Viện Nghiên cứu và Trung tâm Máy tính của trường đại học mà không cần tạo VPC Peering chằng chịt.',
    examKeyword: 'Hub-and-spoke networking / Scale beyond 50+ VPCs'
  },
  {
    id: 'fc-2',
    term: 'IAM Identity Center (AWS SSO)',
    category: 'Security & IAM',
    definition: 'Dịch vụ quản trị danh tính tập trung hỗ trợ liên kết liên đoàn (Federation) với các hệ sinh thái như Okta, Microsoft Entra ID (Azure AD).',
    realWorldUsage: 'Cho phép 30,000 sinh viên và giảng viên đăng nhập vào các tài khoản AWS bằng chính email và mật khẩu của trường.',
    examKeyword: 'Single Sign-On / SAML 2.0 / SCIM Sync'
  },
  {
    id: 'fc-3',
    term: 'AWS Storage Gateway (File Gateway)',
    category: 'AWS Services',
    definition: 'Cung cấp giao thức chia sẻ file mạng chuẩn (NFS / SMB) cho các máy tính trong trường, dữ liệu được tự động nén và lưu trữ trên Amazon S3.',
    realWorldUsage: 'Các phòng thí nghiệm khoa học lưu file chụp X-Quang, ảnh thiên văn trực tiếp vào thư mục mạng mà không lo hết dung lượng ổ cứng.',
    examKeyword: 'NFS/SMB to S3 bridge / On-premise cache'
  },
  {
    id: 'fc-4',
    term: 'FERPA (Family Educational Rights and Privacy Act)',
    category: 'Higher-Ed & LMS',
    definition: 'Đạo luật liên bang tại Mỹ bảo vệ quyền riêng tư và hồ sơ học tập của sinh viên. Mọi giải pháp đám mây tại trường đại học Mỹ đều bắt buộc tuân thủ.',
    realWorldUsage: 'Bắt buộc mã hóa toàn bộ cơ sở dữ liệu điểm số bằng AWS KMS và chỉ cấp quyền truy cập theo nguyên tắc Least Privilege (Đặc quyền tối thiểu).',
    examKeyword: 'Student Data Privacy / At-Rest & In-Transit Encryption'
  },
  {
    id: 'fc-5',
    term: 'Canvas LMS & LTI 1.3',
    category: 'Higher-Ed & LMS',
    definition: 'Canvas là phần mềm quản lý học tập phổ biến nhất tại các đại học Mỹ. LTI 1.3 là chuẩn bảo mật OAuth2/OIDC cho phép nhúng ứng dụng web vào Canvas.',
    realWorldUsage: 'Xây dựng công cụ kiểm tra bài tập tự động chạy trên AWS Lambda và hiển thị trực tiếp trong khóa học Canvas.',
    examKeyword: 'Learning Management System / LTI Standard / Webhooks'
  },
  {
    id: 'fc-6',
    term: 'Terraform Remote State & State Locking',
    category: 'IaC & DevOps',
    definition: 'Lưu trữ trạng thái hạ tầng trên Amazon S3 và dùng DynamoDB để khóa (Locking) nhằm tránh xung đột khi nhiều kỹ sư cùng chạy triển khai.',
    realWorldUsage: 'Cả đội ngũ IT trường học cùng phối hợp quản lý mã hạ tầng trên GitHub mà không bao giờ bị ghi đè dữ liệu trạng thái của nhau.',
    examKeyword: 'S3 backend / DynamoDB LockID / GitOps'
  },
  {
    id: 'fc-7',
    term: 'Amazon Aurora Multi-AZ with Read Replicas',
    category: 'AWS Services',
    definition: 'Cơ sở dữ liệu quan hệ tương thích MySQL/PostgreSQL thế hệ mới của AWS với tốc độ nhanh gấp 3-5 lần, tự động sao lưu 6 bản trên 3 AZ.',
    realWorldUsage: 'Dùng làm cơ sở dữ liệu cho cổng đăng ký tín chỉ: Tầng ghi (Primary) chịu tải đăng ký, 5 Read Replicas chia tải cho sinh viên tra cứu thời khóa biểu.',
    examKeyword: 'High-Throughput / Auto-healing storage / Sub-minute failover'
  },
  {
    id: 'fc-8',
    term: 'Amazon S3 Glacier Deep Archive',
    category: 'AWS Services',
    definition: 'Hạng lưu trữ đám mây có chi phí thấp nhất (~$0.00099/GB/tháng), thời gian trích xuất dữ liệu từ 12 đến 48 giờ.',
    realWorldUsage: 'Lưu trữ hồ sơ sinh viên đã tốt nghiệp 10 năm trước và dữ liệu nghiên cứu khoa học cũ để phục vụ kiểm toán theo luật liên bang.',
    examKeyword: 'Lowest cost storage / 12-48h retrieval / Long-term retention'
  },
  {
    id: 'fc-9',
    term: 'AWS Systems Manager (SSM) Session Manager',
    category: 'Security & IAM',
    definition: 'Công cụ kết nối dòng lệnh (Shell) an toàn vào máy chủ EC2 mà không cần mở cổng SSH (port 22) và không cần Bastion Host.',
    realWorldUsage: 'Kỹ sư IT quản trị an toàn các máy chủ trong Private Subnet qua trình duyệt web mà không sợ bị lộ địa chỉ IP ra ngoài Internet.',
    examKeyword: 'No open inbound ports / IAM authentication / Audit log'
  },
  {
    id: 'fc-10',
    term: 'AWS Lambda Provisioned Concurrency',
    category: 'IaC & DevOps',
    definition: 'Tính năng giữ cho các hàm Lambda luôn ở trạng thái "sẵn sàng chạy ngay" (Warm state) để loại bỏ hiện tượng trễ khởi động (Cold Start).',
    realWorldUsage: 'Đảm bảo API Gateway phục vụ đăng ký môn học phản hồi ngay trong 50ms cho sinh viên bấm nút.',
    examKeyword: 'Eliminate cold starts / Predictable latency'
  }
];
