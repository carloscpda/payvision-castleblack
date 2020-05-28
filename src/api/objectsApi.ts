import { Router } from "express";
import ObjectValidator from "../validators/objectValidator";
import validate from "../validators/validate";
import ObjectControllers from "../controllers/objectsControllers";

const objectsApi = Router();

// Get all objects
objectsApi.get("/", ObjectControllers.getObjectsContoller);

// Create a new object
objectsApi.post(
  "/",
  ObjectValidator.objectValidation(),
  validate,
  ObjectControllers.createObjectContoller
);

// Get an object by id
objectsApi.get(
  "/:id",
  ObjectValidator.objectIdValidation(),
  validate,
  ObjectControllers.getObjectContoller
);

// Upgrade am object with a new value
objectsApi.post(
  "/:id/upgrade",
  ObjectValidator.objectUpgradeValidation(),
  validate,
  ObjectControllers.upgradeObjectContoller
);

// Delete an object
objectsApi.delete(
  "/:id",
  ObjectValidator.objectIdValidation(),
  validate,
  ObjectControllers.deleteObjectContoller
);

export default objectsApi;
