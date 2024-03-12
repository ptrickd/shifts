//React
// import React from "react";

//MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

//Types
interface IProps {
  open: boolean;
  handleOnClose: () => void;
}

const AddEmployeeModal = ({ open, handleOnClose }: IProps) => {
  return (
    <Dialog open={open} onClose={() => handleOnClose()}>
      <DialogTitle>Add a employee</DialogTitle>
      <DialogContent>
        <DialogContentText>The field with * are mandatory.</DialogContentText>

        <TextField
          autoFocus
          required
          margin="dense"
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          variant="standard"
          sx={{ m: (theme) => theme.spacing(1) }}
        />

        <TextField
          autoFocus
          required
          margin="dense"
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          variant="standard"
          sx={{ m: (theme) => theme.spacing(1) }}
        />

        <TextField
          autoFocus
          required
          margin="dense"
          id="position"
          name="position"
          label="Position"
          type="text"
          variant="standard"
          sx={{ m: (theme) => theme.spacing(1) }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleOnClose()}>Cancel</Button>
        <Button>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeModal;
