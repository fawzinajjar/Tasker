// @desc Imports
const express = require("express");
const config = require("config");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
// @desc Defined methods
const router = express.Router();
const { check, validationResult, body } = require("express-validator");

// @route   POST api/auth/signup.js
// @desc    Register new user - Return user token
// @access  Public
// @todo
router.post(
  "/",
  // @desc Validating body request input and form validation standards
  // @tool express-validator
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
      // @ desc Check if agreement accepted
      if (check_box !== true) {
        return res.status(400).json({
          errors: [{ msg: "Please accept our User Agreement, Not checked !" }],
        });
      }

      // @desc Check if User already exists by email
      // @tool mongoose
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists !" }] });
      }
      // @desc Check name length 4~64
      if (name.length < 4 || name.length > 64) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Names are 4 ~ 64 charaters long " }] });
      }
      // @desc Check name if contain numbers
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
      // @desc Check password length 8~64
      if (password.length < 8 || password.length > 64) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Passwords are 8 ~ 64 charaters long " }] });
      }
      // @desc Check password & confirm_password matches
      if (password != confirm_password) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Password did not mactch" }] });
      }
      // @desc Creating new user
      // @tool Mongoose Schema
      user = new User({
        name,
        email,
        password,
      });
      // @desc Encrypting password
      // @tool bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // @desc Saving new user to database
      // @tool mongoose
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      // @desc Creating token, Sending TOKEN back
      // @tool jasonwebtoken
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

module.exports = router;
