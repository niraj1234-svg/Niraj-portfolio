import { Router } from 'express';
import {
  getHealth,
  getProjects,
  getProjectBySlug,
  getExperience,
  getEducation,
  getAchievements,
  getSkills,
  getSocialLinks,
  getSiteSettings,
  submitContact,
  searchPortfolio,
} from '../controllers/publicController.js';
import { validateBody, ContactSchema } from '../middleware/validate.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

export const publicRouter = Router();

publicRouter.get('/health', getHealth);
publicRouter.get('/projects', getProjects);
publicRouter.get('/projects/:slug', getProjectBySlug);
publicRouter.get('/experience', getExperience);
publicRouter.get('/education', getEducation);
publicRouter.get('/achievements', getAchievements);
publicRouter.get('/skills', getSkills);
publicRouter.get('/social-links', getSocialLinks);
publicRouter.get('/site-settings', getSiteSettings);
publicRouter.get('/search', searchPortfolio);
publicRouter.post('/contact', contactLimiter, validateBody(ContactSchema), submitContact);
