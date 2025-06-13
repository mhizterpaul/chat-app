//returns validation schema for zod
import z from "zod";

export default z
  .object({
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(7, "Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must contain a number",
      }),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .superRefine((data, context) => {
    if (data.confirmPassword !== data.password) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
