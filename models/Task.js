const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = Task = mongoose.model("task", TaskSchema);
