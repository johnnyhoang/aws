import React, { useState, useMemo } from 'react';
import { useLearning } from '../../../context/LearningContext';
import { shuffleArray } from '../../../utils/shuffle';
import { ShieldCheck, CheckCircle2, XCircle, RefreshCw, Trophy, Zap } from 'lucide-react';

interface PortQuestion {
  id: number;
  protocol: string;
  category: string;
  description: string;
  options: number[];
  correctPort: number;
  securityNote: string;
}

const PORT_QUESTIONS: PortQuestion[] = [
  {
    id: 1,
    protocol: 'SSH (Secure Shell)',
    category: 'Quản trị từ xa',
    description: 'Giao thức mã hóa dùng để đăng nhập và thực thi dòng lệnh an toàn trên máy chủ Linux từ xa.',
    options: [22, 23, 21, 3389],
    correctPort: 22,
    securityNote: 'Khác với Telnet (port 23 truyền mật khẩu dạng plain text), SSH mã hóa toàn bộ phiên kết nối.'
  },
  {
    id: 2,
    protocol: 'HTTPS (HTTP Secure / TLS)',
    category: 'Web & Mã hóa',
    description: 'Giao thức truyền tải siêu văn bản bảo mật sử dụng mã hóa TLS/SSL cho toàn bộ lưu lượng web.',
    options: [443, 80, 8080, 8443],
    correctPort: 443,
    securityNote: 'Port 80 là HTTP không mã hóa; Port 443 là HTTPS tiêu chuẩn bắt buộc cho mọi website hiện đại.'
  },
  {
    id: 3,
    protocol: 'DNS (Domain Name System)',
    category: 'Dịch vụ mạng cốt lõi',
    description: 'Giao thức phân giải tên miền thành địa chỉ IP, chủ yếu sử dụng gói tin UDP tốc độ cao.',
    options: [53, 67, 123, 161],
    correctPort: 53,
    securityNote: 'DNS sử dụng UDP port 53 cho các truy vấn thông thường và TCP port 53 khi chuyển giao vùng dữ liệu lớn (Zone Transfer).'
  },
  {
    id: 4,
    protocol: 'PostgreSQL Database',
    category: 'Cơ sở dữ liệu',
    description: 'Cổng kết nối mặc định của hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở PostgreSQL.',
    options: [5432, 3306, 1433, 27017],
    correctPort: 5432,
    securityNote: 'MySQL dùng port 3306, SQL Server dùng port 1433, MongoDB dùng port 27017.'
  },
  {
    id: 5,
    protocol: 'RDP (Remote Desktop Protocol)',
    category: 'Quản trị Windows',
    description: 'Giao thức độc quyền của Microsoft dùng để điều khiển giao diện đồ họa máy chủ Windows từ xa.',
    options: [3389, 22, 5900, 445],
    correctPort: 3389,
    securityNote: 'Trên AWS EC2 Windows, Security Group bắt buộc phải mở Inbound port 3389 để truy cập remote desktop.'
  }
];

export const PortHunterGame: React.FC = () => {
  const { addStudyHours } = useLearning();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedPort, setSelectedPort] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const item = PORT_QUESTIONS[currentIdx];

  const shuffledOptions = useMemo(() => {
    return item ? shuffleArray(item.options) : [];
  }, [item]);

  const handleSelect = (port: number) => {
    if (isAnswered) return;
    setSelectedPort(port);
    setIsAnswered(true);

    if (port === item.correctPort) {
      setScore(prev => prev + 100 + streak * 20);
      setStreak(prev => prev + 1);
      addStudyHours(0.1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx < PORT_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedPort(null);
      setIsAnswered(false);
    } else {
      setGameCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedPort(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setGameCompleted(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Port & Protocol Hunter
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full">
                Speed Matching
              </span>
            </h3>
            <p className="text-xs text-slate-400">Luyện phản xạ ghi nhớ các số hiệu cổng chuẩn và ứng dụng bảo mật</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-xs flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Điểm:</span>
            <span className="font-bold text-amber-300 font-mono">{score}</span>
          </div>
          <div className="px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-xs flex items-center gap-1.5">
            <span className="text-orange-400">🔥</span>
            <span className="font-bold text-orange-300 font-mono">{streak}x</span>
          </div>
        </div>
      </div>

      {!gameCompleted ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Câu hỏi {currentIdx + 1} / {PORT_QUESTIONS.length}</span>
            <span className="text-violet-400 font-semibold">{item.category}</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Giao thức / Dịch vụ mục tiêu</span>
            <h4 className="text-xl sm:text-2xl font-extrabold text-white text-violet-300">{item.protocol}</h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">{item.description}</p>
          </div>

          {/* Port Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {shuffledOptions.map((port, idx) => {
              const isSelected = selectedPort === port;
              const isCorrect = port === item.correctPort;

              let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-100 hover:border-violet-500/50';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                } else {
                  btnStyle = 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(port)}
                  disabled={isAnswered}
                  className={`py-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${btnStyle}`}
                >
                  <span className="text-xs text-slate-400">Port</span>
                  <span className="font-mono text-xl font-bold">{port}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback Card */}
          {isAnswered && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2">
                {selectedPort === item.correctPort ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Chính xác! Port {item.correctPort} (+100 Điểm)
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Sai rồi! Cổng chính xác là Port {item.correctPort}.
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Ghi chú an ninh:</strong> {item.securityNote}
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-violet-600/20"
                >
                  {currentIdx < PORT_QUESTIONS.length - 1 ? 'Câu Tiếp Theo →' : 'Xem Tổng Kết 🏆'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-violet-500/20 border border-violet-500/40 rounded-2xl flex items-center justify-center mx-auto text-violet-400 shadow-xl shadow-violet-500/10">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-extrabold text-white">Chúc Mừng! Bạn Đã Thuộc Lòng Các Cổng Mạng!</h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Tổng điểm đạt được: <strong className="text-amber-300 font-mono text-base">{score} PTS</strong>. Kỹ năng Security Group và tường lửa của bạn sẽ rất nhạy bén!
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Chơi Lại Từ Đầu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
