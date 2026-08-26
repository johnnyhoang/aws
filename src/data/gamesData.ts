export interface ArchitectureChallenge {
  id: string;
  title: string;
  scenario: string;
  targetUptime: string;
  budgetGoal: string;
  layers: {
    name: string;
    description: string;
    correctService: string;
    options: {
      service: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  }[];
  successStory: string;
}

export interface MemoryCardPair {
  id: string;
  service: string;
  role: string;
  category: string;
}

export interface IncidentScenario {
  id: string;
  time: string;
  title: string;
  alertType: 'CRITICAL' | 'WARNING' | 'SECURITY';
  description: string;
  choices: {
    id: string;
    action: string;
    isCorrect: boolean;
    uptimeImpact: number; // +10 or -30
    explanation: string;
  }[];
}

export const ARCHITECTURE_CHALLENGES: ArchitectureChallenge[] = [
  {
    id: 'arch-1',
    title: 'Thử Thách 1: Cổng Thông Tin Đăng Ký Tín Chỉ Chịu Tải 30,000 Sinh Viên',
    scenario: 'Trường Đại học Kent State chuẩn bị mở đợt đăng ký môn học học kỳ Mùa Thu. 30,000 sinh viên sẽ đồng loạt truy cập vào lúc 8h00 sáng. Yêu cầu: Không bao giờ bị sập (99.99% Uptime), bảo vệ DB an toàn và tự động mở rộng máy chủ.',
    targetUptime: '99.99%',
    budgetGoal: 'Tối ưu chi phí bằng Auto-Scaling',
    layers: [
      {
        name: '1. Tầng Phân Phối & Chặn Tấn Công Rìa Mạng (Edge Tier)',
        description: 'Lưu bộ nhớ đệm tài nguyên tĩnh (HTML/CSS/JS) và chống tấn công DDoS/SQLi.',
        correctService: 'CloudFront + AWS WAF',
        options: [
          { service: 'CloudFront + AWS WAF', isCorrect: true, feedback: 'Chính xác! CloudFront cache 70% tải và WAF chặn các bot tự động đăng ký môn gian lận.' },
          { service: 'Một máy chủ Nginx EC2 duy nhất', isCorrect: false, feedback: 'Sai lầm! 1 máy chủ Nginx sẽ lập tức bị nghẽn và sập khi 30,000 sinh viên vào cùng lúc.' },
          { service: 'AWS Direct Connect', isCorrect: false, feedback: 'Sai! Direct Connect là đường cáp vật lý On-premise, không phân phối nội dung cho sinh viên từ xa.' }
        ]
      },
      {
        name: '2. Tầng Điều Hướng & Máy Chủ Ứng Dụng (App Tier)',
        description: 'Phân phối tải thông minh và tự động tăng giảm số lượng máy chủ theo CPU.',
        correctService: 'Application Load Balancer (ALB) + EC2 Auto Scaling',
        options: [
          { service: 'Application Load Balancer (ALB) + EC2 Auto Scaling', isCorrect: true, feedback: 'Tuyệt vời! ALB chia tải qua 2 AZ và Auto Scaling tự tăng từ 2 lên 20 máy chủ khi sinh viên vào đông.' },
          { service: 'Cố định 1 máy chủ EC2 t2.micro', isCorrect: false, feedback: 'Sai! t2.micro chỉ có 1GB RAM, sẽ bị tràn bộ nhớ ngay trong 5 giây đầu tiên.' },
          { service: 'AWS Storage Gateway', isCorrect: false, feedback: 'Sai! Storage Gateway là dịch vụ lưu trữ, không chạy được ứng dụng web.' }
        ]
      },
      {
        name: '3. Tầng Cơ Sở Dữ Liệu Khả Dụng Cao (Database Tier)',
        description: 'Lưu trữ điểm và dữ liệu đăng ký với khả năng tự động khôi phục trong 30 giây.',
        correctService: 'Amazon Aurora PostgreSQL Multi-AZ with Read Replicas',
        options: [
          { service: 'Amazon Aurora PostgreSQL Multi-AZ with Read Replicas', isCorrect: true, feedback: 'Xuất sắc! Primary DB xử lý ghi đăng ký, Read Replicas chia tải xem thời khóa biểu, Multi-AZ tự failover.' },
          { service: 'File Excel lưu trên ổ đĩa C của máy tính', isCorrect: false, feedback: 'Không thể! File Excel sẽ bị khóa khi có nhiều người ghi đồng thời.' },
          { service: 'Amazon S3 Glacier Deep Archive', isCorrect: false, feedback: 'Sai! Glacier Deep Archive mất 12-48h mới đọc được dữ liệu, không thể dùng làm database trực tiếp.' }
        ]
      }
    ],
    successStory: '🎉 Bạn đã thiết kế thành công một kiến trúc chuẩn Well-Architected phục vụ 30,000 sinh viên mà không bị trễ 1 mili-giây nào!'
  },
  {
    id: 'arch-2',
    title: 'Thử Thách 2: Hệ Thống Cảnh Báo Sớm Sinh Viên Nguy Cơ Trượt Môn Từ Canvas LMS',
    scenario: 'Ban Giám Hiệu muốn tự động phân tích dữ liệu nộp bài từ Canvas LMS theo thời gian thực để gửi cảnh báo cho Cố vấn học tập với chi phí $0 khi không có sự kiện.',
    targetUptime: '100% Serverless',
    budgetGoal: '$0 Free Tier',
    layers: [
      {
        name: '1. Tầng Tiếp Nhận Webhook',
        description: 'Tiếp nhận HTTPS POST Webhook từ Canvas LMS an toàn và xác thực chữ ký HMAC.',
        correctService: 'Amazon API Gateway (HTTP API)',
        options: [
          { service: 'Amazon API Gateway (HTTP API)', isCorrect: true, feedback: 'Chính xác! API Gateway tự động nhận webhook, hỗ trợ CORS và giới hạn tần số (Throttling).' },
          { service: 'AWS Snowball Edge', isCorrect: false, feedback: 'Sai! Snowball là thiết bị vận chuyển ổ cứng vật lý, không nhận được HTTP request.' }
        ]
      },
      {
        name: '2. Tầng Xử Lý Logic Hướng Sự Kiện',
        description: 'Chạy code Python tính toán điểm số tức thì không cần quản lý máy chủ.',
        correctService: 'AWS Lambda (Python 3.12)',
        options: [
          { service: 'AWS Lambda (Python 3.12)', isCorrect: true, feedback: 'Hoàn hảo! Lambda tự động khởi chạy khi có bài nộp và tính tiền theo từng mili-giây.' },
          { service: 'Cụm Hadoop EMR 10 Nodes chạy 24/7', isCorrect: false, feedback: 'Quá lãng phí! Cụm EMR chạy liên tục sẽ tốn hàng ngàn USD tiền điện toán.' }
        ]
      },
      {
        name: '3. Tầng Lưu Trữ Trạng Thái Sinh Viên',
        description: 'Lưu trữ điểm và lịch sử tương tác với độ trễ phản hồi dưới 5 mili-giây.',
        correctService: 'Amazon DynamoDB On-Demand Mode',
        options: [
          { service: 'Amazon DynamoDB On-Demand Mode', isCorrect: true, feedback: 'Chính xác! DynamoDB tự động co giãn theo số lượng sinh viên nộp bài với 25GB miễn phí vĩnh viễn.' },
          { service: 'Amazon RDS Oracle EE', isCorrect: false, feedback: 'Sai! Bản quyền Oracle rất đắt và không tối ưu cho mô hình Serverless nhẹ.' }
        ]
      }
    ],
    successStory: '🎉 Bạn đã xây dựng giải pháp Serverless Event-Driven mẫu mực giúp trường đại học phát hiện sớm hàng trăm trường hợp sinh viên cần hỗ trợ!'
  }
];

export const MEMORY_CARD_PAIRS: MemoryCardPair[] = [
  { id: 'pair-1', service: 'Amazon EC2', role: 'Máy Chủ Ảo Co Giãn Linh Hoạt Trên Đám Mây', category: 'Compute' },
  { id: 'pair-2', service: 'Amazon S3', role: 'Lưu Trữ Đối Tượng 99.999999999% (11 Số 9) Độ Bền', category: 'Storage' },
  { id: 'pair-3', service: 'AWS Lambda', role: 'Chạy Code Không Cần Quản Lý Máy Chủ (Serverless)', category: 'Compute' },
  { id: 'pair-4', service: 'Amazon RDS', role: 'Cơ Sở Dữ Liệu Quan Hệ Đa Vùng Tự Động Failover', category: 'Database' },
  { id: 'pair-5', service: 'Amazon DynamoDB', role: 'Cơ Sở Dữ Liệu NoSQL Độ Trễ Dưới 10ms', category: 'Database' },
  { id: 'pair-6', service: 'Transit Gateway', role: 'Cloud Router Tập Trung Kết Nối Hàng Trăm VPCs', category: 'Networking' },
  { id: 'pair-7', service: 'AWS IAM', role: 'Quản Lý Danh Tính & Phân Quyền Least Privilege', category: 'Security' },
  { id: 'pair-8', service: 'Amazon SQS', role: 'Hàng Đợi Đệm Tin Nhắn Tách Rời Kiến Trúc (Buffer)', category: 'Integration' }
];

export const INCIDENT_SCENARIOS: IncidentScenario[] = [
  {
    id: 'inc-1',
    time: '08:02 AM - Ngày Đầu Học Kỳ',
    title: '🔥 CPU CƠ SỞ DỮ LIỆU CHẠM NGƯỠNG 99% - CỔNG SINH VIÊN BỊ TREO!',
    alertType: 'CRITICAL',
    description: '30,000 sinh viên đồng loạt đăng nhập tra cứu lịch học khiến Primary Database RDS PostgreSQL bị nghẽn 100% CPU. Tỷ lệ truy vấn đọc (SELECT) chiếm 95%. Bạn là Kỹ Sư Trực Vận Hành, bạn sẽ làm gì?',
    choices: [
      {
        id: 'A',
        action: 'Tạo gấp 3 RDS Read Replicas và điều hướng lưu lượng đọc sang Reader Endpoint.',
        isCorrect: true,
        uptimeImpact: 25,
        explanation: '✅ XUẤT SẮC! Read Replicas giải phóng ngay lập tức 95% áp lực đọc khỏi Primary DB, đưa CPU trở về mức an toàn 35% trong vài phút.'
      },
      {
        id: 'B',
        action: 'Tắt máy chủ cơ sở dữ liệu và khởi động lại ngay lập tức.',
        isCorrect: false,
        uptimeImpact: -40,
        explanation: '❌ SAI LẦM! Khởi động lại khi đang nghẽn sẽ làm đứt kết nối của hàng ngàn sinh viên và khi bật lại sẽ bị nghẽn dữ dội hơn.'
      },
      {
        id: 'C',
        action: 'Xóa bớt bảng dữ liệu điểm số của sinh viên các khóa trước.',
        isCorrect: false,
        uptimeImpact: -50,
        explanation: '❌ NGUY HIỂM! Xóa dữ liệu sinh viên vi phạm nghiêm trọng quy chế và không giải quyết được vấn đề CPU đang tải.'
      }
    ]
  },
  {
    id: 'inc-2',
    time: '02:15 PM - Giờ Hành Chính',
    title: '🚨 CẢNH BÁO AN NINH: PHÁT HIỆN PORT 22 (SSH) BỊ MỞ RA 0.0.0.0/0!',
    alertType: 'SECURITY',
    description: 'AWS GuardDuty phát hiện một Security Group của máy chủ lưu trữ hồ sơ sinh viên vừa bị một nhân viên IT mở cổng SSH ra toàn thế giới (0.0.0.0/0). Các IP lạ từ Internet đang cố gắng brute-force mật khẩu.',
    choices: [
      {
        id: 'A',
        action: 'Xóa ngay luật Inbound port 22 0.0.0.0/0 và chuyển sang kết nối bằng AWS Systems Manager Session Manager.',
        isCorrect: true,
        uptimeImpact: 20,
        explanation: '✅ CHUẨN XÁC! SSM Session Manager cho phép kỹ sư IT truy cập shell an toàn qua IAM mà không cần mở bất kỳ cổng Inbound nào ra ngoài.'
      },
      {
        id: 'B',
        action: 'Để nguyên cổng SSH mở và đổi mật khẩu máy chủ thành "12345678".',
        isCorrect: false,
        uptimeImpact: -60,
        explanation: '❌ THẢM HỌA! Máy chủ sẽ bị hacker chiếm quyền điều khiển trong vòng 2 phút và dữ liệu sinh viên sẽ bị rò rỉ.'
      },
      {
        id: 'C',
        action: 'Tắt dịch vụ AWS GuardDuty để không còn nhận thông báo cảnh báo.',
        isCorrect: false,
        uptimeImpact: -40,
        explanation: '❌ TẮT CẢNH BÁO không làm biến mất nguy cơ bị tấn công!'
      }
    ]
  },
  {
    id: 'inc-3',
    time: '11:45 PM - Nửa Đêm',
    title: '⚠️ BẢNG TẬP TIN S3 TRƯỜNG HỌC SẮP ĐẦY NGÂN SÁCH LƯU TRỮ!',
    alertType: 'WARNING',
    description: 'Dung lượng video bài giảng cũ và tài liệu nghiên cứu 5 năm trước trên S3 Standard đã lên tới 150TB, khiến chi phí tăng thêm $3,500 USD/tháng. Làm sao để giảm 80% chi phí lưu trữ mà vẫn giữ an toàn dữ liệu?',
    choices: [
      {
        id: 'A',
        action: 'Thiết lập S3 Lifecycle Rule tự động chuyển file trên 90 ngày sang S3 Glacier Flexible / Deep Archive.',
        isCorrect: true,
        uptimeImpact: 20,
        explanation: '✅ THÔNG THÁI! Glacier Deep Archive chỉ tốn ~$1/TB/tháng, giúp trường tiết kiệm hơn $3,000 USD/tháng mà vẫn lưu trữ được dữ liệu 10 năm.'
      },
      {
        id: 'B',
        action: 'Xóa vĩnh viễn toàn bộ video bài giảng của các giáo sư đã nghỉ hưu.',
        isCorrect: false,
        uptimeImpact: -30,
        explanation: '❌ KHÔNG ĐƯỢC PHÉP! Hồ sơ học thuật bắt buộc lưu giữ theo quy định kiểm định chất lượng giáo dục.'
      }
    ]
  }
];
