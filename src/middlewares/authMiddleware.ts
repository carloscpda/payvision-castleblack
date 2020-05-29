import { Request, Response, NextFunction } from "express";
import { COOKIE_NAME, COOKIE_VALUE } from "../auth";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies[COOKIE_NAME] !== COOKIE_VALUE) return res.sendStatus(401);
  next();
};

export default AuthMiddleware;
