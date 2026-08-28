import { FundamentalQuizQuestion } from '../../types/fundamentals';

export const FUNDAMENTAL_QUIZ_QUESTIONS: FundamentalQuizQuestion[] = [
  // --- DOMAIN 1: COMPUTER FUNDAMENTALS (8 questions) ---
  {
    id: 'comp-q1',
    domainId: 'computer_fundamentals',
    category: 'OS Architecture & Memory',
    difficulty: 'Cơ bản',
    scenario: 'Một lập trình viên nhận thấy máy chủ Linux của họ bất ngờ bị đóng một tiến trình Python đang chạy mà không hề có thông báo lỗi từ code. Khi kiểm tra log hệ thống (`dmesg`), họ thấy thông báo "Out of memory: Kill process 14209 (python)". Cơ chế nào của Linux Kernel đã kích hoạt sự việc này?',
    options: [
      { id: 'opt-a', text: 'OOM Killer (Out Of Memory Killer) đã cưỡng chế tiêu diệt tiến trình chiếm nhiều RAM nhất để cứu hệ thống không bị sập.' },
      { id: 'opt-b', text: 'Bộ lập lịch CPU (CPU Scheduler) tự động giải phóng tiến trình khi CPU bị quá nhiệt.' },
      { id: 'opt-c', text: 'Dịch vụ Systemd tự động restart ứng dụng khi tiến trình chạy quá 24 giờ liên tục.' },
      { id: 'opt-d', text: 'Trình quản lý tệp VFS (Virtual File System) xóa tiến trình do bị hết Inodes trên đĩa.' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Khi bộ nhớ RAM vật lý và Swap đều bị cạn kiệt hoàn toàn, cơ chế OOM Killer (Out Of Memory Killer) tích hợp trong nhân Linux Kernel sẽ chấm dứt tiến trình có điểm tiêu hao bộ nhớ cao nhất (OOM score) để ngăn toàn bộ hệ điều hành bị sụp đổ.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'CPU Scheduler chỉ điều phối thời gian thực thi CPU giữa các tiến trình, không có tính năng OOM kill.' },
        { optionId: 'opt-c', reason: 'Systemd chỉ restart tiến trình nếu được cấu hình `Restart=always`, không tự động tắt vì hết RAM.' },
        { optionId: 'opt-d', reason: 'Inodes liên quan đến số lượng tệp trên ổ đĩa, không gây lỗi OOM bộ nhớ RAM.' }
      ],
      awsRelevanceTip: 'Trên AWS EC2 (đặc biệt là các gói nhỏ như t3.micro/t3.small) hoặc ECS Task Definition, nếu ứng dụng bị crash đột ngột với exit code 137, đó chính là dấu hiệu của OOMKilled.'
    }
  },
  {
    id: 'comp-q2',
    domainId: 'computer_fundamentals',
    category: 'CLI Streams & Pipes',
    difficulty: 'Cơ bản',
    scenario: 'Bạn muốn chạy một kịch bản sao lưu `backup.sh` dưới nền, đồng thời muốn ghi toàn bộ thông điệp kết quả chuẩn (stdout) VÀ toàn bộ thông điệp báo lỗi (stderr) vào cùng một tệp `backup.log`. Cú pháp dòng lệnh nào sau đây là chính xác?',
    options: [
      { id: 'opt-a', text: './backup.sh > backup.log 2>&1 &' },
      { id: 'opt-b', text: './backup.sh < backup.log 2>1' },
      { id: 'opt-c', text: './backup.sh >> backup.log 1>&2' },
      { id: 'opt-d', text: './backup.sh | backup.log &' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: '`> backup.log` chuyển hướng stdout (FD 1) vào tệp backup.log, `2>&1` chuyển hướng stderr (FD 2) vào cùng vị trí của stdout, và `&` đẩy tiến trình chạy dưới nền (background).',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Toán tử `<` dùng cho đầu vào stdin, không dùng để ghi file log.' },
        { optionId: 'opt-c', reason: '`1>&2` chuyển hướng stdout vào stderr (ngược với yêu cầu ghi vào file log).' },
        { optionId: 'opt-d', reason: 'Toán tử pipe `|` chỉ dùng để chuyển luồng vào một lệnh/chương trình khác, không thể pipe trực tiếp vào tên file.' }
      ],
      awsRelevanceTip: 'Cú pháp `> /var/log/user-data.log 2>&1` là tiêu chuẩn vàng khi viết kịch bản EC2 User Data để ghi lại toàn bộ nhật ký khởi tạo máy chủ.'
    }
  },
  {
    id: 'comp-q3',
    domainId: 'computer_fundamentals',
    category: 'OS Architecture',
    difficulty: 'Trung bình',
    scenario: 'Một ứng dụng web muốn mở một kết nối mạng Socket hoặc đọc một tệp từ ổ đĩa SSD. Cơ chế nào cho phép ứng dụng ở Không gian người dùng (User Space) yêu cầu Nhân hệ điều hành (Kernel Space) thực hiện thao tác phần cứng này?',
    options: [
      { id: 'opt-a', text: 'System Calls (Lời gọi hệ thống - syscalls)' },
      { id: 'opt-b', text: 'Direct Memory Access (DMA) trực tiếp từ trình duyệt' },
      { id: 'opt-c', text: 'Giao thức DNS Resolver nội bộ' },
      { id: 'opt-d', text: 'Bộ nhớ đệm CPU L1 Cache' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'System Calls (syscalls như `read()`, `write()`, `socket()`, `fork()`) là giao diện trung gian an toàn duy nhất để chương trình ở User Space chuyển ngữ cảnh (Context Switch) sang Kernel Space để tương tác với phần cứng.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Ứng dụng ở User Space bị cấm hoàn toàn không được truy cập trực tiếp DMA phần cứng vì lý do an ninh.' },
        { optionId: 'opt-c', reason: 'DNS là giao thức mạng phân giải tên miền, không liên quan đến lời gọi nhân HĐH.' },
        { optionId: 'opt-d', reason: 'L1 Cache là bộ nhớ đệm phần cứng trên chip CPU, không phải cơ chế phần mềm điều phối.' }
      ],
      awsRelevanceTip: 'Hiểu syscalls giúp bạn giải thích tại sao công nghệ ảo hóa MicroVM như AWS Firecracker (nền tảng của AWS Lambda và Fargate) có thể khởi động trong 5 mili-giây với mức độ cô lập an toàn tuyệt đối.'
    }
  },
  {
    id: 'comp-q4',
    domainId: 'computer_fundamentals',
    category: 'File Systems & Storage',
    difficulty: 'Trung bình',
    scenario: 'Quản trị viên phát hiện máy chủ báo lỗi "No space left on device" khi cố tạo một file mới, mặc dù lệnh `df -h` cho thấy ổ đĩa vẫn còn trống hơn 50GB dung lượng. Nguyên nhân có khả năng cao nhất là gì?',
    options: [
      { id: 'opt-a', text: 'Hệ thống tệp đã cạn kiệt hoàn toàn bảng chỉ mục Inodes (kiểm tra bằng lệnh `df -i`).' },
      { id: 'opt-b', text: 'Bộ nhớ RAM bị phân mảnh nghiêm trọng.' },
      { id: 'opt-c', text: 'Cổng mạng 80 bị quá tải kết nối.' },
      { id: 'opt-d', text: 'Tệp Swap bị hỏng cấu trúc.' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Mỗi hệ thống tệp Linux có một số lượng Inode cố định (dùng để lưu siêu dữ liệu của từng tệp). Nếu máy chủ tạo hàng triệu tệp rác siêu nhỏ (vd: session files, cache files), số lượng Inode có thể hết 100% trước khi dung lượng byte trên đĩa bị đầy.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Phân mảnh RAM không gây lỗi tệp tin "No space left on device".' },
        { optionId: 'opt-c', reason: 'Cổng mạng không liên quan đến việc tạo file trên hệ thống tệp lưu trữ.' },
        { optionId: 'opt-d', reason: 'Tệp Swap chỉ liên quan đến bộ nhớ ảo, không ảnh hưởng đến số lượng file trên đĩa.' }
      ],
      awsRelevanceTip: 'Trên Amazon EBS và EFS, khi xử lý ứng dụng sinh ra nhiều file tạm, luôn cần kiểm tra cả `df -h` và `df -i` để chẩn đoán sự cố đĩa.'
    }
  },

  // --- DOMAIN 2: INTERNET FUNDAMENTALS (8 questions) ---
  {
    id: 'net-fun-q1',
    domainId: 'internet_fundamentals',
    category: 'DNS Resolution',
    difficulty: 'Cơ bản',
    scenario: 'Khi một máy tính lần đầu tiên truy vấn địa chỉ IP của tên miền `api.example.com` và không có cache cục bộ, máy chủ nào sau đây sẽ nắm giữ bản ghi DNS gốc và đưa ra câu trả lời chính thức cuối cùng?',
    options: [
      { id: 'opt-a', text: 'Authoritative Name Server (Máy chủ tên miền có thẩm quyền, vd: Amazon Route 53)' },
      { id: 'opt-b', text: 'Root Name Server (Cụm máy chủ gốc toàn cầu)' },
      { id: 'opt-c', text: 'TLD Name Server (Máy chủ quản lý phần mở rộng `.com`)' },
      { id: 'opt-d', text: 'ISP Recursive Resolver (Máy chủ DNS của nhà mạng)' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Authoritative Name Server là máy chủ chứa cấu hình bản ghi DNS gốc thực sự của chủ sở hữu tên miền, và là nơi đưa ra phản hồi chính thức (Authoritative Answer).',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Root Name Server chỉ chỉ dẫn tới TLD Server tương ứng.' },
        { optionId: 'opt-c', reason: 'TLD Name Server chỉ chỉ dẫn tới Authoritative Name Server của domain đó.' },
        { optionId: 'opt-d', reason: 'Recursive Resolver chỉ là trung gian đi hỏi giúp người dùng.' }
      ],
      awsRelevanceTip: 'Amazon Route 53 hoạt động với tư cách là một Authoritative DNS Service có tính sẵn sàng cao 100% SLA.'
    }
  },
  {
    id: 'net-fun-q2',
    domainId: 'internet_fundamentals',
    category: 'HTTP Protocols & Status Codes',
    difficulty: 'Cơ bản',
    scenario: 'Một khách hàng gửi yêu cầu cập nhật thông tin email của họ tới API. Tuy nhiên, họ quên không đính kèm Token xác thực trong Header `Authorization`. Máy chủ API nên phản hồi mã trạng thái HTTP nào là đúng chuẩn RESTful nhất?',
    options: [
      { id: 'opt-a', text: '401 Unauthorized' },
      { id: 'opt-b', text: '403 Forbidden' },
      { id: 'opt-c', text: '404 Not Found' },
      { id: 'opt-d', text: '500 Internal Server Error' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Mã 401 Unauthorized đại diện cho việc yêu cầu chưa được xác thực danh tính (thiếu hoặc sai thông tin đăng nhập/token).',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: '403 Forbidden dùng khi máy chủ ĐÃ BIẾT bạn là ai nhưng bạn KHÔNG CÓ QUYỀN truy cập tài nguyên đó.' },
        { optionId: 'opt-c', reason: '404 Not Found dùng khi đường dẫn URL không tồn tại.' },
        { optionId: 'opt-d', reason: '500 Internal Server Error dùng cho lỗi logic phía server, không dùng cho lỗi thiếu token từ client.' }
      ],
      awsRelevanceTip: 'Khi cấu hình AWS API Gateway Lambda Authorizer hoặc Cognito, nắm vững 401 (Unauthenticated) vs 403 (Unauthorized) là kiến thức bắt buộc.'
    }
  },
  {
    id: 'net-fun-q3',
    domainId: 'internet_fundamentals',
    category: 'DNS Records',
    difficulty: 'Trung bình',
    scenario: 'Bạn muốn cấu hình tên miền phụ `blog.company.com` để trỏ về tên miền phân phối CDN của AWS CloudFront là `d12345abcdef.cloudfront.net`. Loại bản ghi DNS tiêu chuẩn nào trên Internet được sử dụng cho mục đích tạo bí danh này?',
    options: [
      { id: 'opt-a', text: 'CNAME Record (Canonical Name)' },
      { id: 'opt-b', text: 'A Record (Address Record)' },
      { id: 'opt-c', text: 'MX Record (Mail Exchange)' },
      { id: 'opt-d', text: 'PTR Record (Pointer Record)' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'CNAME Record được thiết kế để ánh xạ một tên miền phụ (subdomain) sang một tên miền chuẩn khác (canonical name).',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'A Record chỉ ánh xạ tên miền trực tiếp sang địa chỉ IPv4 cụ thể (ví dụ: 1.2.3.4).' },
        { optionId: 'opt-c', reason: 'MX Record chỉ định máy chủ email tiếp nhận thư.' },
        { optionId: 'opt-d', reason: 'PTR Record dùng để tra cứu ngược từ IP ra tên miền (Reverse DNS).' }
      ],
      awsRelevanceTip: 'Với tên miền gốc (Zone Apex `@`), chuẩn DNS không cho phép dùng CNAME, nhưng AWS Route 53 cung cấp tính năng mở rộng Alias Record để giải quyết vấn đề này.'
    }
  },

  // --- DOMAIN 3: NETWORKING ⭐ (10 questions) ---
  {
    id: 'net-star-q1',
    domainId: 'networking_basics',
    category: 'Subnetting & CIDR',
    difficulty: 'Cơ bản',
    scenario: 'Bạn tạo một Subnet mới trong AWS VPC với dải mạng `10.0.1.0/24`. Trong một mạng LAN thông thường, số IP khả dụng là 254. Tuy nhiên, trong AWS Subnet, số lượng địa chỉ IP thực tế mà bạn có thể gán cho máy chủ EC2 là bao nhiêu?',
    options: [
      { id: 'opt-a', text: '251 IP khả dụng (AWS giữ riêng 5 địa chỉ IP: .0, .1, .2, .3, .255)' },
      { id: 'opt-b', text: '254 IP khả dụng (AWS chỉ giữ .0 và .255)' },
      { id: 'opt-c', text: '256 IP khả dụng (Toàn bộ dải /24)' },
      { id: 'opt-d', text: '248 IP khả dụng (AWS giữ 8 địa chỉ IP)' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Trong mọi Subnet của AWS VPC, AWS luôn dành riêng chính xác 5 địa chỉ IP: .0 (Network Address), .1 (VPC Router), .2 (DNS Server), .3 (Future Use), và .255 (Broadcast Address). Do đó, dải /24 có 256 - 5 = 251 IP khả dụng.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Đây là quy tắc mạng truyền thống (trừ 2 IP), không đúng trong môi trường AWS VPC.' },
        { optionId: 'opt-c', reason: 'Không thể sử dụng toàn bộ 256 IP do cần địa chỉ mạng và cổng gateway.' },
        { optionId: 'opt-d', reason: 'AWS chỉ giữ 5 IP, không giữ 8 IP.' }
      ],
      awsRelevanceTip: 'Đây là câu hỏi xuất hiện với tần suất cực cao trong kỳ thi AWS SAA-C03 và phỏng vấn Cloud Architect.'
    }
  },
  {
    id: 'net-star-q2',
    domainId: 'networking_basics',
    category: 'IP Addressing & RFC 1918',
    difficulty: 'Cơ bản',
    scenario: 'Dải địa chỉ IP nào sau đây KHÔNG PHẢI là dải IP mạng riêng (Private IP) theo quy chuẩn RFC 1918?',
    options: [
      { id: 'opt-a', text: '172.40.0.0/16' },
      { id: 'opt-b', text: '10.0.0.0/8' },
      { id: 'opt-c', text: '172.16.0.0/12 (từ 172.16.0.0 đến 172.31.255.255)' },
      { id: 'opt-d', text: '192.168.0.0/16' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Dải Class B Private IP chỉ kéo dài từ `172.16.0.0` đến `172.31.255.255` (/12). Do đó, `172.40.0.0/16` là dải IP công cộng (Public IP) thuộc quyền sở hữu của các tổ chức trên Internet.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: '10.0.0.0/8 là dải Private IP Class A chuẩn RFC 1918.' },
        { optionId: 'opt-c', reason: '172.16.0.0/12 là dải Private IP Class B chuẩn RFC 1918.' },
        { optionId: 'opt-d', reason: '192.168.0.0/16 là dải Private IP Class C chuẩn RFC 1918.' }
      ],
      awsRelevanceTip: 'Khi tạo VPC trên AWS, luôn chọn các dải RFC 1918 để tránh xung đột định tuyến với các dịch vụ công cộng trên Internet.'
    }
  },
  {
    id: 'net-star-q3',
    domainId: 'networking_basics',
    category: 'Transport Layer Protocols',
    difficulty: 'Trung bình',
    scenario: 'Khi một máy khách muốn thiết lập kết nối TCP tới cổng 443 của Web Server, trình tự gói tin bắt tay (3-Way Handshake) diễn ra theo thứ tự nào sau đây?',
    options: [
      { id: 'opt-a', text: 'SYN -> SYN-ACK -> ACK' },
      { id: 'opt-b', text: 'ACK -> SYN -> SYN-ACK' },
      { id: 'opt-c', text: 'HELLO -> CHALLENGE -> RESPONSE' },
      { id: 'opt-d', text: 'FIN -> ACK -> FIN-ACK' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Quá trình TCP 3-Way Handshake gồm: 1) Client gửi SYN; 2) Server phản hồi SYN-ACK; 3) Client xác nhận lại bằng ACK để bắt đầu truyền dữ liệu.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Sai thứ tự bắt tay.' },
        { optionId: 'opt-c', reason: 'Đây là thuật ngữ của giao thức xác thực bảo mật, không phải bắt tay TCP.' },
        { optionId: 'opt-d', reason: 'FIN dùng cho quá trình đóng kết nối (TCP Termination), không phải mở kết nối.' }
      ],
      awsRelevanceTip: 'Hiểu TCP 3-Way Handshake giúp bạn dễ dàng debug các sự cố SYN Flood DDoS trên AWS Shield và cấu hình đúng AWS Network Load Balancer (NLB).'
    }
  },
  {
    id: 'net-star-q4',
    domainId: 'networking_basics',
    category: 'Firewalls & Security Groups',
    difficulty: 'Trung bình',
    scenario: 'Bạn cấu hình một Security Group trên AWS cho phép lưu lượng Inbound từ cổng 80 (HTTP). Bạn KHÔNG cấu hình bất kỳ quy tắc nào trong mục Outbound Rules. Chuyện gì sẽ xảy ra khi máy khách gửi yêu cầu HTTP và máy chủ phản hồi kết quả?',
    options: [
      { id: 'opt-a', text: 'Máy khách vẫn nhận được phản hồi bình thường vì Security Group có tính chất Stateful (tự động cho phép lưu lượng phản hồi).' },
      { id: 'opt-b', text: 'Máy khách bị timeout vì thiếu quy tắc Outbound cho phép cổng HTTP.' },
      { id: 'opt-c', text: 'Yêu cầu bị chặn ngay từ cổng vào do vi phạm quy tắc đối xứng.' },
      { id: 'opt-d', text: 'AWS tự động đổi cổng kết nối sang cổng 443.' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Security Group là Tường lửa có trạng thái (Stateful Firewall). Khi một kết nối Inbound được cho phép, toàn bộ gói tin phản hồi của phiên kết nối đó sẽ tự động được phép đi ra (Outbound) bất kể cấu hình Outbound thế nào.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Hành vi bị timeout này là của Network ACL (Stateless), không phải của Security Group.' },
        { optionId: 'opt-c', reason: 'Security Group không chặn chiều vào nếu đã có Allow rule.' },
        { optionId: 'opt-d', reason: 'Security Group không thể tự ý thay đổi số hiệu cổng dịch vụ.' }
      ],
      awsRelevanceTip: 'Trọng tâm phân biệt: Security Group là Stateful (gắn ở cấp độ Instance), Network ACL là Stateless (gắn ở cấp độ Subnet).'
    }
  },

  // --- DOMAIN 4: LINUX BASICS ⭐ (10 questions) ---
  {
    id: 'linux-star-q1',
    domainId: 'linux_basics',
    category: 'File Permissions',
    difficulty: 'Cơ bản',
    scenario: 'Khi bạn chạy lệnh `chmod 755 deploy.sh` trên máy chủ Linux, quyền truy cập của tệp này đối với Người sở hữu (User), Nhóm sở hữu (Group), và Những người khác (Others) được thiết lập như thế nào?',
    options: [
      { id: 'opt-a', text: 'User: Đọc/Ghi/Thực thi (rwx), Group: Đọc/Thực thi (r-x), Others: Đọc/Thực thi (r-x)' },
      { id: 'opt-b', text: 'User: Đọc/Ghi (rw-), Group: Đọc (r--), Others: Không có quyền (---)' },
      { id: 'opt-c', text: 'User: Toàn quyền, Group: Toàn quyền, Others: Toàn quyền' },
      { id: 'opt-d', text: 'User: Thực thi, Group: Ghi, Others: Đọc' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Trong hệ bát phân: 7 = 4(r) + 2(w) + 1(x) = rwx; 5 = 4(r) + 0 + 1(x) = r-x. Do đó 755 đại diện cho `rwxr-xr-x`.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Mô hình này là 640, không phải 755.' },
        { optionId: 'opt-c', reason: 'Toàn quyền cho mọi người là 777.' },
        { optionId: 'opt-d', reason: 'Thứ tự bit đọc-ghi-thực thi không đúng.' }
      ],
      awsRelevanceTip: 'Khi triển khai script hoặc web server trên EC2, tệp script thường đặt 755, tệp cấu hình đặt 644, và Private Key SSH bắt buộc phải là 400 hoặc 600.'
    }
  },
  {
    id: 'linux-star-q2',
    domainId: 'linux_basics',
    category: 'SSH Key Pairs',
    difficulty: 'Cơ bản',
    scenario: 'Bạn vừa tải về một tệp khóa riêng tư `my-key.pem` từ AWS Console để SSH vào máy chủ EC2. Khi chạy lệnh `ssh -i my-key.pem ubuntu@54.239.28.85`, bạn nhận được cảnh báo lỗi "UNPROTECTED PRIVATE KEY FILE" và kết nối bị từ chối. Bạn cần chạy lệnh nào để khắc phục ngay lập tức?',
    options: [
      { id: 'opt-a', text: 'chmod 400 my-key.pem (hoặc chmod 600 my-key.pem)' },
      { id: 'opt-b', text: 'chmod 777 my-key.pem' },
      { id: 'opt-c', text: 'sudo chown root:root my-key.pem' },
      { id: 'opt-d', text: 'ssh-keygen -A' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Trình SSH client trên Linux/macOS yêu cầu khóa riêng tư Private Key phải được bảo mật tuyệt đối, chỉ duy nhất người dùng hiện tại có quyền đọc (400 hoặc 600). Nếu Group hoặc Others có quyền đọc, SSH sẽ từ chối kết nối.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: '777 mở toàn quyền cho mọi người, làm tình trạng lỗi nghiêm trọng hơn.' },
        { optionId: 'opt-c', reason: 'Đổi chủ sở hữu sang root sẽ khiến user hiện tại không đọc được key.' },
        { optionId: 'opt-d', reason: 'ssh-keygen -A dùng để sinh host keys cho máy chủ, không liên quan đến private key client.' }
      ],
      awsRelevanceTip: 'Đây là lỗi phổ biến nhất của 100% kỹ sư mới bắt đầu làm việc với AWS EC2.'
    }
  },
  {
    id: 'linux-star-q3',
    domainId: 'linux_basics',
    category: 'Systemd & Services',
    difficulty: 'Trung bình',
    scenario: 'Lệnh nào sau đây trong Systemd vừa khởi động dịch vụ Nginx ngay lập tức, vừa thiết lập cho Nginx tự động khởi động cùng hệ thống mỗi khi máy chủ Linux reboot?',
    options: [
      { id: 'opt-a', text: 'sudo systemctl enable --now nginx' },
      { id: 'opt-b', text: 'sudo systemctl start nginx' },
      { id: 'opt-c', text: 'sudo service nginx run-on-boot' },
      { id: 'opt-d', text: 'sudo systemctl restart --boot nginx' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Cờ `--now` kết hợp với lệnh `enable` giúp vừa kích hoạt tính năng tự khởi động cùng OS (symlink trong `/etc/systemd/system/`), vừa start dịch vụ ngay tức thì mà không cần gõ 2 lệnh riêng biệt.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Lệnh này chỉ khởi động tạm thời, khi máy chủ reboot Nginx sẽ không tự chạy nếu chưa enable.' },
        { optionId: 'opt-c', reason: 'Không có cú pháp `run-on-boot` trong lệnh service.' },
        { optionId: 'opt-d', reason: 'Cú pháp sai, systemctl không có cờ `--boot`.' }
      ],
      awsRelevanceTip: 'Khi viết EC2 User Data script cấu hình Nginx hoặc Docker, sử dụng `systemctl enable --now <service>` đảm bảo dịch vụ luôn sống sót sau các đợt Reboot máy chủ.'
    }
  },

  // --- DOMAIN 5: WEB & APP BASICS (8 questions) ---
  {
    id: 'web-q1',
    domainId: 'web_application',
    category: 'Web Servers & Load Balancing',
    difficulty: 'Cơ bản',
    scenario: 'Trong kiến trúc Web hiện đại, lợi ích cốt lõi của việc đặt một Reverse Proxy (như Nginx) đứng phía trước các ứng dụng Backend (như Node.js / Python FastAPI) là gì?',
    options: [
      { id: 'opt-a', text: 'Ẩn địa chỉ IP nội bộ của Backend, đảm nhiệm giải mã SSL/TLS (SSL Termination), nén dữ liệu và cân bằng tải.' },
      { id: 'opt-b', text: 'Tự động sửa lỗi cú pháp mã nguồn backend trong thời gian thực.' },
      { id: 'opt-c', text: 'Thay thế hoàn toàn cơ sở dữ liệu quan hệ SQL.' },
      { id: 'opt-d', text: 'Biến ứng dụng đơn luồng thành ứng dụng đa luồng phần cứng.' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Reverse Proxy đóng vai trò trạm bảo vệ và tăng tốc: Ẩn máy chủ backend phía sau, xử lý SSL Termination giúp giảm tải CPU cho backend, nén tài nguyên Gzip và phân phối lưu lượng.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Nginx là web server chuyển tiếp mạng, không can thiệp vào logic code.' },
        { optionId: 'opt-c', reason: 'Nginx không phải là hệ quản trị cơ sở dữ liệu.' },
        { optionId: 'opt-d', reason: 'Nginx không thay đổi mô hình xử lý luồng của mã nguồn backend.' }
      ],
      awsRelevanceTip: 'Mô hình này tương đồng với việc đặt AWS Application Load Balancer (ALB) hoặc CloudFront đứng trước nhóm EC2 Target Group.'
    }
  },
  {
    id: 'web-q2',
    domainId: 'web_application',
    category: 'Databases & ACID',
    difficulty: 'Trung bình',
    scenario: 'Một ứng dụng ngân hàng cần thực hiện giao dịch chuyển tiền: Trừ 1,000 USD từ tài khoản A và cộng 1,000 USD vào tài khoản B. Nếu thao tác cộng tiền vào tài khoản B bị lỗi hệ thống, toàn bộ giao dịch phải bị hủy bỏ và tài khoản A không bị mất tiền. Thuộc tính nào trong nguyên tắc ACID đảm bảo hành vi này?',
    options: [
      { id: 'opt-a', text: 'Atomicity (Tính nguyên tử - All-or-Nothing)' },
      { id: 'opt-b', text: 'Consistency (Tính nhất quán)' },
      { id: 'opt-c', text: 'Isolation (Tính cô lập)' },
      { id: 'opt-d', text: 'Durability (Tính bền vững)' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Atomicity quy định một giao dịch là một khối thống nhất không thể chia cắt: hoặc tất cả các câu lệnh thành công toàn bộ, hoặc nếu có 1 lỗi xảy ra thì toàn bộ giao dịch phải được rollback về trạng thái ban đầu (All-or-Nothing).',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Consistency đảm bảo dữ liệu tuân thủ các quy tắc ràng buộc toàn vẹn (Foreign keys, Unique, Check).' },
        { optionId: 'opt-c', reason: 'Isolation ngăn chặn các giao dịch chạy đồng thời nhìn thấy dữ liệu trung gian của nhau.' },
        { optionId: 'opt-d', reason: 'Durability đảm bảo dữ liệu đã commit sẽ không bị mất khi mất điện.' }
      ],
      awsRelevanceTip: 'Amazon Aurora và RDS RDBMS hỗ trợ 100% ACID compliance cho các bài toán nghiệp vụ tài chính khắt khe.'
    }
  },

  // --- DOMAIN 6: SECURITY BASICS (8 questions) ---
  {
    id: 'sec-q1',
    domainId: 'security_basics',
    category: 'AuthN vs AuthZ',
    difficulty: 'Cơ bản',
    scenario: 'Một nhân viên đăng nhập thành công vào hệ thống kế toán công ty bằng tài khoản và mật khẩu của họ. Tuy nhiên, khi họ nhấp vào mục "Duyệt chi thưởng ban giám đốc", hệ thống hiển thị thông báo "Bạn không có quyền truy cập chức năng này". Đây là ví dụ của thất bại ở tầng nào?',
    options: [
      { id: 'opt-a', text: 'Authorization (Phân quyền - AuthZ)' },
      { id: 'opt-b', text: 'Authentication (Xác thực - AuthN)' },
      { id: 'opt-c', text: 'Data Encryption (Mã hóa dữ liệu)' },
      { id: 'opt-d', text: 'Public Key Infrastructure (PKI)' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Người dùng ĐÃ XÁC THỰC THÀNH CÔNG (AuthN qua đăng nhập), nhưng BỊ TỪ CHỐI PHÂN QUYỀN (AuthZ) do vai trò của họ không có quyền xem dữ liệu nhạy cảm.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Authentication đã thành công ở bước đăng nhập mật khẩu.' },
        { optionId: 'opt-c', reason: 'Mã hóa dữ liệu liên quan đến việc xáo trộn dữ liệu chống đọc trộm.' },
        { optionId: 'opt-d', reason: 'PKI là hạ tầng quản lý chứng chỉ số.' }
      ],
      awsRelevanceTip: 'Trong AWS IAM: Đăng nhập vào AWS Console là AuthN; việc IAM Policy cho phép hay từ chối quyền `s3:DeleteBucket` là AuthZ.'
    }
  },
  {
    id: 'sec-q2',
    domainId: 'security_basics',
    category: 'Cryptography & Hashing',
    difficulty: 'Trung bình',
    scenario: 'Tại sao trong phát triển phần mềm an toàn, mật khẩu người dùng KHÔNG BAO GIỜ được mã hóa bằng thuật toán đối xứng (như AES) mà BẮT BUỘC phải được băm một chiều (Hashing với Salt bằng bcrypt/Argon2)?',
    options: [
      { id: 'opt-a', text: 'Vì mã hóa AES có thể bị giải mã ngược lại nếu kẻ tấn công đánh cắp được khóa bí mật, còn hàm băm (Hash) là toán học một chiều không thể đảo ngược.' },
      { id: 'opt-b', text: 'Vì hàm băm tốn ít dung lượng ổ đĩa hơn mã hóa AES.' },
      { id: 'opt-c', text: 'Vì thuật toán AES không hỗ trợ ký tự tiếng Việt.' },
      { id: 'opt-d', text: 'Vì hàm băm giúp tốc độ đăng nhập của người dùng tăng gấp 10 lần.' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Mã hóa (Encryption) là 2 chiều (có thể giải mã ra mật khẩu gốc). Hàm băm (Hashing) là hàm toán học 1 chiều: từ chuỗi hash không thể giải mã ngược lại mật khẩu gốc. Việc thêm Salt giúp chống lại các cuộc tấn công tra cứu bảng Rainbow Table.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Dung lượng chuỗi hash không phải là lý do an ninh cốt lõi.' },
        { optionId: 'opt-c', reason: 'AES hỗ trợ mọi chuỗi byte dữ liệu nhị phân.' },
        { optionId: 'opt-d', reason: 'Ngược lại, các thuật toán băm mật khẩu như bcrypt được thiết kế cố tình chạy chậm để chống brute-force.' }
      ],
      awsRelevanceTip: 'AWS Cognito User Pools tự động quản lý băm mật khẩu an toàn theo tiêu chuẩn bảo mật đám mây cao nhất.'
    }
  },

  // --- DOMAIN 7: CLOUD FUNDAMENTALS (8 questions) ---
  {
    id: 'cloud-q1',
    domainId: 'cloud_fundamentals',
    category: 'Service Models',
    difficulty: 'Cơ bản',
    scenario: 'Một công ty sử dụng dịch vụ Amazon EC2 để tự cài đặt hệ điều hành Ubuntu, tự cài đặt Node.js và quản lý ứng dụng của mình. Mô hình dịch vụ đám mây này thuộc loại nào?',
    options: [
      { id: 'opt-a', text: 'IaaS (Infrastructure as a Service - Hạ tầng như một dịch vụ)' },
      { id: 'opt-b', text: 'PaaS (Platform as a Service - Nền tảng như một dịch vụ)' },
      { id: 'opt-c', text: 'SaaS (Software as a Service - Phần mềm như một dịch vụ)' },
      { id: 'opt-d', text: 'FaaS (Function as a Service - Hàm như một dịch vụ)' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Amazon EC2 là dịch vụ IaaS kinh điển: AWS cung cấp máy chủ ảo và phần cứng, khách hàng chịu trách nhiệm quản lý hệ điều hành, cài đặt runtime, bảo mật và ứng dụng.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'PaaS (như AWS Elastic Beanstalk) tự quản lý OS và Runtime, bạn chỉ đẩy code lên.' },
        { optionId: 'opt-c', reason: 'SaaS (như Gmail) là phần mềm hoàn chỉnh cho người dùng cuối.' },
        { optionId: 'opt-d', reason: 'FaaS (như AWS Lambda) là mô hình chạy từng hàm không máy chủ Serverless.' }
      ],
      awsRelevanceTip: 'Câu hỏi phân loại IaaS vs PaaS vs SaaS là câu hỏi cơ bản bắt buộc trong kỳ thi AWS Certified Cloud Practitioner CLF-C02.'
    }
  },
  {
    id: 'cloud-q2',
    domainId: 'cloud_fundamentals',
    category: 'Virtualization vs Containers',
    difficulty: 'Trung bình',
    scenario: 'Đặc điểm kỹ thuật nào sau đây giải thích chính xác nhất lý do tại sao Docker Container có dung lượng siêu nhẹ (vài chục MB) và khởi động chỉ trong vài mili-giây so với Máy ảo (Virtual Machine)?',
    options: [
      { id: 'opt-a', text: 'Docker Container không chứa Hệ điều hành khách (Guest OS) mà chạy trực tiếp và dùng chung nhân Linux Kernel của máy chủ Host.' },
      { id: 'opt-b', text: 'Docker nén toàn bộ phần cứng CPU vào một tệp zip.' },
      { id: 'opt-c', text: 'Docker chỉ chạy được trên các máy chủ có card đồ họa GPU rời.' },
      { id: 'opt-d', text: 'Docker biến đổi mã nguồn thành mã nhị phân cấp vi mạch.' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Khác với VM phải gánh thêm một Guest OS nặng nề qua Hypervisor, Container chia sẻ trực tiếp Linux Kernel của Host OS và chỉ đóng gói mã nguồn cùng các thư viện ứng dụng cần thiết, được cô lập qua Namespaces và Cgroups.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'CPU là phần cứng vật lý, không thể nén zip.' },
        { optionId: 'opt-c', reason: 'Docker chạy trên mọi CPU tiêu chuẩn (x86, ARM), không yêu cầu GPU.' },
        { optionId: 'opt-d', reason: 'Docker là công cụ đóng gói môi trường, không phải trình biên dịch vi mạch.' }
      ],
      awsRelevanceTip: 'Hiểu bản chất Container giúp bạn tự tin làm chủ Amazon ECS, AWS Fargate và Amazon EKS Kubernetes.'
    }
  },

  // --- DOMAIN 8: GIT & SCRIPTING (8 questions) ---
  {
    id: 'git-q1',
    domainId: 'git_scripting',
    category: 'Bash Scripting Safety',
    difficulty: 'Cơ bản',
    scenario: 'Tại sao các kỹ sư Cloud và DevOps luôn khuyến nghị đặt dòng lệnh `set -euo pipefail` ở đầu mọi script Bash trong môi trường tự động hóa sản xuất?',
    options: [
      { id: 'opt-a', text: 'Để script tự động dừng ngay lập tức khi có lệnh bị lỗi (-e), khi truy xuất biến chưa khai báo (-u), hoặc khi có lỗi ở giữa chuỗi pipe.' },
      { id: 'opt-b', text: 'Để script tự động nâng quyền lên tài khoản root tối cao.' },
      { id: 'opt-c', text: 'Để chuyển đổi script Bash sang ngôn ngữ lập trình Python.' },
      { id: 'opt-d', text: 'Để xóa toàn bộ file tạm sau khi chạy xong.' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: '`set -euo pipefail` là Strict Mode chuẩn: `-e` dừng khi gặp lỗi, `-u` dừng khi gặp biến rỗng/chưa định nghĩa (tránh xóa nhầm tệp), `-o pipefail` bắt lỗi trong toàn bộ chuỗi pipeline.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Lệnh này không can thiệp nâng quyền sudo/root.' },
        { optionId: 'opt-c', reason: 'Bash vẫn là Bash, không thể tự chuyển sang Python.' },
        { optionId: 'opt-d', reason: 'Không có tính năng tự động dọn rác file tạm.' }
      ],
      awsRelevanceTip: 'Áp dụng dòng này trong mọi script CI/CD trên GitHub Actions và User Data scripts trên AWS EC2 để tránh lỗi ngầm.'
    }
  },
  {
    id: 'git-q2',
    domainId: 'git_scripting',
    category: 'Git Version Control',
    difficulty: 'Trung bình',
    scenario: 'Bạn và một đồng nghiệp cùng chỉnh sửa cùng một dòng trong file `server.ts` trên 2 nhánh khác nhau. Khi bạn chạy lệnh `git merge feature-branch` vào nhánh chính, chuyện gì sẽ xảy ra?',
    options: [
      { id: 'opt-a', text: 'Git dừng quá trình merge, thông báo xung đột (Merge Conflict) và đánh dấu các đoạn code khác biệt trong tệp để bạn tự quyết định giữ lại phiên bản nào.' },
      { id: 'opt-b', text: 'Git tự động xóa toàn bộ code của bạn và lấy code của đồng nghiệp.' },
      { id: 'opt-c', text: 'Git tự động tạo một máy chủ ảo mới để chạy cả 2 phiên bản.' },
      { id: 'opt-d', text: 'Git xóa toàn bộ lịch sử commit trước đó của repository.' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Khi có xung đột nội dung trên cùng một dòng, Git không thể tự đoán ý định của lập trình viên, nên sẽ dừng lại, chèn các thẻ phân tách `<<<<<<<`, `=======`, `>>>>>>>` và yêu cầu con người giải quyết xung đột trước khi hoàn tất commit merge.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Git không bao giờ tự ý ghi đè xóa code mà không có sự chỉ định.' },
        { optionId: 'opt-c', reason: 'Git là hệ thống quản lý phiên bản mã nguồn, không tự tạo máy chủ.' },
        { optionId: 'opt-d', reason: 'Lịch sử commit được lưu trữ an toàn trong DAG.' }
      ],
      awsRelevanceTip: 'Kỹ năng giải quyết Merge Conflict là bắt buộc trong mọi quy trình làm việc nhóm và CI/CD trên AWS CodeCommit / GitHub.'
    }
  }
];
