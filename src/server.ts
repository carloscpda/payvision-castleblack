import http from "http";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import router from "./router";
import api from "./api/api";

const app = express();

app.disable("x-powered-by"); // QUESTION: any reason is this line here?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);
app.use("/api", api);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err);
});

const server = http.createServer(app);

export default server;
