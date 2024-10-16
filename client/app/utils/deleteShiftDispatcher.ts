//React
import { Dispatch } from "react";

//Reducer actions
import { SHIFTS_ACTIONS } from "../reducer/shiftsReducer";
import { VALUES_ACTIONS } from "../reducer/computedTotalHoursByDay";

const deleteShiftDispatcher: (
  shift: IShift,
  dispatch: Dispatch<IShiftsAction>,
  valuesByDayDispatch: Dispatch<IValuesByDayAction>,
  valuesByEmployeeDispatch: Dispatch<IValuesByEmployeeAction>
) => void = (
  shift,
  dispatch,
  valuesByDayDispatch,
  valuesByEmployeeDispatch
) => {
  const { id, employeeId, date, startTime, endTime, weekStart } = shift;
  console.log("in deleteShiftDispatcher");
  console.log(shift);
  dispatch({
    type: SHIFTS_ACTIONS.DELETE_SHIFT,
    payload: {
      id,
      employeeId,
      startTime,
      endTime,
      date,
      weekStart,
    },
  });

  valuesByDayDispatch({
    type: VALUES_ACTIONS.SUBSTRACT_VALUES,
    payload: {
      id,
      employeeId,
      startTime,
      endTime,
      date,
      weekStart,
    },
  });
  valuesByEmployeeDispatch({
    type: VALUES_ACTIONS.SUBSTRACT_VALUES,
    payload: {
      id,
      employeeId,
      startTime,
      endTime,
      date,
      weekStart,
    },
  });
};

export { deleteShiftDispatcher };
