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
import { Link } from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";

function Card(props) {
  const [saved, setSaved] = useState(false);
  const [userName, setUserName] = useState("");
  const [ratings, setRatings] = useState(null);
  const [savedId, setSavedId] = useState(null);

  let curr_user = JSON.parse(localStorage.getItem("user"))["user_id"];

  //For page displaying images
  const [imageSingle, setImageSingle] = useState([]);

  useEffect(() => {
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
      });

    axios
      .get(
        `http://localhost:3001/product_saves/product/${props.props.product_id}/${curr_user}`
      )
      .then((response) => {
        if (response.data.length != 0) {
          setSaved(true);
          console.log(response.data);
          setSavedId(response.data);
        } else {
          setSaved(false);
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
          user_id: curr_user,
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

        setSavedId(save_id);
      } else {
        // Get the save_id of the saved product
        if (savedId == null) {
          console.error("No save_id found for the product.");
          return;
        }

        console.log("Save ID:", save_id);
        response = await axios.delete(
          `http://localhost:3001/product_saves/${savedId}`
        );
        // Delete saved state data
        setSavedId(null);
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
        {props.props.owner_id !=
        JSON.parse(localStorage.getItem("user"))["user_id"] ? (
          <CardHeader
            sx={{
              backgroundColor: COLORS.PRIMARY,
              color: COLORS.SECONDARY,
            }}
            //handle images
            avatar={
              <Link
                to={`users/${props.props.owner_id}`}
                style={{ textDecoration: "none" }}
              >
                <Avatar
                  src={userName.user_profile_picture}
                  aria-label="Profile Pic"
                />
              </Link>
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
              <Link
                to={`users/${props.props.owner_id}`}
                style={{ textDecoration: "none" }}
              >
                <Typography color={COLORS.SECONDARY} variant="h6">
                  {userName.user_name}
                </Typography>
              </Link>
            }
            subheader={
              <Rating
                name="rate"
                emptyIcon={
                  <StarRateIcon sx={{ color: "#4a4943" }} fontSize="inherit" />
                }
                value={ratings}
                precision={0.5}
                readOnly
              />
            }
          />
        ) : (
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
              <Rating
                name="rate"
                emptyIcon={
                  <StarRateIcon sx={{ color: "#4a4943" }} fontSize="inherit" />
                }
                value={ratings}
                precision={0.5}
                readOnly
              />
            }
          />
        )}

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
