import { VALUES_ACTIONS } from "./computedTotalHoursByDay";
import { computeHoursInShift } from "../utils/shiftComputing";
import { createDate } from "../utils/date";

const computeValuesTotalByEmployee = (shifts: IShift[] | []) => {
  const newValues = new Map<number, ITotalHoursByEmployee>();

  /*
    Define how many hours each employee get that week
    Mapping though a array of shifts 
    Organize it the first time a new week load
    Organize it by employeeId => {day: number[], totalHours: number}
  */
  shifts.forEach((shift) => {
    const initialHoursByDay: number[] = [0, 0, 0, 0, 0, 0, 0];
    const totalHoursThisShift = computeHoursInShift(
      shift.startTime,
      shift.endTime
    );
    const date = createDate(shift.date);
    const day = date.getDay();

    if (newValues.has(shift.employeeId)) {
      const newHoursByDay =
        newValues.get(shift.employeeId)?.hoursByDay || initialHoursByDay;
      newHoursByDay[day] = totalHoursThisShift;

      const totalHours = newHoursByDay.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      newValues.set(shift.employeeId, {
        hoursByDay: newHoursByDay,
        totalHours: totalHours,
      });
    } else {
      const newHoursByDay = initialHoursByDay;
      newHoursByDay[day] = totalHoursThisShift;
      const totalHours = initialHoursByDay.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      newValues.set(shift.employeeId, {
        hoursByDay: newHoursByDay,
        totalHours,
      });
    }
  });

  return newValues;
};

export function computedTotalHoursByEmployee(
  computedValues: TComputedTotalHoursByEmployee,
  action: IValuesByEmployeeAction
): TComputedTotalHoursByEmployee {
  switch (action.type) {
    case VALUES_ACTIONS.SET_VALUES: {
      if (
        action.payload &&
        Array.isArray(action.payload) &&
        action.payload.length
      ) {
        return computeValuesTotalByEmployee(action.payload);
      } else return computedValues;
    }
    case VALUES_ACTIONS.ADD_VALUES: {
      if (
        action.payload !== null &&
        !Array.isArray(action.payload) &&
        typeof action.payload === "object" &&
        "employeeId" in action.payload &&
        "startTime" in action.payload &&
        "endTime" in action.payload &&
        "date" in action.payload
      ) {
        const { employeeId, startTime, endTime, date } = action.payload;
        const hoursToAdd = computeHoursInShift(startTime, endTime);
        const newTotals = computedValues;

        const isDateFound = (date: string, dates: string[]) => {
          let isDateFound = false;

          dates?.map((dateInArr) => {
            if (dateInArr === date) isDateFound = true;
          });
          return isDateFound;
        };
        const entries = computedValues.entries();
        console.log(entries);

        // const keys = computedValues.keys();
        // const value=

        // const datesInArr = value.dates;
        // datesInArr.push(date);
        console.log("hdhdhdhdhd");
        console.log(date);
        // console.log(datesInArr);
        if (!computedValues.has(employeeId)) {
          newTotals.set(employeeId, {
            dates: [date],
            totalHours: hoursToAdd,
          });
        } else if (
          //employeee exist but date don't
          !isDateFound(date, computedValues.get(employeeId)?.dates || [])
        ) {
          const datesInArr = computedValues.get(employeeId)?.dates || [];
          const totalHours = computedValues.get(employeeId)?.totalHours || 0;
          datesInArr.push(date);
          newTotals.set(employeeId, {
            dates: datesInArr,
            totalHours: hoursToAdd + totalHours,
          });
        } else {
          //date already exist
          // const totalHours = computedValues.get(employeeId)?.totalHours || 0;
          const datesInArr = computedValues.get(employeeId)?.dates || [];
          const diffTotalHour = 0;

          newTotals.set(employeeId, {
            dates: datesInArr,
            totalHours: diffTotalHour,
          });
        }

        return newTotals;
      } else return computedValues;
      break;
    }
    default:
      return computedValues;
  }
}
