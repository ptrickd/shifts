import { useState } from "react";

//Material UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//Constants
import { TIMES } from "../utils/constants";
//Types
interface IProps {
  name: string;
  open: boolean;
  onClose: () => void;
  handleChangeShift: (startTime: string, endTime: string) => void;
}

const generateMenuItems = (times: string[]) => {
  return times.map((time) => <MenuItem value={time}>{time}</MenuItem>);
};
const ModalTimeCell = ({ name, open, onClose, handleChangeShift }: IProps) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  const handleStartChange = (event: SelectChangeEvent) => {
    setStartTime(event.target.value as string);
  };

  const handleEndChange = (event: SelectChangeEvent) => {
    setEndTime(event.target.value as string);
  };

  const handleSubmit = () => {
    const indexStart = startTime.indexOf(":");
    const indexEnd = endTime.indexOf(":");

    const hourStart = startTime.substring(indexStart, -2);
    const minuteStart = startTime.substring(indexStart + 1);
    const hourEnd = endTime.substring(indexEnd, -2);
    const minuteEnd = endTime.substring(indexEnd + 1);

    if (!startTime.length || !endTime.length) {
      setError(`Can't leave field empty.`);
    } else if (Number(hourStart) > Number(hourEnd)) {
      setError("Starting time cannot be higher than end time.");
    } else if (
      Number(hourStart) === Number(hourEnd) &&
      Number(minuteStart) > Number(minuteEnd)
    ) {
      setError("Starting time cannot be higher than end time.");
    } else {
      setError("");
      handleChangeShift(startTime, endTime);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      sx={{ minWidth: "400px", minHeight: "400px" }}
    >
      <DialogTitle>{name}</DialogTitle>
      <FormControl>
        <InputLabel id="start-time-label">Start:</InputLabel>
        <Select
          sx={{ margin: 1 }}
          labelId="start-time-label"
          id="start-time-select"
          value={startTime}
          onChange={handleStartChange}
        >
          {generateMenuItems(TIMES)}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="end-time-label">End:</InputLabel>
        <Select
          sx={{ margin: 1 }}
          labelId="end-time-label"
          id="end-time-select"
          value={endTime}
          onChange={handleEndChange}
        >
          {generateMenuItems(TIMES)}
        </Select>
      </FormControl>
      <Typography color="red">{error}</Typography>
      <Button sx={{ margin: 1 }} variant="outlined" onClick={handleSubmit}>
        OK
      </Button>
    </Dialog>
  );
};

export default ModalTimeCell;
