import { Dispatch } from "react";
import { postShift, putShift } from "./restApiCall";
import { SHIFTS_ACTIONS } from "../context/shiftsReducer";
import { VALUES_ACTIONS } from "../context/computedValuesReducer";

const getDayAndTotal: (
  startTime: string,
  endTime: string,
  date: Date
) => { totalHour: number; day: number } = (startTime, endTime, date) => {
  const indexStart = Number(startTime.indexOf(":"));
  const indexEnd = Number(endTime.indexOf(":"));

  const hourStart = Number(startTime.substring(indexStart, -2));
  const minuteStart = Number(startTime.substring(indexStart + 1));

  const hourEnd = Number(endTime.substring(indexEnd, -2));
  const minuteEnd = Number(endTime.substring(indexEnd + 1));

  const totalHour = hourEnd - hourStart + (minuteEnd - minuteStart) / 60;
  const day = date.getDay();

  return { totalHour, day };
};

const updateShifts: (
  newShift: IShift,
  shifts: IShift[] | [],
  dispatch: Dispatch<IShiftsAction>,
  valuesDispatch: Dispatch<IValuesAction>
) => void = (newShift, shifts, dispatch, valuesDispatch) => {
  const { id, employeeId, startTime, endTime, date, weekStart } = newShift;

  let foundShift: null | IShift = null;

  shifts.forEach((shift: IShift) => {
    if (shift.employeeId === employeeId && shift.date === date) {
      foundShift = {
        ...shift,
      };
    }
  });

  const updatingShift = async () => {
    const { day, totalHour } = getDayAndTotal(
      startTime,
      endTime,
      new Date(date)
    );

    if (!foundShift) {
      const response = await postShift({
        employeeId,
        startTime,
        endTime,
        date,
        weekStart,
      });

      dispatch({
        type: SHIFTS_ACTIONS.ADD_SHIFT,
        payload: {
          id: response.id,
          employeeId,
          startTime,
          endTime,
          date,
          weekStart,
        },
      });

      valuesDispatch({
        type: VALUES_ACTIONS.ADD_VALUES,
        payload: { day, totalHour },
      });
    } else if (foundShift) {
      putShift({ ...foundShift, startTime, endTime });

      const newDate = new Date(date);

      const { totalHour: newTotalHour, day } = getDayAndTotal(
        startTime,
        endTime,
        newDate
      );

      const { totalHour: previousTotalHour } = getDayAndTotal(
        foundShift.startTime,
        foundShift.endTime,
        newDate
      );

      const diffTotalHour = newTotalHour - previousTotalHour;

      valuesDispatch({
        type: VALUES_ACTIONS.ADD_VALUES,
        payload: { day, totalHour: diffTotalHour },
      });

      dispatch({
        type: SHIFTS_ACTIONS.UPDATE_SHIFT,
        payload: {
          id,
          employeeId,
          startTime,
          endTime,
          date,
          weekStart,
        },
      });
    } else throw new Error("foundshift not found");
  };

  updatingShift();
};

export { updateShifts, getDayAndTotal };
