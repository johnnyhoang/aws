import { LinuxAdminCommandReference } from '../../types/linuxAdminModule';

export const LINUX_COMMAND_CHEAT_SHEET: LinuxAdminCommandReference[] = [
  // 1. Navigation & File Inspection
  {
    command: 'ls -laht',
    category: 'Tệp tin & Thư mục',
    syntax: 'ls -laht [đường_dẫn]',
    description: 'Liệt kê toàn bộ file ẩn, phân quyền chi tiết, kích thước human-readable (h) và sắp xếp theo thời gian mới nhất (t).',
    example: 'ls -laht /var/log',
    dangerLevel: 'safe'
  },
  {
    command: 'find',
    category: 'Tệp tin & Thư mục',
    syntax: 'find [path] -name [pattern] -size [size] -exec [cmd] {} \\;',
    description: 'Tìm kiếm tệp theo tên, kích thước, thời gian sửa đổi và thực thi lệnh trực tiếp trên kết quả tìm thấy.',
    example: 'find /var/log -type f -name "*.log" -mtime +30 -exec rm -f {} \\;',
    dangerLevel: 'caution'
  },
  {
    command: 'grep -rnI',
    category: 'Tìm kiếm & Xử lý văn bản',
    syntax: 'grep -rnI [từ_khóa] [thư_mục]',
    description: 'Tìm kiếm chuỗi đệ quy (r), hiển thị số dòng (n) và bỏ qua các file nhị phân binary (I).',
    example: 'grep -rnI "listen 80" /etc/nginx/',
    dangerLevel: 'safe'
  },
  {
    command: 'awk / sed',
    category: 'Tìm kiếm & Xử lý văn bản',
    syntax: "awk '{print $1, $4}' [file] | sed 's/old/new/g'",
    description: 'Trích xuất cột dữ liệu bằng AWK và thay thế chuỗi luồng văn bản bằng SED.',
    example: "cat /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -10",
    dangerLevel: 'safe'
  },

  // 2. Permissions & Security
  {
    command: 'chmod',
    category: 'Phân quyền & Bảo mật',
    syntax: 'chmod [octal/symbolic] [tệp/thư_mục]',
    description: 'Thay đổi quyền đọc (r=4), ghi (w=2), thực thi (x=1) cho Owner, Group, Others.',
    example: 'chmod 600 ~/.ssh/id_ed25519 && chmod 700 ~/.ssh',
    dangerLevel: 'caution'
  },
  {
    command: 'chown -R',
    category: 'Phân quyền & Bảo mật',
    syntax: 'chown -R [user]:[group] [thư_mục]',
    description: 'Thay đổi chủ sở hữu và nhóm sở hữu đệ quy cho toàn bộ thư mục và tệp con.',
    example: 'chown -R www-data:www-data /var/www/my-app',
    dangerLevel: 'caution'
  },
  {
    command: 'ufw / firewalld',
    category: 'Phân quyền & Bảo mật',
    syntax: 'ufw allow [port/service] / firewall-cmd --add-port=[port]/tcp --permanent',
    description: 'Cấu hình tường lửa cho phép hoặc chặn các cổng mạng.',
    example: 'ufw allow 22/tcp && ufw allow 80/tcp && ufw allow 443/tcp && ufw enable',
    dangerLevel: 'caution'
  },

  // 3. Process & Systemd
  {
    command: 'systemctl',
    category: 'Tiến trình & Systemd',
    syntax: 'systemctl [status|start|stop|restart|enable|disable] [service_name]',
    description: 'Quản lý trạng thái và tự động khởi động cùng hệ thống của các daemon service.',
    example: 'systemctl restart nginx && systemctl status nginx --no-pager',
    dangerLevel: 'safe'
  },
  {
    command: 'journalctl -u',
    category: 'Tiến trình & Systemd',
    syntax: 'journalctl -u [service_name] -f -n 100 --since "1 hour ago"',
    description: 'Xem nhật ký log thời gian thực (-f) của một dịch vụ systemd cụ thể.',
    example: 'journalctl -u postgresql -f -p err',
    dangerLevel: 'safe'
  },
  {
    command: 'ps aux | grep',
    category: 'Tiến trình & Systemd',
    syntax: 'ps aux | grep [process_name]',
    description: 'Liệt kê danh sách các tiến trình đang chạy và lọc theo tên.',
    example: 'ps aux | grep node',
    dangerLevel: 'safe'
  },
  {
    command: 'kill / pkill',
    category: 'Tiến trình & Systemd',
    syntax: 'kill -15 [PID] / kill -9 [PID] / pkill -f [name]',
    description: 'Gửi tín hiệu dừng graceful (SIGTERM 15) hoặc buộc dừng khẩn cấp (SIGKILL 9).',
    example: 'pkill -15 -f "python manage.py"',
    dangerLevel: 'caution'
  },

  // 4. Disk, Storage & Memory
  {
    command: 'df -h',
    category: 'Ổ đĩa & Bộ nhớ',
    syntax: 'df -hT',
    description: 'Xem dung lượng ổ cứng còn trống của tất cả các phân vùng kèm định dạng tệp (ext4, xfs).',
    example: 'df -hT',
    dangerLevel: 'safe'
  },
  {
    command: 'du -sh *',
    category: 'Ổ đĩa & Bộ nhớ',
    syntax: 'du -sh [thư_mục]/* | sort -hr | head -10',
    description: 'Tính toán dung lượng từng thư mục và liệt kê 10 mục chiếm nhiều dung lượng nhất.',
    example: 'du -sh /var/log/* | sort -hr | head -10',
    dangerLevel: 'safe'
  },
  {
    command: 'free -m / -h',
    category: 'Ổ đĩa & Bộ nhớ',
    syntax: 'free -h',
    description: 'Xem chi tiết dung lượng RAM (Total, Used, Free, Buffers/Cache, Available) và Swap.',
    example: 'free -h',
    dangerLevel: 'safe'
  },
  {
    command: 'lsblk / blkid',
    category: 'Ổ đĩa & Bộ nhớ',
    syntax: 'lsblk -f',
    description: 'Xem cấu trúc cây phân vùng ổ đĩa (EBS/NVMe), UUID và điểm gắn kết Mount point.',
    example: 'lsblk -f',
    dangerLevel: 'safe'
  },

  // 5. Networking & Ports
  {
    command: 'ss -tulpn',
    category: 'Mạng & Kết nối',
    syntax: 'ss -tulpn',
    description: 'Liệt kê tất cả các cổng TCP/UDP đang lắng nghe (Listen) cùng Process ID (PID) tương ứng.',
    example: 'ss -tulpn | grep :80',
    dangerLevel: 'safe'
  },
  {
    command: 'curl -Iv',
    category: 'Mạng & Kết nối',
    syntax: 'curl -Iv https://[domain_or_ip]',
    description: 'Kiểm tra chi tiết kết nối HTTP/HTTPS, SSL Handshake và phản hồi Headers từ máy chủ.',
    example: 'curl -Iv https://example.com -k',
    dangerLevel: 'safe'
  },
  {
    command: 'tcpdump',
    category: 'Mạng & Kết nối',
    syntax: 'tcpdump -i [interface] port [port] -nn -vv',
    description: 'Bắt và phân tích gói tin mạng (Packet Capture) trực tiếp trên dòng lệnh.',
    example: 'tcpdump -i eth0 port 80 -nn -c 20',
    dangerLevel: 'safe'
  },
  {
    command: 'ssh -L / -R',
    category: 'Mạng & Kết nối',
    syntax: 'ssh -L [local_port]:[remote_host]:[remote_port] [user]@[bastion]',
    description: 'Tạo đường hầm SSH Tunnel để truy cập an toàn vào Database/Service nội bộ qua máy chủ Bastion.',
    example: 'ssh -L 5433:10.0.2.50:5432 -i ~/.ssh/bastion.pem ec2-user@bastion.aws.example.com',
    dangerLevel: 'safe'
  },

  // 6. Diagnostics & Performance
  {
    command: 'htop / btop',
    category: 'Giám sát & Sự cố',
    syntax: 'htop / btop',
    description: 'Trình quản lý tiến trình tương tác trực quan xem % CPU theo từng core, RAM, Swap và I/O.',
    example: 'htop',
    dangerLevel: 'safe'
  },
  {
    command: 'iostat -xz 1',
    category: 'Giám sát & Sự cố',
    syntax: 'iostat -xz 1 5',
    description: 'Giám sát độ nghẽn đĩa I/O (Disk I/O Latency, %util, await) theo từng giây.',
    example: 'iostat -xz 1 5',
    dangerLevel: 'safe'
  },
  {
    command: 'dmesg -T',
    category: 'Giám sát & Sự cố',
    syntax: 'dmesg -T | grep -iE "oom|error|fail|disk"',
    description: 'Kiểm tra nhật ký Linux Kernel kèm định dạng thời gian thực tế, phát hiện OOM Killer sập DB.',
    example: 'dmesg -T | grep -i "out of memory"',
    dangerLevel: 'safe'
  },
  {
    command: 'strace',
    category: 'Giám sát & Sự cố',
    syntax: 'strace -p [PID] -e trace=network,file -s 200',
    description: 'Truy vết trực tiếp các System Calls (syscalls) mà tiến trình đang thực hiện để tìm nguyên nhân treo.',
    example: 'strace -p 12345 -f',
    dangerLevel: 'caution'
  }
];
