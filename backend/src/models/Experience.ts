import mongoose, { Schema, Document } from 'mongoose';
import { IExperience } from '../types/index.js';

export interface ExperienceDocument extends Omit<IExperience, '_id'>, Document {}

const ExperienceSchema = new Schema<ExperienceDocument>(
  {
    organization: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    current: { type: Boolean, default: false },
    description: [{ type: String }],
    technologies: [{ type: String }],
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export const Experience = mongoose.model<ExperienceDocument>('Experience', ExperienceSchema);
