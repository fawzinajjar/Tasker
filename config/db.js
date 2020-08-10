const mongoose = require("mongoose");

const dbURL =
  "mongodb+srv://tasker:tasker@skillconnect.a6cng.mongodb.net/<dbname>?retryWrites=true&w=majority";

const dbconnect = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Server connected to : MongoDB ");
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = dbconnect;
