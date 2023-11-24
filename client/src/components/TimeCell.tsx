import { useState } from "react";

//Material UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//Components
import ModalTimeCell from "./ModalTimeCell";

//Types
interface Props {
  name: string;
  startTime: string | null;
  endTime: string | null;
}

const TimeCell = ({ name, startTime, endTime }: Props) => {
  let text = <></>;

  //useState
  const [openModal, setOpenModal] = useState(false);

  //if conditions are nulls then the employee is off that day
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
      <Box component="span" onClick={() => setOpenModal(true)}>
        {text}
      </Box>
      <ModalTimeCell
        name={name}
        open={openModal}
        startTime={startTime || ""}
        endTime={endTime || "???"}
        onClose={() => setOpenModal(false)}
      />
    </Grid>
  );
};

export default TimeCell;
