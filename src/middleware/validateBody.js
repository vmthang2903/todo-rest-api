// middleware validate title and description
export const validateCreateBody = (req, res, next) => {
  const { title, description } = req.body ?? {};

  if (typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ message: "title must be string and cannot be empty" });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ message: "description must be string" });
  }

  next();
};

// middleware validate update route
export const validateUpdateBody = (req, res, next) => {
  const { title, description, completed } = req.body ?? {};

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ message: "title must be string and cannot be empty" });
    }
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ message: "description must be string" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ message: "completed field must be boolean" });
  }

  next();
};
