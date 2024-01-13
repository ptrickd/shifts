import { useState } from "react";

//Material UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//Components
import ModalTimeCell from "./ModalTimeCell";

//Types
interface IProps {
  shift: IShift;
  name: string;
}

const TimeCell = ({ shift, name }: IProps) => {
  const { startTime, endTime } = shift;
  let textDisplay = <></>;

  //useState
  const [openModal, setOpenModal] = useState(false);

  //if conditions are nulls then the employee is off that day
  if (shift.id === 0) {
    textDisplay = (
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
    textDisplay = (
      <span>
        <Typography
          variant="body1"
          color="text.primary"
          align="center"
          noWrap
          sx={{ margin: 0, padding: 0 }}
          data-testid="start-time"
        >
          Start : {startTime}
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          align="center"
          noWrap
          sx={{ paddingBottom: 1 }}
          data-testid="end-time"
        >
          End : {endTime}
        </Typography>
      </span>
    );
  }
  return (
    <Grid
      item
      xs={1.333}
      zeroMinWidth
      sx={{
        margin: 0,
        padding: 0,
        flexGrow: 1,
        border: "1px solid gray",
        cursor: "default",
      }}
    >
      <Box component="span" onClick={() => setOpenModal(true)}>
        {textDisplay}
      </Box>
      <ModalTimeCell
        shift={shift}
        name={name}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Grid>
  );
};

export default TimeCell;
