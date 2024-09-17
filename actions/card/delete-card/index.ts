"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY } from "@prisma/client";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { safeCreateAction } from "@/lib/safe-create-action";
import { createLog } from "@/lib/create-log";

import { InputType, ReturnType } from "./input-types";
import { DeleteCardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { id, boardId } = data;

  let cardToDelete;

  try {
    cardToDelete = await db.card.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
    await createLog({
      entity: ENTITY.CARD,
      entityId: cardToDelete.id,
      entityTitle: cardToDelete.title,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Database Internal Error",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: cardToDelete };
};

export const deleteCard = safeCreateAction(DeleteCardSchema, handler);
