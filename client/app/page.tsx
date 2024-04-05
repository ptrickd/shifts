"use client";
import Image from "next/image";
import styles from "./page.module.css";
import App from "./components/App";
import theme from "./utils/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
export default function Home() {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </main>
  );
}
