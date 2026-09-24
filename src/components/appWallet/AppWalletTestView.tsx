import React, { useState } from 'react';
import { APP_WALLET_QUIZ_DATA } from '../../data/appWallet/appWalletQuizData';
import { APP_WALLET_FLASHCARDS } from '../../data/appWallet/appWalletFlashcardsData';
import { 
  HelpCircle, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Zap
} from 'lucide-react';

export const AppWalletTestView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'flashcards'>('quiz');

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentQuiz = APP_WALLET_QUIZ_DATA[currentQuizIndex];
  const currentCard = APP_WALLET_FLASHCARDS[cardIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === currentQuiz.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < APP_WALLET_QUIZ_DATA.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Zap className="w-3.5 h-3.5" /> Luyện Thi & Củng Cố
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Kiểm Tra Kiến Thức JohnnyHoang App Wallet
            </h1>
          </div>

          <div className="flex items-center bg-slate-900 p-1.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'quiz'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Trắc Nghiệm ({APP_WALLET_QUIZ_DATA.length})
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'flashcards'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Thẻ Ghi Nhớ ({APP_WALLET_FLASHCARDS.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Quiz Mode */}
        {activeTab === 'quiz' && (
          <div className="mt-8">
            {!quizFinished ? (
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-mono">
                  <span>Câu {currentQuizIndex + 1} / {APP_WALLET_QUIZ_DATA.length}</span>
                  <span>Điểm hiện tại: {score}</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mb-8">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${((currentQuizIndex + 1) / APP_WALLET_QUIZ_DATA.length) * 100}%` }}
                  />
                </div>

                {/* Scenario badge */}
                {currentQuiz.scenario && (
                  <div className="mb-4 px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span><strong>Tình huống:</strong> {currentQuiz.scenario}</span>
                  </div>
                )}

                {/* Question */}
                <h2 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
                  {currentQuiz.question}
                </h2>

                {/* Options */}
                <div className="space-y-2.5 mb-8">
                  {currentQuiz.options.map((opt, idx) => {
                    let btnStyle = 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-slate-600';
                    
                    if (selectedAnswer === idx) {
                      btnStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-300';
                    }

                    if (isAnswerSubmitted) {
                      if (idx === currentQuiz.correctAnswerIndex) {
                        btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (selectedAnswer === idx) {
                        btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                      } else {
                        btnStyle = 'bg-slate-950/30 border-slate-900 text-slate-600 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded bg-slate-900 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-slate-800">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswerSubmitted && (
                  <div className={`p-4 rounded-lg mb-6 border ${
                    selectedAnswer === currentQuiz.correctAnswerIndex
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  }`}>
                    <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                      {selectedAnswer === currentQuiz.correctAnswerIndex ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Chính xác!
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          Chưa chính xác!
                        </>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentQuiz.explanation}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className={`px-5 py-2 rounded-lg font-bold text-xs transition-all ${
                        selectedAnswer !== null
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Xác Nhận Câu Trả Lời
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                    >
                      {currentQuizIndex < APP_WALLET_QUIZ_DATA.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-8 text-center max-w-lg mx-auto">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Hoàn Thành Bài Kiểm Tra!</h2>
                <p className="text-slate-400 text-xs mb-6">
                  Bạn đã trả lời đúng <strong className="text-emerald-400">{score}</strong> / {APP_WALLET_QUIZ_DATA.length} câu hỏi.
                </p>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
                  <div 
                    className="bg-emerald-500 h-full"
                    style={{ width: `${(score / APP_WALLET_QUIZ_DATA.length) * 100}%` }}
                  />
                </div>
                <button
                  onClick={handleRestartQuiz}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-all flex items-center justify-center gap-2 mx-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Làm Lại Bài Test
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Flashcards Mode */}
        {activeTab === 'flashcards' && (
          <div className="mt-8 max-w-xl mx-auto">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-mono">
              <span className="px-2 py-0.5 bg-slate-900 rounded text-emerald-400 border border-slate-800">
                {currentCard.category}
              </span>
              <span>Thẻ {cardIndex + 1} / {APP_WALLET_FLASHCARDS.length}</span>
            </div>

            {/* Flip Card Container */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[240px] bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-6 cursor-pointer transition-all flex flex-col justify-between shadow-xl relative group"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{isFlipped ? 'Mặt Sau (Định nghĩa & Cấu trúc)' : 'Mặt Trước (Thuật ngữ)'}</span>
                <span className="text-emerald-400 group-hover:underline">Chạm để lật ↺</span>
              </div>

              <div className="my-auto py-4 text-center">
                {!isFlipped ? (
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {currentCard.term}
                  </h3>
                ) : (
                  <div className="text-left space-y-3">
                    <p className="text-slate-200 text-sm leading-relaxed">
                      {currentCard.definition}
                    </p>
                    {currentCard.exampleOrFormula && (
                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-emerald-400 font-mono block mb-0.5">Cấu trúc:</span>
                        <code className="text-[11px] text-emerald-300 font-mono break-all">{currentCard.exampleOrFormula}</code>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="text-center text-[10px] text-slate-600 font-mono">
                {isFlipped ? 'Nhấp chuột để xem lại thuật ngữ' : 'Nhấp chuột để xem giải nghĩa chi tiết'}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-5">
              <button
                onClick={() => {
                  if (cardIndex > 0) {
                    setCardIndex(prev => prev - 1);
                    setIsFlipped(false);
                  }
                }}
                disabled={cardIndex === 0}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs border border-slate-800 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Thẻ Trước
              </button>
              <button
                onClick={() => {
                  if (cardIndex < APP_WALLET_FLASHCARDS.length - 1) {
                    setCardIndex(prev => prev + 1);
                    setIsFlipped(false);
                  }
                }}
                disabled={cardIndex === APP_WALLET_FLASHCARDS.length - 1}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs border border-slate-800 flex items-center gap-1.5"
              >
                Thẻ Tiếp Theo <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppWalletTestView;
