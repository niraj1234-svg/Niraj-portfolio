const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ProjectData {
  _id: string;
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
}

export interface ExperienceData {
  _id: string;
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

export interface EducationData {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string | number;
  endYear: string | number;
  grade?: string;
  description?: string;
}

export interface AchievementData {
  _id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  credentialUrl?: string;
  image?: string;
  category: string;
}

export interface SkillData {
  _id: string;
  name: string;
  category: string;
  level?: string;
  icon?: string;
  order: number;
}

export interface SiteSettingsData {
  _id: string;
  name: string;
  role: string;
  email: string;
  location: string;
  availability: string;
  bio: string;
  profileImage?: string;
  resumeUrl?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  token?: string;
  count?: number;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
}

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('niraj_portfolio_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const res = await fetch(url, { ...options, headers });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(`API request failed [${options.method || 'GET'} ${endpoint}]:`, error);
    return {
      success: false,
      message: 'Failed to communicate with server',
    };
  }
}

export const api = {
  // Public APIs
  getHealth: () => request('/health'),
  getProjects: (category?: string) =>
    request<ProjectData[]>(`/projects${category ? `?category=${category}` : ''}`),
  getProjectBySlug: (slug: string) => request<ProjectData>(`/projects/${slug}`),
  getExperience: () => request<ExperienceData[]>('/experience'),
  getEducation: () => request<EducationData[]>('/education'),
  getAchievements: () => request<AchievementData[]>('/achievements'),
  getSkills: () => request<SkillData[]>('/skills'),
  getSiteSettings: () => request<SiteSettingsData>('/site-settings'),
  submitContact: (data: ContactPayload) =>
    request<{ id: string; createdAt: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  search: (query: string) => request(`/search?q=${encodeURIComponent(query)}`),

  // Admin APIs
  adminLogin: (email: string, password: string) =>
    request<{ token: string; user: { id: string; name: string; email: string; role: string } }>(
      '/admin/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    ),
  adminGetStats: () =>
    request<{
      projects: number;
      messages: number;
      unreadMessages: number;
      skills: number;
      experience: number;
    }>('/admin/stats', { headers: getAuthHeader() }),
  adminGetProjects: () => request<ProjectData[]>('/admin/projects', { headers: getAuthHeader() }),
  adminCreateProject: (data: Partial<ProjectData>) =>
    request<ProjectData>('/admin/projects', {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    }),
  adminUpdateProject: (id: string, data: Partial<ProjectData>) =>
    request<ProjectData>(`/admin/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    }),
  adminDeleteProject: (id: string) =>
    request(`/admin/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    }),
  adminGetMessages: () => request<any[]>('/admin/messages', { headers: getAuthHeader() }),
  adminUpdateMessageStatus: (id: string, status: string) =>
    request(`/admin/messages/${id}`, {
      method: 'PATCH',
      headers: getAuthHeader(),
      body: JSON.stringify({ status }),
    }),
  adminDeleteMessage: (id: string) =>
    request(`/admin/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    }),
};
