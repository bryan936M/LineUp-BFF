import { Router } from "express";
import passport from "passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export function createAuthRouter(controller: AuthController) {
  const router = Router();

  router.route("/google").get(
    passport.authenticate('google', {
      scope: ["profile", "email"], // Target scope values required from Google Cloud console
      session: false, // Ensures stateless JWT operations
    }),
  );

  router.route("/google/callback").get(
    passport.authenticate("google", {
      failureRedirect: "/auth/failed",
      session: false,
      failureMessage: "Failed to login with google credentials",
    }),
    controller.googleAuthCallback,
  );

  return router;
}

const authService = new AuthService();
const authController = new AuthController(authService);
export const authRouter = createAuthRouter(authController);
