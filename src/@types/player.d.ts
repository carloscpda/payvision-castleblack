import { IItem } from "./item";

export interface IPlayer {
  id: number;
  name: string;
  age: number;
  health: number;
  bag: IItem["id"][];
  weapon?: IItem["id"];
}
