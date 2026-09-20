import React, { useState } from 'react';
import { FUNDAMENTAL_STUDY_PLAN_4_WEEKS } from '../../data/fundamentals/studyPlanData';
import { useLearning } from '../../context/LearningContext';
import { 
  CheckCircle2, 
  Circle, 
  Clock 
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
    <div className="space-y-8 text-slate-300">
      
      {/* Title */}
      <div className="space-y-2 pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-slate-100 tracking-tight">
          Kế Hoạch Học Tập 4 Tuần Nền Tảng (Zero to Cloud)
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          Lộ trình chia nhỏ theo từng ngày giúp bạn duy trì kỷ luật và sẵn sàng 100% cho AWS.
        </p>
      </div>

      {/* Week Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        {FUNDAMENTAL_STUDY_PLAN_4_WEEKS.map(week => (
          <button
            key={week.weekNumber}
            onClick={() => setActiveWeekNumber(week.weekNumber)}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeWeekNumber === week.weekNumber
                ? 'bg-slate-800 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tuần {week.weekNumber}
          </button>
        ))}
      </div>

      {/* Active Week Content */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-100">
            Tuần {activeWeek.weekNumber}: {activeWeek.theme}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Mục tiêu: {activeWeek.goals.join(', ')} • Gợi ý: ~{activeWeek.suggestedHours}h / tuần
          </p>
        </div>

        <div className="space-y-2">
          {activeWeek.dailyTasks.map((task, idx) => {
            const taskId = `w${activeWeek.weekNumber}-t${idx}`;
            const isDone = completedTaskIds.includes(taskId);

            return (
              <div
                key={taskId}
                onClick={() => toggleTask(taskId)}
                className={`p-3.5 rounded-lg border transition-colors cursor-pointer flex items-start justify-between gap-3 text-xs sm:text-sm ${
                  isDone
                    ? 'bg-slate-900/40 border-slate-800/60 text-slate-500 line-through'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <button className="mt-0.5 text-slate-400 hover:text-slate-200 cursor-pointer">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600" />
                    )}
                  </button>
                  <div>
                    <div className="font-semibold text-amber-400 text-xs">{task.day}</div>
                    <div className="font-medium leading-snug">{task.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5 no-underline uppercase tracking-wide font-mono text-[10px]">{task.type}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-slate-500 text-xs flex-shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{task.duration}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 pt-2">
          Tiến độ: <strong className="text-slate-300">{progressPercent}%</strong> ({totalCompleted}/{totalTasks} bài hoàn thành)
        </div>
      </div>

    </div>
  );
};
