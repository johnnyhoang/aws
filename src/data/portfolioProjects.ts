import { PortfolioProject } from '../types';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'project-3-tier-ha-portal',
    title: 'Dự án 1: Cổng Thông Tin Sinh Viên Khả Dụng Cao 3 Lớp (High-Availability 3-Tier Web Architecture)',
    subtitle: 'Kiến trúc Multi-AZ VPC, ALB, Auto Scaling, RDS Multi-AZ & CloudFront',
    targetRole: 'Cloud Engineer / Systems Administrator / Infrastructure Specialist',
    difficulty: 'Trung bình',
    estimatedHours: 15,
    estimatedCost: '~$0 (Hoàn toàn nằm trong AWS Free Tier nếu tắt khi không dùng)',
    summary: 'Xây dựng toàn diện một kiến trúc web chuẩn Enterprise có khả năng chịu tải tự động co giãn khi có hàng chục ngàn sinh viên truy cập xem điểm hoặc đăng ký môn học cùng lúc.',
    businessScenario: 'Trường Đại học (ví dụ Kent State) cần một hạ tầng phục vụ Cổng thông tin Dịch vụ Sinh viên (Student Services Portal) đảm bảo tính sẵn sàng 99.99%, không bao giờ sập khi có đợt cao điểm nộp học phí và đăng ký tín chỉ.',
    architectureComponents: [
      {
        tier: 'Edge & Presentation Tier (Tầng Tiếp nhận & Phân phối)',
        services: ['Amazon CloudFront', 'AWS WAF', 'Route 53', 'Application Load Balancer (ALB)'],
        description: 'CloudFront phân phối nội dung tĩnh từ S3, AWS WAF chặn tấn công SQLi/XSS, ALB điều hướng lưu lượng đồng đều qua 2 Availability Zone.'
      },
      {
        tier: 'Application Tier (Tầng Ứng dụng Máy chủ)',
        services: ['EC2 Auto Scaling Group', 'AWS Systems Manager', 'CloudWatch Alarms'],
        description: 'Cụm máy chủ EC2 đặt trong Private Subnet, tự động tăng từ 2 lên 10 instances dựa trên CPU Utilization hoặc Request Count.'
      },
      {
        tier: 'Database Tier (Tầng Lưu trữ & Dữ liệu)',
        services: ['Amazon RDS PostgreSQL Multi-AZ', 'Amazon ElastiCache Redis', 'AWS KMS'],
        description: 'Cơ sở dữ liệu chính (Primary DB) đặt tại AZ-1 và bản sao dự phòng tự động (Standby DB) tại AZ-2, mã hóa dữ liệu với KMS.'
      }
    ],
    keySkillsDemonstrated: [
      'Thiết kế mạng Multi-AZ Subnetting cách ly an toàn',
      'Cấu hình Auto Scaling Policy và Health Checks trên ALB',
      'Triển khai Database Multi-AZ Failover trong vòng 60 giây',
      'Tối ưu hóa chi phí với CloudFront Caching và NAT Gateway scheduling'
    ],
    stepByStepGuide: [
      {
        phase: 'Giai đoạn 1: Mạng VPC & Security Groups',
        title: 'Thiết lập Mạng Cơ sở',
        tasks: [
          'Tạo Custom VPC (10.0.0.0/16) với 2 Public Subnets, 2 Private App Subnets, 2 Private DB Subnets trên 2 AZ.',
          'Tạo Internet Gateway, NAT Gateway và gắn vào Route Tables tương ứng.',
          'Tạo 3 tầng Security Groups: `alb-sg` (cho phép port 80/443 từ 0.0.0.0/0), `app-sg` (chỉ cho phép port 80 từ `alb-sg`), `db-sg` (chỉ cho phép port 5432 từ `app-sg`).'
        ]
      },
      {
        phase: 'Giai đoạn 2: Cơ sở dữ liệu RDS & Máy chủ Ứng dụng',
        title: 'Triển khai Tầng Dữ liệu và Tầng Ứng dụng',
        tasks: [
          'Tạo DB Subnet Group bao gồm 2 Private DB Subnets.',
          'Khởi tạo Amazon RDS PostgreSQL instance với cấu hình Multi-AZ bật, Storage Auto-scaling bật, gắn `db-sg`.',
          'Tạo Launch Template cho EC2 với User Data script cài đặt Node.js/PHP runtime kết nối với RDS endpoint.',
          'Tạo Auto Scaling Group kết nối với Application Load Balancer.'
        ]
      },
      {
        phase: 'Giai đoạn 3: Phân phối & Kiểm thử Chịu tải (Stress Test)',
        title: 'Cấu hình CloudFront & Kiểm thử Chịu lỗi',
        tasks: [
          'Tạo CloudFront Distribution trỏ Origin vào ALB và S3 Bucket chứa asset tĩnh.',
          'Thực hiện kiểm thử Failover: Nhấn "Reboot with Failover" trên RDS và đo thời gian gián đoạn (chỉ dưới 45 giây ứng dụng đã tự động kết nối lại).',
          'Dùng công cụ `locust` hoặc `ab` (Apache Bench) gửi 1,000 requests/giây để chứng kiến Auto Scaling Group tự động bật thêm máy chủ mới.'
        ]
      }
    ],
    iacCodeSample: {
      language: 'Terraform (HCL)',
      filename: 'main.tf',
      code: `resource "aws_lb" "student_portal_alb" {
  name               = "student-portal-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = module.vpc.public_subnets

  enable_deletion_protection = false

  tags = {
    Name        = "StudentPortal-ALB"
    Environment = "Production"
  }
}

resource "aws_db_instance" "campus_db" {
  identifier           = "campus-portal-database"
  allocated_storage    = 20
  max_allocated_storage= 100
  engine               = "postgres"
  engine_version       = "16.1"
  instance_class       = "db.t4g.micro" # Free Tier Friendly
  db_name              = "campusdb"
  username             = "dbadmin"
  password             = var.db_password
  multi_az             = true
  db_subnet_group_name = aws_db_subnet_group.db_subnets.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  skip_final_snapshot  = true
  storage_encrypted    = true
}`
    },
    interviewStarStory: {
      situation: 'Hệ thống đăng ký tín chỉ và xem bảng điểm của trường đại học thường xuyên bị chậm và sập cục bộ trong ngày đầu tiên của học kỳ do lượng sinh viên tăng đột biến.',
      task: 'Nhiệm vụ của tôi là thiết kế lại kiến trúc đám mây trên AWS với tiêu chí: Tính sẵn sàng cao (High Availability), tự động co giãn không giới hạn và bảo vệ cơ sở dữ liệu an toàn tuyệt đối khỏi Internet.',
      action: 'Tôi đã triển khai kiến trúc 3 lớp phân tách trên 2 Availability Zones bằng Terraform. Tôi đặt Database trong Subnet cô lập có Multi-AZ Failover, sử dụng Auto Scaling Group cho tầng ứng dụng máy chủ và tích hợp CloudFront Caching ở rìa mạng để gánh 70% tải các tài nguyên tĩnh.',
      result: 'Hệ thống đã phục vụ thành công đợt đăng ký tín chỉ của 25,000 sinh viên với thời gian phản hồi trang dưới 200ms, tỷ lệ uptime đạt 99.99% và giảm 35% chi phí máy chủ hàng tháng nhờ tính năng tự động thu hẹp (scale-down) vào ban đêm.'
    },
    githubRepoTemplateTip: 'Đặt tên GitHub repo là: `aws-high-availability-student-portal-terraform`. Trong README, đính kèm sơ đồ kiến trúc Mermaid/PNG, hướng dẫn triển khai 1 lệnh `terraform apply` và bảng số liệu kiểm thử hiệu năng (Stress Test results).'
  },
  {
    id: 'project-serverless-lms-analytics',
    title: 'Dự án 2: Hệ Thống Phân Tích Dữ Liệu Học Tập Serverless Thời Gian Thực (Canvas LMS Webhook Processor)',
    subtitle: 'Kiến trúc API Gateway, AWS Lambda, EventBridge, DynamoDB, S3 Data Lake & Athena',
    targetRole: 'Cloud Software Developer / Data & Integration Engineer',
    difficulty: 'Trung bình',
    estimatedHours: 12,
    estimatedCost: '$0 (100% AWS Free Tier: 1M Lambda invocations, 25GB DynamoDB)',
    summary: 'Xây dựng đường ống (Pipeline) hướng sự kiện tiếp nhận dữ liệu tương tác của sinh viên từ hệ thống Canvas LMS, xử lý tức thì bằng Lambda và lưu vào Data Lake để phân tích dự báo nguy cơ trượt môn.',
    businessScenario: 'Ban Giám hiệu và Cố vấn học tập muốn có hệ thống cảnh báo sớm (Early Alert System) tự động phân tích khi sinh viên không nộp bài tập hoặc có điểm kiểm tra đột ngột giảm trên Canvas LMS để can thiệp kịp thời.',
    architectureComponents: [
      {
        tier: 'Ingestion Tier (Tầng Thu thập)',
        services: ['Amazon API Gateway (HTTP API)', 'AWS Lambda Webhook Authorizer'],
        description: 'Tiếp nhận Webhook Payload an toàn từ Canvas LMS với xác thực HMAC signature.'
      },
      {
        tier: 'Processing & Event Bus (Tầng Xử lý & Phân luồng)',
        services: ['AWS Lambda (Python 3.12)', 'Amazon EventBridge', 'Amazon SQS DLQ'],
        description: 'Hàm Lambda phân tích payload, gửi sự kiện `GradeSubmitted` hoặc `AssignmentOverdue` lên EventBridge.'
      },
      {
        tier: 'Storage & Analytics (Tầng Lưu trữ & Truy vấn)',
        services: ['Amazon DynamoDB', 'Amazon S3 Glacier / Data Lake', 'Amazon Athena'],
        description: 'DynamoDB lưu trạng thái tức thì của sinh viên; S3 lưu log lịch sử dạng Parquet; Amazon Athena cho phép giảng viên chạy câu lệnh SQL phân tích trực tiếp trên S3.'
      }
    ],
    keySkillsDemonstrated: [
      'Phát triển ứng dụng Serverless hướng sự kiện (Event-Driven)',
      'Tích hợp Webhook an toàn với tiêu chuẩn bảo mật LMS giáo dục',
      'Tối ưu hóa DynamoDB Single-Table Design',
      'Xây dựng Serverless Data Lake với Amazon Athena & SQL query'
    ],
    stepByStepGuide: [
      {
        phase: 'Giai đoạn 1: Database & Event Routing',
        title: 'Thiết lập DynamoDB & EventBridge',
        tasks: [
          'Tạo bảng DynamoDB `StudentLearningActivities` với PK: `StudentId`, SK: `CourseId#Timestamp`.',
          'Tạo Custom EventBridge Bus tên `campus-lms-events` với quy tắc lọc điểm số dưới 50% để kích hoạt chuông cảnh báo.'
        ]
      },
      {
        phase: 'Giai đoạn 2: Xây dựng Lambda & API Gateway',
        title: 'Viết Logic Xử Lý Dữ Liệu',
        tasks: [
          'Viết Lambda function bằng Python xử lý webhook event từ Canvas LMS.',
          'Cấu hình Dead Letter Queue (SQS DLQ) để hứng các sự kiện lỗi giúp hệ thống không bao giờ bị mất dữ liệu.',
          'Tạo HTTP API Gateway trỏ về Lambda với tính năng CORS và Throttling giới hạn 500 req/s.'
        ]
      },
      {
        phase: 'Giai đoạn 3: Serverless Analytics với Athena',
        title: 'Truy vấn Phân tích trên S3 Data Lake',
        tasks: [
          'Lưu trữ bản sao dữ liệu dạng JSON/Parquet vào S3 Bucket `campus-learning-lake`.',
          'Tạo bảng Amazon Athena trỏ vào S3 và viết truy vấn SQL tìm top 10% sinh viên có tiến độ học tập xuất sắc nhất.'
        ]
      }
    ],
    iacCodeSample: {
      language: 'AWS SAM / CloudFormation',
      filename: 'template.yaml',
      code: `AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: Canvas LMS Webhook Processor for Student Analytics

Resources:
  LMSWebhookFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.lambda_handler
      Runtime: python3.12
      MemorySize: 256
      Timeout: 10
      Environment:
        Variables:
          TABLE_NAME: !Ref StudentAnalyticsTable
      Events:
        CanvasWebhook:
          Type: HttpApi
          Properties:
            Path: /webhooks/canvas
            Method: POST
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref StudentAnalyticsTable

  StudentAnalyticsTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: StudentAnalytics
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: StudentId
          AttributeType: S
        - AttributeName: ActivityTimestamp
          AttributeType: S
      KeySchema:
        - AttributeName: StudentId
          KeyType: HASH
        - AttributeName: ActivityTimestamp
          KeyType: RANGE`
    },
    interviewStarStory: {
      situation: 'Giảng viên và cố vấn tại trường gặp khó khăn trong việc phát hiện sớm sinh viên gặp trở ngại học tập do dữ liệu trên hệ thống Canvas LMS bị phân tán và chỉ được tổng kết sau khi kết thúc kỳ thi.',
      task: 'Tôi đã chủ động xây dựng một giải pháp Serverless để tiếp nhận và phân tích tức thời toàn bộ hành vi học tập (nộp bài, xem video, làm quiz) từ Canvas LMS.',
      action: 'Tôi đã tạo API Gateway tiếp nhận Webhook từ Canvas, truyền vào AWS Lambda để chuẩn hóa dữ liệu, ghi vào DynamoDB cho dashboard giảng viên và đẩy lên S3 Data Lake để phân tích nâng cao với Amazon Athena.',
      result: 'Giải pháp hoàn toàn Serverless vận hành với chi phí gần như 0 USD/tháng, xử lý hơn 100,000 sự kiện mỗi ngày với độ trễ xử lý dưới 500ms và giúp trường phát hiện hơn 120 trường hợp sinh viên cần trợ giúp sớm.'
    },
    githubRepoTemplateTip: 'Đặt tên GitHub repo là: `serverless-canvas-lms-analytics-aws`. Đây là dự án "bảo bối" khi apply vào vị trí Developer/Data Specialist tại các trường đại học Mỹ vì đánh trúng 100% công nghệ họ đang dùng.'
  },
  {
    id: 'project-iac-cicd-pipeline',
    title: 'Dự án 3: Quản Trị Hạ Tầng Trường Đại Học Bằng Terraform & CI/CD GitHub Actions',
    subtitle: 'Tự động hóa GitOps, Multi-Environment (Dev/Staging/Prod), TFLint, Checkov & Security Scanning',
    targetRole: 'DevOps Engineer / Cloud Engineer / CloudOps Admin',
    difficulty: 'Nâng cao',
    estimatedHours: 18,
    estimatedCost: '~$0 Free Tier',
    summary: 'Xây dựng quy trình tự động hóa GitOps hoàn chỉnh để quản lý hạ tầng đám mây trường học: Mỗi khi kỹ sư tạo Pull Request, GitHub Actions sẽ tự động kiểm tra cú pháp, quét lỗ hổng bảo mật (Checkov) và xuất bản `terraform plan` trước khi được duyệt merge.',
    businessScenario: 'Đội ngũ IT trường học muốn loại bỏ hoàn toàn việc chỉnh sửa thủ công trên AWS Console, đảm bảo mọi thay đổi cấu hình mạng và máy chủ đều được rà soát an ninh và lưu vết kiểm toán rõ ràng.',
    architectureComponents: [
      {
        tier: 'Source Control & GitOps',
        services: ['GitHub Repository', 'Branch Protection Rules', 'Pull Request Review Workflow'],
        description: 'Quy tắc nhánh chính (main branch) bắt buộc có ít nhất 1 kỹ sư IT phê duyệt trước khi hạ tầng được deploy.'
      },
      {
        tier: 'CI/CD Automation & Security Gate',
        services: ['GitHub Actions Runners', 'OpenID Connect (OIDC) không cần AWS Access Key', 'Checkov / tfsec'],
        description: 'Tự động xác thực an toàn với AWS thông qua AWS IAM OIDC Role tạm thời, quét các vi phạm chính sách bảo mật FERPA/NIST.'
      },
      {
        tier: 'AWS Infrastructure Target',
        services: ['S3 Backend', 'DynamoDB Lock Table', 'Multi-Region Target Resources'],
        description: 'Tự động áp dụng cấu hình đồng bộ sang môi trường Development, Staging và Production.'
      }
    ],
    keySkillsDemonstrated: [
      'Xác thực AWS an toàn không dùng Long-lived Secret Key (AWS OIDC GitHub Federation)',
      'Tích hợp công cụ quét bảo mật IaC tĩnh (Checkov / tfsec / TFLint)',
      'Xây dựng quy trình phê duyệt tự động trên GitHub Actions (Plan -> PR Comment -> Approve -> Apply)',
      'Cấu trúc dự án Terraform chuẩn Terragrunt hoặc Workspace'
    ],
    stepByStepGuide: [
      {
        phase: 'Giai đoạn 1: Thiết lập OIDC Role trên AWS',
        title: 'Cấu hình AWS IAM Identity Provider cho GitHub',
        tasks: [
          'Tạo IAM OIDC Identity Provider trỏ về `token.actions.githubusercontent.com`.',
          'Tạo IAM Role `github-actions-terraform-role` với Trust Policy chỉ cho phép repository của bạn đảm nhận vai trò (AssumeRoleWithWebIdentity).'
        ]
      },
      {
        phase: 'Giai đoạn 2: Xây dựng Pipeline GitHub Actions',
        title: 'Tạo Workflow .github/workflows/terraform.yml',
        tasks: [
          'Bước 1: Chạy `tflint` và `terraform fmt -check`.',
          'Bước 2: Chạy `checkov` quét các lỗi bảo mật (ví dụ S3 Bucket chưa bật mã hóa hoặc Security Group mở 0.0.0.0/0).',
          'Bước 3: Chạy `terraform plan` và tự động gắn kết quả comment vào Pull Request để team lead xem xét.'
        ]
      },
      {
        phase: 'Giai đoạn 3: Kiểm thử Triển khai Tự động',
        title: 'Thực thi Apply trên Môi trường Prod',
        tasks: [
          'Khi Merge PR vào nhánh `main`, GitHub Actions tự động kích hoạt `terraform apply -auto-approve`.',
          'Gửi thông báo kết quả triển khai thành công về kênh Slack hoặc Discord của phòng IT.'
        ]
      }
    ],
    iacCodeSample: {
      language: 'YAML (GitHub Actions)',
      filename: '.github/workflows/terraform.yml',
      code: `name: 'Campus Infrastructure GitOps Pipeline'

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  id-token: write
  contents: read
  pull-requests: write

jobs:
  terraform:
    name: 'Terraform CI/CD'
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v4

    - name: Configure AWS Credentials (OIDC)
      uses: aws-actions/configure-aws-credentials@v4
      with:
        role-to-assume: arn:aws:iam::123456789012:role/github-actions-terraform-role
        aws-region: us-east-1

    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v3

    - name: Terraform Init
      run: terraform init

    - name: Terraform Plan
      if: github.event_name == 'pull_request'
      run: terraform plan -no-color

    - name: Terraform Apply
      if: github.ref == 'refs/heads/main' && github.event_name == 'push'
      run: terraform apply -auto-approve`
    },
    interviewStarStory: {
      situation: 'Phòng IT gặp sự cố khi hai kỹ sư cùng chỉnh sửa cấu hình mạng trên AWS Console dẫn đến mất đồng bộ và không thể xác định ai đã thay đổi tham số làm sập hệ thống nội bộ.',
      task: 'Tôi được giao nhiệm vụ thiết lập quy trình GitOps tự động hóa 100% việc cấp phát tài nguyên trên AWS bằng Terraform và GitHub Actions.',
      action: 'Tôi đã xây dựng pipeline CI/CD tích hợp quét bảo mật Checkov, liên kết xác thực IAM OIDC an toàn không lưu secret key, và thiết lập cơ chế khóa State Lock trên DynamoDB.',
      result: 'Loại bỏ hoàn toàn các lỗi xung đột hạ tầng, thời gian triển khai môi trường mới giảm từ 3 ngày xuống còn 15 phút và 100% các thay đổi đều có nhật ký kiểm toán rõ ràng trên GitHub.'
    },
    githubRepoTemplateTip: 'Dự án này là minh chứng rõ ràng nhất bạn là một kỹ sư DevOps/Cloud hiện đại hiểu rõ văn hóa CI/CD và GitOps chuẩn mực của thị trường Mỹ.'
  },
  {
    id: 'project-hybrid-sso-storage',
    title: 'Dự án 4: Thiết Lập Liên Đoàn Danh Tính (SSO / IAM Identity Center) & Hybrid Cloud Storage Cho Viện Nghiên Cứu',
    subtitle: 'AWS IAM Identity Center, Okta / Entra ID Federation, S3 File Gateway & Lifecycle Archiving',
    targetRole: 'Enterprise Systems Engineer / Cloud Security Architect',
    difficulty: 'Nâng cao',
    estimatedHours: 16,
    estimatedCost: '~$0 Free Tier',
    summary: 'Thiết kế giải pháp kết nối trung tâm dữ liệu trường học với AWS Cloud: Cấu hình Single Sign-On (SSO) cho toàn thể cán bộ giảng viên thông qua SAML 2.0 và triển khai AWS Storage Gateway để lưu trữ hàng trăm Terabytes dữ liệu nghiên cứu khoa học an toàn lên AWS S3 Glacier.',
    businessScenario: 'Viện Nghiên cứu Đa ngành của trường đại học đang bị quá tải dung lượng ổ cứng tại phòng lab vật lý. Đồng thời, các nhà khoa học gặp khó khăn khi phải nhớ nhiều tài khoản và mật khẩu riêng biệt để đăng nhập vào máy tính và các dịch vụ AWS.',
    architectureComponents: [
      {
        tier: 'Identity & Access Management (Tầng Danh tính)',
        services: ['AWS IAM Identity Center (AWS SSO)', 'SAML 2.0 Identity Provider (Okta / Entra ID)', 'SCIM Directory Sync'],
        description: 'Giảng viên chỉ cần dùng email trường (ví dụ: `name@kent.edu`) để đăng nhập 1 chạm vào các AWS Accounts với quyền hạn tương ứng.'
      },
      {
        tier: 'Hybrid Storage Tier (Tầng Lưu trữ Lai)',
        services: ['AWS Storage Gateway (S3 File Gateway)', 'NFS / SMB Mount Point', 'Amazon S3 Standard / Glacier'],
        description: 'Tạo ổ đĩa chia sẻ mạng NFS trong phòng lab nghiên cứu, tự động chuyển file lên S3 và nén lưu trữ dài hạn sang Glacier Deep Archive.'
      }
    ],
    keySkillsDemonstrated: [
      'Cấu hình Single Sign-On Enterprise với SAML 2.0 và SCIM Sync',
      'Phân quyền theo vai trò (RBAC) và thuộc tính (ABAC) trong môi trường trường học',
      'Triển khai kiến trúc Hybrid Cloud Storage kết nối On-premise',
      'Tối ưu hóa chi phí lưu trữ Big Data nghiên cứu với S3 Intelligent-Tiering'
    ],
    stepByStepGuide: [
      {
        phase: 'Giai đoạn 1: Cấu hình IAM Identity Center',
        title: 'Thiết lập SSO và Permission Sets',
        tasks: [
          'Kích hoạt AWS IAM Identity Center trên tài khoản AWS Management.',
          'Tạo các Permission Sets: `Researcher-PowerUser`, `Student-ReadOnly`, `CloudAdmin-FullAccess`.',
          'Cấu hình thời lượng phiên làm việc (Session Duration) tối đa 4 tiếng theo quy định an toàn thông tin.'
        ]
      },
      {
        phase: 'Giai đoạn 2: Thiết lập S3 Storage & Lifecycle',
        title: 'Xây dựng Kho Lưu trữ Dữ liệu Nghiên cứu',
        tasks: [
          'Tạo S3 Bucket `campus-research-vault` với mã hóa AWS KMS CMK.',
          'Cấu hình S3 Lifecycle Rule: File > 30 ngày chuyển sang S3 Standard-IA, > 90 ngày chuyển sang S3 Glacier Flexible, > 180 ngày chuyển sang Glacier Deep Archive.',
          'Bật S3 Object Lock để chống xóa và chống sửa đổi dữ liệu nghiên cứu quan trọng (WORM compliance).'
        ]
      }
    ],
    iacCodeSample: {
      language: 'Terraform (HCL)',
      filename: 's3_research_vault.tf',
      code: `resource "aws_s3_bucket" "research_vault" {
  bucket = "campus-research-data-vault"

  tags = {
    Department = "Scientific-Research"
    Compliance = "FERPA-NIST"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "vault_lifecycle" {
  bucket = aws_s3_bucket.research_vault.id

  rule {
    id     = "archive-old-research-data"
    status = "Enabled"

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    transition {
      days          = 90
      storage_class = "GLACIER"
    }

    transition {
      days          = 180
      storage_class = "DEEP_ARCHIVE"
    }
  }
}`
    },
    interviewStarStory: {
      situation: 'Phòng thí nghiệm nghiên cứu khoa học của trường đối mặt với nguy cơ hết dung lượng lưu trữ cục bộ và gặp khó khăn trong việc quản lý tài khoản truy cập an toàn cho hơn 200 nghiên cứu sinh và giáo sư.',
      task: 'Tôi được giao nhiệm vụ thiết kế kiến trúc lưu trữ lai Hybrid Cloud và tích hợp hệ thống xác thực tập trung để đơn giản hóa việc đăng nhập.',
      action: 'Tôi đã triển khai AWS IAM Identity Center liên kết SAML với hệ thống Okta của trường để đồng bộ tài khoản tự động, đồng thời thiết lập Amazon S3 kết hợp S3 File Gateway và chính sách lưu trữ nhiều tầng tự động (S3 Lifecycle).',
      result: 'Tiết kiệm hơn 60% chi phí lưu trữ hàng năm cho viện nghiên cứu bằng cách đẩy dữ liệu cũ sang Glacier Deep Archive, loại bỏ 100% các tài khoản dùng chung kém an toàn và giúp giảng viên truy cập dữ liệu mọi lúc mọi nơi.'
    },
    githubRepoTemplateTip: 'Dự án này chứng minh bạn có tầm nhìn của một Cloud Architect cấp Enterprise, rất phù hợp khi phỏng vấn các vị trí Senior hoặc Lead tại các đại học Mỹ.'
  }
];
