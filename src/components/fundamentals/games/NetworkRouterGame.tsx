import React, { useState } from 'react';
import { useLearning } from '../../../context/LearningContext';
import { Route, CheckCircle2, XCircle, RefreshCw, Trophy, Zap, ArrowRight } from 'lucide-react';

interface RoutingHop {
  id: string;
  name: string;
  type: 'client' | 'dns' | 'nat' | 'firewall' | 'router' | 'web_server';
  description: string;
}

interface PacketScenario {
  id: number;
  title: string;
  packetInfo: {
    source: string;
    destination: string;
    protocol: string;
    purpose: string;
  };
  correctPath: string[]; // IDs of hops in order
  explanation: string;
}

const HOPS_POOL: RoutingHop[] = [
  { id: 'hop-browser', name: 'Trình Duyệt Khách (Browser)', type: 'client', description: 'Gửi yêu cầu khởi tạo từ máy tính cá nhân' },
  { id: 'hop-dns', name: 'DNS Recursive Resolver', type: 'dns', description: 'Phân giải tên miền thành địa chỉ IP máy chủ' },
  { id: 'hop-router', name: 'Internet Router & BGP Gateway', type: 'router', description: 'Định tuyến gói tin qua mạng cáp quang toàn cầu' },
  { id: 'hop-firewall', name: 'Tường Lửa / Security Group', type: 'firewall', description: 'Kiểm tra gói tin Inbound theo các quy tắc mở cổng' },
  { id: 'hop-nat', name: 'NAT Gateway / SNAT', type: 'nat', description: 'Biến đổi địa chỉ IP nội bộ sang IP công cộng' },
  { id: 'hop-web', name: 'Nginx Web Server / App', type: 'web_server', description: 'Xử lý yêu cầu HTTP và phản hồi mã 200 OK' }
];

const SCENARIOS: PacketScenario[] = [
  {
    id: 1,
    title: 'Kịch Bản 1: Người Dùng Truy Cập Website https://app.example.com Lần Đầu',
    packetInfo: {
      source: 'Client (192.168.1.100)',
      destination: 'https://app.example.com',
      protocol: 'DNS + HTTPS (TCP 443)',
      purpose: 'Tải trang web'
    },
    correctPath: ['hop-browser', 'hop-dns', 'hop-router', 'hop-firewall', 'hop-web'],
    explanation: 'Trình duyệt trước tiên cần hỏi DNS Resolver để lấy địa chỉ IP, sau đó gói tin đi qua Router mạng, được kiểm tra qua Tường Lửa (Firewall mở cổng 443), và cuối cùng tới Web Server Nginx.'
  },
  {
    id: 2,
    title: 'Kịch Bản 2: Máy Chủ Backend Private Tải Bản Vá Bảo Mật Ra Ngoài Internet',
    packetInfo: {
      source: 'Private App Server (10.0.11.20)',
      destination: 'Ubuntu Security Repo (Public IP)',
      protocol: 'HTTP/HTTPS (Outbound)',
      purpose: 'Tải apt-get update'
    },
    correctPath: ['hop-web', 'hop-nat', 'hop-router'],
    explanation: 'Máy chủ trong Private Subnet không có Public IP nên phải chuyển gói tin qua NAT Gateway (SNAT) để đổi sang Public IP trước khi Router định tuyến ra Internet.'
  }
];

