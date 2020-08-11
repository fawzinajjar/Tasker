const mongoose = require("mongoose");
const config = require("config");

// Connect To MongoDB function
const dbconnect = async () => {
  try {
    await mongoose.connect(config.get("URI"), {
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
