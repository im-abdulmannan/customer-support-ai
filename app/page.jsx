"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Appbar from "./components/Appbar";
import Chat from "./components/Chat";
import SidebarComponent from "./components/Sidebar";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box display="flex" flexDirection="row" height={"100vh"}>
      <SidebarComponent />
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Appbar />
        <Chat />
      </Box>
    </Box>
  );
}
