import { FundamentalVideoCourse } from '../../types/fundamentals';

export const FUNDAMENTAL_VIDEO_COURSES: FundamentalVideoCourse[] = [
  {
    id: 'vid-comp-1',
    domainId: 'computer_fundamentals',
    title: 'CS50: Introduction to Computer Science (Harvard)',
    instructor: 'Prof. David J. Malan',
    channel: 'CS50 / Harvard University',
    duration: '24 giờ bài giảng',
    level: 'Cơ bản',
    youtubeId: 'LfaMVlDaQ24',
    summary: 'Khóa học nhập môn khoa học máy tính huyền thoại của Đại học Harvard, giải thích trực quan từ nhị phân, bộ nhớ RAM, con trỏ C đến cấu trúc dữ liệu và thuật toán.',
    topicsCovered: ['Binary & Data Representation', 'Memory & Pointers', 'Algorithms & Big O', 'Data Structures (Arrays, Linked Lists, Trees)'],
    keyTakeaways: ['Tư duy logic giải quyết vấn đề của kỹ sư', 'Hiểu bản chất phân bổ bộ nhớ máy tính']
  },
  {
    id: 'vid-net-1',
    domainId: 'networking_basics',
    title: 'Networking Fundamentals Made Easy',
    instructor: 'NetworkChuck',
    channel: 'NetworkChuck',
    duration: '6 giờ bài giảng',
    level: 'Cơ bản',
    youtubeId: 'IPv4Subnetting',
    summary: 'Bộ video hướng dẫn mạng máy tính hài hước, trực quan nhất thế giới: Giải mã IPv4, Subnetting, TCP Handshake, VLAN và Ports qua các ví dụ đời thường.',
    topicsCovered: ['IP Addresses & Subnet Masks', 'Binary to Decimal Subnetting', 'Routers, Switches & Hubs', 'TCP vs UDP Deep Dive'],
    keyTakeaways: ['Làm chủ kỹ thuật chia Subnetting', 'Hiểu rõ đường đi của gói tin qua Router']
  },
  {
    id: 'vid-linux-1',
    domainId: 'linux_basics',
    title: 'Linux for Beginners Full Course',
    instructor: 'freeCodeCamp',
    channel: 'freeCodeCamp.org',
    duration: '5.5 giờ bài giảng',
    level: 'Cơ bản',
    youtubeId: 'v_1zB2WwOIU',
    summary: 'Khóa học thực hành toàn diện từ con số 0 trên Linux: Lệnh CLI, Quản lý tệp tin, Phân quyền chmod, SSH Key, Systemd và cài đặt phần mềm trên Ubuntu.',
    topicsCovered: ['Linux Directory Tree (FHS)', 'File & Directory Operations', 'Permissions & Sudoers', 'SSH Key Authentication & Remote Access'],
    keyTakeaways: ['Thành thạo 50+ lệnh Linux bắt buộc', 'Tự tin quản trị máy chủ từ xa']
  },
  {
    id: 'vid-backend-1',
    domainId: 'web_application',
    title: 'Backend Engineering & Networking Protocols',
    instructor: 'Hussein Nasser',
    channel: 'Hussein Nasser',
    duration: '8 giờ bài giảng',
    level: 'Trung bình',
    youtubeId: '2J4jZJ7Gk3A',
    summary: 'Phân tích chuyên sâu từ kỹ sư backend kỳ cựu: Giao thức HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC), TLS 1.3 Handshake, WebSockets và thiết kế cơ sở dữ liệu quy mô lớn.',
    topicsCovered: ['HTTP/2 Multiplexing & QUIC', 'Database Indexes & B-Trees', 'Connection Pooling & Deadlocks', 'Proxy vs Reverse Proxy Architecture'],
    keyTakeaways: ['Hiểu sâu cơ chế tối ưu hóa độ trễ mạng', 'Thiết kế cơ sở dữ liệu chịu tải cao']
  },
  {
    id: 'vid-docker-1',
    domainId: 'cloud_fundamentals',
    title: 'Docker Tutorial for Beginners [Full Course]',
    instructor: 'Nana Janashia',
    channel: 'TechWorld with Nana',
    duration: '3.5 giờ bài giảng',
    level: 'Cơ bản',
    youtubeId: '3c-iBn73dDE',
    summary: 'Khóa học Docker trực quan số 1 thế giới: So sánh VM vs Container, viết Dockerfile tối ưu, quản lý Docker Volumes, Docker Networks và điều phối với Docker Compose.',
    topicsCovered: ['Virtual Machines vs Containers', 'Dockerfile Best Practices', 'Docker Volumes & Persistent Data', 'Docker Compose Multi-Container Orchestration'],
    keyTakeaways: ['Đóng gói ứng dụng vào Docker container chuẩn production', 'Tự tin tiếp cận AWS ECS & EKS']
  },
  {
    id: 'vid-bash-1',
    domainId: 'git_scripting',
    title: 'Complete Bash Scripting & Automation Course',
    instructor: 'Kunal Kushwaha',
    channel: 'Kunal Kushwaha',
    duration: '4 giờ bài giảng',
    level: 'Cơ bản',
    youtubeId: 'tK9Oc6AEnR4',
    summary: 'Học viết kịch bản tự động hóa Bash Shell từ cơ bản đến nâng cao: Biến, Vòng lặp, Hàm, Bắt lỗi an toàn, Lập lịch Crontab và tích hợp vào CI/CD Pipeline.',
    topicsCovered: ['Bash Syntax & Shebang', 'Variables, Conditions & Loops', 'Error Handling (set -euo pipefail)', 'Automating System Backups & Cron Jobs'],
    keyTakeaways: ['Tự động hóa mọi tác vụ lặp đi lặp lại trên máy chủ', 'Sẵn sàng viết EC2 User Data scripts']
  }
];
