"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY } from "@prisma/client";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { safeCreateAction } from "@/lib/safe-create-action";
import { createLog } from "@/lib/create-log";

import { InputType, ReturnType } from "./input-types";
import { DeleteContentSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { id, boardId } = data;

  let contentToDelete;

  try {
    contentToDelete = await db.cardContent.delete({
      where: {
        id,
        card: {
          board: { orgId },
        },
      },
    });

    if (!contentToDelete) {
      return {
        error: "No content found with the given criteria",
      };
    }
    await createLog({
      entity: ENTITY.CONTENT,
      entityId: contentToDelete.id,
      entityTitle: contentToDelete.title,
      action: ACTION.DELETE,
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Database Internal Error",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: contentToDelete };
};

export const deleteContent = safeCreateAction(DeleteContentSchema, handler);
