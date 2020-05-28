import { IObject } from "./object";

export interface IPlayer {
  id: number;
  name: string;
  age: number;
  health: number;
  bag: IObject["id"][];
  weapon?: IObject["id"];
}
