import { createTheme } from "@mui/material/styles";

export const theme = {
  typography: {
    fontFamily: '"Inter", sans-serif',
    title: {
      color: "#35353d",
    },
    body: {
      color: "#6a7185",
    },
  },

  palette: {
    primary: {
      main: "#4ab6f7",
    },
    stroke: {
      main: "#e9edf1",
    },
    background: {
      default: "#f5f7fa",
    },
    secondary: {
      main: "#4a86f7",
    },
    skyBlue: {
      main: "#57b6f0",
    },
    red: {
      main: "#d94841",
    },
    orange: {
      main: "#f2a84c",
    },
    green: {
      main: "#83bf6e",
    },
    greenGradient: {
      main: "#73bc78",
    },
  },
};

export default createTheme(theme);
