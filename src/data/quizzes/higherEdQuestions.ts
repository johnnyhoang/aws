import { QuizQuestion } from '../../types';

export const HIGHER_ED_QUESTIONS: QuizQuestion[] = [
  {
    id: 'hed-1',
    certCode: 'SAA-C03',
    category: 'Tích hợp LMS & Serverless Event-Driven (Canvas LMS)',
    difficulty: 'Khó',
    scenario: 'Đại học Kent State muốn xây dựng hệ thống tự động gửi thông báo điểm thi và nhắc nhở sinh viên nộp bài tập từ Canvas LMS. Khi có sự kiện mới trên Canvas LMS, hệ thống cần gửi thông báo đẩy (Push notification) tới ứng dụng di động của sinh viên và ghi nhật ký vào Data Lake trên S3 để phân tích. Kiến trúc Serverless nào hiệu quả và chi phí thấp nhất?',
    options: [
      { id: 'A', text: 'Canvas Webhook -> Amazon API Gateway -> AWS Lambda -> Amazon EventBridge (phân luồng: 1 nhánh tới Amazon SNS gửi thông báo đẩy, 1 nhánh lưu S3 Data Lake qua Kinesis Data Firehose).' },
      { id: 'B', text: 'Cài đặt máy chủ Apache Web Server trên EC2 chạy 24/7 để liên tục gửi API request thăm dò (Polling) Canvas LMS mỗi 1 giây.' },
      { id: 'C', text: 'Sử dụng AWS Storage Gateway gắn ổ đĩa chia sẻ với máy chủ Canvas LMS.' },
      { id: 'D', text: 'Yêu cầu sinh viên tự mở trang web Canvas để tải dữ liệu điểm về máy cá nhân.' }
    ],
    correctOptionId: 'A',
    explanation: {
      whyCorrect: 'Kiến trúc hướng sự kiện (Event-Driven) với API Gateway và Lambda tiếp nhận Webhook từ Canvas, sau đó đẩy sự kiện lên Amazon EventBridge để định tuyến phân luồng độc lập: Nhánh 1 gọi Amazon SNS gửi thông báo đẩy tức thì cho sinh viên; Nhánh 2 qua Amazon Kinesis Data Firehose nén và lưu trữ dữ liệu dạng Parquet vào S3 Data Lake. Giải pháp hoàn toàn Serverless, tự động co giãn theo số lượng sinh viên và tính tiền theo từng sự kiện.',
      whyOthersIncorrect: [
        { optionId: 'B', reason: 'Cơ chế Polling liên tục làm quá tải API của Canvas LMS và gây tốn chi phí máy chủ EC2 chạy không tải vào ban đêm và kỳ nghỉ hè.' },
        { optionId: 'C', reason: 'Storage Gateway là giải pháp lưu trữ file lai, không xử lý được luồng sự kiện thời gian thực từ ứng dụng SaaS.' },
        { optionId: 'D', reason: 'Không phải là giải pháp tự động hóa.' }
      ],
      examTip: 'Tích hợp hệ sinh thái giáo dục hiện đại (Canvas/Blackboard LMS) -> Mô hình Event-Driven: API Gateway + Lambda + EventBridge + SNS/S3.'
    }
  },
  {
    id: 'hed-2',
    certCode: 'SAA-C03',
    category: 'Bảo mật Dữ liệu Sinh viên theo Chuẩn FERPA (Security)',
    difficulty: 'Trung bình',
    scenario: 'Để tuân thủ đạo luật FERPA về bảo vệ hồ sơ học tập sinh viên tại Mỹ, chính sách bảo mật đám mây nào sau đây là BẮT BUỘC khi thiết kế lưu trữ cơ sở dữ liệu điểm số và thông tin cá nhân trên AWS?',
    options: [
      { id: 'A', text: 'Chỉ cần đặt mật khẩu mạnh cho tài khoản quản trị viên cơ sở dữ liệu.' },
      { id: 'B', text: 'Bắt buộc mã hóa dữ liệu ở trạng thái nghỉ (At-Rest) bằng AWS KMS với khóa Customer Managed Key (CMK), mã hóa khi truyền tải (In-Transit) bằng TLS 1.3, và kích hoạt AWS CloudTrail để lưu vết toàn bộ truy cập.' },
      { id: 'C', text: 'Lưu trữ toàn bộ dữ liệu điểm số trong Public S3 Bucket nhưng đặt tên file bằng mã ngẫu nhiên.' },
      { id: 'D', text: 'Tắt toàn bộ hệ thống tường lửa Security Groups để sinh viên dễ dàng truy cập từ ký túc xá.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'Tuân thủ FERPA và các tiêu chuẩn bảo mật giáo dục của Mỹ đòi hỏi: 1. Mã hóa At-Rest (KMS CMK cho phép xoay vòng khóa và kiểm soát quyền truy cập chi tiết), 2. Mã hóa In-Transit (TLS/HTTPS bắt buộc), 3. Kiểm toán truy vết (Audit Trail) thông qua CloudTrail để phát hiện ai đã xem/sửa điểm của sinh viên vào thời điểm nào.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Mật khẩu mạnh không đáp ứng yêu cầu mã hóa và kiểm toán theo luật liên bang.' },
        { optionId: 'C', reason: 'Đặt dữ liệu trong Public Bucket vi phạm nghiêm trọng luật bảo vệ quyền riêng tư và có thể bị phạt hàng triệu USD.' },
        { optionId: 'D', reason: 'Tắt tường lửa phá vỡ toàn bộ cấu trúc an ninh mạng.' }
      ],
      examTip: 'Tiêu chuẩn bảo mật dữ liệu sinh viên/y tế (FERPA/HIPAA) -> Mã hóa 2 chiều (At-Rest KMS + In-Transit TLS) + Phân quyền Least Privilege + Ghi vết 100% với CloudTrail.'
    }
  },
  {
    id: 'hed-3',
    certCode: 'SAA-C03',
    category: 'Đăng nhập Tập trung Single Sign-On (SSO / IAM Identity Center)',
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
    id: 'hed-4',
    certCode: 'SAA-C03',
    category: 'Phòng Lab Ảo Cho Sinh Viên (Virtual Computer Labs)',
    difficulty: 'Trung bình',
    scenario: 'Khoa Kiến trúc và Đồ họa của trường cần cung cấp các phần mềm đồ họa 3D nặng (AutoCAD, Adobe Premiere) cho 500 sinh viên thực hành từ xa trên máy tính xách tay cá nhân (Laptop cấu hình yếu hoặc Chromebook). Dịch vụ nào của AWS cho phép truyền phát (Stream) ứng dụng máy tính trực tiếp qua trình duyệt web mà không cần sinh viên phải mua máy tính đắt tiền?',
    options: [
      { id: 'A', text: 'Amazon AppStream 2.0' },
      { id: 'B', text: 'Amazon Elastic Container Registry (ECR)' },
      { id: 'C', text: 'AWS Direct Connect' },
      { id: 'D', text: 'Amazon Kinesis Video Streams' }
    ],
    correctOptionId: 'A',
    explanation: {
      whyCorrect: 'Amazon AppStream 2.0 là dịch vụ truyền phát ứng dụng (Application Streaming) được quản lý hoàn toàn. Nó cho phép trường đại học cài đặt các phần mềm máy tính để bàn (Desktop applications) trên đám mây và truyền phát giao diện tương tác mượt mà tới bất kỳ trình duyệt web HTML5 nào của sinh viên.',
      whyOthersIncorrect: [
        { optionId: 'B', reason: 'ECR là kho lưu trữ Docker images, không phải dịch vụ streaming ứng dụng cho người dùng cuối.' },
        { optionId: 'C', reason: 'Direct Connect là đường truyền cáp quang vật lý chuyên dụng.' },
        { optionId: 'D', reason: 'Kinesis Video Streams dùng để thu thập luồng video từ camera an ninh IoT, không phải là ứng dụng truyền phát phần mềm tương tác.' }
      ],
      examTip: 'Phòng máy ảo trường học (Virtual Computer Lab) / Stream ứng dụng desktop qua trình duyệt web cho sinh viên -> Luôn chọn Amazon AppStream 2.0 hoặc Amazon WorkSpaces.'
    }
  }
];
