import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(403);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, "secret");
    const { id } = data as TokenPayload;

    req.userId = id;
    return next();
  } catch {
    return res.sendStatus(403);
  }
}