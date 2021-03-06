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
    return res.status(403).send({ message: "JSON Web Token is required for this request" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.JWT_KEY || "");
    const { id } = data as TokenPayload;

    req.userId = id;
    return next();
  } catch {
    return res.status(401).send({ message: "JSON Web Token is invalid" });
  }
}
