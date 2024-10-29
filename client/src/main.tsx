import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import App from "./App.tsx";
import "./index.css";
import SocketProvider from "./context/socket";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
