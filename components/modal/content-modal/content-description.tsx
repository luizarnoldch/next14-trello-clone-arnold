"use client";
import { updateCardContent } from "@/actions/content/update-content";
import FormSubmitButton from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useQueryClient } from "@tanstack/react-query";
import { Text } from "lucide-react";
import React, { ElementRef, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  originalDescription?: string | null;
  boardId: string;
  contentId: string;
};

const ContentDescription = ({
  contentId,
  boardId,
  originalDescription,
}: Props) => {
  const queryClient = useQueryClient();

  const [description, setDescription] = useState(originalDescription);
  const [isEditMode, setEditMode] = useState(false);

  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  useOutsideClick(() => setEditMode(false), formRef);

  const { execute, fieldErrors } = useAction(updateCardContent, {
    onSuccess: (data) => {
      setDescription(data.description);
      toast.success("Description is updated");
      queryClient.invalidateQueries({ queryKey: ["content", data.id] });
      queryClient.invalidateQueries({ queryKey: ["log", data.id] });
      setEditMode(false);
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onEditHandler = () => {
    setEditMode(true);
    // setTimeout needed because when button clicked and edit mode is activated ref dont select all or focuses the input
    // because of the conditional return
    setTimeout(() => {
      textareaRef.current?.select();
    }, 10);
  };

  const onSubmitHandler = (formData: FormData) => {
    const newDesciption = formData.get("description") as string;
    if (!newDesciption || newDesciption === originalDescription) {
      return console.log("Description didnt change");
    }

    execute({
      id: contentId,
      boardId: boardId,
      description: newDesciption,
    });
  };
  return (
    <div className="flex items-start gap-3 w-full">
      <Text className="text-neutral-700" size={28} />
      <div className="w-full space-y-2">
        <p className="text-sm font-semibold text-neutral-700">Descripton</p>
        {isEditMode ? (
          <form action={onSubmitHandler} ref={formRef}>
            <FormTextarea
              ref={textareaRef}
              id="description"
              defaultValue={description || undefined}
              placeholder={"Add description to your content..."}
              customClasses="italic pb-0 mb-0 pt-[11px] text-sm  pl-3 tracking-normal focus-visible:ring-0 focus-visible:ring-offset-0"
              errors={fieldErrors}
            />
            <div className="pt-2 flex items-center justify-end gap-2">
              <FormSubmitButton innerText="Save" />
              <Button
                size={"sm"}
                type="button"
                variant={"destructive"}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={onEditHandler}
            role="button"
            className="min-h-[80px] bg-neutral-100 text-sm p-3  rounded-md"
          >
            {description || "Add description to your content..."}
          </div>
        )}
      </div>
    </div>
  );
};

ContentDescription.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex flex-col justify-start w-full gap-1 mt-2">
      <div className="flex items-center gap-3">
        <Skeleton className="bg-neutral-700/20 h-6 w-6" />
        <Skeleton className="bg-neutral-700/20 h-6 w-1/2" />
      </div>
      <Skeleton className="bg-neutral-700/20 h-20 ml-9" />
    </div>
  );
};

export default ContentDescription;
