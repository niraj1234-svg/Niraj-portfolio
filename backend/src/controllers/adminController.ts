import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Project } from '../models/Project.js';
import { Experience } from '../models/Experience.js';
import { Education } from '../models/Education.js';
import { Achievement } from '../models/Achievement.js';
import { Skill } from '../models/Skill.js';
import { SiteSettings } from '../models/SiteSettings.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { ENV } from '../config/env.js';
import { AppError } from '../middleware/errorHandler.js';

// Auth: Login
export async function adminLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES_IN } as jwt.SignOptions
    );

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Dashboard Summary
export async function getDashboardStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [projectCount, messageCount, unreadMessages, skillCount, expCount] = await Promise.all([
      Project.countDocuments(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ status: 'unread' }),
      Skill.countDocuments(),
      Experience.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        projects: projectCount,
        messages: messageCount,
        unreadMessages,
        skills: skillCount,
        experience: expCount,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Projects CRUD
export async function adminGetProjects(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
}

export async function adminCreateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project, message: 'Project created successfully' });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) throw new AppError('Project not found', 404);
    res.status(200).json({ success: true, data: project, message: 'Project updated successfully' });
  } catch (error) {
    next(error);
  }
}

export async function adminDeleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) throw new AppError('Project not found', 404);
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
}

// Experience CRUD
export async function adminGetExperience(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await Experience.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
}

export async function adminCreateExperience(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await Experience.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateExperience(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) throw new AppError('Experience item not found', 404);
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function adminDeleteExperience(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await Experience.findByIdAndDelete(req.params.id);
    if (!item) throw new AppError('Experience item not found', 404);
    res.status(200).json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    next(error);
  }
}

// Achievements CRUD
export async function adminGetAchievements(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await Achievement.find().sort({ date: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
}

export async function adminCreateAchievement(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await Achievement.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateAchievement(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) throw new AppError('Achievement not found', 404);
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function adminDeleteAchievement(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await Achievement.findByIdAndDelete(req.params.id);
    if (!item) throw new AppError('Achievement not found', 404);
    res.status(200).json({ success: true, message: 'Achievement deleted' });
  } catch (error) {
    next(error);
  }
}

// Skills CRUD
export async function adminGetSkills(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await Skill.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
}

export async function adminCreateSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await Skill.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) throw new AppError('Skill not found', 404);
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function adminDeleteSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await Skill.findByIdAndDelete(req.params.id);
    if (!item) throw new AppError('Skill not found', 404);
    res.status(200).json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    next(error);
  }
}

// Messages Management
export async function adminGetMessages(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateMessageStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status } = req.body;
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!message) throw new AppError('Message not found', 404);
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
}

export async function adminDeleteMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) throw new AppError('Message not found', 404);
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
}

// Site Settings
export async function adminGetSettings(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const settings = await SiteSettings.findOne();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, { new: true });
    }
    res.status(200).json({ success: true, data: settings, message: 'Settings updated successfully' });
  } catch (error) {
    next(error);
  }
}
