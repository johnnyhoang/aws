import { LinuxAdminQuizQuestion } from '../../types/linuxAdminModule';

export const LINUX_ADMIN_QUIZ_QUESTIONS: LinuxAdminQuizQuestion[] = [
  {
    id: 'lq-1',
    category: 'Phân Quyền & Bảo Mật',
    difficulty: 'Cơ bản',
    scenario: 'Bạn vừa tạo một file Bash script tại `/opt/scripts/backup.sh`. Bạn muốn chỉ duy nhất Chủ sở hữu (Owner) có toàn quyền đọc, ghi, chạy script; còn Nhóm (Group) và những người khác (Others) chỉ được phép đọc và chạy script. Lệnh chmod chuẩn xác là gì?',
    options: [
      { id: 'opt-a', text: 'chmod 755 /opt/scripts/backup.sh' },
      { id: 'opt-b', text: 'chmod 777 /opt/scripts/backup.sh' },
      { id: 'opt-c', text: 'chmod 644 /opt/scripts/backup.sh' },
      { id: 'opt-d', text: 'chmod 700 /opt/scripts/backup.sh' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Chính xác! 755 tương ứng với: Owner = rwx (4+2+1=7); Group = r-x (4+0+1=5); Others = r-x (4+0+1=5). Đây là phân quyền tiêu chuẩn cho các tệp script và file thực thi trên Linux.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: '777 trao toàn quyền ghi cho cả thế giới, là lỗ hổng bảo mật cực kỳ nguy hiểm.' },
        { optionId: 'opt-c', reason: '644 (rw-r--r--) không có quyền thực thi (x), bạn sẽ nhận lỗi Permission Denied khi chạy script.' },
        { optionId: 'opt-d', reason: '700 (rwx------) cấm hoàn toàn Group và Others không được đọc và chạy.' }
      ],
      proTip: 'Có thể dùng cú pháp biểu tượng tương đương: `chmod u=rwx,go=rx /opt/scripts/backup.sh`.'
    }
  },
  {
    id: 'lq-2',
    category: 'Xử Lý Sự Cố Khẩn Cấp',
    difficulty: 'Khó',
    scenario: 'Lúc 2:00 sáng, dịch vụ PostgreSQL trên máy chủ Linux tự nhiên biến mất mà không hề có bất kỳ dòng log lỗi nào trong `/var/log/postgresql/`. Khi kiểm tra `systemctl status postgresql`, service hiển thị trạng thái "failed (code=killed, signal=KILL)". Bạn nên chạy lệnh nào ngay lập tức để xác định nguyên nhân?',
    options: [
      { id: 'opt-a', text: 'sudo dmesg -T | grep -i "oom"' },
      { id: 'opt-b', text: 'cat /etc/hosts' },
      { id: 'opt-c', text: 'ping localhost' },
      { id: 'opt-d', text: 'ufw status verbose' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Chính xác! Khi dịch vụ bị kết thúc bởi signal=KILL mà không kịp ghi log, nguyên nhân hàng đầu là do Kernel Out-Of-Memory (OOM) Killer kích hoạt khi RAM cạn kiệt. Lệnh `dmesg -T | grep -i oom` sẽ hiển thị chính xác thời điểm Kernel gửi SIGKILL và điểm phạt badness score của Postgres.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: '/etc/hosts chỉ chứa ánh xạ DNS tĩnh cục bộ, không liên quan tới việc tiến trình bị kill.' },
        { optionId: 'opt-c', reason: 'Ping localhost chỉ kiểm tra loopback network interface.' },
        { optionId: 'opt-d', reason: 'UFW là tường lửa mạng, không quản lý bộ nhớ hoặc gửi tín hiệu kill process.' }
      ],
      proTip: 'Để ngăn OOM Killer chọn giết PostgreSQL trong tương lai, hãy cấu hình `OOMScoreAdjust=-1000` trong Systemd Unit file và thiết lập `vm.swappiness=10`.'
    }
  },
  {
    id: 'lq-3',
    category: 'Mạng & SSH',
    difficulty: 'Trung bình',
    scenario: 'Bạn cần cấu hình SSH Server trên máy chủ Production để đảm bảo an toàn tối đa trước các cuộc tấn công brute-force. Thiết lập nào dưới đây trong file `/etc/ssh/sshd_config` là bắt buộc?',
    options: [
      { id: 'opt-a', text: 'PasswordAuthentication no và PermitRootLogin no' },
      { id: 'opt-b', text: 'PasswordAuthentication yes và PermitRootLogin yes' },
      { id: 'opt-c', text: 'PermitEmptyPasswords yes' },
      { id: 'opt-d', text: 'X11Forwarding yes' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Chính xác! `PasswordAuthentication no` vô hiệu hóa hoàn toàn việc đăng nhập bằng mật khẩu (chỉ chấp nhận SSH Key), và `PermitRootLogin no` cấm đăng nhập trực tiếp dưới user root. Đây là 2 tiêu chuẩn vàng của SSH Hardening.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Bật mật khẩu và cho phép root login là nguyên nhân khiến hàng triệu VPS bị hack do bị dò mật khẩu.' },
        { optionId: 'opt-c', reason: 'Cho phép mật khẩu rỗng là một thảm họa bảo mật.' },
        { optionId: 'opt-d', reason: 'X11Forwarding dùng cho giao diện đồ họa GUI, không cần thiết và tiềm ẩn rủi ro chuyển tiếp cổng.' }
      ],
      proTip: 'Khuyến khích sử dụng loại khóa SSH hiện đại ED25519 (`ssh-keygen -t ed25519`) thay cho chuẩn cũ RSA 2048/4096.'
    }
  },
  {
    id: 'lq-4',
    category: 'Hệ Thống Tệp & Ổ Đĩa',
    difficulty: 'Khó',
    scenario: 'Lệnh `df -h /` báo phân vùng Root đã đầy 100% dung lượng. Bạn đã xóa các file log cũ bằng lệnh `rm /var/log/app.log`, tuy nhiên `df -h` vẫn báo đầy 100%. Nguyên nhân là gì và lệnh nào giúp bạn phát hiện tiến trình đang gây ra tình trạng này?',
    options: [
      { id: 'opt-a', text: 'Tiến trình đang chạy vẫn giữ mở kết nối (file handle) tới file đã xóa; dùng lệnh `sudo lsof +L1`' },
      { id: 'opt-b', text: 'Lệnh rm trên Linux chỉ chuyển file vào Thùng rác (Trash), cần vào GUI để dọn rác' },
      { id: 'opt-c', text: 'Ổ cứng SSD bị hỏng phần cứng' },
      { id: 'opt-d', text: 'Cần khởi động lại máy chủ ngay lập tức' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Chính xác! Trong Linux, lệnh `rm` chỉ xóa liên kết tên file (unlink) khỏi thư mục (dentry). Nếu một tiến trình vẫn đang mở file descriptor đó, Kernel sẽ không giải phóng các block dữ liệu trên đĩa cho đến khi tiến trình đó đóng file hoặc restart. Lệnh `lsof +L1` (hoặc `lsof | grep deleted`) sẽ chỉ rõ PID nào đang giữ file.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Dòng lệnh `rm` trên Linux xóa trực tiếp inode link, không có cơ chế Trash của Desktop GUI.' },
        { optionId: 'opt-c', reason: 'Đây là cơ chế hoạt động chuẩn của VFS (Virtual File System) trong Linux, không phải lỗi phần cứng.' },
        { optionId: 'opt-d', reason: 'Khởi động lại có thể giải quyết được nhưng gây downtime không cần thiết; chỉ cần reload hoặc restart tiến trình đang giữ file descriptor.' }
      ],
      proTip: 'Thay vì xóa file log đang mở bằng `rm`, bạn có thể làm rỗng file tức thì mà không làm mất file handle bằng lệnh: `> /var/log/app.log` hoặc `truncate -s 0 /var/log/app.log`.'
    }
  },
  {
    id: 'lq-5',
    category: 'Tiến Trình & Systemd',
    difficulty: 'Trung bình',
    scenario: 'Bạn tạo file cấu hình dịch vụ mới tại `/etc/systemd/system/node-api.service`. Khi chạy `sudo systemctl start node-api`, systemd báo cảnh báo "Unit node-api.service changed on disk. Run systemctl daemon-reload". Lệnh nào bắt buộc phải chạy trước khi start dịch vụ?',
    options: [
      { id: 'opt-a', text: 'sudo systemctl daemon-reload' },
      { id: 'opt-b', text: 'sudo reboot' },
      { id: 'opt-c', text: 'sudo service node-api restart' },
      { id: 'opt-d', text: 'sudo killall systemd' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Chính xác! Systemd nạp sẵn cấu hình của tất cả các unit file vào bộ nhớ RAM khi khởi động. Bất cứ khi nào bạn tạo mới hoặc chỉnh sửa file `.service`, bạn bắt buộc phải gọi `sudo systemctl daemon-reload` để Systemd quét lại và đồng bộ cây dịch vụ.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Reboot máy chủ sẽ nạp lại cấu hình nhưng gây gián đoạn toàn bộ hệ thống không cần thiết.' },
        { optionId: 'opt-c', reason: 'Lệnh `service` là wrapper cũ và vẫn sẽ thất bại nếu daemon chưa reload.' },
        { optionId: 'opt-d', reason: 'Systemd là PID 1 của hệ thống, kill nó sẽ khiến Kernel Kernel Panic và sập máy chủ ngay lập tức!' }
      ],
      proTip: 'Sau khi daemon-reload, hãy kích hoạt dịch vụ tự khởi động cùng máy chủ bằng lệnh: `sudo systemctl enable --now node-api`.'
    }
  },
  {
    id: 'lq-6',
    category: 'AWS Linux Administration',
    difficulty: 'Chuyên gia',
    scenario: 'Bạn vừa tăng dung lượng ổ đĩa Root EBS Volume trên AWS Console từ 30GB lên 100GB cho máy chủ Amazon Linux 2023 (định dạng XFS). Khi SSH vào máy chủ và gõ `df -h /`, dung lượng vẫn hiển thị 30GB. Bạn cần thực hiện 2 lệnh nào để mở rộng dung lượng lên 100GB mà không cần reboot máy chủ?',
    options: [
      { id: 'opt-a', text: 'sudo growpart /dev/nvme0n1 1 && sudo xfs_growfs -d /' },
      { id: 'opt-b', text: 'sudo mkfs.xfs -f /dev/nvme0n1' },
      { id: 'opt-c', text: 'sudo fdisk /dev/nvme0n1 rồi format lại' },
      { id: 'opt-d', text: 'sudo reboot --force' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Chính xác! `growpart /dev/nvme0n1 1` mở rộng bảng phân vùng partition số 1 để nhận hết dung lượng đĩa vật lý mới, sau đó `xfs_growfs -d /` mở rộng trực tiếp hệ thống tệp XFS đang mount tại Root (/). Toàn bộ diễn ra online 100% không cần ngắt quãng.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Lệnh mkfs.xfs sẽ format lại ổ đĩa và xóa sạch toàn bộ hệ điều hành và dữ liệu của bạn!' },
        { optionId: 'opt-c', reason: 'Thao tác fdisk thủ công dễ gây lỗi mất partition table.' },
        { optionId: 'opt-d', reason: 'Reboot không tự động mở rộng phân vùng XFS trừ khi có script cloud-init đặc biệt.' }
      ],
      proTip: 'Nếu hệ điều hành là Ubuntu/Debian dùng định dạng `ext4`, lệnh mở rộng filesystem tương ứng là `sudo resize2fs /dev/nvme0n1p1`.'
    }
  },
  {
    id: 'lq-7',
    category: 'Tối Ưu Hóa & Cấu Hình',
    difficulty: 'Khó',
    scenario: 'Ứng dụng Nginx và Node.js của bạn khi đạt 10,000 người dùng đồng thời bắt đầu xuất hiện lỗi: "accept() failed (24: Too many open files)". File cấu hình nào trên Linux cần được chỉnh sửa để nâng giới hạn số lượng File Descriptors cho toàn hệ thống?',
    options: [
      { id: 'opt-a', text: '/etc/security/limits.conf và /etc/sysctl.conf (fs.file-max)' },
      { id: 'opt-b', text: '/etc/fstab' },
      { id: 'opt-c', text: '/etc/resolv.conf' },
      { id: 'opt-d', text: '/etc/timezone' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Chính xác! Mặc định Linux giới hạn mỗi tiến trình chỉ được mở 1024 tệp (bao gồm cả socket kết nối mạng). Nâng `* soft nofile 65535` và `* hard nofile 65535` trong `/etc/security/limits.conf` và đặt `fs.file-max` trong `/etc/sysctl.conf` sẽ giải quyết dứt điểm lỗi này.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: '/etc/fstab quản lý việc mount ổ đĩa khi khởi động.' },
        { optionId: 'opt-c', reason: '/etc/resolv.conf quản lý Nameserver DNS.' },
        { optionId: 'opt-d', reason: '/etc/timezone quản lý múi giờ hệ thống.' }
      ],
      proTip: 'Đừng quên kiểm tra directive `worker_rlimit_nofile 65535;` trong file `nginx.conf` và `LimitNOFILE=65535` trong file Systemd của Node.js.'
    }
  },
  {
    id: 'lq-8',
    category: 'Giám Sát & Hiệu Năng',
    difficulty: 'Trung bình',
    scenario: 'Lệnh `uptime` trên máy chủ 4 Core CPU hiển thị: "load average: 1.20, 1.10, 0.85". Đánh giá nào sau đây về trạng thái tải của máy chủ là chính xác nhất?',
    options: [
      { id: 'opt-a', text: 'Máy chủ đang hoạt động an toàn và ổn định (Load trung bình ~0.30 trên mỗi Core CPU)' },
      { id: 'opt-b', text: 'Máy chủ đang bị quá tải nghiêm trọng và sắp sập' },
      { id: 'opt-c', text: 'RAM của máy chủ đã hết 100%' },
      { id: 'opt-d', text: 'Ổ cứng SSD bị lỗi Bad Sector' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Chính xác! Trên máy chủ 4 Core, ngưỡng bão hòa 100% CPU là Load Average = 4.0. Với mức Load 1.20, hệ thống chỉ đang sử dụng khoảng 30% năng lực xử lý (1.20 / 4 = 0.30), hoàn toàn khỏe mạnh và an toàn.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Chỉ khi Load Average vượt quá 4.0 liên tục trên máy 4 core thì hệ thống mới bắt đầu bị nghẽn (xếp hàng chờ CPU).' },
        { optionId: 'opt-c', reason: 'Load Average đo lường hàng đợi CPU và Disk I/O, không trực tiếp đo dung lượng RAM.' },
        { optionId: 'opt-d', reason: 'Không có cơ sở kết luận lỗi phần cứng SSD.' }
      ],
      proTip: 'Nếu CPU % thấp nhưng Load Average cao bất thường (> 8.0), hãy chạy lệnh `iostat -xz 1` để kiểm tra nghẽn đọc/ghi đĩa cứng (%util tiệm cận 100%).'
    }
  }
];
