import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { STUDY_PLANS } from '../data/studyPlanData';
import confetti from 'canvas-confetti';
import { 
  CalendarDays, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus, 
  Sparkles, 
  Award, 
  BookOpen, 
  RotateCcw,
  Target,
  Flame
} from 'lucide-react';

export const StudyPlannerView: React.FC = () => {
  const { 
    completedTasks, 
    toggleTaskCompleted, 
    studyHoursLogged, 
    logStudyHours, 
    resetAllProgress 
  } = useLearning();

  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const activePlan = STUDY_PLANS[0]; // 8-Week Plan
  const activeWeek = activePlan.weeks.find(w => w.weekNumber === selectedWeekNum) || activePlan.weeks[0];

  const handleToggleTask = (taskId: string) => {
    const isDone = completedTasks.includes(taskId);
    toggleTaskCompleted(taskId);
    if (!isDone) {
      confetti({
        particleCount: 35,
        spread: 40,
        origin: { y: 0.7 }
      });
    }
  };

  const totalTasksCount = activePlan.weeks.reduce((acc, w) => acc + w.tasks.length, 0);
  const completedTasksCount = activePlan.weeks.reduce(
    (acc, w) => acc + w.tasks.filter(t => completedTasks.includes(t.id)).length, 
    0
  );
  const overallTaskPercent = Math.round((completedTasksCount / totalTasksCount) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-6 md:p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <Target className="w-3.5 h-3.5" />
              Kế Hoạch Học Tập Theo Tuần
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              {activePlan.name}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {activePlan.description}
            </p>
          </div>

          {/* Quick Study Tracker Widget */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                Thời Gian Tích Lũy
              </span>
              <span className="text-lg font-black text-emerald-400">{studyHoursLogged} Giờ</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => logStudyHours(1)}
                className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> +1 Tiếng Học
              </button>
              <button
                onClick={() => logStudyHours(2)}
                className="flex-1 py-1.5 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> +2 Tiếng Học
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Tiến độ nhiệm vụ:</span>
                <span className="font-bold text-amber-400">{completedTasksCount}/{totalTasksCount} ({overallTaskPercent}%)</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${overallTaskPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Week Selector Ribbon */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          Chọn Tuần Học (1 đến 8)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {activePlan.weeks.map((week) => {
            const isSelected = selectedWeekNum === week.weekNumber;
            const weekTasksDone = week.tasks.filter(t => completedTasks.includes(t.id)).length;
            const isWeekFullyDone = weekTasksDone === week.tasks.length && week.tasks.length > 0;

            return (
              <button
                key={week.weekNumber}
                onClick={() => setSelectedWeekNum(week.weekNumber)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-lg shadow-amber-500/20'
                    : isWeekFullyDone
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-black">Tuần {week.weekNumber}</span>
                  {isWeekFullyDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className={`text-[10px] mt-2 ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                  {weekTasksDone}/{week.tasks.length} Việc
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Week Details Card */}
      <div className="bg-slate-900 rounded-2xl border border-slate-700/80 p-6 md:p-8 space-y-6 shadow-2xl">
        
        {/* Week Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              Giai đoạn: {activeWeek.stageCode}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-2">
              {activeWeek.theme}
            </h2>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Mục tiêu tuần: <strong className="text-slate-200">{activeWeek.suggestedHours} giờ học</strong></span>
          </div>
        </div>

        {/* Weekly Goals */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Target className="w-4 h-4 text-sky-400" />
            Mục Tiêu Trọng Tâm Cần Đạt Trong Tuần:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activeWeek.goals.map((goal, gIdx) => (
              <div key={gIdx} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Checklist */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Danh Sách Nhiệm Vụ Cụ Thể:
          </h3>

          <div className="space-y-2.5">
            {activeWeek.tasks.map((task) => {
              const isTaskDone = completedTasks.includes(task.id);

              return (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    isTaskDone
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {isTaskDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    )}
                    <span className={`text-xs md:text-sm font-medium ${isTaskDone ? 'line-through opacity-80' : ''}`}>
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      task.type === 'theory' ? 'bg-sky-500/20 text-sky-300' :
                      task.type === 'hands_on' ? 'bg-purple-500/20 text-purple-300' :
                      task.type === 'project' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {task.type === 'theory' ? 'Lý Thuyết' :
                       task.type === 'hands_on' ? 'Thực Hành' :
                       task.type === 'project' ? 'Dự Án CV' : 'Luyện Đề'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {task.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Reset Progress Section (Safe footer) */}
      <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span>Dữ liệu học tập được tự động lưu an toàn trên trình duyệt của bạn.</span>
        <button
          onClick={() => {
            if (confirm('Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học tập không?')) {
              resetAllProgress();
            }
          }}
          className="flex items-center gap-1 text-slate-500 hover:text-red-400 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Đặt lại tiến độ</span>
        </button>
      </div>

    </div>
  );
};
