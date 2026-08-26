import { DeepDiveTopic } from '../types';

export const DEEP_DIVE_LESSONS: DeepDiveTopic[] = [
  {
    id: 'networking-security-core',
    title: 'Mạng & Phân Vùng Bảo Mật AWS Chuyên Sâu (Enterprise VPC & Transit Gateway)',
    category: 'networking_security',
    categoryLabel: 'Mạng & Bảo Mật',
    tag: 'Networking / Security',
    readTimeMinutes: 20,
    importanceLevel: 'Bắt buộc',
    summary: 'Nắm vững cách phân chia dải mạng IPv4 (CIDR Subnetting), cấu hình Route Tables, NAT Gateway, Elastic Load Balancer và liên kết nhiều VPC thông qua Transit Gateway theo mô hình bảo mật Zero-Trust.',
    higherEdContext: 'Mạng lưới trường đại học (Campus Network) kết nối hàng chục tòa nhà, phòng thí nghiệm nghiên cứu y sinh học, trung tâm dữ liệu sinh viên và đám mây AWS. Việc phân tách mạng cách ly giữa các khoa và bảo vệ dữ liệu theo tiêu chuẩn FERPA là ưu tiên số 1.',
    coreConcepts: [
      {
        heading: '1. Kiến trúc VPC Chuẩn 3 Lớp (Three-Tier Multi-AZ VPC)',
        content: 'Một kiến trúc doanh nghiệp chuẩn luôn cần tối thiểu 2 Availability Zones (AZ) và 3 lớp Subnet riêng biệt trên mỗi AZ:',
        bulletPoints: [
          'Public Subnet: Chứa Application Load Balancer (ALB) và NAT Gateway. Có Route trực tiếp tới Internet Gateway (0.0.0.0/0 -> igw-xxx).',
          'Private Application Subnet: Chứa các máy chủ ứng dụng EC2 / ECS / EKS nodes. Không có Public IP. Đi ra Internet thông qua NAT Gateway đặt ở Public Subnet.',
          'Isolated Database Subnet: Chứa cơ sở dữ liệu Amazon RDS / Aurora. Không có Route ra Internet và không có NAT Gateway. Chỉ mở cổng kết nối nội bộ từ Application Subnet.'
        ]
      },
      {
        heading: '2. Phân biệt rõ Security Groups vs Network Access Control Lists (NACLs)',
        content: 'Đây là câu hỏi xuất hiện trong 100% các kỳ thi AWS Associate và phỏng vấn Cloud Engineer:',
        bulletPoints: [
          'Security Groups: Hoạt động ở tầng Instance (máy chủ ảo). Có trạng thái (Stateful - nếu mở Inbound thì Outbound tự động được cho phép). Chỉ hỗ trợ luật ALLOW (cho phép).',
          'NACLs: Hoạt động ở tầng Subnet (phân vùng mạng). Không lưu trạng thái (Stateless - cần mở cả Inbound và Outbound). Hỗ trợ cả luật ALLOW và DENY theo thứ tự số thứ tự (Rule number).'
        ]
      },
      {
        heading: '3. AWS Transit Gateway & Liên kết Mạng Trường Học',
        content: 'Khi đại học có nhiều phòng ban với các tài khoản AWS riêng biệt (AWS Accounts cho Viện Nghiên cứu, Khoa Khoa học Máy tính, Khối Quản lý Đào tạo), AWS Transit Gateway hoạt động như một Cloud Router tập trung, loại bỏ sự phức tạp của VPC Peering hình mạng nhện (Full Mesh).'
      }
    ],
    practicalCommands: [
      {
        tool: 'Terraform',
        title: 'Tạo VPC 3 Lớp Chuẩn Multi-AZ bằng Terraform Module',
        code: `module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "campus-production-vpc"
  cidr = "10.100.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  public_subnets  = ["10.100.1.0/24", "10.100.2.0/24"]
  private_subnets = ["10.100.11.0/24", "10.100.12.0/24"]
  database_subnets= ["10.100.21.0/24", "10.100.22.0/24"]

  enable_nat_gateway   = true
  single_nat_gateway   = false # High-availability Multi-AZ NAT
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Environment = "production"
    Department  = "Campus-IT"
    Compliance  = "FERPA"
  }
}`,
        description: 'Đoạn mã Terraform triển khai mạng VPC hoàn chỉnh đạt chuẩn HA với 2 NAT Gateway phân bố trên 2 Availability Zone.'
      },
      {
        tool: 'AWS CLI',
        title: 'Kiểm tra trạng thái Route Table và Subnet Associations',
        code: `# Liệt kê danh sách Subnet và CIDR Block
aws ec2 describe-subnets \
  --filters "Name=tag:Department,Values=Campus-IT" \
  --query "Subnets[*].{ID:SubnetId,CIDR:CidrBlock,AZ:AvailabilityZone,State:State}" \
  --output table`,
        description: 'Lệnh AWS CLI truy vấn nhanh danh sách subnet đang hoạt động thuộc phòng IT.'
      }
    ],
    labExercise: {
      title: 'Xây dựng Mạng VPC Multi-AZ và Kiểm thử Lưu lượng Cách ly',
      difficulty: 'Trung bình',
      duration: '45 phút',
      freeTierEligible: true,
      objectives: [
        'Tạo Custom VPC với CIDR 10.0.0.0/16',
        'Tạo 2 Public Subnets và 2 Private Subnets trên 2 AZ',
        'Cấu hình Internet Gateway, Route Tables và kiểm tra kết nối an toàn'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Khởi tạo Custom VPC',
          details: 'Vào AWS Console > VPC > Create VPC > Chọn "VPC and more" > Đặt tên là campus-vpc, dải CIDR 10.0.0.0/16, chọn 2 Availability Zones, 2 Public Subnets và 2 Private Subnets.'
        },
        {
          stepNumber: 2,
          title: 'Cấu hình NAT Gateway',
          details: 'Chọn 1 NAT Gateway (để tiết kiệm chi phí Free Tier khi thực hành) đặt trong Public Subnet us-east-1a.'
        },
        {
          stepNumber: 3,
          title: 'Kiểm thử truy cập',
          details: 'Khởi chạy một máy chủ EC2 trong Private Subnet và sử dụng AWS Systems Manager Session Manager để kết nối an toàn mà không cần mở cổng SSH (port 22) ra Internet.'
        }
      ]
    },
    examTip: 'Trong đề thi SAA-C03 / SAP-C02: Nếu tình huống yêu cầu "kết nối an toàn giữa hàng chục VPC và mạng On-premise với khả năng quản lý định tuyến tập trung", đáp án luôn là AWS Transit Gateway.',
    interviewQuestion: {
      question: 'Làm thế nào bạn đảm bảo máy chủ cơ sở dữ liệu của sinh viên trong AWS không thể bị tấn công trực tiếp từ Internet?',
      sampleAnswer: 'Tôi đặt toàn bộ Database trong Isolated Private Subnet (không có Internet Gateway hay NAT Gateway). Tiếp theo, cấu hình Security Group của Database chỉ cho phép Inbound traffic tại cổng kết nối (ví dụ port 3306 cho MySQL / 5432 cho PostgreSQL) có nguồn gốc duy nhất từ Security Group của tầng Application Server. Toàn bộ dữ liệu lưu trữ (at-rest) được mã hóa bằng AWS KMS và dữ liệu truyền tải (in-transit) bắt buộc dùng TLS/SSL.',
      keyPoints: ['Isolated Subnet', 'Security Group Chaining', 'AWS KMS Encryption', 'Không gán Public IP']
    }
  },
  {
    id: 'iac-terraform-automation',
    title: 'Hạ Tầng Dạng Mã (IaC) Với Terraform & CloudFormation Trong Thực Tế',
    category: 'iac',
    categoryLabel: 'Hạ Tầng Bằng Mã (IaC)',
    tag: 'Terraform / CloudFormation / CI-CD',
    readTimeMinutes: 25,
    importanceLevel: 'Bắt buộc',
    summary: 'Học cách quản lý toàn bộ tài nguyên đám mây thông qua mã lệnh (GitOps), viết module tái sử dụng, lưu trữ Remote State an toàn trên S3/DynamoDB và áp dụng pipeline CI/CD.',
    higherEdContext: 'Các trường đại học tại Mỹ yêu cầu mọi thay đổi hạ tầng phải có lịch sử kiểm toán (Audit Trail) và quy trình phê duyệt (Pull Request). Không một ai được cấu hình thủ công (ClickOps) trên AWS Console đối với môi trường Production.',
    coreConcepts: [
      {
        heading: '1. Tại sao Terraform là tiêu chuẩn số 1 tại các trường đại học Mỹ?',
        content: 'Terraform của HashiCorp cho phép:',
        bulletPoints: [
          'Đồng nhất quản trị: Quản lý được cả tài nguyên AWS Cloud, hạ tầng mạng On-premise (Cisco, VMware) và dịch vụ SaaS (Okta, GitHub, Cloudflare) trong cùng một cấu hình mã.',
          'Tính khai báo (Declarative): Bạn chỉ cần mô tả trạng thái mong muốn (Desired State), Terraform sẽ tự tính toán các bước thay đổi (Plan) và thực thi (Apply).',
          'Khả năng kiểm soát phiên bản (Version Control): Lưu trữ toàn bộ hạ tầng trong GitHub/GitLab, cho phép Rollback khi có sự cố.'
        ]
      },
      {
        heading: '2. Quản lý Remote State an toàn và Tránh xung đột',
        content: 'Trong môi trường nhóm làm việc nhiều kỹ sư:',
        bulletPoints: [
          'S3 Bucket: Lưu trữ file trạng thái `terraform.tfstate`, bắt buộc bật Versioning và Server-Side Encryption (KMS).',
          'DynamoDB Table: Khóa trạng thái (State Locking) với thuộc tính `LockID` để ngăn chặn hai kỹ sư cùng chạy `terraform apply` tại một thời điểm làm hỏng file state.'
        ]
      },
      {
        heading: '3. So sánh Terraform vs AWS CloudFormation / AWS CDK',
        content: 'CloudFormation là dịch vụ bản địa (Native) của AWS, rất tốt khi tích hợp sâu với AWS Service Catalog và Control Tower. AWS CDK cho phép viết hạ tầng bằng TypeScript/Python. Tuy nhiên Terraform vẫn phổ biến nhất nhờ cộng đồng module khổng lồ và hỗ trợ Multi-Cloud.'
      }
    ],
    practicalCommands: [
      {
        tool: 'Terraform',
        title: 'Cấu hình Backend S3 + DynamoDB State Lock',
        code: `terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "kent-state-terraform-state-prod"
    key            = "infrastructure/vpc/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-locks"
    encrypt        = true
  }
}`,
        description: 'Cấu hình chuẩn Enterprise để lưu trữ trạng thái Terraform an toàn và hỗ trợ khóa chống xung đột.'
      },
      {
        tool: 'Terraform',
        title: 'Triển khai Auto-Scaling Group phục vụ mùa Đăng ký Tín chỉ',
        code: `resource "aws_autoscaling_group" "student_portal_asg" {
  name_prefix         = "student-portal-"
  desired_capacity    = 2
  max_size            = 10  # Tự động tăng vọt vào ngày sinh viên đăng ký môn
  min_size            = 2
  target_group_arns   = [aws_lb_target_group.app_tg.arn]
  vpc_zone_identifier = module.vpc.private_subnets

  launch_template {
    id      = aws_launch_template.app_template.id
    version = "$Latest"
  }

  tag {
    key                 = "Environment"
    value               = "Production"
    propagate_at_launch = true
  }
}`,
        description: 'Mẫu khai báo Auto Scaling Group co giãn tự động theo tải của sinh viên.'
      }
    ],
    labExercise: {
      title: 'Viết Module Terraform Triển Khai Hạ Tầng Web Tự Động Hóa',
      difficulty: 'Trung bình',
      duration: '60 phút',
      freeTierEligible: true,
      objectives: [
        'Tạo cấu trúc thư mục Terraform chuyên nghiệp (modules, environments/dev, environments/prod)',
        'Khởi tạo S3 State Backend và DynamoDB Table',
        'Thực thi terraform init, plan, apply và kiểm tra tài nguyên trên AWS'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Khởi tạo cấu trúc thư mục',
          details: 'Tạo thư mục `terraform-aws-mastery/` gồm `main.tf`, `variables.tf`, `outputs.tf` và `terraform.tfvars`.'
        },
        {
          stepNumber: 2,
          title: 'Chạy Terraform Plan & Apply',
          details: 'Chạy `terraform init` để tải AWS Provider, sau đó chạy `terraform plan -out=tfplan` để kiểm tra các tài nguyên sẽ được tạo trước khi apply.'
        },
        {
          stepNumber: 3,
          title: 'Dọn dẹp tài nguyên',
          details: 'Sau khi hoàn thành bài thực hành, luôn chạy `terraform destroy` để hủy tài nguyên nhằm không phát sinh chi phí.'
        }
      ]
    },
    examTip: 'Đề thi SysOps (SOA-C02) và DevOps Pro rất hay hỏi về CloudFormation Drifts (phát hiện tài nguyên bị sửa đổi ngoài luồng) và Stack Policies (ngăn xóa tài nguyên quan trọng như Database).',
    interviewQuestion: {
      question: 'Khi nhận việc tại phòng IT trường, nếu bạn phát hiện các kỹ sư trước đó tạo tài nguyên thủ công trên AWS Console, bạn sẽ chuyển đổi sang Terraform như thế nào?',
      sampleAnswer: 'Tôi sẽ áp dụng quy trình "Terraform Import" theo từng bước: 1. Sử dụng lệnh `terraform import` (hoặc tính năng `import {}` block trong Terraform 1.5+) để ánh xạ tài nguyên thực tế vào Terraform State. 2. Viết mã khai báo HCL tương ứng cho tài nguyên đó. 3. Chạy `terraform plan` cho đến khi kết quả hiển thị "No changes. Your infrastructure matches the configuration". 4. Đưa mã vào Git repository và thiết lập CI/CD để khóa quyền sửa đổi thủ công trên AWS Console.',
      keyPoints: ['terraform import / import block', 'terraform plan no changes', 'GitOps & CI/CD workflow']
    }
  },
  {
    id: 'hybrid-cloud-migration',
    title: 'Hybrid Cloud & Chiến Lược Chuyển Đổi Dữ Liệu Lên Đám Mây (Migration Hub & Storage Gateway)',
    category: 'hybrid_migration',
    categoryLabel: 'Hybrid Cloud & Di Chuyển Hệ Thống',
    tag: 'Hybrid Cloud / Storage Gateway / DMS',
    readTimeMinutes: 22,
    importanceLevel: 'Rất cao',
    summary: 'Chiến lược 7Rs Migration, cấu hình AWS Storage Gateway, AWS DataSync và AWS Database Migration Service (DMS) để đồng bộ trung tâm dữ liệu trường học lên AWS.',
    higherEdContext: 'Hầu hết các trường đại học tại Mỹ đều đang ở trạng thái "Hybrid Cloud" (kết hợp máy chủ vật lý on-premise đặt tại khuôn viên trường với AWS Cloud). Dữ liệu nghiên cứu khổng lồ (Petabytes) từ kính thiên văn hay phòng lab sinh học cần đồng bộ lên S3 để phân tích với chi phí rẻ.',
    coreConcepts: [
      {
        heading: '1. Chiến Lược 7 chữ R trong Di Chuyển Lên Đám Mây (7Rs of Migration)',
        content: 'Khung phương pháp luận chuẩn của AWS cho việc chuyển đổi hệ thống:',
        bulletPoints: [
          'Rehost (Lift-and-Shift): Chuyển nguyên trạng máy chủ vật lý hoặc VM sang EC2 bằng AWS Application Migration Service (MGN) mà không sửa code.',
          'Replatform (Lift-and-Reshape): Tối ưu hóa nhỏ (ví dụ chuyển Database tự cài trên máy chủ sang Amazon RDS Managed Service).',
          'Refactor / Re-architect: Viết lại ứng dụng thành Microservices hoặc Serverless trên AWS.',
          'Repurchase: Thay thế bằng phần mềm SaaS (ví dụ thay email on-premise bằng Office 365 hoặc Canvas SaaS).',
          'Retire / Retain / Relocate: Tắt các hệ thống cũ không còn dùng / Giữ lại tại chỗ / Di chuyển VM sang VMware Cloud on AWS.'
        ]
      },
      {
        heading: '2. Các Loại AWS Storage Gateway Phục Vụ Trường Học',
        content: 'Storage Gateway là cầu nối giữa ổ đĩa on-premise và lưu trữ đám mây S3:',
        bulletPoints: [
          'S3 File Gateway: Cung cấp giao thức chia sẻ file quen thuộc (NFS / SMB) cho máy tính giảng viên, dữ liệu nền tự động lưu trên Amazon S3.',
          'Volume Gateway: Cung cấp ổ đĩa iSCSI cho máy chủ on-premise (chế độ Cached Volume để lưu data thường dùng tại chỗ, hoặc Stored Volume để lưu full data tại chỗ và backup lên S3).',
          'Tape Gateway: Thay thế hệ thống băng từ (Physical Tape) lưu trữ tài liệu lưu trữ sinh viên lâu năm bằng AWS Glacier Deep Archive với chi phí cực thấp (~$1/TB/tháng).'
        ]
      },
      {
        heading: '3. AWS DataSync & Database Migration Service (DMS)',
        content: 'AWS DataSync giúp truyền tải dữ liệu hàng chục Terabyte với tốc độ nhanh gấp 10 lần qua mạng Direct Connect/VPN nhờ nén dữ liệu và kiểm tra toàn vẹn tự động. AWS DMS cho phép di chuyển Database (Oracle/SQL Server) sang PostgreSQL/MySQL trên AWS gần như không có thời gian chết (Near-zero downtime).'
      }
    ],
    practicalCommands: [
      {
        tool: 'AWS CLI',
        title: 'Khởi tạo Task đồng bộ dữ liệu nghiên cứu bằng AWS DataSync',
        code: `# Tạo tác vụ đồng bộ từ NFS Storage on-campus sang S3 Bucket
aws datasync create-task \
  --source-location-arn "arn:aws:datasync:us-east-1:123456789012:location/loc-0123456789abcdef0" \
  --destination-location-arn "arn:aws:datasync:us-east-1:123456789012:location/loc-0987654321fedcba0" \
  --name "Sync-Research-Data-To-S3" \
  --options VerifyMode=POINT_IN_TIME_CONSISTENT,Atime=BEST_EFFORT,Mtime=PRESERVE`,
        description: 'Lệnh cấu hình AWS DataSync đồng bộ file định kỳ bảo toàn thời gian sửa đổi và phân quyền tệp tin.'
      },
      {
        tool: 'AWS CLI',
        title: 'Kiểm tra trạng thái nhân bản DMS Replication Task',
        code: `aws dms describe-replication-tasks \
  --filters "Name=replication-task-id,Values=campus-db-migration" \
  --query "ReplicationTasks[0].{Status:Status,Progress:PercentComplete,TablesLoaded:TableMappings}" \
  --output json`,
        description: 'Kiểm tra tiến độ di chuyển cơ sở dữ liệu sinh viên sang AWS RDS.'
      }
    ],
    labExercise: {
      title: 'Mô Phỏng Sao Lưu Dữ Liệu Trường Học Lên S3 Bằng AWS Storage Gateway',
      difficulty: 'Nâng cao',
      duration: '50 phút',
      freeTierEligible: true,
      objectives: [
        'Hiểu nguyên lý hoạt động của S3 File Gateway',
        'Tạo S3 Bucket với Lifecycle Rule tự động chuyển dữ liệu sang Glacier sau 90 ngày',
        'Cấu hình phân quyền IAM Role cho Storage Gateway truy cập S3'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Tạo S3 Bucket lưu trữ hồ sơ trường học',
          details: 'Tạo bucket `university-records-archive` với mã hóa SSE-KMS và bật Versioning.'
        },
        {
          stepNumber: 2,
          title: 'Thiết lập S3 Lifecycle Rules',
          details: 'Cấu hình quy tắc: Sau 30 ngày chuyển sang S3 Standard-IA, sau 90 ngày chuyển sang S3 Glacier Flexible, sau 365 ngày chuyển sang S3 Glacier Deep Archive.'
        },
        {
          stepNumber: 3,
          title: 'Kiểm tra và tính toán chi phí',
          details: 'Sử dụng AWS Pricing Calculator để so sánh chi phí giữa việc giữ ổ cứng on-premise với lưu trên Glacier Deep Archive.'
        }
      ]
    },
    examTip: 'Trong đề thi SAP-C02: Nếu đề bài nói về "Thay thế kho lưu trữ băng từ (Physical Tape) cũ mà không cần thay đổi phần mềm sao lưu hiện có", đáp án đúng chắc chắn là Storage Gateway Tape Gateway.',
    interviewQuestion: {
      question: 'Làm thế nào để di chuyển cơ sở dữ liệu Oracle 5TB từ máy chủ on-premise của trường sang AWS Aurora PostgreSQL mà không làm gián đoạn thời gian sinh viên nộp bài?',
      sampleAnswer: 'Tôi sẽ sử dụng giải pháp kết hợp hai bước: 1. Dùng AWS Schema Conversion Tool (SCT) để chuyển đổi cấu trúc bảng, views và stored procedures từ Oracle sang PostgreSQL. 2. Sử dụng AWS Database Migration Service (DMS) với chế độ Full Load + Ongoing Replication (Change Data Capture - CDC). Trong lúc hệ thống cũ vẫn chạy, DMS sẽ liên tục đồng bộ các giao dịch mới. Vào một khung giờ bảo trì ngắn ban đêm, chúng ta chỉ cần chuyển đổi DNS trỏ sang Aurora PostgreSQL.',
      keyPoints: ['AWS SCT for schema conversion', 'AWS DMS with CDC (Change Data Capture)', 'Near-zero downtime cutover']
    }
  },
  {
    id: 'containers-serverless-eks',
    title: 'Container Hóa (Docker, EKS, ECS) & Serverless Trong Môi Trường Giáo Dục',
    category: 'containers_serverless',
    categoryLabel: 'Container & Serverless',
    tag: 'Docker / EKS / Lambda / API Gateway',
    readTimeMinutes: 24,
    importanceLevel: 'Rất cao',
    summary: 'Xây dựng ứng dụng hiện đại với Amazon EKS (Kubernetes), ECS Fargate không cần quản lý máy chủ và kiến trúc hướng sự kiện (Event-Driven) với AWS Lambda, API Gateway và EventBridge.',
    higherEdContext: 'Lưu lượng truy cập hệ thống đại học biến động rất lớn: Rất cao vào tuần đầu đăng ký môn học và các kỳ thi cuối kỳ, nhưng rất thấp vào kỳ nghỉ hè. Kiến trúc Serverless và Container Auto-scaling giúp tiết kiệm hàng trăm ngàn USD ngân sách mỗi năm.',
    coreConcepts: [
      {
        heading: '1. Amazon ECS vs Amazon EKS: Lựa chọn nào cho trường học?',
        content: 'So sánh giải pháp Container Orchestration:',
        bulletPoints: [
          'Amazon ECS (Elastic Container Service): Đơn giản, cấu hình nhanh, tích hợp mượt mà với IAM và CloudWatch. Rất phù hợp cho các đội ngũ IT trường học muốn quản lý container mà không cần chuyên gia Kubernetes sâu.',
          'Amazon EKS (Elastic Kubernetes Service): Chuẩn mực công nghiệp, tương thích 100% với hệ sinh thái mã nguồn mở Kubernetes (Helm, ArgoCD, Prometheus). Phù hợp cho các dự án nghiên cứu lớn hoặc các trường đại học quy mô cấp bang.',
          'AWS Fargate: Mô hình Serverless Compute cho cả ECS và EKS, loại bỏ hoàn toàn việc phải vá lỗi hệ điều hành và quản lý cụm máy chủ EC2 bên dưới.'
        ]
      },
      {
        heading: '2. Kiến Trúc Hướng Sự Kiện Serverless (Event-Driven Architecture)',
        content: 'Các thành phần trụ cột:',
        bulletPoints: [
          'Amazon API Gateway: Cổng tiếp nhận HTTP/REST/WebSocket APIs với chức năng xác thực JWT, Rate Limiting chống DDOS.',
          'AWS Lambda: Chạy mã nguồn Python/Node.js/Go theo sự kiện, thời gian thực thi tối đa 15 phút, tính tiền theo từng mili-giây.',
          'Amazon DynamoDB: Cơ sở dữ liệu NoSQL hiệu năng cao dưới 10 mili-giây, hỗ trợ On-Demand Capacity Mode tự động co giãn.',
          'Amazon EventBridge: Bus định tuyến sự kiện (ví dụ: Sự kiện sinh viên nộp bài thi -> gửi thông báo SNS -> gọi Lambda tính điểm).'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'AWS CLI',
        title: 'Triển khai hàm Lambda xử lý Webhook từ LMS Canvas bằng Serverless Framework',
        code: `# deploy hàm Lambda bằng AWS Serverless Application Model (SAM)
sam build
sam deploy --guided \
  --stack-name campus-canvas-webhook \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides Environment=production`,
        description: 'Lệnh build và deploy hệ thống Serverless tự động hóa theo chuẩn AWS SAM.'
      },
      {
        tool: 'Terraform',
        title: 'Khai báo Cụm Amazon EKS Cluster với Fargate Profile',
        code: `module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "campus-research-k8s"
  cluster_version = "1.30"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  fargate_profiles = {
    research_workloads = {
      name = "research-apps"
      selectors = [
        { namespace = "research" }
      ]
    }
  }
}`,
        description: 'Tạo cụm Kubernetes EKS chạy hoàn toàn trên AWS Fargate không cần quản lý máy chủ vật lý.'
      }
    ],
    labExercise: {
      title: 'Tạo API Serverless Xử Lý Đăng Ký Hội Thảo Sinh Viên',
      difficulty: 'Trung bình',
      duration: '40 phút',
      freeTierEligible: true,
      objectives: [
        'Tạo DynamoDB Table `StudentEvents` với Partition Key `EventId` và Sort Key `StudentEmail`',
        'Viết hàm Lambda Python ghi nhận thông tin đăng ký',
        'Tạo HTTP API Gateway trỏ về hàm Lambda và kiểm thử bằng Postman/cURL'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Tạo bảng DynamoDB On-Demand',
          details: 'Vào DynamoDB > Create Table > Table name: StudentEvents, Partition key: EventId (String), Sort key: StudentEmail (String), Capacity mode: On-demand.'
        },
        {
          stepNumber: 2,
          title: 'Tạo Lambda Function',
          details: 'Tạo hàm Lambda Python 3.12, gán IAM Role có quyền `dynamodb:PutItem` vào bảng vừa tạo.'
        },
        {
          stepNumber: 3,
          title: 'Kết nối API Gateway & Test',
          details: 'Tạo API Gateway HTTP API với route `POST /register`, tích hợp với Lambda và gửi request JSON kiểm tra dữ liệu xuất hiện trong DynamoDB.'
        }
      ]
    },
    examTip: 'Trong đề thi DVA-C02 & SAA-C03: Để giải quyết bài toán Cold Start (độ trễ khi Lambda khởi động lần đầu), phương án tối ưu là bật Provisioned Concurrency.',
    interviewQuestion: {
      question: 'Khi hệ thống đăng ký tín chỉ của trường bị nghẽn mạng do 20,000 sinh viên cùng truy cập vào đúng 8h00 sáng, bạn sẽ thiết kế lại kiến trúc như thế nào trên AWS?',
      sampleAnswer: 'Tôi sẽ tách rời (decouple) kiến trúc thành mô hình Bất đồng bộ (Asynchronous Queue-Based Architecture): 1. Đặt Amazon CloudFront và API Gateway ở tầng tiếp nhận để cache nội dung tĩnh và kiểm soát lưu lượng (Rate Limiting). 2. Yêu cầu đăng ký từ sinh viên được đẩy ngay vào hàng đợi Amazon SQS (FIFO Queue) để bảo đảm thứ tự "ai bấm trước nhận trước" và trả về phản hồi 202 Accepted cho người dùng ngay lập tức. 3. Các Worker chạy trên AWS Lambda hoặc ECS Fargate sẽ đọc từng đợt từ SQS và ghi vào DynamoDB có Transactions. Cách này giúp hệ thống không bao giờ bị sập dù lượng truy cập tăng đột biến 100 lần.',
      keyPoints: ['Amazon SQS FIFO Queue for buffering', 'Decoupled architecture', 'DynamoDB Transactions', 'CloudFront caching']
    }
  },
  {
    id: 'university-lms-sso-iam',
    title: 'Xác Thực Tập Trung SSO & Tích Hợp LMS (Canvas/Blackboard, SAML 2.0 & FERPA)',
    category: 'university_lms_sso',
    categoryLabel: 'Xác Thực SSO & Tích Hợp LMS Đại Học',
    tag: 'IAM Identity Center / Okta / Canvas LMS / FERPA',
    readTimeMinutes: 20,
    importanceLevel: 'Bắt buộc',
    summary: 'Cấu hình AWS IAM Identity Center (SSO), liên kết liên đoàn danh tính (Identity Federation) với Okta/Microsoft Entra ID, tích hợp Webhook LMS Canvas/Blackboard và bảo mật theo luật bảo vệ quyền riêng tư sinh viên FERPA.',
    higherEdContext: 'Đây là mảng kiến thức tạo sự khác biệt lớn nhất giúp bạn ghi điểm tuyệt đối khi phỏng vấn tại các trường đại học Mỹ như Kent State University. Mọi nhân viên và sinh viên đều đăng nhập qua cổng SSO trường học duy nhất (Single Sign-On).',
    coreConcepts: [
      {
        heading: '1. Identity Federation với SAML 2.0 & SCIM Sync',
        content: 'Cách trường đại học quản lý tài khoản AWS:',
        bulletPoints: [
          'Identity Provider (IdP): Trường đại học sử dụng Okta, Microsoft Entra ID (Azure AD), hoặc Shibboleth On-premise để quản lý tài khoản.',
          'Service Provider (SP): AWS IAM Identity Center đóng vai trò SP nhận SAML Assertions an toàn từ IdP.',
          'SCIM (System for Cross-domain Identity Management): Tự động đồng bộ tài khoản người dùng và nhóm (Groups) từ hệ thống trường học sang AWS theo thời gian thực (khi sinh viên tốt nghiệp hoặc nhân viên nghỉ việc, quyền truy cập AWS tự động bị thu hồi).'
        ]
      },
      {
        heading: '2. Tích hợp Hệ thống Quản lý Học tập (Canvas LMS / Blackboard)',
        content: 'Cách AWS kết nối với phần mềm học tập của trường:',
        bulletPoints: [
          'Canvas LMS Webhooks: Khi giảng viên công bố điểm hoặc sinh viên nộp bài tập, Canvas phát ra webhook HTTPS gửi tới Amazon API Gateway.',
          'LTI 1.3 (Learning Tools Interoperability): Tiêu chuẩn quốc tế cho phép nhúng ứng dụng AWS trực tiếp vào giao diện Canvas mà không cần đăng nhập lại nhờ OAuth2/OIDC token.',
          'Lưu trữ Media bài giảng: Sử dụng Amazon S3 Presigned URLs và CloudFront Signed Cookies để bảo vệ video bài giảng chỉ cho phép sinh viên đã đăng ký khóa học xem.'
        ]
      },
      {
        heading: '3. Tuân thủ Quy định Bảo vệ Dữ liệu Giáo dục (FERPA Compliance)',
        content: 'Family Educational Rights and Privacy Act (FERPA) là luật liên bang Mỹ bảo vệ thông tin học tập của sinh viên. Trên AWS, bạn phải đảm bảo: Dữ liệu PII (Personally Identifiable Information) được mã hóa ở mọi nơi (KMS), bật CloudTrail ghi log mọi hành động truy cập, và áp dụng nguyên tắc đặc quyền tối thiểu (Least Privilege).'
      }
    ],
    practicalCommands: [
      {
        tool: 'AWS CLI',
        title: 'Cấu hình IAM Identity Center Permission Set cho Giảng viên & Nghiên cứu sinh',
        code: `# Tạo Permission Set cấp quyền Read-Only cho tài nguyên nghiên cứu
aws sso-admin create-permission-set \
  --instance-arn "arn:aws:sso:::instance/ssoins-1234567890abcdef" \
  --name "Faculty-Research-ReadOnly" \
  --description "Read-only access to S3 Research Datasets" \
  --session-duration "PT4H"`,
        description: 'Lệnh quản trị bộ quyền trong AWS IAM Identity Center cho cán bộ trường đại học.'
      }
    ],
    labExercise: {
      title: 'Tạo S3 Presigned URL Bảo Mật Cho Tài Liệu Học Tập Giảng Viên',
      difficulty: 'Dễ',
      duration: '30 phút',
      freeTierEligible: true,
      objectives: [
        'Tạo S3 Bucket riêng tư hoàn toàn (Block All Public Access)',
        'Viết mã Python sinh đường dẫn Presigned URL có thời hạn 15 phút',
        'Kiểm tra đường dẫn truy cập hợp lệ trước và sau khi hết hạn'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Khởi tạo Private S3 Bucket',
          details: 'Tạo bucket `campus-lecture-materials-private` và kiểm tra xác nhận tính năng Block Public Access đã được bật.'
        },
        {
          stepNumber: 2,
          title: 'Tạo Presigned URL',
          details: 'Dùng AWS CLI: `aws s3 presign s3://campus-lecture-materials-private/syllabus.pdf --expires-in 900`.'
        },
        {
          stepNumber: 3,
          title: 'Xác minh bảo mật',
          details: 'Thử mở liên kết trong trình duyệt ẩn danh để xác nhận file tải về được, và kiểm tra lại sau 15 phút để thấy link tự động bị từ chối (403 Forbidden).'
        }
      ]
    },
    examTip: 'Trong đề thi SAA-C03 & SAP-C02: Để cấp quyền truy cập tạm thời cho hàng chục ngàn sinh viên sử dụng tài khoản trường học mà không cần tạo IAM User thủ công, giải pháp luôn là SAML 2.0 Identity Federation hoặc IAM Identity Center.',
    interviewQuestion: {
      question: 'Làm thế nào để phòng IT trường đại học bảo đảm tuân thủ quy định FERPA khi lưu trữ và xử lý điểm số của sinh viên trên AWS?',
      sampleAnswer: 'Để tuân thủ FERPA trên AWS, tôi áp dụng 4 nguyên tắc trụ cột: 1. Mã hóa toàn diện: Dữ liệu điểm số lưu trong S3/RDS phải mã hóa bằng AWS KMS với Customer Managed Keys (CMK) và bắt buộc HTTPS (TLS 1.3) khi truyền tải. 2. Phân quyền tối thiểu (Least Privilege): Sử dụng IAM Roles kết hợp với SSO dựa trên nhóm thuộc tính (ABAC - Attribute-Based Access Control). Giảng viên chỉ truy cập được lớp mình dạy. 3. Giám sát & Nhật ký kiểm toán: Bật AWS CloudTrail và AWS Config để ghi vết 100% các lệnh đọc/ghi dữ liệu học tập. 4. Cô lập môi trường: Tách biệt hoàn toàn tài khoản AWS Production và Non-Production thông qua AWS Organizations.',
      keyPoints: ['AWS KMS Encryption', 'Attribute-Based Access Control (ABAC)', 'AWS CloudTrail Audit Logging', 'AWS Organizations Account Isolation']
    }
  }
];
