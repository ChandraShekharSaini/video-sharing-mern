import express, { Request, Response } from "express";
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 3400;


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
}))

import connectDB from "./config/db";
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import jwtPassportStrategy from "./config/passportStrategy"
app.use(jwtPassportStrategy.initialize())


app.get("/", (req: Request, res: Response) => {

  res.send("My First TypeScript Project")
});

import routes from "./routes/index"
app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log("http://localhost:", PORT);
});
