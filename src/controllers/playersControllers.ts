import { Response, Request, NextFunction } from "express";
import { IPlayer } from "../@types/player";
import PlayerError from "../errors/playerErrors";
import { IPlayerRepo } from "../repositories/playerRepo";
import { IObjectRepo } from "../repositories/objectRepo";
import ObjectError from "../errors/objectErrors";
import { IObject } from "../@types/object";

class PlayerControllers {
  playerRepo: IPlayerRepo;
  objectRepo: IObjectRepo;

  constructor(playerRepo: IPlayerRepo, objectRepo: IObjectRepo) {
    this.playerRepo = playerRepo;
    this.objectRepo = objectRepo;
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

    const objectIndex = player.bag.findIndex(
      (ob) => ob === parseInt(weapon, 10)
    );

    if (objectIndex === -1)
      return res.status(404).json({
        errors: [PlayerError.playerObjectNotFoundError(player.name, weapon)],
      });

    if (player.weapon) player.bag.push(player.weapon);
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

  // Pick up an unused object
  async pickUpPlayerContoller(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { objectId } = req.body;

    // Get and validate player
    const { ok, player, error } = await this.playerRepo.getPlayerById(
      parseInt(id, 10)
    );
    if (!ok) return next(error);
    if (!player)
      return res.status(404).json({
        errors: [PlayerError.playerNotFoundError("id", id)],
      });

    // Get and validate object
    const {
      ok: objOk,
      obj,
      error: objError,
    } = await this.objectRepo.getObjetById(parseInt(id, 10));
    if (!objOk) return next(objError);
    if (!obj)
      return res.status(404).json({
        errors: [ObjectError.objectNotFoundError("objectId", objectId)],
      });

    // Get all players
    const {
      ok: playersOk,
      data: playersData,
      error: playersErr,
    } = await this.playerRepo.getAllPlayers();
    if (!playersOk) return next(playersErr);

    // Check if object is in use
    const usedObjects = playersData
      .map((pl) => [pl.weapon, ...pl.bag].filter(Boolean))
      .flat();
    if (usedObjects.includes(objectId))
      return res.status(404).json({
        errors: [PlayerError.playerPickUpUsedObjectError(objectId)],
      });

    // Update player
    player.bag.push(objectId);
    const {
      ok: updateOk,
      error: updateError,
    } = await this.playerRepo.updatePlayer(player);
    if (!updateOk) return next(updateError);
    res.location(`/players/${id}`).sendStatus(200);
  }

  // Attack another player
  async attackPlayerContoller(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { target: targetId } = req.body;

    // Get and validate player
    const { ok, player, error } = await this.playerRepo.getPlayerById(
      parseInt(id, 10)
    );
    if (!ok) return next(error);
    if (!player)
      return res.status(404).json({
        errors: [PlayerError.playerNotFoundError("id", id)],
      });
    if (!player.weapon)
      return res.status(404).json({
        errors: [PlayerError.playerDisarmedError(player.name)],
      });

    // Get player weapon
    const {
      ok: weaponOk,
      obj: weapon,
      error: weaponErr,
    } = await this.objectRepo.getObjetById(player.weapon);
    if (!weaponOk) return next(weaponErr);

    // Get and validate target
    const {
      ok: targetOk,
      player: target,
      error: targetErr,
    } = await this.playerRepo.getPlayerById(parseInt(targetId, 10));
    if (!targetOk) return next(targetErr);
    if (!target)
      return res.status(404).json({
        errors: [PlayerError.playerNotFoundError("target", targetId)],
      });

    // Update target
    target.health = Math.max(0, target.health + (weapon as IObject).value);
    const {
      ok: updateOk,
      error: updateError,
    } = await this.playerRepo.updatePlayer(target);
    if (!updateOk) return next(updateError);
    res.location(`/players/${target.id}`).sendStatus(200);
  }

  // Steal bag from another player
  async stealPlayerContoller(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { target: targetId } = req.body;

    // Get and validate player
    const { ok, player, error } = await this.playerRepo.getPlayerById(
      parseInt(id, 10)
    );
    if (!ok) return next(error);
    if (!player)
      return res.status(404).json({
        errors: [PlayerError.playerNotFoundError("id", id)],
      });

    // Get and validate target
    const {
      ok: targetOk,
      player: target,
      error: targetErr,
    } = await this.playerRepo.getPlayerById(parseInt(targetId, 10));
    if (!targetOk) return next(targetErr);
    if (!target)
      return res.status(404).json({
        errors: [PlayerError.playerNotFoundError("target", targetId)],
      });

    // Update player
    player.bag = [...player.bag, ...target.bag];
    const {
      ok: updatePlayerOk,
      error: updatePlayerError,
    } = await this.playerRepo.updatePlayer(player);
    if (!updatePlayerOk) return next(updatePlayerError);

    // Update player
    target.bag = [];
    const {
      ok: updateTargetOk,
      error: updateTargetError,
    } = await this.playerRepo.updatePlayer(target);
    if (!updateTargetOk) return next(updateTargetError);

    // OK response
    res.location(`/players/${player.id}`).sendStatus(200);
  }

  // Resurrect a player
  async resurrectPlayerContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    // Get and validate player
    const { ok, player, error } = await this.playerRepo.getPlayerById(
      parseInt(id, 10)
    );
    if (!ok) return next(error);
    if (!player)
      return res.status(404).json({
        errors: [PlayerError.playerNotFoundError("id", id)],
      });
    if (player.health)
      return res.status(404).json({
        errors: [PlayerError.playerAliveError(player.name)],
      });

    // Update player
    player.health = 100;
    const {
      ok: updateOk,
      error: updateError,
    } = await this.playerRepo.updatePlayer(player);
    if (!updateOk) return next(updateError);

    // OK response
    res.location(`/players/${id}`).sendStatus(200);
  }

  // Attack another player
  async useObjectPlayerContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { target: targetId, objectId } = req.body;

    // Get and validate player
    const { ok, player, error } = await this.playerRepo.getPlayerById(
      parseInt(id, 10)
    );
    if (!ok) return next(error);
    if (!player)
      return res.status(404).json({
        errors: [PlayerError.playerNotFoundError("id", id)],
      });
    if (!player.bag.includes(objectId))
      return res.status(404).json({
        errors: [PlayerError.playerObjectNotFoundError(player.name, objectId)],
      });

    // Get player object
    const {
      ok: objOk,
      obj,
      error: objErr,
    } = await this.objectRepo.getObjetById(objectId);
    if (!objOk) return next(objErr);

    // Get and validate target - if not target provided, object will be used to himself
    let target: IPlayer;
    if (targetId) {
      const {
        ok: targetOk,
        player: targetPlayer,
        error: targetErr,
      } = await this.playerRepo.getPlayerById(parseInt(targetId, 10));
      if (!targetOk) return next(targetErr);
      if (!targetPlayer)
        return res.status(404).json({
          errors: [PlayerError.playerNotFoundError("target", targetId)],
        });
      target = targetPlayer;
    } else {
      target = player;
    }

    // Update target
    target.health = Math.max(0, target.health + (obj as IObject).value);
    const {
      ok: updateOk,
      error: updateError,
    } = await this.playerRepo.updatePlayer(target);
    if (!updateOk) return next(updateError);

    // OK response
    res.location(`/players/${target.id}`).sendStatus(200);
  }
}

export default PlayerControllers;
