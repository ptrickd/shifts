import { useState, useEffect, useContext } from "react";

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
// import { ShiftsReducer } from "../context/Reducer";

//Context
import { ShiftsContext } from "../context/Context";

//Types
interface IProps {
  name: string;
  employeeId: number;
  open: boolean;
  startTime: string;
  endTime: string;
  date: string;
  onClose: () => void;
}

interface IData {
  id?: number;
  employeeId: number;
  date: string;
  startTime: string;
  endTime: string;
}
const url = `http://localhost:3000/api/v1/shifts`;

const postShift = async (data: IData) => {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const putShift = async (data: IData) => {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const generateMenuItems = (times: string[]) => {
  return times.map((time) => <MenuItem value={time}>{time}</MenuItem>);
};

const updateShifts: (
  employeeId: number,
  startTime: string,
  endTime: string,
  date: string,
  shifts: IShift[]
) => void = (employeeId, startTime, endTime, date, shifts) => {
  let foundShift: null | IShift = null;
  if (!shifts) throw new Error("shifts undefined");

  const newShifts = shifts.map((shift) => {
    if (shift.employeeId === employeeId && shift.date === "change this later") {
      foundShift = {
        ...shift,
        startTime: startTime,
        endTime: endTime,
      };
      return foundShift;
    } else {
      return { ...shift };
    }
  });
  console.log(newShifts);

  if (!foundShift) {
    newShifts.push({
      employeeId: employeeId,
      startTime: startTime,
      endTime: endTime,
      date: date,
    });
    postShift({
      employeeId: employeeId,
      startTime: startTime,
      endTime: endTime,
      date: date,
    });
  } else {
    putShift(foundShift);
  }
  // fetch;
  return { shifts: newShifts };
};
const ModalTimeCell = ({
  name,
  employeeId,
  open,
  onClose,
  startTime,
  endTime,
  date,
}: IProps) => {
  const shifts = useContext(ShiftsContext);

  //useState
  const [currentStartTime, setCurrentStartTime] = useState("");
  const [currentEndTime, setCurrentEndTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
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
      if (shifts) {
        updateShifts(employeeId, startTime, endTime, date, shifts);
      }
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
      <Button
        sx={{ margin: 1 }}
        variant="outlined"
        color="error"
        onClick={onClose}
      >
        Cancel
      </Button>
    </Dialog>
  );
};

export default ModalTimeCell;
