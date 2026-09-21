import React, { useState } from 'react';
import { 
  Terminal, 
  Settings, 
  AlertTriangle, 
  Play, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Server, 
  Cpu, 
  HardDrive,
  Activity,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { VisualDiagram } from '../diagrams/VisualDiagram';

export const LinuxAdminPlayView: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'terminal_sim' | 'config_builder' | 'incident_simulator'>('terminal_sim');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // 1. Terminal Simulator State
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string; isError?: boolean }>>([
    { cmd: 'uname -a', output: 'Linux aws-ec2-prod-node01 6.5.0-aws #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' },
    { cmd: 'whoami', output: 'devops-admin (uid=1000, gid=1000, groups=1000,sudo,docker)' }
  ]);
  const [currentInput, setCurrentInput] = useState<string>('');

  // 2. Config Builder State
  const [configType, setConfigType] = useState<'nginx' | 'systemd' | 'sysctl' | 'backup_script'>('nginx');
  const [appName, setAppName] = useState<string>('my-web-app');
  const [appDomain, setAppDomain] = useState<string>('api.example.com');
  const [appPort, setAppPort] = useState<number>(3000);
  const [enableSsl, setEnableSsl] = useState<boolean>(true);
  const [enableGzip, setEnableGzip] = useState<boolean>(true);

  // 3. Incident Commander State
  const [incidentStep, setIncidentStep] = useState<number>(0);
  const [incidentScenario, setIncidentScenario] = useState<'502_bad_gateway' | 'oom_killer_db' | 'disk_full_deleted_files'>('502_bad_gateway');
  const [incidentLogs, setIncidentLogs] = useState<string[]>([]);
  const [incidentSolved, setIncidentSolved] = useState<boolean>(false);

  // Handle Terminal Commands
  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = currentInput.trim();
    if (!raw) return;

    if (raw === 'clear') {
      setTerminalHistory([]);
      setCurrentInput('');
      return;
    }

    let output = '';
    let isError = false;

    const cmdLower = raw.toLowerCase();

    if (cmdLower === 'help') {
      output = `Các lệnh mẫu có thể gõ:\n- ls -la / ls -lh\n- ps aux | top\n- systemctl status nginx / postgresql\n- systemctl restart nginx\n- chmod 600 id_ed25519 / chmod 755 app.sh\n- df -h / free -h\n- ss -tulpn\n- docker ps\n- nginx -t\n- dmesg | grep oom\n- cat /etc/os-release\n- uptime / whoami\n- clear (Xóa màn hình)`;
    } else if (cmdLower.startsWith('ls')) {
      output = `total 36\ndrwxr-xr-x 5 devops-admin devops-admin 4096 Sep 21 08:30 .\ndrwxr-xr-x 3 root         root         4096 Sep 20 12:00 ..\n-rw------- 1 devops-admin devops-admin  419 Sep 21 08:15 id_ed25519\n-rw-r--r-- 1 devops-admin devops-admin   98 Sep 21 08:15 id_ed25519.pub\n-rwxr-xr-x 1 devops-admin devops-admin 2048 Sep 21 08:20 deploy.sh\n-rw-r--r-- 1 devops-admin devops-admin 1024 Sep 21 08:25 server.conf\ndrwxr-xr-x 2 devops-admin devops-admin 4096 Sep 21 08:30 dist`;
    } else if (cmdLower.startsWith('ps aux') || cmdLower === 'ps') {
      output = `USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot           1  0.0  0.2 168420 12560 ?        Ss   Sep20   0:04 /sbin/init\nroot         892  0.0  0.4  89400 18450 ?        Ss   Sep20   0:01 /usr/sbin/sshd -D\nwww-data    1450  0.2  1.2 145000 48900 ?        S    08:00   0:15 nginx: master process\npostgres    2104  0.5  4.8 450000 198000 ?       S    08:00   0:42 /usr/lib/postgresql/15/bin/postgres\ndeployer    3402  1.2  3.4 320000 142000 ?       Sl   08:15   1:12 node /var/www/my-api/dist/server.js`;
    } else if (cmdLower.startsWith('systemctl status nginx')) {
      output = `● nginx.service - A high performance web server and a reverse proxy server\n     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)\n     Active: active (running) since Mon 2026-09-21 08:00:12 UTC; 3h 25min ago\n   Main PID: 1450 (nginx)\n      Tasks: 5 (limit: 4680)\n     Memory: 48.9M (limit: 512.0M)\n     CGroup: /system.slice/nginx.service\n             ├─1450 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"\n             └─1451 "nginx: worker process"`;
    } else if (cmdLower.startsWith('systemctl restart nginx')) {
      output = `[sudo] password for devops-admin:\n✓ Dịch vụ nginx đã được khởi động lại thành công (Zero-Downtime Reload verified).`;
    } else if (cmdLower.startsWith('systemctl status postgresql') || cmdLower.startsWith('systemctl status postgres')) {
      output = `● postgresql.service - PostgreSQL RDBMS\n     Loaded: loaded (/lib/systemd/system/postgresql.service; enabled)\n     Active: active (running) since Mon 2026-09-21 08:00:12 UTC\n   Main PID: 2104 (postgres)\n     Memory: 198.0M\n     CGroup: /system.slice/postgresql.service`;
    } else if (cmdLower.startsWith('nginx -t')) {
      output = `nginx: the configuration file /etc/nginx/nginx.conf syntax is ok\nnginx: configuration file /etc/nginx/nginx.conf test is successful`;
    } else if (cmdLower.startsWith('df')) {
      output = `Filesystem     Type   Size  Used Avail Use% Mounted on\n/dev/nvme0n1p1 xfs     50G   14G   36G  28% /\ntmpfs          tmpfs  3.9G     0  3.9G   0% /dev/shm\n/dev/nvme1n1   ext4   100G   24G   76G  24% /var/lib/postgresql/data`;
    } else if (cmdLower.startsWith('free')) {
      output = `               total        used        free      shared  buff/cache   available\nMem:           7.8Gi       2.4Gi       3.1Gi       128Mi       2.3Gi       5.1Gi\nSwap:          4.0Gi       256Mi       3.7Gi`;
    } else if (cmdLower.startsWith('ss')) {
      output = `Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:PortProcess\ntcp   LISTEN 0      128          0.0.0.0:22         0.0.0.0:*    users:(("sshd",pid=892,fd=3))\ntcp   LISTEN 0      511          0.0.0.0:80         0.0.0.0:*    users:(("nginx",pid=1450,fd=6))\ntcp   LISTEN 0      511          0.0.0.0:443        0.0.0.0:*    users:(("nginx",pid=1450,fd=7))\ntcp   LISTEN 0      128        127.0.0.1:5432       0.0.0.0:*    users:(("postgres",pid=2104,fd=5))\ntcp   LISTEN 0      128        127.0.0.1:3000       0.0.0.0:*    users:(("node",pid=3402,fd=18))`;
    } else if (cmdLower.startsWith('docker ps')) {
      output = `CONTAINER ID   IMAGE          COMMAND                  CREATED        STATUS        PORTS                    NAMES\na1b2c3d4e5f6   redis:7-alpine "docker-entrypoint.s…"   3 hours ago    Up 3 hours    127.0.0.1:6379->6379/tcp prod-redis\n9f8e7d6c5b4a   qdrant/qdrant  "./qdrant"               3 hours ago    Up 3 hours    127.0.0.1:6333->6333/tcp prod-qdrant`;
    } else if (cmdLower.includes('dmesg') && cmdLower.includes('oom')) {
      output = `[  4582.102341] Out of memory: Killed process 28904 (python3-leak) total-vm:4194304kB, anon-rss:3890124kB, file-rss:0kB, shmem-rss:0kB, oom_score_adj:0\n[  4582.102390] oom_reaper: reaped process 28904 (python3-leak), now anon-rss:0kB, file-rss:0kB, shmem-rss:0kB`;
    } else if (cmdLower.startsWith('chmod 600') || cmdLower.startsWith('chmod 755') || cmdLower.startsWith('chmod')) {
      output = `✓ Quyền hạn tệp tin đã được cập nhật thành công (chmod executed).`;
    } else if (cmdLower.startsWith('cat /etc/os-release')) {
      output = `NAME="Ubuntu"\nVERSION="24.04 LTS (Noble Numbat)"\nID=ubuntu\nID_LIKE=debian\nPRETTY_NAME="Ubuntu 24.04 LTS"\nVERSION_ID="24.04"\nHOME_URL="https://www.ubuntu.com/"`;
    } else if (cmdLower === 'uptime') {
      output = ` 08:35:12 up 14 days,  3:12,  2 users,  load average: 0.42, 0.38, 0.29`;
    } else if (cmdLower === 'whoami') {
      output = `devops-admin (uid=1000, gid=1000, groups=1000,sudo,docker)`;
    } else {
      output = `bash: ${raw}: command not found. Gõ 'help' để xem danh sách các lệnh thực tế được hỗ trợ.`;
      isError = true;
    }

    setTerminalHistory(prev => [...prev, { cmd: raw, output, isError }]);
    setCurrentInput('');
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Generated Production Configs
  const generatedNginxConfig = `upstream backend_${appName.replace(/-/g, '_')} {
    server 127.0.0.1:${appPort} max_fails=3 fail_timeout=10s;
    keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name ${appDomain};
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${appDomain};

    ${enableSsl ? `# SSL Certificates (Let's Encrypt Certbot)
    ssl_certificate /etc/letsencrypt/live/${appDomain}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${appDomain}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;` : '# SSL disabled'}

    ${enableGzip ? `# Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;` : ''}

    location / {
        proxy_pass http://backend_${appName.replace(/-/g, '_')};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }
}`;

  const generatedSystemdConfig = `[Unit]
