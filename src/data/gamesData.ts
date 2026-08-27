export interface ArchitectureChallenge {
  id: string;
  title: string;
  titleEn?: string;
  scenario: string;
  scenarioEn?: string;
  targetUptime: string;
  budgetGoal: string;
  layers: {
    name: string;
    nameEn?: string;
    description: string;
    descriptionEn?: string;
    correctService: string;
    options: {
      service: string;
      isCorrect: boolean;
      feedback: string;
      feedbackEn?: string;
    }[];
  }[];
  successStory: string;
  successStoryEn?: string;
}

export interface MemoryCardPair {
  id: string;
  service: string;
  role: string;
  roleEn?: string;
  category: string;
}

export interface IncidentScenario {
  id: string;
  time: string;
  title: string;
  titleEn?: string;
  alertType: 'CRITICAL' | 'WARNING' | 'SECURITY';
  description: string;
  descriptionEn?: string;
  choices: {
    id: string;
    action: string;
    actionEn?: string;
    isCorrect: boolean;
    uptimeImpact: number;
    explanation: string;
    explanationEn?: string;
  }[];
}

export const ARCHITECTURE_CHALLENGES: ArchitectureChallenge[] = [
  {
    id: 'arch-1',
    title: 'Thử Thách 1: Cổng Đăng Ký Tín Chỉ Chịu Tải 30,000 Sinh Viên',
    titleEn: 'Challenge 1: High-Concurrency 30,000 Student Registration Portal',
    scenario: 'Trường Đại học Kent State chuẩn bị mở đợt đăng ký môn học học kỳ Mùa Thu. 30,000 sinh viên sẽ đồng loạt truy cập vào lúc 8h00 sáng. Yêu cầu: Không bao giờ bị sập (99.99% Uptime), bảo vệ DB an toàn và tự động mở rộng máy chủ.',
    scenarioEn: 'Kent State University is launching Fall Course Registration. 30,000 concurrent students will hit the portal at 8:00 AM. Requirements: 99.99% Uptime, auto-scaling compute, and sub-second database response times.',
    targetUptime: '99.99%',
    budgetGoal: 'Tối ưu chi phí bằng Auto-Scaling',
    layers: [
      {
        name: '1. Tầng Phân Phối & Chặn Tấn Công Rìa Mạng (Edge Tier)',
        nameEn: '1. Edge Content Delivery & Security Tier',
        description: 'Lưu bộ nhớ đệm tài nguyên tĩnh (HTML/CSS/JS) và chống tấn công DDoS/SQLi.',
        descriptionEn: 'Cache static assets globally and block automated registration bot scripts.',
        correctService: 'CloudFront + AWS WAF',
        options: [
          { 
            service: 'CloudFront + AWS WAF', 
            isCorrect: true, 
            feedback: 'Chính xác! CloudFront cache 70% tải và WAF chặn các bot tự động đăng ký môn gian lận.',
            feedbackEn: 'Correct! CloudFront absorbs 70% of static traffic and AWS WAF mitigates registration bot spikes.'
          },
          { 
            service: 'Một máy chủ Nginx EC2 duy nhất', 
            isCorrect: false, 
            feedback: 'Sai lầm! 1 máy chủ Nginx sẽ lập tức bị nghẽn và sập khi 30,000 sinh viên vào cùng lúc.',
            feedbackEn: 'Incorrect! A single Nginx instance will be overwhelmed within seconds.'
          },
          { 
            service: 'AWS Direct Connect', 
            isCorrect: false, 
            feedback: 'Sai! Direct Connect là đường cáp vật lý On-premise, không phân phối nội dung cho sinh viên từ xa.',
            feedbackEn: 'Incorrect! Direct Connect is dedicated physical networking, not edge distribution.'
          }
        ]
      },
      {
        name: '2. Tầng Điều Hướng & Máy Chủ Ứng Dụng (App Tier)',
        nameEn: '2. Application Compute & Load Balancing Tier',
        description: 'Phân phối tải thông minh và tự động tăng giảm số lượng máy chủ theo CPU.',
        descriptionEn: 'Distribute incoming traffic across AZs and automatically scale compute nodes.',
        correctService: 'Application Load Balancer (ALB) + EC2 Auto Scaling',
        options: [
          { 
            service: 'Application Load Balancer (ALB) + EC2 Auto Scaling', 
            isCorrect: true, 
            feedback: 'Tuyệt vời! ALB chia tải qua 2 AZ và Auto Scaling tự tăng từ 2 lên 20 máy chủ khi sinh viên vào đông.',
            feedbackEn: 'Excellent! ALB spreads load across multiple AZs while ASG scales from 2 to 20 instances.'
          },
          { 
            service: 'Cố định 1 máy chủ EC2 t2.micro', 
            isCorrect: false, 
            feedback: 'Sai! t2.micro chỉ có 1GB RAM, sẽ bị tràn bộ nhớ ngay trong 5 giây đầu tiên.',
            feedbackEn: 'Incorrect! Fixed t2.micro will suffer out-of-memory crashes immediately.'
          },
          { 
            service: 'AWS Storage Gateway', 
            isCorrect: false, 
            feedback: 'Sai! Storage Gateway là dịch vụ lưu trữ, không chạy được ứng dụng web.',
            feedbackEn: 'Incorrect! Storage Gateway is for hybrid file storage.'
          }
        ]
      },
      {
        name: '3. Tầng Cơ Sở Dữ Liệu Khả Dụng Cao (Database Tier)',
        nameEn: '3. High Availability Database Tier',
        description: 'Lưu trữ điểm và dữ liệu đăng ký với khả năng tự động khôi phục trong 30 giây.',
        descriptionEn: 'Handle transactional seat bookings and scale read traffic for schedule lookups.',
        correctService: 'Amazon Aurora PostgreSQL Multi-AZ with Read Replicas',
        options: [
          { 
            service: 'Amazon Aurora PostgreSQL Multi-AZ with Read Replicas', 
            isCorrect: true, 
            feedback: 'Xuất sắc! Primary DB xử lý ghi đăng ký, Read Replicas chia tải xem thời khóa biểu, Multi-AZ tự failover.',
            feedbackEn: 'Outstanding! Aurora primary handles writes while read replicas offload timetable queries.'
          },
          { 
            service: 'File Excel lưu trên ổ đĩa C của máy tính', 
            isCorrect: false, 
            feedback: 'Không thể! File Excel sẽ bị khóa khi có nhiều người ghi đồng thời.',
            feedbackEn: 'Invalid! Local Excel files lock on concurrent writes.'
          },
          { 
            service: 'Amazon S3 Glacier Deep Archive', 
            isCorrect: false, 
            feedback: 'Sai! Glacier Deep Archive mất 12-48h mới đọc được dữ liệu, không thể dùng làm database trực tiếp.',
            feedbackEn: 'Incorrect! S3 Glacier has hours of retrieval latency.'
          }
        ]
      }
    ],
    successStory: '🎉 Bạn đã thiết kế thành công một kiến trúc chuẩn Well-Architected phục vụ 30,000 sinh viên mà không bị trễ 1 mili-giây nào!',
    successStoryEn: '🎉 Architecture Verified! You successfully engineered a Well-Architected AWS system handling 30,000 students flawlessly!'
  },
  {
    id: 'arch-2',
    title: 'Thử Thách 2: Cảnh Báo Sớm Sinh Viên Nguy Cơ Trượt Môn Từ Canvas LMS',
    titleEn: 'Challenge 2: Real-time Canvas LMS Student Early Warning System',
    scenario: 'Ban Giám Hiệu muốn tự động phân tích dữ liệu nộp bài từ Canvas LMS theo thời gian thực để gửi cảnh báo cho Cố vấn học tập với chi phí $0 khi không có sự kiện.',
    scenarioEn: 'University Academic Advising requires a real-time event-driven system to analyze Canvas LMS assignment submission webhooks and notify advisors at $0 idle cost.',
    targetUptime: '100% Serverless',
    budgetGoal: '$0 Free Tier',
    layers: [
      {
        name: '1. Tầng Tiếp Nhận Webhook',
        nameEn: '1. Webhook Ingestion Tier',
        description: 'Tiếp nhận HTTPS POST Webhook từ Canvas LMS an toàn và xác thực chữ ký HMAC.',
        descriptionEn: 'Receive incoming Canvas LMS HTTPS POST webhooks securely with rate limiting.',
        correctService: 'Amazon API Gateway (HTTP API)',
        options: [
          { 
            service: 'Amazon API Gateway (HTTP API)', 
            isCorrect: true, 
            feedback: 'Chính xác! API Gateway tự động nhận webhook, hỗ trợ CORS và giới hạn tần số (Throttling).',
            feedbackEn: 'Correct! API Gateway provides low-cost, serverless webhook routing with built-in throttling.'
          },
          { 
            service: 'AWS Snowball Edge', 
            isCorrect: false, 
            feedback: 'Sai! Snowball là thiết bị vận chuyển ổ cứng vật lý, không nhận được HTTP request.',
            feedbackEn: 'Incorrect! Snowball is physical hardware for data transfer.'
          }
        ]
      },
      {
        name: '2. Tầng Xử Lý Logic Hướng Sự Kiện',
        nameEn: '2. Event-Driven Compute Processing Tier',
        description: 'Chạy code Python tính toán điểm số tức thì không cần quản lý máy chủ.',
        descriptionEn: 'Run Python data processing logic on demand without managing servers.',
        correctService: 'AWS Lambda (Python 3.12)',
        options: [
          { 
            service: 'AWS Lambda (Python 3.12)', 
            isCorrect: true, 
            feedback: 'Hoàn hảo! Lambda tự động khởi chạy khi có bài nộp và tính tiền theo từng mili-giây.',
            feedbackEn: 'Perfect! AWS Lambda executes code upon webhook arrival with millisecond billing.'
          },
          { 
            service: 'Cụm Hadoop EMR 10 Nodes chạy 24/7', 
            isCorrect: false, 
            feedback: 'Quá lãng phí! Cụm EMR chạy liên tục sẽ tốn hàng ngàn USD tiền điện toán.',
            feedbackEn: 'Excessive! A 24/7 EMR cluster would waste thousands of dollars in idle costs.'
          }
        ]
      },
      {
        name: '3. Tầng Lưu Trữ Trạng Thái Sinh Viên',
        nameEn: '3. Student State Storage Tier',
        description: 'Lưu trữ điểm và lịch sử tương tác với độ trễ phản hồi dưới 5 mili-giây.',
        descriptionEn: 'Persist student progress records with predictable single-digit millisecond latency.',
        correctService: 'Amazon DynamoDB On-Demand Mode',
        options: [
          { 
            service: 'Amazon DynamoDB On-Demand Mode', 
            isCorrect: true, 
            feedback: 'Chính xác! DynamoDB tự động co giãn theo số lượng sinh viên nộp bài với 25GB miễn phí vĩnh viễn.',
            feedbackEn: 'Correct! DynamoDB On-Demand scales automatically with 25GB Always Free tier.'
          },
          { 
            service: 'Amazon RDS Oracle EE', 
            isCorrect: false, 
            feedback: 'Sai! Bản quyền Oracle rất đắt và không tối ưu cho mô hình Serverless nhẹ.',
            feedbackEn: 'Incorrect! Commercial Oracle licenses violate the $0 budget goal.'
          }
        ]
      }
    ],
    successStory: '🎉 Bạn đã xây dựng giải pháp Serverless Event-Driven mẫu mực giúp trường đại học phát hiện sớm hàng trăm trường hợp sinh viên cần hỗ trợ!',
    successStoryEn: '🎉 Serverless Masterpiece! You built a zero-idle-cost event-driven pipeline helping advisors support at-risk students!'
  }
];

