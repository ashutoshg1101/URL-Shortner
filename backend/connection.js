const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

async function connectToMonogoDB() {
  const mongourl = process.env.mongoURL;
  mongoose
    .connect(mongourl)
    .then(() => {
      console.log("mongodb connected");
    })
    .catch(() => {
      console.log("failed");
    });
}

module.exports = connectToMonogoDB;
