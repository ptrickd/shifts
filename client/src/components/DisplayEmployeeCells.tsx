import { useContext } from "react";

//Material UI
import Grid from "@mui/material/Grid";

//Conponents
import DisplayTimeCells from "./DisplayTimeCells";
import EmployeeCell from "./EmployeeCell";

//Context
import { ShiftsContext } from "./Schedule";

interface IProps {
  employees: IEmployee[];
  weekStart: string;
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

const DisplayEmployeeCells = ({ employees, weekStart }: IProps) => {
  const shifts = useContext(ShiftsContext);

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
        />
      </Grid>
    ));
  }
};

export default DisplayEmployeeCells;
