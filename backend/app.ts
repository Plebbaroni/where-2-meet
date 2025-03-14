/*
RUNS THE SERVER AND STUFF
*/
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes"
import * as dotenv from 'dotenv';


dotenv.config();
const app = express();
const SERVER_PORT = 5180;

app.use(cors({ origin: process.env.ALLOWED_ORIGINS || "*", credentials: true }));
app.use(express.json({ limit: "20mb" }));

const PORT = process.env.PORT || 5181;

app.use("/backend", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});