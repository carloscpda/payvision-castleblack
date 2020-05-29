import { Router, Request, Response } from "express";
import AuthValidator from "./validators/authValidator";
import validate from "./validators/validate";
import AuthError from "./errors/authErrors";

const router = Router();

const authUsername = process.env.username || "admin";
const authPassword = process.env.username || "secret";

export const COOKIE_NAME = "auth-castle-black";
export const COOKIE_VALUE = "bad-cookie-value-castle-black";

router.post(
  "/signin",
  AuthValidator.authSigninValidation(),
  validate,
  function (req: Request, res: Response) {
    const { username, password } = req.body;
    // Check username and password
    if (username !== authUsername || password !== authPassword)
      return res.status(404).json({
        errors: [AuthError.authInvalidError()],
      });

    // Set cookie (24 hours)
    res.cookie(COOKIE_NAME, COOKIE_VALUE, {
      maxAge: 1000 * 60 * 60 * 24,
    });

    // OK response
    res.sendStatus(200);
  }
);

export default router;
