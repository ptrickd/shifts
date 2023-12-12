import { useState, Dispatch, useContext } from "react";

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

//Functions
import { computeWeekStart } from "../utils/date";

// Context
import { ShiftsContext, DispatchContext } from "./Schedule";
import { ACTIONS } from "../context/Reducer";

//Types
interface IProps {
  id: number;
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

const formatToPOST = (data: IData) => {
  const weekStart = computeWeekStart(new Date(data.date));
  return {
    employee_id: data.employeeId,
    date: data.date,
    start_time: `${data.startTime}:00`,
    end_time: `${data.endTime}:00`,
    is_split_shift: false,
    week_start: weekStart,
  };
};

const postShift = async (data: IData) => {
  console.log(JSON.stringify(formatToPOST(data)));
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formatToPOST(data)),
  });
  console.log(response);
  console.log(response.ok);

  return await response.json();
};

const putShift = async (data: IData) => {
  const response = await fetch(`${url}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formatToPOST(data)),
  });
  console.log(response);
  //if response.error then do this
  return await response.json();
};

const generateMenuItems = (times: string[]) => {
  return times.map((time, index) => (
    <MenuItem key={index} value={time}>
      {time}
    </MenuItem>
  ));
};

const updateShifts: (
  id: number,
  employeeId: number,
  startTime: string,
  endTime: string,
  date: string,
  shifts: IShift[] | [],
  dispatch: Dispatch<IAction>
) => IShift[] = (
  id,
  employeeId,
  startTime,
  endTime,
  date,
  shifts,
  dispatch
) => {
  let foundShift: null | IShift = null;
  console.log(id);

  const newShifts = shifts.map((shift: IShift) => {
    if (shift.employeeId === employeeId && shift.date === date) {
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
    dispatch({
      type: ACTIONS.ADD_SHIFT,
      payload: {
        id: id,
        employeeId: employeeId,
        startTime: startTime,
        endTime: endTime,
        date: date,
      },
    });

    postShift({
      employeeId: employeeId,
      startTime: startTime,
      endTime: endTime,
      date: date,
    });
  } else if (foundShift) {
    dispatch({
      type: ACTIONS.UPDATE_SHIFT,
      payload: {
        id: id,
        employeeId: employeeId,
        startTime: startTime,
        endTime: endTime,
        date: date,
      },
    });
    putShift(foundShift);
  } else throw new Error("founshfit not found");

  // fetch;
  return newShifts;
};

const ModalTimeCell = ({
  id,
  name,
  employeeId,
  open,
  onClose,
  startTime,
  endTime,
  date,
}: IProps) => {
  //useState
  const [currentStartTime, setCurrentStartTime] = useState(startTime);
  const [currentEndTime, setCurrentEndTime] = useState(endTime);
  const [error, setError] = useState("");
  //Context
  const shifts = useContext(ShiftsContext);
  const dispatch = useContext(DispatchContext);

  //useEffect
  // useEffect(() => {
  //   setCurrentStartTime(startTime);
  //   setCurrentEndTime(endTime);
  // }, [startTime, endTime]);

  const handleStartChange = (event: SelectChangeEvent) => {
    setCurrentStartTime(event.target.value as string);
  };

  const handleEndChange = (event: SelectChangeEvent) => {
    setCurrentEndTime(event.target.value as string);
  };

  const handleSubmit = () => {
    //need to add e.preventDefault()
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
      if (shifts && dispatch) {
        const updatedShifts = updateShifts(
          id,
          employeeId,
          currentStartTime,
          currentEndTime,
          date,
          shifts,
          dispatch
        );
        console.log(updatedShifts);
      } else {
        setError("Internal Error");
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
        Delete
      </Button>
    </Dialog>
  );
};

export default ModalTimeCell;
