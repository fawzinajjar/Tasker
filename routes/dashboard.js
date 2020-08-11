const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { check, validationResult } = require("express-validator");

// POST Add New Task
router.post(
  "/",
  [check("text", "Please type in TEXT").not().isEmpty()],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json([{ errors: errors.array() }]);
    }

    const text = req.body.text;

    try {
      let task = await Task.findOne({ text });
      if (task) {
        return res
          .status(400)
          .json({ msg: "Can't Add Same Task More Then One Time" });
      }

      task = new Task({
        text,
      });

      await task.save();
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
