//React
import { useState, useEffect } from "react";

//Material UI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Components
import EmployeeCell from "./EmployeeCell";
import TimeCell from "./TimeCell";

/*
| Employee Cell | Monday | Tuesday | Wednesday | Thursday |  Friday | Sat | Sund

*/

const fakeEmployee = {
  displayName: "Athena",
  startTime: "11:00:00",
  endTime: "19:30:00",
};

const Schedule = () => {
  //Constants
  const TOP_ROW = ["Names", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const TODAY = new Date(Date.now());

  //useEffect
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/employees.json"
      );

      const data = await response.json();
      console.log(response.ok);
      console.log(data);
    };
    fetchEmployees();
  }, []);
  const displayTopRow = (array: string[]) => {
    return array.map((value) => (
      <Grid item xs={1.5}>
        <Typography variant="h6" gutterBottom>
          {value}
        </Typography>
      </Grid>
    ));
  };
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {displayTopRow(TOP_ROW)}
        </Grid>
      </Box>
      <Box
        component="div"
        sx={{
          border: "1px solid white",
        }}
      >
        <EmployeeCell displayName={fakeEmployee.displayName} />
        <TimeCell
          startTime={fakeEmployee.startTime}
          endTime={fakeEmployee.endTime}
        />
      </Box>
    </Container>
  );
};

export default Schedule;
