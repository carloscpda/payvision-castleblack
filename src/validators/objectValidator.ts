import { body, param } from "express-validator";

class ObjectValidator {
  static objectValidation = () => {
    return [
      body("name").isString(),
      body("value").isInt().withMessage(`is required. must be a number`),
    ];
  };

  static objectIdValidation = () => {
    return [param("id").isInt()];
  };

  static objectUpgradeValidation = () => {
    return [param("id").isInt(), body("value").isInt()];
  };
}

export default ObjectValidator;
