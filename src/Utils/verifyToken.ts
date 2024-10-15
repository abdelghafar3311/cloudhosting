import jwt from "jsonwebtoken";
import { PayloadVal } from "./types";
import { NextRequest } from "next/server";
// verify token for APIs end points
export function verifyToken(request: NextRequest): PayloadVal | null {
  try {
    // get token from cookie
    const TokenCookie = request.cookies.get("token");
    // get token
    const token = TokenCookie?.value as string;
    // check token is find
    if (!token) return null;
    // private key
    const privateKey = process.env.JWT_SECRET as string;
    // verify token
    const usePayload = jwt.verify(token, privateKey) as PayloadVal;
    // return data
    return usePayload;
  } catch (error) {
    return null;
  }
}
// verify token for pages
export function verifyTokenForPages(token: string): PayloadVal | null {
  try {
    // private key
    const privateKey = process.env.JWT_SECRET as string;
    // verify token
    const usePayload = jwt.verify(token, privateKey) as PayloadVal;
    if (!usePayload) return null;
    // return data
    return usePayload;
  } catch (error) {
    return null;
  }
}