Description=${appName} Production Service
After=network.target postgresql.service redis.service
Wants=postgresql.service

[Service]
Type=simple
User=deployer
Group=deployer
WorkingDirectory=/var/www/${appName}
EnvironmentFile=/var/www/${appName}/.env
ExecStart=/usr/bin/node /var/www/${appName}/dist/server.js

# Auto-recovery policy
Restart=always
RestartSec=5s

# Security and Resource Controls
LimitNOFILE=65535
MemoryMax=1.5G
CPUQuota=200%
OOMScoreAdjust=-500

StandardOutput=journal
StandardError=journal
SyslogIdentifier=${appName}

[Install]
WantedBy=multi-user.target`;

  const generatedSysctlConfig = `# /etc/sysctl.conf - Enterprise Linux Server Hardening
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_fin_timeout = 15
vm.overcommit_memory = 1
vm.swappiness = 10
fs.file-max = 2097152

# /etc/security/limits.conf
* soft nofile 65535
* hard nofile 65535
* soft nproc 32768
* hard nproc 32768`;

  const generatedBackupScript = `#!/usr/bin/env bash
set -euo pipefail

DB_NAME="prod_database"
DB_USER="postgres"
BACKUP_DIR="/var/backups/database"
S3_BUCKET="s3://my-company-db-backups/postgres"
DATE=$(date +"%Y%m%d_%H%M%S")
FILENAME="db_\${DB_NAME}_\${DATE}.sql.gz"

