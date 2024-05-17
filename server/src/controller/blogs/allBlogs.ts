// get all blogs 

import { prisma_client } from "../../helper/client";

export const allBlogs = async(c: any) => {
    // get req body and validate 
    try{
    // create a blog
    const prisma = await prisma_client(c)
    const blogs = await prisma.post.findMany()

    // if success then return appropriate message
    return c.json({blogs})
    } catch(err: any){
    // else return error message
        console.log(err)
        return c.json({error: err.message || "Internal Server Error"})
    }
}