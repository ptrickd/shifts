//React
import { useEffect, useState } from "react";

//Material UI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

//Components
import EmployeeCell from "./EmployeeCell";
import TimeCell from "./TimeCell";
import DisplayTopRow from "./DisplayTopRow";

//Types
// interface IResponse {
//   ok: boolean;
//   error: boolean;
// }

interface IEmployee {
  displayName: string;
}
interface IShift {
  date: string;
  startTime: string;
  endTime: string;
}
/*
| Employee Cell | Monday | Tuesday | Wednesday | Thursday |  Friday | Sat | Sund

*/
//function computing the fist day of the week sunday
const computeWeekStart = (today: Date) => {
  const dayWeekInNumber = today.getDay();
  const dateInNumber = today.getDate();

  if (dayWeekInNumber === 0) {
    //convert to format '2023-11-12'
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  } else {
    //must return date of the previous sunday
    //if previous sunday this month
    if (today.getDate() > 6) {
      today.setDate(dateInNumber - dayWeekInNumber);
    }
    //if previous sunday last month

    //convert to format '2023-11-12'

    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  }
};
const Schedule = () => {
  //Constants
  const TOP_ROW = ["Names", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const TODAY = new Date(Date.now());
  const WEEK_START = computeWeekStart(TODAY);
  //useState
  const [employees, setEmployees] = useState<IEmployee[] | null>(null);
  const [, setShifts] = useState<IShift | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/employees.json"
      );

      const data = await response.json();
      // console.log(response.ok);
      console.log(data);
      const formatedEmployeesObject = data.map(
        (employee: IResponseEmployee) => {
          return { displayName: employee.display_name };
        }
      );
      setEmployees(formatedEmployeesObject);
    };

    fetchEmployees();
  }, []);
  useEffect(() => {
    const fetchShifts = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/shifts/?week_start=${WEEK_START}`
      );
      const data = await response.json();
      console.log(data);
      const formatedShiftsObject = data.map((shift: IResponseShift) => {
        return {
          date: shift.date,
          startTime: shift.start_time,
          endTime: shift.end_time,
        };
      });
      setShifts(formatedShiftsObject);
    };
    fetchShifts();
  }, [WEEK_START]);
  //////////////////////////////////////
  //https://mui.com/material-ui/react-grid#nested-grid
  //

  //////////////////////////////////////

  const displayTimeCells = () => {
    const rowOfTimeCells = [];
    for (let numOfCell = 0; numOfCell < 7; numOfCell++) {
      rowOfTimeCells.push(
        <TimeCell startTime={null} endTime="13:00" key={numOfCell} />
      );
    }
    return rowOfTimeCells;
  };
  //////////////////////////////////////
  const displayEmployeeCells = () => {
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
          {displayTimeCells()}
        </Grid>
      ));
  };
  //////////////////////////////////////

  return (
    <Container>
      <Box component="div">{WEEK_START}</Box>
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          border: "1px solid gray",
        }}
      >
        <Grid container spacing={1}>
          <Grid container item spacing={1}>
            <DisplayTopRow weekDays={TOP_ROW} today={TODAY} />
          </Grid>

          {displayEmployeeCells()}
        </Grid>
      </Box>
    </Container>
  );
};

export default Schedule;
