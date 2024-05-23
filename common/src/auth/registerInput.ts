import z from "zod";

export const registerInput = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});

export type registerInput = z.infer<typeof registerInput>;
