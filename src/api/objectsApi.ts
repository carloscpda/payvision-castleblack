import { Router } from "express";
import ObjectValidator from "../validators/objectValidator";
import validate from "../validators/validate";
import ObjectControllers from "../controllers/objectsControllers";
import ObjectRepo from "../repositories/objectRepo";

const objectsApi = Router();
const objectRepo = new ObjectRepo();
const controllers = new ObjectControllers(objectRepo);

// Get all objects
objectsApi.get("/", controllers.getObjectsContoller.bind(controllers));

// Create a new object
objectsApi.post(
  "/",
  ObjectValidator.objectValidation(),
  validate,
  controllers.createObjectContoller.bind(controllers)
);

// Get an object by id
objectsApi.get(
  "/:id",
  ObjectValidator.objectIdValidation(),
  validate,
  controllers.getObjectContoller.bind(controllers)
);

// Upgrade am object with a new value
objectsApi.post(
  "/:id/upgrade",
  ObjectValidator.objectUpgradeValidation(),
  validate,
  controllers.upgradeObjectContoller.bind(controllers)
);

// Delete an object
objectsApi.delete(
  "/:id",
  ObjectValidator.objectIdValidation(),
  validate,
  controllers.deleteObjectContoller.bind(controllers)
);

export default objectsApi;
