import { AppSystemChapter } from '../../types/appSystemModule';

export const APP_SYSTEM_CHAPTERS: AppSystemChapter[] = [
  {
    id: 'appsys-ch1-vision-philosophy',
    chapterNumber: 1,
    title: 'Khởi Nguyên & Triết Lý Unified-App-Infra: Giải Cứu Kỹ Sư Khỏi Nỗi Đau Phân Mảnh Hạ Tầng',
    subtitle: 'Tại sao việc dựng lại Auth, Secret Storage và Database plumbing cho từng dự án nhỏ là một sự lãng phí khủng khiếp, và cách hệ thống "One Hub — Multi-Tenant DB Pool" ra đời.',
    level: 'Cơ bản',
    readTimeMinutes: 14,
    category: 'overview_philosophy',
    summary: 'Unified-App-Infra là một nền tảng Backend-as-a-Service (BaaS) tự lưu trữ (Self-hosted): Một trung tâm xác thực duy nhất, một bảng điều khiển quản trị tập trung và một bộ định tuyến thông minh cấp phát cơ sở dữ liệu miễn phí (Neon/Supabase/Turso) cho từng ứng dụng con.',
    hookStory: 'Bạn có 10 ý tưởng phần mềm thú vị (Side Projects). Cứ mỗi lần tạo một repo mới, bạn lại mất 3 ngày cài đặt Google OAuth, viết lại bảng users, cấu hình mã hóa mật khẩu, tạo một tài khoản cơ sở dữ liệu mới và copy các file cấu hình lộn xộn. Sau 6 tháng, 10 dự án là 10 tài khoản phân mảnh, không thể đồng bộ người dùng, bảo mật chắp vá và tốn tiền duy trì hàng tháng. Unified-App-Infra ra đời để chấm dứt cơn ác mộng này: Một hạ tầng duy nhất phục vụ toàn bộ hệ sinh thái của bạn chỉ với 3 dòng code tích hợp.',
    sections: [
      {
        heading: '1. Bài Toán Cốt Tử: The Side-Project Fragmentation Dilemma',
        subheading: 'Từ sự phân mảnh hỗn loạn đến kiến trúc Hub & Spoke tinh gọn',
        content: `Mỗi khi khởi động một dự án mới, các kỹ sư thường phải lặp lại các công việc nhàm chán:
• Tích hợp lại Better Auth / NextAuth và cấu hình Google/GitHub OAuth.
• Tạo mới tài khoản cơ sở dữ liệu đám mây và lưu chuỗi kết nối vào file \`.env\` rải rác.
• Viết lại hệ thống phân quyền (Admin vs User, ai được xem bài viết của ai).
• Thiết lập bảng điều khiển quản trị người dùng và giám sát lỗi.

**Unified-App-Infra thay đổi hoàn toàn cuộc chơi:**
1. **One Authentication Hub**: Một hệ thống tài khoản duy nhất (Single Sign-On SSO) dùng chung cho tất cả các ứng dụng trong hệ sinh thái của bạn.
2. **Multi-Database Pool**: Mỗi ứng dụng con (Child App) được cấp phát một cơ sở dữ liệu cô lập hoàn toàn (Neon PostgreSQL, Supabase hoặc Turso LibSQL) mà không sợ bị xung đột bảng.
3. **Built-in Authorization & Data Gateway**: Khách hàng gọi dữ liệu qua API Gateway an toàn với cơ chế tự động bơm chính sách phân quyền (Server-side Policy Injection), giúp mã khóa publishable key (\`pk_live_...\`) có thể đặt an toàn ngay trên trình duyệt web.`,
        codeBlock: {
          language: 'typescript',
          title: 'Khởi Tạo & Truy Vấn Dữ Liệu An Toàn Với @infra/sdk Trong Ứng Dụng Con',
          code: `import { createInfraClient } from '@infra/sdk';

// Khởi tạo client với Publishable Key an toàn trên trình duyệt
const infra = createInfraClient({
  baseUrl: 'https://infra.my-system.com',
  apiKey: process.env.NEXT_PUBLIC_INFRA_KEY!, // pk_live_...
});

// Truy vấn dữ liệu: Không cần truyền owner_id, hệ thống tự động lọc theo JWT Token!
const { data: notes, error } = await infra
  .from('notes')
  .select('id', 'title', 'created_at')
  .eq('is_archived', false)
  .order('created_at', 'desc')
  .limit(20)
  .execute();`
        },
        mindsetShift: {
          from: 'Mỗi khi làm một web/app mới lại dựng riêng một backend NodeJS/Express, cài database riêng và cấu hình Auth từ đầu.',
          to: 'Dùng chung hạ tầng Unified-App-Infra: Ứng dụng mới chỉ cần đăng ký 1 App ID và dùng @infra/sdk để truy vấn dữ liệu an toàn.',
          impact: 'Rút ngắn thời gian ra mắt một ứng dụng mới từ 2 tuần xuống còn đúng 1 buổi chiều.'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Khởi chạy toàn bộ môi trường monorepo của hệ thống',
        command: 'pnpm dev',
        description: 'Chạy Turborepo khởi động Admin Dashboard và các API Gateway tại localhost:3000'
      },
      {
        title: 'Tạo ứng dụng con mới tự động qua kịch bản CLI',
        command: 'pnpm create-app',
        description: 'Chạy script sinh template ứng dụng con đã tích hợp sẵn @infra/sdk'
      }
    ],
    masteryChecklist: [
      'Nắm vững triết lý và mục tiêu ra đời của nền tảng Unified-App-Infra.',
      'Hiểu rõ sự khác biệt giữa Centralized Hub và các Child Apps trong mô hình Hub & Spoke.',
      'Giải thích được lý do Publishable Key (pk_live_...) an toàn khi đặt trong mã nguồn Frontend.'
    ]
  },
  {
    id: 'appsys-ch2-monorepo-packages-deepdive',
    chapterNumber: 2,
    title: 'Giải Phẫu Kiến Trúc Monorepo: 6 Gói Packages Cốt Lõi Dưới Kính Hiển Vi',
    subtitle: 'Phân tích chi tiết ranh giới trách nhiệm giữa @infra/core, @infra/db, @infra/adapters, @infra/auth, @infra/sdk, @infra/ui và ứng dụng web apps/web.',
    level: 'Trung bình',
    readTimeMinutes: 16,
    category: 'monorepo_architecture',
    summary: 'Hệ thống được tổ chức theo cấu trúc pnpm workspaces và Turborepo phân lớp nghiêm ngặt: Core (Mật mã, DSL, Rules), DB (Drizzle 31 bảng), Adapters (Kết nối DB), Auth (Better Auth & Gateway), SDK (Client) và Web (Admin Dashboard & API Routes).',
    hookStory: 'Tại sao một hệ thống hạ tầng lớn lại không nên viết dồn tất cả vào 1 thư mục duy nhất? Khi tách thành các package chuyên biệt, gói `@infra/sdk` có thể được xuất bản lên npm mà không chứa bất kỳ thư viện mật mã nặng nề nào của backend; gói `@infra/core` có thể chạy trên cả Node.js lẫn Edge Runtime mà không phụ thuộc vào Database driver; và toàn bộ hệ thống được đảm bảo tính toàn vẹn qua 550 bài kiểm thử tự động.',
    sections: [
      {
        heading: '1. Sơ Đồ Cấu Trúc Các Gói Phụ Thuộc (Package Hierarchy)',
        subheading: 'Nguyên tắc phân tầng một chiều (Unidirectional Dependency Flow)',
        content: `Mỗi package trong hệ thống đảm nhận một sứ mệnh độc lập:

1. **\`packages/core\` (Trọng tâm toán học & logic)**:
   - Chứa các thuật toán mật mã AES-256-GCM, tạo và băm API Keys (\`pk_live_\` / \`sk_live_\`).
   - Xử lý JWT, TOTP MFA, bộ quy tắc phân quyền RBAC & ABAC.
   - Trình biên dịch Query DSL biến đổi truy vấn hướng đối tượng thành SQL tham số hóa an toàn.

2. **\`packages/db\` (Tầng dữ liệu Master DB)**:
   - Định nghĩa Drizzle ORM Schema cho **31 bảng dữ liệu** của Master Database.
   - Quản lý 14 file migrations, typed queries và audit logging.

3. **\`packages/adapters\` (Bộ chuyển đổi đa cơ sở dữ liệu)**:
   - Cung cấp interface \`DatabaseAdapter\` chung cho các loại DB: PostgreSQL (Neon, Supabase) và LibSQL (Turso).
   - Tự động cấp phát (Auto-provisioning) Neon Project và Turso Database qua API.

4. **\`packages/auth\` (Trung tâm xác thực & Data Gateway)**:
   - Tích hợp phiên bản tùy biến của Better Auth, hỗ trợ WebAuthn Passkeys, TOTP, Refresh Token Rotation.
   - Đóng vai trò Data Gateway tiếp nhận truy vấn từ SDK, kiểm tra quyền và thực thi trên tenant DB.

5. **\`packages/sdk\` (Thư viện client cho lập trình viên)**:
   - Gói \`@infra/sdk\` siêu nhẹ (Zero runtime dependencies).
   - Cung cấp Browser Client, Server Client, Token Manager và Fluent Query Builder.

6. **\`apps/web\` (Next.js App Router)**:
   - Cung cấp giao diện Admin Dashboard và các Endpoint API công khai (\`/api/auth/*\`, \`/api/v1/*\`).`,
        codeBlock: {
          language: 'txt',
          title: 'Sơ Đồ Phân Tầng Phụ Thuộc Trong Monorepo',
          code: `[ apps/web (Next.js Dashboard & API Routes) ]
        │                       │
        ▼                       ▼
[ packages/auth ] ──────► [ packages/adapters ]
        │                       │
        ▼                       ▼
  [ packages/db ] ──────► [ packages/core (Crypto, DSL, RBAC/ABAC) ]
                                ▲
                                │ (Pure Types & Contract)
                        [ packages/sdk (@infra/sdk) ]`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Chạy kiểm thử toàn bộ các package trong monorepo',
        command: 'pnpm test',
        description: 'Chạy Vitest thực thi hơn 550 bài kiểm thử trên tất cả các gói'
      },
      {
        title: 'Kiểm tra kiểu dữ liệu TypeScript nghiêm ngặt toàn hệ thống',
        command: 'pnpm typecheck',
        description: 'Xác minh không có bất kỳ lỗi kiểu ngầm định (zero implicit any) nào'
      }
    ],
    masteryChecklist: [
      'Nắm vững ranh giới trách nhiệm giữa 6 package trong hệ thống.',
      'Hiểu rõ vì sao @infra/core không phụ thuộc vào Database driver để có thể chạy trên mọi Runtime.',
      'Thành thạo cấu trúc monorepo với pnpm workspaces và Turborepo.'
    ]
  },
  {
    id: 'appsys-ch3-zero-trust-security-cryptography',
    chapterNumber: 3,
    title: 'Mô Hình Bảo Mật Đa Tầng Zero-Trust & Mật Mã Học Cấp Quân Sự',
    subtitle: 'Giải mã cơ chế mã hóa AES-256-GCM với AAD, lưu trữ API Key bằng hàm băm SHA-256, kiểm tra mật khẩu K-Anonymity và lá chắn chống tấn công Webhook SSRF.',
    level: 'Chuyên gia',
    readTimeMinutes: 18,
    category: 'security_cryptography',
    summary: 'Bảo mật là linh hồn của Unified-App-Infra. Toàn bộ chuỗi kết nối của khách hàng được niêm phong bằng AES-256-GCM gắn kèm AAD; API Keys chỉ lưu bản băm SHA-256; mật khẩu được kiểm tra qua HaveIBeenPwned K-Anonymity; và Webhooks có cơ chế chống SSRF toàn diện.',
    hookStory: 'Một kẻ tấn công chiếm được quyền truy cập vào bảng cơ sở dữ liệu Master của hệ thống. Hắn hí hửng tưởng rằng sẽ đọc trộm được mật khẩu database của tất cả các ứng dụng con. Nhưng khi mở ra, toàn bộ chuỗi kết nối chỉ là các khối nhị phân mã hóa AES-256-GCM. Kẻ tấn công cố tình tráo đổi dòng mã hóa của App A sang App B để lừa hệ thống giải mã, nhưng cỗ máy lập tức kích hoạt báo động và từ chối vì vi phạm dữ liệu xác thực AAD (Additional Authenticated Data). Hệ thống vẫn an toàn tuyệt đối 100%!',
    sections: [
      {
        heading: '1. Mã Hóa Chuỗi Kết Nối Bằng AES-256-GCM Với AAD',
        subheading: 'Ngăn chặn hoàn toàn các cuộc tấn công đánh tráo bản ghi (Ciphertext Relocation Attack)',
        content: `Trong Unified-App-Infra, chuỗi kết nối Database (\`DATABASE_URL\`) của các ứng dụng con là tài sản tuyệt mật.
Hệ thống sử dụng thuật toán mã hóa đối xứng **AES-256-GCM (Galois/Counter Mode)**:
• **Random 12-byte IV**: Mỗi lần mã hóa tạo ra một Vector khởi tạo ngẫu nhiên, không bao giờ trùng lặp.
• **16-byte Auth Tag**: Chữ ký xác thực tính toàn vẹn, nếu ciphertext bị sửa đổi dù chỉ 1 bit, hàm giải mã sẽ ném ra lỗi ngay lập tức.
• **AAD (Additional Authenticated Data)**: Gắn chặt ID của bản ghi (\`tenant_id\`) vào quá trình mã hóa. Điều này đảm bảo kẻ xấu không thể copy chuỗi mã hóa từ dòng này sang gán vào dòng khác trong Database!`,
        codeBlock: {
          language: 'typescript',
          title: 'Cơ Chế Mã Hóa AES-256-GCM Với AAD Trong packages/core',
          code: `import crypto from 'node:crypto';

export function sealConnectionString(plaintext: string, tenantId: string, masterKey: Buffer) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', masterKey, iv);
  
  // Gắn AAD ràng buộc chặt chẽ với tenantId
  cipher.setAAD(Buffer.from(tenantId, 'utf8'));
  
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString('hex'),
    ciphertext: encrypted.toString('hex'),
    authTag: authTag.toString('hex'),
  };
}`
        }
      },
      {
        heading: '2. Cơ Chế Hai Đầu API Key & Phân Tách Endpoint',
        subheading: 'Tại sao publishable key an toàn tuyệt đối trên browser còn secret key chỉ dùng trên server',
        content: `Hệ thống chia làm hai loại khóa với hai Endpoint hoàn toàn khác biệt:
• **Publishable Key (\`pk_live_...\`)**:
  - Chỉ được phép gọi vào endpoint \`/api/v1/data/:resource\`.
  - Chỉ thực hiện các thao tác qua **Query DSL** và BẮT BUỘC phải đi qua bộ lọc chính sách ABAC.
  - Được phép đặt an toàn trong mã nguồn React/Vue/Frontend di động.
• **Secret Key (\`sk_live_...\`)**:
  - Chỉ được gọi từ Server-side (\`/api/v1/query\` hoặc các tác vụ quản trị).
  - Cho phép thực thi các câu lệnh đặc quyền.
  - **Cơ chế tự hủy an toàn**: Nếu hệ thống phát hiện Secret Key được gửi từ một trình duyệt (Browser Header), hệ thống sẽ từ chối ngay lập tức và tự động thu hồi (Burn) chiếc chìa khóa đó!`,
        mindsetShift: {
          from: 'Lưu API Key dạng thô trong cơ sở dữ liệu để tiện tra cứu.',
          to: 'Chỉ lưu mã băm SHA-256 của API Key. Khi tạo mới, khóa thô chỉ hiển thị duy nhất MỘT LẦN cho người dùng.',
          impact: 'Ngay cả khi cơ sở dữ liệu bị lộ, kẻ tấn công cũng không thể khôi phục lại được API Keys.'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Chạy bài tập diễn tập xoay vòng Master Encryption Key',
        command: 'pnpm drill:rotate',
        description: 'Kiểm tra quy trình giải mã và tái mã hóa toàn bộ dữ liệu bí mật sang phiên bản Key mới'
      },
      {
        title: 'Chạy kiểm thử chứng minh các rào chắn bảo mật và chống SSRF',
        command: 'pnpm proof:ops',
        description: 'Chạy 44 assertions kiểm tra chống SSRF Webhook, chống brute-force và circuit breaker'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ nguyên lý hoạt động của mã hóa AES-256-GCM và vai trò của dữ liệu xác thực AAD.',
      'Giải thích được lý do Publishable Key (pk_) và Secret Key (sk_) được phân tách ở cấp độ hạ tầng.',
      'Nắm vững cơ chế kiểm tra mật khẩu HaveIBeenPwned bằng K-Anonymity.'
    ]
  },
  {
    id: 'appsys-ch4-rbac-abac-policy-compiler',
    chapterNumber: 4,
    title: 'Cơ Chế Phân Quyền Kép RBAC & ABAC: Trình Biên Dịch Query DSL An Toàn',
    subtitle: 'Nghệ thuật phân quyền cấp độ hàng: Kết hợp RBAC (kiểm tra vai trò) và ABAC (kiểm tra điều kiện hàng) với Server-side Policy Injection loại bỏ 100% SQL Injection.',
    level: 'Chuyên gia',
    readTimeMinutes: 18,
    category: 'rbac_abac_policies',
    summary: 'Bộ phân quyền của hệ thống hoạt động theo nguyên tắc Default Deny: Một lệnh từ chối (Deny) luôn đánh bại mọi lệnh cho phép (Allow). Trình biên dịch Query DSL biên dịch các truy vấn JSON từ client thành SQL tham số hóa và tự động chèn mệnh đề điều kiện bảo mật ở phía server.',
    hookStory: 'Một lập trình viên sơ ý viết hàm lấy danh sách tài liệu từ client mà quên thêm điều kiện `where owner_id = currentUser.id`. Trong các hệ thống thông thường, lỗ hổng này (IDOR) sẽ làm lộ toàn bộ dữ liệu của công ty. Nhưng trên Unified-App-Infra, trình biên dịch DSL ở máy chủ tự động đọc chính sách ABAC và tự động chèn thêm điều kiện `AND (owner_id = $1)` vào câu lệnh SQL trước khi gửi tới database. Người dùng chỉ nhìn thấy dữ liệu của chính mình!',
    sections: [
      {
        heading: '1. Không Có Cửa Thoát (No Escape Hatch) Trong Query DSL',
        subheading: 'Tại sao trình biên dịch từ chối mọi chuỗi SQL thô từ phía client',
        content: `Trong thiết kế của \`packages/core\`, Query DSL cố tình **KHÔNG CUNG CẤP** bất kỳ hàm nào như \`raw()\`, \`whereRaw()\` hay các đoạn text tự do:
• Mọi tên cột, tên bảng phải vượt qua biểu thức chính quy (Regex Pattern) kiểm tra định danh nghiêm ngặt.
• Mọi giá trị truyền vào đều trở thành tham số ràng buộc (\`$1\`, \`$2\`, \`$3\` trong Postgres hoặc \`?\` trong LibSQL).
• Chính sách bảo mật (Policy Condition) được gộp trực tiếp vào cây cú pháp (AST) bằng toán tử \`AND\`.
• Một client chỉ có thể thu hẹp (Narrow) tập kết quả chứ **TUYỆT ĐỐI KHÔNG BAO GIỜ MỞ RỘNG (Widen)** phạm vi dữ liệu vượt quá chính sách cho phép.`,
        codeBlock: {
          language: 'typescript',
          title: 'Trình Biên Dịch DSL Tham Số Hóa Kèm Chính Sách ABAC',
          code: `// Client gửi yêu cầu:
// infra.from('tasks').select('id', 'title').eq('status', 'in_progress');

// Server-side Policy:
// { effect: 'allow', condition: { field: 'assignee_id', op: 'eq', value: '$auth.sub' } }

// Trình biên dịch sinh ra câu lệnh SQL hoàn hảo:
// SELECT id, title FROM tasks WHERE (status = $1) AND (assignee_id = $2);
// Parameters: ['in_progress', 'usr_892348123984']`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Chạy bài kiểm thử chứng minh việc thực thi chính sách trên dữ liệu thật',
        command: 'node scripts/live-proof.mjs',
        description: 'Chạy 11 kịch bản kiểm tra cách ly dữ liệu từng người dùng trên cơ sở dữ liệu thật'
      }
    ],
    masteryChecklist: [
      'Phân biệt rõ vai trò giữa RBAC (quyền thao tác) và ABAC (quyền trên từng dòng dữ liệu).',
      'Hiểu rõ cơ chế Server-side Policy Injection bảo vệ chống lỗi IDOR.',
      'Giải thích được lý do Query DSL không cho phép chuỗi SQL thô (No Escape Hatch).'
    ]
  },
  {
    id: 'appsys-ch5-multi-db-adapters-provisioning',
    chapterNumber: 5,
    title: 'Đa Cơ Sở Dữ Liệu & Bộ Chuyển Đổi: Neon, Supabase & Turso Auto-Provisioning',
    subtitle: 'Nghệ thuật xây dựng tầng Database Adapter đa hình: Tự động tạo Neon Project cô lập, Supabase Postgres và Turso LibSQL chỉ bằng một cú click chuột.',
    level: 'Nâng cao',
    readTimeMinutes: 16,
    category: 'multi_database_adapters',
    summary: 'Unified-App-Infra không trói buộc người dùng vào một nhà cung cấp duy nhất. Thông qua hợp đồng interface DatabaseAdapter, hệ thống hỗ trợ mượt mà cả PostgreSQL (Neon, Supabase) lẫn SQLite phân tán (Turso LibSQL), đồng thời tự động gọi API cấp phát database mới khi tạo ứng dụng con.',
    hookStory: 'Khi bạn tạo một ứng dụng con mới trên Admin Dashboard và chọn loại "Neon Postgres", hệ thống ngầm gọi Neon Management API để tạo một Project mới tinh (chứ không phải tạo nhánh con, vì Project mới mang lại sự cô lập tài nguyên và giới hạn hạn ngạch hoàn hảo). Chuỗi kết nối sinh ra lập tức được mã hóa AES-256-GCM và lưu vào Master DB trong vòng chưa đầy 2 giây!',
    sections: [
      {
        heading: '1. Giao Diện Hợp Đồng DatabaseAdapter Chuẩn Hóa',
        subheading: 'Thống nhất các phương thức thực thi giữa PostgreSQL và LibSQL',
        content: `Gói \`packages/adapters\` định nghĩa hợp đồng \`DatabaseAdapter\`:
• \`executeQuery(sql, params)\`: Thực thi câu lệnh đọc/ghi và trả về kết quả chuẩn hóa.
• \`healthCheck()\`: Kiểm tra tính khả dụng của kết nối cơ sở dữ liệu.
• \`getSchema()\`: Đọc siêu dữ liệu về danh sách các bảng và kiểu cột để phục vụ giao diện quản trị.
• \`provision(appName)\`: Tự động gọi API của nhà cung cấp để khởi tạo cơ sở dữ liệu mới độc lập.`,
        codeBlock: {
          language: 'typescript',
          title: 'Cấu Trúc Adapter PostgreSQL Chuẩn Trong packages/adapters',
          code: `export interface DatabaseAdapter {
  execute<T = any>(statement: CompiledStatement): Promise<QueryResult<T>>;
  healthCheck(): Promise<boolean>;
  getSchema(): Promise<TableSchema[]>;
}

export class PostgresAdapter implements DatabaseAdapter {
  constructor(private readonly connectionString: string) {}

  async execute<T = any>(statement: CompiledStatement): Promise<QueryResult<T>> {
    // Kết nối an toàn qua pg/neon driver và thực thi SQL tham số hóa
    // ...
  }
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Chạy thử nghiệm kiểm tra kết nối tới tất cả các nhà cung cấp DB',
        command: 'pnpm smoke',
        description: 'Chạy smoke test kết nối đồng thời tới Neon, Supabase và Turso'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ thiết kế đa hình (Polymorphism) của interface DatabaseAdapter.',
      'Nắm vững cơ chế Auto-provisioning tạo Neon Project và Turso scoped token.',
      'Biết cách thêm một Adapter cơ sở dữ liệu mới vào hệ thống.'
    ]
  },
  {
    id: 'appsys-ch6-centralized-auth-better-auth',
    chapterNumber: 6,
    title: 'Hệ Thống Định Danh Tập Trung: Better Auth, OAuth, TOTP & WebAuthn',
    subtitle: 'Xây dựng trung tâm danh tính bảo mật đỉnh cao: Đăng nhập Google/GitHub/Microsoft OAuth, mã xác thực TOTP hai lớp, Passkeys và xoay vòng Refresh Token chống Replay Attack.',
    level: 'Chuyên gia',
    readTimeMinutes: 18,
    category: 'centralized_auth_mfa',
    summary: 'Gói @infra/auth tích hợp giải pháp Better Auth hiện đại nhất hiện nay, cung cấp đầy đủ các phương thức xác thực: Email/Password chống brute-force, OAuth 2.0 đa nền tảng, mã TOTP dự phòng, WebAuthn Passkeys sinh trắc học và cơ chế phát hiện tái sử dụng Token (Replay Attack Detection).',
    hookStory: 'Một kẻ gian đánh cắp được Refresh Token của người dùng từ một chiếc máy tính công cộng. Khi hắn gửi request cố gắng đổi lấy Access Token mới, hệ thống phát hiện Token này đã từng được sử dụng trước đó (Reused Token). Cơ chế "Family Revocation" lập tức kích hoạt: Toàn bộ phiên đăng nhập của người dùng trên tất cả các thiết bị đều bị thu hồi ngay tức khắc, bảo vệ tài khoản an toàn tuyệt đối!',
    sections: [
      {
        heading: '1. Cơ Chế Refresh Token Rotation & Family Revocation',
        subheading: 'Chống rò rỉ phiên đăng nhập trên các thiết bị',
        content: `Mỗi khi Access Token (hạn 15 phút) hết hạn, client sử dụng Refresh Token để đổi lấy cặp Access Token + Refresh Token mới:
1. Mỗi Refresh Token chỉ có giá trị sử dụng **ĐÚNG MỘT LẦN**.
2. Khi Refresh Token được đổi, nó được đánh dấu là "đã tiêu thụ".
3. Nếu một Refresh Token đã tiêu thụ lại xuất hiện lần thứ hai (dấu hiệu kẻ gian đang cố gắng replay token bị lộ), hệ thống coi toàn bộ cây phiên (Token Family) bị xâm nhập và lập tức hủy bỏ tất cả các phiên đăng nhập của tài khoản đó.`,
        codeBlock: {
          language: 'typescript',
          title: 'Kiểm Tra Xác Thực & Xoay Vòng Token Trong packages/auth',
          code: `// Tự động kiểm tra tính hợp lệ và xoay vòng Refresh Token
export async function handleTokenRefresh(refreshToken: string) {
  const session = await findSessionByRefreshToken(refreshToken);
  
  if (session.isRevoked || session.isConsumed) {
    // Phát hiện Replay Attack! Thu hồi toàn bộ phiên trong gia đình Token
    await revokeAllSessionsForUser(session.userId);
    throw new SecurityException('Phát hiện tái sử dụng Token khả nghi! Đã thu hồi toàn bộ phiên.');
  }

  // Đánh dấu token cũ đã dùng và tạo cặp token mới
  return generateNewTokenPair(session.userId, session.appId);
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Chạy kiểm thử chứng minh toàn bộ luồng Auth và chống Replay',
        command: 'pnpm proof:auth',
        description: 'Chạy 28 assertions kiểm tra đăng nhập, xoay vòng token và thu hồi gia đình token'
      },
      {
        title: 'Chạy kiểm thử luồng xác thực hai bước TOTP và mã dự phòng',
        command: 'pnpm proof:mfa',
        description: 'Chạy 27 assertions kiểm tra đăng ký TOTP, chống replay mã OTP và mã backup'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ cơ chế Refresh Token Rotation và Family Revocation chống tấn công Replay.',
      'Cấu hình xác thực hai bước TOTP và WebAuthn Passkeys.',
      'Giải thích được cách thức đồng bộ người dùng giữa Hub trung tâm và các ứng dụng con.'
    ]
  },
  {
    id: 'appsys-ch7-zero-dep-client-sdk',
    chapterNumber: 7,
    title: 'Thiết Kế Bộ Client SDK (@infra/sdk) Siêu Nhẹ: Zero-Dependency',
    subtitle: 'Nghệ thuật xây dựng thư viện SDK cho lập trình viên: Không phụ thuộc thư viện ngoài, hỗ trợ cả Browser và Server, Single-flight Token Refresh và Fluent Query Builder.',
    level: 'Nâng cao',
    readTimeMinutes: 16,
    category: 'client_sdk_design',
    summary: 'Gói @infra/sdk được thiết kế với triết lý Zero Runtime Dependencies: Dung lượng siêu nhẹ (<15KB), chạy mượt mà trên trình duyệt, Node.js, Cloudflare Workers và Deno, tự động làm mới Token thông minh (Single-flight Refresh) khi có nhiều request đồng thời.',
    hookStory: 'Khi mở một trang Dashboard phức tạp, có 10 component cùng lúc thực hiện 10 lệnh gọi API. Đúng lúc đó Access Token bị hết hạn. Nếu không xử lý khéo, ứng dụng sẽ gửi 10 request làm mới token cùng lúc gây lãng phí và lỗi xung đột. Bộ Token Manager trong @infra/sdk sử dụng kỹ thuật Single-flight Promise: Gom 10 yêu cầu lại và chỉ gửi đúng 1 request làm mới token duy nhất, sau đó chia sẻ kết quả cho cả 10 truy vấn.',
    sections: [
      {
        heading: '1. Kiến Trúc Fluent Query Builder Của @infra/sdk',
        subheading: 'Cú pháp trực quan mang lại trải nghiệm viết code (DX) tuyệt vời',
        content: `SDK cung cấp cú pháp móc xích (Chaining Methods) tương tự Supabase / Prisma:
• \`infra.from(tableName)\`: Chỉ định bảng cần truy vấn.
• \`.select('col1', 'col2')\`: Chọn các trường dữ liệu.
• \`.eq(field, val)\`, \`.neq()\`, \`.gt()\`, \`.gte()\`, \`.lt()\`, \`.lte()\`, \`.in()\`: Các điều kiện lọc.
• \`.order(field, 'asc' | 'desc')\`: Sắp xếp thứ tự.
• \`.limit(n)\`, \`.offset(n)\`: Phân trang.
• \`.execute()\`: Đóng gói thành AST JSON và gửi tới Data Gateway qua HTTP POST.`,
        codeBlock: {
          language: 'typescript',
          title: 'Sử Dụng SDK Trong Server Component / API Route',
          code: `import { createServerInfraClient } from '@infra/sdk/server';

export async function getUserOrders(userId: string) {
  const infraServer = createServerInfraClient({
    baseUrl: process.env.INFRA_URL!,
    apiKey: process.env.INFRA_SECRET_KEY!, // sk_live_... dùng trên server
  });

  const { data, error } = await infraServer
    .from('orders')
    .select('id', 'total_amount', 'status', 'created_at')
    .eq('customer_id', userId)
    .order('created_at', 'desc')
    .execute();

  if (error) throw new Error(error.message);
  return data;
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Chạy kiểm thử các trường hợp sử dụng của SDK',
        command: 'pnpm --filter @infra/sdk test',
        description: 'Chạy toàn bộ test suite của Client SDK bao gồm Token Manager và Query Builder'
      }
    ],
    masteryChecklist: [
      'Nắm vững cách tổ chức SDK Zero-dependency để tối ưu kích thước gói bundle.',
      'Hiểu rõ cơ chế Single-flight Token Refresh tránh gửi trùng lặp request.',
      'Sử dụng thành thạo Browser Client và Server Client của @infra/sdk.'
    ]
  },
  {
    id: 'appsys-ch8-admin-dashboard-operations',
    chapterNumber: 8,
    title: 'Bảng Điều Khiển Quản Trị: Apps Management & Audited Impersonation',
    subtitle: 'Vận hành toàn bộ hệ sinh thái: Đăng ký ứng dụng mới, cấp phát API Keys, giám sát lưu lượng, trực quan hóa SQL của chính sách và cơ chế mạo danh có kiểm toán.',
    level: 'Trung bình',
    readTimeMinutes: 15,
    category: 'admin_dashboard_ops',
    summary: 'Ứng dụng apps/web cung cấp giao diện quản trị hiện đại: Cho phép tạo ứng dụng con, gắn cơ sở dữ liệu, quản lý Service Accounts, xem trước câu lệnh SQL biên dịch từ chính sách ABAC và hỗ trợ tính năng Audited Impersonation để hỗ trợ kỹ thuật khách hàng an toàn.',
    hookStory: 'Một khách hàng báo lỗi: "Tôi không nhìn thấy tài liệu của mình sau khi nâng cấp tài khoản". Thay vì hỏi xin mật khẩu của khách hàng (cực kỳ mất an toàn), quản trị viên sử dụng tính năng **Audited Impersonation**: Tạo một phiên đăng nhập tạm thời dưới danh nghĩa khách hàng có thời hạn 15 phút. Toàn bộ thao tác trong 15 phút này được ghi nhật ký kiểm toán bất biến (Audit Log) để đảm bảo tính minh bạch tuyệt đối.',
    sections: [
      {
        heading: '1. Các Tính Năng Quản Trị Cốt Lõi Trên Dashboard',
        subheading: 'Bộ công cụ vận hành hoàn chỉnh cho quản trị viên',
        content: `• **App Registry**: Quản lý danh sách các ứng dụng con, cấu hình tên miền được phép (Allowed Origins / CORS).
• **API Key Manager**: Tạo khóa \`pk_live_\` và \`sk_live_\`, thu hồi khóa cũ, cấu hình Rate Limiting theo từng app.
• **Database Attacher**: Kết nối cơ sở dữ liệu có sẵn hoặc kích hoạt tự động cấp phát Neon / Turso mới.
• **Policy Visualizer**: Trực quan hóa câu lệnh SQL thực tế mà chính sách ABAC sẽ sinh ra.
• **Audit Logger**: Ghi nhận thời gian, địa chỉ IP, loại thao tác và độ trễ (không ghi lại dữ liệu nhạy cảm của khách hàng).`,
        storyQuote: {
          quote: 'Nhật ký kiểm toán chỉ ghi nhận hình dạng câu lệnh (Statement Shape), số dòng bị ảnh hưởng và thời gian thực thi — tuyệt đối không bao giờ ghi lại nội dung tham số, khóa bảo mật hay chuỗi kết nối.',
          speaker: 'Tiêu chuẩn bảo mật Unified-App-Infra',
          role: 'Audit Log Protocol',
          year: '2026'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Mở giao diện quản trị cơ sở dữ liệu Drizzle Studio',
        command: 'pnpm db:studio',
        description: 'Khởi động Drizzle Studio tại localhost:4983 để duyệt trực quan 31 bảng của Master DB'
      }
    ],
    masteryChecklist: [
      'Quản lý vòng đời ứng dụng con và phát hành API Keys trên Dashboard.',
      'Sử dụng Policy Visualizer để kiểm tra độ an toàn của chính sách phân quyền.',
      'Hiểu rõ quy trình và nguyên tắc bảo mật của tính năng Audited Impersonation.'
    ]
  },
  {
    id: 'appsys-ch9-testing-live-infrastructure-runbooks',
    chapterNumber: 9,
    title: 'Quy Trình Kiểm Thử Live Infrastructure & Sổ Tay Vận Hành (Runbooks)',
    subtitle: 'Nâng tầm độ tin cậy hệ thống: 550 bài Unit Tests, bộ kịch bản Proof Scripts chạy trên hạ tầng thật, quy trình khẩn cấp xoay vòng Master Key và bảo trì tự động.',
    level: 'Chuyên gia',
    readTimeMinutes: 18,
    category: 'testing_runbooks',
    summary: 'Hệ thống áp dụng triết lý "Test on Real Infrastructure": Không chỉ dựa vào các hàm Mock giả lập, toàn bộ luồng Auth, MFA, Data Gateway, Webhooks và Email đều được chạy kiểm thử trên cơ sở dữ liệu thật với bộ 5 kịch bản Proof Scripts đạt 99/99 assertions hoàn hảo.',
    hookStory: 'Một lập trình viên từng tự tin: "Code của tôi pass 518 bài unit tests màu xanh lét!". Nhưng khi đưa lên môi trường thật, chức năng hết hạn mạo danh và bộ đếm rate-limit bị sập vì đối tượng Date truyền vào câu lệnh sql template bị Postgres từ chối. Nhờ việc bổ sung bộ kiểm thử tích hợp trên Postgres thật (packages/db/tests/integration.test.ts) và 5 kịch bản Proof Scripts, toàn bộ các lỗi tiềm ẩn đều bị vạch trần và khắc phục triệt để trước khi ra mắt.',
    sections: [
      {
        heading: '1. Bộ Năm Kịch Bản Proof Scripts Trên Hạ Tầng Thật',
        subheading: '99 Assertions kiểm thử độc lập không khoan nhượng',
        content: `Hệ thống sở hữu bộ kịch bản kiểm thử độc nhất vô nhị:
1. \`pnpm verify:live\`: Kiểm tra trạng thái đồng bộ Schema và 14 migrations trên Neon Master DB.
2. \`node scripts/live-proof.mjs\` (11 checks): Kiểm tra ép buộc chính sách cách ly dữ liệu từng chủ sở hữu trên tenant database thật.
3. \`pnpm proof:auth\` (28 checks): Kiểm tra toàn bộ luồng đăng nhập, xoay vòng token, replay attack và thu hồi token.
4. \`pnpm proof:mfa\` (27 checks): Kiểm tra đăng ký TOTP, chống replay mã 6 số và mã backup dự phòng.
5. \`pnpm proof:ops\` (44 checks): Kiểm tra hàng rào mạo danh, chống SSRF Webhook, retry backoff và circuit breaker.`,
        codeBlock: {
          language: 'bash',
          title: 'Quy Trình Chạy Bộ Kiểm Thử Hạ Tầng Thật Trước Khi Deploy',
          code: `# 1. Kiểm tra schema và migrations
pnpm verify:live

# 2. Chạy toàn bộ 5 bộ Proof Scripts
node scripts/live-proof.mjs
pnpm proof:auth
pnpm proof:mfa
pnpm proof:ops

# 3. Chạy kiểm tra gửi email thật qua Resend
pnpm proof:mail you@example.com`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Chạy kiểm thử gửi email thật qua dịch vụ Resend',
        command: 'pnpm proof:mail test@yourdomain.com',
        description: 'Xác minh đường truyền gửi email phục hồi mật khẩu qua Resend API'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ sự khác biệt giữa kiểm thử Mock và kiểm thử trên Live Infrastructure.',
      'Thành thạo chạy và đọc kết quả của 5 kịch bản Proof Scripts.',
      'Nắm vững quy trình xử lý sự cố trong sổ tay vận hành (docs/runbooks.md).'
    ]
  },
  {
    id: 'appsys-ch10-future-roadmap-expansion',
    chapterNumber: 10,
    title: 'Bản Đồ Tương Lai (Roadmap) & 6 Tính Năng Đột Phá Nên Làm Thêm',
    subtitle: 'Định hướng nâng cấp Unified-App-Infra thành siêu nền tảng Cloud BaaS toàn diện: File Storage Gateway, Async Task Queue, Realtime CDC, AI Vector Extension, Edge Caching và Multi-tenant Billing.',
    level: 'Chuyên gia',
    readTimeMinutes: 20,
    category: 'future_roadmap_expansion',
    summary: 'Unified-App-Infra đã hoàn thiện xuất sắc 8 giai đoạn nền tảng cốt lõi. Đây là cẩm nang kiến trúc và lộ trình gợi ý 6 mảnh ghép chiến lược để nâng tầm hệ thống thành một nền tảng Backend-as-a-Service thương mại hoàn chỉnh.',
    hookStory: 'Bạn đã có trong tay một Authentication Hub mạnh mẽ và Data Gateway đa cơ sở dữ liệu. Nhưng khi các ứng dụng con muốn người dùng upload ảnh đại diện, gửi thông báo đẩy thời gian thực, chạy các tác vụ nền gửi email ngầm hay tích hợp chatbot AI, họ sẽ cần gì tiếp theo? Dưới đây là 6 đề xuất nâng cấp đáng giá nhất được thiết kế riêng cho kiến trúc của Unified-App-Infra.',
    sections: [
      {
        heading: '1. Gợi Ý 1: Unified Storage Gateway (S3 / Cloudflare R2 / Supabase Storage)',
        subheading: 'Giải pháp lưu trữ file và media tập trung có kiểm soát phân quyền',
        content: `• **Vấn đề hiện tại**: Các ứng dụng con chưa có cách upload và quản lý file nhị phân (ảnh, PDF, video) tập trung.
• **Kiến trúc đề xuất**:
  - Xây dựng package \`@infra/storage\` hoặc mở rộng endpoint \`/api/v1/storage/:bucket\`.
  - Hỗ trợ các Storage Adapters: **Cloudflare R2** (không tốn phí băng thông tải về Egress $0), **AWS S3**, hoặc **Supabase Storage**.
  - Áp dụng chính sách ABAC Policy cho file: Người dùng chỉ được sinh Presigned URL upload/download vào thư mục mang \`auth.uid()\` của mình.
  - Tự động nén ảnh (Image Transformation) và tạo hình thu nhỏ (Thumbnail) qua Edge Middleware.`,
        codeBlock: {
          language: 'typescript',
          title: 'Gợi Ý Thiết Kế API Upload File Cho @infra/sdk Tương Lai',
          code: `// Gợi ý cú pháp SDK tương lai:
const { url, fileId } = await infra
  .storage('avatars')
  .upload('profile.png', fileBody, {
    maxSizeBytes: 5 * 1024 * 1024, // Giới hạn 5MB
    contentType: 'image/png'
  });`
        }
      },
      {
        heading: '2. Gợi Ý 2: Event-Driven Task Queue & Background Jobs (Upstash QStash / BullMQ)',
        subheading: 'Xử lý các tác vụ ngầm bất đồng bộ không làm nghẽn HTTP Request',
        content: `• **Vấn đề hiện tại**: Các tác vụ nặng như gửi email hàng loạt, xử lý báo cáo, resize video hay đồng bộ dữ liệu bên thứ ba đang chạy trực tiếp trong luồng HTTP gây nguy cơ timeout.
• **Kiến trúc đề xuất**:
  - Tích hợp **Upstash QStash** (Serverless Message Queue hoàn hảo cho Vercel/Next.js) hoặc **BullMQ + Redis**.
  - Cung cấp API \`infra.queue.publish('send-welcome-campaign', payload, { delay: '5m' })\`.
  - Tự động thử lại (Retry with Exponential Backoff) khi tác vụ bị lỗi và lưu Dead-Letter Queue (DLQ).`
      },
      {
        heading: '3. Gợi Ý 3: Realtime CDC WebSockets Subscription Gateway',
        subheading: 'Đồng bộ dữ liệu thời gian thực tới trình duyệt khách hàng',
        content: `• **Vấn đề hiện tại**: Client SDK hiện tại phải gửi HTTP request mỗi khi muốn lấy dữ liệu mới (Pull model).
• **Kiến trúc đề xuất**:
  - Xây dựng **Realtime Gateway** trên nền WebSocket (sử dụng Cloudflare Durable Objects hoặc Socket.io Cluster).
  - Lắng nghe luồng thay đổi Postgres WAL (Logical Replication) từ Neon/Supabase hoặc LibSQL CDC.
  - Tự động phát sóng (Broadcast) sự kiện \`INSERT / UPDATE / DELETE\` tới client của ứng dụng con có kèm lọc theo chính sách ABAC.`,
        codeBlock: {
          language: 'typescript',
          title: 'Gợi Ý Cú Pháp Realtime Subscription Cho @infra/sdk',
          code: `// Gợi ý cú pháp Realtime trong tương lai:
const subscription = infra
  .from('notifications')
  .on('INSERT', (newNotification) => {
    console.log('Thông báo mới:', newNotification);
    showToast(newNotification.title);
  })
  .subscribe();`
        }
      },
      {
        heading: '4. Gợi Ý 4: AI & Vector Embeddings Extension (pgvector / Turso Vector)',
        subheading: 'Biến mọi ứng dụng con thành cỗ máy tìm kiếm ngữ nghĩa và RAG thông minh',
        content: `• **Vấn đề hiện tại**: Để làm tính năng tìm kiếm thông minh bằng AI, các ứng dụng con phải tự cấu hình OpenAI và vector database riêng.
• **Kiến trúc đề xuất**:
  - Mở rộng Query DSL hỗ trợ toán tử tìm kiếm tương đồng vector: \`.similarTo('embedding', queryVector, { threshold: 0.8 })\`.
  - Tích hợp tự động sinh vector nhúng (Embeddings) qua Cloudflare Workers AI hoặc OpenAI API ngay khi bản ghi được chèn vào database.
  - Tận dụng extension \`pgvector\` trên Neon/Supabase và Vector extensions trên Turso.`
      },
      {
        heading: '5. Gợi Ý 5: Edge Data Caching & Distributed Rate Limiting (Cloudflare / Vercel KV)',
        subheading: 'Tăng tốc độ đọc dữ liệu lên dưới 10ms và bảo vệ hạ tầng toàn cầu',
        content: `• **Kiến trúc đề xuất**:
  - Bổ sung tầng bộ nhớ đệm Cache-Aside trên Edge Key-Value (Vercel KV / Upstash Redis).
  - Tự động gắn tag và xóa cache (Invalidate Cache) khi có thao tác ghi dữ liệu.
  - Cấu hình Rate Limiting phân tán theo IP, User ID và API Key với thuật toán Sliding Window Counter.`
      },
      {
        heading: '6. Gợi Ý 6: Multi-Tenant Usage Metering & Stripe Billing Integration',
        subheading: 'Thương mại hóa nền tảng và kiểm soát chi phí từng dự án con',
        content: `• **Kiến trúc đề xuất**:
  - Theo dõi mức tiêu thụ của từng ứng dụng con: Số lượng API Requests, dung lượng Database Storage, số giờ Compute Unit, số lượng emails gửi đi.
  - Tích hợp **Stripe Usage-Based Metering**: Tự động tính phí và xuất hóa đơn cho các nhóm khách hàng hoặc quản lý ngân sách chi tiêu của từng side project để không bao giờ bị vượt ngưỡng miễn phí (Free Tier Limits).`,
        storyQuote: {
          quote: 'Một hệ thống hạ tầng xuất sắc không bao giờ là một điểm dừng cố định, mà là một nền móng vững chắc liên tục tiến hóa cùng với những ước mơ phần mềm của bạn.',
          speaker: 'Bách Khoa Toàn Thư Unified-App-Infra',
          role: 'Lời kết kiến trúc',
          year: '2026'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Xem tiến độ hoàn thành các giai đoạn phát triển trong tài liệu dự án',
        command: 'cat process.md',
        description: 'Đọc nhật ký tiến độ 8 giai đoạn đã hoàn thiện của Unified-App-Infra'
      },
      {
        title: 'Xem sơ đồ kiến trúc kỹ thuật chi tiết của hệ thống',
        command: 'cat tech.md',
        description: 'Đọc tài liệu phân tích kỹ thuật chi tiết 53.000 ký tự của dự án'
      }
    ],
    masteryChecklist: [
      'Nắm vững toàn bộ 6 đề xuất nâng cấp chiến lược cho hệ thống trong tương lai.',
      'Hiểu rõ cách tích hợp Unified Storage Gateway và Event-Driven Task Queue.',
      'Tự tin làm chủ, vận hành, bảo trì và phát triển mở rộng nền tảng Unified-App-Infra.'
    ]
  }
];
