import React, { useState } from 'react';
import { 
  Server, 
  Globe, 
  ShieldCheck, 
  Layers, 
  HardDrive, 
  Cpu, 
  Terminal, 
  Box, 
  ArrowRight, 
  ArrowDown, 
  CheckCircle2, 
  Key, 
  FileText, 
  Lock, 
  Zap, 
  Info, 
  Database, 
  Cloud, 
  Share2, 
  GitBranch, 
  Mail, 
  RefreshCw, 
  AlertTriangle, 
  UserCheck, 
  Radio, 
  Network,
  Monitor,
  Building2,
  FolderTree,
  Laptop
} from 'lucide-react';

export type DiagramType = 
  | 'dns-recursive-flow'
  | 'fqdn-structure'
  | 'domain-lifecycle'
  | 'dnssec-records'
  | 'kernel-user-space'
  | 'cidr-matrix'
  | 'linux-permissions'
  | 'vm-vs-container'
  | 'aws-3tier-vpc'
  | 'aws-s3-tiers'
  | 'aws-iam-evaluation'
  | 'aws-shared-responsibility'
  | 'aws-serverless-flow'
  | 'aws-transit-gateway'
  | 'tcp-handshake'
  | 'osi-tcp-ip'
  | 'tls-handshake'
  | 'git-workflow'
  | 'acid-vs-base'
  | 'email-security-shield'
  | 'cloudflare-proxy-flow'
  | 'zero-downtime-migration'
  | 'nginx-reverse-proxy-flow';

interface VisualDiagramProps {
  type: DiagramType | string;
  title?: string;
  fallbackCode?: string;
}

export const VisualDiagram: React.FC<VisualDiagramProps> = ({ type, title, fallbackCode }) => {
  switch (type) {
    case 'dns-recursive-flow':
      return <DnsRecursiveFlowDiagram title={title} />;
    case 'fqdn-structure':
      return <FqdnStructureDiagram title={title} />;
    case 'domain-lifecycle':
      return <DomainLifecycleDiagram title={title} />;
    case 'dnssec-records':
      return <DnssecRecordsDiagram title={title} />;
    case 'kernel-user-space':
      return <KernelUserSpaceDiagram title={title} />;
    case 'cidr-matrix':
      return <CidrMatrixDiagram title={title} />;
    case 'linux-permissions':
      return <LinuxPermissionsDiagram title={title} />;
    case 'vm-vs-container':
      return <VmVsContainerDiagram title={title} />;
    case 'aws-3tier-vpc':
      return <Aws3TierVpcDiagram title={title} />;
    case 'aws-s3-tiers':
      return <AwsS3TiersDiagram title={title} />;
    case 'aws-iam-evaluation':
      return <AwsIamEvaluationDiagram title={title} />;
    case 'aws-shared-responsibility':
      return <AwsSharedResponsibilityDiagram title={title} />;
    case 'aws-serverless-flow':
      return <AwsServerlessFlowDiagram title={title} />;
    case 'aws-transit-gateway':
      return <AwsTransitGatewayDiagram title={title} />;
    case 'tcp-handshake':
      return <TcpHandshakeDiagram title={title} />;
    case 'osi-tcp-ip':
      return <OsiTcpIpDiagram title={title} />;
    case 'tls-handshake':
      return <TlsHandshakeDiagram title={title} />;
    case 'git-workflow':
      return <GitWorkflowDiagram title={title} />;
    case 'acid-vs-base':
      return <AcidVsBaseDiagram title={title} />;
    case 'email-security-shield':
      return <EmailSecurityShieldDiagram title={title} />;
    case 'cloudflare-proxy-flow':
      return <CloudflareProxyFlowDiagram title={title} />;
    case 'zero-downtime-migration':
      return <ZeroDowntimeMigrationDiagram title={title} />;
    case 'nginx-reverse-proxy-flow':
      return <NginxReverseProxyFlowDiagram title={title} />;
    default:
      if (fallbackCode) {
        return (
          <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
            <pre>{fallbackCode}</pre>
          </div>
        );
      }
      return null;
  }
};

/* =========================================================================
   1. FQDN STRUCTURE (GRAPHICAL TREE & BRACKET CANVAS)
   ========================================================================= */
const FqdnStructureDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-6 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <FolderTree className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Sơ Đồ Đồ Họa Cây Phân Cấp Tên Miền Chuẩn FQDN'}
          </h4>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-800/40">
          <span>Quy tắc: Đọc từ Phải sang Trái (Root ➔ TLD ➔ SLD ➔ Subdomain)</span>
        </div>
      </div>

      {/* Graphical Tree Canvas */}
      <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 relative space-y-6">
        
        {/* Top Visual Domain Bar */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-[11px] text-slate-500 uppercase tracking-wider font-mono font-semibold">
            Chuỗi Tên Miền Đầy Đủ (Fully Qualified Domain Name)
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-lg sm:text-2xl font-bold">
            <div className="flex flex-col items-center">
              <span className="px-4 py-2 rounded-xl bg-emerald-950/70 border-2 border-emerald-500/70 text-emerald-300 shadow-lg shadow-emerald-950/50">
                api
              </span>
              <span className="text-[10px] text-emerald-400 font-sans mt-1">Subdomain</span>
            </div>
            <span className="text-slate-500 font-bold text-xl">.</span>
            <div className="flex flex-col items-center">
              <span className="px-4 py-2 rounded-xl bg-amber-950/70 border-2 border-amber-500/70 text-amber-300 shadow-lg shadow-amber-950/50">
                mybrand
              </span>
              <span className="text-[10px] text-amber-400 font-sans mt-1">Second-Level (SLD)</span>
            </div>
            <span className="text-slate-500 font-bold text-xl">.</span>
            <div className="flex flex-col items-center">
              <span className="px-4 py-2 rounded-xl bg-indigo-950/70 border-2 border-indigo-500/70 text-indigo-300 shadow-lg shadow-indigo-950/50">
                com
              </span>
              <span className="text-[10px] text-indigo-400 font-sans mt-1">Top-Level (TLD)</span>
            </div>
            <span className="text-slate-500 font-bold text-xl">.</span>
            <div className="flex flex-col items-center">
              <span className="px-3.5 py-2 rounded-xl bg-purple-950/70 border-2 border-purple-500/70 text-purple-300 shadow-lg shadow-purple-950/50" title="Dấu chấm gốc Root">
                .
              </span>
              <span className="text-[10px] text-purple-400 font-sans mt-1">Root (.)</span>
            </div>
          </div>
        </div>

        {/* Graphical Tree SVG Connection Canvas */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide flex items-center justify-between">
            <span>Sơ Đồ Phân Nhánh Cây DNS (Tree Hierarchy Architecture)</span>
            <span className="text-[10px] text-slate-500 font-mono">13 Root Servers ➔ Registry ➔ Registrar ➔ Web Owner</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            {/* Level 0: Root */}
            <div className="p-3.5 rounded-lg bg-purple-950/30 border border-purple-800/60 flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 font-mono text-[10px] font-bold">Cấp 0 (Gốc)</span>
                  <Globe className="w-4 h-4 text-purple-400" />
                </div>
                <div className="font-bold text-slate-100 text-sm">Root Domain (.)</div>
                <div className="text-[11px] text-purple-300 font-medium">13 Cụm Root Server Toàn Cầu</div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Đỉnh cao nhất của Internet. Điều phối và chỉ đường tới các máy chủ TLD tương ứng.
              </p>
            </div>

            {/* Level 1: TLD */}
            <div className="p-3.5 rounded-lg bg-indigo-950/30 border border-indigo-800/60 flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 font-mono text-[10px] font-bold">Cấp 1 (TLD)</span>
                  <Building2 className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="font-bold text-slate-100 text-sm">Top-Level Domain</div>
                <div className="text-[11px] text-indigo-300 font-medium">Cơ quan Registry (.com, .vn)</div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Quản lý bởi Verisign (.com), VNNIC (.vn). Trả về Authoritative Nameserver của domain.
              </p>
            </div>

            {/* Level 2: SLD */}
            <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-800/60 flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 font-mono text-[10px] font-bold">Cấp 2 (SLD)</span>
                  <Key className="w-4 h-4 text-amber-400" />
                </div>
                <div className="font-bold text-slate-100 text-sm">Second-Level Domain</div>
                <div className="text-[11px] text-amber-300 font-medium">Định danh bạn đăng ký</div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Tên thương hiệu ("mybrand") mua qua Registrar (Cloudflare/Namecheap), trả phí theo năm.
              </p>
            </div>

            {/* Level 3: Subdomain */}
            <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/60 flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-mono text-[10px] font-bold">Cấp 3 (Subdomain)</span>
                  <Laptop className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="font-bold text-slate-100 text-sm">Subdomain Branch</div>
                <div className="text-[11px] text-emerald-300 font-medium">Tự do phân nhánh (Miễn phí)</div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Tiền tố nhánh dịch vụ (api, blog, app, staging) do chủ sở hữu tự tạo trong bảng DNS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. DNS RECURSIVE RESOLUTION (GRAPHICAL NETWORK TOPOLOGY & FLOW)
   ========================================================================= */
const DnsRecursiveFlowDiagram: React.FC<{ title?: string }> = ({ title }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      num: 1,
      title: 'Local Cache',
      role: 'Browser & OS Cache',
      desc: 'Trình duyệt & Hệ điều hành kiểm tra bộ nhớ đệm cục bộ xem IP đã từng lưu chưa.',
      badge: 'Chặng 1',
      color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300'
    },
    {
      num: 2,
      title: 'Recursive Resolver',
      role: 'ISP / Cloudflare 1.1.1.1',
      desc: 'Nếu cache rỗng, Resolver đóng vai trò thám tử đi hỏi 3 tầng máy chủ DNS toàn cầu.',
      badge: 'Chặng 2',
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
    },
    {
      num: 3,
      title: 'Root Nameserver (.)',
      role: '13 Cụm Server Toàn Cầu',
      desc: 'Máy chủ gốc chỉ đường: "Tôi không giữ IP, hãy hỏi TLD Server quản lý đuôi .com".',
      badge: 'Chặng 3',
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-300'
    },
    {
      num: 4,
      title: 'TLD Nameserver (.com)',
      role: 'Verisign Registry',
      desc: 'TLD Server phản hồi: "Hãy hỏi Authoritative Server của tên miền tại ns1.cloudflare.com".',
      badge: 'Chặng 4',
      color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300'
    },
    {
      num: 5,
      title: 'Authoritative Server',
      role: 'Cloudflare / Route 53',
      desc: 'Nơi giữ bản ghi A gốc! Trả về IP chính xác: 93.184.216.34 (TTL 300s) 🎯',
      badge: 'Chặng 5 (Đích)',
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
    }
  ];

  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Sơ Đồ Đồ Họa: Mạng Lưới Phân Giải DNS Đệ Quy 8 Bước'}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
          Độ trễ trung bình: ~20 - 50ms
        </span>
      </div>

      {/* Graphical Network Layout Canvas */}
      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
        {/* Step Cards with Stepper Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
          {steps.map((s) => {
            const isHovered = activeStep === s.num;
            return (
              <div
                key={s.num}
                onMouseEnter={() => setActiveStep(s.num)}
                onMouseLeave={() => setActiveStep(null)}
                className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                  s.color
                } ${isHovered ? 'scale-105 shadow-md shadow-amber-500/10' : 'opacity-90'}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold">Bước {s.num}</span>
                    <span className="text-[10px] opacity-75">{s.badge}</span>
                  </div>
                  <div className="font-semibold text-xs text-slate-100">{s.title}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{s.role}</div>
                </div>
                <p className="text-[11px] text-slate-300 mt-2 leading-snug">{s.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Visual Request-Response Data Highway */}
        <div className="bg-slate-900/80 rounded-lg p-3.5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-cyan-300">
            <Monitor className="w-4 h-4 text-cyan-400" />
            <span className="font-medium">1. Trình duyệt gõ "example.com"</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block" />
          <div className="text-amber-300 font-mono text-[11px] flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>Resolver hỏi Root ➔ TLD ➔ Authoritative</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block" />
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Nhận IP: 93.184.216.34 ➔ Tải trang</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. DOMAIN LIFECYCLE (GRAPHICAL TRANSIT TIMELINE)
   ========================================================================= */
const DomainLifecycleDiagram: React.FC<{ title?: string }> = ({ title }) => {
  const stages = [
    {
      title: 'Active (Hoạt động)',
      time: '1 - 10 năm',
      cost: 'Giá đăng ký gốc',
      status: 'Website & Mail hoạt động bình thường',
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
      badge: 'Bình thường'
    },
    {
      title: 'Auto-Renew Grace Period',
      time: '0 - 45 ngày sau hết hạn',
      cost: 'Gia hạn giá gốc (Không phạt)',
      status: 'Website bị ngắt, bạn vẫn gia hạn an toàn',
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
      badge: 'Cảnh báo gia hạn'
    },
    {
      title: 'Redemption Period',
      time: '30 ngày tiếp theo',
      cost: 'Phí phạt chuộc $80 - $250!',
      status: 'Domain bị khóa xóa, chủ cũ phải chuộc giá cao',
      color: 'border-rose-500/40 bg-rose-950/20 text-rose-300',
      badge: 'Nguy hiểm - Phí cao'
    },
    {
      title: 'Pending Delete',
      time: '5 ngày cuối cùng',
      cost: 'Không thể cứu vãn',
      status: 'Chờ Registry xóa sổ khỏi hệ thống',
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-300',
      badge: 'Chờ giải phóng'
    },
    {
      title: 'Released / Available',
      time: 'Tự do đăng ký',
      cost: 'Giá gốc hoặc đấu giá',
      status: 'Bất kỳ ai cũng có thể mua (Drop Catching)',
      color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300',
      badge: 'Công khai'
    }
  ];

  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Sơ Đồ Dòng Thời Gian: Vòng Đời Tên Miền Quốc Tế (Domain Lifecycle)'}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-400">ICANN Standard</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {stages.map((st, i) => (
          <div key={i} className={`p-3 rounded-lg border flex flex-col justify-between space-y-2 ${st.color}`}>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="font-bold uppercase tracking-wider">{st.badge}</span>
                <span className="opacity-75">{st.time}</span>
              </div>
              <div className="text-xs font-semibold text-slate-100">{st.title}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-mono font-medium text-slate-200">{st.cost}</div>
              <p className="text-[11px] text-slate-300 leading-snug">{st.status}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-amber-950/20 border border-amber-900/40 rounded-lg text-xs text-amber-300 flex items-center gap-2">
        <Info className="w-4 h-4 flex-shrink-0 text-amber-400" />
        <span>
          <strong>Kinh nghiệm vàng:</strong> Luôn bật tính năng <strong>Auto-Renew (Tự động gia hạn)</strong> và cập nhật thẻ thanh toán để không bao giờ rơi vào thời kỳ chuộc Redemption đắt đỏ!
        </span>
      </div>
    </div>
  );
};

