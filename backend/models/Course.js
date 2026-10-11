import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    lessons: {
      type: Number,
      default: 4,
    },
    topics: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const capstoneSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, 'Course slug is required'],
      unique: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Course category is required'],
      trim: true,
      index: true,
    },
    level: {
      type: String,
      enum: {
        values: ['beginner', 'intermediate', 'advanced'],
        message: '{VALUE} is not an allowed level (beginner, intermediate, advanced)',
      },
      default: 'beginner',
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
    },
    tuition: {
      type: Number,
      required: [true, 'Tuition amount is required'],
      min: [0, 'Tuition must be a non-negative number'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    modules: {
      type: [moduleSchema],
      default: [],
    },
    capstone: {
      type: capstoneSchema,
      default: () => ({}),
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model('Course', courseSchema);
