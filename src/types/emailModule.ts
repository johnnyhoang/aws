export type EmailCategory = 
  | 'history_architecture'
  | 'protocols_deepdive'
  | 'authentication_security'
  | 'dns_routing'
  | 'self_hosted_mailserver'
  | 'enterprise_providers'
  | 'transactional_cloud_api'
  | 'deliverability_reputation'
  | 'cybersecurity_defense'
  | 'automation_templates';

export interface EmailCodeSnippet {
  language: string;
  code: string;
  title?: string;
}

export interface EmailSection {
  heading: string;
  subheading?: string;
  content: string;
  storyQuote?: {
    quote: string;
    speaker: string;
    role: string;
    year?: string;
  };
  bulletPoints?: string[];
  codeBlock?: EmailCodeSnippet;
  mindsetShift?: {
    from: string;
    to: string;
    impact: string;
  };
  proTip?: string;
  warningNote?: string;
}

export interface EmailPracticalCommand {
  title: string;
  command: string;
  description: string;
}

export interface EmailChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  level: 'Cơ bản' | 'Trung bình' | 'Nâng cao' | 'Chuyên gia';
  readTimeMinutes: number;
  category: EmailCategory;
  summary: string;
  hookStory?: string;
  sections: EmailSection[];
  practicalCommands?: EmailPracticalCommand[];
  masteryChecklist: string[];
}

export interface EmailFlashcard {
  id: string;
  term: string;
  definition: string;
  category: string;
  practicalUsage: string;
  proTip: string;
}

export interface EmailQuizOption {
  id: string;
  text: string;
}

export interface EmailQuizQuestion {
  id: string;
  scenario: string;
  category: EmailCategory;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Khó' | 'Chuyên gia';
  options: EmailQuizOption[];
  correctOptionId: string;
  explanation: {
    whyCorrect: string;
    whyWrong: string;
    proTip?: string;
  };
}
