const mongoose = require ("mongoose");
const db = require("../model/dbModel");

const Role = require("../model/roles");

const connectDB = async () => {

    try {
         await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });


      new Role({
        name: "employee"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'employee' to roles collection");
      });
    }
  });
}
        //console.log(connection)
    } catch (err) {
        console.error(err)
    }
}


module.exports =  connectDB;