import express from "express";

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// middleware to validate id
const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "invalid id" });
  }

  req.todoId = id;
  next();
};

// middleware validate title and description
const validateCreateBody = (req, res, next) => {
  const { title, description } = req.body;

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
const validateUpdateBody = (req, res, next) => {
  const { title, description, completed } = req.body;

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

// example todos
const todos = [
  {
    id: 1,
    title: "hoc nodejs",
    description: "tim hieu REST API",
    completed: false,
  },
  {
    id: 2,
    title: "hoc express",
    description: "tim hieu routing",
    completed: true,
  },
];

// register logger middleware
app.use(logger);

// allow server to read json from req body
app.use(express.json());

// test server api
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Todo REST API is running!",
  });
});

// get all todos
app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

// find todo by id
app.get("/todos/:id", validateId, (req, res) => {
  const todo = todos.find((item) => item.id === req.todoId);

  if (!todo) {
    return res
      .status(404)
      .json({ message: `cannot find todo with id ${req.todoId}` });
  }

  res.json(todo);
});

// create new todo
app.post("/todos", validateCreateBody, (req, res) => {
  const { title, description } = req.body ?? {};

  const newTodo = {
    id: todos.length + 1,
    title: title.trim(),
    description: description || "",
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", validateId, validateUpdateBody, (req, res) => {
  const todo = todos.find((item) => item.id === req.todoId);

  if (!todo) {
    return res
      .status(404)
      .json({ message: `cannot find todo with id ${req.todoId}` });
  }

  const { title, description, completed } = req.body;

  if (title !== undefined) todo.title = title.trim();
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

app.delete("/todos/:id", validateId, (req, res) => {
  const index = todos.findIndex((item) => item.id === req.todoId);

  if (index === -1) {
    return res.status(404).json({ message: "cannot find todo" });
  }

  todos.splice(index, 1);

  res.status(204).send();
});

// 404 handling middleware
app.use((req, res) => {
  res
    .status(404)
    .json({ message: `cannot find route ${req.method} ${req.url}` });
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.status ? err.message : "server error",
  });
});

export default app;
