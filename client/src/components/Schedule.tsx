//React
import { useEffect, useState } from "react";

//Material UI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

//Components
import DisplayTopRow from "./DisplayTopRow";
import DisplayEmployeeCells from "./DisplayEmployeeCells";

//Functions
import { computeWeekStart } from "../utils/date";

//Types
// interface IResponse {
//   ok: boolean;
//   error: boolean;
// }

interface IShift {
  date: string;
  startTime: string;
  endTime: string;
}
/*
| Employee Cell | Monday | Tuesday | Wednesday | Thursday |  Friday | Sat | Sund

*/

const Schedule = () => {
  //Constants
  const TOP_ROW = ["Names", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const TODAY = new Date(Date.now());
  const WEEK_START = computeWeekStart(TODAY);

  //useState
  const [employees, setEmployees] = useState<IEmployee[] | null>(null);
  //&&&&&&&& next step: shifts from server
  const [, setShifts] = useState<IShift | null>(null);

  //useEffect
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
  if (employees)
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

            <DisplayEmployeeCells employees={employees} />
          </Grid>
        </Box>
      </Container>
    );
};

export default Schedule;
