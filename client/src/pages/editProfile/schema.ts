import { z } from "zod";

export default z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(7, "Please enter a valid email address"),
  name: z
    .string()
    .min(5, "name too short")
    .refine((value) => value.trim().length > 0, {
      message: "invalid name",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain a number",
    }),
  homepage: z.string(),
});
