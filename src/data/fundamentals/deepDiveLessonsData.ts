import { FundamentalDeepDiveLesson } from '../../types/fundamentals';

export const FUNDAMENTAL_DEEP_DIVE_LESSONS: FundamentalDeepDiveLesson[] = [
  {
    id: 'lesson-computer-fundamentals',
    domainId: 'computer_fundamentals',
    title: 'Chuyên Đề 1: Giải Mã Kiến Trúc HĐH, Bộ Nhớ & Luồng I/O Streams',
    subtitle: 'Nắm chắc Kernel, Virtual Memory, Inodes, File Descriptors và kỹ thuật điều hướng luồng dữ liệu CLI.',
    categoryLabel: 'Computer Architecture & OS',
    tag: 'OS & Memory',
    readTimeMinutes: 18,
    importanceLevel: 'Bắt buộc',
    summary: 'Phân tích từ tầng kiến trúc Kernel Space vs User Space, cơ chế quản lý bộ nhớ ảo (Paging & Swap), cách Linux quản lý mọi thứ dưới dạng tệp tin (File Descriptors) và làm chủ các toán tử luồng (`|`, `>`, `>>`, `2>&1`).',
    awsConnectionContext: 'Hiểu bản chất để cấu hình đúng swap space trên EC2 t-family burstable instances, tối ưu IOPS cho Amazon EBS và hiểu cơ chế OOM Killer khi cấp phát bộ nhớ cho ECS Task Definition.',
    coreConcepts: [
      {
        heading: '1. Không Gian Nhân (Kernel Space) vs Không Gian Người Dùng (User Space)',
        content: 'Hệ điều hành hiện đại chia bộ nhớ thành hai không gian độc lập để bảo vệ hệ thống khỏi các chương trình độc hại hoặc bị crash:',
        bulletPoints: [
          '**Kernel Space (Ring 0):** Nơi nhân hệ điều hành thực thi với toàn quyền truy cập phần cứng (CPU, RAM, Ổ cứng, Card mạng). Người dùng không thể truy cập trực tiếp.',
          '**User Space (Ring 3):** Nơi các ứng dụng thông thường (Web server, Trình duyệt, Database, Kịch bản Python) chạy với quyền hạn bị giới hạn.',
          '**System Calls (Syscalls):** Cầu nối an toàn duy nhất để chương trình ở User Space yêu cầu Kernel thực hiện thao tác phần cứng (ví dụ: `read()`, `write()`, `fork()`, `socket()`).'
        ],
        diagramAscii: `
+-------------------------------------------------------------+
|                     USER SPACE (Ring 3)                     |
|   [Web Server (Nginx)]   [Python Script]   [Database App]   |
+-------------------------------------------------------------+
                              |
                     System Calls (Syscalls)
                              |
+-------------------------------------------------------------+
|                    KERNEL SPACE (Ring 0)                    |
|   [Process Scheduler]  [Memory Manager]  [Virtual File Sys] |
|   [TCP/IP Net Stack]   [Device Drivers]  [Security Engine]  |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|                      HARDWARE LAYER                         |
|           [CPU]          [RAM]          [SSD/NIC]           |
+-------------------------------------------------------------+`
      },
      {
        heading: '2. Bộ Nhớ Ảo (Virtual Memory), Paging & Phân Vùng Swap',
        content: 'Mỗi tiến trình khi chạy đều được cấp phát một không gian địa chỉ bộ nhớ ảo liên tục (Virtual Address Space), được ánh xạ tới các trang nhớ vật lý (Physical RAM Pages) thông qua chip MMU (Memory Management Unit):',
        bulletPoints: [
          '**Paging:** Bộ nhớ được chia thành các khối nhỏ cố định (thường là 4KB gọi là Page).',
          '**Swap Space:** Khi RAM vật lý bị đầy, các trang nhớ ít được sử dụng nhất (LRU) sẽ được hoán đổi tạm thời xuống ổ đĩa (Swap File / Swap Partition).',
          '**OOM Killer (Out Of Memory):** Khi cả RAM và Swap đều cạn kiệt, Kernel Linux sẽ kích hoạt cơ chế OOM Killer để tìm và cưỡng chế tiêu diệt tiến trình chiếm nhiều RAM nhất (thường là Database hoặc Java/Node app).'
        ]
      },
      {
        heading: '3. Triết Lý "Everything is a File" & Luồng Dữ Liệu CLI (I/O Streams)',
        content: 'Trong Linux, mọi thứ từ tệp tin thông thường, thư mục, thiết bị phần cứng (bàn phím, chuột), kết nối mạng (Socket) đều được đại diện bằng một con số nguyên dương gọi là **File Descriptor (FD)**:',
        bulletPoints: [
          '**FD 0 (Standard Input - stdin):** Luồng dữ liệu đầu vào mặc định (thường từ bàn phím).',
          '**FD 1 (Standard Output - stdout):** Luồng dữ liệu kết quả chuẩn (mặc định in ra màn hình).',
          '**FD 2 (Standard Error - stderr):** Luồng dữ liệu báo lỗi (mặc định in ra màn hình nhưng tách biệt với stdout).',
          '**Toán tử Redirect `>`:** Ghi đè file với stdout (`ls > files.txt`).',
          '**Toán tử Redirect `>>`:** Ghi nối tiếp vào cuối file (`echo "log" >> app.log`).',
          '**Gộp lỗi vào luồng chuẩn `2>&1`:** Chuyển hướng stderr vào cùng vị trí của stdout (`app > run.log 2>&1 &`).',
          '**Toán tử Pipe `|`:** Lấy đầu ra stdout của tiến trình trước làm đầu vào stdin của tiến trình sau.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'Terminal',
        title: 'Kiểm tra thông số phần cứng CPU, Bộ nhớ & Swap',
        code: `# Kiểm tra thông tin CPU
lscpu | grep -E "Model name|Socket|Thread|NUMA|CPU(s)"

# Kiểm tra dung lượng RAM & Swap còn trống
free -m -h

# Theo dõi mức tiêu hao bộ nhớ và ngắt I/O theo chu kỳ 2 giây
vmstat 2 5`,
        description: 'Các lệnh tiêu chuẩn SysAdmin dùng để đánh giá tài nguyên máy chủ trước khi triển khai tải nặng.'
      },
      {
        tool: 'Bash',
        title: 'Thực hành kết hợp Luồng Dữ Liệu & Pipeline lọc log',
        code: `# 1. Chuyển cả đầu ra chuẩn lẫn đầu ra lỗi vào tệp nhật ký
./backup_script.sh > /var/log/backup.log 2>&1

# 2. Bỏ qua hoàn toàn dữ liệu lỗi (vứt vào /dev/null)
find / -name "*.conf" 2> /dev/null

# 3. Kết hợp 3 lệnh qua Pipe: Lọc log lỗi, sắp xếp và đếm số lượng lỗi xuất hiện nhiều nhất
cat /var/log/nginx/access.log | awk '{print $9}' | sort | uniq -c | sort -nr`,
        description: 'Kỹ thuật lọc và chuyển hướng I/O streams thiết yếu trong vận hành Linux và AWS EC2.'
      }
    ],
    labExercise: {
      title: 'Lab 1.1: Tạo & Cấu hình Phân Vùng Swap 2GB trên Linux',
      difficulty: 'Dễ',
      duration: '15 phút',
      objectives: [
        'Kiểm tra hiện trạng Swap trên máy chủ',
        'Tạo Swap file 2GB bằng lệnh `dd` hoặc `fallocate`',
        'Cấp quyền bảo mật 600 và kích hoạt Swap',
        'Cấu hình tự động nạp Swap khi khởi động lại trong `/etc/fstab`'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Kiểm tra trạng thái Swap hiện tại',
          details: 'Chạy lệnh `swapon --show` hoặc `free -h` để xem máy chủ đã có Swap hay chưa.',
          codeSnippet: 'sudo swapon --show'
        },
        {
          stepNumber: 2,
          title: 'Tạo tệp Swap dung lượng 2GB',
          details: 'Sử dụng lệnh `fallocate` để cấp phát nhanh 2GB không gian đĩa cho tệp `/swapfile`.',
          codeSnippet: 'sudo fallocate -l 2G /swapfile\nsudo chmod 600 /swapfile'
        },
        {
          stepNumber: 3,
          title: 'Định dạng và kích hoạt Swap',
          details: 'Thiết lập vùng Swap trên tệp và bật tính năng Swap của Kernel.',
          codeSnippet: 'sudo mkswap /swapfile\nsudo swapon /swapfile'
        },
        {
          stepNumber: 4,
          title: 'Cấu hình bền vững trong fstab',
          details: 'Thêm dòng cấu hình vào `/etc/fstab` để hệ thống tự kích hoạt sau khi reboot.',
          codeSnippet: 'echo "/swapfile none swap sw 0 0" | sudo tee -a /etc/fstab'
        }
      ]
    },
    examTip: 'Trong các kỳ thi AWS và phỏng vấn Cloud: Khi EC2 instance t3.micro bị treo đột ngột khi build code hoặc chạy ứng dụng, nguyên nhân 90% là do tràn RAM và bị Kernel OOM Killer tiêu diệt. Giải pháp tức thời là bổ sung Swapfile 2GB hoặc nâng cấp instance type.',
    interviewQuestion: {
      question: 'Hãy giải thích sự khác biệt giữa User Space và Kernel Space trong hệ điều hành Linux? Tại sao cần có sự phân tách này?',
      sampleAnswer: 'Dạ thưa anh/chị, Kernel Space là vùng bộ nhớ đặc quyền tối cao (Ring 0) nơi nhân Linux thực thi và tương tác trực tiếp với phần cứng. User Space là vùng bộ nhớ bị giới hạn (Ring 3) dành cho các ứng dụng người dùng. Sự phân tách này đảm bảo 3 mục tiêu cốt lõi: 1) Tính ổn định - một ứng dụng người dùng bị lỗi (crash/segfault) sẽ không làm sập toàn bộ hệ điều hành; 2) Tính bảo mật - ngăn chặn ứng dụng trái phép đọc trộm dữ liệu nhạy cảm hoặc ghi đè bộ nhớ của tiến trình khác; 3) Quản lý tài nguyên công bằng - Kernel đóng vai trò trọng tài điều phối CPU/RAM/Ổ đĩa thông qua các System Calls (syscalls).',
      keyPoints: ['Ring 0 (Kernel) vs Ring 3 (User)', 'Cơ chế cô lập bảo vệ hệ thống', 'System Calls làm cầu nối', 'Tính ổn định và bảo mật']
    }
  },
  {
    id: 'lesson-internet-fundamentals',
    domainId: 'internet_fundamentals',
    title: 'Chuyên Đề 2: Toàn Cảnh Giao Thức Internet, Vòng Đời DNS & HTTP/HTTPS',
    subtitle: 'Giải mã chi tiết hành trình từ thanh địa chỉ trình duyệt tới máy chủ: DNS Resolver, HTTP Headers, TLS Handshake.',
    categoryLabel: 'Internet & Web Protocols',
    tag: 'DNS & HTTP',
    readTimeMinutes: 20,
    importanceLevel: 'Bắt buộc',
    summary: 'Phân tích trọn vẹn vòng đời một truy vấn Web: Tra cứu DNS đệ quy qua 4 tầng máy chủ (Recursive -> Root -> TLD -> Authoritative), giải phẫu cấu trúc gói tin HTTP/1.1 vs HTTP/2, và quá trình bắt tay bảo mật TLS 1.3.',
    awsConnectionContext: 'Nền tảng kiến thức trực tiếp để cấu hình Amazon Route 53 (Alias records, CNAME, Geolocation routing), CloudFront CDN Caching và xử lý lỗi 502/504 Bad Gateway trên AWS Application Load Balancer.',
    coreConcepts: [
      {
        heading: '1. Vòng Đời Tra Cứu Tên Miền DNS (DNS Lookup Lifecycle)',
        content: 'DNS (Domain Name System) đóng vai trò như danh bạ điện thoại của Internet, chuyển đổi tên miền dễ nhớ (vd: `aws.amazon.com`) thành địa chỉ IP mà máy tính có thể định tuyến:',
        bulletPoints: [
          '**Bước 1 - Local Cache:** Kiểm tra cache trình duyệt, cache HĐH (`/etc/hosts` hoặc DNS Client Cache).',
          '**Bước 2 - DNS Recursive Resolver:** Gửi yêu cầu tới máy chủ DNS đệ quy của ISP hoặc Public DNS (8.8.8.8, 1.1.1.1).',
          '**Bước 3 - Root Name Server:** Trả về địa chỉ của máy chủ quản lý đuôi tên miền cấp cao nhất (TLD Name Server). Hiện có 13 cụm Root Server toàn cầu (A -> M).',
          '**Bước 4 - TLD Name Server:** Quản lý phần mở rộng tên miền (`.com`, `.net`, `.vn`), trả về máy chủ có thẩm quyền (Authoritative Name Server).',
          '**Bước 5 - Authoritative Name Server (vd: Route 53):** Nắm giữ bản ghi DNS gốc và trả về địa chỉ IP chính xác của máy chủ đích kèm thời gian sống (TTL - Time To Live).'
        ],
        diagramAscii: `
[User Browser]
      |  1. Truy vấn "app.example.com"
      v
[DNS Resolver (8.8.8.8)] ---- 2. Hỏi Root (".") ----> [Root Name Server]
      |                                                |
      |<--- 3. Trả về TLD Server (".com") ------------+
      |
      |---- 4. Hỏi TLD (".com") ---------------------> [TLD Name Server]
      |                                                |
      |<--- 5. Trả về Authoritative NS (Route 53) ----+
      |
      |---- 6. Hỏi Authoritative NS -----------------> [Authoritative NS]
      |                                                | (Chứa Record A)
      |<--- 7. Trả về IP "54.239.28.85" (TTL 300s) ---+
      v
[User Browser] === 8. Kết nối trực tiếp HTTP(S) tới IP ===> [AWS Web Server]`
      },
      {
        heading: '2. Các Loại Bản Ghi DNS Cốt Lõi (DNS Record Types)',
        content: 'Các loại bản ghi thường xuyên cấu hình nhất trên hạ tầng Cloud:',
        bulletPoints: [
          '**A Record:** Ánh xạ tên miền sang địa chỉ IPv4 (vd: `app.com -> 54.239.28.85`).',
          '**AAAA Record:** Ánh xạ tên miền sang địa chỉ IPv6 128-bit.',
          '**CNAME Record (Canonical Name):** Tạo tên định danh bí danh trỏ sang một tên miền khác (vd: `www.app.com -> app.com`). Lưu ý: CNAME không thể đặt ở Zone Apex (Root Domain `@`).',
          '**MX Record (Mail Exchange):** Chỉ định máy chủ nhận thư điện tử cho tên miền.',
          '**TXT Record:** Lưu trữ chuỗi văn bản tùy ý, dùng xác thực quyền sở hữu tên miền (Google Workspace, AWS SES, SSL verification) và cấu hình SPF/DKIM chống giả mạo email.',
          '**Route 53 Alias Record:** Bản ghi độc quyền của AWS, cho phép trỏ trực tiếp Zone Apex `@` vào CloudFront Distribution hoặc ALB mà không tốn phí truy vấn DNS.'
        ]
      },
      {
        heading: '3. Giải Phẫu Giao Thức HTTP & Mã Trạng Thái (HTTP Status Codes)',
        content: 'Mọi kỹ sư hệ thống cần phân biệt tức thì các nhóm mã lỗi HTTP để chẩn đoán sự cố:',
        bulletPoints: [
          '**2xx (Success):** 200 OK, 201 Created (Tạo mới thành công), 204 No Content.',
          '**3xx (Redirection):** 301 Moved Permanently (Chuyển hướng vĩnh viễn, tốt cho SEO), 302 Found (Tạm thời), 304 Not Modified (Sử dụng dữ liệu cache).',
          '**4xx (Client Errors):** 400 Bad Request (Sai cú pháp), 401 Unauthorized (Chưa đăng nhập), 403 Forbidden (Đã đăng nhập nhưng không có quyền), 404 Not Found, 429 Too Many Requests (Vượt giới hạn Rate Limit).',
          '**5xx (Server Errors):** 500 Internal Server Error (Lỗi logic mã nguồn), 502 Bad Gateway (Reverse Proxy Nginx không nhận được phản hồi từ Backend app), 503 Service Unavailable (Quá tải hoặc bảo trì), 504 Gateway Timeout (Backend xử lý quá lâu vượt ngưỡng timeout).'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'Terminal',
        title: 'Tra cứu DNS chuyên sâu với lệnh dig',
        code: `# 1. Tra cứu bản ghi A của tên miền
dig aws.amazon.com +short

# 2. Xem toàn bộ quá trình đệ quy từ Root đến Authoritative Server (+trace)
dig aws.amazon.com +trace

# 3. Tra cứu cụ thể bản ghi TXT để xác thực bảo mật
dig google.com TXT`,
        description: 'Lệnh dig là công cụ số 1 để debug phân giải DNS trên Linux/macOS.'
      },
      {
        tool: 'cURL',
        title: 'Kiểm tra phản hồi HTTP Headers & Tốc độ kết nối',
        code: `# Gửi yêu cầu HEAD và in ra toàn bộ Headers phản hồi kèm HTTP Status
curl -I https://aws.amazon.com

# Kiểm tra mã lỗi và chuyển hướng tự động (-L)
curl -IL https://github.com

# Đo thời gian phản hồi (TTFB - Time to First Byte)
curl -o /dev/null -s -w 'Lookup time: %{time_namelookup}s\nConnect: %{time_connect}s\nTTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n' https://aws.amazon.com`,
        description: 'Phân tích độ trễ và kiểm tra chi tiết các trường phản hồi Header của Web Server.'
      }
    ],
    labExercise: {
      title: 'Lab 2.1: Chẩn Đoán & Debug Phân Giải DNS & HTTP Status',
      difficulty: 'Dễ',
      duration: '20 phút',
      objectives: [
        'Sử dụng dig để phân tích chuỗi tra cứu DNS',
        'Kiểm tra và so sánh kết quả khi trỏ qua các Public DNS Resolver khác nhau (Cloudflare 1.1.1.1 vs Google 8.8.8.8)',
        'Mô phỏng và quan sát các mã lỗi HTTP 404, 301, 502'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Kiểm tra phân giải DNS qua Cloudflare DNS 1.1.1.1',
          details: 'Gửi yêu cầu DNS trực tiếp tới IP của Cloudflare để kiểm tra thời gian phản hồi.',
          codeSnippet: 'dig @1.1.1.1 aws.amazon.com'
        },
        {
          stepNumber: 2,
          title: 'Truy vấn bản ghi Mail MX và Name Server NS',
          details: 'Xem danh sách các máy chủ có thẩm quyền quản lý tên miền.',
          codeSnippet: 'dig amazon.com MX\ndig amazon.com NS'
        },
        {
          stepNumber: 3,
          title: 'Kiểm tra chứng chỉ SSL/TLS bằng OpenSSL',
          details: 'Kết nối trực tiếp tới cổng 443 và kiểm tra thông tin nhà cấp phát chứng chỉ CA.',
          codeSnippet: 'openssl s_client -connect aws.amazon.com:443 -servername aws.amazon.com'
        }
      ]
    },
    examTip: 'Điểm then chốt trong kỳ thi AWS SAA & DVA: Khi gặp lỗi 502 Bad Gateway hoặc 504 Gateway Timeout trên ALB, 502 thường do ứng dụng Backend bị crash hoặc cổng không mở, còn 504 là do ứng dụng mất quá nhiều thời gian xử lý truy vấn cơ sở dữ liệu vượt quá ngưỡng Timeout (mặc định 60s).',
    interviewQuestion: {
      question: 'Khi bạn nhập https://example.com vào thanh địa chỉ của trình duyệt và nhấn Enter, chuyện gì sẽ xảy ra từ tầng mạng đến tầng ứng dụng?',
      sampleAnswer: 'Dạ, quy trình này trải qua 6 giai đoạn chính: 1) Phân giải tên miền (DNS Lookup) từ cache nội bộ đến Recursive Resolver, Root, TLD và Authoritative Server để lấy IP máy chủ; 2) Thiết lập kết nối Tầng Vận chuyển thông qua quá trình bắt tay TCP 3-Way Handshake (SYN, SYN-ACK, ACK); 3) Bắt tay bảo mật TLS Handshake để trao đổi khóa mã hóa phiên và xác thực chứng chỉ SSL máy chủ; 4) Trình duyệt gửi HTTP GET Request mang theo các Header; 5) Máy chủ (Nginx/App) xử lý logic, truy vấn CSDL và trả về HTTP Response kèm mã trạng thái 200 OK cùng nội dung HTML; 6) Trình duyệt nhận dữ liệu, dựng DOM Tree, CSSOM, tải tài nguyên phụ (JS/ảnh) và kết xuất (render) giao diện người dùng.',
      keyPoints: ['DNS Lookup Lifecycle', 'TCP 3-Way Handshake', 'TLS 1.3 Handshake', 'HTTP Request/Response', 'Browser Rendering Engine']
    }
  },
  {
    id: 'lesson-networking-basics',
    domainId: 'networking_basics',
    title: 'Chuyên Đề 3: Làm Chủ Networking ⭐, CIDR Subnetting & Định Tuyến VPC',
    subtitle: 'Nắm vững địa chỉ IP RFC 1918, công thức chia Subnetting, TCP Handshake, NAT Gateway và Tường lửa.',
    categoryLabel: 'Core Networking & Subnetting',
    tag: 'Networking ⭐',
    readTimeMinutes: 25,
    importanceLevel: 'Bắt buộc',
    summary: 'Chuyên đề quan trọng bậc nhất cho kỹ sư Cloud! Học cách chia subnetting không bao giờ sai, hiểu sâu bảng định tuyến (Route Tables), cơ chế Source NAT vs Destination NAT, và phân biệt rạch ròi giữa Stateful vs Stateless Firewall.',
    awsConnectionContext: 'Là nền tảng 100% để thiết kế kiến trúc Amazon Virtual Private Cloud (VPC), Public Subnet, Private Subnet, Internet Gateway (IGW), NAT Gateway, Security Groups và Network ACLs.',
    coreConcepts: [
      {
        heading: '1. Địa Chỉ IPv4 & 3 Dải Mạng Riêng Chuẩn RFC 1918',
        content: 'Địa chỉ IPv4 gồm 32-bit (chia thành 4 Octets, mỗi Octet 8-bit từ 0-255). Do sự khan hiếm IPv4, chuẩn RFC 1918 quy định 3 dải IP riêng biệt (Private IP) chỉ được dùng trong mạng nội bộ và KHÔNG ĐƯỢC định tuyến trực tiếp ra Internet công cộng:',
        bulletPoints: [
          '**Class A:** `10.0.0.0/8` (Dải IP: `10.0.0.0` -> `10.255.255.255`, tổng cộng 16,777,216 IP) -> Thường dùng làm chuẩn thiết kế Amazon VPC cho doanh nghiệp lớn.',
          '**Class B:** `172.16.0.0/12` (Dải IP: `172.16.0.0` -> `172.31.255.255`, tổng cộng 1,048,576 IP) -> AWS Default VPC sử dụng dải `172.31.0.0/16`.',
          '**Class C:** `192.168.0.0/16` (Dải IP: `192.168.0.0` -> `192.168.255.255`, tổng cộng 65,536 IP) -> Thường dùng cho mạng gia đình hoặc văn phòng chi nhánh.',
          '**Link-Local Address:** `169.254.0.0/16` -> Dùng cho AWS EC2 Instance Metadata Service (IMDS: `http://169.254.169.254/latest/meta-data/`).'
        ]
      },
      {
        heading: '2. Bí Quyết Tính Nhẩm CIDR Subnetting & Quy Tắc 5 IP Dành Riêng của AWS',
        content: 'Ký hiệu CIDR dạng `/prefix` đại diện cho số bit dành cho phần Network ID. Phần còn lại `32 - prefix` dành cho Host ID:',
        bulletPoints: [
          '**Công thức tổng số IP:** `Total = 2^(32 - prefix)`.',
          '**Công thức IP khả dụng trong mạng thông thường:** `Usable = 2^(32 - prefix) - 2` (Trừ đi Network Address đầu tiên và Broadcast Address cuối cùng).',
          '**ĐẶC BIỆT TRONG AWS VPC:** AWS luôn dành riêng **5 địa chỉ IP** trong mỗi subnet mà bạn không thể gán cho máy chủ:\n' +
          '• `.0`: Network Address (Địa chỉ mạng)\n' +
          '• `.1`: VPC Router (Cổng Gateway nội bộ)\n' +
          '• `.2`: Amazon Provided DNS Server (DNS Server nội bộ)\n' +
          '• `.3`: Dành riêng cho AWS sử dụng trong tương lai\n' +
          '• `.255`: Network Broadcast Address (AWS không hỗ trợ broadcast nhưng vẫn giữ lại)'
        ],
        diagramAscii: `
BẢNG QUY ĐỔI CIDR PREFIX PHỔ BIẾN NHẤT TRONG CLOUD:
+--------+------------------+-----------------+---------------------+
|  CIDR  |   Subnet Mask    |  Tổng số lượng  |  IP khả dụng trong  |
| Prefix |                  |     địa chỉ IP  |     mỗi AWS Subnet  |
+--------+------------------+-----------------+---------------------+
|  /16   | 255.255.0.0      |     65,536      |       65,531        |
|  /20   | 255.255.240.0    |      4,096      |        4,091        |
|  /24   | 255.255.255.0    |        256      |          251        |
|  /26   | 255.255.255.192  |         64      |           59        |
|  /28   | 255.255.255.240  |         16      |           11        |
|  /32   | 255.255.255.255  |          1 (Host|      Chỉ định 1 IP  |
+--------+------------------+-----------------+---------------------+`
      },
      {
        heading: '3. Cơ Chế NAT (Network Address Translation) & Internet Gateway',
        content: 'Làm thế nào các máy chủ trong Private Subnet (chỉ có IP riêng 10.0.x.x) có thể tải bản vá bảo mật từ Internet mà không bị lộ IP ra ngoài?',
        bulletPoints: [
          '**SNAT (Source NAT):** Thay thế địa chỉ IP nguồn riêng của gói tin thành địa chỉ IP công cộng (Elastic IP) của NAT Gateway trước khi đi ra Internet. Khi nhận phản hồi, NAT Gateway chuyển tiếp ngược lại máy chủ nội bộ.',
          '**DNAT (Destination NAT):** Thay thế địa chỉ IP đích của gói tin từ bên ngoài trỏ vào IP riêng bên trong (áp dụng trong Port Forwarding hoặc Load Balancer).',
          '**PAT (Port Address Translation):** Cho phép hàng nghìn máy chủ nội bộ dùng chung DUY NHẤT 1 IP công cộng bằng cách gắn thêm các số hiệu cổng nguồn ngẫu nhiên (Ephemeral Ports).'
        ]
      },
      {
        heading: '4. So Sánh Bản Chất: Stateful vs Stateless Firewall',
        content: 'Đây là câu hỏi kinh điển nhất trong mọi bài thi và phỏng vấn AWS Cloud:',
        bulletPoints: [
          '**Stateful Firewall (AWS Security Group):** Có khả năng ghi nhớ trạng thái phiên kết nối (Connection Tracking). Khi bạn cho phép lưu lượng truy cập đi vào (Inbound), hệ thống TỰ ĐỘNG cho phép lưu lượng phản hồi đi ra (Outbound) mà không cần cấu hình thêm quy tắc Outbound.',
          '**Stateless Firewall (AWS Network ACL - NACL):** KHÔNG ghi nhớ trạng thái. Mỗi gói tin Inbound và Outbound đều bị kiểm tra độc lập. Nếu bạn mở cổng 80 Inbound, bạn BẮT BUỘC phải mở dải cổng tạm thời (Ephemeral Ports 1024-65535) ở chiều Outbound để máy khách nhận được phản hồi.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'Terminal',
        title: 'Kiểm tra cấu hình IP & Bảng định tuyến',
        code: `# Xem tất cả địa chỉ IP gán trên các card mạng (Network Interfaces)
ip addr show

# Xem bảng định tuyến hiện tại và Default Gateway
ip route show

# Kiểm tra tình trạng kết nối tới một cổng TCP cụ thể (Timeout 3s)
nc -zv 10.0.1.50 3306`,
        description: 'Các lệnh quản trị mạng bắt buộc của Network & DevOps Engineer.'
      },
      {
        tool: 'iptables',
        title: 'Thực hành cấu hình Firewall & NAT cơ bản trên Linux',
        code: `# 1. Xem danh sách các rule tường lửa hiện tại
sudo iptables -L -n -v

# 2. Cho phép kết nối SSH (Port 22) và HTTP (Port 80)
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# 3. Kích hoạt tính năng NAT chuyển tiếp gói tin (IP Forwarding)
echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward`,
        description: 'Hiểu cách Linux kernel lọc gói tin qua Netfilter/iptables.'
      }
    ],
    labExercise: {
      title: 'Lab 3.1: Thiết Kế Sơ Đồ Mạng 3-Tier VPC với 4 Subnets',
      difficulty: 'Trung bình',
      duration: '30 phút',
      objectives: [
        'Quy hoạch dải mạng chính 10.0.0.0/16 cho toàn bộ hệ thống',
        'Chia thành 2 Public Subnets và 2 Private Subnets trải đều trên 2 Availability Zones (AZ-a và AZ-b)',
        'Xác định rõ dải IP, Network ID, Broadcast ID và số lượng IP khả dụng'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Quy hoạch dải Public Subnets cho Web/Load Balancer',
          details: 'Subnet Public 1 (AZ-a): 10.0.1.0/24 (Khả dụng: 10.0.1.4 -> 10.0.1.254, 251 IPs). Subnet Public 2 (AZ-b): 10.0.2.0/24 (Khả dụng: 10.0.2.4 -> 10.0.2.254).'
        },
        {
          stepNumber: 2,
          title: 'Quy hoạch dải Private Subnets cho App & Database',
          details: 'Subnet Private 1 (AZ-a): 10.0.11.0/24 (Chứa Backend EC2 & RDS Master). Subnet Private 2 (AZ-b): 10.0.12.0/24 (Chứa Backend EC2 & RDS Standby).'
        },
        {
          stepNumber: 3,
          title: 'Thiết lập bảng định tuyến Route Tables',
          details: 'Public Route Table: Trỏ `0.0.0.0/0` -> Internet Gateway (IGW). Private Route Table: Trỏ `0.0.0.0/0` -> NAT Gateway nằm ở Public Subnet 1.'
        }
      ]
    },
    examTip: 'Mẹo thi SAA-C03: Nếu máy chủ EC2 trong Private Subnet không thể tải bản cập nhật qua NAT Gateway, hãy kiểm tra 3 điểm theo thứ tự: 1) NAT Gateway có nằm ở Public Subnet không? 2) Public Subnet có Route trỏ tới Internet Gateway không? 3) Security Group của EC2 có cho phép Outbound tới 0.0.0.0/0 không?',
    interviewQuestion: {
      question: 'Giải thích sự khác nhau giữa Security Group và Network ACL trong AWS? Khi nào bạn nên sử dụng Network ACL?',
      sampleAnswer: 'Dạ thưa anh/chị, Security Group hoạt động ở tầng EC2 Instance (Card mạng ảo ENI), có tính chất Stateful (tự động cho phép lưu lượng phản hồi), và chỉ hỗ trợ quy tắc CHO PHÉP (Allow Rules). Ngược lại, Network ACL (NACL) hoạt động ở tầng Subnet, có tính chất Stateless (phải mở cả Inbound và Outbound Ephemeral Ports độc lập), và hỗ trợ cả quy tắc CHO PHÉP lẫn TỪ CHỐI (Allow & Deny Rules) theo thứ tự ưu tiên số thứ tự Rule Number. Chúng ta sử dụng NACL khi cần chặn một dải địa chỉ IP độc hại cụ thể (vd: chống tấn công DDoS/Brute-force từ một IP subnet xác định) ở ngay cửa ngõ trước khi gói tin chạm tới máy chủ EC2.',
      keyPoints: ['Instance level vs Subnet level', 'Stateful vs Stateless', 'Allow-only vs Allow/Deny Rules', 'Trường hợp chặn IP cụ thể']
    }
  },
  {
    id: 'lesson-linux-basics',
    domainId: 'linux_basics',
    title: 'Chuyên Đề 4: Làm Chủ Quản Trị Hệ Thống Linux ⭐, Phân Quyền & SSH',
    subtitle: 'Học sâu 50+ lệnh Linux thực chiến, phân quyền chmod/chown, quản lý dịch vụ systemd và thiết lập khóa SSH.',
    categoryLabel: 'Linux Administration & CLI',
    tag: 'Linux Basics ⭐',
    readTimeMinutes: 22,
    importanceLevel: 'Bắt buộc',
    summary: 'Làm chủ môi trường máy chủ Linux từ gốc rễ: Thao tác tệp nâng cao, giải mã hệ thống phân quyền bát phân (Octal permissions), quản trị tiến trình với `systemctl`/`journalctl` và kỹ thuật cấu hình SSH Key Pairs không cần mật khẩu.',
    awsConnectionContext: 'Nền tảng sống còn để vận hành EC2 Linux Instances, viết mã User Data Bootstrap Scripts khởi tạo máy chủ tự động và xử lý sự cố trong các container Docker.',
    coreConcepts: [
      {
        heading: '1. Cây Thư Mục Tiêu Chuẩn Linux (Filesystem Hierarchy Standard - FHS)',
        content: 'Mọi thứ trong Linux bắt đầu từ thư mục gốc `/` (Root directory):',
        bulletPoints: [
          '**/bin & /sbin:** Chứa các tệp thực thi nhị phân cốt lõi (vd: `ls`, `cp`, `iptables`, `systemctl`).',
          '**/etc:** Nơi chứa TOÀN BỘ file cấu hình hệ thống (vd: `/etc/nginx/nginx.conf`, `/etc/fstab`, `/etc/ssh/sshd_config`).',
          '**/var:** Chứa dữ liệu có kích thước biến động thường xuyên (vd: log hệ thống `/var/log/`, website tĩnh `/var/www/html/`).',
          '**/home:** Thư mục cá nhân của từng user thông thường (`/home/ubuntu/`, `/home/ec2-user/`).',
          '**/root:** Thư mục cá nhân của siêu người dùng root.',
          '**/tmp:** Thư mục lưu trữ tạm thời, bị xóa định kỳ khi hệ thống khởi động lại.'
        ]
      },
      {
        heading: '2. Giải Mã Hệ Thống Phân Quyền Bát Phân (Octal Permissions)',
        content: 'Khi chạy lệnh `ls -la`, chuỗi quyền `drwxr-xr--` được giải mã theo cấu trúc 3 nhóm đối tượng:',
        bulletPoints: [
          '**Ký tự đầu tiên:** `-` (Tệp thông thường), `d` (Thư mục), `l` (Liên kết tượng trưng Symbolic Link).',
          '**3 nhóm đối tượng:** `User (Owner)` | `Group` | `Others (Mọi người khác)`.',
          '**Giá trị trọng số từng quyền:**\n' +
          '• **Read (r) = 4:** Quyền đọc nội dung tệp / xem danh sách file trong thư mục.\n' +
          '• **Write (w) = 2:** Quyền sửa, xóa, đổi tên tệp.\n' +
          '• **Execute (x) = 1:** Quyền thực thi chương trình / quyền cd vào thư mục.\n' +
          '• **No permission (-) = 0**',
          '**Các mẫu phân quyền kinh điển:**\n' +
          '• `chmod 755 file.sh` -> Owner: rwx (7), Group: r-x (5), Others: r-x (5) (Chuẩn cho script/chương trình).\n' +
          '• `chmod 644 config.txt` -> Owner: rw- (6), Group: r-- (4), Others: r-- (4) (Chuẩn cho tệp cấu hình).\n' +
          '• `chmod 600 id_ed25519` -> Owner: rw- (6), Group: --- (0), Others: --- (0) (BẮT BUỘC cho SSH Private Key).'
        ],
        diagramAscii: `
GIẢI MÃ CHUỖI QUYỀN TRÊN LINUX:
   -   r w x   r - x   r - -
   |   -----   -----   -----
   |     |       |       |
   |     |       |       +---> Others (4+0+0 = 4)
   |     |       +-----------> Group  (4+0+1 = 5)
   |     +-------------------> Owner  (4+2+1 = 7)
   +-------------------------> File type (-: tệp thường, d: thư mục)`
      },
      {
        heading: '3. Quản Trị Tiến Trình & Dịch Vụ Nền Với Systemd',
        content: 'Systemd là hệ thống khởi tạo (Init system) và quản lý dịch vụ mặc định trên hầu hết các bản phân phối Linux hiện đại (Ubuntu, CentOS, Amazon Linux, Debian):',
        bulletPoints: [
          '**Khởi động dịch vụ:** `sudo systemctl start nginx`',
          '**Dừng dịch vụ:** `sudo systemctl stop nginx`',
          '**Tự động chạy khi mở máy:** `sudo systemctl enable nginx`',
          '**Kiểm tra trạng thái & lỗi:** `sudo systemctl status nginx`',
          '**Xem log dịch vụ theo thời gian thực:** `sudo journalctl -u nginx.service -f --since "1 hour ago"`'
        ]
      },
      {
        heading: '4. Kết Nối & Xác Thực SSH Không Cần Mật Khẩu (SSH Key Pairs)',
        content: 'Xác thực SSH bằng cặp khóa Public/Private Key an toàn gấp hàng nghìn lần so với mật khẩu truyền thống:',
        bulletPoints: [
          '**Private Key (Khóa bí mật):** Luôn lưu trữ an toàn trên máy tính cá nhân của bạn, tuyệt đối không chia sẻ cho bất kỳ ai.',
          '**Public Key (Khóa công khai):** Được sao chép và gắn vào tệp `~/.ssh/authorized_keys` trên máy chủ từ xa.',
          '**Cơ chế xác thực Challenge-Response:** Máy chủ gửi một thông điệp ngẫu nhiên (challenge), máy khách dùng Private Key để ký điện tử và gửi lại. Máy chủ dùng Public Key để xác minh chữ ký mà không cần truyền khóa bí mật qua mạng.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'SSH',
        title: 'Tạo khóa SSH hiện đại Ed25519 & Cấu hình kết nối nhanh',
        code: `# 1. Tạo cặp khóa SSH chuẩn mã hóa Ed25519 bảo mật cao nhất
ssh-keygen -t ed25519 -C "admin@company.com"

# 2. Cấu hình file ~/.ssh/config để kết nối tiện lợi bằng tên ngắn
cat << 'EOF' >> ~/.ssh/config
Host my-aws-server
    HostName 54.239.28.85
    User ubuntu
    IdentityFile ~/.ssh/id_ed25519
    Port 22
EOF

# 3. Kết nối tức thì không cần gõ IP dài
ssh my-aws-server`,
        description: 'Cách làm việc chuyên nghiệp giúp tiết kiệm thời gian của kỹ sư Cloud.'
      },
      {
        tool: 'Systemd',
        title: 'Tạo một Custom Systemd Service tự động chạy ứng dụng Node/Python',
        code: `# Tạo file cấu hình dịch vụ /etc/systemd/system/myapp.service
sudo tee /etc/systemd/system/myapp.service << 'EOF'
[Unit]
Description=My Cloud Backend Application
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/var/www/myapp
ExecStart=/usr/bin/node /var/www/myapp/server.js
Restart=always
RestartSec=5
Environment=PORT=3000 NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

# Nạp lại daemon và kích hoạt dịch vụ
sudo systemctl daemon-reload
sudo systemctl enable --now myapp`,
        description: 'Tự động hóa quản lý vòng đời ứng dụng trên máy chủ Linux.'
      }
    ],
    labExercise: {
      title: 'Lab 4.1: Tạo User Mới, Thiết Lập Quyền Sudo & Cài Đặt Khóa SSH',
      difficulty: 'Trung bình',
      duration: '25 phút',
      objectives: [
        'Tạo user mới mang tên `developer`',
        'Thêm user vào nhóm `sudo` và thiết lập quyền chạy lệnh quản trị',
        'Tạo thư mục `.ssh` và cài đặt Public Key',
        'Vô hiệu hóa đăng nhập bằng mật khẩu để nâng cao bảo mật máy chủ'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Tạo user và cấp quyền sudo',
          details: 'Tạo người dùng mới và đưa vào nhóm có quyền quản trị hệ thống.',
          codeSnippet: 'sudo adduser developer\nsudo usermod -aG sudo developer'
        },
        {
          stepNumber: 2,
          title: 'Cấu hình thư mục SSH và authorized_keys',
          details: 'Tạo thư mục với đúng phân quyền bắt buộc 700 và file 600.',
          codeSnippet: 'sudo mkdir -p /home/developer/.ssh\nsudo chmod 700 /home/developer/.ssh\necho "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5... my-key" | sudo tee /home/developer/.ssh/authorized_keys\nsudo chmod 600 /home/developer/.ssh/authorized_keys\nsudo chown -R developer:developer /home/developer/.ssh'
        }
      ]
    },
    examTip: 'Lỗi thường gặp nhất khi kết nối SSH vào EC2: Báo lỗi "Permissions 0644 for id_rsa are too open / UNPROTECTED PRIVATE KEY FILE". Lý do là SSH client từ chối sử dụng private key có quyền cho người khác đọc. Khắc phục ngay lập tức bằng lệnh: `chmod 600 ~/.ssh/id_rsa` hoặc `chmod 400 key.pem`.',
    interviewQuestion: {
      question: 'Làm thế nào bạn điều tra và xử lý khi một máy chủ Linux báo tình trạng CPU load average tăng vọt 100%?',
      sampleAnswer: 'Dạ, quy trình điều tra của em gồm 4 bước chuẩn SysAdmin: 1) Chạy `top` hoặc `htop` để kiểm tra tổng quan: xem tỷ lệ %us (user code), %sy (system kernel) hay %wa (I/O wait); 2) Nhấn phím `P` trong `top` để sắp xếp và nhận diện chính xác PID của tiến trình đang chiếm dụng CPU cao nhất; 3) Kiểm tra chi tiết tiến trình bằng `ps -fp <PID>` và xem nhật ký lỗi liên quan bằng `journalctl -u <service_name> -n 100`; 4) Nếu là tiến trình rác hoặc treo luồng (zombie/deadlock), gửi tín hiệu `kill -15 <PID>` (SIGTERM) để tắt an toàn. Nếu sau 10 giây không phản hồi thì mới dùng `kill -9 <PID>` (SIGKILL) và lập kế hoạch phân tích log hồi cứu.',
      keyPoints: ['Lệnh top/htop phân tích %us, %sy, %wa', 'Xác định PID', 'Xử lý tuần tự SIGTERM (15) trước khi dùng SIGKILL (9)', 'Phân tích log điều tra nguyên nhân gốc']
    }
  },
  {
    id: 'lesson-web-application',
    domainId: 'web_application',
    title: 'Chuyên Đề 5: Kiến Trúc Web Servers, Nginx Reverse Proxy & Database',
    subtitle: 'Nắm vững nguyên lý hoạt động của Nginx, Load Balancing, RESTful API và Cơ sở dữ liệu SQL vs NoSQL.',
    categoryLabel: 'Web Architecture & Databases',
    tag: 'Web & DB Basics',
    readTimeMinutes: 20,
    importanceLevel: 'Quan trọng',
    summary: 'Hiểu cặn kẽ cách xây dựng hệ thống Web chịu tải cao: Cấu hình Nginx làm Reverse Proxy, thuật toán Cân bằng tải, nguyên tắc thiết kế API RESTful, và so sánh bản chất ACID trong RDBMS vs BASE trong NoSQL.',
    awsConnectionContext: 'Trực tiếp hỗ trợ thiết kế kiến trúc AWS 3-Tier Web Application (ALB -> EC2 Auto Scaling -> Amazon RDS Multi-AZ / Aurora), cấu hình API Gateway và tối ưu truy vấn Database.',
    coreConcepts: [
      {
        heading: '1. Web Server vs Reverse Proxy (Nginx Architecture)',
        content: 'Nginx là máy chủ Web hoạt động theo kiến trúc Bất đồng bộ hướng sự kiện (Asynchronous Event-Driven), tiêu tốn cực kỳ ít RAM và có thể xử lý hàng chục nghìn kết nối đồng thời:',
        bulletPoints: [
          '**Web Server:** Trực tiếp phục vụ các tệp tĩnh (Static Assets: HTML, CSS, JS, Ảnh, Video) với hiệu năng tối đa.',
          '**Reverse Proxy:** Đứng trước các ứng dụng Backend (Node.js, Python, Java) để tiếp nhận yêu cầu từ người dùng và chuyển tiếp an toàn vào bên trong.',
          '**Lợi ích lớn nhất:** 1) Ẩn hoàn toàn IP của máy chủ Backend; 2) Đảm nhận giải mã SSL/TLS (SSL Termination) giảm tải CPU cho backend; 3) Nén dữ liệu Gzip/Brotli tăng tốc độ tải trang; 4) Phân phối tải tới nhiều server backend (Load Balancing).'
        ]
      },
      {
        heading: '2. Các Thuật Toán Cân Bằng Tải Phổ Biến (Load Balancing Algorithms)',
        content: 'Cách phân phối lưu lượng truy cập tới nhóm máy chủ backend:',
        bulletPoints: [
          '**Round Robin (Mặc định):** Luân chuyển yêu cầu tuần tự lần lượt tới từng máy chủ (1 -> 2 -> 3 -> 1). Thích hợp khi các máy chủ có cấu hình phần cứng tương đương.',
          '**Least Connections:** Chuyển yêu cầu tới máy chủ hiện đang có ít kết nối hoạt động nhất. Cực kỳ hiệu quả khi các yêu cầu có thời gian xử lý dài ngắn khác nhau.',
          '**IP Hash:** Sử dụng địa chỉ IP của máy khách làm khóa băm để luôn chuyển tiếp khách hàng đó tới đúng một máy chủ duy nhất (dùng duy trì Sticky Sessions khi chưa có Redis tập trung).'
        ]
      },
      {
        heading: '3. So Sánh Bản Chất: SQL (RDBMS) vs NoSQL (Document/Key-Value)',
        content: 'Chọn đúng loại cơ sở dữ liệu cho bài toán thực tế:',
        bulletPoints: [
          '**SQL (PostgreSQL, MySQL, Amazon RDS):** Dữ liệu có cấu trúc bảng biểu chặt chẽ, hỗ trợ ràng buộc khóa ngoại, tuân thủ nghiêm ngặt tính chất **ACID** (Atomicity, Consistency, Isolation, Durability). Mở rộng chủ yếu theo chiều dọc (Scale-Up nâng CPU/RAM). Phù hợp cho giao dịch tài chính, thanh toán, quản lý đơn hàng.',
          '**NoSQL (MongoDB, DynamoDB, Redis):** Dữ liệu linh hoạt (JSON Document, Key-Value), thiết kế mở rộng theo chiều ngang (Scale-Out phân tán dữ liệu qua nhiều máy chủ - Sharding). Tuân thủ mô hình **BASE** (Basically Available, Soft state, Eventual consistency). Phù hợp cho IoT, Streaming, Giỏ hàng, Bảng xếp hạng game, Dữ liệu mạng xã hội.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'Nginx',
        title: 'Cấu hình Nginx Reverse Proxy & Cân bằng tải Round Robin',
        code: `# File: /etc/nginx/conf.d/myapp.conf
upstream backend_cluster {
    server 10.0.11.20:3000;
    server 10.0.12.20:3000;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://backend_cluster;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
        description: 'Cấu hình cân bằng tải và bảo toàn IP gốc của client khi đi qua Proxy.'
      }
    ],
    labExercise: {
      title: 'Lab 5.1: Thiết Lập Nginx Reverse Proxy Chuyển Tiếp Tới Ứng Dụng Node.js',
      difficulty: 'Trung bình',
      duration: '25 phút',
      objectives: [
        'Cài đặt Nginx trên Ubuntu',
        'Khởi chạy một ứng dụng Web đơn giản trên cổng 3000',
        'Cấu hình Nginx làm cổng đón tiếp trên cổng 80 và proxy ngược về cổng 3000'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Cài đặt Nginx',
          details: 'Cài đặt gói Nginx từ kho phần mềm apt.',
          codeSnippet: 'sudo apt update && sudo apt install -y nginx'
        },
        {
          stepNumber: 2,
          title: 'Kiểm tra cú pháp và kích hoạt cấu hình',
          details: 'Luôn kiểm tra lỗi cú pháp trước khi reload Nginx.',
          codeSnippet: 'sudo nginx -t && sudo systemctl reload nginx'
        }
      ]
    },
    examTip: 'Điểm mấu chốt: Trong kiến trúc AWS, để tránh hiện tượng mất phiên đăng nhập (Session) khi người dùng được Load Balancer điều phối qua máy chủ khác, giải pháp kiến trúc chuẩn Well-Architected là xây dựng Stateless Web Tier và lưu trữ toàn bộ Session trong bộ nhớ đệm phân tán Amazon ElastiCache (Redis).',
    interviewQuestion: {
      question: 'Tính chất ACID trong cơ sở dữ liệu quan hệ có ý nghĩa gì? Hãy giải thích từng chữ cái.',
      sampleAnswer: 'Dạ thưa anh/chị, ACID là 4 thuộc tính đảm bảo giao dịch (Transaction) trong CSDL diễn ra an toàn và tin cậy tuyệt đối: 1) **Atomicity (Tính nguyên tử):** Tất cả các thao tác trong một giao dịch phải thành công toàn bộ, nếu 1 thao tác lỗi thì toàn bộ sẽ rollback về trạng thái ban đầu (All-or-Nothing); 2) **Consistency (Tính nhất quán):** Dữ liệu phải luôn thỏa mãn mọi ràng buộc toàn vẹn dữ liệu trước và sau giao dịch; 3) **Isolation (Tính cô lập):** Các giao dịch thực thi đồng thời không được can thiệp hoặc nhìn thấy dữ liệu trung gian chưa commit của nhau; 4) **Durability (Tính bền vững):** Khi giao dịch đã commit thành công, dữ liệu được ghi xuống đĩa vĩnh viễn và không bị mất kể cả khi máy chủ mất điện đột ngột.',
      keyPoints: ['Atomicity (All-or-Nothing)', 'Consistency (Ràng buộc toàn vẹn)', 'Isolation (Cô lập đồng thời)', 'Durability (Bền vững sau crash)']
    }
  },
  {
    id: 'lesson-security-basics',
    domainId: 'security_basics',
    title: 'Chuyên Đề 6: Nền Tảng Bảo Mật Hệ Thống, Chuẩn Auth & Chứng Chỉ PKI',
    subtitle: 'Hiểu sâu Authentication vs Authorization, JWT Token, Mã hóa AES/RSA và Hạ tầng khóa công khai PKI.',
    categoryLabel: 'Security & Cryptography',
    tag: 'Security & PKI',
    readTimeMinutes: 22,
    importanceLevel: 'Bắt buộc',
    summary: 'Bảo mật là tiêu chí số một trên Cloud! Phân biệt rạch ròi AuthN vs AuthZ, mổ xẻ cấu trúc JWT, so sánh mã hóa đối xứng (AES) vs bất đối xứng (RSA), và hiểu rõ chuỗi chứng chỉ số SSL/TLS (Chain of Trust).',
    awsConnectionContext: 'Nền tảng trực tiếp để hiểu sâu AWS IAM (Policies, AssumeRole, STS), AWS KMS (Envelope Encryption), AWS Secrets Manager và AWS Certificate Manager (ACM).',
    coreConcepts: [
      {
        heading: '1. Phân Biệt Rõ Ràng: Authentication (AuthN) vs Authorization (AuthZ)',
        content: 'Hai khái niệm cơ bản thường bị nhầm lẫn nhiều nhất trong phát triển phần mềm và bảo mật:',
        bulletPoints: [
          '**Authentication - AuthN (Xác thực):** Trả lời câu hỏi: **"Bạn là ai?"** -> Xác minh danh tính người dùng thông qua Mật khẩu, Khóa SSH, OTP, Sinh trắc học. Mã lỗi HTTP khi thất bại: `401 Unauthorized`.',
          '**Authorization - AuthZ (Phân quyền):** Trả lời câu hỏi: **"Bạn có quyền làm những gì?"** -> Xác định người dùng có được phép đọc, sửa hay xóa một tài nguyên cụ thể hay không dựa trên Vai trò (RBAC) hoặc Chính sách (PBAC). Mã lỗi HTTP khi thất bại: `403 Forbidden`.',
          '**Nguyên tắc đặc quyền tối thiểu (Least Privilege):** Chỉ cấp chính xác những quyền hạn tối thiểu cần thiết để hoàn thành công việc, không cấp thừa.'
        ]
      },
      {
        heading: '2. Giải Phẫu Mã Định Danh JWT (JSON Web Token)',
        content: 'JWT là chuẩn mở (RFC 7519) định nghĩa phương thức truyền tải thông tin an toàn giữa các bên dưới dạng đối tượng JSON:',
        bulletPoints: [
          '**Cấu trúc gồm 3 phần ngăn cách bởi dấu chấm (`.`):** `Header.Payload.Signature`',
          '**1. Header:** Chứa thuật toán ký (vd: `{"alg": "HS256", "typ": "JWT"}`). Được mã hóa Base64Url.',
          '**2. Payload:** Chứa các thông tin tuyên bố (Claims: `sub`, `name`, `roles`, `exp` - thời gian hết hạn). Được mã hóa Base64Url (LƯU Ý: Không được lưu thông tin nhạy cảm như mật khẩu trong Payload vì ai cũng có thể giải mã Base64Url!).',
          '**3. Signature (Chữ ký điện tử):** Tạo ra bằng cách lấy `HMACSHA256(Base64(Header) + "." + Base64(Payload), SecretKey)`. Giúp máy chủ xác minh nội dung không bị chỉnh sửa giả mạo.'
        ]
      },
      {
        heading: '3. Mật Mã Học: Mã Hóa Đối Xứng vs Bất Đối Xứng',
        content: 'Hai trường phái mã hóa dữ liệu cơ bản:',
        bulletPoints: [
          '**Mã hóa Đối xứng (Symmetric - vd: AES-256):** Sử dụng DUY NHẤT 1 khóa bí mật cho cả quá trình mã hóa và giải mã. Ưu điểm: Tốc độ xử lý cực kỳ nhanh, tiêu tốn ít CPU, dùng để mã hóa dữ liệu lớn lưu trữ trên đĩa (Data at Rest).',
          '**Mã hóa Bất đối xứng (Asymmetric - vd: RSA, ECC):** Sử dụng CẶP KHÓA gồm Public Key (chia sẻ công khai) và Private Key (giữ bí mật tuyệt đối). Dữ liệu mã hóa bằng Public Key chỉ có thể giải mã bằng Private Key tương ứng. Ưu điểm: Giải quyết bài toán trao đổi khóa an toàn qua mạng Internet công cộng.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'OpenSSL',
        title: 'Tạo cặp khóa RSA & Tự ký chứng chỉ SSL Self-Signed',
        code: `# 1. Tạo khóa riêng tư RSA 2048-bit
openssl genrsa -out server.key 2048

# 2. Tạo chứng chỉ tự ký (Self-signed certificate) có hiệu lực 365 ngày
openssl req -new -x509 -key server.key -out server.crt -days 365 -subj "/CN=localhost"

# 3. Xem chi tiết nội dung chứng chỉ
openssl x509 -in server.crt -text -noout`,
        description: 'Công cụ mã hóa tiêu chuẩn cho mọi kỹ sư hệ thống.'
      }
    ],
    labExercise: {
      title: 'Lab 6.1: Cấu hình HTTPS & SSL Certificate cho Nginx bằng Certbot',
      difficulty: 'Trung bình',
      duration: '20 phút',
      objectives: [
        'Cài đặt Certbot Let\'s Encrypt client',
        'Tự động cấp phát chứng chỉ SSL miễn phí chuẩn PKI',
        'Kích hoạt cấu hình chuyển hướng tự động từ HTTP (port 80) sang HTTPS (port 443)'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Cài đặt Certbot Nginx plugin',
          details: 'Cài đặt công cụ Certbot để tự động hóa xin cấp và gia hạn chứng chỉ.',
          codeSnippet: 'sudo apt install -y certbot python3-certbot-nginx'
        }
      ]
    },
    examTip: 'Trong bảo mật AWS (AWS KMS): AWS áp dụng kỹ thuật Mã hóa bao thư (Envelope Encryption). Dữ liệu thực tế được mã hóa bằng Data Key (Mã hóa đối xứng AES tốc độ cao), sau đó chính Data Key này lại được mã hóa bằng AWS KMS Master Key (KMS Key) để lưu trữ an toàn.',
    interviewQuestion: {
      question: 'Tại sao chúng ta không sử dụng Mã hóa Bất đối xứng (RSA) để mã hóa toàn bộ dữ liệu truyền tải trên mạng mà lại kết hợp cả RSA và AES trong giao thức HTTPS?',
      sampleAnswer: 'Dạ thưa anh/chị, lý do chính là vì **Hiệu năng và Tốc độ xử lý**. Thuật toán mã hóa Bất đối xứng (RSA) đòi hỏi các phép toán số học phức tạp trên các số nguyên tố khổng lồ, khiến tốc độ xử lý chậm hơn hàng trăm lần và tiêu tốn rất nhiều CPU so với Mã hóa Đối xứng (AES). Do đó, giao thức HTTPS (TLS Handshake) áp dụng mô hình kết hợp hoàn hảo (Hybrid Encryption): Giai đoạn bắt tay đầu tiên sử dụng RSA/Diffie-Hellman để xác thực danh tính máy chủ và trao đổi an toàn một Khóa phiên bí mật (Session Key). Sau khi cả hai bên đã có Session Key, toàn bộ dữ liệu trao đổi thực tế sau đó sẽ được mã hóa bằng thuật toán AES với tốc độ siêu nhanh.',
      keyPoints: ['Hiệu năng: RSA chậm hơn AES hàng trăm lần', 'Mô hình Hybrid Encryption', 'RSA dùng để trao đổi khóa trong TLS Handshake', 'AES dùng mã hóa luồng dữ liệu thực tế']
    }
  },
  {
    id: 'lesson-cloud-fundamentals',
    domainId: 'cloud_fundamentals',
    title: 'Chuyên Đề 7: Mô Hình Điện Toán Đám Mây & Làm Chủ Docker Container',
    subtitle: 'Phân biệt IaaS/PaaS/SaaS, hiểu sâu ảo hóa Hypervisor vs Docker Container và thực hành Dockerfile tối ưu.',
    categoryLabel: 'Cloud Concepts & Containers',
    tag: 'Cloud & Docker',
    readTimeMinutes: 24,
    importanceLevel: 'Bắt buộc',
    summary: 'Bước đệm trực tiếp sang AWS! Phân tích tường tận mô hình trách nhiệm chung (Shared Responsibility), kiến trúc Linux Namespaces/Cgroups tạo nên Docker, kỹ thuật Multi-stage build và viết file `docker-compose.yml` chuẩn sản xuất.',
    awsConnectionContext: 'Là nền tảng cốt lõi của kỳ thi AWS Cloud Practitioner (CLF-C02), Solutions Architect (SAA-C03), Amazon Elastic Container Service (ECS), ECR và AWS Fargate.',
    coreConcepts: [
      {
        heading: '1. Ba Mô Hình Dịch Vụ Đám Mây: IaaS vs PaaS vs SaaS',
        content: 'Mức độ chia sẻ trách nhiệm quản lý giữa bạn và nhà cung cấp dịch vụ đám mây (AWS/GCP/Azure):',
        bulletPoints: [
          '**IaaS (Infrastructure as a Service - vd: AWS EC2, EBS, VPC):** Bạn thuê máy chủ ảo, ổ đĩa và mạng. Bạn chịu trách nhiệm cài đặt HĐH, vá lỗi bảo mật OS, cài Runtime (Node/Python), cấu hình ứng dụng và dữ liệu.',
          '**PaaS (Platform as a Service - vd: AWS Elastic Beanstalk, Heroku, App Runner):** Nhà cung cấp quản lý toàn bộ phần cứng, HĐH, Runtime và Web server. Bạn CHỈ CẦN tập trung viết mã nguồn (Code) và quản trị Dữ liệu.',
          '**SaaS (Software as a Service - vd: Gmail, Microsoft 365, Salesforce):** Ứng dụng phần mềm hoàn chỉnh chạy trên nền web. Bạn chỉ sử dụng dịch vụ với tư cách người dùng cuối, nhà cung cấp lo 100% kỹ thuật phía sau.'
        ]
      },
      {
        heading: '2. Ảo Hóa (Virtual Machines) vs Đóng Gói (Docker Containers)',
        content: 'Hiểu bản chất tại sao Container lại thống trị thế giới phần mềm hiện đại:',
        bulletPoints: [
          '**Máy ảo VM (Hypervisor):** Mỗi máy ảo phải chứa một Hệ điều hành khách đầy đủ (Guest OS: Kernel, System libraries, Drivers) có dung lượng hàng chục GB và mất vài phút để khởi động.',
          '**Docker Container:** KHÔNG chứa Guest OS. Các container chạy trực tiếp trên máy chủ và **dùng chung nhân Linux Kernel** của Host OS. Nhờ đó, Container chỉ có dung lượng vài chục MB và khởi động chỉ trong vài mili-giây.',
          '**2 Tính năng cốt lõi của Linux Kernel tạo nên Container:**\n' +
          '• **Namespaces:** Tạo không gian cách ly độc lập (PID namespace cô lập tiến trình, NET namespace cô lập card mạng/IP riêng, MNT namespace cô lập hệ thống tệp).\n' +
          '• **Cgroups (Control Groups):** Giới hạn định mức tài nguyên tối đa mà container được phép sử dụng (vd: tối đa 512MB RAM, 1 vCPU).'
        ],
        diagramAscii: `
SO SÁNH KIẾN TRÚC MÁY ẢO VM VS DOCKER CONTAINER:

+---------------------------+       +---------------------------+
| [App A]  [App B]  [App C] |       | [App A]  [App B]  [App C] |
| [Libs]   [Libs]   [Libs]  |       | [Libs]   [Libs]   [Libs]  |
| [Guest]  [Guest]  [Guest] |       +---------------------------+
| [OS 1]   [OS 2]   [OS 3]  |       |       Docker Engine       |
+---------------------------+       +---------------------------+
|    Hypervisor (KVM/ESXi)  |       |    Host OS Linux Kernel   |
+---------------------------+       +---------------------------+
|     Physical Hardware     |       |     Physical Hardware     |
+---------------------------+       +---------------------------+
      MÁY ẢO (VIRTUAL MACHINES)          CONTAINERS (DOCKER ENGINE)`
      },
      {
        heading: '3. Cấu Trúc Dockerfile Chuẩn & Kỹ Thuật Multi-Stage Build',
        content: 'Cách đóng gói ứng dụng chuyên nghiệp giảm kích thước image từ 1.2GB xuống còn 85MB:',
        bulletPoints: [
          '**Layer Caching:** Mỗi lệnh `RUN`, `COPY`, `ADD` tạo ra một tầng layer mới. Đặt các bước ít thay đổi (cài dependencies) lên trước để tận dụng cache khi build lại.',
          '**Multi-stage build:** Sử dụng một container đầy đủ công cụ để biên dịch mã nguồn (Build stage), sau đó chỉ sao chép tệp nhị phân đã build sang một container siêu nhẹ (Production runtime stage như Alpine Linux).'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'Dockerfile',
        title: 'Dockerfile Multi-stage Build tối ưu cho Node.js App',
        code: `# Stage 1: Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production runtime stage (Siêu nhẹ)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
        description: 'Mẫu Dockerfile chuẩn Production đảm bảo bảo mật và kích thước nhỏ gọn.'
      }
    ],
    labExercise: {
      title: 'Lab 7.1: Khởi Chạy Ứng Dụng Đa Container với Docker Compose',
      difficulty: 'Trung bình',
      duration: '30 phút',
      objectives: [
        'Viết file `docker-compose.yml` kết nối Nginx, Web App và PostgreSQL',
        'Tạo Docker Volume lưu trữ dữ liệu bền vững',
        'Khởi chạy toàn bộ hệ thống chỉ với 1 lệnh `docker compose up -d`'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Khởi chạy stack',
          details: 'Khởi chạy toàn bộ các dịch vụ dưới nền.',
          codeSnippet: 'docker compose up -d'
        },
        {
          stepNumber: 2,
          title: 'Kiểm tra trạng thái và logs',
          details: 'Kiểm tra các container đang chạy và theo dõi log.',
          codeSnippet: 'docker compose ps\ndocker compose logs -f app'
        }
      ]
    },
    examTip: 'Điểm cốt lõi cho kỳ thi CLF-C02: Hiểu rõ sự khác biệt giữa High Availability (Tính sẵn sàng cao - hệ thống vẫn hoạt động khi 1 Data Center bị sự cố) và Fault Tolerance (Khả năng chịu lỗi không gián đoạn dịch vụ 0 giây downtime).',
    interviewQuestion: {
      question: 'Tại sao Docker Container lại khởi động nhanh hơn và nhẹ hơn rất nhiều so với Máy ảo (Virtual Machine)?',
      sampleAnswer: 'Dạ thưa anh/chị, sự khác biệt nằm ở chỗ: Máy ảo (VM) hoạt động dựa trên tầng ảo hóa phần cứng Hypervisor, mỗi VM phải gánh thêm một Hệ điều hành khách (Guest OS) hoàn chỉnh với đầy đủ nhân Kernel riêng, driver và các tiến trình hệ thống, dẫn đến việc khởi động mất vài phút và tốn hàng chục GB dung lượng. Trong khi đó, Docker Container hoạt động ở tầng hệ điều hành, tận dụng trực tiếp nhân **Linux Kernel của máy chủ Host** thông qua 2 cơ chế nhân là **Namespaces** (để cách ly môi trường tiến trình, mạng, file system) và **Cgroups** (để giới hạn CPU/RAM). Vì không phải nạp lại Kernel từ đầu nên Container khởi động chỉ trong vài mili-giây và có kích thước siêu nhỏ gọn.',
      keyPoints: ['Chia sẻ Linux Kernel của máy chủ Host', 'Không có Guest OS cồng kềnh', 'Cơ chế Namespaces (cô lập) và Cgroups (giới hạn tài nguyên)', 'Thời gian khởi động mili-giây']
    }
  },
  {
    id: 'lesson-git-scripting',
    domainId: 'git_scripting',
    title: 'Chuyên Đề 8: Làm Chủ Git, Kịch Bản Bash & Python Tự Động Hóa',
    subtitle: 'Nắm vững quy trình Git Branching, xử lý xung đột Merge, viết script Bash an toàn và Python Health Check.',
    categoryLabel: 'Automation & Scripting',
    tag: 'Git & Scripting',
    readTimeMinutes: 20,
    importanceLevel: 'Quan trọng',
    summary: 'Bộ kỹ năng tự động hóa không thể thiếu của kỹ sư Cloud: Làm chủ quy trình Git cộng tác nhóm, viết kịch bản Bash Shell với các cờ bảo vệ an toàn (`set -euo pipefail`), và lập trình Python tự động hóa kiểm tra tình trạng hệ thống.',
    awsConnectionContext: 'Nền tảng trực tiếp để viết mã tự động hóa cho AWS Lambda functions, viết User Data scripts cho EC2 và quản lý hạ tầng bằng mã (Infrastructure as Code với Terraform / AWS CDK).',
    coreConcepts: [
      {
        heading: '1. Ba Trạng Thái Cốt Lõi Trong Git & Quy Trình Làm Việc',
        content: 'Hiểu cấu trúc dữ liệu Directed Acyclic Graph (DAG) của Git:',
        bulletPoints: [
          '**Working Directory:** Thư mục làm việc thực tế chứa các tệp bạn đang chỉnh sửa.',
          '**Staging Area (Index):** Khu vực chuẩn bị chứa ảnh chụp các thay đổi sẽ được đưa vào commit tiếp theo (`git add`).',
          '**Git Repository (.git directory):** Nơi lưu trữ lịch sử commit vĩnh viễn và các con trỏ nhánh (Branches/HEAD).',
          '**Giải quyết xung đột (Merge Conflict):** Xảy ra khi 2 người cùng sửa một dòng trong cùng một tệp trên 2 nhánh khác nhau. Git sẽ chèn các ký hiệu `<<<<<<<`, `=======`, `>>>>>>>` để bạn quyết định giữ lại phiên bản nào.'
        ]
      },
      {
        heading: '2. Lập Trình Bash Shell An Toàn Với Các Cờ Bảo Vệ (Safe Bash Scripting)',
        content: 'Khi viết script tự động hóa trên máy chủ sản xuất, 90% lỗi xảy ra do biến chưa định nghĩa hoặc lệnh trước bị lỗi nhưng script vẫn tiếp tục chạy. Luôn đặt dòng cờ bảo vệ này ở đầu mỗi script:',
        bulletPoints: [
          '**`set -e` (Exit on error):** Dừng script ngay lập tức nếu bất kỳ lệnh nào trả về mã thoát khác 0 (có lỗi).',
          '**`set -u` (Nounset):** Báo lỗi và dừng script ngay nếu sử dụng một biến chưa từng được khai báo (tránh thảm họa xóa nhầm `rm -rf /app/$UNDEFINED_VAR`).',
          '**`set -o pipefail`:** Nếu một lệnh trong chuỗi Pipe `cmd1 | cmd2 | cmd3` bị lỗi, toàn bộ chuỗi pipe sẽ được coi là lỗi.',
          '**Chuẩn vàng đầu file:** `set -euo pipefail`'
        ]
      },
      {
        heading: '3. Python Scripting Tự Động Hóa Kiểm Tra Hệ Thống (Health Check)',
        content: 'Python là ngôn ngữ số 1 cho Cloud Automation & AWS Lambda nhờ thư viện phong phú:',
        bulletPoints: [
          'Sử dụng module `requests` để gửi HTTP health checks tới các API endpoints.',
          'Sử dụng module `os` và `sys` để đọc biến môi trường bí mật và đối số dòng lệnh.',
          'Xử lý ngoại lệ `try ... except` để đảm bảo script ghi log cảnh báo ra Slack/Telegram/Discord khi máy chủ gặp sự cố.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'Bash',
        title: 'Kịch bản Bash tự động kiểm tra đĩa & Gửi cảnh báo',
        code: `#!/bin/bash
set -euo pipefail

THRESHOLD=80
CURRENT_USAGE=$(df / | awk 'NR==2 {print $5}' | tr -d '%')

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Dung lượng đĩa hiện tại: \${CURRENT_USAGE}%"

if [ "$CURRENT_USAGE" -gt "$THRESHOLD" ]; then
    echo "⚠️ CẢNH BÁO: Dung lượng đĩa vượt ngưỡng \${THRESHOLD}%! Gửi thông báo quản trị viên..."
    # Gửi cảnh báo webhook hoặc email tại đây
else
    echo "✅ Hệ thống hoạt động bình thường."
fi`,
        description: 'Mẫu kịch bản Bash kiểm tra dung lượng ổ đĩa tự động chạy qua Crontab.'
      },
      {
        tool: 'Python',
        title: 'Script Python tự động kiểm tra tình trạng Web Endpoints',
        code: `import requests
import sys
import time

ENDPOINTS = [
    "https://aws.amazon.com",
    "https://httpbin.org/status/200"
]

def check_services():
    for url in ENDPOINTS:
        try:
            start_time = time.time()
            response = requests.get(url, timeout=5)
            latency = round((time.time() - start_time) * 1000, 2)
            
            if response.status_code == 200:
                print(f"✅ {url} - OK (Code: {response.status_code}, Latency: {latency}ms)")
            else:
                print(f"⚠️ {url} - BẤT THƯỜNG (Code: {response.status_code})")
        except requests.exceptions.RequestException as e:
            print(f"❌ {url} - KHÔNG THỂ TRUY CẬP: {e}")

if __name__ == "__main__":
    check_services()`,
        description: 'Script Python giám sát dịch vụ thích hợp đóng gói làm AWS Lambda function.'
      }
    ],
    labExercise: {
      title: 'Lab 8.1: Tạo Git Repository, Xử Lý Merge Conflict & Lập Lịch Cron',
      difficulty: 'Dễ',
      duration: '20 phút',
      objectives: [
        'Khởi tạo Git repo và tạo 2 nhánh `feature-a` và `feature-b`',
        'Tạo tình huống xung đột trên cùng 1 tệp và giải quyết thủ công',
        'Thiết lập crontab tự động chạy script Bash mỗi 5 phút'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Khởi tạo Git và tạo nhánh',
          details: 'Thực hành tạo và chuyển nhánh với Git CLI.',
          codeSnippet: 'git init my-project\ncd my-project\necho "Initial Code" > app.txt\ngit add app.txt && git commit -m "Init"'
        }
      ]
    },
    examTip: 'Trong AWS SysOps & DevOps: Hãy nhớ rằng mọi kịch bản EC2 User Data script đều chạy với quyền tối cao `root` trong lần khởi động đầu tiên của instance, và toàn bộ nhật ký thực thi của User Data script được ghi lại tại tệp `/var/log/cloud-init-output.log`.',
    interviewQuestion: {
      question: 'Dòng lệnh `set -euo pipefail` ở đầu script Bash có tác dụng gì? Tại sao mọi script trong môi trường Production nên có nó?',
      sampleAnswer: 'Dạ thưa anh/chị, `set -euo pipefail` là "chế độ an toàn nghiêm ngặt" (Strict Mode) cho Bash script, kết hợp 3 cờ quan trọng: 1) `-e`: Dừng script ngay lập tức nếu có bất kỳ câu lệnh nào thất bại (mã thoát != 0), tránh việc lệnh sau tiếp tục chạy trên dữ liệu bị lỗi của lệnh trước; 2) `-u`: Báo lỗi và dừng script ngay nếu truy xuất một biến chưa được định nghĩa, ngăn chặn thảm họa như lệnh `rm -rf /var/app/$TMP_DIR` biến thành `rm -rf /var/app/` nếu biến `$TMP_DIR` bị rỗng; 3) `-o pipefail`: Đảm bảo nếu một lệnh ở giữa chuỗi pipe `cmd1 | cmd2 | cmd3` bị lỗi, toàn bộ lệnh pipe sẽ trả về lỗi thay vì chỉ lấy mã trạng thái của lệnh cuối cùng `cmd3`. Việc có dòng này giúp script có tính dự đoán cao và dễ dàng phát hiện lỗi trong môi trường CI/CD.',
      keyPoints: ['-e: Dừng khi có lỗi', '-u: Dừng khi biến rỗng/chưa khai báo', '-o pipefail: Bắt lỗi trong chuỗi pipe', 'Bảo vệ an toàn cho Production']
    }
  }
];
