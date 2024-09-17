import { z } from "zod";

export const UpdateCardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Please enter a valid string",
    })
    .min(3, { message: "Title must be greater than or equal to 3" }),
});
