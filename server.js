const express = require("express");
const dbconnect = require("./config/db");

// Variables
const app = express();

// Connect to database
dbconnect();

// MiddleWare
app.use(express.json({ extended: false }));

// Routes configuration
//main
app.get("/", (req, res) => res.send({ msg: "Response Sent to /" }));
//secodary .use that needs middleware
app.use("/login", (req, res) => res.send({ msg: "Response sent to /login" }));
app.use("/dashboard", (req, res) =>
  res.send({ msg: "Response Sent to /dashboard" })
);
app.use("/register", (req, res) =>
  res.send({ msg: "Response Sent to /register" })
);

// Server listining
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));
