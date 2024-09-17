import { z } from "zod";

export const ReorderCardSchema = z.object({
  boardId: z.string(),
  cards: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});
