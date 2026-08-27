// Server-side storage adapter for AWS Cloud Mastery
// Multi-user ready schema for persistence across devices

export interface UserProfile {
  email: string;
  name: string;
  careerTrack: 'cloud_engineer' | 'software_developer';
  createdAt: string;
  lastActiveAt: string;
}

export interface UserProgressData {
  email: string;
  currentTrack: 'cloud_engineer' | 'software_developer';
  completedStages: string[];
  completedLessons: string[];
  completedProjects: string[];
  completedTasks: string[];
  bookmarkedLessons: string[];
  flashcardsMastered: string[];
  quizScores: Record<string, { score: number; total: number; date: string }>;
  studyHoursLogged: number;
  
  // Gamification & Maturity Level metrics
  userXP: number;
  userPoints: number;
  currentStreak: number;
  highestStreak: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
  
  lastSyncedAt: string;
}

// In-memory persistent cache for serverless invocation reuse
const memoryUsers = new Map<string, UserProfile>();
const memoryProgress = new Map<string, UserProgressData>();

// Default seed
const defaultProgress = (email: string): UserProgressData => ({
  email,
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
  lastSyncedAt: new Date().toISOString()
});

export async function getUserProfile(email: string): Promise<UserProfile | null> {
  const normalized = email.toLowerCase().trim();
  return memoryUsers.get(normalized) || null;
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  const normalized = profile.email.toLowerCase().trim();
  memoryUsers.set(normalized, {
    ...profile,
    email: normalized,
    lastActiveAt: new Date().toISOString()
  });
}

export async function getUserProgress(email: string): Promise<UserProgressData> {
  const normalized = email.toLowerCase().trim();
  const existing = memoryProgress.get(normalized);
  if (existing) {
    return existing;
  }
  const initial = defaultProgress(normalized);
  memoryProgress.set(normalized, initial);
  return initial;
}

export async function saveUserProgress(data: UserProgressData): Promise<UserProgressData> {
  const normalized = data.email.toLowerCase().trim();
  const updated: UserProgressData = {
    ...data,
    email: normalized,
    lastSyncedAt: new Date().toISOString()
  };
  memoryProgress.set(normalized, updated);
  return updated;
}

export async function mergeUserProgress(
  email: string, 
  incomingData: Partial<UserProgressData>
): Promise<UserProgressData> {
  const current = await getUserProgress(email);

  // Union arrays so no completed item is lost across devices
  const mergeArrays = (a: string[] = [], b: string[] = []) => Array.from(new Set([...a, ...b]));

  const merged: UserProgressData = {
    email: current.email,
    currentTrack: incomingData.currentTrack || current.currentTrack,
    completedStages: mergeArrays(current.completedStages, incomingData.completedStages),
    completedLessons: mergeArrays(current.completedLessons, incomingData.completedLessons),
    completedProjects: mergeArrays(current.completedProjects, incomingData.completedProjects),
    completedTasks: mergeArrays(current.completedTasks, incomingData.completedTasks),
    bookmarkedLessons: mergeArrays(current.bookmarkedLessons, incomingData.bookmarkedLessons),
    flashcardsMastered: mergeArrays(current.flashcardsMastered, incomingData.flashcardsMastered),
    quizScores: {
      ...current.quizScores,
      ...(incomingData.quizScores || {})
    },
    studyHoursLogged: Math.max(current.studyHoursLogged, incomingData.studyHoursLogged || 0),
    userXP: Math.max(current.userXP, incomingData.userXP || 0),
    userPoints: Math.max(current.userPoints, incomingData.userPoints || 0),
    currentStreak: incomingData.currentStreak ?? current.currentStreak,
    highestStreak: Math.max(current.highestStreak, incomingData.highestStreak || 0),
    totalCorrectAnswers: Math.max(current.totalCorrectAnswers, incomingData.totalCorrectAnswers || 0),
    totalIncorrectAnswers: Math.max(current.totalIncorrectAnswers, incomingData.totalIncorrectAnswers || 0),
    lastSyncedAt: new Date().toISOString()
  };

  return await saveUserProgress(merged);
}
