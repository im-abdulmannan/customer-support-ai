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
      }),
    },
  },
});

export default theme;
