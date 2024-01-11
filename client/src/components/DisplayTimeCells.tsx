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
    if (
      shift.date ===
      `${weekStartDate.getFullYear()}-${formatMonth(
        weekStartDate
      )}-${formatDayDate(weekStartDate)}`
    ) {
      todayShift = shift;
    }
  });

  return todayShift;
}

const DisplayTimeCells = ({ employee, shifts, weekStart }: IProps) => {
  //sort by date
  const rowOfTimeCells = [];

  for (let numOfCell = 0; numOfCell < 7; numOfCell++) {
    const todayDate = createDate(weekStart);
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
      const currentDate = `${todayDate.getFullYear()}-${formatMonth(
        todayDate
      )}-${formatDayDate(todayDate)}`;

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