export const NetworkRouterGame: React.FC = () => {
  const { addStudyHours } = useLearning();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedHops, setSelectedHops] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const scenario = SCENARIOS[currentIdx];

  const handleHopClick = (hopId: string) => {
    if (isAnswered) return;
    if (selectedHops.includes(hopId)) {
      setSelectedHops(prev => prev.filter(id => id !== hopId));
    } else {
      setSelectedHops(prev => [...prev, hopId]);
    }
  };

  const handleCheck = () => {
    setIsAnswered(true);
    const isCorrect = JSON.stringify(selectedHops) === JSON.stringify(scenario.correctPath);
    if (isCorrect) {
      setScore(prev => prev + 200);
      addStudyHours(0.1);
    }
  };

  const handleNext = () => {
    if (currentIdx < SCENARIOS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedHops([]);
      setIsAnswered(false);
    } else {
      setGameCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedHops([]);
    setIsAnswered(false);
    setScore(0);
    setGameCompleted(false);
  };

  const isCurrentCorrect = isAnswered && JSON.stringify(selectedHops) === JSON.stringify(scenario.correctPath);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Route className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Network Packet Router Challenge
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full">
                Interactive Routing
              </span>
            </h3>
            <p className="text-xs text-slate-400">Sắp xếp chuỗi đường đi chính xác của gói tin qua các thành phần mạng</p>
          </div>
        </div>

        <div className="px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-xs flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400">Điểm:</span>
          <span className="font-bold text-amber-300 font-mono">{score} PTS</span>
        </div>
      </div>

      {!gameCompleted ? (
        <div className="space-y-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
            <h4 className="text-sm sm:text-base font-bold text-white text-cyan-300">{scenario.title}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Nguồn (Source):</span>
                <span className="font-mono text-slate-200">{scenario.packetInfo.source}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Đích (Destination):</span>
                <span className="font-mono text-slate-200">{scenario.packetInfo.destination}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Giao thức:</span>
                <span className="font-mono text-slate-200">{scenario.packetInfo.protocol}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Mục đích:</span>
                <span className="font-mono text-slate-200">{scenario.packetInfo.purpose}</span>
              </div>
            </div>
          </div>

          {/* Current Path Selected */}
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-2">Đường đi bạn đã chọn (theo thứ tự):</span>
            <div className="min-h-[50px] p-3 bg-slate-950/90 border border-slate-800 rounded-xl flex flex-wrap items-center gap-2">
              {selectedHops.length === 0 ? (
                <span className="text-xs text-slate-600 italic">Nhấp chọn các trạm mạng bên dưới theo thứ tự gói tin di chuyển...</span>
              ) : (
                selectedHops.map((hopId, index) => {
                  const hop = HOPS_POOL.find(h => h.id === hopId);
                  return (
                    <React.Fragment key={hopId}>
                      <div className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-bold flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-cyan-600 text-white text-[10px] flex items-center justify-center font-mono">
                          {index + 1}
                        </span>
                        <span>{hop?.name}</span>
                      </div>
                      {index < selectedHops.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </div>
          </div>

          {/* Hops Pool Grid */}
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-2">Danh sách trạm mạng có sẵn:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {HOPS_POOL.map(hop => {
                const isSelected = selectedHops.includes(hop.id);
                return (
                  <button
                    key={hop.id}
                    onClick={() => handleHopClick(hop.id)}
                    disabled={isAnswered}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500 text-cyan-200 shadow-md'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="font-bold block mb-0.5">{hop.name}</span>
                    <span className="text-[11px] text-slate-400 leading-snug block">{hop.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          {!isAnswered ? (
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setSelectedHops([])}
                className="text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                Xóa làm lại
              </button>
              <button
                onClick={handleCheck}
                disabled={selectedHops.length === 0}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-cyan-600/20"
              >
                Kiểm Tra Đường Đi
              </button>
            </div>
          ) : (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2">
                {isCurrentCorrect ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Chính xác 100%! Gói tin đã định tuyến thành công (+200 Điểm)
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Sai thứ tự định tuyến! Hãy đọc kỹ giải thích dưới đây.
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{scenario.explanation}</p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-cyan-600/20"
                >
                  {currentIdx < SCENARIOS.length - 1 ? 'Kịch Bản Tiếp Theo →' : 'Xem Tổng Kết 🏆'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/40 rounded-2xl flex items-center justify-center mx-auto text-cyan-400 shadow-xl shadow-cyan-500/10">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-extrabold text-white">Xuất Sắc! Bạn Đã Làm Chủ Luồng Định Tuyến Gói Tin!</h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Tổng điểm đạt được: <strong className="text-amber-300 font-mono text-base">{score} PTS</strong>. Tư duy phân giải DNS, NAT và Firewall của bạn rất vững vàng!
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
