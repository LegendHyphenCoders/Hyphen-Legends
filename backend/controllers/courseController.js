import { Course } from '../models/Course.js';

/**
 * @route   GET /api/courses
 * @desc    Get all active courses with optional category, level, and search filters
 * @access  Public
 */
export async function getCourses(req, res, next) {
  try {
    const { category, level, search } = req.query;
    const filter = { isActive: true };

    if (category && category !== 'All' && category !== 'All Courses') {
      filter.category = new RegExp(`^${category.trim()}$`, 'i');
    }

    if (level && level !== 'All Levels') {
      filter.level = level.trim().toLowerCase();
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { title: searchRegex },
        { shortDescription: searchRegex },
        { category: searchRegex },
      ];
    }

    const courses = await Course.find(filter).sort({ featured: -1, createdAt: 1 });

    return res.status(200).json({
      count: courses.length,
      courses,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/courses/:slug
 * @desc    Get detailed course by slug
 * @access  Public
 */
export async function getCourseBySlug(req, res, next) {
  try {
    const { slug } = req.params;

    const course = await Course.findOne({ slug: slug.toLowerCase(), isActive: true });

    if (!course) {
      return res.status(404).json({
        error: 'Course not found',
        details: [`No course found with slug '${slug}'.`],
      });
    }

    return res.status(200).json({ course });
  } catch (error) {
    next(error);
  }
}
