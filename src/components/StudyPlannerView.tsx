import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { STUDY_PLANS } from '../data/studyPlanData';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus
} from 'lucide-react';

export const StudyPlannerView: React.FC = () => {
  const { 
    completedTasks, 
    toggleTaskCompleted, 
    studyHoursLogged, 
    logStudyHours 
  } = useLearning();

  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const activePlan = STUDY_PLANS[0];
  const activeWeek = activePlan.weeks.find(w => w.weekNumber === selectedWeekNum) || activePlan.weeks[0];

  const handleToggleTask = (taskId: string) => {
    toggleTaskCompleted(taskId);
  };

  const totalTasksCount = activePlan.weeks.reduce((acc, w) => acc + w.tasks.length, 0);
  const completedTasksCount = activePlan.weeks.reduce(
    (acc, w) => acc + w.tasks.filter(t => completedTasks.includes(t.id)).length, 
    0
  );
  const overallTaskPercent = Math.round((completedTasksCount / totalTasksCount) * 100);

  return (
    <div className="space-y-8 text-slate-300">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            {activePlan.name}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            {activePlan.description}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div>
            Đã học: <strong className="text-amber-300">{studyHoursLogged}h</strong>
          </div>
          <button
            onClick={() => logStudyHours(1)}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            title="Ghi nhận 1 giờ học"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>+1h</span>
          </button>
        </div>
      </div>

      {/* Week Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        {activePlan.weeks.map((w) => (
          <button
            key={w.weekNumber}
            onClick={() => setSelectedWeekNum(w.weekNumber)}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              selectedWeekNum === w.weekNumber
                ? 'bg-slate-800 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tuần {w.weekNumber}
          </button>
        ))}
      </div>

      {/* Selected Week Tasks */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-100">
            Tuần {activeWeek.weekNumber}: {activeWeek.theme}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Mục tiêu: {activeWeek.goals.join(', ')} • Thời gian gợi ý: ~{activeWeek.suggestedHours}h
          </p>
        </div>

        <div className="space-y-2">
          {activeWeek.tasks.map((task) => {
            const isDone = completedTasks.includes(task.id);

            return (
              <div
                key={task.id}
                onClick={() => handleToggleTask(task.id)}
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
          Tiến độ toàn khóa: <strong className="text-slate-300">{overallTaskPercent}%</strong> ({completedTasksCount}/{totalTasksCount} mục tiêu hoàn thành)
        </div>
      </div>

    </div>
  );
};
