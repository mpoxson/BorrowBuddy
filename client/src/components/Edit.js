import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs from "dayjs";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Edit = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [newName, setNewName] = useState(props.props.product_name);
  const [newPrice, setNewPrice] = useState(props.props.product_price);
  const [description, setDescription] = useState(
    props.props.product_description
  );
  const [category, setCategory] = useState(props.props.product_category);
  const [start, setStart] = useState(props.props.product_available_start_time);
  const [end, setEnd] = useState(props.props.product_available_end_time);

  console.log(props);
  const handleEdits = async () => {
    try {
      let updates = props.props;
      let productId = updates.product_id;

      updates.product_name = newName;
      updates.product_price = newPrice;
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

  return (
    <Box sx={style}>
      <Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography variant="h5">Edit Product</Typography>
        </Box>
        <Box>
          <TextField
            fullWidth
            sx={{ marginY: "7px" }}
            label="Name: "
            defaultValue={newName}
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
          <TextField
            id="input-with-icon-textfield"
            label="Price per Day"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
            sx={{ marginY: "7px" }}
            defaultValue={newPrice}
            onChange={(event) => {
              setNewPrice(event.target.value);
            }}
          />
          <TextField
            variant="filled"
            sx={{ marginY: "7px" }}
            fullWidth
            multiline
            minRows={6}
            defaultValue={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <TextField
            fullWidth
            label="Category: "
            defaultValue={category}
            sx={{ marginY: "7px" }}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%", marginY: "7px" }}
              label="Start:"
              defaultValue={dayjs(start)}
              onChange={(newValue) => {
                setStart(newValue.toDate());
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%", marginY: "7px" }}
              label="Start:"
              defaultValue={dayjs(end)}
              onChange={(newValue) => {
                setEnd(newValue.toDate());
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box display={"flex"} justifyContent={"right"} marginTop={"4px"}>
          <Button variant="contained" onClick={handleEdits}>
            Change
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Edit;
