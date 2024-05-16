import { Hono } from "hono";
import { register } from "../controller/auth/register";
import { login } from "../controller/auth/login";

const router = new Hono();

router.get("/authTest", (c) => {
  return c.text("this is a auth");
});

router.post("/register", register);
router.post("/login", login);



export default router;
