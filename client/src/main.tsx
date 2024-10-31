import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import App from "./App.tsx";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import SocketProvider from "./context/socket";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <SocketProvider>
            <App />
          </SocketProvider>
        </ReduxProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
