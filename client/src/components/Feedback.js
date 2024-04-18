import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function Feedback() {
  //Hand submit: update below, update return time ans is return, refresh whole page
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
  const handleEnd = async () => {
    alert("Feedback Submitted");
    window.location.reload();
  };

  return (
    <Box sx={style}>
      <Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography variant="h5">Report User</Typography>
        </Box>
        <Box>
          <TextField
            fullWidth
            label="Details: "
            defaultValue=""
            multiline
            minRows={3}
          />
        </Box>
        <Box display={"flex"} justifyContent={"right"} marginTop={"4px"}>
          <Button variant="contained" onClick={handleEnd}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
