export type OpenSourceCategory =
  | 'foss_origins_philosophy'
  | 'licenses_legal'
  | 'business_governance'
  | 'git_collaboration_mastery'
  | 'first_contribution_roadmap'
  | 'ci_cd_quality_gates'
  | 'creating_your_own_project'
  | 'maintainer_community_leadership'
  | 'supply_chain_security'
  | 'career_personal_branding';

export interface OpenSourceSection {
  heading: string;
  subheading?: string;
  content: string;
  storyQuote?: {
    speaker: string;
    role: string;
    quote: string;
    year?: string;
  };
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
  mindsetShift?: {
    from: string;
    to: string;
    impact: string;
  };
}

export interface OpenSourceChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  category: OpenSourceCategory;
  readTimeMinutes: number;
  level: 'Khởi đầu' | 'Thực chiến' | 'Nâng cao' | 'Chuyên gia';
  summary: string;
  hookStory: string;
  sections: OpenSourceSection[];
  practicalCommands?: {
    tool: string;
    title: string;
    command: string;
    description: string;
  }[];
  masteryChecklist: string[];
}

export interface OpenSourceQuizQuestion {
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

export interface OpenSourceFlashcard {
  id: string;
  term: string;
  category: string;
  definition: string;
  practicalUsage: string;
  proTip: string;
}

export interface OpenSourceLicenseInfo {
  id: string;
  name: string;
  type: 'Permissive' | 'Copyleft Yếu (Weak)' | 'Copyleft Mạnh (Strong)' | 'Network Copyleft';
  shortDesc: string;
  canDo: string[];
  cannotDo: string[];
  mustDo: string[];
  bestFor: string;
  famousProjects: string[];
  color: string;
}
