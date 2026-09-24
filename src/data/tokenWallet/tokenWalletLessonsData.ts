import { TokenWalletLesson } from '../../types/tokenWalletModule';

export const TOKEN_WALLET_LESSONS: TokenWalletLesson[] = [
  {
    id: 'tw-ch1-tong-quan-kien-truc',
    chapterNumber: 1,
    title: 'Chương 1: Tổng Quan Kiến Trúc & Sứ Mệnh JohnnyHoang Token Wallet',
    subtitle: 'Hệ thống Quản trị Tài nguyên AI, Chi phí SaaS và Portfolio Dự án Tập trung',
    readingTimeMinutes: 12,
    summary: 'Tìm hiểu triết lý ra đời, kiến trúc tổng thể, mô hình dữ liệu và các module cốt lõi của ứng dụng JohnnyHoang Token Wallet.',
    content: `## 1.1 Bối Cảnh Ra Đời & Sứ Mệnh Cốt Lõi

Trong kỷ nguyên phát triển phần mềm được hỗ trợ mạnh mẽ bởi AI (AI-Assisted & AI-First Development), một kỹ sư hoặc nhà sáng lập công nghệ thường xuyên phải đối mặt với hai bài toán đau đầu:
1. **Phân mảnh tài nguyên & Quota AI:** Sử dụng đồng thời hàng loạt dịch vụ AI cao cấp như **Claude Pro (Opus/Sonnet 3.5)**, **ChatGPT Plus (o1/GPT-4o)**, **Gemini Advanced (Gemini 2.5 Pro)**, **Cursor Pro**, **GitHub Copilot**... Mỗi nền tảng có một chu kỳ reset quota riêng (ví dụ Claude reset mỗi 5 giờ, OpenAI giới hạn tin nhắn theo 3 giờ). Việc hết hạn ngạch bất ngờ khi đang debug làm gián đoạn nghiêm trọng dòng chảy công việc (*Flow State*).
2. **Quản trị chi phí SaaS & Vòng đời Dự án:** Hàng chục khoản thanh toán định kỳ (Vercel Pro, Supabase Pro, Domain Names, Cloudflare, Resend, AI Subscriptions) trải dài trên nhiều thẻ tín dụng và tài khoản ngân hàng, dễ dẫn đến quên hạn đóng phí, bị khóa dịch vụ hoặc lãng phí chi phí ngầm.
3. **Phân tán danh mục sản phẩm (App Ecosystem):** Hàng chục repository trên GitHub và dự án trên Vercel thiếu một trung tâm điều phối tổng thể (Centralized Portfolio), nơi lưu trữ SRS (Software Requirements Specification), backlog và roadmap phát triển.

**JohnnyHoang Token Wallet** ra đời như một **Bộ não Quản trị & Điều phối Trung tâm (Central Orchestrator)** giải quyết trọn vẹn 3 trụ cột này với giao diện tối ưu hóa trải nghiệm người dùng, tốc độ xử lý tức thì và khả năng phân tích ngôn ngữ tự nhiên.

---

## 1.2 Kiến Trúc Công Nghệ Hiện Đại (Tech Stack)

Ứng dụng được xây dựng trên nền tảng kỹ thuật tiêu chuẩn cao:
- **Frontend Core:** React 19 / TypeScript / Vite mang lại tốc độ phản hồi tính bằng mili-giây và khả năng type-safety tuyệt đối.
- **Styling & UI:** Tailwind CSS kết hợp với Lucide Icons, thiết kế Dark Mode sang trọng lấy cảm hứng từ các dashboard tài chính và thiết bị điều khiển hàng không.
- **Backend & Database:** Supabase (PostgreSQL 16+) với hệ thống phân quyền Row Level Security (RLS) bảo vệ đa lớp, hàm Security Definer tối ưu truy vấn quyền hạn.
- **Trí tuệ Nhân tạo Tích hợp:** Gemini API (Gemini 2.5 Flash) & OpenAI API (GPT-4o-mini) hỗ trợ tự động sinh đặc tả kỹ thuật (SRS Technical Specs) cho dự án.
- **Natural Language Parsing Engine:** Hệ thống parser tự viết bằng biểu thức chính quy (Regex) tinh vi, chuyển đổi ngôn ngữ hội thoại tự nhiên thành dữ liệu thời gian và cấu trúc tài chính chính xác.

---

## 1.3 Mô Hình Ba Trụ Cột Chức Năng

Ứng dụng xoay quanh ba module nghiệp vụ then chốt:
1. **AI Token Wallet:** Giám sát thời gian thực trạng thái của từng tài khoản AI, hiển thị trực quan đồng hồ đếm ngược đến mốc reset quota, hỗ trợ nhảy bước chu kỳ tự động (\`rollForward\`).
2. **App Wallet & Portfolio:** Kho lưu trữ danh mục hơn 17 ứng dụng trong hệ sinh thái, tự động đồng bộ trạng thái GitHub & Vercel, sinh đặc tả SRS song ngữ Anh - Việt bằng AI.
3. **Payment Schedule & Cashflow:** Lịch theo dõi hạn thanh toán thẻ/ngân hàng, tự động tính tổng chi phí theo tháng (VND & USD), phân loại theo thẻ vật lý và cảnh báo hóa đơn cận ngày.`,
    keyTakeaways: [
      'JohnnyHoang Token Wallet là trung tâm điều phối tài nguyên AI, chi phí SaaS và danh mục ứng dụng.',
      'Kiến trúc React 19 + TypeScript + Supabase RLS bảo mật tuyệt đối.',
      'Giải quyết triệt để vấn đề gián đoạn luồng làm việc do hết hạn ngạch AI bất ngờ.'
    ]
  },
  {
    id: 'tw-ch2-ai-quota-reset-engine',
    chapterNumber: 2,
    title: 'Chương 2: Thuật Toán & Cơ Chế AI Quota Reset Engine',
    subtitle: 'Toán học Chu kỳ, Countdown Thời gian Thực và Hàm Roll-Forward Tự Động',
    readingTimeMinutes: 14,
    summary: 'Khám phá chi tiết thuật toán tính toán thời gian reset quota, cơ chế đếm ngược milisecond và thuật toán nhảy chu kỳ tự động rollForward.',
    content: `## 2.1 Bản Chất Chu Kỳ Quota Của Các Nhà Cung Cấp AI

Mỗi nhà cung cấp dịch vụ AI áp dụng một chính sách giới hạn tốc độ (Rate Limit) và làm mới hạn ngạch (Quota Reset) khác nhau:
- **Anthropic (Claude Pro):** Giới hạn số lượng tin nhắn trong một cửa sổ trượt (sliding window) chuẩn 5 giờ kể từ tin nhắn đầu tiên. Khi chạm ngưỡng, hệ thống thông báo mốc giờ cố định (ví dụ: "Your limit will reset at 3:00 PM").
- **OpenAI (ChatGPT Plus / Team):** Giới hạn số lượt gọi GPT-4o / o1 trong chu kỳ 3 giờ cố định.
- **Google DeepMind (Gemini Advanced):** Giới hạn số request/phút kết hợp với hạn mức dung lượng token/ngày.
- **Cursor / Codeium / Copilot:** Reset theo chu kỳ ngày (24h) hoặc chu kỳ chuỗi tháng (billing cycle).

---

## 2.2 Thuật Toán Tính Toán Trạng Thái Quota

Trong mã nguồn TokenWallet, mỗi tài khoản AI (\`AIAccount\`) được quản lý với 3 trường dữ liệu thời gian quan trọng:
- \`status\`: Trạng thái hiện tại (\`'active'\` - sẵn sàng dùng, \`'exhausted'\` - đã cạn hạn mức, \`'cooling'\` - đang trong thời gian hạ nhiệt, \`'suspended'\` - tạm khóa).
- \`reset_time\`: Chuỗi ISO timestamp chỉ thời điểm chính xác hạn mức sẽ được phục hồi.
- \`step_hours\`: Bước nhảy chu kỳ tính bằng giờ (mặc định Claude là 5 giờ, OpenAI là 3 giờ, hàng ngày là 24 giờ).

### Công Thức Tính Thời Gian Còn Lại (Remaining Duration):
$$\\Delta T = T_{\\text{reset}} - T_{\\text{now}}$$

Nếu $\\Delta T \\le 0$, tài khoản được coi là đã qua mốc reset và sẵn sàng tái kích hoạt.

---

## 2.3 Thuật Toán Tự Động Nhảy Chu Kỳ (The Roll-Forward Algorithm)

Một vấn đề phổ biến xảy ra khi người dùng không mở app đúng vào giây phút reset: \`reset_time\` trong quá khứ bị cũ đi nhiều ngày. Thuật toán \`rollForward()\` trong \`TokenWallet.tsx\` tự động cộng dồn các bước nhảy chu kỳ (\`step_hours\`) cho đến khi mốc reset mới rơi vào tương lai:

\`\`\`typescript
export function rollForwardResetTime(pastResetIso: string, stepHours: number): string {
  const resetDate = new Date(pastResetIso);
  const now = new Date();
  
  if (resetDate.getTime() > now.getTime()) {
    return pastResetIso; // Chưa hết hạn, giữ nguyên
  }

  const stepMs = stepHours * 60 * 60 * 1000;
  const elapsedMs = now.getTime() - resetDate.getTime();
  const cyclesToAdd = Math.floor(elapsedMs / stepMs) + 1;
  
  const nextResetDate = new Date(resetDate.getTime() + cyclesToAdd * stepMs);
  return nextResetDate.toISOString();
}
\`\`\`

Nhờ thuật toán này, người dùng chỉ cần thiết lập mốc giờ một lần duy nhất, hệ thống sẽ tự động đồng bộ chu kỳ liên tục mà không cần cập nhật thủ công mỗi ngày.`,
    keyTakeaways: [
      'Claude Pro sử dụng cửa sổ 5 giờ, ChatGPT sử dụng chu kỳ 3 giờ.',
      'Thuật toán rollForward tự động tính toán số chu kỳ cần bù khi ứng dụng mở lại sau thời gian dài.',
      'Đồng hồ đếm ngược hiển thị thời gian chính xác từng giây giúp lập trình viên chủ động chuyển đổi giữa các tài khoản.'
    ]
  },
  {
    id: 'tw-ch3-natural-language-time-parser',
    chapterNumber: 3,
    title: 'Chương 3: Bộ Phân Tích Thời Gian Tự Nhiên (Natural Language Time Parser)',
    subtitle: 'Giải Mã Biểu Thức Regex Tinh Vi: Xử Lý Tiếng Việt, Giờ Giấc & Ngày Tháng',
    readingTimeMinutes: 15,
    summary: 'Tìm hiểu cơ chế hoạt động của timeParser.ts – phân tích các câu lệnh tự nhiên của người dùng để sinh ra ISO timestamp chuẩn xác.',
    content: `## 3.1 Thách Thức Khi Nhập Dữ Liệu Thời Gian

Giao diện date-picker truyền thống đòi hỏi nhiều thao tác click chuột và chọn lịch rườm rà. Trong khi đó, lập trình viên thường đọc thông báo từ Claude/ChatGPT dạng câu chữ:
- *"reset lúc 15:30"*
- *"3 giờ nữa"*
- *"45 phút nữa"*
- *"9h tối mai"*
- *"thứ sáu lúc 8h sáng"*

JohnnyHoang Token Wallet trang bị bộ xử lý ngôn ngữ tự nhiên thuần Regex (\`timeParser.ts\`), cho phép người dùng gõ hoặc dán nguyên văn thông báo vào ô input, hệ thống tự động suy luận ra mốc \`Date\` tuyệt đối.

---

## 3.2 Bốn Nhóm Mẫu Phân Tích (Parsing Strategies)

### Nhóm 1: Thời Gian Tương Đối (Relative Duration)
Bắt các cấu trúc: \`Xh\`, \`X tiếng\`, \`X giờ\`, \`Yp\`, \`Y phút\`, \`Z ngày\`...
\`\`\`typescript
const relativeRegex = /(\\d+)\\s*(h|tiếng|giờ|p|phút|m|min|minutes|d|ngày)\\s*(nữa|sau)?/i;
\`\`\`
Nếu phát hiện \`3 tiếng 20 phút nữa\`, hệ thống cộng $3 \\times 3600 + 20 \\times 60$ giây vào thời điểm hiện tại.

### Nhóm 2: Giờ Giấc Trong Ngày (Time-of-day / 12h & 24h)
Bắt các mẫu: \`15:30\`, \`15h30\`, \`8pm\`, \`8:30 tối\`, \`6h sáng\`.
- Tự động chuyển đổi mốc PM / tối sang định dạng 24h ($8\\text{pm} \\rightarrow 20:00$).
- Nếu mốc giờ nhập vào nhỏ hơn giờ hiện tại (ví dụ hiện tại 16h mà nhập "10h"), parser tự động hiểu là **10h sáng ngày mai**.

### Nhóm 3: Ngày Cố Định Kèm Giờ (Date + Time)
Bắt các mẫu: \`25/09 14:00\`, \`2026-09-25 18:30\`, \`mai lúc 3h chiều\`.

### Nhóm 4: Thứ Trong Tuần (Day of Week)
Bắt các từ khóa: \`thứ 2\`, \`thứ năm\`, \`chủ nhật\`... Hệ thống tính toán khoảng cách số ngày từ ngày hiện tại đến ngày trong tuần tiếp theo.

---

## 3.3 Quy Trình Kiểm Thử & Edge Cases

Bộ parser xử lý triệt để các trường hợp biên nguy hiểm:
1. **Dấu chấm / Dấu hai chấm lẫn lộn:** \`15.30\` vs \`15:30\`.
2. **Chữ hoa chữ thường và dấu tiếng Việt:** \`TỐI MAI\`, \`toi mai\`, \`sáng mai\`.
3. **Mốc giao thừa / Chuyển tháng:** Chuyển đổi ngày cuối tháng sang ngày 1 tháng sau an toàn mà không bị tràn bộ nhớ \`Date\`.`,
    keyTakeaways: [
      'Giao tiếp tự nhiên không cần Date-picker phức tạp.',
      'Bộ Regex 4 tầng bao phủ Relative, Time-of-day, Date+Time và Day-of-week.',
      'Tự động suy luận ngày mai nếu mốc giờ đã trôi qua trong ngày hôm nay.'
    ]
  },
  {
    id: 'tw-ch4-payment-schedule-cashflow',
    chapterNumber: 4,
    title: 'Chương 4: Quản Trị Chi Phí Định Kỳ & Dòng Tiền (Payment Schedule & Cashflow)',
    subtitle: 'Bóc Tách Hóa Đơn Tự Động, Quản Lý Thẻ Thanh Toán & Chu Kỳ Thu Phí',
    readingTimeMinutes: 13,
    summary: 'Chi tiết module Payment Schedule, quản lý các khoản chi tiêu SaaS, phân loại thẻ ngân hàng và bộ parser bóc tách hóa đơn tự nhiên.',
    content: `## 4.1 Cấu Trúc Bản Ghi Thanh Toán (Payment Schedule Schema)

Một khoản chi trả dịch vụ phần mềm trong \`tkw_payment_schedules\` bao gồm các thuộc tính cốt lõi:
- \`service_name\`: Tên dịch vụ (Cursor AI, Claude Pro, Supabase Pro, Vercel, iCloud...).
- \`amount\` & \`currency\`: Số tiền và loại tiền tệ (\`USD\` hoặc \`VND\`).
- \`billing_cycle\`: Chu kỳ (\`monthly\` - hàng tháng, \`yearly\` - hàng năm, \`weekly\` - hàng tuần, \`one_time\` - một lần).
- \`due_date\` / \`due_day\`: Hạn thanh toán (Ngày cụ thể hoặc ngày trong tháng từ 1 đến 31).
- \`payment_method\`: Phương thức (Thẻ Techcombank Visa, VCB Master, MoMo, PayPal, Auto-debit).
- \`payer_email\`: Email đăng ký gói dịch vụ.
- \`status\`: Trạng thái (\`pending\` - chờ đóng, \`paid\` - đã thanh toán, \`cancelled\` - đã hủy).

---

## 4.2 Natural Language Payment Parser (\`paymentParser.ts\`)

Module này cho phép dán bất kỳ đoạn tin nhắn ngân hàng hoặc thông báo gia hạn nào để tự động điền form:

\`\`\`typescript
// Ví dụ đầu vào: "Thanh toán Cursor 20$ thẻ Techcombank visa ngày 15 hàng tháng email dev@gmail.com"
// Kết quả Parser trả về:
{
  service_name: "Cursor",
  amount: 20,
  currency: "USD",
  billing_cycle: "monthly",
  due_day: 15,
  payment_method: "Techcombank Visa",
  payer_email: "dev@gmail.com"
}
\`\`\`

### Các Biểu Thức Trích Xuất Tiêu Biểu:
1. **Trích xuất tiền tệ:** Regex phát hiện \`$20\`, \`20 usd\`, \`500k\`, \`500.000 đ\`, \`1.200.000 vnd\`. Tự động chuẩn hóa về số nguyên/thập phân và xác định loại tiền tệ.
2. **Trích xuất Email:** \`/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/\`.
3. **Trích xuất Thẻ:** Tìm kiếm từ khóa các ngân hàng phổ biến (VCB, TCB, MB, ACB, VPBank, Timo, BIDV, Sacombank) kết hợp với các loại thẻ (Visa, Mastercard, JCB, Debit, Credit).

---

## 4.3 Thống Kê & Cảnh Báo Cận Hạn (Due Date Warning)

Hệ thống cung cấp widget tổng quan dòng tiền:
- Tổng chi phí hàng tháng quy đổi: $Total = \\sum USD \\times FX\\_Rate + \\sum VND$.
- Đánh dấu màu sắc theo độ khẩn cấp:
  - **Đỏ (Urgent):** Đến hạn trong vòng 48 giờ.
  - **Vàng (Upcoming):** Đến hạn trong 7 ngày tới.
  - **Xanh (Safe):** Còn trên 7 ngày.`,
    keyTakeaways: [
      'Tập trung toàn bộ hóa đơn SaaS, AI tools và Server hosting vào một bảng điều khiển.',
      'Bộ parser bóc tách tự động số tiền, loại tiền tệ, ngày đến hạn và email sở hữu.',
      'Cảnh báo trực quan theo cấp độ màu sắc giúp không bao giờ bị gián đoạn dịch vụ do trễ hạn.'
    ]
  },
  {
    id: 'tw-ch5-app-wallet-portfolio',
    chapterNumber: 5,
    title: 'Chương 5: App Wallet – Quản Trị Kho 17+ Ứng Dụng Trong Hệ Sinh Thái',
    subtitle: 'Đồng Bộ GitHub, Vercel, Quản Lý Backlog Và Phân Loại Trạng Thái Vòng Đời',
    readingTimeMinutes: 14,
    summary: 'Tìm hiểu cách TokenWallet quản lý toàn bộ hệ sinh thái dự án phần mềm, phân loại trạng thái, lưu trữ metadata và quản lý backlog phát triển.',
    content: `## 5.1 Bức Tranh Toàn Cảnh Hệ Sinh Thái Ứng Dụng

JohnnyHoang sở hữu một hệ sinh thái gồm hơn 17 ứng dụng chuyên biệt phục vụ nhiều lĩnh vực:
- **Cloud & DevOps:** AWS Mastery, Azure Guide, Vercel Monorepo Hub, Cloud Architecture.
- **AI & Automation:** Token Wallet, AI Agent Swarm, Prompt Engineering Studio.
- **Productivity & Business:** App System, Task Orchestrator, Financial Dashboard.

Mỗi ứng dụng có một vòng đời độc lập, đòi hỏi phải giám sát:
1. Đường dẫn mã nguồn nội bộ (Local Path) & Remote GitHub Repo.
2. Domain triển khai Production trên Vercel / Cloudflare.
3. Trạng thái phát triển: \`planning\` (Lập kế hoạch), \`in_progress\` (Đang code), \`live\` (Đã vận hành), \`archived\` (Đóng băng).
4. Tech-stack chi tiết và các kết nối cơ sở dữ liệu.

---

## 5.2 Quản Lý Backlog Tích Hợp (In-App Backlog Items)

Thay vì phải mở Jira hoặc Trello nặng nề, App Wallet tích hợp bảng \`tkw_app_backlog_items\` ngay bên trong mỗi thẻ dự án:
- Phân loại: \`feature\` (Tính năng mới), \`bug\` (Lỗi cần fix), \`refactor\` (Tối ưu mã nguồn), \`docs\` (Tài liệu).
- Mức độ ưu tiên (\`priority\`): \`urgent\`, \`high\`, \`medium\`, \`low\`.
- Trạng thái tiến độ: \`todo\`, \`in_progress\`, \`done\`.

---

## 5.3 Đồng Bộ & Liên Kết Công Cụ Ngoại Vi

Module tích hợp các nút bấm thao tác nhanh một chạm:
- **Open GitHub:** Mở trực tiếp repo trên trình duyệt.
- **Open Vercel:** Truy cập bảng điều khiển deployment và logs thời gian thực.
- **View Specs:** Xem tài liệu đặc tả kiến trúc được sinh bởi AI.`,
    keyTakeaways: [
      'Quản lý tập trung 17+ dự án phần mềm cá nhân và doanh nghiệp.',
      'Tích hợp Backlog tinh gọn ngay trong từng dự án, loại bỏ sự cồng kềnh của công cụ bên thứ ba.',
      'Liên kết một chạm với GitHub, Vercel và Production Domain.'
    ]
  },
  {
    id: 'tw-ch6-ai-srs-spec-builder',
    chapterNumber: 6,
    title: 'Chương 6: Động Cơ Sinh Đặc Tả Kỹ Thuật AI (AI SRS Technical Spec Builder)',
    subtitle: 'Tự Động Tạo Tài Liệu Yêu Cầu Phần Mềm (SRS) Song Ngữ Bằng Gemini & GPT-4o',
    readingTimeMinutes: 16,
    summary: 'Phân tích chi tiết module aiAppBuilder.ts: Kỹ thuật thiết kế System Prompt, cơ chế Fallback Heuristic và định dạng xuất tài liệu Markdown chuyên nghiệp.',
    content: `## 6.1 Sứ Mệnh Của AI SRS Builder

Viết tài liệu đặc tả yêu cầu kỹ thuật (Software Requirements Specification - SRS) là một công việc tốn nhiều thời gian nhưng bắt buộc phải có để định hướng việc code của các AI Coding Agents (như Cursor, Antigravity, Copilot Workspace).

Module \`aiAppBuilder.ts\` trong Token Wallet cho phép người dùng chỉ cần nhập một ý tưởng ngắn (ví dụ: *"Ứng dụng quản lý thư viện sách cá nhân có OCR quét bìa sách"*), hệ thống sẽ tự động gọi AI để sinh ra một bộ hồ sơ kỹ thuật hoàn chỉnh gồm 8 mục tiêu chuẩn.

---

## 6.2 Cấu Trúc Bộ Hồ Sơ Kỹ Thuật Chuẩn

Tài liệu được sinh ra với định dạng Markdown chuyên nghiệp gồm:
1. **Executive Summary & Problem Statement:** Bối cảnh và bài toán cốt lõi.
2. **Target Audience & Core Personas:** Đối tượng người dùng mục tiêu.
3. **Feature Specifications & User Stories:** Danh sách tính năng chi tiết dạng Gherkin (*Given/When/Then*).
4. **Recommended Tech Stack:** Đề xuất công nghệ tối ưu (Frontend, Backend, Database, Auth, Storage).
5. **Database Schema Design:** Thiết kế bảng PostgreSQL kèm kiểu dữ liệu và khóa ngoại.
6. **API Contracts & Endpoints:** Định nghĩa danh sách REST / RPC endpoints.
7. **Security, Privacy & RLS Rules:** Quy tắc bảo mật và phân quyền cơ sở dữ liệu.
8. **Phased Implementation Roadmap:** Lộ trình phát triển 4 giai đoạn (MVP, Beta, Production, Scale).

---

## 6.3 Cơ Chế Dual-Engine AI & Heuristic Fallback

Để đảm bảo tính sẵn sàng 100% ngay cả khi mất mạng hoặc hết quota API:
1. **Primary Engine:** Gọi Google Gemini 2.5 Flash thông qua REST endpoint tốc độ cao.
2. **Secondary Engine:** Dự phòng gọi OpenAI GPT-4o-mini nếu Gemini trả về lỗi.
3. **Heuristic Offline Template Generator:** Nếu hoàn toàn không có kết nối internet, hệ thống kích hoạt bộ máy sinh tài liệu cục bộ dựa trên từ khóa phân tích ngữ nghĩa (\`semantic keyword extraction\`), sinh ra bộ khung SRS chuẩn chỉ trong 5 mili-giây.`,
    keyTakeaways: [
      'Tự động hóa hoàn toàn quy trình lập hồ sơ đặc tả kỹ thuật phần mềm (SRS).',
      'Định dạng Markdown 8 phần chuẩn mực cho AI Coding Agents lập trình.',
      'Kiến trúc 3 lớp: Gemini API -> OpenAI API -> Heuristic Offline Fallback an toàn tuyệt đối.'
    ]
  },
  {
    id: 'tw-ch7-database-design-rls',
    chapterNumber: 7,
    title: 'Chương 7: Thiết Kế Cơ Sở Dữ Liệu & Bảo Mật Đa Tầng Supabase RLS',
    subtitle: 'Phân Tích Schema PostgreSQL, Hàm Security Definer và Chính Sách Phân Quyền',
    readingTimeMinutes: 15,
    summary: 'Mổ xẻ toàn bộ schema SQL, các bảng dữ liệu tkw_*, hàm kiểm tra quyền tkw_perm() và chính sách Row Level Security (RLS) bảo vệ dữ liệu.',
    content: `## 7.1 Cấu Trúc Bảng Dữ Liệu PostgreSQL (\`tkw_*\`)

Toàn bộ dữ liệu của Token Wallet được lưu trữ trong cơ sở dữ liệu PostgreSQL trên Supabase với tiền tố \`tkw_\` để tránh xung đột với các ứng dụng khác trong cùng cơ sở dữ liệu:

\`\`\`sql
-- 1. Bảng công cụ AI
CREATE TABLE tkw_ai_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  default_step_hours INT DEFAULT 5,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Bảng tài khoản AI & Quota
CREATE TABLE tkw_ai_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tkw_ai_tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  account_email TEXT NOT NULL,
  account_label TEXT,
  status TEXT CHECK (status IN ('active', 'exhausted', 'cooling', 'suspended')),
  reset_time TIMESTAMPTZ,
  step_hours INT DEFAULT 5,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Bảng lịch thanh toán
CREATE TABLE tkw_payment_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  service_name TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  billing_cycle TEXT DEFAULT 'monthly',
  due_date TIMESTAMPTZ,
  due_day INT,
  payment_method TEXT,
  payer_email TEXT,
  status TEXT DEFAULT 'pending',
  auto_debit BOOLEAN DEFAULT false
);

-- 4. Bảng ứng dụng trong hệ sinh thái
CREATE TABLE tkw_app_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  local_path TEXT,
  github_url TEXT,
  vercel_url TEXT,
  production_domain TEXT,
  tech_stack TEXT[],
  srs_markdown TEXT,
  status TEXT DEFAULT 'live'
);
\`\`\`

---

## 7.2 Cơ Chế Phân Quyền Bảo Mật Bằng Security Definer

Để kiểm soát quyền truy cập linh hoạt giữa Admin và Member mà không làm chậm hiệu năng, một hàm \`SECURITY DEFINER\` được sử dụng:

\`\`\`sql
CREATE OR REPLACE FUNCTION tkw_perm(required_flag TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Kiểm tra xem user hiện tại có permission flag tương ứng trong bảng tkw_user_permissions không
  RETURN EXISTS (
    SELECT 1 FROM tkw_user_permissions
    WHERE user_id = auth.uid()
      AND (permission = required_flag OR permission = 'admin_all')
  );
END;
$$;
\`\`\`

---

## 7.3 Thiết Lập Row Level Security (RLS)

Mỗi bảng đều được bảo vệ bởi RLS:
\`\`\`sql
ALTER TABLE tkw_payment_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only view their own payment schedules"
ON tkw_payment_schedules
FOR SELECT
USING (auth.uid() = user_id OR tkw_perm('view_all_payments'));

CREATE POLICY "Users can modify their own payments"
ON tkw_payment_schedules
FOR ALL
USING (auth.uid() = user_id);
\`\`\``,
    keyTakeaways: [
      'Tiền tố tkw_* chuẩn hóa toàn bộ cấu trúc bảng trên PostgreSQL Supabase.',
      'Hàm tkw_perm() dạng SECURITY DEFINER tối ưu hóa tốc độ kiểm tra quyền hạn.',
      'Row Level Security (RLS) ngăn chặn triệt để rò rỉ dữ liệu giữa các người dùng.'
    ]
  },
  {
    id: 'tw-ch8-ui-ux-design-system',
    chapterNumber: 8,
    title: 'Chương 8: Thiết Kế UI/UX & Hệ Thống Tương Tác Tốc Độ Cao',
    subtitle: 'Nghệ Thuật Xây Dựng Giao Diện Cyberpunk/Fintech Tối Giản, Không Thừa Thãi',
    readingTimeMinutes: 11,
    summary: 'Tìm hiểu triết lý thiết kế giao diện của TokenWallet: Màu sắc, hiệu ứng thị giác, tối ưu hóa thao tác người dùng và khả năng đáp ứng di động.',
    content: `## 8.1 Triết Lý Thiết Kế Giao Diện (Visual Identity)

Token Wallet mang phong cách giao diện kết hợp giữa **Fintech Hiện Đại** và **Cyberpunk Console**:
- **Bảng Màu Chủ Đạo:** Nền tối sâu (\`slate-950\` / \`zinc-950\`), các điểm nhấn năng lượng màu Xanh Ngọc Emerald (\`#10b981\`) tượng trưng cho dòng tiền và trạng thái sẵn sàng, màu Hổ Phách Amber (\`#f59e0b\`) cảnh báo thời gian reset và hạn thanh toán, và màu Tím Indigo (\`#6366f1\`) cho các tính năng AI.
- **Card Design:** Bo góc lớn (\`rounded-2xl\`), viền siêu mảnh (\`border-slate-800/60\`), hiệu ứng đổ bóng mờ và phản chiếu ánh sáng nhẹ khi rê chuột (*Subtle Glow Hover Effect*).

---

## 8.2 Tối Giản Thao Tác – Zero Friction Interaction

Mọi tương tác trong Token Wallet đều được thiết kế để hoàn thành với số lần click chuột ít nhất:
1. **Quick Reset Action:** Nút 1-click để reset mốc quota ngay lập tức mà không cần mở modal chỉnh sửa.
2. **Inline Copy & Paste:** Nhấp vào token, email hoặc lệnh prompt để copy thẳng vào clipboard kèm toast thông báo tinh tế.
3. **Smart Keyboard Shortcuts:** Hỗ trợ phím tắt \`Ctrl+K\` để tìm kiếm nhanh dự án hoặc chuyển tab tức thì.

---

## 8.3 Auto-Hide Slide-Over Drawer

Tương tự thiết kế của các ứng dụng đọc sách chuyên nghiệp, thanh mục lục (Table of Contents) được ẩn đi mặc định để dành 100% không gian cho việc đọc và theo dõi, chỉ trượt ra êm ái khi người dùng click vào nút mục lục nổi hoặc chạm vào cạnh màn hình.`,
    keyTakeaways: [
      'Bảng màu Dark Mode Fintech sang trọng, tập trung sự chú ý vào các chỉ số trọng yếu.',
      'Tối ưu thao tác 1-click cho các tác vụ lặp đi lặp lại hàng ngày.',
      'Thanh điều hướng Auto-Hide giúp tối đa hóa không gian trải nghiệm.'
    ]
  },
  {
    id: 'tw-ch9-performance-offline-sync',
    chapterNumber: 9,
    title: 'Chương 9: Tối Ưu Hiệu Năng & Đồng Bộ Dữ Liệu Offline-First',
    subtitle: 'Tối Ưu Bundle, Quản Lý State Với Zustand/React Context & Chiến Lược Caching',
    readingTimeMinutes: 13,
    summary: 'Phân tích các kỹ thuật tối ưu hóa hiệu năng, giảm thời gian tải trang dưới 0.5s và đảm bảo ứng dụng hoạt động mượt mà khi mất kết nối mạng.',
    content: `## 9.1 Chiến Lược Tối Ưu Hóa Hiệu Năng Frontend

Để đạt điểm tuyệt đối 100/100 trên Google Lighthouse:
1. **Code-Splitting & Dynamic Imports:** Tách các modal nặng như \`AppPortfolioModal\`, \`AddAppModal\` và các bộ parser thành các chunks riêng biệt, chỉ nạp khi người dùng mở modal:
   \`\`\`typescript
   const AppPortfolioModal = React.lazy(() => import('./AppPortfolioModal'));
   \`\`\`
2. **Tránh Re-render Lãng Phí:** Các đồng hồ đếm ngược được bao bọc trong các custom hooks chuyên biệt (\`useCountdown\`), chỉ kích hoạt re-render cục bộ tại component con chứa con số thời gian mà không làm re-render toàn bộ danh sách thẻ.

---

## 9.2 Chiến Lược Caching & Offline-First

Khi lập trình viên làm việc trên máy bay hoặc khu vực sóng yếu:
- Toàn bộ danh mục tài khoản AI và dự án được lưu đệm trong \`localStorage\` / \`IndexedDB\`.
- Khi có kết nối mạng trở lại, hệ thống sử dụng thuật toán **Optimistic UI Updates** – hiển thị thay đổi ngay lập tức trên màn hình trước khi request gửi tới Supabase hoàn tất.
- Nếu xảy ra xung đột dữ liệu (Data Conflict), nguyên tắc **Last-Write-Wins (LWW)** dựa trên trường \`updated_at\` được áp dụng một cách nhất quán.`,
    keyTakeaways: [
      'Code-splitting giúp bundle ban đầu siêu nhẹ, nạp trang dưới 500ms.',
      'Custom hook useCountdown cô lập re-render, đảm bảo giao diện 60 FPS mượt mà.',
      'Kiến trúc Offline-First với Optimistic Updates đảm bảo làm việc không gián đoạn.'
    ]
  },
  {
    id: 'tw-ch10-future-roadmap-mcp',
    chapterNumber: 10,
    title: 'Chương 10: Định Hướng Phát Triển Tương Lai & Hệ Sinh Thái MCP Server',
    subtitle: 'Xây Dựng MCP Server Cho Token Wallet, Tự Động Hóa Banking Webhook & AI Optimizer',
    readingTimeMinutes: 18,
    summary: 'Kế hoạch phát triển dài hạn: Biến TokenWallet thành MCP Server cho AI Agents, tích hợp Webhook ngân hàng SePAY và thuật toán gợi ý chuyển đổi tài khoản AI thông minh.',
    content: `## 10.1 Xây Dựng TokenWallet Model Context Protocol (MCP) Server

Một trong những định hướng đột phá nhất cho Token Wallet là trở thành một **MCP Server** chính thức cho các AI Coding Agents (như Cursor, Windsurf, Claude Desktop, Antigravity):

### Kịch Bản Vận Hành Tương Lai:
Khi bạn đang code trong Cursor và tài khoản Claude Pro 1 của bạn báo hết hạn ngạch, AI Coding Agent sẽ tự động gọi công cụ MCP:
\`\`\`json
{
  "tool": "tokenwallet_get_active_ai_account",
  "parameters": { "preferred_model": "claude-3-5-sonnet" }
}
\`\`\`
TokenWallet MCP Server sẽ phân tích toàn bộ tài khoản sẵn có và trả về:
*"Tài khoản Claude 2 đang sẵn sàng 100% quota (reset cách đây 20 phút). Đang tự động chuyển Token API sang Claude 2 cho bạn."*

---

## 10.2 Tích Hợp Webhook Ngân Hàng Tự Động (Banking Open API & SePAY)

Thay vì phải nhập tay các giao dịch đã thanh toán:
- Tích hợp Webhook với hệ thống thanh toán tự động (như SePAY, Casso hoặc OpenBanking APIs).
- Khi tài khoản ngân hàng Techcombank/Vietcombank có biến động số dư thanh toán tiền cho Vercel/Cursor, Webhook tự động đánh dấu bản ghi thanh toán sang trạng thái \`paid\` và tự động dời ngày hẹn sang chu kỳ tháng tiếp theo.

---

## 10.3 AI Cost Optimizer – Tối Ưu Hóa Chi Phí Dự Án

Thuật toán AI phân tích mức độ sử dụng thực tế của từng ứng dụng và tài khoản:
- Phát hiện các tài khoản SaaS trả phí nhưng không có hoạt động trong 30 ngày qua và đề xuất hạ gói (Downgrade).
- Gợi ý gộp các dự án Vercel/Supabase nhỏ vào cùng một Database Project để tiết kiệm chi phí hàng tháng.

---

## 10.4 Mobile Native / PWA Với Push Notification

- Triển khai phiên bản Progressive Web App (PWA) hoàn chỉnh với Service Worker.
- Gửi thông báo đẩy (Web Push Notifications) lên điện thoại: *"Claude Pro của bạn đã hồi phục 100% quota – Bạn có thể tiếp tục dự án!"* hoặc *"Thẻ Visa sẽ bị trừ phí Vercel Pro $20 vào ngày mai."*`,
    keyTakeaways: [
      'MCP Server sẽ cho phép các AI Agents tự động chuyển đổi tài khoản AI khi hết hạn ngạch.',
      'Tự động hóa thanh toán thông qua Webhook ngân hàng SePAY / OpenBanking.',
      'AI Cost Optimizer giúp tiết kiệm hàng trăm USD chi phí SaaS mỗi năm.',
      'Push Notifications thông báo ngay khi tài khoản hồi phục quota.'
    ]
  }
];
