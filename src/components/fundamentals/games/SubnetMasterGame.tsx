import React, { useState, useMemo } from 'react';
import { useLearning } from '../../../context/LearningContext';
import { shuffleArray } from '../../../utils/shuffle';
import { Network, CheckCircle2, XCircle, RefreshCw, Trophy, Zap, HelpCircle } from 'lucide-react';

interface SubnetChallenge {
  id: number;
  question: string;
  scenario: string;
  cidr: string;
  targetType: 'usable_ips' | 'aws_usable_ips' | 'netmask' | 'network_id' | 'broadcast_id';
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

const CHALLENGES: SubnetChallenge[] = [
  {
    id: 1,
    question: 'Tính số lượng địa chỉ IP khả dụng trong AWS Subnet',
    scenario: 'Bạn được yêu cầu tạo một Subnet mới cho Application Load Balancer trong AWS VPC với dải CIDR 10.0.1.0/24.',
    cidr: '10.0.1.0/24',
    targetType: 'aws_usable_ips',
    options: ['251 địa chỉ IP', '254 địa chỉ IP', '256 địa chỉ IP', '250 địa chỉ IP'],
    correctAnswer: '251 địa chỉ IP',
    explanation: 'Dải /24 có tổng cộng 2^(32-24) = 256 địa chỉ IP. Tuy nhiên, AWS luôn dành riêng chính xác 5 địa chỉ IP (.0, .1, .2, .3, .255) trong mỗi Subnet. Do đó, số IP thực tế bạn có thể gán là 256 - 5 = 251 IP.',
    hint: 'Nhớ quy tắc 5 IP đặc biệt AWS luôn giữ lại!'
  },
  {
    id: 2,
    question: 'Xác định Subnet Mask tương ứng của CIDR Prefix',
    scenario: 'Một kỹ sư mạng bàn giao cho bạn dải CIDR 192.168.10.0/28 để tạo cụm máy chủ bảo mật.',
    cidr: '192.168.10.0/28',
    targetType: 'netmask',
    options: ['255.255.255.240', '255.255.255.224', '255.255.255.192', '255.255.255.248'],
    correctAnswer: '255.255.255.240',
    explanation: 'Prefix /28 nghĩa là 28 bit 1: 11111111.11111111.11111111.11110000 -> Octet cuối là 128 + 64 + 32 + 16 = 240. Vậy Subnet Mask là 255.255.255.240.',
    hint: 'Octet cuối có 4 bit 1 (128+64+32+16).'
  },
  {
    id: 3,
    question: 'Tìm Địa chỉ Mạng (Network Address)',
    scenario: 'Máy chủ có địa chỉ IP 172.16.5.37 với subnet mask /26 (255.255.255.192).',
    cidr: '172.16.5.37/26',
    targetType: 'network_id',
    options: ['172.16.5.0', '172.16.5.32', '172.16.5.64', '172.16.5.1'],
    correctAnswer: '172.16.5.0',
    explanation: 'Prefix /26 có kích thước mỗi block mạng là 2^(32-26) = 64 IP (các dải: 0-63, 64-127, 128-191, 192-255). Vì IP là .37 (nằm trong dải 0-63), nên Địa chỉ mạng (Network ID) là 172.16.5.0.',
    hint: 'Kích thước block mạng là 64 IP.'
  },
  {
    id: 4,
    question: 'Tìm Địa chỉ Broadcast (Broadcast Address)',
    scenario: 'Hệ thống cần gửi gói tin broadcast tới toàn bộ máy trong dải mạng 10.0.8.0/22.',
    cidr: '10.0.8.0/22',
    targetType: 'broadcast_id',
    options: ['10.0.11.255', '10.0.8.255', '10.0.15.255', '10.0.10.255'],
    correctAnswer: '10.0.11.255',
    explanation: 'Prefix /22 có 32 - 22 = 10 bit Host (tương đương 2^10 = 1024 IP, trải dài qua 4 Octet thứ ba: 8, 9, 10, 11). Do đó địa chỉ Broadcast cuối cùng là 10.0.11.255.',
    hint: 'Dải /22 bao gồm 4 dải /24 liên tiếp (8, 9, 10, 11).'
  },
  {
    id: 5,
    question: 'Tính số lượng Subnet có thể chia từ VPC chính',
    scenario: 'Bạn có một VPC AWS dải 10.0.0.0/16 và muốn chia đều thành các Subnet nhỏ kích thước /20 cho các phòng ban.',
    cidr: '10.0.0.0/16 -> /20',
    targetType: 'usable_ips',
    options: ['16 Subnets', '8 Subnets', '32 Subnets', '4 Subnets'],
    correctAnswer: '16 Subnets',
    explanation: 'Số bit mượn để chia subnet: 20 - 16 = 4 bits. Số lượng Subnet tối đa tạo được là 2^4 = 16 Subnets, mỗi subnet có 2^(32-20) = 4,096 địa chỉ IP.',
    hint: 'Công thức: 2^(prefix_mới - prefix_cũ).'
  }
];

export const SubnetMasterGame: React.FC = () => {
  const { addStudyHours } = useLearning();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const challenge = CHALLENGES[currentIdx];

  const shuffledOptions = useMemo(() => {
    return challenge ? shuffleArray(challenge.options) : [];
  }, [challenge]);

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === challenge.correctAnswer) {
      setScore(prev => prev + 100 + streak * 20);
      setStreak(prev => prev + 1);
      addStudyHours(0.1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx < CHALLENGES.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setGameCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setScore(0);
    setStreak(0);
    setGameCompleted(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Subnet & CIDR Master
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                Interactive Game
              </span>
            </h3>
            <p className="text-xs text-slate-400">Luyện phản xạ tính nhẩm CIDR, Subnet Mask & 5 IP dành riêng của AWS VPC</p>
          </div>
        </div>

        {/* HUD Score & Streak */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-xs flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Điểm:</span>
            <span className="font-bold text-amber-300 font-mono">{score}</span>
          </div>
          <div className="px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-xs flex items-center gap-1.5">
            <span className="text-orange-400">🔥</span>
            <span className="text-slate-400">Streak:</span>
            <span className="font-bold text-orange-300 font-mono">{streak}x</span>
          </div>
        </div>
      </div>

      {!gameCompleted ? (
        <div className="space-y-6">
          {/* Progress Tracker */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Thử thách {currentIdx + 1} / {CHALLENGES.length}</span>
            <div className="flex gap-1.5">
              {CHALLENGES.map((_, i) => (
                <div
                  key={i}
                  className={`w-5 h-1.5 rounded-full transition-all ${
                    i === currentIdx
                      ? 'bg-emerald-400 w-8'
                      : i < currentIdx
                      ? 'bg-emerald-600'
                      : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scenario Card */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500/10 border-b border-l border-emerald-500/20 rounded-bl-xl text-emerald-400 text-xs font-mono font-bold">
              {challenge.cidr}
            </div>

            <h4 className="text-sm sm:text-base font-bold text-slate-100 mb-2">
              {challenge.question}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {challenge.scenario}
            </p>

            {showHint && (
              <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span><strong>Gợi ý:</strong> {challenge.hint}</span>
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {shuffledOptions.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === challenge.correctAnswer;
              
              let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isAnswered}
                  className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                >
                  <span className="font-mono">{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation & Controls */}
          {isAnswered && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                {selectedOption === challenge.correctAnswer ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Chính xác! (+100 Điểm)
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Chưa chính xác! Hãy đọc kỹ giải thích.
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {challenge.explanation}
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  {currentIdx < CHALLENGES.length - 1 ? 'Thử Thách Tiếp Theo →' : 'Xem Kết Quả Tổng Kết 🏆'}
                </button>
              </div>
            </div>
          )}

          {!isAnswered && (
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setShowHint(true)}
                className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Hiện gợi ý giải bài</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Victory Screen */
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-extrabold text-white">Xuất Sắc! Bạn Đã Hoàn Thành Toàn Bộ Thử Thách!</h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Tổng điểm đạt được: <strong className="text-amber-300 font-mono text-base">{score} PTS</strong>. Kỹ năng tính toán Subnetting và CIDR của bạn đã sẵn sàng cho AWS VPC!
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
