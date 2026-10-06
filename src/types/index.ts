export interface ProjectArchitecture {
  client: string;
  frontend: string;
  backend: string;
  database: string;
  domain: string;
  flowDescription: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  badge: 'LIVE / PRODUCTION' | 'COMING SOON' | 'ONGOING';
  badgeType: 'production' | 'upcoming' | 'ongoing';
  shortDescription: string;
  problem?: string;
  role?: string;
  technicalDescription?: string;
  stack: string[];
  infrastructure?: {
    frontend?: string;
    backend?: string;
    database?: string;
    domain?: string;
    deployment?: string;
  };
  architecture?: ProjectArchitecture;
  features?: string[];
  businessImpact?: string[];
  links: {
    live?: string;
    github?: string;
    detailAvailable?: boolean;
  };
}

export type SkillProficiency = 'Strong' | 'Working Knowledge' | 'Learning';

export interface SkillItem {
  name: string;
  proficiency: SkillProficiency;
  highlight?: boolean;
  note?: string;
}

export interface SkillCategory {
  id: string;
  categoryNumber: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  type: 'Work' | 'Leadership';
  highlights: string[];
  isCurrent?: boolean;
}

export type JourneyStatus = 'LEARNED' | 'PRACTICED' | 'BUILDING' | 'PLANNED';

export interface JourneyStage {
  id: string;
  stageNumber: string;
  phase: string;
  status: JourneyStatus;
  items: string[];
  description: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  type: 'PARTICIPATION' | 'LEARNING';
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  handle?: string;
  icon: string;
}
