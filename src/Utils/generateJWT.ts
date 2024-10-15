import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { PayloadVal } from "./types";

// this make token
export function generateJWT(payload: PayloadVal): string {
  const jwt_key = process.env.JWT_SECRET as string;

  const token = jwt.sign(payload, jwt_key, {
    expiresIn: "1d",
  });

  return token;
}

// set cookie
export function setCookie(payload: PayloadVal): string {
  const token = generateJWT(payload);
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 3,
  });
  return cookie;
}
