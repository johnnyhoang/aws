import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CareerTrack, UserLevelInfo } from '../types';
import { calculateUserLevel } from '../data/maturityLevels';

export interface UserProfile {
  email: string;
  name: string;
  careerTrack: CareerTrack;
}

export type PortalMode = 'fundamentals' | 'aws';

interface LearningState {
  portalMode: PortalMode;
  currentTrack: CareerTrack;
  completedStages: string[];
  completedLessons: string[];
  completedProjects: string[];
  completedTasks: string[];
  bookmarkedLessons: string[];
  flashcardsMastered: string[];
  quizScores: Record<string, { score: number; total: number; date: string }>;
  studyHoursLogged: number;
  
  // Gamification & AWS Maturity State
  userXP: number;
  userPoints: number;
  currentStreak: number;
  highestStreak: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;

  // User & Cloud Sync State
  userProfile: UserProfile | null;
  syncStatus: 'synced' | 'syncing' | 'offline' | 'unsaved';
  lastSyncedAt: string | null;

  // Accessibility & Reading Mode State
  fontSizeScale: number; // 100% to 220%
  isReadingMode: boolean;
}

export interface QuizAnswerFeedback {
  pointsDelta: number;
  xpDelta: number;
  isStreakBonus: boolean;
  currentStreak: number;
  newPoints: number;
  newXP: number;
}

interface LearningContextType extends LearningState {
  levelInfo: UserLevelInfo;
  setPortalMode: (mode: PortalMode) => void;
  setTrack: (track: CareerTrack) => void;
  toggleStageCompleted: (stageId: string) => void;
  toggleStageCompletion: (stageId: string) => void;
  toggleLessonCompleted: (lessonId: string) => void;
  toggleLessonCompletion: (lessonId: string) => void;
  toggleProjectCompleted: (projectId: string) => void;
  toggleProjectCompletion: (projectId: string) => void;
  toggleTaskCompleted: (taskId: string) => void;
  toggleLessonBookmark: (lessonId: string) => void;
  toggleFlashcardMastered: (cardId: string) => void;
  saveQuizResult: (quizKey: string, score: number, total: number) => void;
  logStudyHours: (hours: number) => void;
  addStudyHours: (hours: number) => void;
  recordQuizAnswer: (isCorrect: boolean, difficulty: string) => QuizAnswerFeedback;
  addBonusXP: (xp: number, points?: number) => void;
  loginUser: (email: string, name?: string) => Promise<boolean>;
  logoutUser: () => void;
  forceSyncNow: () => Promise<void>;
  resetAllProgress: () => void;

