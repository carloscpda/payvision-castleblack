// This will be your data source. We'll use it as mock resource for test purpouse

import { IPlayer } from "./@types/player";
import { IObject } from "./@types/object";

export const players: IPlayer[] = [
  { id: 1, name: "Jon Snow", age: 23, health: 100, bag: [1], weapon: 6 },
  { id: 2, name: "Littlefinger", age: 35, health: 100, bag: [2] },
  { id: 3, name: "Daenerys Targaryen", age: 20, health: 100, bag: [3] },
  { id: 4, name: "Samwell Tarly", age: 18, health: 100, bag: [4] },
  { id: 5, name: "Khal Drogo", age: 24, health: 0, bag: [] },
];

export const objects: IObject[] = [
  { id: 1, name: "spoon", value: -1 },
  { id: 2, name: "knife", value: -10 },
  { id: 3, name: "sword", value: -20 },
  { id: 4, name: "potion", value: +20 },
  { id: 5, name: "superpotion", value: +50 },
  { id: 6, name: "bow", value: -15 },
];
