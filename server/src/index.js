import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/adminRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", userRouter);

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error!:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB !");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}, http://localhost:${port}`);
});
