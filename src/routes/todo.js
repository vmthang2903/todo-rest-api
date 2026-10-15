import { Router } from "express";
import validateId from "../middleware/validateId.js";
import {
  validateCreateBody,
  validateUpdateBody,
} from "../middleware/validateBody.js";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

const router = Router();

// define routes
router.get("/", getTodos);
router.get("/:id", validateId, getTodoById);
router.post("/", validateCreateBody, createTodo);
router.put("/:id", validateId, validateUpdateBody, updateTodo);
router.delete("/:id", validateId, deleteTodo);

export default router;
