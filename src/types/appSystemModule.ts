export type AppSystemLevel = 'Cơ bản' | 'Trung bình' | 'Nâng cao' | 'Chuyên gia';

export type AppSystemCategory =
  | 'overview_philosophy'
  | 'monorepo_architecture'
  | 'security_cryptography'
  | 'rbac_abac_policies'
  | 'multi_database_adapters'
  | 'centralized_auth_mfa'
  | 'client_sdk_design'
  | 'admin_dashboard_ops'
  | 'testing_runbooks'
  | 'future_roadmap_expansion';

export interface AppSystemSection {
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

export interface AppSystemChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  level: AppSystemLevel;
  readTimeMinutes: number;
  category: AppSystemCategory;
  summary: string;
  hookStory?: string;
  sections: AppSystemSection[];
  practicalCommands: {
    title: string;
    command: string;
    description: string;
  }[];
  masteryChecklist: string[];
}

export interface AppSystemFlashcard {
  id: string;
  term: string;
  definition: string;
  category: AppSystemCategory;
  exampleOrAnalogy: string;
  proTip: string;
}

export interface AppSystemQuizQuestion {
  id: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  category: AppSystemCategory;
  difficulty: AppSystemLevel;
}
