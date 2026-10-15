import express from "express";
import logger from "./middleware/logger.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import todosRouter from "./routes/todo.js";

const app = express();

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

app.use("/todos", todosRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
