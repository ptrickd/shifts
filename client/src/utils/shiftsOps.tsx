import { Dispatch } from "react";
import { postShift, putShift } from "./restApiCall";
import { ACTIONS } from "../context/Reducer";

interface INewShift {
  id: number;
  employeeId: number;
  startTime: string;
  endTime: string;
  date: string;
}

const updateShifts: (
  newShift: INewShift,
  shifts: IShift[] | [],
  dispatch: Dispatch<IAction>
) => IShift[] = (newShift, shifts, dispatch) => {
  const { id, employeeId, startTime, endTime, date } = newShift;

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
        id: id,
        employeeId: employeeId,
        startTime: startTime,
        endTime: endTime,
        date: date,
      },
    });

    postShift({
      employeeId: employeeId,
      startTime: startTime,
      endTime: endTime,
      date: date,
    });
  } else if (foundShift) {
    dispatch({
      type: ACTIONS.UPDATE_SHIFT,
      payload: {
        id: id,
        employeeId: employeeId,
        startTime: startTime,
        endTime: endTime,
        date: date,
      },
    });

    putShift(foundShift);
  } else throw new Error("founshfit not found");

  // fetch;
  return newShifts;
};

export { updateShifts };
