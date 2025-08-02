import { z } from "zod";

export const CreatUserSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(3),
});

export const LoginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(3),
});
