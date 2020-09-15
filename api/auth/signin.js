// Imports
const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
/// Defined methods
const { check, validationResult } = require("express-validator");
const router = express.Router();

// @route   GET api/auth/signin.js
// @desc    Signin user - Return user token
// @access  Public
router.post(
  "/",
  // Validating body request input Data
  //@Tool express-validator
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    console.log("req: \n", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // Validating user if already exists
      //@Tool mongoose
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Validating password if true
      //@Tool bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      // Creating token, Sending TOKEN back
      //@Tool jasonwebtoken
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
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
