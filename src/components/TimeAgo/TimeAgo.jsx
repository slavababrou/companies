import { useEffect, useState } from "react";

const TimeAgo = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentDate = new Date();
      const commentDate = new Date(date);

      const timeDifference = currentDate - commentDate;
      const seconds = Math.floor(timeDifference / 1000);

      if (seconds < 60) {
        setTimeAgo("несколько секунд назад");
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setTimeAgo(
          `${minutes} ${declOfNum(minutes, ["минуту", "минуты", "минут"])}`
        );
      } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        setTimeAgo(`${hours} ${declOfNum(hours, ["час", "часа", "часов"])}`);
      } else {
        const days = Math.floor(seconds / 86400);
        setTimeAgo(`${days} ${declOfNum(days, ["день", "дня", "дней"])}`);
      }
    };

    calculateTimeAgo();
  }, [date]);

  const declOfNum = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  return <>{timeAgo}</>;
};

export default TimeAgo;
