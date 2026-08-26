export type CareerTrack = 'cloud_engineer' | 'software_developer';

export type CertLevel = 'foundational' | 'associate' | 'professional';

export interface CertStage {
  id: string;
  code: string;
  name: string;
  level: CertLevel;
  badgeColor: string;
  badgeBg: string;
  badgeBorder: string;
  summary: string;
  importance: string;
  recommendedFor: CareerTrack[];
  estimatedWeeks: number;
  examCost: string;
  keyDomains: {
    name: string;
    percentage: number;
    description: string;
  }[];
  mustKnowServices: string[];
  recommendedResources: {
    instructor: string;
    courseName: string;
    platform: string;
    type: 'course' | 'practice_exam' | 'hands_on';
    urlPlaceholder?: string;
  }[];
  practicalRelevance: string;
}

export interface DeepDiveTopic {
  id: string;
  title: string;
  category: 'networking_security' | 'iac' | 'hybrid_migration' | 'containers_serverless' | 'university_lms_sso';
  categoryLabel: string;
  tag: string;
  readTimeMinutes: number;
  importanceLevel: 'Cao' | 'Rất cao' | 'Bắt buộc';
  summary: string;
  higherEdContext: string;
  coreConcepts: {
    heading: string;
    content: string;
    bulletPoints?: string[];
  }[];
  practicalCommands?: {
    tool: string;
    title: string;
    code: string;
    description: string;
  }[];
  labExercise: {
    title: string;
    difficulty: 'Dễ' | 'Trung bình' | 'Nâng cao';
    duration: string;
    freeTierEligible: boolean;
    objectives: string[];
    steps: {
      stepNumber: number;
      title: string;
      details: string;
    }[];
  };
  examTip: string;
  interviewQuestion: {
    question: string;
    sampleAnswer: string;
    keyPoints: string[];
  };
}

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  targetRole: string;
  difficulty: 'Trung bình' | 'Nâng cao';
  estimatedHours: number;
  estimatedCost: string;
  summary: string;
  businessScenario: string;
  architectureComponents: {
    tier: string;
    services: string[];
    description: string;
  }[];
  keySkillsDemonstrated: string[];
  stepByStepGuide: {
    phase: string;
    title: string;
    tasks: string[];
  }[];
  iacCodeSample: {
    language: string;
    filename: string;
    code: string;
  };
  interviewStarStory: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  githubRepoTemplateTip: string;
}

export interface QuizQuestion {
  id: string;
  certCode: string;
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
    whyOthersIncorrect: {
      optionId: string;
      reason: string;
    }[];
    examTip: string;
  };
}

export interface Flashcard {
  id: string;
  term: string;
  category: 'AWS Services' | 'Security & IAM' | 'Networking' | 'Higher-Ed & LMS' | 'IaC & DevOps';
  definition: string;
  realWorldUsage: string;
  examKeyword: string;
}

export interface InterviewQA {
  id: string;
  category: 'General Cloud' | 'Networking & Security' | 'IaC & Automation' | 'Higher-Ed IT & LMS' | 'Troubleshooting & Migration';
  question: string;
  context: string;
  starAnswer: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  interviewerLooksFor: string[];
  redFlagsToAvoid: string[];
}

export interface StudyPlanWeek {
  weekNumber: number;
  theme: string;
  stageCode: string;
  goals: string[];
  suggestedHours: number;
  tasks: {
    id: string;
    title: string;
    type: 'theory' | 'hands_on' | 'quiz' | 'project';
    duration: string;
  }[];
}
