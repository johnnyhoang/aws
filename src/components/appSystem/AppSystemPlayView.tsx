import React, { useState } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Terminal, 
  Copy, 
  Check, 
  Zap,
  Sparkles,
  Server
} from 'lucide-react';

export const AppSystemPlayView: React.FC = () => {
  const [selectedDb, setSelectedDb] = useState<'neon' | 'supabase' | 'turso'>('neon');
  const [keyType, setKeyType] = useState<'publishable' | 'secret'>('publishable');
  const [tenantSlug, setTenantSlug] = useState('acme-corp');
  const [secretPayload, setSecretPayload] = useState('ghp_LiveProductionApiKey9823479');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentKey = keyType === 'publishable' 
    ? `pk_live_infra_${tenantSlug.replace(/-/g, '_')}_78a2f0c19b`
    : `sk_live_infra_master_${tenantSlug.replace(/-/g, '_')}_e839bf0912da4`;

  // Simulated AES-256-GCM + AAD Result
  const mockIv = 'a3f8c2019b8e';
  const mockAuthTag = '9f7d2e4a8b1c5e6f';
  const mockCiphertext = `enc:v1:${mockIv}:${btoa(secretPayload).slice(0, 18)}...:${mockAuthTag}`;

  const sampleSdkSnippet = `// apps/web/lib/infra.ts
import { createInfraClient } from "@infra/sdk";

export const infra = createInfraClient({
  apiKey: process.env.NEXT_PUBLIC_INFRA_PUBLISHABLE_KEY, // "${currentKey}"
  endpoint: "https://api.unified-infra.internal",
  adapter: "${selectedDb}", // '${selectedDb.toUpperCase()}' Provider
});

// Truy vấn có bộ lọc ABAC tự động theo Tenant
export async function getTenantDocuments() {
  const docs = await infra.data("documents").findMany({
    where: { status: "published" } // Server tự động tiêm: AND tenant_id = "${tenantSlug}"
  });
  return docs;
}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-slate-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Layers className="w-6 h-6 text-violet-400" />
          <span>Unified-App-Infra Interactive Playground</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Mô phỏng cơ chế Client SDK (@infra/sdk), Bộ lọc ABAC Data Gateway & Mã hóa AES-256-GCM AAD
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Interactive Controls */}
        <div className="space-y-5">
          <div className="border-l-2 border-violet-500 pl-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-violet-400" />
              <span>Thiết Lập Ngữ Cảnh Bảo Mật (Context)</span>
            </h2>
            <p className="text-xs text-slate-400">Tùy biến Tenant, Loại Key và Database Adapter</p>
          </div>

          <div className="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <label className="text-slate-400 font-medium block mb-1">Tenant Slug / ID:</label>
              <input
                type="text"
                value={tenantSlug}
                onChange={(e) => setTenantSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg font-mono text-violet-300 focus:outline-none focus:border-violet-500"
                placeholder="acme-corp"
              />
            </div>

            <div>
              <label className="text-slate-400 font-medium block mb-1">Loại API Key:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setKeyType('publishable')}
                  className={`py-2 px-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    keyType === 'publishable'
                      ? 'bg-violet-950/60 border-violet-500 text-violet-200 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-mono text-[11px] text-violet-400">pk_live_...</div>
                  <div className="text-[10px] text-slate-400">Client / Browser Safe</div>
                </button>
                <button
                  type="button"
                  onClick={() => setKeyType('secret')}
                  className={`py-2 px-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    keyType === 'secret'
                      ? 'bg-amber-950/60 border-amber-500 text-amber-200 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-mono text-[11px] text-amber-400">sk_live_...</div>
                  <div className="text-[10px] text-slate-400">Backend Server Role</div>
                </button>
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-medium block mb-1">Database Adapter:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['neon', 'supabase', 'turso'] as const).map((db) => (
                  <button
                    key={db}
                    type="button"
                    onClick={() => setSelectedDb(db)}
                    className={`py-2 px-2 rounded-lg border text-center uppercase font-mono text-[11px] cursor-pointer transition-colors ${
                      selectedDb === db
                        ? 'bg-violet-950/60 border-violet-500 text-violet-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {db}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="text-slate-400 font-medium block">
                Dữ liệu nhạy cảm cần mã hóa AES-256-GCM (AAD: <span className="text-violet-300 font-mono">{tenantSlug}</span>):
              </label>
              <input
                type="text"
                value={secretPayload}
                onChange={(e) => setSecretPayload(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg font-mono text-slate-200 focus:outline-none focus:border-violet-500 text-xs"
              />
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-mono block">Ciphertext đã niêm phong chữ ký AAD:</span>
                <code className="text-[11px] text-emerald-400 font-mono break-all">{mockCiphertext}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Generated SDK Code & Policy Simulation */}
        <div className="space-y-5">
          <div className="border-l-2 border-violet-500 pl-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-400" />
              <span>Thực Thi Qua Client SDK (@infra/sdk)</span>
            </h2>
            <p className="text-xs text-slate-400">Code TypeScript và cơ chế Server-side Injection</p>
          </div>

          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-violet-300 text-[11px]">apps/web/lib/infra.ts</span>
                <button
                  onClick={() => handleCopy(sampleSdkSnippet, 'sdk-snip')}
                  className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                  title="Sao chép Code"
                >
                  {copiedId === 'sdk-snip' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span className="text-[11px]">Copy Code</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                <code>{sampleSdkSnippet}</code>
              </pre>
            </div>

            {/* ABAC Injection Preview */}
            <div className="p-3 bg-slate-950 rounded-lg border border-violet-500/40 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-violet-300 text-[11px]">
                <Zap className="w-3.5 h-3.5 text-violet-400" />
                <span>Cơ chế ABAC Gateway Compiler tự động thực hiện:</span>
              </div>
              <div className="font-mono text-[11px] text-slate-300 bg-slate-900/90 p-2 rounded border border-slate-800">
                <span className="text-blue-400">SELECT</span> * <span className="text-blue-400">FROM</span> documents <br />
                <span className="text-blue-400">WHERE</span> status = <span className="text-emerald-400">'published'</span> <br />
                <span className="text-amber-400 font-bold">  AND tenant_id = '{tenantSlug}'</span> <span className="text-slate-500">/* Injected by Gateway */</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 6 Future Roadmap Pillars Grid */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>Lộ Trình 6 Module Đột Phá Sắp Triển Khai (Roadmap)</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">Chương 10 Roadmap</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-semibold text-violet-300 flex items-center gap-1.5">
              <Server className="w-4 h-4 text-violet-400" />
              <span>1. Storage Gateway R2/S3</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Presigned URL upload trực tiếp tới Cloudflare R2, miễn phí 100% Egress, kiểm tra quyền ABAC trước khi cấp link tải.
            </p>
          </div>

          <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-semibold text-violet-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-violet-400" />
              <span>2. Task Queue BullMQ</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Hàng đợi tác vụ nền phân tán trên Redis/QStash, tự động retry lũy thừa, xử lý xuất file PDF và email hàng loạt.
            </p>
          </div>

          <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-semibold text-violet-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-violet-400" />
              <span>3. Realtime CDC WebSockets</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Bắt sự kiện ghi từ Postgres WAL (Change Data Capture) và bắn trực tiếp về client qua WebSocket Pub/Sub lọc theo tenant.
            </p>
          </div>

          <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-semibold text-violet-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>4. AI pgvector Semantic Search</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Tích hợp Vector Embeddings trực tiếp trong Postgres Drizzle ORM, thực hiện tìm kiếm ngữ nghĩa kết hợp lọc metadata siêu tốc.
            </p>
          </div>

          <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-semibold text-violet-300 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-violet-400" />
              <span>5. Edge Caching PoP (20ms)</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Định tuyến các truy vấn đọc qua Cloudflare Workers và Turso Read Replicas, tự động xóa cache khi có thay đổi dữ liệu.
            </p>
          </div>

          <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-semibold text-violet-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-violet-400" />
              <span>6. Multi-Tenant Stripe Billing</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Đo lường thời gian thực số lượng API calls, Storage và Egress của từng Tenant để tự động tính tiền và phát hành hóa đơn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
