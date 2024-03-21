import React, { useState } from "react";
import { TextField, IconButton, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ setSearchQuery }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    setSearchQuery(searchText.trim());
  console.log(searchText.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission behavior
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(5px)",
        zIndex: 1000,
        padding: "10px",
        margin: 0,
      }}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={9}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default SearchBar;

