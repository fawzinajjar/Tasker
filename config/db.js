const mongoose = require("mongoose");

const dbURL =
  "mongodb+srv://tasker:tasker@skillconnect.a6cng.mongodb.net/Tasker?retryWrites=true&w=majority";

const dbconnect = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Server connected to : MongoDB ");
  } catch (error) {
    console.error("error", error);
    process.exit(1);
  }
};

module.exports = dbconnect;
