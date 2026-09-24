import React, { useState } from 'react';
import { 
  Network, 
  DollarSign, 
  ShieldCheck, 
  Terminal, 
  Copy, 
  Check, 
  Zap,
  Globe,
  Server,
  Layers
} from 'lucide-react';

export const AzurePlayView: React.FC = () => {
  // Load Balancer Decision Tool State
  const [protocol, setProtocol] = useState<'http' | 'non-http'>('http');
  const [scope, setScope] = useState<'global' | 'regional'>('global');
  const [needWaf, setNeedWaf] = useState(true);

  // FinOps Cost Calculator State
  const [vmCount, setVmCount] = useState(8);
  const [pricingModel, setPricingModel] = useState<'payg' | 'res1' | 'res3'>('res3');
  const [hasHybridBenefit, setHasHybridBenefit] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Determine Recommended Load Balancer
  let recommendedService = 'Azure Front Door';
  let serviceDescription = 'Nền tảng định tuyến toàn cầu Tầng 7 (Anycast), tích hợp CDN, SSL Offloading và Enterprise WAF.';
  let serviceLayer = 'Layer 7 (HTTP/S) • Toàn Cầu';

  if (protocol === 'http') {
    if (scope === 'global') {
      recommendedService = 'Azure Front Door';
      serviceDescription = 'Lựa chọn số 1 cho Web/API toàn cầu với Anycast Edge PoPs, tăng tốc độ tải trang 300% và phản ứng sự cố <3s.';
      serviceLayer = 'Layer 7 (HTTP/S) • Toàn Cầu';
    } else {
      recommendedService = needWaf ? 'Azure Application Gateway (WAF_v2)' : 'Azure Application Gateway (Standard_v2)';
      serviceDescription = 'Bộ cân bằng tải Tầng 7 cấp khu vực (Regional), hỗ trợ URL Path-based routing, SSL Termination và bộ lọc OWASP WAF.';
      serviceLayer = 'Layer 7 (HTTP/S) • Khu Vực (Regional)';
    }
  } else {
    if (scope === 'global') {
      recommendedService = 'Azure Traffic Manager';
      serviceDescription = 'Cân bằng tải toàn cầu dựa trên máy chủ phân giải tên miền DNS (DNS-based routing) cho các giao thức Non-HTTP (TCP/UDP, Gaming).';
      serviceLayer = 'DNS-based Global Routing';
    } else {
      recommendedService = 'Azure Load Balancer (Standard SKU)';
      serviceDescription = 'Bộ cân bằng tải Tầng 4 (TCP/UDP) siêu tốc, độ trễ cực thấp, thường đặt trước cụm Database Clusters hoặc Backend Microservices.';
      serviceLayer = 'Layer 4 (TCP/UDP) • Khu Vực (Regional)';
    }
  }

  // Cost calculations (D4s_v5 reference: $140/mo PAYG base)
  const baseMonthlyPerVm = 140;
  let discountRate = 0;
  if (pricingModel === 'res1') discountRate = 0.40;
  if (pricingModel === 'res3') discountRate = 0.62;

  let hybridDiscount = hasHybridBenefit ? 0.20 : 0;
  let totalDiscount = Math.min(0.75, discountRate + hybridDiscount);

  const paygTotal = vmCount * baseMonthlyPerVm;
  const optimizedTotal = Math.round(paygTotal * (1 - totalDiscount));
  const monthlySavings = paygTotal - optimizedTotal;
  const yearlySavings = monthlySavings * 12;

  const sampleBicepSnippet = `// infra/main.bicep
param location string = 'southeastasia'
param env string = 'prod'

// Application Gateway WAF_v2 Subnet & Resource
resource appGateway 'Microsoft.Network/applicationGateways@2023-09-01' = {
  name: 'appgw-\${env}-sea-001'
  location: location
  properties: {
    sku: {
      name: 'WAF_v2'
      tier: 'WAF_v2'
      capacity: 2
    }
    autoscaleConfiguration: {
      minCapacity: 2
      maxCapacity: 10
    }
  }
}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-slate-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Layers className="w-6 h-6 text-blue-400" />
          <span>Azure Architecture & FinOps Interactive Lab</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Cây quyết định cân bằng tải (Load Balancing Matrix) & Công cụ ước tính tiết kiệm chi phí FinOps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Load Balancer Decision Tree */}
        <div className="space-y-4">
          <div className="border-l-2 border-blue-500 pl-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Network className="w-4 h-4 text-blue-400" />
              <span>1. Ma Trận Quyết Định Cân Bằng Tải</span>
            </h2>
            <p className="text-xs text-slate-400">Tùy biến bài toán mạng để nhận giải pháp kiến trúc tối ưu</p>
          </div>

          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <label className="text-slate-400 font-medium block mb-1">Loại Giao Thức (Protocol):</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setProtocol('http')}
                  className={`py-2 px-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    protocol === 'http'
                      ? 'bg-blue-950/60 border-blue-500 text-blue-200 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-mono text-[11px] text-blue-400">HTTP / HTTPS</div>
                  <div className="text-[10px] text-slate-400">Web App, REST API, Microservices</div>
                </button>
                <button
                  type="button"
                  onClick={() => setProtocol('non-http')}
                  className={`py-2 px-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    protocol === 'non-http'
                      ? 'bg-blue-950/60 border-blue-500 text-blue-200 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-mono text-[11px] text-cyan-400">TCP / UDP</div>
                  <div className="text-[10px] text-slate-400">Database, Gaming, Raw Sockets</div>
                </button>
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-medium block mb-1">Phạm Vi Định Tuyến (Scope):</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setScope('global')}
                  className={`py-2 px-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    scope === 'global'
                      ? 'bg-blue-950/60 border-blue-500 text-blue-200 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-mono text-[11px] text-blue-400">Global (Toàn Cầu)</div>
                  <div className="text-[10px] text-slate-400">Đa Region, Edge Anycast</div>
                </button>
                <button
                  type="button"
                  onClick={() => setScope('regional')}
                  className={`py-2 px-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    scope === 'regional'
                      ? 'bg-blue-950/60 border-blue-500 text-blue-200 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-mono text-[11px] text-cyan-400">Regional (Khu Vực)</div>
                  <div className="text-[10px] text-slate-400">Trong 1 VNet / Region</div>
                </button>
              </div>
            </div>

            {protocol === 'http' && scope === 'regional' && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-slate-300 font-medium">Bật Tường Lửa Web Application Firewall (WAF):</span>
                <input
                  type="checkbox"
                  checked={needWaf}
                  onChange={(e) => setNeedWaf(e.target.checked)}
                  className="w-4 h-4 accent-blue-500 cursor-pointer"
                />
              </div>
            )}

            {/* Recommendation Box */}
            <div className="p-3.5 bg-slate-950 rounded-lg border border-blue-500/50 space-y-1.5 pt-2">
              <span className="text-[10px] text-blue-400 font-mono uppercase block font-bold">Dịch vụ khuyến nghị chuẩn Azure Architect:</span>
              <div className="text-base font-bold text-slate-100 flex items-center justify-between">
                <span>{recommendedService}</span>
                <span className="text-[11px] font-mono text-cyan-300 font-normal">{serviceLayer}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">{serviceDescription}</p>
            </div>
          </div>
        </div>

        {/* Right: FinOps Cost Savings Calculator */}
        <div className="space-y-4">
          <div className="border-l-2 border-emerald-500 pl-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>2. Công Cụ Ước Tính Tiết Kiệm FinOps</span>
            </h2>
            <p className="text-xs text-slate-400">So sánh Pay-As-You-Go vs Reservations & Hybrid Benefit</p>
          </div>

          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-400 font-medium">Số lượng máy ảo Production (D4s_v5):</label>
                <span className="font-mono text-emerald-400 font-bold">{vmCount} VMs</span>
              </div>
              <input
                type="range"
                min="2"
                max="50"
                value={vmCount}
                onChange={(e) => setVmCount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-slate-400 font-medium block mb-1">Mô Hình Cam Kết Giá:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPricingModel('payg')}
                  className={`py-1.5 px-2 rounded-lg border text-center font-mono text-[11px] cursor-pointer transition-colors ${
                    pricingModel === 'payg'
                      ? 'bg-slate-800 border-slate-600 text-slate-200 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Pay-As-You-Go
                </button>
                <button
                  type="button"
                  onClick={() => setPricingModel('res1')}
                  className={`py-1.5 px-2 rounded-lg border text-center font-mono text-[11px] cursor-pointer transition-colors ${
                    pricingModel === 'res1'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  1-Year (-40%)
                </button>
                <button
                  type="button"
                  onClick={() => setPricingModel('res3')}
                  className={`py-1.5 px-2 rounded-lg border text-center font-mono text-[11px] cursor-pointer transition-colors ${
                    pricingModel === 'res3'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  3-Year (-62%)
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-300 font-medium">Áp dụng Azure Hybrid Benefit (Bản quyền sẵn có):</span>
              <input
                type="checkbox"
                checked={hasHybridBenefit}
                onChange={(e) => setHasHybridBenefit(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Savings Result Card */}
            <div className="p-3.5 bg-slate-950 rounded-lg border border-emerald-500/50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Chi phí Pay-As-You-Go gốc:</span>
                <span className="font-mono text-slate-400 line-through">${paygTotal.toLocaleString()}/tháng</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-800/80 pt-1.5">
                <span className="font-bold text-slate-200">Chi phí sau tối ưu:</span>
                <span className="font-mono text-base font-bold text-emerald-400">${optimizedTotal.toLocaleString()}/tháng</span>
              </div>
              <div className="p-2 bg-emerald-950/30 rounded border border-emerald-900/50 text-[11px] text-emerald-300 text-center font-semibold">
                💰 Tiết kiệm: ${monthlySavings.toLocaleString()}/tháng (tương đương ${yearlySavings.toLocaleString()}/năm • giảm {Math.round(totalDiscount * 100)}%)
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bicep IaC Snippet */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>Mẫu File Azure Bicep Khởi Tạo Application Gateway Tự Động</span>
          </h3>
          <button
            onClick={() => handleCopy(sampleBicepSnippet, 'bicep-snip')}
            className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer text-xs"
            title="Sao chép"
          >
            {copiedId === 'bicep-snip' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>Copy Bicep</span>
          </button>
        </div>

        <pre className="p-3.5 bg-slate-900/90 rounded-lg border border-slate-800 font-mono text-[11px] text-blue-300 overflow-x-auto leading-relaxed">
          <code>{sampleBicepSnippet}</code>
        </pre>
      </div>
    </div>
  );
};
