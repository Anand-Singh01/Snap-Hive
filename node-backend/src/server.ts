import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { userRoutes } from "./routes/user";
const app = express();
config();
app.use(
  cors({
    origin: [process.env.CLIENT_URL_DEV!],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/user", userRoutes);
export default app;
