"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY } from "@prisma/client";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { safeCreateAction } from "@/lib/safe-create-action";
import { createLog } from "@/lib/create-log";
import {
  increaseLimitCount,
  exceededLimitation,
} from "@/lib/change-limitation";

import { InputType, ReturnType } from "./input-types";
import { CreateBoardSchema } from "./schema";
import { checkSubscription } from "@/lib/subcription";
import { is } from "date-fns/locale";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const exceededFreeTier = await exceededLimitation();
  const isSubscribed = await checkSubscription();
  if (exceededFreeTier && !isSubscribed)
    return {
      error: "You have exceeded the number of free boards you can use !",
    };

  const { title, image } = data;
  const [imageId, imageUsername, imageDirectLink, imageThumbUrl, imageFullUrl] =
    image.split(process.env.NEXT_PUBLIC_SPLIT_CHAR!);
  if (
    !imageId ||
    !imageUsername ||
    !imageDirectLink ||
    !imageThumbUrl ||
    !imageFullUrl
  ) {
    return {
      error: "Missing fields. Cannot create the board fields are required",
    };
  }
  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageUsername,
        imageDirectLink,
        imageThumbUrl,
        imageFullUrl,
      },
    });

    if (!isSubscribed) await increaseLimitCount();

    await createLog({
      entity: ENTITY.BOARD,
      entityId: board.id,
      entityTitle: board.title,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Database Internal Error",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createNewBoard = safeCreateAction(CreateBoardSchema, handler);
