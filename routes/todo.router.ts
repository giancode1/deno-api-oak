import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

// controller
import {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById
} from "../controllers/todo.controller.ts";

router
  .get("/", (ctx) => {
    ctx.response.body = {
      message: "Hello Giancarlo",
    };
  })
  .get("/todos", getAllTodos)
  .post("/todos", createTodo)
  .get("/todos/:id", getTodoById)
  .put("/todos/:id", updateTodoById)
  .delete("/todos/:id", deleteTodoById);

export default router;