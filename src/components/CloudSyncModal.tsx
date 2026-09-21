import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  Cloud, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  RefreshCw, 
  X, 
  Sparkles, 
  Copy,
  Check,
  QrCode,
  User,
  Mail,
  ChevronDown,
  ChevronUp,
  ShieldCheck
} from 'lucide-react';

interface CloudSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({ isOpen, onClose }) => {
  const { 
    userProfile, 
    syncStatus, 
    lastSyncedAt, 
    forceSyncNow,
    getSyncUrl,
    updateDisplayName,
    loginUser
  } = useLearning();

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [showOptionalForm, setShowOptionalForm] = useState(false);
  const [name, setName] = useState(userProfile?.name || '');
  const [email, setEmail] = useState(userProfile?.email && !userProfile.email.includes('@cloud.local') ? userProfile.email : '');

  if (!isOpen) return null;

  const syncUrl = getSyncUrl();
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(syncUrl || window.location.href)}`;

  const handleCopyLink = async () => {
    try {
      if (syncUrl) {
        await navigator.clipboard.writeText(syncUrl);
        setCopied(true);
        setNotification('Đã sao chép liên kết đồng bộ! Bạn có thể dán hoặc gửi qua điện thoại.');
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {
      setNotification('Không thể tự động sao chép. Vui lòng thử lại.');
    }
  };

  const handleManualSync = async () => {
    setIsLoading(true);
    await forceSyncNow();
    setIsLoading(false);
    setNotification('Đã làm mới và đồng bộ dữ liệu mới nhất lên đám mây!');
  };

  const handleSaveOptional = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateDisplayName(name.trim());
    }
    if (email.trim() && email.includes('@')) {
      setIsLoading(true);
      await loginUser(email.trim(), name.trim());
      setIsLoading(false);
      setNotification('Đã cập nhật thông tin người học thành công!');
    } else if (name.trim()) {
      setNotification('Đã cập nhật tên hiển thị thành công!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 md:p-7 space-y-4 sm:space-y-5 shadow-2xl relative text-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tự Động Đồng Bộ Đang Hoạt Động</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            Đồng Bộ Tiến Độ Đa Thiết Bị
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Dữ liệu học tập và bài lab được tự động lưu liên tục. Bạn có thể mở ngay trên điện thoại di động mà không cần đăng ký tài khoản.
          </p>
        </div>

        {/* Sync Status Banner */}
        <div className="bg-slate-950/80 rounded-2xl p-3.5 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-xs">
              <div className="font-bold text-slate-200">
                {syncStatus === 'syncing' ? 'Đang đồng bộ dữ liệu...' : 'Đã kết nối máy chủ đám mây'}
              </div>
              <div className="text-[11px] text-slate-400">
                {lastSyncedAt ? `Lưu gần nhất lúc ${lastSyncedAt}` : 'Tự động sao lưu theo thời gian thực'}
              </div>
            </div>
          </div>

          <button
            onClick={handleManualSync}
            disabled={isLoading}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Làm mới đồng bộ ngay"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading || syncStatus === 'syncing' ? 'animate-spin text-amber-400' : 'text-sky-400'}`} />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>

        {notification && (
          <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 flex-shrink-0 text-amber-400" />
            <span>{notification}</span>
          </div>
        )}

        {/* 1-Scan Cross-Device Handoff Section */}
        <div className="bg-gradient-to-b from-slate-800/90 to-slate-800/40 rounded-2xl p-4 sm:p-5 border border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <QrCode className="w-4 h-4" />
              <span>Chuyển Sang Điện Thoại Trong 1 Giây</span>
            </div>
            <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-700">
              Không cần gõ chữ
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            {/* QR Code */}
            <div className="bg-white p-2.5 rounded-xl shadow-lg flex-shrink-0 flex items-center justify-center">
              <img 
                src={qrCodeUrl} 
                alt="QR Code Đồng Bộ Tiến Độ" 
                className="w-32 h-32 sm:w-36 sm:h-36 object-contain"
                loading="lazy"
              />
            </div>

            {/* Quick Steps & Copy Link */}
            <div className="space-y-3 text-xs w-full">
              <div className="space-y-1.5 text-slate-300 leading-relaxed">
                <div className="flex items-start gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">1</span>
                  <span>Mở camera trên điện thoại và quét mã QR.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">2</span>
                  <span>Trang web sẽ tự động mở với <strong>100% tiến độ học</strong> sẵn có.</span>
                </div>
              </div>

              <button
                onClick={handleCopyLink}
                className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  copied 
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30' 
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã Sao Chép Liên Kết!' : 'Sao Chép Link Đồng Bộ Nhanh'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Optional Customization Section (Foldable) */}
        <div className="border-t border-slate-800 pt-3">
          <button
            onClick={() => setShowOptionalForm(!showOptionalForm)}
            className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition-colors py-1 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Tùy chọn cá nhân hóa (Không bắt buộc)</span>
            </span>
            {showOptionalForm ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showOptionalForm && (
            <form onSubmit={handleSaveOptional} className="mt-3 space-y-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1.5">
                  <User className="w-3 h-3 text-amber-400" />
                  Tên hiển thị của bạn
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ví dụ: Kỹ sư Cloud"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-sky-400" />
                  Email nhận diện bổ sung (Tùy chọn)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ví dụ: ban@gmail.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lưu Thông Tin Bổ Sung</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
