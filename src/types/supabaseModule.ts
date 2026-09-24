export type SupabaseLevel = 'Cơ bản' | 'Trung bình' | 'Nâng cao' | 'Chuyên gia';

export type SupabaseCategory =
  | 'overview_philosophy'
  | 'postgres_tables_views'
  | 'rls_security_policies'
  | 'auth_oauth_mfa'
  | 'realtime_cdc_broadcast'
  | 'storage_buckets_presigned'
  | 'edge_functions_deno'
  | 'pgvector_ai_embeddings'
  | 'webhooks_triggers_automation'
  | 'cli_migrations_branching';

export interface SupabaseSection {
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

export interface SupabaseChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  level: SupabaseLevel;
  readTimeMinutes: number;
  category: SupabaseCategory;
  summary: string;
  hookStory?: string;
  sections: SupabaseSection[];
  practicalCommands: {
    title: string;
    command: string;
    description: string;
  }[];
  masteryChecklist: string[];
}

export interface SupabaseFlashcard {
  id: string;
  term: string;
  definition: string;
  category: SupabaseCategory;
  exampleOrAnalogy: string;
  proTip: string;
}

export interface SupabaseQuizQuestion {
  id: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  category: SupabaseCategory;
  difficulty: SupabaseLevel;
}
