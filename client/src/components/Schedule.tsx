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
interface IEmployee {
  displayName: string;
}
/*
| Employee Cell | Monday | Tuesday | Wednesday | Thursday |  Friday | Sat | Sund

*/
//function computing the fist day of the week sunday
const computeWeekStart = (today: Date) => {
  const dayWeekInNumber = today.getDay();
  const dateInNumber = today.getDate();
  // console.log(today.getDate());
  if (dayWeekInNumber === 0) {
    return today;
  } else {
    // console.log(dayWeekInNumber);
    //must return date of the previous sunday
    //if previous sunday this month
    if (today.getDate() > 6) {
      today.setDate(dateInNumber - dayWeekInNumber);
    }
    //if previous sunday last month
    console.log(today.getDate());
    return today;
  }
};
const Schedule = () => {
  //Constants
  const TOP_ROW = ["Names", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const TODAY = new Date(Date.now());
  const WEEK_START = computeWeekStart(TODAY);
  //useState
  const [employees, setEmployees] = useState<IEmployee[] | null>(null);

  //useEffect
  // useEffect(() => {
  //   if (employees !== null) console.log(employees[1]);
  // }, [employees]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/employees.json"
      );

      const data = await response.json();
      // console.log(response.ok);
      console.log(data);
      const formatedEmployeesObject = data.map((employee: any) => {
        return { displayName: employee.display_name };
      });
      setEmployees(formatedEmployeesObject);
    };
    fetchEmployees();
  }, []);
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
      <Box component="div">{WEEK_START.toDateString()}</Box>
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
