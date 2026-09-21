import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  CheckCircle2, 
  Circle, 
  Globe, 
  Mail, 
  Sparkles,
  Server
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

type PlayToolMode = 'dns_simulator' | 'spf_dmarc_gen' | 'migration_planner' | 'domain_evaluator' | 'hosting_calculator';

export const WebDomainPlayView: React.FC = () => {
  const { addBonusXP } = useLearning();
  const [activeTool, setActiveTool] = useState<PlayToolMode>('hosting_calculator');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 0. Hosting ROI Calculator State
  const [monthlyBandwidthGb, setMonthlyBandwidthGb] = useState<number>(350);
  const [monthlyRequestsK, setMonthlyRequestsK] = useState<number>(1500); // 1.5M requests
  const [avgExecutionTimeMs, setAvgExecutionTimeMs] = useState<number>(850);
  const [needsWebSocket, setNeedsWebSocket] = useState<boolean>(true);
  const [needsBackgroundWorker, setNeedsBackgroundWorker] = useState<boolean>(true);

  // 1. DNS Simulator State
  const [targetDomain, setTargetDomain] = useState<string>('app.mycompany.com');
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimRunning, setIsSimRunning] = useState<boolean>(false);

  // Calculate Hosting Costs
  const calculateCosts = () => {
    // Vercel Calculation:
    // Pro base: $20. Extra bandwidth: max(0, monthlyBandwidthGb - 1000) * 0.20 (or on Hobby max(0, monthlyBandwidthGb - 100) * 0.20)
    const vercelExtraBandwidthGb = Math.max(0, monthlyBandwidthGb - 1000);
    const vercelExtraBandwidthCost = vercelExtraBandwidthGb * 0.20;
    const vercelThirdPartyWsCost = needsWebSocket ? 29 : 0; // Pusher/Ably
    const vercelTotalMonthly = 20 + vercelExtraBandwidthCost + vercelThirdPartyWsCost;

    // Self-Hosted VPS (Hetzner CX22 or DigitalOcean $4-$6/mo Flat):
    const vpsMonthlyCost = 5.0; // 2 vCPU, 4GB RAM, 20TB Bandwidth included
    const vpsTotalMonthly = vpsMonthlyCost;

    // Cloudflare Pages + Worker:
    const cfWorkerCost = monthlyRequestsK > 100 ? 5.0 : 0;
    const cfTotalMonthly = cfWorkerCost;

    // Hybrid (Cloudflare Pages Frontend + VPS Backend):
    const hybridTotalMonthly = vpsMonthlyCost;

    const yearlySavings = (vercelTotalMonthly - vpsTotalMonthly) * 12;

    return {
      vercel: vercelTotalMonthly,
      vps: vpsTotalMonthly,
      cloudflare: cfTotalMonthly,
      hybrid: hybridTotalMonthly,
      yearlySavings: Math.max(0, yearlySavings),
      isTimeoutRisk: avgExecutionTimeMs > 10000 || needsBackgroundWorker,
      isWsRiskOnVercel: needsWebSocket
    };
  };

  const hostingRoi = calculateCosts();

  const dnsSteps = [
    {
      title: 'Bước 1: Trình duyệt & Bộ nhớ đệm OS',
      desc: `Kiểm tra Chrome Cache & OS Cache cho "${targetDomain}". Kết quả: Cache Miss (Chưa lưu IP).`,
      source: 'Client (User PC)',
      time: '~0.2ms'
    },
    {
      title: 'Bước 2: Gửi tới Recursive Resolver (1.1.1.1 / ISP)',
      desc: `Truy vấn UDP port 53 được gửi tới Recursive Resolver. Resolver chuẩn bị duyệt cây phân cấp.`,
      source: 'Recursive DNS (Cloudflare 1.1.1.1)',
      time: '~4.5ms'
    },
    {
      title: 'Bước 3: Hỏi Root Nameserver (.)',
      desc: `Root Server nhận truy vấn và trả về địa chỉ cụm TLD Nameserver quản lý đuôi ".com".`,
      source: '13 Root Servers (a.root-servers.net)',
      time: '~12.1ms'
    },
    {
      title: 'Bước 4: Hỏi .com TLD Nameserver',
      desc: `TLD Server của Verisign phản hồi danh sách Authoritative Nameserver: ns1.cloudflare.com & ns2.cloudflare.com.`,
      source: 'TLD Nameserver (.com Registry)',
      time: '~18.4ms'
    },
    {
      title: 'Bước 5: Hỏi Authoritative Nameserver (Cloudflare)',
      desc: `Authoritative Nameserver tra cứu DNS Zone gốc và trả về bản ghi A: 104.21.32.10 (TTL = 300s).`,
      source: 'Authoritative NS (ns1.cloudflare.com)',
      time: '~24.8ms'
    },
    {
      title: 'Bước 6: Hoàn tất & Thiết lập kết nối HTTPS',
      desc: `Hệ điều hành nhận IP 104.21.32.10, lưu vào Cache 300 giây. Trình duyệt bắt đầu bắt tay TLS Handshake.`,
      source: 'Client Browser ➔ Web Server',
      time: '~31.2ms'
    }
  ];

  const handleRunDnsSim = () => {
    setIsSimRunning(true);
    setSimStep(1);
    addBonusXP(20);

    let current = 1;
    const interval = setInterval(() => {
      current++;
      setSimStep(current);
      if (current >= dnsSteps.length) {
        clearInterval(interval);
        setIsSimRunning(false);
      }
    }, 1200);
  };

  const handleResetDnsSim = () => {
    setSimStep(0);
    setIsSimRunning(false);
  };

  // 2. SPF / DMARC Generator State
  const [selectedMailProviders, setSelectedMailProviders] = useState<string[]>(['google']);
  const [customIP, setCustomIP] = useState<string>('198.51.100.42');
  const [dmarcPolicy, setDmarcPolicy] = useState<'none' | 'quarantine' | 'reject'>('reject');
  const [reportEmail, setReportEmail] = useState<string>('dmarc-reports@mycompany.com');

  const mailOptions = [
    { id: 'google', name: 'Google Workspace (Gmail)', include: 'include:_spf.google.com' },
    { id: 'm365', name: 'Microsoft 365 (Office 365)', include: 'include:spf.protection.outlook.com' },
    { id: 'sendgrid', name: 'SendGrid (Twilio)', include: 'include:sendgrid.net' },
    { id: 'ses', name: 'Amazon SES (AWS)', include: 'include:amazonses.com' },
    { id: 'mailchimp', name: 'Mailchimp / Mandrill', include: 'include:servers.mcsv.net' }
  ];

  const toggleMailProvider = (id: string) => {
    setSelectedMailProviders(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const generatedSPF = `v=spf1 ${selectedMailProviders.map(p => mailOptions.find(o => o.id === p)?.include).join(' ')}${customIP ? ` ip4:${customIP}` : ''} ~all`;
  const generatedDMARC = `v=DMARC1; p=${dmarcPolicy}; rua=mailto:${reportEmail}; pct=100; sp=${dmarcPolicy}`;

  // 3. Migration Planner State
  const [migrationTasks, setMigrationTasks] = useState<string[]>([]);
  const migrationSteps = [
    { id: 'm1', phase: 'T-48 giờ', title: 'Hạ TTL của toàn bộ bản ghi DNS A/AAAA xuống 300 giây (5 phút).' },
    { id: 'm2', phase: 'T-24 giờ', title: 'Deploy source code lên server mới, cài Nginx và xin chứng chỉ SSL Let\'s Encrypt.' },
    { id: 'm3', phase: 'T-2 giờ', title: 'Khóa ghi Database cũ (Read-Only) hoặc bật MySQL Master-Slave Replication sang server mới.' },
    { id: 'm4', phase: 'T-0', title: 'Đổi bản ghi DNS A sang địa chỉ IP máy chủ mới trên Authoritative Nameserver.' },
    { id: 'm5', phase: 'T+12 giờ', title: 'Theo dõi Access Log trên cả 2 server, kiểm tra độ lan truyền DNS toàn cầu.' },
    { id: 'm6', phase: 'T+48 giờ', title: 'Tăng lại TTL lên 3600s/86400s và tiến hành tắt máy chủ cũ an toàn.' }
  ];

  const toggleMigrationTask = (id: string) => {
    setMigrationTasks(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  // 4. Domain Evaluator State
  const [evalDomain, setEvalDomain] = useState<string>('cloudhub.tech');

  const evaluateDomain = (name: string) => {
    const clean = name.trim().toLowerCase();
    const parts = clean.split('.');
    const sld = parts[0] || '';
    const tld = parts[1] || '';

    let score = 100;
    const pros: string[] = [];
    const cons: string[] = [];

    // Length check
    if (sld.length <= 8) {
      pros.push('Độ dài rất ngắn gọn, dễ nhớ (< 9 ký tự).');
    } else if (sld.length <= 14) {
      pros.push('Độ dài trung bình chuẩn mực.');
    } else {
      score -= 25;
      cons.push('Tên quá dài (> 14 ký tự), người dùng khó gõ chính xác trên di động.');
    }

    // Hyphen / Number check
    if (/[-]/.test(sld)) {
      score -= 20;
      cons.push('Chứa dấu gạch ngang (-), dễ gây nhầm lẫn khi truyền miệng.');
    }
    if (/[0-9]/.test(sld)) {
      score -= 15;
      cons.push('Chứa số, người dùng hay phân vân giữa số và chữ (vd: 2 hay two).');
    }
    if (!/[-]/.test(sld) && !/[0-9]/.test(sld)) {
      pros.push('Không có số hay ký tự đặc biệt, phát âm tự nhiên.');
    }

    // TLD Check
    if (['com', 'vn', 'ai', 'io', 'dev', 'tech'].includes(tld)) {
      pros.push(`Đuôi .${tld} có uy tín cao trong ngành công nghệ & kinh doanh.`);
    } else {
      score -= 10;
      cons.push(`Đuôi .${tld} ít phổ biến, cần đầu tư truyền thông định vị thương hiệu.`);
    }

    return { score: Math.max(10, score), pros, cons };
  };

  const evalResult = evaluateDomain(evalDomain);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-300">
      
      {/* Tool Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs border-b border-slate-800">
        {[
          { id: 'hosting_calculator', label: 'So Sánh Chi Phí VPS vs Vercel', icon: Server },
          { id: 'dns_simulator', label: 'Mô Phỏng Truy Vấn DNS', icon: Globe },
          { id: 'spf_dmarc_gen', label: 'Tạo Bản Ghi SPF & DMARC', icon: Mail },
          { id: 'migration_planner', label: 'Checklist Zero-Downtime', icon: Sparkles },
          { id: 'domain_evaluator', label: 'Thẩm Định Tên Miền SEO', icon: Sparkles },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;

          return (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id as PlayToolMode)}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 font-medium ${
                isActive
                  ? 'bg-slate-800 text-amber-300 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 0. HOSTING COST & ARCHITECTURE ROI CALCULATOR */}
      {activeTool === 'hosting_calculator' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-400" />
              <span>Máy Tính So Sánh Chi Phí & ROI: Self-Hosted VPS vs Vercel / Cloud PaaS</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Điều chỉnh thông số lưu lượng và yêu cầu kỹ thuật để xem dự toán chi phí thực tế hàng tháng giữa các phương án lưu trữ.
            </p>
          </div>

          {/* Interactive Sliders & Options */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Monthly Bandwidth */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-300">Băng Thông Hàng Tháng (GB):</label>
                  <span className="font-mono text-amber-300 font-bold">{monthlyBandwidthGb} GB</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={3000}
                  step={50}
                  value={monthlyBandwidthGb}
                  onChange={(e) => setMonthlyBandwidthGb(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>50 GB</span>
                  <span>1,000 GB (1 TB)</span>
                  <span>3,000 GB (3 TB)</span>
                </div>
              </div>

              {/* Monthly Requests */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-300">Lượt Yêu Cầu / Tháng (Requests):</label>
                  <span className="font-mono text-amber-300 font-bold">{(monthlyRequestsK / 1000).toFixed(1)} Triệu requests</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={10000}
                  step={100}
                  value={monthlyRequestsK}
                  onChange={(e) => setMonthlyRequestsK(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>100K</span>
                  <span>5M</span>
                  <span>10M</span>
                </div>
              </div>

            </div>

            {/* Checkbox Options */}
            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={needsWebSocket}
                  onChange={(e) => setNeedsWebSocket(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-400 cursor-pointer"
                />
                <span>Ứng dụng cần WebSocket / Realtime chat 24/7</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={needsBackgroundWorker}
                  onChange={(e) => setNeedsBackgroundWorker(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-400 cursor-pointer"
                />
                <span>Cần chạy tác vụ nền nặng &gt; 15s (AI RAG, Cron, PDF export)</span>
              </label>
            </div>
          </div>

          {/* Cost Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Vercel */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">1. Vercel Cloud PaaS</div>
                <div className="text-2xl font-bold font-mono text-slate-100">
                  ${hostingRoi.vercel.toFixed(0)} <span className="text-xs font-sans text-slate-400 font-normal">/ tháng</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Bao gồm $20 phí Pro + phí vượt băng thông + phụ phí WebSocket.
                </p>
              </div>
              {hostingRoi.isTimeoutRisk && (
                <div className="p-2 rounded bg-red-950/40 border border-red-800/50 text-[10px] text-red-300">
                  ⚠️ Nguy cơ lỗi 504 Timeout khi tác vụ chạy &gt; 60s
                </div>
              )}
            </div>

            {/* Self-Hosted VPS */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/60 space-y-2 flex flex-col justify-between shadow-lg">
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-emerald-400 uppercase font-semibold flex items-center justify-between">
                  <span>2. Self-Hosted VPS (Hetzner)</span>
                  <span className="bg-emerald-900/60 px-2 py-0.5 rounded text-[10px] font-bold">Khuyên dùng</span>
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-300">
                  ${hostingRoi.vps.toFixed(0)} <span className="text-xs font-sans text-slate-400 font-normal">/ tháng (Flat)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Đã bao gồm 20TB băng thông, chạy nền 24/7, WebSocket native, hỗ trợ Docker + Coolify.
                </p>
              </div>
              <div className="p-2 rounded bg-emerald-950/60 border border-emerald-800/50 text-[10px] text-emerald-300">
                ✅ Tiết kiệm ~${hostingRoi.yearlySavings.toFixed(0)} / năm so với PaaS!
              </div>
            </div>

            {/* Hybrid */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">3. Kiến Trúc Lai (Hybrid)</div>
                <div className="text-2xl font-bold font-mono text-cyan-300">
                  ${hostingRoi.hybrid.toFixed(0)} <span className="text-xs font-sans text-slate-400 font-normal">/ tháng</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Frontend tĩnh trên Cloudflare Pages ($0) + Backend API trên VPS $5/tháng.
                </p>
              </div>
              <div className="p-2 rounded bg-cyan-950/40 border border-cyan-800/50 text-[10px] text-cyan-300">
                🚀 Tối ưu tốc độ Edge CDN + Sức mạnh VPS
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 1. DNS SIMULATOR */}
      {activeTool === 'dns_simulator' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100">
              Trình Mô Phỏng Quy Trình Phân Giải DNS Toàn Cầu
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Nhập tên miền và bấm &quot;Chạy Mô Phỏng&quot; để quan sát trực quan từng chặng đệ quy từ máy khách đến Root, TLD và Authoritative Server.
            </p>
          </div>

          {/* Input & Action */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={targetDomain}
              onChange={(e) => setTargetDomain(e.target.value)}
              placeholder="Nhập tên miền (vd: api.mycompany.com)..."
              className="w-full sm:flex-1 bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleRunDnsSim}
                disabled={isSimRunning}
                className="flex-1 sm:flex-none px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isSimRunning ? 'Đang phân giải...' : 'Chạy Mô Phỏng'}</span>
              </button>
              <button
                onClick={handleResetDnsSim}
                className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
                title="Đặt lại"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Simulation Steps Feed */}
          <div className="space-y-2.5">
            {dnsSteps.map((step, idx) => {
              const isPassed = simStep > idx;
              const isCurrent = simStep === idx + 1;

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-lg border transition-all text-xs ${
                    isCurrent
                      ? 'bg-amber-950/20 border-amber-500/80 text-slate-200 shadow-sm'
                      : isPassed
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                      : 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold pb-1">
                    <span className={isCurrent ? 'text-amber-300' : isPassed ? 'text-slate-200' : 'text-slate-600'}>
                      {step.title}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">{step.time}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                  <div className="text-[10px] font-mono text-slate-500 pt-1">
                    Nút xử lý: <strong className="text-slate-400">{step.source}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          {simStep >= dnsSteps.length && (
            <div className="p-3 bg-emerald-950/30 border border-emerald-800/60 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Phân giải DNS thành công! Trình duyệt đã có IP và hoàn tất kết nối trong 31.2ms.</span>
            </div>
          )}
        </div>
      )}

      {/* 2. SPF & DMARC GENERATOR */}
      {activeTool === 'spf_dmarc_gen' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100">
              Trình Tạo Bản Ghi SPF & DMARC Chuẩn Xác 100%
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Chọn các dịch vụ gửi email của doanh nghiệp để tự động sinh bản ghi DNS TXT chống giả mạo thư rác.
            </p>
          </div>

          {/* Mail Services Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              1. Chọn các nhà cung cấp gửi email:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mailOptions.map((opt) => {
                const isSelected = selectedMailProviders.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleMailProvider(opt.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors flex items-center justify-between text-xs ${
                      isSelected
                        ? 'bg-slate-800 border-amber-500/80 text-amber-200 font-medium'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{opt.name}</span>
                    {isSelected ? <CheckCircle2 className="w-4 h-4 text-amber-400" /> : <Circle className="w-4 h-4 text-slate-600" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom IP & DMARC Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">IP Gửi Mail Trực Tiếp:</label>
              <input
                type="text"
                value={customIP}
                onChange={(e) => setCustomIP(e.target.value)}
                placeholder="198.51.100.42"
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Chính Sách DMARC (p):</label>
              <select
                value={dmarcPolicy}
                onChange={(e) => setDmarcPolicy(e.target.value as 'none' | 'quarantine' | 'reject')}
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="reject">p=reject (Chặn thư giả mạo)</option>
                <option value="quarantine">p=quarantine (Vào Spam)</option>
                <option value="none">p=none (Giám sát báo cáo)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Email Nhận Báo Cáo DMARC:</label>
              <input
                type="email"
                value={reportEmail}
                onChange={(e) => setReportEmail(e.target.value)}
                placeholder="dmarc-reports@company.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Output Results */}
          <div className="space-y-4 pt-2">
            {/* SPF Output */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Bản ghi SPF (Host: @ | Type: TXT):</span>
                <button
                  onClick={() => handleCopy(generatedSPF, 'spf')}
                  className="text-slate-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'spf' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Sao chép</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 rounded-md font-mono text-xs text-amber-300 border border-slate-800 overflow-x-auto">
                <code>{generatedSPF}</code>
              </pre>
            </div>

            {/* DMARC Output */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Bản ghi DMARC (Host: _dmarc | Type: TXT):</span>
                <button
                  onClick={() => handleCopy(generatedDMARC, 'dmarc')}
                  className="text-slate-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'dmarc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Sao chép</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 rounded-md font-mono text-xs text-amber-300 border border-slate-800 overflow-x-auto">
                <code>{generatedDMARC}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 3. MIGRATION PLANNER */}
      {activeTool === 'migration_planner' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100">
              Quy Trình Di Dời Máy Chủ Không Gián Đoạn (Zero-Downtime Migration Checklist)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Checklist 6 mốc thời gian chuẩn mực giúp bạn vận hành chuyển đổi website an toàn tuyệt đối.
            </p>
          </div>

          <div className="space-y-2.5">
            {migrationSteps.map((step) => {
              const isDone = migrationTasks.includes(step.id);

              return (
                <div
                  key={step.id}
                  onClick={() => toggleMigrationTask(step.id)}
                  className={`p-3.5 rounded-lg border transition-colors cursor-pointer flex items-start justify-between gap-3 text-xs sm:text-sm ${
                    isDone
                      ? 'bg-slate-900/40 border-slate-800/60 text-slate-500 line-through'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <button className="mt-0.5 text-slate-400 hover:text-slate-200 cursor-pointer">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                    <div>
                      <span className="font-mono text-amber-400 font-semibold text-xs mr-2">{step.phase}:</span>
                      <span>{step.title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 pt-2">
            Đã hoàn thành: <strong className="text-slate-300">{migrationTasks.length}</strong> / {migrationSteps.length} bước chuẩn bị.
          </div>
        </div>
      )}

      {/* 4. DOMAIN EVALUATOR */}
      {activeTool === 'domain_evaluator' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100">
              Bộ Thẩm Định Tên Miền & Chấm Điểm Chuẩn SEO / Thương Hiệu
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Nhập tên miền bạn đang cân nhắc mua để kiểm tra độ dài, cấu trúc ngữ âm, đuôi TLD và mức độ rủi ro.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={evalDomain}
              onChange={(e) => setEvalDomain(e.target.value)}
              placeholder="Nhập tên miền (vd: fintech.ai, mybrand.com)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Score Display */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Điểm Đánh Giá Tiềm Năng:</span>
              <span className="text-2xl font-bold font-mono text-amber-400">
                {evalResult.score} / 100
              </span>
            </div>

            {/* Pros */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ưu điểm nhận diện:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                {evalResult.pros.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            {evalResult.cons.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <span>Khuyết điểm cần lưu ý:</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400">
                  {evalResult.cons.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
