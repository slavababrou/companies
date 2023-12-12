export const validateRating = (rating) => {
  // Преобразуем строку в целое число
  const parsedRating = parseInt(rating, 10);

  // Проверяем, является ли parsedRating целым числом
  if (Number.isInteger(parsedRating)) {
    // Проверяем, что оценка в пределах от 1 до 10
    if (parsedRating >= 1 && parsedRating <= 10) {
      // Оценка валидна
      return { valid: true, error: null };
    } else {
      // Оценка вне допустимого диапазона
      return { valid: false, error: "Оценка должна быть от 1 до 10" };
    }
  } else {
    // Некорректное значение оценки (не целое число)
    return { valid: false, error: "Оценка должна быть целым числом" };
  }
};

export const validateTerm = (term) => {
  if (term.trim() === "") {
    return { valid: false, error: "Поле с темой не может быть пустым" };
  }
  return { valid: true, error: null };
};
