"use client";
//Material UI
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

//Types

interface Props {
  displayName: string;
}

const EmployeeCell = ({ displayName }: Props) => {
  // first_name last_name position is_active display_name
  return (
    <Grid
      size={{ xs: 1.333 }}
      sx={{
        margin: 0,
        padding: 1,
        border: "1px solid gray",
      }}
    >
      <Typography
        variant="body1"
        color="text.primary"
        align="center"
        sx={{ margin: 0, padding: 0 }}
      >
        {displayName}
      </Typography>
    </Grid>
  );
};

export default EmployeeCell;
