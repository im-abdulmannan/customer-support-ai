import { useAuth } from "@/contexts/AuthContext";
import { LogoutOutlined } from "@mui/icons-material";
import { Avatar, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Appbar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const isTabOrMobile = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, router, user]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "#171c2e",
          color: "white",
          paddingY: "3px",
        }}
      >
        {!isTabOrMobile ? (
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Assistant Bot
            </Typography>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt={user?.name} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        ) : (
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingX: "10px",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: "block" }}
            >
              Headstarter
            </Typography>
            <Tooltip title="Open settings">
              <IconButton>
                <Avatar alt={user?.name} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Tooltip title="logout">
              <IconButton sx={{ pl: 1 }} onClick={handleLogout}>
                <LogoutOutlined sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        )}
      </AppBar>
    </Box>
  );
}
