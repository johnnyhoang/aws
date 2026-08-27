import { ArchitectureChallenge } from './archChallengesPart1';

export const ARCH_CHALLENGES_PART2: ArchitectureChallenge[] = [
  {
    id: 'arch-5',
    title: 'Thử Thách 5: Cổng Đăng Nhập Một Lần (SSO) & Quản Trị Danh Tính 50,000 Tài Khoản',
    titleEn: 'Challenge 5: Enterprise Single Sign-On (SSO) & Identity Federation',
    scenario: 'Hệ thống trường đại học cần tích hợp hệ thống danh tính On-premise Active Directory của 50,000 cán bộ/sinh viên với hàng trăm ứng dụng AWS và dịch vụ đám mây (Canvas, Zoom, Office 365) thông qua chuẩn SAML 2.0 / OIDC.',
    scenarioEn: 'Unify 50,000 student and faculty identities from on-premises Active Directory with AWS services and SaaS apps (Canvas LMS, Zoom) via SAML 2.0 / OIDC federation.',
    targetUptime: '99.999%',
    budgetGoal: 'Bảo mật tối đa với Zero-Trust & MFA',
    layers: [
      {
        name: '1. Tầng Kết Nối Danh Tính Lai (Hybrid Identity Federation)',
        nameEn: '1. Hybrid Identity Connector',
        description: 'Đồng bộ hóa an toàn Active Directory của trường học lên AWS mà không cần sao chép mật khẩu thô.',
        descriptionEn: 'Connect on-prem Microsoft Active Directory to AWS cloud identity with SAML 2.0 / Kerberos token trust.',
        correctService: 'AWS IAM Identity Center (AWS SSO) + Active Directory Connector',
        options: [
          {
            service: 'AWS IAM Identity Center (AWS SSO) + Active Directory Connector',
            isCorrect: true,
            feedback: 'Chuẩn doanh nghiệp! Cho phép sinh viên dùng chung 1 tài khoản trường để đăng nhập mọi tài nguyên AWS an toàn.',
            feedbackEn: 'Enterprise standard! Enables frictionless SSO across multiple AWS accounts and SaaS portals.'
          },
          {
            service: 'Ghi tên đăng nhập và mật khẩu vào file text gửi email cho sinh viên',
            isCorrect: false,
            feedback: 'Thảm họa an ninh mạng nghiêm trọng!',
            feedbackEn: 'Severe security violation!'
          },
          {
            service: 'Amazon EMR (Elastic MapReduce)',
            isCorrect: false,
            feedback: 'Sai! EMR là dịch vụ xử lý dữ liệu Hadoop/Spark, không quản lý danh tính.',
            feedbackEn: 'Incorrect! EMR is a big data framework.'
          }
        ]
      },
      {
        name: '2. Tầng Xác Thực 2 Bước & Kiểm Soát Truy Cập (MFA & Conditional Access)',
        nameEn: '2. Multi-Factor Authentication & Role-Based Access',
        description: 'Bắt buộc xác thực đa yếu tố (FIDO2/WebAuthn) và chỉ cấp quyền tạm thời (Temporary Credentials) theo vai trò.',
        descriptionEn: 'Enforce hardware MFA and issue short-lived STS temporary credentials based on department roles.',
        correctService: 'AWS Security Token Service (STS) + FIDO2 MFA Policies',
        options: [
          {
            service: 'AWS Security Token Service (STS) + FIDO2 MFA Policies',
            isCorrect: true,
            feedback: 'Nguyên tắc Zero-Trust! AWS STS chỉ cấp session token tạm thời có hạn 1-12 giờ, ngăn chặn rủi ro lộ mật khẩu.',
            feedbackEn: 'Zero-Trust compliant! Issues short-lived cryptographic credentials that expire automatically.'
          },
          {
            service: 'Cấp tài khoản AWS Root vĩnh viễn cho tất cả sinh viên',
            isCorrect: false,
            feedback: 'Cực kỳ nguy hiểm! Sinh viên có thể vô tình xóa sạch toàn bộ hệ thống trường học.',
            feedbackEn: 'Catastrophic risk! Never issue root permissions to users.'
          },
          {
            service: 'AWS Glue',
            isCorrect: false,
            feedback: 'Sai! AWS Glue là dịch vụ ETL dữ liệu, không cấp token xác thực người dùng.',
            feedbackEn: 'Incorrect! AWS Glue is an ETL catalog service.'
          }
        ]
      },
      {
        name: '3. Tầng Ghi Nhận Kiểm Toán & Phát Hiện Xâm Nhập (Identity Audit & Threat Detection)',
        nameEn: '3. Identity Audit & Threat Detection',
        description: 'Theo dõi mọi hành vi đăng nhập bất thường (ví dụ: đăng nhập từ 2 quốc gia cách nhau 15 phút) và tự động khóa tài khoản.',
        descriptionEn: 'Analyze login anomalies (impossible travel, compromised credentials) using AI threat intelligence.',
        correctService: 'AWS CloudTrail + Amazon GuardDuty (IAM Anomaly Detection)',
        options: [
          {
            service: 'AWS CloudTrail + Amazon GuardDuty (IAM Anomaly Detection)',
            isCorrect: true,
            feedback: 'Xuất sắc! CloudTrail ghi nhận 100% nhật ký API và GuardDuty dùng Machine Learning để cảnh báo tấn công chiếm đoạt tài khoản.',
            feedbackEn: 'Outstanding! CloudTrail records all API activity while GuardDuty detects credential compromises in real time.'
          },
          {
            service: 'Không cần ghi nhật ký để tiết kiệm dung lượng ổ đĩa',
            isCorrect: false,
            feedback: 'Vi phạm kiểm toán! Luật liên bang FERPA bắt buộc phải lưu trữ nhật ký truy cập hệ thống tối thiểu 1 năm.',
            feedbackEn: 'Fails federal audit compliance! Audit logs must be retained for forensic compliance.'
          },
          {
            service: 'Amazon Neptune Graph Database',
            isCorrect: false,
            feedback: 'Sai! Neptune là cơ sở dữ liệu đồ thị, không thay thế cho hệ thống giám sát bảo mật.',
            feedbackEn: 'Incorrect! Neptune is a graph database.'
          }
        ]
      }
    ],
    successStory: '🎉 Cổng Single Sign-On của trường đã bảo vệ an toàn 50,000 danh tính và chặn đứng 100% các cuộc tấn công Brute-Force!',
    successStoryEn: '🎉 Enterprise SSO portal successfully securing 50,000 campus accounts with Zero-Trust compliance!'
  },
  {
    id: 'arch-6',
    title: 'Thử Thách 6: Hệ Thống AI Chatbot Tuyển Sinh 24/7 (Generative AI RAG Pipeline)',
    titleEn: 'Challenge 6: Campus Admissions Generative AI Assistant (Bedrock RAG Pipeline)',
    scenario: 'Bộ phận Tuyển Sinh cần một AI Trợ Lý ảo hoạt động 24/7, có khả năng trả lời chính xác học phí, điều kiện học bổng từ 500 trang tài liệu PDF tuyển sinh của trường bằng tiếng Anh & tiếng Việt mà KHÔNG bị bịa đặt thông tin (Zero Hallucination).',
    scenarioEn: 'Admissions needs a 24/7 Generative AI assistant to answer complex tuition, scholarship, and visa questions from 500 PDF catalog pages with zero hallucination using Retrieval-Augmented Generation (RAG).',
    targetUptime: '99.9%',
    budgetGoal: 'Serverless Generative AI theo lượt truy vấn',
    layers: [
      {
        name: '1. Tầng Nhúng Vector & Cơ Sở Dữ Liệu Tri Thức (Vector Embedding & Knowledge Base)',
        nameEn: '1. Vector Embedding & Knowledge Base Tier',
        description: 'Chia nhỏ tài liệu PDF tuyển sinh, chuyển thành Vector Embeddings và lưu trữ để tìm kiếm ngữ nghĩa chính xác.',
        descriptionEn: 'Chunk admissions PDFs, generate semantic embeddings, and store them for hybrid keyword/vector search.',
        correctService: 'Amazon S3 + Amazon OpenSearch Serverless (Vector Search)',
        options: [
          {
            service: 'Amazon S3 + Amazon OpenSearch Serverless (Vector Search)',
            isCorrect: true,
            feedback: 'Chính xác! OpenSearch Vector Search tìm kiếm đoạn văn bản tuyển sinh phù hợp nhất trong 10 mili-giây.',
            feedbackEn: 'Correct! OpenSearch Serverless Vector Engine indexes documents for ultra-fast semantic retrieval.'
          },
          {
            service: 'Lưu toàn bộ PDF vào 1 bảng SQLite trên máy cá nhân',
            isCorrect: false,
            feedback: 'Không thể mở rộng và không hỗ trợ tìm kiếm ngữ nghĩa vector!',
            feedbackEn: 'SQLite cannot perform high-scale k-NN vector embeddings search.'
          },
          {
            service: 'AWS Snowcone',
            isCorrect: false,
            feedback: 'Sai! Snowcone là thiết bị lưu trữ vật lý di động.',
            feedbackEn: 'Incorrect! Snowcone is a portable edge device.'
          }
        ]
      },
      {
        name: '2. Tầng Mô Hình Ngôn Ngữ Lớn & RAG (Foundation Model & RAG Generation)',
        nameEn: '2. Generative AI Foundation Model Tier',
        description: 'Truyền đoạn trích dẫn vào mô hình AI Claude/Titan để sinh câu trả lời chính xác, dẫn nguồn trang PDF.',
        descriptionEn: 'Pass retrieved context into enterprise LLMs to synthesize human-like responses with strict citations.',
        correctService: 'Amazon Bedrock (Claude 3.5 Sonnet / Titan Text) with Guardrails',
        options: [
          {
            service: 'Amazon Bedrock (Claude 3.5 Sonnet / Titan Text) with Guardrails',
            isCorrect: true,
            feedback: 'Chuẩn AWS GenAI! Bedrock bảo mật tuyệt đối dữ liệu trường học (không dùng để train AI công cộng) và Guardrails chặn câu hỏi nhạy cảm.',
            feedbackEn: 'State-of-the-art GenAI! Bedrock ensures university data privacy and enforces content safety guardrails.'
          },
          {
            service: 'Tự mua 20 card đồ họa NVIDIA về cắm trong phòng thí nghiệm',
            isCorrect: false,
            feedback: 'Quá tốn kém chi phí điện năng, bảo trì và không có khả năng tự động mở rộng theo tải.',
            feedbackEn: 'Extremely costly hardware with high power consumption and no elastic scaling.'
          },
          {
            service: 'Amazon Simple Email Service (SES)',
            isCorrect: false,
            feedback: 'Sai! SES là dịch vụ gửi email, không có trí tuệ nhân tạo LLM.',
            feedbackEn: 'Incorrect! SES is an email transmission API.'
          }
        ]
      },
      {
        name: '3. Tầng Giao Diện Người Dùng & Bộ Nhớ Hội Thoại (Conversational Interface & Session Cache)',
        nameEn: '3. Web Chat Interface & Session Cache',
        description: 'Lưu trữ ngữ cảnh lịch sử trò chuyện của phụ huynh/học sinh để AI hiểu được các câu hỏi nối tiếp.',
        descriptionEn: 'Cache multi-turn conversation sessions with sub-millisecond response latency.',
        correctService: 'Amazon DynamoDB + Amazon API Gateway WebSocket',
        options: [
          {
            service: 'Amazon DynamoDB + Amazon API Gateway WebSocket',
            isCorrect: true,
            feedback: 'Tuyệt vời! WebSocket cho trải nghiệm phản hồi dạng gõ chữ từng từ (Streaming response) và DynamoDB lưu lịch sử chat.',
            feedbackEn: 'Perfect! WebSocket API enables real-time token streaming and DynamoDB maintains chat memory.'
          },
          {
            service: 'Bắt người dùng tải lại trang web (F5) mỗi khi AI trả lời xong 1 câu',
            isCorrect: false,
            feedback: 'Trải nghiệm người dùng tệ hại!',
            feedbackEn: 'Terrible user experience!'
          },
          {
            service: 'AWS Direct Connect',
            isCorrect: false,
            feedback: 'Sai! Direct Connect không dùng để lưu phiên chat người dùng.',
            feedbackEn: 'Incorrect! Direct Connect is dedicated physical telecommunications.'
          }
        ]
      }
    ],
    successStory: '🎉 Chatbot AI Tuyển Sinh đã trả lời hơn 50,000 câu hỏi của phụ huynh với độ chính xác 99.8% và 0 giây bịa đặt!',
    successStoryEn: '🎉 Admissions AI Assistant deployed! Successfully answered 50,000 prospective student queries with 99.8% accuracy!'
  },
  {
    id: 'arch-7',
    title: 'Thử Thách 7: Hạ Tầng Khôi Phục Thảm Họa Đa Khu Vực (Multi-Region Disaster Recovery)',
    titleEn: 'Challenge 7: Hospital & University Multi-Region Disaster Recovery (RPO=0, RTO<1min)',
    scenario: 'Bệnh viện Đại học Y Dược yêu cầu hệ thống hồ sơ bệnh án điện tử (EHR) phải hoạt động 24/7/365. Nếu toàn bộ trung tâm dữ liệu AWS tại us-east-1 bị sập do thiên tai/mất điện, hệ thống phải tự động chuyển sang us-west-2 trong dưới 1 phút mà không mất 1 byte dữ liệu (RPO = 0).',
    scenarioEn: 'University Hospital Electronic Health Records (EHR) requires continuous availability. If primary region (us-east-1) fails, traffic must auto-failover to us-west-2 in under 60 seconds with Zero Data Loss (RPO=0).',
    targetUptime: '99.999%',
    budgetGoal: 'Khả Năng Chống Chịu Thảm Họa Đa Vùng (Warm Standby ARC)',
    layers: [
      {
        name: '1. Tầng Điều Hướng Toàn Cầu & Kiểm Tra Sức Khỏe (Global Traffic Routing & Health Checks)',
        nameEn: '1. Global Health Checks & DNS Failover',
        description: 'Tự động phát hiện khi Khu Vực chính bị sập và chuyển hướng truy cập của toàn bộ bác sĩ sang Khu Vực dự phòng.',
        descriptionEn: 'Monitor Region endpoints every 10s and automatically flip global DNS records upon outage detection.',
        correctService: 'Amazon Route 53 (DNS Failover & ARC Application Recovery Controller)',
        options: [
          {
            service: 'Amazon Route 53 (DNS Failover & ARC Application Recovery Controller)',
            isCorrect: true,
            feedback: 'Chuẩn AWS Mission-Critical! Route 53 kiểm tra sức khỏe 10 giây/lần và tự động kích hoạt định tuyến khẩn cấp.',
            feedbackEn: 'Mission-Critical standard! Route 53 ARC executes sub-minute regional traffic redirection.'
          },
          {
            service: 'Nhờ quản trị viên mở máy tính lúc nửa đêm sửa file hosts thủ công',
            isCorrect: false,
            feedback: 'Quá chậm! Bệnh nhân có thể gặp nguy hiểm tính mạng trong lúc chờ quản trị viên thức dậy.',
            feedbackEn: 'Unacceptable delay in hospital life-or-death scenarios.'
          },
          {
            service: 'AWS Snowball Edge',
            isCorrect: false,
            feedback: 'Sai! Snowball không dùng để định tuyến lưu lượng mạng thời gian thực.',
            feedbackEn: 'Incorrect! Snowball is an offline physical storage appliance.'
          }
        ]
      },
      {
        name: '2. Tầng Nhân Bản Cơ Sở Dữ Liệu Toàn Cầu (Global Active Database Replication)',
        nameEn: '2. Global Active-Active Database Replication',
        description: 'Đồng bộ hóa dữ liệu bệnh án giữa us-east-1 và us-west-2 với độ trễ nhân bản dưới 1 giây.',
        descriptionEn: 'Replicate hospital database records cross-region in sub-second intervals with zero data loss.',
        correctService: 'Amazon Aurora Global Database (Storage-based Cross-Region Replication)',
        options: [
          {
            service: 'Amazon Aurora Global Database (Storage-based Cross-Region Replication)',
            isCorrect: true,
            feedback: 'Đỉnh cao cơ sở dữ liệu! Aurora Global DB dùng nhân bản ở tầng lưu trữ chuyên dụng với RPO < 1s và thăng cấp vùng phụ thành chính trong < 1 phút.',
            feedbackEn: 'Unmatched performance! Aurora Global Database replicates storage blocks across regions in <1 second.'
          },
          {
            service: 'Export file SQL ra đĩa mềm và gửi xe khách sang bang khác mỗi tuần',
            isCorrect: false,
            feedback: 'Không thể chấp nhận trong môi trường bệnh viện cấp cứu!',
            feedbackEn: 'Absurd and non-compliant for emergency healthcare operations.'
          },
          {
            service: 'Amazon QuickSight',
            isCorrect: false,
            feedback: 'Sai! QuickSight là dịch vụ vẽ báo cáo BI, không phải cơ sở dữ liệu phân tán.',
            feedbackEn: 'Incorrect! QuickSight is a business intelligence visualization tool.'
          }
        ]
      },
      {
        name: '3. Tầng Nhân Bản Tệp Tin & Sao Lưu Bất Biến (Immutable Cross-Region File Vault)',
        nameEn: '3. Immutable Cross-Region Storage Replication',
        description: 'Lưu trữ phim chụp X-Quang/MRI với tính năng chống Ransomware xóa file (WORM - Write Once Read Many).',
        descriptionEn: 'Replicate medical imaging scans cross-region with immutable WORM ransomware protection.',
        correctService: 'Amazon S3 Cross-Region Replication (CRR) + S3 Object Lock',
        options: [
          {
            service: 'Amazon S3 Cross-Region Replication (CRR) + S3 Object Lock',
            isCorrect: true,
            feedback: 'Xuất sắc! S3 Object Lock ngăn chặn 100% nguy cơ virus mã hóa dữ liệu đòi tiền chuộc (Ransomware) can thiệp vào hồ sơ y tế.',
            feedbackEn: 'Flawless! S3 Object Lock enforces immutable compliance, rendering files immune to ransomware deletion.'
          },
          {
            service: 'Lưu file ảnh chụp trên máy tính bàn của phòng chụp X-Quang',
            isCorrect: false,
            feedback: 'Rủi ro mất dữ liệu hoàn toàn nếu máy tính bị cháy nổ hoặc nhiễm mã độc.',
            feedbackEn: 'Severe single point of failure and data loss risk.'
          },
          {
            service: 'AWS Batch',
            isCorrect: false,
            feedback: 'Sai! AWS Batch là dịch vụ tính toán theo lô, không phải kho lưu trữ bất biến.',
            feedbackEn: 'Incorrect! AWS Batch is a batch compute orchestrator.'
          }
        ]
      }
    ],
    successStory: '🎉 Hệ thống Bệnh Viện Đại Học đạt chuẩn High Availability 99.999%! Mô phỏng tắt toàn bộ Region us-east-1 thành công trong 45 giây!',
    successStoryEn: '🎉 University Hospital achieved 99.999% Resilience! Simulated total regional failure survived in 45 seconds with Zero Data Loss!'
  },
  {
    id: 'arch-8',
    title: 'Thử Thách 8: Hệ Thống Bãi Đỗ Xe Thông Minh IoT & Thu Phí Tự Động Toàn Trường',
    titleEn: 'Challenge 8: Smart Campus IoT Parking & Automated License Plate Billing',
    scenario: 'Trường Đại học triển khai 500 camera AI tại 15 bãi đỗ xe để nhận diện biển số xe (ALPR), đếm chỗ trống thời gian thực và tự động trừ tiền học phí/lương của 40,000 phương tiện ra vào mỗi ngày.',
    scenarioEn: 'The University is deploying 500 AI edge cameras across 15 campus parking structures to perform Automatic License Plate Recognition (ALPR), calculate real-time occupancy, and charge parking fees seamlessly for 40,000 vehicles daily.',
    targetUptime: '99.95%',
    budgetGoal: 'IoT Stream Ingestion & Serverless Microservices',
    layers: [
      {
        name: '1. Tầng Kết Nối Cảm Biến & Camera Biên (Edge Camera & IoT Ingestion)',
        nameEn: '1. Edge IoT Device Connectivity Tier',
        description: 'Kết nối an toàn 500 camera qua giao thức MQTT bảo mật bằng chứng chỉ X.509.',
        descriptionEn: 'Securely authenticate and connect 500 edge ALPR cameras via lightweight MQTT using mutual TLS (mTLS).',
        correctService: 'AWS IoT Core + AWS IoT Greengrass',
        options: [
          {
            service: 'AWS IoT Core + AWS IoT Greengrass',
            isCorrect: true,
            feedback: 'Chính xác! Greengrass chạy mô hình nhận diện biển số ngay tại camera và IoT Core tiếp nhận dữ liệu xe ra vào an toàn.',
            feedbackEn: 'Correct! Greengrass runs computer vision at the edge while IoT Core manages mTLS vehicle telemetry.'
          },
          {
            service: 'Mỗi camera tự gửi email cho bảo vệ khi có xe đi qua',
            isCorrect: false,
            feedback: 'Quá tải hộp thư và không thể tự động mở rào chắn!',
            feedbackEn: 'Impractical! Flooding inboxes prevents automated boom barrier triggers.'
          },
          {
            service: 'Amazon Redshift',
            isCorrect: false,
            feedback: 'Sai! Redshift không hỗ trợ giao thức IoT MQTT trực tiếp từ phần hardware.',
            feedbackEn: 'Incorrect! Redshift is a data warehouse, not an IoT broker.'
          }
        ]
      },
      {
        name: '2. Tầng Thu Thập & Xử Lý Dòng Dữ Liệu Thời Gian Thực (Real-Time Stream Processing)',
        nameEn: '2. Real-Time Telemetry Stream Processing',
        description: 'Xử lý liên tục hàng ngàn sự kiện xe vào/ra mỗi phút để tính toán chỗ đỗ xe còn trống cho ứng dụng di động sinh viên.',
        descriptionEn: 'Ingest and compute real-time parking spot occupancy metrics per zone with sub-second sliding windows.',
        correctService: 'Amazon Kinesis Data Streams + AWS Lambda',
        options: [
          {
            service: 'Amazon Kinesis Data Streams + AWS Lambda',
            isCorrect: true,
            feedback: 'Chuẩn xử lý dòng dữ liệu! Kinesis hấp thụ lượng xe ra vào giờ cao điểm và Lambda cập nhật số chỗ trống tức thì.',
            feedbackEn: 'Flawless stream processing! Kinesis buffers burst traffic and Lambda computes real-time spot vacancy.'
          },
          {
            service: 'Ghi số xe vào sổ tay giấy rồi cuối ngày mới nhập liệu',
            isCorrect: false,
            feedback: 'Không thể cập nhật chỗ trống theo thời gian thực cho ứng dụng di động!',
            feedbackEn: 'Cannot provide real-time parking space occupancy to mobile apps.'
          },
          {
            service: 'AWS Direct Connect',
            isCorrect: false,
            feedback: 'Sai! Direct Connect là đường truyền vật lý, không phải công cụ xử lý dòng dữ liệu.',
            feedbackEn: 'Incorrect! Direct Connect is physical private networking.'
          }
        ]
      },
      {
        name: '3. Tầng Cơ Sở Dữ Liệu Chuỗi Thời Gian & Thanh Toán Tự Động (Time-Series Data & Billing)',
        nameEn: '3. Time-Series Metrics & Payment Ledger',
        description: 'Lưu trữ lịch sử đỗ xe để phân tích giờ cao điểm và tự động trừ tiền qua ví điện tử sinh viên.',
        descriptionEn: 'Store time-series occupancy patterns and execute immutable billing transactions.',
        correctService: 'Amazon Timestream + Amazon DynamoDB (Transactions)',
        options: [
          {
            service: 'Amazon Timestream + Amazon DynamoDB (Transactions)',
            isCorrect: true,
            feedback: 'Xuất sắc! Amazon Timestream tối ưu lưu trữ dữ liệu cảm biến theo thời gian và DynamoDB Transactions đảm bảo tính tiền không bị sai sót.',
            feedbackEn: 'Outstanding! Timestream queries parking trends while DynamoDB ACID transactions guarantee 100% billing accuracy.'
          },
          {
            service: 'Lưu toàn bộ giao dịch vào bảng tính Google Sheets miễn phí',
            isCorrect: false,
            feedback: 'Không hỗ trợ ACID Transactions, dễ bị trừ tiền 2 lần khi mạng chập chờn.',
            feedbackEn: 'Lacks ACID transactional integrity and will cause duplicate charges.'
          },
          {
            service: 'AWS CloudFormation',
            isCorrect: false,
            feedback: 'Sai! CloudFormation là công cụ triển khai hạ tầng bằng code (IaC), không lưu trữ giao dịch.',
            feedbackEn: 'Incorrect! CloudFormation is an Infrastructure-as-Code orchestration tool.'
          }
        ]
      }
    ],
    successStory: '🎉 Hệ thống Smart Campus IoT đã đi vào hoạt động! 40,000 lượt xe ra vào mỗi ngày được thanh toán tự động trong 0.2 giây!',
    successStoryEn: '🎉 Smart Campus IoT Parking deployed! 40,000 daily vehicles processed with zero gate wait times!'
  }
];
