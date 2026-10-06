import mongoose, { Schema, Document } from 'mongoose';
import { IContactMessage } from '../types/index.js';

export interface ContactMessageDocument extends Omit<IContactMessage, '_id'>, Document {}

const ContactMessageSchema = new Schema<ContactMessageDocument>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 150 },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: {
      type: String,
      enum: ['unread', 'read', 'replied'],
      default: 'unread',
      index: true,
    },
  },
  { timestamps: true }
);

export const ContactMessage = mongoose.model<ContactMessageDocument>('ContactMessage', ContactMessageSchema);
