"use client";
import { copyContent } from "@/actions/content/copy-content";
import { deleteContent } from "@/actions/content/delete-content";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { useContentModal } from "@/hooks/useContentModal";
import { Copy, Trash2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

type Props = { id: string; boardId: string };

const ContentOptions = ({ id, boardId }: Props) => {
  const closeModal = useContentModal((state) => state.onClose);
  const { execute: deleteCardContent, isLoading: isDeleting } = useAction(
    deleteContent,
    {
      onSuccess: (data) => {
        toast.success(`${data.title} is deleted`);
        closeModal();
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  const { execute: copyCardContent, isLoading: isCopying } = useAction(
    copyContent,
    {
      onSuccess: (data) => {
        toast.success(`${data.title} is copied`);
        closeModal();
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-neutral-700">Options</p>
      <Button
        onClick={() => deleteCardContent({ id, boardId })}
        variant={"destructive"}
        size={"inline"}
        className="flex items-center gap-2 justify-start md:justify-between px-2"
        disabled={isCopying || isDeleting}
      >
        <Trash2 className="w-4" />
        <span>Delete</span>
      </Button>
      <Button
        onClick={() => copyCardContent({ id, boardId })}
        variant={"copy"}
        size={"inline"}
        className="flex items-center gap-2 justify-start md:justify-between px-2"
        disabled={isCopying || isDeleting}
      >
        <Copy className="w-4" />
        <span>Copy</span>
      </Button>
    </div>
  );
};

ContentOptions.Skeleton = function OptionsSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="w-20 h-5 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};

export default ContentOptions;
