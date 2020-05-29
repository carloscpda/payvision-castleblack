import { body, param } from "express-validator";
import { PLAYER_MIN_AGE, PLAYER_MAX_AGE } from "../@types/player";

class PlayerValidator {
  static playerValidation = () => {
    return [
      body("name").isString(),
      body("age")
        .isInt({ min: PLAYER_MIN_AGE, max: PLAYER_MAX_AGE })
        .withMessage(
          `is required. must be a number between ${PLAYER_MIN_AGE} and ${PLAYER_MAX_AGE}`
        ),
    ];
  };

  static playerIdValidation = () => {
    return [param("id").isInt()];
  };

  static playerArmValidation = () => {
    return [param("id").isInt(), body("weapon").isInt()];
  };

  static playerPickUpValidation = () => {
    return [param("id").isInt(), body("objectId").isInt()];
  };

  static playerAttackValidation = () => {
    return [param("id").isInt(), body("target").isInt()];
  };

  static playerStealValidation = () => {
    return [param("id").isInt(), body("target").isInt()];
  };

  static playerUseObjectValidation = () => {
    return [
      param("id").isInt(),
      body("target").isInt().optional(),
      body("objectId").isInt(),
    ];
  };
}

export default PlayerValidator;
