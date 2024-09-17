import { z } from "zod";

export const CreateCardSchema = z.object({
  boardId: z.string(),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Please enter a valid string",
    })
    .min(5, { message: "Title must be greater than or equal to 5" }),
});
