import { Dispatch } from "react";
//Material UI
import Grid from "@mui/material/Grid";

//Conponents
import DisplayTimeCells from "./DisplayTimeCells";
import EmployeeCell from "./EmployeeCell";

interface IProps {
  employees: IEmployee[];
  shifts: IShift[];
  weekStart: string;
  shiftDispatch: Dispatch<IAction>;
}

function sortedShiftsByEmployee(employeeId: number, shifts: IShift[]) {
  // console.log(shifts);
  // console.log(employeeId);
  const employeeShifts = shifts.filter(
    (shift) => shift.employeeId === employeeId
  );
  // console.log(employeeShifts);
  return employeeShifts;
}

const DisplayEmployeeCells = ({
  employees,
  shifts,
  weekStart,
  shiftDispatch,
}: IProps) => {
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
          employee={employee}
          shifts={sortedShiftsByEmployee(employee.id, shifts)}
          weekStart={weekStart}
          shiftDispatch={shiftDispatch}
        />
      </Grid>
    ));
  }
};

export default DisplayEmployeeCells;
