import { AppWalletLesson } from '../../types/appWalletModule';

export const APP_WALLET_LESSONS: AppWalletLesson[] = [
  {
    id: 'aw-ch1-tong-quan-app-wallet',
    chapterNumber: 1,
    title: 'Chương 1: Tổng Quan Kiến Trúc & Sứ Mệnh JohnnyHoang App Wallet',
    subtitle: 'Trung Tâm Điều Phối Danh Mục 17+ Ứng Dụng và Quản Trị Hệ Sinh Thái Phần Mềm',
    readingTimeMinutes: 12,
    summary: 'Tìm hiểu triết lý ra đời, kiến trúc tổng thể, mô hình quản lý tập trung và vai trò trung tâm của App Wallet trong hệ sinh thái công nghệ JohnnyHoang.',
    content: `## 1.1 Sứ Mệnh Cốt Lõi Của App Wallet

Trong quá trình xây dựng và vận hành một hệ sinh thái công nghệ gồm hơn 17 ứng dụng độc lập (từ Cloud Architecture, Database Gateway, Email Systems đến các công cụ AI), kỹ sư và nhà sáng lập thường gặp phải 3 vấn đề nhức nhối:
1. **Phân tán danh mục dự án (Project Fragmentation):** Mã nguồn nằm rải rác ở các thư mục local (\`D:\\Hoa Hoang\\Apps\\...\`), repository GitHub riêng biệt và các project triển khai trên Vercel. Thiếu một bảng điều khiển trung tâm (Centralized Dashboard) để nắm bắt trạng thái hoạt động tức thì.
2. **Thiếu hụt hồ sơ đặc tả kỹ thuật chuẩn (Missing SRS Specs):** Khi cần nâng cấp hoặc phối hợp với các AI Coding Agents (như Cursor, Antigravity, Copilot), việc không có tài liệu yêu cầu phần mềm (SRS) chi tiết khiến AI viết code lệch kiến trúc, sai schema và thiếu tính nhất quán.
3. **Quản lý Backlog cồng kềnh:** Sử dụng các công cụ bên thứ ba nặng nề như Jira hay Trello gây ra độ trễ cao và làm mất tập trung vào mã nguồn thực tế.

**JohnnyHoang App Wallet** được thiết kế như một **Hub Quản Trị & Điều Phối Danh Mục Ứng Dụng Toàn Diện (Central App Portfolio & AI App Builder Hub)**, giải quyết trọn vẹn cả 3 bài toán trên.

---

## 1.2 Tech Stack Hiện Đại & Tốc Độ Cao

- **Frontend Core:** React 19 / TypeScript / Vite mang lại trải nghiệm mượt mà, phản hồi ngay lập tức dưới 16ms.
- **Styling & Design System:** Tailwind CSS, phong cách Dark Mode tối giản, hạn chế tối đa khung hộp bo góc thừa thãi, tập trung vào typography và thông tin kỹ thuật cốt lõi.
- **Backend & Database:** Supabase PostgreSQL 16+ với cơ chế Row Level Security (RLS) bảo vệ dữ liệu đa người dùng.
- **Động cơ Trí tuệ Nhân tạo:** Tích hợp Google Gemini 2.5 Flash và OpenAI GPT-4o-mini để tự động phân tích và sinh tài liệu đặc tả kỹ thuật (SRS).

---

## 1.3 Ba Trụ Cột Nghiệp Vụ Của App Wallet

1. **Portfolio Management:** Quản lý siêu dữ liệu (metadata) của từng app: tên, slug, đường dẫn local, repo GitHub, domain production Vercel, tech-stack và trạng thái vòng đời.
2. **AI SRS Technical Builder:** Chuyển đổi một ý tưởng thô thành bộ hồ sơ kỹ thuật phần mềm 8 phần hoàn chỉnh bằng tiếng Việt và tiếng Anh.
3. **In-App Backlog Tracker:** Theo dõi tính năng mới, lỗi cần sửa, mã cần tái cấu trúc và tài liệu ngay trên từng thẻ ứng dụng.`,
    keyTakeaways: [
      'App Wallet là trung tâm quản lý 17+ ứng dụng trong toàn bộ hệ sinh thái JohnnyHoang.',
      'Tích hợp sâu bộ sinh đặc tả kỹ thuật AI SRS phục vụ AI Coding Agents.',
      'Loại bỏ sự cồng kềnh của công cụ bên thứ ba bằng In-App Backlog tinh gọn.'
    ]
  },
  {
    id: 'aw-ch2-app-portfolio-metadata',
    chapterNumber: 2,
    title: 'Chương 2: Cấu Trúc Siêu Dữ Liệu & Vòng Đời Dự Án Phần Mềm',
    subtitle: 'Mô Hình Hóa Thực Thể Project, Tech-Stack Tagging và Quản Lý Trạng Thái',
    readingTimeMinutes: 13,
    summary: 'Phân tích chi tiết mô hình dữ liệu của thực thể App Project: Quản lý slug, đường dẫn local, remote git, domain production và các trạng thái vòng đời.',
    content: `## 2.1 Cấu Trúc Bản Ghi Dự Án (App Project Data Contract)

Mỗi ứng dụng trong App Wallet được định nghĩa chặt chẽ bằng interface TypeScript:

\`\`\`typescript
export interface AppProject {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description?: string;
  local_path?: string;
  github_url?: string;
  vercel_url?: string;
  production_domain?: string;
  tech_stack: string[];
  status: 'idea' | 'planning' | 'in_progress' | 'live' | 'archived';
  srs_markdown?: string;
  created_at: string;
  updated_at: string;
}
\`\`\`

---

## 2.2 Các Trạng Thái Vòng Đời Ứng Dụng (Lifecycle States)

1. **\`idea\` (Ý tưởng sơ khởi):** Ứng dụng mới chỉ là concept hoặc đề xuất giải pháp, chưa có code.
2. **\`planning\` (Lập kế hoạch & SRS):** Đang trong giai đoạn thiết kế kiến trúc, sinh hồ sơ kỹ thuật bằng AI và định nghĩa schema cơ sở dữ liệu.
3. **\`in_progress\` (Đang phát triển):** Đang trong quá trình viết code, kết nối Git repo và triển khai môi trường staging.
4. **\`live\` (Đã vận hành Production):** Đã deploy lên Vercel/Cloudflare, gắn custom domain và có người dùng thực tế.
5. **\`archived\` (Đóng băng/Lưu trữ):** Dự án đã hoàn thành sứ mệnh hoặc tạm dừng bảo trì, chỉ giữ lại để tham khảo mã nguồn.

---

## 2.3 Phân Loại & Gắn Thẻ Công Nghệ (Tech-Stack Tagging)

Hệ thống hỗ trợ gắn thẻ đa chiều:
- **Frontend:** React 19, Next.js 15, Vite, Tailwind CSS, Vue, Svelte.
- **Backend & BaaS:** Supabase, Neon Serverless, Node.js, Fastify, Python FastAPI.
- **Cloud & Infra:** AWS, Azure, Vercel Edge, Cloudflare Workers, Docker.
- **AI & Integrations:** OpenAI API, Gemini API, Resend, Stripe, SePAY.`,
    keyTakeaways: [
      'Data contract chặt chẽ giúp kiểm soát đầy đủ thông tin từ local path đến live domain.',
      '5 trạng thái vòng đời phản ánh chính xác tiến độ từ ý tưởng đến production.',
      'Hệ thống Tech-Stack Tagging giúp lọc và tìm kiếm nhanh chóng giữa 17+ dự án.'
    ]
  },
  {
    id: 'aw-ch3-ai-app-builder-architecture',
    chapterNumber: 3,
    title: 'Chương 3: Kiến Trúc Động Cơ AI App Builder',
    subtitle: 'Thiết Kế System Prompts, Chiến Lược Zero-Shot & Chuẩn Hóa Hồ Sơ SRS',
    readingTimeMinutes: 15,
    summary: 'Tìm hiểu cách module aiAppBuilder.ts xây dựng System Prompt chuyên sâu giúp AI hiểu ngữ cảnh và sinh ra tài liệu đặc tả kỹ thuật chuẩn công nghiệp.',
    content: `## 3.1 Bài Toán Chuẩn Hóa Prompt Kỹ Thuật

Khi yêu cầu AI sinh tài liệu phần mềm, nếu prompt quá ngắn, kết quả sẽ rất chung chung. Nếu prompt quá dài mà không có cấu trúc ràng buộc (Constraints), AI sẽ sinh ra văn bản lan man, thiếu các chi tiết kỹ thuật mà lập trình viên cần (như SQL schema, endpoints, quy tắc bảo mật).

\`aiAppBuilder.ts\` giải quyết vấn đề này bằng một **System Prompt Kiến Trúc Sư Phần Mềm Trưởng (Principal Software Architect System Prompt)** được tinh chỉnh qua hàng trăm lần thử nghiệm thực chiến.

---

## 3.2 Bộ 8 Mục Tiêu Chuẩn Trong Hồ Sơ SRS

Mọi tài liệu kỹ thuật do App Wallet sinh ra đều bắt buộc tuân theo 8 phần bất biến:
1. **Executive Summary & Value Proposition:** Tóm tắt ngắn gọn mục tiêu, đối tượng phục vụ và giá trị kinh doanh cốt lõi.
2. **User Personas & Target Audience:** Chân dung người dùng mục tiêu và các kịch bản sử dụng điển hình.
3. **Core Feature Specifications (User Stories):** Danh sách tính năng chi tiết viết theo định dạng *Given / When / Then*.
4. **Recommended Modern Tech Stack:** Đề xuất bộ công nghệ tối ưu kèm lý do lựa chọn.
5. **PostgreSQL Database Schema & Relations:** Thiết kế các bảng dữ liệu PostgreSQL kèm kiểu dữ liệu, khóa chính, khóa ngoại và chỉ mục (Indexes).
6. **API Contracts & REST/RPC Endpoints:** Định nghĩa danh sách API endpoints, phương thức HTTP, headers và mẫu JSON Request/Response.
7. **Security, Privacy & Row Level Security (RLS) Rules:** Các chính sách phân quyền chi tiết cho từng vai trò người dùng.
8. **Phased Implementation Roadmap (MVP to Scale):** Lộ trình triển khai chia làm 4 giai đoạn rõ ràng.`,
    keyTakeaways: [
      'System Prompt đóng vai trò Principal Software Architect định hướng cấu trúc tài liệu.',
      'Bộ 8 mục tiêu chuẩn đảm bảo tính đầy đủ cho AI Coding Agents lập trình.',
      'Định dạng Markdown chuẩn hóa giúp dễ dàng copy vào Cursor Rules hoặc tài liệu dự án.'
    ]
  },
  {
    id: 'aw-ch4-dual-engine-fallback',
    chapterNumber: 4,
    title: 'Chương 4: Cơ Chế Dual-Engine AI & Heuristic Fallback',
    subtitle: 'Chiến Lược Dự Phòng Đa Tầng Đảm Bảo Khả Năng Sinh Tài Liệu 100% Sẵn Sàng',
    readingTimeMinutes: 14,
    summary: 'Phân tích cơ chế chuyển đổi thông minh giữa Google Gemini 2.5 Flash, OpenAI GPT-4o-mini và bộ sinh mẫu Heuristic Offline cục bộ.',
    content: `## 4.1 Kiến Trúc Chuyển Đổi 3 Lớp (Three-Tier Resilience)

Để đảm bảo người dùng luôn nhận được tài liệu đặc tả ngay cả khi hết hạn mức API, mất mạng hoặc dịch vụ AI bên ngoài gặp sự cố, App Wallet áp dụng mô hình 3 tầng dự phòng:

$$\\text{Idea Input} \\longrightarrow \\text{Tier 1: Gemini 2.5 Flash} \\xrightarrow{\\text{Fail}} \\text{Tier 2: GPT-4o-mini} \\xrightarrow{\\text{Fail}} \\text{Tier 3: Offline Heuristic}$$

---

## 4.2 Chi Tiết Các Tầng Thực Thi

### Tầng 1: Google Gemini 2.5 Flash (Primary Engine)
- Ưu điểm: Tốc độ phản hồi cực nhanh (dưới 2 giây), context window lớn và chi phí token cực thấp.
- Nhiệm vụ: Xử lý 95% các yêu cầu sinh SRS thông thường.

### Tầng 2: OpenAI GPT-4o-mini (Secondary Fallback)
- Tự động kích hoạt khi Gemini API trả về mã lỗi HTTP 429 (Rate Limit) hoặc 503 (Service Unavailable).
- Đảm bảo chất lượng tài liệu tương đương với độ chuẩn xác cao về cú pháp SQL và Markdown.

### Tầng 3: Offline Heuristic Keyword Engine (Zero-Network Fallback)
- Hoạt động 100% trên trình duyệt không cần internet.
- Trích xuất các từ khóa ngữ nghĩa trong tiêu đề ý tưởng (ví dụ: "thư viện", "quản lý kho", "thanh toán", "iot", "chat").
- Lắp ráp các module schema và tính năng dựng sẵn thành một bộ tài liệu SRS hoàn chỉnh chỉ trong 5 mili-giây.`,
    keyTakeaways: [
      'Kiến trúc dự phòng 3 lớp đảm bảo hệ thống không bao giờ bị gián đoạn.',
      'Gemini 2.5 Flash mang lại tốc độ sinh tài liệu siêu nhanh.',
      'Offline Heuristic Engine cứu cánh khi lập trình viên làm việc trên máy bay hoặc mất mạng.'
    ]
  },
  {
    id: 'aw-ch5-in-app-backlog-system',
    chapterNumber: 5,
    title: 'Chương 5: Quản Trị Tính Năng & Backlog Tích Hợp (In-App Backlog)',
    subtitle: 'Theo Dõi Features, Bugs, Refactors Và Mức Độ Ưu Tiên Không Cần Jira',
    readingTimeMinutes: 13,
    summary: 'Khám phá module quản trị Backlog tích hợp sẵn trong App Wallet: Phân loại công việc, gán priority và quản lý tiến độ nhanh gọn.',
    content: `## 5.1 Triết Lý Tinh Gọn Của In-App Backlog

Các công cụ quản lý dự án truyền thống (như Jira, Asana) thường quá phức tạp với hàng tá trường nhập liệu thừa thãi. Đối với lập trình viên độc lập (Solo Developer) hoặc nhóm nhỏ phát triển nhanh, việc ghi nhận nhanh một ý tưởng tính năng mới hay một bug vừa phát hiện cần diễn ra trong **dưới 5 giây**.

In-App Backlog trong App Wallet được gắn trực tiếp vào từng project, cho phép:
- Ghi nhận nhanh việc cần làm mà không cần rời khỏi màn hình quản lý dự án.
- Phân loại rõ ràng: \`feature\` (Tính năng mới), \`bug\` (Lỗi), \`refactor\` (Tối ưu mã), \`docs\` (Tài liệu).
- Đánh dấu mức độ khẩn cấp: \`urgent\` (Khẩn cấp), \`high\` (Cao), \`medium\` (Trung bình), \`low\` (Thấp).
- Quản lý trạng thái: \`todo\` -> \`in_progress\` -> \`done\`.

---

## 5.2 Mô Hình Dữ Liệu Backlog Item

\`\`\`typescript
export interface AppBacklogItem {
  id: string;
  project_id: string;
  user_id: string;
  title: string;
  description?: string;
  category: 'feature' | 'bug' | 'refactor' | 'docs';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'done';
  created_at: string;
  completed_at?: string;
}
\`\`\`

Nhờ liên kết khóa ngoại (\`project_id\`), người dùng có thể xem tổng quan tiến độ của từng ứng dụng riêng lẻ hoặc xem bảng Kanban tổng hợp của toàn bộ hệ sinh thái.`,
    keyTakeaways: [
      'Ghi nhận ý tưởng và lỗi kỹ thuật trong dưới 5 giây.',
      'Phân loại 4 nhóm việc cốt lõi: Feature, Bug, Refactor và Documentation.',
      'Liên kết chặt chẽ với từng dự án phần mềm cụ thể.'
    ]
  },
  {
    id: 'aw-ch6-github-vercel-integrations',
    chapterNumber: 6,
    title: 'Chương 6: Tích Hợp Điều Hướng GitHub & Vercel Production',
    subtitle: 'Kết Nối Mã Nguồn Local, Remote Repository và Bảng Điều Khiển Triển Khai',
    readingTimeMinutes: 12,
    summary: 'Tìm hiểu cơ chế kết nối một chạm giữa App Wallet với GitHub Repo, Vercel Dashboard, Production Domain và thư mục mã nguồn Local.',
    content: `## 6.1 Trung Tâm Điều Hướng Một Chạm (One-Click Dev Hub)

Một trong những tính năng tiện lợi nhất của App Wallet là khả năng kết nối liền mạch mọi mắt xích trong quy trình phát triển phần mềm:

1. **Local Source Link:** Lưu trữ đường dẫn tuyệt đối trên máy tính (\`D:\\Hoa Hoang\\Apps\\aws\`), giúp lập trình viên mở nhanh bằng terminal hoặc IDE.
2. **GitHub Remote Link:** Nút bấm trực tiếp mở repository trên GitHub để kiểm tra pull requests, commits và issues.
3. **Vercel Deployments Hub:** Liên kết thẳng tới dashboard quản lý deployments, logs, analytics và biến môi trường (Environment Variables) trên Vercel.
4. **Live Production Domain:** Nút truy cập nhanh ứng dụng thực tế trên môi trường production với trạng thái HTTPS an toàn.

---

## 6.2 Chuẩn Hóa Quy Trình Quản Lý Repo & Monorepo

App Wallet khuyến khích chuẩn hóa cấu trúc repository:
- Mỗi app độc lập có slug tương ứng với tên folder local và tên project trên Vercel.
- Tự động phát hiện và đánh dấu các ứng dụng thuộc kiến trúc Monorepo hoặc Monolithic.`,
    keyTakeaways: [
      'Xóa bỏ thao tác tìm kiếm link thủ công giữa hàng chục bookmark trình duyệt.',
      'Kết nối liền mạch 4 điểm: Local Folder -> GitHub Repo -> Vercel Project -> Production Domain.',
      'Chuẩn hóa cấu trúc đặt tên slug cho toàn bộ hệ sinh thái.'
    ]
  },
  {
    id: 'aw-ch7-database-schema-rls',
    chapterNumber: 7,
    title: 'Chương 7: Thiết Kế Cơ Sở Dữ Liệu & Bảo Mật PostgreSQL RLS',
    subtitle: 'Chi Tiết Bảng tkw_app_projects, tkw_app_backlog_items và Hàm tkw_perm()',
    readingTimeMinutes: 15,
    summary: 'Mổ xẻ toàn bộ cấu trúc bảng cơ sở dữ liệu, quan hệ khóa ngoại và chính sách bảo mật Row Level Security trên PostgreSQL Supabase.',
    content: `## 7.1 Schema Cơ Sở Dữ Liệu PostgreSQL

Dữ liệu của App Wallet được quản lý bằng các bảng PostgreSQL chuyên biệt:

\`\`\`sql
-- Bảng quản lý ứng dụng
CREATE TABLE tkw_app_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
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

-- Bảng quản lý backlog của từng ứng dụng
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

## 7.2 Hàm Phân Quyền Security Definer (\`tkw_perm\`)

Để đảm bảo hiệu năng truy vấn cao và kiểm soát quyền truy cập chặt chẽ:

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

## 7.3 Thiết Lập Chính Sách Row Level Security (RLS)

Mỗi người dùng chỉ có quyền thao tác trên các ứng dụng và backlog do chính họ tạo ra:

\`\`\`sql
ALTER TABLE tkw_app_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tkw_app_backlog_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only view their own projects"
ON tkw_app_projects FOR SELECT
USING (auth.uid() = user_id OR tkw_perm('view_all_apps'));

CREATE POLICY "Users can modify their own projects"
ON tkw_app_projects FOR ALL
USING (auth.uid() = user_id);
\`\`\``,
    keyTakeaways: [
      'Schema chuẩn hóa quan hệ 1-N giữa App Projects và Backlog Items.',
      'Hàm tkw_perm() dạng SECURITY DEFINER tăng tốc kiểm tra quyền hạn.',
      'RLS đảm bảo cách ly dữ liệu tuyệt đối giữa các tài khoản.'
    ]
  },
  {
    id: 'aw-ch8-ui-ux-design-philosophy',
    chapterNumber: 8,
    title: 'Chương 8: Triết Lý Thiết Kế UI/UX Cho Developer Portfolio',
    subtitle: 'Nghệ Thuật Xây Dựng Giao Diện Minimalist: Không Bo Góc Thừa, Không Hộp Lồng Hộp',
    readingTimeMinutes: 11,
    summary: 'Tìm hiểu tiêu chuẩn thiết kế giao diện của App Wallet: Phong cách tối giản, bố cục phẳng, phản hồi tức thì và tối ưu cho kỹ sư.',
    content: `## 8.1 Thoát Khỏi Bẫy Thiết Kế Bo Góc Quá Mức (Anti-Over-Rounded Design)

Xu hướng thiết kế hiện đại của các công ty công nghệ hàng đầu (như Vercel, Linear, Stripe, Supabase) không sử dụng các khối bo góc khổng lồ (\`rounded-3xl\`) hay viền phát sáng lòe loẹt. Thay vào đó, họ tập trung vào:
- **Đường viền siêu mảnh (Subtle Hairline Borders):** \`border-slate-800/80\` tạo cảm giác sắc sảo, kỹ thuật.
- **Bo góc tinh tế:** \`rounded-lg\` (6px đến 8px) vừa đủ mềm mại nhưng vẫn giữ được nét cứng cáp của phần mềm kỹ thuật.
- **Phẳng hóa không gian (Flat Canvas):** Tránh hiện tượng "khung lồng trong khung" (*Box-in-Box Syndrome*) gây ngột ngạt cho mắt người dùng.

---

## 8.2 Tối Ưu Hóa Tốc Độ Tương Tác

- **Instant Search & Filter:** Tìm kiếm dự án theo tên, slug hoặc tech-stack với kết quả lọc tức thì theo từng ký tự gõ.
- **Modal Trượt Tinh Tế (Drawer Over Modal):** Sử dụng thanh trượt bên hông (Slide-over Drawer) để xem chi tiết SRS và Backlog mà không làm mất dấu ngữ cảnh màn hình chính.`,
    keyTakeaways: [
      'Phong cách thiết kế phẳng, viền mảnh chuẩn Vercel / Linear.',
      'Loại bỏ triệt để tình trạng khung hộp lồng khung gây rối mắt.',
      'Tìm kiếm và lọc dự án tức thì không có độ trễ.'
    ]
  },
  {
    id: 'aw-ch9-ecosystem-dependency-graph',
    chapterNumber: 9,
    title: 'Chương 9: Sơ Đồ Phụ Thuộc Hệ Sinh Thái (Ecosystem Dependency Graph)',
    subtitle: 'Mô Hình Hóa Mối Quan Hệ Giữa 17+ Ứng Dụng, Database Chung Và API Gateway',
    readingTimeMinutes: 13,
    summary: 'Phân tích cách các ứng dụng trong hệ sinh thái tương tác với nhau: Dùng chung cơ sở dữ liệu Supabase, chia sẻ API Gateway và tích hợp xác thực SSO.',
    content: `## 9.1 Mạng Lưới Phụ Thuộc Giữa Các Ứng Dụng

Trong hệ sinh thái 17+ ứng dụng của JohnnyHoang:
- Một số app đóng vai trò **Nền tảng hạ tầng (Infra Base):** App System BaaS, Database Gateway.
- Một số app đóng vai trò **Dịch vụ chia sẻ (Shared Services):** Resend Email Service, Google Auth SSO Hub.
- Các app chuyên ngành (như AWS Mastery, Azure Guide, Token Wallet, Prompt Studio) tiêu thụ các dịch vụ chia sẻ này.

---

## 9.2 Lợi Ích Của Dependency Mapping

1. **Tránh xung đột Schema Database:** Khi nâng cấp bảng dữ liệu chung trên Supabase, lập trình viên biết chính xác những app nào bị ảnh hưởng.
2. **Tối ưu hóa chi phí vận hành:** Tái sử dụng chung một database instance cho nhiều ứng dụng nhẹ mà không cần tạo project mới lãng phí.
3. **Đồng bộ cơ chế xác thực người dùng:** Cho phép người dùng đăng nhập một lần (Single Sign-On) để truy cập toàn bộ các ứng dụng trong hệ sinh thái.`,
    keyTakeaways: [
      'Hiểu rõ mạng lưới kết nối và phụ thuộc giữa 17+ ứng dụng.',
      'Dùng chung hạ tầng BaaS và Authentication giúp tiết kiệm tối đa tài nguyên.',
      'Dự báo chính xác tác động khi nâng cấp database hoặc thay đổi API.'
    ]
  },
  {
    id: 'aw-ch10-future-roadmap-mcp-server',
    chapterNumber: 10,
    title: 'Chương 10: Định Hướng Phát Triển Tương Lai & App Wallet MCP Server',
    subtitle: 'Xây Dựng MCP Server Cho AI Coding Agents, Auto Codebase Inspector & Git Webhooks',
    readingTimeMinutes: 16,
    summary: 'Lộ trình phát triển tương lai: Biến App Wallet thành MCP Server chính thức, tự động quét mã nguồn sinh tài liệu kiến trúc và tích hợp Git Webhooks thời gian thực.',
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
- Tự động ghi log lịch sử phiên bản (Changelog) và chuyển đổi trạng thái của app sang \`live\` hoàn toàn tự động.`,
    keyTakeaways: [
      'App Wallet MCP Server biến hệ sinh thái thành ngữ cảnh sống cho AI Coding Agents.',
      'Auto Codebase Inspector tự động đồng bộ tài liệu kiến trúc từ mã nguồn thật.',
      'Webhooks GitHub/Vercel tự động hóa hoàn toàn việc theo dõi vòng đời release.'
    ]
  }
];
