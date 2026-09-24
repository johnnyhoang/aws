import React, { useState } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  Terminal, 
  Calculator, 
  Clock, 
  CreditCard, 
  FileCode2, 
  Check, 
  Copy, 
  Play,
  RotateCcw
} from 'lucide-react';

export const TokenWalletPlayView: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'quota_math' | 'time_parser' | 'payment_parser' | 'spec_builder'>('quota_math');

  // Lab 1: Quota Math Simulator
  const [resetHoursAgo, setResetHoursAgo] = useState<number>(14);
  const [stepHours, setStepHours] = useState<number>(5);
  
  const calculateRollForward = (elapsedHours: number, step: number) => {
    const cycles = Math.floor(elapsedHours / step) + 1;
    const nextInHours = (cycles * step) - elapsedHours;
    return { cycles, nextInHours };
  };
  const quotaResult = calculateRollForward(resetHoursAgo, stepHours);

  // Lab 2: Time Parser Simulator
  const [timeInput, setTimeInput] = useState<string>('3 tiếng 20 phút nữa');
  const [parsedTimeResult, setParsedTimeResult] = useState<string>('');

  const runTimeParser = (text: string) => {
    const lower = text.toLowerCase().trim();
    const now = new Date();
    
    // Relative: 3h, 3 tiếng, 20p
    const relMatch = lower.match(/(\d+)\s*(h|tiếng|giờ|p|phút)/);
    if (relMatch) {
      const val = parseInt(relMatch[1]);
      const unit = relMatch[2];
      const target = new Date(now);
      if (unit.startsWith('h') || unit.startsWith('tiếng') || unit.startsWith('giờ')) {
        target.setHours(target.getHours() + val);
      } else {
        target.setMinutes(target.getMinutes() + val);
      }
      return `Target ISO: ${target.toISOString()} (Vào lúc ${target.toLocaleTimeString('vi-VN')} ngày ${target.toLocaleDateString('vi-VN')})`;
    }

    // Time of day: 15:30, 20h
    const timeMatch = lower.match(/(\d{1,2})[:h](\d{2})?/);
    if (timeMatch) {
      const h = parseInt(timeMatch[1]);
      const m = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
      const target = new Date(now);
      target.setHours(h, m, 0, 0);
      if (target.getTime() <= now.getTime()) {
        target.setDate(target.getDate() + 1);
      }
      return `Target ISO: ${target.toISOString()} (Vào lúc ${target.toLocaleTimeString('vi-VN')} ngày ${target.toLocaleDateString('vi-VN')})`;
    }

    return 'Không nhận diện được mẫu thời gian. Hãy thử: "3h nữa", "15:30", "45 phút nữa"';
  };

  // Lab 3: Payment Parser Simulator
  const [paymentInput, setPaymentInput] = useState<string>('Thanh toán Cursor 20$ thẻ Techcombank Visa ngày 15 hàng tháng');
  const [parsedPaymentResult, setParsedPaymentResult] = useState<any>(null);

  const runPaymentParser = (text: string) => {
    let service = 'Unknown Service';
    let amount = 0;
    let currency = 'USD';
    let dueDay = 1;
    let method = 'Unknown Card';

    if (/cursor/i.test(text)) service = 'Cursor Pro';
    if (/claude/i.test(text)) service = 'Claude Pro';
    if (/chatgpt/i.test(text)) service = 'ChatGPT Plus';
    if (/vercel/i.test(text)) service = 'Vercel Pro';
    if (/supabase/i.test(text)) service = 'Supabase Pro';

    const amtMatch = text.match(/(\d+(?:\.\d+)?)\s*(\$|usd|k|vnd|đ)/i);
    if (amtMatch) {
      amount = parseFloat(amtMatch[1]);
      currency = /vnd|k|đ/i.test(amtMatch[2]) ? 'VND' : 'USD';
      if (/k/i.test(amtMatch[2])) amount *= 1000;
    }

    const dayMatch = text.match(/ngày\s*(\d{1,2})/i);
    if (dayMatch) {
      dueDay = parseInt(dayMatch[1]);
    }

    if (/techcombank|tcb/i.test(text)) method = 'Techcombank Visa';
    if (/vietcombank|vcb/i.test(text)) method = 'VCB Mastercard';
    if (/momo/i.test(text)) method = 'Ví MoMo';

    return {
      service_name: service,
      amount,
      currency,
      due_day: dueDay,
      payment_method: method,
      billing_cycle: 'monthly'
    };
  };

  // Lab 4: AI Spec Builder Simulator
  const [ideaInput, setIdeaInput] = useState<string>('App nhắc nhở uống nước thông minh kết hợp tính toán calo tiêu thụ');
  const [generatedSpec, setGeneratedSpec] = useState<string>('');

  const runGenerateSpec = (idea: string) => {
    const slug = idea.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 20);
    return `# TECHNICAL SPECIFICATION (SRS): ${idea.toUpperCase()}
## 1. Executive Summary
- **App Slug:** \`${slug}\`
- **Core Value Proposition:** Ứng dụng hỗ trợ theo dõi sức khỏe và thói quen uống nước theo thời gian thực.

## 2. Recommended Tech Stack
- **Frontend:** React 19 + Tailwind CSS + Lucide Icons
- **State Management:** Zustand / React Context
- **Database:** Supabase PostgreSQL with Row Level Security (RLS)
- **Deployment:** Vercel Edge Network

## 3. Database Schema
\`\`\`sql
CREATE TABLE app_water_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  amount_ml INT NOT NULL,
  logged_at TIMESTAMPTZ DEFAULT now()
);
\`\`\`

## 4. MVP Roadmap
- [x] Phase 1: Authentication & Basic UI
- [ ] Phase 2: Water Tracker & Calorie Calculator
- [ ] Phase 3: Push Notification Reminder`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Gamepad2 className="w-3.5 h-3.5" /> Interactive Sandbox & Labs
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Phòng Thí Nghiệm & Mô Phỏng Thuật Toán TokenWallet
            </h1>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
          <button
            onClick={() => setActiveLab('quota_math')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeLab === 'quota_math'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold text-sm mb-1">
              <Calculator className="w-4 h-4 text-emerald-400" />
              1. Quota Math
            </div>
            <div className="text-xs text-slate-500">Mô phỏng rollForward</div>
          </button>

          <button
            onClick={() => setActiveLab('time_parser')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeLab === 'time_parser'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold text-sm mb-1">
              <Clock className="w-4 h-4 text-emerald-400" />
              2. Time Parser
            </div>
            <div className="text-xs text-slate-500">Regex phân tích giờ</div>
          </button>

          <button
            onClick={() => setActiveLab('payment_parser')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeLab === 'payment_parser'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold text-sm mb-1">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              3. Payment Parser
            </div>
            <div className="text-xs text-slate-500">Bóc tách hóa đơn</div>
          </button>

          <button
            onClick={() => setActiveLab('spec_builder')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeLab === 'spec_builder'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold text-sm mb-1">
              <FileCode2 className="w-4 h-4 text-emerald-400" />
              4. AI Spec Builder
            </div>
            <div className="text-xs text-slate-500">Sinh hồ sơ SRS</div>
          </button>
        </div>

        {/* Lab 1: Quota Math */}
        {activeLab === 'quota_math' && (
          <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-400" />
              Mô Phỏng Thuật Toán rollForwardResetTime()
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Điều chỉnh số giờ đã trôi qua và bước nhảy chu kỳ để xem thuật toán tự động bù chu kỳ như thế nào.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Thời gian reset cũ đã trôi qua trong quá khứ (Số giờ trước): {resetHoursAgo} giờ
                </label>
                <input
                  type="range"
                  min="1"
                  max="48"
                  value={resetHoursAgo}
                  onChange={(e) => setResetHoursAgo(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Bước nhảy chu kỳ (step_hours): {stepHours} giờ (Claude = 5h, GPT = 3h)
                </label>
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={stepHours}
                  onChange={(e) => setStepHours(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm space-y-2">
              <div className="text-slate-400">// Kết quả tính toán của Roll-Forward Engine:</div>
              <div className="text-emerald-400 font-bold">Số chu kỳ cần cộng thêm (cyclesToAdd): {quotaResult.cycles} chu kỳ</div>
              <div className="text-slate-200">Tổng số giờ bù thêm: {quotaResult.cycles * stepHours} giờ</div>
              <div className="text-cyan-300 font-bold">Thời điểm reset tiếp theo: Sau {quotaResult.nextInHours} giờ nữa kể từ bây giờ</div>
            </div>
          </div>
        )}

        {/* Lab 2: Time Parser */}
        {activeLab === 'time_parser' && (
          <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              Trình Thử Nghiệm Natural Language Time Parser
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Nhập chuỗi văn bản tự nhiên để kiểm tra khả năng bóc tách thời gian của Regex Engine.
            </p>

            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                placeholder="Ví dụ: 3 tiếng nữa, 15:30, 45 phút nữa..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => setParsedTimeResult(runTimeParser(timeInput))}
                className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl text-sm transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4" /> Phân Tích
              </button>
            </div>

            {parsedTimeResult && (
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm text-emerald-300">
                {parsedTimeResult}
              </div>
            )}
          </div>
        )}

        {/* Lab 3: Payment Parser */}
        {activeLab === 'payment_parser' && (
          <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              Trình Bóc Tách Hóa Đơn Tự Nhiên (Payment Parser)
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Dán đoạn tin nhắn ngân hàng hoặc chi tiêu SaaS để xem JSON đầu ra được chuẩn hóa.
            </p>

            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={paymentInput}
                onChange={(e) => setPaymentInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => setParsedPaymentResult(runPaymentParser(paymentInput))}
                className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl text-sm transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4" /> Trích Xuất
              </button>
            </div>

            {parsedPaymentResult && (
              <pre className="p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                {JSON.stringify(parsedPaymentResult, null, 2)}
              </pre>
            )}
          </div>
        )}

        {/* Lab 4: AI Spec Builder */}
        {activeLab === 'spec_builder' && (
          <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-emerald-400" />
              Bộ Sinh Hồ Sơ Kỹ Thuật AI SRS Builder
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Nhập ý tưởng ứng dụng để kích hoạt động cơ sinh tài liệu kỹ thuật tự động.
            </p>

            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => setGeneratedSpec(runGenerateSpec(ideaInput))}
                className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl text-sm transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Tạo SRS
              </button>
            </div>

            {generatedSpec && (
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {generatedSpec}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenWalletPlayView;
