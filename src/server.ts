import http from "http";
import express from "express";
import bodyParser from "body-parser";
import router from "./router";
import api from "./api";

const app = express();

app.disable("x-powered-by"); // QUESTION: any reason is this line here?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);
app.use("/api", api);

const server = http.createServer(app);

export default server;
