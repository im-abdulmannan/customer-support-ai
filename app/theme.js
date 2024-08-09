"use client";
import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";

const roboto = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => ({
        body: { backgroundColor: "#171c2e", color: "white" },
        "::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#0b1022",
          borderRadius: "10px",
        },
        "::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#0b0d16",
        },
        "::-webkit-scrollbar-track": {
          backgroundColor: "#171c2e",
        },
      }),
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#fff",
            "& .placeholder": {
              color: "#fff",
              opacity: 1,
            },
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#1976d2",
            },
            "&:hover fieldset": {
              borderColor: "#1976df",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
          opacity: 0.6,
          "&.Mui-focused": {
            color: "#1976d2",
          },
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          borderColor: "#fff",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#171c2e",
          color: "#fff",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: "#fff",
          opacity: 0.8,
        },
      },
    },
  },
});

export default theme;
