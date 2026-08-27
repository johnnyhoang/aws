export interface SecurityVulnerability {
  id: string;
  resourceType: string;
  resourceName: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  descriptionEn: string;
  points: number;
  remediationChoices: {
    id: string;
    text: string;
    textEn: string;
    isCorrect: boolean;
    feedback: string;
    feedbackEn: string;
  }[];
}

export const SECURITY_VULNERABILITIES: SecurityVulnerability[] = [
  {
    id: 'vuln-1',
    resourceType: 'Amazon S3',
    resourceName: 's3://kent-university-student-transcripts',
    severity: 'CRITICAL',
    description: 'Bucket chứa bảng điểm sinh viên đang bị cấu hình Public Read (AllUsers: READ) và chưa bật mã hóa KMS!',
    descriptionEn: 'Student transcript S3 bucket has public read access enabled with missing KMS encryption!',
    points: 25,
    remediationChoices: [
      {
        id: '1a',
        text: 'Bật S3 "Block Public Access" ở cấp Account & Bucket, đồng thời bắt buộc mã hóa SSE-KMS.',
        textEn: 'Enable S3 Block Public Access at account & bucket levels and enforce SSE-KMS encryption.',
        isCorrect: true,
        feedback: '✅ CHÍNH XÁC! Block Public Access ngăn chặn tuyệt đối dữ liệu sinh viên bị lộ ra ngoài Internet.',
        feedbackEn: '✅ CORRECT! Block Public Access guarantees zero unauthorized public reads.'
      },
      {
        id: '1b',
        text: 'Chỉ đổi tên S3 Bucket thành tên bí mật để người lạ không đoán được URL.',
        textEn: 'Just rename the bucket to a secret random name.',
        isCorrect: false,
        feedback: '❌ NGUY HIỂM! Đổi tên không chặn được các công cụ quét tự động (Security by Obscurity là sai lầm).',
        feedbackEn: '❌ DANGEROUS! Renaming buckets does not prevent public scans (Security by Obscurity fails).'
      }
    ]
  },
  {
    id: 'vuln-2',
    resourceType: 'AWS IAM Root Account',
    resourceName: 'AWS Account Root User',
    severity: 'CRITICAL',
    description: 'Tài khoản Root của trường đại học đang tạo Access Key ID hoạt động và chưa bật xác thực 2 bước đa yếu tố (MFA)!',
    descriptionEn: 'Root user has active Access Keys generated and lacks Hardware/FIDO2 Multi-Factor Authentication (MFA)!',
    points: 25,
    remediationChoices: [
      {
        id: '2a',
        text: 'Xóa vĩnh viễn Access Key của tài khoản Root và kích hoạt FIDO2 Hardware Token MFA.',
        textEn: 'Delete Root Access Keys permanently and enforce FIDO2 Hardware Token MFA.',
        isCorrect: true,
        feedback: '✅ CHUẨN CIS BENCHMARK! Tài khoản Root không bao giờ được phép có Access Keys và bắt buộc phải có MFA.',
        feedbackEn: '✅ CIS BENCHMARK COMPLIANT! Root accounts must never have active access keys and must enforce MFA.'
      },
      {
        id: '2b',
        text: 'Giữ nguyên Access Key và chia sẻ key cho tất cả quản trị viên trong phòng IT.',
        textEn: 'Keep access keys and share them among all IT staff.',
        isCorrect: false,
        feedback: '❌ THẢM HỌA BẢO MẬT! Chia sẻ root key vi phạm nghiêm trọng nguyên tắc quản trị danh tính.',
        feedbackEn: '❌ CATASTROPHIC! Never share root credentials across multiple administrators.'
      }
    ]
  },
  {
    id: 'vuln-3',
    resourceType: 'EC2 Security Group',
    resourceName: 'sg-0a89d71c (Production Database SG)',
    severity: 'HIGH',
    description: 'Cổng Database PostgreSQL (port 5432) và RDP (port 3389) đang mở Inbound cho 0.0.0.0/0!',
    descriptionEn: 'PostgreSQL DB port 5432 and Windows RDP port 3389 are exposed to 0.0.0.0/0 on the internet!',
    points: 20,
    remediationChoices: [
      {
        id: '3a',
        text: 'Xóa luật 0.0.0.0/0, chỉ cho phép Inbound port 5432 từ Security Group của App Server (sg-app-tier).',
        textEn: 'Revoke 0.0.0.0/0 and restrict port 5432 inbound strictly to the App Server Security Group ID.',
        isCorrect: true,
        feedback: '✅ NGUYÊN TẮC LEAST PRIVILEGE! Cơ sở dữ liệu chỉ nên nhận kết nối nội bộ từ máy chủ ứng dụng.',
        feedbackEn: '✅ LEAST PRIVILEGE! Databases must only accept traffic from internal application security groups.'
      },
      {
        id: '3b',
        text: 'Mở thêm cổng SSH 22 cho 0.0.0.0/0 để tiện vào sửa lỗi khi cần.',
        textEn: 'Open port 22 to 0.0.0.0/0 for easier troubleshooting.',
        isCorrect: false,
        feedback: '❌ SAI LẦM! Mở thêm cổng SSH ra Internet sẽ làm tăng diện tích bị tấn công (Attack Surface).',
        feedbackEn: '❌ WORSE! Opening port 22 expands the attack surface.'
      }
    ]
  },
  {
    id: 'vuln-4',
    resourceType: 'AWS IAM Role',
    resourceName: 'LambdaStudentGraderRole',
    severity: 'HIGH',
    description: 'Hàm Lambda chấm bài thi được gắn quyền AdministratorAccess (toàn quyền xóa mọi tài nguyên AWS)!',
    descriptionEn: 'Student grader Lambda function is granted full AdministratorAccess policy!',
    points: 15,
    remediationChoices: [
      {
        id: '4a',
        text: 'Gỡ bỏ AdministratorAccess, tạo IAM Policy đặc quyền tối thiểu chỉ cấp quyền dynamodb:PutItem và s3:GetObject.',
        textEn: 'Replace AdministratorAccess with scoped least-privilege IAM policy allowing only required actions.',
        isCorrect: true,
        feedback: '✅ PHÒNG THỦ CHIỀU SÂU! Nếu code Lambda bị lỗi hoặc inject, hacker cũng không thể xóa tài nguyên khác.',
        feedbackEn: '✅ DEFENSE IN DEPTH! Scoped permissions prevent blast radius if function code is compromised.'
      },
      {
        id: '4b',
        text: 'Giữ nguyên AdministratorAccess để tránh bị lỗi phân quyền (Access Denied).',
        textEn: 'Leave AdministratorAccess in place to avoid Access Denied errors.',
        isCorrect: false,
        feedback: '❌ PHẢN MẪU THIẾT KẾ! Cấp quyền Admin cho Lambda là lỗ hổng nghiêm trọng.',
        feedbackEn: '❌ BAD PRACTICE! Admin roles on compute functions violate AWS security pillars.'
      }
    ]
  },
  {
    id: 'vuln-5',
    resourceType: 'Amazon EBS',
    resourceName: 'vol-091f28b4 (LMS Database Disk)',
    severity: 'MEDIUM',
    description: 'Ổ đĩa chứa cơ sở dữ liệu khóa học Canvas LMS chưa được bật tính năng mã hóa lưu trữ tĩnh (Encryption at Rest)!',
    descriptionEn: 'EBS block volume holding Canvas course data is unencrypted at rest!',
    points: 15,
    remediationChoices: [
      {
        id: '5a',
        text: 'Tạo Snapshot mã hóa bằng AWS KMS, tạo Volume mới và bật tính năng EBS Encryption by Default cho toàn Account.',
        textEn: 'Create KMS encrypted snapshot, restore to new volume, and enable account-level EBS Encryption by Default.',
        isCorrect: true,
        feedback: '✅ TUÂN THỦ FERPA! Toàn bộ dữ liệu ổ đĩa được mã hóa chuẩn quân đội AES-256.',
        feedbackEn: '✅ FERPA COMPLIANT! Transparently encrypts all block storage at rest using AES-256.'
      },
      {
        id: '5b',
        text: 'Không cần mã hóa ổ đĩa vì máy chủ đã đặt trong Private Subnet.',
        textEn: 'Do not encrypt since instances are already in private subnets.',
        isCorrect: false,
        feedback: '❌ KHÔNG ĐẠT TIÊU CHUẨN! Mã hóa tại chỗ (At-Rest) là bắt buộc đối với hồ sơ học tập.',
        feedbackEn: '❌ COMPLIANCE FAILURE! Encryption at rest is mandatory for educational records.'
      }
    ]
  }
];
