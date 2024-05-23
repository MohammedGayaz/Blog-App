import z, { string } from "zod";

export const createBlogInput = z.object({
  title: string(),
  content: string(),
});

export type createBlogInput = z.infer<typeof createBlogInput>;