  // Accessibility actions
  setFontSizeScale: (scale: number) => void;
  toggleReadingMode: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const STORAGE_KEY = 'aws_cloud_mastery_learning_state_v3';

const defaultState: LearningState = {
  portalMode: 'fundamentals',
  currentTrack: 'cloud_engineer',
  completedStages: [],
  completedLessons: ['networking-security-core'],
  completedProjects: [],
  completedTasks: ['t1-1'],
  bookmarkedLessons: [],
  flashcardsMastered: ['fc-1'],
  quizScores: {},
  studyHoursLogged: 8,
  userXP: 450,
  userPoints: 320,
  currentStreak: 2,
  highestStreak: 5,
  totalCorrectAnswers: 12,
  totalIncorrectAnswers: 3,
  userProfile: null,
  syncStatus: 'synced',
  lastSyncedAt: null,
  fontSizeScale: 100,
  isReadingMode: false
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<LearningState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
      // Migrate from v2 if available
      const oldV2 = localStorage.getItem('aws_cloud_mastery_learning_state_v2');
      if (oldV2) {
        return { ...defaultState, ...JSON.parse(oldV2) };
      }
    } catch {
      // Use defaults if storage unavailable
    }
    return defaultState;
  });

  // Calculate dynamic user maturity level
  const levelInfo = calculateUserLevel(state.userXP);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

  // Apply font size scale, inverse space compression, and reading mode class to document
  useEffect(() => {
    try {
      const root = document.documentElement;
      const basePx = 16;
      const scale = state.fontSizeScale || 100;
      const scaledPx = (scale / 100) * basePx;
      root.style.fontSize = `${scaledPx}px`;

      // Dynamic Inverse Spacing Calculation:
      // When font size increases, we compress base spacing so padding/margins shrink in pixels,
      // allocating maximum horizontal and vertical space for large text.
      // scale 100: compressionFactor = 1.00 -> spacing = 4.0px
      // scale 120: compressionFactor = 0.85 -> spacing = 3.4px
      // scale 140: compressionFactor = 0.70 -> spacing = 2.8px
      // scale 165: compressionFactor = 0.55 -> spacing = 2.2px
      // scale 190: compressionFactor = 0.42 -> spacing = 1.7px
      // scale 220: compressionFactor = 0.32 -> spacing = 1.3px
      const scaleRatio = scale / 100;
      const compressionFactor = Math.max(0.32, Math.min(1.0, 1 - (scale - 100) * 0.0057));
      const targetSpacingPx = 4 * compressionFactor;

      root.style.setProperty('--font-scale', `${scaleRatio}`);
      root.style.setProperty('--spacing', `${targetSpacingPx.toFixed(2)}px`);
      root.style.setProperty('--spacing-compression', `${compressionFactor.toFixed(3)}`);

      // Add zoom state classes to body for responsive layout compression
      if (scale > 115) {
        document.body.classList.add('font-zoomed-active');
      } else {
        document.body.classList.remove('font-zoomed-active');
      }

      if (scale >= 140) {
        document.body.classList.add('font-zoomed-medium');
      } else {
        document.body.classList.remove('font-zoomed-medium');
      }

      if (scale >= 165) {
        document.body.classList.add('font-zoomed-large');
      } else {
        document.body.classList.remove('font-zoomed-large');
      }

      if (scale >= 190) {
        document.body.classList.add('font-zoomed-huge');
      } else {
        document.body.classList.remove('font-zoomed-huge');
      }

      if (state.isReadingMode) {
        document.body.classList.add('reading-mode-active');
      } else {
        document.body.classList.remove('reading-mode-active');
      }
    } catch {
      // Ignore DOM errors
    }
  }, [state.fontSizeScale, state.isReadingMode]);

  // Server Synchronization function
  const syncWithCloud = useCallback(async (currentState: LearningState) => {
    if (!currentState.userProfile?.email) return;

    setState(prev => ({ ...prev, syncStatus: 'syncing' }));

    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentState.userProfile.email,
          progress: {
            currentTrack: currentState.currentTrack,
            completedStages: currentState.completedStages,
            completedLessons: currentState.completedLessons,
            completedProjects: currentState.completedProjects,
            completedTasks: currentState.completedTasks,
            bookmarkedLessons: currentState.bookmarkedLessons,
            flashcardsMastered: currentState.flashcardsMastered,
            quizScores: currentState.quizScores,
            studyHoursLogged: currentState.studyHoursLogged,
            userXP: currentState.userXP,
            userPoints: currentState.userPoints,
            currentStreak: currentState.currentStreak,
            highestStreak: currentState.highestStreak,
            totalCorrectAnswers: currentState.totalCorrectAnswers,
            totalIncorrectAnswers: currentState.totalIncorrectAnswers
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.progress) {
          const p = data.progress;
          setState(prev => ({
            ...prev,
            currentTrack: p.currentTrack || prev.currentTrack,
            completedStages: p.completedStages || prev.completedStages,
            completedLessons: p.completedLessons || prev.completedLessons,
            completedProjects: p.completedProjects || prev.completedProjects,
            completedTasks: p.completedTasks || prev.completedTasks,
            bookmarkedLessons: p.bookmarkedLessons || prev.bookmarkedLessons,
            flashcardsMastered: p.flashcardsMastered || prev.flashcardsMastered,
            quizScores: p.quizScores || prev.quizScores,
            studyHoursLogged: p.studyHoursLogged ?? prev.studyHoursLogged,
            userXP: p.userXP ?? prev.userXP,
            userPoints: p.userPoints ?? prev.userPoints,
            currentStreak: p.currentStreak ?? prev.currentStreak,
            highestStreak: p.highestStreak ?? prev.highestStreak,
            totalCorrectAnswers: p.totalCorrectAnswers ?? prev.totalCorrectAnswers,
            totalIncorrectAnswers: p.totalIncorrectAnswers ?? prev.totalIncorrectAnswers,
            syncStatus: 'synced',
            lastSyncedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          }));
          return;
        }
      }
      setState(prev => ({ ...prev, syncStatus: 'unsaved' }));
    } catch {
      setState(prev => ({ ...prev, syncStatus: 'offline' }));
    }
  }, []);

  // Debounced auto-sync when state changes
  useEffect(() => {
    if (!state.userProfile?.email) return;

    const timer = setTimeout(() => {
      syncWithCloud(state);
    }, 2000);

    return () => clearTimeout(timer);
  }, [state, syncWithCloud]);

  // Record Quiz Answer (Intelligent XP, Points, Streak & Penalty Engine)
  const recordQuizAnswer = (isCorrect: boolean, difficulty: string): QuizAnswerFeedback => {
    let xpGain = 0;
    let pointsChange = 0;
    let newStreak = 0;
    let streakBonus = false;

    // Base values per difficulty
    let baseXP = 20;
    let basePoints = 20;
    let penaltyPoints = 10;

    switch (difficulty) {
      case 'Cơ bản':
        baseXP = 15;
        basePoints = 15;
        penaltyPoints = 5;
        break;
      case 'Trung bình':
        baseXP = 25;
        basePoints = 25;
        penaltyPoints = 10;
        break;
      case 'Khó':
        baseXP = 40;
        basePoints = 40;
        penaltyPoints = 15;
        break;
      case 'Chuyên gia':
        baseXP = 60;
        basePoints = 60;
        penaltyPoints = 20;
        break;
    }

    if (isCorrect) {
      newStreak = state.currentStreak + 1;
      // Streak Multiplier bonus: +5 bonus points per streak
      const bonusMultiplier = Math.min(25, newStreak * 5);
      if (newStreak >= 3) {
        streakBonus = true;
      }
      pointsChange = basePoints + bonusMultiplier;
      xpGain = baseXP + Math.floor(bonusMultiplier / 2);
    } else {
      newStreak = 0; // Reset streak on error
      pointsChange = -penaltyPoints; // Fair penalty deduction
      xpGain = 0; // No XP gain on failure
    }

    let nextXP = state.userXP;
    let nextPoints = state.userPoints;

    setState(prev => {
      nextXP = prev.userXP + xpGain;
      nextPoints = Math.max(0, prev.userPoints + pointsChange);
      return {
        ...prev,
        userXP: nextXP,
        userPoints: nextPoints,
        currentStreak: newStreak,
        highestStreak: Math.max(prev.highestStreak, newStreak),
        totalCorrectAnswers: prev.totalCorrectAnswers + (isCorrect ? 1 : 0),
        totalIncorrectAnswers: prev.totalIncorrectAnswers + (isCorrect ? 0 : 1)
      };
    });

    return {
      pointsDelta: pointsChange,
      xpDelta: xpGain,
      isStreakBonus: streakBonus,
      currentStreak: newStreak,
      newPoints: nextPoints,
      newXP: nextXP
    };
  };

  const addBonusXP = (xp: number, points?: number) => {
    setState(prev => ({
      ...prev,
      userXP: prev.userXP + xp,
      userPoints: prev.userPoints + (points ?? xp)
    }));
  };

  const loginUser = async (email: string, name?: string): Promise<boolean> => {
    setState(prev => ({ ...prev, syncStatus: 'syncing' }));
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          careerTrack: state.currentTrack
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          const profile: UserProfile = {
            email: data.user.email,
            name: data.user.name,
            careerTrack: data.user.careerTrack
          };

          const p = data.progress;
          setState(prev => ({
            ...prev,
            userProfile: profile,
            currentTrack: p?.currentTrack || prev.currentTrack,
            completedStages: p?.completedStages?.length ? p.completedStages : prev.completedStages,
            completedLessons: p?.completedLessons?.length ? p.completedLessons : prev.completedLessons,
            completedProjects: p?.completedProjects?.length ? p.completedProjects : prev.completedProjects,
            completedTasks: p?.completedTasks?.length ? p.completedTasks : prev.completedTasks,
            bookmarkedLessons: p?.bookmarkedLessons?.length ? p.bookmarkedLessons : prev.bookmarkedLessons,
            flashcardsMastered: p?.flashcardsMastered?.length ? p.flashcardsMastered : prev.flashcardsMastered,
            quizScores: p?.quizScores && Object.keys(p.quizScores).length ? p.quizScores : prev.quizScores,
            studyHoursLogged: p?.studyHoursLogged ? Math.max(p.studyHoursLogged, prev.studyHoursLogged) : prev.studyHoursLogged,
            userXP: p?.userXP ?? prev.userXP,
            userPoints: p?.userPoints ?? prev.userPoints,
            currentStreak: p?.currentStreak ?? prev.currentStreak,
            highestStreak: p?.highestStreak ?? prev.highestStreak,
            totalCorrectAnswers: p?.totalCorrectAnswers ?? prev.totalCorrectAnswers,
            totalIncorrectAnswers: p?.totalIncorrectAnswers ?? prev.totalIncorrectAnswers,
            syncStatus: 'synced',
            lastSyncedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          }));
          return true;
        }
      }
    } catch {
      // Local fallback
      setState(prev => ({
        ...prev,
        userProfile: {
          email,
          name: name || email.split('@')[0] || 'Học viên AWS',
          careerTrack: prev.currentTrack
        },
        syncStatus: 'offline'
      }));
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setState(prev => ({
      ...prev,
      userProfile: null,
      syncStatus: 'synced',
      lastSyncedAt: null
    }));
  };

  const forceSyncNow = async () => {
    await syncWithCloud(state);
  };

  const setTrack = (track: CareerTrack) => {
    setState((prev) => ({ ...prev, currentTrack: track }));
  };

  const toggleStageCompleted = (stageId: string) => {
    setState((prev) => {
      const exists = prev.completedStages.includes(stageId);
      const nextStages = exists
        ? prev.completedStages.filter((id) => id !== stageId)
        : [...prev.completedStages, stageId];
      
      const xpGain = exists ? -500 : 500;
      return {
        ...prev,
        completedStages: nextStages,
        userXP: Math.max(0, prev.userXP + xpGain),
        userPoints: Math.max(0, prev.userPoints + xpGain)
      };
    });
  };

  const toggleLessonCompleted = (lessonId: string) => {
    setState((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      const nextLessons = exists
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      
      const xpGain = exists ? -100 : 100;
      return {
        ...prev,
        completedLessons: nextLessons,
        userXP: Math.max(0, prev.userXP + xpGain),
        userPoints: Math.max(0, prev.userPoints + xpGain)
      };
    });
  };

  const toggleProjectCompleted = (projectId: string) => {
    setState((prev) => {
      const exists = prev.completedProjects.includes(projectId);
      const nextProjects = exists
        ? prev.completedProjects.filter((id) => id !== projectId)
        : [...prev.completedProjects, projectId];
      
      const xpGain = exists ? -300 : 300;
      return {
        ...prev,
        completedProjects: nextProjects,
        userXP: Math.max(0, prev.userXP + xpGain),
        userPoints: Math.max(0, prev.userPoints + xpGain)
      };
    });
  };

  const toggleTaskCompleted = (taskId: string) => {
    setState((prev) => {
      const exists = prev.completedTasks.includes(taskId);
      const nextTasks = exists
        ? prev.completedTasks.filter((id) => id !== taskId)
        : [...prev.completedTasks, taskId];
      
      const xpGain = exists ? -50 : 50;
      return {
        ...prev,
        completedTasks: nextTasks,
        userXP: Math.max(0, prev.userXP + xpGain),
        userPoints: Math.max(0, prev.userPoints + xpGain)
      };
    });
  };

  const toggleLessonBookmark = (lessonId: string) => {
    setState((prev) => {
      const exists = prev.bookmarkedLessons.includes(lessonId);
      return {
        ...prev,
        bookmarkedLessons: exists
          ? prev.bookmarkedLessons.filter((id) => id !== lessonId)
          : [...prev.bookmarkedLessons, lessonId]
      };
    });
  };

  const toggleFlashcardMastered = (cardId: string) => {
    setState((prev) => {
      const exists = prev.flashcardsMastered.includes(cardId);
      const nextCards = exists
        ? prev.flashcardsMastered.filter((id) => id !== cardId)
        : [...prev.flashcardsMastered, cardId];
      
      const xpGain = exists ? -40 : 40;
      return {
        ...prev,
        flashcardsMastered: nextCards,
        userXP: Math.max(0, prev.userXP + xpGain),
        userPoints: Math.max(0, prev.userPoints + xpGain)
      };
    });
  };

  const saveQuizResult = (quizKey: string, score: number, total: number) => {
    setState((prev) => {
      const bonusXP = Math.round((score / total) * 150);
      return {
        ...prev,
        userXP: prev.userXP + bonusXP,
        userPoints: prev.userPoints + bonusXP,
        quizScores: {
          ...prev.quizScores,
          [quizKey]: {
            score,
            total,
            date: new Date().toLocaleDateString('vi-VN')
          }
        }
      };
    });
  };

  const logStudyHours = (hours: number) => {
    setState((prev) => ({
      ...prev,
      studyHoursLogged: Math.max(0, prev.studyHoursLogged + hours),
      userXP: prev.userXP + Math.round(hours * 60),
      userPoints: prev.userPoints + Math.round(hours * 60)
    }));
  };

  const setPortalMode = (mode: PortalMode) => {
    setState((prev) => ({ ...prev, portalMode: mode }));
  };

  const setFontSizeScale = (scale: number) => {
    const clamped = Math.max(100, Math.min(220, Math.round(scale)));
    setState((prev) => ({ ...prev, fontSizeScale: clamped }));
  };

  const toggleReadingMode = () => {
    setState((prev) => {
      const nextMode = !prev.isReadingMode;
      return {
        ...prev,
        isReadingMode: nextMode,
        fontSizeScale: nextMode && (prev.fontSizeScale === 100 || !prev.fontSizeScale) ? 135 : prev.fontSizeScale
      };
    });
  };

  const increaseFontSize = () => {
    setState((prev) => ({
      ...prev,
      fontSizeScale: Math.min(220, (prev.fontSizeScale || 100) + 15)
    }));
  };

  const decreaseFontSize = () => {
    setState((prev) => ({
      ...prev,
      fontSizeScale: Math.max(100, (prev.fontSizeScale || 100) - 15)
    }));
  };

  const resetFontSize = () => {
    setState((prev) => ({
      ...prev,
      fontSizeScale: 100,
      isReadingMode: false
    }));
  };

  const resetAllProgress = () => {
    setState(defaultState);
  };

  return (
    <LearningContext.Provider
      value={{
        ...state,
        levelInfo,
        setPortalMode,
        setTrack,
        toggleStageCompleted,
        toggleStageCompletion: toggleStageCompleted,
        toggleLessonCompleted,
        toggleLessonCompletion: toggleLessonCompleted,
        toggleProjectCompleted,
        toggleProjectCompletion: toggleProjectCompleted,
        toggleTaskCompleted,
        toggleLessonBookmark,
        toggleFlashcardMastered,
        saveQuizResult,
        logStudyHours,
        addStudyHours: logStudyHours,
        recordQuizAnswer,
        addBonusXP,
        loginUser,
        logoutUser,
        forceSyncNow,
        resetAllProgress,
        setFontSizeScale,
        toggleReadingMode,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
