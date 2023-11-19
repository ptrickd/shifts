//Components
import TimeCell from "./TimeCell";

//Types
interface IProps {
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
const DisplayTimeCells = ({ shifts, weekStart }: IProps) => {
  // console.log(shifts);

  //sort by date
  const rowOfTimeCells = [];
  for (let numOfCell = 0; numOfCell < 7; numOfCell++) {
    // console.log(shifts[numOfCell]);
    const todayShift = findTodayShift(shifts, weekStart, numOfCell);
    if (todayShift !== null) {
      rowOfTimeCells.push(
        <TimeCell
          startTime={todayShift.startTime.substring(11, 16)}
          endTime={todayShift.endTime.substring(11, 16)}
          key={numOfCell}
        />
      );
    } else {
      rowOfTimeCells.push(
        <TimeCell startTime={null} endTime={null} key={numOfCell} />
      );
    }
  }
  return rowOfTimeCells;
};
export default DisplayTimeCells;
