// update an existing blog

import { prisma_client } from "../../helper/client";

export const update = async(c: any) => {
    // get req body and validate 
    const body = await c.req.json();
    const userId = c.get("userId")
    try{
    // create a blog
    const prisma = await prisma_client(c)
    const response = await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId 
        },
        data: {
            title: body.title,
            content: body.content,
        }  
    })

    // if success then return appropriate message
    return c.json({"message" : "Blog Updated Successfully"})
    } catch(err: any){
    // else return error message
        console.log(err)
        return c.json({error: err.message || "Internal Server Error"})
    }
}