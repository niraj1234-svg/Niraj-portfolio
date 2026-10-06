import { Router } from 'express';
import {
  adminLogin,
  getDashboardStats,
  adminGetProjects,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
  adminGetExperience,
  adminCreateExperience,
  adminUpdateExperience,
  adminDeleteExperience,
  adminGetAchievements,
  adminCreateAchievement,
  adminUpdateAchievement,
  adminDeleteAchievement,
  adminGetSkills,
  adminCreateSkill,
  adminUpdateSkill,
  adminDeleteSkill,
  adminGetMessages,
  adminUpdateMessageStatus,
  adminDeleteMessage,
  adminGetSettings,
  adminUpdateSettings,
} from '../controllers/adminController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import {
  validateBody,
  AdminLoginSchema,
  ProjectSchema,
  ExperienceSchema,
  AchievementSchema,
  SkillSchema,
  SiteSettingsSchema,
} from '../middleware/validate.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

export const adminRouter = Router();

// Public Admin Login
adminRouter.post('/login', loginLimiter, validateBody(AdminLoginSchema), adminLogin);

// Protected Admin Routes
adminRouter.use(authenticateAdmin);

adminRouter.get('/stats', getDashboardStats);

// Projects
adminRouter.get('/projects', adminGetProjects);
adminRouter.post('/projects', validateBody(ProjectSchema), adminCreateProject);
adminRouter.put('/projects/:id', adminUpdateProject);
adminRouter.delete('/projects/:id', adminDeleteProject);

// Experience
adminRouter.get('/experience', adminGetExperience);
adminRouter.post('/experience', validateBody(ExperienceSchema), adminCreateExperience);
adminRouter.put('/experience/:id', adminUpdateExperience);
adminRouter.delete('/experience/:id', adminDeleteExperience);

// Achievements
adminRouter.get('/achievements', adminGetAchievements);
adminRouter.post('/achievements', validateBody(AchievementSchema), adminCreateAchievement);
adminRouter.put('/achievements/:id', adminUpdateAchievement);
adminRouter.delete('/achievements/:id', adminDeleteAchievement);

// Skills
adminRouter.get('/skills', adminGetSkills);
adminRouter.post('/skills', validateBody(SkillSchema), adminCreateSkill);
adminRouter.put('/skills/:id', adminUpdateSkill);
adminRouter.delete('/skills/:id', adminDeleteSkill);

// Messages
adminRouter.get('/messages', adminGetMessages);
adminRouter.patch('/messages/:id', adminUpdateMessageStatus);
adminRouter.delete('/messages/:id', adminDeleteMessage);

// Site Settings
adminRouter.get('/settings', adminGetSettings);
adminRouter.put('/settings', validateBody(SiteSettingsSchema), adminUpdateSettings);
