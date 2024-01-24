const mongoose = require("mongoose");

async function connectToMonogoDB() {
  mongoose
    .connect("mongodb+srv://ashutosh:12345@cluster0.ydgw97j.mongodb.net/")
    .then(() => {
      console.log("mongodb connected");
    })
    .catch(() => {
      console.log("failed");
    });
}

module.exports = connectToMonogoDB;
