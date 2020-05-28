import { IObject } from "./object";

export interface IPlayer {
  id: number;
  name: string;
  age: number;
  health: number;
  bag: IObject["id"][];
  weapon?: IObject["id"];
}

export const PLAYER_MIN_AGE = 0;
export const PLAYER_MAX_AGE = 100;
