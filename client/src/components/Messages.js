import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';

const sampleMessages = [
  {
    id: 1,
    sender: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timestamp: '2024-03-27 10:00:00'
  },
  {
    id: 2,
    sender: 'Jane Smith',
    text: 'Nulla facilisi. Sed ornare nisl id lectus convallis, quis faucibus justo bibendum.',
    timestamp: '2024-03-27 09:30:00'
  },
  // Add more sample messages as needed
];

const Messages = () => {
  const { messageId } = useParams();
  const message = sampleMessages.find(msg => msg.id === parseInt(messageId));

  if (!message) {
    return <div>Message not found</div>;
  }

  return (
    <div>
      <p>hello team 7!</p>
      <Box>
        <div>
          <p>{message.sender}</p>
          <p>{message.text}</p>
          <p>{new Date(message.timestamp).toLocaleString()}</p>
        </div>
      </Box>
      <Box>
        <TextField label="Type your message" variant="outlined" fullWidth />
        <Button variant="contained" color="primary">
          Send
        </Button>
      </Box>
    </div>
  );
};

export default Messages;

