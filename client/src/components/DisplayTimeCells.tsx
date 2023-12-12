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
  todayDate.setDate(todayDate.getDate() + index);
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
          id={todayShift.id}
          name={employee.displayName}
          employeeId={employee.id}
          date={todayShift.date}
          startTime={todayShift.startTime}
          endTime={todayShift.endTime}
          key={numOfCell}
        />
      );
    } else {
      rowOfTimeCells.push(
        <TimeCell
          id={0}
          name={employee.displayName}
          employeeId={employee.id}
          date={`${todayDate.getFullYear()}-${
            todayDate.getMonth() + 1
          }-${todayDate.getDate()}`}
          startTime={null}
          endTime={null}
          key={numOfCell}
        />
      );
    }
  }
  return rowOfTimeCells;
};
export default DisplayTimeCells;
