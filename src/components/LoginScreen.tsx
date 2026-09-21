import React, { useState } from 'react';
import { signInWithGoogle } from '../lib/authSession';
import { 
  Cloud, 
  Terminal, 
  Database, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  GraduationCap,
  Lock
} from 'lucide-react';

interface LoginScreenProps {
  onDemoAccess?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrorMsg('Không thể chuyển hướng đến Google. Vui lòng thử lại sau giây lát.');
        setLoading(false);
      }
    } catch {
      setErrorMsg('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200 relative overflow-hidden">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="p-4 sm:p-6 border-b border-slate-900 flex items-center justify-between max-w-6xl mx-auto w-full z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 font-black">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base text-white tracking-tight">AWS Cloud Mastery</div>
            <div className="text-[10px] sm:text-xs text-slate-400">Nền Tảng Học & Luyện Thi Kỹ Sư Công Nghệ</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          <Lock className="w-3.5 h-3.5" />
          <span>Bảo Mật Google OAuth</span>
        </div>
      </header>

      {/* Main Login Card Area */}
      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-center space-y-6">
          
          {/* Badge & Portal Icons */}
          <div className="flex flex-col items-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20">
              <GraduationCap className="w-4 h-4" />
              <span>Cổng Đăng Nhập Học Viên</span>
            </div>

            <div className="flex items-center gap-2 py-1">
              <span className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-amber-400" title="IT Fundamentals">
                <Terminal className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-sky-400" title="Web & Domain">
                <Globe className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400" title="Database">
                <Database className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-orange-400" title="AWS Cloud">
                <Cloud className="w-4 h-4" />
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Khám Phá & Chinh Phục AWS
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Đăng nhập với Google để lưu giữ tiến độ cá nhân, điểm thưởng XP và đồng bộ học tập xuyên suốt trên mọi thiết bị.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* Primary Google Login Button */}
          <div className="space-y-3 pt-1">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-2xl shadow-xl shadow-white/10 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  <span>Đang kết nối Google...</span>
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Tiếp tục với Google</span>
                </>
              )}
            </button>
          </div>

          {/* Privacy & Feature Highlights */}
          <div className="pt-2 grid grid-cols-2 gap-2 text-left border-t border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Tiến Độ Riêng Biệt</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Dữ liệu bài học và bài thi được lưu riêng cho tài khoản của bạn.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
                <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                <span>Đa Thiết Bị</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Học tiếp tục trên điện thoại hoặc máy tính khác không gián đoạn.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-slate-500 border-t border-slate-900 z-10">
        <span>AWS Cloud Mastery &bull; Nền tảng học tập chuẩn kiến trúc sư đám mây</span>
      </footer>

    </div>
  );
};
