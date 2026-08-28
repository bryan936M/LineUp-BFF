import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import { homeRouter } from "./api/home/home.route";
import { authRouter } from "./api/auth/auth.router";

export const createApiRouter = (): Router => {
  const v1Router = Router();
  v1Router.use("/auth", authRouter);

  const apiRouter = Router();
  apiRouter.use("/", homeRouter);
  apiRouter.use("/api/v1", v1Router);

  return apiRouter;
};
