//Material UI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//Types
interface Props {
  startTime: string;
  endTime: string;
}
//
const TimeCell = ({ startTime, endTime }: Props) => {
  return (
    <Container>
      <Box
        component="div"
        sx={{
          border: "1px solid white",
        }}
      >
        <Typography variant="body1" color="text.primary" align="center">
          Start Time: {startTime}
        </Typography>
        <Typography variant="body1" color="text.primary" align="center">
          End Time: {endTime}
        </Typography>
      </Box>
    </Container>
  );
};

export default TimeCell;
