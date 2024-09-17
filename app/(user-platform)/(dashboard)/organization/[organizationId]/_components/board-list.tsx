import React from "react";
import Link from "next/link";
import { ClipboardList, FileQuestion } from "lucide-react";

import CustomTooltip from "@/components/custom-tooltip";
import FormNewBoard from "@/components/form/form-new-board";

import { Skeleton } from "@/components/ui/skeleton";
import { getAllBoards } from "@/lib/get-all-boards";
import { availableBoardCount } from "@/lib/change-limitation";
import { checkSubscription } from "@/lib/subcription";

type Props = {
  orgId: string;
};

const BoardList = async ({ orgId }: Props) => {
  const fetchedBoards = await getAllBoards(orgId);
  const fetchedCount = await availableBoardCount();
  const isSubscribed = await checkSubscription();

  const [boards, count] = await Promise.all([fetchedBoards, fetchedCount]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 ">
        <ClipboardList className="text-neutral-500 w-7 h-7" />
        <span className="font-semibold">Your Boards</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-2">
        <FormNewBoard side="top" align="start" offset={-120}>
          <div
            className="bg-gray-200 aspect-[2/1]
          relative w-full h-full flex flex-col gap-1 items-center justify-center hover:bg-gray-300/80 transition rounded shadow-md"
            role="button"
          >
            <p>Create new board</p>
            <span className="text-xs flex items-center gap-1 italic">
              {isSubscribed ? "Unlimited Boards" : `${count} remaining`}
              {!isSubscribed && (
                <CustomTooltip innerText="As free tier user you can only have 3 boards at most. Subscribe to get unlimited board">
                  <FileQuestion className="w-5 h-5 text-rose-300" />
                </CustomTooltip>
              )}
            </span>
          </div>
        </FormNewBoard>
        {boards.map((board) => {
          return (
            <Link
              href={`/board/${board.id}`}
              key={board.id}
              style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
              className="relative aspect-[2/1] rounded-sm bg-no-repeat group bg-center bg-cover bg-gray-600 w-full"
            >
              <div className="absolute inset-0 bg-black/40 rounded-sm group-hover:bg-black/10 transition"></div>
              <div className="w-full text-center truncate text-white absolute z-20 bottom-0">
                <span className="text-xs">{board.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 ">
        <ClipboardList className="text-neutral-500 w-7 h-7" />
        <span className="font-semibold">Your Boards</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-1">
        <Skeleton className="relative aspect-[2/1] rounded-sm  bg-gray-600/40 w-full" />
        <Skeleton className="relative aspect-[2/1] rounded-sm  bg-gray-600/40 w-full" />
        <Skeleton className="relative aspect-[2/1] rounded-sm  bg-gray-600/40 w-full" />
        <Skeleton className="relative aspect-[2/1] rounded-sm  bg-gray-600/40 w-full" />
      </div>
    </div>
  );
};

export default BoardList;
