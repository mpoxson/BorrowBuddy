import React, { useState, useEffect } from "react";
import axios from "axios";
//import { FormInput } from "semantic-ui-react";
//import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormInput, Form, FormSelect, Button } from "semantic-ui-react";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

function AddProduct(props) {
  const [product_name, setProductName] = useState("");
  const [product_desciption, setProductDescription] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_category, setProductCategory] = useState("");
  const [product_available_start_time, setproduct_available_start_time] =
    useState("");
  const [product_available_end_time, setproduct_available_end_time] =
    useState("");
  const [product, setProduct] = useState(null);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [urlImages, setUrlImages] = useState([]);
  const [sentinal, setSetinal] = useState(0);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = i;
      setImagesUpload((prevState) => [...prevState, newImage]);
    }
    //console.log(imagesUpload);
  };

  let curr_user = JSON.parse(localStorage.getItem("user"))["user_id"];

  const [responses, setResponses] = useState(null);

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
        responses = setResponses(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (responses != null) {
      axios
        .get(`http://localhost:3001/products/owner/${curr_user}`)
        .then((response) => {
          console.log(response.data);
          setProduct(response.data);
        });
    }
  }, [responses]);

  useEffect(() => {
    //console.log(imageUpload);
    if (imagesUpload.length > 0 && product != null && sentinal == 0) {
      imagesUpload.map((image) =>{
      //console.log("made it in");
      //Create reference for where to store image
      const imageRef = ref(storage, `products/${product.product_id}/${image.id}.png`);
      /*Used to upload an image to Firebase.
        Note uploaded images are public access */
        // async () => {
      uploadBytes(imageRef, image).then((snapshot) => {
        //alert("Image Uploaded");
        getDownloadURL(snapshot.ref).then((urls) => {
          setUrlImages((prevState) => [...prevState, urls]);
          // console.log("url:" + urls);
          // console.log(urlImages);
        });
      });
    // };
      });
    }
  }, [imagesUpload, urlImages, product]);

  useEffect(() => {
    if (product != null && urlImages.length > 0 && sentinal == 0) {
    let count = 1;
    const imageListRef = ref(storage, `products/${product.product_id}/`)
    //Displays all images in path, if products and users have own folders by ID we can use this to display their image(s)
    listAll(imageListRef).then((response) => {   
        //To display images, for each file in reference folder:
        response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
                //Update image list as array of image URLs
                //uses "new Set()" to prevent duplicates caused by useEffect with listAll
                const imageData = {
                  product_id: product.product_id,
                  image_order: count,
                  image_location: url,
                }
                axios
        .post(`http://localhost:3001/product_images`, imageData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
        //alert("posted");
        count++;
            });
        });
    });
      setSetinal(1);
      //alert("out");
      //window.location.reload();
  }
}, [product, urlImages]);

//   useEffect(() => {
//     if (product != null && urlImages.length > 0 && sentinal == 0) {
//       for (let i = 0; i < urlImages.length; i++) {
//         console.log("check one");
//       const imageData = {
//         product_id: product.product_id,
//         image_order: i,
//         image_location: urlImages[i],
//       };
//       axios
//         .post(`http://localhost:3001/product_images`, imageData)
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//         alert("posted");
// };

//       setSetinal(1);
//       alert("out");
//       window.location.reload();
//     }
//   }, [product, urlImages]);

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
              onChange={handleChange}
              // onChange={(event) => {
              //   setImagesUpload(event.target.files[0]);
              // }}
              multiple
              required={true}
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
