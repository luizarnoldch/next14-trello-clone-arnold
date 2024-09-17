"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { safeCreateAction } from "@/lib/safe-create-action";

import { InputType, ReturnType } from "./input-types";
import { ReorderCardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { boardId, cards } = data;

  let reorderedCards;

  try {
    reorderedCards = await db.$transaction(
      cards.map((card) =>
        db.card.update({
          where: { id: card.id, board: { orgId } },
          data: { order: card.order },
        })
      )
    );
  } catch (error) {
    return {
      error: "Database Internal Error",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: reorderedCards };
};

export const reorderCards = safeCreateAction(ReorderCardSchema, handler);
