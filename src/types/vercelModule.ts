export type VercelLevel = 'Cơ bản' | 'Trung bình' | 'Nâng cao' | 'Chuyên gia';

export type VercelCategory = 
  | 'overview_architecture'
  | 'rendering_rendering_strategies'
  | 'edge_serverless'
  | 'git_preview_environments'
  | 'domains_dns_cdn'
  | 'environment_secrets'
  | 'storage_kv_blob_postgres'
  | 'security_firewall_waf'
  | 'observability_speed_insights'
  | 'monorepo_turborepo_cli';

export interface VercelSection {
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

export interface VercelChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  level: VercelLevel;
  readTimeMinutes: number;
  category: VercelCategory;
  summary: string;
  hookStory?: string;
  sections: VercelSection[];
  practicalCommands: {
    title: string;
    command: string;
    description: string;
  }[];
  masteryChecklist: string[];
}

export interface VercelFlashcard {
  id: string;
  term: string;
  definition: string;
  category: VercelCategory;
  exampleOrAnalogy: string;
  proTip: string;
}

export interface VercelQuizQuestion {
  id: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  category: VercelCategory;
  difficulty: VercelLevel;
}
