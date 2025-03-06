exports.notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  exports.errorHandler = (err, req, res, next) => {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({ message: err.message });
  };
  