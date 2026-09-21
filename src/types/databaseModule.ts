export type DatabaseCategory = 
  | 'fundamentals_principles'
  | 'relational_rdbms'
  | 'nosql_document'
  | 'keyvalue_cache'
  | 'vector_ai_rag'
  | 'analytics_columnar'
  | 'optimization_tuning'
  | 'free_tier_directory'
  | 'universal_mcp_gateway';

export interface DatabaseChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  category: DatabaseCategory;
  readTimeMinutes: number;
  level: 'Cơ bản' | 'Trung cấp' | 'Nâng cao' | 'Chuyên gia';
  summary: string;
  sections: {
    heading: string;
    subheading?: string;
    content: string;
    bulletPoints?: string[];
    diagramType?: string;
    codeBlock?: {
      language: string;
      title?: string;
      code: string;
      diagramType?: string;
    };
    proTip?: string;
    warningNote?: string;
  }[];
  practicalCommands?: {
    tool: string;
    title: string;
    command: string;
    description: string;
  }[];
  masteryChecklist: string[];
}

export interface DatabaseQuizQuestion {
  id: string;
  category: string;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Khó' | 'Chuyên gia';
  scenario: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: {
    whyCorrect: string;
    whyOthersIncorrect?: {
      optionId: string;
      reason: string;
    }[];
    proTip?: string;
  };
}

export interface DatabaseFlashcard {
  id: string;
  term: string;
  category: string;
  definition: string;
  practicalUsage: string;
  proTip: string;
}

export interface FreeDatabaseProvider {
  id: string;
  name: string;
  type: string;
  badge: string;
  freeQuota: string;
  keyFeatures: string[];
  bestFor: string;
  pros: string[];
  limitations: string[];
  signupUrl: string;
  connectionSnippet: string;
}
