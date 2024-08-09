import { useAuth } from "@/contexts/AuthContext";
import {
  AccountCircleOutlined,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  LogoutOutlined
} from "@mui/icons-material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";

const SidebarComponent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  console.log("🚀 ~ SidebarComponent ~ open:", open);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

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
    <>
      <Sidebar
        backgroundColor="#171c2e"
        collapsed={isCollapsed ? true : false}
        rootStyles={{
          border: "1px solid #28314f",
        }}
      >
        <Menu
          rootStyles={{
            padding: "12px",
            backgroundColor: "#171c2e",
            color: "white",
            height: "50px",
            marginTop: "10px",
            marginBottom: "10px",
            fontFamily: "sans-serif",
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: `${isCollapsed ? "center" : "space-between"}`,
              alignItems: "flex-start",
            }}
          >
            <div>{!isCollapsed && "Headstarter AI"}</div>
            <div>
              {isCollapsed ? (
                <KeyboardDoubleArrowRight
                  sx={{
                    color: "white",
                    backgroundColor: "#171c2e",
                    cursor: "pointer",
                    borderRadius: "5px",
                    border: "1px solid #28314f",
                    "&:hover": {
                      backgroundColor: "#28314f",
                    },
                  }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                />
              ) : (
                <KeyboardDoubleArrowLeft
                  sx={{
                    color: "white",
                    backgroundColor: "#171c2e",
                    cursor: "pointer",
                    borderRadius: "5px",
                    border: "1px solid #28314f",
                    "&:hover": {
                      backgroundColor: "#28314f",
                    },
                  }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                />
              )}
            </div>
          </Box>
        </Menu>

        <Menu
          rootStyles={{
            borderTop: "1px solid #384558",
            color: "whitesmoke",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
          menuItemStyles={{}}
        >
          <Box
            width={"100%"}
            paddingY={`${isCollapsed ? "10px" : "20px"}`}
            marginTop={`${!isCollapsed && "20px"}`}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <AccountCircleOutlined
              fontSize={`${isCollapsed ? "medium" : "large"}`}
            />
          </Box>
          {!isCollapsed && (
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "16px",
              }}
            >
              <Box>{user && user.name}</Box>
              <Box>{user && user.email}</Box>
            </Container>
          )}
        </Menu>
        <Menu
          rootStyles={{
            position: "absolute",
            bottom: "2px",
            width: "-webkit-fill-available",
          }}
          menuItemStyles={{
            button: {
              background: "#1b223a",
              border: "1px solid #384558",
              width: "100% !important",
              "&:hover": {
                background: "#384558",
              },
            },
          }}
        >
          <MenuItem onClick={() => setOpen(!open)}>
            <Box
              variant="text"
              sx={{
                color: "white",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: `${isCollapsed ? "center" : "flex-start"}`,
              }}
            >
              <OpenInNewIcon color="primary" />
              {!isCollapsed && <p>Subscription</p>}
            </Box>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Box
              variant="text"
              sx={{
                color: "white",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: `${isCollapsed ? "center" : "flex-start"}`,
              }}
              disabled={loading}
            >
              <LogoutOutlined /> {!isCollapsed && <p>Logout</p>}
            </Box>
          </MenuItem>
        </Menu>
      </Sidebar>
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(!open)}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SidebarComponent;
