import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [product, setProduct] = useState([]);
  //Get products info. in home page, then transform to form of Cards 
  useEffect(() => {
    axios.get("http://localhost:3001/products").then((response) => {
      console.log(response.data);
      setProduct(response.data);
    });
  }, []);

  return (
    <div>
      {product.map((value) => (
        <Card key={value.product_id} props={value} />//add unique key to avoid inspect warning
      ))}
    </div>
  );
};

export default Home;