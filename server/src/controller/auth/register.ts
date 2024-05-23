import { sign } from "hono/jwt";
import { prisma_client } from "../../helper/client";
import { registerInput } from "@green_dev/blog/dist/index";

// user registration controller
export const register = async (c: any) => {
    // get user data and validate user input
    const body = await c.req.json();
    console.log(body)
    try {
        const { success, error } = registerInput.safeParse(body);
        console.log(success)
        if (!success) {
            console.log(error.message)
            throw new Error(error.errors[0].message);
        }
        // check if user exists
        const prisma = await prisma_client(c);
        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if (user) {
            c.status(409);
            throw new Error("User Already Exists");
        }

        // if !user then hash password and create user
        const response = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: await body.password,
            },
        });

        // and generate jwt
        const payload = {
            id: response.id,
            email: response.email,
        };
        const token = await sign(payload, c.env.JWT_SECRETE);

        // send token and appropriate message
        c.status(200);
        return c.json({ message: "user created", token });
    } catch (err: any) {
        // c.status(500)
        return c.json({ error: err.message || "Internal server problem" });
    }
};
