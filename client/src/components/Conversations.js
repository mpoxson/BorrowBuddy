import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import axios from 'axios'; // Import axios

const Conversations = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (user) { // Ensure user is not null before making the request
          const response = await axios.get(`http://localhost:3001/Conversations/user/${user.user_id}`);
          setMessages(response.data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [user]); // Include user in the dependency array

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      {messages.map((message, index) => (
        <ListItem button component={Link} to={`/Messages/${message.ConversationID}`} key={index}>
          <ListItemAvatar>
            <Avatar>{message.user_id1 === user.user_id ? message.user_id2 : message.user_id1}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`User: ${message.user_id1 === user.user_id ? message.user_id2 : message.user_id1}`}
            secondary={`Last Message Time: ${message.LastMessageTime}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Conversations;

