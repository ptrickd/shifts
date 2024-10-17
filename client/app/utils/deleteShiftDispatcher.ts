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
  // const { id, employeeId, date, startTime, endTime, weekStart } = shift;

  dispatch({
    type: SHIFTS_ACTIONS.DELETE_SHIFT,
    payload: {
      ...shift,
    },
  });

  valuesByDayDispatch({
    type: VALUES_ACTIONS.SUBSTRACT_VALUES,
    payload: {
      ...shift,
    },
  });
  valuesByEmployeeDispatch({
    type: VALUES_ACTIONS.SUBSTRACT_VALUES,
    payload: {
      ...shift,
    },
  });
};

export { deleteShiftDispatcher };