mkdir -p "$BACKUP_DIR"
echo "=== [$(date)] BẮT ĐẦU SAO LƯU DATABASE ==="

pg_dump -U "$DB_USER" -d "$DB_NAME" | gzip > "$BACKUP_DIR/$FILENAME"
echo "✓ Dump hoàn tất: $FILENAME"

aws s3 cp "$BACKUP_DIR/$FILENAME" "$S3_BUCKET/$FILENAME" --storage-class STANDARD_IA
echo "✓ Đã đồng bộ an toàn lên AWS S3"

# Xóa các bản cũ hơn 7 ngày
find "$BACKUP_DIR" -type f -name "db_*.sql.gz" -mtime +7 -exec rm -f {} \\;
echo "=== [$(date)] SAO LƯU THÀNH CÔNG ==="`;

  // Incident Commander Actions
  const handleIncidentAction = (action: string) => {
    if (incidentScenario === '502_bad_gateway') {
      if (action === 'check_nginx_log') {
        setIncidentLogs(prev => [...prev, 'Nginx error.log: connect() failed (111: Connection refused) while connecting to upstream 127.0.0.1:3000']);
      } else if (action === 'check_systemctl') {
        setIncidentLogs(prev => [...prev, 'systemctl status node-api: Active: inactive (dead) - Service bị dừng do crash code']);
      } else if (action === 'restart_service') {
        setIncidentLogs(prev => [...prev, 'systemctl restart node-api: ✓ Dịch vụ đã khởi động lại và lắng nghe trên port 3000!', 'Curl test HTTP: 200 OK! Sự cố 502 Bad Gateway đã được giải quyết triệt để 🎯']);
        setIncidentSolved(true);
      }
    } else if (incidentScenario === 'disk_full_deleted_files') {
      if (action === 'check_df') {
        setIncidentLogs(prev => [...prev, 'df -h: /dev/nvme0n1p1 Size: 50G, Used: 50G (100%), Avail: 0G ⚠️']);
      } else if (action === 'check_lsof') {
        setIncidentLogs(prev => [...prev, 'sudo lsof +L1: python3 (PID 1420) đang giữ file descriptor /var/log/app.log (32GB) đã bị xóa (deleted)']);
      } else if (action === 'restart_process') {
        setIncidentLogs(prev => [...prev, 'systemctl reload app: Tiến trình đã giải phóng file descriptor!', 'df -h: /dev/nvme0n1p1 Size: 50G, Used: 18G (36%), Avail: 32G. Sự cố 100% Disk giải quyết thành công 🎯']);
        setIncidentSolved(true);
      }
    } else {
      if (action === 'check_dmesg') {
        setIncidentLogs(prev => [...prev, 'dmesg -T: [Today 02:15] Out of memory: Killed process 2104 (postgres) total-vm:8GB, anon-rss:7.8GB, oom_score_adj:0']);
      } else if (action === 'check_memory') {
        setIncidentLogs(prev => [...prev, 'free -h: RAM Total 8GB, Swap Total 0MB (Chưa có Swapfile!)']);
      } else if (action === 'fix_swap_oom') {
        setIncidentLogs(prev => [...prev, 'Tạo Swapfile 4GB + Đặt OOMScoreAdjust=-1000 cho postgres.service + Start lại PostgreSQL thành công 🎯']);
        setIncidentSolved(true);
      }
    }
  };

  const handleResetIncident = () => {
    setIncidentLogs([]);
    setIncidentSolved(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-300">
      
      {/* Tool Navigation Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTool('terminal_sim')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTool === 'terminal_sim'
                ? 'bg-slate-800 text-amber-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Mô Phỏng Dòng Lệnh Linux Shell Lab</span>
          </button>
          <button
            onClick={() => setActiveTool('config_builder')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTool === 'config_builder'
                ? 'bg-slate-800 text-amber-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Trình Sinh Cấu Hình Server Chuẩn Production</span>
          </button>
          <button
            onClick={() => setActiveTool('incident_simulator')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTool === 'incident_simulator'
                ? 'bg-slate-800 text-amber-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Phòng Cứu Hộ Sự Cố Máy Chủ (SRE Runbook Lab)</span>
          </button>
        </div>
      </div>

      {/* 1. TERMINAL SIMULATOR LAB */}
      {activeTool === 'terminal_sim' && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>Phòng Thực Hành Dòng Lệnh: Linux Terminal Simulator</span>
            </h2>
            <p className="text-xs text-slate-400">
              Gõ các lệnh thực tế như <code className="text-amber-300">ps aux</code>, <code className="text-amber-300">systemctl status nginx</code>, <code className="text-amber-300">df -h</code>, <code className="text-amber-300">free -h</code>, <code className="text-amber-300">ss -tulpn</code>, hoặc gõ <code className="text-amber-300">help</code> để xem hướng dẫn.
            </p>
          </div>

          {/* Terminal Window */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
            {/* Terminal Top Window Bar */}
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-[11px] text-slate-400 ml-2 font-sans font-medium">devops-admin@aws-ec2-prod-node01:~</span>
              </div>
              <span className="text-[10px] text-slate-500 font-sans">Bash 5.2 • x86_64</span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 space-y-3 min-h-[320px] max-h-[460px] overflow-y-auto">
              <div className="text-slate-500 text-[11px] leading-relaxed">
                Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.5.0-aws x86_64)<br />
                * Documentation:  https://help.ubuntu.com<br />
                * Management:     https://landscape.canonical.com<br />
                Last login: Mon Sep 21 08:30:15 2026 from 14.161.42.10
              </div>

              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="text-amber-400 font-bold">devops-admin@aws:~$</span>
                    <span className="text-slate-100 font-semibold">{item.cmd}</span>
                  </div>
                  <pre className={`p-2 rounded bg-slate-900/60 leading-relaxed overflow-x-auto ${
                    item.isError ? 'text-red-300' : 'text-slate-300'
                  }`}>
                    <code>{item.output}</code>
                  </pre>
                </div>
              ))}

              {/* Command Input Form */}
              <form onSubmit={handleRunCommand} className="flex items-center gap-2 pt-2">
                <span className="text-amber-400 font-bold flex-shrink-0">devops-admin@aws:~$</span>
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Gõ lệnh (vd: ss -tulpn, ps aux, systemctl status nginx, df -h)..."
                  className="flex-1 bg-transparent border-none text-slate-100 focus:outline-none focus:ring-0 font-mono text-xs placeholder-slate-600"
                  autoFocus
                />
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTION CONFIG BUILDER */}
      {activeTool === 'config_builder' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-400" />
              <span>Trình Sinh Tệp Cấu Hình Server Chuẩn Doanh Nghiệp</span>
            </h2>
            <p className="text-xs text-slate-400">
              Tùy chỉnh thông số ứng dụng để hệ thống tự động sinh cấu hình chuẩn bảo mật, sẵn sàng copy triển khai ngay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Config Type Selector */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <label className="font-semibold text-slate-300 font-mono uppercase text-[11px]">1. Chọn loại cấu hình:</label>
              <div className="space-y-1.5">
                {[
                  { id: 'nginx', label: 'Nginx Reverse Proxy & SSL' },
                  { id: 'systemd', label: 'Systemd Service Unit File' },
                  { id: 'sysctl', label: 'Kernel Hardening (sysctl + limits)' },
                  { id: 'backup_script', label: 'Script Backup S3 Tự Động' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setConfigType(opt.id as any)}
                    className={`w-full p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      configType === opt.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization Inputs */}
            <div className="md:col-span-2 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <label className="font-semibold text-slate-300 font-mono uppercase text-[11px]">2. Tham số tùy biến:</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Tên Ứng Dụng (App Name):</label>
                  <input
                    type="text"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-md font-mono text-xs text-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Tên Miền (Domain):</label>
                  <input
                    type="text"
                    value={appDomain}
                    onChange={(e) => setAppDomain(e.target.value)}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-md font-mono text-xs text-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Cổng Backend (Port):</label>
                  <input
                    type="number"
                    value={appPort}
                    onChange={(e) => setAppPort(Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-md font-mono text-xs text-slate-200"
                  />
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={enableSsl}
                      onChange={(e) => setEnableSsl(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-700 text-amber-500"
                    />
                    <span>Let's Encrypt SSL</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={enableGzip}
                      onChange={(e) => setEnableGzip(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-700 text-amber-500"
                    />
                    <span>Gzip Compression</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Code Output Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Mã cấu hình tạo ra ({configType}):</span>
              <button
                onClick={() => {
                  const codeToCopy = configType === 'nginx' ? generatedNginxConfig : configType === 'systemd' ? generatedSystemdConfig : configType === 'sysctl' ? generatedSysctlConfig : generatedBackupScript;
                  handleCopy(codeToCopy, 'gen-config');
                }}
                className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer bg-slate-900 px-3 py-1 rounded border border-slate-800"
              >
                {copiedCode === 'gen-config' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Sao chép toàn bộ</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
              <code>
                {configType === 'nginx' && generatedNginxConfig}
                {configType === 'systemd' && generatedSystemdConfig}
                {configType === 'sysctl' && generatedSysctlConfig}
                {configType === 'backup_script' && generatedBackupScript}
              </code>
            </pre>
          </div>
        </div>
      )}

      {/* 3. INCIDENT COMMANDER SIMULATOR */}
      {activeTool === 'incident_simulator' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Phòng Cứu Hộ Sự Cố Máy Chủ Thực Tế (SRE Runbook Lab)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Luyện tập phản xạ xử lý sự cố máy chủ theo quy trình cô lập hiện trường chuẩn quốc tế.
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <button
              onClick={() => { setIncidentScenario('502_bad_gateway'); handleResetIncident(); }}
              className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                incidentScenario === '502_bad_gateway'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold">Tình huống 1: 502 Bad Gateway</div>
              <div className="text-[11px] text-slate-400 mt-1">Nginx báo lỗi 502 khi người dùng truy cập web</div>
            </button>

            <button
              onClick={() => { setIncidentScenario('disk_full_deleted_files'); handleResetIncident(); }}
              className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                incidentScenario === 'disk_full_deleted_files'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold">Tình huống 2: Ổ Đĩa Đầy 100% Bí Ẩn</div>
              <div className="text-[11px] text-slate-400 mt-1">Đã xóa log nhưng `df -h` vẫn báo đầy 100%</div>
            </button>

            <button
              onClick={() => { setIncidentScenario('oom_killer_db'); handleResetIncident(); }}
              className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                incidentScenario === 'oom_killer_db'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold">Tình huống 3: PostgreSQL Tự Biến Mất</div>
              <div className="text-[11px] text-slate-400 mt-1">Database bị sập lúc 2:00 sáng không rõ lý do</div>
            </button>
          </div>

          {/* Action Decision Center */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                Các thao tác điều tra & khắc phục:
              </span>
              <button
                onClick={handleResetIncident}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Làm lại tình huống</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {incidentScenario === '502_bad_gateway' && (
                <>
                  <button
                    onClick={() => handleIncidentAction('check_nginx_log')}
                    className="p-2.5 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 text-slate-300 font-medium transition-colors cursor-pointer text-left"
                  >
                    1. Đọc error.log của Nginx
                  </button>
                  <button
                    onClick={() => handleIncidentAction('check_systemctl')}
                    className="p-2.5 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 text-slate-300 font-medium transition-colors cursor-pointer text-left"
                  >
                    2. Kiểm tra `systemctl status node-api`
                  </button>
                  <button
                    onClick={() => handleIncidentAction('restart_service')}
                    className="p-2.5 bg-emerald-950/40 hover:bg-emerald-950/70 rounded-lg border border-emerald-800 text-emerald-300 font-bold transition-colors cursor-pointer text-left"
                  >
                    3. `systemctl restart node-api`
                  </button>
                </>
              )}

              {incidentScenario === 'disk_full_deleted_files' && (
                <>
                  <button
                    onClick={() => handleIncidentAction('check_df')}
                    className="p-2.5 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 text-slate-300 font-medium transition-colors cursor-pointer text-left"
                  >
                    1. Kiểm tra `df -h /`
                  </button>
                  <button
                    onClick={() => handleIncidentAction('check_lsof')}
                    className="p-2.5 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 text-slate-300 font-medium transition-colors cursor-pointer text-left"
                  >
                    2. Tìm tiến trình giữ file: `lsof +L1`
                  </button>
                  <button
                    onClick={() => handleIncidentAction('restart_process')}
                    className="p-2.5 bg-emerald-950/40 hover:bg-emerald-950/70 rounded-lg border border-emerald-800 text-emerald-300 font-bold transition-colors cursor-pointer text-left"
                  >
                    3. `systemctl reload app` giải phóng inode
                  </button>
                </>
              )}

              {incidentScenario === 'oom_killer_db' && (
                <>
                  <button
                    onClick={() => handleIncidentAction('check_dmesg')}
                    className="p-2.5 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 text-slate-300 font-medium transition-colors cursor-pointer text-left"
                  >
                    1. Đọc Kernel Log: `dmesg -T | grep oom`
                  </button>
                  <button
                    onClick={() => handleIncidentAction('check_memory')}
                    className="p-2.5 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 text-slate-300 font-medium transition-colors cursor-pointer text-left"
                  >
                    2. Kiểm tra RAM/Swap: `free -h`
                  </button>
                  <button
                    onClick={() => handleIncidentAction('fix_swap_oom')}
                    className="p-2.5 bg-emerald-950/40 hover:bg-emerald-950/70 rounded-lg border border-emerald-800 text-emerald-300 font-bold transition-colors cursor-pointer text-left"
                  >
                    3. Thêm 4GB Swap + OOMScoreAdjust=-1000
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Diagnostic Log Output */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800">
              <span>Bảng ghi nhật ký xử lý hiện trường (Incident Log):</span>
              {incidentSolved && (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> SỰ CỐ ĐÃ KHẮC PHỤC THÀNH CÔNG
                </span>
              )}
            </div>

            {incidentLogs.length === 0 ? (
              <div className="text-slate-600 italic py-4 text-center">
                Nhấp vào các nút thao tác ở trên để bắt đầu quy trình điều tra và cứu hộ sự cố...
              </div>
            ) : (
              incidentLogs.map((log, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-900/60 border border-slate-800/80 text-slate-200 leading-relaxed">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
};
