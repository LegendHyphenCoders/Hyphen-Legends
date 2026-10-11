/**
 * Global Express Error Handler.
 * Catches Mongoose errors, syntax errors, and custom application exceptions.
 */
export function errorHandler(err, req, res, next) {
  console.error('[Error caught by global handler]:', err);

  // Mongoose Bad ObjectId or CastError
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid resource identifier',
      details: [`The identifier '${err.value}' provided for field '${err.path}' is invalid.`],
    });
  }

  // Mongoose Duplicate Key Error (e.g., unique slug)
  if (err.code === 11000) {
    const duplicateFields = Object.keys(err.keyValue || {});
    return res.status(409).json({
      error: 'Duplicate entry detected',
      details: duplicateFields.map((field) => `A record with ${field} '${err.keyValue[field]}' already exists.`),
    });
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      error: 'Validation error',
      details,
    });
  }

  // Fallback 500 Internal Server Error
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? [err.stack] : [],
  });
}
