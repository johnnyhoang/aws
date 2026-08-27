import { QuizQuestion } from '../../types';

export const SAA_QUESTIONS: QuizQuestion[] = [
  {
    id: 'saa-1',
    certCode: 'SAA-C03',
    category: 'Mạng & Phân vùng VPC (Networking)',
    difficulty: 'Trung bình',
    scenario: 'Một trường đại học đang thiết kế ứng dụng Cổng thông tin Sinh viên trên AWS. Cụm máy chủ EC2 đặt trong Private Subnet cần tải bản cập nhật hệ điều hành từ Internet định kỳ. Tuy nhiên, quy định an ninh trường học cấm mọi kết nối khởi tạo từ bên ngoài Internet đi trực tiếp vào máy chủ EC2. Giải pháp kiến trúc nào là tối ưu và khả dụng cao nhất?',
    scenarioEn: 'A university student portal runs on Amazon EC2 instances in private subnets. The instances must download OS updates from the internet periodically, but internet inbound traffic must be completely blocked. Which architectural solution is most cost-effective and highly available?',
    options: [
      { id: 'A', text: 'Gán Elastic IP trực tiếp cho từng máy chủ EC2 và mở cổng Inbound trong Security Group.' },
      { id: 'B', text: 'Triển khai NAT Gateway trong Public Subnet của mỗi Availability Zone và trỏ Route Table của Private Subnet 0.0.0.0/0 tới NAT Gateway tương ứng.' },
      { id: 'C', text: 'Tạo một máy chủ NAT Instance duy nhất trong Private Subnet và bật tính năng IP Forwarding.' },
      { id: 'D', text: 'Thiết lập VPC Peering với VPC của một trường đại học khác có sẵn Internet Gateway.' }
    ],
    optionsEn: [
      { id: 'A', text: 'Assign Elastic IP addresses directly to each EC2 instance and allow inbound in Security Groups.' },
      { id: 'B', text: 'Deploy a NAT Gateway in the public subnet of each Availability Zone and route private subnet 0.0.0.0/0 traffic to it.' },
      { id: 'C', text: 'Launch a single NAT Instance in a private subnet with IP forwarding enabled.' },
      { id: 'D', text: 'Configure VPC Peering with another university VPC that has an Internet Gateway.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'NAT Gateway là dịch vụ Managed Service của AWS có tính sẵn sàng cao (High Availability), được đặt ở Public Subnet để cho phép các máy chủ trong Private Subnet đi ra ngoài (Outbound) Internet tải bản vá, đồng thời chặn hoàn toàn mọi kết nối từ ngoài vào (Inbound). Đặt 1 NAT Gateway trên mỗi AZ đảm bảo hệ thống không bị gián đoạn nếu 1 AZ gặp sự cố.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Gán Elastic IP cho máy chủ trong Private Subnet sẽ biến nó thành máy chủ công khai, phá vỡ kiến trúc Private Subnet.' },
        { optionId: 'C', reason: 'NAT Instance là giải pháp cũ tự quản lý, tạo ra điểm nghẽn đơn lẻ (Single Point of Failure) và không tự động co giãn băng thông.' },
        { optionId: 'D', reason: 'VPC Peering không hỗ trợ định tuyến chuyển tiếp (Edge to Edge / Transitive routing) ra Internet của VPC đối tác.' }
      ],
      examTip: 'Private Subnet cần truy cập Internet an toàn + Khả dụng cao (Multi-AZ) -> Triển khai NAT Gateway trên Public Subnet của từng AZ.'
    },
    explanationEn: {
      whyCorrect: 'A NAT Gateway deployed across multiple Availability Zones in public subnets provides managed outbound internet access for private subnets while preventing any inbound connections from the internet.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Assigning Elastic IPs makes private instances directly accessible from the public internet.' },
        { optionId: 'C', reason: 'A single NAT Instance represents a single point of failure (SPOF).' },
        { optionId: 'D', reason: 'VPC Peering does not support transitive routing to the internet.' }
      ],
      examTip: 'Private subnet needs outbound internet + High Availability -> Deploy NAT Gateway in each AZ public subnet.'
    }
  },
  {
    id: 'saa-2',
    certCode: 'SAA-C03',
    category: 'Lưu trữ & Bảo vệ Dữ liệu (Storage & S3)',
    difficulty: 'Khó',
    scenario: 'Theo quy định bảo vệ hồ sơ học tập và dữ liệu nghiên cứu khoa học của đại học Mỹ, các tệp bảng điểm sinh viên lưu trữ trên Amazon S3 bắt buộc không được phép chỉnh sửa hoặc xóa bởi bất kỳ ai (kể cả tài khoản AWS Account Root) trong thời hạn tối thiểu 7 năm. Tính năng nào của S3 đáp ứng chính xác tiêu chuẩn này?',
    scenarioEn: 'According to US university compliance policies, student academic records on Amazon S3 must be write-once-read-many (WORM) and strictly prevented from deletion or overwrite by ANY user—including the AWS Account Root user—for 7 years. Which S3 feature satisfies this?',
    options: [
      { id: 'A', text: 'S3 Bucket Versioning kết hợp S3 MFA Delete' },
      { id: 'B', text: 'S3 Object Lock ở chế độ Compliance Mode với thời hạn lưu giữ (Retention Period) 7 năm' },
      { id: 'C', text: 'S3 Object Lock ở chế độ Governance Mode với thời hạn lưu giữ 7 năm' },
      { id: 'D', text: 'S3 Bucket Policy chặn hành động s3:DeleteObject đối với tất cả IAM Users' },
    ],
    optionsEn: [
      { id: 'A', text: 'S3 Bucket Versioning with S3 MFA Delete' },
      { id: 'B', text: 'S3 Object Lock in Compliance Mode with a 7-year retention period' },
      { id: 'C', text: 'S3 Object Lock in Governance Mode with a 7-year retention period' },
      { id: 'D', text: 'S3 Bucket Policy explicitly denying s3:DeleteObject for all IAM Users' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'S3 Object Lock Compliance Mode áp dụng mô hình WORM (Write Once, Read Many). Ở chế độ Compliance Mode, một đối tượng bị khóa TUYỆT ĐỐI KHÔNG THỂ BỊ XÓA hoặc ghi đè bởi bất kỳ ai, bao gồm cả tài khoản Root của tài khoản AWS cho đến khi hết hạn thời gian lưu giữ (Retention Period).',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'MFA Delete chỉ yêu cầu mã OTP khi xóa, tài khoản Root có MFA vẫn có thể xóa được tệp.' },
        { optionId: 'C', reason: 'Ở chế độ Governance Mode, người dùng có quyền đặc biệt `s3:BypassGovernanceRetention` hoặc tài khoản Root vẫn có thể xóa đối tượng trước hạn.' },
        { optionId: 'D', reason: 'Tài khoản Root có thể sửa đổi hoặc xóa Bucket Policy bất kỳ lúc nào.' }
      ],
      examTip: 'Không ai có thể xóa tệp, kể cả Root User -> S3 Object Lock COMPLIANCE Mode. Có thể cấp quyền cho Admin xóa trước hạn khi cần -> GOVERNANCE Mode.'
    },
    explanationEn: {
      whyCorrect: 'In S3 Object Lock Compliance Mode, a protected object version cannot be overwritten or deleted by any user, including the root user in your AWS account, during its retention period.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'MFA Delete requires MFA but still allows deletion by the root user.' },
        { optionId: 'C', reason: 'Governance Mode allows users with bypass permissions or root user to delete objects.' },
        { optionId: 'D', reason: 'Bucket policies can be modified or deleted by the root user.' }
      ],
      examTip: 'Cannot be deleted by ANYONE, including Root -> S3 Object Lock COMPLIANCE Mode.'
    }
  },
  {
    id: 'saa-3',
    certCode: 'SAA-C03',
    category: 'Cơ sở Dữ liệu & Bộ nhớ đệm (Database)',
    difficulty: 'Trung bình',
    scenario: 'Ứng dụng tra cứu lịch học của trường đại học sử dụng cơ sở dữ liệu Amazon RDS for PostgreSQL. Vào đầu mỗi học kỳ, hàng chục ngàn sinh viên liên tục truy vấn đọc thời khóa biểu khiến CPU của cơ sở dữ liệu tăng vọt lên 98%, trong khi tỷ lệ ghi dữ liệu rất thấp. Giải pháp nào tối ưu chi phí và tăng hiệu năng đọc nhanh nhất mà không cần thay đổi cấu trúc bảng?',
    scenarioEn: 'A university schedule lookup application uses Amazon RDS for PostgreSQL. During semester registration, thousands of students run read queries causing DB CPU utilization to reach 98%. Write traffic remains minimal. What is the most cost-effective solution to scale read throughput?',
    options: [
      { id: 'A', text: 'Nâng cấp RDS Instance lên kích thước lớn hơn gấp 4 lần (Scale Up Vertical).' },
      { id: 'B', text: 'Tạo các RDS Read Replicas và cấu hình ứng dụng trỏ các truy vấn đọc (Read queries) vào Reader Endpoints.' },
      { id: 'C', text: 'Bật tính năng RDS Multi-AZ Deployment và chuyển các truy vấn đọc sang Standby Database.' },
      { id: 'D', text: 'Chuyển toàn bộ dữ liệu PostgreSQL sang Amazon Redshift Data Warehouse.' }
    ],
    optionsEn: [
      { id: 'A', text: 'Scale up the RDS instance to a 4x larger instance size vertically.' },
      { id: 'B', text: 'Create RDS Read Replicas and point read traffic to the read replica endpoints.' },
      { id: 'C', text: 'Enable RDS Multi-AZ deployment and route read queries to the standby database instance.' },
      { id: 'D', text: 'Migrate PostgreSQL data to Amazon Redshift Data Warehouse.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'RDS Read Replicas (Bản sao chỉ đọc) cho phép bạn nhân bản bất đồng bộ dữ liệu sang tối đa 15 bản sao, giúp giảm tải toàn bộ các truy vấn đọc (SELECT queries) khỏi máy chủ Primary DB, giải quyết triệt để tình trạng nghẽn CPU khi lượng sinh viên tra cứu tăng đột biến.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Scale Up tốn kém chi phí lớn và chỉ giải quyết được giới hạn tạm thời, vẫn có nguy cơ quá tải.' },
        { optionId: 'C', reason: 'Standby Database trong RDS Multi-AZ là bản dự phòng thụ động dùng cho mục đích Failover khi gặp sự cố, KHÔNG THỂ nhận truy vấn đọc/ghi thông thường.' },
        { optionId: 'D', reason: 'Amazon Redshift là kho dữ liệu OLAP dùng cho phân tích báo cáo phức tạp, không phù hợp cho ứng dụng web giao dịch trực tuyến OLTP.' }
      ],
      examTip: 'Ghi nhớ: RDS Multi-AZ dùng cho Tính sẵn sàng cao (Disaster Recovery/Failover - Standby DB không đọc được). RDS Read Replicas dùng cho Mở rộng hiệu năng đọc (Read Scalability).'
    },
    explanationEn: {
      whyCorrect: 'RDS Read Replicas scale read throughput by offloading read-heavy workloads (SELECT queries) from the primary database instance.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Vertical scaling is expensive and has a hard ceiling.' },
        { optionId: 'C', reason: 'In standard RDS Multi-AZ, the standby instance is purely for failover and cannot serve read traffic.' },
        { optionId: 'D', reason: 'Amazon Redshift is for OLAP analytics, not transactional web lookups.' }
      ],
      examTip: 'Multi-AZ = High Availability / Failover (Standby cannot be read). Read Replicas = Read Scalability.'
    }
  },
  {
    id: 'saa-4',
    certCode: 'SAA-C03',
    category: 'Quản trị Đa Tài khoản & Bảo mật (Organizations & SCP)',
    difficulty: 'Khó',
    scenario: 'Trường đại học có 20 tài khoản AWS khác nhau thuộc các khoa và phòng ban. Kiến trúc sư trưởng cần đảm bảo rằng không một tài khoản nào được phép vô hiệu hóa dịch vụ AWS CloudTrail hoặc khởi chạy máy chủ EC2 bên ngoài khu vực `us-east-1`. Giải pháp quản trị tập trung nào đáp ứng yêu cầu này?',
    scenarioEn: 'A university manages 20 AWS accounts across colleges. The Lead Architect must ensure that no account can disable AWS CloudTrail or launch EC2 instances outside `us-east-1`. What centralized governance solution enforces this?',
    options: [
      { id: 'A', text: 'Tạo IAM Policy trên từng tài khoản và gán cho tất cả các IAM Groups.' },
      { id: 'B', text: 'Sử dụng AWS Organizations và áp dụng Service Control Policy (SCP) ở cấp độ Root hoặc Organizational Unit (OU).' },
      { id: 'C', text: 'Viết Lambda script chạy định kỳ 5 phút quét tất cả các tài khoản để tắt các máy chủ ngoài vùng us-east-1.' },
      { id: 'D', text: 'Cấu hình AWS Security Hub và gửi email nhắc nhở quản trị viên khoa vi phạm.' }
    ],
    optionsEn: [
      { id: 'A', text: 'Create an IAM policy in each account and attach it to all IAM groups.' },
      { id: 'B', text: 'Use AWS Organizations and attach Service Control Policies (SCPs) at the Root or OU level.' },
      { id: 'C', text: 'Deploy a recurring Lambda function to terminate non-us-east-1 instances across accounts.' },
      { id: 'D', text: 'Configure AWS Security Hub with email notifications to department admins.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'Service Control Policies (SCPs) trong AWS Organizations là các ranh giới quyền hạn tập trung (Centralized permission guardrails). Khi áp dụng SCP chặn hành động xóa CloudTrail hoặc chặn tạo tài nguyên ngoài vùng `us-east-1`, quy tắc này sẽ có hiệu lực trên toàn bộ các tài khoản thành viên trong OU, và không một ai (kể cả tài khoản Root của tài khoản con) có thể vượt qua.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'IAM Policy phân tán ở từng tài khoản con rất dễ bị quản trị viên tài khoản con chỉnh sửa hoặc xóa bỏ.' },
        { optionId: 'C', reason: 'Giải pháp thủ công, không ngăn chặn được hành động ngay từ đầu (Preventative Control) mà chỉ xử lý sau khi đã phát sinh chi phí.' },
        { optionId: 'D', reason: 'Security Hub chỉ phát hiện và cảnh báo (Detective Control), không có tính năng ngăn chặn thực thi.' }
      ],
      examTip: 'Quản trị tập trung đa tài khoản + Thiết lập ranh giới quyền hạn tối thượng ngăn tài khoản con vi phạm -> AWS Organizations Service Control Policies (SCPs).'
    },
    explanationEn: {
      whyCorrect: 'Service Control Policies (SCPs) in AWS Organizations provide centralized guardrails that restrict the maximum available permissions for all IAM users and roles—including account root users—across member accounts.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Member account admins can modify or delete local IAM policies.' },
        { optionId: 'C', reason: 'Reactive Lambda scripts do not prevent resource creation.' },
        { optionId: 'D', reason: 'Security Hub alerts are detective, not preventative.' }
      ],
      examTip: 'Multi-account centralized guardrails overriding root user -> AWS Organizations SCPs.'
    }
  },
  {
    id: 'saa-5',
    certCode: 'SAA-C03',
    category: 'Tích hợp & Xếp hàng Bất đồng bộ (SQS & Decoupling)',
    difficulty: 'Trung bình',
    scenario: 'Một ứng dụng nhận bài thi trắc nghiệm trực tuyến của sinh viên cần xử lý chấm điểm tự động. Trong giờ nộp bài thi cuối kỳ, hàng ngàn sinh viên nộp bài cùng lúc khiến hệ thống xử lý chấm điểm phía sau bị quá tải và làm mất bài thi của một số sinh viên. Giải pháp nào giúp tách rời (decouple) kiến trúc và đảm bảo 100% không bị mất dữ liệu bài nộp?',
    scenarioEn: 'An online grading system crashes during final exam submission due to a sudden surge of thousands of submissions, resulting in lost student answers. Which architectural pattern decouples the ingestion layer and guarantees zero data loss?',
    options: [
      { id: 'A', text: 'Đặt Amazon SQS Queue ở giữa tầng tiếp nhận bài thi và tầng xử lý chấm điểm.' },
      { id: 'B', text: 'Tăng gấp đôi dung lượng RAM của máy chủ xử lý chấm điểm.' },
      { id: 'C', text: 'Sử dụng Amazon SNS Topic để gửi bài thi trực tiếp tới email của giảng viên.' },
      { id: 'D', text: 'Yêu cầu sinh viên chia thành các khung giờ nộp bài khác nhau.' }
    ],
    optionsEn: [
      { id: 'A', text: 'Place an Amazon SQS Queue between the submission frontend and backend grading workers.' },
      { id: 'B', text: 'Double the RAM capacity of the grading worker servers.' },
      { id: 'C', text: 'Use an Amazon SNS topic to fan-out submissions directly to instructor emails.' },
      { id: 'D', text: 'Instruct students to submit at staggered time intervals.' }
    ],
    correctOptionId: 'A',
    explanation: {
      whyCorrect: 'Amazon SQS (Simple Queue Service) hoạt động như một bộ đệm (Buffer) tin nhắn có khả năng lưu trữ hàng triệu thông điệp an toàn. Khi lượng bài nộp tăng đột biến, toàn bộ bài nộp được xếp hàng trong SQS và tầng xử lý sẽ kéo (Pull) từng bài ra chấm theo tốc độ an toàn mà không bao giờ bị mất mát dữ liệu.',
      whyOthersIncorrect: [
        { optionId: 'B', reason: 'Tăng RAM (Vertical Scaling) không giải quyết được vấn đề mất kết nối khi có đợt tải đột biến bất ngờ.' },
        { optionId: 'C', reason: 'Amazon SNS là mô hình đẩy (Push notification/Pub-Sub), không có khả năng lưu trữ xếp hàng và đệm dữ liệu như SQS.' },
        { optionId: 'D', reason: 'Không phải là giải pháp kiến trúc công nghệ.' }
      ],
      examTip: 'Từ khóa "Tách rời kiến trúc (Decouple), đệm dữ liệu (Buffer), chống mất tin nhắn khi hệ thống backend quá tải" -> Luôn chọn Amazon SQS.'
    },
    explanationEn: {
      whyCorrect: 'Amazon SQS decouples components and acts as a high-throughput message buffer that stores exam submissions safely until backend workers consume and grade them at their own pace.',
      whyOthersIncorrect: [
        { optionId: 'B', reason: 'Scaling RAM does not buffer sudden spikes and can still cause network dropouts.' },
        { optionId: 'C', reason: 'Amazon SNS is push-based pub/sub and does not provide queue buffering.' },
        { optionId: 'D', reason: 'Administrative procedures are not architectural solutions.' }
      ],
      examTip: 'Decouple + Buffer unpredictable traffic + Zero data loss -> Amazon SQS.'
    }
  }
];
