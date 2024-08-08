"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        `Hi ${user.name}! I'm the Headstarter support assistant. How can I help you today?`,
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

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingMessage(true);
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      setPrompt("");

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
    <Container
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={"column"}
        width="100%"
        height="90vh"
        marginY={4}
        border="1px solid whitesmoke"
        boxShadow={1}
        borderRadius={5}
        p={2}
        spacing={3}
      >
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
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
                bgcolor={
                  message.role === "assistant"
                    ? "primary.main"
                    : "secondary.main"
                }
                color="white"
                maxWidth={"80%"}
                borderRadius={5}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {/* {loading ? "Generating..." : "Generate"} */}
            {loadingMessage ? "Generating..." : "Generate"}
          </Button>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
