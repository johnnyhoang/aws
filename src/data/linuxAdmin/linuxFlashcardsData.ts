import { LinuxAdminFlashcard } from '../../types/linuxAdminModule';

export const LINUX_ADMIN_FLASHCARDS: LinuxAdminFlashcard[] = [
  {
    id: 'lfc-1',
    term: 'User Space (Ring 3) vs Kernel Space (Ring 0)',
    category: 'Kiến Trúc Nhân',
    definition: 'Kernel Space (Ring 0) là không gian lõi có toàn quyền phần cứng CPU/RAM; User Space (Ring 3) là không gian bị cô lập dành cho ứng dụng người dùng và server.',
    practicalUsage: 'Khi ứng dụng Web trong User Space bị lỗi Crash hoặc tràn bộ nhớ, nó chỉ chết một mình mà không làm sập máy chủ.',
    proTip: 'Ứng dụng User Space chỉ có thể tương tác với phần cứng thông qua các System Calls (syscalls).'
  },
  {
    id: 'lfc-2',
    term: 'System Call (Syscall)',
    category: 'Kiến Trúc Nhân',
    definition: 'Cầu nối giao tiếp lập trình duy nhất để một tiến trình User Space yêu cầu Linux Kernel thực hiện tác vụ đặc quyền (đọc/ghi file, mở cổng mạng, tạo process).',
    practicalUsage: 'Dùng lệnh `strace -p <PID>` để xem trực tiếp các syscalls mà tiến trình đang thực hiện (như open, read, write, socket, poll).',
    proTip: 'Syscall `fork()` dùng để nhân bản process, `execve()` dùng để nạp chương trình mới vào process.'
  },
  {
    id: 'lfc-3',
    term: 'File Descriptors (0, 1, 2)',
    category: 'Shell & Dòng Lệnh',
    definition: 'Ba chỉ số luồng I/O tiêu chuẩn được gán tự động cho mọi tiến trình Linux: 0 là stdin (đầu vào), 1 là stdout (đầu ra chuẩn), 2 là stderr (thông báo lỗi).',
    practicalUsage: '`cmd > output.log 2>&1` chuyển cả kết quả và thông báo lỗi vào cùng 1 file log.',
    proTip: '`&> /dev/null` là cú pháp viết tắt hiện đại trên Bash để ném toàn bộ stdout và stderr vào thùng rác.'
  },
  {
    id: 'lfc-4',
    term: 'Grep vs Sed vs Awk',
    category: 'Xử Lý Văn Bản',
    definition: 'Bộ 3 công cụ kinh điển: Grep dùng để tìm kiếm dòng khớp mẫu; Sed dùng để sửa/thay thế luồng văn bản; Awk dùng để xử lý dữ liệu theo dạng bảng và cột.',
    practicalUsage: '`cat access.log | grep " 500 " | awk \'{print $1}\' | sort | uniq -c` đếm số lượng lỗi 500 theo từng IP khách hàng.',
    proTip: 'Awk tự động chia cột dựa trên khoảng trắng, trong đó `$1` là cột đầu tiên, `$NF` là cột cuối cùng của dòng.'
  },
  {
    id: 'lfc-5',
    term: 'Quyền Phân Cấp Bát Phân (Octal chmod 755 / 644 / 600)',
    category: 'Phân Quyền & Bảo Mật',
    definition: 'Hệ thống tính điểm quyền: Đọc (r=4), Ghi (w=2), Thực thi (x=1) cho 3 nhóm [Owner] [Group] [Others].',
    practicalUsage: '755 (rwxr-xr-x) cho thư mục/script; 644 (rw-r--r--) cho file cấu hình; 600 (rw-------) cho SSH Private Key.',
    proTip: 'Lệnh `chmod 600 ~/.ssh/id_ed25519` là bắt buộc, nếu để quyền quá mở (như 777), SSH Client sẽ từ chối kết nối.'
  },
  {
    id: 'lfc-6',
    term: 'SUID, SGID và Sticky Bit',
    category: 'Phân Quyền & Bảo Mật',
    definition: 'Ba bit quyền đặc biệt: SUID (4000) mượn quyền Owner khi chạy; SGID (2000) tự kế thừa Group cha; Sticky Bit (1000) chỉ cho phép chính chủ nhân xóa file của mình.',
    practicalUsage: 'Thư mục `/tmp` luôn được gán quyền `chmod 1777 /tmp` (Sticky Bit) để nhiều user cùng ghi file tạm mà không sợ bị user khác xóa trộm.',
    proTip: 'Cẩn thận kiểm tra các file có SUID (`find / -perm -4000`) để tránh lỗ hổng leo thang đặc quyền (Privilege Escalation).'
  },
  {
    id: 'lfc-7',
    term: 'SSH Hardening (ED25519 & Vô Hiệu Password)',
    category: 'Phân Quyền & Bảo Mật',
    definition: 'Quy trình tăng cường bảo mật máy chủ SSH bằng cách đổi sang khóa mật mã ED25519, tắt đăng nhập mật khẩu và cấm tài khoản root đăng nhập trực tiếp.',
    practicalUsage: 'Đặt `PasswordAuthentication no` và `PermitRootLogin no` trong `/etc/ssh/sshd_config` sau đó reload dịch vụ `sshd`.',
    proTip: 'Luôn mở thêm 1 cửa sổ terminal SSH thứ 2 để kiểm tra đăng nhập trước khi đóng cửa sổ hiện tại để tránh bị Lockout.'
  },
  {
    id: 'lfc-8',
    term: 'SIGTERM (15) vs SIGKILL (9)',
    category: 'Tiến Trình & Systemd',
    definition: 'SIGTERM (15) yêu cầu tiến trình dừng lịch sự (Graceful shutdown, dọn dẹp DB connection); SIGKILL (9) là lệnh hủy diệt tức thì do Kernel cưỡng chế.',
    practicalUsage: 'Luôn luôn dùng `kill -15 <PID>` trước. Chỉ dùng `kill -9 <PID>` khi tiến trình bị treo cứng không phản hồi.',
    proTip: 'Tiến trình không thể bắt (catch) hoặc bỏ qua (ignore) tín hiệu SIGKILL (9).'
  },
  {
    id: 'lfc-9',
    term: 'Systemd Unit File (.service)',
    category: 'Tiến Trình & Systemd',
    definition: 'Tệp khai báo cấu hình dịch vụ quản lý vòng đời ứng dụng trên Linux, hỗ trợ User isolation, Auto-restart khi crash và giới hạn tài nguyên cgroups.',
    practicalUsage: 'Đặt `Restart=always`, `RestartSec=5s`, `User=deployer`, `LimitNOFILE=65535` trong file `/etc/systemd/system/app.service`.',
    proTip: 'Sau khi chỉnh sửa bất kỳ file `.service` nào, bắt buộc phải chạy lệnh `sudo systemctl daemon-reload`.'
  },
  {
    id: 'lfc-10',
    term: 'Journalctl (Systemd Journal)',
    category: 'Tiến Trình & Systemd',
    definition: 'Hệ thống quản lý và truy vấn nhật ký log tập trung của tất cả các dịch vụ Systemd và Kernel.',
    practicalUsage: '`journalctl -u nginx -f` xem log thời gian thực; `journalctl -u app --since "1 hour ago" -p err` lọc riêng các dòng log lỗi trong 1 giờ qua.',
    proTip: 'Dùng cờ `--no-pager` khi xuất log ra pipe hoặc script để không bị chặn bởi trình xem Less.'
  },
  {
    id: 'lfc-11',
    term: 'FHS (Filesystem Hierarchy Standard)',
    category: 'Hệ Thống Tệp & Ổ Đĩa',
    definition: 'Tiêu chuẩn quốc tế quy định chức năng của từng thư mục trong Linux (/etc: config, /var: dữ liệu biến đổi/log, /proc: trạng thái kernel, /dev: thiết bị).',
    practicalUsage: 'Khi cấu hình Nginx ta tìm trong `/etc/nginx`, khi kiểm tra log ta tìm trong `/var/log`, khi lưu data web ta để trong `/var/www`.',
    proTip: 'Thư mục `/proc` không tồn tại trên ổ cứng vật lý, nó là hệ thống tệp ảo trong RAM tạo bởi Kernel.'
  },
  {
    id: 'lfc-12',
    term: 'LVM (Logical Volume Management)',
    category: 'Hệ Thống Tệp & Ổ Đĩa',
    definition: 'Công nghệ phân vùng đĩa logic cho phép gộp nhiều ổ đĩa vật lý (PV) thành một nhóm (VG) và cấp phát các ổ logic (LV) có thể co giãn dung lượng trực tiếp.',
    practicalUsage: '`lvextend -L +20G /dev/vg0/lv_root && resize2fs /dev/vg0/lv_root` tăng thêm 20GB cho ổ đĩa root mà không cần tắt máy.',
    proTip: 'Nếu filesystem là XFS (chuẩn RHEL/Amazon Linux), dùng lệnh `xfs_growfs /` thay cho `resize2fs`.'
  },
  {
    id: 'lfc-13',
    term: 'Swap & Kernel Swappiness',
    category: 'Bộ Nhớ & Hiệu Năng',
    definition: 'Swap là vùng nhớ trên ổ đĩa SSD dùng làm đệm khi RAM bị đầy; Swappiness (0-100) quy định mức độ ưu tiên đẩy dữ liệu từ RAM sang Swap của Kernel.',
    practicalUsage: 'Thiết lập `vm.swappiness=10` trong `/etc/sysctl.conf` cho máy chủ production để ưu tiên tối đa RAM vật lý.',
    proTip: 'Swap giúp cứu máy chủ không bị chết đứng (Freeze) khi có lượng truy cập đột biến vượt quá dung lượng RAM.'
  },
  {
    id: 'lfc-14',
    term: 'Lệnh `ss -tulpn`',
    category: 'Mạng & Cổng Kết Nối',
    definition: 'Công cụ hiện đại thay thế netstat, dùng để liệt kê tất cả các cổng mạng TCP/UDP đang ở trạng thái Listen và Process ID (PID) tương ứng.',
    practicalUsage: '`ss -tulpn | grep :80` kiểm tra xem web server đã mở cổng 80 thành công hay chưa và tiến trình nào đang chiếm giữ.',
    proTip: 'Nếu thấy địa chỉ là `127.0.0.1:5432` thì dịch vụ chỉ truy cập được nội bộ; nếu là `0.0.0.0:5432` thì cả Internet có thể chạm vào.'
  },
  {
    id: 'lfc-15',
    term: 'SSH Local Port Forwarding (-L)',
    category: 'Mạng & SSH',
    definition: 'Kỹ thuật tạo đường hầm mã hóa SSH chuyển tiếp một cổng trên máy cá nhân (Local) tới một cổng của máy chủ nội bộ thông qua một Bastion Host.',
    practicalUsage: '`ssh -L 5433:10.0.2.50:5432 user@bastion.ip` mở cổng 5433 tại máy cá nhân nối thẳng vào Postgres nội bộ AWS.',
    proTip: 'Thêm cờ `-N` (không mở shell) và `-f` (chạy ngầm background) khi tạo SSH Tunnel.'
  },
  {
    id: 'lfc-16',
    term: 'File Descriptor Limits (limits.conf & nofile)',
    category: 'Tối Ưu Hóa Hệ Thống',
    definition: 'Giới hạn số lượng tệp và kết nối mạng mở đồng thời của một user/tiến trình trên Linux (mặc định chỉ 1024).',
    practicalUsage: 'Đặt `* soft nofile 65535` và `* hard nofile 65535` tại `/etc/security/limits.conf` để Database/Nginx không bị lỗi "Too many open files".',
    proTip: 'Kiểm tra giới hạn hiện tại của shell đang chạy bằng lệnh `ulimit -n`.'
  },
  {
    id: 'lfc-17',
    term: 'sysctl.conf & vm.overcommit_memory',
    category: 'Tối Ưu Hóa Hệ Thống',
    definition: 'Tệp cấu hình thông số nhân Kernel; `vm.overcommit_memory=1` cho phép phân bổ bộ nhớ ảo vượt mức cần thiết cho Redis BGSAVE.',
    practicalUsage: 'Thêm `vm.overcommit_memory=1` và `net.core.somaxconn=65535` vào `/etc/sysctl.conf` rồi chạy `sysctl -p`.',
    proTip: 'Redis sẽ cảnh báo WARNING nghiêm trọng nếu máy chủ Linux chưa bật `vm.overcommit_memory=1`.'
  },
  {
    id: 'lfc-18',
    term: 'EC2 Live EBS Volume Expansion (`growpart`)',
    category: 'AWS Linux Administration',
    definition: 'Quy trình mở rộng phân vùng ổ đĩa EBS trực tiếp trên Linux sau khi tăng dung lượng từ AWS Management Console.',
    practicalUsage: 'Chạy `sudo growpart /dev/nvme0n1 1` sau đó chạy `sudo xfs_growfs -d /` (XFS) hoặc `sudo resize2fs /dev/nvme0n1p1` (ext4).',
    proTip: 'Quá trình này diễn ra 100% online, không cần reboot máy chủ EC2 và không gây gián đoạn người dùng.'
  },
  {
    id: 'lfc-19',
    term: 'AWS Systems Manager (SSM) Session Manager',
    category: 'AWS Linux Administration',
    definition: 'Cơ chế truy cập Terminal máy chủ EC2 an toàn qua giao thức AWS SSM, không cần mở cổng SSH (Port 22) và không cần Public IP.',
    practicalUsage: 'Gắn IAM Role có policy `AmazonSSMManagedInstanceCore` vào EC2 và kết nối bằng `aws ssm start-session --target <instance-id>`.',
    proTip: 'Toàn bộ lệnh gõ trong phiên SSM có thể tự động ghi nhật ký vào CloudWatch Logs hoặc S3 để phục vụ kiểm toán bảo mật SOC2/ISO.'
  },
  {
    id: 'lfc-20',
    term: 'Linux OOM Killer (Out Of Memory)',
    category: 'Giám Sát & Xử Lý Sự Cố',
    definition: 'Cơ chế khẩn cấp của Linux Kernel tự động gửi tín hiệu SIGKILL (9) để khai tử tiến trình chiếm nhiều RAM nhất khi toàn bộ RAM và Swap cạn kiệt.',
    practicalUsage: 'Tra cứu dấu vết OOM Killer trong nhật ký Kernel bằng lệnh: `dmesg -T | grep -i oom`.',
    proTip: 'Có thể đặt `OOMScoreAdjust=-1000` trong file Systemd Service để bảo vệ Database/SSH không bao giờ bị OOM Killer chọn giết.'
  },
  {
    id: 'lfc-21',
    term: 'Load Average (1m, 5m, 15m)',
    category: 'Giám Sát & Xử Lý Sự Cố',
    definition: 'Chỉ số đo số lượng tiến trình đang sử dụng CPU hoặc đang xếp hàng chờ I/O đĩa trong khoảng thời gian 1, 5, và 15 phút.',
    practicalUsage: 'Lấy Load Average chia cho Tổng số CPU Cores: Nếu tỷ lệ < 1.0 là an toàn; nếu > 1.0 liên tục là hệ thống đang quá tải.',
    proTip: 'Nếu CPU % thấp nhưng Load Average cực cao, nguyên nhân là do nghẽn I/O ổ đĩa cứng (Disk I/O Wait).'
  },
  {
    id: 'lfc-22',
    term: 'Docker Daemon `live-restore` & Log Rotation',
    category: 'Container & DevOps',
    definition: 'Cấu hình trong `/etc/docker/daemon.json` giúp giới hạn kích thước file log container (`max-size: 50m`) và giữ container tiếp tục chạy khi restart Docker.',
    practicalUsage: 'Ngăn chặn 100% lỗi kinh điển Docker container ghi log phình to làm tràn toàn bộ ổ đĩa server.',
    proTip: 'Chạy `docker system prune -af --volumes` định kỳ để dọn dẹp các images và layers container rác.'
  }
];
