import React, { useState, useEffect, useRef } from "react";
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
import EditPictures from "./EditPictures";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from 'uuid';

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
  //For page displaying images
  const [imageList, setImageList] = useState([]);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [urlImages, setUrlImages] = useState([]);
  const [sentinal, setSetinal] = useState(0);
  const [highestImage, setHighestImage] = useState([]);


  //Create an array of image URLs from the product_images associated with product
  useEffect(() => {
    axios
      .get(`http://localhost:3001/product_images/${props.props.product_id}`)
      .then((response) => {
        response.data.forEach((product_images) =>
          setImageList((prev) => [
            ...new Set([...prev, product_images.image_location]),
          ])
        );
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, [props.props.product_id]);
  
  //Highest image order
  useEffect(() => {
    axios
      .get(`http://localhost:3001/product_images/max/${props.props.product_id}`)
      .then((response) => {
        if (response.data !== "" && response.data.constructor === Object) {
          setHighestImage(response.data);
        } else {
          let temp = { image_order: 10 };
          setHighestImage(temp);
        }
      });
  }, [props.props.product_id]);

  //For Upload button
  const inpPic = useRef(null);
  const selectImage = event => {
    inpPic.current.click();
  }

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      const ilUrl = URL.createObjectURL(newImage);
      setImageList((prev) => [
        ...new Set([...prev, ilUrl]),
      ]);
      newImage["id"] = i;
      setImagesUpload((prevState) => [...prevState, newImage]);  
    }
  };

  const uploadImage = () => {
  if (imagesUpload.length > 0) {
    imagesUpload.map((image) =>{
    //Create reference for where to store image
    const imageRef = ref(storage, `products/${props.props.product_id}/${image.id + v4()}.png`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((urls) => {
        setUrlImages((prevState) => [...prevState, urls]);
        handleImages(urls);
      });
    });
    });
  }};

  const handleImages = async (urls) => {
    try {
      const imageData = {
        product_id: props.props.product_id,
        image_order: highestImage.image_order,
        image_location: urls,
      }
      await axios
      .post(`http://localhost:3001/product_images`, imageData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });;
    } catch (error) {
      console.log("errored out: " + error);
    }
  };

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
      // window.location.reload();
      alert("Changes uploaded.")
      window.location.reload();
    } catch (error) {
      // Error handling code remains the same
      console.log("errored out: " + error);
    }
  };

  const wrapperHandle = async () => {
    uploadImage();
    handleEdits();
    // await Promise.all([uploadImage(), handleEdits()]);
    // window.location.reload();
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
          <EditPictures props={imageList} />
          <input type="file" ref={inpPic} onChange={handleChange} multiple style={{display: 'none'}}/>
          <Box display={"flex"} justifyContent={"right"} marginTop={"4px"}>
          <Button variant="contained" onClick={selectImage}>
            Upload
          </Button>
        </Box>
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
          <Button variant="contained" onClick={wrapperHandle}>
            Change
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Edit;
