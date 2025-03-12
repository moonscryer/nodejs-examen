import { NextFunction, Request, Response } from "express";

export const helloMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Let's get snippets!");
  next();
};
