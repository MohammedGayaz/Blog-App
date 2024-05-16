import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import mainRouter from "./routes/index";
import { logger } from "hono/logger";

type Bindings ={
  DATABASE_URL: string;
  JWT_SECRETE: string;
}

type Variables = {
  prisma: any;
  userId: string
}

const app = new Hono<{Bindings: Bindings, Variables: Variables}>();

// middlewares
app.use(logger())

// PROBLEM: auto complete not working whit this
// app.use(async (c, next) => {
//   const prisma_client = new PrismaClient({
//     datasourceUrl: c.env?.DATABASE_URL,
//   }).$extends(withAccelerate());
//   c.set("prisma", prisma_client);
//   await next();
// });

app.route("/api/v1", mainRouter);

export default app;
