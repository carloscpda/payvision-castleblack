import { Request, Response, NextFunction } from "express";
import ObjectRepo from "../repositories/objectRepo";
import ObjectError from "../errors/objectErrors";
import { IObject } from "../@types/object";

class ObjectControllers {
  static async getObjectsContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { ok, data, error } = await ObjectRepo.getAllObjects();
    if (ok) res.json(data);
    else next(error);
  }

  static async createObjectContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { ok, data, error } = await await ObjectRepo.getAllObjects();
    if (!ok) return next(error);

    const { name, value } = req.body;
    const obj: IObject = {
      id: data.slice(-1)[0].id + 1,
      name: name,
      value: parseInt(value, 10),
    };

    const { ok: addOk, error: addErr } = await ObjectRepo.addObject(obj);

    if (addOk) res.location(`/objects/${obj.id}`).sendStatus(201);
    else next(addErr);
  }

  static async getObjectContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { ok, obj, error } = await ObjectRepo.getObjetById(parseInt(id, 10));

    if (!ok) return next(error);
    if (obj) res.json(obj);
    else
      res.status(404).json({
        errors: [ObjectError.objectNotFoundError("id", id)],
      });
  }

  static async upgradeObjectContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { value } = req.body;

    const { ok, obj, error } = await ObjectRepo.getObjetById(parseInt(id, 10));

    if (!ok) return next(error);

    if (!obj)
      return res.status(404).json({
        errors: [ObjectError.objectNotFoundError("id", id)],
      });

    obj.value = parseInt(value, 10);

    const { ok: updateOk, error: updateError } = await ObjectRepo.updateObject(
      obj
    );
    if (!updateOk) return next(updateError);
    else res.location(`/objects/${id}`).sendStatus(200);
  }

  static async deleteObjectContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    const { ok, obj, error } = await ObjectRepo.getObjetById(parseInt(id, 10));

    if (!ok) return next(error);

    if (!obj)
      return res.status(404).json({
        errors: [ObjectError.objectNotFoundError("id", id)],
      });

    const { ok: removeOk, error: removeError } = await ObjectRepo.removeObject(
      obj.id
    );
    if (!removeOk) return next(removeError);
    else res.sendStatus(204);
  }
}

export default ObjectControllers;
