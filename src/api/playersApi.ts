import { Router } from "express";
import PlayerValidator from "../validators/playerValidator";
import validate from "../validators/validate";
import PlayerControllers from "../controllers/playersControllers";

const playersApi = Router();

// Get all players
playersApi.get("/", PlayerControllers.getPlayersContoller);

// Create a new player
playersApi.post(
  "/",
  PlayerValidator.playerValidation(),
  validate,
  PlayerControllers.createPlayerContoller
);

// Get a player by id
playersApi.get(
  "/:id",
  PlayerValidator.playerIdValidation(),
  validate,
  PlayerControllers.getPlayerContoller
);

// Arm a player with a weapon
playersApi.post(
  "/:id/arm",
  PlayerValidator.playerArmValidation(),
  validate,
  PlayerControllers.armPlayerContoller
);

// Kill a player
playersApi.post(
  "/:id/kill",
  PlayerValidator.playerIdValidation(),
  validate,
  PlayerControllers.killPlayerContoller
);

export default playersApi;
