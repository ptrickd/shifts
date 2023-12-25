//Components
import TimeCell from "./TimeCell";

//Types
interface IProps {
  employee: IEmployee;
  shifts: IShift[];
  weekStart: string;
}

function findTodayShift(
  shifts: IShift[],
  weekStart: string,
  index: number
): IShift | null {
  const todayDate = new Date(weekStart);
  todayDate.setDate(todayDate.getDate() + index + 1);
  let todayShift: IShift | null = null;
  const formatDayDate = (date: Date) => {
    if (String(date.getDate()).length === 1) return `0${date.getDate()}`;
    else return String(date.getDate());
  };
  shifts.map((shift) => {
    if (
      shift.date ===
      `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${formatDayDate(
        todayDate
      )}`
    ) {
      todayShift = shift;
    }
  });
  return todayShift;
}
const DisplayTimeCells = ({ employee, shifts, weekStart }: IProps) => {
  // console.log(shifts);

  //sort by date
  const rowOfTimeCells = [];
  for (let numOfCell = 0; numOfCell < 7; numOfCell++) {
    const todayDate = new Date(weekStart);
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
      const currentDate = `${todayDate.getFullYear()}-${
        todayDate.getMonth() + 1
      }-${todayDate.getDate()}`;
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
