import { Router, Response, Request, NextFunction } from "express";
import { validationResult, checkSchema } from "express-validator";
import PlayerError from "../../errors/playerErrors";
import { IPlayer } from "../../@types/player";
import PlayerService from "../../services/playerService";

const playersApi = Router();

playersApi.get("/", async function (req, res, next) {
  const { ok, data, error } = await PlayerService.getAllPlayers();
  if (ok) res.json(data);
  else next(error);
});

playersApi.post(
  "/",
  checkSchema({
    name: {
      in: ["body"],
      isString: true,
    },
    age: {
      in: ["body"],
      isInt: { options: { min: 0, max: 100 } },
      errorMessage: "must be a number between 0 and 100",
    },
  }),
  async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { ok, data, error } = await await PlayerService.getAllPlayers();
    if (!ok) return next(error);

    const { name, age } = req.body;
    const player: IPlayer = {
      id: data.slice(-1)[0].id + 1,
      name: name,
      age: parseInt(age, 10),
      health: 100,
      bag: [],
    };

    const { ok: addOk, error: addErr } = await PlayerService.addPlayer(player);

    if (addOk) res.location(`/players/${player.id}`).sendStatus(201);
    else next(addErr);
  }
);

playersApi.get(
  "/:id",
  checkSchema({
    id: {
      in: ["params"],
      isInt: true,
    },
  }),
  async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { ok, player, error } = await PlayerService.getPlayerById(
      parseInt(id, 10)
    );

    if (!ok) return next(error);
    if (player) res.json(player);
    else
      res.status(404).json({
        errors: [PlayerError.playerNotFoundError("id", id)],
      });
  }
);

playersApi.patch(
  "/:id",
  checkSchema({
    id: {
      in: ["params"],
      isInt: true,
    },
    weapon: {
      in: ["body"],
      optional: true,
      isInt: true,
    },
    health: {
      in: ["body"],
      optional: true,
      isInt: { options: { min: 0 } },
      errorMessage: "must be positive",
    },
  }),
  async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const { weapon, health } = req.body;

    const { ok, player, error } = await PlayerService.getPlayerById(
      parseInt(id, 10)
    );

    if (!ok) return next(error);

    if (!player)
      return res.status(404).json({
        errors: [PlayerError.playerNotFoundError("id", id)],
      });

    if (weapon) {
      if (!player.bag.includes(parseInt(weapon, 10)))
        return res.status(404).json({
          errors: [PlayerError.playerObjectNotFoundError(player.name, weapon)],
        });
    }

    if (weapon) player.weapon = parseInt(weapon, 10);
    if (health !== null) player.health = parseInt(health, 10);

    const {
      ok: updateOk,
      error: updateError,
    } = await PlayerService.updatePlayer(player);
    if (!updateOk) return next(updateError);
    else res.location(`/players/${id}`).sendStatus(200);
  }
);

export default playersApi;
