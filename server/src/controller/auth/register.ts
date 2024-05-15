import { getClient } from "../../helper/index";
import { sign } from 'hono/jwt'

// user registration controller
export const register = async (c: any) => {
    // get user data and validate user input
    const body = await c.req.json();

    try{
    // check if user exists
    const prisma = await getClient(c)
    const user = await prisma.user.findUnique({where: {email: body.email}})
    if(user) {
        c.status(409)
        return c.json({"error" : "user already exist"})
    }

    // if !user then hash password and create user
    const response = await prisma.user.create({
        data:{
            name: body.name,
            email: body.email,
            password: await body.password
        }
    })

    // and generate jwt
    const payload = {
        id : response.id,
        email : response.email
    }
    const token = await sign(payload, c.env.JWT_SECRETE)

    // send token and appropriate message
    c.status(200)
    return c.json({token, message: "user created"})
    } catch(err) {
        c.status(500)
        return c.json({"error": "Internal server problem"})
    }
}