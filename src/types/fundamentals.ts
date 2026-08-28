export type FundamentalDomainId = 
  | 'computer_fundamentals'
  | 'internet_fundamentals'
  | 'networking_basics'
  | 'linux_basics'
  | 'web_application'
  | 'security_basics'
  | 'cloud_fundamentals'
  | 'git_scripting';

export type FundamentalTrack = 'it_infrastructure' | 'software_fundamentals';

export type DifficultyLevel = 'Cơ bản' | 'Trung bình' | 'Nâng cao' | 'Chuyên sâu';

export interface FundamentalDomainInfo {
  id: FundamentalDomainId;
  order: number;
  title: string;
  shortTitle: string;
  icon: string;
  badge: string;
  color: string;
  badgeColor: string;
  badgeBg: string;
  badgeBorder: string;
  isPillar: boolean; // Starred items ⭐
  summary: string;
  whyAwsNeedsThis: string;
  estimatedHours: number;
  targetRoles: string[];
  keyTopics: {
    title: string;
    subtopics: string[];
    importance: 'Cốt lõi' | 'Quan trọng' | 'Nâng cao';
  }[];
  mustKnowConcepts: string[];
  recommendedResources: {
    title: string;
    author: string;
    type: 'video' | 'article' | 'interactive' | 'doc';
    linkText: string;
    urlPlaceholder?: string;
  }[];
  handsOnChecklist: string[];
}

export interface FundamentalDeepDiveLesson {
  id: string;
  domainId: FundamentalDomainId;
  title: string;
  subtitle: string;
  categoryLabel: string;
  tag: string;
  readTimeMinutes: number;
  importanceLevel: 'Bắt buộc' | 'Rất cao' | 'Quan trọng';
  summary: string;
  awsConnectionContext: string;
  coreConcepts: {
    heading: string;
    content: string;
    bulletPoints?: string[];
    diagramAscii?: string;
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
    objectives: string[];
    steps: {
      stepNumber: number;
      title: string;
      details: string;
      codeSnippet?: string;
    }[];
  };
  examTip: string;
  interviewQuestion: {
    question: string;
    sampleAnswer: string;
    keyPoints: string[];
  };
}

export interface FundamentalProject {
  id: string;
  domainId: FundamentalDomainId;
  title: string;
  subtitle: string;
  targetRole: string;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
  estimatedHours: number;
  prerequisites: string[];
  summary: string;
  realWorldScenario: string;
  architectureComponents: {
    tier: string;
    components: string[];
    description: string;
  }[];
  keySkillsDemonstrated: string[];
  stepByStepGuide: {
    phase: string;
    title: string;
    tasks: string[];
    codeSnippets?: {
      title: string;
      language: string;
      code: string;
    }[];
  }[];
  interviewStarStory: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  cvBulletPointTips: string[];
}

export interface FundamentalQuizQuestion {
  id: string;
  domainId: FundamentalDomainId;
  category: string;
  difficulty: DifficultyLevel;
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
    awsRelevanceTip: string;
  };
}

export interface FundamentalFlashcard {
  id: string;
  domainId: FundamentalDomainId;
  term: string;
  category: string;
  definition: string;
  realWorldUsage: string;
  awsRelevance: string;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
}

export interface FundamentalInterviewQA {
  id: string;
  domainId: FundamentalDomainId;
  category: string;
  difficulty: 'Junior' | 'Mid' | 'Senior';
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
  awsFollowupQuestion?: string;
}

export interface FundamentalStudyPlanWeek {
  weekNumber: number;
  theme: string;
  domainIds: FundamentalDomainId[];
  goals: string[];
  suggestedHours: number;
  dailyTasks: {
    day: string;
    title: string;
    type: 'theory' | 'hands_on' | 'quiz' | 'lab';
    duration: string;
    isCompleted?: boolean;
  }[];
}

export interface FundamentalVideoCourse {
  id: string;
  domainId: FundamentalDomainId;
  title: string;
  instructor: string;
  channel: string;
  duration: string;
  level: DifficultyLevel;
  youtubeId: string;
  thumbnailUrl?: string;
  summary: string;
  topicsCovered: string[];
  keyTakeaways: string[];
}

export interface FundamentalMaturityLevel {
  level: number;
  title: string;
  titleEn: string;
  badge: string;
  color: string;
  minXP: number;
  maxXP: number;
  maturityDescription: string;
  skillsUnlocked: string[];
}
