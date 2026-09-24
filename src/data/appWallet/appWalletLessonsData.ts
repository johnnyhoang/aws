import { AppWalletLesson } from '../../types/appWalletModule';

export const APP_WALLET_LESSONS: AppWalletLesson[] = [
  {
    id: 'aw-ch1-triet-ly-personal-app-store',
    chapterNumber: 1,
    title: 'Chương 1: Triết Lý Personal App Store & Showcase Năng Lực Toàn Diện',
    subtitle: 'Kho Tàng Ứng Dụng Cá Nhân, Bộ Nhớ Kỹ Thuật Số và Hồ Sơ Năng Lực Kỹ Sư Thực Chiến',
    readingTimeMinutes: 14,
    summary: 'Khám phá triết lý xây dựng App Wallet như một App Store cá nhân: Nơi lưu giữ trọn vẹn trí tuệ phát triển phần mềm và trình diễn năng lực IT đỉnh cao cho thầy cô, đối tác và nhà tuyển dụng.',
    content: `## 1.1 Vấn Đề Cốt Lõi: Nỗi Ám Ảnh Phân Tán Tri Thức Phần Mềm

Khi một kỹ sư phần mềm liên tục nghiên cứu, thiết kế và phát triển hàng chục ứng dụng qua nhiều năm tháng, họ thường đối mặt với một bi kịch vô hình:
1. **Sự lãng quên tri thức (Knowledge Decay):** Sau vài tháng hoặc vài năm, những chi tiết kiến trúc tinh tế, các quyết định thiết kế database (ADRs), các cấu hình biến môi trường hay thủ thuật tối ưu code trong quá khứ dần bị mai một. Khi cần tái sử dụng một giải pháp cũ, lập trình viên phải đào bới hàng trăm commit git một cách mất thời gian.
2. **Thiếu một "Showroom" tập trung:** Khi cần giới thiệu năng lực thực chiến với thầy cô tại Đại học Mỹ, nhà tuyển dụng công nghệ cao hoặc đối tác/khách hàng, việc gửi hàng loạt đường link GitHub riêng lẻ hay các domain rời rạc tạo cảm giác thiếu chuyên nghiệp và không thể hiện được bức tranh tổng thể về tầm vóc kiến trúc của tác giả.
3. **Mất dấu lộ trình phát triển tương lai:** Những ý tưởng nâng cấp, tính năng mở rộng của từng app bị ghi chú rải rác trên giấy nháp, file Note cá nhân hay các công cụ bên thứ ba, dễ bị thất lạc.

**JohnnyHoang App Wallet** ra đời để đóng vai trò là một **Personal App Store & Master Repository** — một "Ví Ứng Dụng" kỹ thuật số trung tâm, nơi gom tụ toàn bộ các tác phẩm công nghệ trong quá khứ, hiện tại và mở rộng không giới hạn trong tương lai.

---

## 1.2 Ba Trụ Cột Định Vị Của App Wallet

### 1. Bộ Nhớ Kỹ Thuật Số (Digital Second Brain)
Lưu trữ trọn vẹn mọi thông tin của từng ứng dụng: từ ý tưởng ban đầu, tech-stack sử dụng, cấu trúc bảng dữ liệu SQL, danh sách API contracts, đường dẫn thư mục local trên ổ đĩa (\`D:\\Hoa Hoang\\Apps\\...\`), remote GitHub repo, đến production domain triển khai trên Vercel/Cloud. Bạn sẽ không bao giờ bị quên bất kỳ điều gì về đứa con tinh thần của mình.

### 2. Hồ Sơ Năng Lực Sống (Live Interactive Engineering Portfolio)
Biến danh mục sản phẩm thành một bảng điều khiển tương tác trực quan. Bất kỳ ai — từ giáo sư đại học, nhà tuyển dụng Silicon Valley, cho đến đối tác doanh nghiệp — khi truy cập vào App Wallet đều có thể ngay lập tức:
- Trực tiếp trải nghiệm sản phẩm chạy thật trên Production.
- Xem xét hồ sơ đặc tả kỹ thuật phần mềm (SRS) chuẩn công nghiệp.
- Đánh giá năng lực tư duy kiến trúc hệ thống, khả năng viết code sạch và năng lực vận hành hạ tầng Cloud/DevOps.

### 3. Trung Tâm Phóng Ý Tưởng & Mở Rộng Tương Lai (Innovation Launchpad)
Tích hợp động cơ AI để nhanh chóng phác thảo ý tưởng mới, tự động sinh tài liệu yêu cầu kỹ thuật (SRS) và theo dõi backlog phát triển cho các phiên bản tiếp theo.

---

## 1.3 Thông Điệp Gửi Gắm Tới Thầy Cô, Khách Hàng & Đối Tác

App Wallet không phải là một danh sách đồ án lý thuyết trên giấy. Đây là minh chứng hùng hồn nhất cho:
- **Năng lực Full-Stack & Cloud Architecture:** Khả năng làm chủ từ hạ tầng đám mây (AWS, Azure, Vercel), cơ sở dữ liệu phân tán (Supabase, Neon Postgres), hệ thống máy chủ Linux cho đến giao diện người dùng React 19 tốc độ cao.
- **Năng lực Quản trị & Vận hành (Production Ops):** Khả năng đưa sản phẩm từ mã nguồn local lên môi trường Production với HTTPS, CI/CD tự động và khả năng chịu tải thực tế.
- **Tốc độ làm chủ công nghệ mới:** Khả năng tích hợp sâu các mô hình AI tiên tiến (Gemini 2.5 Flash, GPT-4o-mini, MCP Servers) vào quy trình phát triển phần mềm hiện đại.`,
    keyTakeaways: [
      'App Wallet là chiếc "App Store cá nhân" lưu giữ trọn vẹn mọi sản phẩm đã và sẽ phát triển.',
      'Đóng vai trò Digital Second Brain chống lãng quên tri thức kiến trúc phần mềm.',
      'Showcase tương tác sống động chứng minh năng lực IT toàn diện trước thầy cô, khách hàng và nhà tuyển dụng.'
    ]
  },
  {
    id: 'aw-ch2-app-card-architecture',
    chapterNumber: 2,
    title: 'Chương 2: Cấu Trúc Bản Ghi Dự Án – Single Source of Truth',
    subtitle: 'Chuẩn Hóa Dữ Liệu: Local Path, GitHub Repo, Live Domain & Tech Stack',
    readingTimeMinutes: 13,
    summary: 'Tìm hiểu cách App Wallet chuẩn hóa cấu trúc dữ liệu của từng ứng dụng, tạo nên nguồn chân lý duy nhất (Single Source of Truth) cho toàn bộ hệ sinh thái.',
    content: `## 2.1 Cấu Trúc Siêu Dữ Liệu Hoàn Hảo (App Entity Contract)

Mỗi ứng dụng trong App Wallet được lưu trữ với một bộ thuộc tính chuẩn mực, bao quát toàn bộ vòng đời phát triển:

\`\`\`typescript
export interface AppProject {
  id: string;                      // Khóa định danh duy nhất
  user_id: string;                 // Chủ sở hữu
  name: string;                    // Tên hiển thị sản phẩm (VD: "AWS Cloud Mastery")
  slug: string;                    // Slug chuẩn hóa (VD: "aws-mastery")
  description: string;             // Mô tả giá trị cốt lõi và bài toán giải quyết
  category: 'cloud_infra' | 'baas_database' | 'ai_tools' | 'productivity';
  local_path: string;              // Đường dẫn ổ cứng (VD: "D:\\Hoa Hoang\\Apps\\aws")
  github_url: string;              // Kho mã nguồn GitHub
  vercel_url: string;              // Bảng điều khiển quản trị Vercel
  production_domain: string;       // Tên miền chạy thực tế có SSL
  tech_stack: string[];            // Danh sách công nghệ (React 19, Supabase, Tailwind...)
  status: 'idea' | 'planning' | 'in_progress' | 'live' | 'archived';
  srs_markdown: string;            // Hồ sơ đặc tả kỹ thuật 8 phần bằng Markdown
  highlights: string[];            // Các điểm sáng kiến trúc nổi bật để demo khách hàng
  created_at: string;
  updated_at: string;
}
\`\`\`

---

## 2.2 Năm Trạng Thái Vòng Đời Dự Án (Project Lifecycle Matrix)

1. **\`idea\` (Vùng ươm mầm):** Nơi lưu giữ các ý tưởng đột phá vừa nảy ra trong đầu, chưa viết code nhưng đã có mô tả bài toán và giải pháp sơ bộ.
2. **\`planning\` (Thiết kế & Kiến trúc):** Đang sử dụng AI App Builder để sinh hồ sơ SRS, thiết kế ERD database và API endpoints.
3. **\`in_progress\` (Đang xây dựng):** Đang trực tiếp lập trình, kết nối GitHub repo và triển khai bản thử nghiệm (Staging).
4. **\`live\` (Sản phẩm vận hành thực tế):** Đã deploy lên môi trường Production, gắn custom domain, kiểm thử tải và sẵn sàng cho người dùng cuối trải nghiệm.
5. **\`archived\` (Bảo tàng tri thức):** Các dự án đã hoàn thành sứ mệnh lịch sử hoặc mã nguồn mẫu, được lưu giữ cẩn thận để tái sử dụng module khi cần.

---

## 2.3 Phân Tầng Lĩnh Vực Công Nghệ

Hệ sinh thái được phân chia thành 4 danh mục chiến lược:
- **Cloud & Infrastructure:** AWS Solutions, Azure Enterprise, Linux Server Admin, Web Domain Gateway.
- **BaaS & High-Scale Database:** Supabase Postgres, Neon Serverless DB, App System BaaS, Universal Free-DB Gateway.
- **AI & Automation:** AI App Builder, Prompt Studio, MCP Servers, Agent Swarms.
- **Productivity & Dev Tools:** Email Systems Mastery, Resend Modern APIs, Open Source FOSS Hub.`,
    keyTakeaways: [
      'Bộ thuộc tính toàn diện kết nối 4 điểm: Local Folder -> Git Repo -> Cloud Deploy -> Live Domain.',
      '5 trạng thái vòng đời phản ánh chính xác tiến độ phát triển từ ý tưởng đến thực tế.',
      'Phân chia danh mục logic giúp người xem nhanh chóng định vị chuyên môn kỹ thuật.'
    ]
  },
  {
    id: 'aw-ch3-ecosystem-encyclopedia',
    chapterNumber: 3,
    title: 'Chương 3: Bách Khoa Hệ Sinh Thái 17+ Ứng Dụng Đã Xây Dựng',
    subtitle: 'Bản Đồ Tổng Quan Các Sản Phẩm Công Nghệ Đỉnh Cao Trong Hệ Thống JohnnyHoang',
    readingTimeMinutes: 16,
    summary: 'Khám phá chi tiết danh mục 17+ ứng dụng trong hệ sinh thái JohnnyHoang: Mục tiêu bài toán, công nghệ áp dụng và tính ứng dụng thực tiễn.',
    content: `## 3.1 Bức Tranh Toàn Cảnh Hệ Sinh Thái

Hệ sinh thái ứng dụng của Johnny Hoang đại diện cho một hành trình liên tục làm chủ công nghệ từ nền tảng máy chủ vật lý đến đám mây và trí tuệ nhân tạo.

### Cụm 1: Nền Tảng & Hệ Thống Cốt Lõi (Foundations & Systems)
1. **IT & Cloud Nền Tảng (Tập 1):** Nền tảng mạng máy tính TCP/IP, hệ điều hành và kiến trúc máy chủ chuẩn bị cho Cloud.
2. **Web & Quản Trị Domain (Tập 2):** DNS, HTTP/3, Web Server Nginx, Caddy và chứng chỉ SSL/TLS tự động.
3. **Cơ Sở Dữ Liệu & Gateway (Tập 3):** SQL, NoSQL, Vector Search và Universal DB MCP Gateway.
4. **Quản Trị Linux Server (Tập 4):** Shell scripting, Kernel tuning, Systemd và quản trị máy chủ Linux Production.

### Cụm 2: Điện Toán Đám Mây Doanh Nghiệp (Cloud & DevOps)
5. **AWS Cloud Mastery (Tập 5):** Kiến trúc giải pháp AWS chuẩn Well-Architected Framework, chuẩn bị cho các chứng chỉ Solutions Architect.
6. **Open Source & FOSS (Tập 6):** Tư tưởng mã nguồn mở, Git workflow nâng cao và kỹ năng đóng góp cho các dự án lớn.
7. **Email & Mail Server Systems (Tập 7):** Giao thức SMTP, SPF/DKIM/DMARC chống spam, cấu hình Postfix và bảo mật máy chủ gửi thư.
8. **Vercel Cloud & Edge Platform (Tập 8):** Next.js App Router, Serverless Functions, Edge Network và kiến trúc Monorepo.
9. **Microsoft Azure Cloud (Tập 13):** Hạ tầng Azure cho doanh nghiệp lớn, lộ trình chinh phục AZ-900 / AZ-104 / AZ-305.

### Cụm 3: BaaS & Cơ Sở Dữ Liệu Hiện Đại (Modern BaaS & Databases)
10. **Resend & Modern Email APIs (Tập 9):** Tích hợp React Email, REST endpoints, Webhooks và đo lường tỷ lệ inbox.
11. **Supabase — Open Source Firebase (Tập 10):** PostgreSQL, Row Level Security đa tầng, Supabase Auth và Realtime Engine.
12. **Neon Serverless Postgres (Tập 11):** Tách rời Storage/Compute và tính năng Database Branching tức thì.
13. **Unified-App-Infra (Tập 12):** Kiến trúc BaaS tự host cho toàn bộ app (\`App System\`) với lộ trình 6 tính năng cao cấp.

### Cụm 4: AI & Trung Tâm Điều Phối Hệ Sinh Thái (AI & Orchestration)
14. **JohnnyHoang's App Wallet (Tập 14):** Kho ứng dụng cá nhân, Showcase năng lực IT và động cơ sinh tài liệu AI SRS.

---

## 3.2 Giá Trị Của Việc Xây Dựng Hệ Sinh Thái Thay Vì Ứng Dụng Rời Rạc

Thay vì tạo ra các ứng dụng đơn lẻ không liên quan, 17+ ứng dụng này chia sẻ chung hạ tầng xác thực (Single Sign-On), dùng chung cổng dữ liệu PostgreSQL và hỗ trợ lẫn nhau, tạo thành một **khối thống nhất hoàn chỉnh** mà rất ít kỹ sư cá nhân có thể tự mình xây dựng.`,
    keyTakeaways: [
      '17+ ứng dụng bao phủ toàn diện từ OS, Networking, Database, Cloud AWS/Azure đến AI.',
      'Sự liên kết chặt chẽ chứng minh tư duy kiến trúc hệ sinh thái quy mô lớn.',
      'Cung cấp kho giải pháp sẵn sàng triển khai cho bất kỳ bài toán doanh nghiệp nào.'
    ]
  },
  {
    id: 'aw-ch4-zero-latency-knowledge-retrieval',
    chapterNumber: 4,
    title: 'Chương 4: Cơ Chế Tìm Kiếm & Phục Hồi Tri Thức Tức Thì (Anti-Forget Hub)',
    subtitle: 'Tìm Kiếm Siêu Tốc, Lọc Đa Chiều Theo Tech Stack Và Truy Xuất Lại Quyết Định Thiết Kế',
    readingTimeMinutes: 12,
    summary: 'Tìm hiểu cách App Wallet giúp tác giả tìm kiếm lại bất kỳ thông tin nào về các dự án trong vòng dưới 1 giây, xóa bỏ hoàn toàn nỗi lo bị quên kiến trúc cũ.',
    content: `## 4.1 Giải Thuật Lọc & Tìm Kiếm Tức Thì (Zero-Latency Search)

Khi số lượng ứng dụng tăng lên hàng chục, việc nhớ chính xác app nào sử dụng thư viện gì, app nào có cấu hình Stripe hay app nào kết nối với Supabase RLS là bất khả thi nếu dựa vào trí nhớ sinh học.

App Wallet trang bị bộ máy tìm kiếm toàn văn và lọc mờ (Fuzzy Filter) chạy trực tiếp trên client:
- **Lọc theo từ khóa:** Tìm kiếm đồng thời theo Tên dự án, Slug, Mô tả và các ghi chú kỹ thuật.
- **Lọc theo Tech Stack:** Chỉ với 1 cú nhấp vào thẻ \`PostgreSQL\` hoặc \`Tailwind CSS\`, toàn bộ các dự án ứng dụng công nghệ đó sẽ hiện ra ngay lập tức.
- **Lọc theo Trạng thái & Lĩnh vực:** Nhanh chóng phân loại các ứng dụng đang chạy thật trên Production (\`live\`) để gửi link demo cho khách hàng.

---

## 4.2 Truy Xuất Quyết Định Thiết Kế (Architecture Decision Records - ADR)

Bên trong mỗi thẻ dự án, App Wallet lưu trữ tài liệu đặc tả và các ghi chú quan trọng:
- Tại sao dự án này lại chọn Supabase thay vì Firebase?
- Cấu trúc khóa ngoại giữa bảng người dùng và bảng đơn hàng được thiết lập ra sao?
- Các biến môi trường cần thiết để chạy dự án trên máy mới là gì?

Tất cả câu trả lời đều hiển thị rõ ràng chỉ sau một cú nhấp chuột, giúp bạn có thể tiếp tục phát triển dự án cũ sau nhiều năm mà không mất thời gian đọc lại từng dòng code.`,
    keyTakeaways: [
      'Tìm kiếm và phục hồi thông tin dự án trong vòng dưới 1 giây.',
      'Lọc linh hoạt theo công nghệ, trạng thái vòng đời và lĩnh vực ứng dụng.',
      'Lưu trữ các quyết định kiến trúc quan trọng để tái sử dụng bền vững.'
    ]
  },
  {
    id: 'aw-ch5-ai-srs-spec-builder',
    chapterNumber: 5,
    title: 'Chương 5: Động Cơ Sinh Đặc Tả Kỹ Thuật AI SRS (AI Tech Specs Builder)',
    subtitle: 'Chuyển Đổi Ý Tưởng Thành Bộ Hồ Sơ Kỹ Thuật 8 Mục Chuẩn Phục Vụ AI Coding Agents',
    readingTimeMinutes: 15,
    summary: 'Phân tích chi tiết module aiAppBuilder.ts: Cách biến một ý tưởng ngắn thành bộ hồ sơ đặc tả phần mềm hoàn chỉnh cho AI Coding Agents lập trình.',
    content: `## 5.1 Vai Trò Sống Còn Của Hồ Sơ SRS Trong Kỷ Nguyên AI

Khi làm việc với các trợ lý lập trình AI (như Cursor, Windsurf, Claude Code, Antigravity), chất lượng code đầu ra phụ thuộc 90% vào **ngữ cảnh kiến trúc (Context)** được cung cấp. Nếu không có hồ sơ đặc tả yêu cầu phần mềm (SRS) chuẩn mực, AI sẽ tự phỏng đoán schema, viết sai logic phân quyền và tạo ra mã nguồn không tương thích.

Module \`aiAppBuilder.ts\` trong App Wallet đóng vai trò như một **Kiến Trúc Sư Trưởng Ảo (Virtual Principal Architect)**, tự động sinh ra bộ hồ sơ kỹ thuật 8 phần chuẩn mực chỉ từ một câu mô tả ý tưởng.

---

## 5.2 Bộ 8 Mục Tiêu Chuẩn Quốc Tế

1. **Executive Summary & Problem Statement:** Bối cảnh bài toán, mục tiêu và giá trị kinh doanh cốt lõi.
2. **Target Audience & User Personas:** Đối tượng người dùng mục tiêu và hành vi kỳ vọng.
3. **Core Feature Specifications (User Stories):** Danh sách tính năng viết dưới dạng chuẩn *Given / When / Then*.
4. **Recommended Modern Tech Stack:** Lựa chọn công nghệ tối ưu kèm lý do kiến trúc.
5. **PostgreSQL Database Schema & Relations:** Thiết kế các bảng dữ liệu kèm kiểu dữ liệu, khóa chính, khóa ngoại và chỉ mục tối ưu.
6. **API Contracts & REST Endpoints:** Định nghĩa danh sách endpoints, phương thức HTTP, headers và mẫu Request/Response.
7. **Security & Row Level Security (RLS) Rules:** Các chính sách bảo mật bảo vệ dữ liệu người dùng.
8. **Phased Implementation Roadmap:** Lộ trình phát triển 4 giai đoạn (MVP, Beta, Production, Scale).

---

## 5.3 Cơ Chế Dual-Engine AI & Heuristic Fallback

Hệ thống trang bị khả năng phục hồi 3 tầng:
- **Tầng 1 (Primary):** Google Gemini 2.5 Flash — Tốc độ phản hồi cực nhanh dưới 2 giây.
- **Tầng 2 (Secondary):** OpenAI GPT-4o-mini — Dự phòng khi API chính chạm ngưỡng giới hạn.
- **Tầng 3 (Offline):** Heuristic Keyword Engine — Sinh hồ sơ cục bộ trên trình duyệt ngay cả khi không có kết nối internet.`,
    keyTakeaways: [
      'Tự động hóa 100% quy trình lập hồ sơ đặc tả kỹ thuật phần mềm (SRS).',
      'Cung cấp ngữ cảnh kiến trúc chuẩn mực cho các AI Coding Agents lập trình chính xác.',
      'Kiến trúc dự phòng 3 lớp đảm bảo luôn sẵn sàng phục vụ lập trình viên.'
    ]
  },
  {
    id: 'aw-ch6-in-app-backlog-lifecycle',
    chapterNumber: 6,
    title: 'Chương 6: Quản Lý Tiến Độ, Versioning & In-App Engineering Backlog',
    subtitle: 'Theo Dõi Tính Năng, Lỗi Kỹ Thuật Và Lộ Trình Phát Triển Tinh Gọn Trực Tiếp Trong Ứng Dụng',
    readingTimeMinutes: 13,
    summary: 'Tìm hiểu cách In-App Backlog giúp theo dõi các tính năng mới, lỗi cần sửa và lộ trình nâng cấp của từng ứng dụng mà không cần dùng Jira/Trello.',
    content: `## 6.1 Sự Cồng Kềnh Của Công Cụ Bên Thứ Ba

Đối với một kỹ sư năng suất cao, việc phải mở một phần mềm quản lý dự án nặng nề (như Jira hay Asana) chỉ để ghi lại một lỗi nhỏ hoặc một ý tưởng vừa lóe lên sẽ làm gián đoạn dòng chảy tập trung (*Flow State*).

In-App Backlog trong App Wallet được gắn trực tiếp vào từng thẻ dự án:
- Ghi nhận việc cần làm trong **dưới 3 giây**.
- Phân loại 4 nhóm việc kỹ thuật chuẩn: \`feature\` (Tính năng), \`bug\` (Lỗi), \`refactor\` (Tái cấu trúc mã), \`docs\` (Tài liệu).
- Đánh dấu mức độ ưu tiên: \`urgent\`, \`high\`, \`medium\`, \`low\`.
- Quản lý trạng thái tiến độ: \`todo\` -> \`in_progress\` -> \`done\`.

---

## 6.2 Bảng Dữ Liệu PostgreSQL \`tkw_app_backlog_items\`

\`\`\`sql
CREATE TABLE tkw_app_backlog_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES tkw_app_projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('feature', 'bug', 'refactor', 'docs')) DEFAULT 'feature',
  priority TEXT CHECK (priority IN ('urgent', 'high', 'medium', 'low')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('todo', 'in_progress', 'done')) DEFAULT 'todo',
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);
\`\`\`

Nhờ liên kết chặt chẽ với cơ sở dữ liệu Supabase, bạn có thể dễ dàng theo dõi tiến độ tổng thể của toàn bộ 17+ ứng dụng trên một màn hình duy nhất.`,
    keyTakeaways: [
      'Ghi nhận công việc và lỗi kỹ thuật tức thì không làm đứt đoạn mạch tư duy.',
      'Phân loại 4 nhóm việc cốt lõi chuẩn kỹ sư phần mềm.',
      'Dễ dàng kiểm soát tiến độ hoàn thiện của từng ứng dụng trong hệ sinh thái.'
    ]
  },
  {
    id: 'aw-ch7-one-click-dev-hub',
    chapterNumber: 7,
    title: 'Chương 7: Trung Tâm Điều Hướng Đa Điểm (One-Click Dev Hub)',
    subtitle: 'Kết Nối Mã Nguồn Local, Remote GitHub, Bảng Điều Khiển Vercel & Live Domains',
    readingTimeMinutes: 12,
    summary: 'Khám phá khả năng kết nối một chạm giữa App Wallet với thư mục ổ cứng máy tính, repo GitHub, dashboard Vercel và domain production.',
    content: `## 7.1 Xóa Bỏ Ma Trận Bookmark & Đường Dẫn Rải Rác

Lập trình viên thường xuyên phải quản lý hàng chục tab trình duyệt và bookmark cho từng dự án: 1 tab GitHub, 1 tab Vercel Dashboard, 1 tab Production App, 1 cửa sổ Terminal mở thư mục local.

App Wallet hợp nhất tất cả thành **4 nút bấm điều hướng một chạm**:
1. **Local Path Inspector:** Hiển thị chính xác đường dẫn thư mục trên máy tính (\`D:\\Hoa Hoang\\Apps\\...\`) kèm nút copy đường dẫn để mở nhanh trên VS Code / Cursor / Terminal.
2. **GitHub Repository:** Mở trực tiếp kho mã nguồn trên GitHub để kiểm tra commits, issues và pull requests.
3. **Vercel Project Dashboard:** Truy cập thẳng bảng quản lý deployment, build logs, analytics và cài đặt biến môi trường trên Vercel.
4. **Live Production Domain:** Mở trang web đang hoạt động thực tế với chứng chỉ SSL và domain chính thức.

---

## 7.2 Chuẩn Hóa Cấu Trúc Đặt Tên (Slug Standardization)

App Wallet áp dụng quy chuẩn đặt tên đồng nhất xuyên suốt:
- Tên thư mục Local = GitHub Repo Name = Vercel Project Name = Slug hệ thống (ví dụ: \`aws\`, \`token-wallet\`, \`app-system\`).
- Tính nhất quán này giúp loại bỏ hoàn toàn sự nhầm lẫn khi triển khai tự động hóa.`,
    keyTakeaways: [
      'Hợp nhất 4 điểm chạm của quy trình phát triển vào một giao diện duy nhất.',
      'Tiết kiệm hàng chục phút chuyển đổi qua lại giữa các công cụ mỗi ngày.',
      'Chuẩn hóa cấu trúc đặt tên đồng bộ từ máy cá nhân lên đám mây.'
    ]
  },
  {
    id: 'aw-ch8-live-showcase-presentation',
    chapterNumber: 8,
    title: 'Chương 8: Nghệ Thuật Trình Diễn Năng Lực Trước Thầy Cô, Đối Tác & Khách Hàng',
    subtitle: 'Chiến Lược Thuyết Phục: Thể Hiện Tư Duy Kiến Trúc, Khả Năng Vận Hành & Năng Lực AI',
    readingTimeMinutes: 14,
    summary: 'Hướng dẫn cách sử dụng App Wallet như một công cụ thuyết trình tương tác sống động, gây ấn tượng mạnh mẽ với giáo sư đại học, đối tác và nhà tuyển dụng.',
    content: `## 8.1 Chuyển Đổi Từ CV Tĩnh Sang Live Interactive Portfolio

Một bản CV dạng PDF truyền thống chỉ chứa những dòng chữ khô khan: *"Có kinh nghiệm với React, AWS, Docker, PostgreSQL"*. Bất kỳ ai cũng có thể viết những dòng đó.

Nhưng khi bạn mở **JohnnyHoang App Wallet** trước mặt giáo sư hoặc nhà tuyển dụng, câu chuyện hoàn toàn thay đổi:
- **Chứng minh bằng sản phẩm thật (Show, Don't Tell):** Bạn nhấp vào từng app, mở live domain đang chạy mượt mà, thao tác trực tiếp các tính năng phức tạp.
- **Chứng minh năng lực kiến trúc (Architecture Proof):** Bạn mở bản đặc tả SRS với thiết kế schema PostgreSQL chuẩn hóa, chính sách bảo mật RLS và API contracts rõ ràng.
- **Chứng minh năng lực quản trị quy mô (Scale & Ops):** Bạn cho họ thấy hệ sinh thái 17+ ứng dụng đang cùng vận hành đồng bộ, chia sẻ chung cơ sở dữ liệu và API Gateway.

---

## 8.2 Kịch Bản 3 Phút Gây Ấn Tượng Tuyệt Đối

1. **Phút 1 (Tầm nhìn tổng thể):** Giới thiệu App Wallet như một kho ứng dụng cá nhân quản lý 17+ sản phẩm bao phủ từ hạ tầng Cloud (AWS, Azure) đến BaaS và AI.
2. **Phút 2 (Khả năng giải quyết bài toán khó):** Mở một dự án tiêu biểu (như Unified-App-Infra hoặc Token Wallet), giải thích giải pháp bảo mật RLS đa tầng và cơ chế tối ưu hiệu năng.
3. **Phút 3 (Tốc độ & Công nghệ tương lai):** Demo tính năng AI App Builder sinh hồ sơ kỹ thuật hoàn chỉnh trong 2 giây bằng Gemini / GPT-4o.

Sau 3 phút này, người đối diện không còn nhìn bạn như một sinh viên hay lập trình viên bình thường, mà là một **Kỹ sư Kiến trúc Phần mềm Thực thụ (Software Architect & Lead Engineer)**.`,
    keyTakeaways: [
      'App Wallet biến hồ sơ năng lực thành một trải nghiệm tương tác trực tiếp đầy thuyết phục.',
      'Minh chứng rõ ràng về tư duy kiến trúc, khả năng viết code thực tế và vận hành Cloud.',
      'Kịch bản demo 3 phút giúp ghi điểm tuyệt đối trước giáo sư và nhà tuyển dụng quốc tế.'
    ]
  },
  {
    id: 'aw-ch9-database-design-rls',
    chapterNumber: 9,
    title: 'Chương 9: Thiết Kế Cơ Sở Dữ Liệu PostgreSQL & Bảo Mật Supabase RLS',
    subtitle: 'Kiến Trúc Bảng Dữ Liệu, Hàm Security Definer Và Chính Sách Phân Quyền Đa Tầng',
    readingTimeMinutes: 15,
    summary: 'Mổ xẻ chi tiết schema PostgreSQL, quan hệ khóa ngoại và hệ thống phân quyền Row Level Security bảo vệ an toàn cho App Wallet.',
    content: `## 9.1 Schema Cơ Sở Dữ Liệu PostgreSQL Chuẩn Hóa

Dữ liệu của App Wallet được tổ chức trên PostgreSQL Supabase với cấu trúc quan hệ chặt chẽ:

\`\`\`sql
-- Bảng quản lý ứng dụng trong hệ sinh thái
CREATE TABLE tkw_app_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'productivity',
  local_path TEXT,
  github_url TEXT,
  vercel_url TEXT,
  production_domain TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  status TEXT CHECK (status IN ('idea', 'planning', 'in_progress', 'live', 'archived')) DEFAULT 'live',
  srs_markdown TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Bảng quản lý backlog kỹ thuật
CREATE TABLE tkw_app_backlog_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES tkw_app_projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('feature', 'bug', 'refactor', 'docs')) DEFAULT 'feature',
  priority TEXT CHECK (priority IN ('urgent', 'high', 'medium', 'low')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('todo', 'in_progress', 'done')) DEFAULT 'todo',
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);
\`\`\`

---

## 9.2 Hàm Phân Quyền Security Definer (\`tkw_perm\`)

\`\`\`sql
CREATE OR REPLACE FUNCTION tkw_perm(required_flag TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM tkw_user_permissions
    WHERE user_id = auth.uid()
      AND (permission = required_flag OR permission = 'admin_all')
  );
END;
$$;
\`\`\`

---

## 9.3 Chính Sách Row Level Security (RLS)

- Cho phép khách vãng lai và nhà tuyển dụng xem các dự án ở chế độ công khai (Public Showcase View).
- Chỉ cho phép chủ tài khoản có quyền thêm, sửa, xóa dự án và cập nhật Backlog.`,
    keyTakeaways: [
      'Schema chuẩn mực với quan hệ khóa ngoại bảo đảm toàn vẹn dữ liệu.',
      'Hàm tkw_perm() dạng SECURITY DEFINER tối ưu hóa hiệu năng kiểm tra quyền.',
      'RLS đa tầng hỗ trợ cả chế độ quản trị riêng tư lẫn chế độ trình diễn công khai.'
    ]
  },
  {
    id: 'aw-ch10-future-roadmap-mcp-showcase',
    chapterNumber: 10,
    title: 'Chương 10: Định Hướng Tương Lai – App Wallet MCP Server & Public Showcase',
    subtitle: 'Biến App Wallet Thành Ngữ Cảnh Sống Cho AI Agents Và Nền Tảng Tự Động Hóa Toàn Diện',
    readingTimeMinutes: 16,
    summary: 'Lộ trình phát triển dài hạn: Xây dựng App Wallet MCP Server cho Cursor/Antigravity, tích hợp Git Webhooks và chế độ Public Showcase chuyên nghiệp.',
    content: `## 10.1 Xây Dựng App Wallet Model Context Protocol (MCP) Server

Tương lai của phát triển phần mềm là sự phối hợp chặt chẽ giữa lập trình viên và các AI Agents (như Cursor, Windsurf, Claude Desktop, Antigravity). Khi App Wallet trở thành một **MCP Server**, AI Agent có thể trực tiếp:
- Tra cứu danh sách 17+ ứng dụng và tech-stack tương ứng.
- Đọc tài liệu SRS và SQL schema của bất kỳ app nào ngay trong IDE mà không cần mở trình duyệt:
  \`\`\`json
  {
    "tool": "appwallet_get_project_srs",
    "parameters": { "app_slug": "aws-mastery" }
  }
  \`\`\`
- Tự động tạo và cập nhật các Backlog items sau khi fix xong một bug trong code:
  \`\`\`json
  {
    "tool": "appwallet_create_backlog_item",
    "parameters": {
      "app_slug": "app-system",
      "title": "Fix RLS policy for anonymous users",
      "category": "bug",
      "status": "done"
    }
  }
  \`\`\`

---

## 10.2 Tự Động Quét Mã Nguồn & Sinh Tài Liệu (Auto Codebase Inspector)

- Định kỳ quét các folder local (\`D:\\...\`) hoặc GitHub repo.
- Tự động phân tích cây thư mục, các dependencies trong \`package.json\`, các routes API và cập nhật ngược lại vào trường \`tech_stack\` và \`srs_markdown\` của App Wallet.

---

## 10.3 Tích Hợp GitHub & Vercel Webhooks Thời Gian Thực

- Nhận Webhook mỗi khi có commit mới được push lên GitHub hoặc một deployment thành công trên Vercel.
- Tự động ghi log lịch sử phiên bản (Changelog) và chuyển đổi trạng thái của app sang \`live\` hoàn toàn tự động.

---

## 10.4 Chế Độ Public Showcase Mode Cho Khách Hàng & Nhà Tuyển Dụng

- Tạo đường link chia sẻ công khai an toàn (Read-Only Public Link) với giao diện tối giản, sang trọng.
- Cho phép khách hàng trải nghiệm live demo, xem Tech-Radar năng lực kỹ thuật và gửi phản hồi hợp tác trực tiếp.`,
    keyTakeaways: [
      'App Wallet MCP Server biến hệ sinh thái thành ngữ cảnh sống cho AI Coding Agents.',
      'Auto Codebase Inspector tự động đồng bộ tài liệu kiến trúc từ mã nguồn thật.',
      'Public Showcase Mode mở ra cơ hội hợp tác và ghi điểm tuyệt đối với đối tác quốc tế.'
    ]
  }
];
