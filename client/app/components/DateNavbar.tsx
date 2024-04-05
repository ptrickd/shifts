"use client";
//Material UI
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

//Types
interface IProps {
  date: string;
  newShifts: (direction: "backward" | "forward") => void;
}

const DateNavbar = ({ date, newShifts }: IProps) => {
  console.log(date);
  return (
    <Box component="div" sx={{ textAlign: "center" }}>
      {/* //function get the previous week shifts */}
      <IconButton onClick={() => newShifts("backward")}>
        <ArrowBackIcon aria-label="previous week" />
      </IconButton>
      {date}
      {/* //function get the next week shifts */}
      <IconButton onClick={() => newShifts("forward")}>
        <ArrowForwardIcon aria-label="week next" />
      </IconButton>
    </Box>
  );
};

export default DateNavbar;
