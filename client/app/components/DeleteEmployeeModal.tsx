"use client";
//React
import { useState } from "react";

//React Hook Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

//Function
import { postEmployee } from "../utils/employeesAPI";

//Types
interface IProps {
  open: boolean;
  handleOnClose: () => void;
}
interface IEmployee {
  id: string;
  displayName: string;
}

const AddEmployeeModal = ({ open, handleOnClose }: IProps) => {
  //useState
  const [submitting, setSubmitting] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);

  const reset = () => {};

  const handleSubmit = () => {
    // setSubmitting(true);
    if (name.length > 2) {
      // const response = await postEmployee(name);
      // setSubmitting(false);
      // if (response.error) {
      //   console.log(response.error);
      //   // setErrorResponse(response.error);
      // } else if (typeof response.display_name === "object") {
      //   setErrorResponse(response.display_name[0]);
      // } else {
      //   handleOnClose();
      //   reset();
      // }
    } else {
      console.log("raise error");
    }
  };
  const listOfNames = () => {
    const formattedList = ["Henry", "Barb"].map((value) => (
      <MenuItem key={value} value={value}>
        {value}
      </MenuItem>
    ));
    // console.log(formattedList);
    return formattedList;
  };
  if (submitting) return <CircularProgress />;

  return (
    <Dialog open={open} onClose={() => handleOnClose()}>
      <DialogTitle>Delete an employee</DialogTitle>
      <DialogContent>
        <DialogContentText>The field with * are mandatory.</DialogContentText>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Employee Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={name}
            label="Employee"
            onChange={(e) => setName(e.target.value)}
          >
            {listOfNames()}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleOnClose()}>Cancel</Button>
        <Button onClick={(e) => handleSubmit()}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeModal;
