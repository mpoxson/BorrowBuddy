import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/Messages/${conversationID}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [conversationID]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      await axios.post("http://localhost:3001/Messages/send", {
        ConversationID: conversationID,
        message: {
          SenderID: user.user_id,
          MessageText: newMessage,
          Timestamp: new Date().toISOString()
        }
      });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" height="100%">
        <Box flex="1" overflowY="auto" p={2}>
          {messages.map((message, index) => (
            <Box
              key={index}
              textAlign={message.SenderID === user.user_id ? "right" : "left"}
              bgcolor={message.SenderID === user.user_id ? "primary.main" : "background.paper"}
              color={message.SenderID === user.user_id ? "primary.contrastText" : "text.primary"}
              p={1}
              m={1}
              borderRadius={8}
            >
              <Typography variant="body1">{message.MessageText}</Typography>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Box borderTop="1px solid black" p={2}>
          <TextField
            label="Type your message"
            variant="outlined"
            value={newMessage}
            onChange={handleInputChange}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage} fullWidth>
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Messages;

