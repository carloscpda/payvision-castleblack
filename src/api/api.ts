import { Router } from "express";
import playersApi from "./playersApi";
import objectsApi from "./objectsApi";

const api = Router();

api.use("/objects", objectsApi);
api.use("/players", playersApi);

export default api;
