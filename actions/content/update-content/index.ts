"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY } from "@prisma/client";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { safeCreateAction } from "@/lib/safe-create-action";
import { createLog } from "@/lib/create-log";

import { InputType, ReturnType } from "./input-types";
import { UpdateContentSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { id, boardId, ...cardContent } = data;

  let updatedContent;

  try {
    updatedContent = await db.cardContent.update({
      where: {
        id,
        card: { board: { orgId } },
      },
      data: {
        ...cardContent,
      },
    });
    await createLog({
      entity: ENTITY.CONTENT,
      entityId: updatedContent.id,
      entityTitle: updatedContent.title,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Database Internal Error",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updatedContent };
};

export const updateCardContent = safeCreateAction(UpdateContentSchema, handler);
