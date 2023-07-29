const todoModel = require("./../mongodb/models/todoModel");
// GET
// v1/todos
// get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await todoModel.find();
    if (!todos) {
      return res
        .status(404)
        .json({ success: false, data: [], message: "Something went wrong" });
    }
    res.status(200).json({ success: true, data: todos, count: todos.length });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, data: [], message: `${error.message}` });
  }
};

// POST
// v1/todos
// create new todo
exports.createTodo = async (req, res) => {
  const bodyData = req.body;
  try {
    const newTodo = await todoModel.create(bodyData);
    if (!newTodo) {
      return res
        .status(404)
        .json({ success: false, data: {}, message: "Something went wrong" });
    }
    res.status(200).json({ success: true, data: newTodo });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, data: {}, message: `${error.message}` });
  }
};

// GET
// v1/todos/:id
// get todo by id
exports.getTodoById = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await todoModel.findById(id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, data: {}, message: "Something went wrong" });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(404).json({ success: false, data: {}, message: error.message });
  }
};

// PUT
// v1/todos/:id
// update todo by id
exports.updateTodoById = async (req, res) => {
  const id = req.params.id;
  const bodyData = req.body;
  try {
    const todo = await todoModel.findByIdAndUpdate(id, bodyData);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, data: {}, message: "Something went wrong" });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(404).json({ success: false, data: {}, message: error.message });
  }
};

//DELETE
// v1/todos/:id
// delete todo by id
exports.deleteTodoById = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await todoModel.findByIdAndDelete(id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, data: {}, message: "Something went wrong" });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(404).json({ success: false, data: {}, message: error.message });
  }
};
