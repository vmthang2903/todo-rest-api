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

// get all todos
export const getTodos = (req, res) => {
  res.status(200).json(todos);
};

// find todo by id
export const getTodoById = (req, res) => {
  const todo = todos.find((item) => item.id === req.todoId);

  if (!todo) {
    return res
      .status(404)
      .json({ message: `cannot find todo with id ${req.todoId}` });
  }

  res.json(todo);
};

// create new todo
export const createTodo = (req, res) => {
  const { title, description } = req.body ?? {};

  const newTodo = {
    id: todos.length + 1,
    title: title.trim(),
    description: description || "",
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

export const updateTodo = (req, res) => {
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
};

export const deleteTodo = (req, res) => {
  const index = todos.findIndex((item) => item.id === req.todoId);

  if (index === -1) {
    return res.status(404).json({ message: "cannot find todo" });
  }

  todos.splice(index, 1);

  res.status(204).send();
};
