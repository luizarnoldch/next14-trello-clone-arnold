"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY } from "@prisma/client";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { safeCreateAction } from "@/lib/safe-create-action";
import { createLog } from "@/lib/create-log";

import { InputType, ReturnType } from "./input-types";
import { UpdateBoardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { title, id } = data;

  let updatedBoard;

  try {
    updatedBoard = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });

    await createLog({
      entity: ENTITY.BOARD,
      entityId: updatedBoard.id,
      entityTitle: updatedBoard.title,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Database Internal Error",
    };
  }

  revalidatePath(`/board/${id}`);
  return { data: updatedBoard };
};

export const updateBoard = safeCreateAction(UpdateBoardSchema, handler);
