import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Chat from "./pages/chat";
//import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Chat />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
