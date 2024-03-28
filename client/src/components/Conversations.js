// Conversations.js
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const sampleMessages = [
  {
    id: 1,
    recipient: 'John Doe',
    product: 'Sample Product 1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timestamp: '2024-03-27 10:00:00'
  },
  {
    id: 2,
    recipient: 'Jane Smith',
    product: 'Sample Product 2',
    text: 'Nulla facilisi. Sed ornare nisl id lectus convallis, quis faucibus justo bibendum.',
    timestamp: '2024-03-27 09:30:00'
  },
  // Add more sample messages as needed
];

const Conversations = () => {
  return (
    <List>
      {sampleMessages.map(message => (
        <ListItem key={message.id} button component={Link} to={`/Messages/${message.id}`}>
          <ListItemAvatar>
            <Avatar alt={message.recipient} src={`/profile_pics/${message.recipient}.jpg`} />
          </ListItemAvatar>
          <ListItemText
            primary={message.product}
            secondary={`${message.text.substring(0, 30)}...`}
            secondaryTypographyProps={{ noWrap: true }}
          />
          <ListItemText
            primaryTypographyProps={{ component: 'div' }}
            primary={new Date(message.timestamp).toLocaleString()}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Conversations;

