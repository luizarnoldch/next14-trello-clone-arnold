"use client";

import { updateBoard } from "@/actions/board/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { Board } from "@prisma/client";
import { useState, useRef, ElementRef } from "react";
import toast from "react-hot-toast";

type Props = { data: Board | null };

const BoardTitleForm = ({ data }: Props) => {
  const [title, setTitle] = useState(data?.title);
  const [isEditMode, setEditMode] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute, fieldErrors } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Title is updated : ${data.title}`);
      setTitle(data.title);
      setEditMode(false);
    },
    onError: (err) => {
      console.log(err);
      setTitle(data?.title);
    },
  });

  const onEditHandler = () => {
    setEditMode(true);
    // setTimeout needed because when button clicked and edit mode is activated ref dont select all or focuses the input
    // because of the conditional return
    setTimeout(() => {
      inputRef.current?.select();
    }, 30);
  };

  const onSubmitHandler = (formData: FormData) => {
    const title = formData.get("title") as string;

    if (!title || title === data?.title || !data) {
      setEditMode(false);
      return console.log("Title not changed");
    }
    execute({ title, id: data.id });
  };

  if (isEditMode) {
    return (
      <form action={onSubmitHandler} ref={formRef}>
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={() => {
            formRef.current?.requestSubmit();
          }}
          defaultValue={title}
          customClasses="w-full m-0 bg-transparent border-none focus-visible:text-white
          text-white disabled:text-white disabled:opacity-100 disabled:italic focus-visible:ring-offset-0
          focus-visible:ring-0 focus-visible:border-none focus:visible:m-0 h-auto px-4 pt-1 pb-1 focus-visible:italic"
          placeholder="Board title"
          errors={fieldErrors}
        />
        <button type="submit" hidden></button>
      </form>
    );
  }
  return (
    <Button onClick={onEditHandler} variant={"edit"}>
      {title}
    </Button>
  );
};

export default BoardTitleForm;
