import { useAuth } from "@/contexts/AuthContext";
import { Send } from "@mui/icons-material";
import {
  Box,
  createTheme,
  IconButton,
  InputBase,
  Paper,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

const styles = (theme) =>
  createTheme({
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.4em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey",
      },
    },
  });

const Chat = () => {
  const defaultTheme = styles();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi ${user?.name}! I'm the Headstarter support assistant. How can I help you today?`,
    },
  ]);

  const [prompt, setPrompt] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  const handleSubmit = async (e) => {
    if (prompt === "") return;
    e.preventDefault();
    setLoadingMessage(true);
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setPrompt("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: result,
          },
        ]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMessage(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box>
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          height={"80vh"}
          padding={2}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={message.role === "assistant" ? "#1b223a" : "#1a318235"}
                color="white"
                maxWidth={"80%"}
                borderRadius={3}
                sx={{
                  p: "12px 15px",
                  fontSize: { xs: "12px", sm: "14px", md: "16px"},
                }}
              >
                <Markdown>{message.content}</Markdown>
              </Box>
            </Box>
          ))}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Stack>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            position: "fixed",
            width: "-webkit-fill-available",
            bottom: "0",
            padding: 2,
          }}
        >
          <Paper
            sx={{
              margin: "5px",
              p: "4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: { sm: "100%" },
              backgroundColor: "#171c2e",
              boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
              border: "1px solid #384558",
              borderRadius: 2,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: "16px", color: "whitesmoke" }}
              placeholder="Message"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <IconButton
              type="button"
              sx={{ p: "10px", color: "whitesmoke" }}
              onClick={handleSubmit}
              disabled={loadingMessage}
            >
              <Send />
            </IconButton>
          </Paper>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Chat;
