import React, { useState, useEffect } from "react";
import axios from "axios";

function AddProduct(props) {
  const[product_name,setProductName] = useState('');
  const[product_desciption,setProductDescription] = useState('');
  const[product_price,setProductPrice] = useState('');
  const[product_category,setProductCategory] = useState('');

  handleOnSubmit(e) {
    e.preventDefault()

      const data ={
        product_name:
        product_desciption:
        product_price:
        product_category:

      }
    axios.post('http://localhost:3001/',data)
      .then((response)=> {
        console.log(response.data)
      }).catch((error)=>{
        console.log(error)
      });
  }
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
          
          <Form onSubmit ={handleOnSubmit}
            
          >
            <div className="mt-2.5">
              <p>Enter Product Name</p>
            </div>
            <FormInput
              type="text"
              name="ProductName"
              value={product_name}
              onChange={setProductName}
              placeholder="Product Name"
              className="mt-2.5"
              required={true}
            />
            <FormInput
            type="file"
            placeholder="Product Image"
            name="ProductImage"
            className="box-border flex relative flex-col shrink-0 p-2.5 mt-5 mb-11 rounded border border-solid border-stone-300"
            required={true}
          />
          <FormInput
            type="text"
            placeholder="Product Description"
            value={product_desciption}
            onChange={setProductDescription}
            name="ProductDesciption"
            defaultValue="Please enter product description"
            className="box-border flex relative flex-col shrink-0 p-2.5 mt-11 rounded border border-solid border-stone-300"
            required={true}
          />
            <div className="mt-2.5">
              <p>Enter Product Price</p>
            </div>
            <FormInput
              name="Product Price"
              placeholder="$0.00"
              value={product_price}
              onChange={setProductPrice}
              type="text"
              className="mt-2.5"
              required={true}
            />
            <FormSelect
              name="Category"
              className="box-border flex relative flex-col shrink-0 self-start mt-5"
              value={product_category}
              onChange={setProductCategory}
              options={[
                { value: "Tool", name: "Tool" },
                { value: "Something else", name: "Something else" },
              ]}
              required
            />
            <FormSubmitButton text="Submit" className="mt-2.5" />
          </Form>
        </section>
      </div>
    </>
  );
}

export default AddProduct;
