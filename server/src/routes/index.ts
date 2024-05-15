import { Hono } from "hono";

import userRouter from "./authRouter"

const router = new Hono();

router.get("/", (c) => {
  return c.text("this is main api router");
});

router.route("/user", userRouter)

export default router;
