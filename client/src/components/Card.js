import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { CardHeader, Card as MCard, Tooltip } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { COLORS } from "../constants/enums";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { storage } from "../firebase/config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import testImage from "../image/test.jpg";
import Rating from "@mui/material/Rating";

function Card(props) {
  const [saved, setSaved] = useState(false);
  const [userName, setUserName] = useState("");
  const [ratings, setRatings] = useState(null);

  //For page displaying images
  const [imageSingle, setImageSingle] = useState([]);

  useEffect(() => {
    // Load saved status from local storage when component mounts
    const savedIds = JSON.parse(localStorage.getItem("savedProductIds")) || {};
    const save_id = savedIds[props.props.product_id];
    setSaved(!!save_id); // Convert to boolean value

    // Fetch user data
    axios
      .get(`http://localhost:3001/users/${props.props.owner_id}`)
      .then((response) => {
        setUserName(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });

    axios
      .get(`http://localhost:3001/ratings/avg/${props.props.owner_id}`)
      .then((response) => {
        console.log(response.data);
        setRatings(response.data.average_rating);
      });
    // Fetch product image data
    axios
      .get(`http://localhost:3001/product_images/min/${props.props.product_id}`)
      .then((response) => {
        if (response.data !== "" && response.data.constructor === Object) {
          setImageSingle(response.data);
        } else {
          let temp = { image_location: testImage };
          setImageSingle(temp);
          console.log(
            "asdfkjgaskljglkgjsagjkl" +
              imageSingle +
              " " +
              imageSingle.image_location
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, [props.props.owner_id, props.props.product_id]);

  const handleSave = async () => {
    try {
      let response;
      let save_id;

      if (!saved) {
        const saveData = {
          user_id: props.props.owner_id,
          product_id: props.props.product_id,
          save_status: true,
        };
        response = await axios.post(
          "http://localhost:3001/product_saves",
          saveData
        );
        save_id = response.data.save_id; // save save_id
        ////TEST
        console.log("Response data:", response.data);
        console.log("Save ID:", save_id);
        setSaved(true);
        console.log("Product saved:", response.data);

        // Save save_id to local storage
        const savedIds =
          JSON.parse(localStorage.getItem("savedProductIds")) || {};
        savedIds[props.props.product_id] = save_id;
        localStorage.setItem("savedProductIds", JSON.stringify(savedIds));
      } else {
        // Get the save_id of the saved product
        const savedIds =
          JSON.parse(localStorage.getItem("savedProductIds")) || {};
        save_id = savedIds[props.props.product_id];
        //TEST
        console.log("Saved IDs from local storage:", savedIds); // Export information about saved products
        console.log("Save ID from local storage:", save_id); // Output the save_id obtained from local storage

        if (!save_id) {
          console.error("No save_id found for the product.");
          return;
        }

        console.log("Save ID:", save_id);
        response = await axios.delete(
          `http://localhost:3001/product_saves/${save_id}`
        );
        // Delete saved state data
        delete savedIds[props.props.product_id];
        localStorage.setItem("savedProductIds", JSON.stringify(savedIds));
        setSaved(false);
        console.log("Product unsaved:", response.data);
      }
    } catch (error) {
      console.error("Error handling save:", error);
    }
  };

  let start = "" + props.props.product_available_start_time;
  let end = "" + props.props.product_available_end_time;
  start = start.slice(0, 10);
  end = end.slice(0, 10);
  let productId = "" + props.props.product_id;

  return (
    <Paper
      sx={{
        display: "inline-block",
      }}
      elevation={6}
    >
      <MCard
        sx={{
          height: "450px",
          width: "100%",
          maxWidth: 300,
          backgroundColor: COLORS.SECONDARY,
          border: "solid 1px",
          borderColor: COLORS.ACCENT,
        }}
      >
        <CardHeader
          sx={{
            backgroundColor: COLORS.PRIMARY,
            color: COLORS.SECONDARY,
          }}
          //handle images
          avatar={
            <Avatar
              src={userName.user_profile_picture}
              aria-label="Profile Pic"
            />
          }
          action={
            <Tooltip title="Save" disableInteractive arrow>
              <IconButton aria-label="Save" onClick={handleSave}>
                {saved === false ? (
                  <BookmarkAddIcon color="secondary" fontSize="small" />
                ) : (
                  <BookmarkRemoveIcon color="accent" fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          }
          title={
            <Typography color={COLORS.SECONDARY} variant="h6">
              {userName.user_name}
            </Typography>
          }
          subheader={
            <Rating name="rate" value={ratings} precision={0.5} readOnly />
          }
        />

        <CardActionArea href={`products/${productId}`}>
          <CardMedia
            component="img"
            height="200"
            image={imageSingle.image_location}
            alt="green iguana"
          />
          <CardContent sx={{ color: COLORS.PRIMARY }}>
            <Typography gutterBottom variant="h5" component="div">
              {props.props.product_name} • {props.props.product_price}/day
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.PRIMARY }}>
              {props.props.product_description}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: COLORS.PRIMARY, marginRight: "20px" }}
            >
              Available: {start} - {end}
            </Typography>
            <Typography></Typography>
            <Typography variant="caption" sx={{ color: COLORS.PRIMARY }}>
              Location: {userName.user_city}, {userName.user_state}
            </Typography>
          </CardContent>
        </CardActionArea>
        {props.props.product_is_rented.toLowerCase() === "yes" ? (
          <Typography color={COLORS.PRIMARY}>NOT AVAILABLE</Typography>
        ) : (
          <Typography color={COLORS.ACCENT}>AVAILABLE NOW</Typography>
        )}
      </MCard>
    </Paper>
  );
}

export default Card;
