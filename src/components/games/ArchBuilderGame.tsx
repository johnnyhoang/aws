import React, { useState } from 'react';
import { ARCHITECTURE_CHALLENGES } from '../../data/gamesData';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, Award, Check } from 'lucide-react';

interface Props {
  isEn: boolean;
  onGameWin: () => void;
}

export const ArchBuilderGame: React.FC<Props> = ({ isEn, onGameWin }) => {
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
      onGameWin();
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

  const archTitle = (isEn && activeArchChallenge.titleEn) ? activeArchChallenge.titleEn : activeArchChallenge.title;
  const archScenario = (isEn && activeArchChallenge.scenarioEn) ? activeArchChallenge.scenarioEn : activeArchChallenge.scenario;
  const archSuccess = (isEn && activeArchChallenge.successStoryEn) ? activeArchChallenge.successStoryEn : activeArchChallenge.successStory;
  const isAllLayersCorrect = activeArchChallenge.layers.every((layer, idx) => selectedLayerOptions[idx] === layer.correctService);

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-700 p-5 md:p-8 space-y-6 shadow-2xl animate-fadeIn">
      
      {/* Header & Challenge Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Target: {activeArchChallenge.targetUptime} Uptime • {activeArchChallenge.budgetGoal}
          </span>
          <h2 className="text-xl md:text-2xl font-black text-white">
            {archTitle}
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
            {isEn ? 'Switch Challenge' : 'Đổi Thử Thách'} ({currentArchIdx + 1}/{ARCHITECTURE_CHALLENGES.length})
          </button>
          <button
            onClick={handleResetArch}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
            title="Làm lại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scenario Text */}
      <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 text-xs md:text-sm text-slate-300 leading-relaxed">
        <strong>{isEn ? 'Scenario:' : 'Bối cảnh:'}</strong> {archScenario}
      </div>

      {/* 3 Architecture Layers */}
      <div className="space-y-4">
        {activeArchChallenge.layers.map((layer, lIdx) => {
          const selectedOption = selectedLayerOptions[lIdx];
          const isLayerCorrect = selectedOption === layer.correctService;
          const layerName = (isEn && layer.nameEn) ? layer.nameEn : layer.name;
          const layerDesc = (isEn && layer.descriptionEn) ? layer.descriptionEn : layer.description;

          return (
            <div 
              key={lIdx}
              className={`p-4 md:p-5 rounded-2xl border transition-all space-y-3 ${
                isArchVerified && isLayerCorrect ? 'bg-emerald-950/20 border-emerald-500/50' :
                isArchVerified && !isLayerCorrect ? 'bg-red-950/20 border-red-500/50' :
                'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="font-bold text-sky-300 text-sm">{layerName}</h4>
                <span className="text-xs text-slate-400">{layerDesc}</span>
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
                  <span>
                    {isEn 
                      ? layer.options.find(o => o.service === selectedOption)?.feedbackEn 
                      : layer.options.find(o => o.service === selectedOption)?.feedback}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <span className="text-xs text-slate-400">
          {isEn ? 'Selected:' : 'Đã chọn:'} {Object.keys(selectedLayerOptions).length}/{activeArchChallenge.layers.length} {isEn ? 'Layers' : 'Tầng'}
        </span>

        {!isArchVerified ? (
          <button
            onClick={handleVerifyArchitecture}
            disabled={Object.keys(selectedLayerOptions).length < activeArchChallenge.layers.length}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isEn ? 'Verify Architecture (+1h)' : 'Kiểm Thử Kiến Trúc (+1h học)'}
          </button>
        ) : (
          <button
            onClick={handleResetArch}
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all"
          >
            {isEn ? 'Retry This Architecture' : 'Làm Lại Kiến Trúc Này'}
          </button>
        )}
      </div>

      {/* Success Story Alert (Only when ALL layers are correct) */}
      {isArchVerified && isAllLayersCorrect && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-sky-950/40 border border-emerald-500/40 text-xs md:text-sm text-emerald-200 leading-relaxed font-medium flex items-center gap-3">
          <Award className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <span>{archSuccess}</span>
        </div>
      )}

      {/* Failure Alert (When one or more layers are wrong) */}
      {isArchVerified && !isAllLayersCorrect && (
        <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/40 text-xs md:text-sm text-red-200 leading-relaxed font-medium flex items-start gap-3">
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-red-300 font-bold mb-0.5">
              {isEn ? '⚠️ Architecture Validation Failed!' : '⚠️ Kiến Trúc Chưa Đạt Chuẩn Well-Architected!'}
            </strong>
            <span>
              {isEn 
                ? 'One or more tiers have incorrect components that will cause outages under peak load. Check the red feedback boxes above and click "Retry This Architecture" to fix!'
                : 'Hệ thống còn tầng thành phần chưa tối ưu (hộp viền đỏ phía trên) khiến cổng đăng ký có nguy cơ bị gián đoạn. Hãy xem kỹ giải thích và bấm "Làm Lại Kiến Trúc Này" để cấu hình lại nhé!'}
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
