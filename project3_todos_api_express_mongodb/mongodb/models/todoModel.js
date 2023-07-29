const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    require: [true, "Some text is requires"],
  },
  finished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("todoModel", todoSchema);
