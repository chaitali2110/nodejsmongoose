const mongoose = require("mongoose");

const database = mongoose.connect(
  process.env.DB_URL,
  { 
    dbName: "dbnodejs",
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  },
  (error) => {
    if (!error) {
      console.log("connected to the mongoDB");
    } else {
      console.log("connection to mongoDB failed \n" + error);
    }
  }
);

exports.mongoose = database;