"use client";
import { updateCardContent } from "@/actions/content/update-content";
import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { useQueryClient } from "@tanstack/react-query";
import { Keyboard } from "lucide-react";
import React, { ElementRef, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  id: string;
  boardId: string;
  originalTitle: string;
  cardTitle: string;
};

const ContentTitle = ({ id, boardId, originalTitle, cardTitle }: Props) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(originalTitle);
  const formRef = useRef<ElementRef<"form">>(null);

  const { execute, fieldErrors } = useAction(updateCardContent, {
    onSuccess: (data) => {
      setTitle(data.title);
      queryClient.invalidateQueries({ queryKey: ["content", data.id] });
      queryClient.invalidateQueries({ queryKey: ["log", data.id] });
      toast.success(`Title updated to : ${data.title}`);
    },
    onError: (err) => toast.error(err),
  });

  const onSubmitHandler = (formData: FormData) => {
    const title = formData.get("title") as string;
    if (!title || originalTitle === title) {
      return console.log("Title doesnt exist or its the same value as before");
    }
    execute({ id, boardId, title });
  };

  return (
    <div className="flex flex-col justify-start gap-0">
      <div className="flex items-center w-full gap-1">
        <Keyboard className="text-neutral-700 w-6" />
        <form action={onSubmitHandler} className="mb-0 pb-0 " ref={formRef}>
          <FormInput
            onBlur={() => formRef.current?.requestSubmit()}
            id="title"
            defaultValue={title}
            customClasses="truncate cursor-pointer py-0 my-0  border-none focus-visible:italic focus-visible:ring-0 focus-visible:ring-offset-0"
            errors={fieldErrors}
          />
        </form>
      </div>
      <p className="text-xs text-neutral-500 font-normal">
        You are in{" "}
        <span className="italic font-semibold underline underline-offset-2">
          {cardTitle}
        </span>
      </p>
    </div>
  );
};
ContentTitle.Skeleton = function ContentSkeleton() {
  return (
    <div className="flex flex-col justify-start w-full gap-1">
      <div className="flex gap-1 items-center">
        <Skeleton className="bg-neutral-700/20 w-6 h-6" />
        <Skeleton className="bg-neutral-700/20 w-1/2 h-6" />
      </div>
      <Skeleton className="bg-neutral-700/20 w-1/2 h-4" />
    </div>
  );
};
export default ContentTitle;
