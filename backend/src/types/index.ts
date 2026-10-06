import { Request } from 'express';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProject {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: 'completed' | 'ongoing' | 'archived';
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExperience {
  _id?: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  technologies: string[];
  order: number;
}

export interface IEducation {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string | number;
  endYear: string | number;
  grade?: string;
  description?: string;
}

export interface IAchievement {
  _id?: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  credentialUrl?: string;
  image?: string;
  category: string;
}

export interface ISkill {
  _id?: string;
  name: string;
  category: string;
  level?: string;
  icon?: string;
  order: number;
}

export interface ISocialLink {
  _id?: string;
  platform: string;
  url: string;
  icon?: string;
  order: number;
}

export interface ISiteSettings {
  _id?: string;
  name: string;
  role: string;
  email: string;
  location: string;
  availability: string;
  bio: string;
  profileImage?: string;
  resumeUrl?: string;
}

export interface IContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt?: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
