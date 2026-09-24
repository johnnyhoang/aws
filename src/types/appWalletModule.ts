export interface AppWalletLesson {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  readingTimeMinutes: number;
  summary: string;
  content: string;
  keyTakeaways: string[];
}

export interface AppWalletQuizQuestion {
  id: string;
  chapterNumber: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  scenario?: string;
}

export interface AppWalletFlashcard {
  id: string;
  term: string;
  category: 'Architecture' | 'App Portfolio' | 'AI SRS Builder' | 'Database RLS' | 'In-App Backlog' | 'Future Roadmap';
  definition: string;
  exampleOrFormula: string;
}
