import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const fakeEmployee = {
  displayName: "Athena",
  startTime: "11:00:00",
  endTime: "19:30:00",
};

const EmployeeCell = () => {
  // first_name last_name position is_active display_name
  return (
    <Container>
      <Box
        component="div"
        sx={{
          border: "1px solid white",
        }}
      >
        <Typography variant="body1" color="text.primary" align="center">
          Display Name: {fakeEmployee.displayName}
        </Typography>

        <Typography variant="body1" color="text.primary" align="center">
          Start Time: {fakeEmployee.startTime}
        </Typography>
        <Typography variant="body1" color="text.primary" align="center">
          End Time: {fakeEmployee.endTime}
        </Typography>
      </Box>
    </Container>
  );
};

export default EmployeeCell;
