import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Card,
  Paper,
  TextField,
  Typography,
  Rating,
} from "@mui/material";
import "../App.css";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Ratings from "./Ratings";
import { default as OurCard } from "./Card";
import StarRateIcon from "@mui/icons-material/StarRate";

const TestUsersList = () => {
  const [user, setUser] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([]);
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    axios
      .get(
        `http://localhost:3001/products/userDetail/${
          JSON.parse(localStorage.getItem("user"))["user_id"]
        }`
      )
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user products:", error);
      });
    axios
      .get(
        `http://localhost:3001/ratings/avg/${
          JSON.parse(localStorage.getItem("user"))["user_id"]
        }`
      )
      .then((response) => {
        console.log(response.data);
        setRatings(response.data.average_rating);
      });
  }, []);

  const handleEdit = () => {
    setEditableFields(user);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/users/${user.user_id}`,
        editableFields
      );

      if (response.status === 200) {
        console.log("User information updated successfully");
        const updatedUser = { ...user, ...editableFields };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        setEditableFields({});
      } else {
        console.error("Failed to update user information");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const picturePatch = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/users/${user.user_id}`,
        {
          user_profile_picture: editableFields.user_profile_picture,
        }
      );
      if (response.status === 200) {
        console.log("Profile picture updated successfully");
      } else {
        console.error("Failed to update profile picture");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const [imageUpload, setImageUpload] = useState(null);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `userAvatars/${user.user_id}/pfp.png`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        editableFields.user_profile_picture = url;
        user.user_profile_picture = url;
        picturePatch();
      });
    });
  };

  const wrapperFunction = () => {
    uploadImage();
    handleUpdate();
  };

  return (
    <Box m={8}>
      <Card variant="outlined">
        <CardHeader
          title="Basic Information"
          action={
            <Box display="flex" justifyContent="flex-end">
              {isEditing ? (
                <Button
                  onClick={wrapperFunction}
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              ) : (
                <Button
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
              )}
            </Box>
          }
        />
        <CardContent>
          {user ? (
            <div>
              <form>
                <TextField
                  label="Name"
                  name="user_name"
                  value={editableFields.user_name || user.user_name}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Phone"
                  name="user_phone"
                  value={editableFields.user_phone || user.user_phone}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="State"
                  name="user_state"
                  value={editableFields.user_state || user.user_state}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="City"
                  name="user_city"
                  value={editableFields.user_city || user.user_city}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Address"
                  name="user_address"
                  value={editableFields.user_address || user.user_address}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Zipcode"
                  name="user_zipcode"
                  value={editableFields.user_zipcode || user.user_zipcode}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Profile"
                  name="user_profile"
                  value={editableFields.user_profile || user.user_profile}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  type="file"
                  name="user_profile_picture"
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </form>
            </div>
          ) : (
            <Typography>User data not found.</Typography>
          )}
        </CardContent>
      </Card>
      <Box mt={8}>
        <Rating
          name="rate"
          emptyIcon={
            <StarRateIcon sx={{ color: "#4a4943" }} fontSize="inherit" />
          }
          value={ratings}
          precision={0.5}
          readOnly
        />
        <Ratings props={JSON.parse(localStorage.getItem("user"))["user_id"]} />
      </Box>
      <div
        style={{
          marginTop: "50px",
          border: "0px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Here is all my product information:
        </Typography>
        {/* Map through the user's products and render the user product card component */}
        {products.map((product) => (
          <Box
            width={"auto"}
            height={"auto"}
            display={"inline"}
            marginX={"10px"}
          >
            <OurCard props={product} />
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default TestUsersList;
