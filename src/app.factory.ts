import express, { type Express } from "express";
import passport from "./api/auth/passport.service";
import cookieParser from "cookie-parser";
import cors from "cors"
import { createApiRouter } from "./api.routes";


export const createApp = (): Express => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"]
  }));
  app.use(passport.initialize());
  app.use(createApiRouter());

  return app;
};
