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
  },
  {
    id: 'inc-3',
    time: '11:45 PM - Late Night',
    title: '⚠️ RÒ RỈ ACCESS KEY QUẢN TRỊ TRÊN GITHUB - PHÁT SINH $15,000 TIỀN ĐÀO COIN!',
    titleEn: '⚠️ COMPROMISED AWS ROOT KEYS LEAKED ON GITHUB - $15,000 MINING BILL!',
    alertType: 'CRITICAL',
    description: 'Một sinh viên thực tập vô tình commit file `.env` chứa AWS Access Key ID & Secret Access Key có quyền Administrator lên kho mã nguồn GitHub công khai. Bot hacker lập tức tạo 50 máy chủ c5.24xlarge tại vùng Tokyo để đào tiền ảo.',
    descriptionEn: 'An intern accidentally committed AWS root credentials to a public GitHub repo. Adversary automated scripts immediately spun up 50 c5.24xlarge GPU instances in Tokyo for cryptocurrency mining.',
    choices: [
      {
        id: 'A',
        action: 'Xóa ngay Access Key bị lộ trên IAM, hủy tất cả máy chủ lạ ở vùng Tokyo, và tạo Service Control Policy (SCP) khóa các vùng không sử dụng.',
        actionEn: 'Immediately deactivate the leaked IAM key, terminate rogue Tokyo EC2 instances, and apply SCP region deny guardrails.',
        isCorrect: true,
        uptimeImpact: 30,
        explanation: '✅ XỬ LÝ MẪU MỰC! Hủy key chặn đứng hacker, xóa máy chủ cắt cơn khát chi phí, và liên hệ AWS Support đề nghị miễn giảm cước do bị hack.',
        explanationEn: '✅ INCIDENT CONTAINED! Deactivating keys stops unauthorized API calls and SCP guardrails prevent re-occurrence.'
      },
      {
        id: 'B',
        action: 'Gửi email cho hacker yêu cầu tắt máy chủ giùm.',
        actionEn: 'Email the adversary requesting them to stop running instances.',
        isCorrect: false,
        uptimeImpact: -50,
        explanation: '❌ VÔ NGHĨA! Hacker sẽ không bao giờ tắt máy chủ theo yêu cầu của bạn.',
        explanationEn: '❌ INEFFECTIVE! Attackers will ignore requests while racking up hundreds of thousands in charges.'
      }
    ]
  }
];
