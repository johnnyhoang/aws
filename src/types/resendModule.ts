export type ResendLevel = 'Cơ bản' | 'Trung bình' | 'Nâng cao' | 'Chuyên gia';

export type ResendCategory =
  | 'overview_philosophy'
  | 'rest_api_sdks'
  | 'react_email_templates'
  | 'domain_verification_dns'
  | 'idempotency_batch_limits'
  | 'webhooks_event_pipeline'
  | 'inbound_routing_parsing'
  | 'audiences_broadcasts'
  | 'nextjs_server_actions'
  | 'deliverability_analytics';

export interface ResendSection {
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

export interface ResendChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  level: ResendLevel;
  readTimeMinutes: number;
  category: ResendCategory;
  summary: string;
  hookStory?: string;
  sections: ResendSection[];
  practicalCommands: {
    title: string;
    command: string;
    description: string;
  }[];
  masteryChecklist: string[];
}

export interface ResendFlashcard {
  id: string;
  term: string;
  definition: string;
  category: ResendCategory;
  exampleOrAnalogy: string;
  proTip: string;
}

export interface ResendQuizQuestion {
  id: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  category: ResendCategory;
  difficulty: ResendLevel;
}
