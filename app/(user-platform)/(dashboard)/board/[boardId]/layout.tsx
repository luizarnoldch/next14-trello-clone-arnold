import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import BoardNavigation from "./_components/board/board-navigation";

type Props = { children: React.ReactNode; params: { boardId: string } };

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Anonymous Board",
    };
  }
  // no worries because they are deduped
  const fetchedBoard = await db.board.findUnique({
    where: {
      orgId,
      id: params.boardId,
    },
  });

  return {
    title: fetchedBoard?.title,
  };
}

const BoardLayout = async ({ children, params }: Props) => {
  const boardId = params.boardId;
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const fetchedBoard = await db.board.findUnique({
    where: {
      orgId,
      id: boardId,
    },
  });
  return (
    <main className="h-full">
      <div
        className="h-full bg-no-repeat bg-center bg-cover relative "
        style={{
          backgroundImage: `url(${fetchedBoard?.imageFullUrl})`,
          filter: "brightness(90%)",
        }}
      >
        <BoardNavigation id={boardId} />

        {fetchedBoard ? (
          children
        ) : (
          <div className="flex flex-col gap-4 w-full h-[60vh] justify-center items-center">
            <p className="p-2 ring-1 rounded-sm ring-destructive bg-destructive-foreground text-destructive">
              No Board found with that specific id
            </p>
            <Link
              href={`/organization/${orgId}`}
              className="text-sky-700 ring-2 px-4 py-1 rounded-md hover:bg-sky-700 hover:ring-0 hover:text-white transition"
            >
              Go to your Organization
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default BoardLayout;
