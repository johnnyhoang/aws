import React, { useState, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  Lightbulb,
  Check,
  ShieldCheck,
  Search,
  Filter,
  Clock,
  BookOpen,
  Languages,
  Shuffle
} from 'lucide-react';

export const ExamSimulatorView: React.FC = () => {
  const { saveQuizResult } = useLearning();
  const [selectedCert, setSelectedCert] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mode, setMode] = useState<'study' | 'exam'>('study'); // Study (Instant feedback) vs Exam (Timed)
  
  // Language settings: 'vi' | 'en' | 'random'
  const [languageMode, setLanguageMode] = useState<'vi' | 'en' | 'random'>('random');
  const [individualQuestionLang, setIndividualQuestionLang] = useState<Record<string, 'vi' | 'en'>>({});

  // Dynamic option shuffling map per question: { [questionId]: [permuted_indices] }
  const [optionPermutations, setOptionPermutations] = useState<Record<string, number[]>>({});

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  const certFilters = [
    { id: 'all', label: 'Tất Cả Bộ Đề' },
    { id: 'SAA-C03', label: 'SAA-C03 (Solutions Architect)' },
    { id: 'SOA-C02', label: 'SOA-C02 (SysOps Admin)' },
    { id: 'DVA-C02', label: 'DVA-C02 (Developer)' },
    { id: 'SAP-C02', label: 'SAP-C02 (Architect Pro)' },
    { id: 'CLF-C02', label: 'CLF-C02 (Cloud Practitioner)' },
  ];

  const difficultyFilters = [
    { id: 'all', label: 'Mọi Độ Khó' },
    { id: 'Cơ bản', label: 'Cơ bản' },
    { id: 'Trung bình', label: 'Trung bình' },
    { id: 'Khó', label: 'Khó' },
    { id: 'Chuyên gia', label: 'Chuyên gia' },
  ];

  // Helper function to generate randomized option order for all questions
  const generateRandomPermutations = (questions: QuizQuestion[]) => {
    const map: Record<string, number[]> = {};
    questions.forEach(q => {
      const len = q.options.length;
      const indices = Array.from({ length: len }, (_, i) => i);
      // Fisher-Yates shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      map[q.id] = indices;
    });
    return map;
  };

  // Initialize random option order on component mount
  useEffect(() => {
    setOptionPermutations(generateRandomPermutations(QUIZ_QUESTIONS));
  }, []);

  const filteredQuestions: QuizQuestion[] = QUIZ_QUESTIONS.filter(q => {
    const matchCert = selectedCert === 'all' || q.certCode === selectedCert;
    const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchQuery = q.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       (q.scenarioEn && q.scenarioEn.toLowerCase().includes(searchQuery.toLowerCase())) ||
                       q.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCert && matchDiff && matchQuery;
  });

  const activeQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Determine language for the current question
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

  // Timer in exam mode
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
    
    // In exam mode, save answer immediately
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

    const newAnswers = {
      ...userAnswers,
      [activeQuestion.id]: selectedOptionId
    };
    setUserAnswers(newAnswers);

    if (selectedOptionId === activeQuestion.correctOptionId) {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
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
      // Completed all
      setIsExamCompleted(true);
      let correct = 0;
      filteredQuestions.forEach(q => {
        if (userAnswers[q.id] === q.correctOptionId) {
          correct++;
        }
      });
      saveQuizResult(selectedCert, correct, filteredQuestions.length);

      if (correct / filteredQuestions.length >= 0.7) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      handleJumpToQuestion(currentIndex - 1);
    }
  };

  const handleRestartQuiz = () => {
    // Freshly reshuffle all options and reset state
    setOptionPermutations(generateRandomPermutations(QUIZ_QUESTIONS));
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsExamCompleted(false);
    setTimerSeconds(0);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate stats
  let totalCorrect = 0;
  Object.keys(userAnswers).forEach(qId => {
    const q = QUIZ_QUESTIONS.find(item => item.id === qId);
    if (q && userAnswers[qId] === q.correctOptionId) {
      totalCorrect++;
    }
  });

  // Display scenario and raw options based on language
  const displayedScenario = (currentLang === 'en' && activeQuestion?.scenarioEn) 
    ? activeQuestion.scenarioEn 
    : activeQuestion?.scenario;

  const rawOptions = (currentLang === 'en' && activeQuestion?.optionsEn)
    ? activeQuestion.optionsEn
    : activeQuestion?.options || [];

  const displayedExplanation = (currentLang === 'en' && activeQuestion?.explanationEn)
    ? activeQuestion.explanationEn
    : activeQuestion?.explanation;

  // Build the shuffled option list with new clean labels A, B, C, D
  const optionLabels = ['A', 'B', 'C', 'D', 'E'];
  const currentPermutation = (activeQuestion && optionPermutations[activeQuestion.id]) 
    ? optionPermutations[activeQuestion.id]
    : rawOptions.map((_, i) => i);

  const displayedShuffledOptions = currentPermutation.slice(0, rawOptions.length).map((originalIdx, displayIdx) => {
    const orig = rawOptions[originalIdx] || rawOptions[displayIdx];
    return {
      newLetter: optionLabels[displayIdx], // Clean A, B, C, D
      originalId: orig.id,                 // Original dataset ID
      text: orig.text
    };
  });

  // Find the new letter for the correct answer
  const correctDisplayedLetter = displayedShuffledOptions.find(
    opt => opt.originalId === activeQuestion?.correctOptionId
  )?.newLetter || activeQuestion?.correctOptionId;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6 md:space-y-8 text-slate-100">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Ngân Hàng Đề Thi Song Ngữ (Tự Động Xáo Đáp Án Ngẫu Nhiên)
          </div>
          <h1 className="text-xl md:text-3xl font-extrabold text-white">
            Trình Luyện Thi & Giải Tình Huống AWS
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Đáp án A, B, C, D được xáo trộn ngẫu nhiên 100% mỗi lượt làm bài để rèn luyện phản xạ thực tế.
          </p>
        </div>

        {/* Mode & Reshuffle Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRestartQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all shadow-sm"
            title="Xáo trộn lại toàn bộ thứ tự câu hỏi và đáp án A, B, C, D"
          >
            <Shuffle className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Xáo Lại Đáp Án</span>
          </button>

          <div className="bg-slate-900 p-1 rounded-xl border border-slate-700 flex items-center gap-1">
            <button
              onClick={() => { setMode('study'); handleRestartQuiz(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                mode === 'study' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ôn Luyện</span>
            </button>
            <button
              onClick={() => { setMode('exam'); handleRestartQuiz(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                mode === 'exam' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Thi Thử</span>
            </button>
          </div>
        </div>
      </div>

      {/* Language Selector Bar & Filters */}
      <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Language Mode Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-amber-400" /> Ngôn Ngữ:
            </span>
            <div className="bg-slate-950 p-0.5 rounded-xl border border-slate-800 flex items-center gap-0.5">
              <button
                onClick={() => setLanguageMode('vi')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  languageMode === 'vi' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🇻🇳 Tiếng Việt</span>
              </button>
              <button
                onClick={() => setLanguageMode('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  languageMode === 'en' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🇺🇸 English</span>
              </button>
              <button
                onClick={() => setLanguageMode('random')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  languageMode === 'random' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tự động xáo ngẫu nhiên câu tiếng Anh và tiếng Việt"
              >
                <Shuffle className="w-3 h-3" />
                <span>Xáo Trộn (VI/EN)</span>
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentIndex(0); }}
              placeholder="Tìm kiếm câu hỏi..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Cert Selector Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-800/80">
          {certFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => { setSelectedCert(f.id); handleRestartQuiz(); }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCert === f.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty & Timer Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Độ khó:
          </span>
          {difficultyFilters.map((d) => (
            <button
              key={d.id}
              onClick={() => { setSelectedDifficulty(d.id); handleRestartQuiz(); }}
              className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                selectedDifficulty === d.id
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {mode === 'exam' && (
          <div className="flex items-center gap-1.5 font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>Thời gian: {formatTimer(timerSeconds)}</span>
          </div>
        )}
      </div>

      {/* Question Number Quick Jump Grid */}
      {filteredQuestions.length > 0 && (
        <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Danh sách ({filteredQuestions.length} câu):</span>
            <span className="text-amber-400 font-bold">Đã làm: {Object.keys(userAnswers).length}/{filteredQuestions.length}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filteredQuestions.map((q, idx) => {
              const isAnswered = !!userAnswers[q.id];
              const isCorrect = userAnswers[q.id] === q.correctOptionId;
              const isCurrent = currentIndex === idx;

              let btnStyle = 'bg-slate-800 text-slate-400 border-slate-700';
              if (isCurrent) {
                btnStyle = 'bg-amber-500 text-slate-950 font-black ring-2 ring-amber-400';
              } else if (isAnswered) {
                if (mode === 'study') {
                  btnStyle = isCorrect ? 'bg-emerald-900/60 text-emerald-300 border-emerald-500/50' : 'bg-red-900/60 text-red-300 border-red-500/50';
                } else {
                  btnStyle = 'bg-sky-900/60 text-sky-300 border-sky-500/50';
                }
              }

              return (
                <button
                  key={q.id}
                  onClick={() => handleJumpToQuestion(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold border flex items-center justify-center transition-all ${btnStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Quiz Card */}
      {!isExamCompleted && activeQuestion ? (
        <div className="bg-slate-900 rounded-3xl border border-slate-700/80 p-6 md:p-8 space-y-6 shadow-2xl">
          
          {/* Header of Question with Language Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-400 uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                {activeQuestion.certCode}
              </span>
              <span className="font-semibold text-slate-300">Chủ đề: {activeQuestion.category}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Quick Language Toggle Button for Current Question */}
              <button
                onClick={toggleCurrentQuestionLang}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
                title="Chuyển đổi giữa Tiếng Việt và Tiếng Anh cho câu hỏi này"
              >
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentLang === 'vi' ? '🇻🇳 Tiếng Việt' : '🇺🇸 English'}</span>
                <span className="text-[10px] text-sky-400 ml-0.5">(Đổi)</span>
              </button>

              <span className="font-bold text-slate-200">
                Câu {currentIndex + 1} / {filteredQuestions.length}
              </span>
            </div>
          </div>

          {/* Scenario Text */}
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
              {displayedScenario}
            </h3>
          </div>

          {/* Shuffled Options (A, B, C, D) */}
          <div className="space-y-3 pt-2">
            {displayedShuffledOptions.map((opt) => {
              const isSelected = selectedOptionId === opt.originalId || userAnswers[activeQuestion.id] === opt.originalId;
              const isCorrect = opt.originalId === activeQuestion.correctOptionId;
              
              let optionStyle = 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-200';
              
              if (isAnswerSubmitted && mode === 'study') {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-red-950/40 border-red-500 text-red-200 ring-1 ring-red-500';
                } else {
                  optionStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-amber-500/15 border-amber-500 text-amber-300 ring-1 ring-amber-500';
              }

              return (
                <div
                  key={opt.newLetter}
                  onClick={() => handleSelectOption(opt.originalId)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${optionStyle}`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isAnswerSubmitted && mode === 'study' && isCorrect ? 'bg-emerald-500 text-slate-950' :
                    isAnswerSubmitted && mode === 'study' && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {isAnswerSubmitted && mode === 'study' && isCorrect ? <Check className="w-4 h-4" /> :
                     isAnswerSubmitted && mode === 'study' && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
                     opt.newLetter}
                  </div>
                  <span className="text-xs md:text-sm leading-relaxed">{opt.text}</span>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={handlePrevQuestion}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Câu Trước</span>
            </button>

            {mode === 'study' && !isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20 transition-all"
              >
                <span>Kiểm Tra Lời Giải</span>
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold shadow-lg shadow-sky-500/20 transition-all"
              >
                <span>{currentIndex < filteredQuestions.length - 1 ? 'Câu Tiếp Theo' : 'Nộp Bài & Xem Tổng Kết'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Detailed Explanation with mapped correct letter */}
          {mode === 'study' && isAnswerSubmitted && displayedExplanation && (
            <div className="space-y-4 pt-4 border-t border-slate-800 animate-fadeIn">
              
              {/* Correct / Incorrect Header */}
              <div className={`p-4 rounded-xl flex items-center gap-3 ${
                selectedOptionId === activeQuestion.correctOptionId
                  ? 'bg-emerald-950/30 border border-emerald-500/40 text-emerald-300'
                  : 'bg-red-950/30 border border-red-500/40 text-red-300'
              }`}>
                {selectedOptionId === activeQuestion.correctOptionId ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs md:text-sm font-bold">
                      {currentLang === 'vi' ? `Chính xác! Đáp án đúng là ${correctDisplayedLetter}.` : `Correct! The correct option is ${correctDisplayedLetter}.`}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-xs md:text-sm font-bold">
                      {currentLang === 'vi' ? `Chưa chính xác! Đáp án đúng là ${correctDisplayedLetter}.` : `Incorrect! The correct option is ${correctDisplayedLetter}.`}
                    </span>
                  </>
                )}
              </div>

              {/* Why Correct */}
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  {currentLang === 'vi' ? 'Giải Thích Chi Tiết Tại Sao Đúng:' : 'Detailed Explanation (Why Correct):'}
                </div>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {displayedExplanation.whyCorrect}
                </p>
              </div>

              {/* Why Others Incorrect with re-mapped letters */}
              <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/80 space-y-3">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  {currentLang === 'vi' ? 'Tại Sao Các Phương Án Khác Sai:' : 'Why Other Options Are Incorrect:'}
                </div>
                <div className="space-y-2">
                  {displayedExplanation.whyOthersIncorrect.map((item, idx) => {
                    const currentLetter = displayedShuffledOptions.find(o => o.originalId === item.optionId)?.newLetter || item.optionId;
                    return (
                      <div key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                        <strong className="text-red-400 font-mono">
                          {currentLang === 'vi' ? `Phương án ${currentLetter}:` : `Option ${currentLetter}:`}
                        </strong>
                        <span>{item.reason}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Exam Tip */}
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs md:text-sm text-amber-200 leading-relaxed">
                  <strong>{currentLang === 'vi' ? 'Mẹo Thi Cốt Lõi:' : 'Core Exam Tip:'}</strong> {displayedExplanation.examTip}
                </div>
              </div>

            </div>
          )}

        </div>
      ) : isExamCompleted ? (
        /* Exam Summary Screen */
        <div className="bg-slate-900 rounded-3xl border border-slate-700 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8 text-amber-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">Kết Quả Bài Thi Thử</h2>
            <p className="text-sm text-slate-400">
              Bạn đã hoàn thành {filteredQuestions.length} câu hỏi trong thời gian {formatTimer(timerSeconds)}.
            </p>
          </div>

          <div className="bg-slate-800/80 max-w-sm mx-auto p-6 rounded-2xl border border-slate-700 space-y-3">
            <div className="text-4xl font-black text-amber-400">
              {totalCorrect} / {filteredQuestions.length}
            </div>
            <div className="text-sm font-semibold text-slate-300">
              Tỷ lệ chính xác: {Math.round((totalCorrect / filteredQuestions.length) * 100)}%
            </div>
            <div className="text-xs text-slate-400">
              {totalCorrect / filteredQuestions.length >= 0.72 
                ? '🎉 Xuất sắc! Điểm số này tương đương mức điểm ĐỖ (> 720/1000) của kỳ thi AWS chính thức.' 
                : 'Cần ôn lại các phần còn yếu trong mục Chuyên Đề Kỹ Năng để đạt trên 75% nhé!'}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm Lại Đề Thi</span>
            </button>
            <button
              onClick={() => { setMode('study'); handleRestartQuiz(); }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Xem Lại Từng Lời Giải Chi Tiết</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center text-slate-400 text-xs">
          Không tìm thấy câu hỏi phù hợp với bộ lọc hiện tại. Vui lòng chọn lại bộ lọc.
        </div>
      )}

    </div>
  );
};
