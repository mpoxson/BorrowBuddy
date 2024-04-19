import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

const Messages = () => {
  const { conversationID } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [conversationID]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/Messages/${conversationID}`);
      setMessages(response.data);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      await axios.post("http://localhost:3001/Messages", {
        ConversationID: conversationID,
        SenderID: user.user_id,
        MessageText: newMessage,
      });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior (new line)
      handleSendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <Container maxWidth="sm" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box borderBottom="1px solid black" p={2} style={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 1, display: "flex", alignItems: "center" }}>
        <ArrowBackIcon onClick={() => window.history.back()} style={{ cursor: "pointer" }} />
        <Typography variant="h5" align="center" style={{ flex: 1 }}>Messages</Typography>
      </Box>

      <Box flex="1" overflowY="auto" p={2}>
        {messages.length === 0 ? (
          <Typography variant="body1" align="center">
            There are no messages yet. Start the conversation!
          </Typography>
        ) : (
          messages.map((message, index) => (
            <Box
              key={index}
              textAlign={message.SenderID === user.user_id ? "right" : "left"}
              display="flex"
              justifyContent={message.SenderID === user.user_id ? "flex-end" : "flex-start"}
              mt={1}
            >
              <Box
                bgcolor={message.SenderID === user.user_id ? "primary.main" : "#F7F3EE5"} // Set background color to white for recipient's messages
                color={message.SenderID === user.user_id ? "primary.contrastText" : "text.primary"}
                p={1}
                borderRadius={8}
                boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.2)"} // Add shadow for recipient's messages
              >
                <Typography variant="body1">{message.MessageText}</Typography>
              </Box>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box borderTop="1px solid black" p={2} style={{ position: "sticky", bottom: 0, backgroundColor: "#fff", zIndex: 1, display: "flex", alignItems: "center" }}>
        <TextField
          label="Type your message"
          variant="outlined"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          fullWidth
          style={{ marginRight: "8px" }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </Button>
      </Box>
    </Container>
  );
};

export default Messages;

