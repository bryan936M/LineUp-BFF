import express, { type Request, type Response } from "express";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world." });
});

app.listen(port, () => {
  console.log("Server running on port ", port);
});
