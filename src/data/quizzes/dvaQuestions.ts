import { QuizQuestion } from '../../types';

export const DVA_QUESTIONS: QuizQuestion[] = [
  {
    id: 'dva-1',
    certCode: 'DVA-C02',
    category: 'Serverless & Database Connection Pooling (RDS Proxy)',
    difficulty: 'Trung bình',
    scenario: 'Một hàm AWS Lambda viết bằng Node.js xử lý việc tính điểm rèn luyện sinh viên cần kết nối với cơ sở dữ liệu Amazon RDS PostgreSQL. Các lập trình viên nhận thấy mỗi lần Lambda được kích hoạt lại mở ra một kết nối database mới, làm cạn kiệt số lượng kết nối tối đa (Max Connections limit) của RDS. Giải pháp chuẩn mực của AWS để xử lý bài toán này là gì?',
    options: [
      { id: 'A', text: 'Tăng tham số max_connections trong DB Parameter Group của PostgreSQL lên 50,000.' },
      { id: 'B', text: 'Triển khai Amazon RDS Proxy ở giữa Lambda và cơ sở dữ liệu RDS.' },
      { id: 'C', text: 'Khởi tạo kết nối Database bên trong hàm xử lý `exports.handler` thay vì đặt ở ngoài phạm vi hàm.' },
      { id: 'D', text: 'Chuyển hàm Lambda sang chạy trên máy chủ EC2 t2.micro.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'Amazon RDS Proxy là một Database Proxy được quản lý hoàn toàn dành riêng cho các ứng dụng Serverless. RDS Proxy duy trì một nhóm các kết nối cơ sở dữ liệu đã thiết lập sẵn (Connection Pooling), cho phép hàng ngàn hàm Lambda đồng thời chia sẻ và tái sử dụng các kết nối này, bảo vệ cơ sở dữ liệu không bị sập vì quá tải kết nối.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Mỗi kết nối PostgreSQL tiêu tốn RAM đáng kể, tăng quá cao sẽ làm cạn kiệt bộ nhớ máy chủ DB và làm treo hệ thống.' },
        { optionId: 'C', reason: 'Đặt kết nối trong handler sẽ làm chậm hàm do mỗi request phải handshake lại từ đầu (Anti-pattern).' },
        { optionId: 'D', reason: 'Phá vỡ mô hình Serverless và mất khả năng tự động mở rộng.' }
      ],
      examTip: 'Hàm Lambda gây nghẽn kết nối Database (Connection Pooling exhaustion) trên RDS/Aurora -> Giải pháp luôn là Amazon RDS Proxy.'
    }
  },
  {
    id: 'dva-2',
    certCode: 'DVA-C02',
    category: 'Thiết kế Chỉ mục DynamoDB (GSI vs LSI)',
    difficulty: 'Khó',
    scenario: 'Bảng DynamoDB `CourseRegistrations` lưu trữ thông tin đăng ký học phần của sinh viên với Partition Key là `StudentId` và Sort Key là `CourseId`. Đội ngũ phát triển cần xây dựng tính năng cho phép Giảng viên xem danh sách tất cả sinh viên đã đăng ký một môn học cụ thể (`CourseId`) sắp xếp theo thời gian đăng ký (`RegistrationDate`). Cần thiết kế chỉ mục như thế nào?',
    options: [
      { id: 'A', text: 'Sử dụng lệnh Scan có kèm FilterExpression lọc theo CourseId.' },
      { id: 'B', text: 'Tạo một Local Secondary Index (LSI) với Partition Key là CourseId và Sort Key là RegistrationDate.' },
      { id: 'C', text: 'Tạo một Global Secondary Index (GSI) với Partition Key là CourseId và Sort Key là RegistrationDate.' },
      { id: 'D', text: 'Xóa bảng và tạo lại với Partition Key là CourseId và Sort Key là StudentId.' }
    ],
    correctOptionId: 'C',
    explanation: {
      whyCorrect: 'Global Secondary Index (GSI) cho phép định nghĩa lại hoàn toàn cả Partition Key (`CourseId`) và Sort Key (`RegistrationDate`) khác với bảng chính, cho phép giảng viên truy vấn nhanh tất cả sinh viên của một môn học và sắp xếp theo ngày đăng ký với độ trễ mili-giây.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Scan quét qua 100% dữ liệu trong bảng, tốn kém chi phí RCU và cực kỳ chậm khi dữ liệu lớn.' },
        { optionId: 'B', reason: 'LSI bắt buộc phải giữ nguyên Partition Key của bảng gốc (`StudentId`), không thể đổi Partition Key sang `CourseId`.' },
        { optionId: 'D', reason: 'Thay đổi khóa chính của bảng gốc sẽ làm hỏng tất cả các chức năng tra cứu theo sinh viên hiện tại.' }
      ],
      examTip: 'Muốn truy vấn với Partition Key KHÁC với bảng gốc -> Bắt buộc dùng Global Secondary Index (GSI).'
    }
  },
  {
    id: 'dva-3',
    certCode: 'DVA-C02',
    category: 'Chiến lược Triển khai CI/CD (Canary vs Linear)',
    difficulty: 'Trung bình',
    scenario: 'Khi phát hành phiên bản mới của Cổng dịch vụ sinh viên, đội ngũ phát triển muốn triển khai an toàn theo cách: Ban đầu chỉ chuyển 10% lưu lượng người dùng sang phiên bản mới trong 15 phút đầu tiên; nếu không có lỗi CloudWatch 5xx xảy ra thì mới chuyển nốt 90% còn lại. Chiến lược triển khai nào trong AWS CodeDeploy đáp ứng yêu cầu này?',
    options: [
      { id: 'A', text: 'CodeDeploy Default AllAtOnce' },
      { id: 'B', text: 'CodeDeploy Linear 10PercentEvery1Minute' },
      { id: 'C', text: 'CodeDeploy Canary 10Percent15Minutes' },
      { id: 'D', text: 'In-place Rolling Deployment' }
    ],
    correctOptionId: 'C',
    explanation: {
      whyCorrect: 'Chiến lược Canary Deployment (`Canary10Percent15Minutes`) trong AWS CodeDeploy sẽ chuyển đúng một phần nhỏ lưu lượng (10%) sang phiên bản mới trong một khoảng thời gian cố định (15 phút) để giám sát và thử nghiệm. Nếu không phát sinh cảnh báo lỗi (CloudWatch Alarms), toàn bộ lưu lượng còn lại (90%) sẽ được chuyển đổi ngay lập tức ở bước 2.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'AllAtOnce cập nhật đồng loạt 100% cùng lúc, rủi ro cao nếu có lỗi code.' },
        { optionId: 'B', reason: 'Linear sẽ tăng đều đặn 10% mỗi phút cho đến khi đủ 100% sau 10 phút, không phải là giữ 10% trong 15 phút.' },
        { optionId: 'D', reason: 'In-place cập nhật trực tiếp trên các máy chủ hiện tại mà không hỗ trợ cơ chế Canary lưu lượng thông minh.' }
      ],
      examTip: 'Canary = Chuyển 1 phần nhỏ (VD: 10%) trong X phút, sau đó chuyển hết. Linear = Tăng đều đặn từng đợt X% mỗi Y phút.'
    }
  },
  {
    id: 'dva-4',
    certCode: 'DVA-C02',
    category: 'Quản lý Phiên & Bộ nhớ Đệm Ứng dụng (ElastiCache Redis)',
    difficulty: 'Trung bình',
    scenario: 'Ứng dụng thi trực tuyến của trường đại học đang lưu trữ thông tin phiên đăng nhập (User Session state) trong bộ nhớ RAM cục bộ của từng máy chủ EC2. Khi người dùng được Load Balancer điều hướng sang máy chủ EC2 khác, họ bị văng ra và phải đăng nhập lại từ đầu. Giải pháp kiến trúc chuẩn stateless nào giải quyết triệt để vấn đề này?',
    options: [
      { id: 'A', text: 'Bật tính năng Sticky Sessions (Session Affinity) trên Application Load Balancer.' },
      { id: 'B', text: 'Lưu trữ Session State tập trung bên ngoài máy chủ trong cụm Amazon ElastiCache for Redis.' },
      { id: 'C', text: 'Lưu Session State vào ổ đĩa EBS của máy chủ EC2 đầu tiên.' },
      { id: 'D', text: 'Yêu cầu sinh viên không làm mới (F5) trang web trong khi làm bài thi.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'Chuyển toàn bộ Session State ra lưu trữ ngoài trên một cụm bộ nhớ đệm phân tán tập trung như Amazon ElastiCache for Redis (hoặc DynamoDB) giúp máy chủ ứng dụng trở thành phi trạng thái (Stateless). Bất kỳ máy chủ EC2 nào trong Auto Scaling Group cũng có thể xử lý request của sinh viên mà không bị mất phiên làm việc.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Sticky Sessions chỉ là giải pháp tạm thời, nếu máy chủ đó bị sập hoặc Auto Scaling giảm tải thì người dùng vẫn bị mất phiên.' },
        { optionId: 'C', reason: 'Ổ đĩa EBS không thể gắn và chia sẻ đồng thời nhiều máy chủ EC2 để đọc/ghi session tốc độ cao.' },
        { optionId: 'D', reason: 'Không phải là giải pháp kỹ thuật.' }
      ],
      examTip: 'Quản lý User Session State phi trạng thái (Stateless application) cho hàng chục ngàn người dùng -> Amazon ElastiCache for Redis hoặc DynamoDB.'
    }
  }
];
