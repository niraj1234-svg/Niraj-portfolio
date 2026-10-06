import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export function validateBody(schema: z.ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errorMessages,
        });
        return;
      }
      next(error);
    }
  };
}

// Validation Schemas
export const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters').trim(),
  email: z.string().email('Please provide a valid email address').max(150).trim().toLowerCase(),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200, 'Subject cannot exceed 200 characters').trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message cannot exceed 5000 characters').trim(),
});

export const AdminLoginSchema = z.object({
  email: z.string().email('Invalid email format').trim().toLowerCase(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const ProjectSchema = z.object({
  title: z.string().min(2).max(150).trim(),
  slug: z.string().min(2).max(100).trim().toLowerCase(),
  category: z.string().min(2).max(50).trim(),
  description: z.string().min(10),
  longDescription: z.string().optional(),
  technologies: z.array(z.string().trim()).min(1, 'Provide at least one technology'),
  image: z.string().optional().default(''),
  liveUrl: z.string().url().or(z.literal('')).optional(),
  githubUrl: z.string().url().or(z.literal('')).optional(),
  featured: z.boolean().default(false),
  status: z.enum(['completed', 'ongoing', 'archived']).default('completed'),
  order: z.number().int().default(0),
});

export const ExperienceSchema = z.object({
  organization: z.string().min(2).max(100).trim(),
  role: z.string().min(2).max(100).trim(),
  location: z.string().min(2).max(100).trim(),
  startDate: z.string().min(2).max(50),
  endDate: z.string().max(50).optional(),
  current: z.boolean().default(false),
  description: z.array(z.string()).min(1),
  technologies: z.array(z.string()).default([]),
  order: z.number().int().default(0),
});

export const EducationSchema = z.object({
  institution: z.string().min(2).max(150).trim(),
  degree: z.string().min(2).max(100).trim(),
  field: z.string().min(2).max(100).trim(),
  startYear: z.union([z.string(), z.number()]),
  endYear: z.union([z.string(), z.number()]),
  grade: z.string().optional(),
  description: z.string().optional(),
});

export const AchievementSchema = z.object({
  title: z.string().min(2).max(150).trim(),
  organization: z.string().min(2).max(100).trim(),
  date: z.string().min(2).max(50),
  description: z.string().min(5),
  credentialUrl: z.string().url().or(z.literal('')).optional(),
  image: z.string().optional(),
  category: z.string().default('Certifications'),
});

export const SkillSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  category: z.string().min(2).max(50).trim(),
  level: z.string().optional().default('Intermediate'),
  icon: z.string().optional().default(''),
  order: z.number().int().default(0),
});

export const SiteSettingsSchema = z.object({
  name: z.string().min(2).max(100),
  role: z.string().min(2).max(100),
  email: z.string().email(),
  location: z.string().min(2).max(100),
  availability: z.string().min(2).max(100),
  bio: z.string().min(10),
  profileImage: z.string().optional(),
  resumeUrl: z.string().optional(),
});
