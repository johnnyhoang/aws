export interface TokenWalletLesson {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  readingTimeMinutes: number;
  summary: string;
  content: string; // Markdown formatted detailed textbook chapter
  keyTakeaways: string[];
}

export interface TokenWalletQuizQuestion {
  id: string;
  chapterNumber: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  scenario?: string;
}

export interface TokenWalletFlashcard {
  id: string;
  term: string;
  category: 'Architecture' | 'AI Quota' | 'Regex Parser' | 'Database RLS' | 'App Portfolio' | 'Future Roadmap';
  definition: string;
  exampleOrFormula: string;
}
