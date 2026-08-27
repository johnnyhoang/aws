import React, { useState, useEffect } from 'react';
import { FINOPS_CHALLENGES } from '../../data/gamesData';
import confetti from 'canvas-confetti';
import { DollarSign, TrendingDown, Award, RotateCcw, CheckCircle2, AlertCircle, Shuffle } from 'lucide-react';

interface Props {
  isEn: boolean;
  onGameWin: () => void;
}

export const FinOpsTycoonGame: React.FC<Props> = ({ isEn, onGameWin }) => {
  const challenge = FINOPS_CHALLENGES[0];
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [isFinOpsEvaluated, setIsFinOpsEvaluated] = useState<boolean>(false);
  
  // Shuffled options map per item: { [itemId]: options[] }
  const [shuffledItemOptions, setShuffledItemOptions] = useState<Record<string, typeof FINOPS_CHALLENGES[0]['items'][0]['options']>>({});

  const shuffleFinOpsOptions = () => {
    const map: Record<string, typeof challenge.items[0]['options']> = {};
    challenge.items.forEach(item => {
      const opts = [...item.options];
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      map[item.id] = opts;
    });
    setShuffledItemOptions(map);
  };

  useEffect(() => {
    shuffleFinOpsOptions();
  }, []);

  const handleSelectChoice = (itemId: string, optionId: string) => {
    if (isFinOpsEvaluated) return;
    setSelectedChoices(prev => ({
      ...prev,
      [itemId]: optionId
    }));
  };

  // Compute total monthly cost after decisions
  let currentCalculatedCost = challenge.initialMonthlyCost;
  let totalSavings = 0;

  challenge.items.forEach(item => {
    const selectedOptId = selectedChoices[item.id];
    if (selectedOptId) {
      const opt = item.options.find(o => o.id === selectedOptId);
      if (opt) {
        currentCalculatedCost -= opt.savings;
        totalSavings += opt.savings;
      }
    }
  });

  const handleEvaluate = () => {
    setIsFinOpsEvaluated(true);
    const isTargetMet = currentCalculatedCost <= challenge.targetCost;
    if (isTargetMet) {
      onGameWin();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  const handleReset = () => {
    setSelectedChoices({});
    setIsFinOpsEvaluated(false);
    shuffleFinOpsOptions();
  };

  const isTargetAchieved = currentCalculatedCost <= challenge.targetCost;

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-700 p-5 md:p-8 space-y-6 shadow-2xl animate-fadeIn">
      
      {/* Header & Live Cost Counter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <DollarSign className="w-4 h-4" />
            <span>{isEn ? 'AWS FINOPS CLOUD COST OPTIMIZATION CHALLENGE' : 'CUỘC CHIẾN TỐI ƯU CHI PHÍ AWS (FINOPS)'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            {isEn ? challenge.titleEn : challenge.title}
          </h2>
          <p className="text-xs text-slate-400">
            {isEn ? 'Department:' : 'Đơn vị phụ trách:'} {challenge.department}
          </p>
        </div>

        {/* Live Cost Dashboard */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold">{isEn ? 'Current Monthly Bill:' : 'Chi Phí Hiện Tại:'}</span>
            <div className="text-2xl font-black text-amber-400 font-mono">
              ${currentCalculatedCost.toLocaleString()}/mo
            </div>
            <span className="text-[10px] text-slate-500">
              {isEn ? `Goal: < $${challenge.targetCost.toLocaleString()}/mo` : `Mục tiêu: < $${challenge.targetCost.toLocaleString()}/tháng`}
            </span>
          </div>

          <div className="pl-3 border-l border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold">{isEn ? 'Total Saved:' : 'Đã Tiết Kiệm:'}</span>
            <div className="text-xl font-bold text-emerald-400 font-mono flex items-center gap-1">
              <TrendingDown className="w-4 h-4" />
              ${totalSavings.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Resource Optimization Cards */}
      <div className="space-y-4">
        {challenge.items.map((item, idx) => {
          const selectedOptId = selectedChoices[item.id];
          const selectedOpt = item.options.find(o => o.id === selectedOptId);
          const optionsToRender = shuffledItemOptions[item.id] || item.options;

          return (
            <div key={item.id} className="bg-slate-950 p-4 md:p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-850 pb-2">
                <h4 className="font-bold text-white text-sm">
                  {idx + 1}. {isEn ? item.resourceNameEn : item.resourceName}
                </h4>
                <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                  {isEn ? 'Current Waste:' : 'Chi phí hiện tại:'} ${item.currentCost}/mo
                </span>
              </div>

              {/* Action Choices (Dynamically Shuffled) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                {optionsToRender.map(opt => {
                  const isSelected = selectedOptId === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectChoice(item.id, opt.id)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="font-semibold leading-relaxed">
                        {isEn ? opt.titleEn : opt.title}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                        <span className="text-slate-400">
                          {isEn ? 'New Cost:' : 'Giá mới:'} <strong className="text-white">${opt.newCost}/mo</strong>
                        </span>
                        <span className={opt.savings >= 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                          {opt.savings >= 0 ? `+Tiết kiệm $${opt.savings}` : `Phạt $${Math.abs(opt.savings)}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feedback after evaluation */}
              {isFinOpsEvaluated && selectedOpt && (
                <div className={`p-3 rounded-xl text-xs leading-relaxed flex items-start gap-2 ${
                  selectedOpt.isOptimal ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/10 text-red-300 border border-red-500/30'
                }`}>
                  {selectedOpt.isOptimal ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                  <span>{isEn ? selectedOpt.explanationEn : selectedOpt.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <span className="text-xs text-slate-400">
          {isEn ? 'Decisions Made:' : 'Đã tối ưu:'} {Object.keys(selectedChoices).length}/{challenge.items.length} {isEn ? 'Resources' : 'Hạng mục'}
        </span>

        {!isFinOpsEvaluated ? (
          <button
            onClick={handleEvaluate}
            disabled={Object.keys(selectedChoices).length < challenge.items.length}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isEn ? 'Run FinOps Audit (+1h)' : 'Chốt Phương Án FinOps (+1h học)'}
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all shadow-md"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>{isEn ? 'Retry & Shuffle Options' : 'Làm Lại & Xáo Lại Đáp Án'}</span>
          </button>
        )}
      </div>

      {/* Success banner */}
      {isFinOpsEvaluated && isTargetAchieved && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-sky-950/60 border border-emerald-500/50 text-center space-y-2 shadow-xl">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-white">
            {isEn ? '🎉 FinOps Champion! Target Achieved!' : '🎉 Xuất Sắc! Bạn Đã Trở Thành Chuyên Gia FinOps!'}
          </h3>
          <p className="text-xs text-emerald-200">
            {isEn ? `You successfully slashed the university AWS bill to $${currentCalculatedCost.toLocaleString()}/mo, saving over $${totalSavings.toLocaleString()}/mo!` : `Bạn đã cắt giảm thành công hóa đơn AWS xuống chỉ còn $${currentCalculatedCost.toLocaleString()}/tháng, tiết kiệm $${totalSavings.toLocaleString()} mỗi tháng cho trường!`}
          </p>
        </div>
      )}

      {/* Target Not Met banner */}
      {isFinOpsEvaluated && !isTargetAchieved && (
        <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/40 text-center space-y-2 shadow-xl">
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mx-auto text-red-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-white">
            {isEn ? '⚠️ Target Not Met Yet!' : '⚠️ Chưa Đạt Mục Tiêu Ngân Sách!'}
          </h3>
          <p className="text-xs text-red-200">
            {isEn 
              ? `Current monthly bill is $${currentCalculatedCost.toLocaleString()}/mo (Target is < $${challenge.targetCost.toLocaleString()}/mo). Review suboptimal choices and try again!`
              : `Chi phí hiện tại là $${currentCalculatedCost.toLocaleString()}/tháng (Mục tiêu là < $${challenge.targetCost.toLocaleString()}/tháng). Hãy bấm 'Làm Lại & Xáo Lại Đáp Án' để chọn các giải pháp tối ưu hơn nhé!`}
          </p>
        </div>
      )}

    </div>
  );
};
