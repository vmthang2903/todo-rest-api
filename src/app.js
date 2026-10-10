import express from "express";

const app = express();

// Cho phep server doc JSON tu request body
app.use(express.json());

// API kiem tra server
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Todo REST API is running!",
  });
});

export default app;
