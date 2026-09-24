import { supabase } from './supabaseClient';

export interface UserProgressPayload {
  portalMode?: string;
  activeTab?: string;
  currentTrack: string;
  completedStages: string[];
  completedLessons: string[];
  completedProjects: string[];
  completedTasks: string[];
  bookmarkedLessons: string[];
  flashcardsMastered: string[];
  quizScores: Record<string, { score: number; total: number; date: string }>;
  studyHoursLogged: number;
  userXP: number;
  userPoints: number;
  currentStreak: number;
  highestStreak: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
}

/**
 * Table prefix: aws_
 * Table name: aws_user_progress
 */
export const AWS_PROGRESS_TABLE = 'aws_user_progress';

/**
 * Fetch progress from Supabase for a specific user
 */
export async function fetchRemoteUserProgress(email: string): Promise<UserProgressPayload | null> {
  const normalizedEmail = email.toLowerCase().trim();
  try {
    const { data, error } = await supabase
      .from(AWS_PROGRESS_TABLE)
      .select('progress, user_name, updated_at')
      .eq('user_email', normalizedEmail)
      .maybeSingle();

    if (error) {
      // Table might not exist yet or connection fallback
      console.warn('Supabase fetch error, fallback to local:', error.message);
      return null;
    }

    if (data?.progress) {
      return data.progress as UserProgressPayload;
    }
  } catch (err) {
    console.warn('Failed to fetch remote progress:', err);
  }
  return null;
}

/**
 * Save / Upsert user progress into Supabase aws_user_progress table
 */
export async function saveRemoteUserProgress(
  email: string,
  name: string,
  progress: UserProgressPayload
): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();
  try {
    const { error } = await supabase
      .from(AWS_PROGRESS_TABLE)
      .upsert(
        {
          user_email: normalizedEmail,
          user_name: name,
          progress: progress,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_email' }
      );

    if (error) {
      console.warn('Supabase upsert progress warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Failed to save remote progress:', err);
    return false;
  }
}
