import { useState } from "react";

//Material UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//Components
import ModalTimeCell from "./ModalTimeCell";

//Types
interface IProps {
  id: number;
  name: string;
  employeeId: number;
  startTime: string | null;
  endTime: string | null;
  date: string;
}

const TimeCell = ({
  id,
  name,
  employeeId,
  startTime,
  endTime,
  date,
}: IProps) => {
  let textDisplay = <></>;

  //useState
  const [openModal, setOpenModal] = useState(false);

  //if conditions are nulls then the employee is off that day
  if (startTime === null || endTime === null) {
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
        {textDisplay}
      </Box>
      <ModalTimeCell
        id={id}
        name={name}
        employeeId={employeeId}
        open={openModal}
        startTime={startTime || "08:00"}
        endTime={endTime || "12:00"}
        date={date}
        onClose={() => setOpenModal(false)}
      />
    </Grid>
  );
};

export default TimeCell;
