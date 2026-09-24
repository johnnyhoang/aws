import { AppSystemQuizQuestion } from '../../types/appSystemModule';

export const APP_SYSTEM_QUIZ_QUESTIONS: AppSystemQuizQuestion[] = [
  {
    id: 'as-q-1',
    category: 'security_cryptography',
    difficulty: 'Nâng cao',
    scenario: 'Bạn đang thiết kế tầng lưu trữ thông tin nhạy cảm (như OAuth Client Secret của khách hàng) trong cơ sở dữ liệu Postgres của hệ thống đa người thuê (Multi-tenant).',
    question: 'Tại sao cơ chế mã hóa AES-256-GCM trong `@infra/core` lại bắt buộc phải truyền `tenant_id` vào thông số AAD (Additional Authenticated Data)?',
    options: [
      {
        id: 'opt-a',
        text: 'Để nén dung lượng của chuỗi ciphertext sau khi mã hóa xuống mức nhỏ nhất.',
        isCorrect: false
      },
      {
        id: 'opt-b',
        text: 'Để tăng tốc độ giải mã của CPU khi xử lý hàng triệu bản ghi cùng lúc.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'Để ràng buộc mật mã với tenant sở hữu: nếu kẻ tấn công sao chép ciphertext sang tenant khác, quá trình giải mã với tenant_id mới sẽ lập tức thất bại vì sai lệch chữ ký xác thực.',
        isCorrect: true
      },
      {
        id: 'opt-d',
        text: 'Để thay thế hoàn toàn việc sử dụng khóa bí mật ENCRYPTION_KEY chính của hệ thống.',
        isCorrect: false
      }
    ],
    explanation: 'AES-256-GCM là chuẩn mã hóa xác thực (Authenticated Encryption). AAD không được mã hóa nhưng được đưa vào thuật toán tính mã xác thực (Auth Tag). Khi gán `tenant_id` vào AAD, bất kỳ hành vi tráo đổi bản ghi giữa các tenant sẽ làm sai lệch Auth Tag và việc giải mã sẽ văng ngoại lệ ngay lập tức.'
  },
  {
    id: 'as-q-2',
    category: 'rbac_abac_policies',
    difficulty: 'Chuyên gia',
    scenario: 'Ứng dụng Web phía Client sử dụng `@infra/sdk` với `Publishable Key (pk_live_...)` để truy vấn danh sách đơn hàng. Một hacker cố tình sửa mã JavaScript trên trình duyệt để gọi hàm `infra.data("orders").findMany()` mà không truyền bộ lọc `tenant_id`.',
    question: 'Cơ chế nào trong Unified-App-Infra đảm bảo hacker KHÔNG THỂ lấy cắp đơn hàng của tổ chức khác?',
    options: [
      {
        id: 'opt-a',
        text: 'Trình duyệt sẽ tự động chặn các gói tin HTTP không có mã hóa SSL.',
        isCorrect: false
      },
      {
        id: 'opt-b',
        text: 'ABAC Data Gateway trên máy chủ tự động trích xuất ngữ cảnh danh tính từ token phiên (Session) và cưỡng chế tiêm thêm điều kiện SQL `WHERE tenant_id = :currentTenant` vào trước khi thực thi Drizzle ORM.',
        isCorrect: true
      },
      {
        id: 'opt-c',
        text: 'Hệ thống dùng tường lửa Cloudflare WAF để phát hiện tên hàm JavaScript bị sửa đổi.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Publishable Key đã chứa toàn bộ cơ sở dữ liệu cục bộ nên hacker chỉ đọc được dữ liệu trên máy của họ.',
        isCorrect: false
      }
    ],
    explanation: 'Kiến trúc Unified-App-Infra không bao giờ tin tưởng client. Mọi yêu cầu từ Publishable Key đều đi qua ABAC Policy Compiler trên Server. Engine này tự động tiêm các điều kiện lọc bắt buộc theo Role và Tenant ID vào AST của ORM, ngăn chặn 100% rò rỉ chéo tenant (Cross-tenant IDOR).'
  },
  {
    id: 'as-q-3',
    category: 'multi_database_adapters',
    difficulty: 'Trung bình',
    scenario: 'Đội ngũ của bạn muốn mở rộng dịch vụ ra thị trường toàn cầu. Bạn muốn các thao tác ghi dữ liệu thanh toán được xử lý trên Neon/Supabase Postgres tại Mỹ, nhưng người dùng tại Nhật Bản và Châu Âu đọc dữ liệu cấu hình cực nhanh từ các Edge node.',
    question: 'Mẫu thiết kế (Design Pattern) nào trong package `@infra/adapters` giúp hiện thực hóa kiến trúc này dễ dàng nhất?',
    options: [
      {
        id: 'opt-a',
        text: 'Singleton Pattern chỉ cho phép khởi tạo đúng 1 connection pool duy nhất.',
        isCorrect: false
      },
      {
        id: 'opt-b',
        text: 'Database Adapter Pattern với giao diện DatabaseAdapter chung, cho phép định tuyến câu lệnh Ghi (Write) tới Postgres Adapter và câu lệnh Đọc (Read) tới Turso LibSQL Edge Replica Adapter.',
        isCorrect: true
      },
      {
        id: 'opt-c',
        text: 'Observer Pattern để lắng nghe sự kiện click chuột của người dùng tại các vùng địa lý.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Factory Method để tự động sinh mã SQL thô bằng tay không qua ORM.',
        isCorrect: false
      }
    ],
    explanation: 'Với `DatabaseAdapter` interface chuẩn hóa trong `@infra/adapters`, code nghiệp vụ hoàn toàn độc lập với công nghệ DB. Bạn có thể xây dựng Smart Router chuyển các truy vấn nặng/ghi về Neon Postgres và các truy vấn đọc cấu hình về Turso LibSQL phân tán tại Edge.'
  },
  {
    id: 'as-q-4',
    category: 'monorepo_architecture',
    difficulty: 'Cơ bản',
    scenario: 'Khi phát triển hệ thống Monorepo với Turborepo và pnpm workspaces trong `Unified-App-Infra`, bạn muốn ứng dụng Next.js (`apps/web`) sử dụng các helper mã hóa từ `@infra/core` và schema cơ sở dữ liệu từ `@infra/db`.',
    question: 'Quy tắc tổ chức nào sau đây là ĐÚNG ĐẮN theo chuẩn kiến trúc của dự án?',
    options: [
      {
        id: 'opt-a',
        text: 'Sao chép trực tiếp file mã nguồn từ packages/core vào thư mục components của apps/web.',
        isCorrect: false
      },
      {
        id: 'opt-b',
        text: 'Khai báo `@infra/core: "workspace:*"` và `@infra/db: "workspace:*"` trong dependencies của package.json tại `apps/web` và export tường minh qua package entry points.',
        isCorrect: true
      },
      {
        id: 'opt-c',
        text: 'Publish các package lên npm public registry mỗi lần thực hiện commit mới.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Chỉ gộp toàn bộ mã nguồn vào 1 file duy nhất index.ts để tránh lỗi import.',
        isCorrect: false
      }
    ],
    explanation: 'Chuẩn pnpm workspaces sử dụng giao thức `workspace:*` để liên kết trực tiếp mã nguồn giữa các package nội bộ trong monorepo mà không cần publish lên registry, đảm bảo tốc độ biên dịch tối đa và chia sẻ type an toàn.'
  },
  {
    id: 'as-q-5',
    category: 'testing_runbooks',
    difficulty: 'Nâng cao',
    scenario: 'Trước khi kích hoạt phiên bản triển khai Production mới, bạn cần kiểm chứng chắc chắn rằng kết nối tới Neon Postgres, hệ thống Auth Session, MFA TOTP và dịch vụ gửi Mail Resend hoạt động đồng bộ trơn tru.',
    question: 'Bộ công cụ kiểm thử nào được tích hợp sẵn trong repo Unified-App-Infra phục vụ chính xác mục đích này?',
    options: [
      {
        id: 'opt-a',
        text: 'Chỉ sử dụng console.log trên môi trường staging sau khi deploy.',
        isCorrect: false
      },
      {
        id: 'opt-b',
        text: 'Bộ 5 Proof Scripts kiểm thử trên hạ tầng thật (live-proof, auth-proof, mfa-proof, ops-proof, mail-proof).',
        isCorrect: true
      },
      {
        id: 'opt-c',
        text: 'Tự động gửi email thử nghiệm ngẫu nhiên tới tất cả khách hàng thật.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Tắt toàn bộ firewall và kiểm tra bằng ping lệnh cmd.',
        isCorrect: false
      }
    ],
    explanation: 'Hệ thống xây dựng 5 bộ kịch bản Proof Scripts chuyên biệt kiểm thử tương tác thực tế với Database, Auth Engine, MFA Verification, Ops Monitor và Email Service, giúp loại trừ 100% lỗi cấu hình môi trường trước khi đưa vào vận hành.'
  },
  {
    id: 'as-q-6',
    category: 'future_roadmap_expansion',
    difficulty: 'Chuyên gia',
    scenario: 'Trong lộ trình nâng cấp hệ thống (Roadmap Chương 10), bạn muốn bổ sung tính năng tải tệp dung lượng lớn (video, file tài liệu 500MB) mà không làm nghẽn máy chủ Node.js và không phải trả chi phí băng thông tải về (Zero Egress Fees).',
    question: 'Kiến trúc Storage Gateway nào được đề xuất tối ưu nhất cho hệ thống?',
    options: [
      {
        id: 'opt-a',
        text: 'Chuyển toàn bộ file thành chuỗi Base64 và lưu trực tiếp vào cột TEXT trong cơ sở dữ liệu Postgres.',
        isCorrect: false
      },
      {
        id: 'opt-b',
        text: 'Sử dụng Cloudflare R2 kết hợp với Presigned URLs: Client xin cấp quyền từ @infra/sdk, nhận Presigned URL có chữ ký bảo mật và upload/download trực tiếp tới R2.',
        isCorrect: true
      },
      {
        id: 'opt-c',
        text: 'Lưu file trực tiếp trên ổ cứng cục bộ của server container Next.js.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Bắt buộc người dùng gửi file qua email đính kèm.',
        isCorrect: false
      }
    ],
    explanation: 'Mô hình Presigned URL với Cloudflare R2 giúp client truyền tệp trực tiếp đến Object Storage mà không đi qua máy chủ API (giải phóng tải CPU/RAM của server). Hơn nữa Cloudflare R2 miễn phí 100% băng thông egress, tiết kiệm hàng ngàn USD chi phí hạ tầng.'
  }
];
