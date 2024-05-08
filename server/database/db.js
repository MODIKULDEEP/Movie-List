const mongoose = require("mongoose");
const connectDatabase = () => {
  try {
    mongoose
      .connect(process.env.DB_URI, { tlsAllowInvalidCertificates: true })
      .then((data) => {
        console.log(`mongoDB connect with server : ${data.connection.host}`);
      });
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = connectDatabase;
