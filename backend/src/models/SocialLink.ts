import mongoose, { Schema, Document } from 'mongoose';
import { ISocialLink } from '../types/index.js';

export interface SocialLinkDocument extends Omit<ISocialLink, '_id'>, Document {}

const SocialLinkSchema = new Schema<SocialLinkDocument>(
  {
    platform: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export const SocialLink = mongoose.model<SocialLinkDocument>('SocialLink', SocialLinkSchema);
