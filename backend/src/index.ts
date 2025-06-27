import express, { Request, Response } from "express";
const app = express();
const PORT = process.env.PORT || 3400;

import connectDB from "./config/db";
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req: Request, res: Response) => {

  res.send("My First TypeScript Project")
});

app.listen(PORT, () => {

  console.log("http://localhost:", PORT);
});
