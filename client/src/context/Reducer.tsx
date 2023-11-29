export enum ACTIONS {
  SET_SHIFTS = "SET_SHIFTS",
}

interface IAction {
  type: ACTIONS.SET_SHIFTS;
  payload?: IShift[] | []; // note the question mark
}

export function shiftsReducer(shifts: IShift[] | [], action: IAction) {
  switch (action.type) {
    case ACTIONS.SET_SHIFTS:
      if (action.payload) return [...action.payload];
      else return [...shifts];

      break;

    default:
      return [...shifts];
  }
}
