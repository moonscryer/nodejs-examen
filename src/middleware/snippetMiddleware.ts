import { NextFunction, Request, Response } from "express";

export const helloMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Let's get snippets!");
    next();
  } catch (error: unknown) {
    console.log("Middleware error");
  }
};
