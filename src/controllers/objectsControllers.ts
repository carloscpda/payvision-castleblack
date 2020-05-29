import { Request, Response, NextFunction } from "express";
import { IObjectRepo } from "../repositories/objectRepo";
import ObjectError from "../errors/objectErrors";
import { IObject } from "../@types/object";

class ObjectControllers {
  objectRepo: IObjectRepo;

  constructor(objectRepo: IObjectRepo) {
    this.objectRepo = objectRepo;
  }

  async getObjectsContoller(req: Request, res: Response, next: NextFunction) {
    const { ok, data, error } = await this.objectRepo.getAllObjects();
    if (!ok) return next(error);
    res.json(data);
  }

  async createObjectContoller(req: Request, res: Response, next: NextFunction) {
    const { ok, data, error } = await await this.objectRepo.getAllObjects();
    if (!ok) return next(error);

    const { name, value } = req.body;
    const obj: IObject = {
      id: data.slice(-1)[0].id + 1,
      name: name,
      value: parseInt(value, 10),
    };

    const { ok: addOk, error: addErr } = await this.objectRepo.addObject(obj);

    if (!addOk) return next(addErr);
    res.location(`/objects/${obj.id}`).sendStatus(201);
  }

  async getObjectContoller(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { ok, obj, error } = await this.objectRepo.getObjetById(
      parseInt(id, 10)
    );

    if (!ok) return next(error);
    if (obj) res.json(obj);
    else
      res.status(404).json({
        errors: [ObjectError.objectNotFoundError("id", id)],
      });
  }

  async upgradeObjectContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { value } = req.body;

    // Get and validate object
    const { ok, obj, error } = await this.objectRepo.getObjetById(
      parseInt(id, 10)
    );
    if (!ok) return next(error);
    if (!obj)
      return res.status(404).json({
        errors: [ObjectError.objectNotFoundError("id", id)],
      });

    // Update object
    obj.value = parseInt(value, 10);
    const {
      ok: updateOk,
      error: updateError,
    } = await this.objectRepo.updateObject(obj);
    if (!updateOk) return next(updateError);

    // Ok response
    res.location(`/objects/${id}`).sendStatus(200);
  }

  async deleteObjectContoller(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    // Get and validate object
    const { ok, obj, error } = await this.objectRepo.getObjetById(
      parseInt(id, 10)
    );
    if (!ok) return next(error);
    if (!obj)
      return res.status(404).json({
        errors: [ObjectError.objectNotFoundError("id", id)],
      });

    // Delete object
    const {
      ok: removeOk,
      error: removeError,
    } = await this.objectRepo.removeObject(obj.id);
    if (!removeOk) return next(removeError);

    // Ok response
    res.sendStatus(204);
  }
}

export default ObjectControllers;
