import { Response, Request, NextFunction } from "express";
import { IPlayer } from "../@types/player";
import PlayerError from "../errors/playerErrors";
import { IPlayerRepo } from "../repositories/playerRepo";

class PlayerControllers {
  playerRepo: IPlayerRepo;

  constructor(playerRepo: IPlayerRepo) {
    this.playerRepo = playerRepo;
  }

  // Get all players
  async getPlayersContoller(req: Request, res: Response, next: NextFunction) {
    const { ok, data, error } = await this.playerRepo.getAllPlayers();
    if (!ok) return next(error);
    res.json(data);
  }

  // Create a new player
  async createPlayerContoller(req: Request, res: Response, next: NextFunction) {
    const { ok, data, error } = await this.playerRepo.getAllPlayers();
    if (!ok) return next(error);

    const { name, age } = req.body;

    const player: IPlayer = {
      id: data.slice(-1)[0].id + 1,
      name: name,
      age: age,
      health: 100,
      bag: [],
    };

    const { ok: addOk, error: addErr } = await this.playerRepo.addPlayer(
      player
    );

    if (!addOk) return next(addErr);
    res.location(`/players/${player.id}`).sendStatus(201);
  }

  // Get a player by id
  async getPlayerContoller(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { ok, player, error } = await this.playerRepo.getPlayerById(
      parseInt(id, 10)
    );

    if (!ok) return next(error);
    if (!player)
      return res.status(404).json({
        errors: [PlayerError.playerNotFoundError("id", id)],
      });
    res.json(player);
  }

  // Arm a player with a weapon
  async armPlayerContoller(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { weapon } = req.body;

    const { ok, player, error } = await this.playerRepo.getPlayerById(
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

    const {
      ok: updateOk,
      error: updateError,
    } = await this.playerRepo.updatePlayer(player);
    if (!updateOk) return next(updateError);
    res.location(`/players/${id}`).sendStatus(200);
  }

  // Kill a player
  async killPlayerContoller(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const { ok, player, error } = await this.playerRepo.getPlayerById(
      parseInt(id, 10)
    );

    if (!ok) return next(error);

    if (!player)
      return res.status(404).json({
        errors: [PlayerError.playerNotFoundError("id", id)],
      });

    player.health = 0;

    const {
      ok: updateOk,
      error: updateError,
    } = await this.playerRepo.updatePlayer(player);
    if (!updateOk) return next(updateError);
    res.location(`/players/${id}`).sendStatus(200);
  }
}

export default PlayerControllers;
