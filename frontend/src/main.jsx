import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import ToggleColorModeProvider from "./utils/ToggleColorMode.jsx";
import store from "./app/store.js";
import "./main.css";

const theme = createTheme({
  
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <ctMode>
    <Provider store={store}>
      <ToggleColorModeProvider>
      {/* <ThemeProvider theme={theme}> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </ThemeProvider> */}
      </ToggleColorModeProvider>
    </Provider>
  // </ctMode>
);
