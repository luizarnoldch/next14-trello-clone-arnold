"use client";

import { ElementRef, useRef } from "react";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

import { createNewBoard } from "@/actions/board/create-board";
import { useAction } from "@/hooks/useAction";

import {
  Popover,
  PopoverTrigger,
  PopoverClose,
  PopoverContent,
} from "../ui/popover";

import { FormInput } from "./form-input";
import FormSubmitButton from "./form-submit";
import FormBackgroundPicker from "./form-background-picker";
import { useRouter } from "next/navigation";
import { useSubscriptionModal } from "@/hooks/useSubscriptionModal";

type Props = {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  offset?: number;
  align?: "start" | "center" | "end";
};

const FormNewBoard = ({
  children,
  side = "bottom",
  offset = 4,
  align = "start",
}: Props) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const onOpen = useSubscriptionModal((state) => state.onOpen);

  const { execute, fieldErrors } = useAction(createNewBoard, {
    onSuccess: (data) => {
      toast.success("New board created");

      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (err) => {
      toast.error(err);
      onOpen();
    },
  });

  const onSubmitHandler = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        sideOffset={offset}
        side={side}
        className="w-80 py-2"
      >
        <div className="relative py-1">
          <div className="w-full text-sm text-center font-semibold">
            Create Board
          </div>
          <PopoverClose ref={closeRef} asChild>
            <button className="absolute -top-[2px] right-1 cursor-pointer z-10 w-7 h-7 text-rose-400 hover:bg-gray-200 transition p-1 rounded-md">
              <LogOut />
            </button>
          </PopoverClose>
        </div>
        <form className="space-y-3 my-2" action={onSubmitHandler}>
          <div>
            <FormBackgroundPicker id="image" errors={fieldErrors} />
            <FormInput id="title" label="Board Title" errors={fieldErrors} />
          </div>
          <FormSubmitButton innerText="Create" customClasses="w-full " />
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormNewBoard;
