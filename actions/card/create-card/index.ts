"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY } from "@prisma/client";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { safeCreateAction } from "@/lib/safe-create-action";
import { createLog } from "@/lib/create-log";

import { InputType, ReturnType } from "./input-types";
import { CreateCardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { title, boardId } = data;

  let card;

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!board) {
      return {
        error: "No board found for card to be inserted",
      };
    } else {
      const latestCard = await db.card.findFirst({
        where: { boardId },
        orderBy: { order: "desc" },
      });

      card = await db.card.create({
        data: {
          boardId,
          title,
          order: latestCard ? latestCard.order + 1 : 1,
        },
      });
      await createLog({
        entity: ENTITY.CARD,
        entityId: card.id,
        entityTitle: card.title,
        action: ACTION.CREATE,
      });
    }
  } catch (error) {
    return {
      error: "Database Internal Error",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = safeCreateAction(CreateCardSchema, handler);
