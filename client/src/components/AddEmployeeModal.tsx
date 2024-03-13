//React
import { useState, useEffect } from "react";

//React Hook Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

//Function
import { postEmployee } from "../utils/employeesAPI";

//Types
interface IProps {
  open: boolean;
  handleOnClose: () => void;
}
interface IEmployee {
  firstName: string;
  lastName: string;
  position: string;
}

const AddEmployeeModal = ({ open, handleOnClose }: IProps) => {
  //useState

  //Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { firstName: "", lastName: "", position: "" },
  });

  const onSubmit: SubmitHandler<IEmployee> = (data) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onClose={() => handleOnClose()}>
      <DialogTitle>Add a employee</DialogTitle>
      <DialogContent>
        <DialogContentText>The field with * are mandatory.</DialogContentText>

        <Controller
          name="firstName"
          control={control}
          rules={{ required: true, minLength: 3 }}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              required
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              variant="standard"
              error={Boolean(errors.firstName)}
              sx={{ m: (theme) => theme.spacing(1) }}
            />
          )}
        />
        {errors?.firstName?.type == "required" && (
          <Typography>This is required.</Typography>
        )}
        {errors?.firstName?.type == "minLength" && (
          <Typography>Must be at least 3 characters.</Typography>
        )}

        <Controller
          name="lastName"
          control={control}
          rules={{ required: true, minLength: 3 }}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              required
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              variant="standard"
              error={Boolean(errors.lastName)}
              sx={{ m: (theme) => theme.spacing(1) }}
            />
          )}
        />

        {errors?.lastName?.type == "required" && (
          <Typography>This is required.</Typography>
        )}
        {errors?.lastName?.type == "minLength" && (
          <Typography>Must be at least 3 characters.</Typography>
        )}
        <Controller
          name="position"
          control={control}
          rules={{ required: true, minLength: 4 }}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              required
              margin="dense"
              id="position"
              label="Position"
              type="text"
              variant="standard"
              error={Boolean(errors.position)}
              sx={{
                m: (theme) => theme.spacing(1),
              }}
            />
          )}
        />

        {errors?.position?.type == "required" && (
          <Typography>This is required.</Typography>
        )}
        {errors?.position?.type == "minLength" && (
          <Typography>Must be at least 4 characters.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleOnClose()}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeModal;
