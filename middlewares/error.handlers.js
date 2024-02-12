const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`🔍 - Ruta no encontrada - ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
