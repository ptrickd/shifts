import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#121212", paper: "#121212" }, //"#114538" , "#05313d"
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#10857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
