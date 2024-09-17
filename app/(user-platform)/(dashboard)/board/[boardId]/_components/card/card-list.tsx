"use client";

import { CardWithContent } from "@/types";
import CardForm from "./card-form";
import { useEffect, useState } from "react";
import CardItem from "./card-item";
import { Droppable, DragDropContext, DropResult } from "@hello-pangea/dnd";
import reorder from "@/config/reorder";
import { useAction } from "@/hooks/useAction";
import { reorderCards } from "@/actions/card/reorder-card";
import toast from "react-hot-toast";
import { reorderContent } from "@/actions/content/reorder-content";

type Props = { boardId: string; data: CardWithContent[] };

const CardList = ({ boardId, data }: Props) => {
  const { execute: updateCardOrder } = useAction(reorderCards, {
    onSuccess: () => toast.success("Cards reordered"),
    onError: (err) => toast.error(err),
  });
  const { execute: updateContentOrder } = useAction(reorderContent, {
    onSuccess: () => toast.success("Content reordered"),
    onError: (err) => toast.error(err),
  });
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source, type } = result;

    if (result.combine) {
      if (type === "card") {
        const shallow: CardWithContent[] = [...orderedData];
        shallow.splice(result.source.index, 1);
        setOrderedData(shallow);
        return;
      }
    }

    // dropped nowhere
    if (!destination) {
      return;
    }

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering cards
    if (type === "card") {
      const reorderedCards = reorder(
        orderedData,
        source.index,
        destination.index
      ).map((card, idx) => ({ ...card, order: idx }));

      setOrderedData(reorderedCards);
      updateCardOrder({ boardId, cards: reorderedCards });
      return;
    }

    // reordering content
    if (type === "content") {
      let cardWithUpdatedContent = [...orderedData];

      // source and destination cards has to be checked and re-evaluated
      const sourceCard = cardWithUpdatedContent.find(
        (card) => card.id === source.droppableId
      );
      const destinationCard = cardWithUpdatedContent.find(
        (card) => card.id === destination.droppableId
      );

      // if one of the cards doesnt exist
      if (!sourceCard || !destinationCard) {
        return;
      }

      // moving content in the same card
      if (source.droppableId === destination.droppableId) {
        const reorderedContents = reorder(
          sourceCard.contents,
          source.index,
          destination.index
        ).map((content, idx) => ({ ...content, order: idx }));

        sourceCard.contents = reorderedContents;
        setOrderedData(cardWithUpdatedContent);
        updateContentOrder({ boardId, contents: reorderedContents });
        return;
      } else {
        // this is the case of content being dropped to a different card
        const [movedContent] = sourceCard.contents.splice(source.index, 1);
        movedContent.cardId = destination.droppableId;

        // add content to the new card
        destinationCard.contents.splice(destination.index, 0, movedContent);

        // const updatedSourceCard = sourceCard.contents.map((content, idx) => ({
        //   ...content,
        //   order: idx,
        // }));

        const updatedDestinationCardContent = destinationCard.contents.map(
          (content, idx) => ({ ...content, order: idx })
        );
        setOrderedData(data);
        updateContentOrder({
          boardId,
          contents: updatedDestinationCardContent,
        });
      }

      return;
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Droppable droppableId="cards" type="card" direction="horizontal">
        {(provided) => {
          return (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-4 overflow-x-auto 
               scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-violet-600/40 scrollbar-track-neutral-600/50
              h-[80vh]"
            >
              {orderedData.map((card, idx) => {
                return <CardItem key={card.id} idx={idx} data={card} />;
              })}
              {provided.placeholder}
              <CardForm />
            </ul>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default CardList;
