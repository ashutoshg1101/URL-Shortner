const mongoose = require("mongoose");

async function connectToMonogoDB() {
  mongoose
    .connect(process.env.mongoURL)
    .then(() => {
      console.log("mongodb connected");
    })
    .catch(() => {
      console.log("failed");
    });
}

module.exports = connectToMonogoDB;
