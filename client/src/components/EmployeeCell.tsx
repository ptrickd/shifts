//Material UI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//Types

interface Props {
  displayName: string;
}

const EmployeeCell = ({ displayName }: Props) => {
  // first_name last_name position is_active display_name
  return (
    // <Container>
    <Box
      component="div"
      // sx={{
      //   border: "1px solid white",
      // }}
    >
      <Typography variant="body1" color="text.primary" align="center">
        {displayName}
      </Typography>
    </Box>
    // </Container>
  );
};

export default EmployeeCell;
