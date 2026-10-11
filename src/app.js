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

app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

export default app;
