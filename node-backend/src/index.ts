import { PrismaClient } from "@prisma/client";
import app from "./server.js";
export const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

prisma
  .$connect()
  .then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((error : Error) => {
    console.error("Error connecting to database", error);
    process.exit(1);
  });
