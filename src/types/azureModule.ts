export type AzureLevel = 'Cơ bản' | 'Trung bình' | 'Nâng cao' | 'Chuyên gia';

export type AzureCategory =
  | 'overview_global_infrastructure'
  | 'identity_entra_id_security'
  | 'networking_vnet_hybrid'
  | 'compute_vms_appservice_serverless'
  | 'storage_blob_files_datalake'
  | 'databases_sql_cosmos_db'
  | 'load_balancing_traffic_frontdoor'
  | 'monitoring_governance_bicep'
  | 'ai_openai_cognitive'
  | 'finops_well_architected_certifications';

export interface AzureSection {
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

export interface AzureChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  level: AzureLevel;
  readTimeMinutes: number;
  category: AzureCategory;
  summary: string;
  hookStory?: string;
  sections: AzureSection[];
  practicalCommands: {
    title: string;
    command: string;
    description: string;
  }[];
  masteryChecklist: string[];
}

export interface AzureFlashcard {
  id: string;
  term: string;
  definition: string;
  category: AzureCategory;
  exampleOrAnalogy: string;
  proTip: string;
}

export interface AzureQuizQuestion {
  id: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  category: AzureCategory;
  difficulty: AzureLevel;
}
