// Rating.jsx
import React from "react";
import styles from "./Rating.module.css";

const Rating = ({ value }) => {
  const filledStars = Math.floor(value);
  const starFraction = value - filledStars;

  return (
    <div className={styles["stars-container"]}>
      {[...Array(filledStars)].map((_, index) => (
        <span key={index} className={styles["star"]}>
          <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
            <polygon
              points='10,0 13,6 20,7 15,12 17,20 10,16 3,20 5,12 0,7 7,6'
              fill='gold'
            />
          </svg>
        </span>
      ))}
      {starFraction > 0 && (
        <span key={filledStars} className={styles["star"]}>
          <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
            <polygon
              points={`10,0 13,6 20,7 15,12 17,20 ${
                15 + starFraction * 5
              },15 ${10},20 ${5 - starFraction * 5},15 0,7 7,6`}
              fill='gold'
            />
          </svg>
        </span>
      )}
      {[...Array(5 - filledStars - 1)].map((_, index) => (
        <span key={filledStars + 1 + index} className={styles["star"]}>
          <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
            <polygon
              points='10,0 13,6 20,7 15,12 17,20 10,16 3,20 5,12 0,7 7,6'
              fill='lightgray'
            />
          </svg>
        </span>
      ))}
    </div>
  );
};

export default Rating;
