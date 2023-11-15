//React
import { useEffect, useState } from "react";

//Material UI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Components
import EmployeeCell from "./EmployeeCell";
import TimeCell from "./TimeCell";

//Types
// interface IResponse {
//   ok: boolean;
//   error: boolean;
// }
interface IResponseEmployee {
  isActive: boolean;
  position: string;
  first_name: string;
  last_name: string;
  display_name: string;
  created_at: string;
  updated_at: string;
}
interface IResponseShift {
  employee_id: number;
  date: string;
  start_time: string;
  end_time: string;
  is_split_shift: boolean;
  created_at: string;
  updated_at: string;
  week_start: string;
}
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
  const displayTopRow = (weekDays: string[]) => {
    return weekDays.map((value, index) => (
      <Grid item xs={1.5} key={value + index} zeroMinWidth>
        {TODAY.getDay() + 1 === index ? (
          <Typography
            sx={{ color: "red", margin: 0, padding: 0 }}
            variant="h6"
            gutterBottom
            align="center"
          >
            {value}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            gutterBottom
            align="center"
            sx={{ margin: 0, padding: 0 }}
          >
            {value}
          </Typography>
        )}
      </Grid>
    ));
  };
  //////////////////////////////////////

  const displayTimeCells = () => {
    const rowOfTimeCells = [];
    for (let numOfCell = 0; numOfCell < 7; numOfCell++) {
      rowOfTimeCells.push(
        // <Grid item xs={1.5} key={numOfCell} zeroMinWidth>
        <TimeCell startTime={null} endTime="13:00" key={numOfCell} />
        // </Grid>
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
            {displayTopRow(TOP_ROW)}
          </Grid>

          {displayEmployeeCells()}
        </Grid>
      </Box>
    </Container>
  );
};

export default Schedule;
