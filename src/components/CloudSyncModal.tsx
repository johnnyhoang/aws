import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  Cloud, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  RefreshCw, 
  UserCheck, 
  X, 
  Sparkles, 
  LogOut,
  Mail,
  User,
  Zap
} from 'lucide-react';

interface CloudSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({ isOpen, onClose }) => {
  const { 
    userProfile, 
    loginUser, 
    logoutUser, 
    syncStatus, 
    lastSyncedAt, 
    forceSyncNow 
  } = useLearning();

  const [email, setEmail] = useState(userProfile?.email || '');
  const [name, setName] = useState(userProfile?.name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setNotification('Vui lòng nhập một địa chỉ email hợp lệ.');
      return;
    }

    setIsLoading(true);
    setNotification(null);

    const success = await loginUser(email.trim(), name.trim());
    setIsLoading(false);

    if (success) {
      setNotification('Đồng bộ dữ liệu thành công! Bạn có thể truy cập trên mọi thiết bị.');
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setNotification('Không thể kết nối máy chủ đám mây. Dữ liệu tạm thời lưu trên thiết bị.');
    }
  };

  const handleManualSync = async () => {
    setIsLoading(true);
    await forceSyncNow();
    setIsLoading(false);
    setNotification('Đã làm mới và đồng bộ dữ liệu mới nhất!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl max-w-lg w-full p-3.5 sm:p-6 md:p-8 space-y-3 sm:space-y-6 shadow-2xl relative text-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            <Cloud className="w-3.5 h-3.5" />
            Lưu Trữ & Đồng Bộ Đám Mây (Cloud Sync)
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            Đồng Bộ Tiến Độ Đa Thiết Bị
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Dữ liệu học tập, kết quả thi thử và bài lab được lưu trữ an toàn trên máy chủ để bạn học tiếp trên điện thoại di động hoặc máy tính khác.
          </p>
        </div>

        {/* Device Sync Visualizer */}
        <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 grid grid-cols-3 gap-2 text-center items-center">
          <div className="space-y-1">
            <Monitor className="w-6 h-6 text-sky-400 mx-auto" />
            <div className="text-[11px] font-bold text-slate-300">Máy Tính</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <RefreshCw className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin text-amber-400' : 'text-emerald-400'}`} />
            <span className="text-[10px] text-slate-400 font-medium">Tự Động Lưu</span>
          </div>
          <div className="space-y-1">
            <Smartphone className="w-6 h-6 text-emerald-400 mx-auto" />
            <div className="text-[11px] font-bold text-slate-300">Điện Thoại</div>
          </div>
        </div>

        {notification && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Active Account Status or Login Form */}
        {userProfile ? (
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{userProfile.name}</div>
                    <div className="text-xs text-slate-400">{userProfile.email}</div>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đã kết nối
                </span>
              </div>

              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800 flex items-center justify-between">
                <span>Trạng thái: <strong className="text-slate-200">{syncStatus === 'syncing' ? 'Đang đồng bộ...' : 'Đã cập nhật mới nhất'}</strong></span>
                {lastSyncedAt && <span>Lúc: <strong className="text-slate-300">{lastSyncedAt}</strong></span>}
              </div>
            </div>

            {/* Actions for Logged in User */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleManualSync}
                disabled={isLoading}
                className="flex-1 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Đang Lưu...' : 'Đồng Bộ Ngay Bây Giờ'}</span>
              </button>

              <button
                onClick={logoutUser}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng Xuất</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  Địa Chỉ Email Học Tập
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ví dụ: ban@kent.edu hoặc email cá nhân"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  Tên Hiển Thị Của Bạn (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ví dụ: Kỹ sư Nguyễn Văn A"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              <span>{isLoading ? 'Đang Kết Nối...' : 'Bắt Đầu Lưu & Đồng Bộ Trên Mọi Thiết Bị'}</span>
            </button>
          </form>
        )}

        {/* Friendly instruction for Mobile */}
        <div className="bg-sky-950/20 p-4 rounded-2xl border border-sky-500/30 flex items-start gap-3 text-xs text-sky-200 leading-relaxed">
          <Smartphone className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Mẹo học trên Điện Thoại:</strong> Mở link Vercel của bạn trên trình duyệt điện thoại (Safari/Chrome), bấm <em>Đồng bộ đám mây</em> và nhập cùng email trên để học tiếp mà không bị mất bất kỳ bài làm nào!
          </div>
        </div>

      </div>
    </div>
  );
};
