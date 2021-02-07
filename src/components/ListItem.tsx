import { ItemType } from "@/data";

import styles from "./ListItem.module.scss";

const ListItem: React.FC<{
  item: ItemType;
  isDragging: boolean;
}> = ({ item, isDragging }) => {
  return (
    <div
      className={[
        styles.container,
        styles.margin,
        isDragging ? styles.grayBackground : "",
      ].join(" ")}
    >
      <p>is dragging: {String(isDragging)}</p>
      <p>{item.id}</p>
      <p>{item.content}</p>
    </div>
  );
};

export default ListItem;
