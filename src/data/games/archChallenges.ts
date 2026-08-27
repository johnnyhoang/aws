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
  },
  {
    id: 'arch-3',
    title: 'Thử Thách 3: Viện Nghiên Cứu Y Sinh Xử Lý Dữ Liệu Bộ Gen (Genomics Big Data)',
    titleEn: 'Challenge 3: Biomedical Genomics Big Data Batch Pipeline',
    scenario: 'Viện Nghiên cứu Y sinh của trường nhận hàng trăm Terabyte dữ liệu giải mã chuỗi ADN từ máy phân tích sinh học. Dữ liệu cần được lưu trữ bảo mật và xử lý theo từng lô lớn (Batch Processing) ban đêm với chi phí rẻ nhất.',
    scenarioEn: 'A university biomedical research institute ingests 100+ TB of raw DNA genomic sequence files daily. The files must be archived securely and processed overnight in large batch compute jobs at minimal cost.',
    targetUptime: 'Batch SLA 99.9%',
    budgetGoal: 'Tiết kiệm 80% bằng Spot Instances',
    layers: [
      {
        name: '1. Tầng Thu Nhận & Lưu Trữ Thô Dài Hạn',
        nameEn: '1. Raw Genomics Storage & Lifecycle Tier',
        description: 'Lưu trữ tệp FASTQ/BAM khổng lồ với khả năng tự động chuyển xuống Glacier sau 30 ngày.',
        descriptionEn: 'Store petabytes of raw BAM/FASTQ sequencing files with automated lifecycle rules.',
        correctService: 'Amazon S3 Standard + S3 Intelligent-Tiering & Lifecycle to Glacier',
        options: [
          {
            service: 'Amazon S3 Standard + S3 Intelligent-Tiering & Lifecycle to Glacier',
            isCorrect: true,
            feedback: 'Chính xác! S3 cung cấp 11 số 9 độ bền và tự động chuyển dữ liệu cũ sang Glacier để giảm chi phí 90%.',
            feedbackEn: 'Correct! S3 delivers 11 9s durability and automated lifecycle transition cuts storage costs by 90%.'
          },
          {
            service: 'Amazon EBS gp3 Volume 100TB cố định',
            isCorrect: false,
            feedback: 'Sai! EBS gắn liền với EC2, chi phí rất đắt ($0.08/GB) và không tự co giãn dung lượng vô hạn.',
            feedbackEn: 'Incorrect! EBS is expensive block storage and lacks object lifecycle automation.'
          }
        ]
      },
      {
        name: '2. Tầng Điều Phối & Tính Toán Lô Quy Mô Lớn',
        nameEn: '2. Batch Compute Orchestration Tier',
        description: 'Tự động khởi chạy hàng trăm worker tính toán chạy song song bằng Spot Instances.',
        descriptionEn: 'Orchestrate distributed genomic alignment algorithms using interruptible Spot instances.',
        correctService: 'AWS Batch + EC2 Spot Instances + AWS Step Functions',
        options: [
          {
            service: 'AWS Batch + EC2 Spot Instances + AWS Step Functions',
            isCorrect: true,
            feedback: 'Tuyệt vời! AWS Batch tự động quản lý hàng đợi container trên EC2 Spot giúp giảm tới 90% chi phí điện toán.',
            feedbackEn: 'Outstanding! AWS Batch dynamically provisions containerized compute on Spot instances saving up to 90%.'
          },
          {
            service: '1 máy chủ Windows Server t3.nano',
            isCorrect: false,
            feedback: 'Sai! t3.nano chỉ có 0.5GB RAM, sẽ mất hàng chục năm để tính toán xong bộ gen người.',
            feedbackEn: 'Incorrect! t3.nano lacks the RAM and CPU required for heavy genomic analysis.'
          }
        ]
      },
      {
        name: '3. Tầng Truy Vấn & Trực Quan Hóa Kết Quả',
        nameEn: '3. Serverless Analytics & Visualization Tier',
        description: 'Truy vấn trực tiếp kết quả đột biến gen bằng SQL không cần dựng Server DB.',
        descriptionEn: 'Query analytical mutation metrics directly from S3 parquet files with standard SQL.',
        correctService: 'Amazon Athena + Amazon QuickSight',
        options: [
          {
            service: 'Amazon Athena + Amazon QuickSight',
            isCorrect: true,
            feedback: 'Xuất sắc! Athena chỉ tính tiền $5 cho mỗi 1TB dữ liệu quét qua, QuickSight trực quan biểu đồ nghiên cứu.',
            feedbackEn: 'Correct! Athena queries S3 serverless at $5/TB scanned, paired with QuickSight dashboards.'
          },
          {
            service: 'MySQL cài trên máy tính cá nhân',
            isCorrect: false,
            feedback: 'Sai! Cơ sở dữ liệu cục bộ không thể chia sẻ cho các nhà khoa học trên toàn cầu.',
            feedbackEn: 'Incorrect! Local desktop databases cannot scale or support global collaboration.'
          }
        ]
      }
    ],
    successStory: '🎉 Bạn đã xây dựng hệ thống phân tích Big Data Y Sinh đẳng cấp thế giới, giúp các nhà khoa học tiết kiệm hàng trăm ngàn USD ngân sách nghiên cứu!',
    successStoryEn: '🎉 World-Class Genomics Pipeline! You engineered an automated Big Data architecture saving hundreds of thousands of research grant dollars!'
  }
];
