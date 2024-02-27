import { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

export const ColorModeContext = createContext();

const ToggleColorMode = ({ children }) => {
  const storedMode = localStorage.getItem("colorMode");
  const [mode, setMode] = useState(storedMode || "light");

  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("colorMode", newMode);
  };

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                position: "relative",
              },
            },
          },
          MuiCardContent: {
            styleOverrides: {
              root: { position: "relative", backgroundColor: "transparent" },
            },
          },
          MuiTypography: {
            styleOverrides: {
              subtitle2: {
                textDecoration: "none",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider
      value={{ mode, setMode, toggleColorMode }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
