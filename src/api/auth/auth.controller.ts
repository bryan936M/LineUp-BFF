import { type CookieOptions, type Request, type Response } from "express";
import type { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly auth: AuthService) {}

  private ACCESS_COOKIE_NAME = "LINEUP_AUTH_KEY_1";
  private REFRESH_COOKIE_NAME = "LINEUP_AUTH_KEY_2";
  private COOKIE_OPTIONS: CookieOptions = {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  };

  googleAuthCallback= async(
    request: Request,
    response: Response,
  ): Promise<void> => {
    // collect the passport injected user object
    const userPayload = request.user! as { id: string; email: string };
    console.log(userPayload)
    const accessToken = await this.auth.createAccessToken(
      userPayload.id,
      userPayload.email,
    );
    const refreshToken = await this.auth.createRefreshToken();
    const refreshTokenHash = await this.auth.hashRefreshToken(refreshToken); // Save to database

    // create and return cookie Response
    response
      .cookie(this.ACCESS_COOKIE_NAME, accessToken, this.COOKIE_OPTIONS)
      .cookie(this.REFRESH_COOKIE_NAME, refreshToken, this.COOKIE_OPTIONS)
      .json({ success: true });
  }
}
