//Material UI
import Grid from "@mui/material/Grid";

//Conponents
import DisplayTimeCells from "./DisplayTimeCells";
import EmployeeCell from "./EmployeeCell";

interface IProps {
  employees: IEmployee[];
}
const DisplayEmployeeCells = ({ employees }: IProps) => {
  if (employees != null)
    return employees.map((employee, index) => (
      <Grid
        container
        item
        spacing={1}
        sx={{ flexGrow: 1, marginLeft: 0, padding: 0 }}
      >
        {/* <Grid item xs={1.5} key={index}> */}
        <EmployeeCell displayName={employee.displayName} key={index} />
        {/* </Grid> */}
        <DisplayTimeCells />
      </Grid>
    ));
};

export default DisplayEmployeeCells;
