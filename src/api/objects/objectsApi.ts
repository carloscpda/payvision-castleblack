import { Router, Request, Response, NextFunction } from "express";
import { checkSchema, validationResult } from "express-validator";
import ObjectService from "../../services/objectService";
import ObjectError from "../../errors/objectErrors";
import { IObject } from "../../@types/object";

const objectsApi = Router();

objectsApi.get("/", async function (req, res, next) {
  const { ok, data, error } = await ObjectService.getAllObjects();
  if (ok) res.json(data);
  else next(error);
});

objectsApi.post(
  "/",
  checkSchema({
    name: {
      in: ["body"],
      isString: true,
    },
    value: {
      in: ["body"],
      isInt: true,
      errorMessage: "Required. Must be a number",
    },
  }),
  async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { ok, data, error } = await await ObjectService.getAllObjects();
    if (!ok) return next(error);

    const { name, value } = req.body;
    const obj: IObject = {
      id: data.slice(-1)[0].id + 1,
      name: name,
      value: parseInt(value, 10),
    };

    const { ok: addOk, error: addErr } = await ObjectService.addObject(obj);

    if (addOk) res.location(`/objects/${obj.id}`).sendStatus(201);
    else next(addErr);
  }
);

objectsApi.get(
  "/:id",
  checkSchema({
    id: {
      in: ["params"],
      isInt: true,
    },
  }),
  async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { ok, obj, error } = await ObjectService.getObjetById(
      parseInt(id, 10)
    );

    if (!ok) return next(error);
    if (obj) res.json(obj);
    else
      res.status(404).json({
        errors: [ObjectError.objectNotFoundError("id", id)],
      });
  }
);

objectsApi.patch(
  "/:id",
  checkSchema({
    id: {
      in: ["params"],
      isInt: true,
    },
    value: {
      in: ["body"],
      isInt: true,
      errorMessage: "Required. Must be a number",
    },
  }),
  async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const { value } = req.body;

    const { ok, obj, error } = await ObjectService.getObjetById(
      parseInt(id, 10)
    );

    if (!ok) return next(error);

    if (!obj)
      return res.status(404).json({
        errors: [ObjectError.objectNotFoundError("id", id)],
      });

    obj.value = parseInt(value, 10);

    const {
      ok: updateOk,
      error: updateError,
    } = await ObjectService.updateObject(obj);
    if (!updateOk) return next(updateError);
    else res.location(`/objects/${id}`).sendStatus(200);
  }
);

objectsApi.delete(
  "/:id",
  checkSchema({
    id: {
      in: ["params"],
      isInt: true,
    },
  }),
  async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;

    const { ok, obj, error } = await ObjectService.getObjetById(
      parseInt(id, 10)
    );

    if (!ok) return next(error);

    if (!obj)
      return res.status(404).json({
        errors: [ObjectError.objectNotFoundError("id", id)],
      });

    const {
      ok: removeOk,
      error: removeError,
    } = await ObjectService.removeObject(obj.id);
    if (!removeOk) return next(removeError);
    else res.sendStatus(204);
  }
);

export default objectsApi;
