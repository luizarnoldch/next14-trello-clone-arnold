"use server";
import { revalidatePath } from "next/cache";
import { Log } from "@prisma/client";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const getLogsByContent = async (data: {
  contentId: string;
  boardId: string;
}): Promise<Log[]> => {
  const { userId, orgId } = auth();

  const { contentId, boardId } = data;

  let logs;

  try {
    if (!userId || !orgId) return redirect("/select-org");
    if (!contentId || !boardId) throw new Error("Missing fields");
    logs = await db.log.findMany({
      where: {
        orgId,
        entityId: contentId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });

    if (!logs) throw new Error("No logs found with the given criteria");
    revalidatePath(`/board/${boardId}`);
    return logs;
  } catch (error) {
    return Promise.reject(error);
  }
};
