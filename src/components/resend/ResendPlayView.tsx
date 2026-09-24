import React, { useState } from 'react';
import { 
  Terminal, 
  Send, 
  Copy, 
  Check, 
  ShieldCheck, 
  Code2, 
  Sparkles
} from 'lucide-react';

export const ResendPlayView: React.FC = () => {
  const [fromDomain, setFromDomain] = useState('auth.mycompany.com');
  const [senderName, setSenderName] = useState('Acme Security');
  const [toEmail, setToEmail] = useState('user@example.com');
  const [emailSubject, setEmailSubject] = useState('Mã xác thực OTP đăng nhập của bạn');
  const [userName, setUserName] = useState('Alex');
  const [otpCode, setOtpCode] = useState('849201');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generatedTypeScriptCode = `import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtp() {
  const { data, error } = await resend.emails.send({
    from: '${senderName} <security@${fromDomain}>',
    to: ['${toEmail}'],
    subject: '${emailSubject}',
    html: \`
      <div style="font-family: sans-serif; background: #020617; color: #f8fafc; padding: 24px; border-radius: 16px;">
        <h2 style="color: #f43f5e;">Xác Thực Tài Khoản</h2>
        <p>Xin chào <strong>${userName}</strong>,</p>
        <p>Mã bảo mật 6 chữ số của bạn có hiệu lực trong 5 phút:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #fbbf24; padding: 16px 0;">
          ${otpCode}
        </div>
        <p style="font-size: 12px; color: #64748b;">Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email.</p>
      </div>
    \`,
    headers: {
      'Idempotency-Key': 'otp-${toEmail}-' + Date.now(),
    },
    tags: [
      { name: 'category', value: 'auth-otp' }
    ]
  });

  if (error) {
    console.error('Lỗi:', error);
    return;
  }

  console.log('Đã gửi email thành công, ID:', data?.id);
}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-slate-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Send className="w-6 h-6 text-rose-400" />
          <span>Resend Interactive Lab & Code Generator</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Trình tạo mã nguồn gửi email TypeScript & Sinh giao diện HTML thời gian thực
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Input Configuration */}
        <div className="space-y-4">
          <div className="border-l-2 border-rose-500 pl-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-rose-400" />
              <span>Thiết Lập Thông Số Gửi Email</span>
            </h2>
            <p className="text-xs text-slate-400">Tùy biến người gửi, người nhận và nội dung động</p>
          </div>

          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <label className="text-slate-400 font-medium block mb-1">Domain người gửi:</label>
              <input
                type="text"
                value={fromDomain}
                onChange={(e) => setFromDomain(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg font-mono text-rose-300 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-medium block mb-1">Tên người gửi:</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium block mb-1">Email người nhận:</label>
                <input
                  type="email"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-medium block mb-1">Tên người dùng:</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium block mb-1">Mã OTP mẫu:</label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg font-mono text-amber-400 font-bold focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-medium block mb-1">Tiêu đề email:</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Visual Email Preview */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Xem trước giao diện thư (Email Client Preview)
            </span>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                <div>From: <span className="text-slate-200 font-semibold">{senderName} &lt;security@{fromDomain}&gt;</span></div>
                <div>Subject: <span className="text-slate-200 font-semibold">{emailSubject}</span></div>
              </div>
              <div className="p-4 bg-slate-900 rounded-lg text-xs space-y-2 text-slate-300">
                <h3 className="text-sm font-bold text-rose-400">Xác Thực Tài Khoản</h3>
                <p>Xin chào <strong>{userName}</strong>,</p>
                <p className="text-slate-400">Mã bảo mật 6 chữ số của bạn có hiệu lực trong 5 phút:</p>
                <div className="text-2xl font-bold font-mono text-amber-400 tracking-widest py-1">
                  {otpCode}
                </div>
                <p className="text-[10px] text-slate-500">Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Generated Code */}
        <div className="space-y-4">
          <div className="border-l-2 border-rose-500 pl-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-rose-400" />
              <span>Mã Nguồn TypeScript Tự Động Sinh</span>
            </h2>
            <p className="text-xs text-slate-400">Sẵn sàng copy vào Server Action hoặc Backend Service</p>
          </div>

          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-rose-300 text-[11px]">sendOtpEmail.ts</span>
              <button
                onClick={() => handleCopy(generatedTypeScriptCode, 'ts-code')}
                className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                title="Sao chép mã nguồn"
              >
                {copiedId === 'ts-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">Copy Code</span>
              </button>
            </div>
            <pre className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto max-h-[380px] leading-relaxed">
              <code>{generatedTypeScriptCode}</code>
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};
