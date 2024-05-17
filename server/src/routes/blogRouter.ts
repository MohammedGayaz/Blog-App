import { Hono } from "hono";
import { create } from "../controller/blogs/create";
import { update } from "../controller/blogs/update";
import { getBlog } from "../controller/blogs/getBlog";
import { allBlogs } from "../controller/blogs/allBlogs";
import { authenticateUser } from "../middleware/authentication";

const router = new Hono()


router.use("/*", authenticateUser)

router.get("/blogTest", (c) => {return c.text("blog router")} )

router.post("/create", create)
router.put("/update", update)
router.get("/get/:id", getBlog)
router.get("/all", allBlogs)


export default router