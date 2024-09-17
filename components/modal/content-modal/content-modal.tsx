"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import React, { useEffect } from "react";
import { useContentModal } from "@/hooks/useContentModal";
import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import ContentTitle from "./content-title";

import ContentDescription from "./content-description";
import ContentOptions from "./content-options";
import { getLogsByContent } from "@/lib/get-logs-by-content";
import ContentActivity from "./content-activity";
import { getContentById } from "@/lib/get-content-by-id";

type Props = {};

const ContentModal = (props: Props) => {
  const id = useContentModal((state) => state.id);
  const boardId = useContentModal((state) => state.boardId);
  const isOpen = useContentModal((state) => state.isOpen);
  const onClose = useContentModal((state) => state.onClose);

  const { data, error } = useQuery({
    queryKey: ["content", id],
    queryFn: () => getContentById({ contentId: id!, boardId: boardId! }),
    enabled: !!id,
  });
  const { data: logs } = useQuery({
    queryKey: ["log", id],
    queryFn: () => getLogsByContent({ contentId: id!, boardId: boardId! }),
    enabled: !!id,
  });

  useEffect(() => {
    if (error) {
      onClose();
      toast.error(error.message);
    }
  }, [error, onClose]);

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle autoFocus={false}>
            {data ? (
              <ContentTitle
                id={data.id}
                boardId={data.card.boardId}
                cardTitle={data.card.title}
                originalTitle={data.title}
              />
            ) : (
              <ContentTitle.Skeleton />
            )}
          </DialogTitle>
          <DialogDescription className="text-xs font-light text-rose-400">
            ** Changes on title are automatically saved!
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-3">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {data ? (
                <ContentDescription
                  originalDescription={data.description}
                  boardId={data.card.boardId}
                  contentId={data.id}
                />
              ) : (
                <ContentDescription.Skeleton />
              )}
              {logs ? (
                <ContentActivity logs={logs} />
              ) : (
                <ContentActivity.Skeleton />
              )}
            </div>
          </div>
          {data ? (
            <ContentOptions id={data.id} boardId={data.card.boardId} />
          ) : (
            <ContentOptions.Skeleton />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentModal;
