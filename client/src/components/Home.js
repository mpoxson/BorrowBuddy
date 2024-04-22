import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Card from "./Card";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Material-UI icon for menu

const Home = () => {
  const [product, setProduct] = useState([]);

  const [filteredProduct, setFilteredProduct] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCheckbox, setActiveCheckbox] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchData(activeCheckbox);
  }, [activeCheckbox]);

  useEffect(() => {
    handleSearchFilter();
  }, [searchQuery]);

  const fetchData = async (checkbox) => {
    setProduct([]);
    setFilteredProduct([]);

    let endpoint = "/products";
    let userId = JSON.parse(localStorage.getItem("user"))["user_id"];

    if (checkbox === "saved") {
      endpoint = "/product_saves/user/" + userId;
    } else if (checkbox === "rentals") {
      endpoint = "/product_rentals/user/active/" + userId;
    }

    if (checkbox === "saved" || checkbox === "rentals") {
      let data = [];
      try {
        const response1 = await axios.get(`http://localhost:3001${endpoint}`);
        const newData1 = response1.data;
        data = newData1;
        console.log(newData1);
        //setProduct(newData);
        //setFilteredProduct(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      if (data) {
        let newData2 = [];
        data.forEach(async (element) => {
          let prod = element.product_id;

          try {
            const response2 = await axios.get(
              `http://localhost:3001/products/${prod}`
            );
            newData2.push(response2.data);
            console.log(newData2);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
          setProduct(newData2);
          setFilteredProduct(newData2);
        });
      }
    } else {
      try {
        const response = await axios.get(`http://localhost:3001${endpoint}`);
        const newData = response.data;
        console.log(newData);
        setProduct(newData);
        setFilteredProduct(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleFilter = () => {
    let filtered = product;

    // Apply search filter if searchQuery is not empty
    if (searchQuery) {
      let searchRegex = new RegExp(searchQuery.trim(), "i");
      filtered = filtered.filter((item) => searchRegex.test(item.product_name));
    }

    // Apply other filters based on activeCheckbox, categoryFilter, and priceFilter
    if (activeCheckbox === "saved") {
      filtered = filtered.filter((item) => item.saved);
    }
    if (activeCheckbox === "rentals") {
      filtered = filtered.filter((item) => item.rental);
    }
    if (categoryFilter) {
      let searchRegex = new RegExp(categoryFilter.trim(), "i");
      // searchRegex.test(item.product_category)
      filtered = filtered.filter(
        // (item) => item.product_category === categoryFilter
        (item) => searchRegex.test(item.product_category)
      );
    }
    if (priceFilter) {
      filtered = filtered.filter(
        (item) => parseFloat(item.product_price) <= parseFloat(priceFilter)
      );
    }

    setFilteredProduct(filtered);
  };

  const handleSearchFilter = () => {
    let filtered = product;

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery.trim(), "i");
      filtered = filtered.filter((item) => searchRegex.test(item.product_name));
    }

    setFilteredProduct(filtered);
  };

  const handleCheckboxChange = (checkbox) => {
    setActiveCheckbox(checkbox);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const clearFilters = () => {
    setCategoryFilter("");
    setPriceFilter("");
    handleFilter();
  };

  return (
    <div>
      {/* Toggle button for sidebar */}
      <IconButton
        onClick={toggleSidebar}
        style={{ position: "fixed", left: 0, zIndex: 999 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <div style={{ width: "250px", padding: "20px" }}>
          <List>
            <ListItem button onClick={() => handleCheckboxChange("all")}>
              <Checkbox checked={activeCheckbox === "all"} />
              <ListItemText primary="All Products" />
            </ListItem>
            <ListItem button onClick={() => handleCheckboxChange("saved")}>
              <Checkbox checked={activeCheckbox === "saved"} />
              <ListItemText primary="Saved" />
            </ListItem>
            <ListItem button onClick={() => handleCheckboxChange("rentals")}>
              <Checkbox checked={activeCheckbox === "rentals"} />
              <ListItemText primary="My Rentals" />
            </ListItem>
          </List>

          <TextField
            label="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Max Price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            type="number"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilter}
            fullWidth
          >
            Apply
          </Button>
          <Button variant="outlined" onClick={clearFilters} fullWidth>
            Clear Filters
          </Button>
        </div>
      </Drawer>

      <div
        style={{
          marginLeft: sidebarOpen ? "280px" : "20px",
          paddingTop: "50px",
        }}
      >
        <SearchBar setSearchQuery={setSearchQuery} />
        {filteredProduct.map((value) => (
          <Box
            width={"auto"}
            height={"auto"}
            display={"inline"}
            marginX={"10px"}
          >
            <Card key={value.product_id} props={value} />
          </Box>
        ))}
      </div>
    </div>
  );
};

export default Home;
