import { z } from "zod";

export const CopyContentSchema = z.object({
  id: z.string(),
  boardId: z.string(),
});
