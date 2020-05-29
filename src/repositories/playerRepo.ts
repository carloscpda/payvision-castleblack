import db from "../db";
import { IPlayer } from "../@types/player";

export interface IPlayerRepo {
  getAllPlayers: () => Promise<{ ok: boolean; data: IPlayer[]; error: string }>;
  getPlayerById: (
    id: number
  ) => Promise<{ ok: boolean; player: IPlayer | undefined; error: string }>;
  updatePlayer: (player: IPlayer) => Promise<{ ok: boolean; error: string }>;
  addPlayer: (player: IPlayer) => Promise<{ ok: boolean; error: string }>;
}

class PlayerRepo implements IPlayerRepo {
  getAllPlayers = async (): Promise<{
    ok: boolean;
    data: IPlayer[];
    error: string;
  }> => {
    return await db.fetch("players");
  };

  getPlayerById = async (
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

  updatePlayer = async (
    player: IPlayer
  ): Promise<{ ok: boolean; error: string }> => {
    const { ok, data, error } = await db.fetch("players");
    if (!ok) return { ok, error };
    const index = (data as IPlayer[]).findIndex((pl) => pl.id === player.id);
    data[index] = player;
    return db.update("players", data);
  };

  addPlayer = async (
    player: IPlayer
  ): Promise<{ ok: boolean; error: string }> => {
    const { ok, data, error } = await db.fetch("players");
    if (!ok) return { ok, error };
    data.push(player);
    return db.update("players", data);
  };
}

export default PlayerRepo;
