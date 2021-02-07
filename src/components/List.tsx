import styles from "./List.module.scss";

const List: React.FC<{
  isDragging;
}> = ({ isDragging, children }) => {
  return (
    <div
      className={[styles.list, isDragging ? styles.backgroundColor : ""].join(
        " "
      )}
    >
      {children}
    </div>
  );
};

export default List;
