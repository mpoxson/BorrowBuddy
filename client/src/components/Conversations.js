import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, List, ListItem, ListItemAvatar, ListItemText, Avatar, Container, Typography, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Conversations = () => {
  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (user) {
          const response = await axios.get(`http://localhost:3001/Conversations/user/${user.user_id}`);
          setConversations(response.data);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, [user]);

  const RecipientData = ({ userId, productId }) => {
    const [recipient, setRecipient] = useState(null);
    const [product, setProduct] = useState(null);

    useEffect(() => {
      const fetchRecipient = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/users/${userId}`);
          setRecipient(response.data);
        } catch (error) {
          console.error('Error fetching recipient:', error);
        }
      };

      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/products/${productId}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchRecipient();
      fetchProduct();
    }, [userId, productId]);

    if (!recipient || !product) {
      return null;
    } 

    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar src={recipient.user_profile_picture} alt={recipient.user_name} />
        </ListItemAvatar>
        <ListItemText
          primary={`${recipient.user_name} (${product.product_name})`}
        />
      </ListItem>
    );
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box borderBottom="1px solid black" p={2} bgcolor="#fff" textAlign="center">
        <Typography variant="h5">Conversations</Typography>
      </Box>
      <List style={{ width: "100%", flex: 1, overflowY: "auto" }}>
        {conversations.map((conversation, index) => {
          const otherUserId = conversation.user_id1 === user.user_id ? conversation.user_id2 : conversation.user_id1;
          return (
            <Button
              key={index}
              component={Link}
              to={{
                pathname: `/Messages/${conversation.ConversationID}`,
                search: `?product_id=${conversation.product_id}` // Include product_id as a query parameter
              }}
              variant="text"
              fullWidth
            >
              <ListItem>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <RecipientData userId={otherUserId} productId={conversation.product_id} />
                  </Grid>
                  <Grid item>
                    <ListItemText
                      secondary={formatLastMessageTime(conversation.LastMessageTime)}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            </Button>
          );
        })}
      </List>
    </Container>
  );
};

const formatLastMessageTime = (lastMessageTime) => {
  const today = new Date();
  const messageDate = new Date(lastMessageTime);
  
  if (today.toDateString() === messageDate.toDateString()) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    return messageDate.toLocaleDateString();
  }
}

export default Conversations;

