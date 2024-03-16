import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductEachDetail = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  // Query product info.
  useEffect(() => {
    axios.get(`http://localhost:3001/products/${productId}`).then((response) => {
      console.log(response.data);
      setProduct(response.data);
    });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {product.product_id}</p>
      <p>Product Name: {product.product_name}</p>
      <p>Product Category: {product.product_category}</p>
      <p>Product Description: {product.product_description}</p>
      <p>Product Price: {product.product_price}</p>
      <p>Owner ID: {product.owner_id}</p>
      <h1>More picture Below...</h1>
    </div>
  );
};

export default ProductEachDetail;
