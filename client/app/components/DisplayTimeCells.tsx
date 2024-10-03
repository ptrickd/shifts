"use client";
//Components
import TimeCell from "./TimeCell";
import { createDate } from "../utils/date";

//Types
interface IProps {
  employee: IEmployee;
  shifts: IShift[];
  weekStart: string;
}
const formatDayDate = (date: Date) => {
  if (String(date.getDate()).length === 1) return `0${date.getDate()}`;
  else return String(date.getDate());
};
const formatMonth = (date: Date) => {
  if (String(date.getMonth()).length === 1) return `0${date.getMonth() + 1}`;
  else return String(date.getMonth() + 1);
};
function findTodayShift(
  shifts: IShift[],
  weekStart: string,
  index: number
): IShift | null {
  const weekStartDate = createDate(weekStart);
  weekStartDate.setDate(weekStartDate.getDate() + index);

  let todayShift: IShift | null = null;

  shifts.map((shift) => {
    if (shift.date === weekStartDate.toISOString().split("T")[0]) {
      todayShift = shift;
    }
  });

  return todayShift;
}

const DisplayTimeCells = ({ employee, shifts, weekStart }: IProps) => {
  //sort by date
  const rowOfTimeCells = [];

  for (let numOfCell = 0; numOfCell < 7; numOfCell++) {
    const todayDate = createDate(weekStart); //create from date argument in string

    //Adjust the date by adding the position of the cell in the week starting by 0.
    todayDate.setDate(todayDate.getDate() + numOfCell);

    const todayShift = findTodayShift(shifts, weekStart, numOfCell);
    if (todayShift !== null) {
      rowOfTimeCells.push(
        <TimeCell
          shift={todayShift}
          name={employee.displayName}
          key={numOfCell}
        />
      );
    } else {
      const currentDate = todayDate.toISOString().split("T")[0]; //Parse the in format 2024-10-01

      const newShift = {
        id: 0,
        employeeId: employee.id,
        date: currentDate,
        startTime: "08:00",
        endTime: "12:00",
        weekStart,
      };
      rowOfTimeCells.push(
        <TimeCell
          shift={newShift}
          name={employee.displayName}
          key={numOfCell}
        />
      );
    }
  }
  return rowOfTimeCells;
};
export default DisplayTimeCells;
