import mongoose from 'mongoose';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const admissionSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      lowercase: true,
      trim: true,
      match: [emailRegex, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      minlength: [7, 'Phone number must be at least 7 characters'],
    },
    courseSlug: {
      type: String,
      required: [true, 'Course slug is required'],
      trim: true,
    },
    currentStatus: {
      type: String,
      enum: {
        values: ['student', 'graduate', 'working-professional'],
        message: '{VALUE} is not a valid currentStatus. Allowed: student, graduate, working-professional',
      },
      default: 'student',
    },
    preferredTiming: {
      type: String,
      enum: {
        values: ['morning', 'evening', 'weekend', 'flexible'],
        message: '{VALUE} is not a valid preferredTiming. Allowed: morning, evening, weekend, flexible',
      },
      default: 'evening',
    },
    message: {
      type: String,
      maxlength: [500, 'Message cannot exceed 500 characters'],
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'enrolled'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

export const Admission = mongoose.model('Admission', admissionSchema);
