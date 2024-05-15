import { Hono } from "hono";
import { register } from "../controller/auth/register";
import { login } from "../controller/auth/login";

const router = new Hono()

router.post("/register", register)
router.post("/login", login)

router.get("/login", (c) => {
    return c.text("this is a login")
})

export default router