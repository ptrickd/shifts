import { useState, useEffect } from "react";

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

//Reducer
// import { reducer } from "../context/Reducer";
//Types
interface IProps {
  name: string;
  open: boolean;
  startTime: string;
  endTime: string;
  onClose: () => void;
}

const generateMenuItems = (times: string[]) => {
  return times.map((time) => <MenuItem value={time}>{time}</MenuItem>);
};
const ModalTimeCell = ({ name, open, onClose, startTime, endTime }: IProps) => {
  //useReducer
  // const initialState = {
  //   date: "",
  //   employeeId: 0,
  //   startTime: "",
  //   endTime: "",
  //   shifts: [],
  // };
  // const [state, dispatch] = useReducer(reducer, initialState);

  //useState
  const [currentStartTime, setCurrentStartTime] = useState("");
  const [currentEndTime, setCurrentEndTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(startTime);
    console.log(endTime);
    setCurrentStartTime(startTime);
    setCurrentEndTime(endTime);
  }, [startTime, endTime]);

  const handleStartChange = (event: SelectChangeEvent) => {
    setCurrentStartTime(event.target.value as string);
  };

  const handleEndChange = (event: SelectChangeEvent) => {
    setCurrentEndTime(event.target.value as string);
  };

  const handleSubmit = () => {
    const indexStart = currentStartTime.indexOf(":");
    const indexEnd = currentEndTime.indexOf(":");

    const hourStart = currentStartTime.substring(indexStart, -2);
    const minuteStart = currentStartTime.substring(indexStart + 1);
    const hourEnd = currentEndTime.substring(indexEnd, -2);
    const minuteEnd = currentEndTime.substring(indexEnd + 1);

    if (!currentStartTime.length || !currentEndTime.length) {
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
          value={currentStartTime}
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
          value={currentEndTime}
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
