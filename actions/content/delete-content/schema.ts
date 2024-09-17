import { z } from "zod";

export const DeleteContentSchema = z.object({
  id: z.string(),
  boardId: z.string(),
});
