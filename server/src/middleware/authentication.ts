// authentication of jwt

import { jwt, verify } from "hono/jwt";

export const authenticateUser = async (c: any, next: any) => {
  try {
    // get jwt token and separate berar and token
    const jwtToken = c.req.header("Authorization");
    if (!jwtToken) {
      throw new Error("Provide a token");
    }

    // verify token
    const payload = await verify(jwtToken, c.env.JWT_SECRETE);
    if (!payload) {
      throw new Error("Invalid token");
    }

    // set userId for creating post field for authorId
    c.set("userId", payload.id);
    await next();
  } catch (err: any) {
    c.status(401);
    // console.log(err);
    return c.json({ error: err.message || "Invalid token" }, 401);
  }
};
