import React, { useState } from 'react';
import { 
  Database, 
  GitBranch, 
  Copy, 
  Check, 
  Terminal, 
  Zap, 
  Cpu
} from 'lucide-react';

export const NeonPlayView: React.FC = () => {
  const [projectId, setProjectId] = useState('ep-proud-waterfall-839201');
  const [region, setRegion] = useState('us-east-2');
  const [dbName, setDbName] = useState('neondb');
  const [dbUser, setDbUser] = useState('alex');
  const [dbPassword, setDbPassword] = useState('s3cr3t_p4ss');
  const [isPooled, setIsPooled] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const hostName = isPooled 
    ? `${projectId}-pooler.${region}.aws.neon.tech`
    : `${projectId}.${region}.aws.neon.tech`;

  const connectionUri = `postgresql://${dbUser}:${dbPassword}@${hostName}/${dbName}?sslmode=require`;

  const prismaSchemaSnippet = `// prisma/schema.prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL") // Pooled Connection (Runtime)
  directUrl = env("DIRECT_URL")   // Direct Connection (Migrations)
}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-slate-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Database className="w-6 h-6 text-cyan-400" />
          <span>Neon Serverless Postgres Interactive Lab</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Trình tạo Connection String tối ưu cho Serverless & Mô phỏng Connection Pooling
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Input Configuration */}
        <div className="space-y-4">
          <div className="border-l-2 border-cyan-500 pl-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Thiết Lập Thông Số Kết Nối</span>
            </h2>
            <p className="text-xs text-slate-400">Tùy biến Endpoint, Region và Chế độ Pooling</p>
          </div>

          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <label className="text-slate-400 font-medium block mb-1">Project Endpoint ID:</label>
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-medium block mb-1">Region:</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="us-east-2">us-east-2 (Ohio)</option>
                  <option value="us-east-1">us-east-1 (N. Virginia)</option>
                  <option value="us-west-2">us-west-2 (Oregon)</option>
                  <option value="eu-central-1">eu-central-1 (Frankfurt)</option>
                  <option value="ap-southeast-1">ap-southeast-1 (Singapore)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-medium block mb-1">Database Name:</label>
                <input
                  type="text"
                  value={dbName}
                  onChange={(e) => setDbName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-medium block mb-1">Database User:</label>
                <input
                  type="text"
                  value={dbUser}
                  onChange={(e) => setDbUser(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium block mb-1">Password:</label>
                <input
                  type="password"
                  value={dbPassword}
                  onChange={(e) => setDbPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-slate-200 font-semibold">Bật Connection Pooling (PgBouncer):</span>
              <input
                type="checkbox"
                checked={isPooled}
                onChange={(e) => setIsPooled(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right: Generated Code */}
        <div className="space-y-4">
          <div className="border-l-2 border-cyan-500 pl-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Chuỗi Kết Nối Sinh Ra (Connection URI)</span>
            </h2>
            <p className="text-xs text-slate-400">Sử dụng cho biến môi trường DATABASE_URL</p>
          </div>

          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-cyan-300 text-[11px]">DATABASE_URL</span>
                <button
                  onClick={() => handleCopy(connectionUri, 'conn-uri')}
                  className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                  title="Sao chép URI"
                >
                  {copiedId === 'conn-uri' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[11px]">Copy URI</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto whitespace-pre-wrap break-all">
                <code>{connectionUri}</code>
              </pre>
            </div>

            <div className="space-y-1 pt-2">
              <span className="font-mono text-slate-400 text-[11px] block">Cấu hình Prisma Schema chuẩn:</span>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
                <code>{prismaSchemaSnippet}</code>
              </pre>
            </div>
          </div>
        </div>

      </div>

      {/* Cheatsheet Section */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
          Bảng Tra Cứu Lệnh Neon CLI (neonctl) Phổ Biến
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-cyan-300 font-bold block">neonctl branches create</span>
            <p className="text-slate-400 text-[11px]">Tạo nhánh Database mới (Copy-on-Write) trong 1 giây</p>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-cyan-300 font-bold block">neonctl connection-string --pooled</span>
            <p className="text-slate-400 text-[11px]">Lấy chuỗi kết nối tối ưu cho Vercel / Next.js Serverless</p>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-cyan-300 font-bold block">neonctl branches delete</span>
            <p className="text-slate-400 text-[11px]">Xóa nhánh tạm sau khi kết thúc quá trình test PR</p>
          </div>
        </div>
      </div>
    </div>
  );
};
