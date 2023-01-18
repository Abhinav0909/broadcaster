const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ErrorHandler = require("../error/error");
dotenv.config();
function connectDb() {
  mongoose.set("strictQuery", false);
  mongoose.connect(
    process.env.DATABASE_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.error("Error connecting to db");
      } else {
        console.log("Connecting to the db successfully");
      }
    }
  );
}
module.exports = connectDb;
