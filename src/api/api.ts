import { Router } from "express";
import playersApi from "./players";
import objectsApi from "./objects";

const api = Router();

api.use("/objects", objectsApi);
api.use("/players", playersApi);

export default api;
