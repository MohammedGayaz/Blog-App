// user login controller 

import { getClient } from "../../helper";
import { sign } from "hono/jwt"

export const login = async(c: any) => {
    console.log("this tis login controller")
    //get user data
    const body = await c.req.json();

    try{
        // validate user data
        // check if user exist 
        const prisma = await getClient(c)
        const user = await prisma.user.findUnique({
            where:{
                email: body.email,
                password: body.password
            }
        })

        // if !user then throw err
        if (!user) {
            c.status(404)
            return c.json({"error": "user not found"})
        }

        // else login with hash and generate jwt token        
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = await sign(payload, c.env.JWT_SECRETE)
        
        c.status(200)
        return c.json({token, "message" : "User logged in successfully"})
    } catch(err){
        c.status(500)
        return c.json({"error": "Internal Server Problem"})
    }
} 