import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, receiveMessage } from "./features/chat/chatSlice";
import {
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";

const Chat = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return;
    dispatch(sendMessage(message));
    setMessage("");

    //  message after a delay
    setTimeout(() => {
      dispatch(
        receiveMessage({ text: "Hello from the other side!", user: "Bot" })
      );
    }, 2000);
  };

  useEffect(() => {
    // Auto-scroll to the bottom
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat App  
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          padding: "10px",
        }}
      >
        <Paper
          sx={{
            width: { xs: "100%", sm: "85%", md: "70%", lg: "50%" },
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Box
            id="chat-window"
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              padding: "10px",
              borderBottom: "1px solid #ddd",
              "&::-webkit-scrollbar": {
                width: "0px",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  marginBottom: "10px",
                  textAlign: msg.user === "Bot" ? "left" : "right",
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  <strong>{msg.user}</strong> • {msg.timestamp}
                </Typography>
                <Paper
                  sx={{
                    display: "inline-block",
                    padding: "10px",
                    backgroundColor: msg.user === "Bot" ? "#f0f0f0" : "#1976d2",
                    color: msg.user === "Bot" ? "#000" : "#fff",
                    maxWidth: "80%",
                    wordWrap: "break-word",
                  }}
                >
                  {msg.text}
                </Paper>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", marginTop: "10px" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: "10px" }}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Chat;