export const MEMORY_CARD_PAIRS: MemoryCardPair[] = [
  { id: 'pair-1', service: 'Amazon EC2', role: 'Máy Chủ Ảo Co Giãn Linh Hoạt Trên Đám Mây', roleEn: 'Scalable Virtual Compute Instances in the Cloud', category: 'Compute' },
  { id: 'pair-2', service: 'Amazon S3', role: 'Lưu Trữ Đối Tượng 99.999999999% (11 Số 9) Độ Bền', roleEn: '11 9s Durability Cloud Object Storage', category: 'Storage' },
  { id: 'pair-3', service: 'AWS Lambda', role: 'Chạy Code Không Cần Quản Lý Máy Chủ (Serverless)', roleEn: 'Serverless Event-Driven Compute Service', category: 'Compute' },
  { id: 'pair-4', service: 'Amazon RDS', role: 'Cơ Sở Dữ Liệu Quan Hệ Đa Vùng Tự Động Failover', roleEn: 'Managed Relational DB with Automated Multi-AZ Failover', category: 'Database' },
  { id: 'pair-5', service: 'Amazon DynamoDB', role: 'Cơ Sở Dữ Liệu NoSQL Độ Trễ Dưới 10ms', roleEn: 'Fast and Flexible NoSQL Database (<10ms latency)', category: 'Database' },
  { id: 'pair-6', service: 'Transit Gateway', role: 'Cloud Router Tập Trung Kết Nối Hàng Trăm VPCs', roleEn: 'Central Cloud Router for Multi-VPC and On-Premises', category: 'Networking' },
  { id: 'pair-7', service: 'AWS IAM', role: 'Quản Lý Danh Tính & Phân Quyền Least Privilege', roleEn: 'Identity & Access Management with Least Privilege', category: 'Security' },
  { id: 'pair-8', service: 'Amazon SQS', role: 'Hàng Đợi Đệm Tin Nhắn Tách Rời Kiến Trúc (Buffer)', roleEn: 'Decoupled High-Throughput Message Buffer Queue', category: 'Integration' }
];

