import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-1',
    certCode: 'SAA-C03',
    category: 'Networking & VPC',
    difficulty: 'Trung bình',
    scenario: 'Một trường đại học tại Mỹ đang triển khai ứng dụng đăng ký môn học cho sinh viên trên AWS. Kiến trúc hiện tại gồm cụm máy chủ web EC2 đặt trong Private Subnet và Application Load Balancer (ALB) đặt trong Public Subnet. Kỹ sư đám mây cần đảm bảo các máy chủ EC2 có thể tải các bản vá bảo mật từ Internet nhưng tuyệt đối không cho phép bất kỳ kết nối chủ động nào từ Internet đi thẳng vào EC2. Giải pháp nào tối ưu chi phí và chuẩn kiến trúc nhất?',
    options: [
      { id: 'A', text: 'Gán Elastic IP trực tiếp cho từng máy chủ EC2 trong Private Subnet và mở cổng 80/443 trên Internet Gateway.' },
      { id: 'B', text: 'Tạo NAT Gateway trong Public Subnet và thêm một Route trong Route Table của Private Subnet trỏ 0.0.0.0/0 tới NAT Gateway.' },
      { id: 'C', text: 'Tạo NAT Instance trong Private Subnet và gán Public IP cho máy chủ đó.' },
      { id: 'D', text: 'Sử dụng VPC Peering kết nối Private Subnet trực tiếp với một VPC của trường khác có sẵn Internet.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'NAT Gateway (Network Address Translation Gateway) được thiết kế đặc biệt để đặt trong Public Subnet, cho phép các tài nguyên trong Private Subnet thực hiện kết nối đi ra ngoài (Outbound) Internet để tải bản vá, đồng thời ngăn chặn mọi kết nối Inbound khởi tạo từ bên ngoài Internet.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Gán Elastic IP cho máy chủ trong Private Subnet sẽ biến nó thành máy chủ công khai, phá vỡ tính bảo mật của Private Subnet.' },
        { optionId: 'C', reason: 'NAT Gateway là giải pháp Managed Service có tính sẵn sàng cao, không nên dùng NAT Instance tự quản lý vì dễ gặp lỗi điểm nghẽn đơn lẻ (Single Point of Failure).' },
        { optionId: 'D', reason: 'VPC Peering không hỗ trợ định tuyến chuyển tiếp (Transitive Routing) ra Internet của VPC đối tác.' }
      ],
      examTip: 'Trong đề thi SAA-C03: Để máy chủ Private Subnet ra Internet tải cập nhật an toàn -> NAT Gateway đặt tại Public Subnet.'
    }
  },
  {
    id: 'quiz-2',
    certCode: 'SAA-C03',
    category: 'Security & IAM',
    difficulty: 'Khó',
    scenario: 'Trường đại học có hơn 30,000 sinh viên và 3,000 cán bộ giảng viên. Phòng IT muốn cho phép người dùng truy cập vào cổng thông tin nội bộ trên AWS mà không cần phải tạo và quản lý 33,000 IAM Users trên AWS Console. Trường đã có sẵn hệ thống Microsoft Entra ID (Azure AD) hỗ trợ SAML 2.0. Giải pháp kiến trúc nào là phù hợp nhất?',
    options: [
      { id: 'A', text: 'Viết script tự động chạy hàng đêm tạo IAM User và Access Keys cho từng sinh viên mới nhập học.' },
      { id: 'B', text: 'Sử dụng AWS IAM Identity Center (AWS SSO) tích hợp SAML 2.0 Identity Provider và SCIM để đồng bộ danh tính từ Microsoft Entra ID.' },
      { id: 'C', text: 'Tạo một IAM User chung duy nhất có quyền Admin và chia sẻ thông tin đăng nhập cho toàn bộ sinh viên.' },
      { id: 'D', text: 'Cài đặt OpenVPN Server trên một máy chủ EC2 và yêu cầu sinh viên kết nối VPN để nhận IAM credentials tạm thời.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'AWS IAM Identity Center cho phép liên kết liên đoàn danh tính (Identity Federation) thông qua tiêu chuẩn công nghiệp SAML 2.0 với Entra ID/Okta, kết hợp giao thức SCIM để tự động cấp phát và thu hồi quyền truy cập khi sinh viên tốt nghiệp mà không cần tạo IAM User thủ công.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'AWS IAM có giới hạn cứng (Limit) số lượng IAM Users (tối đa 5,000 users/account), không thể tạo 33,000 users và quản lý secret key sẽ cực kỳ nguy hiểm.' },
        { optionId: 'C', reason: 'Vi phạm nghiêm trọng quy tắc bảo mật và không thể kiểm toán (Audit) hành vi của từng cá nhân.' },
        { optionId: 'D', reason: 'Không giải quyết được bài toán quản trị danh tính và cấp quyền chi tiết trên AWS.' }
      ],
      examTip: 'Bất kỳ câu hỏi nào về tích hợp danh tính trường học/doanh nghiệp có sẵn (Corporate Directory) với AWS -> Hãy chọn SAML 2.0 Identity Federation hoặc AWS IAM Identity Center.'
    }
  },
  {
    id: 'quiz-3',
    certCode: 'SOA-C02',
    category: 'Monitoring & Troubleshooting',
    difficulty: 'Trung bình',
    scenario: 'Một kỹ sư CloudOps tại phòng IT trường phát hiện một máy chủ EC2 chạy ứng dụng thư viện trực tuyến đột ngột bị treo không phản hồi (1/2 Status Check failed - Instance Status Check). Kỹ sư cần thiết lập giải pháp tự động hóa để khôi phục máy chủ ngay khi xảy ra sự cố này trong tương lai mà không cần can thiệp thủ công. Dịch vụ nào nên được sử dụng?',
    options: [
      { id: 'A', text: 'Tạo CloudWatch Alarm giám sát chỉ số `StatusCheckFailed_Instance` và cấu hình hành động tự động là EC2 Reboot/Recover.' },
      { id: 'B', text: 'Viết cron job chạy trên máy chủ khác liên tục gửi lệnh ping ICMP đến máy chủ thư viện.' },
      { id: 'C', text: 'Cấu hình AWS Backup tạo snapshot mỗi 5 phút.' },
      { id: 'D', text: 'Bật AWS Trusted Advisor để tự động gửi email thông báo khi máy chủ ngừng hoạt động.' }
    ],
    correctOptionId: 'A',
    explanation: {
      whyCorrect: 'CloudWatch Alarms hỗ trợ tích hợp sẵn các EC2 Actions (Reboot, Terminate, Stop, hoặc Recover). Khi chỉ số `StatusCheckFailed_Instance` phát hiện lỗi phần mềm/hệ điều hành, hành động Reboot sẽ tự động khởi động lại instance để khôi phục dịch vụ.',
      whyOthersIncorrect: [
        { optionId: 'B', reason: 'Phương pháp thủ công, không tận dụng các tính năng giám sát tự động sẵn có của AWS CloudWatch.' },
        { optionId: 'C', reason: 'Snapshot chỉ sao lưu dữ liệu, không giúp khôi phục máy chủ đang chạy theo thời gian thực.' },
        { optionId: 'D', reason: 'Trusted Advisor là công cụ tư vấn tối ưu kiến trúc và chi phí, không phải là công cụ xử lý sự cố tự động.' }
      ],
      examTip: 'Khi gặp lỗi Instance Status Check Failed -> CloudWatch Alarm EC2 Reboot Action. Khi gặp System Status Check Failed (lỗi phần cứng AWS) -> CloudWatch Alarm EC2 Recover Action (giữ nguyên IP và ID).'
    }
  },
  {
    id: 'quiz-4',
    certCode: 'DVA-C02',
    category: 'Serverless & Database',
    difficulty: 'Khó',
    scenario: 'Đội ngũ phát triển phần mềm đang xây dựng tính năng xếp hạng sinh viên có điểm rèn luyện cao nhất học kỳ trên DynamoDB. Bảng chính có Partition Key là `StudentId`. Ứng dụng thường xuyên cần truy vấn danh sách sinh viên theo `DepartmentName` và sắp xếp theo `ActivityScore` giảm dần. Thiết kế chỉ mục (Index) nào là tối ưu và không làm giảm hiệu năng bảng chính?',
    options: [
      { id: 'A', text: 'Dùng lệnh Scan toàn bộ bảng DynamoDB và viết code lọc trong ứng dụng.' },
      { id: 'B', text: 'Tạo một Global Secondary Index (GSI) với Partition Key là `DepartmentName` và Sort Key là `ActivityScore`.' },
      { id: 'C', text: 'Tạo một Local Secondary Index (LSI) với Partition Key là `ActivityScore` và Sort Key là `DepartmentName`.' },
      { id: 'D', text: 'Chuyển toàn bộ dữ liệu từ DynamoDB sang file CSV lưu trên S3 để truy vấn bằng Amazon Athena.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'Global Secondary Index (GSI) cho phép bạn định nghĩa lại cả Partition Key (`DepartmentName`) và Sort Key (`ActivityScore`) hoàn toàn khác với khóa chính của bảng gốc, cho phép truy vấn nhanh danh sách sinh viên theo khoa và sắp xếp theo điểm số với độ trễ vài mili-giây.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Lệnh Scan sẽ quét qua mọi bản ghi trong bảng, gây tốn Read Capacity Units (RCU), chi phí đắt đỏ và tốc độ cực chậm khi bảng có nhiều dữ liệu.' },
        { optionId: 'C', reason: 'Local Secondary Index (LSI) bắt buộc phải dùng cùng Partition Key với bảng chính (`StudentId`), không thể đổi sang Partition Key mới là `DepartmentName`.' },
        { optionId: 'D', reason: 'Không phù hợp cho ứng dụng hiển thị bảng xếp hạng trực tiếp theo thời gian thực (Real-time application).' }
      ],
      examTip: 'Muốn truy vấn với Partition Key KHÁC với bảng gốc -> Bắt buộc dùng Global Secondary Index (GSI).'
    }
  },
  {
    id: 'quiz-5',
    certCode: 'SAP-C02',
    category: 'Hybrid & Migration',
    difficulty: 'Chuyên gia',
    scenario: 'Một viện nghiên cứu trực thuộc đại học sở hữu 800TB dữ liệu ảnh chụp kính thiên văn tại máy chủ On-premise. Viện muốn di chuyển toàn bộ dữ liệu này lên Amazon S3 một lần duy nhất trong thời gian dưới 1 tuần nhưng đường truyền Internet tại trường chỉ có băng thông 100 Mbps. Giải pháp nào vừa tiết kiệm thời gian, vừa đảm bảo an toàn bảo mật dữ liệu?',
    options: [
      { id: 'A', text: 'Tải trực tiếp qua mạng Internet bằng lệnh `aws s3 sync` chạy liên tục ngày đêm.' },
      { id: 'B', text: 'Đặt hàng nhiều thiết bị vật lý AWS Snowball Edge Storage Optimized, sao chép dữ liệu cục bộ qua mạng LAN nội bộ tốc độ cao và gửi chuyển phát nhanh về trung tâm dữ liệu AWS.' },
      { id: 'C', text: 'Thiết lập AWS Storage Gateway Tape Gateway qua đường truyền Internet 100 Mbps.' },
      { id: 'D', text: 'Nén toàn bộ 800TB thành các file zip nhỏ và gửi email đính kèm lên AWS Support.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'Với 800TB dữ liệu trên đường truyền 100 Mbps, việc truyền tải qua Internet sẽ mất hơn 740 ngày (hơn 2 năm) để hoàn thành! AWS Snowball Edge Storage Optimized (mỗi thiết bị chứa ~80TB) cho phép sao chép dữ liệu qua mạng LAN 10 Gbps trong vài giờ và vận chuyển vật lý bằng dịch vụ bưu chính bảo mật tới AWS để nạp trực tiếp vào S3 trong vòng vài ngày.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Giới hạn vật lý của băng thông mạng 100 Mbps không thể truyền tải 800TB trong 1 tuần.' },
        { optionId: 'C', reason: 'Storage Gateway vẫn phụ thuộc vào đường truyền mạng 100 Mbps, không giải quyết được vấn đề băng thông.' },
        { optionId: 'D', reason: 'Email không hỗ trợ gửi file dung lượng lớn và vi phạm quy trình vận hành bảo mật.' }
      ],
      examTip: 'Quy tắc ngón tay cái trong đề thi AWS: Dữ liệu từ hàng chục TB đến dưới 10PB với băng thông mạng hạn chế -> Chọn AWS Snowball Edge. Dữ liệu trên 10PB -> Chọn AWS Snowmobile.'
    }
  },
  {
    id: 'quiz-6',
    certCode: 'CLF-C02',
    category: 'Cloud Concepts',
    difficulty: 'Cơ bản',
    scenario: 'Theo Mô hình Trách nhiệm Chung của AWS (AWS Shared Responsibility Model), trách nhiệm nào sau đây thuộc về Khách hàng (Customer) khi sử dụng dịch vụ Amazon EC2?',
    options: [
      { id: 'A', text: 'Bảo trì phần cứng vật lý máy chủ trong Data Center của AWS.' },
      { id: 'B', text: 'Bảo vệ an ninh vật lý cho các tòa nhà trung tâm dữ liệu.' },
      { id: 'C', text: 'Quản lý, cài đặt và cập nhật các bản vá lỗi cho Hệ điều hành (Guest OS) cài trên máy chủ EC2.' },
      { id: 'D', text: 'Thay thế các thanh RAM và ổ cứng hỏng tại Data Center.' }
    ],
    correctOptionId: 'C',
    explanation: {
      whyCorrect: 'AWS chịu trách nhiệm bảo mật "CỦA" đám mây (Security OF the Cloud - phần cứng, cơ sở vật chất, mạng lưới nền tảng). Khách hàng chịu trách nhiệm bảo mật "TRONG" đám mây (Security IN the Cloud - hệ điều hành máy ảo EC2, cấu hình tường lửa Security Groups, tài khoản IAM và dữ liệu của chính mình).',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Thuộc trách nhiệm của AWS.' },
        { optionId: 'B', reason: 'Thuộc trách nhiệm của AWS.' },
        { optionId: 'D', reason: 'Thuộc trách nhiệm của AWS.' }
      ],
      examTip: 'Ghi nhớ câu thần chú: AWS lo "OF the Cloud" (phần cứng, nhà trạm, hypervisor), Khách hàng lo "IN the Cloud" (OS trên EC2, data, IAM, firewall).'
    }
  }
];
