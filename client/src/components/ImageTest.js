import "../App.css";
import React, { useState, useEffect } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';

/* Expected Firebase file tree:
.
├── products/
│   └── [product_id]/
│       ├── 1.jpg
│       ├── 2.jpg
│       ├── 3.jpg
│       └── 4.jpg
└── userAvatars/
    └── [user_id]/
        └── profilePic.jpg

*/

/* To solve: 
    - Order of images using listAll is random? If used for product images will be noticeable
    - For profile pics, will need to grab and use id of currently logged in user as part of storage reference
    - Should also delete previous profile pics -> When user confirms pic change, delete rest of contents in folder (solve by always naming PFP same name)
    - Add a default profile picture image -> If userAvatars/[user_id]/ is empty or DNE, use userAvatars/default.jpg... set form pfp question to hidden with default value to default.jpg?
    - For product images, set limit on amount of pictures? Maybe 4 or 5 total per product?
    - Get individual URLs of product images being displayed, so if owner wants to remove them they can be removed from Firebase
    - Better image management from user before uploaded (being able to select multiple + being able to remove selected images for products, etc.)
*/

export default function ImageTest(props) {
    //For user selecting an image
    const [imageUpload, setImageUpload] = useState(null);
    //For page displaying images
    const [imageList, setImageList] = useState([]);
    
    //Reference to test "images" folder
    const imageListRef = ref(storage, "testImages/");

    const uploadImage = () => {
        if (imageUpload == null) return;
        //Create reference for where to store image - use v4() from uuid for unique identifier
        const imageRef = ref(storage, `testImages/${imageUpload.name + v4()}`)
        /*Used to upload an image to Firebase.
          Note uploaded images are public access */
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            alert("Image Uploaded");
            //Update page automatically using array of URLs
            //May want to remove alert above, and can use this snapshot to put URL in database as well
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url])    
            })
                  
        });
    };

    //To find images from firebase:
    useEffect(() => {
        //Displays all images in path, if products and users have own folders by ID we can use this to display their image(s)
        listAll(imageListRef).then((response) => {   
            //To display images, for each file in reference folder:
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    //Update image list as array of image URLs
                    //uses "new Set()" to prevent duplicates caused by useEffect with listAll
                    setImageList((prev) => [...new Set([...prev, url]) ]);
                });
            });
        });
    }, []);

    return (
        //Choose File + button to upload the image - Ideally want to display image that was selected before user submits
        //Also display list of images and list of URLs
        <div className="it">
            <input type="file" onChange={(event) => {setImageUpload(event.target.files[0]);}}/>
            <button onClick={uploadImage}>Upload Image</button>

            {imageList.map((url) => {
                return <img src={url} />
            })}
            {imageList.map((url) => {
                return <p>{url}</p>
            })}
        </div>
    );
  }
  