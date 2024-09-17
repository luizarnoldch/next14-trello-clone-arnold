"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { safeCreateAction } from "@/lib/safe-create-action";

import { InputType, ReturnType } from "./input-types";
import { ReorderContentSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { boardId, contents } = data;

  let reorderedContent;

  try {
    reorderedContent = await db.$transaction(
      contents.map((content) =>
        db.cardContent.update({
          where: {
            id: content.id,
            card: {
              board: { orgId },
            },
          },
          data: { order: content.order, cardId: content.cardId },
        })
      )
    );
  } catch (error) {
    return {
      error: "Database Internal Error",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: reorderedContent };
};

export const reorderContent = safeCreateAction(ReorderContentSchema, handler);
