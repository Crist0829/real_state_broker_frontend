import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email("Email invalido"),
  password: z.string(),
  password_confirmation: z.string(),
});

export const loginUserSchema = z.object({
  password: z.string(),
  email: z.string().email("Email invalido"),
});
