import { Router } from "express";
import PlayerValidator from "../validators/playerValidator";
import validate from "../validators/validate";
import PlayerControllers from "../controllers/playersControllers";
import PlayerRepo from "../repositories/playerRepo";

const playersApi = Router();
const playerRepo = new PlayerRepo();
const controllers = new PlayerControllers(playerRepo);

// Get all players
playersApi.get("/", controllers.getPlayersContoller.bind(controllers));

// Create a new player
playersApi.post(
  "/",
  PlayerValidator.playerValidation(),
  validate,
  controllers.createPlayerContoller.bind(controllers)
);

// Get a player by id
playersApi.get(
  "/:id",
  PlayerValidator.playerIdValidation(),
  validate,
  controllers.getPlayerContoller.bind(controllers)
);

// Arm a player with a weapon
playersApi.post(
  "/:id/arm",
  PlayerValidator.playerArmValidation(),
  validate,
  controllers.armPlayerContoller.bind(controllers)
);

// Kill a player
playersApi.post(
  "/:id/kill",
  PlayerValidator.playerIdValidation(),
  validate,
  controllers.killPlayerContoller.bind(controllers)
);

export default playersApi;
