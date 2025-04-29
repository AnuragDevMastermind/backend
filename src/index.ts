import express, { Request, Response } from "express";
import router from "./router/createRouter";
import { connectDB } from "./db/db";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { startAgenda, stopAgenda } from "./jobs/agenda";
import dotenv from "dotenv"

dotenv.config()

const PORT = `${process.env.PORT}`;

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: `${process.env.FRONTEND_URL}`,
  })
);

app.options(
  "*",
  cors({
    credentials: true,
    origin: `${process.env.FRONTEND_URL}`,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

const startServer = async () => {
  await startAgenda();
  app.use("/api", router());

  app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({msg:"hello world"})
  })

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

connectDB()
  .then(startServer)
  .catch((error) => {
    console.error("MONGO db connection failed !!! ", error.message);
  });

process.on("SIGTERM", async () => {
  await stopAgenda();
  process.exit(0);
});


process.on("SIGINT", async () => {
  await stopAgenda();
  process.exit(0);
});