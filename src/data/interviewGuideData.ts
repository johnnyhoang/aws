import { InterviewQA } from '../types';

export interface UniversityITGuide {
  title: string;
  subtitle: string;
  keyInsights: {
    heading: string;
    description: string;
    tips: string[];
  }[];
  visaInfo: {
    title: string;
    details: string;
    h1bCapExemptAdvantage: string;
  };
}

export const UNIVERSITY_IT_GUIDE: UniversityITGuide = {
  title: 'Cẩm Nang Ứng Tuyển & Phỏng Vấn Phòng IT Các Trường Đại Học Mỹ',
  subtitle: 'Kinh nghiệm thực tế cho các trường đại học công lập và tư thục (Kent State, Ohio State, Big Ten, State University Systems)',
  keyInsights: [
    {
      heading: '1. Quy Trình Tuyển Dụng Hội Đồng (Search Committee Process)',
      description: 'Khác với các công ty startup tư nhân nơi bạn chỉ phỏng vấn với 1-2 người, các đại học Mỹ thường thành lập một Hội đồng Tuyển dụng (Search Committee) gồm 3-5 thành viên (Trưởng phòng IT, Kỹ sư trưởng, Đại diện ban bảo mật và đại diện giảng viên).',
      tips: [
        'Hội đồng chấm điểm theo bảng tiêu chí chuẩn hóa (Rubric Scoring). Hãy trả lời có cấu trúc rõ ràng theo phương pháp STAR.',
        'Nhấn mạnh vào tính ổn định, độ tin cậy và khả năng làm việc với các hệ thống kế thừa (Legacy Systems) bên cạnh công nghệ mới.',
        'Thể hiện tinh thần phục vụ cộng đồng học thuật (Service-oriented mindset) và giao tiếp lịch thiệp, dễ hiểu với người không chuyên kỹ thuật.'
      ]
    },
    {
      heading: '2. Tối Ưu Hóa Hồ Sơ (Resume / CV) Cho Hệ Thống ATS Trường Đại Học',
      description: 'Hầu hết các trường đại học Mỹ dùng hệ thống tuyển dụng như Workday, Taleo hoặc PeopleAdmin. Bắt buộc phải có các từ khóa khớp với Job Description.',
      tips: [
        'Đưa mã chứng chỉ AWS chính thức lên đầu trang (ví dụ: AWS Certified Solutions Architect - Associate SAA-C03).',
        'Ghi rõ các công nghệ cốt lõi: AWS VPC, IAM, Terraform, SAML 2.0, Okta, Active Directory, Docker, Python/Bash, CI/CD.',
        'Đính kèm đường link GitHub Portfolio chứa các dự án thực hành có sơ đồ kiến trúc và mã Terraform rõ ràng.'
      ]
    },
    {
      heading: '3. Hiểu Rõ Văn Hóa IT Trong Môi Trường Học Thuật (Higher-Ed IT Culture)',
      description: 'Môi trường đại học đề cao sự an toàn dữ liệu sinh viên (FERPA), tính minh bạch qua tài liệu hóa (Documentation) và cộng tác liên phòng ban.',
      tips: [
        'Luôn luôn nhắc đến việc viết tài liệu (Runbooks / Architecture Documentation) và chia sẻ kiến thức trong câu trả lời phỏng vấn.',
        'Chứng minh bạn hiểu sự khác biệt giữa lưu lượng giờ học thông thường và các đợt cao điểm đăng ký tín chỉ / thi cử.'
      ]
    }
  ],
  visaInfo: {
    title: 'Lợi Thế Đặc Biệt Về Thị Thực & Định Cư (H-1B Cap-Exempt & STEM OPT)',
    details: 'Nếu bạn là sinh viên quốc tế hoặc ứng viên cần tài trợ visa làm việc tại Mỹ:',
    h1bCapExemptAdvantage: 'Các trường đại học công lập và phi lợi nhuận tại Mỹ thuộc diện H-1B MIỄN XỔ SỐ (H-1B Cap-Exempt)! Điều này có nghĩa là bạn KHÔNG PHẢI tham gia kỳ quay số may rủi H-1B hàng năm như ở các công ty thương mại, mà trường có thể nộp hồ sơ xin visa H-1B cho bạn bất kỳ thời điểm nào trong năm với tỷ lệ thành công rất cao.'
  }
};

