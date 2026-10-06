import mongoose, { Schema, Document } from 'mongoose';
import { ISkill } from '../types/index.js';

export interface SkillDocument extends Omit<ISkill, '_id'>, Document {}

const SkillSchema = new Schema<SkillDocument>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    level: { type: String, default: 'Intermediate' },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export const Skill = mongoose.model<SkillDocument>('Skill', SkillSchema);
