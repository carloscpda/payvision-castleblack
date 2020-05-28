import fs from "fs";
import consola from "consola";
import server from "./src/server";
import db from "./src/db";

async function run() {
  // Seed data
  const PATH = "./cache/data.json";
  if (!fs.existsSync(PATH)) {
    try {
      db.seed();
      console.log("Data loaded successfully.");
    } catch (err) {
      console.log(err);
    }
  }

  // Server init
  const host = process.env.HOST || "0.0.0.0";
  const port = +(process.env.PORT || 8080);

  server.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}

run();
