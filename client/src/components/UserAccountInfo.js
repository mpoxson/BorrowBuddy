import React, { useState, useEffect } from "react";
import "../App.css";
const TestUsersList = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Hi, {user.user_name}!! Edit Your Profile</h2>
          <p>Name: {user.user_name}  <button>Edit</button></p>
          
          {/* //Email CANNOT BE CHANGED */}
          <p>Email: {user.user_email}       </p>
          <p>Phone: {user.user_phone}       <button>Edit</button></p>
          <p>State: {user.user_state}       <button>Edit</button></p>
          <p>City: {user.user_city}         <button>Edit</button></p>
          <p>Address: {user.user_address}   <button>Edit</button></p>
          <p>Zipcode: {user.user_zipcode}   <button>Edit</button></p>
          <p>Profile: {user.user_profile}   <button>Edit</button></p>
          <p>Profile picture:               <button>Upload</button>   </p>
        </div>
      ) : (
        <p>User data not found.</p>
      )}
    </div>
  );
}
export default TestUsersList;


             