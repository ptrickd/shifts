// import { useReducer } from "react";

interface IAction {
  type: string;
}
interface IState {
  employeeId: number;
  date: Date;
  startTime: string;
  endTime: string;
  shifts: IShift[];
}

export function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "update_shift":
      return state;
      break;

    default:
      throw Error("Unknow action.");
  }
}
