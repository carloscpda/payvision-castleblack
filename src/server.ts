import http from "http";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import router from "./router";
import api from "./api/api";
import auth from "./auth";
import AuthMiddleware from "./middlewares/authMiddleware";
import HandleErrorsMiddleware from "./middlewares/handleErrorsMiddleware";
import cookieParser from "cookie-parser";

const isTest = process.env.NODE_ENV === "test";

const app = express();

app.disable("x-powered-by");
/**
 * QUESTION
 * any reason is this line here?
 *
 * ANSWER
 * x-powered-by is a header sent it on every request that notes that is an Express server (in this case)
 * This could be a security problem because expose the framework and technology used on the server
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/", router);
app.use("/auth", auth);
if (isTest) app.use("/api", api);
else app.use("/api", AuthMiddleware, api);

app.use(HandleErrorsMiddleware);

const server = http.createServer(app);

export default server;
