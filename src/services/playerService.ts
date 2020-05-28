import db from "../db";
import { IPlayer } from "../@types/player";

class PlayerService {
  static getAllPlayers = async (): Promise<{
    ok: boolean;
    data: IPlayer[];
    error: string;
  }> => {
    return await db.fetch("players");
  };

  static getPlayerById = async (
    id: number
  ): Promise<{
    ok: boolean;
    player: IPlayer | undefined;
    error: string;
  }> => {
    const { ok, data, error } = await db.fetch("players");
    return {
      ok,
      player: (data as IPlayer[]).find((pl) => pl.id === id),
      error,
    };
  };

  static updatePlayer = async (
    player: IPlayer
  ): Promise<{ ok: boolean; error: string }> => {
    const { ok, data, error } = await db.fetch("players");
    if (!ok) return { ok, error };
    const index = (data as IPlayer[]).findIndex((pl) => pl.id === player.id);
    data[index] = player;
    return db.update("players", data);
  };

  static addPlayer = async (
    player: IPlayer
  ): Promise<{ ok: boolean; error: string }> => {
    const { ok, data, error } = await db.fetch("players");
    if (!ok) return { ok, error };
    data.push(player);
    return db.update("players", data);
  };
}

export default PlayerService;
