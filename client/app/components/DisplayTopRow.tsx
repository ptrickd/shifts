"use client";
//Material UI
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface IProps {
  weekDays: string[];
  weekStart: Date;
}

const getListOfDates = (weekStart: Date) => {
  const date = weekStart.getDate();
  const month = weekStart.getMonth();
  const year = weekStart.getFullYear();

  const numberOfDaysInThisMonth = new Date(
    Number(year),
    Number(month) + 1,
    0
  ).getDate();

  const listOfDates = [];
  let newMonthDays = 1;
  for (let i = 0; i < 7; i++) {
    if (numberOfDaysInThisMonth <= i + date - 1) {
      listOfDates.push(newMonthDays);
      newMonthDays += 1;
    } else {
      listOfDates.push(date + i);
    }
  }

  return listOfDates;
};

const DisplayTopRow = ({ weekDays, weekStart }: IProps) => {
  /*
  we need :
   -the numer of day this month
   -the date of the week start 
   */
  const listOfDates = getListOfDates(weekStart);

  return weekDays.map((value, index) => (
    <Grid item xs={1.333} key={value + index} zeroMinWidth>
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        sx={{ margin: 0, padding: 0 }}
      >
        {value}
      </Typography>

      {/* Do  not display dates under Names column */}
      {!index ? null : (
        <Typography
          variant="h6"
          gutterBottom
          align="center"
          sx={{ margin: 0, padding: 0 }}
        >
          {listOfDates[index - 1]}
        </Typography>
      )}
    </Grid>
  ));
};
export default DisplayTopRow;
