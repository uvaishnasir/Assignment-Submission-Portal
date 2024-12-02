import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./src/DB/db.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();
//connecting  the MongoDB database
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));

const app = express();

// Middlewares
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);
