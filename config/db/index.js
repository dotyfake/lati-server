const mongoose = require("mongoose");
require("dotenv").config();
async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@lati-db.zt1cuni.mongodb.net/lati?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
      }
    );
    console.log("Connect successfully!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
