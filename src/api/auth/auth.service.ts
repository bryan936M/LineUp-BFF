import { createHmac, randomBytes } from "node:crypto";
import { createToken, verifyToken } from "../../shared/utils/jwt";

const REFRESH_TOKEN_SECRET_KEY = "";

export class AuthService {
  constructor() {}

  async createAccessToken(userId: string, email: string) {
    const payload = {
      userId,
      email,
    };
    return await createToken(payload);
  }

  async verifyAccessToken(jwt: string) {
    return await verifyToken(jwt);
  }

  async createRefreshToken() {
    return randomBytes(32).toString('base64url');
  }

  async hashRefreshToken(refreshToken: string) {
    return createHmac("sha256", REFRESH_TOKEN_SECRET_KEY)
      .update(refreshToken)
      .digest("hex");
  }
}
