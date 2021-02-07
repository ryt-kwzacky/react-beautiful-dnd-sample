import { ItemType } from "@/data";

import styles from "./ListItem.module.scss";

const ListItem: React.FC<{
  item: ItemType;
}> = ({ item }) => {
  return (
    <div className={[styles.container, styles.margin].join(" ")}>
      <p>{item.id}</p>
      <p>{item.content}</p>
    </div>
  );
};

export default ListItem;
