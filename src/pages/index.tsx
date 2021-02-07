import { GetServerSideProps } from "next";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";
import { useState } from "react";

import List from "@/components/List";
import ListItem from "@/components/ListItem";
import { initialItems, ItemType } from "@/data";

const reorder = (
  list: ItemType[],
  startIndex: number,
  endIndex: number
): ItemType[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Home: React.FC<{}> = ({}) => {
  const [items, setItems] = useState(initialItems);
  const handleOnDragEnd = (result) => {
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  };
  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="test">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <List>
                {items.map((item, i) => {
                  return (
                    <Draggable draggableId={item.id} index={i} key={item.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListItem
                            item={item}
                            isDragging={snapshot.isDragging}
                          ></ListItem>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </List>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE
  return { props: { data: [] } };
};

export default Home;
