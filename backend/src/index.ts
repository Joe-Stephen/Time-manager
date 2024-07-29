import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRouter from "./routers/userRoutes";
dotenv.config();
import { connectDB } from "./configs/connectDB";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//using morgan middleware to log requests/responses
app.use(morgan("dev"));
//Connecting to database
connectDB();
//route to test the server
app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
