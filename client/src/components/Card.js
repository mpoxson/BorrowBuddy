import React from "react";
import Paper from "@mui/material/Paper";
import { Card as MCard } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { COLORS } from "../constants/enums";

function Card(props) {
  return (
    <Paper
      elevation={3}
      square={false}
      variant="outlined"
      sx={{
        display: "inline-block",
      }}
    >
      <MCard
        sx={{
          maxWidth: 345,
          backgroundColor: COLORS.SECONDARY,
          borderStyle: "ridge",
          borderWidth: "1px",
          borderColor: COLORS.ACCENT,
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={require("../image/test.jpg")}
            alt="green iguana"
          />
          <CardContent sx={{ color: COLORS.PRIMARY }}>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="primary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            backgroundColor: COLORS.PRIMARY,
            borderStyle: "ridge",
            borderWidth: "1px",
            borderColor: COLORS.ACCENT,
          }}
        >
          <Button size="small" color="secondary">
            Share
          </Button>
        </CardActions>
      </MCard>
    </Paper>
  );
}

export default Card;
