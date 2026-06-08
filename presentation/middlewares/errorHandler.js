function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  return res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
    error: err.error || err.stack || 'Unknown error',
  });
}

module.exports = errorHandler;
