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

function Card(props) {
  const [saved, setSaved] = useState(false);
  const [userName, setUserName] = useState("");

  //For page displaying images
  const [imageAva, setImageAva] = useState([]);
  const [imageSingle, setImageSingle] = useState([]);

  //Reference to test "images" folder
  const imageAvaRef = ref(storage, "userAvatars/");
  const imageSingleRef = ref(storage, "testImages/");

  //invoke database user_name in each card title
  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${props.props.owner_id}`)
      .then((response) => {
        setUserName(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [props.props.owner_id]);
  useEffect(() => {
    //Displays all images in path, if products and users have own folders by ID we can use this to display their image(s)
    listAll(imageAvaRef).then((response) => {
      //To display images, for each file in reference folder:
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          //Update image list as array of image URLs
          //uses "new Set()" to prevent duplicates caused by useEffect with listAll
          setImageAva((prev) => [...new Set([...prev, url])]);
        });
      });
    });
  }, []);
  useEffect(() => {
    //Displays all images in path, if products and users have own folders by ID we can use this to display their image(s)
    listAll(imageSingleRef).then((response) => {
      //To display images, for each file in reference folder:
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          //Update image list as array of image URLs
          //uses "new Set()" to prevent duplicates caused by useEffect with listAll
          setImageSingle((prev) => [...new Set([...prev, url])]);
        });
      });
    });
  }, []);

  const handleSave = (event) => {
    if (saved === null || saved === false) setSaved(true);
    if (saved === true) setSaved(false);
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
          avatar={<Avatar src={imageAva[0]} aria-label="Profile Pic" />}
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
            <Typography color={COLORS.ACCENT} variant="body1">
              4.4/5 STARS
            </Typography>
          }
        />

        <CardActionArea href={`products/${productId}`}>
          <CardMedia
            component="img"
            height="200"
            image={imageSingle[0]}
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
      </MCard>
    </Paper>
  );
}

export default Card;
