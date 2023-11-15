//Components
import TimeCell from "./TimeCell";

const DisplayTimeCells = () => {
  const rowOfTimeCells = [];
  for (let numOfCell = 0; numOfCell < 7; numOfCell++) {
    rowOfTimeCells.push(
      <TimeCell startTime={null} endTime="13:00" key={numOfCell} />
    );
  }
  return rowOfTimeCells;
};
export default DisplayTimeCells;
