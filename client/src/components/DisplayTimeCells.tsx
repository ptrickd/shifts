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
  shifts.map((shift) => {
    if (
      shift.date ===
      `${todayDate.getFullYear()}-${
        todayDate.getMonth() + 1
      }-${todayDate.getDate()}`
    ) {
      todayShift = shift;
    }
  });
  console.log(todayShift);
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
