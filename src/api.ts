import { Router } from "express";
import { objects, players } from "./data";

const api = Router();

// EXAMPLE ENDPOINT: LIST ALL OBJECTS
api.get("/objects", function (req, res) {
  res.json(objects);
});

export default api;
