import { Router } from "express";

const router = Router();

router.get("/health", function (req, res) {
  // @ts-ignore
  res.body = "Up and running";
  // QUESTION: why this endpoint blocks the app?
  /**
   * QUESTION
   * why this endpoint blocks the app?
   *
   * ANSWER
   * Firstly, body is not a property of Request. In fact, I have had to add a @ts-ignore for ignore the type error.
   * But, the endpoint blocks the app because the controller is nos providing any response.
   * The client stays waiting for a response that never arrive
   */
});

export default router;
