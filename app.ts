import http from "http";
import express from "express";
import bodyParser from "body-parser";
import consola from "consola";
import router from "./src/router";
import api from "./src/api";

const app = express();
const host = process.env.HOST || "0.0.0.0";
const port = +(process.env.PORT || 8080);
app.set("port", port);

async function run() {
  app.disable("x-powered-by"); // QUESTION: any reason is this line here?
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/", router);
  app.use("/api", api);

  const server = http.createServer(app);

  server.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}

run();
