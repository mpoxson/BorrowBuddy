import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import axios from "axios";

const Rate = (props) => {
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");
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

  const handleRate = async () => {
    try {
      if (rating == null) {
        return alert("Please enter a star rating!");
      }
      let data = {
        user_rated_id: props.props.user_id,
        user_rating_id: JSON.parse(localStorage.getItem("user"))["user_id"],
        rating_value: rating,
        rating_description: review,
      };

      await axios.post(`http://localhost:3001/ratings/`, data);
      window.location.reload();
    } catch (error) {
      // Error handling code remains the same
      console.log("errored out: " + error);
    }
  };

  return (
    <Box sx={style}>
      <Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography variant="h5">Rate {props.props.user_name}</Typography>
        </Box>
        <Box>
          <Typography>Star Rating</Typography>
          <Rating
            name="rate"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextField
            fullWidth
            label="Review: "
            defaultValue=""
            multiline
            minRows={3}
            onChange={(event) => {
              setReview(event.target.value);
            }}
          />
        </Box>
        <Box display={"flex"} justifyContent={"right"} marginTop={"4px"}>
          <Button variant="contained" onClick={handleRate}>
            Rate
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Rate;
