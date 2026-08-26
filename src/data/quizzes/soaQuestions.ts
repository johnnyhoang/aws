import { QuizQuestion } from '../../types';

export const SOA_QUESTIONS: QuizQuestion[] = [
  {
    id: 'soa-1',
    certCode: 'SOA-C02',
    category: 'Quản trị & Tự động hóa Máy chủ (Systems Manager)',
    difficulty: 'Trung bình',
    scenario: 'Đội ngũ IT trường học cần cài đặt bản vá bảo mật khẩn cấp (Emergency Security Patch) cho 120 máy chủ EC2 (gồm cả Linux và Windows) đặt trong các Private Subnets không có kết nối SSH/RDP từ Internet. Công cụ nào giúp thực thi lệnh vá lỗi hàng loạt an toàn và có nhật ký kiểm toán đầy đủ?',
    options: [
      { id: 'A', text: 'Tạo Bastion Host công khai và viết shell script SSH vào từng máy chủ.' },
      { id: 'B', text: 'Sử dụng AWS Systems Manager (SSM) Run Command kết hợp Patch Manager thông qua SSM Agent.' },
      { id: 'C', text: 'Tạo AMI mới cho từng máy chủ và thay thế thủ công trên AWS Console.' },
      { id: 'D', text: 'Sử dụng AWS CloudFormation để xóa và tạo lại toàn bộ 120 máy chủ.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'AWS Systems Manager Run Command cho phép quản trị viên thực thi lệnh và cài đặt phần mềm từ xa trên hàng trăm máy chủ EC2 cùng lúc mà KHÔNG CẦN mở cổng SSH/RDP (port 22/3389) và không cần Bastion Host. Kết hợp với Patch Manager, hệ thống tự động quét và cài đặt các bản vá theo lịch trình với nhật ký kiểm toán lưu trên CloudTrail.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Mở Bastion Host ra Internet làm tăng diện tích tấn công (Attack surface) và thao tác SSH thủ công trên 120 máy rất chậm và dễ sai sót.' },
        { optionId: 'C', reason: 'Thay thế thủ công 120 máy gây gián đoạn dịch vụ và tốn hàng chục giờ làm việc.' },
        { optionId: 'D', reason: 'Xóa máy chủ sẽ làm mất dữ liệu cục bộ và gây thời gian chết kéo dài.' }
      ],
      examTip: 'Quản trị máy chủ hàng loạt, chạy lệnh từ xa không cần mở cổng SSH/RDP -> AWS Systems Manager (SSM) Run Command / Patch Manager.'
    }
  },
  {
    id: 'soa-2',
    certCode: 'SOA-C02',
    category: 'Giám sát & Tự động Khắc phục Sự cố (CloudWatch & EC2)',
    difficulty: 'Khó',
    scenario: 'Một máy chủ EC2 chạy phần mềm quản lý thư viện trường học bị lỗi phần cứng tại trung tâm dữ liệu AWS (System Status Check Failed: 0/2 checks passed). Quản trị viên muốn cấu hình tự động khôi phục máy chủ này về trạng thái hoạt động trên một phần cứng vật lý mới mà vẫn giữ nguyên Instance ID, Private IP và Elastic IP. Cần cấu hình như thế nào?',
    options: [
      { id: 'A', text: 'Tạo CloudWatch Alarm theo dõi chỉ số `StatusCheckFailed_System` và gắn hành động `EC2 Recover`.' },
      { id: 'B', text: 'Tạo CloudWatch Alarm theo dõi chỉ số `StatusCheckFailed_Instance` và gắn hành động `EC2 Reboot`.' },
      { id: 'C', text: 'Tạo Auto Scaling Group với Min Size = 1 và cấu hình Health Check Type là ELB.' },
      { id: 'D', text: 'Tạo Lambda function gọi API `ec2:TerminateInstances` và tạo lại máy chủ mới.' }
    ],
    correctOptionId: 'A',
    explanation: {
      whyCorrect: 'Chỉ số `StatusCheckFailed_System` phản ánh sự cố ở tầng phần cứng, mạng hoặc nguồn điện của AWS. Tính năng CloudWatch Alarm `EC2 Recover` được thiết kế đặc biệt cho tình huống này: Nó sẽ tự động di chuyển máy chủ ảo sang một máy chủ vật lý mới còn tốt của AWS mà vẫn BẢO TOÀN nguyên vẹn Instance ID, Private IP, Elastic IP, Metadata và dữ liệu trong RAM/EBS.',
      whyOthersIncorrect: [
        { optionId: 'B', reason: '`StatusCheckFailed_Instance` là lỗi phần mềm bên trong hệ điều hành, hành động Reboot không giải quyết được lỗi phần cứng của AWS.' },
        { optionId: 'C', reason: 'Auto Scaling khi thay thế máy chủ sẽ tạo một Instance ID mới và IP mới, làm thay đổi cấu hình kết nối.' },
        { optionId: 'D', reason: 'Terminate Instance sẽ xóa máy chủ cũ và mất cấu hình gán IP ban đầu.' }
      ],
      examTip: 'System Status Check Failed (Lỗi phần cứng AWS) -> CloudWatch Alarm RECOVER Action. Instance Status Check Failed (Lỗi OS/Software) -> CloudWatch Alarm REBOOT Action.'
    }
  },
  {
    id: 'soa-3',
    certCode: 'SOA-C02',
    category: 'Tuân thủ Quy định & Tự động Sửa đổi (AWS Config)',
    difficulty: 'Trung bình',
    scenario: 'Để tuân thủ tiêu chuẩn bảo mật dữ liệu sinh viên FERPA, phòng an ninh thông tin yêu cầu kiểm toán tự động: Nếu có bất kỳ ai mở cổng SSH (port 22) ra toàn bộ Internet (0.0.0.0/0) trên bất kỳ Security Group nào, hệ thống phải tự động đóng cổng đó lại ngay lập tức. Bộ dịch vụ nào phù hợp nhất?',
    options: [
      { id: 'A', text: 'AWS Trusted Advisor và AWS Support API' },
      { id: 'B', text: 'AWS Config Managed Rules kết hợp Automatic Remediation (AWS Systems Manager Automation Document)' },
      { id: 'C', text: 'Amazon Inspector kết hợp Amazon GuardDuty' },
      { id: 'D', text: 'Amazon CloudWatch Logs Insights chạy truy vấn mỗi 24 giờ' },
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'AWS Config liên tục theo dõi và ghi lại trạng thái cấu hình của các tài nguyên AWS. Quy tắc mẫu `restricted-ssh` trong AWS Config sẽ phát hiện ngay khi có Security Group mở port 22 ra 0.0.0.0/0, và kích hoạt tính năng Automatic Remediation (thông qua SSM Automation) để tự động xóa luật mở cổng trái phép đó trong vài giây.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Trusted Advisor chỉ đưa ra khuyến nghị kiểm tra, không tự động khắc phục (Remediate) theo thời gian thực.' },
        { optionId: 'C', reason: 'Inspector quét lỗ hổng phần mềm, GuardDuty phát hiện hành vi xâm nhập bất thường; cả hai không quản lý trạng thái cấu hình tuân thủ quy tắc Security Group.' },
        { optionId: 'D', reason: 'Chạy log mỗi 24 giờ là quá chậm và không có tính năng tự động khắc phục.' }
      ],
      examTip: 'Đánh giá tuân thủ cấu hình tài nguyên (Compliance) + Tự động sửa lỗi cấu hình (Auto-Remediation) -> AWS Config + SSM Automation Document.'
    }
  }
];
