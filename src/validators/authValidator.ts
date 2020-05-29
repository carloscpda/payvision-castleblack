import { body } from "express-validator";

class AuthValidator {
  static authSigninValidation = () => {
    return [body("username").isString(), body("password").isString()];
  };
}

export default AuthValidator;
