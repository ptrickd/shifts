//Material UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Types
interface Props {
  startTime: string;
  endTime: string;
}
//
const TimeCell = ({ startTime, endTime }: Props) => {
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
    </Grid>
  );
};

export default TimeCell;
