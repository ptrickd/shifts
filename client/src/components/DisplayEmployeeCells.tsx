//Material UI
import Grid from "@mui/material/Grid";

//Conponents
import DisplayTimeCells from "./DisplayTimeCells";
import EmployeeCell from "./EmployeeCell";

interface IProps {
  employees: IEmployee[];
  shifts: IShift[];
  weekStart: string;
}

/********************  example **************
type LanguageOptions = keyof typeof Language;  // as from basarat's answer

type AnotherObject = {[key in LanguageOptions]: number}; // is actually a type, 
still is named as 'object' so that it is still compatible with the question's code
    
export class ParentObject {
  thatObjectAbove: AnotherObject;
  otherObjects: ..
  ..
}
*/

// type TEmployeeId = { [key in TEmployeesId]: number };

// interface ISortedShiftsByEmployee {
//   shifts: IShift[];
// }
// interface ISortedByEmployeeId {
//   employeeId: TEmployeeId;
//   shifts: ISortedShiftsByEmployee;
// }

function sortedShiftsByEmployee(employeeId: number, shifts: IShift[]) {
  // console.log(shifts);
  // console.log(employeeId);
  const employeeShifts = shifts.filter(
    (shift) => shift.employeeId === employeeId
  );
  // console.log(employeeShifts);
  return employeeShifts;
  /*
    sort shift by employee id
    sort shifts by date
  */
  /* looping the employees
    for each employee get the id
    looping the shifts
    new array: for each shift get shift with corresponding employee_id
    new array: for each shift with employee_id get the date
    when found a date popit
    */
}
const DisplayEmployeeCells = ({ employees, shifts, weekStart }: IProps) => {
  if (employees != null) {
    return employees.map((employee, index) => (
      <Grid
        container
        item
        spacing={1}
        sx={{ flexGrow: 1, marginLeft: 0, padding: 0 }}
      >
        <EmployeeCell displayName={employee.displayName} key={index} />

        <DisplayTimeCells
          name={employee.displayName}
          shifts={sortedShiftsByEmployee(employee.id, shifts)}
          weekStart={weekStart}
        />
      </Grid>
    ));
  }
};

export default DisplayEmployeeCells;
