const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Register new User / bcrypt password and sign& return token
router.post(
  "/",
  [
    check("name", "Name is required !").not().isEmpty(),
    check("email", "Email is requied !").isEmail(),
    check("password", "Password is required !").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json([{ errors: errors.array() }]);
    }
    const { name, email, password } = req.body;

    try {
      // checking if User already exists searching for the  email
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User Already Exists !" });
      }

      // Appending the input data to User model shema that will be stored in db in the shape of the shema
      user = new User({
        name,
        email,
        password,
      });

      // bcrypting the password before saving to Database
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Saving the new user data that in incapsulated in user shema model to db
      await user.save();

      // creating json web token for the user and keep him logged in
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 36000000 });
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      };
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// DELETE Account
router.delete("/", auth, async (req, res) => {
  const currentUser = req.user.id;
  try {
    const deactivateAcc = await User.findByIdAndDelete(currentUser);
    const tasks = await Task.deleteMany();
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Server Error");
  }
});

module.exports = router;
