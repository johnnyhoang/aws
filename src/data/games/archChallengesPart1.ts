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

export const ARCH_CHALLENGES_PART1: ArchitectureChallenge[] = [
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
        nameEn: '2. Load Balancing & Elastic Compute Tier',
        description: 'Phân phối tải thông minh và tự động tăng giảm số lượng máy chủ theo CPU.',
        descriptionEn: 'Distribute incoming traffic across healthy web nodes and scale automatically based on CPU.',
        correctService: 'Application Load Balancer (ALB) + EC2 Auto Scaling',
        options: [
          { 
            service: 'Application Load Balancer (ALB) + EC2 Auto Scaling', 
            isCorrect: true, 
            feedback: 'Tuyệt vời! ALB chia tải qua 2 AZ và Auto Scaling tự tăng từ 2 lên 20 máy chủ khi sinh viên vào đông.',
            feedbackEn: 'Perfect! ALB balances across 2 AZs and Auto Scaling scales instances dynamically.'
          },
          { 
            service: 'Cố định 1 máy chủ EC2 t2.micro', 
            isCorrect: false, 
            feedback: 'Sai lầm! EC2 t2.micro chỉ có 1GB RAM, sẽ hết sạch bộ nhớ ngay trong 3 giây đầu tiên.',
            feedbackEn: 'Incorrect! Single t2.micro will instantly crash under load.'
          },
          { 
            service: 'AWS Storage Gateway', 
            isCorrect: false, 
            feedback: 'Sai! Storage Gateway là dịch vụ lưu trữ, không chạy được ứng dụng web.',
            feedbackEn: 'Incorrect! Storage Gateway is for hybrid on-premises file storage.'
          }
        ]
      },
      {
        name: '3. Tầng Cơ Sở Dữ Liệu Khả Dụng Cao (Database Tier)',
        nameEn: '3. Highly Available Multi-AZ Database Tier',
        description: 'Lưu trữ điểm và dữ liệu đăng ký với khả năng tự động khôi phục trong 30 giây.',
        descriptionEn: 'Persist student course enrollments with automatic sub-30s failover.',
        correctService: 'Amazon Aurora PostgreSQL Multi-AZ with Read Replicas',
        options: [
          { 
            service: 'Amazon Aurora PostgreSQL Multi-AZ with Read Replicas', 
            isCorrect: true, 
            feedback: 'Xuất sắc! Primary DB xử lý ghi đăng ký, Read Replicas chia tải xem thời khóa biểu, Multi-AZ tự failover.',
            feedbackEn: 'Outstanding! Primary instance handles writes, Read Replicas offload queries, Multi-AZ provides 30s failover.'
          },
          { 
            service: 'File Excel lưu trên ổ đĩa C của máy tính', 
            isCorrect: false, 
            feedback: 'Cực kỳ nguy hiểm! Không hỗ trợ ghi đồng thời (Concurrency Lock) và dễ bị hỏng file.',
            feedbackEn: 'Dangerous! Excel does not support high concurrency.'
          },
          { 
            service: 'Amazon S3 Glacier Deep Archive', 
            isCorrect: false, 
            feedback: 'Sai! Glacier Deep Archive mất 12 tiếng để đọc dữ liệu, không thể dùng cho ứng dụng thời gian thực.',
            feedbackEn: 'Incorrect! Deep Archive takes 12 hours to retrieve data.'
          }
        ]
      }
    ],
    successStory: '🎉 Bạn đã thiết kế thành công kiến trúc Multi-Tier phục vụ 30,000 sinh viên không bị nghẽn 1 mili-giây nào!',
    successStoryEn: '🎉 Congratulations! Your Well-Architected Multi-Tier architecture handled 30,000 concurrent students with 0ms downtime!'
  },
  {
    id: 'arch-2',
    title: 'Thử Thách 2: Hệ Thống Cảnh Báo Sớm Sinh Viên Nguy Cơ Trượt Môn (Canvas LMS)',
    titleEn: 'Challenge 2: Canvas LMS Real-Time Early Risk Alert Pipeline',
    scenario: 'Phòng Đào Tạo muốn nhận Webhook sự kiện nộp bài muộn hoặc điểm thấp từ Canvas LMS của 25,000 sinh viên, sau đó xử lý tức thời và gửi email/SMS cảnh báo cố vấn học tập trong vòng 5 giây.',
    scenarioEn: 'Academic Affairs needs to ingest webhooks from Canvas LMS for 25,000 students, evaluate academic failure risks, and trigger instant SMS/Email alerts to advisors within 5 seconds.',
    targetUptime: '99.99%',
    budgetGoal: 'Serverless 100% - Trả tiền đúng số lượt gọi',
    layers: [
      {
        name: '1. Tầng Tiếp Nhận Webhook Tốc Độ Cao (API Ingestion Tier)',
        nameEn: '1. API Ingestion Tier',
        description: 'Điểm đầu cuối HTTPS tiếp nhận hàng ngàn Webhook/giây từ hệ thống Canvas LMS.',
        descriptionEn: 'Public HTTPS endpoint receiving thousands of webhooks per second with zero server maintenance.',
        correctService: 'Amazon API Gateway (HTTP API)',
        options: [
          {
            service: 'Amazon API Gateway (HTTP API)',
            isCorrect: true,
            feedback: 'Chính xác! API Gateway tự động mở rộng chịu hàng ngàn request/giây mà không cần quản lý máy chủ.',
            feedbackEn: 'Correct! API Gateway provides serverless scalability for high-throughput webhook bursts.'
          },
          {
            service: 'Thuê máy chủ Dedicated Server vật lý',
            isCorrect: false,
            feedback: 'Lãng phí! Máy chủ vật lý tốn hàng ngàn USD tiền duy trì và không tự mở rộng khi có đợt thi cử đột biến.',
            feedbackEn: 'Inefficient! Dedicated hardware lacks elastic scalability for exam bursts.'
          },
          {
            service: 'AWS Snowball Edge',
            isCorrect: false,
            feedback: 'Sai hoàn toàn! Snowball là thiết bị chuyển dữ liệu bằng xe tải vật lý.',
            feedbackEn: 'Incorrect! Snowball is for physical offline data transport.'
          }
        ]
      },
      {
        name: '2. Tầng Tính Toán & Đánh Giá Điểm Rủi Ro (Compute & Logic Tier)',
        nameEn: '2. Serverless Business Logic Tier',
        description: 'Chạy mã phân tích điểm số và điều phối luồng cảnh báo theo sự kiện (Event-Driven).',
        descriptionEn: 'Execute risk analysis algorithms and trigger notification workflows.',
        correctService: 'AWS Lambda + AWS Step Functions',
        options: [
          {
            service: 'AWS Lambda + AWS Step Functions',
            isCorrect: true,
            feedback: 'Chuẩn AWS Serverless! Lambda thực thi code trong vài mili-giây và Step Functions điều phối quy trình nhắc nhở.',
            feedbackEn: 'Perfect! Lambda executes stateless Python/Node code and Step Functions manages remediation state.'
          },
          {
            service: 'Amazon EC2 Spot Instances chạy thủ công cronjob',
            isCorrect: false,
            feedback: 'Không phù hợp! Spot Instance có thể bị thu hồi bất cứ lúc nào khiến cảnh báo bị mất hoặc trễ.',
            feedbackEn: 'Risky! Spot instances can be reclaimed abruptly, dropping critical alerts.'
          },
          {
            service: 'AWS Storage Gateway',
            isCorrect: false,
            feedback: 'Sai! Storage Gateway không chạy mã logic.',
            feedbackEn: 'Incorrect! Storage Gateway does not execute compute logic.'
          }
        ]
      },
      {
        name: '3. Tầng Lưu Trữ Trạng Thái & Bắn Thông Báo (Data & Notification Tier)',
        nameEn: '3. Real-Time Storage & Alert Broadcast Tier',
        description: 'Lưu lịch sử cảnh báo với độ trễ < 5ms và gửi tin nhắn SMS/Email đa kênh đến Cố Vấn.',
        descriptionEn: 'Store advisor notes with single-digit ms latency and broadcast urgent SMS/Email alerts.',
        correctService: 'Amazon DynamoDB + Amazon SNS',
        options: [
          {
            service: 'Amazon DynamoDB + Amazon SNS',
            isCorrect: true,
            feedback: 'Đỉnh cao Serverless! DynamoDB đọc ghi dưới 5 mili-giây và SNS phát thông báo SMS/Email ngay tức khắc.',
            feedbackEn: 'Flawless! DynamoDB offers sub-10ms key-value lookups and SNS fans out instant push/SMS/email.'
          },
          {
            service: 'Gửi thư bưu điện thủ công',
            isCorrect: false,
            feedback: 'Quá chậm trễ! Sinh viên có thể đã trượt môn trước khi nhận được thư.',
            feedbackEn: 'Too slow! Paper mail takes days.'
          },
          {
            service: 'Amazon Redshift Data Warehouse',
            isCorrect: false,
            feedback: 'Không tối ưu! Redshift dành cho phân tích dữ liệu lớn định kỳ (OLAP), không dùng cho thông báo thời gian thực (OLTP).',
            feedbackEn: 'Suboptimal! Redshift is an analytical data warehouse, not a fast transactional message broker.'
          }
        ]
      }
    ],
    successStory: '🎉 Hệ thống Serverless Canvas Risk Pipeline hoạt động hoàn hảo! Đã cứu 1,200 sinh viên khỏi nguy cơ học lại!',
    successStoryEn: '🎉 Serverless Early Warning pipeline active! Successfully alerted advisors and helped 1,200 students improve grades!'
  },
  {
    id: 'arch-3',
    title: 'Thử Thách 3: Viện Nghiên Cứu Y Sinh Xử Lý Big Data Bộ Gen Di Truyền',
    titleEn: 'Challenge 3: Bioinformatics High-Performance Genomics Batch Processing',
    scenario: 'Viện Y Sinh Trường Đại học cần phân tích 100TB dữ liệu chuỗi DNA mỗi tuần từ các máy giải trình tự gen. Yêu cầu: Chạy hàng trăm tác vụ Docker tính toán nặng với chi phí rẻ nhất (tiết kiệm 70-90%) và lưu trữ an toàn chuẩn HIPAA/FERPA.',
    scenarioEn: 'The University Medical Research Center processes 100TB of raw genomic FASTQ data weekly. Requirements: Run hundreds of parallel Docker bio-containers at minimal cost (70-90% discount) while adhering to HIPAA compliance.',
    targetUptime: '99.9%',
    budgetGoal: 'Tiết kiệm 80% bằng EC2 Spot & S3 Lifecycle',
    layers: [
      {
        name: '1. Tầng Hồ Chứa Dữ Liệu Dạng Thô (Genomic Data Lake)',
        nameEn: '1. Raw Genomic Data Lake Tier',
        description: 'Lưu trữ hàng trăm Terabytes file FASTQ/BAM với độ bền 99.999999999% (11 số 9) và tự động giảm chi phí theo thời gian.',
        descriptionEn: 'Store hundreds of TBs of sequenced genome files with 11 9s durability and automatic lifecycle tiering.',
        correctService: 'Amazon S3 Standard + S3 Intelligent-Tiering',
        options: [
          {
            service: 'Amazon S3 Standard + S3 Intelligent-Tiering',
            isCorrect: true,
            feedback: 'Chính xác! S3 Intelligent-Tiering tự động chuyển các file DNA ít đọc sang tầng rẻ hơn mà không cần cấu hình thủ công.',
            feedbackEn: 'Correct! Intelligent-Tiering moves inactive genomic files to colder tiers without retrieval penalties.'
          },
          {
            service: 'Ổ cứng gắn ngoài USB cắm vào máy tính trưởng phòng',
            isCorrect: false,
            feedback: 'Nguy hiểm! Dễ hỏng hóc, không mã hóa và vi phạm luật an toàn sinh học y tế.',
            feedbackEn: 'Critical risk! USB drives lack redundancy and violate HIPAA compliance.'
          },
          {
            service: 'Amazon ElastiCache Redis',
            isCorrect: false,
            feedback: 'Sai lầm đắt đỏ! Redis là bộ nhớ RAM In-Memory đắt tiền, lưu 100TB sẽ tốn hàng trăm ngàn USD.',
            feedbackEn: 'Prohibitively expensive! In-memory RAM storage is not suited for 100TB cold files.'
          }
        ]
      },
      {
        name: '2. Tầng Tính Toán Phân Tán Song Song (High Performance Batch Compute)',
        nameEn: '2. High Performance Distributed Batch Compute',
        description: 'Điều phối và phân phối hàng trăm Docker Container giải mã gen chạy trên các máy ảo CPU cao với giá rẻ nhất.',
        descriptionEn: 'Orchestrate hundreds of Docker genomics workers on discounted compute instances.',
        correctService: 'AWS Batch + EC2 Spot Instances',
        options: [
          {
            service: 'AWS Batch + EC2 Spot Instances',
            isCorrect: true,
            feedback: 'Chuẩn kiến trúc Big Data! AWS Batch tự động quản lý hàng đợi và EC2 Spot giúp giảm tới 80% chi phí tính toán.',
            feedbackEn: 'Ideal for HPC! AWS Batch manages job queues while Spot Instances reduce compute spend by up to 80%.'
          },
          {
            service: '1 máy tính xách tay Core i5 chạy liên tục 3 tháng',
            isCorrect: false,
            feedback: 'Quá tải! Laptop sẽ bị nóng và hỏng phần cứng trước khi phân tích xong 1 mẫu gen.',
            feedbackEn: 'Impossible! A laptop would overheat and take years to process 100TB.'
          },
          {
            service: 'AWS Route 53',
            isCorrect: false,
            feedback: 'Sai! Route 53 là dịch vụ định tuyến DNS, không có chức năng tính toán xử lý dữ liệu.',
            feedbackEn: 'Incorrect! Route 53 is a DNS service, not compute.'
          }
        ]
      },
      {
        name: '3. Tầng Truy Vấn & Trực Quan Hóa Kết Quả (Interactive Query & Analytics)',
        nameEn: '3. Serverless Query & Dashboard Analytics',
        description: 'Cho phép các nhà khoa học truy vấn dữ liệu đột biến gen trực tiếp trên S3 bằng câu lệnh SQL không cần load vào DB.',
        descriptionEn: 'Allow researchers to query petabytes of output files directly in S3 using standard SQL without maintaining servers.',
        correctService: 'Amazon Athena + Amazon QuickSight',
        options: [
          {
            service: 'Amazon Athena + Amazon QuickSight',
            isCorrect: true,
            feedback: 'Xuất sắc! Athena truy vấn SQL Serverless trực tiếp trên file S3 và QuickSight vẽ biểu đồ đột biến gen trực quan.',
            feedbackEn: 'Outstanding! Athena queries S3 with serverless Presto SQL and QuickSight provides ML-powered dashboards.'
          },
          {
            service: 'In toàn bộ file văn bản ra giấy để các nhà khoa học đọc',
            isCorrect: false,
            feedback: 'Không khả thi! 100TB dữ liệu nếu in ra giấy sẽ tốn hàng triệu trang in.',
            feedbackEn: 'Absurd! Petabytes of DNA data cannot be read on paper.'
          },
          {
            service: 'AWS Shield Advanced',
            isCorrect: false,
            feedback: 'Sai! Shield Advanced là dịch vụ chống tấn công DDoS Lớp 7, không phân tích dữ liệu.',
            feedbackEn: 'Incorrect! Shield Advanced is for Layer 7 DDoS defense.'
          }
        ]
      }
    ],
    successStory: '🎉 Viện Y Sinh đã giải mã thành công 1,000 bộ gen di truyền với chi phí chỉ bằng 20% so với phương pháp truyền thống!',
    successStoryEn: '🎉 Medical Research Center successfully processed 1,000 genomes at 80% cost reduction!'
  },
  {
    id: 'arch-4',
    title: 'Thử Thách 4: Nền Tảng Video Giảng Đường Toàn Cầu (Global Video on Demand)',
    titleEn: 'Challenge 4: Global Video on Demand & Lecture Streaming Platform',
    scenario: 'Trường Đại học cần xây dựng nền tảng phát video bài giảng trực tuyến chất lượng cao (HLS/DASH 4K) cho sinh viên quốc tế tại 40 quốc gia. Yêu cầu: Tự động chuyển đổi định dạng video khi upload và phát mượt mà không bị buffer.',
    scenarioEn: 'The University needs a global Video-on-Demand (VoD) lecture platform for international students across 40 countries with automatic multi-bitrate transcoding and sub-second playback.',
    targetUptime: '99.99%',
    budgetGoal: 'Tự động mã hóa theo sự kiện (Event-Driven MediaConvert)',
    layers: [
      {
        name: '1. Tầng Tiếp Nhận & Chuyển Đổi Định Dạng Video (Transcoding Ingestion)',
        nameEn: '1. Media Ingestion & Transcoding Pipeline',
        description: 'Tự động kích hoạt khi giáo sư tải video lên S3 để chuyển đổi sang các độ phân giải 1080p, 720p, 480p thích ứng.',
        descriptionEn: 'Automatically transcode uploaded lecture MP4s into adaptive bitrate HLS/DASH streams.',
        correctService: 'S3 Event Notifications + AWS Elemental MediaConvert',
        options: [
          {
            service: 'S3 Event Notifications + AWS Elemental MediaConvert',
            isCorrect: true,
            feedback: 'Chính xác! S3 bắn sự kiện sang MediaConvert để tự động xuất ra định dạng HLS đa băng thông chuẩn phát sóng.',
            feedbackEn: 'Correct! MediaConvert transforms raw files into adaptive streaming formats effortlessly.'
          },
          {
            service: 'Mở phần mềm chỉnh video trên máy tính giảng viên để render từng độ phân giải',
            isCorrect: false,
            feedback: 'Quá thủ công và mất thời gian của giảng viên!',
            feedbackEn: 'Manual and inefficient for faculty staff.'
          },
          {
            service: 'AWS Snowmobile',
            isCorrect: false,
            feedback: 'Sai hoàn toàn! Snowmobile là xe container chở dữ liệu 100PB.',
            feedbackEn: 'Incorrect! Snowmobile is a shipping container truck for 100PB migrations.'
          }
        ]
      },
      {
        name: '2. Tầng Mạng Phân Phối Video Tốc Độ Cao (Global Video Delivery)',
        nameEn: '2. Global Video Delivery & Edge Caching',
        description: 'Phát các đoạn video HLS (segments) từ hơn 450 điểm biên toàn cầu để sinh viên xem mượt mà.',
        descriptionEn: 'Distribute video chunks from 450+ edge locations worldwide with ultra-low latency.',
        correctService: 'Amazon CloudFront (Video Streaming Optimized)',
        options: [
          {
            service: 'Amazon CloudFront (Video Streaming Optimized)',
            isCorrect: true,
            feedback: 'Chuẩn xác! CloudFront cache video gần sinh viên nhất, loại bỏ hiện tượng giật lag khi học từ nước ngoài.',
            feedbackEn: 'Flawless! CloudFront edge caches video segments globally, preventing rebuffering.'
          },
          {
            service: 'Mở cổng FTP trên 1 máy chủ Windows Server',
            isCorrect: false,
            feedback: 'Lỗ hổng bảo mật và giao thức FTP không hỗ trợ tua video hay phát luồng thích ứng!',
            feedbackEn: 'Insecure! FTP does not support adaptive bitrate streaming.'
          },
          {
            service: 'AWS Direct Connect',
            isCorrect: false,
            feedback: 'Sai! Sinh viên học online tại nhà dùng mạng Internet công cộng, không thể dùng Direct Connect.',
            feedbackEn: 'Incorrect! Remote students cannot physically plug into Direct Connect.'
          }
        ]
      },
      {
        name: '3. Tầng Quản Lý Quyền & Link Có Thời Hạn (Signed URLs & Protection)',
        nameEn: '3. Video Content Protection & Signed URLs',
        description: 'Chỉ cho phép sinh viên đã đóng học phí được xem video, chống tải lậu bằng đường link có thời hạn.',
        descriptionEn: 'Restrict video access to enrolled students only using cryptographically signed URLs.',
        correctService: 'CloudFront Signed URLs / Signed Cookies + KMS',
        options: [
          {
            service: 'CloudFront Signed URLs / Signed Cookies + KMS',
            isCorrect: true,
            feedback: 'Bảo mật hoàn hảo! Signed URL tạo link chỉ có hiệu lực 2 giờ gắn với token của sinh viên đã đăng nhập.',
            feedbackEn: 'Best Practice! Signed URLs ensure only authenticated students with active tokens can decrypt streams.'
          },
          {
            service: 'Để link video công khai cho bất kỳ ai trên Internet truy cập',
            isCorrect: false,
            feedback: 'Mất bản quyền bài giảng và vi phạm quy định sở hữu trí tuệ của trường đại học.',
            feedbackEn: 'Violates copyright and intellectual property protections.'
          },
          {
            service: 'Amazon RDS for Oracle',
            isCorrect: false,
            feedback: 'Không đúng! Cơ sở dữ liệu không có tính năng tạo Signed URL và phát luồng video trực tiếp.',
            feedbackEn: 'Incorrect! Relational databases do not deliver cryptographic video tokens.'
          }
        ]
      }
    ],
    successStory: '🎉 Hệ thống Streaming bài giảng toàn cầu đã sẵn sàng! Hơn 10,000 sinh viên tại 40 quốc gia xem mượt mà không 1 giây giật lag!',
    successStoryEn: '🎉 Global lecture streaming platform launched! Over 10,000 students across 40 countries streaming 4K lectures smoothly!'
  }
];
