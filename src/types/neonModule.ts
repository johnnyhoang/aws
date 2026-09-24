export type NeonLevel = 'Cơ bản' | 'Trung bình' | 'Nâng cao' | 'Chuyên gia';

export type NeonCategory =
  | 'overview_architecture'
  | 'storage_compute_separation'
  | 'database_branching'
  | 'autoscaling_scale_to_zero'
  | 'connection_pooling_pgbouncer'
  | 'point_in_time_recovery_time_travel'
  | 'serverless_driver_websockets'
  | 'neon_auth_data_api'
  | 'cli_terraform_api'
  | 'cost_performance_optimization';

export interface NeonSection {
  heading: string;
  subheading?: string;
  content: string;
  codeBlock?: {
    language: string;
    code: string;
    title?: string;
  };
  bulletPoints?: string[];
  mindsetShift?: {
    from: string;
    to: string;
    impact: string;
  };
  proTip?: string;
  warningNote?: string;
  storyQuote?: {
    quote: string;
    speaker: string;
    role: string;
    year?: string;
  };
}

export interface NeonChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  level: NeonLevel;
  readTimeMinutes: number;
  category: NeonCategory;
  summary: string;
  hookStory?: string;
  sections: NeonSection[];
  practicalCommands: {
    title: string;
    command: string;
    description: string;
  }[];
  masteryChecklist: string[];
}

export interface NeonFlashcard {
  id: string;
  term: string;
  definition: string;
  category: NeonCategory;
  exampleOrAnalogy: string;
  proTip: string;
}

export interface NeonQuizQuestion {
  id: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  category: NeonCategory;
  difficulty: NeonLevel;
}
