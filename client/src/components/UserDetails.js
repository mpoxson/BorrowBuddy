import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Avatar,
  CircularProgress,
  Button,
  Rating,
} from "@mui/material";
import Card from "./Card";
import Feedback from "./Feedback";
import Modal from "@mui/material/Modal";
import { COLORS } from "../constants/enums";
import StarRateIcon from "@mui/icons-material/StarRate";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]); // State to store user's products
  const { userId } = useParams();
  const [ratings, setRatings] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // Fetch user information
    axios
      .get(`http://localhost:3001/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });

    // Fetch user's products
    axios
      .get(`http://localhost:3001/products/userDetail/${userId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user products:", error);
      });
    axios
      .get(`http://localhost:3001/ratings/avg/${userId}`)
      .then((response) => {
        console.log(response.data);
        setRatings(response.data.average_rating);
      });
  }, [userId]);

  const handleCardClick = (event, productId) => {
    event.preventDefault(); // Block default behavior
    window.location.href = `/products/${productId}`;
  };

  if (!user) {
    return (
      <Container
        maxWidth="sm"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        <CircularProgress />
      </Container>
    );
  }
  return (
    <>
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Avatar src={user.user_profile_picture} alt={user.user_name} />
            <Typography variant="h5" style={{ marginLeft: "10px" }}>
              {user.user_name}
            </Typography>
          </div>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          User ID: {user.user_id}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          User Location: {user.user_state}, {user.user_city}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          User Address: {user.user_address}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          User Profile: {user.user_profile}
        </Typography>
        <Rating
          name="rate"
          emptyIcon={
            <StarRateIcon sx={{ color: "#4a4943" }} fontSize="inherit" />
          }
          value={ratings}
          precision={0.5}
          readOnly
        />
      </Container>

      <Button
        sx={{
          marginTop: "5px",
          color: COLORS.PRIMARY,
          backgroundColor: COLORS.ACCENT,
        }}
        variant="contained"
        onClick={handleOpen}
      >
        Report
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Feedback />
      </Modal>
      <div
        style={{
          marginTop: "50px",
          border: "0px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Here is all my product information:
        </Typography>
        {/* Map through the user's products and render the user product card component */}
        {products.map((product) => (
          <a
            key={product.product_id}
            href={`/products/${product.product_id}`}
            onClick={(event) => handleCardClick(event, product.product_id)}
          >
            <Card props={product} />
          </a>
        ))}
      </div>
    </>
  );
};

export default UserDetails;
