const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "invalid id" });
  }

  req.todoId = id;
  next();
};

export default validateId;
