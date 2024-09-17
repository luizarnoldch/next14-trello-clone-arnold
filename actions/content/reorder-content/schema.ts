import { z } from "zod";

export const ReorderContentSchema = z.object({
  boardId: z.string(),
  contents: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      cardId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});
