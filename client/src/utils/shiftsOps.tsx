import { Dispatch } from "react";
import { postShift, putShift } from "./restApiCall";
import { ACTIONS } from "../context/Reducer";

const updateShifts: (
  newShift: IShift,
  shifts: IShift[] | [],
  dispatch: Dispatch<IAction>
) => IShift[] = (newShift, shifts, dispatch) => {
  const { id, employeeId, startTime, endTime, date, weekStart } = newShift;

  let foundShift: null | IShift = null;

  const newShifts = shifts.map((shift: IShift) => {
    if (shift.employeeId === employeeId && shift.date === date) {
      foundShift = {
        ...shift,
        startTime: startTime,
        endTime: endTime,
      };
      return foundShift;
    } else {
      return { ...shift };
    }
  });

  if (!foundShift) {
    dispatch({
      type: ACTIONS.ADD_SHIFT,
      payload: {
        id,
        employeeId,
        startTime,
        endTime,
        date,
        weekStart,
      },
    });

    postShift({
      employeeId: employeeId,
      startTime: startTime,
      endTime: endTime,
      date: date,
      weekStart,
    });
  } else if (foundShift) {
    dispatch({
      type: ACTIONS.UPDATE_SHIFT,
      payload: {
        id,
        employeeId,
        startTime,
        endTime,
        date,
        weekStart,
      },
    });

    putShift(foundShift);
  } else throw new Error("founshfit not found");

  // fetch;
  return newShifts;
};

export { updateShifts };
