import { Router } from "express";

const router = Router();

router.get("/health", function (req, res) {
  // @ts-ignore
  res.body = "Up and running";
  // QUESTION: why this endpoint blocks the app?
});

export default router;
