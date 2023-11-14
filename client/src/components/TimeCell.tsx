//Material UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Types
interface Props {
  startTime: string | null;
  endTime: string | null;
}

const TimeCell = ({ startTime, endTime }: Props) => {
  let text = <></>;
  //if no condition are nulls then the employee is off that day
  if (startTime === null || endTime === null) {
    text = (
      <Typography
        variant="body1"
        color="text.primary"
        align="center"
        noWrap
        sx={{ margin: 0, padding: 0 }}
      >
        OFF
      </Typography>
    );
  } else {
    text = (
      <>
        <Typography
          variant="body1"
          color="text.primary"
          align="center"
          noWrap
          sx={{ margin: 0, padding: 0 }}
        >
          Start : {startTime}
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          align="center"
          noWrap
          sx={{ paddingBottom: 1 }}
        >
          End : {endTime}
        </Typography>
      </>
    );
  }
  return (
    <Grid
      item
      xs={1.5}
      zeroMinWidth
      sx={{
        margin: 0,
        padding: 0,
        flexGrow: 1,
        border: "1px solid gray",
      }}
    >
      {text}
    </Grid>
  );
};

export default TimeCell;
