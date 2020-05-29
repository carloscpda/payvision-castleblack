import { Request, Response } from "express";

const HandleErrorsMiddleware = (err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send(err);
};

export default HandleErrorsMiddleware;
