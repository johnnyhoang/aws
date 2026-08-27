import React, { useState, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  ARCHITECTURE_CHALLENGES, 
  MEMORY_CARD_PAIRS, 
  INCIDENT_SCENARIOS,
  ArchitectureChallenge,
  IncidentScenario
} from '../data/gamesData';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Layers, 
  BrainCircuit, 
  Flame, 
  ShieldAlert, 
  Clock, 
  Zap, 
  Heart,
  ChevronRight,
  ShieldCheck,
  Check,
  Languages,
  Shuffle
} from 'lucide-react';

export const GamesHubView: React.FC = () => {
  const { logStudyHours } = useLearning();
  const [activeGame, setActiveGame] = useState<'arch' | 'memory' | 'incident'>('arch');
  
  // Language mode: 'vi' | 'en' | 'random'
  const [gameLangMode, setGameLangMode] = useState<'vi' | 'en' | 'random'>('vi');
  const isEn = gameLangMode === 'en';

  // ==========================================
  // GAME 1: ARCHITECTURE BUILDER STATE
  // ==========================================
  const [currentArchIdx, setCurrentArchIdx] = useState<number>(0);
  const [selectedLayerOptions, setSelectedLayerOptions] = useState<Record<number, string>>({});
  const [isArchVerified, setIsArchVerified] = useState<boolean>(false);
  const activeArchChallenge = ARCHITECTURE_CHALLENGES[currentArchIdx] || ARCHITECTURE_CHALLENGES[0];

  const handleSelectLayerOption = (layerIdx: number, serviceName: string) => {
    if (isArchVerified) return;
    setSelectedLayerOptions(prev => ({
      ...prev,
      [layerIdx]: serviceName
    }));
  };

  const handleVerifyArchitecture = () => {
    setIsArchVerified(true);
    let allCorrect = true;
    activeArchChallenge.layers.forEach((layer, idx) => {
      if (selectedLayerOptions[idx] !== layer.correctService) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      logStudyHours(1);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    }
  };

  const handleResetArch = () => {
    setSelectedLayerOptions({});
    setIsArchVerified(false);
  };

  // ==========================================
  // GAME 2: CLOUD MEMORY MATCH STATE
  // ==========================================
  interface MemoryCard {
    uid: string;
    pairId: string;
    text: string;
    type: 'service' | 'role';
    isFlipped: boolean;
    isMatched: boolean;
  }

  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [isMemoryWon, setIsMemoryWon] = useState<boolean>(false);

  const initMemoryGame = () => {
    const cards: MemoryCard[] = [];
    MEMORY_CARD_PAIRS.slice(0, 6).forEach((pair, idx) => {
      const roleText = (isEn || (gameLangMode === 'random' && idx % 2 === 1)) && pair.roleEn 
        ? pair.roleEn 
        : pair.role;

      cards.push({
        uid: `card-s-${idx}`,
        pairId: pair.id,
        text: pair.service,
        type: 'service',
        isFlipped: false,
        isMatched: false
      });
      cards.push({
        uid: `card-r-${idx}`,
        pairId: pair.id,
        text: roleText,
        type: 'role',
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle
    const shuffled = cards.sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
    setFlippedIndices([]);
    setMovesCount(0);
    setIsMemoryWon(false);
  };

  useEffect(() => {
    if (activeGame === 'memory') {
      initMemoryGame();
    }
  }, [activeGame, gameLangMode]);

  const handleFlipCard = (index: number) => {
    if (flippedIndices.length >= 2 || memoryCards[index].isFlipped || memoryCards[index].isMatched) {
      return;
    }

    const newCards = [...memoryCards];
    newCards[index].isFlipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMovesCount(prev => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const card1 = newCards[firstIdx];
      const card2 = newCards[secondIdx];

      if (card1.pairId === card2.pairId) {
        // Matched!
        setTimeout(() => {
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setMemoryCards([...newCards]);
          setFlippedIndices([]);

          // Check if all matched
          if (newCards.every(c => c.isMatched)) {
            setIsMemoryWon(true);
            logStudyHours(1);
            confetti({
              particleCount: 100,
              spread: 75,
              origin: { y: 0.6 }
            });
          }
        }, 500);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setMemoryCards([...newCards]);
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  // ==========================================
  // GAME 3: INCIDENT COMMANDER STATE
  // ==========================================
  const [currentIncIdx, setCurrentIncIdx] = useState<number>(0);
  const [uptimeScore, setUptimeScore] = useState<number>(100);
  const [selectedIncChoice, setSelectedIncChoice] = useState<string | null>(null);
  const [isIncAnswered, setIsIncAnswered] = useState<boolean>(false);
  const [isIncidentGameOver, setIsIncidentGameOver] = useState<boolean>(false);

  const activeIncident = INCIDENT_SCENARIOS[currentIncIdx] || INCIDENT_SCENARIOS[0];

  const handleChooseIncidentAction = (choiceId: string) => {
    if (isIncAnswered) return;
    const choice = activeIncident.choices.find(c => c.id === choiceId);
    if (!choice) return;

    setSelectedIncChoice(choiceId);
    setIsIncAnswered(true);

    const newScore = Math.max(0, Math.min(100, uptimeScore + choice.uptimeImpact));
    setUptimeScore(newScore);

    if (choice.isCorrect) {
      confetti({
        particleCount: 45,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNextIncident = () => {
    if (currentIncIdx < INCIDENT_SCENARIOS.length - 1) {
      setCurrentIncIdx(prev => prev + 1);
      setSelectedIncChoice(null);
      setIsIncAnswered(false);
    } else {
      setIsIncidentGameOver(true);
      if (uptimeScore >= 70) {
        logStudyHours(1);
      }
    }
  };

  const handleResetIncident = () => {
    setCurrentIncIdx(0);
    setUptimeScore(100);
    setSelectedIncChoice(null);
    setIsIncAnswered(false);
    setIsIncidentGameOver(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-5 md:p-8 shadow-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Gamepad2 className="w-3.5 h-3.5" />
            Trò Chơi Tương Tác Song Ngữ (VI / EN)
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <span className="text-[11px] font-bold text-slate-400 px-1.5 flex items-center gap-1">
              <Languages className="w-3 h-3 text-amber-400" /> Ngôn ngữ:
            </span>
            <button
              onClick={() => setGameLangMode('vi')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                gameLangMode === 'vi' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇻🇳 VI
            </button>
            <button
              onClick={() => setGameLangMode('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                gameLangMode === 'en' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇺🇸 EN
            </button>
            <button
              onClick={() => setGameLangMode('random')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                gameLangMode === 'random' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shuffle className="w-3 h-3" />
              <span>Xáo Trộn</span>
            </button>
          </div>
        </div>

        <h1 className="text-xl md:text-3xl font-extrabold text-white">
          Khu Trò Chơi Giải Trí & Khắc Sâu Kiến Thức
        </h1>
        <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Vừa chơi game vừa rèn luyện tư duy thiết kế kiến trúc đám mây, ghép cặp thuật ngữ và xử lý sự cố khẩn cấp tại phòng IT trường đại học Mỹ.
        </p>
      </div>

      {/* Game Mode Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveGame('arch')}
          className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
            activeGame === 'arch'
              ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/30 shadow-xl'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
              Trò Chơi 1
            </span>
            <Layers className={`w-5 h-5 ${activeGame === 'arch' ? 'text-amber-400' : 'text-slate-500'}`} />
          </div>
          <h3 className="font-black text-white text-base">Kiến Trúc Sư AWS</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Chọn và lắp ráp đúng các dịch vụ AWS cho từng tầng kiến trúc để giải quyết bài toán nghiệp vụ.
          </p>
        </button>

        <button
          onClick={() => { setActiveGame('memory'); initMemoryGame(); }}
          className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
            activeGame === 'memory'
              ? 'bg-purple-500/15 border-purple-500 ring-2 ring-purple-500/30 shadow-xl'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
              Trò Chơi 2
            </span>
            <BrainCircuit className={`w-5 h-5 ${activeGame === 'memory' ? 'text-purple-400' : 'text-slate-500'}`} />
          </div>
          <h3 className="font-black text-white text-base">Ghép Cặp Trí Nhớ</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Lật thẻ ghép đúng dịch vụ AWS với vai trò thực tế để nhận điểm thưởng trí nhớ siêu phàm.
          </p>
        </button>

        <button
          onClick={() => { setActiveGame('incident'); handleResetIncident(); }}
          className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
            activeGame === 'incident'
              ? 'bg-rose-500/15 border-rose-500 ring-2 ring-rose-500/30 shadow-xl'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
              Trò Chơi 3
            </span>
            <Flame className={`w-5 h-5 ${activeGame === 'incident' ? 'text-rose-400' : 'text-slate-500'}`} />
          </div>
          <h3 className="font-black text-white text-base">Chỉ Huy Sự Cố IT</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Đưa ra quyết định chớp nhoáng để cứu hệ thống đám mây trường học không bị sập (Uptime &gt; 99%).
          </p>
        </button>
      </div>

      {/* ==========================================
          RENDER GAME 1: ARCHITECTURE BUILDER
          ========================================== */}
      {activeGame === 'arch' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-700 p-6 md:p-8 space-y-6 shadow-2xl animate-fadeIn">
          
          {/* Header & Challenge Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Mục tiêu: {activeArchChallenge.targetUptime} Uptime • {activeArchChallenge.budgetGoal}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white">
                {activeArchChallenge.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentArchIdx((currentArchIdx + 1) % ARCHITECTURE_CHALLENGES.length);
                  handleResetArch();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                Đổi Thử Thách Khác ({currentArchIdx + 1}/{ARCHITECTURE_CHALLENGES.length})
              </button>
              <button
                onClick={handleResetArch}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
                title="Làm lại từ đầu"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scenario Text */}
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 text-xs md:text-sm text-slate-300 leading-relaxed">
            <strong>Bối cảnh nhiệm vụ:</strong> {activeArchChallenge.scenario}
          </div>

          {/* 3 Architecture Layers */}
          <div className="space-y-4">
            {activeArchChallenge.layers.map((layer, lIdx) => {
              const selectedOption = selectedLayerOptions[lIdx];
              const isLayerAnswered = !!selectedOption;
              const isLayerCorrect = selectedOption === layer.correctService;

              return (
                <div 
                  key={lIdx}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    isArchVerified && isLayerCorrect ? 'bg-emerald-950/20 border-emerald-500/50' :
                    isArchVerified && !isLayerCorrect ? 'bg-red-950/20 border-red-500/50' :
                    'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sky-300 text-sm">{layer.name}</h4>
                    <span className="text-xs text-slate-400">{layer.description}</span>
                  </div>

                  {/* Options for this layer */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
                    {layer.options.map((opt, optIdx) => {
                      const isSelected = selectedOption === opt.service;

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectLayerOption(lIdx, opt.service)}
                          className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                          }`}
                        >
                          <span>{opt.service}</span>
                          {isSelected && <Check className="w-4 h-4 text-slate-950" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Feedback when verified */}
                  {isArchVerified && selectedOption && (
                    <div className={`text-xs p-3 rounded-xl flex items-start gap-2 ${
                      isLayerCorrect ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' :
                      'bg-red-500/10 text-red-300 border border-red-500/30'
                    }`}>
                      {isLayerCorrect ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                      <span>{layer.options.find(o => o.service === selectedOption)?.feedback}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              Đã chọn: {Object.keys(selectedLayerOptions).length}/{activeArchChallenge.layers.length} Tầng
            </span>

            {!isArchVerified ? (
              <button
                onClick={handleVerifyArchitecture}
                disabled={Object.keys(selectedLayerOptions).length < activeArchChallenge.layers.length}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Kiểm Thử Kiến Trúc (+1h học)
              </button>
            ) : (
              <button
                onClick={handleResetArch}
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all"
              >
                Làm Lại Kiến Trúc Này
              </button>
            )}
          </div>

          {/* Success Story Alert */}
          {isArchVerified && Object.keys(selectedLayerOptions).length === activeArchChallenge.layers.length && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-sky-950/40 border border-emerald-500/40 text-xs md:text-sm text-emerald-200 leading-relaxed font-medium flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-400 flex-shrink-0" />
              <span>{activeArchChallenge.successStory}</span>
            </div>
          )}

        </div>
      )}

      {/* ==========================================
          RENDER GAME 2: CLOUD MEMORY MATCH
          ========================================== */}
      {activeGame === 'memory' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-700 p-6 md:p-8 space-y-6 shadow-2xl animate-fadeIn">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white">
                Trò Chơi Ghép Cặp Trí Nhớ (Memory Match)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Lật mở và ghép đôi chính xác từng Dịch Vụ AWS với Định Nghĩa chuẩn của nó.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                Số lượt lật: {movesCount}
              </span>
              <button
                onClick={initMemoryGame}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Trộn Lại Bài</span>
              </button>
            </div>
          </div>

          {/* Cards Grid 4x3 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {memoryCards.map((card, idx) => {
              return (
                <div
                  key={card.uid}
                  onClick={() => handleFlipCard(idx)}
                  className={`min-h-[110px] md:min-h-[130px] p-4 rounded-2xl border cursor-pointer select-none transition-all duration-300 flex flex-col items-center justify-center text-center relative ${
                    card.isMatched
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 shadow-md shadow-emerald-900/20'
                      : card.isFlipped
                      ? 'bg-purple-900/40 border-purple-400 text-purple-100 ring-2 ring-purple-500/30'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  {card.isFlipped || card.isMatched ? (
                    <div className="space-y-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        card.type === 'service' ? 'bg-sky-500/20 text-sky-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {card.type === 'service' ? 'Tên Dịch Vụ' : 'Vai Trò Thực Tế'}
                      </span>
                      <p className={`text-xs md:text-sm font-bold leading-snug ${card.type === 'service' ? 'text-white text-base' : 'text-slate-200'}`}>
                        {card.text}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-slate-500">
                      <BrainCircuit className="w-6 h-6 opacity-60" />
                      <span className="text-[11px] font-bold uppercase tracking-widest">AWS</span>
                    </div>
                  )}

                  {card.isMatched && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute top-2 right-2" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Win Screen Modal/Alert */}
          {isMemoryWon && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 to-emerald-950/60 border border-purple-500/50 text-center space-y-3 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto text-purple-300">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white">
                🎉 Bạn Đã Ghép Đôi Thành Công Tất Cả Các Thẻ!
              </h3>
              <p className="text-xs md:text-sm text-purple-200">
                Hoàn thành trong {movesCount} lượt lật thẻ. Trí nhớ về các dịch vụ AWS của bạn rất xuất sắc!
              </p>
              <button
                onClick={initMemoryGame}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg transition-all"
              >
                Chơi Ván Mới
              </button>
            </div>
          )}

        </div>
      )}

      {/* ==========================================
          RENDER GAME 3: INCIDENT COMMANDER
          ========================================== */}
      {activeGame === 'incident' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-700 p-6 md:p-8 space-y-6 shadow-2xl animate-fadeIn">
          
          {/* Uptime & Score Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                <ShieldAlert className="w-4 h-4 animate-pulse" />
                <span>PHÒNG CHỈ HUY SỰ CỐ IT ĐẠI HỌC (INCIDENT COMMAND)</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">
                Tình Huống {currentIncIdx + 1} / {INCIDENT_SCENARIOS.length}
              </h2>
            </div>

            {/* Health / Uptime Bar */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-3 min-w-[200px]">
              <Heart className={`w-5 h-5 ${uptimeScore > 50 ? 'text-emerald-400' : 'text-red-500 animate-bounce'}`} />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-400">Độ Khả Dụng (Uptime):</span>
                  <span className={uptimeScore >= 80 ? 'text-emerald-400' : uptimeScore >= 50 ? 'text-amber-400' : 'text-red-400'}>
                    {uptimeScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      uptimeScore >= 80 ? 'bg-emerald-500' : uptimeScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${uptimeScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {!isIncidentGameOver ? (
            <div className="space-y-6">
              {/* Incident Alert Box */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-rose-500/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-400">{activeIncident.time}</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                    {activeIncident.alertType}
                  </span>
                </div>
                <h3 className="font-black text-white text-base md:text-lg">
                  {activeIncident.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-1">
                  {activeIncident.description}
                </p>
              </div>

              {/* Action Choices */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Chọn Phương Án Xử Lý Của Bạn:
                </div>
                <div className="space-y-2.5">
                  {activeIncident.choices.map((choice) => {
                    const isSelected = selectedIncChoice === choice.id;

                    let btnStyle = 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-200';
                    if (isIncAnswered) {
                      if (choice.isCorrect) {
                        btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !choice.isCorrect) {
                        btnStyle = 'bg-red-950/40 border-red-500 text-red-200';
                      } else {
                        btnStyle = 'bg-slate-950/40 border-slate-800 text-slate-600 opacity-50';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                    }

                    return (
                      <div
                        key={choice.id}
                        onClick={() => handleChooseIncidentAction(choice.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {choice.id}
                        </span>
                        <div className="space-y-1">
                          <p className="text-xs md:text-sm leading-relaxed">{choice.action}</p>
                          {isIncAnswered && (
                            <p className="text-xs pt-1 border-t border-slate-800/60">{choice.explanation}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Incident Action */}
              {isIncAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextIncident}
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-900/30 transition-all flex items-center gap-1.5"
                  >
                    <span>{currentIncIdx < INCIDENT_SCENARIOS.length - 1 ? 'Xử Lý Sự Cố Tiếp Theo' : 'Xem Báo Cáo Ca Trực'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Game Over / Victory Summary */
            <div className="p-8 text-center space-y-5">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                uptimeScore >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {uptimeScore >= 70 ? <ShieldCheck className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white">
                  {uptimeScore >= 70 ? '🎉 Ca Trực Thành Công Xuất Sắc!' : '💥 Hệ Thống Bị Gián Đoạn Nghiêm Trọng!'}
                </h3>
                <p className="text-xs md:text-sm text-slate-400">
                  {uptimeScore >= 70 
                    ? `Bạn đã bảo vệ thành công hệ thống với tỷ lệ Uptime đạt ${uptimeScore}%. Bạn xứng đáng là Kỹ Sư Trưởng IT!` 
                    : `Tỷ lệ Uptime tụt xuống ${uptimeScore}%. Hãy ôn lại kiến thức để phản ứng nhanh hơn trong ca trực tới!`}
                </p>
              </div>

              <button
                onClick={handleResetIncident}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg transition-all"
              >
                Nhận Ca Trực Mới
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
