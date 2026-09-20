import { DomainChapter } from '../../types/webDomain';

export const DOMAIN_CHAPTERS: DomainChapter[] = [
  {
    id: 'ch1-domain-fundamentals',
    chapterNumber: 1,
    title: 'Chương 1: Khởi Nguyên & Bản Chất Tên Miền (Domain Fundamentals)',
    subtitle: 'Nền móng sơ khởi của Internet: Từ địa chỉ IP khô khan đến định danh thương hiệu toàn cầu.',
    category: 'fundamentals',
    readTimeMinutes: 12,
    level: 'Cơ bản',
    summary: 'Giải mã bản chất tên miền, lý do ra đời thay thế địa chỉ IP số, cấu trúc chuẩn FQDN từ gốc (Root) đến Subdomain, các loại đuôi tên miền và các tổ chức điều phối toàn cầu (ICANN, Registry, Registrar).',
    sections: [
      {
        heading: '1. Tên miền là gì & Vì sao cần Tên miền?',
        content: 'Mọi thiết bị kết nối vào mạng Internet (máy chủ web, máy tính cá nhân, điện thoại) đều giao tiếp với nhau thông qua địa chỉ IP (Internet Protocol) dạng số như 142.250.190.46 (IPv4) hoặc 2607:f8b0:4005:805::200e (IPv6). Con người không thể ghi nhớ hàng nghìn chuỗi số IP khô khan này để truy cập các dịch vụ hàng ngày. Tên miền (Domain Name) ra đời như một hệ thống "danh bạ điện thoại" của Internet, biến các dãy số IP phức tạp thành các chuỗi ký tự có nghĩa, dễ nhớ và mang tính nhận diện thương hiệu cao.',
        bulletPoints: [
          'Tính trừu tượng hóa: Tên miền giúp che giấu hạ tầng IP bên dưới. Khi máy chủ đổi IP, tên miền vẫn giữ nguyên.',
          'Tính sở hữu linh hoạt: Một tên miền có thể trỏ về nhiều máy chủ khác nhau (Load Balancing, CDN) hoặc chuyển đổi nhà cung cấp mà người dùng không hề nhận ra.',
          'Định danh thương hiệu (Branding): Tên miền là tài sản số vô giá đại diện cho danh tiếng, thương hiệu và uy tín của doanh nghiệp trên không gian mạng.'
        ]
      },
      {
        heading: '2. Cấu trúc phân cấp của Tên miền chuẩn FQDN (Fully Qualified Domain Name)',
        content: 'Một tên miền đầy đủ không chỉ đơn giản là một từ, mà là một cấu trúc phân cấp dạng cây (Tree Hierarchy) đọc từ phải sang trái:',
        bulletPoints: [
          'Root Domain (.): Dấu chấm vô hình ở tận cùng bên phải (ví dụ: "example.com."). Đây là đỉnh cao nhất của cây phân cấp DNS do 13 cụm máy chủ Root Server quản lý.',
          'Top-Level Domain (TLD): Đuôi tên miền cao nhất (.com, .net, .vn, .org, .io, .ai).',
          'Second-Level Domain (SLD): Phần tên chính mà bạn đăng ký (ví dụ: "google" trong "google.com", "vnexpress" trong "vnexpress.net").',
          'Subdomain (Tên miền phụ): Các tiền tố nhánh do chủ sở hữu tự tạo để phân chia dịch vụ (ví dụ: "mail.google.com", "api.stripe.com", "app.slack.com").',
          'Third-Level & Lower: Các cấp sâu hơn như "staging.api.v2.example.com" - hỗ trợ phân nhánh không giới hạn trong giới hạn 253 ký tự của FQDN.'
        ],
        diagramType: 'fqdn-structure',
        codeBlock: {
          language: 'text',
          title: 'Sơ đồ bóc tách cấu trúc FQDN',
          code: `         subdomain.second-level.top-level.root
               ↓          ↓          ↓     ↓
            [ api ] . [ mybrand ] . [ com ] .
            └──────────────────────────────┘
                         FQDN
`
        }
      },
      {
        heading: '3. Phân loại các nhóm đuôi Tên miền (TLD Categories)',
        content: 'Hiện nay có hơn 1,500 đuôi tên miền trên thế giới, được phân thành 4 nhóm chính:',
        bulletPoints: [
          'gTLD (Generic TLD): Đuôi dùng chung truyền thống (.com, .org, .net, .info, .biz). Phổ biến nhất và không bị giới hạn địa lý.',
          'ccTLD (Country Code TLD): Tên miền mã quốc gia 2 ký tự (.vn - Việt Nam, .us - Mỹ, .jp - Nhật, .de - Đức, .uk - Anh). Thường được ưu tiên xếp hạng SEO tại quốc gia sở tại.',
          'new gTLD (New Generic TLD): Các đuôi thế hệ mới ra đời từ 2012 phản ánh ngành nghề (.tech, .dev, .app, .cloud, .store, .online, .ai, .io).',
          'sTLD (Sponsored TLD): Tên miền đặc quyền có điều kiện xét duyệt khắt khe (.edu - giáo dục, .gov - chính phủ, .mil - quân đội, .bank - ngân hàng).'
        ],
        proTip: 'Đuôi .com luôn là tiêu chuẩn vàng về độ tin cậy và gõ phím vô thức của người dùng. Với công ty công nghệ hoặc startup AI, đuôi .ai, .io, .dev đang là xu hướng được ưa chuộng bậc nhất.'
      },
      {
        heading: '4. Hệ sinh thái Quản lý Tên miền Toàn cầu (ICANN -> Registry -> Registrar -> Registrant)',
        content: 'Để một tên miền được cấp phát độc nhất trên toàn thế giới mà không bị trùng lặp, cần một chuỗi phân cấp quản trị nghiêm ngặt:',
        bulletPoints: [
          'ICANN & IANA: Tổ chức phi lợi nhuận quốc tế nắm quyền điều phối cấp cao nhất toàn bộ không gian địa chỉ IP và hệ thống TLD toàn cầu.',
          'Registry (Cơ quan chủ quản TLD): Đơn vị vận hành cơ sở dữ liệu gốc của từng đuôi TLD. Ví dụ: Verisign quản lý .com và .net; VNNIC quản lý .vn; Nominet quản lý .uk.',
          'Registrar (Nhà đăng ký tên miền): Các công ty bán lẻ được ICANN cấp phép để tiếp nhận đăng ký từ người dùng (ví dụ: Cloudflare Registrar, Namecheap, GoDaddy, Google Domains / Squarespace, PA Vietnam, Mat Bao).',
          'Registrant (Chủ thể đăng ký): Chính là bạn hoặc doanh nghiệp của bạn - người đứng tên sở hữu và có quyền sử dụng tên miền trong thời hạn đăng ký.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'whois',
        title: 'Tra cứu thông tin chủ thể và Registrar của tên miền',
        command: 'whois github.com',
        description: 'Xem thông tin Registrar (MarkMonitor), ngày tạo, ngày hết hạn và NameServer hiện tại của domain.'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ sự khác biệt giữa IP và Domain Name',
      'Phân tích thành thạo cấu trúc 1 chuỗi FQDN',
      'Phân biệt được gTLD, ccTLD, new gTLD và sTLD',
      'Nắm vững vai trò của ICANN, Registry, Registrar và Registrant'
    ]
  },
  {
    id: 'ch2-dns-architecture',
    chapterNumber: 2,
    title: 'Chương 2: Cơ Chế Hoạt Động Của Hệ Thống DNS Toàn Cầu (Under The Hood)',
    subtitle: 'Hành trình 50ms của 1 truy vấn web từ lúc gõ phím đến khi máy chủ phản hồi IP.',
    category: 'dns_architecture',
    readTimeMinutes: 15,
    level: 'Trung cấp',
    summary: 'Mổ xẻ chi tiết 8 bước của một truy vấn DNS chuẩn, phân biệt Recursive DNS vs Authoritative DNS, nguyên lý Anycast DNS và cơ chế hoạt động của bộ nhớ đệm DNS Cache & TTL.',
    sections: [
      {
        heading: '1. Vòng đời 8 bước phân giải DNS (DNS Resolution Lifecycle)',
        content: 'Khi bạn gõ "https://example.com" vào thanh địa chỉ trình duyệt và nhấn Enter, máy tính của bạn phải tìm ra địa chỉ IP của example.com qua quy trình phân giải phân cấp:',
        bulletPoints: [
          'Bước 1: Trình duyệt kiểm tra DNS Cache nội bộ của chính nó (Chrome/Firefox lưu cache trong 1-5 phút).',
          'Bước 2: Nếu không có, trình duyệt hỏi Hệ điều hành (OS DNS Cache trên Windows/macOS/Linux và file hosts cục bộ).',
          'Bước 3: Nếu vẫn không có, truy vấn được gửi tới Recursive DNS Resolver (máy chủ DNS của ISP mạng nhà bạn, hoặc 1.1.1.1 Cloudflare, 8.8.8.8 Google).',
          'Bước 4: Recursive Resolver hỏi Root Nameserver (Máy chủ gốc - 13 cụm chữ cái từ a.root-servers.net đến m.root-servers.net). Root Server trả về địa chỉ của TLD Nameserver quản lý đuôi .com.',
          'Bước 5: Resolver tiếp tục hỏi .com TLD Nameserver. TLD Server trả về địa chỉ của Authoritative Nameserver quản lý domain example.com (ví dụ: ns1.cloudflare.com).',
          'Bước 6: Resolver hỏi Authoritative Nameserver. Máy chủ này chứa hồ sơ gốc và trả về địa chỉ IP chính xác (ví dụ: 93.184.216.34).',
          'Bước 7: Recursive Resolver lưu kết quả vào cache theo thời gian TTL và trả kết quả về cho Hệ điều hành của bạn.',
          'Bước 8: Trình duyệt nhận IP từ OS và bắt đầu quá trình TCP Handshake / TLS Handshake để tải trang web.'
        ],
        diagramType: 'dns-recursive-flow',
        codeBlock: {
          language: 'text',
          title: 'Sơ đồ luồng truy vấn DNS đệ quy',
          code: `User Browser ──(1)──> OS Cache ──(2)──> Recursive Resolver (1.1.1.1)
                                                     │
               ┌─────────────────────────────────────┼──────────────────────────────────┐
               ▼ (3)                                 ▼ (4)                              ▼ (5)
      Root Nameserver (.)                   TLD Nameserver (.com)           Authoritative NS (Cloudflare)
      Trả về: NS của .com                   Trả về: NS của domain           Trả về: IP 93.184.216.34 🎯
`
        }
      },
      {
        heading: '2. Phân biệt Recursive DNS Resolver vs Authoritative Nameserver',
        content: 'Đây là khái niệm then chốt mà rất nhiều kỹ sư IT hay nhầm lẫn:',
        bulletPoints: [
          'Recursive Resolver (Người đi tìm): Đóng vai trò như "thám tử" hoặc "nhân viên tiếp tân". Khi bạn hỏi, nếu nó không nhớ trong cache, nó sẽ tự động chạy đi hỏi Root -> TLD -> Authoritative thay bạn rồi đem đáp án về. Ví dụ: Google DNS (8.8.8.8), Cloudflare DNS (1.1.1.1), OpenDNS, DNS của VNPT/Viettel.',
          'Authoritative Nameserver (Người giữ sổ sách gốc): Là máy chủ nắm giữ bản ghi DNS gốc (Source of Truth) của tên miền. Nó không đi hỏi ai khác mà chỉ trả lời dứt khoát: "Tên miền này có IP là gì, MX là gì". Ví dụ: AWS Route 53, Cloudflare DNS, Namecheap NS.'
        ]
      },
      {
        heading: '3. Cơ chế Anycast DNS & Mạng lưới 13 Root Server',
        content: 'Trên lý thuyết thế giới chỉ có 13 địa chỉ IP Root Server (từ a.root-servers.net đến m.root-servers.net). Tuy nhiên, nếu chỉ có 13 máy chủ vật lý, toàn bộ Internet sẽ sụp đổ ngay lập tức do quá tải và độ trễ địa lý. Công nghệ Anycast Routing giải quyết bài toán này:',
        bulletPoints: [
          'Nguyên lý Anycast: Một địa chỉ IP duy nhất được gán cho hàng trăm cụm máy chủ đặt tại khắp các lục địa trên thế giới qua giao thức định tuyến BGP.',
          'Khi bạn gửi truy vấn tới 1.1.1.1 hoặc a.root-servers.net, gói tin mạng sẽ tự động được bộ định tuyến Internet dẫn tới máy chủ vật lý gần vị trí địa lý của bạn nhất (độ trễ thấp nhất < 5ms).',
          'Hiện nay, 13 địa chỉ Root Server được nhân bản thành hơn 1,500 máy chủ vật lý toàn cầu, chống chịu được các đợt tấn công DDoS hàng terabit mỗi giây.'
        ]
      },
      {
        heading: '4. Bản chất của TTL (Time To Live) & DNS Caching',
        content: 'TTL là thời gian (tính bằng giây) mà các máy chủ trung gian và máy khách được phép lưu trữ bản ghi DNS trong bộ nhớ đệm trước khi phải truy vấn lại bản ghi mới:',
        bulletPoints: [
          'TTL cao (ví dụ: 86400s = 24h): Tiết kiệm băng thông, tăng tốc độ truy vấn cho người dùng vì đọc từ cache, nhưng khi bạn đổi IP máy chủ, người dùng sẽ mất tới 24h mới cập nhật (DNS Propagation chậm).',
          'TTL thấp (ví dụ: 300s = 5 phút hoặc 60s): Đổi IP là có hiệu lực gần như ngay lập tức, cực kỳ lý tưởng khi chuẩn bị di dời website (migration) hoặc cấu hình failover.',
          'Quy tắc vàng: Luôn hạ TTL xuống 300s trước ngày chuyển server 24-48 giờ!'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'dig',
        title: 'Theo dõi từng bước phân giải DNS đệ quy từ Root đến Authoritative',
        command: 'dig +trace example.com',
        description: 'Lệnh dig +trace sẽ hiển thị trực tiếp từng chặng Root Server -> .com TLD -> Authoritative Server.'
      },
      {
        tool: 'nslookup',
        title: 'Truy vấn DNS trực tiếp qua một máy chủ DNS chỉ định',
        command: 'nslookup example.com 1.1.1.1',
        description: 'Bỏ qua DNS mặc định của ISP để kiểm tra xem Cloudflare DNS đã nhận diện IP mới chưa.'
      }
    ],
    masteryChecklist: [
      'Giải thích lưu loát 8 bước phân giải DNS khi mở trình duyệt',
      'Phân biệt chính xác Recursive Resolver và Authoritative Server',
      'Hiểu rõ cơ chế Anycast Routing trong hạ tầng DNS toàn cầu',
      'Biết cách điều chỉnh và ứng dụng TTL trong các kịch bản thực tế'
    ]
  },
  {
    id: 'ch3-dns-records',
    chapterNumber: 3,
    title: 'Chương 3: Toàn Bộ Các Bản Ghi DNS & Kỹ Thuật Cấu Hình Chi Tiết',
    subtitle: 'Bách khoa toàn thư về các bản ghi: A, AAAA, CNAME, MX, TXT, SPF, DKIM, DMARC, CAA, SRV, PTR.',
    category: 'dns_records',
    readTimeMinutes: 18,
    level: 'Nâng cao',
    summary: 'Phân tích chi tiết từng loại bản ghi DNS, cú pháp chuẩn, trường hợp sử dụng, các lỗi cấu hình thường gặp và giải pháp cho bài toán CNAME flattening tại root domain.',
    sections: [
      {
        heading: '1. Nhóm bản ghi Định Tuyến Web (A, AAAA, CNAME, ALIAS)',
        content: 'Đây là các bản ghi quan trọng nhất để điều hướng người dùng đến đúng máy chủ web:',
        bulletPoints: [
          'Bản ghi A (Address): Trỏ tên miền trực tiếp tới một địa chỉ IPv4 (ví dụ: example.com -> 104.21.45.12).',
          'Bản ghi AAAA (IPv6 Address): Trỏ tên miền tới địa chỉ IPv6 128-bit (ví dụ: example.com -> 2606:4700:3033::6815:2d0c). Chuẩn mực tương lai của Internet.',
          'Bản ghi CNAME (Canonical Name): Tạo bí danh (alias) trỏ từ tên miền này sang một tên miền khác (ví dụ: www.example.com CNAME example.com, hoặc app.example.com CNAME myapp.herokuapp.com).',
          'Vấn đề CNAME Flattening / ALIAS tại Apex/Root Domain: Theo chuẩn RFC 1034, không được đặt CNAME tại Apex domain (@ hoặc example.com) vì nó sẽ xung đột với bản ghi NS và SOA. Các DNS hiện đại (Cloudflare, Route 53 ALIAS) cung cấp tính năng CNAME Flattening để giải quyết triệt để vấn đề này.'
        ],
        codeBlock: {
          language: 'zonefile',
          title: 'Ví dụ cấu hình DNS Zone File chuẩn',
          code: `; Bản ghi A và AAAA cho root domain
@           300   IN   A      198.51.100.42
@           300   IN   AAAA   2001:db8::42

; CNAME cho Subdomain
www         300   IN   CNAME  example.com.
api         300   IN   CNAME  lb-prod.aws-elb.com.
`
        }
      },
      {
        heading: '2. Nhóm bản ghi Email & Bộ Ba Bảo Mật Chống Giả Mạo (MX, SPF, DKIM, DMARC)',
        diagramType: 'email-security-shield',
        content: 'Hệ thống email toàn cầu hoạt động dựa trên 4 bản ghi DNS cốt lõi để đảm bảo thư gửi đi vào Inbox 100% và không bị hacker giả mạo tên miền:',
        bulletPoints: [
          'Bản ghi MX (Mail Exchanger): Chỉ định máy chủ nhận thư của domain kèm độ ưu tiên (Priority - số càng nhỏ ưu tiên càng cao). Ví dụ: 10 aspmx.l.google.com.',
          'Bản ghi SPF (Sender Policy Framework - dạng TXT): Khai báo danh sách các địa chỉ IP / dịch vụ được phép gửi mail đại diện cho tên miền của bạn (ví dụ: v=spf1 include:_spf.google.com ~all). Ngăn chặn kẻ xấu giả mạo From: ceo@yourcompany.com.',
          'Bản ghi DKIM (DomainKeys Identified Mail - dạng TXT/CNAME): Chứa khóa công khai (Public Key) dùng để xác minh chữ ký điện tử mã hóa gắn trong từng email gửi đi, chứng minh nội dung thư không bị chỉnh sửa trên đường truyền.',
          'Bản ghi DMARC (Domain-based Message Authentication - dạng TXT tại _dmarc.example.com): Bản ghi chính sách chỉ đạo máy chủ nhận thư (Gmail, Outlook) phải làm gì khi thư không vượt qua SPF/DKIM: p=none (chỉ giám sát), p=quarantine (ném vào Spam), p=reject (từ chối nhận thẳng tay).'
        ],
        codeBlock: {
          language: 'zonefile',
          title: 'Cấu hình hoàn chỉnh bộ ba SPF + DKIM + DMARC',
          code: `; 1. Khai báo MX Google Workspace
@           3600  IN   MX     1  aspmx.l.google.com.
@           3600  IN   MX     5  alt1.aspmx.l.google.com.

; 2. Bản ghi SPF
@           3600  IN   TXT    "v=spf1 include:_spf.google.com include:sendgrid.net ~all"

; 3. Bản ghi DKIM
google._domainkey 3600 IN TXT "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC..."

; 4. Bản ghi DMARC nghiêm ngặt
_dmarc      3600  IN   TXT    "v=DMARC1; p=reject; rua=mailto:dmarc-reports@example.com; pct=100"
`
        }
      },
      {
        heading: '3. Nhóm bản ghi Quản trị & Xác Thực Hệ Thống (NS, SOA, TXT, CAA, PTR, SRV)',
        content: 'Các bản ghi phục vụ điều hành hạ tầng và bảo mật nâng cao:',
        bulletPoints: [
          'NS (Name Server): Xác định máy chủ DNS nào có thẩm quyền quản lý toàn bộ bản ghi của tên miền.',
          'SOA (Start of Authority): Chứa thông tin quản trị cơ bản: Primary NS, email admin, Serial number (tăng lên mỗi khi sửa DNS để đồng bộ sang Slave NS), Refresh, Retry, Expire, Min TTL.',
          'TXT (Text Record): Bản ghi đa năng dùng để xác minh quyền sở hữu tên miền (Google Search Console, Microsoft 365, Facebook Domain Verification, SSL Let\'s Encrypt DNS-01 Challenge).',
          'CAA (Certificate Authority Authorization): Chỉ định rõ ràng tổ chức nào (Let\'s Encrypt, DigiCert) được phép cấp chứng chỉ SSL cho tên miền, chặn kẻ xấu giả mạo chứng chỉ.',
          'PTR (Pointer Record): Bản ghi phân giải ngược (Reverse DNS) từ IP sang Domain - bắt buộc phải cấu hình đúng trên máy chủ gửi mail để không bị đánh dấu Spam.',
          'SRV (Service Record): Định vị cổng và giao thức của các dịch vụ chuyên biệt như SIP, VoIP, XMPP, Minecraft Server, Microsoft Teams.'
        ],
        codeBlock: {
          language: 'zonefile',
          title: 'Ví dụ bản ghi CAA và SRV',
          code: `; Chỉ cho phép Let's Encrypt và DigiCert cấp SSL
@           3600  IN   CAA    0 issue "letsencrypt.org"
@           3600  IN   CAA    0 issue "digicert.com"
@           3600  IN   CAA    0 iodef "mailto:security@example.com"

; Cấu hình Minecraft Server tại port 25565
_minecraft._tcp.play 3600 IN SRV 0 5 25565 mc-server.example.com.
`
        }
      }
    ],
    practicalCommands: [
      {
        tool: 'dig',
        title: 'Kiểm tra bản ghi MX và TXT (SPF, DMARC)',
        command: 'dig example.com MX +short && dig _dmarc.example.com TXT +short',
        description: 'Kiểm tra nhanh xem hệ thống mail và chính sách bảo mật DMARC đã được kích hoạt chưa.'
      },
      {
        tool: 'dig',
        title: 'Kiểm tra thẩm quyền cấp phát SSL qua bản ghi CAA',
        command: 'dig example.com CAA +short',
        description: 'Xem danh sách Certificate Authority được phép sinh SSL cho tên miền.'
      }
    ],
    masteryChecklist: [
      'Nắm vững sự khác nhau giữa A, AAAA và CNAME',
      'Hiểu rõ cơ chế CNAME Flattening tại Apex Domain',
      'Tự tay thiết lập và debug chuẩn bộ ba email: SPF, DKIM, DMARC',
      'Hiểu rõ công dụng của các bản ghi NS, SOA, CAA, PTR, SRV'
    ]
  },
  {
    id: 'ch4-lifecycle-transfer',
    chapterNumber: 4,
    title: 'Chương 4: Vòng Đời Tên Miền & Thủ Tục Quản Trị Chuyên Nghiệp',
    subtitle: 'Từ đăng ký mới, gia hạn, thời kỳ chuộc (Redemption) đến quy trình chuyển nhượng an toàn 100%.',
    category: 'lifecycle_transfer',
    readTimeMinutes: 14,
    level: 'Trung cấp',
    summary: 'Mô hình 5 giai đoạn vòng đời tên miền quốc tế, cơ chế tự động gia hạn, cách thức săn tên miền hết hạn (Drop Catching), và quy trình 6 bước chuyển Registrar (Domain Transfer) không gián đoạn.',
    sections: [
      {
        heading: '1. Vòng đời 5 giai đoạn của Tên Miền Quốc Tế (ICANN Domain Lifecycle)',
        content: 'Một tên miền không được mua vĩnh viễn mà được thuê theo chu kỳ (1-10 năm). Khi hết hạn, tên miền sẽ trải qua các trạng thái nghiêm ngặt trước khi bị xóa hoàn toàn:',
        bulletPoints: [
          'Giai đoạn 1: Active / Registered (Hoạt động bình thường): Thời gian từ 1 đến 10 năm. Mọi dịch vụ web/email chạy bình thường.',
          'Giai đoạn 2: Expired / Auto-Renew Grace Period (Ân hạn gia hạn - 0 đến 45 ngày): Domain vừa hết hạn. Website và email sẽ bị tạm ngưng (thay bằng trang thông báo hết hạn). Bạn vẫn có thể gia hạn với GIÁ GỐC bình thường mà không bị phạt.',
          'Giai đoạn 3: Redemption Period / Grace Period (Thời kỳ chuộc - 30 ngày): Domain bị khóa để chuẩn bị xóa. Muốn lấy lại, chủ cũ phải trả phí gia hạn + PHÍ CHUỘC RẤT CAO (thường từ $80 - $250 tùy Registrar).',
          'Giai đoạn 4: Pending Delete (Chờ xóa - 5 ngày): Không ai có thể gia hạn hay chuộc lại nữa. Tên miền nằm trong hàng đợi của Registry để chuẩn bị giải phóng.',
          'Giai đoạn 5: Released to Public / Available (Tự do đăng ký lại): Tên miền trở về trạng thái tự do, ai nhanh tay hơn sẽ đăng ký được theo cơ chế First-Come First-Served.'
        ],
        diagramType: 'domain-lifecycle',
        codeBlock: {
          language: 'text',
          title: 'Timeline vòng đời tên miền sau khi hết hạn',
          code: `[Ngày 0: Hết hạn] ──> [0-45 ngày: Grace Period] ──> [30 ngày: Redemption] ──> [5 ngày: Pending Delete] ──> [Tự do đăng ký]
   (Giá gia hạn gốc)          (Bị ngắt web, giá gốc)        (Phạt chuộc $100-$250)      (Không thể cứu)           (Drop Catching)
`
        }
      },
      {
        heading: '2. Quy trình 6 bước Chuyển Nhà Đăng Ký (Domain Transfer) an toàn',
        content: 'Khi bạn muốn chuyển tên miền từ nhà cung cấp cũ (GoDaddy, Namecheap) sang nhà cung cấp mới (Cloudflare, Porkbun) để tiết kiệm chi phí hoặc tối ưu quản lý:',
        bulletPoints: [
          'Bước 1: Kiểm tra điều kiện 60 ngày của ICANN (Tên miền phải được đăng ký hoặc chuyển lần cuối cách đây ít nhất 60 ngày).',
          'Bước 2: Mở khóa tên miền (Tắt chế độ Registrar Lock / Domain Lock trên bảng điều khiển cũ sang trạng thái "Unlocked").',
          'Bước 3: Lấy mã ủy quyền chuyển nhượng (Auth Code / EPP Code) từ nhà đăng ký cũ.',
          'Bước 4: Kiểm tra email quản trị trong thông tin WHOIS để đảm bảo bạn nhận được thư xác nhận (FOA - Form of Authorization).',
          'Bước 5: Đăng nhập nhà đăng ký mới, nhập tên miền, điền mã EPP Code và thanh toán phí gia hạn 1 năm.',
          'Bước 6: Xác nhận email đồng ý chuyển. Quá trình chuyển tự động diễn ra từ 5 đến 7 ngày (hoặc bấm "Approve Transfer" ngay lập tức tại Registrar cũ).'
        ],
        warningNote: 'Khi chuyển Registrar, NameServer và bản ghi DNS của bạn có thể bị gián đoạn nếu bạn dùng NameServer miễn phí của nhà đăng ký cũ. Hãy chuyển DNS sang Cloudflare hoặc DNS độc lập trước khi tiến hành chuyển Registrar!'
      },
      {
        heading: '3. Các chế độ Khóa An Toàn Tên Miền (Domain Locks)',
        content: 'Các cơ chế bảo vệ tên miền khỏi nguy cơ bị đánh cắp hoặc chuyển nhượng trái phép:',
        bulletPoints: [
          'ClientTransferProhibited (Registrar Lock): Chế độ khóa tiêu chuẩn do Registrar cung cấp. Ngăn chặn mọi yêu cầu chuyển nhượng khi chưa được chủ tài khoản mở khóa chủ động.',
          'Registry Lock: Cấp độ bảo mật tối cao dành cho các ngân hàng và tập đoàn lớn. Mọi thao tác thay đổi DNS, mở khóa hoặc chuyển nhượng đều phải được xác thực thủ công 3 bên: Chủ sở hữu, Registrar và trực tiếp Cơ quan quản lý Registry (như Verisign, VNNIC) qua điện thoại và mật mã an ninh.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'whois',
        title: 'Kiểm tra trạng thái khóa tên miền (Domain Status EPP Codes)',
        command: 'whois example.com | grep "Domain Status"',
        description: 'Kiểm tra xem domain có đang ở trạng thái clientTransferProhibited (đã khóa an toàn) hay không.'
      }
    ],
    masteryChecklist: [
      'Ghi nhớ chính xác các mốc thời gian của Domain Lifecycle',
      'Hiểu rủi ro và chi phí đắt đỏ của giai đoạn Redemption Period',
      'Thực hiện thành thạo quy trình Domain Transfer 6 bước an toàn',
      'Phân biệt Registrar Lock và Registry Lock'
    ]
  },
  {
    id: 'ch5-security-dnssec',
    chapterNumber: 5,
    title: 'Chương 5: Bảo Mật Tên Miền & An Toàn Web Server (Security & Protection)',
    subtitle: 'Chống tấn công chiếm đoạt domain, nhiễm độc DNS cache và rò rỉ dữ liệu cá nhân.',
    category: 'security_dnssec',
    readTimeMinutes: 16,
    level: 'Chuyên gia',
    summary: 'Bảo vệ quyền riêng tư WHOIS Privacy & GDPR, cơ chế mã hóa xác thực DNSSEC chống DNS Cache Poisoning, phòng chống tấn công Subdomain Takeover và Typosquatting.',
    sections: [
      {
        heading: '1. WHOIS Privacy & Quyền Riêng Tư Dữ Liệu (GDPR Masking)',
        content: 'Mặc định, khi đăng ký tên miền, toàn bộ thông tin cá nhân của bạn (Họ tên, số điện thoại, địa chỉ nhà riêng, email cá nhân) đều được công khai trên cơ sở dữ liệu WHOIS toàn cầu. Bất kỳ ai, từ hacker, kẻ lừa đảo đến công ty quảng cáo rác đều có thể tra cứu:',
        bulletPoints: [
          'WHOIS Privacy / Privacy Protection: Dịch vụ thay thế thông tin cá nhân của bạn bằng thông tin pháp nhân đại diện của công ty bảo mật (ví dụ: Withheld for Privacy, WhoisGuard, Cloudflare Privacy).',
          'Hiện nay, các nhà đăng ký hiện đại như Cloudflare, Namecheap, Porkbun đều MIỄN PHÍ trọn đời tính năng này.',
          'Lưu ý tên miền .vn: Theo quy định của VNNIC, tên miền quốc gia Việt Nam yêu cầu định danh chính xác chủ thể cá nhân / doanh nghiệp và không hỗ trợ ẩn danh hoàn toàn như tên miền quốc tế.'
        ]
      },
      {
        heading: '2. DNSSEC (Domain Name System Security Extensions) - Khiên Chắn Chữ Ký Số',
        content: 'Giao thức DNS truyền thống ra đời từ năm 1983 không có tính năng bảo mật. Gói tin DNS phản hồi bằng văn bản thuần (Plaintext UDP), rất dễ bị tin tặc chặn đường và tiêm địa chỉ IP giả (DNS Spoofing / DNS Cache Poisoning), khiến người dùng gõ web ngân hàng nhưng bị dẫn sang web lừa đảo:',
        bulletPoints: [
          'Nguyên lý hoạt động của DNSSEC: Sử dụng mật mã học khóa công khai (Public-Key Cryptography) để ký chữ ký số lên từng bản ghi DNS (bản ghi RRSIG).',
          'Chuỗi tin cậy (Chain of Trust): Bắt đầu từ Root Key Signing Key (KSK) -> TLD Zone -> Bản ghi DS (Delegation Signer) tại Registrar -> Zone Signing Key (ZSK) của Domain.',
          'Khi trình duyệt truy vấn, Recursive Resolver sẽ tự động kiểm tra chữ ký số. Nếu gói tin bị hacker sửa đổi, chữ ký sẽ không khớp và Resolver sẽ chặn ngay lập tức (trả về lỗi SERVFAIL), bảo vệ người dùng 100%.'
        ],
        diagramType: 'dnssec-records',
        codeBlock: {
          language: 'text',
          title: 'Các bản ghi mật mã học trong DNSSEC',
          code: `1. DNSKEY: Chứa Public Key (KSK & ZSK) dùng để giải mã chữ ký.
2. RRSIG: Chữ ký số thực tế gắn kèm mọi bản ghi (A, AAAA, MX, CNAME).
3. DS (Delegation Signer): Bản băm (hash) của DNSKEY được gửi lên Registry để tạo Chain of Trust.
4. NSEC / NSEC3: Chứng minh một bản ghi không tồn tại một cách an toàn mà không làm lộ zone.
`
        }
      },
      {
        heading: '3. Hiểm họa Subdomain Takeover & Cách Phòng Ngừa',
        content: 'Subdomain Takeover là một trong những lỗ hổng bảo mật phổ biến và nguy hiểm nhất trong các doanh nghiệp sử dụng hạ tầng Cloud:',
        bulletPoints: [
          'Kịch bản tấn công: Bạn trỏ bản ghi CNAME "blog.yourcompany.com" tới một dịch vụ bên thứ ba (ví dụ: GitHub Pages, S3 Bucket, Heroku, Shopify). Sau một thời gian, bạn ngừng dùng dịch vụ đó và xóa tài nguyên trên Cloud, NHƯNG LẠI QUÊN XÓA BẢN GHI CNAME TRÊN DNS.',
          'Hacker phát hiện CNAME trỏ về một đích vô chủ, lập tức tạo một tài nguyên mới trên GitHub/S3 với đúng tên miền đó và chiếm quyền kiểm soát hoàn toàn subdomain "blog.yourcompany.com".',
          'Hậu quả: Hacker có thể phát tán mã độc, đọc Cookie phiên đăng nhập của Root domain hoặc thực hiện lừa đảo với uy tín của chính công ty bạn.',
          'Giải pháp: Thường xuyên rà soát (Audit) toàn bộ bản ghi DNS, xóa ngay các bản ghi CNAME không còn sử dụng (Dangling DNS records).'
        ]
      },
      {
        heading: '4. Typosquatting, Phishing & Bảo Vệ Thương Hiệu',
        content: 'Kẻ xấu thường đăng ký các tên miền gần giống thương hiệu lớn (sai 1 ký tự, đảo chữ, thay đuôi tld) để lừa đảo người dùng gõ nhầm (ví dụ: go0gle.com, paypa1.com, vcb-ebank.online):',
        bulletPoints: [
          'Chiến lược đăng ký phòng thủ (Defensive Registration): Doanh nghiệp nên đăng ký trước các biến thể tên miền phổ biến (.com, .net, .vn, .com.vn) và các lỗi gõ sai thường gặp rồi cấu hình 301 Redirect về trang chính.',
          'Thủ tục UDRP (Uniform Domain-Name Dispute-Resolution Policy): Cơ chế giải quyết tranh chấp tên miền của WIPO/ICANN cho phép chủ sở hữu nhãn hiệu kiện và thu hồi tên miền bị kẻ xấu đầu cơ trục lợi.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'dig',
        title: 'Kiểm tra bản ghi chữ ký số DNSSEC (RRSIG và DS)',
        command: 'dig +dnssec cloudflare.com && dig cloudflare.com DS +short',
        description: 'Xem các chữ ký RRSIG đi kèm bản ghi A và mã băm DS record trên TLD.'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ tầm quan trọng và cách bật WHOIS Privacy',
      'Giải thích tường tận chuỗi tin cậy Chain of Trust của DNSSEC',
      'Biết cách quét và vá dứt điểm lỗ hổng Subdomain Takeover (Dangling DNS)',
      'Nắm vững chiến lược bảo vệ thương hiệu chống Typosquatting'
    ]
  },
  {
    id: 'ch6-web-admin-servers',
    chapterNumber: 6,
    title: 'Chương 6: Quản Trị Web Server & Kết Nối Tên Miền Thực Tế',
    subtitle: 'Làm chủ Nginx, Apache, Caddy, Cloudflare Proxy, SSL/TLS Let\'s Encrypt và Wildcard Certificate.',
    category: 'web_admin_servers',
    readTimeMinutes: 16,
    level: 'Chuyên gia',
    summary: 'Thực hành cấu hình VirtualHost trên Nginx/Apache, tự động cấp phát chứng chỉ SSL/TLS miễn phí qua Certbot, cấu hình Cloudflare Reverse Proxy và thiết lập chuyển hướng chuẩn SEO (301 HTTPS).',
    sections: [
      {
        heading: '1. Cấu hình Nginx VirtualHost (Server Block) chuẩn công nghiệp',
        content: 'Khi trỏ tên miền về địa chỉ IP của máy chủ VPS Linux (Ubuntu/Debian), Nginx sử dụng chỉ thị `server_name` để bắt đúng tên miền được yêu cầu và phục vụ thư mục tương ứng:',
        codeBlock: {
          language: 'nginx',
          title: '/etc/nginx/sites-available/example.com.conf',
          code: `server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    # Tự động chuyển hướng toàn bộ HTTP sang HTTPS chuẩn SEO (301)
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com www.example.com;

    root /var/www/example.com/html;
    index index.html index.php index.htm;

    # Chứng chỉ SSL Certbot
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Chuyển tiếp tới backend Node.js / Python nếu có
    location /api/ {
        proxy_pass http://127.0.0.1:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
`
        }
      },
      {
        heading: '2. Tự động hóa SSL/TLS miễn phí với Let\'s Encrypt & Certbot',
        content: 'Chứng chỉ SSL/TLS mã hóa toàn bộ dữ liệu trao đổi giữa trình duyệt và máy chủ (HTTPS), ngăn chặn lộ mật khẩu và tăng thứ hạng SEO Google:',
        bulletPoints: [
          'HTTP-01 Challenge: Certbot đặt một file tạm thời trong thư mục `.well-known/acme-challenge/`. Máy chủ Let\'s Encrypt truy cập qua HTTP port 80 để xác minh bạn là chủ máy chủ.',
          'DNS-01 Challenge: Bắt buộc dùng khi cần cấp chứng chỉ Wildcard (*.example.com) cho toàn bộ subdomain. Certbot sẽ yêu cầu tạo bản ghi TXT `_acme-challenge.example.com` trên DNS để xác minh quyền sở hữu toàn bộ domain.',
          'Tự động gia hạn: Let\'s Encrypt có thời hạn 90 ngày. Cài đặt cronjob / systemd timer `certbot renew` để tự động làm mới chứng chỉ trước khi hết hạn 30 ngày.'
        ],
        codeBlock: {
          language: 'bash',
          title: 'Các lệnh Certbot phổ biến',
          code: `# Cài đặt Certbot và tự động cấu hình Nginx
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com

# Cấp chứng chỉ Wildcard qua DNS Challenge
sudo certbot certonly --manual --preferred-challenges dns -d example.com -d *.example.com
`
        }
      },
      {
        heading: '3. Làm chủ Cloudflare Proxy (Đám mây Cam vs Đám mây Xám)',
        diagramType: 'cloudflare-proxy-flow',
        content: 'Cloudflare là dịch vụ DNS, CDN và WAF phổ biến nhất thế giới. Hiểu rõ cơ chế hoạt động của Cloudflare giúp bạn tránh được hàng loạt lỗi 521, 522, 524:',
        bulletPoints: [
          'Proxy On (Đám mây màu Cam - Orange Cloud): Toàn bộ lưu lượng truy cập đi qua máy chủ Reverse Proxy của Cloudflare. IP gốc của máy chủ được ẩn hoàn toàn (chống DDoS), bật tính năng nén WebP, Auto Minify, Caching CDN và WAF.',
          'DNS Only (Đám mây màu Xám - Grey Cloud): Tên miền trỏ thẳng tới IP máy chủ gốc. Dùng cho các bản ghi SSH, FTP, Mail Server hoặc các dịch vụ không chạy qua cổng Web (HTTP/HTTPS).',
          'Các chế độ SSL Cloudflare: Luôn chọn "Full (Strict)" để đảm bảo mã hóa đầu cuối từ Cloudflare về máy chủ gốc. Tránh dùng "Flexible" vì dễ gây vòng lặp chuyển hướng vô tận (ERR_TOO_MANY_REDIRECTS).'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'curl',
        title: 'Kiểm tra mã trạng thái HTTP, SSL và chuyển hướng 301',
        command: 'curl -Iv https://example.com',
        description: 'Kiểm tra thông tin chi tiết về chứng chỉ SSL, HTTP/2, Header Server và Location redirect.'
      }
    ],
    masteryChecklist: [
      'Viết thành thạo cấu hình Nginx Server Block chuẩn HTTPS & Reverse Proxy',
      'Hiểu rõ sự khác biệt giữa HTTP-01 và DNS-01 challenge của Let\'s Encrypt',
      'Phân biệt chính xác chế độ Proxy On (Cam) và DNS Only (Xám) trên Cloudflare',
      'Khắc phục thành thạo lỗi vòng lặp SSL Redirect (Too Many Redirects)'
    ]
  },
  {
    id: 'ch7-pro-tips-troubleshooting',
    chapterNumber: 7,
    title: 'Chương 7: Kinh Nghiệm Thực Chiến, Bí Quyết & Xử Lý Sự Cố (Mastery Guide)',
    subtitle: 'Quy trình Zero-Downtime Migration, bí quyết săn domain chuẩn SEO và bộ công cụ cứu cánh cho SysAdmin.',
    category: 'pro_tips_troubleshooting',
    readTimeMinutes: 15,
    level: 'Chuyên gia',
    summary: 'Quy trình 5 bước chuyển máy chủ không gián đoạn (Zero-Downtime Migration), kinh nghiệm chọn tên miền chuẩn SEO & phòng tránh domain dính án phạt, cùng cẩm nang xử lý các sự cố DNS khẩn cấp.',
    sections: [
      {
        heading: '1. Quy trình Di Dời Website Không Gián Đoạn (Zero-Downtime Server Migration)',
        diagramType: 'zero-downtime-migration',
        content: 'Chuyển một website có hàng trăm nghìn lượt truy cập mỗi ngày sang máy chủ mới mà không làm rớt một request nào là kỹ năng đỉnh cao của một SysAdmin / Cloud Engineer:',
        bulletPoints: [
          'Bước 1: Hạ TTL trước 24 đến 48 giờ. Đổi TTL của bản ghi A từ 86400s (24h) xuống 300s (5 phút). Đảm bảo mọi máy chủ DNS trên thế giới chỉ lưu cache tối đa 5 phút.',
          'Bước 2: Chuẩn bị máy chủ mới. Cài đặt môi trường, import source code, cấu hình Nginx và cài sẵn SSL certificate.',
          'Bước 3: Đồng bộ dữ liệu (Data Sync). Chuyển database và file media sang server mới. Nếu có cơ sở dữ liệu động, đặt web cũ sang chế độ Read-Only tạm thời hoặc thiết lập MySQL Master-Slave Replication.',
          'Bước 4: Đổi bản ghi DNS A trỏ sang IP server mới. Do TTL đã hạ xuống 300s, lượng truy cập sẽ chuyển dần sang server mới chỉ trong vòng vài phút.',
          'Bước 5: Giữ song song server cũ trong 48 giờ. Theo dõi Access Log trên cả 2 server. Khi server cũ hoàn toàn không còn request nào nữa, tăng lại TTL lên 3600s/86400s và tắt máy chủ cũ an toàn.'
        ]
      },
      {
        heading: '2. Bí Quyết Chọn Tên Miền & Thẩm Định Lịch Sử (SEO & Brand Valuation)',
        content: 'Trước khi xuống tiền mua một tên miền (đặc biệt là tên miền cũ / Expired Domain), cần thực hiện quy trình thẩm định kỹ lưỡng:',
        bulletPoints: [
          'Nguyên tắc 3S: Short (Ngắn gọn < 10 ký tự) - Simple (Dễ nhớ, không có số hay dấu gạch ngang) - Specific (Liên quan đến ngành nghề hoặc thương hiệu độc quyền).',
          'Kiểm tra lịch sử Web trên Wayback Machine (archive.org): Xem trong quá khứ tên miền này từng làm website gì. Tuyệt đối không mua tên miền từng làm web cờ bạc, nội dung khiêu dâm, lừa đảo vì đã bị Google đưa vào Blacklist.',
          'Kiểm tra Blacklist Spam Email: Dùng MXToolbox tra cứu xem IP/Domain có bị dính vào các danh sách đen Spamhaus, Barracuda hay không.',
          'Kiểm tra hồ sơ Backlink (Ahrefs / SEMrush): Xem tên miền có bị spam hàng triệu backlink bẩn từ các trang web độc hại hay không.'
        ]
      },
      {
        heading: '3. Bộ Công Cụ Cứu Cánh Cho Webmaster & SysAdmin',
        content: 'Danh sách các công cụ không thể thiếu khi vận hành và xử lý sự cố:',
        bulletPoints: [
          'dnschecker.org / whatsmydns.net: Kiểm tra trạng thái lan truyền DNS (DNS Propagation) trên 30+ máy chủ toàn cầu.',
          'mxtoolbox.com: Bộ kiểm tra toàn diện bản ghi MX, SPF, DKIM, DMARC, Blacklist.',
          'ssllabs.com/ssltest/: Đánh giá chất lượng và độ bảo mật của cấu hình SSL/TLS (Mục tiêu đạt điểm A+).',
          'whois.domaintools.com / who.is: Tra cứu lịch sử chủ sở hữu và NameServer.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'dig',
        title: 'Xóa DNS Cache trên máy tính cục bộ (Flush DNS)',
        command: '# Windows: ipconfig /flushdns \n# macOS: sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder \n# Linux: sudo systemd-resolve --flush-caches',
        description: 'Lệnh làm mới bộ nhớ đệm DNS trên hệ điều hành ngay lập tức sau khi đổi bản ghi DNS.'
      }
    ],
    masteryChecklist: [
      'Thực hiện chuẩn xác quy trình Zero-Downtime Migration 5 bước',
      'Thành thạo kỹ năng thẩm định lịch sử tên miền tránh dính án phạt Google/Blacklist',
      'Sử dụng điêu luyện các công cụ chẩn đoán DNS, Mail Auth và SSL Labs',
      'Xóa sạch và xử lý các sự cố DNS Caching trên mọi hệ điều hành'
    ]
  }
];
