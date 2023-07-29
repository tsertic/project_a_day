const express = require("express");
const {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
} = require("../controllers/todos");
const router = express.Router();

router.route("/").get(getAllTodos).post(createTodo);

router
  .route("/:id")
  .get(getTodoById)
  .put(updateTodoById)
  .delete(deleteTodoById);

module.exports = router;
