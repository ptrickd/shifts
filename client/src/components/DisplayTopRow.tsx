//Material UI
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface IProps {
  weekDays: string[];
  today: Date;
}

const DisplayTopRow = ({ weekDays, today }: IProps) => {
  return weekDays.map((value, index) => (
    <Grid item xs={1.5} key={value + index} zeroMinWidth>
      {today.getDay() + 1 === index ? (
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
      {!index ? null : (
        <Typography
          variant="h6"
          gutterBottom
          align="center"
          sx={{ margin: 0, padding: 0 }}
        >
          {today.getDate() + index - 1}
        </Typography>
      )}
    </Grid>
  ));
};
export default DisplayTopRow;
