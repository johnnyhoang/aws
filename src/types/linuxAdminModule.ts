export type LinuxAdminCategory =
  | 'linux_fundamentals'
  | 'shell_command_line'
  | 'user_security_permissions'
  | 'process_systemd_cron'
  | 'storage_fhs_lvm'
  | 'networking_remote_ssh'
  | 'web_app_docker_servers'
  | 'database_tuning_linux'
  | 'aws_linux_administration'
  | 'monitoring_troubleshooting';

export interface LinuxAdminChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  category: LinuxAdminCategory;
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

export interface LinuxAdminQuizQuestion {
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

export interface LinuxAdminFlashcard {
  id: string;
  term: string;
  category: string;
  definition: string;
  practicalUsage: string;
  proTip: string;
}

export interface LinuxAdminCommandReference {
  command: string;
  category: string;
  syntax: string;
  description: string;
  example: string;
  dangerLevel: 'safe' | 'caution' | 'dangerous';
}
