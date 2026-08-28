import React, { useState } from 'react';
import { useLearning } from '../../../context/LearningContext';
import { Terminal, CheckCircle2, RefreshCw, Trophy, Zap, Play } from 'lucide-react';

interface TerminalMission {
  id: number;
  title: string;
  scenario: string;
  initialOutput: string;
  acceptedCommands: string[];
  expectedOutput: string;
  hint: string;
}

const MISSIONS: TerminalMission[] = [
  {
    id: 1,
    title: 'Nhiệm Vụ 1: Phân Quyền Bảo Mật Cho Khóa SSH Private Key',
    scenario: 'Tệp khóa riêng tư `id_ed25519` vừa tải về đang có quyền `644` (rw-r--r--), khiến SSH client từ chối kết nối. Hãy phân quyền an toàn chỉ duy nhất bạn có quyền đọc/ghi.',
    initialOutput: `-rw-r--r-- 1 ubuntu ubuntu  411 Aug 28 10:00 id_ed25519
Cảnh báo: Permissions 0644 are too open! SSH requires 600 or 400.`,
    acceptedCommands: ['chmod 600 id_ed25519', 'chmod 400 id_ed25519', 'chmod 600 ./id_ed25519', 'chmod 400 ./id_ed25519'],
    expectedOutput: `-rw------- 1 ubuntu ubuntu  411 Aug 28 10:00 id_ed25519\n✅ Thành công! Khóa SSH đã được bảo vệ tuyệt đối. Bạn có thể SSH vào EC2 an toàn.`,
    hint: 'Sử dụng lệnh `chmod 600 id_ed25519` hoặc `chmod 400 id_ed25519`'
  },
  {
    id: 2,
    title: 'Nhiệm Vụ 2: Tìm & Tiêu Diệt Tiến Trình Treo Chiếm Dụng CPU',
    scenario: 'Tiến trình rác `crypto_miner` có PID là `4821` đang chiếm 100% CPU. Hãy gửi tín hiệu cưỡng chế tiêu diệt (SIGKILL -9) để giải phóng máy chủ ngay lập tức.',
    initialOutput: `PID   USER     %CPU %MEM COMMAND
4821  nobody   99.8 45.2 crypto_miner [stuck]`,
    acceptedCommands: ['kill -9 4821', 'kill -KILL 4821', 'sudo kill -9 4821'],
    expectedOutput: `[1]+  Killed                  crypto_miner\n✅ Tuyệt vời! Tiến trình 4821 đã bị tiêu diệt hoàn toàn. CPU trở về mức 1.2%.`,
    hint: 'Sử dụng cú pháp `kill -9 <PID>`'
  },
  {
    id: 3,
    title: 'Nhiệm Vụ 3: Khởi Động & Kích Hoạt Dịch Vụ Nginx Cùng Hệ Thống',
    scenario: 'Dịch vụ Nginx vừa được cài đặt xong. Hãy dùng lệnh Systemd để vừa start Nginx ngay lập tức, vừa cho phép Nginx tự động khởi động mỗi khi reboot máy.',
    initialOutput: `nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; disabled; vendor preset: enabled)
   Active: inactive (dead)`,
    acceptedCommands: ['sudo systemctl enable --now nginx', 'systemctl enable --now nginx', 'sudo systemctl start nginx && sudo systemctl enable nginx'],
    expectedOutput: `Synchronizing state of nginx.service with SysV service script...
Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service
● nginx.service - Active: active (running)\n✅ Nginx đã chạy và được kích hoạt tự động khởi động khi boot máy!`,
    hint: 'Sử dụng cờ kết hợp: `sudo systemctl enable --now nginx`'
  },
  {
    id: 4,
    title: 'Nhiệm Vụ 4: Lọc Số Lượng Lỗi HTTP 500 Trong Tệp Nhật Ký Nginx',
    scenario: 'Hãy sử dụng kết hợp lệnh qua Pipe `|` để đếm xem mã lỗi `500` xuất hiện bao nhiêu lần trong tệp log `/var/log/nginx/access.log`.',
    initialOutput: `54.239.28.85 - - [28/Aug/2026] "GET /api/pay HTTP/1.1" 500 120
54.239.28.85 - - [28/Aug/2026] "GET /api/user HTTP/1.1" 200 450
127.0.0.1 - - [28/Aug/2026] "POST /api/pay HTTP/1.1" 500 120
10.0.1.5 - - [28/Aug/2026] "GET /index.html HTTP/1.1" 200 1024`,
    acceptedCommands: [
      'grep " 500 " /var/log/nginx/access.log | wc -l',
      'grep 500 /var/log/nginx/access.log | wc -l',
      'cat /var/log/nginx/access.log | grep 500 | wc -l'
    ],
    expectedOutput: `2\n✅ Chính xác! Có đúng 2 lần xuất hiện mã lỗi 500. Kỹ năng nối lệnh qua Pipe của bạn rất xuất sắc!`,
    hint: 'Kết hợp lệnh `grep 500 ... | wc -l`'
  }
];

