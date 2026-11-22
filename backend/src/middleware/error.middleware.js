exports.notFound = (req, res, _next) =>
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });

exports.errorHandler = (err, _req, res, _next) =>
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.statusCode ? err.message : 'Internal server error'
  });
