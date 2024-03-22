import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const ManageRentals = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //Hand submit: update below, update return time ans is return, refresh whole page

  return (
    <Box sx={style}>
      <Box>
        <Box>
          <Typography>Manage Rental</Typography>
        </Box>
        <Box>Rental end, Rental damaged (check), rental damaged check</Box>
        <Box>submit button</Box>
      </Box>
    </Box>
  );
};

export default ManageRentals;
