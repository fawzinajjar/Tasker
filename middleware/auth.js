const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");

// Middleware Authentication check by token
module.exports = function (req, res, next) {
  // check if request contain token
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No Token , Autherization Dednied" });
  }
  // verify the token with the jwtSecret
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
