import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = "2f70eb7ee1823935f42c43a3ae6aae8b56787a4ccd301386ac8943f03e874669";
const DOMAIN = "http://localhost:3000";
const BACKEND_DOMAIN = "http:localhost:3001";
const secret = new TextEncoder().encode(SECRET_KEY);
const alg = "HS256";

interface IJWTPayload {
  userId: string;
  email: string;
}

export async function createToken(payload: IJWTPayload, ttl: string = '15m'): Promise<string> {
  return await new SignJWT({ payload })
    .setProtectedHeader({ alg })
    .setIssuer(BACKEND_DOMAIN)
    .setAudience(DOMAIN)
    .setIssuedAt(new Date())
    .setExpirationTime(ttl)
    .sign(secret);
}
export async function verifyToken(jwt: string) {
  return await jwtVerify(jwt, secret, {
    audience: DOMAIN,
    issuer: BACKEND_DOMAIN,
  });
}
