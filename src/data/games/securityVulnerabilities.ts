export interface SecurityVulnerability {
  id: string;
  resourceType: string;
  resourceName: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  descriptionEn: string;
  remediationAction: string;
  remediationActionEn: string;
  points: number;
}

export const SECURITY_VULNERABILITIES: SecurityVulnerability[] = [
  {
    id: 'vuln-1',
    resourceType: 'Amazon S3',
    resourceName: 's3://kent-university-student-transcripts',
    severity: 'CRITICAL',
    description: 'Bucket chứa bảng điểm sinh viên đang bị cấu hình Public Read (AllUsers: READ) và chưa bật mã hóa KMS!',
    descriptionEn: 'Student transcript S3 bucket has public read access enabled with missing KMS encryption!',
    remediationAction: 'Bật "Block Public Access" ở cấp độ Account & Bucket, áp dụng mã hóa SSE-KMS với Customer Managed Key.',
    remediationActionEn: 'Enable S3 Block Public Access on account level and enforce SSE-KMS encryption with CMK.',
    points: 25
  },
  {
    id: 'vuln-2',
    resourceType: 'AWS IAM Root Account',
    resourceName: 'AWS Account Root User',
    severity: 'CRITICAL',
    description: 'Tài khoản Root của trường đại học đang tạo Access Key ID hoạt động và chưa bật xác thực 2 bước đa yếu tố (MFA)!',
    descriptionEn: 'Root user has active Access Keys generated and lacks Hardware/FIDO2 Multi-Factor Authentication (MFA)!',
    remediationAction: 'Xóa vĩnh viễn Access Key của tài khoản Root, kích hoạt FIDO2 Hardware Security Key MFA và khóa tài khoản.',
    remediationActionEn: 'Delete Root access keys immediately and enforce hardware token / FIDO2 MFA on the root account.',
    points: 25
  },
  {
    id: 'vuln-3',
    resourceType: 'EC2 Security Group',
    resourceName: 'sg-0a89d71c (Production Database SG)',
    severity: 'HIGH',
    description: 'Cổng Database PostgreSQL (port 5432) và RDP (port 3389) đang mở Inbound cho 0.0.0.0/0!',
    descriptionEn: 'PostgreSQL DB port 5432 and Windows RDP port 3389 are exposed to 0.0.0.0/0 on the internet!',
    remediationAction: 'Xóa luật 0.0.0.0/0, chỉ cho phép Inbound từ Security Group của tầng Application Server (sg-app-tier).',
    remediationActionEn: 'Restrict Inbound rules strictly to the App Tier Security Group ID (least privilege).',
    points: 20
  },
  {
    id: 'vuln-4',
    resourceType: 'AWS IAM Role',
    resourceName: 'LambdaStudentGraderRole',
    severity: 'HIGH',
    description: 'Hàm Lambda chấm bài thi được gắn quyền AdministratorAccess (toàn quyền xóa mọi tài nguyên AWS)!',
    descriptionEn: 'Student grader Lambda function is granted full AdministratorAccess policy!',
    remediationAction: 'Gỡ bỏ AdministratorAccess, tạo IAM Policy đặc quyền tối thiểu chỉ cấp quyền dynamodb:PutItem và s3:GetObject.',
    remediationActionEn: 'Replace AdministratorAccess with scoped least-privilege policy allowing only specific DynamoDB and S3 actions.',
    points: 15
  },
  {
    id: 'vuln-5',
    resourceType: 'Amazon EBS',
    resourceName: 'vol-091f28b4 (LMS Database Disk)',
    severity: 'MEDIUM',
    description: 'Ổ đĩa chứa cơ sở dữ liệu khóa học Canvas LMS chưa được bật tính năng mã hóa lưu trữ tĩnh (Encryption at Rest)!',
    descriptionEn: 'EBS block volume holding Canvas course data is unencrypted at rest!',
    remediationAction: 'Bật tính năng mặc định mã hóa toàn bộ EBS trong vùng (EBS Encryption by Default) bằng AWS KMS.',
    remediationActionEn: 'Enable account-level EBS Encryption by Default using AWS KMS CMK.',
    points: 15
  }
];
