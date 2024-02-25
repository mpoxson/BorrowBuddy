import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/products").then((response) => {
      console.log(response.data);
      setProduct(response.data);
    });
  }, []);

  return (
    <div>
      {product.map((value) => (
        <Card props={value} />
      ))}
    </div>
  );
};

export default Home;
