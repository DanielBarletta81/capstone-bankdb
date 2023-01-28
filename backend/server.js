import express from "express";
import cors from 'cors';
import connectDB from './config/database';
import userRoutes from "./routes/userRoutes";
const app = express();

//Connection DB
connectDB();

//set port
const port = process.env.PORT || 8081;

app.use(express.json());

app.use(cors());
// set up routes
app.get('/', (req, res) => {
    res.send("Welcome to Good Bank!")
});

// express router
app.use("/api/user", ("./routes/userRoutes"));

// listen
app.listen(port, () => {
    console.log("Server running on port:" + port)
});

module.exports = app;