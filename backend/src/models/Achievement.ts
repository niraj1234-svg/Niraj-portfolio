import mongoose, { Schema, Document } from 'mongoose';
import { IAchievement } from '../types/index.js';

export interface AchievementDocument extends Omit<IAchievement, '_id'>, Document {}

const AchievementSchema = new Schema<AchievementDocument>(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    credentialUrl: { type: String, default: '' },
    image: { type: String, default: '' },
    category: { type: String, required: true, default: 'Certifications', index: true },
  },
  { timestamps: true }
);

export const Achievement = mongoose.model<AchievementDocument>('Achievement', AchievementSchema);
