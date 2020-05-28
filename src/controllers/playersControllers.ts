import { Response, Request, NextFunction } from "express";
import { IPlayer } from "../@types/player";
import PlayerError from "../errors/playerErrors";
import PlayerRepo from "../repositories/playerRepo";

class PlayerControllers {
  // Get all players
  static async getPlayersContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { ok, data, error } = await PlayerRepo.getAllPlayers();
    if (!ok) return next(error);
    res.json(data);
  }

  // Create a new player
  static async createPlayerContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { ok, data, error } = await PlayerRepo.getAllPlayers();
    if (!ok) return next(error);

    const { name, age } = req.body;

    const player: IPlayer = {
      id: data.slice(-1)[0].id + 1,
      name: name,
      age: age,
      health: 100,
      bag: [],
    };

    const { ok: addOk, error: addErr } = await PlayerRepo.addPlayer(player);

    if (!addOk) return next(addErr);
    res.location(`/players/${player.id}`).sendStatus(201);
  }

  // Get a player by id
  static async getPlayerContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { ok, player, error } = await PlayerRepo.getPlayerById(
      parseInt(id, 10)
    );

    if (!ok) return next(error);
    if (player) res.json(player);
    else
      res.status(404).json({
        errors: [PlayerError.playerNotFoundError("id", id)],
      });
  }

  // Arm a player with a weapon
  static async armPlayerContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { weapon } = req.body;

    const { ok, player, error } = await PlayerRepo.getPlayerById(
      parseInt(id, 10)
    );

    if (!ok) return next(error);

    if (!player)
      return res.status(404).json({
        errors: [PlayerError.playerNotFoundError("id", id)],
      });

    const objectIndex = player.bag.findIndex((ob) => ob === weapon);

    if (objectIndex === -1)
      return res.status(404).json({
        errors: [PlayerError.playerObjectNotFoundError(player.name, weapon)],
      });

    player.weapon = weapon;
    player.bag.splice(objectIndex, 1);

    const { ok: updateOk, error: updateError } = await PlayerRepo.updatePlayer(
      player
    );
    if (!updateOk) return next(updateError);
    else res.location(`/players/${id}`).sendStatus(200);
  }

  // Kill a player
  static async killPlayerContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    const { ok, player, error } = await PlayerRepo.getPlayerById(
      parseInt(id, 10)
    );

    if (!ok) return next(error);

    if (!player)
      return res.status(404).json({
        errors: [PlayerError.playerNotFoundError("id", id)],
      });

    player.health = 0;

    const { ok: updateOk, error: updateError } = await PlayerRepo.updatePlayer(
      player
    );
    if (!updateOk) return next(updateError);
    else res.location(`/players/${id}`).sendStatus(200);
  }
}

export default PlayerControllers;
