import { Avatar, Paper, Rating, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

const Review = (prop) => {
  const [rater, setRater] = useState(null);

  console.log(prop.prop);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${prop.prop.user_rating_id}`)
      .then((response) => {
        console.log(response.data);
        setRater(response.data);
      });
  }, []);

  return (
    <Paper elevation={3}>
      <Box display={"flex"} width={"100%"}>
        <Box marginY={"auto"} width={"auto"}>
          <Box display={"flex"} marginRight={"20px"}>
            {rater ? (
              <>
                <Box marginX={"5px"} marginBottom={"10px"}>
                  <Link to={`/users/${prop.prop.user_rating_id}`} style={{ textDecoration: 'none' }}>
                    <Avatar
                    src={rater.user_profile_picture}
                    aria-label="Profile Pic"
                    />
                  </Link>
                </Box>
                <Box>
                  <Link to={`/users/${prop.prop.user_rating_id}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="h5">{rater.user_name}</Typography>
                  </Link>
                </Box>
              </>
            ) : (
              <Typography>loading</Typography>
            )}
          </Box>
          <Rating
            name="rate"
            value={prop.prop.rating_value}
            precision={0.5}
            readOnly
          />
        </Box>
        <Box width={"100%"} paddingX={"10px"} paddingY={"10px"}>
          <TextField
            value={prop.prop.rating_description}
            fullWidth
            multiline
            minRows={2}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default Review;
