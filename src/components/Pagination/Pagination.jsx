import styles from "./Pagination.module.css";

function Pagination(props) {
  const lists = [1, 2, 3, 4, 5];

  return (
    <div className={`${styles.wrapper}`} style={props.className}>
      <button onClick={() => props?.onSetList(props.currentList - 1 || 1)}>
        «
      </button>
      {lists.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${pageNumber === props.currentList && styles.selected}`}
          onClick={() => props?.onSetList(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button onClick={() => props?.onSetList(props.currentList + 1)}>»</button>
    </div>
  );
}

export default Pagination;
