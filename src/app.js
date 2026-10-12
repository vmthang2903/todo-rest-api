import express from "express";

const app = express();

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

// Cho phep server doc JSON tu request body
app.use(express.json());

// API kiem tra server
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
app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({ message: "khong tim thay todo!" });
  }

  res.json(todo);
});

// create new todo
app.post("/todos", (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "title la bat buoc!" });
  }

  const newTodo = {
    id: todos.length + 1,
    title,
    description: description || "",
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json("Da tao todo moi", newTodo);
});

app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({ message: `khong tim thay todo ${id}` });
  }

  const { title, description, completed } = req.body;

  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "khong tim thay todo" });
  }

  todos.splice(index, 1);

  res.status(204).send();
});

export default app;
