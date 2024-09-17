"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { ContentWithCard } from "@/types";

export const getContentById = async (data: {
  contentId: string;
  boardId: string;
}): Promise<ContentWithCard> => {
  const { userId, orgId } = auth();

  const { contentId, boardId } = data;

  let content;

  try {
    if (!userId || !orgId) throw new Error("Unauthorized");
    if (!contentId || !boardId) throw new Error("Missing fields");
    content = await db.cardContent.findUnique({
      where: {
        id: contentId,
        card: { board: { orgId } },
      },
      include: {
        card: true,
      },
    });
    if (!content) throw new Error("No content found with the given criteria");

    revalidatePath(`/board/${boardId}`);
    return content;
  } catch (error) {
    return Promise.reject(error);
  }
};
