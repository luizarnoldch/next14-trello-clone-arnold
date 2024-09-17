"use client";
import { useState, useRef, ElementRef } from "react";
import CardWrapper from "./card-wrapper";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import FormSubmitButton from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { CopyMinus, Plus } from "lucide-react";
import { useAction } from "@/hooks/useAction";
import { createCard } from "@/actions/card/create-card";
import toast from "react-hot-toast";

type Props = {};

const CardForm = (props: Props) => {
  const router = useRouter();

  const [isEditMode, setEditMode] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  useOutsideClick(() => setEditMode(false), formRef);

  const params = useParams();

  const { execute, fieldErrors } = useAction(createCard, {
    onSuccess: (data) => {
      toast.success(`Card: ${data.title} is created`);
      setEditMode(false);
      router.refresh();
    },
    onError: (err) => toast.error(err),
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
    const boardId = params.boardId as string;

    execute({ boardId, title });
  };

  if (isEditMode) {
    return (
      <CardWrapper>
        <form
          action={onSubmitHandler}
          ref={formRef}
          className="w-full space-y-5 px-2 py-3 bg-white rounded"
        >
          <FormInput
            ref={inputRef}
            id="title"
            placeholder="Card title"
            defaultValue=""
            errors={fieldErrors}
          />
          <div className="flex justify-end items-center gap-3">
            <FormSubmitButton innerText="Save card" variant="primary" />
            <Button
              onClick={() => setEditMode(false)}
              className="bg-transparent  hover:bg-rose-500 group transition rounded-full h-auto w-auto m-0 p-2"
              type="button"
            >
              <CopyMinus className="h-5 w-5 text-rose-500 group-hover:text-white transition" />
            </Button>
          </div>
        </form>
      </CardWrapper>
    );
  }
  return (
    <CardWrapper>
      <button
        className="w-full rounded bg-white font-semibold hover:bg-white/80 transition h-10 flex items-center justify-start px-4 gap-4
        text-neutral-700
        "
        onClick={onEditHandler}
      >
        <Plus className="w-5 h-5" />
        <span>Add a card</span>
      </button>
    </CardWrapper>
  );
};

export default CardForm;
