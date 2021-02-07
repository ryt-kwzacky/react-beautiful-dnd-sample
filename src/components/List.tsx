import styles from "./List.module.scss";

const List: React.FC<{}> = ({ children }) => {
  return (
    <div className={styles.list}>
      <h1>List</h1>
      {children}
    </div>
  );
};

export default List;
