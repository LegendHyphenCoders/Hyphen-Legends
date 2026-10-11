/**
 * Reusable validation middleware.
 * Checks that required fields are present and not empty in req.body.
 */
export function requireFields(fields = []) {
  return (req, res, next) => {
    const missing = [];

    for (const field of fields) {
      const val = req.body[field];
      if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        details: missing.map((field) => `Field '${field}' is required and cannot be empty.`),
      });
    }

    next();
  };
}

/**
 * Normalizes user-facing status and timing values to Mongoose schema enums.
 */
export function normalizeAdmissionPayload(req, res, next) {
  if (req.body) {
    const { currentStatus, preferredTiming } = req.body;

    // Normalize currentStatus
    if (typeof currentStatus === 'string') {
      const lower = currentStatus.toLowerCase();
      if (lower.includes('student')) {
        req.body.currentStatus = 'student';
      } else if (lower.includes('grad')) {
        req.body.currentStatus = 'graduate';
      } else if (lower.includes('working') || lower.includes('professional')) {
        req.body.currentStatus = 'working-professional';
      } else if (!['student', 'graduate', 'working-professional'].includes(lower)) {
        req.body.currentStatus = 'student';
      }
    }

    // Normalize preferredTiming
    if (typeof preferredTiming === 'string') {
      const lower = preferredTiming.toLowerCase();
      if (lower.includes('morning')) {
        req.body.preferredTiming = 'morning';
      } else if (lower.includes('evening')) {
        req.body.preferredTiming = 'evening';
      } else if (lower.includes('weekend')) {
        req.body.preferredTiming = 'weekend';
      } else if (lower.includes('flexible')) {
        req.body.preferredTiming = 'flexible';
      } else if (!['morning', 'evening', 'weekend', 'flexible'].includes(lower)) {
        req.body.preferredTiming = 'evening';
      }
    }
  }

  next();
}
