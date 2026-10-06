import mongoose, { Schema, Document } from 'mongoose';
import { IProject } from '../types/index.js';

export interface ProjectDocument extends Omit<IProject, '_id'>, Document {}

const ProjectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    category: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    technologies: [{ type: String, trim: true }],
    image: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['completed', 'ongoing', 'archived'],
      default: 'completed',
      index: true,
    },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export const Project = mongoose.model<ProjectDocument>('Project', ProjectSchema);
