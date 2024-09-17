"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY } from "@prisma/client";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { safeCreateAction } from "@/lib/safe-create-action";
import { createLog } from "@/lib/create-log";

import { InputType, ReturnType } from "./input-types";
import { CreateContentSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { title, boardId, cardId } = data;

  let content;

  try {
    const card = await db.card.findUnique({
      where: {
        id: cardId,
        boardId,
        board: {
          orgId,
        },
      },
    });

    if (!card) {
      return {
        error: "No card found with the given criteria",
      };
    }

    const lastContent = await db.cardContent.findFirst({
      where: { cardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    content = await db.cardContent.create({
      data: {
        title,
        cardId,
        order: lastContent ? lastContent.order + 1 : 1,
      },
    });

    await createLog({
      entity: ENTITY.CONTENT,
      entityId: content.id,
      entityTitle: content.title,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Database Internal Error",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: content };
};

export const createContent = safeCreateAction(CreateContentSchema, handler);
