import React, { useState, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { QuizQuestion } from '../types';
import { getShuffledIndices } from '../utils/shuffle';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Languages
} from 'lucide-react';

export const ExamSimulatorView: React.FC = () => {
  const { saveQuizResult, recordQuizAnswer } = useLearning();
  const [selectedCert, setSelectedCert] = useState<string>('all');
  const [searchQuery] = useState<string>('');
  const [mode, setMode] = useState<'study' | 'exam'>('study');
  
  const [languageMode] = useState<'vi' | 'en' | 'random'>('random');
  const [individualQuestionLang, setIndividualQuestionLang] = useState<Record<string, 'vi' | 'en'>>({});

  const generateRandomPermutations = (questions: QuizQuestion[]) => {
    const map: Record<string, number[]> = {};
    questions.forEach(q => {
      map[q.id] = getShuffledIndices(q.options.length);
    });
    return map;
  };

  const [optionPermutations, setOptionPermutations] = useState<Record<string, number[]>>(() => 
    generateRandomPermutations(QUIZ_QUESTIONS)
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  const certFilters = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'SAA-C03', label: 'SAA-C03' },
    { id: 'SOA-C02', label: 'SOA-C02' },
    { id: 'DVA-C02', label: 'DVA-C02' },
    { id: 'SAP-C02', label: 'SAP-C02' },
    { id: 'CLF-C02', label: 'CLF-C02' },
  ];

  const filteredQuestions: QuizQuestion[] = QUIZ_QUESTIONS.filter(q => {
    const matchCert = selectedCert === 'all' || q.certCode === selectedCert;
    const matchQuery = q.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       (q.scenarioEn && q.scenarioEn.toLowerCase().includes(searchQuery.toLowerCase())) ||
                       q.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCert && matchQuery;
  });

  const activeQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];

  const getActiveLang = (questionId: string, index: number): 'vi' | 'en' => {
    if (individualQuestionLang[questionId]) {
      return individualQuestionLang[questionId];
    }
    if (languageMode === 'en') return 'en';
    if (languageMode === 'vi') return 'vi';
    return index % 2 === 1 ? 'en' : 'vi';
  };

  const currentLang = activeQuestion ? getActiveLang(activeQuestion.id, currentIndex) : 'vi';

  const toggleCurrentQuestionLang = () => {
    if (!activeQuestion) return;
    const nextLang = currentLang === 'vi' ? 'en' : 'vi';
    setIndividualQuestionLang(prev => ({
      ...prev,
      [activeQuestion.id]: nextLang
    }));
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (mode === 'exam' && !isExamCompleted) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mode, isExamCompleted]);

  const handleSelectOption = (originalId: string) => {
    if (isAnswerSubmitted && mode === 'study') return;
    setSelectedOptionId(originalId);
    
    if (mode === 'exam') {
      setUserAnswers(prev => ({
        ...prev,
        [activeQuestion.id]: originalId
      }));
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOptionId === activeQuestion.correctOptionId;
    recordQuizAnswer(isCorrect, activeQuestion.difficulty);

    const newAnswers = {
      ...userAnswers,
      [activeQuestion.id]: selectedOptionId
    };
    setUserAnswers(newAnswers);
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
    const targetQ = filteredQuestions[index];
    const savedAns = userAnswers[targetQ.id];
    if (savedAns) {
      setSelectedOptionId(savedAns);
      setIsAnswerSubmitted(mode === 'study');
    } else {
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      handleJumpToQuestion(currentIndex + 1);
    } else {
      setIsExamCompleted(true);
      let correct = 0;
      filteredQuestions.forEach(q => {
        if (userAnswers[q.id] === q.correctOptionId) {
          correct++;
        }
      });
      saveQuizResult(selectedCert, correct, filteredQuestions.length);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      handleJumpToQuestion(currentIndex - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsExamCompleted(false);
    setTimerSeconds(0);
    setOptionPermutations(generateRandomPermutations(QUIZ_QUESTIONS));
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!activeQuestion) {
    return (
      <div className="py-12 text-center text-slate-500 text-sm">
        Không tìm thấy câu hỏi phù hợp.
      </div>
    );
  }

  const displayedScenario = (currentLang === 'en' && activeQuestion.scenarioEn)
    ? activeQuestion.scenarioEn 
    : activeQuestion.scenario;

  const rawOptions = (currentLang === 'en' && activeQuestion.optionsEn)
    ? activeQuestion.optionsEn
    : activeQuestion.options || [];

  const displayedExplanation = (currentLang === 'en' && activeQuestion.explanationEn)
    ? activeQuestion.explanationEn
    : activeQuestion.explanation;

  const optionLabels = ['A', 'B', 'C', 'D', 'E'];
  const currentPermutation = (optionPermutations[activeQuestion.id]) 
    ? optionPermutations[activeQuestion.id]
    : rawOptions.map((_, i) => i);

  const displayedShuffledOptions = currentPermutation.slice(0, rawOptions.length).map((originalIdx, displayIdx) => {
    const orig = rawOptions[originalIdx] || rawOptions[displayIdx];
    return {
      newLetter: optionLabels[displayIdx],
      originalId: orig.id,
      text: orig.text
    };
  });

  return (
    <div className="space-y-6 text-slate-300">
      
      {/* Minimal Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
        
        {/* Cert Selector */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {certFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => { setSelectedCert(f.id); handleRestartQuiz(); }}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedCert === f.id
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tools (Mode, Lang, Search) */}
        <div className="flex items-center gap-2">
          
          {/* Mode switch */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => { setMode('study'); handleRestartQuiz(); }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                mode === 'study' ? 'bg-slate-800 text-amber-300' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Ôn Luyện
            </button>
            <button
              onClick={() => { setMode('exam'); handleRestartQuiz(); }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                mode === 'exam' ? 'bg-slate-800 text-amber-300' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Thi Thử {mode === 'exam' && `(${formatTimer(timerSeconds)})`}
            </button>
          </div>

          {/* Lang toggle icon */}
          <button
            onClick={toggleCurrentQuestionLang}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer flex items-center gap-1 font-mono text-[11px]"
            title="Đổi ngôn ngữ câu hỏi (VI / EN)"
          >
            <Languages className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentLang.toUpperCase()}</span>
          </button>

          {/* Reset icon */}
          <button
            onClick={handleRestartQuiz}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Làm lại từ đầu"
            aria-label="Làm lại từ đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Question Book Layout */}
      <div className="space-y-6">
        
        {/* Question Metadata & Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-amber-400 font-semibold">
              Câu {currentIndex + 1} / {filteredQuestions.length} • {activeQuestion.certCode}
            </span>
            <span>Độ khó: {activeQuestion.difficulty}</span>
          </div>

          <div className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
            {displayedScenario}
          </div>
        </div>

        {/* 4 Clean Options */}
        <div className="space-y-2.5">
          {displayedShuffledOptions.map((opt) => {
            const isSelected = selectedOptionId === opt.originalId;
            const isCorrect = opt.originalId === activeQuestion.correctOptionId;

            let optionStyle = 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300';
            if (isAnswerSubmitted && mode === 'study') {
              if (isCorrect) {
                optionStyle = 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200 font-medium';
              } else if (isSelected) {
                optionStyle = 'bg-red-950/40 border-red-800/80 text-red-200';
              }
            } else if (isSelected) {
              optionStyle = 'bg-slate-800 border-amber-500/80 text-amber-200 font-medium';
            }

            return (
              <div
                key={opt.originalId}
                onClick={() => handleSelectOption(opt.originalId)}
                className={`p-3.5 rounded-lg border transition-colors cursor-pointer flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${optionStyle}`}
              >
                <span className="font-mono font-bold text-slate-400 w-5 flex-shrink-0 mt-0.5">
                  {opt.newLetter}.
                </span>
                <span className="flex-1">{opt.text}</span>
              </div>
            );
          })}
        </div>

        {/* Action Bar (Prev, Next, Submit) */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
          <button
            onClick={handlePrevQuestion}
            disabled={currentIndex === 0}
            className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Câu trước"
            aria-label="Câu trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {mode === 'study' && !isAnswerSubmitted && selectedOptionId && (
            <button
              onClick={handleSubmitAnswer}
              className="px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold transition-colors cursor-pointer"
            >
              Kiểm tra đáp án
            </button>
          )}

          <button
            onClick={handleNextQuestion}
            className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Câu tiếp theo"
            aria-label="Câu tiếp theo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Solution & Explanation Note (Book format) */}
        {isAnswerSubmitted && mode === 'study' && (
          <div className="border-l-2 border-slate-700 pl-4 py-2 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="font-semibold text-slate-100 flex items-center gap-2">
              {selectedOptionId === activeQuestion.correctOptionId ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Đúng
                </span>
              ) : (
                <span className="text-red-400 flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> Chưa chính xác
                </span>
              )}
            </div>

            <p className="leading-relaxed">{displayedExplanation.whyCorrect}</p>

            {displayedExplanation.examTip && (
              <div className="text-slate-400 italic pt-1">
                <strong>Mẹo:</strong> {displayedExplanation.examTip}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
