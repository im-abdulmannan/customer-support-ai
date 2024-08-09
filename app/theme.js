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
  },
});

export default theme;
