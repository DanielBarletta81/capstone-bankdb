import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, `../${process.env.NODE_ENV.trim()}.env`)
});

 const connectDB = async () => {
    try {
        const mongoDB = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${mongoDB.connection.host}`)
    } catch(error) {
        console.log()
        process.exit(1)
    }
 }
module.exports = connectDB;