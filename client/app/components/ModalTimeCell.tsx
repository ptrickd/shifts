"use client";
import { useState, useContext, FormEvent } from "react";

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

// Context
import {
  ShiftsContext,
  DispatchContext,
  ValuesByDayDispatchContext,
  ValuesByEmployeeDispatchContext,
} from "./Schedule";

import { SHIFTS_ACTIONS } from "../reducer/shiftsReducer";
import { VALUES_ACTIONS } from "../reducer/computedTotalHoursByDay";

//Function
import { updateShifts } from "../utils/shiftsOps";
import { deleteShift } from "../utils/shiftsAPI";
import { deleteShiftDispatcher } from "../utils/deleteShiftDispatcher";

//Types
interface IProps {
  shift: IShift;
  name: string;
  open: boolean;
  onClose: () => void;
}

const generateMenuItems = (times: string[]) => {
  return times.map((time, index) => (
    <MenuItem key={index} value={time}>
      {time}
    </MenuItem>
  ));
};

const ModalTimeCell = ({ shift, name, open, onClose }: IProps) => {
  const { id, employeeId, date, startTime, endTime, weekStart } = shift;
  //useState
  const [currentStartTime, setCurrentStartTime] = useState(startTime);
  const [currentEndTime, setCurrentEndTime] = useState(endTime);
  const [error, setError] = useState<string | unknown>("");

  //Context
  const shifts = useContext(ShiftsContext);
  const dispatch = useContext(DispatchContext);
  const valuesByDayDispatch = useContext(ValuesByDayDispatchContext);
  const valuesByEmployeeDispatch = useContext(ValuesByEmployeeDispatchContext);

  const handleStartChange = (event: SelectChangeEvent) => {
    setCurrentStartTime(event.target.value as string);
  };

  const handleEndChange = (event: SelectChangeEvent) => {
    setCurrentEndTime(event.target.value as string);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

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
      if (
        shifts &&
        dispatch &&
        valuesByDayDispatch &&
        valuesByEmployeeDispatch
      ) {
        const newShift = {
          id,
          employeeId,
          startTime: currentStartTime,
          endTime: currentEndTime,
          date,
          weekStart,
        };
        updateShifts(
          newShift,
          shifts,
          dispatch,
          valuesByDayDispatch,
          valuesByEmployeeDispatch
        );
        onClose();
      } else {
        setError("Internal Error");
      }
    }
  };
  const handleDelete = async () => {
    //api call for delete
    const response = await deleteShift(id);
    if (response.error) setError(response.error);
    else if (
      shift &&
      dispatch &&
      valuesByDayDispatch &&
      valuesByEmployeeDispatch
    ) {
      //delete shift in local array if success
      deleteShiftDispatcher(
        shift,
        dispatch,
        valuesByDayDispatch,
        valuesByEmployeeDispatch
      );
      //close modal if success
      onClose();
    } else setError("Dispatch Object Missing");
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
          data-testid="start-time-select"
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
      <Typography color="red">
        {typeof error === "string" ? error : null}
      </Typography>
      <Button sx={{ margin: 1 }} variant="outlined" onClick={handleSubmit}>
        OK
      </Button>
      {id !== 0 ? (
        <Button
          sx={{ margin: 1 }}
          variant="outlined"
          color="error"
          onClick={handleDelete}
          data-testid="button-delete-shift"
        >
          Delete
        </Button>
      ) : null}
    </Dialog>
  );
};

export default ModalTimeCell;
