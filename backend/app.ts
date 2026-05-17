import express, { Request, Response } from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.use(errorHandler);

export default app;
