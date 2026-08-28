import { FundamentalProject } from '../../types/fundamentals';

export const FUNDAMENTAL_PROJECTS: FundamentalProject[] = [
  {
    id: 'proj-linux-nginx-ssl',
    domainId: 'linux_basics',
    title: 'Dự Án 1: Triển Khai Máy Chủ Linux Hardening, Nginx Reverse Proxy & Tự Động Hóa SSL',
    subtitle: 'Xây dựng môi trường máy chủ sản xuất chuẩn bảo mật với phân quyền nghiêm ngặt, SSH Key, tường lửa UFW và Let\'s Encrypt SSL.',
    targetRole: 'Junior Linux Admin / Cloud Systems Specialist',
    difficulty: 'Cơ bản',
    estimatedHours: 8,
    prerequisites: ['Lệnh Linux CLI cơ bản', 'Hiểu cổng mạng (Ports: 22, 80, 443)', 'Cơ chế xác thực SSH Key'],
    summary: 'Dự án thực tế kinh điển giúp bạn chứng minh năng lực quản trị máy chủ: Cài đặt và cấu hình Linux Ubuntu Server, thắt chặt bảo mật (Hardening), tạo user không dùng mật khẩu, thiết lập Nginx làm Reverse Proxy và cấp phát chứng chỉ HTTPS tự động với Certbot.',
    realWorldScenario: 'Một công ty startup giáo dục cần triển khai cổng đăng ký học phần trên máy chủ đám mây. Bạn chịu trách nhiệm thiết lập máy chủ Linux từ con số 0, khóa toàn bộ cổng không cần thiết, ngăn chặn truy cập root trực tiếp và đảm bảo toàn bộ đường truyền được mã hóa qua HTTPS.',
    architectureComponents: [
      {
        tier: 'Security & Access Tier',
        components: ['OpenSSH Server', 'UFW Firewall', 'Sudoers RBAC'],
        description: 'Vô hiệu hóa password login, chỉ cho phép xác thực bằng SSH Key Ed25519; tường lửa chỉ mở cổng 22, 80, 443.'
      },
      {
        tier: 'Web & Proxy Tier',
        components: ['Nginx Web Server', 'Certbot (Let\'s Encrypt)', 'Systemd Daemon'],
        description: 'Nginx nhận request HTTPS cổng 443, tự động chuyển hướng toàn bộ traffic HTTP cổng 80 sang HTTPS, proxy ngược về backend app.'
      },
      {
        tier: 'Application Tier',
        components: ['Node.js Express / Python FastAPI', 'PM2 Process Manager'],
        description: 'Ứng dụng backend chạy ở cổng nội bộ 3000, tự động khởi động lại nếu bị crash.'
      }
    ],
    keySkillsDemonstrated: [
      'Linux Server Hardening & Security Best Practices',
      'Cấu hình Nginx Reverse Proxy & Gzip Compression',
      'Quản lý chứng chỉ số TLS/SSL với Certbot Auto-Renew',
      'Quản lý tiến trình hệ thống với Systemd & PM2',
      'Cấu hình tường lửa UFW (Uncomplicated Firewall)'
    ],
    stepByStepGuide: [
      {
        phase: 'Giai Đoạn 1',
        title: 'Khởi Tạo Máy Chủ & Thắt Chặt Bảo Mật Hệ Thống (Server Hardening)',
        tasks: [
          'Tạo người dùng mới `deployer` và cấp quyền `sudo`.',
          'Tạo cặp khóa SSH Ed25519 trên máy tính cá nhân và đưa Public Key vào `/home/deployer/.ssh/authorized_keys`.',
          'Chỉnh sửa `/etc/ssh/sshd_config`: Thiết lập `PasswordAuthentication no` và `PermitRootLogin no`.',
          'Khởi động lại dịch vụ SSH và kích hoạt tường lửa UFW chỉ cho phép các cổng 22, 80, 443.'
        ],
        codeSnippets: [
          {
            title: 'Kịch bản cấu hình bảo mật nhanh (Bash)',
            language: 'bash',
            code: `# 1. Tạo user & phân quyền
sudo adduser --disabled-password --gecos "" deployer
sudo usermod -aG sudo deployer

# 2. Cài đặt khóa SSH
sudo mkdir -p /home/deployer/.ssh
sudo cp ~/.ssh/authorized_keys /home/deployer/.ssh/
sudo chown -R deployer:deployer /home/deployer/.ssh
sudo chmod 700 /home/deployer/.ssh
sudo chmod 600 /home/deployer/.ssh/authorized_keys

# 3. Kích hoạt tường lửa UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable`
          }
        ]
      },
      {
        phase: 'Giai Đoạn 2',
        title: 'Cài Đặt & Cấu Hình Nginx Reverse Proxy Với Let\'s Encrypt SSL',
        tasks: [
          'Cài đặt Nginx và Certbot.',
          'Viết file cấu hình Virtual Host Nginx tại `/etc/nginx/sites-available/app.conf`.',
          'Chạy lệnh `certbot --nginx` để tự động xin cấp chứng chỉ SSL và cấu hình HTTPS.',
          'Kiểm tra tính năng tự động gia hạn chứng chỉ bằng `certbot renew --dry-run`.'
        ],
        codeSnippets: [
          {
            title: 'File cấu hình Nginx Reverse Proxy mẫu',
            language: 'nginx',
            code: `server {
    listen 80;
    server_name portal.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name portal.example.com;

    ssl_certificate /etc/letsencrypt/live/portal.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/portal.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`
          }
        ]
      }
    ],
    interviewStarStory: {
      situation: 'Khi tiếp nhận dự án cổng thông tin tại trường đại học, hệ thống cũ thường xuyên bị quét lỗ hổng bảo mật cổng SSH và chưa có chứng chỉ HTTPS chuẩn hóa.',
      task: 'Nhiệm vụ của em là thiết kế và triển khai lại toàn bộ hạ tầng máy chủ Linux, đảm bảo an toàn tuyệt đối trước các đợt quét cổng tự động và mã hóa 100% dữ liệu truyền qua web.',
      action: 'Em đã thực hiện hardening máy chủ: khóa toàn bộ đăng nhập mật khẩu SSH, vô hiệu hóa tài khoản root, áp dụng tường lửa UFW theo nguyên tắc default-deny. Đồng thời cấu hình Nginx làm Reverse Proxy với cơ chế tự động chuyển hướng HTTP sang HTTPS và lập lịch tự động gia hạn SSL với Certbot.',
      result: 'Hệ thống đạt điểm A+ trên SSL Labs, giảm 99% các nỗ lực tấn công brute-force vào cổng SSH và hoạt động ổn định với thời gian phản hồi dưới 50ms.'
    },
    cvBulletPointTips: [
      'Thiết kế và triển khai máy chủ Linux Production đạt tiêu chuẩn bảo mật cao (SSH Key authentication, UFW firewall, non-root execution).',
      'Cấu hình Nginx Reverse Proxy xử lý hơn 10,000 requests/ngày, tích hợp tự động hóa cấp phát chứng chỉ SSL/TLS Let\'s Encrypt.'
    ]
  },
  {
    id: 'proj-vpc-subnetting-nat',
    domainId: 'networking_basics',
    title: 'Dự Án 2: Thiết Kế & Mô Phỏng Mạng Doanh Nghiệp Multi-Subnet Với NAT & Firewall',
    subtitle: 'Quy hoạch dải IP CIDR /16 thành các vùng Public/Private độc lập, cấu hình IP Forwarding, SNAT và iptables.',
    targetRole: 'Junior Cloud Network Engineer / DevOps Intern',
    difficulty: 'Trung bình',
    estimatedHours: 12,
    prerequisites: ['CIDR Subnetting', 'Bảng định tuyến Route Tables', 'Nguyên lý NAT/PAT và Tường lửa'],
    summary: 'Mô phỏng chân thực kiến trúc Amazon VPC trên môi trường Linux Virtual Network Namespaces: Tạo các vùng mạng con độc lập cho Web Tier và Database Tier, cấu hình máy chủ Gateway làm Source NAT (SNAT) để cho phép máy chủ riêng truy cập Internet an toàn.',
    realWorldScenario: 'Doanh nghiệp yêu cầu thiết kế hệ thống mạng nội bộ cô lập hoàn toàn Cơ sở dữ liệu và Ứng dụng Backend khỏi Internet công cộng, nhưng các máy chủ nội bộ này vẫn cần tải các bản vá bảo mật từ Internet qua một Gateway tập trung.',
    architectureComponents: [
      {
        tier: 'Public Subnet (DMZ)',
        components: ['NAT Gateway / Bastion Host (10.0.1.0/24)', 'Virtual Router'],
        description: 'Có địa chỉ IP công cộng, nhận lưu lượng từ Internet và đóng vai trò trạm trung chuyển an toàn.'
      },
      {
        tier: 'Private Subnet (App & DB)',
        components: ['App Server (10.0.11.0/24)', 'DB Server (10.0.12.0/24)'],
        description: 'Chỉ có địa chỉ IP riêng nội bộ, không thể bị truy cập trực tiếp từ Internet, đi ra ngoài qua NAT Gateway.'
      }
    ],
    keySkillsDemonstrated: [
      'Thiết kế kiến trúc mạng Multi-Tier Subnetting (CIDR)',
      'Cấu hình Linux Network Namespaces & Virtual Ethernet Pairs (veth)',
      'Thiết lập Source NAT (SNAT) và IP Masquerading với iptables',
      'Quản lý bảng định tuyến Route Tables & Default Gateway'
    ],
    stepByStepGuide: [
      {
        phase: 'Giai Đoạn 1',
        title: 'Quy Hoạch Dải Mạng & Tạo Network Namespaces',
        tasks: [
          'Quy hoạch mạng chính `10.0.0.0/16`.',
          'Tạo 2 không gian mạng ảo cô lập: `net-public` (10.0.1.0/24) và `net-private` (10.0.11.0/24).',
          'Kết nối 2 không gian mạng thông qua cặp card mạng ảo `veth-pair`.'
        ],
        codeSnippets: [
          {
            title: 'Lệnh tạo Network Namespaces trên Linux',
            language: 'bash',
            code: `# 1. Tạo 2 network namespaces
sudo ip netns add ns-public
sudo ip netns add ns-private

# 2. Tạo cặp veth pair kết nối
sudo ip link add veth-pub type veth peer name veth-priv
sudo ip link set veth-pub netns ns-public
sudo ip link set veth-priv netns ns-private

# 3. Gán IP cho từng card mạng ảo
sudo ip netns exec ns-public ip addr add 10.0.1.1/24 dev veth-pub
sudo ip netns exec ns-public ip link set veth-pub up

sudo ip netns exec ns-private ip addr add 10.0.1.2/24 dev veth-priv
sudo ip netns exec ns-private ip link set veth-priv up`
          }
        ]
      },
      {
        phase: 'Giai Đoạn 2',
        title: 'Cấu Hình NAT Masquerading & Định Tuyến Ra Internet',
        tasks: [
          'Bật tính năng IP Forwarding của nhân Linux trong `/proc/sys/net/ipv4/ip_forward`.',
          'Thêm quy tắc iptables MASQUERADE ở chuỗi POSTROUTING.',
          'Thêm Default Gateway `0.0.0.0/0` trong namespace private trỏ tới IP của namespace public.'
        ],
        codeSnippets: [
          {
            title: 'Cấu hình iptables SNAT',
            language: 'bash',
            code: `# Bật IP Forwarding
echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward

# Thiết lập iptables NAT Masquerade
sudo iptables -t nat -A POSTROUTING -s 10.0.11.0/24 -o eth0 -j MASQUERADE

# Kiểm tra kết nối từ private namespace ra Internet
sudo ip netns exec ns-private ping -c 4 8.8.8.8`
          }
        ]
      }
    ],
    interviewStarStory: {
      situation: 'Để chuẩn bị nắm vững cơ chế hoạt động của Amazon VPC trước khi thao tác trên AWS Console, em đã tự xây dựng một mô hình lab mô phỏng VPC hoàn chỉnh trên Linux.',
      task: 'Mục tiêu là tái hiện chính xác luồng gói tin giữa Public Subnet, Private Subnet, Route Table và NAT Gateway ở tầng kernel Linux.',
      action: 'Em sử dụng Linux Network Namespaces để tạo các vùng mạng con cô lập, kết nối bằng veth-pairs, cấu hình iptables POSTROUTING MASQUERADE và bảng định tuyến Default Route `0.0.0.0/0`.',
      result: 'Mô hình hoạt động hoàn hảo, giúp em hiểu sâu sắc 100% bản chất luồng dữ liệu VPC trước khi học AWS SAA-C03, không bị bỡ ngỡ khi debug lỗi mạng.'
    },
    cvBulletPointTips: [
      'Thiết kế và mô phỏng thành công kiến trúc mạng phân lớp (3-Tier VPC Subnetting) với dải IP RFC 1918 và bảng định tuyến đa vùng.',
      'Làm chủ cơ chế định tuyến gói tin, Source NAT (SNAT), PAT và tường lửa lọc gói tin iptables.'
    ]
  },
  {
    id: 'proj-docker-3tier-app',
    domainId: 'cloud_fundamentals',
    title: 'Dự Án 3: Đóng Gói Container & Điều Phối Ứng Dụng 3-Tier với Docker Compose',
    subtitle: 'Xây dựng hệ thống gồm Nginx Load Balancer, Node.js API và PostgreSQL Database với Volume lưu trữ bền vững.',
    targetRole: 'Junior DevOps / Cloud Application Developer',
    difficulty: 'Trung bình',
    estimatedHours: 10,
    prerequisites: ['Kiến thức Dockerfile & Container', 'Mô hình Web 3-Tier', 'Cơ sở dữ liệu PostgreSQL'],
    summary: 'Đóng gói toàn bộ ứng dụng web 3 lớp vào các Docker container độc lập, tối ưu hóa kích thước image với Multi-Stage Build, thiết lập mạng nội bộ Bridge Network và điều phối toàn bộ hệ thống chỉ với một file `docker-compose.yml`.',
    realWorldScenario: 'Đội ngũ phát triển cần một môi trường chạy ứng dụng đồng nhất giữa máy tính cá nhân (Local Dev) và môi trường máy chủ đám mây (Cloud Staging/Production) để loại bỏ hoàn toàn lỗi "code chạy trên máy em bình thường nhưng lên server bị lỗi".',
    architectureComponents: [
      {
        tier: 'Reverse Proxy Tier',
        components: ['Nginx Container (Alpine)'],
        description: 'Mở cổng 80/443, cân bằng tải Round Robin tới các bản sao (replicas) của Backend API.'
      },
      {
        tier: 'Application Tier',
        components: ['Node.js Express / Python FastAPI Containers'],
        description: 'Được đóng gói bằng Multi-stage build (kích thước < 80MB), kết nối tới Database qua tên dịch vụ nội bộ (Docker DNS).'
      },
      {
        tier: 'Database Tier',
        components: ['PostgreSQL 16 Container', 'Docker Named Volume'],
        description: 'Dữ liệu được gắn vào Volume `postgres_data` để đảm bảo dữ liệu không bị mất khi container khởi động lại.'
      }
    ],
    keySkillsDemonstrated: [
      'Viết Dockerfile Multi-Stage Build tối ưu hóa dung lượng và bảo mật',
      'Cấu hình Docker Compose đa dịch vụ (Services, Networks, Volumes)',
      'Quản lý biến môi trường bảo mật bằng tệp `.env`',
      'Kiểm tra sức khỏe dịch vụ tự động với Docker Healthchecks'
    ],
    stepByStepGuide: [
      {
        phase: 'Giai Đoạn 1',
        title: 'Xây Dựng Dockerfile Multi-Stage Cho Backend API',
        tasks: [
          'Tạo file `.dockerignore` loại bỏ `node_modules` và file rác.',
          'Viết Dockerfile gồm 2 giai đoạn: Giai đoạn 1 biên dịch mã nguồn TypeScript, Giai đoạn 2 chạy bản build trên image `alpine` siêu nhẹ.',
          'Tạo người dùng không có quyền root (`USER node`) để nâng cao bảo mật container.'
        ],
        codeSnippets: [
          {
            title: 'Dockerfile chuẩn tối ưu hóa',
            language: 'dockerfile',
            code: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]`
          }
        ]
      },
      {
        phase: 'Giai Đoạn 2',
        title: 'Viết File docker-compose.yml Điều Phối Toàn Bộ 3 Lớp',
        tasks: [
          'Định nghĩa 3 services: `proxy`, `api`, `db`.',
          'Thiết lập mạng nội bộ `app-network` và volume `db-data`.',
          'Sử dụng `depends_on` kèm `condition: service_healthy` để đảm bảo API chỉ khởi động sau khi DB đã sẵn sàng nhận kết nối.'
        ],
        codeSnippets: [
          {
            title: 'File docker-compose.yml hoàn chỉnh',
            language: 'yaml',
            code: `version: '3.8'

services:
  proxy:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - api
    networks:
      - app-network

  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      - DB_HOST=db
      - DB_USER=postgres
      - DB_PASSWORD=secretpassword
      - DB_NAME=cloud_portal
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=secretpassword
      - POSTGRES_DB=cloud_portal
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - app-network

volumes:
  db-data:

networks:
  app-network:
    driver: bridge`
          }
        ]
      }
    ],
    interviewStarStory: {
      situation: 'Trước đây khi các thành viên mới gia nhập dự án, họ thường mất từ 1-2 ngày để cài đặt môi trường Node, PostgreSQL, Nginx với các phiên bản không đồng nhất.',
      task: 'Em đã chủ động chuẩn hóa toàn bộ kiến trúc ứng dụng thành các container độc lập có thể khởi chạy chỉ bằng một câu lệnh duy nhất.',
      action: 'Em đã viết Dockerfile Multi-Stage Build giúp giảm dung lượng image từ 950MB xuống còn 75MB. Đồng thời xây dựng cấu hình Docker Compose tích hợp Healthcheck cho PostgreSQL và Nginx Reverse Proxy cân bằng tải.',
      result: 'Thời gian onboarding thành viên mới giảm từ 2 ngày xuống còn 5 phút (`docker compose up -d`). Đồng thời chuẩn bị sẵn sàng 100% để triển khai lên AWS Elastic Container Service (ECS).'
    },
    cvBulletPointTips: [
      'Đóng gói và điều phối kiến trúc ứng dụng 3 lớp (Nginx, Node.js API, PostgreSQL) bằng Docker & Docker Compose.',
      'Tối ưu hóa Docker Image qua kỹ thuật Multi-Stage Build, giảm hơn 90% kích thước image và nâng cao bảo mật container.'
    ]
  },
  {
    id: 'proj-bash-python-monitoring',
    domainId: 'git_scripting',
    title: 'Dự Án 4: Hệ Thống Giám Sát Máy Chủ Tự Động & Gửi Cảnh Báo Telegram/Discord',
    subtitle: 'Viết kịch bản Bash & Python thu thập số liệu CPU, RAM, Disk, kiểm tra HTTP Health Checks và bắn cảnh báo tức thì.',
    targetRole: 'Junior DevOps / Cloud Monitoring Specialist',
    difficulty: 'Trung bình',
    estimatedHours: 8,
    prerequisites: ['Bash Scripting cơ bản', 'Python Requests module', 'Webhook API (Telegram/Discord)'],
    summary: 'Xây dựng một hệ thống giám sát máy chủ nhẹ (Lightweight Monitoring Agent) không cần cài đặt phần mềm nặng nề: Định kỳ kiểm tra dung lượng ổ đĩa, tỷ lệ RAM/CPU, tình trạng sống còn của các Web Endpoint và tự động gửi thông báo định dạng đẹp mắt về nhóm Telegram/Discord của đội kỹ thuật.',
    realWorldScenario: 'Công ty vận hành 5 máy chủ Linux không có ngân sách sử dụng các dịch vụ SaaS giám sát đắt đỏ như Datadog hay New Relic. Bạn được giao nhiệm vụ xây dựng giải pháp cảnh báo tự động nhanh chóng để phát hiện sự cố trước khi người dùng báo cáo.',
    architectureComponents: [
      {
        tier: 'Data Collection Layer',
        components: ['Bash Script (`df`, `free`, `top`)', 'Python Script (`requests`, `psutil`)'],
        description: 'Đọc thông số trực tiếp từ kernel `/proc` và gửi yêu cầu kiểm tra mã HTTP của các endpoint.'
      },
      {
        tier: 'Automation & Scheduler Layer',
        components: ['Linux Crontab / Systemd Timer'],
        description: 'Tự động kích hoạt kịch bản giám sát mỗi 5 phút một lần.'
      },
      {
        tier: 'Alerting & Notification Layer',
        components: ['Telegram Bot API / Discord Webhook'],
        description: 'Định dạng thông điệp Markdown và gửi cảnh báo ngay khi các ngưỡng tài nguyên bị vượt quá.'
      }
    ],
    keySkillsDemonstrated: [
      'Lập trình kịch bản Bash Shell nâng cao với cờ an toàn `set -euo pipefail`',
      'Python Automation Scripting tương tác REST API và Webhooks',
      'Thiết lập lập lịch tự động với Linux Crontab',
      'Xử lý số liệu và chuỗi văn bản với `awk`, `grep`, `sed`'
    ],
    stepByStepGuide: [
      {
        phase: 'Giai Đoạn 1',
        title: 'Viết Kịch Bản Python Giám Sát & Bắn Cảnh Báo Webhook',
        tasks: [
          'Tạo Telegram Bot thông qua `@BotFather` để lấy Bot Token và Chat ID.',
          'Viết script Python đọc danh sách URL từ file cấu hình JSON.',
          'Tính toán thời gian phản hồi (Latency) và mã trạng thái HTTP.',
          'Gửi cảnh báo nếu mã trạng thái khác 200 hoặc thời gian phản hồi vượt quá 2000ms.'
        ],
        codeSnippets: [
          {
            title: 'Kịch bản Python giám sát hoàn chỉnh',
            language: 'python',
            code: `import os
import time
import requests

TELEGRAM_BOT_TOKEN = os.environ.get("TG_BOT_TOKEN", "YOUR_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.environ.get("TG_CHAT_ID", "YOUR_CHAT_ID")

TARGET_URLS = [
    {"name": "Cổng Sinh Viên", "url": "https://httpbin.org/status/200"},
    {"name": "API Đăng Ký", "url": "https://httpbin.org/status/500"}
]

def send_alert(message):
    api_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "Markdown"
    }
    try:
        requests.post(api_url, json=payload, timeout=5)
    except Exception as e:
        print(f"Lỗi gửi cảnh báo: {e}")

def monitor_services():
    for item in TARGET_URLS:
        start_time = time.time()
        try:
            res = requests.get(item["url"], timeout=5)
            latency_ms = round((time.time() - start_time) * 1000)
            
            if res.status_code != 200:
                msg = f"🚨 *CẢNH BÁO SỰ CỐ DỊCH VỤ* 🚨\n\n• Dịch vụ: *{item['name']}*\n• URL: \`{item['url']}\`\n• Mã lỗi: *{res.status_code}*\n• Độ trễ: *{latency_ms}ms*\n• Thời gian: {time.strftime('%Y-%m-%d %H:%M:%S')}"
                send_alert(msg)
            else:
                print(f"✅ {item['name']} hoạt động tốt ({latency_ms}ms)")
        except requests.RequestException as err:
            msg = f"🔥 *DỊCH VỤ SẬP HOÀN TOÀN* 🔥\n\n• Dịch vụ: *{item['name']}*\n• Lỗi: \`{str(err)}\`"
            send_alert(msg)

if __name__ == "__main__":
    monitor_services()`
          }
        ]
      }
    ],
    interviewStarStory: {
      situation: 'Nhóm quản trị hệ thống trước đây không có công cụ phát hiện sớm khi máy chủ hết dung lượng ổ đĩa hoặc API backend bị treo.',
      task: 'Em đã xây dựng một giải pháp kịch bản tự động hóa giám sát tài nguyên máy chủ và tình trạng các API quan trọng.',
      action: 'Em kết hợp kịch bản Bash kiểm tra tài nguyên hệ thống (`df`, `free`) và script Python kiểm tra HTTP health check, sau đó tích hợp Webhook gửi thông báo tức thì vào kênh Telegram của đội kỹ thuật.',
      result: 'Hệ thống đã giúp đội kỹ thuật phát hiện và xử lý sự cố tràn log đĩa trước khi dịch vụ bị gián đoạn, duy trì tỷ lệ Uptime 99.9%.'
    },
    cvBulletPointTips: [
      'Xây dựng kịch bản Python/Bash tự động hóa giám sát sức khỏe máy chủ và HTTP Webhooks gửi cảnh báo thời gian thực.',
      'Thiết lập crontab tự động hóa quy trình kiểm tra sức khỏe hệ thống, giảm thời gian phản hồi sự cố (MTTR).'
    ]
  },
  {
    id: 'proj-git-cicd-pipeline',
    domainId: 'git_scripting',
    title: 'Dự Án 5: Thiết Lập Quy Trình Git Branching & CI/CD Pipeline Tự Động Với GitHub Actions',
    subtitle: 'Chuẩn hóa quy trình làm việc nhóm, tự động kiểm thử mã nguồn, build Docker image và deploy lên máy chủ.',
    targetRole: 'Junior DevOps Engineer / Cloud CI-CD Specialist',
    difficulty: 'Nâng cao',
    estimatedHours: 12,
    prerequisites: ['Git Branching & Pull Request', 'Docker', 'GitHub Actions syntax'],
    summary: 'Xây dựng đường ống tự động hóa hoàn chỉnh từ lúc lập trình viên đẩy mã nguồn lên GitHub: Tự động chạy Linting, Unit Tests, Build Docker Image, đẩy lên Docker Hub và SSH vào máy chủ Linux để cập nhật container phiên bản mới mà không cần thao tác thủ công.',
    realWorldScenario: 'Quy trình triển khai mã nguồn hiện tại của nhóm làm thủ công bằng cách FTP hoặc kéo code trực tiếp trên máy chủ sản xuất, thường xuyên gây lỗi gián đoạn dịch vụ và không thể rollback khi có bug.',
    architectureComponents: [
      {
        tier: 'Source Control & Branching',
        components: ['GitHub Repository', 'Trunk-based / Feature Branching', 'Branch Protection Rules'],
        description: 'Bảo vệ nhánh `main`, bắt buộc phải tạo Pull Request và vượt qua toàn bộ bài kiểm thử tự động mới được merge.'
      },
      {
        tier: 'Continuous Integration (CI)',
        components: ['GitHub Actions Runner', 'Node.js Test Suite', 'Docker Buildx'],
        description: 'Tự động kiểm tra chất lượng mã nguồn và build Docker container image.'
      },
      {
        tier: 'Continuous Deployment (CD)',
        components: ['Appleboy SSH Action', 'Docker Compose on Linux Server'],
        description: 'Sử dụng SSH Key lưu trong GitHub Secrets để kết nối vào máy chủ và cập nhật dịch vụ.'
      }
    ],
    keySkillsDemonstrated: [
      'Quy trình quản lý mã nguồn chuyên nghiệp với Git Branching & Pull Requests',
      'Viết GitHub Actions Workflow YAML chuẩn hóa',
      'Quản lý bí mật an toàn với GitHub Repository Secrets',
      'Triển khai tự động hóa không gián đoạn dịch vụ (Zero-downtime deployment)'
    ],
    stepByStepGuide: [
      {
        phase: 'Giai Đoạn 1',
        title: 'Viết File Cấu Hình GitHub Actions CI/CD Pipeline',
        tasks: [
          'Tạo thư mục `.github/workflows/` và tệp `deploy.yml`.',
          'Định nghĩa 2 Jobs: `test-and-build` và `deploy-to-server`.',
          'Cấu hình GitHub Secrets (`SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`).'
        ],
        codeSnippets: [
          {
            title: 'File workflow CI/CD GitHub Actions mẫu',
            language: 'yaml',
            code: `name: CI/CD Production Pipeline

on:
  push:
    branches: [ "main" ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Linter & Tests
        run: |
          npm run lint --if-present
          npm test --if-present

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Server via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: \${{ secrets.SERVER_IP }}
          username: \${{ secrets.SERVER_USER }}
          key: \${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/app
            git pull origin main
            docker compose down
            docker compose up -d --build`
          }
        ]
      }
    ],
    interviewStarStory: {
      situation: 'Quy trình triển khai của nhóm trước đây là copy file thủ công qua WinSCP, dẫn đến việc thường xuyên bị sót file cấu hình và không kiểm soát được phiên bản đang chạy.',
      task: 'Em chịu trách nhiệm thiết lập quy trình tự động hóa CI/CD hoàn chỉnh từ khâu viết code đến khâu phát hành lên máy chủ.',
      action: 'Em đã xây dựng GitHub Actions Workflow tự động chạy kiểm thử linter/unit test mỗi khi có commit mới. Khi merge vào nhánh main, pipeline sẽ tự động SSH vào máy chủ Linux và cập nhật container Docker với phiên bản mới.',
      result: 'Loại bỏ 100% lỗi do con người gây ra khi triển khai, giảm thời gian phát hành từ 30 phút xuống còn dưới 2 phút.'
    },
    cvBulletPointTips: [
      'Thiết kế và triển khai CI/CD Pipeline tự động với GitHub Actions, tự động hóa kiểm thử mã nguồn và triển khai lên máy chủ Linux.',
      'Áp dụng quy trình Git Flow / Trunk-Based Development và quản lý bảo mật thông tin bí mật với GitHub Secrets.'
    ]
  }
];
