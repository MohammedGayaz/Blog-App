import z from "zod";

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});

export type loginInput = z.infer<typeof loginInput>

