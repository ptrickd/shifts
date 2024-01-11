import { getDayAndTotal } from "../utils/shiftsOps";
import { createDate } from "../utils/date";
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
const computeHoursInShift = (startTime: string, endTime: string) => {
  const startTimeHours = Number(startTime.substring(0, 2));
  const startTimeMinutes = Number(startTime.substring(3, 5));

  const endTimeHours = Number(endTime.substring(0, 2));
  const endTimeMinutes = Number(endTime.substring(3, 5));

  const totalHours = endTimeHours - startTimeHours;
  const totalMinutes = endTimeMinutes - startTimeMinutes;

  return totalHours + totalMinutes / 60;
};

const computeValuesByTotal = (shifts: IShift[]) => {
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

export function computedValuesReducer( //Record<string | never> type for empty object
  computedValues: IComputedValues[] | [],
  action: IValuesAction
): IComputedValues[] | [] {
  switch (action.type) {
    case VALUES_ACTIONS.SET_VALUES: {
      if (
        action.payload &&
        Array.isArray(action.payload) &&
        action.payload.length
      ) {
        return computeValuesByTotal(action.payload);
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
        const { day, totalHour } = action.payload;

        const valuesToReturn = JSON.parse(JSON.stringify(computedValues));
        valuesToReturn[day].total += totalHour;

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
        const { totalHour, day } = getDayAndTotal(
          startTime,
          endTime,
          createDate(date)
        );

        const valuesToReturn = JSON.parse(JSON.stringify(computedValues));
        valuesToReturn[day].total -= totalHour;

        return valuesToReturn;
      }
      return defaultValues;
      break;
    }

    default:
      return defaultValues;
  }
}
