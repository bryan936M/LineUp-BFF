import Router, { type Request, type Response } from "express";

export const homeRouter = Router();

homeRouter.get("/", async (req: Request, res: Response) => {
  res.json("Hello world.");
});
