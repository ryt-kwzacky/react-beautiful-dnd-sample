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
    // ここでidを見て処理変える
    const { destination, source } = result;
    if (!destination || destination.index === source.index) {
      return;
    }

    console.log(`draggableId: ${result.draggableId}`);
    // これらを参照して、エリア外に飛ばせる
    console.log(`destination.draggableId: ${destination.droppableId}`);
    console.log(`source.draggableId: ${source.droppableId}`);

    if (destination.droppableId === "another") {
      console.log(`destination.droppableId: ${destination.droppableId}`);
      // anotherにきた場合は今見えているリストから削除する
    } else if (destination.droppableId === "test") {
      const newItems = reorder(
        items,
        result.source.index,
        result.destination.index
      );
      setItems(newItems);
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="another">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <p>test!!!</p>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="test">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <h1>List</h1>
              <List isDragging={snapshot.isDraggingOver}>
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
                {provided.placeholder}
              </List>
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
