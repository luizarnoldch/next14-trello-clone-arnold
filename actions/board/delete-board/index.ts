"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ACTION, ENTITY } from "@prisma/client";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { safeCreateAction } from "@/lib/safe-create-action";
import { createLog } from "@/lib/create-log";

import { InputType, ReturnType } from "./input-types";
import { DeleteBoardSchema } from "./schema";
import { decreaseLimitCount } from "@/lib/change-limitation";
import { checkSubscription } from "@/lib/subcription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const isSubscribed = await checkSubscription();

  const { id } = data;

  let boardToDelete;

  try {
    boardToDelete = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    if (!isSubscribed) await decreaseLimitCount();

    await createLog({
      entity: ENTITY.BOARD,
      entityId: boardToDelete.id,
      entityTitle: boardToDelete.title,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Database Internal Error",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  return redirect(`/organization/${orgId}`);
};

export const deleteBoard = safeCreateAction(DeleteBoardSchema, handler);