export const INTERVIEW_QUESTIONS: InterviewQA[] = [
  {
    id: 'iq-1',
    category: 'Higher-Ed IT & LMS',
    question: 'Hãy kể về một tình huống bạn phải tích hợp một ứng dụng đám mây với hệ thống xác thực tập trung (SSO) và hệ thống quản lý học tập (LMS) của trường học?',
    context: 'Hội đồng tuyển dụng muốn kiểm tra hiểu biết của bạn về SAML 2.0, Okta/Entra ID và Canvas LMS.',
    starAnswer: {
      situation: 'Trường học triển khai một nền tảng chấm bài tự động mới và cần tích hợp vào Canvas LMS để giảng viên không phải xuất điểm thủ công.',
      task: 'Nhiệm vụ của tôi là thiết kế cơ chế Single Sign-On bảo mật và kết nối API hai chiều an toàn giữa Canvas LMS và ứng dụng AWS.',
      action: 'Tôi đã sử dụng chuẩn LTI 1.3 dựa trên OAuth2/OIDC để nhúng công cụ trực tiếp vào giao diện Canvas. Tôi cấu hình AWS IAM Identity Center liên kết SAML với hệ thống Okta của trường để xác thực giảng viên, đồng thời dùng Amazon API Gateway và AWS Lambda để hứng webhook khi sinh viên nộp bài.',
      result: 'Hệ thống vận hành trơn tru cho hơn 1,500 sinh viên trong học kỳ đầu, tiết kiệm 12 giờ chấm điểm mỗi tuần cho các trợ giảng và đảm bảo tuân thủ tuyệt đối quy định bảo mật FERPA.'
    },
    interviewerLooksFor: [
      'Hiểu rõ chuẩn LTI 1.3 và giao thức SAML 2.0 / OIDC',
      'Kỹ năng tích hợp API với AWS API Gateway và Lambda',
      'Ý thức bảo mật dữ liệu học tập của sinh viên'
    ],
    redFlagsToAvoid: [
      'Gợi ý lưu trữ mật khẩu trực tiếp trong cơ sở dữ liệu ứng dụng',
      'Không biết Canvas LMS hoặc không hiểu khái niệm Single Sign-On'
    ]
  },
  {
    id: 'iq-2',
    category: 'Networking & Security',
    question: 'Nếu phát hiện một máy chủ EC2 nội bộ thuộc mạng trường học có dấu hiệu bị rò rỉ dữ liệu hoặc liên lạc với một địa chỉ IP độc hại bên ngoài, bạn sẽ xử lý sự cố này theo các bước nào?',
    context: 'Kiểm tra quy trình ứng phó sự cố an ninh thông tin (Incident Response) và kỹ năng mạng AWS.',
    starAnswer: {
      situation: 'Hệ thống AWS GuardDuty phát hiện một máy chủ EC2 trong Private Subnet đang cố gắng kết nối tới một máy chủ C&C (Command and Control) bên ngoài Internet.',
      task: 'Mục tiêu là cô lập máy chủ ngay lập tức để ngăn chặn rò rỉ dữ liệu mà vẫn giữ nguyên hiện trường phục vụ điều tra nguyên nhân (Forensics).',
      action: '1. Cô lập tức thì: Thay đổi Security Group của máy chủ đó sang một Security Group cách ly (Isolation SG) chặn 100% Inbound và Outbound traffic ngoại trừ IP của đội điều tra an ninh. 2. Bảo toàn chứng cứ: Tạo Snapshot ổ đĩa EBS ngay lập tức và dump bộ nhớ RAM bằng AWS Systems Manager. 3. Phân tích: Sử dụng Amazon Athena truy vấn VPC Flow Logs và CloudTrail để tìm địa chỉ IP nguồn đã xâm nhập. 4. Khắc phục: Vá lỗ hổng, tạo lại máy chủ mới từ Golden AMI sạch và cập nhật luật AWS WAF.',
      result: 'Sự cố được khống chế trong vòng 8 phút, không có dữ liệu sinh viên nào bị đánh cắp và báo cáo điều tra chi tiết được gửi lên Giám đốc An toàn Thông tin (CISO).'
    },
    interviewerLooksFor: [
      'Quy trình cô lập bằng Security Group thay vì xóa máy chủ ngay (để giữ bằng chứng)',
      'Tạo EBS Snapshot để điều tra pháp y (Forensic analysis)',
      'Sử dụng VPC Flow Logs, GuardDuty và CloudTrail'
    ],
    redFlagsToAvoid: [
      'Xóa ngay lập tức máy chủ khiến mất hết dữ liệu điều tra',
      'Đăng nhập trực tiếp qua SSH làm thay đổi dấu vết hiện trường'
    ]
  },
  {
    id: 'iq-3',
    category: 'IaC & Automation',
    question: 'Tại sao chúng ta nên dùng Terraform thay vì thao tác trên AWS Console (ClickOps), và bạn quản trị Terraform State như thế nào trong một nhóm nhiều kỹ sư?',
    context: 'Kiểm tra kinh nghiệm thực chiến về Infrastructure as Code và làm việc nhóm.',
    starAnswer: {
      situation: 'Trong các dự án trước, việc cấu hình thủ công bằng tay thường gây ra hiện tượng lệch cấu hình (Configuration Drift) và không ai biết ai đã thay đổi thông số nào.',
      task: 'Tôi đã chuẩn hóa toàn bộ hạ tầng bằng Terraform và thiết lập kho lưu trữ trạng thái tập trung an toàn.',
      action: 'Tôi đã cấu hình Remote State Backend sử dụng Amazon S3 kết hợp mã hóa KMS và bật Versioning để có thể khôi phục lại khi file state gặp sự cố. Để chống xung đột khi 2 kỹ sư cùng deploy, tôi tích hợp bảng DynamoDB với thuộc tính LockID để khóa trạng thái (State Locking). Ngoài ra, tôi phân chia hạ tầng theo từng module độc lập (Networking, Compute, Database) và dùng CI/CD GitHub Actions để chạy plan/apply tự động.',
      result: 'Toàn bộ 100% tài nguyên được quản lý qua code, thời gian tạo môi trường thử nghiệm mới giảm từ vài ngày xuống dưới 20 phút và không còn bất kỳ sự cố xung đột trạng thái nào.'
    },
    interviewerLooksFor: [
      'Nhắc đến S3 Backend + KMS + Versioning',
      'Nhắc đến DynamoDB State Locking (LockID)',
      'Phân tách module và quy trình GitOps qua Pull Request'
    ],
    redFlagsToAvoid: [
      'Lưu trữ file terraform.tfstate trực tiếp trong mã nguồn Git (rất nguy hiểm vì lộ secret keys)'
    ]
  },
  {
    id: 'iq-4',
    category: 'Troubleshooting & Migration',
    question: 'Trường đại học muốn chuyển 50TB video bài giảng cũ từ máy chủ lưu trữ SAN trong khuôn viên trường lên AWS với chi phí thấp nhất và vẫn cho phép sinh viên xem trực tuyến khi cần. Bạn sẽ tư vấn phương án nào?',
    context: 'Kiểm tra khả năng lựa chọn hạng lưu trữ S3 tối ưu chi phí và phương thức truyền tải.',
    starAnswer: {
      situation: 'Máy chủ lưu trữ SAN của trường đã hết hạn bảo hành và sắp hết dung lượng, trong khi chi phí mua thêm ổ cứng vật lý tại chỗ rất đắt đỏ.',
      task: 'Chuyển toàn bộ 50TB video bài giảng lên AWS an toàn và tối ưu chi phí vận hành hàng tháng.',
      action: '1. Truyền tải dữ liệu: Sử dụng AWS DataSync chạy qua mạng nội bộ để đồng bộ nhanh và kiểm tra mã băm checksum toàn vẹn. 2. Lưu trữ tối ưu: Đưa dữ liệu vào Amazon S3 Intelligent-Tiering (hoặc cấu hình S3 Lifecycle chuyển sang S3 Glacier Instant Retrieval cho các video trên 90 ngày). 3. Phân phối: Đặt Amazon CloudFront ở phía trước kèm OAC (Origin Access Control) để cache các video phổ biến và giảm chi phí truyền dữ liệu (Data Egress Fee).',
      result: 'Tiết kiệm hơn 55% chi phí so với việc nâng cấp máy chủ vật lý, đảm bảo tốc độ tải video mượt mà cho sinh viên và giải phóng hoàn toàn gánh nặng bảo trì ổ cứng cho phòng IT.'
    },
    interviewerLooksFor: [
      'AWS DataSync để truyền dữ liệu lớn an toàn',
      'S3 Intelligent-Tiering hoặc Glacier Instant Retrieval (lấy video ngay lập tức với giá rẻ)',
      'CloudFront OAC để phân phối video nhanh và bảo mật'
    ],
    redFlagsToAvoid: [
      'Khuyên dùng Glacier Deep Archive cho video mà sinh viên cần bấm vào xem ngay (Deep Archive mất 12-48h mới trích xuất được)'
    ]
  }
];