/* =========================================================================
   4. DNSSEC CRYPTOGRAPHIC RECORDS
   ========================================================================= */
const DnssecRecordsDiagram: React.FC<{ title?: string }> = ({ title }) => {
  const records = [
    {
      name: 'DNSKEY',
      icon: Key,
      role: 'Chứa Public Key (KSK & ZSK)',
      desc: 'Cung cấp khóa công khai để Recursive Resolver dùng giải mã và xác thực các chữ ký số.',
      badge: 'Khóa công khai',
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
    },
    {
      name: 'RRSIG',
      icon: ShieldCheck,
      role: 'Chữ ký số gán kèm bản ghi',
      desc: 'Chữ ký mật mã gắn với từng bản ghi (A, AAAA, MX). Nếu hacker sửa IP, chữ ký sẽ không khớp.',
      badge: 'Chữ ký số',
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
    },
    {
      name: 'DS (Delegation Signer)',
      icon: Lock,
      role: 'Mã băm gửi lên TLD Registry',
      desc: 'Cầu nối liên kết Domain với TLD (.com, .vn) để hình thành Chuỗi tin cậy (Chain of Trust).',
      badge: 'Cầu nối Chain of Trust',
      color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300'
    },
    {
      name: 'NSEC / NSEC3',
      icon: FileText,
      role: 'Xác thực bản ghi không tồn tại',
      desc: 'Chứng minh một subdomain không tồn tại một cách an toàn mà không làm lộ toàn bộ DNS zone.',
      badge: 'Bảo mật Zone',
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-300'
    }
  ];

  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Sơ Đồ Đồ Họa: 4 Bản Ghi Mật Mã Học Cốt Lõi Trong DNSSEC'}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-400">Chain of Trust</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {records.map((r, idx) => {
          const IconComp = r.icon;
          return (
            <div key={idx} className={`p-3.5 rounded-lg border flex flex-col justify-between space-y-2 ${r.color}`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-slate-100">{r.name}</span>
                  <IconComp className="w-4 h-4 opacity-80" />
                </div>
                <div className="text-[11px] font-medium text-slate-300 mt-1">{r.role}</div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* =========================================================================
   5. KERNEL SPACE VS USER SPACE (RING ARCHITECTURE)
   ========================================================================= */
const KernelUserSpaceDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Kiến Trúc Phân Tách: Kernel Space (Ring 0) vs User Space (Ring 3)'}
          </h4>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-800/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wide">
              USER SPACE (Ring 3 - Không gian người dùng)
            </span>
            <span className="text-[10px] bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded font-mono">
              Quyền hạn bị giới hạn
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="p-2 bg-slate-900/80 rounded border border-blue-900/40 text-slate-200">
              Web Server (Nginx)
            </div>
            <div className="p-2 bg-slate-900/80 rounded border border-blue-900/40 text-slate-200">
              Python / Node.js
            </div>
            <div className="p-2 bg-slate-900/80 rounded border border-blue-900/40 text-slate-200">
              Database App (Postgres)
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 py-1 text-xs text-amber-400 font-mono">
          <ArrowDown className="w-4 h-4 animate-bounce" />
          <span className="bg-amber-950/40 border border-amber-800/50 px-3 py-1 rounded-full font-semibold">
            System Calls (Syscalls: read(), write(), fork(), socket())
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>

        <div className="p-4 rounded-lg bg-red-950/20 border border-red-800/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-300 uppercase tracking-wide">
              KERNEL SPACE (Ring 0 - Không gian nhân Linux)
            </span>
            <span className="text-[10px] bg-red-900/40 text-red-300 px-2 py-0.5 rounded font-mono">
              Toàn quyền đặc quyền tối cao
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] font-mono">
            <div className="p-2 bg-slate-900/80 rounded border border-red-900/40 text-slate-200">
              Process Scheduler
            </div>
            <div className="p-2 bg-slate-900/80 rounded border border-red-900/40 text-slate-200">
              Memory Manager
            </div>
            <div className="p-2 bg-slate-900/80 rounded border border-red-900/40 text-slate-200">
              TCP/IP Net Stack
            </div>
            <div className="p-2 bg-slate-900/80 rounded border border-red-900/40 text-slate-200">
              Device Drivers
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-around text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5"><Cpu className="w-4 h-4 text-slate-300" /> CPU</div>
          <div className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-slate-300" /> RAM (Physical)</div>
          <div className="flex items-center gap-1.5"><HardDrive className="w-4 h-4 text-slate-300" /> NVMe SSD / EBS</div>
          <div className="flex items-center gap-1.5"><Server className="w-4 h-4 text-slate-300" /> Card Mạng (NIC)</div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   6. CIDR SUBNET MATRIX
   ========================================================================= */
const CidrMatrixDiagram: React.FC<{ title?: string }> = ({ title }) => {
  const rows = [
    { prefix: '/16', mask: '255.255.0.0', total: '65,536', awsUsable: '65,531', useCase: 'Toàn bộ Amazon VPC' },
    { prefix: '/20', mask: '255.255.240.0', total: '4,096', awsUsable: '4,091', useCase: 'Large Subnet Cụm EKS' },
    { prefix: '/24', mask: '255.255.255.0', total: '256', awsUsable: '251', useCase: 'Public / Private Subnet chuẩn' },
    { prefix: '/26', mask: '255.255.255.192', total: '64', awsUsable: '59', useCase: 'Subnet Database nhỏ' },
    { prefix: '/28', mask: '255.255.255.240', total: '16', awsUsable: '11', useCase: 'Subnet tối thiểu trong AWS VPC' },
    { prefix: '/32', mask: '255.255.255.255', total: '1', awsUsable: '1 (Host)', useCase: 'Chỉ định 1 IP đơn lẻ (Security Group rule)' }
  ];

  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Ma Trận Quy Đổi CIDR Subnet & Quy Tắc 5 IP Dành Riêng AWS'}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/50">
          AWS luôn trừ 5 IP/subnet (.0, .1, .2, .3, .255)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
              <th className="py-2.5 px-3">CIDR Prefix</th>
              <th className="py-2.5 px-3">Subnet Mask</th>
              <th className="py-2.5 px-3">Tổng số IP</th>
              <th className="py-2.5 px-3 text-amber-300">IP Khả Dụng Trong AWS</th>
              <th className="py-2.5 px-3">Trường Hợp Sử Dụng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2.5 px-3 font-bold text-amber-300">{r.prefix}</td>
                <td className="py-2.5 px-3 text-slate-300">{r.mask}</td>
                <td className="py-2.5 px-3 text-slate-400">{r.total}</td>
                <td className="py-2.5 px-3 font-semibold text-emerald-400">{r.awsUsable}</td>
                <td className="py-2.5 px-3 text-slate-300 font-sans">{r.useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* =========================================================================
   7. LINUX PERMISSIONS BREAKDOWN
   ========================================================================= */
const LinuxPermissionsDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Giải Mã Chuỗi Phân Quyền Linux Bát Phân (chmod rwx)'}
          </h4>
        </div>
      </div>

      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
        <div className="text-[11px] text-slate-400 font-mono">Ví dụ chuỗi quyền khi gõ `ls -la`:</div>
        <div className="flex items-center justify-center gap-3 font-mono text-lg sm:text-2xl font-bold">
          <div className="px-3 py-1.5 rounded bg-slate-800 text-slate-400" title="File type: - (tệp thường)">
            -
          </div>
          <div className="px-3 py-1.5 rounded bg-amber-950/60 border border-amber-600/60 text-amber-300" title="Owner: rwx = 7">
            r w x
          </div>
          <div className="px-3 py-1.5 rounded bg-blue-950/60 border border-blue-600/60 text-blue-300" title="Group: r-x = 5">
            r - x
          </div>
          <div className="px-3 py-1.5 rounded bg-purple-950/60 border border-purple-600/60 text-purple-300" title="Others: r-- = 4">
            r - -
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <div className="font-semibold text-slate-400">1. Loại tệp tin</div>
          <div className="font-mono text-slate-200">`-` : Tệp thông thường</div>
          <div className="font-mono text-slate-200">`d` : Thư mục (Directory)</div>
          <div className="font-mono text-slate-200">`l` : Liên kết Symlink</div>
        </div>

        <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 space-y-1">
          <div className="font-semibold text-amber-300">2. Owner (Chủ sở hữu)</div>
          <div className="font-mono text-slate-200">r(4) + w(2) + x(1) = <strong className="text-amber-300">7</strong></div>
          <p className="text-[11px] text-slate-400">Toàn quyền đọc, ghi, thực thi.</p>
        </div>

        <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-800/40 space-y-1">
          <div className="font-semibold text-blue-300">3. Group (Nhóm)</div>
          <div className="font-mono text-slate-200">r(4) + -(0) + x(1) = <strong className="text-blue-300">5</strong></div>
          <p className="text-[11px] text-slate-400">Chỉ đọc và chạy chương trình.</p>
        </div>

        <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-800/40 space-y-1">
          <div className="font-semibold text-purple-300">4. Others (Người khác)</div>
          <div className="font-mono text-slate-200">r(4) + -(0) + -(0) = <strong className="text-purple-300">4</strong></div>
          <p className="text-[11px] text-slate-400">Chỉ có quyền đọc nội dung.</p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   8. VM VS DOCKER CONTAINER
   ========================================================================= */
const VmVsContainerDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'So Sánh Kiến Trúc: Máy Ảo (VMs) vs Docker Containers'}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2.5">
          <div className="text-center font-bold text-slate-300 font-sans pb-1 border-b border-slate-800 flex items-center justify-between">
            <span>MÁY ẢO (VIRTUAL MACHINES)</span>
            <span className="text-[10px] bg-red-950/40 text-red-300 px-2 py-0.5 rounded border border-red-900/40">
              Nhiều GBs • Khởi động phút
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="grid grid-cols-3 gap-1 text-center text-[11px]">
              <div className="p-1.5 bg-blue-950/40 border border-blue-800/40 rounded text-blue-300">App A</div>
              <div className="p-1.5 bg-blue-950/40 border border-blue-800/40 rounded text-blue-300">App B</div>
              <div className="p-1.5 bg-blue-950/40 border border-blue-800/40 rounded text-blue-300">App C</div>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center text-[10px] text-slate-400">
              <div className="p-1 bg-slate-900 rounded border border-slate-800">Libs/Bins</div>
              <div className="p-1 bg-slate-900 rounded border border-slate-800">Libs/Bins</div>
              <div className="p-1 bg-slate-900 rounded border border-slate-800">Libs/Bins</div>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center text-[10px] text-red-300 font-semibold">
              <div className="p-2 bg-red-950/30 border border-red-900/50 rounded">Guest OS 1</div>
              <div className="p-2 bg-red-950/30 border border-red-900/50 rounded">Guest OS 2</div>
              <div className="p-2 bg-red-950/30 border border-red-900/50 rounded">Guest OS 3</div>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center text-slate-300 font-semibold">
              Hypervisor (KVM / VMware ESXi)
            </div>
            <div className="p-2 bg-slate-900/60 rounded border border-slate-800 text-center text-slate-400">
              Physical Hardware (CPU/RAM/Disk)
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-950 border border-emerald-900/40 space-y-2.5">
          <div className="text-center font-bold text-emerald-300 font-sans pb-1 border-b border-slate-800 flex items-center justify-between">
            <span>CONTAINERS (DOCKER ENGINE)</span>
            <span className="text-[10px] bg-emerald-950/40 text-emerald-300 px-2 py-0.5 rounded border border-emerald-900/40">
              Vài MBs • Khởi động mili-giây
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="grid grid-cols-3 gap-1 text-center text-[11px]">
              <div className="p-1.5 bg-emerald-950/40 border border-emerald-700/50 rounded text-emerald-300">App A</div>
              <div className="p-1.5 bg-emerald-950/40 border border-emerald-700/50 rounded text-emerald-300">App B</div>
              <div className="p-1.5 bg-emerald-950/40 border border-emerald-700/50 rounded text-emerald-300">App C</div>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center text-[10px] text-slate-400">
              <div className="p-1 bg-slate-900 rounded border border-slate-800">Libs/Bins</div>
              <div className="p-1 bg-slate-900 rounded border border-slate-800">Libs/Bins</div>
              <div className="p-1 bg-slate-900 rounded border border-slate-800">Libs/Bins</div>
            </div>
            <div className="p-2 bg-emerald-950/40 border border-emerald-600/50 rounded text-center text-emerald-300 font-semibold">
              Docker Engine (Namespaces & Cgroups)
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center text-slate-200 font-semibold">
              Host OS Linux Kernel (Dùng chung)
            </div>
            <div className="p-2 bg-slate-900/60 rounded border border-slate-800 text-center text-slate-400">
              Physical Hardware (CPU/RAM/Disk)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   9. AWS 3-TIER MULTI-AZ VPC (ENTERPRISE BLUEPRINT)
   ========================================================================= */
const Aws3TierVpcDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Kiến Trúc Chuẩn Enterprise: AWS 3-Tier Multi-AZ VPC'}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
          High Availability (HA)
        </span>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>Internet Gateway (IGW) ➔ Route 0.0.0.0/0</span>
        </div>

        <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-800/40 space-y-2">
          <div className="flex items-center justify-between text-cyan-300 font-semibold">
            <span>1. PUBLIC SUBNET TIER (Cửa ngõ tiếp nhận & NAT)</span>
            <span className="font-mono text-[10px]">10.0.1.0/24 & 10.0.2.0/24</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
            <div className="p-2 bg-slate-900/90 rounded border border-cyan-700/40 text-slate-200 flex items-center justify-between">
              <span>ALB (Load Balancer) - AZ-a</span>
              <span className="text-cyan-400">Public IP</span>
            </div>
            <div className="p-2 bg-slate-900/90 rounded border border-cyan-700/40 text-slate-200 flex items-center justify-between">
              <span>NAT Gateway - AZ-b</span>
              <span className="text-cyan-400">Elastic IP</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-800/40 space-y-2">
          <div className="flex items-center justify-between text-amber-300 font-semibold">
            <span>2. PRIVATE APPLICATION TIER (Xử lý nghiệp vụ & Auto Scaling)</span>
            <span className="font-mono text-[10px]">10.0.11.0/24 & 10.0.12.0/24</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
            <div className="p-2 bg-slate-900/90 rounded border border-amber-700/40 text-slate-200 flex items-center justify-between">
              <span>EC2 Auto Scaling Group - AZ-a</span>
              <span className="text-amber-400">Private Only</span>
            </div>
            <div className="p-2 bg-slate-900/90 rounded border border-amber-700/40 text-slate-200 flex items-center justify-between">
              <span>EC2 Auto Scaling Group - AZ-b</span>
              <span className="text-amber-400">Private Only</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-purple-950/20 border border-purple-800/40 space-y-2">
          <div className="flex items-center justify-between text-purple-300 font-semibold">
            <span>3. ISOLATED DATABASE TIER (Cơ sở dữ liệu cách ly tuyệt đối)</span>
            <span className="font-mono text-[10px]">10.0.21.0/24 & 10.0.22.0/24</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
            <div className="p-2 bg-slate-900/90 rounded border border-purple-700/40 text-slate-200 flex items-center justify-between">
              <span>Amazon RDS Master (Primary)</span>
              <span className="text-emerald-400">Write/Read</span>
            </div>
            <div className="p-2 bg-slate-900/90 rounded border border-purple-700/40 text-slate-200 flex items-center justify-between">
              <span>Amazon RDS Standby (Sync Replica)</span>
              <span className="text-purple-400">Failover HA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   10. AWS S3 STORAGE TIERS MATRIX
   ========================================================================= */
const AwsS3TiersDiagram: React.FC<{ title?: string }> = ({ title }) => {
  const tiers = [
    { name: 'S3 Standard', freq: 'Truy cập hàng ngày (Hot)', latency: 'ms (Mili-giây)', cost: '$0.023 / GB', minDuration: 'Không có', color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300' },
    { name: 'S3 Standard-IA', freq: '1-2 lần / tháng (Warm)', latency: 'ms (Mili-giây)', cost: '$0.0125 / GB', minDuration: '30 ngày', color: 'border-blue-500/40 bg-blue-950/20 text-blue-300' },
    { name: 'Glacier Instant', freq: 'Vài tháng / lần (Cold)', latency: 'ms (Mili-giây)', cost: '$0.004 / GB', minDuration: '90 ngày', color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300' },
    { name: 'Glacier Flexible', freq: 'Lưu trữ lưu trữ (Archive)', latency: '1 - 5 giờ', cost: '$0.0036 / GB', minDuration: '90 ngày', color: 'border-purple-500/40 bg-purple-950/20 text-purple-300' },
    { name: 'Glacier Deep Archive', freq: 'Lưu trữ tuân thủ pháp lý', latency: '12 - 48 giờ', cost: '$0.00099 / GB (Rẻ nhất!)', minDuration: '180 ngày', color: 'border-rose-500/40 bg-rose-950/20 text-rose-300' }
  ];

  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Ma Trận Phân Cấp Lưu Trữ Amazon S3 Storage Classes'}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-400">Độ bền 99.999999999% (11 số 9)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {tiers.map((t, idx) => (
          <div key={idx} className={`p-3 rounded-lg border flex flex-col justify-between space-y-2 ${t.color}`}>
            <div>
              <div className="font-bold text-xs font-mono text-slate-100">{t.name}</div>
              <div className="text-[10px] text-slate-300 mt-1">{t.freq}</div>
            </div>
            <div className="space-y-1 font-mono text-[11px] pt-2 border-t border-slate-800/60">
              <div className="text-emerald-400 font-semibold">{t.cost}</div>
              <div className="text-[10px] text-slate-400">Độ trễ: {t.latency}</div>
              <div className="text-[10px] text-slate-500">Giữ tối thiểu: {t.minDuration}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   11. AWS IAM POLICY EVALUATION LOGIC
   ========================================================================= */
const AwsIamEvaluationDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Sơ Đồ Quyết Định: Quy Trình Đánh Giá Quyền AWS IAM Policy'}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/50">
          Explicit Deny luôn thắng!
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
          <div className="text-slate-400 font-mono">1. Yêu cầu đến</div>
          <div className="font-semibold text-slate-200">Mặc định: TỪ CHỐI</div>
          <p className="text-[11px] text-slate-400">Bắt đầu ở trạng thái Implicit Deny.</p>
        </div>

        <div className="p-3 bg-rose-950/20 rounded-lg border border-rose-800/40 space-y-1">
          <div className="text-rose-400 font-mono">2. Explicit Deny?</div>
          <div className="font-semibold text-rose-300">Có lệnh "Deny"?</div>
          <p className="text-[11px] text-slate-300">Nếu có ➔ DỪNG NGAY LẬP TỨC và TỪ CHỐI.</p>
        </div>

        <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-800/40 space-y-1">
          <div className="text-emerald-400 font-mono">3. Explicit Allow?</div>
          <div className="font-semibold text-emerald-300">Có lệnh "Allow"?</div>
          <p className="text-[11px] text-slate-300">SCP + Resource + IAM policy cùng cho phép ➔ HỢP LỆ.</p>
        </div>

        <div className="p-3 bg-amber-950/20 rounded-lg border border-amber-800/40 space-y-1">
          <div className="text-amber-400 font-mono">4. Kết luận</div>
          <div className="font-semibold text-amber-300">Không có Allow</div>
          <p className="text-[11px] text-slate-300">Trở về Implicit Deny ➔ Chặn truy cập.</p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   12. AWS SHARED RESPONSIBILITY MODEL
   ========================================================================= */
const AwsSharedResponsibilityDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Mô Hình Trách Nhiệm Chung AWS (Shared Responsibility Model)'}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-800/40 space-y-2">
          <div className="flex items-center justify-between font-semibold text-blue-300">
            <span>KHÁCH HÀNG CHỊU TRÁCH NHIỆM</span>
            <span className="text-[10px] bg-blue-900/40 px-2 py-0.5 rounded font-mono">Security IN the Cloud</span>
          </div>
          <ul className="space-y-1.5 list-disc pl-4 text-slate-300 text-[11px] leading-relaxed">
            <li>Dữ liệu khách hàng (Mã hóa lưu trữ & truyền tải).</li>
            <li>Quản lý định danh và truy cập (IAM Users, Roles, MFA).</li>
            <li>Hệ điều hành máy chủ EC2 (Vá lỗi OS, cấu hình Firewall iptables).</li>
            <li>Cấu hình mạng VPC, Security Groups, Route Tables.</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-800/40 space-y-2">
          <div className="flex items-center justify-between font-semibold text-amber-300">
            <span>AWS CHỊU TRÁCH NHIỆM</span>
            <span className="text-[10px] bg-amber-900/40 px-2 py-0.5 rounded font-mono">Security OF the Cloud</span>
          </div>
          <ul className="space-y-1.5 list-disc pl-4 text-slate-300 text-[11px] leading-relaxed">
            <li>Hạ tầng vật lý toàn cầu (Data Centers, Nguồn điện, Bảo vệ sinh trắc học).</li>
            <li>Phần cứng máy chủ, Ổ đĩa lưu trữ, Card mạng.</li>
            <li>Tầng ảo hóa phần mềm (Hypervisor Xen/Nitro).</li>
            <li>Hạ tầng mạng toàn cầu kết nối giữa các AWS Regions & AZs.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   13. AWS SERVERLESS EVENT-DRIVEN FLOW
   ========================================================================= */
const AwsServerlessFlowDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Kiến Trúc Phi Máy Chủ Hướng Sự Kiện (Serverless Event-Driven)'}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-center">
          <Globe className="w-5 h-5 mx-auto text-cyan-400" />
          <div className="font-bold text-slate-200">1. Client Request</div>
          <p className="text-[10px] text-slate-400 font-sans">HTTP API Call qua HTTPS</p>
        </div>

        <div className="p-3 bg-indigo-950/30 rounded-lg border border-indigo-800/40 space-y-1 text-center">
          <Network className="w-5 h-5 mx-auto text-indigo-400" />
          <div className="font-bold text-indigo-300">2. API Gateway</div>
          <p className="text-[10px] text-slate-400 font-sans">Rate Limit & Auth Token</p>
        </div>

        <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-800/40 space-y-1 text-center">
          <Cpu className="w-5 h-5 mx-auto text-amber-400" />
          <div className="font-bold text-amber-300">3. AWS Lambda</div>
          <p className="text-[10px] text-slate-400 font-sans">Thực thi Node.js/Python</p>
        </div>

        <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-800/40 space-y-1 text-center">
          <Database className="w-5 h-5 mx-auto text-purple-400" />
          <div className="font-bold text-purple-300">4. DynamoDB / SQS</div>
          <p className="text-[10px] text-slate-400 font-sans">Lưu trữ độ trễ mili-giây</p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   14. AWS TRANSIT GATEWAY
   ========================================================================= */
const AwsTransitGatewayDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Kiến Trúc AWS Transit Gateway: Mô Hình Hub-and-Spoke'}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-center font-mono">
        <div className="p-3 bg-blue-950/20 rounded-lg border border-blue-800/40 space-y-1">
          <div className="font-bold text-blue-300">VPC A (Viện Nghiên Cứu)</div>
          <div className="text-[10px] text-slate-400">10.1.0.0/16</div>
        </div>

        <div className="p-3.5 bg-amber-950/40 rounded-lg border border-amber-600/60 space-y-1">
          <div className="font-bold text-amber-300 text-sm">TRANSIT GATEWAY (HUB)</div>
          <div className="text-[10px] text-slate-300">Định tuyến tập trung hàng trăm VPC</div>
        </div>

        <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-800/40 space-y-1">
          <div className="font-bold text-emerald-300">VPC B (Quản Lý Đào Tạo)</div>
          <div className="text-[10px] text-slate-400">10.2.0.0/16</div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   15. TCP 3-WAY HANDSHAKE (SEQUENCE LADDER)
   ========================================================================= */
const TcpHandshakeDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Quy Trình Bắt Tay 3 Bước TCP 3-Way Handshake'}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-cyan-400">Layer 4 (Transport)</span>
      </div>

      <div className="space-y-2 text-xs font-mono">
        <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/40 flex items-center justify-between">
          <span className="text-cyan-300 font-bold">1. SYN (Gửi yêu cầu đồng bộ)</span>
          <span className="text-slate-300">Client ➔ Server [Seq = X]</span>
        </div>
        <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 flex items-center justify-between">
          <span className="text-amber-300 font-bold">2. SYN-ACK (Xác nhận & Đồng bộ lại)</span>
          <span className="text-slate-300">Server ➔ Client [Seq = Y, Ack = X + 1]</span>
        </div>
        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 flex items-center justify-between">
          <span className="text-emerald-300 font-bold">3. ACK (Xác nhận hoàn tất)</span>
          <span className="text-slate-300">Client ➔ Server [Ack = Y + 1] ➔ ESTABLISHED 🎯</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   16. OSI 7 LAYERS VS TCP/IP 4 LAYERS
   ========================================================================= */
const OsiTcpIpDiagram: React.FC<{ title?: string }> = ({ title }) => {
  const layers = [
    { osi: 'Layer 7: Application', tcp: 'Application', proto: 'HTTP, DNS, SSH, SMTP', color: 'text-amber-300' },
    { osi: 'Layer 6: Presentation', tcp: 'Application', proto: 'SSL/TLS, Gzip, JSON', color: 'text-amber-300' },
    { osi: 'Layer 5: Session', tcp: 'Application', proto: 'RPC, Sockets', color: 'text-amber-300' },
    { osi: 'Layer 4: Transport', tcp: 'Transport', proto: 'TCP (Port 80/443), UDP (Port 53)', color: 'text-cyan-300' },
    { osi: 'Layer 3: Network', tcp: 'Internet', proto: 'IPv4, IPv6, ICMP, BGP Router', color: 'text-indigo-300' },
    { osi: 'Layer 2: Data Link', tcp: 'Network Interface', proto: 'Ethernet, MAC Address, Switch', color: 'text-emerald-300' },
    { osi: 'Layer 1: Physical', tcp: 'Network Interface', proto: 'Cáp quang, Sóng Radio Wi-Fi', color: 'text-slate-400' }
  ];

  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'So Sánh Mô Hình Mạng: OSI 7 Tầng vs TCP/IP 4 Tầng'}
          </h4>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
              <th className="py-2 px-3">Mô hình OSI (7 Lớp)</th>
              <th className="py-2 px-3">Mô hình TCP/IP (4 Lớp)</th>
              <th className="py-2 px-3">Giao thức & Phần cứng tiêu biểu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {layers.map((l, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30">
                <td className={`py-2 px-3 font-semibold ${l.color}`}>{l.osi}</td>
                <td className="py-2 px-3 text-slate-200">{l.tcp}</td>
                <td className="py-2 px-3 text-slate-400 font-sans">{l.proto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* =========================================================================
   17. TLS 1.3 HYBRID ENCRYPTION HANDSHAKE
   ========================================================================= */
const TlsHandshakeDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Quy Trình Bắt Tay Mã Hóa Lai TLS 1.3 (Hybrid Encryption)'}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-emerald-400">1 RTT Latency</span>
      </div>

      <div className="space-y-2 text-xs font-mono">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
          <span className="text-cyan-300 font-bold">1. Client Hello</span>
          <span className="text-slate-300">Gửi danh sách Cipher Suites + Khóa Diffie-Hellman</span>
        </div>
        <div className="p-3 bg-indigo-950/20 rounded-lg border border-indigo-800/40 flex items-center justify-between">
          <span className="text-indigo-300 font-bold">2. Server Hello + Certificate</span>
          <span className="text-slate-300">Gửi Chứng chỉ SSL x509 + Khóa trao đổi máy chủ</span>
        </div>
        <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-800/40 flex items-center justify-between">
          <span className="text-emerald-300 font-bold">3. Sinh Session Key (Khóa đối xứng)</span>
          <span className="text-slate-300">Mã hóa toàn bộ dữ liệu thực tế bằng AES-256-GCM 🚀</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   18. GIT WORKFLOW & 3 STATES
   ========================================================================= */
const GitWorkflowDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Sơ Đồ Luồng Hoạt Động & 3 Trạng Thái Trong Git'}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs text-center font-mono">
        <div className="p-3 bg-red-950/20 rounded-lg border border-red-800/40 space-y-1">
          <div className="font-bold text-red-300">Working Directory</div>
          <div className="text-[10px] text-slate-400">File đang chỉnh sửa</div>
          <div className="text-amber-400 text-[11px] pt-1">git add ➔</div>
        </div>

        <div className="p-3 bg-amber-950/20 rounded-lg border border-amber-800/40 space-y-1">
          <div className="font-bold text-amber-300">Staging Area</div>
          <div className="text-[10px] text-slate-400">Ảnh chụp chuẩn bị commit</div>
          <div className="text-amber-400 text-[11px] pt-1">git commit ➔</div>
        </div>

        <div className="p-3 bg-blue-950/20 rounded-lg border border-blue-800/40 space-y-1">
          <div className="font-bold text-blue-300">Local Repository</div>
          <div className="text-[10px] text-slate-400">Lịch sử commit (.git)</div>
          <div className="text-amber-400 text-[11px] pt-1">git push ➔</div>
        </div>

        <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-800/40 space-y-1">
          <div className="font-bold text-emerald-300">Remote (GitHub)</div>
          <div className="text-[10px] text-slate-400">Kho mã nguồn trung tâm</div>
          <div className="text-emerald-400 text-[11px] pt-1">Synced ✅</div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   19. ACID VS BASE DATABASE MATRIX
   ========================================================================= */
const AcidVsBaseDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'So Sánh Bản Chất: SQL (ACID) vs NoSQL (BASE)'}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-800/40 space-y-2">
          <div className="font-bold text-blue-300 font-mono">SQL / RDBMS (ACID)</div>
          <ul className="space-y-1 text-slate-300 text-[11px] list-disc pl-4 leading-relaxed">
            <li><strong>A - Atomicity (Nguyên tử):</strong> Thành công toàn bộ hoặc Rollback.</li>
            <li><strong>C - Consistency (Nhất quán):</strong> Đúng ràng buộc dữ liệu.</li>
            <li><strong>I - Isolation (Cô lập):</strong> Giao dịch không can thiệp nhau.</li>
            <li><strong>D - Durability (Bền vững):</strong> Ghi đĩa an toàn sau commit.</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg bg-purple-950/20 border border-purple-800/40 space-y-2">
          <div className="font-bold text-purple-300 font-mono">NoSQL (BASE)</div>
          <ul className="space-y-1 text-slate-300 text-[11px] list-disc pl-4 leading-relaxed">
            <li><strong>BA - Basically Available:</strong> Luôn phản hồi kể cả khi phân mảnh mạng.</li>
            <li><strong>S - Soft State:</strong> Trạng thái dữ liệu có thể thay đổi theo thời gian.</li>
            <li><strong>E - Eventual Consistency:</strong> Đồng bộ nhất quán sau cùng.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   20. EMAIL SECURITY TRIPLE SHIELD
   ========================================================================= */
const EmailSecurityShieldDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Bộ Ba Khiên Bảo Mật Email Toàn Cầu: SPF + DKIM + DMARC'}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 bg-amber-950/20 rounded-lg border border-amber-800/40 space-y-1.5">
          <div className="font-bold text-amber-300 font-mono">1. Bản ghi SPF</div>
          <div className="text-[11px] text-slate-200">Xác thực IP máy chủ gửi thư</div>
          <p className="text-[11px] text-slate-400">Khai báo danh sách IP được phép gửi mail đại diện domain.</p>
        </div>

        <div className="p-3.5 bg-cyan-950/20 rounded-lg border border-cyan-800/40 space-y-1.5">
          <div className="font-bold text-cyan-300 font-mono">2. Bản ghi DKIM</div>
          <div className="text-[11px] text-slate-200">Chữ ký điện tử chống sửa nội dung</div>
          <p className="text-[11px] text-slate-400">Mã hóa chữ ký vào Header thư bằng Public/Private Key.</p>
        </div>

        <div className="p-3.5 bg-emerald-950/20 rounded-lg border border-emerald-800/40 space-y-1.5">
          <div className="font-bold text-emerald-300 font-mono">3. Bản ghi DMARC</div>
          <div className="text-[11px] text-slate-200">Chính sách xử lý khi mail bị giả mạo</div>
          <p className="text-[11px] text-slate-400">Chỉ đạo Gmail/Outlook: p=reject (Chặn thẳng tay) hoặc p=quarantine (Spam).</p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   21. CLOUDFLARE PROXY FLOW
   ========================================================================= */
const CloudflareProxyFlowDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Cloudflare: Đám Mây Cam (Proxy On) vs Đám Mây Xám (DNS Only)'}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-4 bg-amber-950/20 rounded-lg border border-amber-800/50 space-y-2">
          <div className="text-amber-300 font-bold flex items-center justify-between">
            <span>ĐÁM MÂY CAM (PROXY ON 🟧)</span>
            <span className="text-[10px] bg-amber-900/40 px-2 py-0.5 rounded">Được bảo vệ</span>
          </div>
          <div className="text-slate-300 text-[11px] leading-relaxed">
            User ➔ Máy chủ Cloudflare (Ẩn IP gốc, Chống DDoS, Nén CDN, SSL) ➔ Máy chủ gốc.
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
          <div className="text-slate-400 font-bold flex items-center justify-between">
            <span>ĐÁM MÂY XÁM (DNS ONLY ⬜)</span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">Trỏ trực tiếp</span>
          </div>
          <div className="text-slate-400 text-[11px] leading-relaxed">
            User ➔ Trỏ thẳng tới IP máy chủ gốc (Dùng cho SSH, FTP, Mail Server).
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   22. ZERO-DOWNTIME MIGRATION
   ========================================================================= */
const ZeroDowntimeMigrationDiagram: React.FC<{ title?: string }> = ({ title }) => {
  const steps = [
    { num: 1, title: 'Hạ TTL xuống 300s', desc: 'Thực hiện trước 24-48 giờ để xoá cache nhanh' },
    { num: 2, title: 'Chuẩn bị Server Mới', desc: 'Cài đặt môi trường, Nginx và SSL' },
    { num: 3, title: 'Đồng bộ Dữ liệu', desc: 'Copy Source Code + Sync Database' },
    { num: 4, title: 'Đổi DNS A Record', desc: 'Trỏ sang IP server mới (Lan truyền chỉ 5p)' },
    { num: 5, title: 'Tắt Server Cũ', desc: 'Theo dõi log 48h rồi tăng lại TTL lên 86400s' }
  ];

  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Quy Trình 5 Bước Chuyển Server Không Gián Đoạn (Zero-Downtime Migration)'}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
        {steps.map((st) => (
          <div key={st.num} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <div className="font-mono text-amber-400 font-bold text-xs">Bước {st.num}</div>
            <div className="font-semibold text-slate-200 text-[11px]">{st.title}</div>
            <p className="text-[10px] text-slate-400 leading-tight">{st.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   23. NGINX REVERSE PROXY FLOW
   ========================================================================= */
const NginxReverseProxyFlowDiagram: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">
            {title || 'Kiến Trúc Nginx: SSL Termination & Reverse Proxy'}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-center">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
          <div className="text-cyan-400 font-bold">1. Client Browser</div>
          <div className="text-[11px] text-slate-300">HTTPS Port 443</div>
        </div>

        <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-800/50 space-y-1">
          <div className="text-amber-300 font-bold">2. Nginx Reverse Proxy</div>
          <div className="text-[10px] text-slate-300">Giải mã SSL + Gzip + Cache tĩnh</div>
        </div>

        <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-800/50 space-y-1">
          <div className="text-emerald-300 font-bold">3. Backend Cluster</div>
          <div className="text-[11px] text-slate-300">Port 3000 / 3001 (Node.js/Python)</div>
        </div>
      </div>
    </div>
  );
};
