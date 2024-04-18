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
import Modal from "@mui/material/Modal";
import ManageRentals from "./ManageRentals";
import { storage } from "../firebase/config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Rate from "./Rate";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom"; 

const Product = () => {
  const [product, setProduct] = useState(null);
  const [rental, setRental] = useState(null);
  const [user, setUser] = useState(null);
  const [refreshData, setRefreshData] = useState(true);
  const [imageAva, setImageAva] = useState([]);
  const [edit, setEdit] = useState(true);
  let { productId } = useParams();
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [category, setcategory] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [ratings, setRatings] = useState(null);
  const [ratable, setRatable] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openRate, setRateOpen] = React.useState(false);
  const handleOpenRate = () => setRateOpen(true);
  const handleCloseRate = () => setRateOpen(false);

  //For page displaying images
  const [imageList, setImageList] = useState([]);

  let curr_user = JSON.parse(localStorage.getItem("user"))["user_id"];

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${productId}`)
      .then((response) => {
        //console.log(response.data);
        setProduct(response.data);
      });
  }, [refreshData]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/product_rentals/product/active/${productId}`)
      .then((response) => {
        //console.log(response.data);
        setRental(response.data);
      });
  }, [productId]);
  useEffect(() => {
    if (product != null) {
      axios
        .get(`http://localhost:3001/users/${product.owner_id}`)
        .then((response) => {
          //console.log(response.data);
          setUser(response.data);
        });
      axios
        .get(`http://localhost:3001/ratings/avg/${product.owner_id}`)
        .then((response) => {
          console.log(response.data);
          setRatings(response.data.average_rating);
        });
      if (curr_user != product.owner_id) {
        axios
          .get(
            `http://localhost:3001/ratings/rated/${product.owner_id}/${curr_user}`
          )
          .then((response) => {
            console.log(response.data);
            if (response.data.length == 0) {
              setRatable(true);
            }
          });
      }
      setDescription(product.product_description);
      setStart(product.product_available_start_time.slice(0, 10));
      setEnd(product.product_available_end_time.slice(0, 10));
      setcategory(product.product_category);
    }
  }, [product]);
  //Create an array of image URLs from the product_images associated with product
  useEffect(() => {
    axios
      .get(`http://localhost:3001/product_images/${productId}`)
      .then((response) => {
        response.data.forEach((product_images) =>
          setImageList((prev) => [
            ...new Set([...prev, product_images.image_location]),
          ])
        );
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  if (!rental) {
    return "";
  }

  if (!user) {
    return "";
  }

  //const img_array = [img, img, img];

  const handleReserve = async () => {
    try {
      setRefreshData(!refreshData);
      if (product.product_is_rented.toLowerCase() == "yes") {
        return alert("Product already rented!");
      }
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

      let updates = product;
      updates.product_is_rented = "yes";

      console.log(updates);

      //Check if is rented is still no first
      //set is rented before making product rental
      await axios.put(`http://localhost:3001/products/${productId}`, updates);
      await axios.post("http://localhost:3001/product_rentals", data);
      window.location.reload();
    } catch (error) {
      // Error handling code remains the same
      console.log("errored out: " + error);
    }
  };

  let props = {
    product: product,
    rental: rental[0],
  };

  const handleEdits = async () => {
    try {
      let updates = product;

      updates.product_description = description;
      updates.product_category = category;
      updates.product_available_start_time = start;
      updates.product_available_end_time = end;

      console.log(updates);

      //Check if is rented is still no first
      //set is rented before making product rental
      await axios.put(`http://localhost:3001/products/${productId}`, updates);
      window.location.reload();
    } catch (error) {
      // Error handling code remains the same
      console.log("errored out: " + error);
    }
  };

const handleMessageClick = async () => {
  try {
    const data = {
      product_id: productId,
      user_id1: curr_user,
      user_id2: user.user_id,
    };

    const response = await axios.post("http://localhost:3001/Conversations", data);
    
    const conversationId = response.data.ConversationID;
    const messageUrl = `http://localhost:3000/Messages/${conversationId}`;

    window.location.href = messageUrl;
  } catch (error) {
    console.log(error);
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
            <Pictures props={imageList} />
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
                  <Link to={`/users/${product.owner_id}`} style={{ textDecoration: 'none' }}>
                    <Avatar
                    src={user.user_profile_picture}
                    aria-label="Profile Pic"
                    />
                  </Link>
                </Box>
                <Box marginLeft={"20px"} marginRight={"-20px"} marginY={"auto"}>
                  <Typography>{user.user_name}</Typography>
                  <Box>
                    <Typography>{user.user_city}</Typography>
                    <Rating
                      name="rate"
                      value={ratings}
                      precision={0.5}
                      readOnly
                    />
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
                {product.owner_id == curr_user ? (
                  <Button
                    sx={{
                      marginTop: "5px",
                      color: COLORS.SECONDARY,
                      borderColor: COLORS.SECONDARY,
                    }}
                    variant="outlined"
                    onClick={() => {
                      setEdit(false);
                    }}
                  >
                    Edit
                  </Button>
                ) : (
		  <div>
                  <Button
                    sx={{
                      marginTop: "10px",
                      color: COLORS.SECONDARY,
                      borderColor: COLORS.SECONDARY,
                    }}
                    variant="outlined"
                    onClick={handleOpenRate}
                    disabled={!ratable}
                  >
                    Rate
                  </Button>

		  <Button
        	    sx={{
          	      marginTop: "10px",
		      marginLeft: "15px",
          	      color: COLORS.SECONDARY,
          	      borderColor: COLORS.SECONDARY,
        	    }}
        	    variant="outlined"
        	    onClick={handleMessageClick} // Add onClick event handler
      	    	  >
        	    Message
      	    	  </Button>
		  </div>
                )}
                <Modal
                  open={openRate}
                  onClose={handleCloseRate}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Rate props={user} />
                </Modal>
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
              InputProps={{
                readOnly: edit,
              }}
              fullWidth
              multiline
              minRows={6}
              defaultValue={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
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
              InputProps={{
                readOnly: edit,
              }}
              label="Category: "
              defaultValue={category}
              onChange={(event) => {
                setcategory(event.target.value);
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%", marginY: "7px" }}
                label="Start:"
                readOnly={edit}
                defaultValue={dayjs(start)}
                onChange={(newValue) => {
                  setStart(newValue.toDate());
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%", marginY: "7px" }}
                label="End:"
                readOnly={edit}
                defaultValue={dayjs(end)}
                onChange={(newValue) => {
                  setEnd(newValue.toDate());
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: "5px" }} width={"95%"} display="flex">
        {/* Pull product rental data to see if user is renting data */}
        <Box width={"100%"} display={"flex"} justifyContent={"left"}>
          {rental[0] &&
          (product.owner_id == curr_user || rental[0].user_id == curr_user) ? (
            <Button variant="contained" onClick={handleOpen}>
              Manage Rental
            </Button>
          ) : (
            ""
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ManageRentals props={props} />
          </Modal>
          {edit == false ? (
            <Button variant="contained" onClick={handleEdits}>
              Submit Changes
            </Button>
          ) : (
            ""
          )}
        </Box>
        <Box width={"100%"} display={"flex"} justifyContent={"right"}>
          {rental[0] || product.owner_id == curr_user ? (
            <Button variant="contained" disabled>
              Reserve
            </Button>
          ) : (
            <Button variant="contained" onClick={handleReserve}>
              Reserve
            </Button>
          )}
        </Box>
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
