import { LinuxAdminChapter } from '../../types/linuxAdminModule';

export const LINUX_ADMIN_CHAPTERS: LinuxAdminChapter[] = [
  {
    id: 'linux-chap-1-fundamentals',
    chapterNumber: 1,
    title: 'Khởi Nguyên Linux & Kiến Trúc Hệ Điều Hành Unix-like',
    subtitle: 'Nắm vững Triết lý Unix, phân tách Kernel Space (Ring 0) vs User Space (Ring 3) và bản đồ các bản phân phối Linux (Distros)',
    category: 'linux_fundamentals',
    readTimeMinutes: 20,
    level: 'Cơ bản',
    summary: 'Giải phẫu toàn diện nguồn gốc Unix/Linux: từ triết lý "Everything is a file", kiến trúc phân tầng Kernel - System Calls - Shell, đến cách chọn lựa chuẩn xác giữa Ubuntu/Debian, RHEL/Rocky Linux, Alpine và Amazon Linux 2023.',
    sections: [
      {
        heading: '1. Triết Lý Unix & Bản Chất Hệ Điều Hành Mã Nguồn Mở',
        subheading: 'Nền tảng tư duy định hình toàn bộ thế giới điện toán đám mây và server hiện đại',
        content: 'Linux là hệ điều hành mô phỏng theo chuẩn POSIX của Unix do Linus Torvalds khởi xướng năm 1991. Toàn bộ thiết kế của Linux xoay quanh 3 triết lý Unix bất hủ do Ken Thompson và Dennis Ritchie sáng lập:',
        bulletPoints: [
          '1. "Do One Thing and Do It Well": Mỗi chương trình, dòng lệnh chỉ làm một nhiệm vụ duy nhất và làm nó xuất sắc nhất (ví dụ: `cat` chỉ đọc, `grep` chỉ tìm, `wc` chỉ đếm).',
          '2. "Everything is a File": Mọi thứ trong Linux đều được biểu diễn như một tệp tin — từ ổ đĩa cứng (`/dev/sda`), cổng kết nối mạng (Socket), tiến trình đang chạy (`/proc/PID`), đến thiết bị phần cứng.',
          '3. "Plain Text Streams & Composition": Dữ liệu đầu ra của một chương trình là dạng văn bản thuần túy và có thể dễ dàng làm đầu vào cho chương trình khác thông qua đường ống Pipe (`|`).'
        ],
        diagramType: 'kernel-user-space'
      },
      {
        heading: '2. Kiến Trúc Phân Tầng: Kernel Space vs User Space',
        subheading: 'Tại sao Linux lại ổn định và bảo mật vượt trội so với các hệ điều hành khác?',
        content: 'Hệ điều hành Linux sử dụng cơ chế bảo vệ phần cứng của CPU (x86/ARM Protection Rings) để chia bộ nhớ thành hai không gian độc lập tuyệt đối:',
        bulletPoints: [
          'User Space (Ring 3): Nơi tất cả ứng dụng người dùng, Web Server (Nginx), Database (Postgres), Docker containers và Shell chạy. Khi ứng dụng trong User Space bị lỗi (Crash hoặc Memory Leak), nó chỉ chết một mình mà không làm sập máy chủ.',
          'Kernel Space (Ring 0): Không gian lõi chứa Linux Kernel, có quyền truy cập trực tiếp và toàn quyền vào CPU, RAM, Ổ cứng, và Card mạng (NIC).',
          'System Calls (Syscalls): Cầu nối an toàn duy nhất để ứng dụng User Space yêu cầu Kernel thực hiện các tác vụ phần cứng (ví dụ: `open()`, `read()`, `write()`, `fork()`, `socket()`).'
        ],
        proTip: 'Một quản trị viên Linux giỏi là người hiểu rõ tiến trình đang chạy thực hiện syscalls nào qua công cụ `strace` để tìm điểm nghẽn hoặc lỗi gián đoạn.'
      },
      {
        heading: '3. Bản Đồ Các Bản Phân Phối Linux (Distro Landscape)',
        subheading: 'Lựa chọn hệ điều hành máy chủ chuẩn xác cho từng bài toán thực tế',
        content: 'Linux chỉ là phần "nhân" (Kernel). Khi kết hợp Kernel với các tiện ích GNU, trình quản lý gói (Package Manager) và Systemd, ta có các Bản phân phối (Distributions):',
        bulletPoints: [
          'Debian / Ubuntu Server: Trình quản lý gói `apt` (`.deb`). Hệ sinh thái tài liệu khổng lồ, phần mềm luôn mới, là tiêu chuẩn vàng cho Web/App Servers, AI Workloads, và máy chủ VPS.',
          'RHEL / Rocky Linux / AlmaLinux: Trình quản lý gói `dnf/yum` (`.rpm`). Độ ổn định tối đa, vòng đời hỗ trợ 10 năm, tích hợp bảo mật SELinux nghiêm ngặt, chuẩn mực trong Ngân hàng và Doanh nghiệp lớn.',
          'Amazon Linux 2023 (AL2023): Bản Linux tối ưu riêng của AWS cho hạ tầng EC2/ECS/EKS, khởi động cực nhanh, tích hợp sẵn AWS CLI và cập nhật bản vá bảo mật tự động.',
          'Alpine Linux: Siêu nhẹ (~5MB), dùng thư viện C `musl` và `apk`. Tiêu chuẩn số 1 để xây dựng Docker Container Image siêu gọn và bảo mật.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'uname / hostnamectl',
        title: 'Kiểm tra thông tin chi tiết Linux Kernel và Bản phân phối',
        command: `uname -a\nhostnamectl\ncat /etc/os-release`,
        description: 'Xem phiên bản Kernel (ví dụ 6.5.0), kiến trúc CPU (x86_64/aarch64) và tên bản phân phối'
      }
    ],
    masteryChecklist: [
      'Giải thích tường tận 3 triết lý thiết kế cốt lõi của Unix',
      'Phân biệt rõ ràng Kernel Space (Ring 0) và User Space (Ring 3)',
      'Tự tin chọn đúng Linux Distro cho Web App, Ngân Hàng, AWS EC2 và Docker Containers'
    ]
  },
  {
    id: 'linux-chap-2-shell-cli-mastery',
    chapterNumber: 2,
    title: 'Làm Chủ Shell, Dòng Lệnh & Tự Động Hóa Bash Script',
    subtitle: 'Làm chủ 3 luồng dữ liệu (stdin/stdout/stderr), Đường ống Pipe (|), Bộ 5 công cụ xử lý văn bản (grep, sed, awk, find, xargs) và viết Bash Script chuẩn Production',
    category: 'shell_command_line',
    readTimeMinutes: 25,
    level: 'Trung cấp',
    summary: 'Biến dòng lệnh thành vũ khí siêu tốc: từ cơ chế luồng nhập/xuất tệp, cách trích xuất log hàng triệu dòng trong vài giây bằng grep/sed/awk, đến viết Bash Script tự động hóa bảo đảm an toàn với `set -euo pipefail`.',
    sections: [
      {
        heading: '1. Ba Luồng Dữ Liệu Chuẩn & Nghệ Thuật Điều Hướng (Redirection)',
        subheading: 'Hiểu bản chất File Descriptors: stdin (0), stdout (1), stderr (2)',
        content: 'Mọi tiến trình Linux khi khởi chạy đều được gán sẵn 3 bộ mô tả tệp (File Descriptors) mở mặc định:',
        bulletPoints: [
          'stdin (0): Luồng đầu vào tiêu chuẩn (thường từ bàn phím).',
          'stdout (1): Luồng đầu ra tiêu chuẩn (kết quả thực thi bình thường).',
          'stderr (2): Luồng thông báo lỗi tiêu chuẩn (tách riêng khỏi kết quả).',
          '`>` (Ghi đè): Chuyển hướng stdout vào file (`echo "abc" > file.txt`).',
          '`>>` (Ghi nối tiếp): Nối stdout vào cuối file không làm mất dữ liệu cũ.',
          '`2>&1` (Hợp nhất luồng): Gộp luồng lỗi stderr vào chung với luồng stdout.',
          '`&> /dev/null` hoặc `> /dev/null 2>&1`: Ném toàn bộ log và lỗi vào "hố đen" để chạy hoàn toàn im lặng.'
        ]
      },
      {
        heading: '2. Bộ 5 Công Cụ Xử Lý Văn Bản Huyền Thoại (The Big 5)',
        subheading: 'Trích xuất và xử lý log hệ thống nhanh gấp hàng trăm lần phần mềm đồ họa',
        content: 'Quản trị viên chuyên nghiệp không bao giờ tải file log GBs về máy cá nhân để mở bằng Excel/Notepad. Mọi phân tích được thực hiện tức thì trên server:',
        bulletPoints: [
          '`grep -rnI "ERROR" /var/log/`: Tìm kiếm chuỗi có số dòng (n), đệ quy (r), bỏ qua file nhị phân (I).',
          '`sed "s/http:\\/\\//https:\\/\\//g" config.conf`: Trình chỉnh sửa luồng (Stream Editor), thay thế hàng loạt chuỗi mà không cần mở file.',
          '`awk \'{print $1, $9}\' access.log`: Ngôn ngữ xử lý bảng dữ liệu, chia cột mặc định bằng dấu cách, cực mạnh để trích xuất IP, mã HTTP status.',
          '`find /var/log -type f -mtime +30 -name "*.log"`: Tìm kiếm file sâu theo loại, thời gian sửa đổi và dung lượng.',
          '`xargs`: Nhận danh sách đầu ra từ Pipe và chuyển thành tham số đối số cho lệnh kế tiếp (`find ... | xargs rm -f`).'
        ],
        codeBlock: {
          language: 'bash',
          title: 'Ví dụ: Đếm Top 10 IP gửi nhiều Request nhất từ Nginx access.log',
          code: `# Trích xuất cột IP ($1), đếm số lần xuất hiện và sắp xếp giảm dần
cat /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -10`
        }
      },
      {
        heading: '3. Viết Bash Script Chuẩn Production An Toàn',
        subheading: 'Không bao giờ để script chạy lỗi mà vẫn tiếp tục xóa nhầm dữ liệu',
        content: 'Một script quản trị tự động hóa (Backup, Deploy, Cleanup) luôn bắt buộc phải có cờ an toàn nghiêm ngặt ngay đầu file:',
        codeBlock: {
          language: 'bash',
          title: 'Template Bash Script Production (/opt/scripts/deploy-app.sh)',
          code: `#!/usr/bin/env bash
# Cờ an toàn nghiêm ngặt bắt buộc cho Production:
# -e: Dừng ngay nếu có bất kỳ lệnh nào trả về mã lỗi (exit status != 0)
# -u: Dừng ngay nếu sử dụng một biến chưa được khai báo
# -o pipefail: Không nuốt lỗi trong chuỗi pipe lệnh
set -euo pipefail

# Khai báo biến
APP_DIR="/var/www/production-app"
BACKUP_DIR="/var/backups/app"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo "=== [$(date)] BẮT ĐẦU QUY TRÌNH DEPLOY ỨNG DỤNG ==="

# Kiểm tra quyền root/sudo
if [[ $EUID -ne 0 ]]; then
   echo "Lỗi: Script này phải chạy với quyền sudo hoặc root!" >&2
   exit 1
fi

# Tạo thư mục backup nếu chưa tồn tại
mkdir -p "$BACKUP_DIR"

# Sao lưu mã nguồn hiện tại
tar -czf "$BACKUP_DIR/backup_\${TIMESTAMP}.tar.gz" -C "$APP_DIR" .
echo "✓ Sao lưu thành công: backup_\${TIMESTAMP}.tar.gz"

# Kéo code mới và cài đặt thư viện
cd "$APP_DIR"
git pull origin main
npm ci --production
npm run build

# Khởi động lại service
systemctl reload production-app
systemctl reload nginx

echo "=== [$(date)] DEPLOY HOÀN TẤT THÀNH CÔNG ==="`
        },
        proTip: 'Luôn luôn kiểm tra cú pháp script trước khi chạy trên server thật bằng lệnh: `bash -n script.sh` hoặc cài đặt công cụ phân tích tĩnh `shellcheck`.'
      }
    ],
    practicalCommands: [
      {
        tool: 'Vim / Nano',
        title: 'Các phím tắt sinh tồn trong trình soạn thảo Vim',
        command: `i : Chuyển sang chế độ gõ (Insert Mode)\nEsc : Thoát về chế độ lệnh (Normal Mode)\n:wq : Lưu và thoát (Write & Quit)\n:q! : Thoát ép buộc không lưu (Quit without saving)\n/keyword : Tìm kiếm từ khóa\ndd : Xóa 1 dòng | yy : Copy 1 dòng | p : Paste`,
        description: 'Kỹ năng bắt buộc phải thành thạo khi cấu hình server qua SSH từ xa'
      }
    ],
    masteryChecklist: [
      'Thành thạo điều hướng luồng dữ liệu 0, 1, 2, gộp luồng `2>&1` và ném vào `/dev/null`',
      'Phối hợp nhịp nhàng grep, sed, awk, sort, uniq để trích xuất mọi thông tin log',
      'Áp dụng cờ `set -euo pipefail` trong 100% script Bash tự động hóa'
    ]
  },
  {
    id: 'linux-chap-3-users-security-hardening',
    chapterNumber: 3,
    title: 'Quản Lý Người Dùng, Phân Quyền & Bảo Mật Hệ Thống Cốt Lõi',
    subtitle: 'Nắm vững chmod bát phân, SUID/SGID/Sticky Bit, Sudoers, SSH Key Hardening (ED25519), UFW Firewall, Fail2ban và SELinux',
    category: 'user_security_permissions',
    readTimeMinutes: 25,
    level: 'Nâng cao',
    summary: 'Cẩm nang thiết lập bảo mật máy chủ Linux chuẩn phòng thủ doanh nghiệp: loại bỏ đăng nhập mật khẩu, khóa cổng SSH với ED25519, phân quyền tệp tin chính xác, thiết lập tường lửa UFW và tự động khóa IP tấn công với Fail2ban.',
    sections: [
      {
        heading: '1. Quản Lý Người Dùng, Nhóm & Phân Quyền Bát Phân (Octal chmod)',
        subheading: 'Hiểu sâu chuỗi rwx, mã hóa số và quyền đặc biệt SUID/SGID/Sticky Bit',
        content: 'Mọi tệp tin trong Linux thuộc về 1 Chủ sở hữu (Owner) và 1 Nhóm (Group). Quyền truy cập gồm 3 khối: [Owner] [Group] [Others]:',
        bulletPoints: [
          'Giá trị số: Đọc `r = 4`, Ghi `w = 2`, Thực thi `x = 1`. Tổng giá trị tối đa là `7`.',
          '`chmod 755 script.sh`: Owner có toàn quyền (7), Group và Others chỉ được đọc & chạy (5). Áp dụng chuẩn cho thư mục và file binary.',
          '`chmod 644 config.conf`: Owner được đọc & ghi (6), Group và Others chỉ được đọc (4). Áp dụng chuẩn cho tệp cấu hình.',
          '`chmod 600 id_ed25519`: Chỉ duy nhất Owner được đọc & ghi, cấm hoàn toàn người khác. Bắt buộc cho SSH Private Key!',
          'SUID (SetUID - 4000): Cho phép người chạy file thực thi tạm thời mượn quyền của Owner (ví dụ lệnh `/usr/bin/passwd`).',
          'SGID (SetGID - 2000): Tệp mới tạo trong thư mục sẽ tự động kế thừa Group của thư mục cha.',
          'Sticky Bit (1000): Áp dụng cho thư mục chia sẻ như `/tmp` (`chmod 1777 /tmp`) — bất kỳ ai cũng ghi được, nhưng CHỈ CHỦ SỞ HỮU mới có quyền xóa file của mình.'
        ],
        diagramType: 'linux-permissions'
      },
      {
        heading: '2. Cẩm Nang Khóa Chặt Bảo Mật SSH (SSH Server Hardening)',
        subheading: 'Quy trình chuẩn hóa bảo mật bắt buộc ngay sau khi khởi tạo bất kỳ VPS/EC2 nào',
        content: '99% các cuộc tấn công quét mạng Internet nhắm vào cổng SSH mặc định (Port 22) bằng mật khẩu. Dưới đây là 5 bước khóa cứng SSH Server:',
        codeBlock: {
          language: 'ini',
          title: 'Cấu hình an toàn tại /etc/ssh/sshd_config',
          code: `# 1. Đổi cổng mặc định tránh bot quét tự động (ví dụ sang 2222 hoặc giữ 22 nếu có Security Group)
Port 2222

# 2. Tuyệt đối CẤM đăng nhập trực tiếp bằng tài khoản root
PermitRootLogin no

# 3. Tuyệt đối CẤM xác thực bằng mật khẩu (Chỉ cho phép SSH Key)
PasswordAuthentication no
PermitEmptyPasswords no

# 4. Giới hạn số lần thử sai trước khi ngắt kết nối
MaxAuthTries 3

# 5. Chỉ cho phép các user cụ thể được phép SSH vào server
AllowUsers devops-admin deployer

# 6. Tắt chuyển tiếp X11 không cần thiết
X11Forwarding no`
        },
        warningNote: 'Trước khi khởi động lại dịch vụ SSH (`systemctl restart sshd`), HÃY MỞ THÊM 1 CỬA SỔ TERMINAL MỚI để kiểm tra kết nối SSH thử nghiệm. Không bao giờ đóng cửa sổ hiện tại để phòng trường hợp cấu hình sai bị khóa ngoài (Lockout)!'
      },
      {
        heading: '3. Thiết Lập Tường Lửa UFW & Ngăn Chặn Brute-Force Với Fail2ban',
        subheading: 'Xây dựng lá chắn 2 lớp bảo vệ máy chủ 24/7',
        content: 'Tường lửa kiểm soát các cổng vào/ra, trong khi Fail2ban liên tục quét nhật ký log để tự động thêm luật cấm (ban) các IP đáng ngờ:',
        codeBlock: {
          language: 'bash',
          title: 'Cài đặt và kích hoạt UFW + Fail2ban trên Ubuntu',
          code: `# 1. Cấu hình UFW Firewall
sudo ufw default deny incoming    # Chặn toàn bộ kết nối đi vào
sudo ufw default allow outgoing   # Cho phép toàn bộ kết nối đi ra
sudo ufw allow 2222/tcp comment 'Custom SSH'
sudo ufw allow 80/tcp comment 'HTTP Web'
sudo ufw allow 443/tcp comment 'HTTPS Web'
sudo ufw enable                   # Kích hoạt tường lửa

# 2. Cài đặt Fail2ban tự động ban IP dò mật khẩu
sudo apt update && sudo apt install -y fail2ban
sudo systemctl enable --now fail2ban

# Kiểm tra trạng thái các IP bị bắt giữ (Jail)
sudo fail2ban-client status sshd`
        }
      }
    ],
    practicalCommands: [
      {
        tool: 'ssh-keygen',
        title: 'Tạo cặp khóa SSH chuẩn mật mã hiện đại ED25519',
        command: `ssh-keygen -t ed25519 -C "admin@company.com"\nssh-copy-id -i ~/.ssh/id_ed25519.pub -p 2222 devops-admin@server-ip`,
        description: 'Tạo khóa ED25519 nhanh hơn, an toàn hơn và ngắn hơn nhiều so với chuẩn cũ RSA 4096'
      }
    ],
    masteryChecklist: [
      'Hiểu và tính toán chính xác quyền Octal (755, 644, 600, 1777)',
      'Cấu hình `sshd_config` vô hiệu hóa Password Auth và Root Login',
      'Triển khai tường lửa UFW và Fail2ban bảo vệ cổng mạng máy chủ'
    ]
  },
  {
    id: 'linux-chap-4-process-systemd-cron',
    chapterNumber: 4,
    title: 'Tiến Trình, Quản Lý Dịch Vụ Systemd & Tự Động Hóa Cron',
    subtitle: 'Làm chủ PID, các tín hiệu Kill Signals (SIGTERM vs SIGKILL), tạo Systemd Service chuẩn Production với Auto-Restart và đặt lịch tác vụ định kỳ',
    category: 'process_systemd_cron',
    readTimeMinutes: 22,
    level: 'Trung cấp',
    summary: 'Làm chủ vòng đời tiến trình trên Linux: từ cấu trúc cây Process Tree (PID 1), gửi tín hiệu điều khiển tiến trình, viết Unit File Systemd bảo đảm ứng dụng tự hồi sinh khi crash, đến quản trị nhật ký journalctl và lập lịch cron.',
    sections: [
      {
        heading: '1. Vòng Đời Tiến Trình (Process Lifecycle) & Các Tín Hiệu Kill Signals',
        subheading: 'Hiểu rõ sự khác biệt giữa dừng an toàn (Graceful) và hủy diệt tức thì',
        content: 'Mọi chương trình chạy trên Linux đều là một Process có một số định danh duy nhất (PID). Tiến trình mẹ khởi tạo tiến trình con qua syscall `fork()` và `exec()`.',
        bulletPoints: [
          'PID 1 (Systemd / Init): Tiến trình đầu tiên của hệ thống, là "tổ phụ" sinh ra và nhận nuôi tất cả các tiến trình khác.',
          'Zombie Process: Tiến trình con đã kết thúc nhưng tiến trình cha chưa đọc mã thoát (Exit code). Chiếm một slot trong bảng PID nhưng không tốn RAM/CPU.',
          '`SIGTERM (15)`: Tín hiệu yêu cầu dừng lịch sự (Graceful Shutdown). Ứng dụng có thời gian đóng kết nối DB, hoàn tất transaction đang dở rồi mới thoát. LUÔN DÙNG ĐẦU TIÊN!',
          '`SIGKILL (9)`: Tín hiệu hủy diệt ngay lập tức bởi Kernel. Ứng dụng không có cơ hội dọn dẹp tài nguyên. CHỈ DÙNG KHI TIẾN TRÌNH BỊ TREO HOÀN TOÀN KHÔNG PHẢN HỒI!',
          '`SIGHUP (1)`: Tín hiệu yêu cầu tiến trình nạp lại tệp cấu hình mà không cần khởi động lại (Zero-downtime reload như `systemctl reload nginx`).'
        ]
      },
      {
        heading: '2. Tự Tạo Systemd Service Chuẩn Production',
        subheading: 'Đảm bảo ứng dụng Web/API (Node.js, Python, Go, Java) luôn chạy nền 24/7 và tự khởi động lại khi crash',
        content: 'Thời đại của các script init.d cũ kỹ đã qua. Systemd là tiêu chuẩn quản lý dịch vụ hiện đại trên 99% bản phân phối Linux.',
        codeBlock: {
          language: 'ini',
          title: 'Tạo file dịch vụ: /etc/systemd/system/my-api.service',
          code: `[Unit]
Description=Production Node.js Backend API Service
After=network.target postgresql.service redis.service
Wants=postgresql.service

[Service]
Type=simple
# Chạy dưới user riêng biệt để bảo mật, TUYỆT ĐỐI KHÔNG CHẠY DƯỚI ROOT
User=deployer
Group=deployer
WorkingDirectory=/var/www/my-api

# Nạp file biến môi trường bí mật
EnvironmentFile=/var/www/my-api/.env
ExecStart=/usr/bin/node /var/www/my-api/dist/server.js

# Cơ chế tự động hồi sinh khi bị Crash
Restart=always
RestartSec=5s

# Giới hạn tài nguyên để bảo vệ server không bị nghẽn
LimitNOFILE=65535
MemoryMax=1G
CPUQuota=150%

# Cấu hình log gửi thẳng vào Systemd Journal
StandardOutput=journal
StandardError=journal
SyslogIdentifier=my-api

[Install]
WantedBy=multi-user.target

# Lệnh kích hoạt và quản lý Service:
# sudo systemctl daemon-reload
# sudo systemctl enable --now my-api
# sudo systemctl status my-api
# sudo journalctl -u my-api -f -n 50`
        }
      },
      {
        heading: '3. Quản Trị Tác Vụ Tự Động Hóa Định Kỳ Với Crontab',
        subheading: 'Cú pháp 5 ngôi sao huyền thoại của Cron',
        content: 'Bảng Crontab quy định thời gian chạy script định kỳ theo định dạng: `Phút Giờ Ngày_trong_tháng Tháng Ngày_trong_tuần (0-6)`',
        bulletPoints: [
          '`0 2 * * * /opt/scripts/backup-db.sh`: Chạy sao lưu vào đúng 2:00 sáng mỗi ngày.',
          '`*/15 * * * * /opt/scripts/health-check.sh`: Chạy kiểm tra hệ thống mỗi 15 phút một lần.',
          '`0 0 1 * * /opt/scripts/monthly-report.sh`: Chạy vào lúc 0:00 ngày đầu tiên của mỗi tháng.',
          '`@reboot /opt/scripts/on-boot-init.sh`: Chạy đúng 1 lần ngay sau khi máy chủ khởi động.'
        ],
        proTip: 'Khi viết lệnh trong Crontab, LUÔN LUÔN DÙNG ĐƯỜNG DẪN TUYỆT ĐỐI (ví dụ: `/usr/bin/python3 /opt/app/main.py`) vì môi trường biến $PATH của Cron rất hạn chế!'
      }
    ],
    practicalCommands: [
      {
        tool: 'journalctl',
        title: 'Truy vấn nhật ký lỗi dịch vụ nâng cao trong journalctl',
        command: `journalctl -u my-api --since "today" -p err\njournalctl -u nginx --since "1 hour ago" --no-pager`,
        description: 'Lọc nhanh các bản ghi log có mức độ nghiêm trọng từ Error (-p err) trở lên'
      }
    ],
    masteryChecklist: [
      'Phân biệt rõ ràng khi nào dùng SIGTERM (15) và SIGKILL (9)',
      'Viết thành thạo Systemd Unit File với đầy đủ User isolation, Auto-restart và Resource Limits',
      'Sử dụng `journalctl` theo dõi log thời gian thực và quản trị tác vụ định kỳ qua Crontab'
    ]
  },
  {
    id: 'linux-chap-5-storage-fhs-lvm',
    chapterNumber: 5,
    title: 'Quản Trị Đĩa, Hệ Thống Tệp (FHS), LVM & Bộ Nhớ Ảo Swap',
    subtitle: 'Nắm vững Tiêu chuẩn cây thư mục Linux (FHS), Phân vùng đĩa (fdisk/parted), Hệ thống tệp ext4 vs XFS, Mở rộng ổ đĩa không cần tắt máy với LVM và tối ưu Swap',
    category: 'storage_fhs_lvm',
    readTimeMinutes: 24,
    level: 'Nâng cao',
    summary: 'Hiểu tường tận cấu trúc cây thư mục gốc Linux (/), kỹ thuật phân vùng ổ cứng, cơ chế Logical Volume Management (LVM) cho phép mở rộng dung lượng ổ đĩa trực tiếp khi đang chạy và cấu hình bộ nhớ ảo Swap chống sập RAM.',
    sections: [
      {
        heading: '1. Chuẩn Cây Thư Mục Linux (Filesystem Hierarchy Standard - FHS)',
        subheading: 'Tại sao Linux không có ổ đĩa C:\\, D:\\ và mọi thứ đều bắt đầu từ thư mục gốc / ?',
        content: 'Tất cả các thiết bị lưu trữ trong Linux đều được gắn kết (Mount) vào một cây thư mục phân cấp duy nhất:',
        bulletPoints: [
          '`/etc`: Nơi chứa toàn bộ tệp cấu hình toàn hệ thống (Nginx, SSH, Systemd, fstab).',
          '`/var`: Dữ liệu biến đổi liên tục — `/var/log` (nhật ký hệ thống), `/var/lib/postgresql` (dữ liệu database), `/var/www` (mã nguồn web).',
          '`/usr`: Chứa các phần mềm, tệp nhị phân binary của người dùng (`/usr/bin`, `/usr/lib`).',
          '`/home` & `/root`: Thư mục cá nhân của người dùng thường và quản trị viên root.',
          '`/tmp`: Thư mục chứa file tạm, tự động dọn dẹp định kỳ hoặc khi khởi động lại.',
          '`/proc` & `/sys`: Hệ thống tệp ảo (Virtual in-memory) phản ánh trạng thái trực tiếp của Kernel, RAM và phần cứng.',
          '`/dev`: Nơi biểu diễn các thiết bị phần cứng dạng tệp tin (`/dev/nvme0n1`, `/dev/sda`, `/dev/null`).'
        ]
      },
      {
        heading: '2. Logical Volume Management (LVM) & Mở Rộng Ổ Đĩa Trực Tiếp',
        subheading: 'Giải pháp cứu cánh khi phân vùng ổ đĩa server bị đầy mà không làm gián đoạn dịch vụ',
        content: 'LVM tạo ra một lớp trừu tượng hóa trên ổ đĩa vật lý, gồm 3 tầng: Physical Volume (PV) ➔ Volume Group (VG) ➔ Logical Volume (LV). Khi cần thêm dung lượng, chỉ cần cắm thêm ổ cứng mới và mở rộng LV tức thì!',
        codeBlock: {
          language: 'bash',
          title: 'Quy trình tăng dung lượng phân vùng LVM trên Linux',
          code: `# 1. Xem dung lượng các Volume Group và Logical Volume hiện tại
sudo vgs
sudo lvs

# 2. Tăng Logical Volume thêm 20GB (hoặc lấy 100% dung lượng trống còn lại: +100%FREE)
sudo lvextend -L +20G /dev/ubuntu-vg/ubuntu-lv

# 3. Mở rộng hệ thống tệp (Filesystem) để nhận dung lượng mới mà KHÔNG CẦN UNMOUNT:
# Dành cho định dạng ext4:
sudo resize2fs /dev/ubuntu-vg/ubuntu-lv

# Dành cho định dạng XFS (RHEL / Rocky / CentOS):
sudo xfs_growfs /`
        }
      },
      {
        heading: '3. Quản Trị Bộ Nhớ Ảo Swap & Tinh Chỉnh Kernel Swappiness',
        subheading: 'Lá chắn ngăn chặn máy chủ sập khi RAM bị chạm ngưỡng 100%',
        content: 'Swap là không gian trên ổ cứng SSD được dùng làm bộ nhớ mở rộng khi RAM vật lý bị đầy. Mặc dù Swap chậm hơn RAM hàng ngàn lần, nhưng nó giúp máy chủ không bị chết đứng và cho phép Kernel có thời gian xử lý.',
        codeBlock: {
          language: 'bash',
          title: 'Tạo Swapfile 4GB nhanh chóng trên Ubuntu / Debian',
          code: `# 1. Tạo file dung lượng 4GB
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile

# 2. Định dạng file thành vùng nhớ Swap và kích hoạt
sudo mkswap /swapfile
sudo swapon /swapfile

# 3. Ghi vào /etc/fstab để tự động kích hoạt lại khi khởi động lại máy
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 4. Tinh chỉnh swappiness (Giá trị từ 0 - 100, khuyên dùng 10 cho Server)
# Swappiness = 10 nghĩa là Kernel chỉ đẩy dữ liệu sang Swap khi RAM còn trống dưới 10%
sudo sysctl vm.swappiness=10
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf`
        }
      }
    ],
    practicalCommands: [
      {
        tool: 'df / du / lsof',
        title: 'Truy tìm nguyên nhân ổ cứng báo đầy 100% bí ẩn',
        command: `df -h\nncdu /var/log\nsudo lsof +L1`,
        description: 'Lệnh `lsof +L1` giúp tìm các file đã bị xóa bằng `rm` nhưng tiến trình đang chạy vẫn giữ mở kết nối chiếm dụng ổ cứng'
      }
    ],
    masteryChecklist: [
      'Ghi nhớ vị trí các thư mục quan trọng trong chuẩn FHS (/etc, /var, /proc, /dev)',
      'Thành thạo mở rộng dung lượng phân vùng đĩa trực tiếp với LVM và `resize2fs` / `xfs_growfs`',
      'Tạo Swapfile và tối ưu hóa thông số `vm.swappiness` cho máy chủ'
    ]
  },
  {
    id: 'linux-chap-6-networking-ssh-remote',
    chapterNumber: 6,
    title: 'Mạng Máy Chủ, Quản Trị Từ Xa, SSH Tunnel & Khắc Phục Sự Cố Network',
    subtitle: 'Làm chủ ip route, ss, netstat, DNS resolving, cẩm nang gỡ rối mạng (tcpdump, mtr, curl) và thiết lập SSH Bastion Host / Port Forwarding',
    category: 'networking_remote_ssh',
    readTimeMinutes: 24,
    level: 'Nâng cao',
    summary: 'Cẩm nang toàn diện về mạng máy chủ Linux: quản trị địa chỉ IP, bảng định tuyến, kiểm tra cổng mạng đang lắng nghe bằng `ss -tulpn`, kỹ thuật bắt gói tin `tcpdump` và thiết lập đường hầm bảo mật SSH Tunnels kết nối Private Database an toàn.',
    sections: [
      {
        heading: '1. Kiểm Tra & Quản Trị Cổng Mạng Lắng Nghe (Port & Socket Auditing)',
        subheading: 'Thay thế các lệnh cũ netstat bằng công cụ hiện đại `ss` (Socket Statistics)',
        content: 'Một kỹ năng phản xạ của mọi Sysadmin khi triển khai dịch vụ mới là kiểm tra xem tiến trình đã lắng nghe (Listen) trên cổng mong muốn và IP nào:',
        bulletPoints: [
          '`ss -tulpn`: Xem toàn bộ cổng TCP (t), UDP (u), trạng thái Listen (l), Process ID và tên chương trình (p), không phân giải tên miền (n).',
          '`0.0.0.0:80` hoặc `[::]:80`: Đang lắng nghe trên TOÀN BỘ các card mạng (Public Internet có thể kết nối vào).',
          '`127.0.0.1:5432`: Chỉ lắng nghe cục bộ (Localhost). Người ngoài Internet không thể chạm tới Database trực tiếp — cấu hình bảo mật chuẩn!',
          '`lsof -i :80`: Xem chính xác tiến trình nào đang chiếm dụng cổng 80 để xử lý xung đột `Address already in use`.'
        ]
      },
      {
        heading: '2. Kỹ Thuật SSH Tunneling & Bastion Host (Jump Server)',
        subheading: 'Truy cập Database riêng tư (Private Subnet) từ máy cá nhân qua đường hầm mã hóa an toàn 100%',
        content: 'Trong kiến trúc AWS chuẩn, Database nằm trong Private Subnet không có Public IP. Để kết nối từ máy Dev (DBeaver, DataGrip, pgAdmin), ta dùng SSH Tunnel qua máy chủ trung gian Bastion:',
        codeBlock: {
          language: 'bash',
          title: 'Cú pháp SSH Local Port Forwarding (-L)',
          code: `# Cú pháp: ssh -L [Local_Port]:[Private_DB_Host]:[Remote_DB_Port] [User]@[Bastion_Public_IP] -i [Key.pem]
# Ví dụ: Mở cổng 5433 trên máy cá nhân nối thẳng vào Postgres (10.0.2.50:5432) trong mạng nội bộ AWS
ssh -N -L 5433:10.0.2.50:5432 -i ~/.ssh/bastion-key.pem ec2-user@bastion.company.com

# Sau đó, trên máy cá nhân bạn chỉ cần kết nối tới: localhost:5433 !
#
# Mẹo Pro: Tự động hóa qua ~/.ssh/config:
# Host bastion
#   HostName bastion.company.com
#   User ec2-user
#   IdentityFile ~/.ssh/bastion-key.pem
#
# Host prod-db-server
#   HostName 10.0.2.50
#   User ubuntu
#   IdentityFile ~/.ssh/db-key.pem
#   ProxyJump bastion`
        }
      },
      {
        heading: '3. Bộ Công Cụ Gỡ Rối Mạng (Network Troubleshooting Arsenal)',
        subheading: 'Phương pháp cô lập sự cố mạng từ tầng vật lý lên tầng ứng dụng (OSI)',
        content: 'Khi ứng dụng không kết nối được tới dịch vụ khác, hãy kiểm tra theo trình tự 4 bước:',
        bulletPoints: [
          'Bước 1: `ping 8.8.8.8` (Kiểm tra tầng IP/ICMP) ➔ Nếu tạch, kiểm tra Default Gateway (`ip route`).',
          'Bước 2: `nslookup db.internal` hoặc `dig +short example.com` (Kiểm tra DNS) ➔ Nếu tạch, kiểm tra `/etc/resolv.conf`.',
          'Bước 3: `nc -zv 10.0.2.50 5432` hoặc `curl -Iv https://api.example.com` (Kiểm tra cổng TCP và Tường lửa).',
          'Bước 4: `sudo tcpdump -i eth0 port 443 -nn -c 10` (Bắt gói tin kiểm tra xem gói có thực sự chạm tới card mạng hay bị Drop).'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'ss / curl / dig',
        title: 'Các lệnh kiểm tra trạng thái mạng thường dùng nhất',
        command: `ss -tulpn | grep -E "80|443|5432|6379"\ncurl -Iv https://example.com --resolve example.com:443:127.0.0.1\ndig +trace example.com`,
        description: 'Kiểm tra port lắng nghe, test phản hồi web bỏ qua DNS và truy vết từng bước phân giải tên miền'
      }
    ],
    masteryChecklist: [
      'Đọc hiểu thành thạo kết quả của lệnh `ss -tulpn` (0.0.0.0 vs 127.0.0.1)',
      'Thiết lập SSH Local Port Forwarding và ProxyJump kết nối server nội bộ',
      'Thực hiện quy trình 4 bước cô lập lỗi mạng từ Ping đến DNS và TCP Port'
    ]
  },
  {
    id: 'linux-chap-7-web-app-docker-stack',
    chapterNumber: 7,
    title: 'Cấu Hình & Triển Khai Server Web (Nginx), App Runtimes & Docker',
    subtitle: 'Triển khai Web Server Nginx tối ưu, Quản lý tiến trình ứng dụng Node.js (PM2), Python (Gunicorn/FastAPI), Docker Daemon CE và Log Rotation',
    category: 'web_app_docker_servers',
    readTimeMinutes: 26,
    level: 'Chuyên gia',
    summary: 'Xây dựng ngăn xếp ứng dụng hoàn chỉnh trên Linux: Cấu hình Nginx làm Reverse Proxy và SSL Termination, chạy Node.js/Python đa luồng với PM2/Systemd, và làm chủ Docker Engine với cgroups giới hạn tài nguyên và log-driver chống đầy ổ đĩa.',
    sections: [
      {
        heading: '1. Nginx Production Reverse Proxy & SSL Automation',
        subheading: 'Cấu hình hoàn chỉnh phục vụ Web SPA + API Backend + Chứng chỉ Let\'s Encrypt',
        content: 'Nginx đóng vai trò là cửa ngõ duy nhất tiếp nhận lưu lượng HTTPS ngoài Internet (Port 443), giải mã SSL và điều hướng vào cổng nội bộ của App:',
        codeBlock: {
          language: 'nginx',
          title: '/etc/nginx/sites-available/app.conf',
          code: `upstream app_backend {
    server 127.0.0.1:3000 max_fails=3 fail_timeout=10s;
    keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name mybrand.com www.mybrand.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name mybrand.com www.mybrand.com;

    # SSL Certificates (Tự động cấp phát bởi Certbot)
    ssl_certificate /etc/letsencrypt/live/mybrand.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mybrand.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;

    # Static Assets Caching
    location /static/ {
        alias /var/www/mybrand/dist/static/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Reverse Proxy to Node.js / Python API
    location / {
        proxy_pass http://app_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }
}`
        }
      },
      {
        heading: '2. Quản Lý Runtimes Ứng Dụng: Node.js (PM2) & Python (Gunicorn/Uvicorn)',
        subheading: 'Tận dụng 100% năng lực CPU đa lõi của máy chủ',
        content: 'Mặc định Node.js và Python chạy trên đơn luồng (Single-thread). Để tận dụng máy chủ 4 core hay 8 core, ta cần chạy Cluster Mode:',
        bulletPoints: [
          'Node.js với PM2: `pm2 start app.js -i max --name "prod-api"` (Tự động sinh ra số lượng worker bằng số core CPU).',
          'Lưu trạng thái PM2 khi reboot: `pm2 save && pm2 startup systemd`.',
          'Python FastAPI / Django với Gunicorn + Uvicorn: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 127.0.0.1:8000`.'
        ]
      },
      {
        heading: '3. Docker Daemon Production Hardening & Giới Hạn Log Tránh Tràn Ổ',
        subheading: 'Lỗi kinh điển khiến hàng ngàn server Linux bị treo ổ đĩa do log Docker không xoay vòng',
        content: 'Mặc định Docker ghi log container dạng file JSON không giới hạn dung lượng (`json-file`), dẫn đến việc ổ cứng bị đầy 100% sau vài tháng. Cấu hình bắt buộc ngay sau khi cài Docker:',
        codeBlock: {
          language: 'json',
          title: 'Cấu hình bắt buộc tại /etc/docker/daemon.json',
          code: `{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "50m",
    "max-file": "3"
  },
  "live-restore": true,
  "storage-driver": "overlay2"
}`
        },
        proTip: 'Cờ `"live-restore": true` cho phép các Docker Container vẫn tiếp tục chạy bình thường ngay cả khi bạn khởi động lại Docker Daemon (`systemctl restart docker`)!'
      }
    ],
    practicalCommands: [
      {
        tool: 'Certbot / Docker',
        title: 'Cấp chứng chỉ SSL miễn phí và kiểm tra tài nguyên Docker',
        command: `sudo certbot --nginx -d mybrand.com -d www.mybrand.com\ndocker stats --no-stream\ndocker system prune -af --volumes`,
        description: 'Tự động cấu hình HTTPS cho Nginx và dọn dẹp toàn bộ container rác, images không dùng để giải phóng ổ cứng'
      }
    ],
    masteryChecklist: [
      'Viết thành thạo Nginx reverse proxy với HTTP/2, Gzip, SSL và WebSocket upgrade',
      'Triển khai ứng dụng Node.js/Python đa luồng với PM2 và Systemd',
      'Cấu hình log rotation cho Docker daemon tại `/etc/docker/daemon.json`'
    ]
  },
  {
    id: 'linux-chap-8-database-server-tuning',
    chapterNumber: 8,
    title: 'Cấu Hình & Tối Ưu Hóa Server Cơ Sở Dữ Liệu Trên Linux',
    subtitle: 'Tinh chỉnh Kernel sysctl.conf, Giới hạn tài nguyên limits.conf (nofile 65535), Transparent Huge Pages và Script tự động sao lưu Database đẩy lên S3/R2',
    category: 'database_tuning_linux',
    readTimeMinutes: 25,
    level: 'Chuyên gia',
    summary: 'Biến một server Linux tiêu chuẩn thành một cỗ máy xử lý Database hiệu năng cực cao: tinh chỉnh thông số nhân Kernel (`sysctl.conf`), nâng giới hạn file descriptors `limits.conf`, xử lý lỗi Transparent Huge Pages của Redis và viết script backup tự động có xoay vòng lưu trữ.',
    sections: [
      {
        heading: '1. Tinh Chỉnh Kernel Linux Dành Riêng Cho Database (sysctl.conf)',
        subheading: 'Mở rộng hàng đợi mạng, chống nghẽn kết nối TCP và quản lý bộ nhớ đệm',
        content: 'Cấu hình mặc định của Linux được thiết kế cho máy tính cá nhân hoặc tác vụ nhẹ. Khi chạy PostgreSQL, MySQL hoặc Redis với hàng ngàn kết nối đồng thời, ta cần mở rộng các thông số nhân:',
        codeBlock: {
          language: 'ini',
          title: 'Thêm vào file /etc/sysctl.conf và áp dụng bằng `sudo sysctl -p`',
          code: `# 1. Mở rộng hàng đợi kết nối TCP chống rớt request khi tải tăng vọt
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535

# 2. Tái sử dụng nhanh các kết nối TCP đang ở trạng thái TIME_WAIT
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_fin_timeout = 15

# 3. Tối ưu bộ nhớ ảo cho Redis / PostgreSQL
# vm.overcommit_memory = 1: Cho phép Redis fork background saving (BGSAVE) không bị báo lỗi thiếu RAM
vm.overcommit_memory = 1

# 4. Giảm swappiness để Database ưu tiên tối đa RAM vật lý
vm.swappiness = 10

# 5. Tăng số lượng theo dõi file đồng thời cho Elasticsearch / Node
fs.file-max = 2097152`
        }
      },
      {
        heading: '2. Nâng Giới Hạn Tệp Tin (File Descriptors) Tại limits.conf',
        subheading: 'Khắc phục triệt để lỗi kinh hoàng: "Too many open files (EMFILE)"',
        content: 'Trong Linux "Everything is a file", mỗi kết nối TCP mạng từ Client tới Database đều tiêu tốn 1 File Descriptor (FD). Mặc định Linux chỉ cho phép 1024 FD/user, khiến DB bị từ chối kết nối khi đạt trên 1,000 kết nối:',
        codeBlock: {
          language: 'ini',
          title: 'Thêm vào file /etc/security/limits.conf',
          code: `* soft nofile 65535
* hard nofile 65535
* soft nproc 32768
* hard nproc 32768
postgres soft nofile 65535
postgres hard nofile 65535
mysql soft nofile 65535
mysql hard nofile 65535`
        }
      },
      {
        heading: '3. Script Tự Động Sao Lưu PostgreSQL / MySQL & Đẩy Lên AWS S3 / Cloudflare R2',
        subheading: 'Chính sách sao lưu 3-2-1 với cơ chế xoay vòng giữ 7 bản hàng ngày, 4 bản hàng tuần',
        content: 'Mã nguồn script sao lưu tự động hoàn chỉnh, nén tệp bằng `gzip` và đồng bộ an toàn lên Cloud Storage:',
        codeBlock: {
          language: 'bash',
          title: '/opt/scripts/backup-database-s3.sh',
          code: `#!/usr/bin/env bash
set -euo pipefail

# Cấu hình
DB_NAME="production_db"
DB_USER="postgres"
BACKUP_DIR="/var/backups/postgres"
S3_BUCKET="s3://company-secure-db-backups/postgres"
DATE=$(date +"%Y%m%d_%H%M%S")
FILENAME="db_\${DB_NAME}_\${DATE}.sql.gz"

mkdir -p "$BACKUP_DIR"

echo "=== [$(date)] BẮT ĐẦU DUMP DATABASE: \${DB_NAME} ==="

# Thực hiện pg_dump và nén trực tiếp qua gzip
pg_dump -U "$DB_USER" -d "$DB_NAME" | gzip > "$BACKUP_DIR/$FILENAME"

echo "✓ Dump hoàn tất: $FILENAME (Kích thước: $(du -sh "$BACKUP_DIR/$FILENAME" | awk '{print $1}'))"

# Đẩy lên AWS S3 hoặc Cloudflare R2 qua AWS CLI
aws s3 cp "$BACKUP_DIR/$FILENAME" "$S3_BUCKET/$FILENAME" --storage-class STANDARD_IA
echo "✓ Đã tải lên S3 thành công"

# Xóa các bản sao lưu cục bộ cũ hơn 7 ngày để tiết kiệm ổ đĩa
find "$BACKUP_DIR" -type f -name "db_*.sql.gz" -mtime +7 -exec rm -f {} \\;
echo "=== [$(date)] SAO LƯU THÀNH CÔNG VÀ AN TOÀN ==="`
        }
      }
    ],
    practicalCommands: [
      {
        tool: 'ulimit / sysctl',
        title: 'Kiểm tra giới hạn tài nguyên tiến trình và thông số Kernel đang hoạt động',
        command: `ulimit -n\nsysctl vm.overcommit_memory\nsysctl net.core.somaxconn`,
        description: 'Xác minh giá trị file descriptors mở rộng 65535 đã có hiệu lực thành công'
      }
    ],
    masteryChecklist: [
      'Cấu hình tối ưu `sysctl.conf` cho PostgreSQL, MySQL và Redis',
      'Nâng mức `nofile` lên 65535 tại `/etc/security/limits.conf` tránh lỗi Too Many Open Files',
      'Triển khai script sao lưu Database tự động nén gzip và đồng bộ định kỳ lên S3/R2'
    ]
  },
  {
    id: 'linux-chap-9-aws-ec2-administration',
    chapterNumber: 9,
    title: 'Quản Trị Linux Chuyên Sâu Trên AWS Cloud (EC2, EBS, SSM & CloudWatch)',
    subtitle: 'Làm chủ User Data Cloud-Init, Mở rộng ổ đĩa EBS trực tiếp không cần reboot (growpart), Đăng nhập Zero-Trust qua AWS Systems Manager SSM (không cần Port 22) và IAM Roles',
    category: 'aws_linux_administration',
    readTimeMinutes: 28,
    level: 'Chuyên gia',
    summary: 'Chinh phục toàn diện máy chủ Linux trên nền tảng AWS: Tự động hóa khởi tạo máy chủ với Cloud-Init User Data, thao tác gắn và mở rộng ổ đĩa EBS trực tiếp không ngắt quãng (`growpart`), truy cập terminal bảo mật tuyệt đối qua AWS Systems Manager Session Manager (không cần Public IP và Port 22), và cài đặt CloudWatch Unified Agent.',
    sections: [
      {
        heading: '1. Khởi Tạo Tự Động Hóa Với EC2 User Data & Cloud-Init',
        subheading: 'Máy chủ sẵn sàng phục vụ chỉ sau 60 giây khởi động đầu tiên',
        content: 'Khi khởi tạo EC2, đoạn script User Data sẽ được tiện ích `cloud-init` của Linux thực thi đúng một lần duy nhất dưới quyền root:',
        codeBlock: {
          language: 'bash',
          title: 'EC2 User Data Script (Amazon Linux 2023 / Ubuntu)',
          code: `#!/bin/bash
# Nâng cấp toàn bộ hệ thống
dnf update -y || apt-get update -y

# Cài đặt Nginx, Docker và Git
dnf install -y nginx docker git || apt-get install -y nginx docker.io git

# Khởi động và kích hoạt dịch vụ chạy nền
systemctl enable --now docker
systemctl enable --now nginx

# Thêm user mặc định vào nhóm docker để chạy không cần sudo
usermod -aG docker ec2-user || usermod -aG docker ubuntu

# Tạo trang chào mừng test
echo "<h1>Deployed via AWS EC2 User Data on $(hostname -f)</h1>" > /usr/share/nginx/html/index.html`
        }
      },
      {
        heading: '2. Mở Rộng Ổ Đĩa AWS EBS Trực Tiếp Trên Linux (Zero-Downtime EBS Resizing)',
        subheading: 'Quy trình tăng dung lượng ổ cứng từ AWS Console xuống hệ điều hành Linux mà không cần tắt máy chủ',
        content: 'Sau khi bạn tăng dung lượng EBS Volume trên AWS Console (ví dụ từ 20GB lên 50GB), Linux Kernel đã nhìn thấy đĩa vật lý to hơn nhưng phân vùng và filesystem bên trong chưa tự mở rộng. Đây là 2 lệnh hoàn tất:',
        codeBlock: {
          language: 'bash',
          title: 'Các lệnh thực thi trên Linux Server',
          code: `# 1. Kiểm tra cấu trúc ổ đĩa và phân vùng (ví dụ /dev/nvme0n1 và phân vùng 1 là /dev/nvme0n1p1)
lsblk

# 2. Mở rộng bảng phân vùng partition số 1 trên đĩa nvme0n1
sudo growpart /dev/nvme0n1 1

# 3. Mở rộng Hệ thống tệp (Filesystem) tương ứng:
# Nếu định dạng là ext4:
sudo resize2fs /dev/nvme0n1p1

# Nếu định dạng là XFS (Chuẩn mặc định Amazon Linux 2023 / RHEL):
sudo xfs_growfs -d /

# 4. Kiểm tra lại kết quả dung lượng mới
df -h /`
        }
      },
      {
        heading: '3. Truy Cập Terminal Zero-Trust Qua AWS SSM Session Manager',
        subheading: 'Vứt bỏ hoàn toàn việc mở cổng SSH (Port 22), không cần Public IP và không cần quản lý SSH Key',
        content: 'Chuẩn bảo mật cao nhất hiện nay của AWS là tắt hoàn toàn cổng SSH trên Security Group. Thay vào đó, quản trị viên kết nối trực tiếp vào Linux Terminal qua giao thức mã hóa AWS Systems Manager (SSM):',
        bulletPoints: [
          'Gắn IAM Role có policy `AmazonSSMManagedInstanceCore` vào máy chủ EC2.',
          'Cài đặt `amazon-ssm-agent` trên Linux (đã có sẵn trên Amazon Linux 2023 và Ubuntu AMI).',
          'Đăng nhập từ máy tính cá nhân bằng AWS CLI: `aws ssm start-session --target i-0123456789abcdef0`.',
          'Lợi ích tối thượng: Không thể bị quét cổng SSH, kiểm soát quyền truy cập qua IAM và toàn bộ lịch sử gõ lệnh được ghi nhật ký vào CloudWatch Logs / S3 để kiểm toán.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'AWS CLI + Linux',
        title: 'Xem Metadata máy chủ EC2 (IMDSv2) và kết nối SSM',
        command: `TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")\ncurl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/instance-id`,
        description: 'Lấy an toàn Instance ID và thông tin mạng của EC2 từ bên trong hệ điều hành Linux'
      }
    ],
    masteryChecklist: [
      'Tự động hóa cấu hình máy chủ khởi đầu bằng EC2 User Data script',
      'Thực hiện mở rộng dung lượng ổ đĩa EBS trực tiếp với `growpart` và `xfs_growfs` / `resize2fs`',
      'Thay thế quản trị SSH truyền thống bằng AWS Systems Manager (SSM) Session Manager'
    ]
  },
  {
    id: 'linux-chap-10-monitoring-troubleshooting-runbook',
    chapterNumber: 10,
    title: 'Giám Sát, Tối Ưu Hiệu Năng & Cẩm Nang Xử Lý Sự Cố Khẩn Cấp (Troubleshooting Runbook)',
    subtitle: 'Nắm vững 4 Golden Signals, Đọc hiểu Load Average, Bắt bệnh nghẽn I/O (iostat/vmstat), Cứu hộ sự cố OOM Killer và Quy trình ứng cứu sự cố máy chủ 6 bước',
    category: 'monitoring_troubleshooting',
    readTimeMinutes: 28,
    level: 'Chuyên gia',
    summary: 'Bộ cẩm nang thực chiến tối thượng của Kỹ sư Vận hành Hệ thống: từ giải mã chỉ số Load Average, chẩn đoán nghẽn đĩa và rò rỉ bộ nhớ, khám nghiệm hiện trường khi Linux Kernel OOM Killer tự hủy Database, đến Runbook 6 bước ứng cứu sự cố máy chủ khẩn cấp chuẩn SRE.',
    sections: [
      {
        heading: '1. Giải Mã Chỉ Số Tải (Load Average) & 4 Tín Hiệu Vàng (4 Golden Signals)',
        subheading: 'Load Average 5.0 trên máy 2 core khác gì trên máy 8 core?',
        content: 'Chỉ số `Load Average` (hiển thị 3 số tương ứng với trung bình 1 phút, 5 phút, 15 phút khi gõ lệnh `uptime` hoặc `w`) đo số lượng tiến trình đang cạnh tranh sử dụng CPU hoặc đang bị tắc nghẽn chờ I/O đĩa:',
        bulletPoints: [
          'Quy tắc vàng: Chia Load Average cho Tổng số Cores CPU. Nếu kết quả < 1.0 (ví dụ Load 3.0 trên máy 4 core = 0.75), server đang hoạt động an toàn.',
          'Nếu kết quả > 1.0 liên tục trong 15 phút: Hệ thống đang bị quá tải, tiến trình phải xếp hàng đợi đến lượt thực thi.',
          '4 Golden Signals (Google SRE): Độ trễ (Latency), Lưu lượng (Traffic), Lỗi (Errors), Độ bão hòa tài nguyên (Saturation).'
        ]
      },
      {
        heading: '2. Khám Nghiệm Sự Cố OOM Killer (Out Of Memory Killer)',
        subheading: 'Tại sao dịch vụ PostgreSQL / Java tự nhiên biến mất mà không báo lỗi trong log ứng dụng?',
        content: 'Khi toàn bộ RAM và Swap của hệ điều hành bị cạn kiệt 100%, Linux Kernel sẽ kích hoạt cơ chế sinh tồn khẩn cấp: OOM Killer. Kernel sẽ tính toán điểm phạt (`badness score`) và gửi `SIGKILL (9)` để khai trừ tiến trình chiếm nhiều RAM nhất nhằm giữ cho cả hệ điều hành không bị sập cứng!',
        codeBlock: {
          language: 'bash',
          title: 'Cách phát hiện và xác minh sự cố OOM Killer',
          code: `# Kiểm tra nhật ký Kernel xem có dấu vết OOM Killer hay không
sudo dmesg -T | grep -i -E "oom|out of memory|killed process"

# Xem điểm phạt OOM của một tiến trình đang chạy (ví dụ PID 1234)
cat /proc/1234/oom_score

# Bảo vệ một dịch vụ quan trọng (ví dụ PostgreSQL / SSH) không bao giờ bị OOM Killer chọn mặt gửi vàng:
# Thiết lập oom_score_adj = -1000 trong file Service Systemd (OOMScoreAdjust=-1000)`
        }
      },
      {
        heading: '3. Quy Trình Ứng Cứu Sự Cố Máy Chủ Khẩn Cấp 6 Bước (SRE Runbook)',
        subheading: 'Trình tự chẩn đoán chuẩn xác từng bước khi nhận thông báo Server Down lúc nửa đêm',
        content: 'Khi hệ thống gặp sự cố, đừng đoán mò hay khởi động lại bừa bãi. Hãy tuân thủ nghiêm ngặt 6 bước cô lập hiện trường:',
        bulletPoints: [
          'Bước 1 - Kết nối & Tải tổng thể: `uptime` và `w` (Kiểm tra Load Average và ai đang đăng nhập).',
          'Bước 2 - Kiểm tra Ổ cứng: `df -h` và `df -i` (Xem đĩa có bị đầy 100% dung lượng hoặc cạn kiệt Inodes hay không).',
          'Bước 3 - Kiểm tra Bộ nhớ: `free -h` (Xem RAM khả dụng Available và tình trạng chiếm dụng Swap).',
          'Bước 4 - Kiểm tra Tiến trình & CPU: `top -b -n 1 | head -20` (Xác định tiến trình nào đang chiếm 100% CPU hoặc rò rỉ RAM).',
          'Bước 5 - Kiểm tra Dịch vụ & Cổng mạng: `systemctl status [service]` và `ss -tulpn` (Kiểm tra dịch vụ có đang chạy và mở đúng port).',
          'Bước 6 - Truy vết Nhật ký lỗi: `journalctl -xe --since "30 min ago"` và `tail -f /var/log/nginx/error.log`.'
        ],
        proTip: 'Hãy in Runbook 6 bước này hoặc lưu vào cẩm nang nội bộ của team để luôn giữ được bình tĩnh và xử lý sự cố trong vòng dưới 3 phút!'
      }
    ],
    practicalCommands: [
      {
        tool: 'htop / vmstat / dmesg',
        title: 'Bộ ba lệnh thần tốc kiểm tra sức khỏe hệ thống',
        command: `vmstat 1 5\niostat -xz 1 5\nsudo dmesg -T --level=err,warn`,
        description: 'Quan sát chi tiết biến động CPU/Memory theo thời gian thực và lọc nhanh các cảnh báo lỗi phần cứng/nhân Linux'
      }
    ],
    masteryChecklist: [
      'Đọc hiểu và đánh giá chính xác chỉ số Load Average theo số core CPU',
      'Điều tra nguyên nhân và thiết lập cấu hình phòng chống OOM Killer cho Database',
      'Vận dụng thành thục Quy trình ứng cứu sự cố máy chủ 6 bước chuẩn SRE'
    ]
  }
];
