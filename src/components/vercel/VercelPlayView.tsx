import React, { useState } from 'react';
import { 
  Terminal, 
  Globe, 
  Copy, 
  Check, 
  ShieldCheck, 
  Cpu, 
  FileCode,
  Sparkles
} from 'lucide-react';

export const VercelPlayView: React.FC = () => {
  const [domainName, setDomainName] = useState('my-awesome-app.com');
  const [framework, setFramework] = useState('nextjs');
  const [enableSecurityHeaders, setEnableSecurityHeaders] = useState(true);
  const [enableCleanUrls, setEnableCleanUrls] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const cleanDomain = domainName.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const isSubdomain = cleanDomain.split('.').length > 2;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generatedVercelJson = JSON.stringify(
    {
      $schema: 'https://openapi.vercel.sh/vercel.json',
      cleanUrls: enableCleanUrls,
      trailingSlash: false,
      ...(enableSecurityHeaders ? {
        headers: [
          {
            source: '/(.*)',
            headers: [
              { key: 'X-Content-Type-Options', value: 'nosniff' },
              { key: 'X-Frame-Options', value: 'DENY' },
              { key: 'X-XSS-Protection', value: '1; mode=block' },
              { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
              { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
            ]
          }
        ]
      } : {})
    },
    null,
    2
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-slate-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Terminal className="w-6 h-6 text-indigo-400" />
          <span>Vercel Interactive Lab & Config Generator</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Sinh bản ghi DNS chuẩn Vercel Anycast & Trình tạo cấu hình vercel.json bảo mật
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Tool 1: DNS Record Generator */}
        <div className="space-y-4">
          <div className="border-l-2 border-indigo-500 pl-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>Máy Phát Bản Ghi DNS Vercel</span>
            </h2>
            <p className="text-xs text-slate-400">Tự động nhận diện Apex hay Subdomain để tạo bản ghi A/CNAME chuẩn</p>
          </div>

          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">
                Nhập tên miền của bạn:
              </label>
              <input
                type="text"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                placeholder="ví dụ: mycompany.com hoặc app.mycompany.com"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <span className="font-bold text-slate-200 block">Bản ghi cần cấu hình tại nhà đăng ký DNS:</span>
              
              {!isSubdomain ? (
                <>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono space-y-1">
                    <div className="flex justify-between items-center text-slate-400 text-[11px]">
                      <span>1. Bản ghi A cho Root Domain:</span>
                      <button 
                        onClick={() => handleCopy('76.76.21.21', 'a-record')} 
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === 'a-record' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="text-indigo-300">Type: <span className="text-white">A</span> | Host: <span className="text-white">@</span> | Points to: <span className="text-emerald-400">76.76.21.21</span></div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono space-y-1">
                    <div className="flex justify-between items-center text-slate-400 text-[11px]">
                      <span>2. Bản ghi CNAME cho www:</span>
                      <button 
                        onClick={() => handleCopy('cname.vercel-dns.com', 'cname-record')} 
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === 'cname-record' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="text-indigo-300">Type: <span className="text-white">CNAME</span> | Host: <span className="text-white">www</span> | Points to: <span className="text-emerald-400">cname.vercel-dns.com</span></div>
                  </div>
                </>
              ) : (
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono space-y-1">
                  <div className="flex justify-between items-center text-slate-400 text-[11px]">
                    <span>Bản ghi CNAME cho Subdomain ({cleanDomain}):</span>
                    <button 
                      onClick={() => handleCopy('cname.vercel-dns.com', 'cname-sub')} 
                      className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === 'cname-sub' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-indigo-300">Type: <span className="text-white">CNAME</span> | Host: <span className="text-white">{cleanDomain.split('.')[0]}</span> | Points to: <span className="text-emerald-400">cname.vercel-dns.com</span></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tool 2: vercel.json Generator */}
        <div className="space-y-4">
          <div className="border-l-2 border-indigo-500 pl-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-400" />
              <span>Trình Tạo Cấu Hình vercel.json</span>
            </h2>
            <p className="text-xs text-slate-400">Tùy biến Security Headers và Clean URLs chuẩn mực</p>
          </div>

          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Bật HTTP Security Headers (HSTS, CSP, X-Frame):</span>
              <input
                type="checkbox"
                checked={enableSecurityHeaders}
                onChange={(e) => setEnableSecurityHeaders(e.target.checked)}
                className="w-4 h-4 accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Bật Clean URLs (Tự động loại bỏ đuôi .html):</span>
              <input
                type="checkbox"
                checked={enableCleanUrls}
                onChange={(e) => setEnableCleanUrls(e.target.checked)}
                className="w-4 h-4 accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-indigo-300 text-[11px]">vercel.json</span>
                <button
                  onClick={() => handleCopy(generatedVercelJson, 'v-json')}
                  className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                  title="Sao chép JSON"
                >
                  {copiedId === 'v-json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto max-h-56">
                <code>{generatedVercelJson}</code>
              </pre>
            </div>
          </div>
        </div>

      </div>

      {/* Cheatsheet Section */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
          Bảng Tra Cứu Lệnh Vercel CLI Phổ Biến
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-indigo-300 font-bold block">vercel deploy</span>
            <p className="text-slate-400 text-[11px]">Triển khai mã nguồn lên môi trường Preview tức thì</p>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-indigo-300 font-bold block">vercel --prod</span>
            <p className="text-slate-400 text-[11px]">Đẩy thẳng bản dựng lên Production và trỏ domain chính</p>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-indigo-300 font-bold block">vercel env pull</span>
            <p className="text-slate-400 text-[11px]">Tải an toàn biến môi trường Development về máy local</p>
          </div>
        </div>
      </div>
    </div>
  );
};
