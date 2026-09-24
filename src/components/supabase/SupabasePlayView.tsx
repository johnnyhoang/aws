import React, { useState } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Copy, 
  Check, 
  Terminal, 
  Code2, 
  Lock
} from 'lucide-react';

export const SupabasePlayView: React.FC = () => {
  const [tableName, setTableName] = useState('notes');
  const [operation, setOperation] = useState<'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'ALL'>('SELECT');
  const [policyType, setPolicyType] = useState<'owner_only' | 'public_read' | 'authenticated_all' | 'custom'>('owner_only');
  const [userIdColumn, setUserIdColumn] = useState('user_id');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generatePolicySql = () => {
    const policyName = `policy_${tableName}_${operation.toLowerCase()}_${policyType}`;
    let usingClause = '';
    let withCheckClause = '';

    if (policyType === 'owner_only') {
      usingClause = `auth.uid() = ${userIdColumn}`;
      withCheckClause = `auth.uid() = ${userIdColumn}`;
    } else if (policyType === 'public_read') {
      usingClause = `true`;
      withCheckClause = `auth.uid() IS NOT NULL`;
    } else if (policyType === 'authenticated_all') {
      usingClause = `auth.role() = 'authenticated'`;
      withCheckClause = `auth.role() = 'authenticated'`;
    } else {
      usingClause = `(auth.uid() = ${userIdColumn} OR is_admin = true)`;
      withCheckClause = `(auth.uid() = ${userIdColumn} OR is_admin = true)`;
    }

    if (operation === 'SELECT') {
      return `-- 1. Bật RLS nếu chưa bật\nALTER TABLE public.${tableName} ENABLE ROW LEVEL SECURITY;\n\n-- 2. Tạo chính sách SELECT\nCREATE POLICY "${policyName}"\nON public.${tableName} FOR SELECT\nUSING (${usingClause});`;
    } else if (operation === 'INSERT') {
      return `-- 1. Bật RLS nếu chưa bật\nALTER TABLE public.${tableName} ENABLE ROW LEVEL SECURITY;\n\n-- 2. Tạo chính sách INSERT\nCREATE POLICY "${policyName}"\nON public.${tableName} FOR INSERT\nWITH CHECK (${withCheckClause});`;
    } else if (operation === 'UPDATE') {
      return `-- 1. Bật RLS nếu chưa bật\nALTER TABLE public.${tableName} ENABLE ROW LEVEL SECURITY;\n\n-- 2. Tạo chính sách UPDATE\nCREATE POLICY "${policyName}"\nON public.${tableName} FOR UPDATE\nUSING (${usingClause})\nWITH CHECK (${withCheckClause});`;
    } else if (operation === 'DELETE') {
      return `-- 1. Bật RLS nếu chưa bật\nALTER TABLE public.${tableName} ENABLE ROW LEVEL SECURITY;\n\n-- 2. Tạo chính sách DELETE\nCREATE POLICY "${policyName}"\nON public.${tableName} FOR DELETE\nUSING (${usingClause});`;
    } else {
      return `-- 1. Bật RLS nếu chưa bật\nALTER TABLE public.${tableName} ENABLE ROW LEVEL SECURITY;\n\n-- 2. Tạo chính sách ALL (CRUD)\nCREATE POLICY "${policyName}"\nON public.${tableName} FOR ALL\nUSING (${usingClause})\nWITH CHECK (${withCheckClause});`;
    }
  };

  const generatedSql = generatePolicySql();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-slate-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Database className="w-6 h-6 text-emerald-400" />
          <span>Supabase Interactive Lab & RLS Policy Builder</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Trình tạo chính sách Row Level Security (RLS) tự động & Tra cứu cú pháp SQL
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Input Configuration */}
        <div className="space-y-4">
          <div className="border-l-2 border-emerald-500 pl-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Thiết Lập Chính Sách RLS</span>
            </h2>
            <p className="text-xs text-slate-400">Tùy biến bảng, thao tác và điều kiện phân quyền</p>
          </div>

          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <label className="text-slate-400 font-medium block mb-1">Tên bảng SQL (Table Name):</label>
              <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-medium block mb-1">Thao tác áp dụng:</label>
                <select
                  value={operation}
                  onChange={(e: any) => setOperation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="SELECT">SELECT (Đọc)</option>
                  <option value="INSERT">INSERT (Thêm)</option>
                  <option value="UPDATE">UPDATE (Sửa)</option>
                  <option value="DELETE">DELETE (Xóa)</option>
                  <option value="ALL">ALL (Toàn bộ CRUD)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-medium block mb-1">Cột chứa User ID:</label>
                <input
                  type="text"
                  value={userIdColumn}
                  onChange={(e) => setUserIdColumn(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-medium block mb-1">Mẫu phân quyền (Rule Template):</label>
              <select
                value={policyType}
                onChange={(e: any) => setPolicyType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="owner_only">Chỉ chủ sở hữu (auth.uid() = user_id)</option>
                <option value="public_read">Công khai cho mọi người đọc (Public Read)</option>
                <option value="authenticated_all">Bất kỳ ai đã đăng nhập (Authenticated Users)</option>
                <option value="custom">Chủ sở hữu hoặc Admin</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Generated Code */}
        <div className="space-y-4">
          <div className="border-l-2 border-emerald-500 pl-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Mã SQL RLS Policy Tự Động Sinh</span>
            </h2>
            <p className="text-xs text-slate-400">Chạy trực tiếp trong SQL Editor trên Supabase Dashboard</p>
          </div>

          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-emerald-300 text-[11px]">rls_policy.sql</span>
              <button
                onClick={() => handleCopy(generatedSql, 'sql-code')}
                className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                title="Sao chép SQL"
              >
                {copiedId === 'sql-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">Copy SQL</span>
              </button>
            </div>
            <pre className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto max-h-[380px] leading-relaxed">
              <code>{generatedSql}</code>
            </pre>
          </div>
        </div>

      </div>

      {/* Cheatsheet Section */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
          Bảng Tra Cứu Lệnh Supabase CLI Phổ Biến
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-emerald-300 font-bold block">supabase start</span>
            <p className="text-slate-400 text-[11px]">Khởi động toàn bộ stack Supabase local qua Docker</p>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-emerald-300 font-bold block">supabase db reset</span>
            <p className="text-slate-400 text-[11px]">Làm sạch database, chạy lại migrations và nạp seed data</p>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-emerald-300 font-bold block">supabase db push</span>
            <p className="text-slate-400 text-[11px]">Đẩy các file migrations mới lên Production database</p>
          </div>
        </div>
      </div>
    </div>
  );
};
