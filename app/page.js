"use client";

import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // setResponse("");
    setMessages((prev) => [
     ...prev,
      { role: "user", content: prompt },
    ]);

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
        // setResponse((prev) => prev + result);
        setMessages(prev => [...prev, {
          role: "assistant",
          content: result,
        }])
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
                width={"80%"}
                borderRadius={5}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          {/* {error && <p style={{ color: "red" }}>{error}</p>}
          {response && (
            <div style={{ marginTop: "20px" }}>
              <h2>Generated Content:</h2>
              <p>{response}</p>
            </div>
          )} */}
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
