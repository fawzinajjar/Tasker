const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const User = require("../models/User");

// POST Add Task
router.post(
  "/",
  [auth, check("text", "Please type in TEXT").not().isEmpty()],
  async (req, res) => {
    console.log("req.text:", req.text);
    let errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: [{ errors: errors.array() }] });
    }
    console.log("req.text:", req.body);
    const text = req.body.text;

    try {
      const user = await User.findById(req.user.id).select("-password");
      let task = await Task.findOne({ text });
      if (task) {
        return res.status(400).json({
          errors: [{ msg: "Can't Add Same Task More Then One Time" }],
        });
      }

      task = new Task({
        text,
        user: req.user.id,
      });

      await task.save();

      res.status(200).json({ msg: "added success" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// DELETE Task
router.delete("/one/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task Not Found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User Not Authorized" });
    }

    await task.remove();
    res.json({ msg: "Task Removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

// GET View all tasks

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find().sort({ date: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.send(500).send("Server Error");
  }
});

// DELETE all tasks

router.delete("/all", auth, async (req, res) => {
  try {
    const tasks = await Task.deleteMany();
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.send(500).send("Server Error");
  }
});

module.exports = router;

// PUT Edit Task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.text = "";
    newText = req.body.text;
    task.text = newText;
    await task.save();
    res.json(task.text);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Server Error");
  }
});
