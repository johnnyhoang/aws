import React, { createContext, useContext, useState, useEffect } from 'react';
import { CareerTrack } from '../types';

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
  resetAllProgress: () => void;
}

const STORAGE_KEY = 'aws_cloud_mastery_learning_state_v1';

const defaultState: LearningState = {
  currentTrack: 'cloud_engineer',
  completedStages: [],
  completedLessons: ['networking-security-core'],
  completedProjects: [],
  completedTasks: ['t1-1'],
  bookmarkedLessons: [],
  flashcardsMastered: ['fc-1'],
  quizScores: {},
  studyHoursLogged: 8
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

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
