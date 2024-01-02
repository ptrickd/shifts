/******* Local *******************/

const parseDate = (weekStart: string) => {
  const year = weekStart.substring(0, 4);
  const month = weekStart.substring(5, 7);
  const day = weekStart.substring(8, 10);
  return { year, month, day };
};
// const tempDays = ["Sunday", "Monday", "Tuesday", "Wednesday"];
// const tempMonth = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

const determineDateState = (date: Date) => {
  /*
  data I need: today, weekDayInNumber, month, year
  */
  const today = new Date(date.getTime());
  const dateInNumber = today.getDate();
  const month = today.getMonth();
  // console.log(`numberOfDaysInMonth: ${numberOfDaysInMonth}`);
  // console.log(`dateInNumber: ${dateInNumber}`);
  // console.log(`dayWeekInNumber: ${tempDays[dayWeekInNumber]}`);
  // console.log(`year: ${year}`);
  // console.log(`month: ${tempMonth[month]}`);

  if (dateInNumber >= 6) {
    // 1-beginning of the week is this month
    return "weekStartThisMonth";
  } else if (dateInNumber < 6 && month > 0) {
    //2-beginning of the week is in previous month, same year
    return "weekStartPreviousMonthThisYear";
  } else if (dateInNumber < 6) {
    //3-beginning of the week is in previous year
    return "weekStartPreviousYear";
  }
};
//function transforming date format in string ex:'2023-11-12'
const stringify = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/******** Export ********/
//function computing the fist day of the week sunday
export const computeWeekStart = (ogToday: Date) => {
  /*
  state:
  1-beginning of this week is in this month
  2-beginning of the week is in previous month, same year
  3-beginning of the week is in previous year
*/

  const today = new Date(ogToday.getTime());
  const dayWeekInNumber = today.getDay();
  const dateInNumber = today.getDate();

  switch (determineDateState(ogToday)) {
    case "weekStartThisMonth":
      {
        today.setDate(dateInNumber - dayWeekInNumber);

        //convert to format '2023-11-12'
        return stringify(today);
      }
      break;
    case "weekStartPreviousMonthThisYear":
      {
        const previousMonth = today.getMonth();

        const numberOfDaysInPreviousMonth = new Date(
          today.getFullYear(),
          previousMonth,
          0
        ).getDate();
        const firstDayOfWeek =
          numberOfDaysInPreviousMonth -
          dateInNumber +
          numberOfDaysInPreviousMonth -
          dateInNumber +
          dayWeekInNumber;
        today.setDate(firstDayOfWeek);

        //convert to format '2023-11-12'
        return stringify(today);
      }
      break;
    case "weekStartPreviousYear":
      {
        const previousYear = Number(today.getFullYear()) - 1;
        const numberOfDaysInPreviousMonth = new Date(
          previousYear,
          12,
          0
        ).getDate();

        const firstDayOfWeek =
          numberOfDaysInPreviousMonth - dateInNumber + dayWeekInNumber;

        today.setFullYear(previousYear);
        today.setMonth(11);
        today.setDate(firstDayOfWeek);

        //convert to format '2023-11-12'
        return stringify(today);
      }
      break;
    default:
      return "0-0-0";
      break;
  }
};

//function compute the beginning the last week or the next one
export const computeNewWeekStart = (
  currentWeekStart: string,
  direction: string
) => {
  const { year, month, day } = parseDate(currentWeekStart);

  if (direction === "backward") {
    const newDay = Number(day) - 7;
    return `${year}-${month}-${newDay}`;
  } else if (direction === "forward") {
    const newDay = Number(day) + 7;
    return `${year}-${month}-${newDay}`;
  }
  return currentWeekStart;
};
