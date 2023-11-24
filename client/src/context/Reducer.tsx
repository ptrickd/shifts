import { useContext } from "react";

import { ShiftsContext } from "./Context";
interface IAction {
  type: string;
}
interface IState {
  employeeId: number;
  date: string;
  startTime: string;
  endTime: string;
  shifts: IShift[];
}

interface IData {
  id?: number;
  employeeId: number;
  date: string;
  startTime: string;
  endTime: string;
}

const url = `http://localhost:3000/api/v1/shifts`;

const postShift = async (data: IData) => {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const putShift = async (data: IData) => {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export function ShiftsReducer(state: IState, action: IAction) {
  const shifts = useContext(ShiftsContext);
  console.log(shifts);

  switch (action.type) {
    case "update_shift":
      {
        let foundShift: null | IShift = null;
        const newState = state.shifts.map((shift) => {
          if (
            shift.employeeId === state.employeeId &&
            shift.date === state.date
          ) {
            foundShift = {
              ...shift,
              startTime: state.startTime,
              endTime: state.endTime,
            };
            return {
              ...shift,
              startTime: state.startTime,
              endTime: state.endTime,
            };
          } else {
            return { ...shift };
          }
        });

        if (!foundShift) {
          newState.push({
            employeeId: state.employeeId,
            startTime: state.startTime,
            endTime: state.endTime,
            date: state.date,
          });
          postShift({
            employeeId: state.employeeId,
            startTime: state.startTime,
            endTime: state.endTime,
            date: state.date,
          });
        } else {
          putShift(foundShift);
        }
        //fetch
        return newState;
      }

      break;

    default:
      throw Error("Unknow action.");
  }
}
