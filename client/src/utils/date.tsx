//function computing the fist day of the week sunday
export const computeWeekStart = (today: Date) => {
  const dayWeekInNumber = today.getDay();
  const dateInNumber = today.getDate();

  if (dayWeekInNumber === 0) {
    //convert to format '2023-11-12'
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  } else {
    //must return date of the previous sunday
    //if previous sunday this month
    if (today.getDate() > 6) {
      today.setDate(dateInNumber - dayWeekInNumber);
    }
    //if previous sunday last month

    //convert to format '2023-11-12'

    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  }
};
