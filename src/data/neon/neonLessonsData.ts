import { NeonChapter } from '../../types/neonModule';

export const NEON_CHAPTERS: NeonChapter[] = [
  {
    id: 'neon-ch1-serverless-architecture-overview',
    chapterNumber: 1,
    title: 'Bình Minh Serverless Postgres: Tách Rời Compute & Storage',
    subtitle: 'Tại sao việc tách rời bộ máy tính toán (CPU/RAM) khỏi đĩa cứng lưu trữ đã tạo nên cuộc cách mạng vĩ đại nhất của hệ cơ sở dữ liệu quan hệ.',
    level: 'Cơ bản',
    readTimeMinutes: 14,
    category: 'overview_architecture',
    summary: 'Neon là nền tảng Serverless PostgreSQL mã nguồn mở hoàn toàn, giải quyết hai nhược điểm chí mạng của Postgres truyền thống: Chi phí chạy 24/7 lãng phí và không thể phân nhánh (Branching) dữ liệu cho môi trường thử nghiệm.',
    hookStory: 'Năm 2021, Nikita Shamgunov (nhà sáng lập MemSQL) và Heikki Linnakangas (một trong những lập trình viên cốt cán kỳ cựu của PostgreSQL Core Team) ngồi lại với nhau. Họ nhìn thấy các lập trình viên hiện đại đang triển khai ứng dụng Frontend trên Vercel theo mô hình Serverless — khởi động trong 10ms, tự động co giãn theo từng request và ngủ đông khi không có khách. Nhưng cơ sở dữ liệu PostgreSQL bên dưới vẫn là một cỗ máy cồng kềnh, chạy trên 1 chiếc máy chủ VPS duy nhất, tiêu tốn tiền bạc ngay cả lúc ban đêm không có ai truy cập. Họ thốt lên: "Đã đến lúc Postgres phải trở thành Serverless thực thụ!". Neon ra đời từ đó.',
    sections: [
      {
        heading: '1. Postgres Truyền Thống vs Kiến Trúc Serverless Neon',
        subheading: 'Sự tách rời mang tính lịch sử giữa CPU và Disk',
        content: `Trong mô hình PostgreSQL truyền thống (như AWS RDS hay VPS tự dựng):
• **Gắn kết chặt chẽ (Tightly Coupled)**: Bộ nhớ RAM, CPU và ổ đĩa SSD gắn liền trong một máy ảo.
• **Chi phí lãng phí**: Bạn phải trả tiền 24/7 cho CPU/RAM ngay cả khi ứng dụng không có một truy cập nào vào ban đêm.
• **Khó sao chép**: Muốn tạo một database Staging giống hệt Production, bạn phải dump hàng trăm GB dữ liệu mất vài tiếng đồng hồ.

**Neon giải quyết bài toán này bằng kiến trúc Tách Rời (Disaggregated Storage):**
1. **Compute (Bộ tính toán)**: Chạy trong các container Postgres phi trạng thái (Stateless). Có thể bật lên trong 500ms, tự động mở rộng CPU/RAM và tự động tắt (Scale-to-Zero) khi không có kết nối.
2. **Storage (Bộ lưu trữ phân tán)**: Dữ liệu được lưu trữ trên một cụm Pageservers phân tán và sao lưu vĩnh viễn trên Amazon S3 với độ tin cậy 99.999999999% (11 số 9).`,
        mindsetShift: {
          from: 'Nghĩ rằng Database luôn phải chạy liên tục trên một máy chủ cố định và tốn tiền hàng tháng.',
          to: 'Tận dụng Serverless Postgres của Neon để Database tự động ngủ đông khi không có ai dùng và thức dậy trong chớp mắt khi có request.',
          impact: 'Tiết kiệm tới 90% chi phí cơ sở dữ liệu cho các môi trường Development và Staging.'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Cài đặt Neon CLI toàn cục trên máy tính',
        command: 'npm install -g neonctl',
        description: 'Cài đặt công cụ dòng lệnh chính thức để quản trị các dự án Neon'
      },
      {
        title: 'Đăng nhập vào tài khoản Neon qua CLI',
        command: 'neonctl auth',
        description: 'Xác thực tài khoản qua trình duyệt để đồng bộ dữ liệu với dòng lệnh'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ sự khác biệt giữa kiến trúc Tách Rời (Compute vs Storage) và Postgres truyền thống.',
      'Giải thích được lợi ích của tính năng Scale-to-Zero trong việc tiết kiệm chi phí.',
      'Cài đặt và đăng nhập thành công Neon CLI (neonctl).'
    ]
  },
  {
    id: 'neon-ch2-storage-engine-pageserver-safekeeper',
    chapterNumber: 2,
    title: 'Giải Mã Cỗ Máy Lưu Trữ Đa Tầng: Pageserver, Safekeeper & S3',
    subtitle: 'Khám phá trái tim kỹ thuật của Neon: Cách dữ liệu được ghi vào nhật ký WAL, đồng thuận Paxos và lưu trữ đa tầng bất tử.',
    level: 'Chuyên gia',
    readTimeMinutes: 18,
    category: 'storage_compute_separation',
    summary: 'Bộ máy lưu trữ của Neon được viết hoàn toàn bằng Rust với hiệu năng cực cao, chia thành 3 tầng: Safekeepers (đồng thuận ghi WAL), Pageservers (phục vụ đọc các trang dữ liệu 8KB) và Cloud Storage (S3 lưu trữ vĩnh cửu).',
    hookStory: 'Làm thế nào mà Neon có thể phục vụ hàng ngàn nhánh Database độc lập mà không tốn thêm dung lượng đĩa cứng? Bí mật nằm ở kiến trúc Log-Structured Storage: Thay vì lưu các file đĩa cứng nặng nề, Neon lưu trữ dòng thời gian các thay đổi WAL. Mọi nhánh mới chỉ là một con trỏ (Pointer) trỏ vào một mốc thời gian cụ thể trên dòng nhật ký đó!',
    sections: [
      {
        heading: '1. Ba Mắt Xích Cốt Lõi Của Tầng Lưu Trữ Neon',
        subheading: 'Safekeepers, Pageservers và S3 Archive',
        content: `• **Safekeepers (Tầng đồng thuận WAL)**:
  - Khi Postgres Compute thực hiện lệnh \`COMMIT\`, bản ghi WAL (Write-Ahead Log) được gửi đồng thời tới một cụm Safekeepers (thường gồm 3 nút).
  - Sử dụng thuật toán đồng thuận Paxos: Chỉ cần 2/3 Safekeeper xác nhận đã ghi nhận WAL an toàn là transaction được coi là thành công.
• **Pageservers (Tầng phục vụ trang dữ liệu)**:
  - Nhận luồng WAL từ Safekeepers và tái tạo lại các trang dữ liệu (Data Pages 8KB) theo bất kỳ mốc thời gian nào trong lịch sử.
• **Cloud Storage (S3 / GCS)**:
  - Các khối dữ liệu cũ (Immutable Layers) được đẩy lên Amazon S3 để lưu trữ dài hạn với chi phí cực rẻ.`,
        codeBlock: {
          language: 'txt',
          title: 'Sơ Đồ Luồng Dữ Liệu Ghi & Đọc Trong Neon',
          code: `[ Stateless Postgres Compute ] (CPU / RAM)
           │
           │ (1) WAL Stream (Ghi dữ liệu)
           ▼
[ Safekeeper Quorum (Paxos) ] ───► [ Pageserver (Reconstruct 8KB Pages) ]
                                             │
                                             │ (2) Offload Layer Files
                                             ▼
                                    [ Amazon S3 Storage ]`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Xem danh sách các project Neon trong tài khoản',
        command: 'neonctl projects list',
        description: 'Liệt kê toàn bộ các cơ sở dữ liệu Serverless đang hoạt động'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ vai trò của Safekeepers trong việc đảm bảo tính an toàn dữ liệu (Zero Data Loss).',
      'Nắm vững cơ chế tái tạo trang dữ liệu theo thời gian của Pageservers.',
      'Giải thích được cách Neon kết hợp S3 để tối ưu hóa chi phí lưu trữ dài hạn.'
    ]
  },
  {
    id: 'neon-ch3-database-branching',
    chapterNumber: 3,
    title: 'Database Branching (Copy-on-Write): "Git Cho Cơ Sở Dữ Liệu"',
    subtitle: 'Tạo một bản sao Database 500GB hoàn chỉnh chỉ trong 1 giây mà không tốn dung lượng, tích hợp trực tiếp vào GitHub Actions và Vercel Preview Deployments.',
    level: 'Nâng cao',
    readTimeMinutes: 18,
    category: 'database_branching',
    summary: 'Database Branching là tính năng đột phá nhất của Neon. Bằng cơ chế Copy-on-Write (CoW), bạn có thể tạo một nhánh Database riêng biệt từ Production trong vòng 1 giây để test thử migration hoặc debug lỗi mà không sợ ảnh hưởng đến dữ liệu người dùng thật.',
    hookStory: 'Bạn chuẩn bị chạy một file Migration SQL phức tạp xóa 3 bảng cũ và tạo 10 bảng mới trên Production. Bạn run tay: "Lỡ file SQL bị lỗi làm sập hệ thống thì sao?". Với Neon, bạn chỉ cần gõ 1 lệnh \`neonctl branches create\`: Một nhánh Database mới tinh chứa 100% dữ liệu thật của Production xuất hiện ngay tức thì. Bạn chạy thử Migration trên nhánh đó, test mượt mà rồi mới an tâm áp dụng lên Production.',
    sections: [
      {
        heading: '1. Cơ Chế Copy-on-Write (CoW) Hoạt Động Thế Nào?',
        subheading: 'Tại sao việc tạo nhánh không tốn thêm dung lượng đĩa cứng',
        content: `Khi bạn tạo một nhánh mới từ nhánh chính \`main\`:
1. Neon **KHÔNG HỀ COPY** 500GB dữ liệu sang ổ đĩa mới.
2. Nhánh mới chỉ đơn giản là một con trỏ trỏ vào vị trí LSN (Log Sequence Number) của nhánh chính tại thời điểm tạo.
3. Dung lượng lưu trữ bổ sung **chỉ phát sinh khi bạn ghi dữ liệu mới** hoặc sửa đổi các dòng dữ liệu trên nhánh con (Copy-on-Write).
4. Bạn có thể xóa nhánh con sau khi test xong mà không để lại bất kỳ rác thải nào.`,
        codeBlock: {
          language: 'bash',
          title: 'Tạo Nhánh Database Mới Từ Production Bằng Neon CLI',
          code: `# 1. Tạo nhánh mới mang tên feature-payment-v2 từ nhánh main
neonctl branches create --name feature-payment-v2

# 2. Lấy chuỗi kết nối (Connection String) của nhánh vừa tạo
neonctl connection-string feature-payment-v2

# Kết quả: postgresql://alex:pass@ep-cool-branch-123.us-east-2.aws.neon.tech/neondb`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Tạo nhanh một nhánh Database mới để kiểm thử',
        command: 'neonctl branches create --name test-migration-branch',
        description: 'Tạo bản sao dữ liệu Production trong 1 giây để chạy thử nghiệm'
      },
      {
        title: 'Xóa nhánh Database sau khi hoàn tất kiểm thử',
        command: 'neonctl branches delete test-migration-branch',
        description: 'Giải phóng tài nguyên nhánh phụ ngay lập tức'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ bản chất kỹ thuật của cơ chế Copy-on-Write trong Database Branching.',
      'Tích hợp Neon Branching tự động với Vercel Preview Deployments.',
      'Thao tác thuần thục tạo, truy vấn và xóa nhánh qua Neon CLI.'
    ]
  },
  {
    id: 'neon-ch4-autoscaling-scale-to-zero',
    chapterNumber: 4,
    title: 'Autoscaling Tự Động & Cơ Chế Ngủ Đông (Scale-to-Zero)',
    subtitle: 'Cách Neon tự động co giãn từ 0.25 vCPU lên 8 vCPU trong vài mili-giây khi có lượng truy cập đột biến và tự động ngủ đông để không tốn tiền.',
    level: 'Trung bình',
    readTimeMinutes: 15,
    category: 'autoscaling_scale_to_zero',
    summary: 'Neon cung cấp tính năng Autoscaling Compute độc đáo: Khởi tạo mức Compute tối thiểu (ví dụ: 0.25 CU) và tự động tăng tốc lên mức tối đa (ví dụ: 8 CU) khi tải nặng, đồng thời tự động Suspend (ngủ đông) sau 5 phút không có kết nối.',
    hookStory: 'Một trang web bán vé hòa nhạc đột ngột đón nhận 100.000 người dùng truy cập trong vòng 10 phút. Nếu dùng VPS truyền thống, CPU sẽ quá tải 100% và sập máy chủ. Với Neon Autoscaling, Compute tự động phát hiện áp lực tải và bơm thêm CPU/RAM ngay trong lúc đang chạy mà không cần khởi động lại máy chủ (Zero Downtime Autoscaling). Khi sự kiện kết thúc, máy chủ tự động thu nhỏ lại và ngủ đông.',
    sections: [
      {
        heading: '1. Đơn Vị Tính Toán Compute Unit (CU)',
        subheading: 'Quy đổi tài nguyên phần cứng trong Neon',
        content: `• **1 Compute Unit (1 CU)** tương đương với **1 vCPU và 4 GB RAM**.
• **Min CU & Max CU**: Bạn có thể thiết lập dải co giãn, ví dụ: \`Min = 0.5 CU\` (0.5 vCPU, 2GB RAM) và \`Max = 4 CU\` (4 vCPU, 16GB RAM).
• **Scale-to-Zero (Suspend)**: Khi ứng dụng không có kết nối nào trong khoảng thời gian cấu hình (mặc định 5 phút), Compute sẽ tự động chuyển sang trạng thái \`SUSPENDED\` (CPU = 0, RAM = 0, chi phí tính toán = $0).
• **Instant Wakeup**: Khi có kết nối mới gửi tới, Neon Proxy sẽ đánh thức Compute chỉ trong khoảng **500 mili-giây** và phục vụ truy vấn bình thường.`,
        bulletPoints: [
          'Không bao giờ phải trả tiền cho máy chủ nhàn rỗi trong môi trường Staging/Dev.',
          'Tự động co giãn mượt mà không làm đứt các kết nối đang hoạt động.',
          'Tùy chỉnh thời gian tự động ngủ đông từ 5 phút đến 1 ngày.'
        ]
      }
    ],
    practicalCommands: [
      {
        title: 'Cấu hình dải Autoscaling cho Endpoint qua Neon CLI',
        command: 'neonctl endpoints update ep-id --autoscaling-limit-min-cu 0.5 --autoscaling-limit-max-cu 4',
        description: 'Thiết lập giới hạn CPU/RAM tối thiểu và tối đa cho cơ sở dữ liệu'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ đơn vị tính toán Compute Unit (CU) và cách phân bổ tài nguyên.',
      'Cấu hình ngưỡng Min CU, Max CU và thời gian tự động Suspend.',
      'Giải thích được cơ chế đánh thức tức thì (Instant Wakeup) của Neon Proxy.'
    ]
  },
  {
    id: 'neon-ch5-connection-pooling-pgbouncer',
    chapterNumber: 5,
    title: 'Connection Pooling & PgBouncer: Trị Dứt Điểm Nghẽn Kết Nối Serverless',
    subtitle: 'Giải quyết "cơn ác mộng" Connection Exhaustion khi hàng ngàn hàm Serverless đồng loạt kết nối vào cơ sở dữ liệu Postgres.',
    level: 'Nâng cao',
    readTimeMinutes: 16,
    category: 'connection_pooling_pgbouncer',
    summary: 'Trong môi trường Serverless (Vercel, AWS Lambda), mỗi request có thể tạo một hàm mới và mở một kết nối Postgres riêng biệt, dễ dàng làm tràn giới hạn max_connections (thường là 100). Neon tích hợp sẵn PgBouncer Connection Pooler cho phép bạn phục vụ tới 10.000 kết nối đồng thời.',
    hookStory: 'Một ứng dụng bán hàng trên Vercel gặp sự cố vào ngày Black Friday: Lưu lượng tăng gấp 50 lần, 2.000 hàm Serverless bật lên cùng lúc và cố kết nối vào PostgreSQL. Database lập tức báo lỗi: "FATAL: remaining connection slots are reserved for non-replication superuser connections" và từ chối toàn bộ khách hàng. Lập trình viên chỉ cần thêm tiền tố \`-pooler\` vào chuỗi kết nối Neon, PgBouncer lập tức tiếp quản và gom 2.000 kết nối đó vào 20 kết nối thật, ứng dụng chạy mượt mà ngay lập tức.',
    sections: [
      {
        heading: '1. Phân Biệt Direct Connection vs Pooled Connection',
        subheading: 'Hai chuỗi kết nối cho hai mục đích khác nhau',
        content: `Trên Neon Dashboard, mỗi cơ sở dữ liệu luôn cung cấp 2 chuỗi kết nối:

• **Pooled Connection (Khuyên dùng cho Serverless & Next.js)**:
  - Cổng kết nối: \`5432\` (có gắn cờ \`-pooler\` trong domain, ví dụ \`ep-cool-123-pooler.us-east-2.aws.neon.tech\`).
  - Hoạt động ở chế độ **Transaction Pooling**: Kết nối vật lý chỉ được giữ trong thời gian một Transaction thực thi, sau đó lập tức trả lại pool cho hàm khác mượn.
  - Phục vụ được hàng chục ngàn kết nối Serverless đồng thời.

• **Direct Connection (Dùng cho Migrations & DDL)**:
  - Kết nối thẳng trực tiếp vào PostgreSQL engine (không có tiền tố \`-pooler\`).
  - Bắt buộc phải dùng Direct Connection khi chạy các lệnh Migration (Prisma Migrate, Drizzle Kit, Flyway) hoặc các câu lệnh SQL can thiệp session (\`LISTEN/NOTIFY\`, \`SET timezone\`).`,
        mindsetShift: {
          from: 'Dùng chung một chuỗi kết nối cho cả ứng dụng Next.js runtime lẫn lệnh chạy Prisma Migrate.',
          to: 'Dùng Pooled Connection cho DATABASE_URL (runtime) và Direct Connection cho DIRECT_URL (migration trong schema.prisma).',
          impact: 'Không bao giờ gặp lỗi cạn kiệt kết nối (Connection Pool Exhaustion) trên Production.'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Lấy chuỗi kết nối có bật sẵn Connection Pooler qua CLI',
        command: 'neonctl connection-string --pooled',
        description: 'Lấy URI kết nối tối ưu cho môi trường Serverless'
      }
    ],
    masteryChecklist: [
      'Phân biệt rõ ràng giữa Pooled Connection và Direct Connection.',
      'Cấu hình DATABASE_URL và DIRECT_URL chuẩn xác trong Prisma / Drizzle ORM.',
      'Hiểu rõ cơ chế Transaction Pooling của PgBouncer.'
    ]
  },
  {
    id: 'neon-ch6-point-in-time-recovery-time-travel',
    chapterNumber: 6,
    title: 'Time Travel & Point-in-Time Recovery (PITR): Khôi Phục Từng Giây',
    subtitle: 'Nghệ thuật du hành thời gian trong cơ sở dữ liệu: Khôi phục dữ liệu về đúng giây phút trước khi xảy ra sự cố và truy vấn trạng thái quá khứ.',
    level: 'Chuyên gia',
    readTimeMinutes: 16,
    category: 'point_in_time_recovery_time_travel',
    summary: 'Nhờ kiến trúc lưu trữ nhật ký Log-Structured của Pageserver, Neon hỗ trợ Point-in-Time Recovery (PITR) với độ chính xác đến từng giây mà không cần phải thực hiện quy trình Restore bản Backup cồng kềnh.',
    hookStory: 'Lúc 14:32:15, một quản trị viên sơ ý chạy lệnh \`DELETE FROM users;\` mà quên mệnh đề \`WHERE\` trên Production. Toàn bộ công ty hoảng loạn. Thay vì mất 6 tiếng để tải bản backup của đêm hôm trước và mất toàn bộ đơn hàng trong ngày, kỹ sư trưởng chỉ cần vào Neon Dashboard, chọn mốc thời gian: "14:32:10" (5 giây trước thảm họa) và tạo một nhánh mới. Toàn bộ dữ liệu của 100.000 người dùng được khôi phục nguyên vẹn 100% trong vòng đúng 2 giây!',
    sections: [
      {
        heading: '1. Khôi Phục Dữ Liệu Qua Mốc Thời Gian (Timestamp / LSN)',
        subheading: 'Tạo nhánh từ một thời điểm cụ thể trong quá khứ',
        content: `Với Neon, bạn có thể tạo một nhánh Database mới từ bất kỳ thời điểm nào trong cửa sổ lưu trữ lịch sử (History Retention Window):
• Hỗ trợ chỉ định thời gian chính xác dạng ISO 8601 (ví dụ: \`2026-09-24T14:30:00Z\`).
• Hỗ trợ chỉ định chính xác mã vị trí nhật ký LSN (\`Log Sequence Number\`).
• Nhánh mới được tạo ra lập tức ở trạng thái đọc/ghi bình thường, cho phép bạn kiểm tra dữ liệu cũ hoặc trỏ ứng dụng sang nhánh mới để khắc phục sự cố tức thì.`,
        codeBlock: {
          language: 'bash',
          title: 'Tạo Nhánh Khôi Phục Về Mốc Thời Gian 1 Giờ Trước',
          code: `# Tạo nhánh mới từ thời điểm 10 phút trước
neonctl branches create \\
  --name recovery-branch \\
  --parent main \\
  --type timestamp \\
  --time "2026-09-24T14:20:00Z"`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Xem lịch sử các điểm khôi phục có sẵn của nhánh',
        command: 'neonctl branches get main',
        description: 'Kiểm tra giới hạn thời gian lưu trữ lịch sử (Retention Period)'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ cơ chế Point-in-Time Recovery dựa trên nhật ký WAL của Neon.',
      'Thành thạo tạo nhánh khôi phục từ Timestamp hoặc LSN khi xảy ra sự cố mất dữ liệu.',
      'Cấu hình thời gian lưu trữ lịch sử phù hợp với chính sách bảo mật doanh nghiệp.'
    ]
  },
  {
    id: 'neon-ch7-serverless-driver-websockets',
    chapterNumber: 7,
    title: 'Neon Serverless Driver: Truy Vấn Qua WebSockets & HTTP',
    subtitle: 'Giải pháp kết nối Postgres từ các môi trường Edge Runtime không hỗ trợ TCP Sockets (Cloudflare Workers, Vercel Edge Functions).',
    level: 'Nâng cao',
    readTimeMinutes: 16,
    category: 'serverless_driver_websockets',
    summary: 'Các môi trường Edge (như Vercel Edge Middleware hay Cloudflare Workers) bị giới hạn không thể mở kết nối TCP socket truyền thống. Gói thư viện @neondatabase/serverless cho phép bạn truy vấn Postgres qua WebSockets hoặc HTTP Fetch với tốc độ cực nhanh.',
    hookStory: 'Bạn muốn chạy một câu lệnh SQL kiểm tra quyền đăng nhập ngay trong Vercel Edge Middleware tại Singapore. Nếu dùng thư viện \`pg\` Node.js thông thường, ứng dụng sẽ báo lỗi ngay lập tức vì Edge Runtime không có module \`net\`. Bằng cách dùng Neon Serverless Driver, truy vấn SQL được đóng gói qua giao thức HTTP/WebSocket tiêu chuẩn và trả về kết quả trong 15 mili-giây.',
    sections: [
      {
        heading: '1. Hai Chế Độ Của Neon Serverless Driver',
        subheading: 'HTTP Fetch cho Single Query vs WebSockets cho Interactive Transactions',
        content: `• **HTTP Query (\`neon()\` function)**:
  - Gửi câu lệnh SQL qua một HTTP POST request duy nhất.
  - Tốc độ cực nhanh (Latency thấp nhất), không tốn thời gian bắt tay WebSocket.
  - Phù hợp: Các truy vấn đơn lẻ (\`SELECT\`, \`INSERT\`) trong Edge Functions.

• **WebSocket Client (\`Pool\` & \`Client\` class)**:
  - Mở kết nối WebSocket hai chiều mô phỏng hoàn toàn giao thức PostgreSQL wire protocol.
  - Hỗ trợ đầy đủ các tính năng nâng cao: Giao dịch phức tạp (\`BEGIN ... COMMIT\`), Session variables, tương thích 100% với Drizzle ORM và Prisma.`,
        codeBlock: {
          language: 'typescript',
          title: 'Truy Vấn Postgres Qua HTTP Siêu Tốc Trong Vercel Edge Function',
          code: `import { neon } from '@neondatabase/serverless';

// Khởi tạo client HTTP nhẹ nhàng (không cần TCP socket)
const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: Request) {
  // Thực hiện truy vấn SQL an toàn với Tagged Template Literal chống SQL Injection
  const products = await sql\`
    SELECT id, name, price, stock 
    FROM products 
    WHERE in_stock = true 
    ORDER BY created_at DESC 
    LIMIT 10
  \`;

  return Response.json({ products });
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Cài đặt gói Neon Serverless Driver chính thức',
        command: 'npm install @neondatabase/serverless',
        description: 'Cài đặt bộ thư viện kết nối Postgres qua WebSockets và HTTP'
      }
    ],
    masteryChecklist: [
      'Sử dụng hàm neon() để truy vấn SQL qua HTTP trong các môi trường Edge.',
      'Sử dụng Neon Pool cho các ORM phổ biến (Drizzle, Kysely, Prisma).',
      'Hiểu rõ cơ chế chống tấn công SQL Injection bằng Tagged Template Literals.'
    ]
  },
  {
    id: 'neon-ch8-neon-auth-data-api',
    chapterNumber: 8,
    title: 'Neon Auth & Data API: Tích Hợp Bảo Mật & Kết Nối Không Cần Driver',
    subtitle: 'Nâng tầm ứng dụng với giải pháp xác thực người dùng tích hợp sẵn và truy cập dữ liệu an toàn từ frontend.',
    level: 'Trung bình',
    readTimeMinutes: 15,
    category: 'neon_auth_data_api',
    summary: 'Neon cung cấp tính năng Neon Auth và Data API, cho phép bạn dễ dàng quản lý quyền người dùng, tích hợp với các nhà cung cấp định danh hiện đại và thực thi truy vấn an toàn.',
    hookStory: 'Bạn muốn xây dựng một ứng dụng Jamstack hoàn toàn tĩnh trên Cloudflare Pages hoặc GitHub Pages và muốn kết nối trực tiếp vào Postgres mà không cần dựng thêm một máy chủ backend Node.js. Với Neon Data API và Auth, ứng dụng tĩnh của bạn có thể giao tiếp an toàn qua HTTPS API có xác thực token.',
    sections: [
      {
        heading: '1. Kiến Trúc Không Máy Chủ Với Neon Data API',
        subheading: 'Truy cập cơ sở dữ liệu như một Web Service',
        content: `• Tích hợp xác thực JWT Token trực tiếp vào các phiên truy vấn SQL.
• Hỗ trợ quản lý vai trò (Roles) và quyền hạn chi tiết trong Postgres (\`GRANT SELECT ON ...\`).
• Cung cấp các công cụ trực quan trên Neon Console để phân tích các truy vấn chậm (Slow Queries) và đề xuất tối ưu hóa chỉ mục tự động.`,
        bulletPoints: [
          'Đơn giản hóa kiến trúc hệ thống, giảm thiểu số lượng máy chủ trung gian.',
          'Bảo mật dữ liệu bằng các tiêu chuẩn phân quyền mạnh mẽ của PostgreSQL.',
          'Tích hợp liền mạch với các công cụ CI/CD hiện đại.'
        ]
      }
    ],
    practicalCommands: [
      {
        title: 'Xem danh sách các vai trò (Roles) trong database qua CLI',
        command: 'neonctl roles list',
        description: 'Kiểm tra các tài khoản người dùng và vai trò phân quyền'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ cơ chế hoạt động của Neon Data API.',
      'Quản lý vai trò và phân quyền an toàn trong PostgreSQL.',
      'Sử dụng Neon Console để theo dõi các truy vấn SQL đang thực thi.'
    ]
  },
  {
    id: 'neon-ch9-cli-terraform-api',
    chapterNumber: 9,
    title: 'Tự Động Hóa Với Neon CLI, REST API & Terraform',
    subtitle: 'Quản trị hạ tầng như mã nguồn (Infrastructure as Code): Tự động tạo nhánh database trong GitHub Actions CI Pipeline và hủy nhánh khi đóng PR.',
    level: 'Chuyên gia',
    readTimeMinutes: 18,
    category: 'cli_terraform_api',
    summary: 'Mọi thao tác trên Neon Dashboard đều có thể tự động hóa 100% thông qua Neon REST API, Terraform Provider và GitHub Actions. Xây dựng một quy trình CI/CD hoàn hảo: Mỗi Pull Request tự động tạo 1 nhánh DB, chạy migrations, test e2e và tự hủy nhánh khi gộp code.',
    hookStory: 'Một đội ngũ kỹ sư có 20 Pull Request mỗi ngày. Trước đây họ dùng chung 1 database staging, các lập trình viên liên tục đè dữ liệu của nhau gây lỗi test ngẫu nhiên. Sau khi áp dụng Neon GitHub Action: Mỗi PR mở ra, con bot tạo 1 nhánh DB riêng trong 1 giây, gán chuỗi kết nối vào Vercel Preview URL. Khi PR được Merge, con bot tự động xóa nhánh DB đó. Môi trường kiểm thử trở nên cô lập và chuẩn xác tuyệt đối 100%.',
    sections: [
      {
        heading: '1. Kịch Bản GitHub Actions Tự Động Tạo Nhánh DB Cho Pull Request',
        subheading: 'Tự động hóa hoàn toàn chu trình kiểm thử',
        content: `Quy trình thực thi trong file workflow:
1. Khi có sự kiện \`pull_request.opened\`: Gọi Neon API tạo nhánh mới có tên \`pr-\${{ github.event.number }}\`.
2. Chạy \`npm run test:e2e\` kết nối tới nhánh DB này.
3. Khi có sự kiện \`pull_request.closed\`: Gọi Neon API xóa nhánh \`pr-\${{ github.event.number }}\`.`,
        codeBlock: {
          language: 'yaml',
          title: 'GitHub Actions Workflow Tạo Nhánh Neon Tự Động (.github/workflows/preview-db.yml)',
          code: `name: Create Preview Database
on:
  pull_request:
    types: [opened, synchronize, closed]

jobs:
  preview_database:
    runs-on: ubuntu-latest
    steps:
      - name: Create or Delete Neon Branch
        uses: neondatabase/create-branch-action@v5
        with:
          project_id: \${{ secrets.NEON_PROJECT_ID }}
          api_key: \${{ secrets.NEON_API_KEY }}
          branch_name: pr-\${{ github.event.number }}
        id: create_branch

      - name: Output Connection String
        if: github.event.action != 'closed'
        run: echo "Database URL: \${{ steps.create_branch.outputs.db_url }}"`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Tạo API Key mới cho CI/CD qua Neon CLI',
        command: 'neonctl api-keys create --name "github-actions-ci"',
        description: 'Sinh khóa bí mật để sử dụng trong GitHub Secrets'
      }
    ],
    masteryChecklist: [
      'Tự động hóa quy trình tạo và hủy nhánh database trong GitHub Actions.',
      'Sử dụng Neon Terraform Provider để quản trị hạ tầng Serverless Postgres.',
      'Làm chủ toàn bộ các endpoint của Neon REST API.'
    ]
  },
  {
    id: 'neon-ch10-cost-performance-optimization',
    chapterNumber: 10,
    title: 'Tối Ưu Hóa Chi Phí & Hiệu Năng: Cẩm Nang Cho Doanh Nghiệp',
    subtitle: 'Nghệ thuật phân tích Slow Queries, cấu hình Indexes tối ưu, kiểm soát chi phí lưu trữ S3 và xây dựng kiến trúc Multi-Branch đỉnh cao.',
    level: 'Chuyên gia',
    readTimeMinutes: 18,
    category: 'cost_performance_optimization',
    summary: 'Vận hành cơ sở dữ liệu Serverless đòi hỏi sự hiểu biết về cách tính toán chi phí: Compute Hours, Active Storage, và Synthetic Storage. Nắm vững kỹ thuật tối ưu hóa truy vấn giúp doanh nghiệp tiết kiệm hàng ngàn USD mỗi tháng.',
    hookStory: 'Một công ty thanh toán hóa đơn 3.000 USD/tháng cho cụm máy chủ cơ sở dữ liệu cũ do liên tục phải duy trì cấu hình máy lớn 24/7 đề phòng giờ cao điểm. Sau khi chuyển sang Neon Serverless Postgres với cấu hình Autoscaling từ 0.5 đến 4 CU và bật Scale-to-Zero vào ban đêm, hóa đơn hàng tháng giảm chỉ còn 180 USD trong khi tốc độ phản hồi người dùng nhanh hơn gấp 2 lần.',
    sections: [
      {
        heading: '1. Ba Trụ Cột Tối Ưu Hóa Chi Phí Trên Neon',
        subheading: 'Hiểu rõ mô hình tính phí để không bao giờ lãng phí ngân sách',
        content: `• **Compute Time**: Chỉ tính tiền khi Compute đang ở trạng thái \`ACTIVE\`. Luôn bật tính năng tự động ngủ đông (Auto-suspend sau 5 phút) cho tất cả các nhánh phụ (Staging, Dev, Preview).
• **Storage Size**: Chỉ tính tiền trên dữ liệu thực tế lưu trên S3 (rất rẻ, ~$0.02/GB/tháng). Thường xuyên xóa các nhánh cũ không còn sử dụng.
• **Query Tuning**: Thêm chỉ mục phù hợp trên các cột thường xuyên xuất hiện trong mệnh đề \`WHERE\` và \`JOIN\` để giảm thiểu CPU Compute Time.`,
        storyQuote: {
          quote: 'Serverless không chỉ là về việc không phải quản lý máy chủ; đó là về việc chỉ trả tiền cho giá trị kinh doanh thực sự mà mã nguồn của bạn tạo ra.',
          speaker: 'Nikita Shamgunov',
          role: 'CEO & Co-founder tại Neon',
          year: '2024'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Kiểm tra mức tiêu thụ tài nguyên và chi phí dự án qua CLI',
        command: 'neonctl consumption list',
        description: 'Xem chi tiết số giờ tính toán và dung lượng lưu trữ đã sử dụng trong tháng'
      }
    ],
    masteryChecklist: [
      'Nắm vững cách tính phí Compute và Storage của Neon Serverless.',
      'Thiết lập chính sách tự động xóa nhánh Preview cũ để tối ưu hóa chi phí.',
      'Sử dụng công cụ Explain Analyze để tối ưu hóa các truy vấn SQL nặng.'
    ]
  }
];
