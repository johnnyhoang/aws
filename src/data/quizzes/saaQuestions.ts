import { QuizQuestion } from '../../types';

export const SAA_QUESTIONS: QuizQuestion[] = [
  {
    id: 'saa-1',
    certCode: 'SAA-C03',
    category: 'Mạng & Phân vùng VPC (Networking)',
    difficulty: 'Trung bình',
    scenario: 'Một trường đại học đang thiết kế ứng dụng Cổng thông tin Sinh viên trên AWS. Cụm máy chủ EC2 đặt trong Private Subnet cần tải bản cập nhật hệ điều hành từ Internet định kỳ. Tuy nhiên, quy định an ninh trường học cấm mọi kết nối khởi tạo từ bên ngoài Internet đi trực tiếp vào máy chủ EC2. Giải pháp kiến trúc nào là tối ưu và khả dụng cao nhất?',
    options: [
      { id: 'A', text: 'Gán Elastic IP trực tiếp cho từng máy chủ EC2 và mở cổng Inbound trong Security Group.' },
      { id: 'B', text: 'Triển khai NAT Gateway trong Public Subnet của mỗi Availability Zone và trỏ Route Table của Private Subnet 0.0.0.0/0 tới NAT Gateway tương ứng.' },
      { id: 'C', text: 'Tạo một máy chủ NAT Instance duy nhất trong Private Subnet và bật tính năng IP Forwarding.' },
      { id: 'D', text: 'Thiết lập VPC Peering với VPC của một trường đại học khác có sẵn Internet Gateway.' }
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
    }
  },
  {
    id: 'saa-2',
    certCode: 'SAA-C03',
    category: 'Lưu trữ & Bảo vệ Dữ liệu (Storage & S3)',
    difficulty: 'Khó',
    scenario: 'Theo quy định bảo vệ hồ sơ học tập và dữ liệu nghiên cứu khoa học của đại học Mỹ, các tệp bảng điểm sinh viên lưu trữ trên Amazon S3 bắt buộc không được phép chỉnh sửa hoặc xóa bởi bất kỳ ai (kể cả tài khoản AWS Account Root) trong thời hạn tối thiểu 7 năm. Tính năng nào của S3 đáp ứng chính xác tiêu chuẩn này?',
    options: [
      { id: 'A', text: 'S3 Bucket Versioning kết hợp S3 MFA Delete' },
      { id: 'B', text: 'S3 Object Lock ở chế độ Compliance Mode với thời hạn lưu giữ (Retention Period) 7 năm' },
      { id: 'C', text: 'S3 Object Lock ở chế độ Governance Mode với thời hạn lưu giữ 7 năm' },
      { id: 'D', text: 'S3 Bucket Policy chặn hành động s3:DeleteObject đối với tất cả IAM Users' },
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
    }
  },
  {
    id: 'saa-3',
    certCode: 'SAA-C03',
    category: 'Cơ sở Dữ liệu & Bộ nhớ đệm (Database)',
    difficulty: 'Trung bình',
    scenario: 'Ứng dụng tra cứu lịch học của trường đại học sử dụng cơ sở dữ liệu Amazon RDS for PostgreSQL. Vào đầu mỗi học kỳ, hàng chục ngàn sinh viên liên tục truy vấn đọc thời khóa biểu khiến CPU của cơ sở dữ liệu tăng vọt lên 98%, trong khi tỷ lệ ghi dữ liệu rất thấp. Giải pháp nào tối ưu chi phí và tăng hiệu năng đọc nhanh nhất mà không cần thay đổi cấu trúc bảng?',
    options: [
      { id: 'A', text: 'Nâng cấp RDS Instance lên kích thước lớn hơn gấp 4 lần (Scale Up Vertical).' },
      { id: 'B', text: 'Tạo các RDS Read Replicas và cấu hình ứng dụng trỏ các truy vấn đọc (Read queries) vào Reader Endpoints.' },
      { id: 'C', text: 'Bật tính năng RDS Multi-AZ Deployment và chuyển các truy vấn đọc sang Standby Database.' },
      { id: 'D', text: 'Chuyển toàn bộ dữ liệu PostgreSQL sang Amazon Redshift Data Warehouse.' }
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
    }
  },
  {
    id: 'saa-4',
    certCode: 'SAA-C03',
    category: 'Quản trị Đa Tài khoản & Bảo mật (Organizations & SCP)',
    difficulty: 'Khó',
    scenario: 'Trường đại học có 20 tài khoản AWS khác nhau thuộc các khoa và phòng ban. Kiến trúc sư trưởng cần đảm bảo rằng không một tài khoản nào được phép vô hiệu hóa dịch vụ AWS CloudTrail hoặc khởi chạy máy chủ EC2 bên ngoài khu vực `us-east-1`. Giải pháp quản trị tập trung nào đáp ứng yêu cầu này?',
    options: [
      { id: 'A', text: 'Tạo IAM Policy trên từng tài khoản và gán cho tất cả các IAM Groups.' },
      { id: 'B', text: 'Sử dụng AWS Organizations và áp dụng Service Control Policy (SCP) ở cấp độ Root hoặc Organizational Unit (OU).' },
      { id: 'C', text: 'Viết Lambda script chạy định kỳ 5 phút quét tất cả các tài khoản để tắt các máy chủ ngoài vùng us-east-1.' },
      { id: 'D', text: 'Cấu hình AWS Security Hub và gửi email nhắc nhở quản trị viên khoa vi phạm.' }
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
    }
  },
  {
    id: 'saa-5',
    certCode: 'SAA-C03',
    category: 'Tích hợp & Xếp hàng Bất đồng bộ (SQS & Decoupling)',
    difficulty: 'Trung bình',
    scenario: 'Một ứng dụng nhận bài thi trắc nghiệm trực tuyến của sinh viên cần xử lý chấm điểm tự động. Trong giờ nộp bài thi cuối kỳ, hàng ngàn sinh viên nộp bài cùng lúc khiến hệ thống xử lý chấm điểm phía sau bị quá tải và làm mất bài thi của một số sinh viên. Giải pháp nào giúp tách rời (decouple) kiến trúc và đảm bảo 100% không bị mất dữ liệu bài nộp?',
    options: [
      { id: 'A', text: 'Đặt Amazon SQS Queue ở giữa tầng tiếp nhận bài thi và tầng xử lý chấm điểm.' },
      { id: 'B', text: 'Tăng gấp đôi dung lượng RAM của máy chủ xử lý chấm điểm.' },
      { id: 'C', text: 'Sử dụng Amazon SNS Topic để gửi bài thi trực tiếp tới email của giảng viên.' },
      { id: 'D', text: 'Yêu cầu sinh viên chia thành các khung giờ nộp bài khác nhau.' }
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
    }
  },
  {
    id: 'saa-6',
    certCode: 'SAA-C03',
    category: 'Định tuyến Tên miền & Chịu lỗi (Route 53 Routing Policies)',
    difficulty: 'Trung bình',
    scenario: 'Một ứng dụng web của trường đại học được triển khai trên 2 AWS Regions: Region chính là `us-east-1` (Bắc Virginia) và Region dự phòng là `us-west-2` (Oregon). Ban quản trị muốn 100% người dùng được điều hướng về Region chính khi hệ thống khỏe mạnh. Chỉ khi Region chính gặp sự cố (Health check thất bại), lưu lượng mới tự động chuyển hướng sang Region dự phòng. Chính sách định tuyến Route 53 nào nên được áp dụng?',
    options: [
      { id: 'A', text: 'Weighted Routing Policy' },
      { id: 'B', text: 'Latency-based Routing Policy' },
      { id: 'C', text: 'Failover Routing Policy với cấu hình Active-Passive' },
      { id: 'D', text: 'Geolocation Routing Policy' }
    ],
    correctOptionId: 'C',
    explanation: {
      whyCorrect: 'Route 53 Failover Routing Policy được thiết kế riêng cho kiến trúc Active-Passive Disaster Recovery: Nó định tuyến toàn bộ lưu lượng tới Primary Resource khi Route 53 Health Check xác nhận tài nguyên đó khỏe mạnh, và tự động chuyển hướng (Failover) sang Secondary Backup Resource ngay khi Primary Health Check báo lỗi.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Weighted Routing dùng để chia tỷ lệ phần trăm (ví dụ 80% - 20%) giữa các cụm máy chủ, không tối ưu cho kiến trúc Active-Passive hoàn toàn.' },
        { optionId: 'B', reason: 'Latency-based định tuyến người dùng tới Region có độ trễ mạng thấp nhất, không đảm bảo 100% người dùng vào Region chính ban đầu.' },
        { optionId: 'D', reason: 'Geolocation định tuyến dựa trên vị trí địa lý của người truy cập (ví dụ châu Âu vào Frankfurt, châu Mỹ vào Virginia).' }
      ],
      examTip: 'Active-Passive Disaster Recovery với Route 53 Health Check -> Luôn chọn Failover Routing Policy.'
    }
  },
  {
    id: 'saa-7',
    certCode: 'SAA-C03',
    category: 'Quản lý Bí mật & Mật khẩu (Secrets Manager vs Parameter Store)',
    difficulty: 'Trung bình',
    scenario: 'Một ứng dụng đám mây cần kết nối với cơ sở dữ liệu Amazon RDS MySQL. Theo tiêu chuẩn bảo mật, mật khẩu cơ sở dữ liệu phải được tự động thay đổi (Xoay vòng - Automatic Rotation) mỗi 30 ngày mà không làm gián đoạn ứng dụng đang chạy. Dịch vụ nào đáp ứng hoàn hảo tính năng tự động xoay vòng mật khẩu này?',
    options: [
      { id: 'A', text: 'AWS Systems Manager Parameter Store Standard Tier' },
      { id: 'B', text: 'AWS Secrets Manager tích hợp sẵn hàm Lambda xoay vòng mật khẩu RDS' },
      { id: 'C', text: 'Lưu mật khẩu trong biến môi trường của máy chủ EC2 (Environment Variables)' },
      { id: 'D', text: 'Mã hóa file mật khẩu và tải lên một Private S3 Bucket' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'AWS Secrets Manager được thiết kế chuyên biệt để lưu trữ và quản lý vòng đời của các bí mật (Database credentials, API keys). Nó hỗ trợ tính năng Tự động xoay vòng mật khẩu (Automatic Rotation) tích hợp sẵn với Amazon RDS/Aurora thông qua hàm Lambda mà không cần viết code phức tạp.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'SSM Parameter Store là kho lưu trữ tham số cấu hình tĩnh, không có tính năng tự động xoay vòng mật khẩu RDS tích hợp sẵn như Secrets Manager.' },
        { optionId: 'C', reason: 'Lưu trong biến môi trường không có cơ chế tự động xoay vòng và có nguy cơ lộ bí mật khi dump process.' },
        { optionId: 'D', reason: 'Lưu trên S3 không tự động cập nhật vào cơ sở dữ liệu RDS.' }
      ],
      examTip: 'Quản lý mật khẩu Database + Cần TỰ ĐỘNG XOAY VÒNG (Automatic Rotation) -> Luôn chọn AWS Secrets Manager.'
    }
  }
];
