import { z } from "zod";

export const UpdateContentSchema = z.object({
  id: z.string(),
  boardId: z.string(),
  title: z.optional(
    z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Please enter a valid string",
      })
      .min(3, { message: "Title must be greater than or equal to 3 chars" })
  ),
  description: z.optional(
    z
      .string({
        required_error: "If given, description is required",
        invalid_type_error: "Please enter a valid string for description",
      })
      .min(5, {
        message: "Description must be greater than or equal to 5 chars",
      })
  ),
});
