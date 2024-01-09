//Material UI
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface IProps {
  weekDays: string[];
  today: Date;
  weekStart: Date;
}

const getListOfDates = (weekStart: Date) => {
  const dateInNumber = weekStart.getDate();
  const month = weekStart.getMonth();
  const year = weekStart.getFullYear();
  const numberOfDaysInThisMonth = new Date(
    Number(year),
    Number(month),
    0
  ).getDate();
  // console.log(`dateInNumber: ${dateInNumber}`);
  // console.log(`month: ${month}`);
  // console.log(`year: ${year}`);
  // console.log(`numberOfDaysInThisMonth: ${numberOfDaysInThisMonth}`);

  const listOfDates = [];

  for (let i = 1; i < 8; i++) {
    // if 31 < ( 1 + 27)
    if (numberOfDaysInThisMonth < i + dateInNumber - 1) {
      listOfDates.push(numberOfDaysInThisMonth - dateInNumber + i - 1);
    } else {
      listOfDates.push(dateInNumber + i);
    }
  }

  return listOfDates;
};

const DisplayTopRow = ({ weekDays, today, weekStart }: IProps) => {
  // console.log(today);
  /*
  we need :
   -the numer of day this month
   -the date of the week start 
   */
  const listOfDates = getListOfDates(weekStart);
  // console.log(listOfDates);
  return weekDays.map((value, index) => (
    <Grid item xs={1.5} key={value + index} zeroMinWidth>
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
