import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#cf9425", // Gold color from the navigation text
      dark: "#0C1C19",
    },
    secondary: {
      main: "#FFFFFF", // White color for "Contact Us" text
      dark: "#0C1C19",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    //   dark: "#0C1C19",
    },
    text: {
      primary: "#0C1C19",
      secondary: "#FFFFFF",
    //   dark: "#0C1C19",
    },
    // Additional colors can be added based on the design
  },
  typography: {
    fontFamily: "'Alexandria', Helvetica, Arial, sans-serif",
    fontSize: 16,
    h1: {
      fontFamily: "'Alexandria', Helvetica",
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: "-0.40px",
    },
    h2: {
      fontFamily: "'Alexandria', Helvetica",
      fontWeight: 700,
      fontSize: "1.75rem",
      letterSpacing: "-0.35px",
    },
    h3: {
      fontFamily: "'Alexandria', Helvetica",
      fontWeight: 700,
      fontSize: "1.5rem",
      letterSpacing: "-0.30px",
    },
    h4: {
      fontFamily: "'Alexandria', Helvetica",
      fontWeight: 500,
      fontSize: "1.25rem",
      letterSpacing: "-0.25px",
    },
    h5: {
      fontFamily: "'Alexandria', Helvetica",
      fontWeight: 500,
      fontSize: "1.125rem",
      letterSpacing: "-0.20px",
    },
    h6: {
      fontFamily: "'Alexandria', Helvetica",
      fontWeight: 500,
      fontSize: "1rem",
      letterSpacing: "-0.15px",
    },
    subtitle1: {
      fontFamily: "'Alexandria', Helvetica",
      fontWeight: 500,
      fontSize: "1.25rem", // 20px
      letterSpacing: "0",
    },
    subtitle2: {
      fontFamily: "'Alexandria', Helvetica",
      fontWeight: 500,
      fontSize: "1rem",
      letterSpacing: "0",
    },
    body1: {
      fontFamily: "'Alexandria', Helvetica",
      fontWeight: 500,
      fontSize: "1.25rem", // 20px
      letterSpacing: "0",
    },
    body2: {
      fontFamily: "'Alexandria', Helvetica",
      fontWeight: 500,
      fontSize: "1rem",
      letterSpacing: "0",
    },
    button: {
        fontFamily: "'Alexandria', Helvetica",
      fontWeight: 700,
      fontSize: "1.25rem", // 20px
      letterSpacing: "-0.40px",
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 0,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body1,
        }),
        head: ({ theme }) => ({
          ...theme.typography.subtitle1,
          fontWeight: 600,
        }),
        body: ({ theme }) => ({
          ...theme.typography.body1,
        }),
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: ({ theme }) => ({
          ...theme.typography.subtitle1,
        }),
        secondary: ({ theme }) => ({
          ...theme.typography.body2,
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MuiThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};