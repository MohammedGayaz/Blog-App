// create a new blog

import { createBlogInput } from "@green_dev/blog/dist";
import { prisma_client } from "../../helper/client";

export const create = async (c: any) => {
    // get req body and validate
    const body = await c.req.json();
    const userId = c.get("userId");

    try {
        const { success, error } = createBlogInput.safeParse(body);
        if (!success) {
            throw new Error(error.errors[0].message);
        }
        // create a blog
        const prisma = await prisma_client(c);
        const response = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                published: true,
                authorId: userId,
            },
        });

        // if success then return appropriate message
        return c.json({ message: "Blog Published Successfully" });
    } catch (err: any) {
        // else return error message
        console.log(err);
        return c.json({ error: err.message || "Internal Server Error" });
    }
};
