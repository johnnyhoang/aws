import React, { useState } from 'react';
import { EMAIL_FLASHCARDS } from '../../data/email/emailFlashcardsData';
import { EmailFlashcard } from '../../types/emailModule';
import { 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Copy, 
  Check
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

type PlayTab = 'flashcards' | 'dns_generator' | 'smtp_simulator' | 'postfix_cheatsheet';

export const EmailPlayView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlayTab>('flashcards');
  const { flashcardsMastered, toggleFlashcardMastered, addBonusXP } = useLearning();

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsList, setCardsList] = useState<EmailFlashcard[]>(EMAIL_FLASHCARDS);

  // DNS Generator State
  const [domainInput, setDomainInput] = useState('mycompany.com');
  const [serverIpInput, setServerIpInput] = useState('103.20.100.55');
  const [dmarcPolicy, setDmarcPolicy] = useState<'none' | 'quarantine' | 'reject'>('reject');
  const [includeGoogle, setIncludeGoogle] = useState(true);
  const [includeResend, setIncludeResend] = useState(true);

  // SMTP Simulator State
  const [smtpStep, setSmtpStep] = useState(0);
  const [smtpLog, setSmtpLog] = useState<string[]>([
    '220 mail.mycompany.com ESMTP Postfix (Ubuntu)'
  ]);

  // Copied helper
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const currentCard = cardsList[cardIndex] || cardsList[0];
  const isMastered = flashcardsMastered.includes(currentCard.id);

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex(prev => (prev + 1) % cardsList.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex(prev => (prev - 1 + cardsList.length) % cardsList.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cardsList].sort(() => Math.random() - 0.5);
    setCardsList(shuffled);
    setCardIndex(0);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const advanceSmtp = () => {
    const steps = [
      { cmd: 'EHLO client.remote.org', res: '250-mail.mycompany.com\n250-PIPELINING\n250-SIZE 52428800\n250-STARTTLS\n250 8BITMIME' },
      { cmd: 'MAIL FROM:<sender@remote.org>', res: '250 2.1.0 Ok' },
      { cmd: 'RCPT TO:<admin@mycompany.com>', res: '250 2.1.5 Ok recipient verified' },
      { cmd: 'DATA', res: '354 End data with <CR><LF>.<CR><LF>' },
      { cmd: 'Subject: Chao mung den voi Mail Server!\r\nFrom: sender@remote.org\r\n\r\nDay la email thu nghiem thanh cong.\r\n.', res: '250 2.0.0 Ok: queued as 4Yt8mK2nBz9L (+50 XP)' }
    ];

    if (smtpStep < steps.length) {
      const current = steps[smtpStep];
      setSmtpLog(prev => [...prev, `> ${current.cmd}`, current.res]);
      setSmtpStep(prev => prev + 1);
      if (smtpStep === steps.length - 1) {
        addBonusXP(50);
      }
    }
  };

  const resetSmtp = () => {
    setSmtpStep(0);
    setSmtpLog(['220 mail.mycompany.com ESMTP Postfix (Ubuntu)']);
  };

  // Generated SPF
  const spfIncludes = [
    includeGoogle ? 'include:_spf.google.com' : '',
    includeResend ? 'include:resend.com' : ''
  ].filter(Boolean).join(' ');
  const generatedSpf = `v=spf1 ip4:${serverIpInput || '1.2.3.4'} ${spfIncludes} ~all`.replace(/\s+/g, ' ');
  const generatedDmarc = `v=DMARC1; p=${dmarcPolicy}; sp=${dmarcPolicy}; pct=100; rua=mailto:dmarc-reports@${domainInput || 'mycompany.com'}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-slate-300">
      
      {/* Hero Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
          Phòng Thực Hành Tương Tác Email & Mail Server
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Phòng Thí Nghiệm Cấu Hình DNS & Mô Phỏng Giao Thức Email
        </h1>
        <p className="text-sm text-slate-400">
          Rèn luyện thẻ nhớ thuật ngữ, công cụ tự động sinh bản ghi DNS SPF/DKIM/DMARC chuẩn xác, mô phỏng phiên bắt tay lệnh SMTP thô, và tra cứu cấu hình Postfix/Dovecot.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'flashcards'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Thẻ Nhớ Thuật Ngữ (Flashcards)
          </button>

          <button
            onClick={() => setActiveTab('dns_generator')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'dns_generator'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Trình Tạo Bản Ghi SPF / DMARC
          </button>

          <button
            onClick={() => setActiveTab('smtp_simulator')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'smtp_simulator'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Mô Phỏng Bắt Tay SMTP Telnet
          </button>

          <button
            onClick={() => setActiveTab('postfix_cheatsheet')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'postfix_cheatsheet'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Postfix & Dovecot Cheatsheet
          </button>
        </div>
      </div>

      {/* Tab 1: Flashcards */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">
              Thẻ <strong className="text-sky-400">{cardIndex + 1}</strong> / {cardsList.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors cursor-pointer"
                title="Xáo trộn ngẫu nhiên"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Xáo thẻ</span>
              </button>
            </div>
          </div>

          {/* 3D Flip Flashcard */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[280px] sm:min-h-[320px] p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-sky-500/30 shadow-2xl cursor-pointer select-none flex flex-col justify-between relative group hover:border-sky-500/60 transition-all"
          >
            {/* Top info */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-sky-950 text-sky-300 border border-sky-800 text-xs font-mono">
                {currentCard.category}
              </span>
              <div className="text-xs text-slate-500 group-hover:text-sky-400 transition-colors">
                <span>Nhấn để lật mặt</span>
              </div>
            </div>

            {/* Middle Content (Front vs Back) */}
            <div className="my-6 text-center space-y-4">
              {!isFlipped ? (
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
                    {currentCard.term}
                  </h3>
                  <p className="text-xs text-slate-500 italic">
                    (Nhấp vào đây để xem định nghĩa & bí quyết thực chiến)
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-left animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">Định nghĩa cốt lõi:</span>
                    <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
                      {currentCard.definition}
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Ứng dụng thực tế:</span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentCard.practicalUsage}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-900/50 text-xs text-sky-200">
                    <span><strong>ProTip:</strong> {currentCard.proTip}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom info */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 text-xs">
              <span className="text-slate-500">Mặt {!isFlipped ? '1 (Thuật ngữ)' : '2 (Chi tiết)'}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFlashcardMastered(currentCard.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-colors cursor-pointer ${
                  isMastered
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isMastered ? 'Đã thành thạo (+40 XP)' : 'Đánh dấu đã nhớ'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevCard}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-sky-300 transition-colors cursor-pointer text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Thẻ trước</span>
            </button>

            <span className="text-xs text-slate-500 font-mono">
              Phím mũi tên hoặc nhấn để lật
            </span>

            <button
              onClick={handleNextCard}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition-colors cursor-pointer text-xs font-semibold shadow-lg shadow-sky-900/20"
            >
              <span>Thẻ tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: DNS SPF / DMARC Generator */}
      {activeTab === 'dns_generator' && (
        <div className="space-y-6 pt-2">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-100">
              Công Cụ Tạo Bản Ghi DNS SPF & DMARC Tự Động
            </h3>
            <p className="text-xs text-slate-400">
              Điền thông số máy chủ của bạn để nhận ngay các bản ghi DNS TXT chuẩn xác, chống 100% lỗi cú pháp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Tên miền của bạn (Domain):</label>
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="mycompany.com"
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-sky-300 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Địa chỉ IPv4 của Mail Server riêng:</label>
              <input
                type="text"
                value={serverIpInput}
                onChange={(e) => setServerIpInput(e.target.value)}
                placeholder="103.20.100.55"
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-sky-300 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Chính sách DMARC mong muốn:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'none', label: 'p=none (Giám sát)', desc: 'Chỉ nhận báo cáo, không chặn' },
                { id: 'quarantine', label: 'p=quarantine (Cách ly)', desc: 'Đẩy thư mạo danh vào Spam' },
                { id: 'reject', label: 'p=reject (Từ chối)', desc: 'Chặn đứng 100% thư mạo danh' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDmarcPolicy(item.id as any)}
                  className={`p-3 rounded-lg text-left transition-all cursor-pointer ${
                    dmarcPolicy === item.id
                      ? 'bg-sky-950/40 border-l-4 border-sky-500 text-sky-200'
                      : 'bg-slate-900/60 hover:bg-slate-900 text-slate-400 border border-slate-800/60'
                  }`}
                >
                  <div className="font-bold text-xs">{item.label}</div>
                  <div className="text-[11px] text-slate-500">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeGoogle}
                onChange={(e) => setIncludeGoogle(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-sky-500"
              />
              <span>Bao gồm Google Workspace (_spf.google.com)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeResend}
                onChange={(e) => setIncludeResend(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-sky-500"
              />
              <span>Bao gồm Resend API (resend.com)</span>
            </label>
          </div>

          {/* Output DNS Records */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">1. Bản ghi SPF (Host: @ | Type: TXT)</span>
                <button
                  onClick={() => handleCopy(generatedSpf, 'spf')}
                  className="text-slate-400 hover:text-slate-200 cursor-pointer flex items-center gap-1"
                >
                  {copiedCode === 'spf' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Sao chép</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900/90 border border-slate-800/70 rounded-lg text-xs font-mono text-sky-300 overflow-x-auto">
                <code>{generatedSpf}</code>
              </pre>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">2. Bản ghi DMARC (Host: _dmarc | Type: TXT)</span>
                <button
                  onClick={() => handleCopy(generatedDmarc, 'dmarc')}
                  className="text-slate-400 hover:text-slate-200 cursor-pointer flex items-center gap-1"
                >
                  {copiedCode === 'dmarc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Sao chép</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900/90 border border-slate-800/70 rounded-lg text-xs font-mono text-sky-300 overflow-x-auto">
                <code>{generatedDmarc}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: SMTP Telnet Simulator */}
      {activeTab === 'smtp_simulator' && (
        <div className="space-y-6 pt-2">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-100">
              Mô Phỏng Gửi Email Bằng Lệnh SMTP Terminal Thô
            </h3>
            <p className="text-xs text-slate-400">
              Từng bước gửi lệnh EHLO, MAIL FROM, RCPT TO, DATA để hiểu sâu cách thức máy chủ thư trao đổi thông điệp.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl font-mono text-xs text-slate-300 min-h-[220px] max-h-[340px] overflow-y-auto space-y-1.5 leading-relaxed">
              {smtpLog.map((line, idx) => (
                <div 
                  key={idx} 
                  className={line.startsWith('>') ? 'text-sky-400 font-bold' : line.includes('250') || line.includes('220') || line.includes('354') ? 'text-emerald-300' : 'text-slate-400'}
                >
                  {line}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={resetSmtp}
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-200 text-xs cursor-pointer border border-slate-800"
              >
                Khởi động lại phiên
              </button>

              <button
                onClick={advanceSmtp}
                disabled={smtpStep >= 5}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 text-white text-xs font-semibold shadow-md cursor-pointer disabled:opacity-40"
              >
                {smtpStep === 0 && 'Bước 1: Gửi lệnh EHLO client.remote.org'}
                {smtpStep === 1 && 'Bước 2: Gửi lệnh MAIL FROM:<sender@remote.org>'}
                {smtpStep === 2 && 'Bước 3: Gửi lệnh RCPT TO:<admin@mycompany.com>'}
                {smtpStep === 3 && 'Bước 4: Gửi lệnh DATA'}
                {smtpStep === 4 && 'Bước 5: Truyền nội dung thư & dấu chấm kết thúc (.)'}
                {smtpStep >= 5 && '✓ Đã hoàn tất phiên gửi email SMTP!'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Postfix & Dovecot Cheatsheet */}
      {activeTab === 'postfix_cheatsheet' && (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Xem hàng đợi thư đang chờ gửi (Mail Queue)',
                cmd: 'sudo mailq\n# hoặc: sudo postqueue -p',
                desc: 'Liệt kê toàn bộ các bức thư đang bị giữ lại hoặc đang retry'
              },
              {
                title: 'Xóa toàn bộ thư rác trong hàng đợi Postfix',
                cmd: 'sudo postsuper -d ALL',
                desc: 'Giải phóng hàng đợi ngay lập tức khi phát hiện bị spam'
              },
              {
                title: 'Thử lại gửi toàn bộ thư đang nghẽn ngay lập tức',
                cmd: 'sudo postfix flush',
                desc: 'Ép buộc Postfix kích hoạt gửi lại các thư đang chờ'
              },
              {
                title: 'Theo dõi log gửi thư thời gian thực',
                cmd: 'sudo tail -f /var/log/mail.log | grep postfix',
                desc: 'Quan sát phản hồi mã lỗi (250, 421, 550) từ máy chủ nhận'
              },
              {
                title: 'Kiểm tra cú pháp file cấu hình Postfix',
                cmd: 'sudo postfix check',
                desc: 'Báo lỗi chính tả hoặc thiếu file ánh xạ trong main.cf'
              },
              {
                title: 'Cập nhật lại cơ sở dữ liệu aliases sau khi sửa file',
                cmd: 'sudo newaliases\n# Cập nhật /etc/aliases',
                desc: 'Biên dịch lại bảng định tuyến bí danh email trên Linux'
              }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">{item.title}</span>
                  <button
                    onClick={() => handleCopy(item.cmd, `post-${idx}`)}
                    className="text-slate-400 hover:text-slate-200 cursor-pointer"
                    title="Sao chép"
                  >
                    {copiedCode === `post-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="p-2.5 bg-slate-900/90 border border-slate-800/70 rounded-lg text-xs font-mono text-sky-300 overflow-x-auto">
                  <code>{item.cmd}</code>
                </pre>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
