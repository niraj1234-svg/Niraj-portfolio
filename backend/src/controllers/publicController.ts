import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project.js';
import { Experience } from '../models/Experience.js';
import { Education } from '../models/Education.js';
import { Achievement } from '../models/Achievement.js';
import { Skill } from '../models/Skill.js';
import { SocialLink } from '../models/SocialLink.js';
import { SiteSettings } from '../models/SiteSettings.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { AppError } from '../middleware/errorHandler.js';

export async function getHealth(_req: Request, res: Response): Promise<void> {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}

export async function getProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, status } = req.query;
    const filter: Record<string, any> = {};

    if (category && category !== 'all') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }
    if (status) {
      filter.status = status;
    }

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProjectBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const slugStr = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    const project = await Project.findOne({ slug: slugStr.toLowerCase() });

    if (!project) {
      throw new AppError(`Project with slug "${slugStr}" not found`, 404);
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
}

export async function getExperience(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
}

export async function getEducation(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const educations = await Education.find().sort({ endYear: -1 });
    res.status(200).json({
      success: true,
      count: educations.length,
      data: educations,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAchievements(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const achievements = await Achievement.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSkills(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSocialLinks(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const socialLinks = await SocialLink.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      count: socialLinks.length,
      data: socialLinks,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSiteSettings(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const settings = await SiteSettings.findOne();
    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
}

export async function submitContact(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
      status: 'unread',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received.',
      data: {
        _id: newMessage._id,
        id: newMessage._id,
        createdAt: newMessage.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function searchPortfolio(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    if (!q || q.length < 2) {
      res.status(200).json({
        success: true,
        data: { projects: [], skills: [], achievements: [], experiences: [] },
      });
      return;
    }

    const regex = new RegExp(q, 'i');
    const [projects, skills, achievements, experiences] = await Promise.all([
      Project.find({
        $or: [{ title: regex }, { description: regex }, { technologies: regex }],
      }).limit(5),
      Skill.find({ name: regex }).limit(5),
      Achievement.find({
        $or: [{ title: regex }, { description: regex }],
      }).limit(5),
      Experience.find({
        $or: [{ role: regex }, { organization: regex }, { technologies: regex }],
      }).limit(5),
    ]);

    res.status(200).json({
      success: true,
      data: {
        projects,
        skills,
        achievements,
        experiences,
      },
    });
  } catch (error) {
    next(error);
  }
}