export const INCIDENT_SCENARIOS: IncidentScenario[] = [
  {
    id: 'inc-1',
    time: '08:02 AM - Rush Hour',
    title: '🔥 CPU CƠ SỞ DỮ LIỆU CHẠM NGƯỠNG 99% - CỔNG SINH VIÊN BỊ TREO!',
    titleEn: '🔥 DATABASE CPU AT 99% - STUDENT PORTAL TIMING OUT!',
    alertType: 'CRITICAL',
    description: '30,000 sinh viên đồng loạt đăng nhập tra cứu lịch học khiến Primary Database RDS PostgreSQL bị nghẽn 100% CPU. Tỷ lệ truy vấn đọc (SELECT) chiếm 95%. Bạn là Kỹ Sư Trực Vận Hành, bạn sẽ làm gì?',
    descriptionEn: '30,000 concurrent students query course timetables, causing primary RDS PostgreSQL CPU to hit 99%. 95% of traffic consists of read queries (SELECT). As the On-Call CloudOps Engineer, what action do you take?',
    choices: [
      {
        id: 'A',
        action: 'Tạo gấp 3 RDS Read Replicas và điều hướng lưu lượng đọc sang Reader Endpoint.',
        actionEn: 'Provision 3 RDS Read Replicas and route read traffic to the reader endpoints.',
        isCorrect: true,
        uptimeImpact: 25,
        explanation: '✅ XUẤT SẮC! Read Replicas giải phóng ngay lập tức 95% áp lực đọc khỏi Primary DB, đưa CPU trở về mức an toàn 35% trong vài phút.',
        explanationEn: '✅ EXCELLENT! Read Replicas offload 95% of queries from the primary DB, stabilizing CPU back to 35%.'
      },
      {
        id: 'B',
        action: 'Tắt máy chủ cơ sở dữ liệu và khởi động lại ngay lập tức.',
        actionEn: 'Reboot the primary database server immediately.',
        isCorrect: false,
        uptimeImpact: -40,
        explanation: '❌ SAI LẦM! Khởi động lại khi đang nghẽn sẽ làm đứt kết nối của hàng ngàn sinh viên và khi bật lại sẽ bị nghẽn dữ dội hơn.',
        explanationEn: '❌ BAD MOVE! Rebooting under heavy load drops all sessions and causes a thundering herd when it restarts.'
      },
      {
        id: 'C',
        action: 'Xóa bớt bảng dữ liệu điểm số của sinh viên các khóa trước.',
        actionEn: 'Drop alumni academic transcript tables to free disk space.',
        isCorrect: false,
        uptimeImpact: -50,
        explanation: '❌ NGUY HIỂM! Xóa dữ liệu sinh viên vi phạm nghiêm trọng quy chế và không giải quyết được vấn đề CPU đang tải.',
        explanationEn: '❌ DISASTROUS! Violates FERPA compliance laws and does not address CPU compute saturation.'
      }
    ]
  },
  {
    id: 'inc-2',
    time: '02:15 PM - Business Hours',
    title: '🚨 CẢNH BÁO AN NINH: PHÁT HIỆN PORT 22 (SSH) BỊ MỞ RA 0.0.0.0/0!',
    titleEn: '🚨 SECURITY ALERT: INBOUND SSH (PORT 22) EXPOSED TO 0.0.0.0/0!',
    alertType: 'SECURITY',
    description: 'AWS GuardDuty phát hiện một Security Group của máy chủ lưu trữ hồ sơ sinh viên vừa bị một nhân viên IT mở cổng SSH ra toàn thế giới (0.0.0.0/0). Các IP lạ từ Internet đang cố gắng brute-force mật khẩu.',
    descriptionEn: 'Amazon GuardDuty detected SSH port 22 opened to 0.0.0.0/0 on a student database server security group with active brute-force intrusion attempts.',
    choices: [
      {
        id: 'A',
        action: 'Xóa ngay luật Inbound port 22 0.0.0.0/0 và chuyển sang kết nối bằng AWS Systems Manager Session Manager.',
        actionEn: 'Immediately revoke the 0.0.0.0/0 rule and mandate AWS Systems Manager Session Manager.',
        isCorrect: true,
        uptimeImpact: 20,
        explanation: '✅ CHUẨN XÁC! SSM Session Manager cho phép kỹ sư IT truy cập shell an toàn qua IAM mà không cần mở bất kỳ cổng Inbound nào ra ngoài.',
        explanationEn: '✅ CORRECT! Session Manager enables secure IAM-authenticated shell access with zero open inbound ports.'
      },
      {
        id: 'B',
        action: 'Để nguyên cổng SSH mở và đổi mật khẩu máy chủ thành "12345678".',
        actionEn: 'Keep port 22 open and change root password to "12345678".',
        isCorrect: false,
        uptimeImpact: -60,
        explanation: '❌ THẢM HỌA! Máy chủ sẽ bị hacker chiếm quyền điều khiển trong vòng 2 phút và dữ liệu sinh viên sẽ bị rò rỉ.',
        explanationEn: '❌ CRITICAL RISK! Weak credentials on exposed ports lead to server compromise within minutes.'
      },
      {
        id: 'C',
        action: 'Tắt dịch vụ AWS GuardDuty để không còn nhận thông báo cảnh báo.',
        actionEn: 'Disable Amazon GuardDuty to stop the alarm notifications.',
        isCorrect: false,
        uptimeImpact: -40,
        explanation: '❌ TẮT CẢNH BÁO không làm biến mất nguy cơ bị tấn công!',
        explanationEn: '❌ Silencing alarms does not eliminate the active security breach.'
      }
    ]
  }
];
