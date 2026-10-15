// 404 handling middleware
export const notFound = (req, res) => {
  res
    .status(404)
    .json({ message: `cannot find route ${req.method} ${req.url}` });
};

// error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.status ? err.message : "server error",
  });
};
