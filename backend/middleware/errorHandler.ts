import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Mongoose bad objectId
  if (err.name === "CastError") {
    res.status(404).json({ error: "Resource not found" });
    return;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val: any) => val.message);
    res.status(400).json({ error: messages.join(", ") });
    return;
  }

  res.status(statusCode).json({ error: message });
};
