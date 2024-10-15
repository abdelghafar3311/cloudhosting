import { z } from "zod";
// create article schema
export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be string",
    })
    .min(2, "title should be a lot of one character")
    .max(200, "title must be litter of 200 characters"),
  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description should be string",
    })
    .min(15, "body should be a lot of 14 character")
    .max(2000, "body must be litter of 2000 characters"),
});

// Register schema
export const registerSchema = z.object({
  username: z.string().min(2).max(100),
  email: z.string().min(3).max(200).email(),
  password: z
    .string()
    .min(6, { message: "password must be more than 5" })
    .max(34, { message: "password must be less than 35" }),
});

// login schema
export const loginSchema = z.object({
  email: z.string().min(3).max(200).email(),
  password: z
    .string()
    .min(6, { message: "password must be more than 5" })
    .max(34, { message: "password must be less than 35" }),
});

// Register schema
export const UpdateUserSchema = z.object({
  username: z.string().min(2).max(100).optional(),
  email: z.string().min(3).max(200).email().optional(),
  password: z
    .string()
    .min(6, { message: "password must be more than 5" })
    .max(34, { message: "password must be less than 35" })
    .optional(),
});

// create comments schema
export const createCommentSchema = z.object({
  text: z.string().min(2).max(500),
  articleId: z.number(),
});

// create comments schema
export const updateCommentSchema = z.object({
  text: z.string().min(2).max(500),
});
