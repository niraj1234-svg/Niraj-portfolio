import mongoose, { Schema, Document } from 'mongoose';
import { ISiteSettings } from '../types/index.js';

export interface SiteSettingsDocument extends Omit<ISiteSettings, '_id'>, Document {}

const SiteSettingsSchema = new Schema<SiteSettingsDocument>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    availability: { type: String, required: true, trim: true },
    bio: { type: String, required: true },
    profileImage: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model<SiteSettingsDocument>('SiteSettings', SiteSettingsSchema);
