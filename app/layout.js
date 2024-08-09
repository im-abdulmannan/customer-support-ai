import { AuthProvider } from "@/contexts/AuthContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Inter } from "next/font/google";
import "./globals.css";
import theme from "./theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Headstarter Assistance",
  description: "Assistant Bot for Headstarter Fellowship Program",
  logo: "/assets/favicon.ico"
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
      <head>
          <title>{metadata.title}</title>
          <link rel="icon" href={metadata.logo} sizes="any" />
        </head>
        <body className={inter.className}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
