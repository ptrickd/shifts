import { getDayAndTotal } from "../utils/shiftsOps";
import { createDate } from "../utils/date";
import { computeHoursInShift } from "../utils/shiftComputing";

//if change ACTIONS has to be updated in global.d.ts
export enum VALUES_ACTIONS {
  SET_VALUES = "SET_VALUES",
  ADD_VALUES = "ADD_VALUES",
  SUBSTRACT_VALUES = "SUBSTRACT_VALUES",
}

const defaultValues = [
  { total: 0 },
  { total: 0 },
  { total: 0 },
  { total: 0 },
  { total: 0 },
  { total: 0 },
  { total: 0 },
];

const computeValuesTotalByDay = (shifts: IShift[]) => {
  //find the weekStart make it index 0

  // //map through shift
  const sortedValues = [
    { total: 0 },
    { total: 0 },
    { total: 0 },
    { total: 0 },
    { total: 0 },
    { total: 0 },
    { total: 0 },
  ];

  shifts.forEach((shift) => {
    const currentDate = createDate(`${shift.date}`);
    const weekStartDate = createDate(`${shift.weekStart}`);
    const currentIndex = currentDate.getDay() - weekStartDate.getDay();

    const total = computeHoursInShift(shift.startTime, shift.endTime);

    sortedValues[currentIndex] = {
      total: total + sortedValues[currentIndex].total,
    };
  });
  return sortedValues;
};

export function computedTotalHoursByDay( //Record<string | never> type for empty object
  computedValues: IComputedTotalHoursByDay[] | [],
  action: IValuesByDayAction
): IComputedTotalHoursByDay[] | [] {
  switch (action.type) {
    case VALUES_ACTIONS.SET_VALUES: {
      if (
        action.payload &&
        Array.isArray(action.payload) &&
        action.payload.length
      ) {
        return computeValuesTotalByDay(action.payload);
      }

      return defaultValues;
      break;
    }
    case VALUES_ACTIONS.ADD_VALUES: {
      if (
        action.payload &&
        typeof action.payload === "object" &&
        "day" in action.payload
      ) {
        const { day, totalHours } = action.payload;

        const valuesToReturn = JSON.parse(JSON.stringify(computedValues));
        valuesToReturn[day].total += totalHours;

        return valuesToReturn;
      }

      return defaultValues;
      break;
    }
    case VALUES_ACTIONS.SUBSTRACT_VALUES: {
      if (
        action.payload &&
        typeof action.payload === "object" &&
        "id" in action.payload
      ) {
        const { startTime, endTime, date } = action.payload;
        const { totalHours, day } = getDayAndTotal(
          startTime,
          endTime,
          createDate(date)
        );

        const valuesToReturn = JSON.parse(JSON.stringify(computedValues));
        valuesToReturn[day].total -= totalHours;

        return valuesToReturn;
      }
      return defaultValues;
      break;
    }

    default:
      return defaultValues;
  }
}
