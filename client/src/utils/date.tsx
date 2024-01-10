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
  const today = new Date(date.getTime());
  const dateInNumber = today.getDate();
  const month = today.getMonth();

  if (dateInNumber >= 6) {
    return "weekStartThisMonth";
  } else if (dateInNumber < 6 && month > 0) {
    return "weekStartPreviousMonthThisYear";
  } else if (dateInNumber < 6) {
    return "weekStartPreviousYear";
  }
};

const determineNextWeekDateState = (currentWeekStart: string) => {
  // const weekStart = new Date(currentWeekStart);
  // const weekStart = new Date();
  const { year, month, day } = parseDate(currentWeekStart);
  const date = Number(day);
  // const month = weekStart.getMonth();
  // const year = weekStart.getFullYear();

  const numberOfDaysInNextMonth = new Date(
    Number(year),
    Number(month),
    0
  ).getDate();

  if (date <= numberOfDaysInNextMonth - 7) {
    return "nextWeekStartThisMonth";
  } else if (date + 7 > numberOfDaysInNextMonth && Number(month) <= 11) {
    return "nextWeekStartNextMonth";
  } else if (date + 7 > numberOfDaysInNextMonth) {
    return "nextWeekStartNextYear";
  } else {
    return "undefined state";
  }
};

const determineLastWeekDateState = (currentWeekStart: string) => {
  const weekStart = new Date(currentWeekStart);

  const dateInNumber = weekStart.getDate();
  const month = weekStart.getMonth();

  if (dateInNumber > 7) {
    return "lastWeekStartThisMonth";
  } else if (dateInNumber <= 7 && month > 0) {
    return "lastWeekStartLastMonth";
  } else if (dateInNumber <= 7) {
    return "lastWeekStartLastYear";
  } else {
    return "undefined state";
  }
};

//function transforming date format in string ex:'2023-11-12'
const stringify = (date: Date) => {
  const formatDay = (date: Date) => {
    const day = date.getDate();
    if (day < 10) return `0${day}`;
    else return `${day}`;
  };
  const formatMonth = (date: Date) => {
    const month = date.getMonth() + 1;

    if (month < 10) return `0${month}`;
    else return `${month}`;
  };
  return `${date.getFullYear()}-${formatMonth(date)}-${formatDay(date)}`;
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
          numberOfDaysInPreviousMonth - dayWeekInNumber + dateInNumber;

        today.setDate(firstDayOfWeek);
        today.setMonth(today.getMonth() - 1);

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
    switch (determineLastWeekDateState(currentWeekStart)) {
      case "lastWeekStartThisMonth":
        {
          const newWeekStart = new Date();
          newWeekStart.setFullYear(Number(year));
          newWeekStart.setMonth(Number(month) - 1);
          newWeekStart.setDate(Number(day) - 7);

          return stringify(newWeekStart);
        }
        break;
      case "lastWeekStartLastMonth":
        {
          const numberOfDaysInLastMonth = new Date(
            Number(year),
            Number(month),
            0
          ).getDate();

          const newWeekStart = new Date();
          newWeekStart.setFullYear(Number(year));
          newWeekStart.setMonth(Number(month));
          newWeekStart.setDate(Number(day) - 7 - numberOfDaysInLastMonth);

          return stringify(newWeekStart);
        }
        break;
      case "lastWeekStartLastYear":
        {
          const numberOfDaysInLastMonth = new Date(
            Number(year),
            Number(month),
            0
          ).getDate();

          const newWeekStart = new Date();
          newWeekStart.setFullYear(Number(year) - 1);
          newWeekStart.setMonth(11);
          newWeekStart.setDate(numberOfDaysInLastMonth + Number(day) - 7);

          return stringify(newWeekStart);
        }
        break;
      default:
        return "0-0-0";
        break;
    }
  } else if (direction === "forward") {
    switch (determineNextWeekDateState(currentWeekStart)) {
      case "nextWeekStartThisMonth":
        {
          const newWeekStart = new Date();
          newWeekStart.setFullYear(Number(year));
          newWeekStart.setMonth(Number(month) - 1);
          newWeekStart.setDate(Number(day) + 7);

          return stringify(newWeekStart);
        }
        break;
      case "nextWeekStartNextMonth":
        {
          const numberOfDaysInThisMonth = new Date(
            Number(year),
            Number(month),
            0
          ).getDate();

          const newWeekStart = new Date();
          newWeekStart.setFullYear(Number(year));
          newWeekStart.setMonth(Number(month));
          newWeekStart.setDate(Number(day) + 7 - numberOfDaysInThisMonth);

          return stringify(newWeekStart);
        }
        break;
      case "nextWeekStartNextYear":
        {
          const numberOfDaysInThisMonth = new Date(
            Number(year),
            Number(month),
            0
          ).getDate();

          const newWeekStart = new Date();
          newWeekStart.setFullYear(Number(year));
          newWeekStart.setMonth(Number(month));
          newWeekStart.setDate(Number(day) + 7 - numberOfDaysInThisMonth);

          return stringify(newWeekStart);
        }
        break;
      default:
        return "0-0-0";
        break;
    }
  }
  return currentWeekStart;
};
