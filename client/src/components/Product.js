import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { COLORS } from "../constants/enums";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Pictures from "./Pictures";
import Comments from "./Comments";
import img from "../image/test.jpg";
import { Divider } from "semantic-ui-react";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState(null);
  let { productId } = useParams();

  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${productId}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const img_array = [img, img, img];

  let curr_user = JSON.parse(localStorage.getItem("user"))["user_id"];

  const handleReserve = async () => {
    try {
      let today = new Date();
      // console.log(today);
      // let dd = String(today.getDate()).padStart(2, "0");
      // let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      // let yyyy = today.getFullYear();
      // today = yyyy + "-" + mm + "-" + dd;
      // today = Date.parse(today);
      // console.log(today);

      let data = {
        product_id: productId,
        user_id: curr_user,
        rental_start_time: today,
        rental_end_time: today,
        rental_is_return: false,
        rental_return_time: today,
        rental_is_damage: false,
        rental_damage_text: "",
      };

      //Check if is rented is still no first
      //set is rented before making product rental

      await axios.post("http://localhost:3001/product_rentals", data);
      // TODO: Change to manage rentals page
      console.log("Must've worked");
    } catch (error) {
      // Error handling code remains the same
      console.log("errored out");
    }
  };

  return (
    <Container
      maxWidth="xxl"
      sx={{
        paddingTop: "10px",
        display: "block",
        justifyContent: "center",
        backgroundColor: COLORS.SECONDARY,
      }}
    >
      {/* Box for product info */}
      <Box>
        <Box display={"flex"} justifyContent={"center"} maxWidth={"100%"}>
          <div style={{ width: "100%" }}>
            <Pictures props={img_array} />
          </div>
        </Box>
        {/* Box for user info section */}
        <Container
          sx={{
            backgroundColor: COLORS.PRIMARY,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={1} width={"100%"} color={COLORS.SECONDARY}>
            <Grid xs={2}>
              <Box sx={{ display: "flex" }}>
                <Box marginY={"auto"}>
                  {/* <Avatar alt="Remy Sharp" src={imgLink} /> */}
                  <Avatar
                    sx={{
                      bgcolor: COLORS.ACCENT,
                    }}
                    aria-label="Profile Pic"
                  >
                    T
                  </Avatar>
                </Box>
                <Box marginLeft={"20px"} marginRight={"-20px"} marginY={"auto"}>
                  <Typography>Murphy Poxson</Typography>
                  <Box>
                    <Typography>Sterling Heights</Typography>
                    <Typography>4.5/5</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid xs>
              {/* Product meta info */}
              <Box>
                <Box>
                  <Typography variant="h6">{product.product_name}</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box
                    marginRight={"20px"}
                    marginLeft={"-20px"}
                    color={COLORS.ACCENT}
                  >
                    <Typography>${product.product_price}/Day</Typography>
                  </Box>
                  <Box color={COLORS.ACCENT}>
                    <Typography>100 previous rents</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid xs={2}>
              <Box marginY={"auto"}>
                <Button
                  sx={{
                    marginTop: "5px",
                    color: COLORS.SECONDARY,
                    borderColor: COLORS.SECONDARY,
                  }}
                  variant="outlined"
                >
                  Edit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Box
          display={"flex"}
          justifyContent={"space-around"}
          marginTop={"20px"}
        >
          <Box
            sx={{ border: "solid", borderColor: COLORS.ACCENT }}
            width={"50%"}
            padding={"3px"}
          >
            <Typography variant="h6">Description</Typography>
            <TextField
              sx={{ marginTop: "9px" }}
              variant="filled"
              disabled
              fullWidth
              multiline
              minRows={6}
              defaultValue={product.product_description}
            />
          </Box>
          <Box
            sx={{ border: "solid", borderColor: COLORS.PRIMARY }}
            maxWidth={"25%"}
            padding={"3px"}
          >
            <Typography variant="h6">Details</Typography>
            <TextField
              fullWidth
              disabled
              label="Category: "
              defaultValue={product.product_category}
            />
            <TextField
              fullWidth
              disabled
              label="Start: "
              defaultValue="01/02/23"
              sx={{ marginY: "7px" }}
            />
            <TextField
              fullWidth
              disabled
              label="End: "
              defaultValue="01/02/24"
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ marginTop: "5px" }}
        width={"95%"}
        display="flex"
        justifyContent={"right"}
      >
        {product.product_is_rented == "No" && product.owner_id != curr_user ? (
          <Button variant="contained" onClick={handleReserve}>
            Reserve
          </Button>
        ) : (
          <Button variant="contained" disabled>
            Reserve
          </Button>
        )}
      </Box>

      {/* Box for comments */}
      {/* Put all this in a map for each comment of a certain product */}
      <Paper sx={{ marginTop: "10px" }} elevation={3}>
        <Typography
          variant="h5"
          sx={{ paddingTop: "5px", marginBottom: "-5px" }}
        >
          Comments
        </Typography>
        <Divider />
        <Box width={"98%"} display="flex" justifyContent="center">
          <Comments />
        </Box>
      </Paper>
    </Container>
  );
};

export default Product;
