//Material UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface IComputedValues {
  total: number;
}

interface IProps {
  computedValues: IComputedValues[];
}

const TotalHoursByDay = ({ computedValues }: IProps) => {
  const totalGrids = computedValues.map((value, index) => (
    <Grid
      item
      xs={1.5}
      key={index}
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
        sx={{ paddingBottom: 1 }}
      >
        {value.total}
      </Typography>
    </Grid>
  ));
  return (
    <>
      <Grid
        item
        xs={1.5}
        zeroMinWidth
        sx={{
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
          Total
        </Typography>
      </Grid>
      {totalGrids}
    </>
  );
};

export default TotalHoursByDay;
