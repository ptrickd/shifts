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
  displayName: string;
  position: string;
}

const AddEmployeeModal = ({ open, handleOnClose }: IProps) => {
  //useState
  const [submitting, setSubmitting] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");

  //Form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      position: "",
    },
  });

  const onSubmit: SubmitHandler<IEmployee> = async (data) => {
    setSubmitting(true);

    const response = await postEmployee(data);

    setSubmitting(false);
    if (response.error) {
      console.log(response.error);
      // setErrorResponse(response.error);
    } else if (typeof response.display_name === "object") {
      setErrorResponse(response.display_name[0]);
    } else {
      handleOnClose();
      reset();
    }
  };

  if (submitting) return <CircularProgress />;

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
          name="displayName"
          control={control}
          rules={{ required: true, minLength: 3 }}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              required
              margin="dense"
              id="displayName"
              label="Name To Display"
              type="text"
              variant="standard"
              error={Boolean(errors.displayName)}
              sx={{ m: (theme) => theme.spacing(1) }}
            />
          )}
        />

        {errors?.displayName?.type == "required" && (
          <Typography>This is required.</Typography>
        )}
        {errors?.displayName?.type == "minLength" && (
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
        <Typography color="error">{errorResponse}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleOnClose()}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeModal;
