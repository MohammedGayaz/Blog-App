import z from "zod";

export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

export type updateBlogInput = z.infer<typeof updateBlogInput>;
