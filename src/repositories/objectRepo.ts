import db from "../db";
import { IObject } from "../@types/object";

class ObjectRepo {
  static getAllObjects = async (): Promise<{
    ok: boolean;
    data: IObject[];
    error: string;
  }> => {
    return await db.fetch("objects");
  };

  static getObjetById = async (
    id: number
  ): Promise<{
    ok: boolean;
    obj: IObject | undefined;
    error: string;
  }> => {
    const { ok, data, error } = await db.fetch("objects");
    return {
      ok,
      obj: (data as IObject[]).find((ob) => ob.id === id),
      error,
    };
  };

  static updateObject = async (
    obj: IObject
  ): Promise<{ ok: boolean; error: string }> => {
    const { ok, data, error } = await db.fetch("objects");
    if (!ok) return { ok, error };
    const index = (data as IObject[]).findIndex((ob) => ob.id === obj.id);
    data[index] = obj;
    return db.update("objects", data);
  };

  static addObject = async (
    obj: IObject
  ): Promise<{ ok: boolean; error: string }> => {
    const { ok, data, error } = await db.fetch("objects");
    if (!ok) return { ok, error };
    data.push(obj);
    return db.update("objects", data);
  };

  static removeObject = async (
    objectId: number
  ): Promise<{ ok: boolean; error: string }> => {
    const { ok, data, error } = await db.fetch("objects");
    if (!ok) return { ok, error };
    const index = (data as IObject[]).findIndex((ob) => ob.id === objectId);
    data.splice(index, 1);
    return db.update("objects", data.slice());
  };
}

export default ObjectRepo;
