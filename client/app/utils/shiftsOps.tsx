import { Dispatch } from "react";
import { postShift, putShift } from "./shiftsAPI";
import { SHIFTS_ACTIONS } from "../reducer/shiftsReducer";
import { VALUES_ACTIONS } from "../reducer/computedTotalHoursByDay";
import { createDate } from "./date";
const getDayAndTotal: (
  startTime: string,
  endTime: string,
  date: Date
) => { totalHours: number; day: number } = (startTime, endTime, date) => {
  const indexStart = Number(startTime.indexOf(":"));
  const indexEnd = Number(endTime.indexOf(":"));

  const hourStart = Number(startTime.substring(indexStart, -2));
  const minuteStart = Number(startTime.substring(indexStart + 1));

  const hourEnd = Number(endTime.substring(indexEnd, -2));
  const minuteEnd = Number(endTime.substring(indexEnd + 1));

  const totalHours = hourEnd - hourStart + (minuteEnd - minuteStart) / 60;
  const day = date.getDay();

  return { totalHours, day };
};

const updateShifts: (
  newShift: IShift,
  shifts: IShift[] | [],
  dispatch: Dispatch<IShiftsAction>,
  valuesByDayDispatch: Dispatch<IValuesByDayAction>,
  valuesByEmployeeDispatch: Dispatch<IValuesByEmployeeAction>
) => void = (
  newShift,
  shifts,
  dispatch,
  valuesByDayDispatch,
  valuesByEmployeeDispatch
) => {
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
    const { day, totalHours } = getDayAndTotal(
      startTime,
      endTime,
      createDate(date)
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

      valuesByDayDispatch({
        type: VALUES_ACTIONS.ADD_VALUES,
        payload: { day, totalHours },
      });

      valuesByEmployeeDispatch({
        type: VALUES_ACTIONS.ADD_VALUES,
        payload: {
          id: response.id,
          employeeId,
          startTime,
          endTime,
          date,
          weekStart,
        },
      });
    } else if (foundShift) {
      putShift({ ...foundShift, startTime, endTime });

      const newDate = createDate(date);

      const { totalHours: newTotalHour, day } = getDayAndTotal(
        startTime,
        endTime,
        newDate
      );

      const { totalHours: previousTotalHour } = getDayAndTotal(
        foundShift.startTime,
        foundShift.endTime,
        newDate
      );

      const diffTotalHour = newTotalHour - previousTotalHour;

      valuesByDayDispatch({
        type: VALUES_ACTIONS.ADD_VALUES,
        payload: { day, totalHours: diffTotalHour },
      });

      valuesByEmployeeDispatch({
        type: VALUES_ACTIONS.ADD_VALUES,
        payload: {
          id,
          employeeId,
          startTime,
          endTime,
          date,
          weekStart,
        },
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
