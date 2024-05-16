// user login controller 
import { sign } from "hono/jwt"
import { prisma_client } from "../../helper/client";

export const login = async(c: any) => {
    //get user data
    const body = await c.req.json();

    try{
        // TODO: validate user data with zod
        // check if user exist 
        const prisma = await prisma_client(c)
        console.log(prisma)
        const user = await prisma.user.findUnique({
            where:{
                email: body.email,
                password: body.password
            }
        })

        // if !user then throw err
        if (!user) {
            c.status(404)
            throw new Error( "User Not Found" )
        }

        // else login with hash and generate jwt token        
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = await sign(payload, c.env.JWT_SECRETE)
        
        c.status(200)
        return c.json({"message" : "User logged in successfully", token})

    } catch(err: any){
        // c.status(500)
        return c.json({"error": err.message || "Internal Server Problem"})
    }
} 