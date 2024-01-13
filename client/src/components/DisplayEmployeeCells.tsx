import { useContext } from "react";

//Material UI
import Grid from "@mui/material/Grid";

//Conponents
import DisplayTimeCells from "./DisplayTimeCells";
import EmployeeCell from "./EmployeeCell";
import TotalHoursByEmployee from "./TotalHoursByEmployee";

//Context
import { ShiftsContext } from "./Schedule";

interface IProps {
  employees: IEmployee[];
  weekStart: string;
}

function sortedShiftsByEmployee(employeeId: number, shifts: IShift[]) {
  const employeeShifts = shifts.filter(
    (shift) => shift.employeeId === employeeId
  );

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
        key={index}
      >
        <EmployeeCell displayName={employee.displayName} key={index} />

        <DisplayTimeCells
          employee={employee}
          shifts={sortedShiftsByEmployee(employee.id, shifts)}
          weekStart={weekStart}
        />
        <TotalHoursByEmployee total={5} />
      </Grid>
    ));
  }
};

export default DisplayEmployeeCells;
