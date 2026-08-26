import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CareerTrack } from '../types';

export interface UserProfile {
  email: string;
  name: string;
  careerTrack: CareerTrack;
}

interface LearningState {
  currentTrack: CareerTrack;
  completedStages: string[];
  completedLessons: string[];
  completedProjects: string[];
  completedTasks: string[];
  bookmarkedLessons: string[];
  flashcardsMastered: string[];
  quizScores: Record<string, { score: number; total: number; date: string }>;
  studyHoursLogged: number;
  // User & Cloud Sync State
  userProfile: UserProfile | null;
  syncStatus: 'synced' | 'syncing' | 'offline' | 'unsaved';
  lastSyncedAt: string | null;
}

interface LearningContextType extends LearningState {
  setTrack: (track: CareerTrack) => void;
  toggleStageCompleted: (stageId: string) => void;
  toggleLessonCompleted: (lessonId: string) => void;
  toggleProjectCompleted: (projectId: string) => void;
  toggleTaskCompleted: (taskId: string) => void;
  toggleLessonBookmark: (lessonId: string) => void;
  toggleFlashcardMastered: (cardId: string) => void;
  saveQuizResult: (quizKey: string, score: number, total: number) => void;
  logStudyHours: (hours: number) => void;
  loginUser: (email: string, name?: string) => Promise<boolean>;
  logoutUser: () => void;
  forceSyncNow: () => Promise<void>;
  resetAllProgress: () => void;
}

const STORAGE_KEY = 'aws_cloud_mastery_learning_state_v2';

const defaultState: LearningState = {
  currentTrack: 'cloud_engineer',
  completedStages: [],
  completedLessons: ['networking-security-core'],
  completedProjects: [],
  completedTasks: ['t1-1'],
  bookmarkedLessons: [],
  flashcardsMastered: ['fc-1'],
  quizScores: {},
  studyHoursLogged: 8,
  userProfile: null,
  syncStatus: 'synced',
  lastSyncedAt: null
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<LearningState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch {
      // Use defaults if storage unavailable
    }
    return defaultState;
  });

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

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
            studyHoursLogged: currentState.studyHoursLogged
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
  }, [
    state.completedStages,
    state.completedLessons,
    state.completedProjects,
    state.completedTasks,
    state.flashcardsMastered,
    state.quizScores,
    state.studyHoursLogged,
    state.currentTrack,
    state.userProfile?.email,
    syncWithCloud
  ]);

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
      return {
        ...prev,
        completedStages: exists
          ? prev.completedStages.filter((id) => id !== stageId)
          : [...prev.completedStages, stageId]
      };
    });
  };

  const toggleLessonCompleted = (lessonId: string) => {
    setState((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      return {
        ...prev,
        completedLessons: exists
          ? prev.completedLessons.filter((id) => id !== lessonId)
          : [...prev.completedLessons, lessonId]
      };
    });
  };

  const toggleProjectCompleted = (projectId: string) => {
    setState((prev) => {
      const exists = prev.completedProjects.includes(projectId);
      return {
        ...prev,
        completedProjects: exists
          ? prev.completedProjects.filter((id) => id !== projectId)
          : [...prev.completedProjects, projectId]
      };
    });
  };

  const toggleTaskCompleted = (taskId: string) => {
    setState((prev) => {
      const exists = prev.completedTasks.includes(taskId);
      return {
        ...prev,
        completedTasks: exists
          ? prev.completedTasks.filter((id) => id !== taskId)
          : [...prev.completedTasks, taskId]
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
      return {
        ...prev,
        flashcardsMastered: exists
          ? prev.flashcardsMastered.filter((id) => id !== cardId)
          : [...prev.flashcardsMastered, cardId]
      };
    });
  };

  const saveQuizResult = (quizKey: string, score: number, total: number) => {
    setState((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [quizKey]: {
          score,
          total,
          date: new Date().toLocaleDateString('vi-VN')
        }
      }
    }));
  };

  const logStudyHours = (hours: number) => {
    setState((prev) => ({
      ...prev,
      studyHoursLogged: Math.max(0, prev.studyHoursLogged + hours)
    }));
  };

  const resetAllProgress = () => {
    setState(defaultState);
  };

  return (
    <LearningContext.Provider
      value={{
        ...state,
        setTrack,
        toggleStageCompleted,
        toggleLessonCompleted,
        toggleProjectCompleted,
        toggleTaskCompleted,
        toggleLessonBookmark,
        toggleFlashcardMastered,
        saveQuizResult,
        logStudyHours,
        loginUser,
        logoutUser,
        forceSyncNow,
        resetAllProgress
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
