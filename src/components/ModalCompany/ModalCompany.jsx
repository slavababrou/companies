import React, { useState } from "react";
import styles from "./ModalCompany.module.css";
import { addRequest } from "../../store/requestsSlice";
import { useDispatch, useSelector } from "react-redux";

const ModalCompany = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.user?.user?.id);
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Диспатчим thunk для создания запроса
      const result = await dispatch(
        addRequest({
          type: "company",
          userId: userId,
          companyInfo: {
            name: companyData.companyName,
            type: companyData.companyType,
          },
        })
      );

      if (addRequest.fulfilled.match(result)) {
        // Успешно создан запрос
        alert("Запрос успешно создан!");
      } else {
        alert("Не удалось создать запрос. Пожалуйста, попробуйте еще раз.");
      }
    } catch (error) {
      alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }

    onClose();
  };

  const modalContent = (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Добавить компанию</h2>
          <button className={styles.closeButton} onClick={onClose}>
            Закрыть
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Название компании:
            <input
              type='text'
              name='companyName'
              value={companyData.companyName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Тип компании:
            <input
              type='text'
              name='companyType'
              value={companyData.companyType}
              onChange={handleInputChange}
            />
          </label>
          <button type='submit'>Отправить запрос</button>
        </form>
      </div>
    </div>
  );

  return isOpen ? modalContent : null;
};

export default ModalCompany;
