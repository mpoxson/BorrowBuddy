import React from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { COLORS } from "../constants/enums";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Pictures from "./Pictures";
import {
  CommentText,
  CommentMetadata,
  CommentGroup,
  CommentContent,
  CommentAvatar,
  CommentAuthor,
  FormTextArea,
  CommentAction,
  CommentActions,
  Comment,
  Form,
  Header,
} from "semantic-ui-react";
import img from "../image/test.jpg";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const Product = () => {
  let { productId } = useParams();
  console.log(`${productId}`);

  const img_array = [img, img, img];

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
                  <Typography variant="h6">
                    BLACK+DECKER 20V MAX* Cordless Reciprocating Saw Kit
                    (BDCR20C)
                  </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box
                    marginRight={"20px"}
                    marginLeft={"-20px"}
                    color={COLORS.ACCENT}
                  >
                    <Typography>$9.99/Day</Typography>
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
              defaultValue={
                "Our 20V MAX* Variable Speed Cordless Reciprocating Saw is versatile, lightweight, and easy to use. It features a powerful 3000 SPM motor with a variable speed trigger and electric brake to enhance control. Tool-free blade changes and an adjustable pivoting shoe add convenience and ease of use."
              }
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
              defaultValue="Hand Saws"
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
        <Button variant="contained">Reserve</Button>
      </Box>

      {/* Box for comments */}
      {/* Put all this in a map for each comment of a certain product */}
      <Paper sx={{ marginTop: "10px" }}>
        <CommentGroup size="small">
          <Header as="h3" dividing>
            Comments
          </Header>

          <Comment>
            <CommentAvatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            <CommentContent>
              <CommentAuthor as="a">Matt</CommentAuthor>
              <CommentMetadata>
                <div>Today at 5:42PM</div>
              </CommentMetadata>
              <CommentText>How artistic!</CommentText>
              <CommentActions>
                <CommentAction>Reply</CommentAction>
              </CommentActions>
            </CommentContent>
          </Comment>

          <Comment>
            <CommentAvatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
            <CommentContent>
              <CommentAuthor as="a">Elliot Fu</CommentAuthor>
              <CommentMetadata>
                <div>Yesterday at 12:30AM</div>
              </CommentMetadata>
              <CommentText>
                <p>
                  This has been very useful for my research. Thanks as well!
                </p>
              </CommentText>
              <CommentActions>
                <CommentAction>Reply</CommentAction>
              </CommentActions>
            </CommentContent>
            <CommentGroup>
              <Comment>
                <CommentAvatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
                <CommentContent>
                  <CommentAuthor as="a">Jenny Hess</CommentAuthor>
                  <CommentMetadata>
                    <div>Just now</div>
                  </CommentMetadata>
                  <CommentText>Elliot you are always so right :)</CommentText>
                  <CommentActions>
                    <CommentAction>Reply</CommentAction>
                  </CommentActions>
                </CommentContent>
              </Comment>
            </CommentGroup>
          </Comment>

          <Comment>
            <CommentAvatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
            <CommentContent>
              <CommentAuthor as="a">Joe Henderson</CommentAuthor>
              <CommentMetadata>
                <div>5 days ago</div>
              </CommentMetadata>
              <CommentText>Dude, this is awesome. Thanks so much</CommentText>
              <CommentActions>
                <CommentAction>Reply</CommentAction>
              </CommentActions>
            </CommentContent>
          </Comment>

          <Form reply>
            <FormTextArea />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </CommentGroup>
      </Paper>
    </Container>
  );
};

export default Product;
