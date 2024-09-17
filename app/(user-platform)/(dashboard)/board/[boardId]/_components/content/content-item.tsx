import { CardContent } from "@prisma/client";
import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useContentModal } from "@/hooks/useContentModal";

type Props = { data: CardContent; idx: number; boardId: string };

const ContentItem = ({ data, idx, boardId }: Props) => {
  const onOpen = useContentModal((state) => state.onOpen);

  return (
    <Draggable draggableId={data.id} index={idx}>
      {(provided, snapshot) => {
        return (
          <div
            onClick={() => {
              onOpen(data.id, boardId);
            }}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="truncate bg-white/90 text-sm text-neutral-700 p-2 rounded hover:bg-white hover:ring-2 cursor-pointer hover:ring-neutral-700 transition select-none"
          >
            {data.title}
          </div>
        );
      }}
    </Draggable>
  );
};

export default ContentItem;
