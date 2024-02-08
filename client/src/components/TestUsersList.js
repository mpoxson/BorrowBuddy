import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
const TestUsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((value, key) => (
          <li key={value.user_id}>
            <p>Name: {value.user_name}</p>
            <p>Email: {value.user_email}</p>
            <p>Phone: {value.user_phone}</p>
            <p>State: {value.user_state}</p>
            <p>City: {value.user_city}</p>
            <p>Address: {value.user_address}</p>
            <p>Zipcode: {value.user_zipcode}</p>
            <p>Profile: {value.user_profile}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestUsersList;
