const mongoose = require ("mongoose");


const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

      .then(() => {
        console.log("Successfully connected to MongoDB.");
      
      })
      .catch(err => {
        console.error("Connection error", err);
        process.exit();
      });
  } catch (err) {
    console.log(err);
  }
}
module.exports =  connectDB;