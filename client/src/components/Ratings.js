import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Rating,
  Divider,
} from "@mui/material";
import Review from "./Review";
import axios from "axios";

const Ratings = (props) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(null);
  const [ratable, setRatable] = useState(false);

  let curr_user = JSON.parse(localStorage.getItem("user"))["user_id"];

  useEffect(() => {
    axios
      .get(`http://localhost:3001/ratings/reviews/${props.props}`)
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      });
    if (curr_user != props.props) {
      axios
        .get(`http://localhost:3001/ratings/rated/${props.props}/${curr_user}`)
        .then((response) => {
          console.log(response.data);
          if (response.data.length == 0) {
            setRatable(true);
          }
        });
    }
  }, []);

  const handleAddReview = async () => {
    try {
      if (rating == null) {
        return alert("Please enter a star rating!");
      }
      let data = {
        user_rated_id: props.props,
        user_rating_id: JSON.parse(localStorage.getItem("user"))["user_id"],
        rating_value: rating,
        rating_description: newReview,
      };

      await axios.post(`http://localhost:3001/ratings/`, data);
      window.location.reload();
    } catch (error) {
      // Error handling code remains the same
      console.log("errored out: " + error);
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: "97%",
        marginX: "auto",
        paddingBottom: "3px",
        marginBottom: "10px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      {reviews.length == 0 ? (
        <Box>
          <Typography variant="h5">No Reviews Yet</Typography>
        </Box>
      ) : (
        <Box marginX={"auto"} width={"80%"} marginBottom={"7px"}>
          {reviews.map((review, index) => (
            <Box padding={"5px"}>
              <Review prop={review} />
            </Box>
          ))}
        </Box>
      )}
      {props.props == JSON.parse(localStorage.getItem("user"))["user_id"] ? (
        <></>
      ) : (
        <Box display={"flex"} width={"100%"}>
          <Divider />
          <Box width={"auto"} marginY={"auto"} marginX={"7px"}>
            <Rating
              size="large"
              name="rate"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>
          <Box width={"80%"} marginY={"auto"}>
            <TextField
              label="Leave a review"
              variant="outlined"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Box>
          <Box
            marginTop={"auto"}
            marginBottom={"7px"}
            marginLeft={"auto"}
            marginRight={"7px"}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddReview}
              disabled={!ratable}
            >
              Review
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default Ratings;
