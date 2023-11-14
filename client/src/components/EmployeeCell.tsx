//Material UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Types

interface Props {
  displayName: string;
}

const EmployeeCell = ({ displayName }: Props) => {
  // first_name last_name position is_active display_name
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
        // noWrap
        // sx={{ paddingBottom: 1 }}
      >
        {displayName}
      </Typography>
    </Grid>
  );
};

export default EmployeeCell;
