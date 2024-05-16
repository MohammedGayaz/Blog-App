import { Hono } from "hono";

import userRouter from "./authRouter"
import blogRouter from "./blogRouter"
const router = new Hono();

router.get("/indexTest", (c) => {
  return c.text("this is main api router");
});

router.route("/user", userRouter)
router.route("/blog", blogRouter)

export default router;
