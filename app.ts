import consola from "consola";
import server from "./src/server";

async function run() {
  const host = process.env.HOST || "0.0.0.0";
  const port = +(process.env.PORT || 8080);

  server.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}

run();
