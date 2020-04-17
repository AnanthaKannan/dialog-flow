const mongoose = require("mongoose");
const { db } = require('./config/config')
module.exports = function() {
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => {
        console.log(`Mongo dp connecteds... ${db}`)
    }).catch((error) => {
        console.log(`${db} not connected..Node is Exiting...! ${error}`);
      process.exit(1);
    });
};