export const LinuxTerminalGame: React.FC = () => {
  const { addStudyHours } = useLearning();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputCmd, setInputCmd] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const mission = MISSIONS[currentIdx];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputCmd.trim();
    if (!cleanCmd) return;

    const matched = mission.acceptedCommands.some(cmd => cmd.toLowerCase() === cleanCmd.toLowerCase());

    if (matched) {
      setIsSuccess(true);
      setHistory(prev => [...prev, `$ ${cleanCmd}`, mission.expectedOutput]);
      setScore(prev => prev + 150);
      addStudyHours(0.1);
    } else {
      setHistory(prev => [...prev, `$ ${cleanCmd}`, `bash: command or syntax error: '${cleanCmd}'. Hãy thử lại hoặc xem gợi ý!`]);
    }
    setInputCmd('');
  };

  const handleNext = () => {
    if (currentIdx < MISSIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setIsSuccess(false);
      setHistory([]);
    } else {
      setGameCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setIsSuccess(false);
    setHistory([]);
    setScore(0);
    setGameCompleted(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Linux Terminal Simulator Challenge
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                Interactive CLI
              </span>
            </h3>
            <p className="text-xs text-slate-400">Luyện kỹ năng gõ lệnh thực tế giải quyết sự cố máy chủ</p>
          </div>
        </div>

        <div className="px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-xs flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400">Điểm:</span>
          <span className="font-bold text-amber-300 font-mono">{score} PTS</span>
        </div>
      </div>

      {!gameCompleted ? (
        <div className="space-y-4">
          {/* Mission Info */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-amber-400">Thử thách {currentIdx + 1} / {MISSIONS.length}</span>
              <span className="text-[11px] text-slate-400 font-mono">ubuntu@aws-server:~</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">{mission.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{mission.scenario}</p>
          </div>

          {/* Interactive Terminal Window */}
          <div className="bg-black/90 border border-slate-800 rounded-xl font-mono text-xs p-4 text-emerald-400 shadow-2xl min-h-[260px] flex flex-col justify-between">
            <div className="space-y-2 overflow-y-auto max-h-[300px]">
              <div className="text-slate-400 whitespace-pre-wrap">{mission.initialOutput}</div>
              {history.map((line, idx) => (
                <div key={idx} className={line.startsWith('$') ? 'text-amber-300 font-bold' : line.includes('✅') ? 'text-emerald-400' : 'text-rose-400'}>
                  {line}
                </div>
              ))}
            </div>

            {/* Prompt Form */}
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-3 border-t border-slate-800/60 mt-3">
                <span className="text-emerald-400 font-bold">ubuntu@server:~$</span>
                <input
                  type="text"
                  value={inputCmd}
                  onChange={(e) => setInputCmd(e.target.value)}
                  placeholder="Gõ lệnh tại đây (vd: chmod 600 id_ed25519)..."
                  className="flex-1 bg-transparent text-slate-100 outline-none font-mono text-xs border-b border-slate-700 focus:border-amber-400 py-1"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <Play className="w-3 h-3" /> Chạy
                </button>
              </form>
            ) : (
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center mt-3">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Vượt qua thử thách! (+150 PTS)
                </span>
                <button
                  onClick={handleNext}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  {currentIdx < MISSIONS.length - 1 ? 'Nhiệm Vụ Tiếp Theo →' : 'Xem Tổng Kết 🏆'}
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Gợi ý lệnh: <span className="text-slate-400 font-mono">{mission.hint}</span></span>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-xl shadow-amber-500/10">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-extrabold text-white">Xuất Sắc! Bạn Đã Làm Chủ Linux Terminal!</h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Tổng điểm đạt được: <strong className="text-amber-300 font-mono text-base">{score} PTS</strong>. Kỹ năng thao tác dòng lệnh và quản trị máy chủ của bạn đã đạt chuẩn SysAdmin!
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Luyện Lại Từ Đầu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
