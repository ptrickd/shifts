export enum ACTIONS {
  SET_SHIFTS = "SET_SHIFTS",
  ADD_SHIFT = "ADD_SHIFT",
}

export function shiftsReducer(shifts: IShift[] | [], action: IAction) {
  switch (action.type) {
    case ACTIONS.SET_SHIFTS:
      if (action.payload) return [...action.payload];
      else return [...shifts];

      break;
    case ACTIONS.ADD_SHIFT:
      return [...shifts, { ...action.payload }];

      break;
    default:
      return [...shifts];
  }
}
