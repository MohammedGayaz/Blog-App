// getting a single blog

import { prisma_client } from "../../helper/client";

export const getBlog = async(c: any) => {
    // get req body and validate 
    const blogId = c.req.param('id')
    const userId = c.get("userId")
    try{
    // create a blog
    const prisma = await prisma_client(c)
    const blog = await prisma.post.findFirst({
        where: {
            id: blogId,
        }
    })

    // if success then return appropriate message
    return c.json({blog})
    } catch(err: any){
    // else return error message
        console.log(err)
        return c.json({error: err.message || "Internal Server Error"})
    }
}