"use client";
//Material UI
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

interface IProps {
  total: number;
}
const TotalHoursByEmployee = ({ total }: IProps) => {
  return (
    <Grid
      size={{ xs: 1.333 }}
      sx={{
        margin: 0,
        padding: 1,
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
        {total}
      </Typography>
    </Grid>
  );
};

export default TotalHoursByEmployee;
