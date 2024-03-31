import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const ManageRentals = (rental, product) => {
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

  //Hand submit: update below, update return time ans is return, refresh whole page
  const handleReserve = async () => {
    try {
      let today = new Date();
      let updates = product;
      updates.product_is_rented = "no";

      console.log(updates);

      //Check if is rented is still no first
      //set is rented before making product rental
      await axios.put(`http://localhost:3001/products/${productId}`, updates);
      await axios.put("http://localhost:3001/product_rentals", data);
      alert(product.product_is_rented.toLowerCase());
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
          <TextField fullWidth label="Rental End Date: " defaultValue="" />
          <FormControlLabel
            value="damaged"
            control={<Checkbox />}
            label="Rental Damaged:"
            labelPlacement="start"
          />
          <TextField
            fullWidth
            disabled
            label="Damage Information: "
            defaultValue=""
            multiline
            minRows={3}
          />
        </Box>
        <Box display={"flex"} justifyContent={"right"} marginTop={"4px"}>
          <Button variant="contained">End Rental</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageRentals;
