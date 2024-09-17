import { createContent } from "@/actions/content/create-content";
import FormSubmitButton from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { CopyMinus, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import React, { forwardRef, useRef, ElementRef } from "react";
import toast from "react-hot-toast";

type Props = {
  cardId: string;
  isEditMode: boolean;
  enableEditting: () => void;
  disableEditting: () => void;
};

const ContentForm = forwardRef<HTMLTextAreaElement, Props>(
  ({ cardId, isEditMode, enableEditting, disableEditting }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    useOutsideClick(disableEditting, formRef);

    const { execute, fieldErrors } = useAction(createContent, {
      onSuccess: (data) => {
        toast.success(`Content: ${data.title} is created`);
        disableEditting();
      },
      onError: (err) => {
        toast.error(err);
      },
    });

    const onSubmitHandler = (formData: FormData) => {
      const title = formData.get("title") as string;

      if (!title) {
        return console.log("no title given");
      }

      execute({ boardId: params.boardId as string, cardId, title });
    };

    if (isEditMode) {
      return (
        <form action={onSubmitHandler} className="px-2 space-y-2" ref={formRef}>
          <FormTextarea
            id="title"
            ref={ref}
            placeholder="Enter content title..."
            errors={fieldErrors}
          />
          <div className="flex justify-end items-center gap-3 pr-1">
            <FormSubmitButton
              innerText="Save content"
              variant="ghost"
              customClasses="h-auto w-auto py-1 px-2"
            />
            <Button
              onClick={disableEditting}
              className="bg-transparent  hover:bg-rose-500 group transition rounded-full h-auto w-auto m-0 p-1.5"
              type="button"
              variant={"ghost"}
            >
              <CopyMinus className="h-4 w-4 text-rose-500 group-hover:text-white transition" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="p-2">
        <Button
          onClick={enableEditting}
          className="flex  gap-2 justify-start w-full"
          variant={"ghost"}
          size={"sm"}
        >
          <Plus className="h-5 w-5" />
          Add a content
        </Button>
      </div>
    );
  }
);
ContentForm.displayName = "ContentForm";
export default ContentForm;
