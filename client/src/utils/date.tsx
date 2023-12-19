/*
  case:
  1-beginning of the week is today
  2-beginning of the week is in previous month
  3-beginning of this week is in this month
*/
//function transforming date format in string ex:'2023-11-12'
const stringify = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

//function computing the fist day of the week sunday
export const computeWeekStart = (ogToday: Date) => {
  const today = new Date(ogToday.getTime());
  const dayWeekInNumber = today.getDay();
  const dateInNumber = today.getDate();
  const numberOfDaysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  console.log(numberOfDaysInMonth);

  // 1-beginning of the week is today

  if (dayWeekInNumber === 0) {
    //convert to format '2023-11-12'

    return stringify(today);
  } else if (today.getDate() < 6) {
    // 2-beginning of this week is in previous month
    let previousMonth = 0;

    if (today.getMonth() === 0) {
      previousMonth = 11;
    } else {
      previousMonth = today.getMonth() - 1;
    }
    const numberOfDaysInPreviousMonth = new Date(
      today.getFullYear(),
      previousMonth + 1,
      0
    ).getDate();
    const firstDayOfWeek = numberOfDaysInPreviousMonth - dateInNumber;
    /*
      if previous month is this year
      if previous month is last year
    */
    today.setDate(firstDayOfWeek);
    console.log(stringify(today));

    //convert to format '2023-11-12'
    return stringify(today);
  } else if (today.getDate() > 6 || today.getDate() - dayWeekInNumber > 1) {
    // 3-beginning of this week is in this month
    today.setDate(dateInNumber - dayWeekInNumber);

    //convert to format '2023-11-12'
    return stringify(today);
  } else return "0-0-0";
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
