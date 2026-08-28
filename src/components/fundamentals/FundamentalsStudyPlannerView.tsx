import React, { useState } from 'react';
import { FUNDAMENTAL_STUDY_PLAN_4_WEEKS } from '../../data/fundamentals/studyPlanData';
import { useLearning } from '../../context/LearningContext';
import { 
  CalendarDays, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Target
} from 'lucide-react';

export const FundamentalsStudyPlannerView: React.FC = () => {
  const { addStudyHours } = useLearning();
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [activeWeekNumber, setActiveWeekNumber] = useState<number>(1);

  const activeWeek = FUNDAMENTAL_STUDY_PLAN_4_WEEKS.find(w => w.weekNumber === activeWeekNumber) || FUNDAMENTAL_STUDY_PLAN_4_WEEKS[0];

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds(prev => {
      const exists = prev.includes(taskId);
      if (!exists) {
        addStudyHours(0.5);
        return [...prev, taskId];
      } else {
        return prev.filter(id => id !== taskId);
      }
    });
  };

  const totalTasks = FUNDAMENTAL_STUDY_PLAN_4_WEEKS.reduce((acc, w) => acc + w.dailyTasks.length, 0);
  const totalCompleted = completedTaskIds.length;
  const progressPercent = Math.round((totalCompleted / totalTasks) * 100);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white">
              Kế Hoạch Học Tập 4 Tuần "Zero to Cloud Ready"
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Lộ trình chia nhỏ theo từng ngày giúp bạn duy trì kỷ luật và sẵn sàng 100% cho AWS
            </p>
          </div>
        </div>

        {/* Global Progress */}
        <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Tiến độ 4 tuần:</span>
            <strong className="text-amber-300 font-mono text-sm">{progressPercent}% ({totalCompleted}/{totalTasks} bài)</strong>
          </div>
          <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Week Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FUNDAMENTAL_STUDY_PLAN_4_WEEKS.map(week => {
          const isActive = activeWeekNumber === week.weekNumber;
          const weekTasksCompleted = week.dailyTasks.filter((_, idx) => completedTaskIds.includes(`w${week.weekNumber}-t${idx}`)).length;

          return (
            <button
              key={week.weekNumber}
              onClick={() => setActiveWeekNumber(week.weekNumber)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isActive
                  ? 'bg-slate-800 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                  : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-mono">TUẦN {week.weekNumber}</span>
                <span className="text-[10px] text-slate-400">
                  {weekTasksCompleted}/{week.dailyTasks.length}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{week.theme}</h4>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{week.suggestedHours}h / tuần</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Week Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 shadow-xl">
        
        {/* Week Goals */}
        <div className="border-b border-slate-800 pb-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Mục Tiêu Trọng Tâm Tuần {activeWeek.weekNumber}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white">
            {activeWeek.theme}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {activeWeek.goals.map((goal, gIdx) => (
              <div key={gIdx} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <Target className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Tasks Checklist */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Checklist Nhiệm Vụ Từng Ngày
          </h4>

          <div className="space-y-2.5">
            {activeWeek.dailyTasks.map((task, idx) => {
              const taskId = `w${activeWeek.weekNumber}-t${idx}`;
              const isDone = completedTaskIds.includes(taskId);

              return (
                <div
                  key={idx}
                  onClick={() => toggleTask(taskId)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isDone
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : 'bg-slate-950/80 hover:bg-slate-950 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTask(taskId);
                      }}
                      className="text-slate-500 hover:text-emerald-400 p-1 flex-shrink-0 cursor-pointer"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold px-2 py-0.2 bg-slate-900 border border-slate-800 rounded text-amber-400">
                          {task.day}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-500">
                          {task.type}
                        </span>
                      </div>
                      <h5 className={`text-xs sm:text-sm font-semibold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                        {task.title}
                      </h5>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5" /> {task.duration}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
