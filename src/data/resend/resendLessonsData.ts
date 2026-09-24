import { ResendChapter } from '../../types/resendModule';

export const RESEND_CHAPTERS: ResendChapter[] = [
  {
    id: 'resend-ch1-philosophy-modern-api',
    chapterNumber: 1,
    title: 'Triết Lý Resend: Tái Định Nghĩa Trải Nghiệm Email Của Lập Trình Viên',
    subtitle: 'Tại sao các dịch vụ email truyền thống (SendGrid, Mailgun) khiến Developer đau đầu, và cách Resend tạo nên một cuộc cách mạng DX.',
    level: 'Cơ bản',
    readTimeMinutes: 14,
    category: 'overview_philosophy',
    summary: 'Resend là nền tảng Email API thế hệ mới được xây dựng từ đầu cho các lập trình viên hiện đại, tích hợp chặt chẽ với React Email, giao diện điều khiển siêu tối giản, tốc độ gửi dưới 1 giây và hệ thống xác thực tên miền DNS chỉ mất 30 giây.',
    hookStory: 'Năm 2022, hai nhà sáng lập Zeno Rocha và Bu Kinoshita phát ngán với các dịch vụ gửi email doanh nghiệp lâu đời: Giao diện web tải chậm chạp với hàng trăm menu rối rắm, tài khoản liên tục bị khóa vô cớ trong lúc đăng ký, và lập trình viên vẫn phải viết template email bằng những chuỗi nối chuỗi HTML Table xấu xí như thập niên 1990. Họ quyết định tạo ra Resend với phương châm: "Email dành riêng cho lập trình viên — Gửi bức thư đầu tiên chỉ bằng 3 dòng code trong vòng chưa đầy 60 giây".',
    sections: [
      {
        heading: '1. Nỗi Đau Gửi Email Cổ Điển vs Trải Nghiệm Resend',
        subheading: 'Sự chuyển dịch từ SMTP Socket phức tạp sang HTTP REST API tinh gọn',
        content: `Gửi email trong ứng dụng hiện đại từng là một trải nghiệm đáng sợ:
• **Vấn đề SMTP Socket**: Kết nối SMTP TCP truyền thống (Port 25/587) thường xuyên bị các nền tảng Serverless (Vercel, AWS Lambda, Cloudflare Workers) ngắt kết nối do vượt quá timeout hoặc bị tường lửa chặn.
• **Vấn đề Template HTML**: Mỗi email client (Outlook, Gmail, Apple Mail) render HTML theo cách khác nhau, khiến lập trình viên phải vật lộn với bảng lồng bảng \`<table><tr><td>\`.

**Resend giải quyết triệt để các vấn đề trên:**
1. **100% HTTP REST API**: Gọi hàm qua giao thức HTTPS chuẩn (Port 443), không bị chặn cổng, hoàn hảo cho Serverless & Edge.
2. **React Email Native**: Viết template email bằng React components với Typescript và Tailwind CSS.
3. **Domain Verification Tức Thì**: Tự động sinh mã DNS SPF/DKIM chuẩn xác, kiểm tra trạng thái xác minh chỉ trong 1 cú click.`,
        mindsetShift: {
          from: 'Dùng nodemailer mở kết nối SMTP socket truyền thống trong môi trường Serverless Next.js.',
          to: 'Sử dụng Resend SDK gọi HTTP API qua HTTPS với thời gian phản hồi dưới 800ms.',
          impact: 'Triệt tiêu hoàn toàn lỗi Connection Timeout và Cold Start trong các hàm Serverless.'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Cài đặt thư viện Resend SDK chính thức',
        command: 'npm install resend',
        description: 'Cài đặt gói SDK TypeScript/JavaScript chính thức từ Resend'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ sự khác biệt giữa gửi email qua giao thức SMTP Socket và HTTP REST API.',
      'Giải thích được lý do Resend là lựa chọn hàng đầu cho các ứng dụng Serverless.',
      'Đăng ký tài khoản và lấy API Key đầu tiên từ Resend Dashboard.'
    ]
  },
  {
    id: 'resend-ch2-rest-api-sdks',
    chapterNumber: 2,
    title: 'Gửi Email Với REST API & Bộ SDK Đa Ngôn Ngữ',
    subtitle: 'Làm chủ cú pháp gửi thư bằng TypeScript, Python, Go, cURL và cấu hình tiêu đề X-Entity-Ref-ID.',
    level: 'Cơ bản',
    readTimeMinutes: 15,
    category: 'rest_api_sdks',
    summary: 'Resend cung cấp bộ SDK chính thức cho nhiều ngôn ngữ lập trình. Với cú pháp async/await sáng sủa và TypeScript Types đầy đủ, việc gửi email trở nên an toàn và dễ bảo trì.',
    hookStory: 'Bạn chỉ cần đúng 1 lệnh cURL từ terminal là có thể gửi một bức email hoàn chỉnh đến hộp thư cá nhân thông qua Resend API mà không cần cài đặt bất kỳ phần mềm nào trên máy tính.',
    sections: [
      {
        heading: '1. Cấu Trúc Payload Chuẩn Của Resend API',
        subheading: 'Các trường dữ liệu quan trọng khi gửi email',
        content: `Khi gọi API \`resend.emails.send()\`:
• \`from\`: Bắt buộc. Phải thuộc tên miền đã xác minh (ví dụ: \`Acme <support@acme.com>\`) hoặc tên miền thử nghiệm mặc định \`onboarding@resend.dev\`.
• \`to\`: Mảng các địa chỉ email người nhận.
• \`subject\`: Tiêu đề bức thư.
• \`html\` hoặc \`react\`: Nội dung hiển thị (chuỗi HTML hoặc React Element).
• \`text\`: Bản plain-text dự phòng cho các ứng dụng đọc thư không hỗ trợ HTML.
• \`attachments\`: Danh sách file đính kèm (hỗ trợ đọc từ URL hoặc Buffer Base64).
• \`headers\`: Các custom header như \`X-Entity-Ref-ID\` hoặc \`List-Unsubscribe\`.`,
        codeBlock: {
          language: 'typescript',
          title: 'Gửi Email Giao Dịch Đính Kèm File PDF (TypeScript)',
          code: `import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInvoiceEmail(customerEmail: string, invoicePdfBuffer: Buffer) {
  const { data, error } = await resend.emails.send({
    from: 'Finance Team <billing@yourdomain.com>',
    to: [customerEmail],
    subject: 'Hóa Đơn Thanh Toán Dịch Vụ #INV-2026',
    html: '<p>Cảm ơn bạn đã sử dụng dịch vụ. Hóa đơn đính kèm bên dưới.</p>',
    attachments: [
      {
        filename: 'invoice-2026.pdf',
        content: invoicePdfBuffer,
      },
    ],
    tags: [
      { name: 'category', value: 'billing' },
    ],
  });

  if (error) {
    console.error('Lỗi gửi email:', error);
    return { success: false, error };
  }

  console.log('Email đã gửi thành công, ID:', data?.id);
  return { success: true, id: data?.id };
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Gửi email thử nghiệm bằng cURL trực tiếp từ Terminal',
        command: 'curl -X POST https://api.resend.com/emails -H "Authorization: Bearer $RESEND_API_KEY" -H "Content-Type: application/json" -d \'{"from":"onboarding@resend.dev","to":"you@domain.com","subject":"Hello from cURL","html":"<p>Test cURL Resend</p>"}\'',
        description: 'Kiểm tra hoạt động của API Key mà không cần viết mã nguồn backend'
      }
    ],
    masteryChecklist: [
      'Gửi email thành thạo bằng Resend Node.js SDK.',
      'Biết cách đính kèm file (PDF, hình ảnh) qua Buffer hoặc URL.',
      'Sử dụng trường tags để phân loại chiến dịch gửi thư.'
    ]
  },
  {
    id: 'resend-ch3-react-email-templates',
    chapterNumber: 3,
    title: 'Nghệ Thuật Thiết Kế Email Với React Email & Tailwind CSS',
    subtitle: 'Tạm biệt nỗi ám ảnh HTML Table: Viết giao diện email đẹp mắt bằng React Components chuẩn TypeScript và xem trước thời gian thực (Hot Reload Preview).',
    level: 'Trung bình',
    readTimeMinutes: 18,
    category: 'react_email_templates',
    summary: 'React Email (@react-email/components) do chính đội ngũ Resend phát triển, cho phép bạn xây dựng email dạng component tái sử dụng, hỗ trợ Tailwind CSS và tự động biên dịch ra HTML tương thích 100% mọi trình đọc email (Outlook, Apple Mail, Gmail).',
    hookStory: 'Một designer gửi cho lập trình viên bản thiết kế email giao dịch Figma tuyệt đẹp với Dark Mode, nút bấm bo tròn và khoảng cách typography hoàn hảo. Nếu dùng HTML truyền thống, lập trình viên sẽ mất 3 ngày cắt mã HTML table và liên tục vỡ layout trên Microsoft Outlook 2016. Với React Email, họ chỉ mất 20 phút ghép các component <Html>, <Container>, <Button> và bật Tailwind CSS, email hiển thị hoàn hảo trên mọi thiết bị.',
    sections: [
      {
        heading: '1. Cấu Trúc Một Component React Email',
        subheading: 'Các components nền tảng: Html, Head, Preview, Body, Container, Section, Text, Button, Img',
        content: `React Email cung cấp các thẻ nguyên tử (Atomic Components) được chuẩn hóa:
• \`<Html>\` và \`<Head>\`: Định nghĩa khung tài liệu email chuẩn RFC.
• \`<Preview>\`: Đoạn văn bản tóm tắt hiển thị trên danh sách hòm thư (Preheader Text) trước khi người dùng mở thư.
• \`<Tailwind>\`: Bọc bên ngoài để sử dụng trực tiếp các class CSS quen thuộc (\`bg-slate-900\`, \`text-sky-400\`, \`rounded-xl\`).
• \`<Button>\`: Sinh ra mã HTML VML tương thích cả với Outlook trên Windows mà không bị mất màu nền.`,
        codeBlock: {
          language: 'tsx',
          title: 'Component Email Chào Mừng Thành Viên Mới (WelcomeEmail.tsx)',
          code: `import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  userName: string;
  loginUrl: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  userName = 'Bạn',
  loginUrl = 'https://yourdomain.com/login',
}) => {
  return (
    <Html>
      <Head />
      <Preview>Chào mừng bạn đến với nền tảng của chúng tôi!</Preview>
      <Tailwind>
        <Body className="bg-slate-950 font-sans py-8 text-slate-200">
          <Container className="max-w-xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <Text className="text-2xl font-bold text-sky-400 mb-4">
              Xin chào {userName}! 👋
            </Text>
            <Text className="text-slate-300 text-sm leading-relaxed mb-6">
              Tài khoản của bạn đã được kích hoạt thành công. Hãy bấm vào nút bên dưới để bắt đầu khám phá hệ sinh thái.
            </Text>
            <Section className="text-center my-6">
              <Button
                href={loginUrl}
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm"
              >
                Đăng Nhập Ngay →
              </Button>
            </Section>
            <Text className="text-xs text-slate-500 text-center border-t border-slate-800 pt-4 mt-6">
              © 2026 TechMaster. Nếu bạn không tạo tài khoản này, vui lòng bỏ qua.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Khởi động máy chủ xem trước giao diện React Email thời gian thực',
        command: 'npx email dev',
        description: 'Mở cổng localhost:3000 để xem trước giao diện email và test responsive di động'
      },
      {
        title: 'Cài đặt bộ thư viện React Email',
        command: 'npm install @react-email/components react-email',
        description: 'Cài đặt đầy đủ các component tạo giao diện email cho dự án'
      }
    ],
    masteryChecklist: [
      'Xây dựng template email bằng các component chuẩn của React Email.',
      'Sử dụng Tailwind CSS trong email mà không lo vỡ layout trên Outlook.',
      'Sử dụng lệnh email dev để xem trước và tinh chỉnh giao diện thời gian thực.'
    ]
  },
  {
    id: 'resend-ch4-domain-verification-dns',
    chapterNumber: 4,
    title: 'Xác Thực Tên Miền Đa Tầng: SPF, DKIM & MX Verification',
    subtitle: 'Hướng dẫn từng bước cấu hình bản ghi DNS để đạt trạng thái "Verified" và gửi thư với độ uy tín cao nhất.',
    level: 'Trung bình',
    readTimeMinutes: 16,
    category: 'domain_verification_dns',
    summary: 'Để gửi thư từ địa chỉ riêng (ví dụ: contact@yourdomain.com), bạn bắt buộc phải xác thực tên miền trên Resend. Hệ thống sẽ cấp cho bạn các bản ghi SPF, DKIM và MX để bảo vệ thương hiệu và đảm bảo thư không bị rơi vào hộp Spam.',
    hookStory: 'Bạn vừa đăng ký tài khoản Resend và gửi email từ địa chỉ admin@mycompany.com nhưng nhận được lỗi "Domain not verified". Tại sao vậy? Bởi vì nếu không có xác thực DNS, bất kỳ ai cũng có thể mạo danh tên miền của bạn để lừa đảo. Khi bạn thêm các bản ghi DNS mà Resend yêu cầu, bạn đang trao cho Resend "giấy ủy quyền hợp pháp" để gửi thư thay mặt bạn.',
    sections: [
      {
        heading: '1. Ba Bản Ghi DNS Resend Yêu Cầu',
        subheading: 'DKIM TXT, SPF MX và Return-Path',
        content: `Khi thêm domain vào Resend Dashboard:

1. **Bản ghi DKIM (DomainKeys Identified Mail - TXT Record)**:
   - Host: \`resend._domainkey\` (hoặc selector do Resend cấp).
   - Type: \`TXT\`
   - Value: Chứa chuỗi khóa công khai RSA/Ed25519 dài để máy chủ người nhận giải mã chữ ký số.

2. **Bản ghi SPF / Return-Path (MX Record cho Subdomain gửi)**:
   - Host: \`bounces.yourdomain.com\` (hoặc \`send.yourdomain.com\`).
   - Type: \`MX\` | Priority: \`10\` | Points to: \`feedback-smtp.us-east-1.amazonses.com\` (hoặc Resend MX).
   - Value TXT: \`v=spf1 include:amazonses.com ~all\`

3. **Bản ghi DMARC (TXT Record tại tên miền chính)**:
   - Host: \`_dmarc.yourdomain.com\`
   - Value: \`v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@yourdomain.com\``,
        proTip: 'Khuyên dùng Subdomain (ví dụ: mail.yourdomain.com hoặc notify.yourdomain.com) để gửi email giao dịch, giúp tách biệt uy tín với email nhân viên văn phòng.'
      }
    ],
    practicalCommands: [
      {
        title: 'Kiểm tra bản ghi DKIM của Resend bằng lệnh dig',
        command: 'dig TXT resend._domainkey.yourdomain.com +short',
        description: 'Kiểm tra xem bản ghi chữ ký số DKIM đã được phân giải thành công trên toàn cầu chưa'
      }
    ],
    masteryChecklist: [
      'Nắm vững quy trình thêm và xác thực domain trên Resend Dashboard.',
      'Cấu hình chính xác bản ghi DKIM TXT và Return-Path MX.',
      'Hiểu rõ lý do nên dùng Subdomain chuyên biệt cho Transactional Email.'
    ]
  },
  {
    id: 'resend-ch5-idempotency-batch-limits',
    chapterNumber: 5,
    title: 'Khóa Bất Biến (Idempotency Keys), Gửi Hàng Loạt & Rate Limits',
    subtitle: 'Bảo vệ hệ thống không bao giờ gửi trùng lặp email thanh toán/OTP và tối ưu hóa hiệu năng gửi 100 email trong một HTTP request duy nhất.',
    level: 'Nâng cao',
    readTimeMinutes: 16,
    category: 'idempotency_batch_limits',
    summary: 'Trong môi trường mạng không ổn định hoặc khi có retry tự động, Idempotency Keys đảm bảo một email chỉ được gửi đi ĐÚNG MỘT LẦN. Kết hợp tính năng Batch Sending giúp bạn gửi tới 100 email cùng lúc mà không lo nghẽn API.',
    hookStory: 'Khách hàng bấm nút "Thanh toán đơn hàng 5.000 USD". Mạng bị chập chờn, ứng dụng frontend tự động gửi lại request 3 lần. Nếu không có Idempotency Key, khách hàng sẽ nhận được 3 email xác nhận đơn hàng và hoảng loạn tưởng rằng thẻ tín dụng bị trừ tiền 3 lần! Nhờ Header Idempotency-Key của Resend, chỉ có duy nhất 1 email được phát đi.',
    sections: [
      {
        heading: '1. Cơ Chế Hoạt Động Của Idempotency Key',
        subheading: 'Chống gửi trùng lặp ở tầng hạ tầng API',
        content: `Khi bạn truyền header \`Idempotency-Key: order-invoice-10492\`:
1. Resend tiếp nhận request đầu tiên, xử lý gửi email và lưu kết quả cùng mã key trong 24 giờ.
2. Nếu máy chủ của bạn bị mất mạng và vô tình gửi lại chính xác request đó với cùng mã key, Resend sẽ nhận diện được ngay và trả về kết quả thành công trước đó mà **TUYỆT ĐỐI KHÔNG GỬI THÊM BỨC THƯ THỨ HAI**.`,
        codeBlock: {
          language: 'typescript',
          title: 'Gửi Email Hàng Loạt (Batch Sending) Lên Đến 100 Emails / Request',
          code: `import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBulkWelcomeEmails(users: { email: string; name: string }[]) {
  // Gửi tối đa 100 email trong đúng MỘT lời gọi API duy nhất
  const emailPayloads = users.map(user => ({
    from: 'Community <welcome@yourdomain.com>',
    to: [user.email],
    subject: \`Chào mừng \${user.name} gia nhập cộng đồng!\`,
    html: \`<p>Xin chào <strong>\${user.name}</strong>, chúc mừng bạn!</p>\`,
    headers: {
      'Idempotency-Key': \`welcome-\${user.email}-\${Date.now()}\`,
    }
  }));

  const { data, error } = await resend.batch.send(emailPayloads);

  if (error) {
    console.error('Lỗi gửi batch:', error);
    return;
  }

  console.log(\`Đã gửi thành công \${data?.data?.length} emails trong batch!\`);
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Kiểm tra giới hạn Rate Limit của tài khoản Resend',
        command: 'curl -I https://api.resend.com/emails -H "Authorization: Bearer $RESEND_API_KEY"',
        description: 'Xem các header RateLimit-Limit và RateLimit-Remaining trả về từ API'
      }
    ],
    masteryChecklist: [
      'Áp dụng Idempotency Key cho các luồng email nhạy cảm (OTP, hóa đơn, thanh toán).',
      'Sử dụng API resend.batch.send() để tối ưu hóa hiệu năng khi gửi số lượng lớn.',
      'Kiểm soát Rate Limit (mặc định 2 request/giây hoặc 10 request/giây trên gói Pro).'
    ]
  },
  {
    id: 'resend-ch6-webhooks-event-pipeline',
    chapterNumber: 6,
    title: 'Đường Ống Sự Kiện Webhooks: Theo Dõi Bounces, Complaints & Opens',
    subtitle: 'Xây dựng hệ thống tự động phản hồi sự kiện email thời gian thực và xác thực chữ ký số Webhook Svix an toàn tuyệt đối.',
    level: 'Nâng cao',
    readTimeMinutes: 18,
    category: 'webhooks_event_pipeline',
    summary: 'Gửi email thành công qua API mới chỉ là bước khởi đầu. Webhooks cho phép backend của bạn lắng nghe các sự kiện tiếp theo: Email đã đến nơi (Delivered), bị trả về (Bounced), người nhận mở thư (Opened), click vào link (Clicked) hoặc khiếu nại thư rác (Complained).',
    hookStory: 'Một người dùng đăng ký tài khoản với địa chỉ email sai chính tả (vd: user@gmailll.com). Thư kích hoạt gửi đi bị trả về lỗi Hard Bounce. Nhờ Webhook của Resend gửi thông báo về máy chủ trong 1 giây, ứng dụng lập tức hiển thị một thông báo màu vàng trên trang web: "Địa chỉ email của bạn có vẻ không đúng, vui lòng kiểm tra lại!". Trải nghiệm người dùng trở nên vô cùng mượt mà.',
    sections: [
      {
        heading: '1. Các Loại Sự Kiện Webhook Cốt Lõi',
        subheading: 'Danh mục sự kiện vòng đời email',
        content: `Resend hỗ trợ các sự kiện Webhook sau:
• \`email.sent\`: Resend đã tiếp nhận và bắt đầu chuyển thư đi.
• \`email.delivered\`: Máy chủ nhận (Gmail, Outlook) đã xác nhận nhận thư vào hộp thư người dùng.
• \`email.delivery_delayed\`: Thư bị hoãn tạm thời do máy chủ đích quá tải (Soft Bounce).
• \`email.bounced\`: Thư bị từ chối vĩnh viễn do hòm thư không tồn tại (Hard Bounce).
• \`email.complained\`: Người nhận nhấn nút "Báo cáo thư rác" (Spam Complaint).
• \`email.opened\` & \`email.clicked\`: Người nhận mở thư hoặc nhấn vào liên kết bên trong.`,
        codeBlock: {
          language: 'typescript',
          title: 'Xử Lý Webhook Trong Next.js App Router (app/api/webhooks/resend/route.ts)',
          code: `import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';

const webhookSecret = process.env.RESEND_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const svix_id = req.headers.get('svix-id') || '';
  const svix_timestamp = req.headers.get('svix-timestamp') || '';
  const svix_signature = req.headers.get('svix-signature') || '';

  // Xác thực chữ ký số Svix để chống giả mạo request
  const wh = new Webhook(webhookSecret);
  let evt: any;

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Chữ ký Webhook không hợp lệ' }, { status: 400 });
  }

  const eventType = evt.type;
  const { to, email_id } = evt.data;

  if (eventType === 'email.bounced') {
    console.warn(\`Email \${to} bị Hard Bounce! Đang vô hiệu hóa tài khoản...\`);
    // Cập nhật Database đánh dấu email chết
  } else if (eventType === 'email.complained') {
    console.error(\`Email \${to} khiếu nại Spam! Tự động hủy đăng ký...\`);
    // Tự động gỡ khỏi danh sách nhận tin
  }

  return NextResponse.json({ received: true });
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Cài đặt thư viện xác thực chữ ký Webhook Svix',
        command: 'npm install svix',
        description: 'Thư viện chuẩn để giải mã và xác minh bảo mật cho Resend Webhooks'
      }
    ],
    masteryChecklist: [
      'Thiết lập Webhook Endpoint trên Resend Dashboard.',
      'Sử dụng thư viện svix để xác thực chữ ký số svix-signature an toàn.',
      'Tự động xử lý sự kiện Bounced và Complained để bảo vệ danh tiếng Domain.'
    ]
  },
  {
    id: 'resend-ch7-inbound-routing-parsing',
    chapterNumber: 7,
    title: 'Inbound Email Routing: Biến Email Đến Thành JSON Webhook',
    subtitle: 'Xây dựng ứng dụng tự động tiếp nhận email từ người dùng, đọc file đính kèm và kích hoạt luồng xử lý AI / Backend.',
    level: 'Chuyên gia',
    readTimeMinutes: 16,
    category: 'inbound_routing_parsing',
    summary: 'Inbound Email cho phép ứng dụng của bạn không chỉ gửi thư đi mà còn nhận thư đến (ví dụ: reply-123@support.yourdomain.com), bóc tách nội dung và gửi dữ liệu JSON về webhook server.',
    hookStory: 'Bạn muốn làm một tính năng cho phép người dùng chỉ cần "Reply" trực tiếp vào email thông báo để trả lời bình luận trên diễn đàn mà không cần mở trình duyệt web. Với Resend Inbound, email trả lời của người dùng được phân tích cú pháp thành dữ liệu JSON sạch sẽ và gửi tới API của bạn trong tích tắc.',
    sections: [
      {
        heading: '1. Luồng Hoạt Động Của Resend Inbound',
        subheading: 'Từ bản ghi MX đến Webhook Payload',
        content: `1. Cấu hình bản ghi DNS MX trỏ về máy chủ Inbound của Resend (\`inbound.resend.com\`).
2. Khi có email gửi tới địa chỉ thuộc domain của bạn, Resend tự động parse tiêu đề, danh sách người gửi, nội dung HTML/Text và các file đính kèm.
3. Resend gửi một HTTP POST request chứa toàn bộ dữ liệu cấu trúc này tới Webhook URL bạn đã đăng ký.`,
        codeBlock: {
          language: 'json',
          title: 'Dữ Liệu JSON Payload Inbound Mẫu',
          code: `{
  "type": "email.inbound",
  "data": {
    "from": "sarah@resistance.org",
    "to": ["ticket-882@support.yourdomain.com"],
    "subject": "Re: Lỗi kết nối máy chủ",
    "text": "Tôi đã thử khởi động lại và hệ thống đã hoạt động bình thường!",
    "headers": {
      "message-id": "<xyz123@resistance.org>"
    },
    "attachments": []
  }
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Cấu hình bản ghi MX nhận thư cho Inbound Domain',
        command: 'dig MX inbound.yourdomain.com +short',
        description: 'Kiểm tra bản ghi MX đã trỏ đúng máy chủ tiếp nhận thư của Resend'
      }
    ],
    masteryChecklist: [
      'Cấu hình Inbound Domain với bản ghi MX chính xác.',
      'Xây dựng API Endpoint tiếp nhận và xử lý payload Inbound Email.',
      'Ứng dụng Inbound Email vào hệ thống Helpdesk và tự động hóa tác vụ.'
    ]
  },
  {
    id: 'resend-ch8-audiences-broadcasts',
    chapterNumber: 8,
    title: 'Quản Trị Khách Hàng: Audiences, Contacts & Chiến Dịch Broadcasts',
    subtitle: 'Quản lý danh bạ người dùng, phân khúc nhóm khách hàng và gửi bản tin (Newsletter) quy mô lớn với Resend Broadcasts API.',
    level: 'Trung bình',
    readTimeMinutes: 15,
    category: 'audiences_broadcasts',
    summary: 'Resend không chỉ dừng lại ở Transactional Email mà còn cung cấp tính năng Audiences & Broadcasts: Quản lý danh sách người nhận, trạng thái Unsubscribe tự động và gửi chiến dịch tiếp thị qua cả giao diện Web lẫn API.',
    hookStory: 'Bạn có 50.000 lập trình viên đăng ký nhận bản tin công nghệ hàng tuần. Thay vì phải kết nối với một dịch vụ marketing cồng kềnh bên thứ ba, bạn có thể tạo một Audience trên Resend, đồng bộ danh bạ qua API khi người dùng đăng ký, và gửi chiến dịch Broadcasts với template React Email quen thuộc.',
    sections: [
      {
        heading: '1. Quản Lý Contacts & Audiences Bằng Code',
        subheading: 'Tự động thêm người dùng vào danh sách khi họ đăng ký tài khoản',
        content: `• **Audience**: Một danh sách phân nhóm (ví dụ: "Newsletter Subscribers", "Beta Testers").
• **Contact**: Một bản ghi khách hàng chứa email, tên, trạng thái \`unsubscribed: false/true\`.
• Khi người dùng nhấn nút Hủy đăng ký (Unsubscribe Link), Resend tự động cập nhật trạng thái của Contact thành \`unsubscribed: true\` và tự động loại họ khỏi các chiến dịch tiếp theo để bảo vệ bạn khỏi các rắc rối pháp lý (CAN-SPAM, GDPR).`,
        codeBlock: {
          language: 'typescript',
          title: 'Thêm Khách Hàng Vào Audience Bằng Resend SDK',
          code: `import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeUserToNewsletter(email: string, firstName: string) {
  const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID!;

  const { data, error } = await resend.contacts.create({
    email,
    firstName,
    unsubscribed: false,
    audienceId,
  });

  if (error) {
    console.error('Lỗi thêm contact:', error);
    return { success: false };
  }

  return { success: true, contactId: data?.id };
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Liệt kê danh sách Audiences trong tài khoản qua CLI cURL',
        command: 'curl https://api.resend.com/audiences -H "Authorization: Bearer $RESEND_API_KEY"',
        description: 'Xem tất cả các phân nhóm khách hàng hiện có trong tài khoản'
      }
    ],
    masteryChecklist: [
      'Tạo và quản lý các nhóm Audiences trên Resend.',
      'Sử dụng API resend.contacts.create() để đồng bộ người dùng mới.',
      'Thực hiện gửi một chiến dịch Broadcasts an toàn tuân thủ quy định Unsubscribe.'
    ]
  },
  {
    id: 'resend-ch9-nextjs-server-actions',
    chapterNumber: 9,
    title: 'Tích Hợp Chuyên Sâu Next.js App Router, Server Actions & Vercel',
    subtitle: 'Mô hình kiến trúc chuẩn mực: Gửi email trực tiếp từ Server Action, xử lý trạng thái Loading với useTransition và tối ưu hóa biến môi trường.',
    level: 'Nâng cao',
    readTimeMinutes: 16,
    category: 'nextjs_server_actions',
    summary: 'Sự kết hợp giữa Next.js Server Actions, Resend và React Email tạo nên bộ ba hủy diệt cho lập trình web hiện đại: Không cần tạo API Route trung gian, gọi hàm gửi email trực tiếp từ form với Type Safety 100%.',
    hookStory: 'Trước đây khi làm form liên hệ, bạn phải tạo file /api/send-email/route.ts, viết hàm fetch từ client, quản lý state JSON và bắt lỗi thủ công. Với Next.js Server Actions và Resend, bạn chỉ cần truyền một hàm async server action vào thẻ <form action={sendAction}>, mọi thứ được thực thi an toàn trên máy chủ với mã nguồn gọn gàng gấp 3 lần.',
    sections: [
      {
        heading: '1. Kiến Trúc Form Liên Hệ Chuẩn Với Server Actions',
        subheading: 'An toàn, gọn gàng và không để lộ API Key ra Client',
        content: `Các bước triển khai:
1. Tạo Server Action \`sendContactEmail\` với chỉ thị \`'use server'\`.
2. Xác thực dữ liệu đầu vào bằng thư viện Zod.
3. Render React Email component và gửi qua Resend.
4. Trả về kết quả cho Client component để hiển thị thông báo Toast.`,
        codeBlock: {
          language: 'tsx',
          title: 'Server Action Gửi Email (actions/sendEmail.ts)',
          code: `'use server';

import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactAction(formData: FormData) {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;

  if (!email || !email.includes('@')) {
    return { error: 'Địa chỉ email không hợp lệ' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'TechMaster Support <support@yourdomain.com>',
      to: [email],
      subject: 'Xác nhận yêu cầu hỗ trợ thành công',
      react: WelcomeEmail({ userName: name, loginUrl: 'https://yourdomain.com' }),
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err: any) {
    return { error: 'Đã có lỗi xảy ra khi gửi email' };
  }
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Kiểm tra biến môi trường RESEND_API_KEY đã nạp trên Vercel',
        command: 'vercel env ls',
        description: 'Xác minh API Key đã được thiết lập đúng trên môi trường Production'
      }
    ],
    masteryChecklist: [
      'Xây dựng luồng gửi email với Next.js Server Actions không cần API Route.',
      'Kết hợp React Email component trực tiếp trong tham số react của hàm gửi.',
      'Bảo mật tuyệt đối RESEND_API_KEY chỉ chạy trên môi trường Server-side.'
    ]
  },
  {
    id: 'resend-ch10-deliverability-analytics',
    chapterNumber: 10,
    title: 'Deliverability Đỉnh Cao: Giữ Điểm Uy Tín Tên Miền & Vào Primary Inbox',
    subtitle: 'Chiến lược tách biệt Domain, tối ưu hóa kích thước thư, phân tích tỷ lệ mở (Open Rate) và tuân thủ các quy chuẩn bảo mật toàn cầu.',
    level: 'Chuyên gia',
    readTimeMinutes: 18,
    category: 'deliverability_analytics',
    summary: 'Deliverability là chìa khóa thành công của mọi doanh nghiệp. Bằng cách áp dụng các nguyên tắc thiết kế tối ưu, kiểm soát danh sách người nhận và theo dõi biểu đồ phân tích trên Resend, bạn đảm bảo 99% email luôn vào thẳng Hộp Thư Chính.',
    hookStory: 'Một công ty gửi email chứa một tấm ảnh nặng 5MB và dùng các từ ngữ giật gân như "MIỄN PHÍ 100% TIỀN THƯỞNG". Thuật toán chống thư rác của Gmail lập tức gắn cờ và tống email vào hộp thư rác. Sau khi học kỹ thuật Deliverability trên Resend: Nén ảnh dưới 100KB, thêm bản Text thuần và bật DMARC p=reject, tỷ lệ vào Inbox chính tăng vọt từ 40% lên 98.7%.',
    sections: [
      {
        heading: '1. Quy Tắc Vàng Giúp Email Luôn Vào Inbox',
        subheading: 'Những điều bắt buộc phải làm',
        content: `✓ **Dung lượng HTML < 102KB**: Nếu file HTML vượt quá 102KB, Gmail sẽ tự động cắt ngắn (Message clipped) và ẩn nút Unsubscribe, khiến người dùng bấm nút Báo cáo Spam.
✓ **Luôn cung cấp Plain Text song song**: Các bộ lọc Spam đánh giá rất cao email có kèm bản chữ thuần.
✓ **Tỷ lệ Chữ / Ảnh cân bằng**: Không bao giờ gửi một email chỉ có duy nhất 1 tấm ảnh lớn.
✓ **Chữ ký số DMARC & BIMI**: Đảm bảo domain đạt trạng thái DMARC Alignment hoàn hảo.`,
        storyQuote: {
          quote: 'Một bức email không đến được Inbox của người dùng cũng vô giá trị như một bức email chưa từng được viết ra.',
          speaker: 'Zeno Rocha',
          role: 'CEO & Co-founder tại Resend',
          year: '2024'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Lấy danh sách nhật ký gửi thư gần nhất từ Resend API',
        command: 'curl https://api.resend.com/emails -H "Authorization: Bearer $RESEND_API_KEY"',
        description: 'Kiểm tra trạng thái delivered / bounced của các bức thư vừa gửi'
      }
    ],
    masteryChecklist: [
      'Kiểm soát dung lượng email luôn dưới ngưỡng an toàn 102KB.',
      'Phân tích biểu đồ Deliverability trên Resend Dashboard để phát hiện sự cố sớm.',
      'Nắm vững toàn bộ quy trình từ code, template, gửi thư đến quản trị sự kiện trên Resend.'
    ]
  }
];
