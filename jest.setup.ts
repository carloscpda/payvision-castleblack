import db from "./src/db";

export default async function () {
  await db.seed();
}
