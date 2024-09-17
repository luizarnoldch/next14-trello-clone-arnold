"use server";
import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY } from "@prisma/client";

import { db } from "../lib/db";

type Props = {
  entityId: string;
  entity: ENTITY;
  entityTitle: string;
  action: ACTION;
};

export const createLog = async ({
  entity,
  entityId,
  entityTitle,
  action,
}: Props) => {
  try {
    const { orgId } = auth();
    const currUser = await currentUser();

    if (!orgId || !currUser) {
      throw new Error("User not found");
    }

    await db.log.create({
      data: {
        orgId,
        userId: currUser.id,
        userImage: currUser.imageUrl,
        userName: currUser.firstName + " " + currUser.lastName,
        action,
        entity,
        entityId,
        entityTitle,
      },
    });
  } catch (error) {
    console.log("LOGGING ERROR : ", error);
  }
};
