import { Router } from "express";
import PlayerValidator from "../validators/playerValidator";
import validate from "../validators/validate";
import PlayerControllers from "../controllers/playersControllers";
import PlayerRepo from "../repositories/playerRepo";
import ObjectRepo from "../repositories/objectRepo";

const playersApi = Router();
const playerRepo = new PlayerRepo();
const objectRepo = new ObjectRepo();
const controllers = new PlayerControllers(playerRepo, objectRepo);

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

// Pick up an object
playersApi.post(
  "/:id/pick-up",
  PlayerValidator.playerPickUpValidation(),
  validate,
  controllers.pickUpPlayerContoller.bind(controllers)
);

// Attack another player
playersApi.post(
  "/:id/attack",
  PlayerValidator.playerAttackValidation(),
  validate,
  controllers.attackPlayerContoller.bind(controllers)
);

// Steal bag from another player
playersApi.post(
  "/:id/steal",
  PlayerValidator.playerStealValidation(),
  validate,
  controllers.stealPlayerContoller.bind(controllers)
);

// Resurrect player
playersApi.post(
  "/:id/resurrect",
  PlayerValidator.playerIdValidation(),
  validate,
  controllers.resurrectPlayerContoller.bind(controllers)
);

// Use object against another player or itself
playersApi.post(
  "/:id/use-object",
  PlayerValidator.playerUseObjectValidation(),
  validate,
  controllers.useObjectPlayerContoller.bind(controllers)
);

export default playersApi;
