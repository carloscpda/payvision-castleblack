import { Router } from "express";
import db from "../../db";

const objectsApi = Router();

objectsApi.get("/", async function (req, res, next) {
  const { ok, data, error } = await db.fetch("objects");
  if (ok) res.json(data);
  else next(error);
});

export default objectsApi;
