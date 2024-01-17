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
    default:
      return computedValues;
  }
}
