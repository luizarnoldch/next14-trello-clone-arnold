"use server";
import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { MAX_LIMIT } from "@/config/site";

export const increaseLimitCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorized");

  const limitation = await db.limitation.findUnique({ where: { orgId } });

  if (!limitation) {
    await db.limitation.create({
      data: {
        orgId,
        limit: 1,
      },
    });
  } else {
    await db.limitation.update({
      where: { orgId },
      data: {
        limit: limitation.limit + 1,
      },
    });
  }
};

export const decreaseLimitCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorized");

  const limitation = await db.limitation.findUnique({ where: { orgId } });

  if (!limitation) {
    await db.limitation.create({
      data: {
        orgId,
        limit: 1,
      },
    });
  } else {
    await db.limitation.update({
      where: {
        orgId,
      },
      data: {
        orgId,
        limit: limitation.limit > 1 ? limitation.limit - 1 : 0,
      },
    });
  }
};

export const exceededLimitation = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorized");

  const limitation = await db.limitation.findUnique({ where: { orgId } });

  if (!limitation || limitation.limit < MAX_LIMIT) {
    return false;
  } else return true;
};

export const availableBoardCount = async () => {
  const { orgId } = auth();

  if (!orgId) return MAX_LIMIT;

  const limitation = await db.limitation.findUnique({ where: { orgId } });

  if (!limitation) {
    return MAX_LIMIT;
  } else if (limitation.limit >= MAX_LIMIT) return 0;
  else {
    return MAX_LIMIT - limitation.limit;
  }
};
