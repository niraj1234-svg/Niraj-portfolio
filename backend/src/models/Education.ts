import mongoose, { Schema, Document } from 'mongoose';
import { IEducation } from '../types/index.js';

export interface EducationDocument extends Omit<IEducation, '_id'>, Document {}

const EducationSchema = new Schema<EducationDocument>(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    field: { type: String, required: true, trim: true },
    startYear: { type: Schema.Types.Mixed, required: true },
    endYear: { type: Schema.Types.Mixed, required: true },
    grade: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export const Education = mongoose.model<EducationDocument>('Education', EducationSchema);
