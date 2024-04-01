import React, { useState, useEffect } from "react";
import axios from "axios";
//import { FormInput } from "semantic-ui-react";
//import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormInput, Form, FormSelect, Button } from "semantic-ui-react";

function AddProduct(props) {
  const [product_name, setProductName] = useState("");
  const [product_desciption, setProductDescription] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_category, setProductCategory] = useState("");
  const [product_available_start_time, setproduct_available_start_time] =
    useState("");
  const [product_available_end_time, setproduct_available_end_time] =
    useState("");

  let curr_user = JSON.parse(localStorage.getItem("user"))["user_id"];

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const data = {
      product_name: product_name,
      product_description: product_desciption,
      product_price: product_price,
      product_category: product_category,
      product_available_start_time: Date.parse(product_available_start_time),
      product_available_end_time: Date.parse(product_available_end_time),
      owner_id: curr_user,
      product_is_rented: "no",
      rentee_id: null,
    };

    axios
      .post("http://localhost:3001/products", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  };
  return (
    <>
      <div className="box-border relative shrink-0 mx-auto mt-5 mb-36 h-auto">
        <h1>Add A Product</h1>
      </div>
      <div
        className="box-border flex relative flex-col shrink-0 p-5 min-h-[100px]"
        maxWidth={1200}
        lazyLoad={false}
      >
        <section className="box-border flex relative flex-col grow shrink-0 self-stretch p-5 mx-auto w-full max-w-[1200px] min-h-[100px]">
          <Form onSubmit={handleOnSubmit}>
            <div className="mt-2.5">
              <p>Enter Product Name</p>
            </div>
            <FormInput
              type="text"
              name="ProductName"
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product Name"
              className="mt-2.5"
              required={true}
            />
            <FormInput
              type="text"
              name="product_available_start_time"
              onChange={(e) => setproduct_available_start_time(e.target.value)}
              placeholder="Product Available Start Time (YYYY-MM-DD)"
              className="mt-2.5"
              required={true}
            />
            <FormInput
              type="text"
              name="product_available_end_time"
              onChange={(e) => setproduct_available_end_time(e.target.value)}
              placeholder="Product Available End Time (YYYY-MM-DD)"
              className="mt-2.5"
              required={true}
            />
            <FormInput
              type="file"
              placeholder="Product Image"
              name="ProductImage"
              className="box-border flex relative flex-col shrink-0 p-2.5 mt-5 mb-11 rounded border border-solid border-stone-300"
            />
            <FormInput
              type="text"
              placeholder="Product Description"
              onChange={(e) => setProductDescription(e.target.value)}
              name="ProductDesciption"
              className="box-border flex relative flex-col shrink-0 p-2.5 mt-11 rounded border border-solid border-stone-300"
              required={true}
            />
            <div className="mt-2.5">
              <p>Enter Product Price</p>
            </div>
            <FormInput
              name="Product Price"
              placeholder="Product Price in Dollars (per day)"
              onChange={(e) => setProductPrice(e.target.value)}
              type="text"
              className="mt-2.5"
              required={true}
            />
            <FormInput
              name="Category"
              className="box-border flex relative flex-col shrink-0 self-start mt-5"
              placeholder="product category"
              onChange={(e) => setProductCategory(e.target.value)}
              required
            />
            <Button className="mt-2.5">Submit</Button>
          </Form>
        </section>
      </div>
    </>
  );
}

export default AddProduct;
