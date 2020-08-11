const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date().now,
  },
});

module.exports = Task = mongoose.model("task", TaskSchema);
