import { AppSystemFlashcard } from '../../types/appSystemModule';

export const APP_SYSTEM_FLASHCARDS: AppSystemFlashcard[] = [
  {
    id: 'as-fc-1',
    term: 'Unified-App-Infra',
    definition: 'Nền tảng Backend-as-a-Service (BaaS) tự lưu trữ (Self-hosted), quy tụ toàn bộ tài nguyên xác thực (Auth), cơ sở dữ liệu đa vùng (Multi-DB), phân quyền động (ABAC Gateway) và Admin Dashboard vào một kiến trúc duy nhất.',
    category: 'overview_philosophy',
    exampleOrAnalogy: 'Giống như bạn tự xây dựng một phiên bản Supabase/Firebase riêng cho tổ chức, làm chủ 100% dữ liệu và không bị phụ thuộc vào bất kỳ nhà cung cấp đám mây nào.',
    proTip: 'Được thiết kế dưới dạng Monorepo chuẩn pnpm workspaces và Turborepo để chia sẻ schema và kiểu dữ liệu TypeScript dùng chung từ Backend đến Frontend.'
  },
  {
    id: 'as-fc-2',
    term: 'Turborepo Monorepo',
    definition: 'Cấu trúc quản lý đa gói mã nguồn (Multi-package repository) với hệ thống Build Cache thông minh, giúp biên dịch và kiểm thử song song siêu tốc trên toàn bộ 6 packages nội bộ.',
    category: 'monorepo_architecture',
    exampleOrAnalogy: 'Tương tự một xưởng sản xuất có các băng chuyền chuyên biệt (@infra/core, @infra/db, @infra/sdk) nhưng dùng chung kho nguyên liệu và kiểm tra chất lượng tự động.',
    proTip: 'Luôn khai báo exports tường minh trong package.json của từng package để tránh import vòng lặp (circular dependencies).'
  },
  {
    id: 'as-fc-3',
    term: 'Publishable Key (pk_live_)',
    definition: 'Khóa định danh hạ tầng công khai, an toàn tuyệt đối khi đưa vào trình duyệt hoặc Mobile App. Mọi truy vấn từ key này đều bị ép buộc đi qua bộ lọc ABAC và Tenant Isolation trên máy chủ.',
    category: 'security_cryptography',
    exampleOrAnalogy: 'Như thẻ cư dân quét thang máy: ai cũng thấy bạn cầm thẻ, nhưng thẻ chỉ bấm được đúng tầng bạn được cấp phép.',
    proTip: 'Không bao giờ cấp quyền ghi trực tiếp vào các bảng nhạy cảm (như audit_logs hay credentials) qua publishable key.'
  },
  {
    id: 'as-fc-4',
    term: 'Secret Key (sk_live_)',
    definition: 'Khóa bí mật đặc quyền cao cấp (Service Role), chỉ được dùng trên môi trường Backend bảo mật (Node.js, Server Actions, Background Workers), có thể vượt qua một số rào cản ABAC khi cần bảo trì hệ thống.',
    category: 'security_cryptography',
    exampleOrAnalogy: 'Như chìa khóa vạn năng (Master Key) của ban quản lý tòa nhà, chỉ giao cho trưởng kỹ thuật viên và phải cất trong két sắt (.env trên server).',
    proTip: 'Cảnh báo tự động nếu phát hiện sk_live_ xuất hiện trong client-side bundle bằng AST Linter.'
  },
  {
    id: 'as-fc-5',
    term: 'AES-256-GCM with AAD',
    definition: 'Chuẩn mã hóa đối xứng xác thực cao cấp (Authenticated Encryption with Associated Data). Sử dụng khóa chính để mã hóa dữ liệu nhạy cảm đồng thời gán kèm tenant_id vào AAD để ngăn chặn việc tráo đổi dữ liệu giữa các tenant.',
    category: 'security_cryptography',
    exampleOrAnalogy: 'Giống như niêm phong hộp thư mật có đóng mộc nổi tên người nhận. Kẻ trộm dù lấy được hộp mang sang nhà khác mở cũng lập tức làm rách niêm phong xác thực.',
    proTip: 'Nếu AAD giải mã không khớp với tenant_id của ngữ cảnh truy vấn, hệ thống lập tức từ chối và ghi log cảnh báo xâm nhập.'
  },
  {
    id: 'as-fc-6',
    term: 'Zero-Leak Key Hashing',
    definition: 'Cơ chế không bao giờ lưu trữ API Key ở dạng Plaintext trong cơ sở dữ liệu. Chỉ lưu giá trị băm SHA-256 an toàn cùng tiền tố 8 ký tự đầu để nhận diện và tra cứu.',
    category: 'security_cryptography',
    exampleOrAnalogy: 'Tương tự việc ngân hàng chỉ lưu hash mật mã thẻ ATM, nhân viên ngân hàng mở DB cũng không biết mã PIN gốc của bạn.',
    proTip: 'Khi tạo Key mới, hiển thị key đầy đủ đúng 1 lần duy nhất cho người dùng sao chép.'
  },
  {
    id: 'as-fc-7',
    term: 'ABAC Data Gateway',
    definition: 'Cổng trung chuyển dữ liệu kiểm soát truy cập dựa trên thuộc tính (Attribute-Based Access Control). Tự động phân tích ngữ cảnh người dùng (Role, Tenant, IP, Time) và tự động tiêm (inject) điều kiện SQL WHERE vào mọi câu truy vấn Drizzle ORM.',
    category: 'rbac_abac_policies',
    exampleOrAnalogy: 'Như một trợ lý kiểm duyệt tự động chèn thêm câu "VÀ chỉ tìm tài liệu thuộc phòng ban của tôi" vào mọi lá đơn yêu cầu dữ liệu.',
    proTip: 'Ngăn chặn hoàn toàn lỗ hổng IDOR (Insecure Direct Object Reference) từ cấp kiến trúc framework.'
  },
  {
    id: 'as-fc-8',
    term: 'Database Adapter Pattern',
    definition: 'Mẫu thiết kế đóng gói logic kết nối và thực thi SQL thành giao diện chuẩn `DatabaseAdapter`, cho phép hệ thống hoán đổi hoặc kết nối đồng thời giữa Neon Serverless Postgres, Supabase và Turso LibSQL mà không cần sửa code nghiệp vụ.',
    category: 'multi_database_adapters',
    exampleOrAnalogy: 'Như ổ cắm đa năng quốc tế: bạn cắm chân cắm nào (Postgres hay SQLite) thì thiết bị vẫn nhận dòng điện chuẩn 220V như nhau.',
    proTip: 'Tận dụng Turso LibSQL cho Edge Caching/Replica cục bộ và Neon/Supabase cho các transaction dữ liệu tài chính phức tạp.'
  },
  {
    id: 'as-fc-9',
    term: 'Centralized Better Auth Engine',
    definition: 'Engine quản lý danh tính tập trung hỗ trợ Session Token, Refresh Token, Passkey WebAuthn, OAuth Google/GitHub và Two-Factor Authentication (TOTP/SMS/Email).',
    category: 'centralized_auth_mfa',
    exampleOrAnalogy: 'Như trung tâm cấp căn cước công dân và hộ chiếu sinh trắc học duy nhất phục vụ cho tất cả các dịch vụ công trong thành phố.',
    proTip: 'Được đóng gói trong `@infra/auth` và tích hợp sâu với `@infra/db` qua Drizzle schema chuẩn hóa.'
  },
  {
    id: 'as-fc-10',
    term: 'Client SDK (@infra/sdk)',
    definition: 'Thư viện TypeScript Client mỏng nhẹ, cung cấp API trực quan (`infra.auth`, `infra.data`, `infra.storage`) với hỗ trợ Type-Safe hoàn chỉnh, tự động đính kèm Token và xử lý Auto-retry.',
    category: 'client_sdk_design',
    exampleOrAnalogy: 'Như điều khiển từ xa thông minh đã được lập trình sẵn các nút bấm chuẩn xác để tương tác với cả dàn thiết bị âm thanh cao cấp.',
    proTip: 'Hỗ trợ cả môi trường Node.js Server, React/Next.js Client và React Native/Expo.'
  },
  {
    id: 'as-fc-11',
    term: 'Multi-Tenant Isolation',
    definition: 'Chiến lược cô lập dữ liệu nhiều người thuê trong cùng một cơ sở dữ liệu thông qua cột `tenant_id` và các bộ lọc bắt buộc ở tầng ORM / Row-Level Security.',
    category: 'rbac_abac_policies',
    exampleOrAnalogy: 'Như các căn hộ trong cùng một tòa chung cư cao cấp: chung móng và hệ thống cấp nước, nhưng mỗi nhà có khóa riêng và không thể nhìn sang nhà khác.',
    proTip: 'Luôn đánh index kép `(tenant_id, created_at)` hoặc `(tenant_id, id)` trên mọi bảng đa người thuê.'
  },
  {
    id: 'as-fc-12',
    term: 'Live Infrastructure Proofs',
    definition: 'Bộ kịch bản kiểm thử tự động trực tiếp trên hạ tầng thật (`live-proof`, `auth-proof`, `mfa-proof`, `ops-proof`, `mail-proof`) để xác minh tính toàn vẹn của kết nối DB, Auth và Email trước khi deploy.',
    category: 'testing_runbooks',
    exampleOrAnalogy: 'Như quy trình phi công kiểm tra toàn bộ đồng hồ đo áp suất, phanh và động cơ phản lực trước khi máy bay lăn bánh ra đường băng.',
    proTip: 'Chạy `pnpm --filter @infra/core run test:live` trong CI pipeline để phát hiện sớm các lỗi biến môi trường hay firewall DB.'
  },
  {
    id: 'as-fc-13',
    term: 'Storage Gateway S3/R2 (Roadmap)',
    definition: 'Tính năng nâng cấp sắp tới: Cổng quản lý tệp tin đa đám mây (Cloudflare R2, AWS S3, Supabase Storage) với cơ chế cấp Presigned URL và kiểm tra phân quyền ABAC trước khi tải/xóa file.',
    category: 'future_roadmap_expansion',
    exampleOrAnalogy: 'Như thủ kho thông minh: chỉ giao phiếu nhận hàng có thời hạn 5 phút sau khi đã kiểm tra đúng chứng minh thư của khách hàng.',
    proTip: 'Sử dụng Cloudflare R2 để loại bỏ 100% chi phí Egress Bandwidth khi người dùng tải tệp.'
  },
  {
    id: 'as-fc-14',
    term: 'Distributed Task Queue (Roadmap)',
    definition: 'Hệ thống hàng đợi phân tán (sử dụng BullMQ trên Redis hoặc Upstash QStash) giúp xử lý các tác vụ nền nặng như gửi email hàng loạt, tạo báo cáo PDF và đồng bộ dữ liệu đa vùng.',
    category: 'future_roadmap_expansion',
    exampleOrAnalogy: 'Như băng chuyền phân loại bưu kiện tại bưu điện: đơn thư được xếp hàng và phân bổ cho hàng chục xe tải giao hàng mà không làm nghẽn quầy tiếp tân.',
    proTip: 'Đảm bảo mọi task đều có tính chất Idempotent (thực thi lại nhiều lần không tạo kết quả trùng lặp).'
  },
  {
    id: 'as-fc-15',
    term: 'Realtime CDC WebSockets (Roadmap)',
    definition: 'Cơ chế bắt thay đổi dữ liệu từ Write-Ahead Log của Postgres (Change Data Capture) và bắn trực tiếp về Client qua WebSockets theo mô hình Publish/Subscribe.',
    category: 'future_roadmap_expansion',
    exampleOrAnalogy: 'Như bảng điện tử tỉ số bóng đá: sân vận động vừa có bàn thắng là màn hình của hàng triệu khán giả tự động nhảy số ngay lập tức.',
    proTip: 'Tích hợp bộ lọc Tenant và ABAC ngay tại tầng WebSocket Gateway để không broadcast dữ liệu ra ngoài phạm vi cho phép.'
  },
  {
    id: 'as-fc-16',
    term: 'AI & Vector Embeddings (Roadmap)',
    definition: 'Tích hợp tìm kiếm ngữ nghĩa (Semantic Search) và RAG (Retrieval-Augmented Generation) thông qua tiện ích mở rộng pgvector trên Neon/Supabase hoặc Vector Search trên Turso.',
    category: 'future_roadmap_expansion',
    exampleOrAnalogy: 'Như thủ thư thông thái có thể tìm sách theo ý nghĩa câu chuyện bạn mô tả thay vì chỉ tìm chính xác từng chữ trong tựa đề.',
    proTip: 'Lưu trữ vector embedding cùng bảng nghiệp vụ để thực hiện truy vấn kết hợp lọc quan hệ (Metadata Filter) siêu nhanh trong 1 câu SQL.'
  },
  {
    id: 'as-fc-17',
    term: 'Multi-Tenant Metering & Stripe (Roadmap)',
    definition: 'Hệ thống đo lường mức độ tiêu thụ tài nguyên theo thời gian thực (API calls, DB Storage, Egress bandwidth) và tự động tính cước tích hợp cổng thanh toán Stripe Billing.',
    category: 'future_roadmap_expansion',
    exampleOrAnalogy: 'Như đồng hồ điện tử đo lượng điện nước tiêu thụ hàng tháng của từng căn hộ trong tòa nhà để tự in hóa đơn gửi về ứng dụng.',
    proTip: 'Sử dụng Redis HyperLogLog hoặc Counter có TTL để ghi nhận hàng triệu metric mà không làm chậm DB chính.'
  },
  {
    id: 'as-fc-18',
    term: 'Edge Caching with Cloudflare Workers (Roadmap)',
    definition: 'Kiến trúc triển khai các Node xử lý API tại 300+ điểm PoP toàn cầu, lưu trữ tạm (Cache) kết quả các truy vấn đọc thường xuyên để giảm độ trễ phản hồi xuống dưới 20ms.',
    category: 'future_roadmap_expansion',
    exampleOrAnalogy: 'Như chuỗi cửa hàng tiện lợi đặt ở mọi góc phố, người mua lấy ngay đồ ăn nhanh mà không cần đợi vận chuyển từ kho tổng ở ngoại ô.',
    proTip: 'Cấu hình Cache-Control header chuẩn và cơ chế Purge Cache tự động khi có thao tác Mutation qua Webhook.'
  }
];
