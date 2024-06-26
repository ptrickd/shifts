import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "../utils/theme";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
