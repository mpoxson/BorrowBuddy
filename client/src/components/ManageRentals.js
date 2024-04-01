import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

const ManageRentals = (props) => {
  let product = props.props.product;
  let rental = props.props.rental;
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

  const [damageText, setDamageText] = useState("");
  const [isDamage, setIsDamage] = useState(false);
  const [dateReturn, setDateReturn] = useState("");

  //Hand submit: update below, update return time ans is return, refresh whole page
  const handleEnd = async () => {
    try {
      let today = new Date();
      let data = rental;
      data.rental_damage_text = damageText;
      data.rental_is_return = true;
      data.rental_return_time = today;
      data.rental_is_damage = isDamage;
      data.rental_end_time = dateReturn;

      let updates = product;
      updates.product_is_rented = "no";

      await axios.put(
        `http://localhost:3001/products/${product.product_id}`,
        updates
      );
      await axios.put(
        `http://localhost:3001/product_rentals/${rental.rental_id}`,
        data
      );
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
          <Typography variant="h5">Manage Rental</Typography>
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Rental Returned"
              onChange={(newValue) => {
                setDateReturn(newValue.toDate());
              }}
            />
          </LocalizationProvider>
          <FormControlLabel
            control={<Checkbox onChange={() => setIsDamage(!isDamage)} />}
            label="Rental Damaged:"
            labelPlacement="start"
          />
          <TextField
            fullWidth
            disabled={!isDamage}
            label="Damage Information: "
            defaultValue=""
            multiline
            minRows={3}
            onChange={(event) => {
              setDamageText(event.target.value);
            }}
          />
        </Box>
        <Box display={"flex"} justifyContent={"right"} marginTop={"4px"}>
          <Button variant="contained" onClick={handleEnd}>
            End Rental
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageRentals;
