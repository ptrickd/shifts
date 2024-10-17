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
        /*
        Find if employeeId is present
        
        */
        const { employeeId, startTime, endTime, date } = action.payload;
        const hoursToAdd = computeHoursInShift(startTime, endTime);
        const dateObj = createDate(date);
        const day = dateObj.getDay();
        const newTotals = new Map(computedValues);
        const initialHoursByDay = [0, 0, 0, 0, 0, 0, 0];
        if (!computedValues.has(employeeId)) {
          initialHoursByDay[day] = hoursToAdd;
          const newTotal = initialHoursByDay.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          newTotals.set(employeeId, {
            hoursByDay: initialHoursByDay,
            totalHours: newTotal,
          });
        } else {
          //date already exist
          const hours =
            newTotals.get(employeeId)?.hoursByDay || initialHoursByDay;
          hours[day] = hoursToAdd;
          const newTotal = hours.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          newTotals.set(employeeId, {
            hoursByDay: hours,
            totalHours: newTotal,
          });
        }

        return newTotals;
      } else return computedValues;
    }
    case VALUES_ACTIONS.SUBSTRACT_VALUES: {
      /*
      payload
      {
        "id": 85,
        "employeeId": 2,
        "startTime": "08:00",
        "endTime": "12:00",
        "date": "2024-10-10",
        "weekStart": "2024-10-06"
      }
      */

      /*
      computedValues
      {
        "hoursByDay": [
          0,  sunday
          0,
          0,  tuesday
          0,
          4,  thursday
          0,
          0   saturday
        ],
        "totalHours": 4//total hours that employee do in the week
      }
      
      */

      //Deep copy map
      const newValues: TComputedTotalHoursByEmployee = new Map(
        JSON.parse(JSON.stringify(Array.from(computedValues)))
      );
      if (action.payload !== undefined && !Array.isArray(action.payload)) {
        const { date, employeeId, startTime, endTime } = action.payload;

        const dateObj = createDate(date);
        const indexOfDay = dateObj.getDay();

        const hoursToSubstract = computeHoursInShift(startTime, endTime);

        const employeeShifts = newValues.get(employeeId);
        const hoursByDay = employeeShifts?.hoursByDay;
        let totalHours = employeeShifts?.totalHours;

        if (employeeShifts && hoursByDay && totalHours) {
          hoursByDay[indexOfDay] = hoursByDay[indexOfDay] - hoursToSubstract;

          totalHours = totalHours - hoursToSubstract;
          newValues.set(employeeId, {
            hoursByDay: hoursByDay,
            totalHours: totalHours,
          });
        }

        return newValues;
      } else return computedValues;
    }
    default:
      return computedValues;
  }
}
