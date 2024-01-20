import { VALUES_ACTIONS } from "./computedTotalHoursByDay";
import { computeHoursInShift } from "../utils/shiftComputing";

const computeValuesTotalByEmployee = (shifts: IShift[] | []) => {
  const newValues = new Map<number, ITotalHoursByEmployee>();

  shifts.forEach((shift) => {
    const totalHours = computeHoursInShift(shift.startTime, shift.endTime);

    if (newValues.has(shift.employeeId)) {
      const previousTotalHours =
        newValues.get(shift.employeeId)?.totalHours || 0;
      newValues.set(shift.employeeId, {
        totalHours: previousTotalHours + totalHours,
      });
    } else {
      newValues.set(shift.employeeId, { totalHours });
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
        "endTime" in action.payload
      ) {
        const { employeeId, startTime, endTime } = action.payload;
        const hoursToAdd = computeHoursInShift(startTime, endTime);
        const newTotals = new Map();
        let employeeIdFound = false;

        computedValues.forEach((value, key) => {
          if (key !== employeeId) {
            newTotals.set(key, { totalHours: value.totalHours });
          } else {
            newTotals.set(key, {
              totalHours: value.totalHours + hoursToAdd,
            });
            employeeIdFound = true;
          }
        });
        if (!employeeIdFound) {
          newTotals.set(employeeId, { totalHours: hoursToAdd });
        }

        return newTotals;
      } else return computedValues;
      break;
    }
    default:
      return computedValues;
  }
}
