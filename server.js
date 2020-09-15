const express = require("express");
const dbconnect = require("./config/db");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};

// Variables
const app = express();
app.use(cors(corsOptions));

// Connect to database
dbconnect();

// Init MiddleWare
app.use(express.json({ extended: false }));

// Routes configuration
//main
app.get("/", (req, res) => res.send("server"));
//secodary .use that needs middleware

app.use("/login", require("./routes/login"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/register", require("./routes/register"));

// Server listining
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));
