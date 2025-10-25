import { z } from "zod";

export const CreatUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.email(),
  password: z.string().min(3),
});

export const LoginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(3),
});
