//function transforming date format in string ex:'2023-11-12'
const stringify = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

//function computing the fist day of the week sunday
export const computeWeekStart = (today: Date) => {
  const dayWeekInNumber = today.getDay();
  const dateInNumber = today.getDate();

  if (dayWeekInNumber === 0) {
    //convert to format '2023-11-12'
    return stringify(today);
  } else {
    //must return date of the previous sunday
    //if previous sunday this month
    if (today.getDate() > 6) {
      today.setDate(dateInNumber - dayWeekInNumber);
    }
    //if previous sunday last month

    //convert to format '2023-11-12'

    return stringify(today);
  }
};

//function compute the beginning the last week or the next one
export const computeNewWeekStart = (
  currentWeekStart: string,
  direction: string
) => {
  const year = currentWeekStart.substring(0, 4);
  const month = currentWeekStart.substring(5, 7);
  const day = currentWeekStart.substring(8, 10);

  if (direction === "backward") {
    const newDay = Number(day) - 7;
    return `${year}-${month}-${newDay}`;
  } else if (direction === "forward") {
    const newDay = Number(day) + 7;
    return `${year}-${month}-${newDay}`;
  }
  return currentWeekStart;
};
