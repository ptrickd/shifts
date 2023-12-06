//if change ACTIONS has to be updated in global.d.ts
export enum ACTIONS {
  SET_SHIFTS = "SET_SHIFTS",
  ADD_SHIFT = "ADD_SHIFT",
}

export function shiftsReducer(
  shifts: IShift[] | [],
  action: IAction
): IShift[] {
  switch (action.type) {
    case ACTIONS.SET_SHIFTS:
      if (action.payload && Array.isArray(action.payload))
        return [...action.payload];
      else return shifts;

      break;
    case ACTIONS.ADD_SHIFT:
      if (
        action.payload &&
        typeof action.payload === "object" &&
        !Array.isArray(action.payload)
      )
        return [...shifts, { ...action.payload }];
      else return shifts;
      break;
    default:
      return shifts;
  }
}
