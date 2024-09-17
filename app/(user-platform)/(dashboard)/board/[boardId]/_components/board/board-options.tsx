"use client";
import { LogOut, Settings2 } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { deleteBoard } from "@/actions/board/delete-board";
import { Separator } from "@/components/ui/separator";

type Props = { id: string };

const BoardOptions = ({ id }: Props) => {
  const { execute, isLoading } = useAction(deleteBoard, {});
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-1 rounded-full hover:bg-gray-100/50 transition hover:text-[#3d348b] cursor-pointer">
          <Settings2 className="w-5 h-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="space-y-2 text-sm">
        <div className="relative w-full">
          <div className="text-center font-semibold text-neutral-700 ">
            Board Actions
          </div>
          <Separator className="my-2" />
          <PopoverClose asChild>
            <button className="absolute -top-[2px] right-0 cursor-pointer z-10 w-7 h-7 text-rose-400 hover:bg-gray-200 transition rounded-md">
              <LogOut />
            </button>
          </PopoverClose>
        </div>
        <Button
          onClick={() => execute({ id })}
          className="w-full justify-start text-neutral-700 "
          size={"sm"}
          variant={"destructive_ghost"}
          disabled={isLoading}
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
