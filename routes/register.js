const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult, body } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { v4: uuidv4 } = require("uuid");
const { init } = require("../models/User");

// Register new User / bcrypt password and sign& return token
router.post(
  "/",
  [
    check("name", "Name is required !").not().isEmpty(),
    check("email", "Email is requied !")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Not vaild e-mail"),
    check("password", "Password is required").not().isEmpty(),
    check("confirm_password", "Confirm Password is required !").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, confirm_password, check_box } = req.body;

    try {
      // Check_box checked checker
      if (check_box !== true) {
        return res.status(400).json({
          errors: [{ msg: "Please accept our User Agreement, Not checked !" }],
        });
      }
      // check if User already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists !" }] });
      }
      // Name length
      if (name.length < 4 || name.length > 64) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Names are 4 ~ 64 charaters long " }] });
      }
      // @TODO - Check if name contain numbers
      let containNumbers = null;
      for (i = 0; i < name.length; i++) {
        if (parseInt(name[i])) {
          containNumbers = true;
        } else {
          containNumbers = false;
        }
      }
      if (containNumbers === true) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Names can not contain Number !" }] });
      }
      // Passwords length checker
      if (password.length < 8 || password.length > 64) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Passwords are 8 ~ 64 charaters long " }] });
      }
      // Passwords Matches checker
      if (password != confirm_password) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Password did not mactch" }] });
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

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 21600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
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
