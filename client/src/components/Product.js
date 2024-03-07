import React from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import { COLORS } from "../constants/enums";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Textarea from "@mui/joy/Textarea";

const Product = (props) => {
  let { productId } = useParams();
  console.log(`${productId}`);
  return (
    <Container maxWidth="xl">
      {/* Box for product info */}
      <Box>
        {/* <ImageList sx={{ width: 500, height: 450 }} cols={1} rowHeight={164}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList> */}

        {/* Box for user info section */}
        <Container>
          <Box>
            <Box>
              {/* <Avatar alt="Remy Sharp" src={imgLink} /> */}
              <Avatar sx={{ bgcolor: COLORS.ACCENT }} aria-label="Profile Pic">
                T
              </Avatar>
            </Box>
            <Box>
              <Typography>User Name</Typography>
              <Box>
                <Typography>City</Typography>
                <Typography>Rating</Typography>
              </Box>
            </Box>
          </Box>
          {/* Product meta info */}
          <Container>
            <Box>
              <Typography>Product name</Typography>
            </Box>
            <Box>
              <Box>
                <Typography>Price</Typography>
              </Box>
              <Box>
                <Typography># times rented</Typography>
              </Box>
            </Box>
          </Container>
          <Box>
            <Button>Edit</Button>
          </Box>
        </Container>
        <Box>
          <Box>
            <Typography>kdjfajgfsidgfsakdlfgasdlfia;dg rf;wigf</Typography>
          </Box>
          <Box>
            <Typography>Category</Typography>
            <Typography>Start/End</Typography>
          </Box>
        </Box>
        <Button>Reserve</Button>
      </Box>
      {/* Box for comments */}
      <Box>
        <Typography>COMMENTS</Typography>
        <Box>
          {/* Put all this in a map for each comment of a certain product */}
          <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                {/* <Avatar alt="Remy Sharp" src={imgLink} /> */}
                <Avatar
                  sx={{ bgcolor: COLORS.ACCENT }}
                  aria-label="Profile Pic"
                >
                  T
                </Avatar>
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>username</h4>
                <p style={{ textAlign: "left" }}>Comment</p>
                <Typography>Date commented</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box>
          <Textarea />
          <Button>Submit</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Product;
