import { CardWithContent } from "@/types";
import React, { ElementRef, useRef, useState } from "react";
import CardHeader from "./card-header";
import ContentForm from "../content/content-form";
import ContentItem from "../content/content-item";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import ContentModal from "@/components/modal/content-modal/content-modal";
type Props = {
  idx: number;
  data: CardWithContent;
};

const CardItem = ({ data, idx }: Props) => {
  const [isEditMode, setEditMode] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const onEditHandler = () => {
    setEditMode(true);
    // setTimeout needed because when button clicked and edit mode is activated ref dont select all or focuses the input
    // because of the conditional return
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 30);
  };
  return (
    <Draggable draggableId={data.id} index={idx}>
      {(provided, snapshot) => {
        return (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={{
              ...provided.draggableProps.style,
              position: snapshot.isDragging ? "absolute" : undefined,
              top: 0,
            }}
            className="shrink-0 w-[300px] "
          >
            <div
              className="w-full rounded-md bg-gradient-to-r from-purple-900/60 to-sky-900/60 shadow-lg pb-2
      text-white
      "
            >
              <CardHeader data={data} onAddContent={onEditHandler} />
              <ContentForm
                cardId={data.id}
                ref={textareaRef}
                isEditMode={isEditMode}
                enableEditting={onEditHandler}
                disableEditting={() => {
                  setEditMode(false);
                }}
              />

              {/* content list */}
              <Droppable
                droppableId={data.id}
                type="content"
                renderClone={(provided, snapshot, rubric) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="truncate bg-white/90 text-sm text-neutral-700 p-2 rounded hover:bg-white hover:ring-2 cursor-pointer hover:ring-neutral-700 transition"
                  >
                    {data.contents[rubric.source.index].title}
                  </div>
                )}
              >
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col w-full gap-2 p-2"
                  >
                    {data.contents.map((content, idx) => (
                      <ContentItem
                        key={content.id}
                        data={content}
                        idx={idx}
                        boardId={data.boardId}
                      />
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          </li>
        );
      }}
    </Draggable>
  );
};

export default CardItem;
