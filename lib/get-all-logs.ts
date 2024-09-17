"use server";
import { revalidatePath } from "next/cache";
import { Log } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const getAllLogs = async (orgId: string): Promise<Log[]> => {
  const { userId } = auth();

  let logs;

  try {
    if (!userId || !orgId) return redirect("/select-org");

    logs = await db.log.findMany({
      where: {
        orgId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!logs) throw new Error("No logs found with the given criteria");

    revalidatePath(`/organization/${orgId}`);
    return logs;
  } catch (error) {
    return Promise.reject(error);
  }
};
