export type DomainCategory = 
  | 'fundamentals'
  | 'dns_architecture'
  | 'dns_records'
  | 'lifecycle_transfer'
  | 'security_dnssec'
  | 'web_admin_servers'
  | 'pro_tips_troubleshooting';

export interface DomainChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  category: DomainCategory;
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

export interface DomainQuizQuestion {
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

export interface DomainFlashcard {
  id: string;
  term: string;
  category: string;
  definition: string;
  practicalUsage: string;
  proTip: string;
}
