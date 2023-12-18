import React from "react";
import styles from "./Pagination.module.css";

function Pagination(props) {
  const { currentList, totalLists, onSetList } = props;

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5; // Максимальное количество кнопок, которые могут быть отображены

    // Определяем диапазон отображаемых кнопок
    let startPage = Math.max(1, currentList - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalLists, startPage + maxButtonsToShow - 1);

    // Пересчитываем startPage, чтобы отобразить максимальное количество кнопок
    startPage = Math.max(1, endPage - maxButtonsToShow + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`${i === currentList && styles.selected}`}
          onClick={() => onSetList(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className={`${styles.wrapper}`} style={props.className}>
      <button
        onClick={() => onSetList(currentList - 1 || 1)}
        disabled={currentList === 1}
      >
        «
      </button>
      {renderPaginationButtons()}
      <button
        onClick={() => onSetList(currentList + 1)}
        disabled={currentList === totalLists}
      >
        »
      </button>
    </div>
  );
}

export default Pagination;
