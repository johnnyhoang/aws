import { FundamentalInterviewQA } from '../../types/fundamentals';

export const FUNDAMENTAL_INTERVIEW_QA: FundamentalInterviewQA[] = [
  {
    id: 'int-net-1',
    domainId: 'networking_basics',
    category: 'Networking & Subnetting',
    difficulty: 'Junior',
    question: 'Hãy giải thích sự khác biệt giữa Stateful Firewall (như Security Group) và Stateless Firewall (như Network ACL)?',
    context: 'Đây là câu hỏi kiểm tra tư duy nền tảng mạng và khả năng hiểu đúng cơ chế hoạt động của VPC Firewall.',
    starAnswer: {
      situation: 'Trong các bài toán thiết kế mạng đám mây, việc lựa chọn đúng cơ chế tường lửa quyết định tính bảo mật và khả năng vận hành thông suốt của hệ thống.',
      task: 'Cần phân biệt rõ ràng cách xử lý gói tin của 2 loại tường lửa ở tầng card mạng và tầng subnet.',
      action: 'Stateful Firewall (Security Group) theo dõi trạng thái phiên kết nối (Connection Tracking): Khi mở chiều Inbound, chiều Outbound phản hồi tự động được phép mà không cần quy tắc thêm. Ngược lại, Stateless Firewall (Network ACL) kiểm tra từng gói tin độc lập ở cả 2 chiều Inbound và Outbound, yêu cầu phải mở dải Ephemeral Ports (1024-65535) ở chiều phản hồi.',
      result: 'Nhờ nắm vững bản chất này, em luôn cấu hình Security Group cho kiểm soát truy cập thông thường và dùng NACL khi cần chặn dải IP độc hại cụ thể ở cấp Subnet.'
    },
    interviewerLooksFor: [
      'Hiểu khái niệm Connection Tracking',
      'Biết sự khác nhau về vị trí áp dụng (Instance level vs Subnet level)',
      'Hiểu nhu cầu mở Ephemeral Ports đối với Stateless Firewall',
      'Biết NACL có quy tắc Deny còn Security Group chỉ có Allow'
    ],
    redFlagsToAvoid: [
      'Nhầm lẫn Stateful là không cho phép chiều về',
      'Không biết số hiệu dải cổng Ephemeral Ports',
      'Cho rằng cả 2 loại đều có quy tắc Deny'
    ],
    awsFollowupQuestion: 'Nếu một EC2 trong Private Subnet cần gọi API ra ngoài Internet qua NAT Gateway, bạn cần mở cổng nào trên Network ACL?'
  },
  {
    id: 'int-linux-1',
    domainId: 'linux_basics',
    category: 'Linux Administration',
    difficulty: 'Junior',
    question: 'Làm thế nào bạn điều tra một máy chủ Linux khi CPU báo mức sử dụng 100% hoặc ứng dụng bị đơ?',
    context: 'Câu hỏi kinh điển kiểm tra kỹ năng thực chiến và tư duy xử lý sự cố (Troubleshooting) của SysAdmin/DevOps.',
    starAnswer: {
      situation: 'Máy chủ chạy dịch vụ web bị khách hàng phản hồi tải chậm bất thường và CPU luôn ở mức 100%.',
      task: 'Xác định nhanh chóng nguyên nhân gốc rễ (Root Cause) xem do mã nguồn người dùng, do Kernel hay do nghẽn I/O đĩa.',
      action: 'Em mở terminal và thực hiện 4 bước: 1) Chạy `top` hoặc `htop` để phân tích tỷ lệ %us (user), %sy (system), %wa (iowait); 2) Nhấn `P` để định vị PID của tiến trình chiếm CPU cao nhất; 3) Kiểm tra chi tiết tiến trình bằng `ps -fp <PID>` và xem nhật ký lỗi liên quan với `journalctl -u <service> -n 100`; 4) Nếu tiến trình bị loop/treo, gửi tín hiệu `kill -15` (SIGTERM) để tắt an toàn, nếu sau 10s không phản hồi mới dùng `kill -9` (SIGKILL).',
      result: 'Xử lý triệt để sự cố mà không cần khởi động lại toàn bộ máy chủ, bảo vệ tính liên tục của các dịch vụ khác.'
    },
    interviewerLooksFor: [
      'Tư duy bài bản theo từng bước phân loại %us, %sy, %wa',
      'Biết sử dụng các lệnh chuẩn top/htop/ps/journalctl',
      'Nguyên tắc an toàn: Dùng SIGTERM (15) trước khi dùng SIGKILL (9)'
    ],
    redFlagsToAvoid: [
      'Ngay lập tức trả lời "reboot lại máy chủ"',
      'Chạy ngay `kill -9` mà không điều tra log'
    ],
    awsFollowupQuestion: 'Làm thế nào bạn thiết lập cảnh báo tự động trên AWS CloudWatch khi CPU Utilization của EC2 vượt quá 85%?'
  },
  {
    id: 'int-sec-1',
    domainId: 'security_basics',
    category: 'Security & Auth',
    difficulty: 'Mid',
    question: 'Hãy phân biệt Authentication (AuthN) và Authorization (AuthZ)? Cho ví dụ thực tế trong hệ thống Cloud.',
    context: 'Kiểm tra kiến thức nền tảng an ninh thông tin và chuẩn phân quyền hệ thống.',
    starAnswer: {
      situation: 'Mọi hệ thống an toàn thông tin đều phải có ranh giới rõ ràng giữa việc xác định danh tính và cấp quyền truy cập.',
      task: 'Cần phân định rạch ròi 2 khái niệm và đưa ra ví dụ minh họa trực quan.',
      action: 'Authentication (AuthN) là quá trình xác minh "Bạn là ai?" thông qua Mật khẩu, Khóa SSH, OTP, JWT token (HTTP 401 khi thất bại). Authorization (AuthZ) là quá trình xác định "Bạn được phép làm những gì?" dựa trên vai trò Role hoặc Policy (HTTP 403 khi thất bại).',
      result: 'Ví dụ trong AWS: Khi người dùng đăng nhập bằng tài khoản và MFA là AuthN; khi IAM Policy kiểm tra xem user đó có quyền `s3:GetObject` hay không là AuthZ.'
    },
    interviewerLooksFor: [
      'Phân biệt rõ ràng câu hỏi "Who are you?" vs "What can you do?"',
      'Nhớ chính xác mã HTTP 401 Unauthorized vs 403 Forbidden',
      'Liên hệ được với AWS IAM Users/Roles và IAM Policies'
    ],
    redFlagsToAvoid: [
      'Nhầm lẫn mã HTTP 401 và 403',
      'Cho rằng Authentication bao hàm luôn cả phân quyền'
    ]
  },
  {
    id: 'int-cloud-1',
    domainId: 'cloud_fundamentals',
    category: 'Cloud & Containers',
    difficulty: 'Junior',
    question: 'Tại sao Docker Container lại khởi động nhanh hơn và nhẹ hơn rất nhiều so với Máy ảo (Virtual Machine)?',
    context: 'Kiểm tra hiểu biết sâu về kiến trúc ảo hóa phần cứng vs ảo hóa hệ điều hành.',
    starAnswer: {
      situation: 'Doanh nghiệp chuyển dịch từ kiến trúc máy ảo VM sang kiến trúc vi dịch vụ container.',
      task: 'Giải thích nguyên lý kỹ thuật phía sau sự vượt trội về dung lượng và tốc độ của Container.',
      action: 'Máy ảo VM sử dụng Hypervisor để ảo hóa phần cứng, mỗi VM phải mang theo một Hệ điều hành khách (Guest OS) riêng biệt nặng hàng chục GB và phải khởi động lại toàn bộ kernel. Ngược lại, Container chỉ đóng gói ứng dụng và thư viện, chạy trực tiếp trên máy chủ và DÙNG CHUNG nhân Linux Kernel của Host OS thông qua 2 tính năng: Namespaces (cô lập môi trường) và Cgroups (giới hạn tài nguyên).',
      result: 'Nhờ không phải nạp lại Kernel, Container chỉ nặng vài chục MB và khởi động chỉ trong vài mili-giây.'
    },
    interviewerLooksFor: [
      'Nêu bật được việc Container dùng chung Linux Kernel của Host',
      'Nhắc đến 2 cơ chế cốt lõi của Linux Kernel: Namespaces và Cgroups',
      'So sánh được với Hypervisor và Guest OS của VM'
    ],
    redFlagsToAvoid: [
      'Nói rằng Container cũng có một hệ điều hành riêng bên trong',
      'Không giải thích được cơ chế nhân Linux'
    ]
  }
];
