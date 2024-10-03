//if change ACTIONS has to be updated in global.d.ts
export enum SHIFTS_ACTIONS {
  SET_SHIFTS = "SET_SHIFTS",
  ADD_SHIFT = "ADD_SHIFT",
  UPDATE_SHIFT = "UPDATE_SHIFT",
  DELETE_SHIFT = "DELETE_SHIFT",
}

export function shiftsReducer(
  shifts: IShift[] | [],
  action: IShiftsAction
): IShift[] {
  switch (action.type) {
    case SHIFTS_ACTIONS.SET_SHIFTS:
      if (action.payload && Array.isArray(action.payload))
        return [...action.payload];
      else return shifts;

      break;
    case SHIFTS_ACTIONS.ADD_SHIFT:
      if (
        action.payload &&
        typeof action.payload === "object" &&
        !Array.isArray(action.payload)
      ) {
        return [...shifts, action.payload];
      } else return shifts;
      break;
    case SHIFTS_ACTIONS.UPDATE_SHIFT: {
      const newShifts: IShift[] = [];
      if (action?.payload && !Array.isArray(action.payload)) {
        shifts.map((shift) => {
          if (
            !Array.isArray(action.payload) &&
            action?.payload?.id !== undefined &&
            shift.id === action?.payload?.id
          ) {
            newShifts.push(action.payload);
          } else {
            newShifts.push(shift);
          }
        });
      }

      if (newShifts.length) return newShifts;
      else return shifts;
      break;
    }
    case SHIFTS_ACTIONS.DELETE_SHIFT: {
      const newShifts: IShift[] = [];
      if (
        action.payload &&
        !Array.isArray(action.payload) &&
        action.payload.id !== undefined
      ) {
        shifts.map((shift) => {
          if (
            action.payload &&
            !Array.isArray(action.payload) &&
            action.payload.id !== undefined &&
            shift.id !== action.payload?.id
          )
            newShifts.push(action.payload);
        });
      }
      return newShifts;
      break;
    }
    default:
      return shifts;
  }
}
