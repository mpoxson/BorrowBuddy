import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Box, CardHeader, Card as MCard, Tooltip } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { COLORS } from "../constants/enums";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

function Card(props) {
  const [saved, setSaved] = useState(false);

  const handleSave = (event) => {
    if (saved === null || saved === false) setSaved(true);
    if (saved === true) setSaved(false);
  };

  return (
    <Paper
      sx={{
        display: "inline-block",
      }}
      elevation={6}
    >
      <MCard
        sx={{
          maxWidth: 345,
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
            <Avatar sx={{ bgcolor: COLORS.ACCENT }} aria-label="Profile Pic">
              T
            </Avatar>
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
              User Name
            </Typography>
          }
          subheader={
            <Typography color={COLORS.ACCENT} variant="body1">
              4.4/5 STARS
            </Typography>
          }
        />

        <CardActionArea href="#">
          <CardMedia
            component="img"
            height="200"
            image={require("../image/test.jpg")}
            alt="green iguana"
          />
          <CardContent sx={{ color: COLORS.PRIMARY }}>
            <Typography gutterBottom variant="h5" component="div">
              Lizard • $5.99/day
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.PRIMARY }}>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: COLORS.PRIMARY, marginRight: "20px" }}
            >
              Available: 1/17/26- 1/23/45
            </Typography>
            <Typography variant="caption" sx={{ color: COLORS.PRIMARY }}>
              Location: Detroit
            </Typography>
          </CardContent>
        </CardActionArea>
      </MCard>
    </Paper>
  );
}

export default Card;
