// update an existing blog

import { updateBlogInput } from "@green_dev/blog/dist";
import { prisma_client } from "../../helper/client";

export const update = async (c: any) => {
    // get req body and validate
    const body = await c.req.json();
    const userId = c.get("userId");
    try {
        const { success, error } = updateBlogInput.safeParse(body);
        if (!success) {
            throw new Error(error.errors[0].message);
        }

        // create a blog
        const prisma = await prisma_client(c);
        const response = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId,
            },
            data: {
                title: body.title,
                content: body.content,
            },
        });

        // if success then return appropriate message
        return c.json({ message: "Blog Updated Successfully" });
    } catch (err: any) {
        // else return error message
        console.log(err);
        return c.json({ error: err.message || "Internal Server Error" });
    }
};
