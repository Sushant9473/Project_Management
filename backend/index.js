import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

dotenv.config();
const port = process.env.PORT || 3030;

// Updated CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "https://mern-dusky-zeta.vercel.app"],
    credentials: true, // Allow credentials (cookies) to be included
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Enable pre-flight requests for all routes
app.options("*", cors());

// Database connection
import connectDB from "./config/db.js";
connectDB();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
