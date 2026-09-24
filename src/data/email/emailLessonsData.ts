import { EmailChapter } from '../../types/emailModule';

export const EMAIL_CHAPTERS: EmailChapter[] = [
  {
    id: 'email-ch1-origins-architecture',
    chapterNumber: 1,
    title: 'Bình Minh Của Email & Giải Mã Cỗ Máy Vận Hành Toàn Cầu',
    subtitle: 'Từ thông điệp đầu tiên trên ARPANET năm 1971 đến kiến trúc 4 chữ cái MUA, MSA, MTA, MDA điều phối hàng trăm tỷ bức thư mỗi ngày.',
    level: 'Cơ bản',
    readTimeMinutes: 14,
    category: 'history_architecture',
    summary: 'Email không phải là một ứng dụng duy nhất mà là một mạng lưới liên kết lỏng lẻo (federated network) giữa các giao thức mở. Hiểu rõ kiến trúc MUA -> MSA -> MTA -> MDA -> MRA là chìa khóa để làm chủ bất kỳ hệ thống email nào.',
    hookStory: 'Năm 1971, kỹ sư máy tính Ray Tomlinson đang ngồi trước hai chiếc máy tính đặt cạnh nhau trong phòng thí nghiệm BBN Technologies. Ông muốn gửi một tin nhắn từ máy này sang máy tính khác qua mạng ARPANET non trẻ. Để phân biệt "tên người nhận" và "vị trí máy chủ", ông nhìn xuống bàn phím Teletype Model 33 và chọn một ký tự ít ai để ý: "@" (at - tại nơi). Dòng chữ thử nghiệm đầu tiên có lẽ chỉ là "QWERTYUIOP", nhưng nó đã khai sinh ra giao thức giao tiếp điện tử vĩ đại nhất lịch sử loài người.',
    sections: [
      {
        heading: '1. Bản Chất Của Một Bức Thư Điện Tử (RFC 5322 & MIME)',
        subheading: 'Email thực chất chỉ là một file văn bản thuần túy (Plain Text)',
        content: `Khi bạn nhìn thấy một email bóng bẩy với hình ảnh động, font chữ sắc nét và file PDF đính kèm, thực chất bên dưới lớp vỏ trình diễn của ứng dụng, email chỉ là một luồng văn bản thuần (ASCII text stream) tuân theo tiêu chuẩn RFC 5322 và mở rộng MIME (Multipurpose Internet Mail Extensions - RFC 2045).

Cấu trúc của một email thô luôn bao gồm 2 phần được ngăn cách bởi một dòng trống duy nhất:
1. **Header (Tiêu đề kỹ thuật)**: Chứa siêu dữ liệu điều hướng như \`From:\`, \`To:\`, \`Subject:\`, \`Date:\`, \`Message-ID:\`, và chuỗi các dòng \`Received:\` ghi lại nhật ký từng máy chủ trung gian mà email đã bay qua.
2. **Body (Nội dung bức thư)**: Phần chứa dữ liệu thông điệp. Với MIME Multipart, phần thân được chia thành các phân đoạn (boundaries) để chứa song song cả phiên bản chữ thuần (\`text/plain\`), phiên bản trang trí (\`text/html\`), và các file đính kèm đã được mã hóa dạng Base64.`,
        codeBlock: {
          language: 'email',
          title: 'Cấu Trúc Thô Của Một Email Chuẩn MIME (Raw EML Source)',
          code: `From: "Johnny Hoang" <johnny@techmaster.io>
To: "Sarah Connor" <sarah@resistance.org>
Subject: =?UTF-8?B?WFRQIFhvbmcgU3kgVGjhu5FuZyBFbWFpbA==?=
Date: Thu, 24 Sep 2026 08:30:00 +0700
Message-ID: <a1b2c3d4-email-001@techmaster.io>
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary="----=_Part_1042_892348"

------=_Part_1042_892348
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit

Xin chào Sarah, hệ thống Mail Server của chúng ta đã hoàn tất cấu hình SPF và DKIM.

------=_Part_1042_892348
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: 8bit

<html>
  <body>
    <p>Xin chào <strong>Sarah</strong>,</p>
    <p>Hệ thống Mail Server của chúng ta đã hoàn tất cấu hình <em>SPF và DKIM</em>.</p>
  </body>
</html>
------=_Part_1042_892348--`
        },
        storyQuote: {
          quote: 'Ký tự @ là giải pháp hiển nhiên nhất để tách biệt người dùng khỏi chiếc máy tính của họ. Nó đơn giản, có sẵn trên bàn phím và không một ai dùng nó trong tên họ cá nhân.',
          speaker: 'Ray Tomlinson',
          role: 'Nhà phát minh Email hiện đại',
          year: '1971'
        }
      },
      {
        heading: '2. Kiến Trúc 5 Mắt Xích Cốt Lõi: MUA, MSA, MTA, MDA và MRA',
        subheading: 'Hành trình một bức thư đi từ đầu ngón tay bạn đến màn hình người nhận',
        content: `Để không bị lạc lối trong thế giới Mail Server, bạn cần ghi nhớ rõ vai trò của 5 tác tử (Agents) chuyên biệt:

• **MUA (Mail User Agent)**: Trình khách email của người dùng cuối (ví dụ: Apple Mail, Outlook, Thunderbird, hoặc giao diện Gmail trên Web). Nhiệm vụ của MUA là soạn thảo, hiển thị thư và kết nối với máy chủ.
• **MSA (Mail Submission Agent)**: Cổng tiếp nhận thư gửi đi từ MUA, thường chạy trên cổng 587 (SMTP Submission) có yêu cầu bắt buộc phải đăng nhập tên/mật khẩu và bật mã hóa TLS.
• **MTA (Mail Transfer Agent)**: "Trạm bưu điện trung tâm" (ví dụ: Postfix, Exim, Sendmail, Haraka). MTA nhận thư từ MSA hoặc các MTA khác trên Internet qua cổng 25, tra cứu DNS MX record của tên miền đích, và chuyển tiếp thư qua mạng toàn cầu.
• **MDA (Mail Delivery Agent)**: "Người giao thư tận nhà" (ví dụ: Dovecot LDA, Procmail). Khi MTA đích nhận được thư gửi cho người dùng thuộc máy chủ mình quản lý, nó trao thư cho MDA để ghi vào ổ cứng (thường lưu dưới định dạng thư mục Maildir).
• **MRA (Mail Retrieval Agent)**: Trình phục vụ kéo thư (ví dụ: Dovecot IMAP/POP3 daemon). Cho phép MUA kết nối vào để đọc, tìm kiếm và xóa thư trên máy chủ.`,
        mindsetShift: {
          from: 'Nghĩ rằng "Email" là một phần mềm duy nhất làm tất cả mọi việc từ gửi, nhận đến lưu trữ.',
          to: 'Hiểu rằng Email là dây chuyền chuyên môn hóa: Postfix (MTA chuyển thư) bắt tay với Dovecot (MDA/IMAP lưu và phân phối thư).',
          impact: 'Dễ dàng cô lập lỗi khi vận hành: Biết chính xác lỗi gửi không đi là ở MTA/DNS, còn lỗi không xem được thư là ở Dovecot/IMAP.'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Tra cứu cấu trúc đường truyền Received Headers của một email thô',
        command: 'grep -E "^Received:|^From:|^To:|^Subject:" sample_email.eml',
        description: 'Xem toàn bộ dấu chân thời gian và IP của các MTA trung gian mà thư đã đi qua'
      },
      {
        title: 'Kiểm tra phần mềm MTA đang chạy trên máy chủ Linux',
        command: 'sudo ss -tulpn | grep -E ":25|:587|:465|:993"',
        description: 'Xem dịch vụ nào (Postfix, Dovecot, Exim) đang lắng nghe trên các cổng email chuẩn'
      }
    ],
    masteryChecklist: [
      'Phân biệt được sự khác nhau giữa Header và Body trong chuẩn RFC 5322.',
      'Hiểu rõ vai trò và ranh giới trách nhiệm giữa MUA, MSA, MTA, MDA và MRA.',
      'Đọc hiểu được luồng MIME Multipart chứa text/plain, text/html và file đính kèm.',
      'Nắm vững cách một email được định tuyến qua các máy chủ trung gian trên Internet.'
    ]
  },
  {
    id: 'email-ch2-smtp-imap-pop3-protocols',
    chapterNumber: 2,
    title: 'Bộ Ba Giao Thức Nền Tảng: SMTP, IMAP & POP3 Dưới Kính Hiển Vi',
    subtitle: 'Phân tích cơ chế bắt tay văn bản thô SMTP qua cổng 25/587, cuộc cách mạng đồng bộ IMAP vs sự thoái trào của POP3, và chuẩn mã hóa StartTLS.',
    level: 'Cơ bản',
    readTimeMinutes: 16,
    category: 'protocols_deepdive',
    summary: 'SMTP là giao thức đẩy thư (Push), trong khi POP3 và IMAP là giao thức kéo thư (Pull). Nắm vững các câu lệnh giao tiếp thô HELO, MAIL FROM, RCPT TO, DATA giúp bạn có thể dùng terminal để gửi email và debug bất kỳ máy chủ nào.',
    hookStory: 'Bạn có biết rằng bạn có thể gửi một bức email hoàn chỉnh đến bất kỳ máy chủ nào trên thế giới mà không cần mở trình duyệt, không cần Outlook, chỉ bằng một dòng lệnh Terminal đen ngòm? Khi giao tiếp ở tầng mạng thô, SMTP thực chất là một cuộc hội thoại bằng tiếng Anh cực kỳ lịch thiệp giữa hai chiếc máy tính: một máy chào "HELO", máy kia đáp "250 Pleased to meet you", máy gửi bảo "MAIL FROM", máy nhận gật đầu "250 Sender OK".',
    sections: [
      {
        heading: '1. Giao Thức SMTP (Simple Mail Transfer Protocol - RFC 5321)',
        subheading: 'Giao thức chuyển thư duy nhất thống trị Internet từ năm 1982',
        content: `SMTP là giao thức hướng văn bản (Text-based protocol) chạy trên nền TCP. Nó chỉ làm một nhiệm vụ duy nhất: Đẩy thư từ nguồn đến đích.

Các cổng kết nối SMTP quan trọng:
• **Cổng 25 (Server-to-Server SMTP Relay)**: Dùng riêng cho các MTA nói chuyện với nhau qua Internet công cộng. Hầu hết các nhà mạng dân dụng (ISP) và Cloud VPS giá rẻ đều khóa cổng 25 chiều đi (outbound) để ngăn ngừa máy chủ bị nhiễm mã độc bắn thư rác.
• **Cổng 587 (Submission with STARTTLS)**: Cổng tiêu chuẩn hiện đại để MUA gửi thư lên máy chủ của mình, bắt buộc phải xác thực tài khoản (Authentication) và nâng cấp mã hóa qua STARTTLS.
• **Cổng 465 (SMTPS - Implicit TLS)**: Kết nối lập tức được bọc trong lớp SSL/TLS ngay từ byte đầu tiên trước khi trao đổi lệnh SMTP.`,
        codeBlock: {
          language: 'bash',
          title: 'Mô Phỏng Gửi Email Bằng Tay Qua Lệnh Telnet / Netcat',
          code: `# Kết nối trực tiếp vào Mail Server đích qua cổng 25
nc -v mx.example.com 25

# 1. Máy chủ phản hồi chào mừng
220 mx.example.com ESMTP Postfix

# 2. Bạn chào lại máy chủ và khai báo tên miền của mình
EHLO myclient.io
250-mx.example.com
250-PIPELINING
250-SIZE 52428800
250-STARTTLS
250 8BITMIME

# 3. Khai báo phong bì thư (Envelope Sender)
MAIL FROM:<sender@myclient.io>
250 2.1.0 Ok

# 4. Khai báo người nhận (Envelope Recipient)
RCPT TO:<receiver@example.com>
250 2.1.5 Ok

# 5. Bắt đầu truyền tải dữ liệu nội dung thư (Headers + Body)
DATA
354 End data with <CR><LF>.<CR><LF>
From: sender@myclient.io
To: receiver@example.com
Subject: Test Email via Netcat Terminal

Xin chao, day la email gui truc tiep tu command line!
.

# 6. Máy chủ xác nhận đã xếp thư vào hàng đợi gửi
250 2.0.0 Ok: queued as 4Yt8mK2nBz9L
QUIT
221 2.0.0 Bye`
        }
      },
      {
        heading: '2. POP3 vs IMAP: Cuộc Chiến Lưu Trữ Cục Bộ & Đồng Bộ Đa Thiết Bị',
        subheading: 'Tại sao thời đại Smartphone đã biến POP3 thành dĩ vãng',
        content: `Khi thư đã được đưa vào hộp thư trên máy chủ, làm thế nào để bạn đọc được nó?

• **POP3 (Post Office Protocol v3 - Port 110/995)**:
  - Triết lý: Giống như "Hòm thư bưu điện đầu ngõ". Bạn ra mở hòm, lấy toàn bộ thư về nhà và xóa sạch hòm thư bưu điện.
  - Nhược điểm chí mạng: Nếu bạn tải thư về máy tính công ty, khi về nhà mở điện thoại lên, hộp thư sẽ hoàn toàn trống rỗng. Mọi hành động gắn cờ, đọc thư, tạo thư mục chỉ có tác dụng trên máy cục bộ đó.
• **IMAP (Internet Message Access Protocol - Port 143/993)**:
  - Triết lý: "Đồng bộ đám mây thời gian thực 2 chiều". Toàn bộ email, trạng thái Đã đọc (Read), Đánh dấu sao (Flagged), và cấu trúc thư mục (Folders) đều được lưu trữ vĩnh viễn trên máy chủ.
  - Tính năng mạnh mẽ: Hỗ trợ lệnh \`IDLE\` cho phép máy chủ lập tức đẩy thông báo (Push Notification) về điện thoại ngay khi có thư mới đến mà không cần ứng dụng phải liên tục gửi request polling hao pin.`,
        bulletPoints: [
          'POP3 phù hợp: Máy chủ có dung lượng ổ cứng cực kỳ hạn hẹp, người dùng chỉ dùng duy nhất 1 thiết bị.',
          'IMAP phù hợp: 99.9% người dùng hiện đại truy cập email đồng thời trên Laptop, Smartphone, Tablet và Webmail.',
          'Bảo mật cổng: Luôn sử dụng IMAPS (Port 993) và POP3S (Port 995) với mã hóa SSL/TLS.'
        ]
      }
    ],
    practicalCommands: [
      {
        title: 'Thử nghiệm kết nối mã hóa SSL tới máy chủ IMAP bằng OpenSSL',
        command: 'openssl s_client -connect imap.gmail.com:993 -crlf',
        description: 'Kiểm tra chứng chỉ SSL và bắt tay trực tiếp với máy chủ IMAP an toàn'
      },
      {
        title: 'Gửi email nhanh từ Terminal Linux bằng lệnh mailx / s-nail',
        command: 'echo "Nội dung cảnh báo CPU quá tải" | mailx -s "Cảnh báo Server #01" admin@company.com',
        description: 'Gửi thư thông báo tự động từ các script Cronjob và Bash'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ ý nghĩa các cổng kết nối 25, 587, 465, 143, 993, 110, 995.',
      'Thao tác thuần thục phiên SMTP thô qua lệnh telnet/nc (EHLO, MAIL FROM, RCPT TO, DATA).',
      'Giải thích được lý do IMAP hoàn toàn thay thế POP3 trong kỷ nguyên đa thiết bị.',
      'Phân biệt được Implicit TLS (Port 465/993) và Explicit STARTTLS (Port 587/143).'
    ]
  },
  {
    id: 'email-ch3-spf-dkim-dmarc-bimi',
    chapterNumber: 3,
    title: 'Bộ Tứ Bảo Mật & Định Danh Email: SPF, DKIM, DMARC & BIMI',
    subtitle: 'Giải mã tấm lá chắn ngăn chặn mạo danh (Spoofing), chữ ký số mật mã học và con đường đưa logo tích xanh thương hiệu vào hộp thư Gmail.',
    level: 'Nâng cao',
    readTimeMinutes: 18,
    category: 'authentication_security',
    summary: 'SMTP nguyên bản không có cơ chế xác minh danh tính người gửi. Bộ ba SPF, DKIM, DMARC cùng mảnh ghép BIMI là tiêu chuẩn bắt buộc toàn cầu để email của bạn không bị đánh dấu là thư rác hoặc bị kẻ gian giả mạo domain.',
    hookStory: 'Tháng 2 năm 2024, hai gã khổng lồ công nghệ Google và Yahoo đồng loạt kích hoạt "Đạo luật Email Khắc Nghiệt Nhất Lịch Sử": Bất kỳ tổ chức nào gửi trên 5.000 email/ngày mà thiếu cấu hình DMARC hợp lệ và tỷ lệ khiếu nại Spam vượt quá 0.3% sẽ bị chặn đứng (Block) hoặc tống thẳng vào hộp rác. Hàng triệu doanh nghiệp toàn cầu bỗng chốc phát hiện email báo giá, email kích hoạt tài khoản của mình biến mất không một dấu vết chỉ vì thiếu vài dòng bản ghi DNS.',
    sections: [
      {
        heading: '1. SPF (Sender Policy Framework - RFC 7208): Danh Sách Trắng IP Gửi',
        subheading: 'Khai báo cho cả thế giới biết: Những máy chủ IP nào được phép gửi thư thay mặt tên miền của tôi',
        content: `SPF là một bản ghi DNS dạng TXT đặt tại tên miền gốc. Khi máy chủ nhận (ví dụ Gmail) tiếp nhận một email xưng là từ \`@yourdomain.com\`, nó sẽ tra cứu DNS TXT của \`yourdomain.com\` để xem IP của máy chủ gửi có nằm trong danh sách được cấp phép hay không.

Cú pháp chuẩn của bản ghi SPF:
\`v=spf1 ip4:198.51.100.1 include:_spf.google.com include:sendgrid.net -all\`

• \`ip4:\` hoặc \`ip6:\`: Cho phép trực tiếp địa chỉ IP của máy chủ riêng.
• \`include:\`: Cho phép dịch vụ bên thứ ba (Google Workspace, SendGrid, Resend) gửi thư.
• Các cơ chế đuôi kiểm soát (\`all\`):
  - \`-all\` (Hard Fail - Khuyến nghị): Mọi IP không nằm trong danh sách đều là giả mạo, yêu cầu từ chối dứt khoát.
  - \`~all\` (Soft Fail): Ghi nhận nghi vấn nhưng tạm thời cho vào hộp Spam để theo dõi.
  - \`?all\` (Neutral) & \`+all\` (Pass all): Vô giá trị về mặt bảo mật, tuyệt đối tránh dùng.

**Lưu ý "Tử huyệt" của SPF**: Chuẩn RFC giới hạn tối đa **10 lần DNS Lookup** khi đánh giá SPF. Nếu bạn lạm dụng quá nhiều \`include:\`, SPF sẽ dính lỗi \`PermError: Too many DNS lookups\` và toàn bộ email bị đánh rớt!`,
        codeBlock: {
          language: 'dns',
          title: 'Ví Dụ Bản Ghi SPF Chuẩn Doanh Nghiệp (DNS TXT Record)',
          code: `# Host: @ (hoặc yourdomain.com)
# Type: TXT
# TTL: 3600

v=spf1 ip4:103.20.100.55 include:_spf.google.com include:resend.com ~all`
        }
      },
      {
        heading: '2. DKIM (DomainKeys Identified Mail - RFC 6376): Chữ Ký Số Mật Mã',
        subheading: 'Đảm bảo nội dung email không bị thay đổi hoặc đánh tráo trên đường truyền',
        content: `Nếu SPF bảo vệ địa chỉ IP, thì DKIM bảo vệ tính toàn vẹn của nội dung bức thư bằng thuật toán mã hóa khóa công khai (Asymmetric Cryptography RSA/Ed25519).

Quy trình hoạt động của DKIM:
1. **Ký thư tại máy chủ gửi**: Khi email chuẩn bị rời đi, máy chủ dùng **Khóa Riêng Tư (Private Key)** bí mật để băm (Hash) nội dung thư và tiêu đề, sau đó tạo ra chữ ký mã hóa đặt vào Header \`DKIM-Signature:\`.
2. **Xác minh tại máy chủ nhận**: Máy chủ nhận đọc tiêu đề DKIM, tìm trường \`s=selector\` và \`d=domain.com\`, sau đó tra cứu DNS TXT tại \`selector._domainkey.domain.com\` để lấy **Khóa Công Khai (Public Key)** và giải mã kiểm tra tính hợp lệ.`,
        codeBlock: {
          language: 'dns',
          title: 'Bản Ghi DKIM Public Key Trên DNS',
          code: `# Host: resend._domainkey (hoặc google._domainkey)
# Type: TXT

v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3Q...`
        }
      },
      {
        heading: '3. DMARC (RFC 7489) & BIMI: Vương Miện Quản Trị & Logo Tích Xanh',
        subheading: 'Quyết định số phận của email khi trượt SPF/DKIM và xác thực thương hiệu chính thức',
        content: `DMARC liên kết SPF và DKIM lại với nhau qua khái niệm **Alignment (Sự đồng nhất tên miền Header From và Envelope From)**. DMARC cho phép chủ sở hữu domain ra lệnh cho các máy chủ toàn cầu: "Nếu có thư mạo danh domain của tôi mà trượt cả SPF lẫn DKIM, hãy xử lý theo chính sách sau":

• **Chính sách DMARC (\`p=\`)**:
  - \`p=none\`: Chỉ thu thập dữ liệu báo cáo, không chặn (Giai đoạn giám sát ban đầu).
  - \`p=quarantine\`: Đẩy thư không hợp lệ vào hộp thư rác (Spam/Junk).
  - \`p=reject\` (Tiêu chuẩn vàng): Máy chủ nhận từ chối kết nối ngay lập tức, thư mạo danh không thể chạm tới người dùng.
• **Báo cáo tổng hợp (\`rua=mailto:dmarc-reports@yourdomain.com\`)**: Hàng ngày Google/Microsoft sẽ gửi file XML tổng kết có bao nhiêu IP trên thế giới đang cố tình gửi thư mang danh domain của bạn.

**BIMI (Brand Indicators for Message Identification)**: Khi domain của bạn đã đạt chính sách DMARC tối thiểu \`p=quarantine\` hoặc \`p=reject\`, bạn có thể tạo bản ghi DNS BIMI trỏ tới file logo dạng SVG chuẩn và chứng chỉ VMC (Verified Mark Certificate) để Gmail tự động hiển thị logo doanh nghiệp có tích xanh bên cạnh tên người gửi.`,
        codeBlock: {
          language: 'dns',
          title: 'Bản Ghi DMARC & BIMI Mẫu Hoàn Hảo',
          code: `# DMARC Record:
# Host: _dmarc.yourdomain.com
# Type: TXT
v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc-rua@yourdomain.com; ruf=mailto:dmarc-ruf@yourdomain.com; fo=1

# BIMI Record:
# Host: default._bimi.yourdomain.com
# Type: TXT
v=BIMI1; l=https://yourdomain.com/assets/logo.svg; a=https://yourdomain.com/assets/vmc-cert.pem`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Kiểm tra bản ghi SPF của một tên miền bằng lệnh dig',
        command: 'dig TXT yourdomain.com +short | grep "v=spf1"',
        description: 'Xem toàn bộ danh sách IP và các nhà cung cấp được cấp phép gửi thư'
      },
      {
        title: 'Kiểm tra chính sách DMARC đang áp dụng trên tên miền',
        command: 'dig TXT _dmarc.yourdomain.com +short',
        description: 'Kiểm tra xem tên miền đang ở chế độ p=none, quarantine hay reject'
      }
    ],
    masteryChecklist: [
      'Tự tay viết được bản ghi SPF chuẩn với IP máy chủ riêng và các include hợp lệ.',
      'Hiểu rõ cơ chế băm và mã hóa khóa công khai của chữ ký điện tử DKIM.',
      'Triển khai lộ trình DMARC từ p=none -> p=quarantine -> p=reject an toàn không làm gián đoạn email.',
      'Nắm vững điều kiện tiên quyết để đạt chuẩn logo thương hiệu BIMI trên Gmail.'
    ]
  },
  {
    id: 'email-ch4-dns-routing-rdns-mx',
    chapterNumber: 4,
    title: 'Kiến Trúc Bản Ghi DNS Cho Email & Định Tuyến Toàn Cầu',
    subtitle: 'Nghệ thuật cấu hình MX Record đa máy chủ dự phòng, bản ghi rDNS/PTR sống còn, và tiêu chuẩn bảo mật hiện đại MTA-STS/TLS-RPT.',
    level: 'Trung bình',
    readTimeMinutes: 15,
    category: 'dns_routing',
    summary: 'Hệ thống email không thể tồn tại nếu thiếu DNS. Một sai sót nhỏ về độ ưu tiên MX hoặc thiếu bản ghi phân giải ngược PTR sẽ biến máy chủ của bạn thành bóng ma bị toàn bộ Internet từ chối.',
    hookStory: 'Một lập trình viên trẻ vừa tự tin dựng xong một máy chủ Linux Postfix hoàn hảo trên DigitalOcean, cấu hình đầy đủ SPF, DKIM và gửi email thử nghiệm sang Gmail. Thư bị ném thẳng vào lỗi "550-5.7.1 The IP establishing this connection does not have a reverse DNS assigned". Sau 3 ngày mệt mỏi lục tung cấu hình Postfix, anh mới nhận ra lỗi không nằm ở phần mềm mà nằm ở việc chưa gán Reverse DNS (PTR record) trên bảng điều khiển VPS.',
    sections: [
      {
        heading: '1. Bản Ghi MX (Mail Exchanger): Đường Đón Thư Đến',
        subheading: 'Cơ chế xếp hạng độ ưu tiên (Priority) và phân tải dự phòng (Failover)',
        content: `Khi ai đó gửi thư tới \`user@company.com\`, máy chủ gửi sẽ hỏi DNS: "Những máy chủ nào nhận thư cho company.com?". Câu trả lời nằm ở các bản ghi MX.

Mỗi bản ghi MX bao gồm một giá trị **Độ ưu tiên (Priority/Preference)** và một **Tên miền FQDN** (Lưu ý: MX bắt buộc phải trỏ về tên miền có bản ghi A, không được trỏ thẳng về địa chỉ IP thô hoặc CNAME).

• **Quy tắc số nhỏ hơn = Ưu tiên cao hơn**:
  - \`Priority 10: mail1.company.com\` (Primary Mail Server - Máy chủ chính)
  - \`Priority 20: mail2.company.com\` (Backup / Secondary Mail Server - Máy chủ dự phòng)
• Khi máy chủ chính (10) bị mất điện hoặc bảo trì, các MTA trên Internet sẽ tự động chuyển hướng gửi thư sang máy chủ dự phòng (20). Máy chủ dự phòng sẽ lưu thư vào hàng đợi (Queue) và chuyển lại cho máy chủ chính ngay khi nó online trở lại.`,
        codeBlock: {
          language: 'dns',
          title: 'Cấu Hình MX Records Chuẩn Google Workspace',
          code: `# Type | Host | Points to / Value              | Priority | TTL
MX     | @    | ASPMX.L.GOOGLE.COM.            | 1        | 3600
MX     | @    | ALT1.ASPMX.L.GOOGLE.COM.       | 5        | 3600
MX     | @    | ALT2.ASPMX.L.GOOGLE.COM.       | 5        | 3600
MX     | @    | ALT3.ASPMX.L.GOOGLE.COM.       | 10       | 3600
MX     | @    | ALT4.ASPMX.L.GOOGLE.COM.       | 10       | 3600`
        }
      },
      {
        heading: '2. Bản Ghi Phân Giải Ngược PTR (Reverse DNS - rDNS): Giấy Tờ Tùy Thân Của IP',
        subheading: 'Tại sao thiếu PTR record đồng nghĩa với cái chết của tỷ lệ gửi thư',
        content: `Bản ghi DNS A thông thường giải bài toán: "Tên miền này có IP là gì?" (\`mail.example.com -> 103.20.100.55\`).
Bản ghi **PTR (Pointer Record)** giải bài toán ngược lại: "Địa chỉ IP này thuộc về tên miền hợp pháp nào?" (\`103.20.100.55 -> mail.example.com\`).

Khi bạn tự dựng Mail Server:
1. Bạn phải vào nhà cung cấp VPS/Hosting (AWS, DigitalOcean, Linode, Hetzner, Vultr) và thiết lập Reverse DNS cho địa chỉ IP tĩnh của bạn trỏ về đúng Hostname của Mail Server (\`mail.yourdomain.com\`).
2. Giá trị Hostname trong cấu hình Postfix (\`myhostname\`) phải khớp 100% với tên miền của bản ghi PTR.
3. Nếu máy chủ gửi có IP \`1.2.3.4\` tự xưng là \`mail.bank.com\` nhưng khi phân giải ngược \`1.2.3.4\` lại ra \`unassigned.vps-provider.com\` hoặc không có PTR, hệ thống phòng thủ của Gmail, Microsoft 365, Yahoo sẽ ngay lập tức DROP kết nối với mã lỗi 550.`,
        mindsetShift: {
          from: 'Nghĩ rằng bản ghi PTR cấu hình ở nhà quản lý tên miền (như Cloudflare, Namecheap).',
          to: 'Nhớ rằng PTR record do đơn vị sở hữu dải IP (nhà cung cấp VPS / Cloud) quản lý và phải được cấu hình trên Dashboard của VPS.',
          impact: 'Tiết kiệm hàng chục giờ loay hoay tìm chỗ cấu hình PTR trên DNS Manager.'
        }
      },
      {
        heading: '3. MTA-STS (RFC 8461) & TLS-RPT: Tương Lai Mã Hóa Toàn Diện',
        subheading: 'Khắc phục điểm yếu chí mạng của STARTTLS (Chống tấn công hạ cấp Downgrade Attack)',
        content: `Mặc định, lệnh \`STARTTLS\` của SMTP là "Mã hóa tùy ý" (Opportunistic TLS). Nếu kẻ tấn công đứng giữa chặn gói tin và xóa dòng thông báo \`250-STARTTLS\`, hai máy chủ sẽ ngây thơ tụt lùi về gửi văn bản rõ (Plaintext) không mã hóa.

**MTA-STS (MTA Strict Transport Security)** ra đời để chấm dứt tình trạng này:
1. Đặt bản ghi TXT tại \`_mta-sts.yourdomain.com\` khai báo phiên bản chính sách.
2. Tạo website tĩnh HTTPS tại \`https://mta-sts.yourdomain.com/.well-known/mta-sts.txt\` chỉ định rõ: Bắt buộc mọi máy chủ gửi thư đến tôi phải dùng TLS hợp lệ, nếu không có TLS thì TUYỆT ĐỐI KHÔNG ĐƯỢC GỬI.
3. Cấu hình **TLS-RPT (TLS Reporting - RFC 8460)** để nhận báo cáo tự động khi có bất kỳ máy chủ nào gặp sự cố bắt tay bảo mật với domain của bạn.`,
        codeBlock: {
          language: 'txt',
          title: 'Nội Dung File Chính Sách mta-sts.txt',
          code: `version: STSv1
mode: enforce
mx: mail.yourdomain.com
mx: mail-backup.yourdomain.com
max_age: 604800`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Kiểm tra bản ghi phân giải ngược PTR của địa chỉ IP máy chủ',
        command: 'dig -x 103.20.100.55 +short',
        description: 'Xác minh IP đã được gán tên miền FQDN hợp lệ hay chưa'
      },
      {
        title: 'Tra cứu MX records theo thứ tự ưu tiên của bất kỳ tên miền nào',
        command: 'dig MX google.com +short | sort -n',
        description: 'Xem các máy chủ nhận thư chính và dự phòng của tổ chức'
      }
    ],
    masteryChecklist: [
      'Nắm vững nguyên lý hoạt động và cách phân cấp Priority trong bản ghi MX.',
      'Hiểu rõ bản chất rDNS/PTR và biết cách thiết lập PTR record trên bảng điều khiển VPS.',
      'Phân biệt được Forward DNS (A record) và Reverse DNS (PTR record).',
      'Hiểu cách thức hoạt động của tiêu chuẩn MTA-STS để chống tấn công nghe lén Man-in-the-Middle.'
    ]
  },
  {
    id: 'email-ch5-self-hosted-postfix-dovecot',
    chapterNumber: 5,
    title: 'Tự Dựng Mail Server Trên Linux: Postfix, Dovecot & OpenDKIM Từ A-Z',
    subtitle: 'Hướng dẫn thực chiến từng bước biến một VPS Ubuntu Server sạch thành một cỗ máy Email độc lập, an toàn và đạt điểm tuyệt đối 10/10 trên Mail-Tester.',
    level: 'Chuyên gia',
    readTimeMinutes: 22,
    category: 'self_hosted_mailserver',
    summary: 'Tự host Mail Server mang lại sự tự do và quyền riêng tư tuyệt đối. Bằng cách kết hợp Postfix (MTA), Dovecot (IMAP/MDA), OpenDKIM và chứng chỉ Let\'s Encrypt SSL, bạn sở hữu một hệ sinh thái email chuyên nghiệp không tốn phí bản quyền.',
    hookStory: 'Rất nhiều kỹ sư khuyên nhau: "Đừng bao giờ tự dựng Mail Server, đau đầu lắm!". Nhưng đối với một kỹ sư hệ thống thực thụ, cảm giác tự tay gõ từng dòng config \`main.cf\`, tích hợp OpenDKIM, tự cấp phát SSL và gửi một bức email từ VPS riêng đến thẳng Inbox chính của Gmail với điểm số 10/10 tuyệt đối là một trải nghiệm kỹ thuật mãn nguyện không gì sánh bằng.',
    sections: [
      {
        heading: '1. Cài Đặt & Cấu Hình Máy Chủ Chuyển Thư Postfix (MTA)',
        subheading: 'Cấu hình file /etc/postfix/main.cf chuẩn xác và an toàn',
        content: `Postfix là phần mềm Mail Transfer Agent mã nguồn mở phổ biến và ổn định nhất thế giới Linux, do chuyên gia an ninh mạng Wietse Venema phát triển nhằm thay thế Sendmail già cỗi.

Các thông số cấu hình cốt tử trong \`/etc/postfix/main.cf\`:
• \`myhostname = mail.yourdomain.com\`: Phải khớp với FQDN và bản ghi PTR của máy chủ.
• \`mydomain = yourdomain.com\`: Tên miền chính của bạn.
• \`myorigin = $mydomain\`: Tên miền gắn vào email gửi đi nếu người dùng không chỉ định.
• \`mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain\`: Danh sách các tên miền mà Postfix sẽ giữ lại để giao cục bộ thay vì chuyển tiếp đi nơi khác.
• \`home_mailbox = Maildir/\`: Cấu hình định dạng lưu trữ Maildir (mỗi email là một file riêng biệt, an toàn hơn định dạng mbox cổ xưa).
• \`smtpd_sasl_type = dovecot\`: Ủy quyền xác thực tên đăng nhập/mật khẩu cho Dovecot xử lý.`,
        codeBlock: {
          language: 'ini',
          title: 'File Cấu Hình Mẫu /etc/postfix/main.cf',
          code: `# Cấu hình định danh
myhostname = mail.techmaster.io
mydomain = techmaster.io
myorigin = $mydomain
inet_interfaces = all
inet_protocols = ipv4
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain

# Cấu hình lưu trữ Maildir
home_mailbox = Maildir/

# Cấu hình SSL/TLS mã hóa Let's Encrypt
smtpd_tls_cert_file = /etc/letsencrypt/live/mail.techmaster.io/fullchain.pem
smtpd_tls_key_file = /etc/letsencrypt/live/mail.techmaster.io/privkey.pem
smtpd_tls_security_level = may
smtp_tls_security_level = may
smtpd_tls_protocols = !SSLv2, !SSLv3, !TLSv1, !TLSv1.1
smtpd_tls_mandatory_protocols = !SSLv2, !SSLv3, !TLSv1, !TLSv1.1

# Xác thực người dùng qua Dovecot SASL
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth
smtpd_sasl_auth_enable = yes
smtpd_recipient_restrictions = 
    permit_mynetworks,
    permit_sasl_authenticated,
    reject_unauth_destination`
        }
      },
      {
        heading: '2. Cài Đặt & Cấu Hình Dovecot (IMAP Server & SASL Authentication)',
        subheading: 'Mở cánh cổng IMAP 993 bảo mật và quản lý hộp thư người dùng',
        content: `Dovecot đảm nhận 2 nhiệm vụ sống còn:
1. Cho phép ứng dụng khách (Thunderbird/Outlook/iPhone) kết nối qua giao thức IMAP bảo mật (Port 993) để xem và quản lý thư.
2. Đóng vai trò máy chủ xác thực (SASL Auth) để khi Postfix nhận yêu cầu gửi thư từ người dùng, Postfix sẽ hỏi Dovecot xem tài khoản và mật khẩu có đúng không.

Các file cấu hình quan trọng trong \`/etc/dovecot/\`:
• \`dovecot.conf\`: Khai báo giao thức (\`protocols = imap lmtp\`).
• \`conf.d/10-mail.conf\`: Khai báo vị trí hòm thư \`mail_location = maildir:~/Maildir\`.
• \`conf.d/10-ssl.conf\`: Chỉ định chứng chỉ SSL \`ssl_cert\` và \`ssl_key\`.
• \`conf.d/10-master.conf\`: Mở unix socket \`private/auth\` để Postfix kết nối xác thực.`,
        codeBlock: {
          language: 'ini',
          title: 'File Cấu Hình /etc/dovecot/conf.d/10-master.conf (SASL Socket)',
          code: `# Mở giao tiếp xác thực an toàn giữa Postfix và Dovecot
service auth {
  unix_listener /var/spool/postfix/private/auth {
    mode = 0660
    user = postfix
    group = postfix
  }
}`
        }
      },
      {
        heading: '3. Tích Hợp OpenDKIM Tự Động Ký Chữ Ký Số Cho Thư Đi',
        subheading: 'Biến Postfix thành cỗ máy ký mật mã học Milter (Mail Filter)',
        content: `Để Postfix tự động ký chữ ký DKIM vào mọi bức thư gửi ra ngoài:
1. Cài đặt package \`opendkim opendkim-tools\`.
2. Tạo cặp khóa Private/Public Key bằng lệnh \`opendkim-genkey -s mail -d yourdomain.com\`.
3. Khai báo 3 bảng ánh xạ:
   - \`/etc/opendkim/KeyTable\`: Ánh xạ selector \`mail._domainkey.yourdomain.com\` tới file private key.
   - \`/etc/opendkim/SigningTable\`: Khai báo địa chỉ người gửi nào (\`*@yourdomain.com\`) sẽ dùng selector nào.
   - \`/etc/opendkim/TrustedHosts\`: Khai báo các IP nội bộ được phép ký (127.0.0.1, localhost).
4. Khai báo Milter trong Postfix \`main.cf\`: \`smtpd_milters = inet:127.0.0.1:8891\`.`,
        proTip: 'Sau khi hoàn tất cài đặt, hãy gửi một email thử nghiệm tới trang web mail-tester.com để được chấm điểm toàn diện từ SPF, DKIM, SpamAssassin đến cấu trúc HTML.'
      }
    ],
    practicalCommands: [
      {
        title: 'Theo dõi nhật ký gửi/nhận email thời gian thực của Postfix',
        command: 'sudo tail -f /var/log/mail.log | grep -E "postfix|dovecot"',
        description: 'Xem chi tiết từng phiên kết nối, mã phản hồi từ Gmail/Yahoo và các lỗi từ chối'
      },
      {
        title: 'Kiểm tra và khởi động lại toàn bộ dịch vụ Mail Server',
        command: 'sudo systemctl restart postfix dovecot opendkim && sudo postfix check',
        description: 'Khởi chạy lại hệ sinh thái Mail Server sau khi chỉnh sửa cấu hình'
      }
    ],
    masteryChecklist: [
      'Tự cấu hình được Postfix main.cf với định dạng lưu trữ Maildir.',
      'Cấu hình Dovecot IMAPS trên cổng 993 và mở unix socket SASL cho Postfix.',
      'Tạo cặp khóa DKIM và tích hợp OpenDKIM Milter vào luồng gửi của Postfix.',
      'Debug lỗi Mail Server thành thạo qua file nhật ký /var/log/mail.log.'
    ]
  },
  {
    id: 'email-ch6-enterprise-providers-google-m365',
    chapterNumber: 6,
    title: 'Các Nền Tảng Email Doanh Nghiệp Lớn: Google Workspace, Microsoft 365, Zoho & Proton Mail',
    subtitle: 'So sánh chuyên sâu các giải pháp SaaS hàng đầu, chiến lược quản trị bí danh (Aliases), Catch-all, Shared Mailbox và mô hình Hybrid Split-Delivery.',
    level: 'Trung bình',
    readTimeMinutes: 16,
    category: 'enterprise_providers',
    summary: 'Doanh nghiệp hiện đại thường lựa chọn các nhà cung cấp dịch vụ Email đám mây để đảm bảo uptime 99.99%, bộ lọc Spam AI đỉnh cao và khả năng tích hợp sâu rộng với bộ ứng dụng văn phòng.',
    hookStory: 'Một công ty khởi nghiệp có 50 nhân viên. Nếu mua 50 tài khoản Google Workspace bản quyền, chi phí hàng năm sẽ là hàng nghìn USD. Nhưng một Sysadmin thông minh đã tối ưu kiến trúc: Chỉ mua 10 tài khoản chính cho nhân sự chủ chốt, tạo 30 Email Aliases miễn phí, 5 Shared Mailboxes (hòm thư chung contact@, sales@, support@ không tốn 1 xu bản quyền), và cấu hình Split Delivery định tuyến các nhân viên còn lại sang hệ thống tự host.',
    sections: [
      {
        heading: '1. Bảng So Sánh Các Ông Lớn Email Doanh Nghiệp',
        subheading: 'Lựa chọn nền tảng phù hợp với quy mô và yêu cầu bảo mật',
        content: `Mỗi nhà cung cấp dịch vụ Email doanh nghiệp đều có một thế mạnh riêng biệt:

• **Google Workspace (Gmail for Work)**:
  - Thế mạnh: Giao diện tìm kiếm email vô địch, bộ lọc Spam bằng Machine Learning tốt nhất thế giới, tích hợp hoàn hảo với Google Drive, Docs, Meet.
  - Phù hợp: Công ty công nghệ, Startup, doanh nghiệp quen làm việc trên nền Web/Cloud.
• **Microsoft 365 (Exchange Online / Outlook)**:
  - Thế mạnh: Chuẩn mực vàng cho doanh nghiệp truyền thống, chính sách bảo mật tuân thủ nghiêm ngặt (DLP, eDiscovery), tích hợp sâu với Active Directory và bộ Office cài trên máy (Word, Excel).
  - Phù hợp: Tập đoàn tài chính, ngân hàng, cơ quan nhà nước.
• **Zoho Mail**:
  - Thế mạnh: Chi phí cực kỳ cạnh tranh, có gói miễn phí cho 5 người dùng domain riêng, đầy đủ tính năng doanh nghiệp cơ bản.
  - Phù hợp: Doanh nghiệp vừa và nhỏ, cá nhân muốn tiết kiệm chi phí tối đa.
• **Proton Mail / Tuta**:
  - Thế mạnh: Mã hóa đầu cuối (Zero-Access Encryption), máy chủ đặt tại Thụy Sĩ/Đức dưới sự bảo vệ của luật quyền riêng tư nghiêm ngặt nhất thế giới. Không ai (kể cả nhà cung cấp) có thể đọc được nội dung email của bạn.
  - Phù hợp: Tổ chức tài chính mật, luật sư, nhà báo điều tra, người yêu cầu bảo mật tối thượng.`,
        bulletPoints: [
          'Google Workspace: Tối ưu cộng tác thời gian thực & tìm kiếm.',
          'Microsoft 365: Thống trị quản trị bảo mật cấp doanh nghiệp lớn.',
          'Zoho Mail: Tối ưu chi phí đầu tư cho doanh nghiệp vừa và nhỏ.',
          'Proton Mail: Chuẩn mực bảo vệ quyền riêng tư tuyệt đối.'
        ]
      },
      {
        heading: '2. Các Khái Niệm Quản Trị Hòm Thư Doanh Nghiệp Đỉnh Cao',
        subheading: 'Tối ưu chi phí và tăng năng suất vận hành',
        content: `Khi quản trị hệ thống email doanh nghiệp, bạn bắt buộc phải làm chủ 4 kỹ thuật sau:

1. **Email Aliases (Bí danh email)**:
   - Một người dùng \`johnny@company.com\` có thể nhận thêm các bí danh như \`ceo@company.com\`, \`techlead@company.com\`.
   - Thư gửi đến bất kỳ bí danh nào đều chảy về chung một Inbox của Johnny. Hoàn toàn miễn phí, không tốn thêm license.
2. **Catch-all Address (Hòm thư hứng toàn bộ)**:
   - Cấu hình một địa chỉ nhận mọi bức thư gửi đến domain nhưng bị gõ sai tên người nhận (ví dụ: \`batkytennao@company.com\` sẽ tự động chuyển về \`admin@company.com\` thay vì bị trả về lỗi người nhận không tồn tại).
3. **Shared Mailboxes (Hộp thư dùng chung)**:
   - Hòm thư đại diện như \`support@company.com\`, \`info@company.com\`. Nhiều nhân viên có thể cùng mở, đọc, trả lời thư dưới danh nghĩa bộ phận mà không cần chia sẻ mật khẩu và không tốn tiền mua thêm tài khoản người dùng trên Microsoft 365.
4. **Split Delivery / Dual Delivery (Định tuyến chia tách)**:
   - Nhận thư đồng thời hoặc chuyển tiếp thông minh giữa Google Workspace và một máy chủ thứ hai (như Mail Server nội bộ hoặc hệ thống CRM) dựa trên tiền tố địa chỉ email.`,
        mindsetShift: {
          from: 'Mỗi khi cần một địa chỉ email mới cho công ty (như sales@, hr@, billing@) đều tạo một tài khoản người dùng mới và trả thêm tiền hàng tháng.',
          to: 'Sử dụng Email Groups, Aliases và Shared Mailbox để đại diện cho phòng ban mà không tốn thêm chi phí license.',
          impact: 'Tiết kiệm từ 40% đến 70% ngân sách phần mềm hàng năm cho doanh nghiệp.'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Kiểm tra tên miền đang dùng dịch vụ email của hãng nào',
        command: 'dig MX yourcompany.com +short',
        description: 'Nhận diện nhanh Google (aspmx.l.google.com), Microsoft (mail.protection.outlook.com) hay Zoho'
      },
      {
        title: 'Xác thực bản ghi TXT xác minh quyền sở hữu tên miền của Google/Microsoft',
        command: 'dig TXT yourcompany.com +short | grep -E "google-site-verification|MS="',
        description: 'Kiểm tra mã xác thực domain của các nhà cung cấp đám mây'
      }
    ],
    masteryChecklist: [
      'So sánh được ưu nhược điểm giữa Google Workspace, Microsoft 365, Zoho và Proton Mail.',
      'Thành thạo cấu hình Email Aliases và Shared Mailbox để tối ưu hóa chi phí bản quyền.',
      'Hiểu rõ nguyên lý hoạt động của Catch-all email và rủi ro nhận thư rác khi bật tính năng này.',
      'Nắm vững kiến trúc Dual Delivery / Split Delivery phối hợp giữa Cloud SaaS và On-Premises.'
    ]
  },
  {
    id: 'email-ch7-transactional-email-cloud-apis',
    chapterNumber: 7,
    title: 'Email Giao Dịch (Transactional Email) & Các Dịch Vụ Cloud SMTP API',
    subtitle: 'Nghệ thuật gửi hàng triệu email OTP, hóa đơn và thông báo tốc độ cao với AWS SES, Resend, SendGrid, Mailgun và tích hợp code Node.js / Python.',
    level: 'Nâng cao',
    readTimeMinutes: 18,
    category: 'transactional_cloud_api',
    summary: 'Email giao dịch đòi hỏi tốc độ gửi dưới 2 giây và tỷ lệ vào Inbox gần như tuyệt đối. Sử dụng Cloud Email API (AWS SES, Resend) thay thế SMTP truyền thống giúp ứng dụng hiện đại mở rộng không giới hạn.',
    hookStory: 'Đêm giao thừa, một ứng dụng thương mại điện tử tổ chức đợt Flash Sale chớp nhoáng. 50.000 người dùng đồng loạt bấm "Đăng ký tài khoản" và chờ mã OTP xác thực qua email. Do sử dụng SMTP Server tự dựng trên 1 VPS duy nhất, hàng đợi thư bị nghẽn tắc (Queue Backlog). Mã OTP 6 chữ số có hạn 60 giây nhưng 15 phút sau thư mới tới nơi. Khách hàng giận dữ rời bỏ nền tảng. Ngày hôm sau, CTO quyết định chuyển toàn bộ email giao dịch sang AWS SES và Resend với thời gian phân phối chỉ 800 mili-giây.',
    sections: [
      {
        heading: '1. Phân Biệt Transactional Email vs Marketing Email',
        subheading: 'Hai thế giới email với mục tiêu và hạ tầng hoàn toàn khác biệt',
        content: `Trong phát triển phần mềm, việc trộn lẫn Transactional Email và Marketing Email vào cùng một dải IP là một sai lầm chết người:

• **Transactional Email (Email Giao Dịch)**:
  - Bản chất: Email phát sinh từ hành động cụ thể của người dùng (Mã OTP, Quên mật khẩu, Xác nhận đơn hàng, Hóa đơn điện tử, Cảnh báo đăng nhập lạ).
  - Yêu cầu: Tốc độ phân phối cực nhanh (< 2 giây), độ tin cậy tối đa, không cần người dùng nhấn Subscribe và không được phép bị nghẽn bởi các chiến dịch quảng cáo.
• **Marketing Email (Email Tiếp Thị / Bản Tin)**:
  - Bản chất: Email gửi đồng loạt cho hàng nghìn/hàng triệu người (Khuyến mãi cuối tuần, Newsletter, Giới thiệu tính năng mới).
  - Yêu cầu: Bắt buộc phải có nút Hủy đăng ký (Unsubscribe), quản lý phân khúc người dùng, chấp nhận độ trễ vài phút đến vài giờ.
  - **Quy tắc vàng**: Luôn tách riêng Subdomain (ví dụ: \`auth.domain.com\` cho giao dịch và \`news.domain.com\` cho tiếp thị) để bảo vệ điểm uy tín (Reputation).`,
        bulletPoints: [
          'AWS SES (Simple Email Service): Rẻ nhất thị trường ($0.10 cho 10.000 emails), độ tin cậy hạ tầng Amazon cực cao.',
          'Resend: Dịch vụ hiện đại nhất cho lập trình viên (Next.js, React Email), Developer Experience (DX) tuyệt vời.',
          'SendGrid (Twilio): Hệ sinh thái toàn diện lâu đời, mạnh về báo cáo phân tích và Template Builder.',
          'Postmark: Chuyên gia hàng đầu thế giới về tốc độ phân phối Transactional Email (< 1 giây).'
        ]
      },
      {
        heading: '2. Tích Hợp Gửi Email Bằng Code: Node.js / TypeScript & React Email',
        subheading: 'Gửi email qua HTTP REST API thay vì giao thức SMTP truyền thống',
        content: `Tại sao trong các ứng dụng Serverless hoặc Cloud hiện đại (Next.js, AWS Lambda), lập trình viên ưa chuộng gọi REST API qua HTTPS (như Resend API) hơn là mở kết nối SMTP socket truyền thống?

1. **Hiệu năng & Tốc độ**: Kết nối HTTPS stateless không mất thời gian duy trì TCP handshake kéo dài như SMTP.
2. **Khả năng vượt tường lửa**: HTTPS (Port 443) luôn luôn mở ở mọi môi trường mạng, không bao giờ bị nhà mạng chặn như Port 25/587.
3. **Template linh hoạt**: Soạn thảo email bằng React components (\`@react-email/components\`) thay vì chuỗi HTML lộn xộn.`,
        codeBlock: {
          language: 'typescript',
          title: 'Code Gửi Email Giao Dịch Bằng Resend SDK (TypeScript)',
          code: `import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendOtpParams {
  toEmail: string;
  userName: string;
  otpCode: string;
}

export async function sendOtpEmail({ toEmail, userName, otpCode }: SendOtpParams) {
  try {
    const data = await resend.emails.send({
      from: 'TechMaster Security <security@auth.techmaster.io>',
      to: [toEmail],
      subject: \`[\${otpCode}] Mã xác thực đăng nhập của bạn\`,
      html: \`
        <div style="font-family: sans-serif; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 12px;">
          <h2 style="color: #38bdf8;">Xác Thực Tài Khoản</h2>
          <p>Xin chào <strong>\${userName}</strong>,</p>
          <p>Mã OTP bảo mật của bạn có hiệu lực trong vòng 5 phút:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #fbbf24; padding: 16px 0;">
            \${otpCode}
          </div>
          <p style="font-size: 12px; color: #94a3b8;">Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email.</p>
        </div>
      \`,
      headers: {
        'X-Entity-Ref-ID': Date.now().toString(),
      }
    });

    console.log('Email sent successfully, Message ID:', data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}`
        }
      },
      {
        heading: '3. Xử Lý Sự Kiện Qua Webhooks: Bounces, Complaints & Deliveries',
        subheading: 'Tự động hóa phản ứng khi email bị trả về hoặc người nhận khiếu nại Spam',
        content: `Một hệ sinh thái gửi email chuyên nghiệp bắt buộc phải lắng nghe Webhooks từ nhà cung cấp:

• **Hard Bounce (Thư bị trả về vĩnh viễn)**: Hòm thư người nhận không tồn tại (\`550 User unknown\`). Hệ thống của bạn phải lập tức đánh dấu tài khoản này vào cơ sở dữ liệu và ngừng gửi thư vĩnh viễn. Tiếp tục gửi vào địa chỉ Hard Bounce sẽ hủy hoại điểm uy tín domain trong vài ngày.
• **Soft Bounce (Thư bị trả về tạm thời)**: Hòm thư người nhận bị đầy dung lượng (Mailbox full) hoặc máy chủ đích tạm thời quá tải. Có thể thử gửi lại sau vài giờ.
• **Spam Complaint (Khiếu nại rác)**: Người nhận bấm nút "Báo cáo thư rác" trên Gmail/Yahoo. Bạn bắt buộc phải tự động hủy đăng ký (Unsubscribe) người dùng này ngay lập tức. Tỷ lệ khiếu nại Spam vượt quá **0.1% - 0.3%** sẽ khiến domain bị chặn toàn cầu.`,
        mindsetShift: {
          from: 'Chỉ quan tâm tới việc hàm gửi email trả về HTTP 200 (coi như gửi xong).',
          to: 'Xây dựng Webhook Receiver để theo dõi toàn bộ vòng đời sau đó: Đã chuyển thành công (Delivered), Bị trả về (Bounced), hay Bị báo cáo (Complaint).',
          impact: 'Bảo vệ dải IP và Domain luôn nằm trong danh sách uy tín cao nhất của Gmail và Microsoft.'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Gửi email giao dịch nhanh qua cURL sử dụng Resend REST API',
        command: 'curl -X POST https://api.resend.com/emails -H "Authorization: Bearer $RESEND_KEY" -H "Content-Type: application/json" -d \'{"from":"onboarding@resend.dev","to":"you@domain.com","subject":"Hello World","html":"<p>Test cURL</p>"}\'',
        description: 'Kiểm tra hoạt động của Cloud Email API mà không cần cài đặt thư viện SDK'
      },
      {
        title: 'Kiểm tra danh sách Verified Identities trên AWS SES bằng AWS CLI',
        command: 'aws sesv2 list-email-identities --region us-east-1',
        description: 'Xem các domain và địa chỉ email đã được xác minh SPF/DKIM trên tài khoản AWS'
      }
    ],
    masteryChecklist: [
      'Phân biệt rạch ròi sự khác biệt giữa Transactional Email và Marketing Email.',
      'Tích hợp thành thạo Cloud Email SDK (Resend, AWS SES, SendGrid) vào ứng dụng backend.',
      'Hiểu rõ sự khác biệt và cách xử lý kỹ thuật giữa Hard Bounce và Soft Bounce.',
      'Xây dựng webhook xử lý sự kiện Delivered, Bounced và Complaint tự động.'
    ]
  },
  {
    id: 'email-ch8-deliverability-ip-warming-blacklist',
    chapterNumber: 8,
    title: 'Nghệ Thuật Email Deliverability, IP Warming & Xử Lý Blacklist',
    subtitle: 'Bí quyết lọt vào Hộp Thư Chính (Primary Inbox), chiến lược làm ấm IP/Domain mới, và quy trình thoát khỏi các tổ chức Blacklist hàng đầu (Spamhaus, Barracuda).',
    level: 'Chuyên gia',
    readTimeMinutes: 20,
    category: 'deliverability_reputation',
    summary: 'Deliverability (Khả năng vào Inbox) là thước đo tối thượng của hệ thống email. Gửi được email đi chỉ là 10% chặng đường; 90% còn lại là nghệ thuật xây dựng uy tín danh tiếng (Reputation) để vượt qua bộ lọc Spam AI.',
    hookStory: 'Năm 2023, một sàn thương mại điện tử lớn mua một dải IP tĩnh Dedicated mới tinh để chuẩn bị cho chiến dịch Black Friday. Trong ngày đầu tiên, họ hào hứng bắn thẳng 200.000 email thông báo giảm giá. Kết quả: Thuật toán AI của Gmail phát hiện một IP lạ chưa từng thấy bỗng nhiên phát tán lưu lượng khổng lồ. 98% email bị tống thẳng vào hộp thư rác (Spam Folder) hoặc bị Drop. Chiến dịch thất bại hoàn toàn chỉ vì bỏ qua quy tắc cơ bản: IP Warming (Làm ấm IP).',
    sections: [
      {
        heading: '1. Danh Tiếng Người Gửi (Sender Reputation) Được Tính Toán Thế Nào?',
        subheading: 'Hai trụ cột song song: IP Reputation và Domain Reputation',
        content: `Các nhà cung cấp hòm thư lớn (Google, Microsoft, Yahoo) duy trì hệ thống tính điểm danh tiếng vô cùng phức tạp theo thời gian thực:

• **IP Reputation (Điểm uy tín địa chỉ IP)**: Đánh giá dựa trên dải địa chỉ IP thực hiện kết nối SMTP.
• **Domain Reputation (Điểm uy tín tên miền)**: Kể từ khi các dịch vụ Cloud dùng chung IP (Shared IPs) bùng nổ, thuật toán chuyển trọng tâm sang chấm điểm tên miền trong Header \`From:\` và chữ ký DKIM \`d=domain.com\`. Ngay cả khi bạn đổi IP mới, nếu tên miền mang tiếng xấu, thư vẫn vào Spam.

Các yếu tố tăng điểm uy tín:
✓ Tỷ lệ mở thư cao (Open Rate > 25%), tỷ lệ người nhận bấm trả lời (Reply/Conversation).
✓ Người nhận chủ động kéo thư từ tab Promotions/Spam sang tab Primary Inbox.
✓ Người nhận thêm địa chỉ email của bạn vào Danh Bạ (Contacts / Whitelist).

Các yếu tố trừ điểm nặng nề:
✗ Tỷ lệ khiếu nại Spam (Spam Complaints > 0.1%).
✗ Gửi thư vào các "Hố bẫy thư rác" (Spam Traps / Honey Pots) - các địa chỉ email ma do tổ chức chống Spam lập ra để bắt các bên đi mua danh sách email lậu.
✗ Tỷ lệ Hard Bounce cao do gửi vào danh sách email chết.`,
        mindsetShift: {
          from: 'Nghĩ rằng chỉ cần mua danh sách hàng trăm nghìn email trôi nổi trên mạng rồi dùng tool gửi hàng loạt là có khách hàng.',
          to: 'Hiểu rằng mua list rác là tự sát: Spam Traps sẽ lập tức đưa IP/Domain của bạn vào danh sách đen vĩnh viễn (Blacklist), phá hủy hoàn toàn hạ tầng email của công ty.',
          impact: 'Duy trì danh sách email sạch (Double Opt-in) và bảo vệ tỷ lệ vào Inbox luôn trên 95%.'
        }
      },
      {
        heading: '2. Chiến Lược Làm Ấm IP & Tên Miền (IP / Domain Warming)',
        subheading: 'Xây dựng lòng tin với các bộ lọc thư rác theo lộ trình khoa học',
        content: `Khi bạn vừa mua một IP Dedicated mới hoặc khởi tạo một Tên miền mới toanh, danh tiếng của bạn là **Con Số 0 (Zero Reputation)**. Các bộ lọc Spam sẽ vô cùng nghi ngờ nếu lưu lượng tăng đột biến.

Lịch trình làm ấm tiêu chuẩn trong 4 tuần:
• **Tuần 1**: Chỉ gửi cho những người dùng tích cực nhất (người vừa đăng ký, người thường xuyên tương tác). Bắt đầu từ 50 - 200 email/ngày.
• **Tuần 2**: Tăng dần lên 500 - 1.000 email/ngày. Theo dõi chặt chẽ Google Postmaster Tools.
• **Tuần 3**: Mở rộng lên 2.500 - 5.000 email/ngày.
• **Tuần 4**: Đạt mốc 10.000+ email/ngày và duy trì lưu lượng đều đặn.

**Quy tắc tiêu chuẩn One-Click Unsubscribe (RFC 8058)**:
Kể từ năm 2024, mọi email số lượng lớn bắt buộc phải chứa Header cho phép người dùng hủy đăng ký bằng 1 chạm mà không cần đăng nhập:
\`List-Unsubscribe: <https://yourdomain.com/unsubscribe?id=123>, <mailto:unsub@yourdomain.com>\`
\`List-Unsubscribe-Post: List-Unsubscribe=One-Click\``,
        bulletPoints: [
          'Không bao giờ tăng lưu lượng đột ngột quá 100% so với ngày hôm trước.',
          'Duy trì gửi email đều đặn mỗi ngày thay vì dồn dập 1 tháng gửi 1 lần.',
          'Sử dụng Google Postmaster Tools để theo dõi đồ thị Domain Reputation của Gmail.'
        ]
      },
      {
        heading: '3. Kiểm Tra & Xử Lý Gỡ Bỏ Khỏi Danh Sách Đen (Blacklists / RBL)',
        subheading: 'Quy trình giải cứu IP khi bị Spamhaus, Barracuda hoặc SpamCop chặn đứng',
        content: `RBL (Real-time Blackhole List) là các tổ chức độc lập giám sát và cung cấp danh sách các IP/Domain phát tán mã độc hoặc thư rác cho các Mail Server toàn cầu.

Các tổ chức RBL quyền lực nhất:
1. **Spamhaus (SBL, XBL, PBL, DBL)**: "Tòa án tối cao" của thế giới email. Nếu bị dính Spamhaus SBL (Spamhaus Block List), 90% email của bạn sẽ bị từ chối trên toàn cầu.
2. **Barracuda Reputation Network**: Rất phổ biến trong môi trường máy chủ doanh nghiệp.
3. **SpamCop**: Danh sách dựa trên khiếu nại của người dùng thời gian thực.

**Quy trình gỡ Blacklist (Delisting Process)**:
1. Xác định nguyên nhân gốc rễ: Máy chủ có bị nhiễm mã độc gửi thư rác ngầm không? Có tài khoản người dùng nào bị lộ mật khẩu (Compromised account) không?
2. Dọn sạch hàng đợi thư (\`postsuper -d ALL\`), đổi mật khẩu toàn bộ hệ thống và vá lỗ hổng.
3. Truy cập trang Delist của tổ chức (ví dụ: \`check.spamhaus.org\`), điền biểu mẫu giải trình chi tiết lỗi đã khắc phục và cam kết không tái phạm.`,
        proTip: 'Sử dụng công cụ MXToolbox hoặc MultiRBL để kiểm tra định kỳ xem IP máy chủ của bạn có vô tình rơi vào bất kỳ danh sách đen nào trong hơn 100 RBL phổ biến hay không.'
      }
    ],
    practicalCommands: [
      {
        title: 'Kiểm tra trạng thái IP của bạn trên hệ thống Spamhaus qua DNS lookup',
        command: 'dig 55.100.20.103.zen.spamhaus.org +short',
        description: 'Nếu trả về 127.0.0.x nghĩa là IP đang bị Blacklist; nếu không trả về gì nghĩa là sạch'
      },
      {
        title: 'Xem và xóa sạch các email rác đang tồn đọng trong hàng đợi Postfix',
        command: 'sudo postqueue -p && sudo postsuper -d ALL',
        description: 'Dọn sạch Mail Queue khi phát hiện máy chủ bị lợi dụng gửi thư rác'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ các yếu tố cấu thành nên Domain Reputation và IP Reputation.',
      'Thiết lập lộ trình IP Warming 4 tuần cho hệ thống gửi email mới.',
      'Triển khai chuẩn List-Unsubscribe Header theo tiêu chuẩn bắt buộc của Google/Yahoo.',
      'Nắm vững quy trình xử lý sự cố và gửi yêu cầu gỡ bỏ IP khỏi Spamhaus / RBL.'
    ]
  },
  {
    id: 'email-ch9-cybersecurity-phishing-pgp',
    chapterNumber: 9,
    title: 'Tấn Công & Phòng Thủ An Ninh Email (Cybersecurity in Email)',
    subtitle: 'Phân tích các chiêu thức lừa đảo BEC, Phishing tinh vi, chặn đứng Open Relay, và mã hóa tối thượng đầu cuối với PGP / S-MIME.',
    level: 'Chuyên gia',
    readTimeMinutes: 20,
    category: 'cybersecurity_defense',
    summary: 'Email là véc-tơ tấn công mạng số 1 thế giới (chiếm hơn 90% các vụ xâm nhập doanh nghiệp). Làm chủ kỹ thuật phòng thủ chống mạo danh, ngăn ngừa Open Relay và mã hóa PGP là kỹ năng bắt buộc của kỹ sư bảo mật.',
    hookStory: 'Năm 2019, một tập đoàn công nghệ đa quốc gia đã chuyển nhầm 100 triệu USD cho một tài khoản ngân hàng lừa đảo tại Đông Âu. Kẻ tấn công không hề hack vào hệ thống ngân hàng; chúng chỉ đơn giản thực hiện một cuộc tấn công BEC (Business Email Compromise): Tạo một tên miền mạo danh gần giống tên nhà cung cấp phần cứng, gửi email hóa đơn thanh toán giả mạo cho phòng kế toán. Vì máy chủ của công ty không bật DMARC p=reject, bức thư lừa đảo trót lọt đi thẳng vào Inbox kế toán trưởng.',
    sections: [
      {
        heading: '1. Giải Phẫu Các Hình Thức Tấn Công Email Nguy Hiểm Nhất',
        subheading: 'Từ Email Spoofing cơ bản đến các chiến dịch lừa đảo hàng triệu USD',
        content: `Các hình thức tấn công qua email phổ biến và nguy hiểm:

• **Email Spoofing (Giả mạo người gửi)**: Lợi dụng giao thức SMTP thô không xác thực để ghi đè trường \`From: ceo@company.com\`. Biện pháp khắc phục: Bật DMARC \`p=reject\` và SPF \`-all\`.
• **Look-alike Domains / Typosquatting (Tên miền gần giống)**: Kẻ tấn công đăng ký tên miền trông giống hệt nạn nhân (ví dụ: \`micros0ft.com\` với số 0 thay cho chữ o, hoặc \`company-support.com\`).
• **BEC (Business Email Compromise - Lừa đảo thỏa hiệp email doanh nghiệp)**: Kẻ xấu theo dõi chuỗi hội thoại của lãnh đạo, sau đó gửi email yêu cầu chuyển tiền gấp hoặc thay đổi số tài khoản nhận tiền của nhà cung cấp.
• **Open Relay Abuse (Lợi dụng máy chủ mở)**: Máy chủ Mail Server của bạn bị cấu hình sai, cho phép bất kỳ ai trên Internet gửi thư qua máy chủ của bạn tới bên thứ ba mà không cần đăng nhập. Hacker sẽ dùng máy chủ của bạn để bắn hàng triệu thư rác, khiến IP của bạn bị khóa vĩnh viễn trong 1 giờ.`,
        codeBlock: {
          language: 'ini',
          title: 'Cấu Hình Chống Open Relay Tuyệt Đối Trong Postfix (/etc/postfix/main.cf)',
          code: `# Chỉ cho phép mạng nội bộ hoặc người dùng đã đăng nhập SASL được gửi thư đi
smtpd_relay_restrictions = 
    permit_mynetworks,
    permit_sasl_authenticated,
    reject_unauth_destination`
        }
      },
      {
        heading: '2. Mã Hóa Đầu Cuối (End-to-End Encryption): PGP/GPG & S/MIME',
        subheading: 'Bảo vệ nội dung bức thư ngay cả khi máy chủ email trung gian bị xâm nhập',
        content: `Mã hóa TLS trên đường truyền (Transport Encryption) chỉ bảo vệ dữ liệu khi đang bay trên dây cáp mạng giữa 2 máy chủ. Khi thư nằm trên đĩa cứng của Google hay Postfix, quản trị viên máy chủ hoàn toàn có thể đọc được nội dung.

Để đạt được sự bảo mật tối thượng, nội dung email phải được mã hóa ngay tại thiết bị của người gửi và chỉ giải mã tại thiết bị của người nhận:

• **PGP / GPG (Pretty Good Privacy / GnuPG)**:
  - Chuẩn mã hóa phi tập trung (Web of Trust).
  - Người dùng tự tạo cặp khóa Public Key và Private Key. Người gửi dùng Public Key của người nhận để mã hóa nội dung; chỉ có Private Key trên máy người nhận mới giải mã được.
• **S/MIME (Secure/Multipurpose Internet Mail Extensions)**:
  - Sử dụng chứng chỉ số X.509 do các tổ chức CA (Certificate Authority) chính thức cấp phát.
  - Tích hợp sẵn trong Microsoft Outlook và Apple Mail, tự động gắn dấu tích xanh xác thực danh tính cá nhân.`,
        codeBlock: {
          language: 'bash',
          title: 'Mã Hóa File Email Bằng GnuPG (GPG)',
          code: `# 1. Nhập Public Key của người nhận
gpg --import recipient_public_key.asc

# 2. Mã hóa bức thư bí mật chỉ người nhận mới đọc được
gpg --encrypt --armor --recipient sarah@resistance.org secret_plan.txt

# 3. Kết quả tạo ra file secret_plan.txt.asc chứa văn bản mã hóa PGP an toàn`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Kiểm tra xem Mail Server của bạn có bị lỗ hổng Open Relay nguy hiểm hay không',
        command: 'nmap --script smtp-open-relay.nse -p 25 mail.yourdomain.com',
        description: 'Quét tự động kiểm tra khả năng bị hacker lợi dụng làm bàn đạp phát tán thư rác'
      },
      {
        title: 'Tạo cặp khóa mã hóa PGP mới cho địa chỉ email cá nhân',
        command: 'gpg --full-generate-key',
        description: 'Tạo khóa bảo mật RSA/Ed25519 cho email để trao đổi thông tin tuyệt mật'
      }
    ],
    masteryChecklist: [
      'Nhận diện các dấu hiệu của tấn công BEC và Look-alike domain phishing.',
      'Cấu hình Postfix chặn đứng 100% nguy cơ biến máy chủ thành Open Relay.',
      'Hiểu rõ sự khác biệt giữa mã hóa đường truyền (TLS) và mã hóa đầu cuối (PGP/S-MIME).',
      'Thành thạo tạo và sử dụng khóa GPG để ký và mã hóa email nhạy cảm.'
    ]
  },
  {
    id: 'email-ch10-automation-mjml-future',
    chapterNumber: 10,
    title: 'Tự Động Hóa, Phân Tích & Tương Lai Của Email',
    subtitle: 'Thiết kế giao diện email chuẩn Responsive với MJML/React Email, xây dựng Pipeline xử lý Inbound Email Webhook, và lộ trình trở thành Chuyên gia Hệ thống Email.',
    level: 'Nâng cao',
    readTimeMinutes: 18,
    category: 'automation_templates',
    summary: 'Email không hề già cỗi mà đang bước vào kỷ nguyên tự động hóa thông minh. Nắm vững kỹ thuật lập trình giao diện email responsive (MJML), xử lý luồng thư đến (Inbound Webhooks) và phân tích dữ liệu mở ra cánh cửa kiến trúc sư hệ thống toàn diện.',
    hookStory: 'Bất kỳ lập trình viên Frontend nào từng phải code giao diện email HTML đều phải trải qua "cơn ác mộng": Outlook trên Windows vẫn sử dụng engine render Microsoft Word từ năm 2007! Bạn không thể dùng Flexbox, không có CSS Grid, không hỗ trợ nhiều thuộc tính hiện đại. Cho đến khi MJML và React Email ra đời, biến việc thiết kế email thành trải nghiệm viết component sạch sẽ, tự động biên dịch ra hàng nghìn dòng mã HTML bảng (Table-based) tương thích 100% mọi ứng dụng email trên thế giới.',
    sections: [
      {
        heading: '1. Cuộc Cách Mạng Thiết Kế Email: Từ Nỗi Đau HTML Table Đến MJML & React Email',
        subheading: 'Xây dựng giao diện hiển thị hoàn hảo trên cả Apple Mail Dark Mode và Outlook cũ',
        content: `Tại sao không thể dùng HTML/CSS thông thường để viết email?
Bởi vì có hơn 50 phần mềm đọc email khác nhau trên thế giới (Gmail Web, Gmail Android, Outlook Desktop, Apple Mail, Yahoo Mail), mỗi ứng dụng sử dụng một bộ máy render riêng biệt và thường cắt bỏ (strip) các thẻ \`<style>\` hoặc class CSS.

Giải pháp hiện đại:
• **MJML (Mailjet Markup Language)**: Ngôn ngữ đánh dấu dạng XML ngữ nghĩa (\`<mj-section>\`, \`<mj-column>\`, \`<mj-button>\`), tự động biên dịch ra mã HTML Table phức tạp tương thích hoàn hảo.
• **React Email**: Sử dụng các React components thân thuộc (\`@react-email/components\`) để viết giao diện email trực tiếp trong dự án Next.js / Node.js với hỗ trợ TypeScript và Tailwind CSS.`,
        codeBlock: {
          language: 'xml',
          title: 'Code Mẫu Giao Diện Email Bằng Cú Pháp MJML Tối Giản',
          code: `<mjml>
  <mj-body background-color="#0f172a">
    <mj-section>
      <mj-column>
        <mj-text font-size="24px" color="#38bdf8" font-family="helvetica" font-weight="bold">
          Bản Tin Công Nghệ TechMaster
        </mj-text>
        <mj-divider border-color="#334155"></mj-divider>
        <mj-text font-size="14px" color="#cbd5e1" line-height="22px">
          Chào bạn, hệ thống Mail Server của bạn đã chính thức đạt chứng chỉ DMARC và bảo vệ toàn diện 100%.
        </mj-text>
        <mj-button background-color="#8b5cf6" color="#ffffff" href="https://techmaster.io/dashboard" border-radius="8px">
          Truy Cập Bảng Điều Khiển
        </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
        }
      },
      {
        heading: '2. Inbound Email Parsing: Biến Email Đến Thành Dữ Liệu JSON Webhook',
        subheading: 'Xây dựng hệ thống tự động hóa phản hồi và tiếp nhận thông tin backend',
        content: `Inbound Email Parsing là kỹ thuật cho phép máy chủ của bạn nhận một email gửi tới (ví dụ: \`ticket-9842@support.yourdomain.com\`), bóc tách tiêu đề, người gửi, nội dung chữ, file đính kèm và gửi một HTTP POST request chứa dữ liệu JSON tới API backend của bạn.

Ứng dụng thực tế mạnh mẽ:
• **Hệ thống Helpdesk / Hỗ trợ khách hàng**: Khách hàng chỉ cần bấm "Reply" email là câu trả lời tự động được nạp vào ticket trên hệ thống mà không cần họ phải đăng nhập web.
• **Xử lý hóa đơn tự động**: Nhân viên chuyển tiếp hóa đơn PDF tới \`invoice@company.com\`, hệ thống tự động tải PDF, chạy OCR đọc dữ liệu và ghi vào phần mềm kế toán.
• **Bảo mật**: Tự động phân tích các email nghi ngờ lừa đảo được nhân viên báo cáo về \`phishing-report@company.com\`.`,
        mindsetShift: {
          from: 'Chỉ nghĩ email là kênh thông tin một chiều dành cho con người đọc bằng mắt.',
          to: 'Xem Email như một cổng API bất đối xứng (Asynchronous API Endpoint) có thể tự động tiếp nhận và xử lý dữ liệu từ mọi người dùng trên toàn cầu.',
          impact: 'Mở ra vô số giải pháp tự động hóa quy trình nghiệp vụ (Business Process Automation).'
        }
      },
      {
        heading: '3. Bản Đồ Năng Lực Trở Thành Chuyên Gia Hệ Thống Email Toàn Diện',
        subheading: 'Hành trình từ người học đến kỹ sư làm chủ hạ tầng email cấp thế giới',
        content: `Để tự tin làm chủ và vận hành bất kỳ hệ thống email nào trong sự nghiệp kỹ thuật của bạn, hãy ghi nhớ 4 nấc thang cốt lõi:

1. **Nấc Thang 1: Nền tảng Giao thức & Mạng**: Thành thạo RFC 5321 (SMTP), RFC 5322 (Format), IMAP IDLE, DNS MX, rDNS PTR.
2. **Nấc Thang 2: Định danh & An ninh**: Triển khai thuần thục SPF (không quá 10 lookups), DKIM RSA/Ed25519, DMARC Enforcement (p=reject), MTA-STS và BIMI.
3. **Nấc Thang 3: Vận hành Hạ tầng & Cloud APIs**: Tự tin dựng Postfix/Dovecot trên Linux hoặc tích hợp AWS SES, Resend, SendGrid, tối ưu chi phí với Google/Microsoft 365.
4. **Nấc Thang 4: Deliverability & Tự động hóa**: Kiểm soát danh tiếng IP/Domain, kỹ thuật làm ấm IP Warming, xử lý triệt để Hard Bounce, xây dựng giao diện MJML và Inbound Parsing.`,
        storyQuote: {
          quote: 'Email là giao thức mở phi tập trung hiếm hoi từ thời sơ khai của Internet vẫn phát triển mạnh mẽ và giữ vị thế độc tôn cho đến ngày nay. Ai làm chủ được email, người đó nắm giữ huyết mạch giao tiếp của thế giới số.',
          speaker: 'Bách Khoa Toàn Thư Email Systems',
          role: 'Lời kết bộ giáo trình',
          year: '2026'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Biên dịch file template MJML thành file HTML tương thích mọi email client',
        command: 'npx mjml template.mjml -o email_output.html',
        description: 'Tạo mã HTML tối ưu hóa responsive cho mọi ứng dụng đọc email'
      },
      {
        title: 'Kiểm tra điểm chất lượng toàn diện của một email gửi đi với mail-tester',
        command: 'curl -s https://www.mail-tester.com/ | grep -oE "test-[a-z0-9]+@srv1.mail-tester.com"',
        description: 'Lấy địa chỉ hòm thư test ngẫu nhiên để gửi thử và kiểm tra điểm Spam Score'
      }
    ],
    masteryChecklist: [
      'Sử dụng MJML hoặc React Email để tạo template email responsive hiện đại.',
      'Hiểu rõ cơ chế hoạt động của Inbound Email Webhook Parsing.',
      'Nắm vững toàn bộ 4 nấc thang năng lực của một Kỹ sư Hệ thống Email chuyên nghiệp.',
      'Tự tin thiết kế, cấu hình, bảo mật và vận hành hệ thống email cho bất kỳ doanh nghiệp nào.'
    ]
  }
];
