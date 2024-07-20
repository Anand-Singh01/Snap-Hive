import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { postRoutes } from "./routes/post";
import { userRoutes } from "./routes/user";
import { unauthorizedError } from "./util/helper";

config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_SECRET,
// });

app.use(
  cors({
    origin: [process.env.CLIENT_URL_DEV!],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  })
);
app.use("/user", userRoutes);
app.use("/post", postRoutes);

// global Catch
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return unauthorizedError(res, "unauthorized");
});
export default app;
