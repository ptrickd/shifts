interface IAction {
  type: string;
}
interface IState {
  employeeId: number;
  date: string;
  startTime: string;
  endTime: string;
  shifts: IShift[] | [];
}

export function ShiftsReducer(state: IState, action: IAction) {
  switch (action.type) {
    case "update_shift":
      console.log(state);
      console.log(action);

      break;

    default:
      throw Error("Unknow action.");
  }
}
