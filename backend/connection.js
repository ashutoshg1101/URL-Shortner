const mongoose = require("mongoose");

async function connectToMonogoDB() {
  mongoose
    .connect("mongodb://0.0.0.0:27017/url")
    .then(() => {
      console.log("mongodb connected");
    })
    .catch(() => {
      console.log("failed");
    });
}

module.exports = connectToMonogoDB;
