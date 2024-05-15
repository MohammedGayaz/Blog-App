import { Hono } from "hono";

import mainRouter from "./routes/index";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRETE: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.route("/api/v1", mainRouter);

export default app;
